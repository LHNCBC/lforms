/**
 * LForms Utility tools, export an LhcFormUtils that merges CommonUtils and FormUtils.
 * LhcFormUtils is also set as window.LForms.Util, which is used by the externally loaded lformsFHIR js lib.
 */
import CommonUtils from "./lhc-common-utils.js";

const FormUtils = {
  // TODO: need an udpate
  /**
   *  Adds an LForms form to the page.
   * @param formDataDef A form definiton (either JSON or a parsed object).  Also,
   *  for backward compatibility, this can be the name of a global-scope variable
   *  (on "window") containing that form definition object. A FHIR Questionnaire can be also be
   *  used as a form definition.
   * @param formContainer The ID of a DOM element to contain the form, or the
   *  element itself.  The contents of this element will be replaced by the form.
   *  This element should be outside the scope of any existing AngularJS app on
   *  the page.
   * @param {Object} [options] A hash of options. See avaialble options under templateOptions in
   * form_definition.md. 'preppopulate' and 'fhirVersion' are not options in the templateOptions,
   * but are included in the 'options' parameter.
   * @param {boolean} [options.prepopulate] Set to true if you want FHIR prepopulation to happen (if
   *  the form was an imported FHIR Questionnaire).
   * @param {string} [options.fhirVersion] Optional, version of FHIR used if formDataDef is a FHIR
   *  Questionnaire. options are: `R4` or `STU3`. If not provided an attempt will be made to determine
   *  the version from the Questionnaire content.
   * @return a Promise that will resolve after any needed external FHIR
   *  resources have been loaded (if the form was imported from a FHIR
   *  Questionnaire).
   */
  addFormToPage: function(formDataDef, formContainer, options) {

    // var formDataDef = CommonUtils.deepCopy(formDataDef);
    var formContainer = typeof formContainer === 'string' ? document.getElementById(formContainer) : formContainer;
    if (typeof formDataDef === 'string') {
      if (formDataDef.indexOf('{') >= 0) // test for JSON
        formDataDef = JSON.parse(formDataDef);
      else // backward compatibility
        formDataDef = window[formDataDef];
    }

    // If resourceType is specified assume formDataDef is FHIR
    var resourceType = formDataDef.resourceType;
    var fhirVersion = options && options.fhirVersion;

    // throw an error if it is a FHIR resource but not a Questionnaire
    if (resourceType && resourceType !== 'Questionnaire') {
      throw new Error('Only Questionnaire FHIR content is supported in addFormToPage.')
    }

    if (!this.pageFormID_)
      this.pageFormID_ = 0;
    if (!LForms.addedFormDefs)
      LForms.addedFormDefs = [];
    LForms.addedFormDefs.push(formDataDef);
    var prepop = options && options.prepopulate===true;

    // remove existing content in the container
    while (formContainer.firstChild) {
      formContainer.removeChild(formContainer.lastChild);
    }
    // add the lhc-form web component
    const eleLhcForm = document.createElement("wc-lhc-form");
    formContainer.appendChild(eleLhcForm)

    var rtnPromise = new Promise(function(resolve, reject) {
      try {
        eleLhcForm.questionnaire = formDataDef;
        eleLhcForm.options = options;
        eleLhcForm.prepop = prepop;
        eleLhcForm.fhirVersion = fhirVersion;
        eleLhcForm.addEventListener('onFormReady', function(e){
          resolve()
        });
        eleLhcForm.addEventListener('onError', function(e){
          reject(e.detail)
        });
      }
      catch(e) {
        reject(e)
      }
    })

    return rtnPromise;
  },


  /**
   * Remove any forms from the container DOM element.
   * @param formContainer The ID of a DOM element to contain the form, or the
   *  element itself.  The contents of this element will be replaced by the form.
   *  This element should be outside the scope of any existing AngularJS app on
   *  the page.
   */
  removeFormsFromPage: function(formContainer) {
    var formContainer = typeof formContainer === 'string' ? document.getElementById(formContainer) : formContainer;
    while (formContainer.firstChild) {
      formContainer.removeChild(formContainer.lastChild);
    }
  },


  /**
   * Get user input data from the form, with or without form definition data.
   * @param element the containing HTML element that includes the LForm's rendered form.
   *        It could either be a DOM element or a CSS selector.
   * @param noFormDefData optional, to include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */
  getUserData: function(element, noFormDefData, noEmptyValue, noDisabledItem) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? formObj.getUserData(noFormDefData, noEmptyValue, noDisabledItem) : null;
  },


  /**
   * Get the complete form definition data, including the user input data from the form.
   * The returned data could be fed into a LForms widget directly to render the form.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be a DOM element or a CSS selector.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
   * @returns {{}} Form definition data
   */
  getFormData: function(element, noEmptyValue, noDisabledItem) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? formObj.getFormData(noEmptyValue, noDisabledItem) : null;
  },


  /**
   * Get HL7 v2 OBR and OBX segment data from the form.
   * Empty or hidden questions are not included.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or a CSS selector.
   * @returns {*} a string that contains HL7 v2 OBR and OBX segments
   */
  getFormHL7Data: function(element) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? LForms.HL7.toHL7Segments(formObj) : null;
  },


  /**
   *  Get FHIR data from the form.
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport",
   *  "Questionnaire" (both standard Questionnaire and SDC Questionnaire profile)
   *  and "QuestionnaireResponse" (SDC profile).
   * @param fhirVersion the version of FHIR being used (e.g., 'STU3')
   * @param formDataSource Optional.  Either the containing HTML element that
   *  includes the LForm's rendered form, a CSS selector for that element, an
   *  LFormsData object, or an LForms form definition (parsed).  If not
   *  provided, the first form found in the page will be used.
   * @param options A hash of other options.  See _convertLFormsToFHIRData for
   *  the allowed values.
   * @returns {*} the requested FHIR resource.  For Questionnaire, the full form definition
   *  will be returned, but or DiagnosticReport and QuestionnaireResponse, empty
   *  or hidden questions will not be included.
   */
  getFormFHIRData: function(resourceType, fhirVersion, formDataSource, options) {
    if (!formDataSource || formDataSource instanceof HTMLElement || typeof formDataSource === 'string')
      formDataSource = this._getFormObjectInScope(formDataSource);
    return this._convertLFormsToFHIRData(resourceType, fhirVersion, formDataSource, options);
  },


  /**
   * Get a list of errors preventing the form from being valid.
   * @param [element] optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be a DOM element or a CSS selector.
   * @return {Array<string>} list of errors or null if form is valid
   */
  checkValidity: function (element) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? formObj.checkValidity() : null;
  },


  /**
   * Convert LForms data into a FHIR resource
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport",
   * "Questionnaire" (both standard Questionnaire and SDC Questionnaire profile)
   *  and "QuestionnaireResponse" (SDC profile).
   * @param fhirVersion the version of FHIR to be used (e.g., 'STU3')
   * @param formData an LFormsData object or an LForms form definition (parsed).
   * @param options A hash of other options, with the following optional keys:
   *  * bundleType: optional, maybe be either "transaction" or "collection".
   *    This is used when resourceType is set to "DiagnosticReport", and requests
   *    that the DiagnosticReport and associated Observation resources be placed
   *    together in a bundle.  When this is not present, a bundle will not be
   *    used.
   *  * noExtensions: a flag that a standard FHIR Questionnaire or QuestionnaireResponse is to be created
   *    without any extensions, when resourceType is Questionnaire or QuestionnaireResponse.
   *    The default is false.
   *  * extract:  a flag for QuestionnaireReponse that data should be extracted
   *    (using the observationExtract extension).  In this case the returned
   *    resource will be an array consisting of the QuestionnaireResponse and any
   *    extracted Observations.
   *  * subject: A local FHIR resource that is the subject of the output resource.
   *    If provided, a reference to this resource will be added to the output FHIR
   *    resource when applicable.
   * @returns {*} a FHIR resource, or (if extract is true) an array of
   *    resources.
   */
  _convertLFormsToFHIRData: function(resourceType, fhirVersion, formData, options) {
    if (!options)
      options = {};
    if (!(formData instanceof LForms.LFormsData))
      formData = new LForms.LFormsData(formData);
    var version = this.validateFHIRVersion(fhirVersion);
    var fhir = LForms.FHIR[version];
    var fhirData = null;
    if (formData) {
      switch (resourceType) {
        case "DiagnosticReport":
          var bundleType = options ? options.bundleType : undefined;
          var inBundle = bundleType != undefined;
          fhirData = fhir.DiagnosticReport.createDiagnosticReport(formData,
            options.subject, inBundle, bundleType);
          break;
        case "Questionnaire":
          fhirData = fhir.SDC.convertLFormsToQuestionnaire(formData,
            options.noExtensions);
          break;
        case "QuestionnaireResponse":
          if (options.extract)
            fhirData = fhir.SDC.convertLFormsToQRAndExtracFHIRData(formData,
              options.noExtensions, options.subject);
          else
            fhirData = fhir.SDC.convertLFormsToQuestionnaireResponse(formData,
              options.noExtensions, options.subject);
          break;
      }
    }
    return fhirData;
  },


  /**
   * Convert FHIR SQC Questionnaire to the LForms internal definition
   *
   * @param fhirData - a FHIR Questionnaire resource, which should be generated through
   * the function "getFormFHIRData('Questionnaire', ...)"
   * @param fhirVersion - the version of FHIR in which the Questionnaire is
   *  written.  This maybe be omitted if the Questionnaire resource (in
   *  fhirData) contains a meta.profile attibute specifying the FHIR version.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {*} - an LForms json object
   */
  convertFHIRQuestionnaireToLForms: function(fhirData, fhirVersion) {
    var rtn = null;
    if (fhirData) {
      fhirVersion = this._requireValidFHIRVersion(fhirVersion, fhirData);
      var fhir = LForms.FHIR[fhirVersion];
      rtn = fhir.SDC.convertQuestionnaireToLForms(fhirData);
    }
    return rtn;
  },


  /**
   * Merges a FHIR resource (typically QuestionnaireResponse) into an LForms form object
   * (which was likely the result of converting a FHIR Questionnaire). In addition to
   * QuestionnaireResponse, we also support either DiagnosticReport (DSTU2) or a Bundle
   * containing a DiagnosticReport, but only if the DiagnosticReport was generated from LForms.
   * @param fhirData a QuestionnaireResponse resource, a DiagnosticReport resource with "contained"
   * Observation resources,or a Bundle with DiagnosticReport and Observation resources.
   * @param formData an LForms form definition or LFormsData object. This can be obtained from
   * a FHIR Questionnaire by using LForms.Util.convertFHIRQuestionnaireToLForms.
   * @param fhirVersion - the version of FHIR in which the fhirData is
   *  written.  This maybe be omitted if the Questionnaire resource (in
   *  fhirData) contains a meta.profile attibute specifying the FHIR version.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {{}} an updated LForms form definition, with answer data
   */
  mergeFHIRDataIntoLForms: function(fhirData, formData, fhirVersion) {
    // For backward compatibility, ignore the old resourceType parameter.
    // It used to support a resourceType as the first parameter, the rest of the
    // parameters are the same.
    if (typeof fhirData === "string") {
      fhirData = formData;
      formData = fhirVersion;
      fhirVersion = arguments[3];
    }

    if (fhirData) {
      fhirVersion = this._requireValidFHIRVersion(fhirVersion, fhirData);
      var fhir = LForms.FHIR[fhirVersion];
      switch (fhirData.resourceType) {
        case "DiagnosticReport":
          formData = fhir.DiagnosticReport.mergeDiagnosticReportToLForms(formData, fhirData);
          formData.hasSavedData = true; // will be used to determine whether to update or save
          break;
        case "Bundle":
          // Bundle should contain DiagnosticReport
          if (fhirData.type === "searchset" &&
              fhirData.entry.find(ele => ele.resource.resourceType === "DiagnosticReport")) {
            formData = fhir.DiagnosticReport.mergeDiagnosticReportToLForms(formData, fhirData);
            formData.hasSavedData = true; // will be used to determine whether to update or save
          }
          break;
        case "QuestionnaireResponse":
          formData = fhir.SDC.mergeQuestionnaireResponseToLForms(formData, fhirData);
          formData.hasSavedData = true; // will be used to determine whether to update or save
          break;
      }
    }
    return formData;
  },


  /**
   *  Ensures that either the given FHIR version is valid and supported, or
   *  that a valid version can be determined from the given FHIR resource.
   */
  _requireValidFHIRVersion: function(fhirVersion, fhirResource) {
    if (!fhirVersion)
      fhirVersion = this.detectFHIRVersion(fhirResource) || this.guessFHIRVersion(fhirResource);
    if (!fhirVersion) {
      throw new Error('Could not determine the FHIR version for this resource.  '+
        'Please make sure it is specified via meta.profile (see '+
        'http://build.fhir.org/versioning.html#mp-version and '+
        'https://www.hl7.org/fhir/references.html#canonical).  '+
        'Example 1:  http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire'+
        ' (for Questionnaire version 4.0, a.k.a. R4).'+
        'Example 2:  http://hl7.org/fhir/3.0/StructureDefinition/Questionnaire'+
        ' (for Questionnaire version 3.0, a.k.a. STU3).'+
        'Example 3:  http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7 '+
        ' (for SDC Questionnaire version 2.7).');
    }
    else
      fhirVersion =  this.validateFHIRVersion(fhirVersion);
    return fhirVersion;
  },


  /**
   *  For FHIR applications, provides FHIR context information that might be
   *  needed in rendering a Quesitonnaire.
   *  Priort to calling this, the LHC-Forms FHIR support files should be loaded.
   * @param fhirContext an optional object for accessing a FHIR context and
   *  a FHIR API.  It should be an instance of 'client-js', a.k.a. npm package fhirclient,
   *  version 2.  (See http://docs.smarthealthit.org/client-js).  This is
   *  essentially the connection to the FHIR server, plus a notion of which
   *  patient, user, and encounter are current or in scope.
   * @param fhirContextVars a map of additional variable names to Resources
   *  which should be available for use in processing launchContext exensions in
   *  a Questionnaire.
   *  (See https://build.fhir.org/ig/HL7/sdc/StructureDefinition-sdc-questionnaire-launchContext.html.)
   *  Values in this map will take priority over values obtainable from
   *  fhirContext when processing launchContext extensions.
   */
  setFHIRContext: function(fhirContext, fhirContextVars) {
    if (!LForms.FHIR) {
      throw new Error('LHC-Forms FHIR support files have not been loaded.' +
        'See http://lhncbc.github.io/lforms/#fhirScripts');
    }
    LForms.fhirContext = {client: fhirContext, vars: fhirContextVars};
    LForms.fhirCapabilities = {}; // our own flags about what the server can do
    delete LForms._serverFHIRReleaseID; // in case the version changed
  },


  /**
   *  Converts a FHIR version string (e.g. 3.0.1) to a release ID (e.g. 'STU3').
   * @param versionStr the version string to be converted to a release ID.
   * @return the release ID for the given version string, or versionStr if the
   *  version string cannot be mapped to a release ID.
   */
  _fhirVersionToRelease: function(versionStr) {
    var releaseID = versionStr; // default
    var matchData = versionStr.match(/^\d+(\.\d+)/);
    if (matchData) {
      var versionNum = parseFloat(matchData[0]);
      // Following http://www.hl7.org/fhir/directory.cfml
      var releaseID = versionNum > 3.0 && versionNum <= 4.0 ?
        'R4' : versionNum >= 1.1 && versionNum <= 3.0 ? 'STU3' : versionStr;
    }
    return releaseID;
  },


  /**
   *  Gets the release identifier for the version of FHIR being used by the
   *  server providing the FHIR context set via setFHIRContext (which must have
   *  been called first).
   * @param callback Because asking the FHIR server for its version is an
   *  asynchronous call, this callback function will be used to return the
   *  version when found.  The callback will be called asynchronously with a
   *  release string, like 'STU3' or 'R4'.  This string can then be passed to
   *  validateFHIRVersion to check that the needed support files have been loaded.
   *  If the release ID cannot be determined because the server's fhir
   *  version is not known, the version number will passed to the callback.  If
   *  communication with the FHIR server is not succesful, the callback will be
   *  called without an argument.
   */
  getServerFHIRReleaseID: function(callback) {
    if (!LForms.fhirContext)
      throw new Error('setFHIRContext needs to be called before getFHIRReleaseID');
    if (!LForms.fhirContext.client)
      throw new Error('setFHIRContext was called, but no server connection was provided');
    if (!LForms._serverFHIRReleaseID) {
      // Retrieve the fhir version
      try {
        var fhirAPI = LForms.fhirContext.client
        //fhirAPI.request('metadata?_elements=fhirVersion').then(function(res) // causes an error on lforms-smart-fhir (TBD)
        fhirAPI.getFhirVersion().then(function(fhirVersion) {
          LForms._serverFHIRReleaseID = LForms.Util._fhirVersionToRelease(fhirVersion);
          console.log('Server FHIR version is '+LForms._serverFHIRReleaseID+' ('+
            fhirVersion+')');
          callback(LForms._serverFHIRReleaseID);
        }, function(err) {
          console.log("Error retrieving server's CompatibilityStatement:");
          console.log(err);
          callback();
        });
      }
      catch(e) {
        setTimeout(function(){callback()});
        throw e;
      }
    }
    else { // preserve the asynchronous nature of the return
      setTimeout(function(){callback(LForms._serverFHIRReleaseID)});
    }
  },


  /**
   *  Checks to see if the given value is a valid FHIR version.  If the
   *  version is unsupported, an exception is thrown.  Also, if the version is
   *  supported but the support file is not loaded, an exception will be thrown.
   * @version the version of FHIR that was requested
   * @return the version passed in
   */
  validateFHIRVersion: function(version) {
    if (LForms.Util.FHIRSupport[version]) {
      if (!LForms.FHIR) {
        throw new Error('The FHIR support files for LHC-Forms do not appear to '+
          'have been loaded.  Please consult the documentation at '+
          'http://lhncbc.github.io/lforms/#fhirSupport.');
      }
      else if (!LForms.FHIR[version])
        throw new Error('Version '+version+
          ' of FHIR is supported, but the supporting code was not loaded.');
    }
    else
      throw new Error('Version '+version+' of FHIR is not supported.');
    return version;
  },


  /**
   *  Attempts to detect the version of FHIR specified in the given resource.
   * @param fhirData a FHIR resource.  Supported resource types are currently
   *  just Questionnaire and QuestionnaireResponse.
   * @return the FHIR version, or null if the FHIR version was not explicity
   *  specified in the resource.
   */
  detectFHIRVersion: function(fhirData) {
    var fhirVersion;
    if (fhirData.meta && fhirData.meta.profile) {
      var profiles = fhirData.meta.profile;
      // See http://build.fhir.org/versioning.html#mp-version
      var questionnairePattern =
        new RegExp('http://hl7.org/fhir/(\\d+\.\\d+)([\\.\\d]+)?/StructureDefinition/Questionnaire');
      var sdcPattern =
        new RegExp('http://hl7.org/fhir/u./sdc/StructureDefinition/sdc-questionnaire\\|(\\d+\.\\d+)(\.\\d+)?');
      for (var i=0, len=profiles.length && !fhirVersion; i<len; ++i) {
        var match = profiles[i].match(questionnairePattern);
        if (match)
          fhirVersion = match[1];
        else {
          match = profiles[i].match(sdcPattern);
          if (match) {
            fhirVersion = match[1];
            // See http://www.hl7.org/fhir/uv/sdc/history.cfml
            // Use FHIR 3.0 for SDC 2.0; There was no SDC 3.0
            if (fhirVersion == '2.0') {
              fhirVersion = '3.0';
            }
            // use FHIR 4.0 for SDC version >= 2.1
            else if (parseFloat(fhirVersion) >= 2.1) {
              fhirVersion = '4.0';
            }
          }
        }
      }
    }
    if (fhirVersion)
      fhirVersion = this._fhirVersionToRelease(fhirVersion);
    return fhirVersion;
  },


  /**
   *  Looks at the structure of the given FHIR resource to determine the version
   *  of FHIR, if possible.
   * @param fhirData a FHIR resource.  Supported resource types are currently
   *  just Questionnaire and QuestionnaireResponse.
   * @return the FHIR version number (e.g. STU3), or null if the type cannot be
   *  determined.
   */
  guessFHIRVersion: function(fhirData) {
    var version = null;
    if (fhirData.resourceType == 'Questionnaire') {
      // See if any items have a property deleted from R4.
      var items = [];
      var foundSTU3 = this._testValues(fhirData, 'item', function(item) {
        return !!(item.option || item.options ||
          (item.enableWhen && 'hasAnswer' in item.enableWhen));
      });
      version = foundSTU3 ? 'STU3' : 'R4';
    }
    else if (fhirData.resourceType == 'QuestionnaireResponse') {
      if (fhirData.parent)
        version = 'STU3';
      else {
        // See if any items have a property deleted from R4.
        var foundSTU3 = this._testValues(fhirData, 'item', function(item) {
          return !!item.subject;
        });
        version = foundSTU3 ? 'STU3' : 'R4';
      }
    }
    return version;
  },


  /**
   *  Searches the properties and sub-properties of "obj" for the given property
   *  name, testing their values to see if valTest returns true.
   * @param obj the object to be searched.  This can be an array.
   * @param property the property name to look for
   * @param testVal the function to use to test the property values.  This
   *  should return true if the value passes the test.
   * @return true if at least one value was found found whose key was "property"
   *  and for which testVal returned true.
   */
  _testValues: function(obj, property, valTest) {
    var rtn = false;
    if (obj instanceof Array) {
      for (var j=0, jLen=obj.length; !rtn && j<jLen; ++j)
        rtn = this._testValues(obj[j], property, valTest);
    }
    else if (typeof obj === "object") {
      var keys = Object.keys(obj);
      for (var i=0, len=keys.length; !rtn && i<len; ++i) {
        var key = keys[i];
        var val = obj[key];
        if (key === property) {
          if (val instanceof Array) {
            for (var k=0, kLen=val.length; !rtn && k<kLen; ++k)
              rtn = valTest(val[k]);
          }
          else
            rtn = valTest(val);
        }
        if (!rtn)
          rtn = this._testValues(val, property, valTest); // search sub-objects
      }
    }
    return rtn;
  },


  /**
   * Find the first wc-lhc-form web component within a DOM element, or in the HTML body,
   * and return the form data object from the wc-lhc-form web component.
   * @param element optional, a DOM element or a CSS selector of the DOM element that contains
   * a custom element 'wc-lhc-form'. If it is not provided, the function searches in the HTML body.
   * for the first 'wc-lhc-form'.
   * @returns {*}
   * @private
   */
  _getFormObjectInScope: function(element) {
    var formObj, lhcFormElements;
    if (typeof element === "string") {
      element = document.querySelector(element)
    }
    if (!element) {
      var bodyElement = document.getElementsByTagName("body");
      if (bodyElement && bodyElement.length > 0) {
        element = bodyElement[0];
        lhcFormElements = element.getElementsByTagName("wc-lhc-form");
      }
      else {
        lhcFormElements = document.getElementsByTagName("wc-lhc-form");
      }
    }
    else {
      lhcFormElements = element.getElementsByTagName("wc-lhc-form");
    }

    for (let formElement of lhcFormElements) {
      formObj = formElement.lhcFormData;
      break;
    }

    return formObj;
  },


  /**
   * Check if an item's value is empty, where the data has no meaningful use.
   * @param value the value to be tested
   * @returns {boolean}
   * @private
   */
  isItemValueEmpty: function(value) {
    var empty = true;
    if(value !== null && value !== undefined && value !== '' && typeof value !== 'function') {
      if(typeof value === 'string' || value instanceof String) {
        empty = value.trim() === '';
      }
      else if(Array.isArray(value)) {
        for(var i=0; i < value.length; ++i) {
          if(! this.isItemValueEmpty(value[i])) {
            empty = false;
            break;
          }
        }
      }
      else if(typeof value === 'object') {
        var keys = Object.keys(value);
        if(keys.length > 0) {
          for(var i=0, iLen=keys.length; i<iLen; i++) {
            if(! this.isItemValueEmpty(value[keys[i]])) {
              empty = false;
              break;
            }
          }
        }
        else if(value.constructor !== Object) { // e.g., a Date object has zero length keys
          empty = false;
        }
      }
      else {
        empty = false;
      }
    }

    return empty;
  },


  /**
   * Recursively find the first occurrence of an item, depth first, that matches the
   * given field value for the given field
   * @param items an array of LForms items, where an item may have its own sub-items.
   * @param key
   * @param matchingValue
   * @return {*}
   */
  findItem: function(items, key, matchingValue) {
    var ret = null;
    if(items) {
      for(var i=0; !ret && i < items.length; ++i) {
        var item = items[i];
        if(item[key] === matchingValue) {
          ret = item;
        }
        else if(Array.isArray(item.items)) {
          ret = this.findItem(item.items, key, matchingValue);
        }
      }
    }

    return ret;
  },


  /**
   * We are transitioning lforms fields representing code (form.code, items[x].questionCode
   * and items[x].questionCodeSystem) to FHIR definition of Coding type.
   * In lforms, these fields are string type and FHIR Coding is an array of
   * objects encapsulating multiple codes
   * .
   * To preserve compatibility with existing lforms code, we preserve
   * both lforms code and FHIR Coding. FHIR Coding is preserved in codeList.
   *
   * This function adopts the following rules.
   *
   * . If codeList is not present create it making the first item representing lforms code.
   * . If lforms code is not present, create it as appropriate (form.code or item[x].questionCode) from
   *   first item in codeList.
   * . Always make sure the first item in codeList represents lforms code.
   *
   * @param formOrItem - lforms form or items[x]
   */
  initializeCodes: function (formOrItem) {

    var isItem = (formOrItem.question || formOrItem.questionCode);
    var code = isItem ? formOrItem.questionCode : formOrItem.code;
    var codeSystem = isItem ? formOrItem.questionCodeSystem : formOrItem.codeSystem;
    var display = isItem ? formOrItem.question : formOrItem.name;
    var codeSystemUrl = this.getCodeSystem(codeSystem);

    // if there is code
    if(code) {
      if(!formOrItem.codeList) {
        formOrItem.codeList = [];
      }
      var codeList = formOrItem.codeList;
      var found = false;
      for(var i = 0; i < codeList.length; i++) {
        if(code === codeList[i].code && (!codeSystemUrl && !codeList[i].system || codeSystemUrl === codeList[i].system)) {
          found = true;
          break;
        }
      }

      // if form data is converted from a FHIR Questionnaire that has no 'code' on items,
      // don't create a 'code' when converting it back to Questionnaire.
      if(!found && codeSystemUrl !== 'LinkId') {
        var code = {
          code: code,
          display: display
        };
        if (codeSystemUrl) {
          code.system = codeSystemUrl;
        }
        codeList.unshift(code);
      }
    }
    // if there is a codeList
    else {
      if(formOrItem.codeList && formOrItem.codeList.length > 0) {
        if(isItem) {
          // questionCode is required, so this shouldn't happen??
          formOrItem.questionCode = formOrItem.codeList[0].code;
          formOrItem.questionCodeSystem = formOrItem.codeList[0].system;
        }
        else {
          formOrItem.code = formOrItem.codeList[0].code;
          formOrItem.codeSystem = formOrItem.codeList[0].system;
        }
      }
    }

    return formOrItem;
  },


  /**
   *  Creates a Reference to the given FHIR resource, to be used an a subject in
   *  another resource.
   * @param fhirRes the FHIR resource for which to create a Reference.
   * @return a FHIR Reference, with a local reference to fhirRes.
   */
  createLocalFHIRReference: function(fhirRes) {
    var ref = {"reference": fhirRes.resourceType+"/" + fhirRes.id};
    if (fhirRes.resourceType === "Patient") {
      if (fhirRes.name && fhirRes.name.length > 0) {
        var name = fhirRes.name[0];
        if (name.text)
          ref.display = name.text;
        else {
          if (name.given && name.given.length > 0)
            ref.display = name.given[0];
          if (name.family) {
            if (ref.display)
              ref.display = ref.display+' '+name.family;
            else
              ref.display = name.family;
          }
        }
      }
    }

    // Not sure what to put for display for something other than patient, but it
    // is optional, so for now I will just leave it blank.
    return ref;
  },


  /**
   * Get a code system based on the code system value used in LForms
   * @param codeSystemInLForms code system value used in LForms
   * @private
   */
  getCodeSystem: function(codeSystemInLForms) {

    var codeSystem;
    switch (codeSystemInLForms) {
      case "LOINC":
        codeSystem = "http://loinc.org";
        break;
      default:
        codeSystem = codeSystemInLForms;

    }

    return codeSystem;
  },


  /**
   * Removes an object(s) from an array searching it using key/value pair with an optional start index.
   * The matching value should be a primitive type. If start index is not specified,
   * it is assumed to be 0.
   *
   * @param targetObjects - Array of objects to search using key and value
   * @param key - key of the object to match the value
   * @param matchingValue - Matching value of the specified key.
   * @param starting_index - Optional start index to lookup. Negative number indicates index from end.
   *   The absolute value should be less than the length of items in the array. If not
   *   the starting index is assumed to be 0.
   * @param all - if false, removes the first matched object otherwise removes all matched objects.
   *   Default is false.
   *
   * @returns {Object|Array} - Returns removed object or array of objects.
   */
  removeObjectsFromArray: function(targetObjects, key, matchingValue, starting_index, all) {
    var ind = all ? [] : null;
    var ret = all ? [] : null;
    if(Array.isArray(targetObjects)) {
      var start = 0;
      // Figure out start index.
      if(starting_index && Math.abs(starting_index) < targetObjects.length) {
        if(starting_index < 0) {
          start = targetObjects.length + starting_index;
        }
        else {
          start = starting_index;
        }
      }
      var len = targetObjects.length;

      for(var i = start; i < len; i++) {
        if(targetObjects[i][key] === matchingValue) {
          var match = targetObjects[i];
          if (all) {
            ind.push(i);
            ret.push(match);
          }
          else {
            ind = i;
            ret = match;
            break;
          }
        }
      }
      if(Array.isArray(ind)) {
        for(var i = ind.length - 1; i >= 0; i--) {
          targetObjects.splice(ind[i], 1);
        }
      }
      else {
        if(ind !== null) {
          targetObjects.splice(ind, 1);
        }
      }
    }

    return ret;
  },


  /**
   *   Returns the part of an LForms form definition that all form definitions
   *   should have.
   */
  baseFormDef: function() {
    return {lformsVersion: LForms.lformsVersion};
  },


  /**
   * Get a list of warning messages about answer lists, which should have been
   * loaded from the URL in answerValueSet but were not.
   *
   * @param {*} formDataSource Optional.  Either the containing HTML element that
   *  includes the LForm's rendered form, a CSS selector for that element, an
   *  LFormsData object, or an LForms form definition (parsed).  If not
   *  provided, the first form found in the page will be used.
   */
  getAnswersResourceStatus : function(formDataSource) {
    if (!formDataSource || formDataSource instanceof HTMLElement || typeof formDataSource === 'string')
      formDataSource = this._getFormObjectInScope(formDataSource);

    return formDataSource.checkAnswersResourceStatus();
  },

  // /**
  //  * Used in lformsFHIR.min.js as LForms.Util.deepCopy
  //  * @param {*} sourceObj
  //  * @returns
  //  */

  // deepCopy: function(sourceObj) {
  //   return CommonUtils.deepCopy(sourceObj);
  // },

  // /**
  //  * Used in lformsFHIR.min.js as LForms.Util.pruneNulls
  //  *
  //  * @param collectionObj
  //  */
  //  pruneNulls: function (collectionObj) {
  //   CommonUtils.pruneNulls(collectionObj)
  // },

  // /**
  //  * Used in lformsFHIR.min.js as LForms.Util.stringToDate
  //  * @param {*} strDate
  //  * @param {*} looseParsing
  //  * @returns
  //  */
  // stringToDate: function(strDate, looseParsing) {
  //   return CommonUtils.stringToDate(strDate, looseParsing)
  // },

  // /**
  //  * sed in lformsFHIR.min.js as LForms.Util.dateToDTMString
  //  * @param {*} objDate
  //  * @returns
  //  */
  // dateToDTMString: function(objDate) {
  //   return CommonUtils.dateToDTMString(objDate)
  // },

  // /**
  //  * Used in lformsFHIR.min.js as LForms.Util.findObjectInArray
  //  * @param {*} targetObjects
  //  * @param {*} key
  //  * @param {*} matchingValue
  //  * @param {*} starting_index
  //  * @param {*} all
  //  */
  // findObjectInArray: function(targetObjects, key, matchingValue, starting_index, all) {
  //   return CommonUtils.findObjectInArray(targetObjects, key, matchingValue, starting_index, all)
  // }


  /**
   * Dynamically load a js file from a source URL
   * @param {*} url the URL of a js file
   * @returns a Promise that will resolve after the js file is loaded
   */
  loadScript: function(url) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.onreadystatechange = resolve;
      script.onload = resolve;
      script.onerror = reject;
      script.src = url;
      document.body.appendChild(script);
    });
  },


  /**
   * Load optional LForms FHIR js libs
   * @param {*} urlR4 the URL of the R4 version of the LForms FHIR lib
   * @param {*} urlStu3 the URL of the STU3 version of the LForms FHIR lib
   */
  loadFHIRLibs: function(urlR4, urlStu3) {
    return Promise.all([
      this.loadScript(urlR4),
      this.loadScript(urlStu3)])
  },


  /**
   *  Returns true if the given item from an LForms form definition has multiple answers (i.e. multi-select
   *  list).
   */
  _hasMultipleAnswers: function(item) {
    // Note that we do not set item._multipleAnswers here because this gets
    // called when importing a Questionnaire as a part of processing default
    // values, and we don't want that internal flag as a part of the LForms form
    // definition.
    return item.answerCardinality && item.answerCardinality.max &&
      (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1);
  }

};

const LhcFormUtils = {...CommonUtils,  ...FormUtils};

export default LhcFormUtils
