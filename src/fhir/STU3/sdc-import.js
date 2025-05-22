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

  self.fhirExtUrlOptionScore = self.fhirExtUrlOptionScoreLookup['STU3'];
  self.fhirExtUrlValueSetScore = "http://hl7.org/fhir/StructureDefinition/valueset-ordinalValue";


  /**
   * Extract contained VS (if any) from the given questionnaire resource object.
   * @param questionnaire the FHIR questionnaire resource object
   * @return when there are contained value sets, returns a hash from "#<ValueSet.id>" (the character "#"
   *         followed by the ValueSet id) to the answers options object, which, in turn, is a hash with 4 entries:
   *         - "answers" is the list of LF answers converted from the value set.
   *         - "systems" is the list of code systems for each answer item; and
   *         returns undefined if no contained value set is present.
   * @private
   */
  self._extractContainedVS = function (questionnaire) {
    var answersVS;

    if(questionnaire.contained && questionnaire.contained.length > 0) {
      answersVS = {};
      questionnaire.contained.forEach(function(vs) {
        if(vs.resourceType === 'ValueSet' && vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
          var answers = self.answersFromVS(vs);
          if (answers) {
            // support both id and url based lookup. STU3 reference is quite vague.
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
   * Parse questionnaire object for answer cardinality
   *
   * NOT USED!!
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
  self._processSkipLogic = function (lfItem, qItem, linkIdItemMap) {
    if(qItem.enableWhen) {
      lfItem.skipLogic = {conditions: [], action: 'show'};
      for(var i = 0; i < qItem.enableWhen.length; i++) {
        if (!qItem.enableWhen[i].question) {
          throw new Error("Question with linkId '" + qItem.linkId +
            "' contains enableWhen but is missing the enableWhen.question field.");
        }
        if (!linkIdItemMap[qItem.enableWhen[i].question]) {
          throw new Error("Question with linkId '" + qItem.linkId +
              "' contains enableWhen pointing to a question with linkId '" +
              qItem.enableWhen[i].question  + "' that does not exist.")
        }
        var dataType = self._getDataType(linkIdItemMap[qItem.enableWhen[i].question]);
        var condition = {source: qItem.enableWhen[i].question};
        if(qItem.enableWhen[i].hasOwnProperty('hasAnswer')) {
          condition.trigger = {exists: qItem.enableWhen[i].hasAnswer};
        }
        else {
          var answer = self._getFHIRValueWithPrefixKey(qItem.enableWhen[i], /^answer/);
          if(dataType === 'CODING') {
            condition.trigger = {value: self._copyTriggerCoding(answer, null, false)};
          }
          else if(dataType === 'QTY') {
            condition.trigger = {value: answer.value};
          }
          else {
            condition.trigger = {value: answer};
          }
        }
        lfItem.skipLogic.conditions.push(condition);
      }
    }
  }


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
    if(qItem.option) {
      lfItem.answers = [];
      for(var i = 0; i < qItem.option.length; i++) {
        var answer = {};
        var option = qItem.option[i];

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
                LForms.Util._internalUtil.setAnswerTextHTML(answer, xhtmlFormat, self._widgetOptions?.allowHTML, containedImages);
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
            // rendering-xhtml extension under "_valueString".
            if (optionKey[0] === 'valueString' && option._valueString) {
              answer['obj_valueString'] = option._valueString;
              const xhtmlFormat = LForms.Util.findObjectInArray(answer['obj_valueString'].extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
              if (xhtmlFormat) {
                LForms.Util._internalUtil.setAnswerTextHTML(answer, xhtmlFormat, self._widgetOptions?.allowHTML, containedImages);
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
          }

        }
        lfItem.answers.push(answer);
      }
    }
    else if (qItem.options) {
      if (containedVS)
        var vs = containedVS[qItem.options.reference];
      if(vs && vs.answers) {
        lfItem.answers = vs.answers;
        // To keep options property during export.
        lfItem._options = qItem.options;
      }
      else
        lfItem.answerValueSet = qItem.options.reference;
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
        qItem.option && (lfItem.dataType === 'ST' || lfItem.dataType === 'INT' ||
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
  self._processEditable = function(lfItem, qItem) {
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

    var val = LForms.Util.deepCopy(qItem.initialCoding);
    if (val)
      val._type = 'Coding';
    else
      val = self._getFHIRValueWithPrefixKey(qItem, /^initial/);
    if (val !== undefined && val !== null) {
      this._processFHIRValues(lfItem, [val], true);
    }
  };


  /**
   *  Returns the first initial quanitity for the given Questionnaire item, or
   *  null if there isn't one.
   */
  self.getFirstInitialQuantity = function(qItem) {
    return qItem.initialQuantity || null;
  };


  /**
   * Parse 'linkId' for the LForms questionCode of a 'display' item, which does not have a 'code'
   *
   * @param lfItem {object} - LForms item object to assign questionCode
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDisplayItemCode = function(lfItem, qItem) {
    if (qItem.type === "display" && qItem.linkId) {
      var codes = qItem.linkId.split("/");
      if (codes && codes[codes.length-1]) {
        lfItem.questionCode = codes[codes.length-1];
      }
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
    // open-choice special handling
    if (qItem.type === "open-choice") {
      lfItem.answerConstraint = "optionsOrString";
    }
    if(type === 'SECTION' || type === 'TITLE') {
      lfItem.header = true;
    }
    lfItem.dataType = type;
  };



  // QuesitonnaireResponse Import
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
   * @param linkId code of a repeating item
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
