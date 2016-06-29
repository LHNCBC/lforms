/**
 * A package to process user data validations in LForms
 */
if (typeof LForms === 'undefined')
  LForms = {};

LForms.Validations = {
  // supported keys in restrictions
  _restrictionKeys : [
    "minExclusive",
    "minInclusive",
    "maxExclusive",
    "maxInclusive",
    "totalDigits", // not used
    "fractionDigits", // not used
    "length",
    "minLength",
    "maxLength",
    "enumeration", // not used
    "whiteSpace", // not used
    "pattern"
  ],

  // supported data types
  _dataTypes : [
    "BL",
    "INT",
    "REAL",
    "ST",
    "TX",      // long text
    "BIN",
    "DT",      // complex type (or sub-type of 'ST' ?)
    "DTM",     // complex type (or sub-type of 'ST' ?)
    "TM",      // complex type (or sub-type of 'ST' ?)
    "CNE",     // complex type
    "CWE",     // complex type
    "RTO",     // complex type
    "QTY",     // complex type
    "YEAR",    // sub-type of "ST"
    "MONTH",   // sub-type of "ST"
    "DAY",     // sub-type of "ST"
    "URL",     // sub-type of "ST"
    "EMAIL",   // sub-type of "ST"
    "PHONE",   // sub-type of "ST"
    ""        // for header, no input field
  ],

  _errorMessages: {
    "BL": "requires a boolean (true/false) value",     // Currently not supported by LForms
    "INT": "requires an integer value",
    "REAL": "requires a decimal value",
    "ST": "requires a string value",
    "TX": "requires a text value",
    "BIN": "requires a binary value",     // Currently not supported by LForms
    "DT": "requires a date value",
    "DTM": "requires a date and time value",  // Currently not supported by LForms
    "TM": "requires a time value",            // Currently not supported by LForms
    "CNE": "requires a value from the answer list",
    "CWE": "requires a value from the answer list or a user supplied value",
    "RTO": "requires a ratio value",          // Currently not supported by LForms
    "QTY": "requires a quantity value",       // Currently not supported by LForms
    "YEAR": "requires a year value",
    "MONTH": "requires a month value",
    "DAY": "requires a day value",
    "URL": "requires a URL",
    "EMAIL": "requires an email address",
    "PHONE": "requires a phone number"
  },

  /**
   * Returns false if the item requires a value but does not have one, and true otherwise
   * @param required a flag that indicates if the value is required
   * @param value the user input value
   * @param errors the error messages array that returns
   * @returns {boolean}
   */
  checkRequired: function(required, value, errors) {
    var ret = true;
    if (required &&
        (value === undefined || value === null || value === '' ||
        (angular.isObject(value) && value.text ==="") ||
        (angular.isArray(value) && value.length ===0))) {
      ret = false;
      errors.push("requires a value");
    }
    return ret;
  },


  /**
   * Check if value is of the specified data type
   * @param dataType the specified data type
   * @param value the user input value
   * @param errors the error messages array that returns
   * @returns {boolean}
   */
  checkDataType: function(dataType, value, errors) {

    var valid = true;
    if (value !== undefined && value !== null && value !=="") {
      switch(dataType) {
        case "BL":
          if (value !== true && value !== false) {
            valid = false;
          }
          break;
        case "INT":
          var regex = /^\s*(\d+)\s*$/;
          valid = regex.test(value);
          break;
        case "REAL":
          var regex = /^\-?\d+(\.\d*)?$/;
          valid = regex.test(value);
          break;
        case "PHONE":
          var regex = /(((^\s*(\d\d){0,1}\s*(-?|\.)\s*(\(?\d\d\d\)?\s*(-?|\.?)){0,1}\s*\d\d\d\s*(-?|\.?)\s*\d{4}\b)|(^\s*\+\(?(\d{1,4}\)?(-?|\.?))(\s*\(?\d{2,}\)?\s*(-?|\.?)\s*\d{2,}\s*(-?|\.?)(\s*\d*\s*(-|\.?)){0,3})))(\s*(x|ext|X)\s*\d+){0,1}$)/;
          valid = regex.test(value);
          break;
        case "EMAIL":
          var regex = /^\s*((\w+)(\.\w+)*)@((\w+)(\.\w+)+)$/;
          valid = regex.test(value);
          break;
        case "URL":
          var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          valid = regex.test(value);
          break;
        case "TM":  // time
          var regex = /^\s*(((\d|[0-1]\d|2[0-4]):([0-5]\d))|(\d|0\d|1[0-2]):([0-5]\d)\s*([aApP][mM]))\s*$/;
          valid = regex.test(value);
          break;
        case "YEAR":
          var regex = /^\d{1,4}$/;
          valid = regex.test(value);
          break;
        case "MONTH":
          var regex =/^(0[1-9]|1[012])$/;
          valid = regex.test(value);
          break;
        case "DAY":
          var regex = /^(0?[1-9]|[12]\d|3[01])$/;
          valid = regex.test(value);
          break;
        case "DT":  // date, handled by date directive
        case "ST":  // not needed
        case "DTM": // TBD
        case "RTO": // TBD
        case "QTY": // TBD
        case "CNE": // answers list with no exception, handled by autocomplete directive
        case "CWE": // answers list with exception, handled by autocomplete directive
        default :
          valid = true;
      }
    }

    if (angular.isArray(errors) && !valid) {
      errors.push(this._errorMessages[dataType]);
    }

    return valid;
  },

  /**
   * Check the value against a list of the restrictions
   * @param restrictions a hash of the restrictions and their values
   * @param value the user input value
   * @param errors the error messages array that returns
   * @returns {boolean}
   */
  checkRestrictions: function(restrictions, value, errors) {

    var allValid = true;
    if (value !== undefined && value !== null && value !=="") {
      for (var key in restrictions) {
        var valid = true;
        switch(key) {
          case "minExclusive":
            var keyValue = restrictions[key];
            if (parseFloat(value) > parseFloat(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a value greater than " + keyValue);
            }
            break;
          case "minInclusive":
            var keyValue = restrictions[key];
            if (parseFloat(value) >= parseFloat(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a value greater than or equal to " + keyValue);
            }
            break;
          case "maxExclusive":
            var keyValue = restrictions[key];
            if (parseFloat(value) < parseFloat(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a value less than " + keyValue);
            }
            break;
          case "maxInclusive":
            var keyValue = restrictions[key];
            if (parseFloat(value) <= parseFloat(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a value less than or equal to " + keyValue);
            }
            break;
          case "totalDigits":
            // TBD
            break;
          case "fractionDigits":
            // TBD
            break;
          case "length":
            var keyValue = restrictions[key];
            if (value.length == parseInt(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a total length of " + keyValue);
            }
            break;
          case "maxLength":
            var keyValue = restrictions[key];
            if (value.length <= parseInt(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a total length less than or equal to " + keyValue);
            }
            break;
          case "minLength":
            var keyValue = restrictions[key];
            if (value.length >= parseInt(keyValue)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires a total length greater than or equal to " + keyValue);
            }
            break;
          case "pattern":
            // the "\" in the pattern string should have been escaped
            var keyValue = restrictions[key];
            // get the pattern and the flag
            var parts = keyValue.split("/");
            var regex = new RegExp(parts[1], parts[2]);
            if (regex.test(value)) {
              valid = true;
            }
            else {
              valid = false;
              errors.push("requires to match a RegExp pattern of " + keyValue);
            }
            break;
          default:
            valid = true;
        }
        allValid = allValid && valid;
      }
    }

    return allValid;
  }
};