/**
 * Misc functions used by widget
 */
function checkDataType(dataType, value) {
  var ret = false;
  switch(dataType) {
    case "BL":
      if (value === true || value === false) {
        ret = true;
      }
      break;
    case "INT":
      var regex = /^\s*(\d+)\s*$/
      ret = regex.test(value);
      break;
    case "REAL":
      var regex = /^\-?\d+(\.\d*)?$/
      ret = regex.test(value);
      break;
    case "PHONE":
      var regex = /(((^\s*(\d\d){0,1}\s*(-?|\.)\s*(\(?\d\d\d\)?\s*(-?|\.?)){0,1}\s*\d\d\d\s*(-?|\.?)\s*\d{4}\b)|(^\s*\+\(?(\d{1,4}\)?(-?|\.?))(\s*\(?\d{2,}\)?\s*(-?|\.?)\s*\d{2,}\s*(-?|\.?)(\s*\d*\s*(-|\.?)){0,3})))(\s*(x|ext|X)\s*\d+){0,1}$)/
      ret = regex.test(value);
      break;
    case "EMAIL":
      var regex = /^\s*((\w+)(\.\w+)*)@((\w+)(\.\w+)+)$/
      ret = regex.test(value);
      break;
    case "TM":  // time
      var regex = /^\s*(((\d|[0-1]\d|2[0-4]):([0-5]\d))|(\d|0\d|1[0-2]):([0-5]\d)\s*([aApP][mM]))\s*$/
      ret = regex.test(value);
      break;
    case "DT":  // date
      var regex = /^\s*(19|20)(\d\d)([- /\.]?)(0[1-9]|1[012]|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\3(0[1-9]|[12][0-9]|3[01])$/
      ret = regex.test(value);
      break;
    case "ST":
    case "DTM":
    case "RTO":
    case "QTY":
    case "CNE":
    case "CWE":
    case "YEAR":
    case "MONTH":
    case "DAY":

    default :
  }
  return ret;
}

/**
 * Check the value against a list of the restrictions
 * @param restrictions a hash of the restrictions and their values
 * @param value
 * @returns {boolean}
 */
function checkRestrictions(restrictions, value) {
  // supported restriction keywords:
  // minExclusive
  // minInclusive
  // maxExclusive
  // maxInclusive
  // totalDigits     // up to
  // fractionDigits  // up to
  // length
  // maxLength
  // minLength
  // enumeration     // probably not needed
  // whiteSpace      // probably not needed
  // pattern
  var ret = false;

  var errorMsg = {};
  for (var key in restrictions) {
    switch(key) {
      case "minExclusive":
        var keyValue = restrictions[key];
        if (parseFloat(value) > parseFloat(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Entered number > " + keyValue;
        }
        break;
      case "minInclusive":
        var keyValue = restrictions[key];
        if (parseFloat(value) >= parseFloat(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Entered number >= " + keyValue;
        }
        break;
      case "maxExclusive":
        var keyValue = restrictions[key];
        if (parseFloat(value) < parseFloat(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Entered number < " + keyValue;
        }
        break;
      case "maxInclusive":
        var keyValue = restrictions[key];
        if (parseFloat(value) <= parseFloat(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Entered number <= " + keyValue;
        }
        break;
      case "totalDigits":
        var keyValue = restrictions[key];

        break;
      case "fractionDigits":
        var keyValue = restrictions[key];

        break;
      case "length":
        var keyValue = restrictions[key];
        if (value.length == parseInt(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Length = " + keyValue;
        }
        break;
      case "maxLength":
        var keyValue = restrictions[key];
        if (value.length <= parseInt(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Length <= " + keyValue;
        }
        break;
      case "minLength":
        var keyValue = restrictions[key];
        if (value.length >= parseInt(keyValue)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Length >= " + keyValue;
        }
        break;
      case "pattern":
        // the "\" in the pattern string should have been escaped
        var keyValue = restrictions[key];
        // get the pattern and the flag
        var parts = keyValue.split("/");
        var regex = new Regex(parts[1], parts[2]);
        if (regex.test(value)) {
          ret = true;
        }
        else {
          ret = false;
          errorMsg[key] = "Pattern matches " + keyValue;
        }
        break;
      default:
    }
  }

  return ret;
}

RegExp.escape= function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};



/**
 * Utility tools and validations
 */
WidgetUtil = {
  /**
   * Process some special cases in the current data files sent from RI.
   * These processes might change depending on the future data.
   * @param items
   */
  preprocessRIData: function(items) {

    for(var i= 0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      // header is true/false, not 'Y'/'N'
      if (item.header && (item.header =="Y" || item.header == true)) {
        item.header = true;
        item.dataType = "";
      }
      else {
        item.header = false;
      }
      // dataType should not be null for questions have answers
      // dateType might be 'CE' in data files from RI that have answers
      if (item.answers && item.answers.length > 0 &&
        (!item.dataType || item.dataType !=='CNE' && item.dataType !== 'CWE')) {
        item.dataType = 'CNE';
      }

      if (item.items && Array.isArray(item.items)) {
        this.preprocessRIData(item.items);
      }
    }
  },

  /**
   * Get form data from the LForms rendered form
   * @param elementId the containing HTML element that includes the LForm's rendered form.
   * @param noFormDefData optional, to include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */
  getFormData: function(element, noFormDefData, noEmptyValue, noHiddenItem) {

    // find the scope that has the LForms data
    var theScope, formData;
    if (!element) element = angular.element("body");

    // <form name="lf-panel"> is one of the easily identifiable elements in the rendered form.
    var lfPanels = angular.element(element).find("form[name='lf-panel']");

    angular.forEach(lfPanels, function(ele, index) {
      var lfPanel = angular.element(ele);
      if (lfPanel.scope().lfData) {
        theScope = lfPanel.scope();
        return false; // break the loop
      }
    });

    if (theScope) {
      formData = theScope.getFormData(noFormDefData, noEmptyValue, noHiddenItem);
    }

    return formData;

  }
};

