/**
 * Additional functions to convert FHIR R4 Questionnaire/QuestionnaireResponse to LForms
 */
function addR4ImportFns(ns) {
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
    // open-choice special handling
    if (qItem.type === "open-choice") {
      lfItem.answerConstraint = "optionsOrString";
    }
    if(type === 'SECTION') {
      lfItem.header = true;
    }
    lfItem.dataType = type;
  };


  /**
   * Process answer value
   * @param {*} answer an entry in item.answerOption or in item.initial
   * @param {*} vals an array that contains all default answers
   * @param {string} itemType questionnaire item's type
   */
  self._processDefaultAnswerValue = function (answer, vals, itemType) {
    answer = LForms.Util.deepCopy(answer); // Use a clone to avoid changing the original
    var val = answer.valueCoding;
    if (val)
      val._type = 'Coding'
    else
      val = self._getFHIRValueWithPrefixKey(answer, /^value/);

    if (val !== undefined && val !== null)
      vals.push(val);
  };

}

export default addR4ImportFns;
