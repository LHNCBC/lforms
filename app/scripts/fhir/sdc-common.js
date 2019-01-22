/**
 *  Defines SDC functions (used by both import and export) that are the same
 *  across the different FHIR versions.  The function takes SDC namespace object
 *  defined in the sdc export code, and adds additional functions to it.
 */
function addCommonSDCFns(ns) {
"use strict";

  var self = ns;

  /**
   * Check if a LForms item has repeating questions
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._questionRepeats = function(item) {
    return item && item.questionCardinality && item.questionCardinality.max &&
        (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1)
  },


  /**
   * Check if a LForms item has repeating answers
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._answerRepeats = function(item) {
    return item && item.answerCardinality && item.answerCardinality.max &&
        (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)
  }
}

export default addCommonSDCFns;
