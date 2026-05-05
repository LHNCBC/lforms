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
  self.fhirExtUrlValueSetScoreOrdinalValue = "http://hl7.org/fhir/StructureDefinition/ordinalValue";
  self.fhirExtUrlValueSetScoreItemWeight = "http://hl7.org/fhir/StructureDefinition/itemWeight";
  self.fhirExtUrlValueSetExpansionPropertyBackport =
    "http://hl7.org/fhir/5.0/StructureDefinition/extension-ValueSet.expansion.property";
  self.fhirExtUrlValueSetExpansionContainsPropertyBackport =
    "http://hl7.org/fhir/5.0/StructureDefinition/extension-ValueSet.expansion.contains.property";


  /**
   * Extract contained VS (if any) from the given questionnaire resource object.
   * @param questionnaire the FHIR questionnaire resource object
   * @return when there are contained value sets, returns a hash from the ValueSet url to the answers
   *         options object, which, in turn, is a hash with 4 entries:
   *         - "answers" is the list of LF answers converted from the value set.
   *         - "systems" is the list of code systems for each answer item; and
   *         returns undefined if no contained value set is present.
   * @private
   */
  self._extractContainedVS = function (questionnaire) {
    var answersVS;

    if(questionnaire.contained && questionnaire.contained.length > 0) {
      answersVS = {};
      questionnaire.contained.forEach(function (vs) {
        if(vs.resourceType === 'ValueSet') {
          var answers = self.answersFromVS(vs);
          if (answers) {
            // Support both id and url based lookup - we are only supporting our non-standard url approach
            // for backward-compatibility with previous LForms versions. For more details on FHIR contained
            // resource references, please see "http://hl7.org/fhir/references.html#canonical-fragments"
            var lfVS = {answers: answers};
            if(vs.id) {
              answersVS['#' + vs.id] = lfVS;
            }
            if(vs.url) {
              answersVS[vs.url] = lfVS;
            }
          }
        }
      });
    }

    return answersVS;
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
      for (var i = 0; i < qItem.enableWhen.length; i++) {
        if (!qItem.enableWhen[i].question) {
          throw new Error("Question with linkId '" + qItem.linkId +
            "' contains enableWhen but is missing the enableWhen.question field.");
        }
        if (!linkIdItemMap[qItem.enableWhen[i].question]) {
          throw new Error("Question with linkId '" + qItem.linkId +
            "' contains enableWhen pointing to a question with linkId '" +
            qItem.enableWhen[i].question + "' that does not exist.")
        }
        var dataType = self._getDataType(linkIdItemMap[qItem.enableWhen[i].question]);
        var condition = {source: qItem.enableWhen[i].question, trigger: {}};
        var answer = self._getFHIRValueWithPrefixKey(qItem.enableWhen[i], /^answer/);
        var opMapping = self._operatorMapping[qItem.enableWhen[i].operator];
        if (!opMapping) {
          throw new Error('Unable to map FHIR enableWhen operator: ' + qItem.enableWhen[i].operator);
        }

        if (opMapping === 'exists') {
          condition.trigger.exists = answer; // boolean value here regardless of data type
        } else if (dataType === 'CODING') {
          condition.trigger[opMapping] = self._copyTriggerCoding(answer, null, false);
        } else if (dataType === 'QTY') {
          condition.trigger[opMapping] = answer.value;
        } else {
          condition.trigger[opMapping] = answer;
        }
        lfItem.skipLogic.conditions.push(condition);
      }
      if(qItem.enableBehavior) {
        lfItem.skipLogic.logic = qItem.enableBehavior.toUpperCase();
      }
    }
  };


  /**
   * Build a map from ValueSet.expansion.property code to uri. For R4/R4B, this
   * also parses the R5 backport extension for ValueSet.expansion.property.
   * @param expansion valueSet.expansion
   * @returns {Object} map from property code to uri
   * @private
   */
  self._buildExpansionPropertyUriByCodeMap = function(expansion) {
    const propertyUriByCode = {};
    (expansion?.property || []).forEach(function(prop) {
      if (prop?.code && prop?.uri) {
        propertyUriByCode[prop.code] = prop.uri;
      }
    });

    (expansion?.extension || []).forEach(function(ext) {
      if (ext?.url !== self.fhirExtUrlValueSetExpansionPropertyBackport || !ext.extension) {
        return;
      }
      const codeExt = LForms.Util.findObjectInArray(ext.extension, 'url', 'code');
      const uriExt = LForms.Util.findObjectInArray(ext.extension, 'url', 'uri');
      if (codeExt?.valueCode && uriExt?.valueUri) {
        propertyUriByCode[codeExt.valueCode] = uriExt.valueUri;
      }
    });

    return propertyUriByCode;
  };


  /**
   * Extract the first value[x] from a FHIR element.
   * @param element a FHIR element object
   * @returns value[x], or undefined
   * @private
   */
  self._extractValueX = function(element) {
    if (!element) {
      return undefined;
    }
    const valueKey = Object.keys(element).find(function(key) {
      return /^value[A-Z]/.test(key);
    });
    return valueKey ? element[valueKey] : undefined;
  };


  /**
   * Convert a value[x] to score number when possible.
   * @param {*} rawValue value from value[x]
   * @returns {number|undefined}
   * @private
   */
  self._toScoreNumber = function(rawValue) {
    if (rawValue === undefined || rawValue === null || rawValue === '') {
      return undefined;
    }
    if (typeof rawValue === 'number') {
      return Number.isFinite(rawValue) ? rawValue : undefined;
    }
    const parsed = parseFloat(rawValue);
    return Number.isFinite(parsed) ? parsed : undefined;
  };


  /**
   * True if a ValueSet property code/uri is score-relevant.
   * @param {string} propertyCode the code from contains.property.code
   * @param {Object} propertyUriByCode map from expansion.property code to uri
   * @returns {boolean}
   * @private
   */
  self._isScoreProperty = function(propertyCode, propertyUriByCode) {
    if (!propertyCode) {
      return false;
    }

    const scoreCodes = ['ordinalValue', 'itemWeight', 'weight'];
    if (scoreCodes.includes(propertyCode)) {
      return true;
    }

    const scoreUris = [
      self.fhirExtUrlValueSetScoreOrdinalValue,
      self.fhirExtUrlValueSetScoreItemWeight,
      "http://hl7.org/fhir/concept-properties#itemWeight"
    ];
    return scoreUris.includes(propertyUriByCode[propertyCode]);
  };


  /**
   * Get score from native R5 ValueSet.expansion.contains.property.
   * @param containsEntry entry in expansion.contains
   * @param propertyUriByCode map from expansion.property code to uri
   * @returns {number|undefined}
   * @private
   */
  self._resolveScoreFromContainsProperty = function(containsEntry, propertyUriByCode) {
    const properties = containsEntry?.property || [];
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      if (!self._isScoreProperty(prop?.code, propertyUriByCode)) {
        continue;
      }
      const score = self._toScoreNumber(self._extractValueX(prop));
      if (score !== undefined) {
        return score;
      }
    }
    return undefined;
  };


  /**
   * Get score from the R4/R4B backport extension for
   * ValueSet.expansion.contains.property.
   * @param containsEntry entry in expansion.contains
   * @param propertyUriByCode map from expansion.property code to uri
   * @returns {number|undefined}
   * @private
   */
  self._resolveScoreFromContainsPropertyBackport = function(containsEntry, propertyUriByCode) {
    const extensions = containsEntry?.extension || [];
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext?.url !== self.fhirExtUrlValueSetExpansionContainsPropertyBackport || !ext.extension) {
        continue;
      }

      const codeExt = LForms.Util.findObjectInArray(ext.extension, 'url', 'code');
      const valueExt = LForms.Util.findObjectInArray(ext.extension, 'url', 'value');
      const propertyCode = codeExt?.valueCode;
      if (!self._isScoreProperty(propertyCode, propertyUriByCode)) {
        continue;
      }

      // For this backport extension, value lives under nested extension[url="value"].
      const score = self._toScoreNumber(self._extractValueX(valueExt));
      if (score !== undefined) {
        return score;
      }
    }
    return undefined;
  };


  /**
   * Deprecated fallback: score from ValueSet.expansion.contains.extension.
   * This is retained for backward compatibility with existing questionnaires.
   * @param containsEntry entry in expansion.contains
   * @returns {number|undefined}
   * @private
   */
  self._resolveLegacyScoreFromContainsExtension = function(containsEntry) {
    const ordExt = LForms.Util.findObjectInArray(containsEntry?.extension, 'url',
      self.fhirExtUrlValueSetScoreOrdinalValue) ||
      LForms.Util.findObjectInArray(containsEntry?.extension, 'url',
        self.fhirExtUrlValueSetScoreItemWeight);
    return self._toScoreNumber(self._extractValueX(ordExt));
  };


  /**
   * Resolve answer.score for a ValueSet expansion concept.
   * Priority:
   * 1) native contains.property
   * 2) R4/R4B backport extension for contains.property
   * 3) deprecated fallback on contains.extension
   * @param valueSet ValueSet resource
   * @param containsEntry entry in valueSet.expansion.contains
   * @returns {number|undefined}
   */
  self.resolveAnswerScore = function(valueSet, containsEntry) {
    const propertyUriByCode = self._buildExpansionPropertyUriByCodeMap(valueSet?.expansion);

    const scoreFromProperty = self._resolveScoreFromContainsProperty(containsEntry, propertyUriByCode);
    if (scoreFromProperty !== undefined) {
      return scoreFromProperty;
    }

    const scoreFromBackport =
      self._resolveScoreFromContainsPropertyBackport(containsEntry, propertyUriByCode);
    if (scoreFromBackport !== undefined) {
      return scoreFromBackport;
    }

    return self._resolveLegacyScoreFromContainsExtension(containsEntry);
  };


  /**
   * Parse questionnaire item for answers list
   *
   * @param lfItem {object} - LForms item object to assign answer list
   * @param qItem {object} - Questionnaire item object
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @param containedImages contained images info, see buildContainedImageMap() for details.
   * @private
   */
  self._processAnswers = function (lfItem, qItem, containedVS, containedImages) {
    if(qItem.answerOption) {
      lfItem.answers = [];
      for(var i = 0; i < qItem.answerOption.length; i++) {
        var answer = {};
        var option = qItem.answerOption[i];

        var optionKey = Object.keys(option).filter(function(key) {return (key.indexOf('value') === 0);});
        if(optionKey && optionKey.length > 0) {
          // For a given answerOption, only one value[x] is expectedOnly one kind of value[x] is expected
          if(optionKey[0] === 'valueCoding') {
            if(option[optionKey[0]].code    !== undefined) answer.code = option[optionKey[0]].code;
            if(option[optionKey[0]].display !== undefined) answer.text = option[optionKey[0]].display;
            // TBD- Lforms has answer code system at item level, expects all options to have one code system!
            if(option[optionKey[0]].system  !== undefined) {
              answer.system = option[optionKey[0]].system;
            }
            if (option[optionKey[0]]._display) {
              answer['obj_valueCoding_display'] = option[optionKey[0]]._display;
              // rendering-xhtml extension under "valueCoding._display".
              const xhtmlFormat = LForms.Util.findObjectInArray(answer['obj_valueCoding_display'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
              if (xhtmlFormat) {
                LForms.Util._internalUtil.setAnswerTextHTML(answer, xhtmlFormat, self._widgetOptions?.allowHTML, containedImages, lfItem);
              } else {
                // rendering-markdown extension under "valueCoding._display".
                const markdownFormat = LForms.Util.findObjectInArray(answer['obj_valueCoding_display'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-markdown");
                if (markdownFormat) {
                  LForms.Util._internalUtil.setAnswerTextMarkdown(answer, markdownFormat);
                }
              }
              // rendering-style extension under "valueCoding._display".
              const renderingStyle = LForms.Util.findObjectInArray(answer['obj_valueCoding_display'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-style");
              if (renderingStyle) {
                answer._obj_CSS = renderingStyle.valueString;
              }
            }
          }
          else if (optionKey[0] === 'valueString' || optionKey[0] === 'valueDate' ||
              optionKey[0] === 'valueTime' ){
            answer.text = option[optionKey[0]];
            if (optionKey[0] === 'valueString' && option._valueString) {
              answer['obj_valueString'] = option._valueString;
              // rendering-xhtml extension under "_valueString".
              const xhtmlFormat = LForms.Util.findObjectInArray(answer['obj_valueString'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
              if (xhtmlFormat) {
                LForms.Util._internalUtil.setAnswerTextHTML(answer, xhtmlFormat, self._widgetOptions?.allowHTML, containedImages, lfItem);
              } else {
                // rendering-markdown extension under "_valueString".
                const markdownFormat = LForms.Util.findObjectInArray(answer['obj_valueString'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-markdown");
                if (markdownFormat) {
                  LForms.Util._internalUtil.setAnswerTextMarkdown(answer, markdownFormat);
                }
              }
            }
            // rendering-style extension under "_valueString", "_valueDate" or "_valueTime".
            if (option[`_${optionKey[0]}`]) {
              answer[`obj_${optionKey[0]}`] = answer[`obj_${optionKey[0]}`] || option[`_${optionKey[0]}`];
              const renderingStyle = LForms.Util.findObjectInArray(answer[`obj_${optionKey[0]}`].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-style");
              if (renderingStyle) {
                answer._obj_CSS = renderingStyle.valueString;
              }
            }
          }
          else if (optionKey[0] === 'valueInteger') {
            answer.text = parseInt(option[optionKey[0]]);
            // rendering-style extension under "_valueIngeter".
            if (option._valueInteger) {
              answer['obj_valueInteger'] = option._valueInteger;
              const renderingStyle = LForms.Util.findObjectInArray(answer['obj_valueInteger'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-style");
              if (renderingStyle) {
                answer._obj_CSS = renderingStyle.valueString;
              }
            }
          }
          else {
            throw new Error('Unable to handle data type in answerOption: ' + optionKey[0]);
          }

          var label = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionPrefix);
          if(label) {
            answer.label = label.valueString;
          }
          // Any of the URLs in self.fhirExtUrlOptionScoreLookup should work on import regardless of the version of FHIR.
          var score = option.extension?.find(ext => self.fhirExtUrlOptionScoreUrlSet.has(ext.url));
          // Look for argonaut extension.
          score = !score ? LForms.Util.findObjectInArray(option.extension, 'url', self.argonautExtUrlExtensionScore) : score;
          if(score) {
            answer.score = parseFloat(score.valueDecimal);
            answer._scoreExtUrl = score.url;
          }

        }
        lfItem.answers.push(answer);
      }
    }
    else if (qItem.answerValueSet) {
      if (containedVS)
        var vs = containedVS[qItem.answerValueSet];
      if(vs && vs.answers) { // contained ValueSet with an expansion
        lfItem.answers = vs.answers;
        // To keep answerValueSet property during export.
        lfItem._answerValueSet = qItem.answerValueSet;
      }
      else
        lfItem.answerValueSet = qItem.answerValueSet; // a URI for a ValueSet, or an ID for a contained ValueSet with no expansion
    }
  };


  /**
   * Parse questionnaire item for question cardinality and answer cardinality
   *
   * @param lfItem {object} - LForms item object to assign question cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processFHIRQuestionAndAnswerCardinality = function(lfItem, qItem) {
    var min = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMin);
    var max = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMax);
    var itemControl = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlItemControl);
    var repeats = qItem.repeats;
    var required = qItem.required;
    var answerCardinality, questionCardinality;
    // CODING, repeats handled by autocompleter with multiple answers in one question
    if (lfItem.dataType === 'CODING' ||
        qItem.answerOption && (lfItem.dataType === 'ST' || lfItem.dataType === 'INT' ||
        lfItem.dataType === 'DT' || lfItem.dataType === 'TM')) {
      if (repeats) {
        // If it has sub items that are not 'display', and it's not checkbox layout,
        // mark it as repeating question, not repeating answers.
        if (qItem.item && qItem.item.length >=0 &&
          qItem.item.some(item => item.type !== 'display') &&
          itemControl?.valueCodeableConcept?.coding?.[0]?.code !== 'check-box') {
          answerCardinality = {max: "1"};
          questionCardinality = max ? {max: max.valueInteger.toString()} : {max: "*"};
        }
        else {
          // It's marked as repeating answers if itemControl says checkbox layout,
          // even if it has sub items.
          answerCardinality = max ? {max: max.valueInteger.toString()} : {max: "*"};
        }
      }
      else {
        answerCardinality = {max: "1"};
      }
      if (required) {
        answerCardinality.min = min ? min.valueInteger.toString() : "1";
      }
      else {
        answerCardinality.min = "0";
      }
    }
    // no answerOption, question repeats
    else {
      // repeats
      if (repeats) {
        questionCardinality = max ? {max: max.valueInteger.toString()} : {max: "*"};
      }
      else {
        questionCardinality = {max: "1"};
      }
      // required
      if (required) {
        questionCardinality.min = min ? min.valueInteger.toString() : "1";
        answerCardinality = {min: "1"};
      }
      else {
        questionCardinality.min = "1";
      }
    }

    if (questionCardinality)
      lfItem.questionCardinality = questionCardinality;
    if (answerCardinality)
      lfItem.answerCardinality = answerCardinality;
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

    var vals = [];
    // check item.answerOption.initialSelected
    if (qItem.answerOption) {
      qItem.answerOption.forEach(function(elem) {
        if (elem.initialSelected) {
          self._processDefaultAnswerValue(elem, vals, qItem.type)
        }
      })
    }

    // check item.initial
    if (qItem.initial) {
      qItem.initial.forEach(function(elem) {
        self._processDefaultAnswerValue(elem, vals, qItem.type)
      });
    }

    // set default values
    if (vals.length > 0)
      this._processFHIRValues(lfItem, vals, true);
  };


  /**
   *  Returns the first initial quanitity for the given Questionnaire item, or
   *  null if there isn't one.
   */
  self.getFirstInitialQuantity = function(qItem) {
    return qItem.initial && qItem.initial.length > 0 && qItem.initial[0].valueQuantity || null;
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


  // Quesitonnaire Response Import
  let mergeQr = self._mergeQR;

  /**
   * Get structure information of a QuestionnaireResponse instance
   * @param qr a QuestionnaireResponse instance
   * @returns {{}} a QuestionnaireResponse data structure object
   * @private
   */
  mergeQr._getQRStructure = function(qr) {
    var qrInfo = {
      qrItemsInfo: []
    };
    if (qr) {
      this._checkQRItems(qrInfo, qr);
    }
    return qrInfo;
  };


  /**
   * Get structural info of a QuestionnaireResponse by going though each level of items
   * @param parentQRItemInfo the structural info of a parent item
   * @param parentItem a parent item in a QuestionnaireResponse object
   * @private
   */
  mergeQr._checkQRItems = function(parentQRItemInfo, parentQRItem) {

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
            self._checkQRItemAnswerItems(qrItemInfo, repeatingItems[j]);
            qrItemsInfo.push(qrItemInfo);
          }
          repeatingItemProcessed[linkId] = true;
        }
      }
      parentQRItemInfo.qrItemsInfo = qrItemsInfo;
    }
  };


  /**
   * Find the number of the repeating items that have the same code
   * @param linkId an item's linkId
   * @param parentQRItem a parent item in a QuestionnaireResponse object
   * @returns a structural info object for a repeating item
   * @private
   */
  mergeQr._findTotalRepeatingNum = function(linkId, parentQRItem) {

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
  };


  /**
   * Add repeating items into LForms definition data object
   * @param parentItem a parent item
   * @param linkId linkId of a repeating item
   * @param total total number of the repeating item with the same code
   * @private
   */
  mergeQr._addRepeatingItems = function(parentItem, linkId, total) {
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
          var newItem = LForms.Util.deepCopy(item);
          parentItem.items.splice(i, 0, newItem);
          total -= 1;
        }
      }
    }
  };


  /**
   * Find a matching repeating item by item code and the index in the repeating item array
   * @param parentItem a parent item
   * @param linkId linkId of a repeating (or non-repeating) item
   * @param index index of the repeating item
   * @returns {{}} a matching item
   * @private
   */
  mergeQr._findTheMatchingItemByLinkIdAndIndex = function(parentItem, linkId, index) {
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
  };


  /**
   * Find a matching repeating item by item code alone
   * When used on the LForms definition data object, there is no repeating items yet.
   * @param parentItem a parent item
   * @param linkId linkId of an item
   * @returns {{}} a matching item
   * @private
   */
  mergeQr._findTheMatchingItemByLinkId = function(parentItem, linkId) {
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
  };

}

export default addSDCImportFns;
