import {requestLinkedObs} from './obs-prepop.mjs';

/**
 *  Defines SDC functions (used by both import and export, or for other
 *  SDC-related purposes) that are the same across the different FHIR versions.
 *  The function takes SDC namespace object defined in the sdc export code,
 *  and adds additional functions to it.
 */
function addCommonSDCFns(ns) {
"use strict";

  var self = ns;
  self.requestLinkedObs = requestLinkedObs;

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
    "QTY": 'quantity',
    "attachment": 'attachment'
  };

  // A mapping from LHC-Forms data types to the partial field names of the value fields
  // and initial value fields in FHIR Questionnaire
  self._lformsTypesToFHIRFields = {
    "attachment": "Attachment",
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
    'notEqual': '!=',
    '>': 'minExclusive',
    '<': 'maxExclusive',
    '>=': 'minInclusive',
    '<=': 'maxInclusive',
    '=': 'value',
    '!=': 'notEqual',
    'exists': 'exists'
  };

  /**
   * Check if a LForms item has repeating questions
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._questionRepeats = function(item) {
    return item && item.questionCardinality && item.questionCardinality.max &&
        (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1);
  };


  /**
   * Check if a LForms item has repeating answers
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._answerRepeats = function(item) {
    return item && item.answerCardinality && item.answerCardinality.max &&
        (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1);
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


  /**
   * Set the given key/value to the object if the value is not undefined, not null, and not an empty string.
   * @param obj the object to set the key/value on. It can be null/undefined, and if so, a new object will
   *        be created and returned (only if the value is valid).
   * @param key the key for the given value to be set to the given object, required.
   * @param value the value to be set to the given object using the given key.
   * @return if the input object is not null/undefined, it will be returned;
   *         if the input object is null/undefined:
   *         - return the given object as is if the value is invalid, or
   *         - a newly created object with the given key/value set.
   * @private
   */
  self._setIfHasValue = function (obj, key, value) {
    if(value !== undefined && value !== null && value !== '') {
      if(! obj) {
        obj = {};
      }
      obj[key] = value;
    }
    return obj;
  };


  /**
   * Copy between lforms trigger value coding and FHIR enableWhen valueCoding. It only copies 3 fields:
   * code, system, and display/text (called "text" in lforms, "display" in FHIR)
   * @param srcCoding the coding object to copy from
   * @param dstCoding the coding object to copy to, may be null/undefined, and if null/undefined, a new object
   *        will be created but only if the srcCoding has at least one of code, system, display/text
   * @param lforms2Fhir The direction of copying, can be true or false. The direction matters because in lforms,
   *        the text/display field is called "text", while in FHIR, it's called "display"
   * @return the resulting dstCoding object.
   * @private
   */
  self._copyTriggerCoding = function(srcCoding, dstCoding, lforms2Fhir) {
    let srcTextField = lforms2Fhir? 'text': 'display';
    let dstTextField = lforms2Fhir? 'display': 'text';

    dstCoding = self._setIfHasValue(dstCoding, 'code', srcCoding.code);
    dstCoding = self._setIfHasValue(dstCoding, 'system', srcCoding.system);
    dstCoding = self._setIfHasValue(dstCoding, dstTextField, srcCoding[srcTextField]);

    return dstCoding;
  };


  /**
   *  Returns true if the given item (or LFormsData) has an expression
   *  which needs to be re-evaluated when the user changes their response.
   * @param itemOrLFData the item or LFormsData to be checked.  It is assumed
   *  that the relevant extensions will be in an _fhirExt hash where
   *  the key is the URI of the extension and the values are arrays of the FHIR
   *  extension structure.
   */
  self.hasResponsiveExpression = function(itemOrLFData) {
    var ext = itemOrLFData._fhirExt;
    return ext ?
      !!(ext[self.fhirExtCalculatedExp] || ext[self.fhirExtAnswerExp]) : false;
  };


  /**
   *  Returns true if the given item has an expression
   *  which sets the list.
   * @param item the item to be checked.  It is assumed
   *  that the relevant extensions will be in an _fhirExt hash where
   *  the key is the URI of the extension and the values are arrays of the FHIR
   *  extension structure.
   */
  self.hasListExpression = function(item) {
    var ext = item._fhirExt;
    // This should one day include a check for cqf-expression, when we add
    // support for it
    return ext ? !!(ext[self.fhirExtAnswerExp]) : false;
  };


  /**
   *  Returns true if the given item (or LFormsData) has an expression
   *  which needs to be evaluated only once, when form is first rendered.
   * @param itemOrLFData the item or LFormsData to be checked.  It is assumed
   *  that the relevant extensions will be in an _fhirExt hash where
   *  the key is the URI of the extension and the values are arrays of the FHIR
   *  extension structure.
   */
  self.hasInitialExpression = function(itemOrLFData) {
    return !!(itemOrLFData._fhirExt && itemOrLFData._fhirExt[self.fhirExtInitialExp]);
  };


  /**
   *  Builds a map from extension URIs to arrays of the FHIR extension
   *  structures, and stores it on the item.  Also builds an array of all
   *  Expression extensions.
   *
   * @param itemOrLFData a form item or an LFormsData which possibly contain
   *  FHIR extensions (in an "extension" property).
   */
  self.buildExtensionMap = function(itemOrLFData) {
    // Initialize a map for testing whether an extension is an Expression extension.
    // The keys are the URIs, and the values are see to true.
    if (!self.isExpressionExtension) {
      self.isExpressionExtension = [self.fhirExtCalculatedExp, self.fhirExtInitialExp,
        self.fhirExtAnswerExp, self.fhirExtVariable].reduce((x, k)=>{
        x[k]=true; return x}, {});
    }

    if (itemOrLFData.extension) {
      var m = {};
      var exprExtensions = [];
      for (let ext of itemOrLFData.extension) {
        var extArray = m[ext.url];
        if (!extArray)
          extArray =  m[ext.url] = [];
        extArray.push(ext);
        if (self.isExpressionExtension[ext.url])
          exprExtensions.push(ext);
      }
      itemOrLFData._fhirExt = m;
      if (exprExtensions.length)
        itemOrLFData._exprExtensions = exprExtensions;
    }
  };


  /**
   *  Requests launchContext resources.  Assumes LForms.Util.setFHIRContext() has
   *  been called.
   * @param lfData a LFormsData object for the form.
   * @return an array of Promises which resolve when the attempt to load the
   *  resources has completed (succesful or not, they resolve without being
   *  rejected).
   */
  self.loadLaunchContext = function(lfData) {
    // launchContext
    var contextItems = LForms.Util.findObjectInArray(lfData.extension, 'url',
      self.fhirExtLaunchContext, 0, true);
    // Per https://jira.hl7.org/browse/FHIR-29664 (approved; not yet applied- // 2020-11-19).
    const validContexts = {patient: {Patient: 1}, encounter: {Encounter: 1},
      user: {Patient: 1, Practitioner: 1, PractitionerRole: 1, RelatedPerson: 1},
      study: {Study: 1}};
    const supportedContextNames = {Patient: 1, User: 1, Encounter: 1};
    const pendingPromises = [];
    for (var i=0, len=contextItems.length; i<len; ++i) {
      let contextItemExt = contextItems[i].extension;
      let name=null, typeList=[];

      for (var j=0, jLen=contextItemExt.length; j<jLen; ++j) {
        var fieldExt = contextItemExt[j];
        if (!name && fieldExt.url === 'name') {
          let nameCode = fieldExt.valueId
          if (validContexts[nameCode]) {
            name = nameCode;
            // It is no longer necessary to check that the name is a valid
            // FHIR variable, because per
            // https://jira.hl7.org/browse/FHIR-29664, the values are now
            // constrained to a known list.  I am leaving the line below
            // comented out for reference in case that changes again.
            // lfData._checkFHIRVarName(name); // might throw
          }
          else {
            console.warn("A launch context of name "+nameCode+
             " was requested by the form, but the supported types are: "+
             Object.keys(validContexts).join(", "));
          }
        }
        else if (fieldExt.url === 'type') { // there can be more than one
          typeList.push(fieldExt.valueCode);
        }
      }
      if (name && typeList.length) {
        pendingPromises.push(new Promise(function(resolve, reject) {
          let contextResource = LForms.fhirContext[name];
          if (!contextResource.id) {
            console.warn('A launch context resource of name '+name+
              ' was requested by the form, but none was available');
            // The loading of this resource should not be critical for the
            // Questionnaire, because it is just for prepopulation.  Don't
            // reject the promise.
            resolve();
          }
          else {
            contextResource.read().then(function(resource) {
              if (resource) {
                let resType = resource.resourceType;
                if (typeList.indexOf(resType) == -1) {
                  console.warn("Could not retrieve a resource of the requested" +
                    " types for launch context name " +name);
                }
                else {
                  // Validate the "type"
                  let validTypes = validContexts[name];
                  if (!validTypes[resType]) {
                    console.warn("A launch context resource of type "+resType+
                     " was requested by the form, but the supported types for name "+
                     name + " are: "+ Object.keys(validTypes).join(", "));
                  }
                  else {
                    lfData._fhirVariables[name] = resource;
                  }
                }
              }
              resolve();
            },
            function fail(reason) {
              console.warn('A launch context of name '+name+' was requested, '+
                'but could not be read.');
              console.error(reason);
              resolve(); // per above, we are not rejecting the promise
            });
          }
        }));
      }
    }
    return pendingPromises;
  };
}


export default addCommonSDCFns;
