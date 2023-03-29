/**
 * Additional functions to convert LForms to FHIR R5 Questionnaire/QuestionnaireResponse
 */
function addR4ExportFns(ns) {
  "use strict";
  
  var self = ns;

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

    // item.defaultAnswer could be an array of multiple default values or a single value
    var defaultAnswers = (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
      item.defaultAnswer : [item.defaultAnswer];

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
      else if (dataType === 'QTY') {  // for now, handling only simple quantities without the comparators.
        answer = {};
        answer[valueKey] = this._makeQuantity(defaultAnswer, item.units);
        initialValues.push(answer);
      }
      // answerOption is date, time, integer or string
      else if (item.answers && (dataType === 'ST' || dataType === 'INT' ||
          dataType === 'DT' || dataType === 'TM')) {
        initialValues.push({[valueKey]: defaultAnswer.text});
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

}

export default addR4ExportFns;
