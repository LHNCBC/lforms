/**
 * Form definition data processing
 */
var LFormsData = Class.extend({
  // form type. for now the only type is "LOINC"
  type: null,
  // form's code
  code: null,
  // form's name
  name: null,

  // a pre-defined view template used to display the form
  template: null,
  // additional options that controls the selected view template
  templateOption: {},

  // the question items defined in a form
  items : [],

  // a delimiter used in code path and id path
  PATH_DELIMITER : "/",

  // repeatable question items derived from items
  _repeatableItems : {},

  // angular built-in validation tokens, not used yet
  _validationTokens: [
    "ng-maxlength",
    "ng-minlength",
    "pattern",
    "required",
    "number", // for INPUT element only
    "max",  // for number only
    "min",  // for number only
    "email",  // for INPUT element only
    "url",    // for INPUT element only
  ],

  // supported keys in restriction, not used yet
  _restrictionKeys : [
    "minExclusive",
    "minInclusive",
    "maxExclusive",
    "maxInclusive",
    "totalDigits",
    "fractionDigits",
    "length",
    "minLength",
    "maxLength",
    "enumeration",
    "whiteSpace",
    "pattern"
  ],

  // supported data type
  _dataTypes : [
    "BL",
    "INT",
    "REAL",
    "ST",
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
    "",        // for header, no input field
  ],

  // All accessory attributes of an item
  // (move all other properties into this _opt eventually.)
  _opt: {},

  // action logs for screen reader
  _actionLogs: [],

  /**
   * Constructor
   * @param data the lforms form definition data
   */
  init: function(data) {

    this.items = data.items;
    this.code = data.code;
    this.name = data.name;
    this.type = data.type;
    this.hasUserData = data.hasUserData;
    this.template = data.template;
    this.templateOption = data.templateOption || {};
    this.PATH_DELIMITER = data.PATH_DELIMITER || "/";
    this.answerLists = data.answerLists;

    // when the skip logic rule says the form is done
    this._formDone = false;

    // update internal data (_id, _idPath, _codePath, _displayLevel_),
    // that are used for widget control and/or for performance improvement.
    this._initializeInternalData();

  },


  /**
   * Calculate internal data from the raw form definition data,
   * including:
   * structural data, (TBD: unless they are already included (when hasUserData == true) ):
   *    _id, _idPath, _codePath
   * data for widget control and/or performance improvement:
   *    _displayLevel_,
   * @private
   */
  _initializeInternalData: function() {
    // set default values
    this._setDefaultValues();

    //TODO, process form data that includes user data

    //TODO, validate form data

    this._repeatableItems = {};
    this._setTreeNodes(this.items, this);

    this._updateLastSiblingList(this.items, null);

    this._updateLastRepeatingItemsStatus(this.items);
    this._updateLastItemInRepeatingSection(this.items);

    // create a reference list of all items in the tree
    this.itemList = [];
    this._updateItemReferenceList(this.items);

    this._standardizeScoreRule(this.itemList);

    this._resetHorizontalTableInfo();
    this._adjustLastSiblingListForHorizontalLayout();

    this.Navigation.setupNavigationMap(this);

  },

  /**
   * Reset internal structural data when repeatable items/groups are added or removed.
   * @private
   */
  _resetInternalData: function() {

    this._updateTreeNodes(this.items,this);
    this._updateLastSiblingList(this.items, null);

    this._updateLastRepeatingItemsStatus(this.items);
    this._updateLastItemInRepeatingSection(this.items);

    this.itemList = [];
    this._updateItemReferenceList(this.items);

    this._standardizeScoreRule(this.itemList);

    this._resetHorizontalTableInfo();
    this._adjustLastSiblingListForHorizontalLayout();

    this.Navigation.setupNavigationMap(this);
  },

  /**
   * Functions to run when values in the model change
   * To be optimized for performance.
   */
  updateOnValueChange: function() {
    // check skip logic
    this._updateSkipLogicStatus(this.items, null);

    // update tree line status
    this._updateTreeNodes(this.items,this);
    this._updateLastSiblingList(this.items, null);
    // update repeating items status
    //this._updateLastRepeatingItemsStatus(this.items);
    this._updateLastItemInRepeatingSection(this.items);
    this._adjustLastSiblingListForHorizontalLayout();

  },

  /**
   * Update each items skip logic status
   * @param items sibling items on one level of the tree
   * @param hide if the parent item is already hidden
   * @private
   */
  _updateSkipLogicStatus: function(items, hide) {
    for (var i=0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      // if one item is hidden all of its decedents should be hidden.
      // not necessary to check skip logic, assuming 'hide' has the priority over 'show'
      if (hide) {
        this._setSkipLogicStatusValue(item, "target-hide");
        var isHidden = true;
      }
      // if the item is not hidden, show all its decedents unless they are hidden by other skip logic.
      else {
        if (item.skipLogic) {
          var takeAction = this._checkSkipLogic(item);

          if (!item.skipLogic.action || item.skipLogic.action === "show") {
            var newStatus = takeAction ? 'target-show' : "target-hide";
            this._setSkipLogicStatusValue(item, newStatus);
          }
          else if (item.skipLogic.action === "hide") {
            var newStatus = takeAction ? 'target-hide' : "target-show";
            this._setSkipLogicStatusValue(item, newStatus);
          }
        }
        // if there's no skip logic, show it when it was hidden because one of its ancestors was hidden
        else if (item._skipLogicStatus === "target-hide") {
          this._setSkipLogicStatusValue(item, "target-show");
        }
        var isHidden = item._skipLogicStatus === "target-hide";
      }
      // process the sub items
      if (item.items && item.items.length > 0) {
        this._updateSkipLogicStatus(item.items, isHidden);
      }

    }
  },

  /**
   * Preset skip logic status for newly added repeating items
   * @param item an item
   * @param hide if the parent item is already hidden
   * @private
   */
  _presetSkipLogicStatus: function(item, hide) {
    // if it has skip logic or one of its ancestors has skip logic
    if (item.skipLogic || hide) {
      this._setSkipLogicStatusValue(item, "target-hide", true);
      var isHidden = true;
      // process the sub items
      if (item.items) {
        for (var i=0, iLen=item.items.length; i<iLen; i++) {
          this._presetSkipLogicStatus(item.items[i], isHidden);
        }
      }
    }
  },

  /**
   * Set the skip logic status value on an item and create a screen reader log
   * @param item an item
   * @param newStatus the new skip logic status
   * @param noLog optional, a flag that decides whether the action needs to be logged, default is false
   * @private
   */
  _setSkipLogicStatusValue: function(item, newStatus, noLog) {
    if (item._skipLogicStatus !== newStatus) {
      if (item._skipLogicStatus) {
        var msg = newStatus === "target-hide" ? 'Hiding ' + item.question : 'Showing ' + item.question;
        if (!noLog)
          this._actionLogs.push(msg);
      }
      item._preSkipLogicStatus = item._skipLogicStatus;
      item._skipLogicStatus = newStatus;
    }
  },

  /**
   * Create a list of reference to the items in the tree
   * @param items sibling items on one level of the tree
   * @private
   */
  _updateItemReferenceList: function(items) {

    for (var i=0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      this.itemList.push(item);
      // process the sub items
      if (item.items && item.items.length > 0) {
        this._updateItemReferenceList(item.items);
      }
    }
  },

  /**
   * Update the list that contains the last sibling status of the parent item on each level starting from root
   * @param items sibling items on one level of the tree
   * @param parentSiblingList the last sibling status list of the parent item
   * @private
   */
  _updateLastSiblingList: function(items, parentSiblingList) {

    for (var i=0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      // update last sibling status list
      // sub level
      if (parentSiblingList && Array.isArray(parentSiblingList)) {
        // make a copy
        item._lastSiblingList = parentSiblingList.slice();
        item._lastSiblingList.push(item._lastSibling);
      }
      // first level
      else {
        item._lastSiblingList = [item._lastSibling]
      }

      // process the sub items
      if (item.items && item.items.length > 0) {
        this._updateLastSiblingList(item.items, item._lastSiblingList);
      }
    }
  },

  /**
   * Convert the score rule definition to the standard formula definition
   * @param itemList the reference list of the items in the tree
   * @private
   */
  _standardizeScoreRule: function(itemList) {
    for (var i=0, iLen=itemList.length; i<iLen; i++) {
      var totalScoreItem = itemList[i];

      if (totalScoreItem.calculationMethod &&
        (totalScoreItem.calculationMethod.name === "TOTALSCORE" ||
        totalScoreItem.calculationMethod === "TOTALSCORE") ) {
        // TBD, if the parameters values are already supplied,
        totalScoreItem.calculationMethod = {"name": "TOTALSCORE", "value": []};

        for (var j = 0, jLen = itemList.length; j < jLen; j++) {
          var item = itemList[j];
          // it has an answer list
          if (item.answers) {
            var answers = [];
            if (Array.isArray(item.answers)) {
              answers = item.answers;
            }
            // check if any one of the answers has a score
            for (var k = 0, kLen = item.answers.length; k < kLen; k++) {
              if (item.answers[k] && item.answers[k].score >= 0) {
                totalScoreItem.calculationMethod.value.push(item.questionCode);
                break;
              }
            } // end of answers loop
          } // end if there's an answer list
        } // end of items loop
        break;
      }
    }

  },

  /**
   * Set default values if the data is missing.
   * @private
   */
  _setDefaultValues: function() {

    this._codePath = "";
    this._idPath = "";
    this._displayLevel = 0;

    // type
    if (!this.type || this.type.length == 0) {
      this.type = "LOINC"
    }
    // template
    if (!this.template || this.template.length == 0) {
      this.template = "panelTableV"
    }
    // templateOption
    if (!this.templateOption || jQuery.isEmptyObject(this.templateOption)) {
      this.templateOption = {
        obxTableColumns: [
          {"name" : "Name", "formatting":{"width": "45%", "min-width": "4em"}},
          {"name" : "", "formatting":{"width": "2.5em", "min-width": "2em", "class": "button-col"}},
          {"name" : "Value", "formatting":{"width": "40%", "min-width": "4em"}},
          {"name" : "Units", "formatting":{"width": "15%", "min-width": "4em"}}
//          {"name" : "Range", "formatting":{"width": "6em", "min-width": "4em"}}
        ],
        obrHeader: true,  // controls if the obr table needs to be displayed
        obrItems: [
          {"question":"Date Done", "questionCode":"date_done", "dataType":"DT","answers":"", "formatting":{"width":"10em","min-width":"4em"}, "answerCardinality":{"min":"1", "max":"1"}, "_answerRequired": true},
          {"question":"Time Done", "questionCode":"time_done", "dataType":"TM","answers":"", "formatting":{"width":"12em","min-width":"4em"}},
          {"question":"Where Done", "questionCode":"where_done", "dataType":"CWE","answers":[{"text":"Home","code":"1"},{"text":"Hospital","code":"2"},{"text":"MD Office","code":"3"},{"text":"Lab","code":"4"},{"text":"Other","code":"5"}], "formatting":{"width":"30%","min-width":"4em"}},
          {"question":"Comment", "questionCode":"comment","dataType":"ST","answers":"", "formatting":{"width":"70%","min-width":"4em"} }
        ]
      }
    }
  },

  /**
   * Set up the internal data for each item in the tree
   * @param items sibling items on one level of the tree
   * @param parentItem the parent item
   * @private
   */
  _setTreeNodes: function(items, parentItem) {
    var iLen=items.length, lastSiblingIndex = iLen -1;
    // for each item on this level
    for (var i=0; i<iLen; i++) {
      var item = items[i];
      if (!item._id) item._id = 1;
      item._codePath = parentItem._codePath + this.PATH_DELIMITER + item.questionCode;
      item._idPath = parentItem._idPath + this.PATH_DELIMITER + item._id;
      item._elementId = item._codePath + item._idPath;
      item._displayLevel = parentItem._displayLevel + 1;

      // set last sibling status
      item._lastSibling = i === lastSiblingIndex;

      // set default dataType
      // Make it a "ST" if it has a formula tp avoid amy mismatches of the data type in the model.
      // A type=number INPUT would require a number typed variable in the model. A string containing a number is not enough.
      // An error will be thrown in this case and an empty value will be set instead.
      if (!item.dataType || item.calculationMethod !== undefined &&
          !jQuery.isEmptyObject(item.calculationMethod)) {
        item.dataType = "ST";
      }
      if (item.header) {
        item.dataType = "";
      }

      // set default values on the item
      // questionCardinality
      if (!item.questionCardinality) {
        item.questionCardinality = {"min":"1", "max":"1"};
      }
      // answerCardinality
      if (!item.answerCardinality) {
        item.answerCardinality = {"min":"0", "max":"1"};
      }

      // set up flags for question and answer cardinality
      item._questionRepeatable = item.questionCardinality.max &&
          (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1);
      item._answerRequired = item.answerCardinality.min &&
          (item.answerCardinality.min && parseInt(item.answerCardinality.min) >= 1);
      item._multipleAnswers = item.answerCardinality.max &&
        (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1);

      // set up readonly flag
      item._readOnly = (item.editable && item.editable == "0") || (item.calculationMethod);

      // set up tooltip
      switch (item.dataType) {
        case "DT":
          item._toolTip = "MM/DD/YYYY";
          break;
        case "CNE":
          item._toolTip = item._multipleAnswers ? "Select one or more" : "Select one";
          break;
        case "CWE":
          item._toolTip = item._multipleAnswers ? "Select one or more or type a value" : "Select one or type a value";
          break;
        case "":
          item._toolTip = "";
          break;
        case "INT":
        case "REAL":
          item._toolTip = "Type a number";
          break;
        default: {
          if (!item.calculationMethod) {
            item._toolTip = "Type a value";
          }
        }
      }

      // process the sub items
      if (item.items && item.items.length > 0) {
        this._setTreeNodes(item.items, item);
      }

      // keep a copy of the repeatable items
      // before the parentItem is added to avoid circular reference that make the angular.copy really slow
      if (item._questionRepeatable) {
        item._repeatable = true;
        this._repeatableItems[item._codePath] = angular.copy(item);
      }
      // set a reference to its parent item
      item._parentItem = parentItem;

    }
  },

  /**
   * Update the internal data for each item in the tree when items are added or removed or the values change
   * @param items sibling items on one level of the tree
   * @param parentItem the parent item
   * @private
   */
  _updateTreeNodes: function(items, parentItem) {
    // for each item on this level
    var iLen=items.length, lastSiblingIndex = iLen -1;
    var foundLastSibling = false;
    for (var i=iLen-1; i>=0; i--) {
      var item = items[i];
      if (!item._id) item._id = 1;
      item._codePath = parentItem._codePath + this.PATH_DELIMITER + item.questionCode;
      item._idPath = parentItem._idPath + this.PATH_DELIMITER + item._id;
      item._elementId = item._codePath + item._idPath;
      item._displayLevel = parentItem._displayLevel + 1;
      item._parentItem = parentItem;

      item._repeatingSectionList = null;

      // set last sibling status
      item._lastSibling = i === lastSiblingIndex;

      // consider if the last sibling is hidden by skip logic
      if (!foundLastSibling) {
        if (item._skipLogicStatus === "target-hide" ) {
          item._lastSibling = false;
        }
        else {
          item._lastSibling = true;
          foundLastSibling = true;
        }
      }

      // process the sub items
      if (item.items && item.items.length > 0) {
        this._updateTreeNodes(item.items, item);
      }
    }
  },

  /**
   * Get the form data from the LForms widget. It might just include the "questionCode" and "value"
   * (and "unit" and "valueOther" if there's one). The same tree structure is returned.
   * @param noFormDefData optional, to not include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
   */
  getFormData: function(noFormDefData, noEmptyValue, noHiddenItem) {

    var ret = {};
    ret.itemsData = this._processDataInItems(this.items, noFormDefData, noEmptyValue, noHiddenItem);
    // template options could be optional. Include them, only if they are present
    if(this.templateOption && this.templateOption.obrHeader && this.templateOption.obrItems ) {
      ret.templateData = this._processDataInItems(this.templateOption.obrItems, noFormDefData, noEmptyValue, noHiddenItem);
    }

    return ret;
  },

  /**
   * Process each item on each level of the tree structure
   * @param items the items array
   * @param noFormDefData optional, to not include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
   * @returns {Array} form data on one tree level
   * @private
   */
  _processDataInItems: function(items, noFormDefData, noEmptyValue, noHiddenItem) {
    var itemsData = [];
    for (var i=0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      var itemData = {};

      // skip the item if the value is empty and the flag is set to ignore the items with empty value
      // or if the item is hidden and the flag is set to ignore hidden items
      if (noHiddenItem && item._skipLogicStatus === "target-hide" ||
          noEmptyValue && !item.value && !item.header) {
        continue;
      }
      // include only the code and the value (and unit, other value) if no form definition data is needed
      if (noFormDefData) {
        itemData.questionCode = item.questionCode;
        // not a header
        if (!item.header) {
          if (item.value) itemData.value = this._getOriginalValue(item.value);
          if (item.unit) itemData.unit = this._getOriginalValue(item.unit);
          if (item.valueOther) itemData.valueOther = item.valueOther; // "other value" is a string value
        }
      }
      // otherwise include form definition data
      else {
        // process fields
        for (field in item) {
          // special handling for user input values
          if (field === "value" || field === "unit") {
            itemData[field] = this._getOriginalValue(item[field]);
          }
          // ignore the internal lforms data and angular data
          else if (!field.match(/^[_\$]/)) {
            itemData[field] = angular.copy(item[field]);
          }
        }
      }

      // process the sub items
      if (item.items && item.items.length > 0) {
        itemData.items = this._processDataInItems(item.items, noFormDefData, noEmptyValue, noHiddenItem);
      }
      // not to add the section header if noEmptyValue is set, and
      // all its children has empty value (thus have not been added either) or it has not children, and
      // it has an empty value or it has an empty array as value
      //// (noEmptyValue && itemData.items && itemData.items.length === 0 && (!item.value || item.value.length === 0) )
      if (!noEmptyValue || (!itemData.items || itemData.items.length !== 0) || item.value && item.value.legnth !==0) {
        itemsData.push(itemData);
      }
    }
    return itemsData;
  },

  /**
   * Special handling for user input values, to get the original answer or unit object if there is one
   * @param value
   * @private
   */
  _getOriginalValue: function(value) {
    var retValue = value;
    if (value) {
      // an array
      if (Array.isArray(value)) {
        var answers = [];
        for (var j= 0, jLen=value.length; j<jLen; j++) {
          if (angular.isObject(value[j]) && value[j]._orig) {
            answers.push(angular.copy(value[j]._orig));
          }
          else {
            answers.push(angular.copy(value[j]));
          }
        }
        retValue = answers;
      }
      // an object
      else if (angular.isObject(value) && value._orig) {
        retValue = angular.copy(value._orig);
      }
      // not an object or an array
      else {
        retValue = angular.copy(value);
      }
    }
    return retValue;
  },

  /**
   * Get the max _id of the repeating item on the same level
   * @param item an item
   * @returns {number}
   */
  getRepeatingItemMaxId: function(item) {
    var maxId = item._id;
    if (item._parentItem && Array.isArray(item._parentItem.items)) {
      for (var i= 0, iLen=item._parentItem.items.length; i<iLen; i++) {
        if (item._parentItem.items[i]._codePath == item._codePath &&
          item._parentItem.items[i]._id > maxId ) {
          maxId = item._parentItem.items[i]._id;
        }
      }
    }
    return maxId;
  },

  /**
   * Get the count of the repeating item on the same level
   * @param item an item
   * @returns {number}
   */
  getRepeatingItemCount: function(item) {
    var count = 0;
    if (item._parentItem && Array.isArray(item._parentItem.items)) {
      for (var i= 0, iLen=item._parentItem.items.length; i<iLen; i++) {
        if (item._parentItem.items[i]._codePath == item._codePath) {
          count++;
        }
      }
    }
    return count;
  },

  /**
   * Update the last repeating item status on each item
   * @param items sibling items on one level of the tree
   * @private
   */
  _updateLastRepeatingItemsStatus: function(items) {
    var iLen = items.length;
    var prevCodePath = '';
    // process all items in the array except the last one
    for (var i=0; i<iLen; i++) {
      var item = items[i];
      if (prevCodePath !== '') {
        // it's a different item, and
        // previous item is a repeating item, set the flag as the last in the repeating set
        if (prevCodePath !== item._codePath && items[i - 1]._questionRepeatable) {
          items[i - 1]._lastRepeatingItem = true;
        }
        else {
          items[i - 1]._lastRepeatingItem = false;
        }
      }
      prevCodePath = item._codePath;
      // check sub levels
      if (item.items && item.items.length > 0) {
        this._updateLastRepeatingItemsStatus(item.items);
      }
    }
    // the last item in the array
    if (items[iLen-1]._questionRepeatable) {
      items[iLen-1]._lastRepeatingItem = true;
    }
    else {
      items[iLen-1]._lastRepeatingItem = false;
    }
    // check sub levels
    if (items[iLen-1].items && items[iLen-1].items.length > 0) {
      this._updateLastRepeatingItemsStatus(items[iLen-1].items);
    }

  },


  /**
   * Update the status list that includes the last items of each repeating items and sections from the item up to
   * the root.
   * If it is a repeating section, the last item is the last leaf node within the last repeating section.
   * @param items sibling items on one level of the tree
   * @private
   */
  _updateLastItemInRepeatingSection: function(items) {
    for (var i=0, iLen=items.length; i<iLen; i++) {
      var item = items[i];

      // if it is the last repeating item, and it is not hidden by skip logic
      if (item._lastRepeatingItem && item._skipLogicStatus !== "target-hide" ) {
        var lastItem = this._getLastSubItem(item);
        if (lastItem._repeatingSectionList) {
          lastItem._repeatingSectionList.unshift(item);
        }
        else {
          lastItem._repeatingSectionList = [item];
        }
      }
      // process the sub items if it's not hidden
      if (item._skipLogicStatus !== "target-hide" && item.items && item.items.length > 0) {
        this._updateLastItemInRepeatingSection(item.items);
      }
    }

  },

  /**
   * Get the last item that will be displayed in a repeating section
   * @param item an item
   * @returns {*}
   * @private
   */
  _getLastSubItem: function(item) {
    var retItem = item;
    if (item && Array.isArray(item.items) && item.items.length > 0) {

      var lastItem, i = item.items.length, found = false;
      // found the last item that is not hidden
      do {
        lastItem = item.items[--i];
        if (lastItem._skipLogicStatus !== "target-hide") {
          found = true;
        }
      }
      while(!found);

      if (found) {
        retItem = this._getLastSubItem(lastItem);
      }
    }
    return retItem;
  },

  /**
   * Set up the internal data for handling the horizontal table
   * Note:
   * 1) "layout" values 'horizontal' and 'vertical' are only set on items whose "header" is true
   * 2) any items within a 'horizontal' table must be a leaf node. i.e. it cannot contain any sub items.
   * 3) all items within a 'horizontal' table has it's "_inHorizontalTable" set to true.
   * 4) _repeatableItems is reused for adding a repeating row in a horizontal table. but the header item will not be added.
   * i.e. the table should not have more than one table title
   *
   * _horizontalTableInfo structure:
   * _horizontalTableInfo: {
   *    headerItem._horizontalTableId : {
   *      tableStartIndex: firstItemIndex (=== firstHeaderItemIndex === h1),
   *      tableEndIndex:   lastItemIndex,
   *      columnHeaders:   [ { label: item.question, id: 'col' + item.elementId },
   *                       ...],
   *      tableHeaders:    [headerItem1, headerItem2, ...]
   *      tableRows:       [{ header: headerItem1, cells : [rowItem11, rowItem12,...]},
   *                        { header: headerItem2, cells : [rowItem21, rowItem22,...]},
   *                       ... ],
   *      lastHeaderId:    lastHeaderId
   *    }
   *  }
   * @private
   */
  _resetHorizontalTableInfo: function() {

    this._horizontalTableInfo = {};

    var tableHeaderCodePathAndParentIdPath = null;
    var lastHeaderId = null;

    for (var i= 0, iLen=this.itemList.length; i<iLen; i++) {
      var item = this.itemList[i];
      // header item and horizontal layout
      if (item.header && item.layout == "horizontal" ) {
        // same methods for repeating items could be used for repeating and non-repeating items.
        // (need to rename function names in those 'repeatable' functions.)
        var itemsInRow = [];
        var columnHeaders = [];
        item._inHorizontalTable = true;
        var itemCodePathAndParentIdPath = item._codePath + item._parentItem._idPath;
        lastHeaderId = item._elementId;
        // if it's the first row (header) of the first table,
        if (tableHeaderCodePathAndParentIdPath === null ||
          tableHeaderCodePathAndParentIdPath !== itemCodePathAndParentIdPath) {
          // indicate this item is the table header
          tableHeaderCodePathAndParentIdPath = itemCodePathAndParentIdPath;
          item._horizontalTableHeader = true;
          item._horizontalTableId = tableHeaderCodePathAndParentIdPath;

          itemsInRow = item.items;
          for (var j= 0, jLen=itemsInRow.length; j<jLen; j++) {
            columnHeaders.push({label: itemsInRow[j].question, id: "col" + itemsInRow[j]._elementId});
            // indicate the item is in a horizontal table
            itemsInRow[j]._inHorizontalTable = true;
          }

          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath] = {
            tableStartIndex: i,
            tableEndIndex: i+itemsInRow.length,
            columnHeaders: columnHeaders,
            tableRows: [{ header: item, cells : itemsInRow }],
            tableHeaders: [item]
          };

          // set the last table/row in horizontal group/table flag
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath]['lastHeaderId'] = lastHeaderId;
        }
        // if it's the following rows, update the tableRows and tableEndIndex
        else if (tableHeaderCodePathAndParentIdPath === itemCodePathAndParentIdPath ) {
          itemsInRow = item.items;
          for (var j= 0, jLen=itemsInRow.length; j<jLen; j++) {
            // indicate the item is in a horizontal table
            itemsInRow[j]._inHorizontalTable = true;
          }
          // update rows index
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableRows.push({header: item, cells : itemsInRow});
          // update headers index (hidden)
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableHeaders.push(item);
          // update last item index in the table
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableEndIndex = i + itemsInRow.length;
          // set the last table/row in horizontal group/table flag
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath]['lastHeaderId'] = lastHeaderId;
        }
      }
    }
  },


  /**
   * Adjust the last sibling list for the first header item of horizontal tables
   * @private
   */
  _adjustLastSiblingListForHorizontalLayout: function() {
    var horizontalTables = this._horizontalTableInfo;

    for (var tableId in horizontalTables) {
      var tableHeaders = horizontalTables[tableId].tableHeaders;
      if (tableHeaders.length > 1) {
        // Pass the last header's last sibling status to the first header,
        // which is used for controlling the tree lines of the horizontal table.
        var firstTableHeader = tableHeaders[0];
        var lastTableHeader = tableHeaders[tableHeaders.length -1];
        firstTableHeader._lastSibling = lastTableHeader._lastSibling;
        firstTableHeader._lastSiblingList = lastTableHeader._lastSiblingList;
      }
    }
  },


  /**
   * Add a repeating item or a repeating section and update form status
   * @param item an item
   * @returns the newly added item or a header item of the newly added section
   */
  addRepeatingItems: function(item) {

    var maxRecId = this.getRepeatingItemMaxId(item);
    var newItem = angular.copy(this._repeatableItems[item._codePath]);
    newItem._id = maxRecId + 1;

    if (item._parentItem && Array.isArray(item._parentItem.items)) {
      var insertPosition = 0;
      for (var i= 0, iLen=item._parentItem.items.length; i<iLen; i++) {
        if (item._parentItem.items[i]._codePath == item._codePath &&
          item._parentItem.items[i]._idPath == item._idPath) {
          insertPosition = i;
          break;
        }
      }
      item._parentItem.items.splice(insertPosition + 1, 0, newItem);
      newItem._parentItem = item._parentItem;

      // preset the skip logic status to target-hide on the new items
      this._presetSkipLogicStatus(newItem, false);
    }

    this._resetInternalData();
    var readerMsg = 'Added ' + this.itemDescription(item);
    this._actionLogs.push(readerMsg);

    return newItem;
  },


  /**
   * Get a list of repeating items that the current item belongs to.
   * @param item the current item
   * @returns {Array}
   * @private
   */
  _getRepeatingItems: function(item) {
    var repeatingItems = [];
    if (item._repeatable && item._parentItem && Array.isArray(item._parentItem.items)) {
      var items = item._parentItem.items;
      for (var i = 0, iLen = items.length; i < iLen; i++) {
        if (items[i]._codePath === item._codePath) {
          repeatingItems.push(items[i]);
        }
      }
    }
    return repeatingItems;
  },


  /**
   * Get the sibling repeating item that is before the current item
   * @param item the current item
   * @returns {*} the previous item or null
   */
  getPrevRepeatingItem: function(item) {
    var repeatingItems = this._getRepeatingItems(item);
    var elementIDs = repeatingItems.map(function(it) {return it._elementId});
    var posIndex = elementIDs.indexOf(item._elementId);
    // return null if there is no items before this one
    return posIndex >0 ? repeatingItems[posIndex - 1] : null;
  },


  /**
   * Get the sibling repeating item that is after the current item
   * @param item the current item
   * @returns {*} the next item or null
   */
  getNextRepeatingItem: function(item) {
    var repeatingItems = this._getRepeatingItems(item);
    var elementIDs = repeatingItems.map(function(it) {return it._elementId});
    var posIndex = elementIDs.indexOf(item._elementId);
    // return null if there is no items after this one
    return posIndex < repeatingItems.length -1 ? repeatingItems[posIndex + 1] : null;
  },


  /**
   * Get the sibling repeating item that is the first one
   * @param item the current item
   * @returns {*} the first item
   */
  getFirstRepeatingItem: function(item) {
    var repeatingItems = this._getRepeatingItems(item);
    // always return the first one
    return repeatingItems[0];
  },


  /**
   * Get the sibling repeating item that is the last one
   * @param item the current item
   * @returns {*} the last item
   */
  getLastRepeatingItem: function(item) {
    var repeatingItems = this._getRepeatingItems(item);
    // always return the last one
    return repeatingItems[repeatingItems.length - 1];
  },


  /**
   * Remove a repeating item or a repeating section and update form status
   * @param item an item
   */
  removeRepeatingItems: function(item) {

    if (item._parentItem && Array.isArray(item._parentItem.items)) {
      for (var i = 0, iLen = item._parentItem.items.length; i < iLen; i++) {
        if (item._parentItem.items[i]._codePath == item._codePath &&
          item._parentItem.items[i]._idPath == item._idPath) {
          item._parentItem.items.splice(i, 1);
          break;
        }
      }
    }

    this._resetInternalData();
    var readerMsg = 'Removed ' + this.itemDescription(item);
    this._actionLogs.push(readerMsg);
  },


  /**
   *  Returns the description of an item (section/question/row).
   * @param item the item whose type is needed
   */
  itemDescription: function(item) {
    return item._inHorizontalTable ?  'row' : item.header? 'section' : 'question';
  },


  /**
   * Get the scores from source items
   * @param item the target item where the score rule is defined
   * @param formula the score rule formula
   * @returns {Array}
   * @private
   */
  _getScores: function(item, formula) {
    var scores = [];
    var sourceItems = this._getFormulaSourceItems(item, formula.value);

    for (var i= 0, iLen= sourceItems.length; i<iLen; i++) {
      var item = sourceItems[i];
      var score = 0;
      if (item && item.value && item.value.score ) {
        score = item.value.score
      }
      scores.push(score);
    }
    return scores;
  },

  /**
   * Get a source item from the question code defined in a score rule
   * @param item the target item where a score rule is defined
   * @param questionCodes the code of a source item
   * @returns {Array}
   * @private
   */
  _getFormulaSourceItems: function(item, questionCodes) {
    var sourceItems = [];

    for (var i= 0, iLen=questionCodes.length; i<iLen; i++) {
      var questionCode = questionCodes[i];
      var sourceItem = null;
      // check siblings
      if (item._parentItem && Array.isArray(item._parentItem.items)) {
        for (var j= 0, jLen= item._parentItem.items.length; j<jLen; j++) {
          if (item._parentItem.items[j].questionCode === questionCode) {
            sourceItem = item._parentItem.items[j];
            break;
          }
        }
      }
      // check ancestors
      if (!sourceItem) {
        var parentItem = item._parentItem;
        while (parentItem) {
          if (parentItem.questionCode === questionCode) {
            sourceItem = parentItem;
            break;
          }
          parentItem = parentItem._parentItem;
        }
      }
      sourceItems.push(sourceItem);
    }
    return sourceItems;
  },

  /**
   * Convert an item's value in its selected unit to the value in standard unit used for calculation
   * @param item an item
   * @param formula the formula defined on the item
   * @returns {Array}
   * @private
   */
  _getValuesInStandardUnit : function(item, formula) {
    var values = [];
    var sourceItems = this._getFormulaSourceItems(item, formula.value);

    for (var i= 0, iLen= sourceItems.length; i<iLen; i++) {
      var valueInStandardUnit = '';
      var item = sourceItems[i];
      if (item.value) {
        if (item.unit && item.unit.value) {
          valueInStandardUnit = this.Units.getValueInStandardUnit(item.value, item.unit.value);
        }
        else {
          valueInStandardUnit = item.value;
        }
      }
      values.push(valueInStandardUnit);
    }
    return values;
  },

  /**
   * Run the formula on the item and get the result
   * @param item an item
   * @returns {string}
   */
  getFormulaResult: function(item) {
    var result ='';
    var parameterValues = [];
    if (item.calculationMethod) {
      var formula = item.calculationMethod;
      // run score rule (there should be one score rule only in a form)
      if (formula.name === 'TOTALSCORE') {
        parameterValues = this._getScores(item, formula);
      }
      // run non-score rules
      else {
        // find the sources and target
        parameterValues = this._getValuesInStandardUnit(item,formula);
      }
      // calculate the formula result
      result = this.Formulas.calculations_[formula.name](parameterValues)
    }
    return result;
  },

  //// not used
  //// it might be needed for performance optimization
  //runFormulas_NEW: function() {
  //  for (var i= 0, iLen=this.itemList.length; i<iLen; i++) {
  //    var item = this.itemList[i];
  //    if (item.calculationMethod) {
  //      item.value = this.getFormulaResult(item);
  //    }
  //  }
  //},


  /**
   * Units modules
   * Embedded in lforms-data.js. To be separated as a independent file.
   */
  Units: {
    getValueInStandardUnit: function(value, unit) {
      var result = value * this.units_[unit];
      return result.toFixed(this.precision_);
    },
    getStandardUnit: function() {
      // TBD when 'units_' is redesigned
    },

    precision_ : 4,
    units_ : {
      // 'WEIGHT', kg
      'kg' : 1,
      'kgs' : 1,
      'kilograms' : 1,
      'pounds' : 0.453592,
      'lbs' : 0.453592,
      // 'LENGTH', cm
      'cm' : 1,
      'cms' : 1,
      'centimeters' : 1,
      'feet' : 30.48,
      'ft' : 30.48,
      'inches' : 2.54,
      'meters' : 100,
      'ft-inches' : 2.54  // converted to inches first ???
    }
  },

  /**
   * Formula modules
   * Embedded in lforms-data.js. To be separated as a independent file.
   */
  Formulas: {
    calculations_: {
      precision_: 2,
      'TOTALSCORE': function (sources) {
        var totalScore = 0;
        for (var i = 0, ilen = sources.length; i < ilen; i++) {
          totalScore += sources[i];
        }
        return totalScore;
      },
      // BMI = weight (kg) / [height (m)] * 2
      // BMI = weight (lb) / [height (in)] * 2 x 703
      'BMI': function (sources) {
        var ret = '';
        var weightInKg = sources[0], heightInCm = sources[1];
        if (weightInKg && weightInKg != '' && heightInCm && heightInCm != '' && heightInCm != '0') {
          ret = weightInKg / Math.pow((heightInCm / 100), 2);
          ret = ret.toFixed(this.precision_);
        }
        return ret;

      },

      // BSA (m2) = SQR RT ( [Height(cm) x Weight(kg) ] / 3600 )
      'BSA': function (sources) {
        var ret = '';
        var weightInKg = sources[0], heightInCm = sources[1];
        if (weightInKg && weightInKg != '' && heightInCm && heightInKg != '') {
          ret = Math.sqrt(heightInCm * weightInKg / 3600);
          ret = ret.toFixed(this.precision_);
        }
        return ret;

      }
    }
  },

  /**
   * Check if a number is within a range.
   * keys in a range are "minInclusive"/"minExclusive" and/or "maxInclusive"/"maxExclusive"
   * range example: {"minInclusive": 3, "maxInclusive":10}
   * @param range data range
   * @param numValue an item's numeric value
   * @returns {boolean}
   * @private
   */
  _inRange: function(range, numValue) {
    var inRange = false;

    if (range && !isNaN(numValue)) {
      var fields = Object.keys(range);
      // one key
      if (fields.length == 1) {
        switch (fields[0]) {
          case "minInclusive":
            inRange = range["minInclusive"] <= numValue;
            break;
          case "minExclusive":
            inRange = range["minExclusive"] < numValue;
            break;
          case "maxInclusive":
            inRange = range["maxInclusive"] >= numValue;
            break;
          case "maxExclusive":
            inRange = range["maxExclusive"] > numValue;
            break;
        } // end of switch
      } // end of one key
      // two keys
      else if (fields.length == 2) {
        // check the lower end
        if (range.hasOwnProperty("minInclusive")) {
          inRange = range["minInclusive"] <= numValue;
        }
        else if (range.hasOwnProperty("minExclusive")) {
          inRange = range["minExclusive"] < numValue;
        }
        // check the upper end
        if (inRange) {
          if (range.hasOwnProperty("maxInclusive")) {
            inRange = range["maxInclusive"] >= numValue;
          }
          else if (range.hasOwnProperty("maxExclusive")) {
            inRange = range["maxExclusive"] > numValue;
          }
        } // end if lower end valid
      } // end of two keys
    } // end of valid range and numValue

    return inRange;

  },

  /**
   * Shallowly compares two JavaScript objects to see if their keys and values are equal.
   * @param obj1
   * @param obj2
   * @returns {boolean}
   * @private
   */
  _objectEqual: function(obj1, obj2) {
    var ret = true;

    // different type
    if (typeof obj1 !== typeof obj2 ) {
      ret = false;
    }
    // not object
    else if (typeof obj1 !== "object") {
      if (obj1 !== obj2) {
        ret = false;
      }
    }
    // object
    else {
      var keys1 = Object.keys(obj1);
      var keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length ) {
        ret = false;
      }
      else {
        // comparison from obj1 to obj2
        for (var i= 0, iLen=keys1.length; i<iLen; i++) {
          if (obj1[keys1[i]] !== obj2[keys1[i]]) {
            ret = false;
            break;
          }
        }
        // comparison from obj2 to obj1
        // is not necessary once the lengths have benn checked.
      }
    }
    return ret;
  },


  ///**
  // * Get a source item from the question code defined in a skip logic
  // * @param item the target item where a skip logic is defined
  // * @param questionCodes the code of a source item
  // * @returns {Array}
  // * @private
  // */
  //_getSkipLogicSourceItem: function(item, questionCode) {
  //  var sourceItem = null;
  //
  //  // check siblings
  //  if (item._parentItem && Array.isArray(item._parentItem.items)) {
  //    for (var i= 0, iLen= item._parentItem.items.length; i<iLen; i++) {
  //      if (item._parentItem.items[i].questionCode === questionCode) {
  //        sourceItem = item._parentItem.items[i];
  //        break;
  //      }
  //    }
  //  }
  //  // check ancestors
  //  if (!sourceItem) {
  //    var parentItem = item._parentItem;
  //    while (parentItem) {
  //      if (parentItem.questionCode === questionCode) {
  //        sourceItem = parentItem;
  //        break;
  //      }
  //      parentItem = parentItem._parentItem;
  //    }
  //  }
  //
  //  return sourceItem;
  //},

  /**
   * Get a source item from the question code defined in a skip logic
   * @param item the target item where a skip logic is defined
   * @param questionCodes the code of a source item
   * @param checkAncestorSibling, optional, to check ancestor's siblings also, default is false
   * @returns {Array}
   * @private
   */
  _getSkipLogicSourceItem: function(item, questionCode, checkAncestorSibling) {
    var sourceItem = null;

    // check siblings
    if (item._parentItem && Array.isArray(item._parentItem.items)) {
      for (var i= 0, iLen= item._parentItem.items.length; i<iLen; i++) {
        if (item._parentItem.items[i].questionCode === questionCode) {
          sourceItem = item._parentItem.items[i];
          break;
        }
      }
    }
    // check ancestors and each ancestors siblings
    if (!sourceItem) {
      var parentItem = item._parentItem;
      while (parentItem) {
        var foundSource = false;
        // check the ancestor
        if (parentItem.questionCode === questionCode) {
          sourceItem = parentItem;
          foundSource = true;
        }
        // check the ancestors siblings
        else if (checkAncestorSibling && parentItem._parentItem && Array.isArray(parentItem._parentItem.items)){
          for (var i= 0, iLen= parentItem._parentItem.items.length; i<iLen; i++) {
            if (parentItem._parentItem.items[i].questionCode === questionCode) {
              sourceItem = parentItem._parentItem.items[i];
              foundSource = true;
              break;
            }
          }
        }
        if (foundSource)
          break;

        parentItem = parentItem._parentItem;
      }
    }

    return sourceItem;
  },

  /**
   * Check if a source item's value meet a skip logic condition/trigger
   * @param item a source item of a skip logic
   * @param trigger a trigger of a skip logic
   * @returns {boolean}
   * @private
   */
  _checkSkipLogicCondition: function(item, trigger) {
    var action = false;
    if (item && item.value !== undefined && item.value !== null && item.value !== "") {
      var currentValue = item.value;

      switch (item.dataType) {
        // answer lists: {"code", "LA-83"}, {"label","A"} and etc.
        // the key is one of the keys in the answers.
        case "CNE":
        case "CWE":
          var field = Object.keys(trigger)[0] ; // trigger should have only one key
          // if the field accepts multiple values from the answer list
          if (Array.isArray(currentValue)) {
            for (var m= 0, mLen = currentValue.length; m<mLen; m++) {
              if (trigger.hasOwnProperty(field) && currentValue[m].hasOwnProperty(field) &&
                this._objectEqual(trigger[field], currentValue[m][field]) ) {
                action = true;
                break;
              }
            }
          }
          else {
            if (trigger.hasOwnProperty(field) && currentValue.hasOwnProperty(field) &&
              this._objectEqual(trigger[field], currentValue[field]) ) {
              action = true;
            }
          }
          break;
        // numbers: {"value: 3}, {"minInclusive": 3, "maxInclusive":10} and etc.
        // available keys: (1) "value", or (2) "minInclusive"/"minExclusive" and/or "maxInclusive"/"maxExclusive"
        case "INT":
        case "REAL":
          var numCurrentValue = parseFloat(currentValue);
          // the skip logic rule has a "value" key
          if (trigger.hasOwnProperty("value")) {
            if (trigger["value"] == numCurrentValue) {
              action = true;
            }
          }
          // the skip logic rule has a range
          else {
            // if within the range
            if (this._inRange(trigger, numCurrentValue)) {
              action = true;
            }
          }
          break;
        // string: {"value": "AAA"}   ( TBD: {"pattern": "/^Loinc/"} )
        // the only key is "value", for now
        case "ST":
        // boolean: {"value": true}, {"value": false}
        // the only key is "value"
        case "BL":
          if (trigger.hasOwnProperty("value") &&
            trigger["value"] === currentValue ) {
            action = true;
          }
          break;
      } // end case
    }

    return action;
  },

  /**
   * Check if all the conditions/triggers are met for a skip logic
   * @param item a target item where a skip logic is defined
   * @returns {boolean}
   * @private
   */
  _checkSkipLogic: function(item) {
    var takeAction = false;
    if (item.skipLogic) {
      var hasAll = !item.skipLogic.logic || item.skipLogic.logic === "ALL";
      var hasAny = item.skipLogic.logic === "ANY";
      // set initial value takeAction to true if the 'logic' is not set or its value is 'ALL'
      // otherwise its value is false, including when the 'logic' value is 'ANY'
      takeAction = hasAll;

      for (var i= 0, iLen=item.skipLogic.conditions.length; i<iLen; i++) {
        var condition = item.skipLogic.conditions[i];
        var sourceItem = this._getSkipLogicSourceItem(item, condition.source, true);
        var conditionMet = this._checkSkipLogicCondition(sourceItem, condition.trigger);
        // ALL: check all conditions until one is not met, or all are met.
        if (hasAll && !conditionMet ) {
          takeAction = false;
          break;
        }
        // ANY: check all conditions until one is met, or none is met.
        else if (hasAny && conditionMet) {
          takeAction = true;
          break;
        }
      } // end of conditions loop
    } // end of skipLogic

    return takeAction;
  },

  /**
   * Get the css class on the skip logic target field
   * @param item
   * @returns {string|string|*|string}
   */
  getSkipLogicClass: function(item) {
      return item._skipLogicStatus;
  },

  /**
   * Check if the form is decided by skip logic as finished.
   * @returns {boolean|*}
   */
  isFormDone: function() {
    return this._formDone;
  },

  /**
   * Check if the question needs an extra input
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  needExtra: function(item) {
    var extra = false;
    if (item && item.value) {
      if (Array.isArray(item.value)) {
        jQuery.each(item.value, function(index, answer) {
          if (answer.other) {
            extra = true;
            // break
            return false;
          }
        });
      }
      else {
        if (item.value.other) {
          extra = true;
        }
      }
    }
    return extra;

  },

  // Form navigation by keyboard
  Navigation: {
    // keys
    ARROW: {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40},
    TAB: 9,
    _navigationMap: [],        // a mapping from position (x, y) to element id (_elementId) of every question.
    _reverseNavigationMap: {}, // a reverse mapping from element id to position, for quick search of positions.

    /**
     * Set up or update the navigation map of all active fields
     * @param lfData the LFormsData object of a form
     */
    setupNavigationMap: function(lfData) {
      var items = lfData.itemList,
          posX = 0, posY = 0;
      this._navigationMap = [];
      this._reverseNavigationMap = {};
      for (var i=0, iLen=items.length; i<iLen; i++) {
        // not in horizontal tables
        if (!items[i]._inHorizontalTable && !items[i].header) {
          // TODO: if it is not a hidden target fields of skip logic rules

          posX = 0; // set x to 0
          this._navigationMap.push([items[i]._elementId]);
          this._reverseNavigationMap[items[i]._elementId] = {x: posX, y: posY};
          posY += 1; // have added a row
        }
        // in horizontal tables and it is a table header
        else if (items[i]._horizontalTableHeader) {
          var tableKey = [items[i]._codePath + items[i]._parentItem._idPath];
          var tableInfo = lfData._horizontalTableInfo[tableKey];
          // it is the first table header
          if (tableInfo && tableInfo.tableStartIndex === i) {
            for (var j= 0, jLen = tableInfo.tableRows.length; j < jLen; j++) {
              var tableRowMap = [];
              var tableRow = tableInfo.tableRows[j];
              posX = 0; // new row, set x to 0
              for (var k= 0, kLen = tableRow.cells.length; k < kLen; k++) {
                var cellItem = tableRow.cells[k];
                tableRowMap.push(cellItem._elementId);
                this._reverseNavigationMap[cellItem._elementId] = {x: posX, y: posY};
                posX += 1; // have added a field in the row
              }
              this._navigationMap.push(tableRowMap)
              posY += 1; // have added a row
            }
            // move i to the item right after the horizontal table
            i = tableInfo.tableEndIndex;
          }
        }
        // non header items in horizontal tables are handled above
      }
    },

    /**
     * Find a field's position in navigationMap from its element id
     * @param id the ID of the currently focused DOM element
     * @returns {*} the position in the navigation map array of the currently focused DOM element
     */
    getCurrentPosition: function(id) {
      return id ? this._reverseNavigationMap[id] : null;
    },

    /**
     * Find the next field to get focus
     * @param kCode code value of a keyboard key
     * @param id the ID of the currently focused DOM element
     * @returns {*}
     */
    getNextFieldId: function(kCode, id) {
      var nextPos, nextId;
      // if the current position is known
      var curPos = this.getCurrentPosition(id);
      if (curPos) {
        switch(kCode) {
          // Move left
          case this.ARROW.LEFT: {
            // move left one step
            if (curPos.x > 0) {
              nextPos = {
                x: curPos.x - 1,
                y: curPos.y
              };
            }
            // on the leftmost already, move to the end of upper row if there's an upper row
            else if (curPos.y > 0) {
              nextPos = {
                x: this._navigationMap[curPos.y - 1].length - 1,
                y: curPos.y - 1
              };
            }
            // else, it is already the field on the left top corner. do nothing
            break;
          }
          // Move right
          case this.ARROW.RIGHT: {
            // move right one step
            if (curPos.x < this._navigationMap[curPos.y].length - 1) {
              nextPos = {
                x: curPos.x + 1,
                y: curPos.y
              };
            }
            // on the rightmost already, move to the beginning of lower row if there's a lower row
            else if (curPos.y < this._navigationMap.length - 1) {
              nextPos = {
                x: 0,
                y: curPos.y + 1 };
            }
            // else it is already the field on the right bottom corner. do nothing
            break;
          }
          // Move up
          case this.ARROW.UP: {
            // move up one step
            if (curPos.y > 0) {
              // if upper row does not have a field at the same column
              // choose the rightmost field
              var nearbyX = curPos.x;
              if (nearbyX >= this._navigationMap[curPos.y - 1].length) {
                nearbyX = this._navigationMap[curPos.y - 1].length - 1;
              }
              // set new position
              nextPos = {
                x: nearbyX,
                y: curPos.y - 1
              };
            }
            break;
          }
          // Move down
          case this.ARROW.DOWN: {
            // move up one step
            if (curPos.y < this._navigationMap.length - 1) {
              // if lower row does not have a field at the same column
              // choose the rightmost field
              var nearbyX = curPos.x;
              if (nearbyX >= this._navigationMap[curPos.y + 1].length) {
                nearbyX = this._navigationMap[curPos.y + 1].length - 1;
              }
              // set new position
              nextPos = {
                x: nearbyX,
                y: curPos.y + 1
              };
            }
            break;
          }
        } // end of switch
        if (nextPos) {
          nextId = this._navigationMap[nextPos.y][nextPos.x];
        }
      }
      return nextId;
    }
  }


});

