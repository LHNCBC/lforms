/**
 * Additional functions to convert LForms to FHIR R5 Questionnaire/QuestionnaireResponse
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
    }
    // default is string
    if (!type) {
      type = 'string';
    }
    return type;
  };


  /**
   * Converting the given item's value to FHIR QuestionaireResponse.answer (an array).
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
          // with an answer list of Coding
          if (dataType === 'CODING') {
            // for optionsOrString, the value could be string if it is a user typed, not-on-list value
            if (item.answerConstraint === 'optionsOrString' && typeof itemValue === 'string') {
              answer = { "valueString" : itemValue };
            }
            else if (!jQuery.isEmptyObject(itemValue)) {
              var answerCoding = this._setIfHasValue(null, 'system', LForms.Util.getCodeSystem(itemValue.system));
              answerCoding = this._setIfHasValue(answerCoding, 'code', itemValue.code);
              answerCoding = this._setIfHasValue(answerCoding, 'display', itemValue.text);
              answer = this._setIfHasValue(null, 'valueCoding', answerCoding);
            }
          }
          // with an answer list of INT, ST, DT, or TM
          else if (item.answers && (dataType === 'INT' || dataType === 'ST' || dataType === 'DT' || dataType === 'TM')) {
            if (typeof itemValue !== 'string') { //R4 does not allow off list string
              var valueKey = this._getValueKeyByDataType("value", item);
              answer = {[valueKey]: itemValue.text};
            }
          }
          // without an answer list
          // for Quantity
          else if (dataType === "QTY") {
            // For now, handling only simple quantities without the comparators.
            // [{
            //   // from Element: extension
            //   "value" : <decimal>, // Numerical value (with implicit precision)
            //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
            //   "unit" : "<string>", // Unit representation
            //   "system" : "<uri>", // Code System that defines coded unit form
            //   "code" : "<code>" // Coded form of the unit
            // }]
            answer = this._setIfHasValue(null, 'valueQuantity', this._makeValueQuantity(itemValue, item.unit));
          }
          // for boolean, decimal, integer, date, dateTime, instant, time, string, uri, attachment, (no coding)
          else if (this._lformsTypesToFHIRFields[dataType]) {
            var valueKey = this._getValueKeyByDataType("value", item);
            answer = {[valueKey]: itemValue};
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
