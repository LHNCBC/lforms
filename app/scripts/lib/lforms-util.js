/**
 * LForms Utility tools
 */

var moment = require('moment');
// Acceptable date formats

// Strict parsing -
var parseDateFormats = [
  'M/D/YYYY',
  'M/D/YY',
  'M/D',
  'M-D-YYYY',
  'M-D-YY',
  'M-D',
  'YYYY',
  'YYYY-M-D',
  'YYYY/M/D',
  moment.ISO_8601,
  'M/D/YYYY HH:mm',
  'M/D/YY HH:mm',
  'M/D HH:mm',
  'M-D-YYYY HH:mm',
  'M-D-YY HH:mm',
  'M-D HH:mm',
];


var LForms = require('../../lforms');

LForms.Util = {
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
   * @param {Object} [options] A hash of options
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
    var formContainer = typeof formContainer === 'string' ?
      $('#'+formContainer) : $(formContainer);
    if (typeof formDataDef === 'string') {
      if (formDataDef.indexOf('{') >= 0) // test for JSON
        formDataDef = JSON.parse(formDataDef);
      else // backward compatibility
        formDataDef = window[formDataDef];
    }

    // If resourceType is specified assume formDataDef is FHIR
    var resourceType = formDataDef.resourceType;
    var fhirVersion = options && options.fhirVersion;

    if (resourceType === 'Questionnaire') {
      formDataDef = this.convertFHIRQuestionnaireToLForms(formDataDef, fhirVersion);
    } else if (resourceType) {
      throw new Error('Only Questionnaire FHIR content is supported in addFormToPage.')
    }

    if (!this.pageFormID_)
      this.pageFormID_ = 0;
    var appName = 'LFormsApp' + ++this.pageFormID_;
    var controller = 'LFormsAppController'+ this.pageFormID_;
    if (!LForms.addedFormDefs)
      LForms.addedFormDefs = [];
    var formIndex = LForms.addedFormDefs.length;
    LForms.addedFormDefs.push(formDataDef);
    var prepop = options && options.prepopulate===true;
    formContainer.html(
      '<div ng-controller="'+controller+'">'+
        '<lforms lf-data="myFormData"></lforms>'+
      '</div>'
    );
    var rtnPromise = new Promise(function(resolve, reject) {
      angular.module(appName, ["lformsWidget"])
        .controller(controller, ["$scope", function ($scope) {
          var myFormData = new LForms.LFormsData(LForms.addedFormDefs[formIndex]);
          if (LForms.fhirContext) {
            myFormData.loadFHIRResources(prepop).then(function() {
              $scope.$apply(function() {
                $scope.myFormData = myFormData;
                resolve();
              })
            });
          }
          else {
            $scope.myFormData = myFormData;
            resolve();
          }
        }]);
    });

    // Bootstrap the element if needed
    // Following http://stackoverflow.com/a/34501500/360782
    var isInitialized = formContainer.injector && formContainer.injector();
    if (!isInitialized)
      angular.bootstrap(formContainer.children(':first'), [appName]);

    return rtnPromise;
  },


  /**
   * Get user input data from the form, with or without form definition data.
   * @param element the containing HTML element that includes the LForm's rendered form.
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
   *        It could either be the DOM element or its id.
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
   *        It could either be the DOM element or its id
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
   * @param options A hash of other options.  See convertLFormsToFHIRData for
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
   *    (using the observationLinkPeriod extension).  In this case the returned
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
            fhirData = fhir.SDC.convertLFormsToFHIRData(formData,
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
   * Merge a FHIR resource into an LForms form object
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport" and
   * "QuestionnaireResponse" (SDC profile)
   * @param fhirData a QuestionnaireResponse resource, a DiagnosticReport resource with "contained" Observation
   * resources,or a Bundle with DiagnosticReport and Observation resources
   * @param formData an LForms form definition or LFormsData object.
   * @param fhirVersion - the version of FHIR in which the fhirData is
   *  written.  This maybe be omitted if the Questionnaire resource (in
   *  fhirData) contains a meta.profile attibute specifying the FHIR version.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {{}} an updated LForms form definition, with answer data
   */
  mergeFHIRDataIntoLForms: function(resourceType, fhirData, formData, fhirVersion) {
    if (fhirData) {
      fhirVersion = this._requireValidFHIRVersion(fhirVersion, fhirData);
      var fhir = LForms.FHIR[fhirVersion];
      switch (resourceType) {
        case "DiagnosticReport":
          formData = fhir.DiagnosticReport.mergeDiagnosticReportToLForms(formData, fhirData);
          formData.hasSavedData = true;
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
   * @param fhirContext an optional object for accessing a FHIR context and
   *  FHIR API.  It should define the following operations:
   *  - getCurrent(typeList, callback):  "typeList" should be a list of desired
   *    FHIR resource types for which there is conceptually a "current" on in
   *    the FHIR context (e.g., Patient, or Practitioner).  Only one resource
   *    from the requested list will be returned, and the result will be null if
   *    none of the requested resource types are available.  Because retrieving
   *    the resource will generally be an asynchronous operation, the resource
   *    will be returned via the first argument to the provided "callback"
   *    function.
   *  - getFHIRAPI():  Should return an instance of fhir.js for interacting with
   *    the FHIR server.
   */
  setFHIRContext: function(fhirContext) {
    LForms.fhirContext = fhirContext;
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
    if (!LForms._serverFHIRReleaseID) {
      // Retrieve the fhir version
      try {
        var fhirAPI = LForms.fhirContext.getFHIRAPI();
        fhirAPI.conformance({}).then(function(res) {
          var fhirVersion = res.data.fhirVersion;
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
   * Find the form object in the scope based the form dom element
   * @param element element the containing HTML element that includes the LForm's rendered form.
   * @returns {*}
   * @private
   */
  _getFormObjectInScope: function(element) {
    // find the scope that has the LForms data
    var formObj;
    if (!element) element = jQuery("body");

    // class="lf-form"> is the element that contains rendered form.
    var lfForms = jQuery(element).find(".lf-form");
    angular.forEach(lfForms, function(ele, index) {
      var lfForm = angular.element(ele);
      if (lfForm.scope() && lfForm.scope().lfData) {
        formObj = lfForm.scope().lfData;
        return false; // break the loop
      }
    });

    return formObj;
  },

  /**
   * This function and stringToDTDateISO are meant to work as a pair on DT (or FHIR date) data type.
   * The idea is that DT/date type does not have timezone info, as a result, the string value could be
   * off by a day during either way of conversion depending on the time zone the code is executed.
   * The solution here is to keep the literal values of the year, month, and date components remain
   * unchanged regardless of the time zones.
   * Convert the given date object into a DT type date string, in "yyyy-mm-dd" format, where the
   * year, month, and date are based on the "local time zone" as the users can see on the display.
   * @param dateObj the date object to be converted.
   * @return date string in yyyy-mm-dd format with year, month, and date values corresponding to that
   * at the local timezone.
   */
  dateToDTStringISO: function (dateObj) {
    return (! dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime()))? undefined: [
      (10000 + dateObj.getFullYear()).toString().substr(1),
      (101 + dateObj.getMonth()).toString().substr(1),
      (100 + dateObj.getDate()).toString().substr(1) ].join('-');
  },

  /**
   * Parse the given iso date string, that is, a string of format "yyyy[-mm[-dd]]", into a Date object,
   * and then, adjust the year, month, and day so that when displayed (as local date) the literal values of
   * the year, month, and date components remain unchanged.
   * See the comments/docs for function dateToDTStringISO().
   * @param isoDateString
   */
  stringToDTDateISO: function(isoDateString) {
    var d = new Date(isoDateString);
    return isNaN(d.getTime())? undefined: new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  },

  /**
   * Get a formatted date string from a date object
   * for example: "2016-10-31T14:42:12Z"
   * @param objDate a date object, or a valid string representation of date.
   * @returns a formatted date string
   */
  dateToDTMString: function(objDate) {
    if(typeof objDate === 'string') {
      objDate = LForms.Util.stringToDate(objDate, true);
    }
    return objDate.toISOString();
  },

  /**
   * Parse a formatted date string and create a date object
   * @param strDate a formatted date string
   * @param looseParsing {boolean} - Do default parsing. Intended to parse output
   * from native date object, typically from programmatic output from widgets. Default is false.
   * @returns a date object
   */
  stringToDate: function(strDate, looseParsing) {
    if(! strDate || (typeof strDate) != 'string') { // maybe already a date object.
      return strDate;
    }

    if(strDate.trim() === 't') {
      return new Date();
    }

    let m = moment(strDate, parseDateFormats, true);
    if(looseParsing && !m.isValid()) { // Make another attempt for loose parsing.
      m = moment(strDate);
    }
    return m.isValid() ? m.toDate() : null;
  },


  /**
   * Validate date object or date string. If string, check to see if it is in acceptable formats.
   * See stringToDate() for acceptable formats.
   * @param date {Date | string} - Potential date object or date string
   * @returns boolean
   */
  isValidDate: function(date) {
    return !!(LForms.Util.stringToDate(date));
  },


  /**
   * Format a date object with given format. Refer to momentjs documentation for
   * format specification.
   *
   * @param date - Date object
   * @param format - Format string
   * @returns {string}
   */
  formatDate: function(date, format) {
    return moment(date).format(format);
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
   * Get the letter (or letters) indicator for the next repeating instance
   * The letters returned are in the pattern of:
   * 'a','b',...,'z','aa','ab',...,'az','ba','bb',...
   * for index that is:
   *  1,  2, ..., 26, 27,  28, ..., 52,  53,  54, ...
   * @param index the index for the current repeating instance, starting with 1
   */
  getNextLetter: function(index) {
    var letters = "abcdefghijklmnopqrstuvqxyz";
    var positions = [];
    var wkIndex = index;
    while (wkIndex > 0) {
      var letterIndex = wkIndex % 26;
      letterIndex = letterIndex === 0 ? 25 : letterIndex - 1;
      positions.push(letterIndex);
      wkIndex = Math.floor((wkIndex-1) / 26);
    }
    var nextLetter = "";
    for(var i=positions.length-1; i>=0; i--) {
      nextLetter += letters.charAt(positions[i]);
    }
    return nextLetter;
  },


  /**
   * Finds an object from an array using key/value pair with an optional start index.
   * The matching value should be a primitive type. If start index is not specified,
   * it is assumed to be 0.
   *
   * Only returns the first matched object in the array.
   *
   * @param targetObjects - Array of objects to search using key and value
   * @param key - Key of the target object to match the value.
   * @param matchingValue - Matching value of the specified key.
   * @param starting_index - Optional start index to lookup. Negative number indicates index from end.
   *   The absolute value should be less than the length of items in the array. If not
   *   the starting index is assumed to be 0.
   * @param all - If true, then an array will be returned containing all
   *  matches.
   *
   * @returns {*} - If "all" is false (default), then this returns the first matched
   *  object, or null if none matched.  If "all" is true, then this will return
   *  an array containing any matched objects.
   */
  findObjectInArray: function(targetObjects, key, matchingValue, starting_index, all) {
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
          if (all)
            ret.push(match);
          else {
            ret = match;
            break;
          }
        }
      }
    }

    return ret;
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
   * Remove key/values from an object based on a regular expression of key.
   *
   * @param obj {object} - Object to prune
   * @param keyRegex {regex} - A regular expression to match the keys for deletion
   * @param recursiveKey {optional|string} - Key of the recursive field. The value
   *                                of this should be an object or an Array of objects.
   * @private
   */
  _pruneObject: function (keyRegex, obj, recursiveKey) {
    if(typeof obj === 'object') {
      for(var k in obj) {
        if(k.match(keyRegex)) {
          delete obj[k];
        }
        else if(recursiveKey && k === recursiveKey) {
          var val = obj[k];
          if(Array.isArray(val)) {
            var len = val.length;
            for(var i = 0; i < len; i++) {
              this._pruneObject(keyRegex, val[i], recursiveKey);
            }
          }
          else {
            this._pruneObject(keyRegex, val, recursiveKey);
          }
        }
      }
    }
  },


  /**
   * Utility to walkthrough recurively through each element in a collection
   *
   * @param collectionObj
   */
  pruneNulls: function (collectionObj) {
    if (Array.isArray(collectionObj)) {
      for(var i = collectionObj.length - 1; i >= 0; i--) {
        if(collectionObj[i] === null || collectionObj[i] === undefined ) {
          collectionObj.splice(i, 1);
        }
        else if(typeof collectionObj[i] === 'object') {
          LForms.Util.pruneNulls(collectionObj[i]);
        }
      }
    }
    else if (collectionObj && typeof collectionObj === 'object') {
      var keys = Object.keys(collectionObj);
      keys.forEach(function (key) {
        if(collectionObj[key] === null || collectionObj[key] === undefined) {
          delete collectionObj[key];
        }
        else if (typeof collectionObj[key] === 'object') {
          LForms.Util.pruneNulls(collectionObj[key]);
        }
      });
    }
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
    var codeSystemUrl = LForms.Util.getCodeSystem(codeSystem);

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
   *  provided, the first form found in the page will be used.   */
  getAnswersResourceStatus : function(formDataSource) {
    if (!formDataSource || formDataSource instanceof HTMLElement || typeof formDataSource === 'string')
      formDataSource = this._getFormObjectInScope(formDataSource);

    return formDataSource.checkAnswersResourceStatus();
  }

};


