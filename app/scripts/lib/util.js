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


// Utility tools and validations
WidgetUtil = {

  /*
   * Convert the form definition data from embedded format to reference list
   * and other changes to make the data valid to the widget
   */

  convertFromEmbeddedToReference: function(dataEmbedded) {
    var dataReference = {};
    var itemList = [];

    var items = dataEmbedded.items;
    this._convertSubItems(items, itemList, null);

    // temporary changes on the data from RI
    for(var i= 0, iLen=itemList.length; i<iLen; i++) {
      // header is true/false, not 'Y'/'N'
      if (itemList[i].header && (itemList[i].header =="Y" || itemList[i].header == true)) {
        itemList[i].header = true;
      }
      else {
        itemList[i].header = false;
      }
      // dateType should not be null for questions have answers
      if (itemList[i].answers && itemList[i].answers.length > 0) {
        itemList[i].dataType = 'CNE';
      }

      // move the "calculationMethod" to "formula"
      if (itemList[i].calculationMethod == "TOTALSCORE") {
        itemList[i].formula = {"name": "TOTALSCORE", "value":[]}
      }

      // value of max/min in questionCardinality and answerCardinality is integer
      if (itemList[i].questionCardinality) {
        if (itemList[i].questionCardinality.max) {
          if (itemList[i].questionCardinality.max == "*") {
            itemList[i].questionCardinality.max = -1;
          }
          else {
            itemList[i].questionCardinality.max = parseInt(itemList[i].questionCardinality.max)
          }
        }
        if (itemList[i].questionCardinality.min) {
          if (itemList[i].questionCardinality.min == "*") {
            itemList[i].questionCardinality.min = -1;
          }
          else {
            itemList[i].questionCardinality.min = parseInt(itemList[i].questionCardinality.min)
          }
        }
      }
      if (itemList[i].answerCardinality) {
        if (itemList[i].answerCardinality.max) {
          if (itemList[i].answerCardinality.max == "*") {
            itemList[i].answerCardinality.max = -1;
          }
          else {
            itemList[i].answerCardinality.max = parseInt(itemList[i].answerCardinality.max)
          }
        }
        if (itemList[i].answerCardinality.min) {
          if (itemList[i].answerCardinality.min == "*") {
            itemList[i].answerCardinality.min = -1;
          }
          else {
            itemList[i].answerCardinality.min = parseInt(itemList[i].answerCardinality.min)
          }
        }
      }
    }

    dataReference.type = dataEmbedded.type;
    dataReference.code = dataEmbedded.code;
    dataReference.name = dataEmbedded.name;
    dataReference.items = itemList;

    return dataReference;
  },

  /*
   * Convert the "items" from the embedded format to reference format
   * @param items
   * @param itemList
   * @parentQuestionCode
   */
  _convertSubItems: function(items, itemList, parentQuestionCode) {

    for (var i= 0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      var subItems = item.items
      // remove the "items" that is not needed in the reference list
      delete item.items;
      // add it to the reference list
      item.parentQuestionCode = parentQuestionCode
      itemList.push(item);
      if(subItems && subItems.length > 0) {
        this._convertSubItems(subItems, itemList, item.questionCode);
      }
    }

  }


};

