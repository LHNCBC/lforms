/**
 * A package to handle conversion from FHIR SDC Questionnaire to LForms
 *
 * It provides the following functions:
 * convertQuestionnaireToLForms()
 * -- Convert FHIR SDC QuestionnaireResponse data into corresponding LForms data
 * mergeQuestionnaireResponseToLForms()  (defined in sdc-import-common.js)
 * -- Merge FHIR SDC QuestionnaireResponse data into corresponding LForms data
 */
function addSDCImportFns(ns) {
"use strict";

  var self = ns;
  // FHIR extension urls

  self.fhirExtVariable = "http://hl7.org/fhir/StructureDefinition/variable";
  self.fhirExtUrlOptionScore = "http://hl7.org/fhir/StructureDefinition/ordinalValue";


  /**
   * Parse form level fields from FHIR questionnaire and assign to LForms object.
   *
   * @param lfData - LForms object to assign the extracted fields
   * @param questionnaire - FHIR questionnaire resource object to parse for the fields.
   * @private
   */
  self._processFormLevelFields = function(lfData, questionnaire) {
    self.copyFields(questionnaire, lfData, self.formLevelFields);

    // For backward compatibility, we keep lforms.code as it is, and use lforms.codeList
    // for storing questionnaire.code. While exporting, merge lforms.code and lforms.codeList
    // into questionnaire.code. While importing, convert first of questionnaire.code
    // as lforms.code, and copy questionnaire.code to lforms.codeList.
    if(lfData.code) {
      // Rename questionnaire code to codeList
      lfData.codeList = lfData.code;
      delete lfData.code;
    }
    var codeAndSystemObj = self._getCode(questionnaire);
    if(codeAndSystemObj) {
      lfData.code = codeAndSystemObj.code;
      lfData.codeSystem = codeAndSystemObj.system;
    }

    // form-level variables
    var ext = LForms.Util.findObjectInArray(questionnaire.extension, 'url',
      self.fhirExtVariable, 0, true);
    if (ext.length > 0)
      lfData._variableExt = ext;
  };


  /**
   * Extract contained VS (if any) from the given questionnaire resource object.
   * @param questionnaire the FHIR questionnaire resource object
   * @return when there are contained value sets, returns a hash from the ValueSet url to the answers
   *         options object, which, in turn, is a hash with 4 entries:
   *         - "answers" is the list of LF answers converted from the value set.
   *         - "systems" is the list of code systems for each answer item; and
   *         - "isSameCodeSystem" is a boolean flag, true IFF the code systems for all answers in the list are the same.
   *         - "hasAnswerCodeSystems" is a boolean flag, true IFF at least one answer has code system.
   *         returns undefined if no contained value set is present.
   * @private
   */
  self._extractContainedVS = function (questionnaire) {
    var answersVS;

    if(questionnaire.contained && questionnaire.contained.length > 0) {
      answersVS = {};
      questionnaire.contained.forEach(function (vs) {
        if(vs.resourceType === 'ValueSet' && vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
          var lfVS = answersVS[vs.url] = {answers: [], systems:[]};
          var theCodeSystem = '#placeholder#'; // the code system if all answers have the same code systems, or "null"
          vs.expansion.contains.forEach(function (vsItem) {
            var answer = {code: vsItem.code, text: vsItem.display};
            var ordExt = LForms.Util.findObjectInArray(vsItem.extension, 'url',
              "http://hl7.org/fhir/StructureDefinition/valueset-ordinalValue");
            if(ordExt) {
              answer.score = ordExt.valueDecimal;
            }
            lfVS.answers.push(answer);
            lfVS.systems.push(vsItem.system);

            if(theCodeSystem === '#placeholder#') {
              theCodeSystem = vsItem.system;
            }
            else if(theCodeSystem !== vsItem.system) {
              theCodeSystem = null;
            }
            if(vsItem.system) {
              lfVS.hasAnswerCodeSystems = true;
            }
          });

          // set a flag if all the answers have identical code system, e.g., for use in LF item.answerCodeSystem
          if(theCodeSystem && theCodeSystem !== '#placeholder#' ) {
            lfVS.isSameCodeSystem = true;
          }
        }
      });
    }

    return answersVS;
  };


  /**
   * Process questionnaire item recursively
   *
   * @param qItem - item object as defined in FHIR Questionnaire.
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @returns {{}} - Converted 'item' field object as defined by LForms definition.
   * @private
   */
  self._processQuestionnaireItem = function (qItem, containedVS, linkIdItemMap) {
    var targetItem = {};
    targetItem.question = qItem.text;
    //A lot of parsing depends on data type. Extract it first.
    self._processDataType(targetItem, qItem);
    self._processCodeAndLinkId(targetItem, qItem);
    self._processDisplayItemCode(targetItem, qItem);
    self._processEditable(targetItem, qItem);
    self._processQuestionCardinality(targetItem, qItem);
    self._processAnswerCardinality(targetItem, qItem);
    self._processDisplayControl(targetItem, qItem);
    self._processRestrictions(targetItem, qItem);
    self._processCodingInstructions(targetItem, qItem);
    self._processHiddenItem(targetItem, qItem);
    self._processUnitList(targetItem, qItem);
    self._processAnswers(targetItem, qItem, containedVS);
    self._processDefaultAnswer(targetItem, qItem);
    self._processExternallyDefined(targetItem, qItem);
    self._processSkipLogic(targetItem, qItem, linkIdItemMap);
    self._processCopiedItemExtensions(targetItem, qItem);

    self.copyFields(qItem, targetItem, self.itemLevelIgnoredFields);
    if (Array.isArray(qItem.item)) {
      targetItem.items = [];
      for (var i=0; i < qItem.item.length; i++) {
        var newItem = self._processQuestionnaireItem(qItem.item[i], containedVS, linkIdItemMap);
        targetItem.items.push(newItem);
      }
    }

    return targetItem;
  };

  // A map of FHIR extensions involving Expressions to the property names on
  // which they will be stored in LFormsData, and a boolean indicating whether
  // more than one extension of the type is permitted.
  var copiedExtensions = {
    "http://hl7.org/fhir/StructureDefinition/questionnaire-calculatedExpression":
      ["_calculatedExprExt", false],
    "http://hl7.org/fhir/StructureDefinition/questionnaire-initialExpression":
      ["_initialExprExt", false],
    "http://hl7.org/fhir/StructureDefinition/questionnaire-observationLinkPeriod":
      ["_obsLinkPeriodExt", false],
  };
  copiedExtensions[self.fhirExtVariable] = ["_variableExt", true];
  var copiedExtURLs = Object.keys(copiedExtensions);

  /**
   *  Some extensions are simply copied over to the LForms data structure.
   *  This copies those extensions from qItem to lfItem if they exist, and
   *  LForms can support them.
   * @param qItem an item from the Questionnaire resource
   * @param lfItem an item from the LFormsData structure
   */
  self._processCopiedItemExtensions = function (lfItem, qItem) {
    for (var i=0, len=copiedExtURLs.length; i<len; ++i) {
      var url = copiedExtURLs[i];
      var extInfo = copiedExtensions[url];
      var prop = extInfo[0], multiple = extInfo[1];
      var ext = LForms.Util.findObjectInArray(qItem.extension, 'url', url, 0, multiple);
      if (!multiple || ext.length > 0)
        lfItem[prop] = ext;
    }
  };


  /**
   * Parse questionnaire object for answer cardinality
   *
   * @param lfItem {object} - LForms item object to assign answer cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processAnswerCardinality = function (lfItem, qItem) {
    if(qItem.required) {
      lfItem.answerCardinality = {min: '1'};
    }
    else {
      lfItem.answerCardinality = {min: '0'};
    }

    if(self._hasMultipleAnswers(qItem)) {
      lfItem.answerCardinality.max = '*';
    }
    else {
      lfItem.answerCardinality.max = '1';
    }
  };


  /**
   * Parse questionnaire object for skip logic information
   *
   * @param lfItem {object} - LForms item object to assign the skip logic
   * @param qItem {object} - Questionnaire item object
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @private
   */
  self._processSkipLogic = function (lfItem, qItem, linkIdItemMap) {
    if(qItem.enableWhen) {
      lfItem.skipLogic = {conditions: [], action: 'show'};
      // See if it satisfies range. Range in lforms is a single condition, in FHIR it is done with two conditions
      var rangeCondition = _potentialRange(qItem, linkIdItemMap);
      if(rangeCondition) {
        lfItem.skipLogic.conditions.push(rangeCondition);
      }
      else {
        for(var i = 0; i < qItem.enableWhen.length; i++) {
          var source = self._getSourceCodeUsingLinkId(linkIdItemMap, qItem.enableWhen[i].question);
          var condition = {source: source.questionCode};
          var answer = self._getFHIRValueWithPrefixKey(qItem.enableWhen[i], /^answer/);
          var opMapping = null;
          if(source.dataType === 'CWE' || source.dataType === 'CNE') {
            condition.trigger = {code: answer.code};
          }
          else if(source.dataType === 'QTY') {
            opMapping = self._operatorMapping[qItem.enableWhen[i].operator];
            if(opMapping) {
              condition.trigger = {};
              condition.trigger[opMapping] = answer.value;
            }
          }
          else {
            opMapping = self._operatorMapping[qItem.enableWhen[i].operator];
            if(opMapping) {
              condition.trigger = {};
              condition.trigger[opMapping] = answer;
            }
          }
          lfItem.skipLogic.conditions.push(condition);
        }
        if(qItem.enableBehavior) {
          lfItem.skipLogic.logic = qItem.enableBehavior.toUpperCase();
        }
      }
    }
  };


  /**
   * See if the skip logic condition belongs to range. If yes, returns a lforms condition, otherwise null;
   *
   * @param qItem - Questionnaire item
   * @param sourceQuestionnaire - Questionnaire resource to look for skip logic source item.
   * @returns {*} - Lforms skip logic condition object.
   * @private
   */
  function _potentialRange(qItem, linkIdItemMap) {
    var ret = null;
    // Two conditions based on same source with enableBehavior of all implies range.
    if(qItem && qItem.enableWhen && qItem.enableWhen.length === 2 && qItem.enableBehavior === 'all' &&
       qItem.enableWhen[0].question === qItem.enableWhen[1].question) {
      var source = self._getSourceCodeUsingLinkId(linkIdItemMap, qItem.enableWhen[0].question);
      if (source.dataType === 'REAL' || source.dataType === 'INT' || source.dataType === 'DT' ||
        source.dataType === 'DTM' || source.dataType === 'QTY') {
        ret = {source: source.questionCode};
        ret.trigger = {};
        var answer0 = self._getFHIRValueWithPrefixKey(qItem.enableWhen[0], /^answer/);
        var answer1 = self._getFHIRValueWithPrefixKey(qItem.enableWhen[1], /^answer/);

        if(source.dataType === 'QTY') {
          ret.trigger[self._operatorMapping[qItem.enableWhen[0].operator]] = answer0.value;
          ret.trigger[self._operatorMapping[qItem.enableWhen[1].operator]] = answer1.value;
        }
        else {
          ret.trigger[self._operatorMapping[qItem.enableWhen[0].operator]] = answer0;
          ret.trigger[self._operatorMapping[qItem.enableWhen[1].operator]] = answer1;
        }
      }
    }
    return ret;
  }


  /**
   * Parse Questionnaire item for externallyDefined url
   *
   * @param lfItem - LForms item object to assign externallyDefined
   * @param qItem - Questionnaire item object
   * @private
   */
  self._processExternallyDefined = function (lfItem, qItem) {
    var externallyDefined = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlExternallyDefined);
    if (externallyDefined && externallyDefined.valueUri) {
      lfItem.externallyDefined = externallyDefined.valueUri;
    }
  };


  /**
   * Parse questionnaire item for "hidden" extension
   *
   * @param lfItem {object} - LForms item object to be assigned the _isHidden flag if the item is to be hidden.
   * @param qItem {object} - Questionnaire item object
   * @private
   * @return true if the item is hidden or if its ancestor is hidden, false otherwise
   */
  self._processHiddenItem = function(lfItem, qItem) {
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlHidden);
    if(ci) {
      lfItem._isHidden = typeof ci.valueBoolean === 'boolean'? ci.valueBoolean: ci.valueBoolean === 'true';
    }
    return lfItem._isHidden;
  };


  /**
   * Parse questionnaire item for answers list
   *
   * @param lfItem {object} - LForms item object to assign answer list
   * @param qItem {object} - Questionnaire item object
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @private
   */
  self._processAnswers = function (lfItem, qItem, containedVS) {
    if(qItem.answerOption) {
      lfItem.answers = [];
      for(var i = 0; i < qItem.answerOption.length; i++) {
        var answer = {};
        var option = qItem.answerOption[i];
        var label = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionPrefix);
        if(label) {
          answer.label = label.valueString;
        }
        var score = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionScore);
        // Look for argonaut extension.
        score = !score ? LForms.Util.findObjectInArray(option.extension, 'url', self.argonautExtUrlExtensionScore) : score;
        if(score) {
          answer.score = score.valueDecimal.toString();
        }
        var optionKey = Object.keys(option).filter(function(key) {return (key.indexOf('value') === 0);});
        if(optionKey && optionKey.length > 0) {
          if(optionKey[0] === 'valueCoding') { // Only one value[x] is expected
            if(option[optionKey[0]].code    !== undefined) answer.code = option[optionKey[0]].code;
            if(option[optionKey[0]].display !== undefined) answer.text = option[optionKey[0]].display;
            // TBD- Lforms has answer code system at item level, expects all options to have one code system!
            if(option[optionKey[0]].system  !== undefined) {
              answer.codeSystem = option[optionKey[0]].system;
              lfItem.answerCodeSystem = answer.codeSystem; // TBD - one day this should go away
            }
          }
          else {
            answer.text = option[optionKey[0]].toString();
          }
        }

        lfItem.answers.push(answer);
      }
    }
    else if(qItem.answerValueSet && containedVS) {
      var vs = containedVS[qItem.answerValueSet];
      if(vs) {
        lfItem.answers = vs.answers;
        if(vs.isSameCodeSystem) {
          lfItem.answerCodeSystem = self._toLfCodeSystem(vs.systems[0]);
        }
        else if(vs.hasAnswerCodeSystems) {
          console.log('WARNING (unsupported feature): answers for item.linkId=%s have different code systems: %s',
                      lfItem.linkId, vs.systems.join(', '));
        }
      }
    }
  };


  /**
   * Parse questionnaire item for editable
   *
   * @param lfItem {object} - LForms item object to assign editable
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processEditable = function (lfItem, qItem) {
    if (qItem.readOnly) {
      lfItem.editable = '0';
    }
  };


  /**
   * Parse questionnaire item for default answer
   *
   * @param lfItem {object} - LForms item object to assign default answer
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDefaultAnswer = function (lfItem, qItem) {

    if(!qItem.initial) {
      return;
    }

    var vals = [];
    qItem.initial.forEach(function(elem) {
      var answer = null;
      var val = elem.valueCoding;
      if (val)
        val._type = 'Coding';
      else
       val = self._getFHIRValueWithPrefixKey(elem, /^value/);
      if (val)
        vals.push(val);
    });
    if (vals.length > 0)
      this._processFHIRValues(lfItem, vals, true);
  };


  /**
   * Parse questionnaire item for units list
   *
   * @param lfItem {object} - LForms item object to assign units
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processUnitList = function (lfItem, qItem) {

    var lformsUnits = [];
    var lformsDefaultUnit = null;
    var unitOption = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlUnitOption, 0, true);
    if(unitOption && unitOption.length > 0) {
      for(var i = 0; i < unitOption.length; i++) {
        var coding = unitOption[i].valueCoding;
        var lUnit = {
          name: coding.display,
          code: coding.code,
          system: coding.system
        };
        lformsUnits.push(lUnit);
      }
    }

    var unit = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlUnit);
    if(unit) {
      lformsDefaultUnit = LForms.Util.findItem(lformsUnits, 'name', unit.valueCoding.code);
      // If this unit is already in the list, set its default flag, otherwise create new
      if(lformsDefaultUnit) {
        lformsDefaultUnit.default = true;
      }
      else {
        lformsDefaultUnit = {
          name: unit.valueCoding.display,
          code: unit.valueCoding.code,
          system: unit.valueCoding.system,
          default: true
        };
        lformsUnits.push(lformsDefaultUnit);
      }
    }
    else if(qItem.initial && qItem.initial.length > 0 && qItem.initial[0].valueQuantity && qItem.initial[0].valueQuantity.unit) {
      lformsDefaultUnit = LForms.Util.findItem(lformsUnits, 'name', qItem.initial[0].valueQuantity.unit);
      if(lformsDefaultUnit) {
        lformsDefaultUnit.default = true;
      }
      else {
        lformsDefaultUnit = {
          name: qItem.initial[0].valueQuantity.unit,
          code: qItem.initial[0].valueQuantity.code,
          system: qItem.initial[0].valueQuantity.system,
          default: true
        };
        lformsUnits.push(lformsDefaultUnit);
      }
    }

    if(lformsUnits.length > 0) {
      if (!lformsDefaultUnit) {
        lformsUnits[0].default = true;
      }
      lfItem.units = lformsUnits;
    }
  };


  /**
   * Parse 'linkId' for the LForms questionCode of a 'display' item, which does not have a 'code'
   *
   * @param lfItem {object} - LForms item object to assign questionCode
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDisplayItemCode = function (lfItem, qItem) {
    if (qItem.type === "display" && qItem.linkId) {
      var codes = qItem.linkId.split("/");
      if (codes && codes[codes.length-1]) {
        lfItem.questionCode = codes[codes.length-1];
      }
    }
  };


  /**
   * Parse questionnaire item for question cardinality
   *
   * @param lfItem {object} - LForms item object to assign question cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processQuestionCardinality = function (lfItem, qItem) {
    var min = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMin);
    if(min) {
      lfItem.questionCardinality = {min: min.valueInteger.toString()};
      var max = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMax);
      if(max) {
        lfItem.questionCardinality.max = min.valueInteger.toString();
      }
      else if(qItem.repeats) {
        lfItem.questionCardinality.max = '*';
      }
    }
    else if (qItem.repeats) {
      lfItem.questionCardinality = {min: "1", max: "*"};
    }
    else if (qItem.required) {
      lfItem.questionCardinality = {min: "1", max: "1"};
    }
  };


  /**
   * Parse questionnaire item for coding instructions
   *
   * @param lfItem {object} - LForms item object to assign coding instructions
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processCodingInstructions = function (lfItem, qItem) {
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCodingInstructions);
    if(ci) {
      lfItem.codingInstructions = ci.valueCodeableConcept.coding[0].display;
      lfItem.codingInstructionsFormat = ci.valueCodeableConcept.coding[0].code;
    }
  };


  /**
   * Parse questionnaire item for restrictions
   *
   * @param lfItem {object} - LForms item object to assign restrictions
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processRestrictions = function (lfItem, qItem) {
    var restrictions = {};
    if(typeof qItem.maxLength !== 'undefined') {
      restrictions['maxLength'] = qItem.maxLength.toString();
    }

    for(var i = 0; i < self.fhirExtUrlRestrictionArray.length; i++) {
      var restriction = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlRestrictionArray[i]);
      var val = self._getFHIRValueWithPrefixKey(restriction, /^value/);
      if (val) {

        if(restriction.url.match(/minValue$/)) {
          // TODO -
          // There is no distinction between inclusive and exclusive.
          // Lforms looses this information when converting back and forth.
          restrictions['minInclusive'] = val;
        }
        else if(restriction.url.match(/maxValue$/)) {
          restrictions['maxInclusive'] = val;
        }
        else if(restriction.url.match(/minLength$/)) {
          restrictions['minLength'] = val;
        }
        else if(restriction.url.match(/regex$/)) {
          restrictions['pattern'] = val;
        }
      }
    }

    if(!jQuery.isEmptyObject(restrictions)) {
      lfItem.restrictions = restrictions;
    }
  };


  /**
   * Parse questionnaire item for data type
   *
   * @param lfItem {object} - LForms item object to assign data type
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDataType = function (lfItem, qItem) {
    var type = self._getDataType(qItem);
    if(type === 'SECTION' || type === 'TITLE') {
      lfItem.header = true;
    }
    lfItem.dataType = type;
  };


  // Quesitonnaire Response Import
  self._mergeQR = {

    /**
     * Get structure information of a QuestionnaireResponse instance
     * @param qr a QuestionnaireResponse instance
     * @returns {{}} a QuestionnaireResponse data structure object
     * @private
     */
    _getQRStructure : function(qr) {
      var qrInfo = {
        qrItemsInfo: []
      };
      if (qr) {
        this._checkQRItems(qrInfo, qr);
      }
      return qrInfo;
    },


    /**
     * Get structural info of a QuestionnaireResponse by going though each level of items
     * @param parentQRItemInfo the structural info of a parent item
     * @param parentItem a parent item in a QuestionnaireResponse object
     * @private
     */
    _checkQRItems : function(parentQRItemInfo, parentQRItem) {

      var qrItemsInfo = [];
      var repeatingItemProcessed = {};

      if (parentQRItem && parentQRItem.item) {
        for (var i=0, iLen=parentQRItem.item.length; i<iLen; i++) {
          var item = parentQRItem.item[i];
          var linkId = item.linkId; //code is not necessary included in linkId
          // first item that has the same code, either repeating or non-repeating
          if (!repeatingItemProcessed[linkId]) {
            var repeatingInfo = this._findTotalRepeatingNum(linkId, parentQRItem);

            // create structure info for the item
            var repeatingItems = repeatingInfo.repeatingItems;
            for (var j=0, jLen=repeatingItems.length; j<jLen; j++) {
              var qrItemInfo = {
                linkId: linkId,
                item: repeatingItems[j],
                index: j,
                total: repeatingInfo.total
              };
              // check observation instances in the sub level
              this._checkQRItems(qrItemInfo, repeatingItems[j]);
              qrItemsInfo.push(qrItemInfo);
            }
            repeatingItemProcessed[linkId] = true;
          }
        }
        parentQRItemInfo.qrItemsInfo = qrItemsInfo;
      }
    },


    /**
     * Find the number of the repeating items that have the same code
     * @param linkId an item's linkId
     * @param parentQRItem a parent item in a QuestionnaireResponse object
     * @returns a structural info object for a repeating item
     * @private
     */
    _findTotalRepeatingNum : function(linkId, parentQRItem) {

      var total = 0;
      var repeatingItems = [];
      for (var i=0, iLen=parentQRItem.item.length; i<iLen; i++) {
        var item = parentQRItem.item[i];
        if (linkId === item.linkId) {
          repeatingItems.push(item);
          if (Array.isArray(item.answer)) {
            total += item.answer.length; // answers for repeating questions and repeating answers
          }
          else {
            total += 1;
          }
        }
      }

      return {
        total: total,
        repeatingItems: repeatingItems
      };
    },


    /**
     * Add repeating items into LForms definition data object
     * @param parentItem a parent item
     * @param linkId linkId of a repeating item
     * @param total total number of the repeating item with the same code
     * @private
     */
    _addRepeatingItems : function(parentItem, linkId, total) {
      // find the first (and the only one) item
      var item = null;
      if (parentItem.items) {
        for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
          if (linkId === parentItem.items[i].linkId) {
            item = parentItem.items[i];
            break;
          }
        }
        // insert new items
        if (item) {
          while(total > 1) {
            var newItem = angular.copy(item);
            parentItem.items.splice(i, 0, newItem);
            total -= 1;
          }
        }
      }
    },


    /**
     * Find a matching repeating item by item code and the index in the items array
     * @param parentItem a parent item
     * @param linkId linkId of a repeating (or non-repeating) item
     * @param index index of the item in the sub item array of the parent item
     * @returns {{}} a matching item
     * @private
     */
    _findTheMatchingItemByLinkIdAndIndex : function(parentItem, linkId, index) {
      var item = null;
      var idx = 0;
      if (parentItem.items) {
        for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
          if (linkId === parentItem.items[i].linkId) {
            if (idx === index) {
              item = parentItem.items[i];
              break;
            }
            else {
              idx += 1;
            }
          }
        }
      }
      return item;
    },


    /**
     * Find a matching repeating item by item code alone
     * When used on the LForms definition data object, there is no repeating items yet.
     * @param parentItem a parent item
     * @param linkId linkId of an item
     * @returns {{}} a matching item
     * @private
     */
    _findTheMatchingItemByLinkId : function(parentItem, linkId) {
      var item = null;
      if (parentItem.items) {
        for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
          if (linkId === parentItem.items[i].linkId) {
            item = parentItem.items[i];
            break;
          }
        }
      }
      return item;
    },


    /**
     * Set value and units on a LForms item
     * @param linkId an item's linkId
     * @param answer value for the item
     * @param item a LForms item
     * @private
     */
    _setupItemValueAndUnit : function(linkId, answer, item) {

      if (item && linkId === item.linkId && (item.dataType !== 'SECTION' && item.dataType !== 'TITLE')) {
        var dataType = item.dataType;

        // any one has a unit must be a numerical type, let use REAL for now.
        // dataType conversion should be handled when panel data are added to lforms-service.
        if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
          item.dataType = dataType = "REAL";
        }

        var qrValue = answer[0];

        switch (dataType) {
          case "INT":
            if (qrValue.valueQuantity) {
              item.value = qrValue.valueQuantity.value;
              if(qrValue.valueQuantity.code) {
                item.unit = {name: qrValue.valueQuantity.code};
              }
            }
            else if (qrValue.valueInteger) {
              item.value = qrValue.valueInteger;
            }
            break;
          case "REAL":
          case "QTY":
            if (qrValue.valueQuantity) {
              item.value = qrValue.valueQuantity.value;
              if(qrValue.valueQuantity.code) {
                item.unit = {name: qrValue.valueQuantity.code};
              }
            }
            else if (qrValue.valueDecimal) {
              item.value = qrValue.valueDecimal;
            }
            break;
          case "DT":
            item.value = qrValue.valueDateTime;
            break;
          case "CNE":
          case "CWE":
            if (ns._answerRepeats(item)) {
              var value = [];
              for (var j=0,jLen=answer.length; j<jLen; j++) {
                var coding = answer[j];
                value.push({
                  "code": coding.valueCoding.code,
                  "text": coding.valueCoding.display
                });
              }
              item.value = value;
            }
            else {
              item.value = {
                "code": qrValue.valueCoding.code,
                "text": qrValue.valueCoding.display
              };
            }
            break;
          case "ST":
          case "TX":
            item.value = qrValue.valueString;
            break;
          case "SECTION":
          case "TITLE":
          case "":
            // do nothing
            break;
          default:
            item.value = qrValue.valueString;
        }
      }
    }
  }

}

export default addSDCImportFns;
