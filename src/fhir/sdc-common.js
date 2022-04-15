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
    return item._questionRepeatable!==undefined ? item._questionRepeatable :
      item.questionCardinality && item.questionCardinality.max &&
      (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1);
  };


  /**
   * Check if a LForms item has repeating answers
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  self._answerRepeats = function(item) {
    return item._multipleAnswers!==undefined ? item._multipleAnswers :
      item.answerCardinality && item.answerCardinality.max &&
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
    return ext ? !!(ext[self.fhirExtCalculatedExp] || ext[self.fhirExtAnswerExp] ||
       ext[self.fhirExtEnableWhenExp]) : false;
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
      self.isExpressionExtension = [self.fhirExtCalculatedExp,
        self.fhirExtInitialExp, self.fhirExtAnswerExp, self.fhirExtVariable,
        self.fhirExtEnableWhenExp].reduce((x, k)=>{x[k]=true; return x}, {});
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
    // Define a list of known, supported context variables, which we can get from the FHIR server,
    // and they resources they are allowed to take.
    const contextsFromServer = {patient: {Patient: 1}, encounter: {Encounter: 1},
      user: {Patient: 1, Practitioner: 1, PractitionerRole: 1, RelatedPerson: 1}};
    const pendingPromises = [];

    /**
     *  Checks to make sure that the type of the resource is what it should be
     *  per FHIR's requirements, and if it is okay, assigns the resource to
     *  the Questionnaires' variables map.
     * @param name the name of the variable
     * @param typeList the list of types for the name as specified in the
     *  launchContext extension.
     * @param resource the resource that was obtained as the value of the variable.
     */
    function addIfValid(name, typeList, resource) {
      let resType = resource.resourceType;
      // Validate the "type"
      let permittedTypes = contextsFromServer[name];
      if (permittedTypes && !permittedTypes[resType]) {
        console.warn("a launch context resource of type "+restype+
          " was found for name "+name+", but the supported types for name "+
          name + " are: "+ Object.keys(permittedTypes).join(", "));
      }
      else if (typeList.indexOf(resType) == -1) {
        console.warn("Could not retrieve a resource of the requested" +
          " types for launch context name " +name);
      }
      else {
        lfData._fhirVariables[name] = resource;
      }
    }

    for (var i=0, len=contextItems.length; i<len; ++i) {
      let contextItemExt = contextItems[i].extension;
      let name=null, typeList=[];

      for (var j=0, jLen=contextItemExt.length; j<jLen; ++j) {
        var fieldExt = contextItemExt[j];
        if (!name && fieldExt.url === 'name') {
          if (fieldExt.valueId) { // Handle a change in the specification
            console.log("Warning:  The type of the launchContext 'name' field should be 'Coding', not 'id'.");
            name = fieldExt.valueId;
          }
          else
            name = fieldExt.valueCoding?.code;

          lfData._checkFHIRVarName(name); // might throw if the name is not valid as a variable name
        }
        else if (fieldExt.url === 'type') { // there can be more than one
          typeList.push(fieldExt.valueCode);
        }
      }
      if (name && typeList.length) {
        pendingPromises.push(new Promise(function(resolve, reject) {
          let fromMap = LForms.fhirContext.vars?.[name];
          let contextResource = LForms.fhirContext.client?.[name];
          if (!fromMap && !contextResource.id) {
            console.warn('A launch context resource of name '+name+
              ' was requested by the form, but none was available');
            // The loading of this resource should not be critical for the
            // Questionnaire, because it is just for prepopulation.  Don't
            // reject the promise.
            resolve();
          }
          else {
            if (fromMap) {
              addIfValid(name, typeList, fromMap);
              resolve();
            }
            else {
              contextResource.read().then(function(resource) {
                if (resource) {
                  addIfValid(name, typeList, resource);
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
          }
        }));
      }
    }
    return pendingPromises;
  };
}


export default addCommonSDCFns;
