/**
 * A package to handle conversion from FHIR SDC (STU2) Questionnaire to LForms
 * STU2 Ballot:
 * http://hl7.org/fhir/us/sdc/sdc-questionnaire.html
 * http://hl7.org/fhir/us/sdc/sdc-questionnaireresponse.html
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

  self.fhirExtUrlOptionScore = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionScore";


  /**
   * Parse form level fields from FHIR questionnaire and assign to LForms object.
   *
   * @param lfData - LForms object to assign the extracted fields
   * @param questionnaire - FHIR questionnaire resource object to parse for the fields.
   * @private
   */
  self._processFormLevelFields = function (lfData, questionnaire) {
    self.copyFields(questionnaire, lfData, self.formLevelFields);
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
  };

  /**
   * Extract contained VS (if any) from the given questionnaire resource object.
   * @param questionnaire the FHIR questionnaire resource object
   * @return when there are contained value sets, returns a hash from "#<ValueSet.id>" (the character "#"
   *         followed by the ValueSet id) to the answers options object, which, in turn, is a hash with 4 entries:
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
      questionnaire.contained.forEach(function(vs) {
        if(vs.resourceType === 'ValueSet' && vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
          var lfVS = {answers: [], systems:[]};
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

          // support both id and url based lookup. STU3 reference is quite vague.
          if(vs.id !== undefined) {
            answersVS['#' + vs.id] = lfVS;
          }
          if(vs.url !== undefined) {
            answersVS[vs.url] = lfVS;
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
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @returns {{}} - Converted 'item' field object as defined by LForms definition.
   * @private
   */
  self._processQuestionnaireItem = function (qItem, containedVS, linkIdItemMap) {
    var targetItem = {};
    targetItem.question = qItem.text;
    //A lot of parsing depends on data type. Extract it first.
    self._processDataType(targetItem, qItem);
    self._processCodeAndLinkId(targetItem, qItem);
    _processDisplayItemCode(targetItem, qItem);
    _processEditable(targetItem, qItem);
    _processQuestionCardinality(targetItem, qItem);
    _processAnswerCardinality(targetItem, qItem);
    self._processDisplayControl(targetItem, qItem);
    _processRestrictions(targetItem, qItem);
    _processCodingInstructions(targetItem, qItem);
    self._processHiddenItem(targetItem, qItem);
    _processUnitList(targetItem, qItem);
    _processAnswers(targetItem, qItem, containedVS);
    self._processDefaultAnswer(targetItem, qItem);
    _processExternallyDefined(targetItem, qItem);
    _processSkipLogic(targetItem, qItem, linkIdItemMap);
    _processCalculatedValue(targetItem, qItem);

    if (Array.isArray(qItem.item)) {
      targetItem.items = [];
      for (var i=0; i < qItem.item.length; i++) {
        var newItem = self._processQuestionnaireItem(qItem.item[i], containedVS, linkIdItemMap);
        targetItem.items.push(newItem);
      }
    }

    return targetItem;
  };


  /**
   *  Copies the calculated value expression from qItem to lfItem if it exists,
   *  and if it is a FHIRPath expression, which is the only type we support.
   */
  function _processCalculatedValue(lfItem, qItem) {
    var calcExt = LForms.Util.findObjectInArray(qItem.extension, 'url',
      "http://hl7.org/fhir/StructureDefinition/questionnaire-calculatedExpression");
    if (calcExt && calcExt.valueExpression.language == "text/fhirpath") {
      lfItem._calculatedExprExt = calcExt;
    }
  }


  /**
   * Parse questionnaire object for answer cardinality
   *
   * @param lfItem {object} - LForms item object to assign answer cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processAnswerCardinality(lfItem, qItem) {
    if(qItem.required) {
      lfItem.answerCardinality = {min: '1'};
    }
    else {
      lfItem.answerCardinality = {min: '0'};
    }

    var answerRepeats = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlAnswerRepeats);
    if(answerRepeats && answerRepeats.valueBoolean) {
      lfItem.answerCardinality.max = '*';
    }
    else {
      lfItem.answerCardinality.max = '1';
    }
  }


  /**
   * Parse questionnaire object for skip logic information
   *
   * @param lfItem {object} - LForms item object to assign the skip logic
   * @param qItem {object} - Questionnaire item object
   * @param sourceQuestionnaire - Questionnaire resource object. This is to provide top level
   *                              item to navigate the tree for skip logic source items.
   * @private
   */
  function _processSkipLogic(lfItem, qItem, linkIdItemMap) {
    if(qItem.enableWhen) {
      lfItem.skipLogic = {conditions: [], action: 'show'};
      for(var i = 0; i < qItem.enableWhen.length; i++) {
        var source = self._getSourceCodeUsingLinkId(linkIdItemMap, qItem.enableWhen[i].question);
        var condition = {source: source.questionCode};
        var answer = self._getFHIRValueWithPrefixKey(qItem.enableWhen[i], /^answer/);
        if(source.dataType === 'CWE' || source.dataType === 'CNE') {
          condition.trigger = {code: answer.code};
        }
        else if(source.dataType === 'QTY') {
            condition.trigger = {value: answer.value};
        }
        else {
          condition.trigger = {value: answer};
        }
        lfItem.skipLogic.conditions.push(condition);
      }
    }
  }


  /**
   * Parse Questionnaire item for externallyDefined url
   *
   * @param lfItem - LForms item object to assign externallyDefined
   * @param qItem - Questionnaire item object
   * @private
   */
  function _processExternallyDefined(lfItem, qItem) {
    var externallyDefined = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlExternallyDefined);
    if (externallyDefined && externallyDefined.valueUri) {
      lfItem.externallyDefined = externallyDefined.valueUri;
    }
  }


  /**
   * Parse questionnaire item for "hidden" extension
   *
   * @param lfItem {object} - LForms item object to be assigned the _isHidden flag if the item is to be hidden.
   * @param qItem {object} - Questionnaire item object
   * @private
   * @return true if the item is hidden or if its ancestor is hidden, false otherwise
   */
  self._processHiddenItem = function (lfItem, qItem) {
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
  function _processAnswers(lfItem, qItem, containedVS) {
    if(qItem.option) {
      lfItem.answers = [];
      for(var i = 0; i < qItem.option.length; i++) {
        var answer = {};
        var option = qItem.option[i];
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
    else if(qItem.options && containedVS) {
      var vs = containedVS[qItem.options.reference];
      if(vs) {
        lfItem.answers = vs.answers;
        if(vs.isSameCodeSystem) {
          lfItem.answerCodeSystem = self._toLfCodeSystem(vs.systems[0]);
        }
        else if(vs.hasAnswerCodeSystems) {
          console.log('WARNING: unable to handle different answer code systems within a question (ignored): %s',
                      vs.systems.join(', '));
        }
      }
    }
  }



  /**
   * Parse questionnaire item for editable
   *
   * @param lfItem {object} - LForms item object to assign editable
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processEditable(lfItem, qItem) {
    if (qItem.readOnly) {
      lfItem.editable = '0';
    }
  }


  /**
   * Parse questionnaire item for default answer
   *
   * @param lfItem {object} - LForms item object to assign default answer
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDefaultAnswer = function (lfItem, qItem) {

    var val = self._getFHIRValueWithPrefixKey(qItem, /^initial/);
    if (val) {
      this._processFHIRValues(lfItem, [val], true);
    }
  };


  /**
   * Parse questionnaire item for units list
   *
   * @param lfItem {object} - LForms item object to assign units
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processUnitList(lfItem, qItem) {

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
    else if(qItem.initialQuantity && qItem.initialQuantity.unit) {
      lformsDefaultUnit = LForms.Util.findItem(lformsUnits, 'name', qItem.initialQuantity.unit);
      if(lformsDefaultUnit) {
        lformsDefaultUnit.default = true;
      }
      else {
        lformsDefaultUnit = {
          name: qItem.initialQuantity.unit,
          code: qItem.initialQuantity.code,
          system: qItem.initialQuantity.system,
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
  }


  /**
   * Parse 'linkId' for the LForms questionCode of a 'display' item, which does not have a 'code'
   *
   * @param lfItem {object} - LForms item object to assign questionCode
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processDisplayItemCode(lfItem, qItem) {
    if (qItem.type === "display" && qItem.linkId) {
      var codes = qItem.linkId.split("/");
      if (codes && codes[codes.length-1]) {
        lfItem.questionCode = codes[codes.length-1];
      }
    }
  }


  /**
   * Parse questionnaire item for question cardinality
   *
   * @param lfItem {object} - LForms item object to assign question cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processQuestionCardinality(lfItem, qItem) {
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
  }


  /**
   * Parse questionnaire item for coding instructions
   *
   * @param lfItem {object} - LForms item object to assign coding instructions
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processCodingInstructions(lfItem, qItem) {
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCodingInstructions);
    if(ci) {
      lfItem.codingInstructions = ci.valueCodeableConcept.coding[0].display;
      lfItem.codingInstructionsFormat = ci.valueCodeableConcept.coding[0].code;
    }
  }


  /**
   * Parse questionnaire item for restrictions
   *
   * @param lfItem {object} - LForms item object to assign restrictions
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _processRestrictions (lfItem, qItem) {
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
  }


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



  // QuesitonnaireResponse Import
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
     * @param linkId code of a repeating item
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
