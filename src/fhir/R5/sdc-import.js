/**
 * Additional functions to convert FHIR R5 Questionnaire/QuestionnaireResponse to LForms
 */
function addR5ImportFns(ns) {
"use strict";

  var self = ns;

  self.fhirExtUrlOptionScore = self.fhirExtUrlOptionScoreLookup['R5'];

  /**
   * Parse questionnaire item for data type
   *
   * @param lfItem {object} - LForms item object to assign data type
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDataType = function (lfItem, qItem) {
    var type = self._getDataType(qItem);
    if(type === 'SECTION') {
      lfItem.header = true;
    }
    lfItem.dataType = type;
  };


  /**
   * Get LForms data type from questionnaire item
   *
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._getDataType = function (qItem) {
    var type = 'string';
    switch (qItem.type) {
      case 'string':
        type = 'ST';
        break;
      case 'group':
        type = 'SECTION';
        break;
      // 'choice' is replaced by 'coding' in R5 since the Draft Ballot version, but still in R5 preview 1, 2 and 3
      // kept for backward compatibility, but issue a warning
      case "choice":
        type = 'CODING';
        console.log(`Warning: An item (linkId:${qItem.linkId}) has a type of 'choice', which is no longer a supported item type in R5.`);
        break;
      // 'open-choice' is replaced by 'coding' in R5 since the Draft Ballot version, but still in R5 preview 1, 2 and 3
      // kept for backward compatibility, but issue a warning
      case "open-choice":
        type = 'CODING';
        console.log(`Warning: An item (linkId:${qItem.linkId}) has a type of 'open-choice', which is no longer a supported item type in R5.`);
        break;
      case 'integer':
        type = 'INT';
        break;
      case 'decimal':
        type = 'REAL';
        break;
      case 'text':
        type = 'TX';
        break;
      case "boolean":
        type = 'BL';
        break;
      case "date":
        type = 'DT';
        break;
      case "dateTime":
        type = 'DTM';
        break;
      case "time":
        type = 'TM';
        break;
      case "display":
        type = 'TITLE';
        break;
      case "url":
        type = 'URL';
        break;
      case "quantity":
        type = 'QTY';
        break;
      case "attachment":
        type = 'attachment';
        break;
      // 'coding' is in R5 since the Draft Ballot version
      case "coding":
        type = 'CODING';
        break;
    }
    return type;
  };


  /**
   * Parse questionnaire item for answerConstraint
   * @param {*} lfItem LForms item
   * @param {*} qItem Questionnaire item
   */
  self._processAnswerConstraint = function(lfItem, qItem) {
    if (qItem.answerConstraint) {
      lfItem.answerConstraint = qItem.answerConstraint;
    }
  };


  /**
   * Process answer value
   * @param {*} answer an entry in item.answerOption or in item.initial
   * @param {*} vals an array that contains all default answers
   * @param {string} itemType questionnaire item's type
   */
  self._processDefaultAnswerValue = function (answer, vals, itemType) {

    let val;
    answer = LForms.Util.deepCopy(answer); // Use a clone to avoid changing the original

    switch (itemType) {
      case 'coding':
        if (answer.valueCoding) {
          val = answer.valueCoding;
          val._type = "Coding";
        }
        else if (answer.valueString) {
          val = answer.valueString;
        }
        break;
      case 'string':
        if (answer.valueString) {
          val = answer.valueString;
        }
        break;
      case 'integer':
        if (answer.valueInteger !== null && answer.valueInteger !== undefined) {
          val = answer.valueInteger;
        }
        else if (answer.valueString) {
          val = answer.valueString;
        }
        break;
      case 'date':
        if (answer.valueDate) {
          val = answer.valueDate;
        }
        else if (answer.valueString) {
          val = answer.valueString;
        }
        break;
      case 'time':
        if (answer.valueTime) {
          val =answer.valueTime;
        }
        else if (answer.valueString) {
          val = answer.valueString;
        }
        break;
      default:
        val = self._getFHIRValueWithPrefixKey(answer, /^value/);
    }
    if (val !== undefined && val !== null)
      vals.push(val);
  };


  /**
   * Process item.disabledDisplay
   * @param {*} lfItem LForms item
   * @param {*} qItem Questionnaire item
   */
  self._processDisabledDisplay = function(lfItem, qItem) {
    if (qItem.disabledDisplay) {
      lfItem.disabledDisplay = qItem.disabledDisplay;
    }
  };


  /**
   * Handle the item.value in QuestionnaireResponse for non-CODING typed items
   * @param {*} fhirValue a value of item in QuestionnaireResponse, without the 'valueX' key
   * @param {*} lfItem an item in lforms
   * @param {boolean} forDefault if true, the intented target of the values is the item's
   *   default value instead of the item value. The default value is false.
   * @returns the answer
   */
  self._processNonCodingAnswerValueInQR = function(fhirValue, lfItem, forDefault=false) {
    let answer;
    if (lfItem.dataType === "ST" || lfItem.dataType === "INT" ||
        lfItem.dataType === "DT" || lfItem.dataType === "TM") {
      var itemAnswers = lfItem.answers;
      for (var j=0, jLen=itemAnswers.length; j<jLen && !answer; ++j) {
        if (fhirValue === itemAnswers[j].text) {
          answer = itemAnswers[j];
          break;
        }
      }
      if (!answer) {
        answer = forDefault ? fhirValue : {"text": fhirValue, "_notOnList": true};
      }
    }
    return answer;
  };

  /**
   * Converts the given ValueSet into an array of answers that can be used with
   * a prefetch autocompleter.
   * @return the array of answers, or null if the extraction cannot be done.
   */
  self.answersFromVS = function (valueSet) {
    var vs = valueSet;
    var rtn = [];
    if (vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
      vs.expansion.contains.forEach(function (vsItem) {
        var answer = {code: vsItem.code, text: vsItem.display, system: vsItem.system};
        // In R5, the "property" (ValueSet.expansion.contains.property) was
        // added so that if you do an expansion, you can request properties from
        // the CodeSystem at the same time (without having to do a CodeSytem
        // $lookup as in R4)
        const ordProp = LForms.Util.findObjectInArray(vsItem.property, 'code', 'itemWeight');
        if(ordProp) {
          answer.score = ordProp.valueDecimal;
        } else {
          // Still, someone could provide us with an R5 ValueSet.expansion that
          // put score extensions on the contained Codings.
          // Both ordinalValue and itemWeight extensions are supported.
          const ordExt = LForms.Util.findObjectInArray(vsItem.extension, 'url',
            self.fhirExtUrlValueSetScoreOrdinalValue) ||
            LForms.Util.findObjectInArray(vsItem.extension, 'url',
            self.fhirExtUrlValueSetScoreItemWeight);
          if(ordExt) {
            answer.score = ordExt.valueDecimal;
          }
        }
        rtn.push(answer);
      });
    }
    return rtn.length > 0 ? rtn : null;
  };

}

export default addR5ImportFns;
