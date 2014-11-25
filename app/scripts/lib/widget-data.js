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
    "", // for header, no input field
  ],

  // functions

  // constructor
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

    // merge answers in all items into this.answerLists if answers are not already in this.answerLists --- not necessary

    this._resetRepeatableItems();

    this._resetFieldsForHorizontalTableLayout();

    this._updateLastSiblingStatus();

    this._updateLastItemInRepeatingItemsStatus();

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

    this._resetFieldsForHorizontalTableLayout();

    this._updateLastSiblingStatus();

    this._updateLastItemInRepeatingItemsStatus();

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
   * Get the codePaths of a given list of the codes
   * Note: in skip logic, the target items are the siblings or descendants of the source item
   * @param sourceItemIndex
   * @param rule
   * @returns rule
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
   * Get the codePath for the formula's source items, and add source index
   * Note:
   * a source item and the target item should be siblings, or
   * a source item should be the target item's descendant, or
   * the target item should be a source item's descendant
   * @param targetItemIndex
   * @param formula
   * @returns formula
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

    } // end of the items loop

  },

  /**
   * Check if an item has children
   * @param itemIndex
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
   * @param item
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
   * @param item
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
   * @param item
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
   * @param index
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
   * @param index
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
   * @param item
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
   * @param item
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
   * @param newItems
   * @param parentIdPath
   * @param newId
   * @private
   */
  _updateIdAndPath: function(newItems, parentIdPath, newId) {
    // update the first item
    var newIdPath = parentIdPath + this.PATH_DELIMITER + newId;
    newItems[0]._id = newId;
    newItems[0]._idPath = newIdPath;
    newItems[0]._parentIdPath_ = parentIdPath
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
    }
  },

  /**
   * Find the start index and end index in the items array of a repeatable item or
   * a repeatable group. It is used for adding and removing a repeatable items
   * @param item
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
          this.items[i]._idPath.indexOf(item._idPath) == 0 &&
          this.items[i]._codePath.indexOf(item._codePath) == 0 ) {
        idxEnd = i;
      }
    }
    return {start: idxStart, end: idxEnd};
  },

  /**
   * Check if multiple answers are allowed
   * @param item
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
  _resetFieldsForHorizontalTableLayout: function() {
    this._horizontalTableItems = {};
    for (var i= 0, iLen=this.items.length; i<iLen; i++) {
      // header item and horizontal layout
      if (this.items[i].header && this.items[i].layout == "horizontal" ) {
        // if it's a repeating table
        if (this._questionRepeatable(this.items[i])) {
          var range = this._getRepeatableItemsRange(this.items[i]);
          // get column info (names for now)
          var cols =[];
          var itemsInRow = [];
          for (var c=range.start+1; c<=range.end; c++) {
            cols.push(this.items[c].question)
            itemsInRow.push(c)
          }
          this._horizontalTableItems[i] = {start: range.start+1, end: range.end, columns: cols, rows: [itemsInRow]};
        }
        // or it's a non-repeating table.
        else {
          // same methods for repeating items could be used for non-repeating items too. N
          // eed to renames functions names in those 'repeatable' functions.
          var range = this._getRepeatableItemsRange(this.items[i]);
          // get column info (names for now)
          var cols =[];
          var itemsInRow = [];
          for (var c=range.start+1; c<=range.end; c++) {
            cols.push(this.items[c].question)
            itemsInRow.push(c)
          }
          this._horizontalTableItems[i] = {start: range.start+1, end: range.end, columns: cols, rows: [itemsInRow]};
        }
      }
    }

  },


  addRepeatingItemsForHorizontalTable: function(rowIndex) {

  },


  /**
   * Add a repeating item or a repeating group
   * and update related form status
   * @param item
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
  },

  /**
   * Remove a repeating item or group
   * @param item
   */
  removeRepeatingItems: function(item) {

    var range = this._getRepeatableItemsRange(item);
    this.items.splice(range.start, range.end-range.start+1);

    this._resetInternalData();
  },

//  formula : {
//    name: 'BMI',
//    value: ['/12345-1', '/23498-2'],
//    target: '/38743-3'
//  }

  // support for score rules
  /** determine if a loinc test is a place to store the total score for score rules
   *
   * @param codePath the LOINC test's LOINC path
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
   * Calculate the total score and set the value of the score rule target field
   * @param scoreRule
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
          var valuesInStandardUnit = this.findFormulaSourcesInStandardUnit_(formula);

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

  findFormulaSourcesInStandardUnit_ : function(formula) {
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



  // functions for skip logic support
  // only 'CNE' and 'CWE' type are supported, only 'show action' is supported
  // TODO: 1) numeric value as a trigger, 2) 'hide' action


  /**
   * Check if a item is part of the target of a skip logic rule
   * @param codePath
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
   * @param codePath
   * @param dataType
   * @param currentValue
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
   * @param range
   * @param numValue
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

  inHorizontalTable: function(index) {
    var ret = false;
    var titles = Object.keys(this._horizontalTableItems);
    for (var i= 0, iLen=titles.length; i<iLen; i++) {
      // if it's the table title item
      if (index == titles[i]) {
        ret = true;
        break;
      }
      // horizontal table items
      else {
        var table = this._horizontalTableItems[titles[i]];
        if (index >= table.start && index <=table.end ) {
          ret = true;
          break;
        }
      } // end if it's the table title item
    } // end of the loop of horizontal tables

    return ret;
  },

  isHorizontalTableTitle: function(index) {
    var ret = false;
    var titles = Object.keys(this._horizontalTableItems);
    for (var i= 0, iLen=titles.length; i<iLen; i++) {
      // if it's the table title item
      if (index == titles[i]) {
        ret = true;
        break;
      }
    } // end of the loop of horizontal tables

    return ret;

  },

  getHorizontalTableColumns: function(titleItemIndex) {
    //return this._horizontalTableItems[titleItemIndex][0].columns;
    return this._horizontalTableItems[titleItemIndex].columns
  },

  getHorizontalTableRows: function(titleItemIndex) {

    return this._horizontalTableItems[titleItemIndex].rows
//    var ret = [];
//    var rows = this._horizontalTableItems[titleItemIndex];
//    for (var i= 0, iLen=rows.length; i<iLen; i++) {
//      var itemsInRow = [];
//      for (var c=rows[i].start; c<=rows[i].end; c++) {
//        itemsInRow.push(this.c)
//      }
//      ret.push(itemsInRow);
//    }
//
//    return ret;
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
   * @param item
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
    } // end of if the item is a target
    return ret;
  },


  // check skip logic target keys ???
  // seems not finished yet. used to make style changes in the transition of show/hide target items
  checkSkipLogicKeys: function() {
    var ret = false;
    if (!jQuery.isEmptyObject(this._skipLogicShownTargetKeys)) {
      ret = true;
    }

    return ret;
  },

  /**
   * Check if a skip logic target item is shown
   * @param item
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
   * @param item
   * @param currentValue
   * @param prevSkipLogicShownTargets
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
   * @param currentCodePath
   * @param parentIdPath
   * @param currentValue
   * @param prevSkipLogicShownTargets
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
            this.items[k]._value;  // date value cannot be string. so it's safer than assign a "" or null to it.
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
   * @param item
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
