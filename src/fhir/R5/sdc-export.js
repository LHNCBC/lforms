/**
 * Additional functions to convert LForms to FHIR R5 Questionnaire/QuestionnaireResponse
 */
function addR5ExportFns(ns) {
  "use strict";

  const _isAnswerOptionType = {'CODING':true, 'ST':true, 'INT':true, 'DT':true, 'TM':true};
  var self = ns;

  self.stdQProfile = 'http://hl7.org/fhir/5.0/StructureDefinition/Questionnaire';
  self.stdQRProfile = 'http://hl7.org/fhir/5.0/StructureDefinition/QuestionnaireResponse';

  /**
   * Convert LForms data type to FHIR SDC data type
   * @param item an item in the LForms form object
   * @returns {string}
   * @private
   */
  self._getFhirDataType = function(item) {

    var dataType = this._getAssumedDataTypeForExport(item);
    var type = this._lformsTypesToFHIRTypes[dataType];
    // default is string
    if (!type) {
      type = 'string';
    }
    return type;
  };


  /**
   * Process answerConstraint
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  self._handleAnswerConstraint = function(targetItem, item) {
    if (item.answerConstraint) {
      targetItem.answerConstraint = item.answerConstraint;
    }
  };


  /**
   * Process default values
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  self._handleInitialValues = function(targetItem, item) {
    if(item.defaultAnswer === null || item.defaultAnswer === undefined || item.defaultAnswer === '') {
      return;
    }

    var dataType = this._getAssumedDataTypeForExport(item);

    // For repeating questions, use item.defaultAnswers which stores the original initial values array.
    var defaultAnswers = (this._questionRepeats(item) && item.defaultAnswers) ?
      item.defaultAnswers :
      // item.defaultAnswer could be an array of multiple default values or a single value
      (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
        item.defaultAnswer :
        [item.defaultAnswer];

    var valueKey = this._getValueKeyByDataType("value", item);
    var answer = null;
    let initialValues = []

    // go through each default value and handle it based on the data type.
    for(var i=0, iLen=defaultAnswers.length; i<iLen; i++ ) {

      let defaultAnswer = defaultAnswers[i];

      // for Coding, the default answer is partially handled in _handleAnswers(), where
      // initialSelected is set on the answer items.
      // Only the not-on-list values (string or Coding) in item.defaultAnswer is processed here
      if (dataType === "CODING") {
        // go through each default value and to see if it is one of answers in the answers list
        let onList = false;
        if (item.answers) {
          for(var j=0, jLen=item.answers.length; j<jLen; j++ ) {
            if (LForms.Util.areTwoAnswersSame(defaultAnswer, item.answers[j], item)) {
              onList = true;
              break;
            }
          }
        }
        if (!onList) {
          // valueString, free text
          if (typeof defaultAnswer === "string") {
            initialValues.push({"valueString": defaultAnswer});
          }
          // valueCoding, off list coding // TODO: not fully supported yet
          else if (typeof defaultAnswer === "object") {
            let valCoding = LForms.Util.deepCopy(defaultAnswer);
            if (valCoding.text) {
              valCoding.display = valCoding.text;
              delete valCoding.text;
            }
            if (valCoding.system) {
              valCoding.system = LForms.Util.getCodeSystem(valCoding.system);
            }
            initialValues.push(valCoding);
          }
        }

      }
      // for Quantity,
      else if (dataType === 'QTY') {  // SimpleQuantity (no comparators)
        answer = {};
        // defaultAnswer could be a Quantity object (from import) or just a number
        if (defaultAnswer && typeof defaultAnswer === 'object' && defaultAnswer._type === 'Quantity') {
          // Use unit from the default answer itself, not from item.units
          var qty = {};
          if (defaultAnswer.value !== undefined && defaultAnswer.value !== null) {
            qty.value = defaultAnswer.value;
          }
          if (defaultAnswer.name) {
            qty.unit = defaultAnswer.name;
          }
          if (defaultAnswer.code) {
            qty.code = defaultAnswer.code;
          }
          if (defaultAnswer.system) {
            qty.system = defaultAnswer.system;
          }
          answer[valueKey] = qty;
        } else {
          answer[valueKey] = this._makeQuantity(defaultAnswer, item.units);
        }
        initialValues.push(answer);
      }
      // answerOption is date, time, integer or string
      else if (item.answers && (dataType === 'ST' || dataType === 'INT' ||
          dataType === 'DT' || dataType === 'TM')) {
        if (typeof defaultAnswer === "string") {
          initialValues.push({"valueString": defaultAnswer});
        }
        else {
          initialValues.push({[valueKey]: defaultAnswer.text});
        }

      }
      // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
      else if (dataType === "INT" || dataType === "REAL" || dataType === "BL" ||
        dataType === "TM" || dataType === "ST" || dataType === "TX" || dataType === "URL") {
        answer = {};
        answer[valueKey] = defaultAnswer;
        initialValues.push(answer);
      }
      else if (dataType === "DT" || dataType === "DTM") { // transform to FHIR date/datetime format.
        var dateValue = LForms.Util.stringToDate(defaultAnswer);
        if(dateValue) {
          dateValue = dataType === "DTM"?
            LForms.Util.dateToDTMString(dateValue): LForms.Util.dateToDTStringISO(dateValue);
          initialValues.push({[valueKey]: dateValue});
        }
        else { // LForms.Util.stringToDate returns null on invalid string
          // TODO: should save the errors or emitting events.
          console.error(defaultAnswer + ': Invalid date/datetime string as defaultAnswer for ' + item.questionCode);
        }
      }
      // no support for reference
    }

    if (initialValues.length > 0) {
      targetItem.initial = initialValues;
    }
  };


  /**
   * Process item.disabledDisplay
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   */
  self._handleDisabledDisplay = function(targetItem, item) {
    if (item.disabledDisplay) {
      targetItem.disabledDisplay = item.disabledDisplay;
    }
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
        var ext = [];
        if (itemValue.score !== null && itemValue.score !== undefined) {
          ext.push({
            url: this.fhirExtUrlOptionScore,
            valueDecimal: itemValue.score,
          });
        }
        // with an answer list
        if (item.answers || dataType === 'CODING') {
          if (_isAnswerOptionType[dataType]) {
            // for optionsOrString, the value could be string if it is a user typed, not-on-list value
            if (item.answerConstraint === 'optionsOrString' && typeof itemValue === 'string') {
              answer = { "valueString" : itemValue };
              if (ext.length > 0) {
                answer['_valueString'] = {extension: ext};
              }
            }
            // optionsOnly
            else if (!LForms.jQuery.isEmptyObject(itemValue)) {
              // for Coding
              if (dataType === 'CODING') {
                var answerCoding = this._setIfHasValue(null, 'system', LForms.Util.getCodeSystem(itemValue.system));
                answerCoding = this._setIfHasValue(answerCoding, 'code', itemValue.code);
                answerCoding = this._setIfHasValue(answerCoding, 'display', itemValue.text);
                if (answerCoding && ext.length > 0) {
                  answerCoding.extension = ext;
                }
                answer = this._setIfHasValue(null, 'valueCoding', answerCoding);
              }
              // for INT, ST, DT, TM
              else {
                var valueKey = this._getValueKeyByDataType("value", item);
                answer = {[valueKey]: itemValue.text};
                if (ext.length > 0) {
                  answer['_'+valueKey] = {extension: ext};
                }
              }
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
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri, attachment, coding
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

export default addR5ExportFns;
