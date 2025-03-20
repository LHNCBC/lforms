/**
 * Additional functions to convert LForms to FHIR STU3/R4 Questionnaire/QuestionnaireResponse
 */
function addSTU3R4ExportFns(ns) {
  "use strict";

  var self = ns;

  /**
   * Convert LForms data type to FHIR SDC data type
   * @param item an item in the LForms form object
   * @returns {string}
   * @private
   */
  self._getFhirDataType = function(item) {

    var dataType = this._getAssumedDataTypeForExport(item);
    var type = this._lformsTypesToFHIRTypes[dataType];
    if (type === 'coding') {
      if (!item.answerConstraint || item.answerConstraint === "optionsOnly") {
        type = 'choice';
      }
      else if (item.answerConstraint === "optionsOrString") {
        type = 'open-choice'
      }
      // answerConstraint is a new constraint in R5, which is not supported in R4 or STU3.
      // optionsOrType is not supported in lforms yet. 
      // The exception could only happen when a R5 Questionnaire with a type 'coding' and 
      // answerConstraint 'optionsOrType' is loaded and then converted to a R4 Questionnaire
      // or a STU3 Questionnaire through the getFormFHIRData function.
      // It should not happen when convertLFormsToQuestionnaire is called in the FHIRPATH expression 
      // processor functions.
      else if (item.answerConstraint === "optionsOrType") {
        // issue an error
        let errMessage = "The type 'coding' with answerConstraint 'optionsOrType' in R5 cannot be converted to a valid type in R4 or STU3."
        console.error(errMessage);
        throw new Error(errMessage);
      }
    }
    // default is string
    if (!type) {
      type = 'string';
    }
    return type;
  };


  /**
   * Converting the given item's value to FHIR QuestionnaireResponse.answer (an array).
   * This is almost straightly refactored out of the original function self._handleAnswerValues.
   * This function only looks at the item value itself and not its sub-items, if any.
   * Here are the details for a single value's conversion (to an element in the returned answer array)
   * - For item data type quantity (QTY), a valueQuantity answer element will be created IF
   *   either (or both) item value or item unit is available.
   * - For item data types boolean, decimal, integer, date, dateTime, instant, time, string, attachment, and url,
   *   it will be converted to a FHIR value{TYPE} entry if the value is not null, not undefined, and not
   *   an empty string.
   * - For CODING, a valueCoding entry is created IF at least one of the item value's code, text, or system
   *   is available
   * - No answer entry will be created in all other cases, e.g., for types reference, title, section, etc.
   * @param item the item whose value is to be converted
   * @return the converted FHIR QuestionnaireResponse answer (an array), or null if the value is not converted -
   *         see the function description above for more details.
   * @private
   */
    self._lfItemValueToFhirAnswer = function(item) {

      // item could have an empty value if its sub-item has a value
      if (item.value === undefined || item.value === null || item.value === '')
         return null;

      var dataType = this._getAssumedDataTypeForExport(item);
      var values = this._answerRepeats(item)? item.value: [item.value];
      var answers = [];
      for(var i=0; i < values.length; ++i) {
        var itemValue = values[i];
        if(itemValue !== undefined && itemValue !== null && itemValue !== '') {
          var answer = null;
          var ext = [];
          if (itemValue.score !== null && itemValue.score !== undefined) {
            ext.push({
              url: this.fhirExtUrlOptionScore,
              valueDecimal: itemValue.score,
            });
          }
          // with an answer list of Coding
          if (dataType === 'CODING') {
            // for optionsOrString, the value could be string if it is a user typed, not-on-list value
            if (item.answerConstraint === 'optionsOrString' && typeof itemValue === 'string') {
              answer = { "valueString" : itemValue };
            }
            else if (!LForms.jQuery.isEmptyObject(itemValue)) {
              var answerCoding = this._setIfHasValue(null, 'system', LForms.Util.getCodeSystem(itemValue.system));
              answerCoding = this._setIfHasValue(answerCoding, 'code', itemValue.code);
              answerCoding = this._setIfHasValue(answerCoding, 'display', itemValue.text);
              if (answerCoding && ext.length > 0) {
                answerCoding.extension = ext;
              }
              answer = this._setIfHasValue(null, 'valueCoding', answerCoding);
            }
          }
          // with an answer list of INT, ST, DT, or TM
          else if (item.answers && (dataType === 'INT' || dataType === 'ST' || dataType === 'DT' || dataType === 'TM')) {
            if (typeof itemValue !== 'string') { //R4 does not allow off list string
              var valueKey = this._getValueKeyByDataType("value", item);
              answer = {[valueKey]: itemValue.text};
              if (ext.length > 0) {
                answer['_'+valueKey] = {extension: ext};
              }
            }
          }
          // without an answer list
          // for Quantity
          else if (dataType === "QTY") {
            // SimpleQuantity (no comparators)
            // [{
            //   // from Element: extension
            //   "value" : <decimal>, // Numerical value (with implicit precision)
            //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
            //   "unit" : "<string>", // Unit representation
            //   "system" : "<uri>", // Code System that defines coded unit form
            //   "code" : "<code>" // Coded form of the unit
            // }]
            var answerQuantity = this._makeValueQuantity(itemValue, item.unit);
            if (answerQuantity && ext.length > 0) {
              answerQuantity.extension = ext;
            }
            answer = this._setIfHasValue(null, 'valueQuantity', answerQuantity);
          }
          // for boolean, decimal, integer, date, dateTime, instant, time, string, uri, attachment, (no coding)
          else if (this._lformsTypesToFHIRFields[dataType]) {
            var valueKey = this._getValueKeyByDataType("value", item);
            answer = {[valueKey]: itemValue};
            if (ext.length > 0) {
              answer['_'+valueKey] = {extension: ext};
            }
          }
        }

        if(answer !== null) {
          answers.push(answer);
        }

      }

      return answers.length === 0? null: answers;
    };

}

export default addSTU3R4ExportFns;
