/**
 * Additional functions to convert FHIR R5 Questionnaire/QuestionnaireResponse to LForms
 */
function addR5ImportFns(ns) {
"use strict";

  var self = ns;

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
}

export default addR5ImportFns;
