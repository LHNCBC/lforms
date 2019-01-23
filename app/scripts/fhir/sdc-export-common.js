/**
 *  Defines SDC export functions that are the same across the different FHIR
 *  versions.  The function takes SDC namespace object defined in the sdc export
 *  code, and adds additional functions to it.
 */
function addCommonSDCExportFns(ns) {
"use strict";

  var self = ns;

  /**
   * Convert LForms captured data to FHIR SDC QuestionnaireResponse
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *  The default is false.
   * @param subject A local FHIR resource that is the subject of the output resource.
   *  If provided, a reference to this resource will be added to the output FHIR
   *  resource when applicable.
   * @returns {{}}
   */
  self.convertLFormsToQuestionnaireResponse = function(lfData, noExtensions, subject) {
    var target = {};
    if (lfData) {
      var source = lfData.getFormData(true,true,true,true);
      this._processRepeatingItemValues(source);
      this._setResponseFormLevelFields(target, source, noExtensions);

      if (source.items && Array.isArray(source.items)) {
        target.item = [];
        for (var i=0, iLen=source.items.length; i<iLen; i++) {
          if (!source.items[i]._repeatingItem) {
            var newItem = this._processResponseItem(source.items[i], source);
            target.item.push(newItem);
          }
        }
      }
    }
    // FHIR doesn't allow null values, strip them out.
    LForms.Util.pruneNulls(target);

    if (subject)
      target["subject"] = LForms.Util.createLocalFHIRReference(subject);

    return target;
  }
}

export default addCommonSDCExportFns;
