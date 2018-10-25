/**
 * LForms Utility tools
 */
if (typeof LForms === 'undefined')
  LForms = {};

LForms.Util = {
  /**
   *  Adds an LForms form to the page.
   * @param formDataVar The name of a global-scope variable containing the
   *  form's LForms definition.  The variable should be accessible as a property
   *  of the window object.
   * @param formContainer The ID of a DOM element to contain the form, or the
   *  element itself.  The contents of this element will be replaced by the form.
   *  This element should be outside the scope of any existing AngularJS app on
   *  the page.
   */
  addFormToPage: function(formDataVar, formContainer) {
    var formContainer = typeof formContainer === 'string' ?
      $('#'+formContainer) : $(formContainer);
    if (!this.pageFormID_)
      this.pageFormID_ = 0;
    var appName = 'LFormsApp' + ++this.pageFormID_;
    var controller = 'LFormsAppController'+ this.pageFormID_;
    formContainer.html(
      '<div ng-controller="'+controller+'">'+
        '<lforms lf-data="myFormData"></lforms>'+
      '</div>'+
      '<script>'+
        'angular.module("'+appName+'", ["lformsWidget"])'+
        '.controller("'+controller+'", ["$scope", function ($scope) {'+
        '  $scope.myFormData = new LForms.LFormsData('+formDataVar+');'+
        '}]);'+
      '</'+'script>'
    );
    // Bootstrap the element if needed
    // Following http://stackoverflow.com/a/34501500/360782
    var isInitialized = formContainer.injector();
    if (!isInitialized)
      angular.bootstrap(formContainer.children(':first'), [appName]);
  },


  /**
   * Get user input data from the form, with or without form definition data.
   * @param element the containing HTML element that includes the LForm's rendered form.
   * @param noFormDefData optional, to include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */
  getUserData: function(element, noFormDefData, noEmptyValue, noHiddenItem) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? formObj.getUserData(noFormDefData, noEmptyValue, noHiddenItem) : null;
  },


  /**
   * Get the complete form definition data, including the user input data from the form.
   * The returned data could be fed into a LForms widget directly to render the form.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or its id.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{}} Form definition data
   */
  getFormData: function(element, noEmptyValue, noHiddenItem) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? formObj.getFormData(noEmptyValue, noHiddenItem) : null;
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
   *  and "QuestionnaireResponse" (SDC profile)
   * @param fhirVersion the version of FHIR being used (e.g., 'STU3')
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *  It could either be the DOM element or its id
   * @param options A hash of other options.  See convertLFormsToFHIRData for
   *  the allowed values.
   * @returns {*} the requesteed FHIR resource.  For Questionnaire, the full form definition
   *  will be returned, but or DiagnosticReport and QuestionnaireResponse, empty
   *  or hidden questions will not be included.
   */
  getFormFHIRData: function(resourceType, fhirVersion, element, options) {
    var formObj = this._getFormObjectInScope(element);
    return this.convertLFormsToFHIRData(resourceType, fhirVersion, formObj, options);
  },


  /**
   * Convert LForms data into a FHIR resource
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport",
   * "Questionnaire" (both standard Questionnaire and SDC Questionnaire profile)
   * @param fhirVersion the version of FHIR being used to be used (e.g., 'STU3')
   * @param formData an LFormsData object or an LForms form definition
   * @param options A hash of other options, with the following optional keys:
   *  * bundleType, optional, maybe be either "transaction" or "collection".
   *    This is used when resourceType is set to "DiagnosticReport", and requests
   *    that the DiagnosticReport and associated Observation resources be placed
   *    together in a bundle.  When this is not present, a bundle will not be
   *    used.
   *  * noExtensions a flag that a standard FHIR Questionnaire or QuestionnaireResponse is to be created
   *        without any extensions, when resourceType is Questionnaire or QuestionnaireResponse.
   *        The default is false.
   * @returns {*} a FHIR resource
   */
  convertLFormsToFHIRData: function(resourceType, fhirVersion, formData, options) {
    if (!(formData instanceof LForms.LFormsData))
      formData = new LForms.LFormsData(formData);
    var version = this._validateFHIRVersion(fhirVersion);
    var fhir = LForms.FHIR[version];
    var fhirData = null;
    if (formData) {
      var noExtensions = options ? options.noExtensions : undefined;
      switch (resourceType) {
        case "DiagnosticReport":
          var bundleType = options ? options.bundleType : undefined;
          var inBundle = bundleType != undefined;
          fhirData = fhir.DiagnosticReport.createDiagnosticReport(formData, null, inBundle, bundleType);
          break;
        case "Questionnaire":
          fhirData = fhir.SDC.convertLFormsToQuestionnaire(formData, noExtensions);
          break;
        case "QuestionnaireResponse":
          fhirData = fhir.SDC.convertLFormsToQuestionnaireResponse(formData, noExtensions);
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
   *  fhirData) conains a meta.profile attibute specifying the FHIR versions.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {*} - an LForms json object
   */
  convertFHIRQuestionnaireToLForms: function(fhirData, fhirVersion) {
    var rtn = null;
    if (fhirData) {
      fhirVersion = fhirVersion ? this._validateFHIRVersion(fhirVersion) : this._detectFHIRVersion(fhirData);
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
   *  fhirData) conains a meta.profile attibute specifying the FHIR versions.
   *  (See http://build.fhir.org/versioning.html#mp-version)
   *  If both are provided, this takes precedence.
   * @returns {{}} an updated LForms form definition, with answer data
   */
  mergeFHIRDataIntoLForms: function(resourceType, fhirData, formData, fhirVersion) {
    if (fhirData) {
      fhirVersion = fhirVersion ? this._validateFHIRVersion(fhirVersion) : this._detectFHIRVersion(fhirData);
      var fhir = LForms.FHIR[fhirVersion];
      switch (resourceType) {
        case "DiagnosticReport":
          formData = fhir.DiagnosticReport.mergeDiagnosticReportToLForms(formData, fhirData);
          break;
        case "QuestionnaireResponse":
          formData = fhir.SDC.mergeQuestionnaireResponseToLForms(formData, fhirData);
          break;
      }
    }
    return formData;
  },


  /**
   *  Checks to see if the given value is a valid FHIR version.  If the
   *  version is unsupported, an exception is thrown.  Also, if the version is
   *  supported but the support file is not loaded, an exception will be thrown.
   * @version the version of FHIR that was requested
   * @return the version passed in
   */
  _validateFHIRVersion: function(version) {
    if (LForms.Util.FHIRSupport[version]) {
      if (!LForms.FHIR[version])
        throw 'Version '+version+' of FHIR is supported, but the supporting code was not loaded';
    }
    else
      throw 'Version '+version+' of FHIR is not supported';
    return version;
  },


  /**
   *  Attempts to detect the version of FHIR specified in the given resource.
   *  Throws an error if it is not found or if it is not a supported version.
   * @param fhirData a FHIR resource
   * @return the FHIR version, if found and supported
   */
  _detectFHIRVersion: function(fhirData) {
    var fhirVersion;
    if (fhirData.meta && fhirData.meta.profile) {
      var profiles = fhirData.meta.profile;
      var pattern = new RegExp('http://hl7.org/fhir/(\\d+)[\\.\\d]+)/StructureDefinition/');
      for (var i=0, len=profiles.length && !fhirVersion; i<len; ++i) {
        var match = profiles[i].match(pattern);
        if (match)
          fhirVersion = match(1);
      }
    }
    if (fhirVersion) {
      // See http://build.fhir.org/versioning.html#mp-version
      if (fhirVersion == '3')
        fhirVersion = 'STU3';
      else
        fhirVersion = 'R'+fhirVersion;
    }
    else {
      throw 'Could not determine the FHIR version for this resource.  '+
        'Please make sure it is specified via meta.profile (see '+
        'http://build.fhir.org/versioning.html#mp-version';
    }
    return this._validateFHIRVersion(fhirVersion);
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
   * Get a formatted date string from a date object
   * for example: "2016-10-31T14:42:12-04:00"
   * @param objDate a date object
   * @returns a formatted date string
   */
  dateToString: function(objDate) {
    var offset = objDate.getUTCOffset();
    offset = offset.slice(0,-2) + ":" + offset.slice(-2);
    return objDate.toString("yyyy-MM-ddTHH:mm:ss") + offset;
  },


  /**
   * Parse a formatted date string and create a date object
   * @param strDate a formatted date string
   * @returns a date object
   */
  stringToDate: function(strDate) {
    return new Date(strDate);
  },


  /**
   * Check if an item's value is empty, where the data has no meaningful use.
   * @param value the value to be tested
   * @returns {boolean}
   * @private
   */
  isItemValueEmpty: function(value) {
    var empty = true;
    if (typeof value !== 'undefined') {
      // object
      if (angular.isObject(value)) {
        var keys = Object.keys(value);
        for(var i=0, iLen=keys.length; i<iLen; i++) {
          var val = value[keys[i]];
          if (val !== null && val !== "" ) {
            empty = false;
            break;
          }
        }
      }
      // array
      else if (angular.isArray(value)) {
        if (value.length > 0) {
          empty = false;
        }
      }
      // other
      else if (value !== null && value !== "") {
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
   * @param key - Key of the the target object to match the value.
   * @param matchingValue - Matching value of the specified key.
   * @param starting_index - Optional start index to lookup. Negative number indicates index from end.
   *   The absolute value should be less than the length of items in the array. If not
   *   the starting index is assumed to be 0.
   *
   * @returns {*} - Matched object, otherwise null;
   */
  findObjectInArray: function(targetObjects, key, matchingValue, starting_index) {
    var ret = null;
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
          ret = targetObjects[i];
          break;
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
        else if(typeof collectionObj[i] === 'Array') {
          LForms.Util.pruneNulls(collectionObj[key]);
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
  }

  };
