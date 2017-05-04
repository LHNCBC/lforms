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
   * Get HL7 OBR and OBX segment data from the form.
   * Empty or hidden questions are not included.
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or its id
   * @returns {null}
   */
  getFormHL7Data: function(element) {
    var formObj = this._getFormObjectInScope(element);
    return formObj ? LForms.HL7.toHL7Segments(formObj) : null;
  },


  /**
   * Get FHIR DiagnosticReport data from the form.
   * Empty or hidden questions are not included.
   * @param resourceType a FHIR resource type. it currently supports "DiagnosticReport", "Questionnaire" (SDC profile)
   * and "QuestionnaireResponse" (SDC profile)
   * @param element optional, the containing HTML element that includes the LForm's rendered form.
   *        It could either be the DOM element or its id
   * @returns {null}
   */
  getFormFHIRData: function(resourceType, element) {
    var formObj = this._getFormObjectInScope(element);
    var fhirData = null;
    if (formObj) {
      switch (resourceType) {
        case "DiagnosticReport":
          fhirData = LForms.FHIR.createDiagnosticReport(formObj);
          break;
        case "Questionnaire":
          fhirData = LForms.FHIR_SDC.convert2Questionnaire(formObj);
          break;
        case "QuestionnaireResponse":
          fhirData = LForms.FHIR_SDC.convert2QuestionnaireResponse(formObj);
          break;
      }
    }
    return fhirData;
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
  }

};