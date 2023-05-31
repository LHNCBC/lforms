/**
 * Additional functions to convert FHIR STU3/R4 Questionnaire/QuestionnaireResponse to LForms
 */
function addSTU3R4ImportFns(ns) {
  "use strict";
  
  var self = ns;
  
  /**
   * Handle the item.value in QuestionnaireResponse for non-CODING typed items
   * @param {*} fhirValue a value of item in QuestionnaireResponse, without the 'valueX' key
   * @param {*} lfItem an item in lforms
   * @returns the answer
   */
  self._processNonCodingAnswerValueInQR = function(fhirValue, lfItem) {
    let answer;
    if (lfItem.dataType === "ST" || lfItem.dataType === "INT" || 
        lfItem.dataType === "DT" || lfItem.dataType === "TM") {
      var itemAnswers = lfItem.answers;
      for (var j=0, jLen=itemAnswers.length; j<jLen && !answer; ++j) {
        if (fhirValue === itemAnswers[j].text) {
          answer = itemAnswers[j]; 
        }
      }
    }
    return answer;
  };
}
  
export default addSTU3R4ImportFns;
  