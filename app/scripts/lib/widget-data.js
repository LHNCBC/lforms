/**
 * Form definition data processing
 */
var WidgetData = Class.extend({
  // form type. for now the only type is "LOINC"
  type: null,
  // form's code
  code: null,
  // form's name
  name: null,

  // a pre-defined view template used to display the form
  template: null,
  // additional options that controls the seleted view template
  templateOption: {},

  // the question items defined in a form
  items : [],

  // answer lists used by questions, if not directly included in items
  answerLists: {},

  // a delimiter used in code path and id path
  PATH_DELIMITER : "/",

  // skip logic rules used by questions, by merging all the skipLogic directly embedded in items
  // embedded skip logic format:
  //    {"trigger":{"[field]":""}, "action":"show", "targets": ["[codePath]",...]},
  // a "source" key is added to the skip logic format in the _skipLogicRules array:
  //    {"source":"", "trigger":{"[field]":""}, "action":"show", "targets": ["[codePath]",...]},
  _skipLogicRules: [],

  // formulas used by questions, by merging all the formula directly embedded in items
  // embedded formula format:
  //    {name:, value:}
  // a "target" key is added to the formula format in the _formulas array:
  //    {name:, value:, target:}
  // for now, there's only two formulas: TOTALSCORE, BMI
  _formulas: [],

  // if there's a TOTALSCORE formula
  _hasScoreRule: null,

  // the status of current shown skip logic targets
  _skipLogicShownTargets : [],    // format: [source._codePath, answer_code, target._codePath, source._parentIdPath_]
  _skipLogicShownTargetKeys : {}, // format: {target._codePath : true/false}

  // repeatable question items derived from items
  _repeatableItems : {},

  // the status of whether each question item is the last sibling within the parent level record
  _lastSiblingStatus: [],


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

  /**
   * Constructor
   * @param data the lforms form definition data
   */
  init: function(data) {

    var start = new Date().getTime();

    this.items = data.items;
    this.answerLists = data.answerLists;
    this.code = data.code;
    this.name = data.name;
    this.type = data.type;
    this.hasUserData = data.hasUserData;
    this.template = data.template;
    this.templateOption = data.templateOption || {};
    this._skipLogicRules = data._skipLogicRules || [];
    this._formulas = data._formulas || [];
    this.PATH_DELIMITER = data.PATH_DELIMITER || "/";

    // when the skip logic rule says the form is done
    this._formDone = false;

    // update internal data (_id, _idPath, _codePath, _displayLevel_, _parentIdPath_, and _parentCodePath_),
    // that are used for widget control and/or for performance improvement.
    this._initializeInternalData();

    var time = 'WidgetData is initialized in ' +(new Date().getTime() - start)/1000 +
        ' seconds';
    console.log(time);
  },


  /**
   * Calculate internal data from the raw form definition data,
   * including:
   * structural data, (TBD: unless they are already included (when hasUserData == true) ):
   *    _id, _idPath, _codePath
   * data for widget control and/or performance improvement:
   *    _displayLevel_, _parentIdPath_, and _parentCodePath_
   * @private
   */
  _initializeInternalData: function() {

    //TODO, process form data that includes user data

    //TODO, validate form data

    // set values for _id, _idPath, _codePath based on the questionCode and parentQuestionCode
    // also set values for _displayLevel_, _parentIdPath_, _parentCodePath_
    this._updateTreePathFields();


    // set default values
    this._setDefaultValues();


    // merge skipLogic in all items into this._skipLogicRules
    // merge formula in all items into this._formulas
    this._mergeComplexFields();

    // update score rule if there is one
    this._updateScoreRule();

    this._resetRepeatableItems();

    this._resetHorizontalTableInfo();

    this._updateLastSiblingStatus();

    this._updateLastItemInRepeatingItemsStatus();

    this.Navigation.setupNavigationMap(this);

  },

  /**
   * Reset internal structural data when repeatable items/groups are added or removed.
   * @private
   */
  _resetInternalData: function() {


    // merge skipLogic in all items into this._skipLogicRules
    // merge formula in all items into this._formulas
    this._mergeComplexFields();

    // update score rule if there is one
    this._updateScoreRule();

    this._resetHorizontalTableInfo();

    this._updateLastSiblingStatus();

    this._updateLastItemInRepeatingItemsStatus();

    this.Navigation.setupNavigationMap(this);

  },


  /**
   * Update the score rule if there is one
   * @private
   */
  _updateScoreRule: function() {

    this._hasScoreRule = false;

    for (var i = 0, iLen = this._formulas.length; i < iLen; i++) {
      // check if there is a TOTALSCORE rule
      if (this._formulas[i]["name"] == "TOTALSCORE") {
        this._formulas[i]["value"] = [];
        this._formulas[i]["valueIndex"] = [];
        // set values for _hasScoreRule
        this._hasScoreRule = true;
        // update source item's codePath
        // all the sources should be unique in the form.
        for (var j= 0,jLen=this.items.length; j<jLen; j++) {
          var item = this.items[j];
          // it has an answer list
          if (item.answers) {
            var answers = [];
            // embedded answers
            if (jQuery.isArray(item.answers)) {
              answers = item.answers;
            }
            // answers in answerLists
            else if (jQuery.isArray(this.answerLists[item.answers])) {
              answers = this.answerLists[item.answers];
            }
            // check if any one of the answers has a score
            for (var k = 0, kLen = item.answers.length; k < kLen; k++) {
              if (item.answers[k] && item.answers[k].score >= 0) {
                this._formulas[i]["value"].push(item._codePath);
                this._formulas[i]["valueIndex"].push(j);
                break;
              }
            } // end of answers loop
          } // end if there's an answer list
        } // end of items loop
        break;
      } // end of TOTALSCORE rule
    } // end of formulas loop

  },

  /**
   * Set default values if the data is missing.
   * @private
   */
  _setDefaultValues: function() {
    // type
    if (!this.type || this.type.length == 0) {
      this.type = "LOINC"
    }
    // template
    if (!this.template || this.template.length == 0) {
      this.type = "panelTableV"
    }
    // templateOption
    if (!this.templateOption || jQuery.isEmptyObject(this.templateOption)) {
      this.templateOption = {
        obxTableColumns: [
          {"name" : "Name", "formatting":{"width": "50%", "min-width": "4em"}},
          {"name" : "", "formatting":{"width": "5em", "min-width": "5em"}},
          {"name" : "Value", "formatting":{"width": "35%", "min-width": "4em"}},
          {"name" : "Units", "formatting":{"width": "15%", "min-width": "4em"}}
//          {"name" : "Range", "formatting":{"width": "6em", "min-width": "4em"}}
        ],
        obrHeader: true,  // controls if the obr table needs to be displayed
        obrItems: [
          {"question":"Date Done","dataType":"DT","answers":"", "formatting":{"width":"10em","min-width":"4em"}, "answerCardinality":{"min":1, "max":1}},
          {"question":"Time Done","dataType":"TM","answers":"", "formatting":{"width":"12em","min-width":"4em"}},
          {"question":"Where Done","dataType":"CWE","answers":[{"text":"Home","code":"1"},{"text":"Hospital","code":"2"},{"text":"MD Office","code":"3"},{"text":"Lab","code":"4"},{"text":"Other","code":"5"}], "formatting":{"width":"30%","min-width":"4em"}},
          {"question":"Comment","dataType":"ST","answers":"", "formatting":{"width":"70%","min-width":"4em"} }
        ]
      }
    }
    // for each items
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      var item = this.items[i];
      // questionCardinality
      if (!item.questionCardinality) {
        item.questionCardinality = {"min":1, "max":1};
      }
      // answerCardinality
      if (!item.answerCardinality) {
        item.answerCardinality = {"min":0, "max":1};
      }
      // dataType
      if (!item.dataType) {
        item.dataType = "ST";
      }

    }

  },


  /**
   * Merge data in skipLogic and formula in all records into
   * this._skipLogicRules and this._formulas, respectively
   * @private
   */
  _mergeComplexFields: function() {
    this._skipLogicRules = [];
    this._formulas = [];
    for (var i=0, iLen=this.items.length; i<iLen; i++) {
      var item = this.items[i];
      // merge skipLogic in all items into this._skipLogicRules
      if (item.skipLogic && jQuery.isArray(item.skipLogic)) {
        for (var j= 0, jLen = item.skipLogic.length; j<jLen; j++) {
          if (!jQuery.isEmptyObject(item.skipLogic[j])) {
            var rule = angular.copy(item.skipLogic[j]);
            rule["source"] = item._codePath;
            rule["sourceIndex"] = i;
            // replace the code in targets with codePath
            rule = this._updateSkipLogicTargetCodePathAndIndex(i, rule)
            this._skipLogicRules.push(rule)
          }
        }
      }
      // merge formula in all items into this._formulas
      if (item.formula && !jQuery.isEmptyObject(item.formula)) {
        var formula = angular.copy(item.formula)
        formula["target"] = item._codePath;
        formula["targetIndex"] = i;
        // replace the code in source with codePath, and add source index
        formula = this._updateFormulaSourceCodePathAndIndex(i, formula)
        this._formulas.push(formula)
      }
    }

    // merge answers in all items into this.answerLists if answers are not already in this.answerLists

  },

  /**
   * Get the code paths and indexes of target items of a skip logic rule
   * Note: in skip logic, the target items are the siblings or descendants of the source item
   * @param sourceItemIndex index of an item in the form items array
   * @param rule a skip logic rule
   * @returns rule a skip logic rule with updated code paths and indexes of target items
   * @private
   */
  _updateSkipLogicTargetCodePathAndIndex: function(sourceItemIndex, rule) {
    var codePaths = [], targetsIndex = [];
    var sourceItem = this.items[sourceItemIndex];
    // check each question after the source item
    for (var i=sourceItemIndex+1, iLen = this.items.length; i<iLen; i++) {
      // if it's a sibling or a descendant
      if (this.items[i]._idPath.indexOf(sourceItem._idPath) == 0 &&
          this.items[i]._codePath.indexOf(sourceItem._codePath) == 0 ) {
        // check each code
        for (var j= 0, jLen = rule.targets.length; j<jLen; j++) {
          if (this.items[i].questionCode == rule.targets[j]) {
            codePaths.push(this.items[i]._codePath)
            targetsIndex.push(i);
          }
        } // end of each code
      } // end of it's a sibling or a descendant
    } // end of each question

    rule.targets = codePaths;
    rule.targetsIndex = targetsIndex;

    return rule;
  },

  /**
   * Get the code paths and indexes of source items of a formula
   * Note:
   * a source item and the target item should be siblings, or
   * a source item should be the target item's descendant, or
   * the target item should be a source item's descendant
   * @param targetItemIndex index of an item in the form items array
   * @param formula a formula
   * @returns formula a formula with updated code paths and indexes of source items
   * @private
   */
  _updateFormulaSourceCodePathAndIndex: function(targetItemIndex, formula) {
    var codePaths = [], valueIndex = [];
    var targetItem = this.items[targetItemIndex];
    for (var j= 0, jLen = formula.value.length; j<jLen; j++) {
      // check each question
      for (var i=0, iLen = this.items.length; i<iLen; i++) {
        // the if code matches
        if (this.items[i].questionCode == formula.value[j]) {
          // if the source item and target item are siblings or one is the other's descendant
          if (this.items[i]._parentIdPath_.indexOf(targetItem._parentIdPath_) == 0 &&
              this.items[i]._parentCodePath_.indexOf(targetItem._parentCodePath_) == 0 ||
              targetItem._parentIdPath_.indexOf(this.items[i]._parentIdPath_) == 0 &&
              targetItem._parentCodePath_.indexOf(this.items[i]._parentCodePath_) == 0 ) {
            codePaths.push(this.items[i]._codePath)
            valueIndex.push(i);

          }
        } //end if code matches
      } // end of each question
    } // end of each code

    formula["value"] = codePaths;
    formula["valueIndex"] = valueIndex;

    return formula;
  },

  /**
   * Update values of the fields of _id, _idPath, _codePath
   * based on the questionCode and parentQuestionCode
   * and the number of repeating questions
   * tree node type:
   * {"_idPath": idPath of item,
   *  "_codePath": codePath of item,
   *  "index": index in items array,
   *  "children":[tree node 1, ..., tree node n]
   * }
   * @private
   */
  _updateTreePathFields: function() {
    var parents = [];
    // pop a parent
    var currentParent = null;
    // for each item
    for (var i=0, iLen=this.items.length; i<iLen; i++) {
      var item = this.items[i];
      // update _id, _codePath, _idPath
      item._id = "1";
      item._codePath = this.PATH_DELIMITER + item.questionCode;
      item._idPath = this.PATH_DELIMITER + item._id;

      var found = false;

      while (!found && currentParent) {
        // if current item is a child of current parent
        if (item.parentQuestionCode == currentParent.questionCode ) {
          // update _codePath, _idPath, with current parent's _codePath and _idPath
          item._codePath = currentParent._codePath + item._codePath;
          item._idPath = currentParent._idPath + item._idPath;
          found = true;
        }
        // else, find the parent's parent, and check again
        else {
          currentParent = parents.pop();
        }
      }

      // it current item is a parent
      if (this._isParent(i)) {
        // push the current item into the parents queue
        parents.push(item);
        // set the current parent to the current item
        currentParent = item;
      }

      // set values for _displayLevel_, _parentIdPath_, _parentCodePath_
      var idx = item._idPath.lastIndexOf(this.PATH_DELIMITER);
      item._parentIdPath_ = item._idPath.slice(0,idx)
      idx = item._codePath.lastIndexOf(this.PATH_DELIMITER);
      item._parentCodePath_ = item._codePath.slice(0,idx)
      item._displayLevel_ = item._idPath.split(this.PATH_DELIMITER).length - 1;

      item._elementId_ = item._codePath + item._idPath;


    } // end of the items loop

  },

  /**
   * Check if an item has children
   * @param itemIndex index of an item in the form items array
   * @returns {boolean}
   * @private
   */
  _isParent: function(itemIndex) {
    var ret = false;
    if (itemIndex + 1 < this.items.length ) {
      for (var i=itemIndex + 1, iLen=this.items.length; i<iLen; i++) {
        if (this.items[itemIndex].questionCode == this.items[i].parentQuestionCode) {
          ret = true;
          break;
        }
      }
    }
    return ret;
  },

  /**
   * Find the max _id of the same question within the its parent node
   * @param item an item in the form items array
   * @returns {number}
   */
  getRepeatingItemMaxId: function(item) {
    var maxId = parseInt(item._id) ;
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      if (this.items[i]._codePath == item._codePath &&
          this.items[i]._parentIdPath_ == item._parentIdPath_ &&
          parseInt(this.items[i]._id) > maxId ) {
        maxId = parseInt(this.items[i]._id);
      }
    }
    //console.log(maxId)
    return maxId;
  },

  /**
   * Find the min _id of the same question within the its parent node
   * @param item an item in the form items array
   * @returns {number}
   */
  getRepeatingItemMinId: function(item) {
    var minId = parseInt(item._id) ;
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      if (this.items[i]._codePath == item._codePath &&
          this.items[i]._parentIdPath_ == item._parentIdPath_ &&
          parseInt(this.items[i]._id) < minId ) {
        minId = parseInt(this.items[i]._id);
      }
    }
    //console.log(minId)
    return minId;
  },

  /**
   * Find the number of the same question within the its parent node
   * @param item an item in the form items array
   * @returns {number}
   */
  getRepeatingItemCount: function(item) {
    var count = 0;
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      if (this.items[i]._codePath == item._codePath &&
          this.items[i]._parentIdPath_ == item._parentIdPath_ ) {
        count++;
      }
    }
    return count;
  },

  /**
   * Update the status array that includes the last items of each repeating items and sections
   * If it is a repeating section, the last item is the last leaf node within the last repeating section.
   * @private
   */
  _updateLastItemInRepeatingItemsStatus: function() {
    this._lastItemInRepatingItems = [];
    var repeatingItemHash= {};
    for (var i= 0, iLen= this.items.length; i<iLen; i++) {
      var item = this.items[i];
      if (this._questionRepeatable(item)) {
        for (var j= i, jLen= this.items.length; j<jLen; j++) {
          if (this.items[j]._codePath.indexOf(item._codePath) == 0 &&
              this.items[j]._idPath.indexOf(item._parentIdPath_) ==0 ) {
            var idLast = j;
          }
        }
        repeatingItemHash[item._codePath+item._parentIdPath_] = {"repeatingItem":item, "idLast":idLast};
      }
    }

    var repeatingItemsArray =[];
    jQuery.each(repeatingItemHash, function(key, value) {
      repeatingItemsArray.push(value);
    });

    this._lastItemInRepatingItems = repeatingItemsArray;

  },

  /**
   * Check if an item is the last item of the repeating items or sections.
   * If it is a repeating section, the last item is the last leaf node within the last repeating section.
   * @param index index of an item in the form items array
   * @returns {boolean}
   */
  isLastItemInRepeatingItems: function(index) {
    var ret= false;
    for (var i= 0, iLen=this._lastItemInRepatingItems.length; i<iLen; i++) {
      if (this._lastItemInRepatingItems[i].idLast == index) {
        ret = true;
      }
    }
    return ret;
  },

  /**
   * Get the containing repeating item of the last item of repeating items or sections.
   * The containing item is itself if it the last item of a repeating items.
   * @param index index of an item in the form items array
   * @returns {Array}
   */
  getParentRepeatingItemsOfLastItem: function(index) {
    var ret =[];
    for (var i=this._lastItemInRepatingItems.length-1; i>=0; i--) {
      if (this._lastItemInRepatingItems[i].idLast == index) {
        ret.push(this._lastItemInRepatingItems[i].repeatingItem)
      }
    }
    return ret;

  },

  /**
   * Update the last sibling status at this.lastSibling_
   * Called when the underlying items has a change or when a new form data are loaded.
   * NOTE: it seems this function and _isLastSibling could be optimized. Too many loops of the items.
   * @private
   */
  _updateLastSiblingStatus: function() {

    this._lastSiblingStatus = [];

    for (var i= 0, iLen= this.items.length; i<iLen; i++) {
      var item = this.items[i];
      var last = this._isLastSibling(item);
      var statusLast = [last];

      var parent = this._findParentItem(item);
      while (parent) {
        last = this._isLastSibling(parent);
        statusLast.push(last);
        parent = this._findParentItem(parent);
      }
      this._lastSiblingStatus.push(statusLast)
    }

  },


  /**
   * Check if the record is the last one (position in the array) within the parent node
   * @param item an item in the form items array
   * @returns {boolean}
   * @private
   */
  _isLastSibling: function(item) {

    var ret = false;

    // check data starting from the end of the array
    for (var i= this.items.length-1; i>=0; i--) {
      // found the parent group
      if (this.items[i]._parentCodePath_ == item._parentCodePath_ &&
          this.items[i]._parentIdPath_ == item._parentIdPath_ &&
          // also on the same level (not a node in a sub tree, which come first backwardly)
          this.items[i]._displayLevel_ == item._displayLevel_ ) {
        var isATarget = this.isSkipLogicTarget(this.items[i]._codePath);
        var targetShown = this.isTargetShown(this.items[i]);

        // it is the last one in the group (found first backwardly)
        if (this.items[i]._codePath == item._codePath &&
            this.items[i]._idPath == item._idPath  && !(isATarget && !targetShown))  {
          ret = true;
        }
        // or it is not the last one, but the last one(s) are hidden by skip rules
        else if (isATarget && !targetShown) {
          continue
        }
        break;
      }
    }

    return ret;

  },

  /**
   * Get the parent item
   * @param item an item in the form items array
   * @returns false if the parent is on the top level,
   *          or the parent item
   * @private
   */
  _findParentItem: function(item) {
    var ret;
    // parent is on the top level
    if (item._parentCodePath_ == '' && item._parentIdPath_ == '') {
      ret = false;
    }
    else {
      for (var i= 0, iLen=this.items.length; i<iLen; i++) {
        if (this.items[i]._codePath == item._parentCodePath_ &&
            this.items[i]._idPath == item._parentIdPath_ ) {
          ret = this.items[i];
          break;
        }
      }
    }
    return ret;
  },


  /**
   * Update the _id, _idPath and _parentIdPath_ in the newly added repeating items
   * Note: _id is only unique for the repeating items within a same parent item
   * @param newItems a newly added item in the form items array
   * @param parentIdPath idPath of the repeating item's parent item
   * @param newId id of the newly added item
   * @private
   */
  _updateIdAndPath: function(newItems, parentIdPath, newId) {
    // update the first item
    var newIdPath = parentIdPath + this.PATH_DELIMITER + newId;
    newItems[0]._id = newId;
    newItems[0]._idPath = newIdPath;
    newItems[0]._parentIdPath_ = parentIdPath;
    newItems[0]._elementId_ = newItems[0]._codePath + newItems[0]._idPath;

    var idx = parentIdPath.length;
    // update the rest items if it is a group
    for (var i= 1, iLen=newItems.length; i<iLen; i++) {
      // update the _idPath
      var idx2 = newItems[i]._idPath.indexOf(this.PATH_DELIMITER,idx+1);
      newItems[i]._idPath = newIdPath + this.PATH_DELIMITER + newItems[i]._idPath.slice(idx2+1);
      // update the _parentIdPath_
      var idx3 = newItems[i]._idPath.lastIndexOf(this.PATH_DELIMITER);
      newItems[i]._parentIdPath_ = newItems[i]._idPath.slice(0,idx3)
      // the _id does not need to be updated. the initial value is always "1"

      // update element id
      newItems[i]._elementId_ = newItems[i]._codePath + newItems[i]._idPath;
    }
  },

  /**
   * Find the start index and end index in the items array of a repeatable item or
   * a repeatable group. It is used for adding and removing a repeatable items
   * @param item an item in the form items array
   * @returns {{}}
   * @private
   */
  _getRepeatableItemsRange: function(item) {

    var idxStart=-1, idxEnd=-1;
    var inRepeatableItems = false;
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      if (this.items[i]._codePath == item._codePath &&
          this.items[i]._idPath == item._idPath) {
        idxStart = i;
        inRepeatableItems = true;
      }
      if (inRepeatableItems &&
          (this.items[i]._idPath + "/").indexOf(item._idPath + "/") == 0 &&
          (this.items[i]._codePath + "/").indexOf(item._codePath + "/") == 0 ) {
        idxEnd = i;
      }
    }
    return {start: idxStart, end: idxEnd};
  },

  /**
   * Check if multiple answers are allowed
   * @param item an item in the form items array
   * @returns {boolean}
   * @private
   */
  _questionRepeatable : function(item) {
  var ret=false;
  if (item.questionCardinality &&
      (item.questionCardinality.max > 1 || item.questionCardinality.max ==-1) ) {
    ret = true
  }
  return ret;
  },

  /**
   * Reset the _repeatableItems when the data is initialized
   * @private
   */
  _resetRepeatableItems: function() {
    this._repeatableItems = {};
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      if (this._questionRepeatable(this.items[i])) {
        var range = this._getRepeatableItemsRange(this.items[i]);
        this._repeatableItems[this.items[i]._codePath] = jQuery.extend(true, [], this.items.slice(range.start, range.end+1));
      }
    }
  },

  /**
   * Set internal field values for horizontal table layout
   * Note:
   * 1) "layout" values 'horizontal' and 'vertical' are only set on items whose "header" is true
   * 2) any items within a 'horizontal' table must be a leaf node. i.e. it cannot contain any sub items.
   * 3) all items within a 'horizontal' table has it's "_inHorizontalTable_" set to true, but not the header item itself.
   * 4) _repeatableItems is reused for adding a repeating row in a horizontal table. but the header item will not be added.
   * i.e. the table should not have more than one table titles
   *
   * @private
   */

  _resetHorizontalTableInfo: function() {
    this._horizontalTableInfo = {};

    var tableHeaderCodePathAndParentIdPath = null;
    var lastTableHeaderIndex = null;
    var hasHorizontalLayout = false;

    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      // header item and horizontal layout
      if (this.items[i].header && this.items[i].layout == "horizontal" ) {
        hasHorizontalLayout = true;
        // same methods for repeating items could be used for repeating and non-repeating items.
        // (need to rename function names in those 'repeatable' functions.)
        var itemsInRow = [];
        var colNames = [];
        this.items[i]._inHorizontalTable = true;
        this.items[i]._isLastTableHeaderInGroup = false;
        var itemCodePathAndParentIdPath = this.items[i]._codePath + this.items[i]._parentIdPath_;
        lastTableHeaderIndex = i;
        // if it's the first row (header) of the first table,
        if (tableHeaderCodePathAndParentIdPath === null ||
            tableHeaderCodePathAndParentIdPath !== itemCodePathAndParentIdPath) {
          // indicate this item is the table header
          this.items[i]._horizontalTableHeader = true;

          var range = this._getRepeatableItemsRange(this.items[i]);
          for (var j=range.start+1; j<=range.end; j++) {
            itemsInRow.push(j);
            colNames.push(this.items[j].question);
            // indicate the item is in a horizontal table
            this.items[j]._inHorizontalTable = true;
          }

          tableHeaderCodePathAndParentIdPath = itemCodePathAndParentIdPath;
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath] = {
            tableStartIndex: i,
            tableEndIndex: range.end,
            columnNames: colNames,
            tableRows: [{ header: i, cells : itemsInRow }],
            tableHeaders: [i]
          };

          // set the last table/row in horizontal group/table flag
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath]['lastHeaderIndex'] = lastTableHeaderIndex

        }
        // if it's the following rows, update the tableRows and tableEndIndex
        else if (tableHeaderCodePathAndParentIdPath === itemCodePathAndParentIdPath ) {
          var range = this._getRepeatableItemsRange(this.items[i]);
          var itemsInRow = [];
          for (var j=range.start+1; j<=range.end; j++) {
            itemsInRow.push(j);
            // indicate the item is in a horizontal table
            this.items[j]._inHorizontalTable = true;
          }
          // update rows index
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableRows.push({header: i, cells : itemsInRow});
          // update headers index (hidden)
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableHeaders.push(i);
          // update last item index in the table
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath].tableEndIndex = range.end;

          // set the last table/row in horizontal group/table flag
          this._horizontalTableInfo[tableHeaderCodePathAndParentIdPath]['lastHeaderIndex'] = lastTableHeaderIndex
        }
      }
    }


  },

  /**
   * Add a repeating item or a repeating group
   * and update related form status
   * @param item an item in the form items array
   */
  addRepeatingItems: function(item) {

    var maxRecId = this.getRepeatingItemMaxId(item);
    var newItems = jQuery.extend(true, [], this._repeatableItems[item._codePath]);
    this._updateIdAndPath(newItems, item._parentIdPath_, maxRecId+1);

    var range = this._getRepeatableItemsRange(item);

    for (var i= 0, iLen=newItems.length; i<iLen; i++) {
      newItems[i].newlyAdded = true;
      this.items.splice(range.end+i+1,0,newItems[i]);
    }

    this._resetInternalData();
    var readerMsg = 'Added ' + (item._inHorizontalTable ?
      'row' : 'section');
    WidgetData.screenReaderLog(readerMsg);
  },

  /**
   * Remove a repeating item or group
   * @param item an item in the form items array
   */
  removeRepeatingItems: function(item) {

    var range = this._getRepeatableItemsRange(item);
    this.items.splice(range.start, range.end-range.start+1);

    this._resetInternalData();
    var readerMsg = 'Removed ' + (item._inHorizontalTable ?
      'row' : 'section');
    WidgetData.screenReaderLog(readerMsg);
  },

  /**
   * Check if an item has a total score formula.
   * This is a special case of formula, where sources are not explicitly specified.
   *
   * @param codePath the item's code path.
   * @returns true/false
   */
  isScoreRuleTarget: function(codePath) {

    var ret = false;
    if (this._hasScoreRule) {
      for (var i= 0,ilen=this._formulas.length; i<ilen; i++) {
        if (this._formulas[i].name == 'TOTALSCORE' && this._formulas[i].target == codePath) {
          ret = true;
          break;
        }
      }
    }
    return ret;
  },

  /**
   * Calculate the total score and set the value of the total score formula target field
   * @param scoreRule a total score formula
   * @private
   */
  _calculateTotalScore: function(scoreRule) {
    var totalScore = 0;
    // check all source items
    for(var i= 0, iLen=scoreRule.valueIndex.length; i<iLen; i++) {
      var item = this.items[scoreRule.valueIndex[i]];
      if (item._value && item._value.score ) {
        totalScore += item._value.score;
      }
    }
    // update total score field
    this.items[scoreRule.targetIndex]._value = totalScore;

  },

  /**
   * Run all formulas
   */
  runFormulas: function() {

      // for each the formula, get the parameters values and units
      for (var j= 0,jlen=this._formulas.length; j<jlen; j++) {
        var formula = this._formulas[j];
        // run non-score rules
        if (formula.name != 'TOTALSCORE') {
          // find the sources and target
          var valuesInStandardUnit = this._findFormulaSourcesInStandardUnit(formula);

          // calculate the formula result
          var result = this.Formulas.calculations_[formula.name](valuesInStandardUnit)

          // update target field
          this.items[formula.targetIndex]._value = result;
        }
        // run score rule (there should be one score rule only in a form)
        else {
          this._calculateTotalScore(formula);
        }

      }
  },


  /**
   * Find all source items of a formula
   * @param formula a formula
   * @returns {Array}
   * @private
   */
  _findFormulaSourcesInStandardUnit : function(formula) {
    var values = [];

    for (var i= 0, iLen = formula.valueIndex.length; i<iLen; i++ ) {
      var item = this.items[formula.valueIndex[i]];
      var valueInStandardUnit = '';
      if (item._value) {
        if (item._unit && item._unit.value) {
          valueInStandardUnit = this.Units.getValueInStandardUnit(item._value, item._unit.value);
        }
        else {
          valueInStandardUnit = item._value;
        }
      }
      values.push(valueInStandardUnit);
    }
    return values;
  },

  /**
   * Units modules
   * Embedded in widget-data.js. To be separated as a independent file.
   */
  Units: {
    getValueInStandardUnit: function(value, unit) {
      var result = value * this.units_[unit];
      return result.toFixed(this.precision_);
    },
    getStandardUnit: function() {
      // to be done when 'units_' is redesigned
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
   * Embedded in widget-data.js. To be separated as a independent file.
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
   * Check if a item is part of the target of a skip logic rule
   * @param codePath an item's code path
   * @returns {boolean}
   */
  isSkipLogicTarget: function(codePath) {
    var ret = false;
    for (var i=0, ilen=this._skipLogicRules.length; i<ilen; i++) {
      var skipLogicRule = this._skipLogicRules[i];
      if (jQuery.inArray(codePath, skipLogicRule.targets) > -1) {
        ret = true;
        break;
      }
    }
    return ret;
  },

  /**
   * Get the target of a skip logic rule, given the source's codePath and the trigger value
   * @param codePath an item's code path
   * @param dataType an item's data type
   * @param currentValue an item's current value
   * @returns {Array}
   * @private
   */
  _getSkipLogicTarget: function(codePath, dataType, currentValue) {
    var ret = [];
    if (currentValue) {
      for (var i=0, ilen=this._skipLogicRules.length; i<ilen; i++) {
        var skipLogicRule = this._skipLogicRules[i];
        if (skipLogicRule.trigger && skipLogicRule.source == codePath) {
          switch (dataType) {
            // answer lists: {"code", "LA-83"}, {"label","A"} and etc.
            // the key is one of the keys in the answers.
            case "CNE":
            case "CWE":
              var targetField = Object.keys(skipLogicRule.trigger)[0] ; // fields should have only one item
              var valueField = targetField;
              // special case: In jQuery Autocomplete "label" is used for a different purpose (the text displayed in the list)
              // so the value of 'label' in answers is stored in 'origLabel' when constructing for jQuery Autocomplete.
              // here it's changed back to 'label'
              if (targetField == "label") valueField = "origLabel";
              if (skipLogicRule.trigger.hasOwnProperty(targetField) && currentValue.hasOwnProperty(valueField) &&
                  this._objectEqual(skipLogicRule.trigger[targetField], currentValue[valueField]) ) {
                ret = ret.concat(skipLogicRule.targets);
              }
              break;
            // numbers: {"value: 3}, {"minInclusive": 3, "maxInclusive":10} and etc.
            // available keys: (1) "value", or (2) "minInclusive"/"minExclusive" and/or "maxInclusive"/"maxExclusive"
            case "INT":
            case "REAL":
              var numCurrentValue = parseFloat(currentValue);
              // the skip logic rule has a "value" key
              if (skipLogicRule.trigger.hasOwnProperty("value")) {
                if (skipLogicRule.trigger["value"] == numCurrentValue) {
                  ret = ret.concat(skipLogicRule.targets);
                }
              }
              // the skip logic rule has a range
              else {
                // if within the range
                if (this._inRange(skipLogicRule.trigger, numCurrentValue)) {
                  ret = ret.concat(skipLogicRule.targets);
                }
              }
              break;
            // string: {"value": "AAA"}   ( TBD: {"pattern": "/^Loinc/"} )
            // the only key is "value", for now
            case "ST":
              if (skipLogicRule.trigger.hasOwnProperty("value") && currentValue.hasOwnProperty("value") &&
                  skipLogicRule.trigger["value"] === currentValue["value"] ) {
                ret = ret.concat(skipLogicRule.targets);
              }
              break;
              // boolean: {"value": true}, {"value": false}
              // the only key is "value"
            case "BL":
              if (skipLogicRule.trigger.hasOwnProperty("value") && currentValue.hasOwnProperty("value") &&
                  skipLogicRule.trigger["value"] === currentValue["value"] ) {
                ret = ret.concat(skipLogicRule.targets);
              }
              break;
          } // end case
        } // if source == codePath
      } // each skip logic rule
    } // end if value is not empty
    return ret;
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
      if (fields.length == 1)  {
        switch (fields[0]) {
          case "minInclusive":
            if (range["minInclusive"] <= numValue) {
              inRange = true;
            }
            break;
          case "minExclusive":
            if (range["minExclusive"] < numValue) {
              inRange = true;
            }
            break;
          case "maxInclusive":
            if (range["maxInclusive"] >= numValue) {
              inRange = true;
            }
            break;
          case "maxExclusive":
            if (range["maxExclusive"] > numValue) {
              inRange = true;
            }
            break;
        } // end of switch
      } // end of one key
      // two keys
      else {
        // check the lower end
        if (range.hasOwnProperty("minInclusive")) {
          if (range["minInclusive"] <= numValue) {
            inRange = true;
          }
        }
        else if (range.hasOwnProperty("minExclusive")) {
          if (range["minExclusive"] < numValue) {
            inRange = true;
          }
        }
        // check the upper end
        if (inRange) {
          if (range.hasOwnProperty("maxInclusive")) {
            if (range["maxInclusive"] >= numValue) {
              inRange = true;
            }
            else {
              inRange = false;
            }
          }
          else if (range.hasOwnProperty("maxExclusive")) {
            if (range["maxExclusive"] > numValue) {
              inRange = true;
            }
            else {
              inRange = false;
            }
          }
        } // end if lower end valid
      } // end of two keys
    } // end of valid range and numValue

    return inRange;

  },

  /**
   * Compare two JavaScript objects
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
      if (keys1.length != keys2.length ) {
        ret = false;
      }
      else {
        // from obj1 to obj2
        for (var i= 0, ilen=keys1.length; i<ilen; i++) {
          if (obj1[keys1[i]] != obj2[keys1[i]]) {
            ret = false;
            break;
          }
        }
        // from obj2 to obj1 // not necessary once the lengths have benn checked.
//        if (ret) {
//          for (var i= 0, ilen=keys2.length; i<ilen; i++) {
//            if (obj1[keys2[i]] != obj2[keys2[i]]) {
//              ret = false;
//              break;
//            }
//          }
//        }
      }
    }
    return ret;
  },

  /**
   * Get the CSS classes for a give item
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getSkipLogicTargetClass: function(item) {
    var ret = '';
    if (this.isSkipLogicTarget(item._codePath)) {
      ret = 'target-hide';
      for (var i= 0, ilen=this._skipLogicShownTargets.length; i<ilen; i++) {
        // if the _codePath matches
        if (item._codePath == this._skipLogicShownTargets[i][2]) {
          // and the target item is a sibling or a descendant of the source item
          if (item._idPath.indexOf(this._skipLogicShownTargets[i][3]) == 0 ) {
            var key = item._codePath + item._parentIdPath_;
            if (this._skipLogicShownTargetKeys[key]) {
              ret = 'target-show newly_shown'
            }
            else {
              ret = 'target-show'
            }
            break;
          }
        }
      } // end of the _skipLogicShownTargets loop

      if (item._prevSkipLogicTargetClass !== ret) {
        if (item._prevSkipLogicTargetClass !== undefined) {
          var msg = ret.indexOf('target-show') >= 0 ? 'Showing ' : 'Hiding ';
          WidgetData.screenReaderLog(msg+item.question);
        }
        item._prevSkipLogicTargetClass = ret;
      }
    } // end of if the item is a target

    return ret;
  },


  // check skip logic target keys ???
  // seems not finished yet. used to make style changes in the transition of show/hide target items
  // to be completed, for skip logic animation
  checkSkipLogicKeys: function() {
    var ret = false;
    if (!jQuery.isEmptyObject(this._skipLogicShownTargetKeys)) {
      ret = true;
    }

    return ret;
  },

  /**
   * Check if a skip logic target item is shown
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  isTargetShown: function(item) {
    var ret = false;
    for (var i= 0, ilen = this._skipLogicShownTargets.length; i<ilen; i++) {
      if (this._skipLogicShownTargets[i][2] == item._codePath && item._idPath.indexOf(this._skipLogicShownTargets[i][3]) == 0) {
        ret = true;
        break;
      }
    }
    return ret;
  },

  /**
   * Update skip rule status if any source items have a data change
   */
  checkAnswerCode: function() {

    // _skipLogicShownTargets format: [source._codePath, answer_code, target._codePath, source._parentIdPath_]

    // keep a copy of the previous _skipLogicShownTargets where the shown targets are kept
    var prevSkipLogicShownTargets = jQuery.extend(true, [], this._skipLogicShownTargets)

    // reset the skip logic status
    this._skipLogicShownTargets = [];
    this._formDone = false;

    // go through all the items (is there a way to just go though changed items???)
    for (var j= 0, jlen = this.items.length; j<jlen; j++) {
      var item = this.items[j];
      if (item &&
          (item.dataType == 'CNE' || item.dataType == 'CWE' ||   // answer lists
           item.dataType == 'INT' || item.dataType == 'REAL' ||  // numbers
           item.dataType == 'ST' ||                              // string
           item.dataType == 'BL' ) &&                            // boolean
          item._value) {
        // if the field accepts multiple values from the answer list
        if (Array.isArray(item._value)) {
          for (var m= 0, mlen = item._value.length; m<mlen; m++) {
            this._updateSkipLogicStatus(item, item._value[m], prevSkipLogicShownTargets)
          }
        }
        // if the field accepts only one answer from the answer list
        else {
          this._updateSkipLogicStatus(item, item._value, prevSkipLogicShownTargets)
        } // end if multiple values
      } // end if list
    } // end each item

  },

  /**
   * Update the status of the skip logic rules.
   * Called by checkAnswerCode
   * @param item an item in the lforms form items array
   * @param currentValue the current value of the item
   * @param prevSkipLogicShownTargets an array of previously shown targets
   * @private
   */
  _updateSkipLogicStatus: function(item, currentValue, prevSkipLogicShownTargets) {

    // update values of its target items if this value has changed, (a train reaction)
    this._resetSkipLogicTargetValue(item._codePath, item._parentIdPath_, currentValue, prevSkipLogicShownTargets)

    // update skip logic status
    var targets = this._getSkipLogicTarget(item._codePath, item.dataType, currentValue);
    for (var k=0, klen = targets.length; k<klen; k++) {
      var key = targets[k] + item._parentIdPath_;
      if (this._skipLogicShownTargetKeys[key] === undefined) {
        this._skipLogicShownTargetKeys[key]= true;
      }
      this._skipLogicShownTargets.push([item._codePath, currentValue, targets[k], item._parentIdPath_])
      // check if it's done
      if ( targets[k] == 'DONE') {
        this._formDone = true;
      }
    }
  },

  /**
   * Reset each target item's value if its triggering item's value is changed by another triggering item.
   * It's called recursively until all the triggered target items are checked.
   * @param currentCodePath code path of the current item
   * @param parentIdPath id path of the current item's parent item
   * @param currentValue value of the current item
   * @param prevSkipLogicShownTargets an array of previously shown targets
   * @private
   */
  _resetSkipLogicTargetValue: function(currentCodePath, parentIdPath, currentValue, prevSkipLogicShownTargets) {
    // _skipLogicShownTargets format: [source._codePath, answer_code, target._codePath, source._parentIdPath_]

    var nextTargetCodePath = [];

    // for each shown target item
    for (var i=0, iLen = prevSkipLogicShownTargets.length; i<iLen; i++) {
      var prevStatus = prevSkipLogicShownTargets[i]
      // if its _codePath and _parentIdPath_ are same but its answer code is different than the current item
      // need to check the matching rule's target itmes
      if (prevStatus[0] == currentCodePath &&
          prevStatus[3] == parentIdPath &&
          !this._objectEqual(prevStatus[1], currentValue)) {
        nextTargetCodePath.push(prevStatus[2]);
      }
    }
    if (nextTargetCodePath.length > 0) {
      for (var k=0, kLen = this.items.length; k<kLen; k++) {
        for (var m= 0, mLen = nextTargetCodePath.length; m<mLen; m++) {
          // check if _codePath matches and if within same ancestor (parentIdPath)
          if (this.items[k]._codePath == nextTargetCodePath[m] &&
              this.items[k]._idPath.indexOf(parentIdPath) == 0 ) {
            // reset its value
            // this.items[k]._value = "";
            delete this.items[k]._value;  // date value cannot be string. so it's safer than assign a "" or null to it.
            // check the skip logic that is depending on this test and its value
            var idx = this.items[k]._idPath.lastIndexOf(this.PATH_DELIMITER);
            var nextParentIdPath = this.items[k]._idPath.slice(0,idx);
            this._resetSkipLogicTargetValue(this.items[k]._codePath, nextParentIdPath, "", prevSkipLogicShownTargets)
          } // end check _codePath and parentIdPath
        } // end next targets loop
      } // end items loop
    }
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
    if (item && item._value) {
      if (jQuery.isArray(item._value)) {
        jQuery.each(item._value, function(index, answer) {
          if (answer.other) {
            extra = true;
            // break
            return false;
          }
        });
      }
      else {
        if (item._value.other) {
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
    _navigationMap: [],        // a mapping from position (x, y) to element id (_elementId_) of every questions.
    _reverseNavigationMap: {}, // a reverse mapping from element id to position, for quick search of positions.

    /**
     * Set up or update the navigation map of all active fields
     * @param lfData the WidgetData object of a form
     */
    setupNavigationMap: function(lfData) {
      var items = lfData.items,
          posX = 0; posY = 0;
      this._navigationMap = [];
      this._reverseNavigationMap = {};
      for (var i=0, iLen=items.length; i<iLen; i++) {
        // not in horizontal tables
        if (!items[i]._inHorizontalTable) {
          // TODO: if it is not a hidden target fields of skip logic rules

          posX = 0; // set x to 0
          this._navigationMap.push([items[i]._elementId_]);
          this._reverseNavigationMap[items[i]._elementId_] = {x: posX, y: posY};
          posY += 1; // have added a row
        }
        // in horizontal tables and it is a table header
        else if (items[i]._horizontalTableHeader) {
          var tableKey = [items[i]._codePath + items[i]._parentIdPath_];
          var tableInfo = lfData._horizontalTableInfo[tableKey];
          // it is the first table header
          if (tableInfo && tableInfo.tableStartIndex === i) {
            for (var j= 0, jLen = tableInfo.tableRows.length; j < jLen; j++) {
              var tableRowMap = [];
              var tableRow = tableInfo.tableRows[j];
              posX = 0; // new row, set x to 0
              for (var k= 0, kLen = tableRow.cells.length; k < kLen; k++) {
                var cellItem = items[tableRow.cells[k]];
                tableRowMap.push(cellItem._elementId_);
                this._reverseNavigationMap[cellItem._elementId_] = {x: posX, y: posY};
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
     * @param id id of a DOM element
     * @returns {*} the position in the navigation map array
     */
    getCurrentPosition: function(id) {
      return id ? this._reverseNavigationMap[id] : null;
    },

    /**
     * Find the next field to get focus
     * @param kCode code value of a keyboard key
     * @param id id of a DOM element
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

  },

  // TODO: Methods to support versions of auto-saved data
  History: {
    _versions: [],
    _historicalData: [
      { _timeStamp: null,
        _lfData: []
      }
    ],

    goToVersion: function (index) {

    },
    unDoNSteps: function (n) {

    },
    reDoNSteps: function (n) {

    },
    addToVersionList: function () {

    },
    removeVersion: function (index) {

    },
    getVersionDetail: function (index) {

    },
    getVersionList: function () {

    }
  }

});
WidgetData.screenReaderLog = Def.Autocompleter.screenReaderLog;
