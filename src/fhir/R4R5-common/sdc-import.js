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
  self.fhirExtUrlValueSetScore = "http://hl7.org/fhir/StructureDefinition/ordinalValue";


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
          if (!answers)
            answers = []; // continuing with previous default; not sure if needed

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
          }
          else if (optionKey[0] === 'valueString' || optionKey[0] === 'valueDate' ||
              optionKey[0] === 'valueTime' ){
            answer.text = option[optionKey[0]];
            // rendering-xhtml extension under "_valueString".
            if (optionKey[0] === 'valueString' && option._valueString) {
              answer['obj_valueString'] = option._valueString;
              const xhtmlFormat = LForms.Util.findObjectInArray(answer['obj_valueString'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
              if (xhtmlFormat) {
                answer.textHTML = xhtmlFormat.valueString;
                if (self._widgetOptions?.allowHTML) {
                  // process contained images
                  if (containedImages &&
                    xhtmlFormat.valueString.match(/img/) &&
                    xhtmlFormat.valueString.match(/src/)) {
                    answer.textHTML = LForms.Util._internalUtil._getHtmlStringWithContainedImages(containedImages, xhtmlFormat.valueString) || answer.textHTML;
                  }
                  let invalidTagsAttributes = LForms.Util.checkForInvalidHtmlTags(answer.textHTML);
                  if (invalidTagsAttributes && invalidTagsAttributes.length > 0) {
                    answer._hasInvalidHtmlTag = true;
                    LForms.Util._internalUtil.printInvalidHtmlToConsole(invalidTagsAttributes);
                  }
                }
              }
            }
          }
          else if (optionKey[0] === 'valueInteger') {
            answer.text = parseInt(option[optionKey[0]])
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
          }

        }
        lfItem.answers.push(answer);
      }
    }
    else if (qItem.answerValueSet) {
      if (containedVS)
        var vs = containedVS[qItem.answerValueSet];
      if(vs) { // contained
        lfItem.answers = vs.answers;
      }
      else
        lfItem.answerValueSet = qItem.answerValueSet; // a URI for a ValueSet
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
    var repeats = qItem.repeats;
    var required = qItem.required;
    var answerCardinality, questionCardinality;
    // CODING, repeats handled by autocompleter with multiple answers in one question
    if (lfItem.dataType === 'CODING' ||
        qItem.answerOption && (lfItem.dataType === 'ST' || lfItem.dataType === 'INT' ||
        lfItem.dataType === 'DT' || lfItem.dataType === 'TM')) {
      if (repeats) {
        // if it has sub items that are not 'display'
        if (qItem.item && qItem.item.length >=0 &&
            qItem.item.some(item => item.type !== 'display')) {
          answerCardinality = {max: "1"};
          questionCardinality = max ? {max: max.valueInteger.toString()} : {max: "*"};
        }
        else {
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
