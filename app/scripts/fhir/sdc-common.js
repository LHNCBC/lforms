/**
 *  Defines SDC functions (used by both import and export) that are the same
 *  across the different FHIR versions.  The function takes SDC namespace object
 *  defined in the sdc export code, and adds additional functions to it.
 */
function addCommonSDCFns(ns) {
"use strict";

  var self = ns;

  // A mapping of data types of items from LHC-Forms to FHIR Questionnaire
  self._lformsTypesToFHIRTypes = {
    "SECTION": 'group',
    "TITLE": 'display',
    "ST": 'string',
    "BL": 'boolean',
    "REAL": 'decimal',
    "INT": 'integer',
    "DT": 'date',
    "DTM": 'dateTime',
    "TM": 'time',
    "TX": 'text',
    "URL": 'url',
    "CNE": 'choice',
    "CWE": 'open-choice',
    "QTY": 'quantity'
  };

  // A mapping from LHC-Forms data types to the partial field names of the value fields
  // and initial value fields in FHIR Questionnaire
  self._lformsTypesToFHIRFields = {
    "INT": 'Integer',
    "REAL": 'Decimal',
    "DT": 'Date',
    "DTM": 'DateTime',
    "TM": 'Time',
    "ST": 'String',
    "TX": 'String',
    "BL": 'Boolean',
    "URL": 'Url',
    "CNE": 'Coding',
    "CWE": 'Coding',
    "QTY": 'Quantity'
  };

  self._operatorMapping = {
    'minExclusive': '>',
    'maxExclusive': '<',
    'minInclusive': '>=',
    'maxInclusive': '<=',
    'value': '=',
    'not': '!=',
    '>': 'minExclusive',
    '<': 'maxExclusive',
    '>=': 'minInclusive',
    '<=': 'maxInclusive',
    '=': 'value',
    '!=': 'not'
  };

  /**
   * Check if a LForms item has repeating questions
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._questionRepeats = function(item) {
    return item && item.questionCardinality && item.questionCardinality.max &&
        (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1)
  };


  /**
   * Check if a LForms item has repeating answers
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._answerRepeats = function(item) {
    return item && item.answerCardinality && item.answerCardinality.max &&
        (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)
  };


  /**
   * Find out if multiple answers extension is true.
   * @param qItem - FHIR Questionnaire item.
   * @returns {boolean}
   */
  self._hasMultipleAnswers = function (qItem) {
    var ret = false;
    if(qItem) {
      var answerRepeats = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlAnswerRepeats);
      if(answerRepeats && answerRepeats.valueBoolean) {
        ret = true;
      }
    }
    return ret;
  };


  /**
   * Do a shallow copy of specified fields from source to target.
   *
   * @param source - Source object
   * @param target - Target object
   * @param fieldList - Array of fields to copy from the source. If the field is
   * not found in the source, it is ignored.
   */
  self.copyFields = function(source, target, fieldList) {
    if(source && target && fieldList && fieldList.length > 0) {
      fieldList.forEach(function(field) {
        if(source.hasOwnProperty(field)) {
          target[field] = source[field];
        }
      });
    }
  };
  
  
  // Store the UCUM code system URI
  self.UCUM_URI = 'http://unitsofmeasure.org';

}

export default addCommonSDCFns;
