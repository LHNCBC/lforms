'use strict';

angular.module('lformsWidget')
  .controller('PanelTableCtrl', function ($scope, $compile, $http, $location, $anchorScroll, selectedFormData) {

      // Configuration data that controls form's UI
      $scope.formConfig = {
        showQuestionCode: false,   // whether question code is displayed next to the question
        showCodingInstruction: false, // whether to show coding instruction inline. (false: inline; true: in popup)
        useSpecialKeyNavi: false // whether to use specialized keyboard navigation that works on data fields only and skips links, buttons, and etc.
      };

      // Default option for calendar
      $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0',
        showOn: 'button',
        buttonImage: "/images/blank.gif",
        buttonImageOnly: true,

        constrainInput: false,
        showOtherMonths: true,
        selectOtherMonths: true,
        showMonthAfterYear: true,
        buttonText: ""
      };

      // base config for ui-select2
      $scope.tagOptions = {
        width: "100%",
        maximumSelectionSize:1,
        minimumInputLength: 0,
        // minimumResultsForSearch: 6,   // -1 will hide the search(input) field
        minimumResultsForSearch: -1,
        allowClear: false,
        selectOnBlur: false,
        multiple: false
        // simple_tags: false
      };

      // index of active row
      $scope.activeRow = null;

      /**
       * Set the active row in table
       * @param index Row index
       */
      $scope.setActiveRow = function(index) {
        $scope.activeRow = index;
      }

      /**
       * Get the css class for the active row
       * @param index
       * @returns {string}
       */
      $scope.getActiveRowClass = function(index) {
        return $scope.activeRow === index ? "active-row" : "";

      }

      /**
       * Reset lfData, by assign the object from the service directly
       */
      $scope.resetPanelWidgetData = function() {
        $scope.lfData = selectedFormData.getFormData();
      }

      /**
       * Reset the lfData
       * by listening on a broadcast event
       */
      $scope.$on('NewFormData', function(event, panelData) {
        $scope.lfData = panelData;

//        console.log("in panel-table.js, lfData received")

      });

      /**
       * Check if the current question item is to be displayed in a horizontal table
       * @param index
       * @returns {*}
       */
      $scope.inHorizontalTable = function(index) {
        return $scope.lfData.inHorizontalTable(index);
      }

      /**
       * Check if the current question is a title for a horizontal table
       * @param index
       * @returns {*}
       */
      $scope.isHorizontalTableTitle = function(index) {
        return $scope.lfData.isHorizontalTableTitle(index);
      }

      /**
       * Get all columns in a horizontal table
       * @param index
       * @returns {*}
       */
      $scope.getHorizontalTableColumns = function(index) {
        return $scope.lfData.getHorizontalTableColumns(index);
      }

      /**
       * Get all rows in a horizontal table
       * @param index
       * @returns {*}
       */
      $scope.getHorizontalTableRows = function(index) {
        return $scope.lfData.getHorizontalTableRows(index);
      }

      /**
       * Get all data cells in a row in a horizontal table
       * @param row
       * @returns {Array}
       */
      $scope.getHorizontalTableCellsInRow = function(row) {
        var cells = [];
        for(var i= 0, iLen=row.length; i<iLen; i++) {
          cells.push($scope.lfData.items[row[i]]);
        }
        return cells;
      }

      /**
       * Check if the form is finished
       * @returns {boolean|*|*}
       */
      $scope.isFormDone = function() {
        return $scope.lfData.isFormDone();
      };

      /**
       * Check if input field is readonly(0), writable(1), or readonly for existing data, writable for new data(2)
       * @param item
       * @returns {boolean}
       */
      $scope.isReadOnly = function(item) {
        var ret = false;
        if (item.editable && item.editable == "0") {
          ret = true;
        }
        else {
          ret = $scope.lfData.isScoreRuleTarget(item._codePath)
        }
        return ret;
      };

      /**
       * Check if an answer is required
       * @param item
       * @returns {boolean}
       */
      $scope.isAnswerRequired = function(item) {
        var ret=false;
        if (item.answerCardinality &&
            item.answerCardinality.min &&
            item.answerCardinality.min >= 1) {
          ret = true
        }
        return ret;
      };

      /**
       * Check if multiple answers are allowed
       * @param item
       * @returns {boolean}
       */
      $scope.hasMultipleAnswers = function(item) {
        var ret=false;
        if (item.answerCardinality &&
            item.answerCardinality.max &&
            (item.answerCardinality.max >= 1 || item.answerCardinality.max ==-1) ) {
          ret = true
        }
        return ret;
      };

      /**
       * Check data type and answer cardinality
       * @param item
       * @returns {string}
       */
      $scope.getFieldType = function(item) {
        var ret='';
        if (item.header) {
          ret=''
        }
        // if the BMI target item's dataType is "REAL", which is treated as type=number in angular,
        // then the value is not displayed in the field. It seems like a bug in angular.
        // But for now just make it not a number type.
        else if (item.formula != undefined && !jQuery.isEmptyObject(item.formula)) {
          ret = "ST"
        }
        else if (item.answerCardinality && item.answerCardinality.max) {
          ret = item.dataType + item.answerCardinality.max
        }
        else {
          ret = item.dataType
        }
        return ret;
      };

      /**
       * Check if there's a unit list
       * @param item
       * @returns {string}
       */
      $scope.checkUnits = function(item) {
        var ret;
        if (item.units && jQuery.isArray(item.units)) {
          ret = 'list'
        }
        else {
          ret = 'none'
        }
        return ret;
      };

      /**
       * Get the CSS class for items in the targets of a skip logic
       * @param item
       * @returns {string|*}
       */
      $scope.getSkipLogicTargetClass = function(item) {
        var widgetData = $scope.lfData;
        return widgetData.getSkipLogicTargetClass(item);
      };

      // seems not right. need a rewrite. not to remove
      $scope.checkSkipLogicKeys = function() {
        var widgetData = $scope.lfData;
        if (widgetData) {

          widgetData.checkSkipLogicKeys();

          setTimeout(function() {
            $scope.removeAllNewlyShownFlag();
          }, 10);
          setTimeout(function() {
            $scope.removeAllInTransitionFlag();
          }, 3000);
        }
      };

      /**
       * Check if the item has coding instructions
       * @param item
       * @returns {string}
       */
      $scope.hasCodingInstructions = function(item) {
        var ret;
        if (item.codingInstructions && item.codingInstructions.length > 0) {
          ret = true;
        }
        return ret;
      };

      /**
       * Get formatted coding instructions
       * @param item
       * @returns {string}
       */
      $scope.getCodingInstructions = function(item) {
        var ret = '';
        if (item.codingInstructions) {
          ret = "(" + item.codingInstructions + ")"
        }
        return ret;
      };


      /**
       * Check if the item or the group is repeatable
       * i.e. questionCardinality.max > 1
       * Note: questionCardinality.min should always be 1. 0 is meaningless imho.
       * todo: should also check the current number of the repeating items
       * @param item
       * @returns {boolean}
       */
      $scope.isRepeatable = function(item) {
        var ret = false;
        if (item.questionCardinality &&
            (item.questionCardinality.max == -1 || item.questionCardinality.max >1) ) {
          ret = true;
        }
        return ret;
      };

      /**
       * Get the sequence number for the current repeating item
       * @param item
       * @returns {string}
       */
      $scope.getRepeatingSN = function(item) {
        var ret = '';
        if ($scope.isRepeatable(item)) {
          var sn = item._idPath.slice(1);
          ret = sn.replace(/\//,'.');
        }
        return ret;
      };

      /**
       * Watch on the changes on lfData
       */
      $scope.$watch('lfData', function() {
          $scope.checkAnswerCode();
          $scope.checkAllFormulas();
          $scope.updateLastSiblingStatus();
      }, true );

      /**
       * Check each item's skip logic when there's a data change
       */
      $scope.checkAnswerCode = function() {
        var widgetData = $scope.lfData;
        if (widgetData) {
          widgetData.checkAnswerCode();
        }
      };

      /**
       * Run each item's formula when there's a data change
       */
      $scope.checkAllFormulas = function() {
        //  console.log('in checkAllFormulas')
        var widgetData = $scope.lfData;
        if (widgetData) {
          widgetData.runFormulas();
        }
      };

      /**
       * Update sibling status when there's a data change
       */
      $scope.updateLastSiblingStatus = function() {
        var widgetData = $scope.lfData;
        if (widgetData) {
          widgetData._updateLastSiblingStatus();
        }
      };

      /**
       * Prepare the answer list for CWE (combo) field for pp-autocomplete & phr-autocomplete,
       * where each item in the list requires a 'label' and a 'value'
       * @param item
       * @returns {{}}
       */
      $scope.lfComboOpt = function(item) {
        var source = [], preSelected = 0, answers = [], ret ={};

        if ( item.dataType === "CWE" && item.answers) {
          if ( jQuery.isArray(item.answers) ) {
            answers = item.answers
          } else if (item.answers !="") {
            answers = $scope.lfData.answerLists[item.answers];
          }

          for(var i= 0, ilen = answers.length; i<ilen; i++) {
            source.push({
              "label": answers[i].label ? answers[i].label + " " + answers[i].text : answers[i].text,
              "origLabel": answers[i].label,
              "value": answers[i].text,
              "text": answers[i].text,
              "score": answers[i].score,
              "other": answers[i].other,
              "code": answers[i].code
            });

            // todo: check default answer
          }

          ret = {
            source:source,
            position: { collision: 'flip'},
            placeholder: "Select or type a value",
            openOnFocus: true,
            allowFreeText: true
            //selectFirst: true,
            //preSelected:preSelected
          };
        }
        return ret;
      };

      /**
       * Prepare the answer list for CNE field for pp-autocomplete & phr-autocomplete,
       * where each item in the list requires a 'label' and a 'value'
       * @param item
       * @returns {{}}
       */
      $scope.lfListOpt = function(item) {
        var source = [], preSelected = 0, answers = [], ret ={};

        if ( item.dataType === "CNE" && item.answers) {
          if ( jQuery.isArray(item.answers) ) {
            answers = item.answers
          } else if (item.answers !="") {
            answers = $scope.lfData.answerLists[item.answers];
          }
          preSelected = -1;
          for(var i= 0, ilen = answers.length; i<ilen; i++) {
            var label = answers[i].label ? answers[i].label + ". " + answers[i].text : answers[i].text;
            source.push({
              "label": label,
              "origLabel": answers[i].label,
              "value": answers[i].text,
              "text": answers[i].text,
              "score": answers[i].score,
              "other": answers[i].other,
              "code": answers[i].code
            });

            // check the current selected value
            if (item._value && item._value.label == label && item._value.code == answers[i].code) {
              preSelected = i;
            }
            // todo: check default answer
          }

          ret = {
            source:source,
            position: {my: "left top", at:"left bottom",  collision: 'flip'},
            placeholder: "Select a value",
            openOnFocus: true,
            allowFreeText: false,
            preSelected:preSelected,
            //selectFirst: true
          };
        }
        return ret;
      };

      /**
       * Prepare the units list for pp-autocomplete & phr-autocomplete,
       * where each item in the list requires a 'label' and a 'value'
       * @param item
       * @returns hash
       */
      $scope.lfUnitsListOpt = function(item) {

        var source = [], preSelected = 0;

        for(var i= 0, ilen = item.units.length; i<ilen; i++) {
          source.push( { label: item.units[i].name,
                         value: item.units[i].name,
                         code: item.units[i].code} )
          if (item.units[i].default) preSelected = i;
        }

        return {
          source:source,
          position: { collision: 'flip'},
          placeholder: "Select a unit",
          openOnFocus: true,
          allowFreeText: false,
          //selectFirst: true,
          preSelected:preSelected
        };
      };

      /**
       * Get the CSS class on each item row
       * @param item
       * @returns {string}
       */
      $scope.getRowClass = function(item) {
        var eleClass = '';
        if (item._displayLevel_ > 0) {
          eleClass = 'panel_l' + item._displayLevel_;
        }
        if ($scope.isAnswerRequired(item)) {
          eleClass += ' test_required';
        }
        if (item.header) {
          eleClass += ' panel_header';
        }
        if (item.newlyAdded) {
          eleClass += ' newly_added';
        }
        if (item.inTransition) {
          eleClass += ' in_transition';
        }
        if (item.layout == 'horizontal') {
          eleClass += ' horizontal';
        }

        return eleClass;
      };

      /**
       *  Get the CSS class for tree lines at the current level.
       *  Only 5 levels are supported for now, which is good enough for known panels. It could support unlimited levels
       *  in theory.
       * @param level 5 levels from LEFT to RIGHT numbered as 5,4,3,2,1 and a leaf node numbered as 0
       * @return 'line1', 'line2', 'line3', or 'no_display'
       */
      $scope.getTreeLevelClass = function(level,  itemIndex) {
        var ret ='';
        var widgetData = $scope.lfData;

        var statusLast = widgetData._lastSiblingStatus[itemIndex];

        switch(level) {
          // leaf node
          case 0:
            if (statusLast[level]) {
              ret = 'line2'
            }
            else {
              ret = 'line3';
            }
            break;
          // parents nodes
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            if (statusLast[level] === undefined) {
              ret = 'no_display';
            }
            else if (statusLast[level]) {
              ret = '';
            }
            else {
              ret = 'line1';
            }
            break;
          default:
            ret = '';
        }
        return ret;
      };

      /**
       *  Get the CSS class for the extra row that holds the field for "Please Specify" value
       *  The class name depends on the tree level class that this row id depending on.
       * @param level 5 levels from LEFT to RIGHT numbered as 5,4,3,2,1 and a leaf node numbered as 0
       * @return 'line1', 'line2', 'line3', or 'no_display'
       */
      $scope.getExtraRowTreeLevelClass = function(level, itemIndex) {
        var ret = '', cssClass = $scope.getTreeLevelClass(level, itemIndex);
        switch(cssClass) {
          case 'line1':
            ret = 'line1';
            break;
          case 'line2':
            ret = '';
            break;
          case 'line3':
            ret = 'line1';
            break;
          case '':
            ret = ''
            break;
          case 'no_display':
            ret = 'no_display';
            break;
          default:
            ret = '';
        }
        return ret;
      };

      /**
       * Set up option for select2 directive
       * @param item
       * @returns {{}}
       */
      $scope.select2Opt = function(item) {
        var source = [], preSelected = 0, answers = [], ret ={};

        if ( item.dataType === "CNE" && item.answers) {
          if ( jQuery.isArray(item.answers) ) {
            answers = item.answers
          } else if (item.answers !="") {
            answers = $scope.lfData.answerLists[item.answers];
          }

          for(var i= 0, ilen = answers.length; i<ilen; i++) {
            source.push( {
              "id": answers[i].code,
              "text": answers[i].text,
              "value": answers[i].value,
              "score": answers[i].score,
              "other": answers[i].other,
              "code": answers[i].code} )

            // todo: check default answer
          }

          if (item.answerCardinality && item.answerCardinality && (item.answerCardinality.max >1 || item.answerCardinality.max ==-1) ) {
            jQuery.extend(ret, $scope.tagOptions, {
              data:source,
              placeholder: "Select one or more values",
              multiple: true,
              closeOnSelect: false,
              maximumSelectionSize: 0
            });
          }
          else {
            jQuery.extend(ret, $scope.tagOptions, {
              data:source,
              placeholder: "Select a value"
            });
          }
        }
        return ret;

      };

      /**
       * Add a repeating item or a repeating group
       * @param item
       */
      $scope.addOneRepeatingItem = function(item) {
        var objWidgetData = $scope.lfData;

        objWidgetData.addRepeatingItems(item);

        // scroll to the newly added item/group
        var prevHash = $location.hash();
        $location.hash(item._codePath+item._idPath);
        $anchorScroll();
        // restore the previous hash. otherwise the url displayed in browser will have the anchor value added
        $location.hash(prevHash);

        setTimeout(function() {
          $scope.removeNewlyAddedFlag();
        }, 10);
        setTimeout(function() {
          $scope.removeInTransitionFlag();
        }, 3000);
      };


      $scope.addOneRepeatingItemRowInHorizontalTable = function(item) {

      };


      /**
       * Remove the newly shown flag for CSS transition effect
       */
      $scope.removeNewlyAddedFlag = function() {
        //console.log('in remove newly added flag')
        var objWidgetData = $scope.lfData;
        for (var i= 0, iLen=objWidgetData.items.length; i<iLen; i++) {
          if (objWidgetData.items[i].newlyAdded)     {
            objWidgetData.items[i].newlyAdded = false;
            objWidgetData.items[i].inTransition = true;
          }
        }
        $scope.$apply();
      };

      /**
       * Remove the flag for CSS transition effect.
       */
      $scope.removeInTransitionFlag = function() {
        //console.log('in remove newly added flag')
        var objWidgetData = $scope.lfData;
        if (objWidgetData) {
          for (var i= 0, iLen=objWidgetData.items.length; i<iLen; i++) {
            if (objWidgetData.items[i].inTransition)     {
              objWidgetData.items[i].inTransition = false;
            }
          }
          $scope.$apply();
        }
      };

      /**
       * Remove the all newly shown flags for CSS transition effect
       */
      $scope.removeAllNewlyShownFlag = function() {
        //console.log('in remove newly added flag')

        for (var i= 0, ilen = $scope.lfData.length; i<ilen; i++) {
          var objWidgetData = $scope.lfData[i];
          if (objWidgetData) {
            for (var j=0, jLen=objWidgetData.items.length; j<jLen; j++) {
              var idx = objWidgetData.items[j]._idPath.lastIndexOf('/');
              var parentRecIdPath = objWidgetData.items[j]._idPath.slice(0,idx);
              var key = objWidgetData.items[j]._codePath+parentRecIdPath;
              if (objWidgetData._skipLogicShownTargetKeys[key]) {
                delete objWidgetData._skipLogicShownTargetKeys[key];
                objWidgetData.items[j].inTransition = true;
              }
            }
            $scope.$apply();
          }
        }
      };

      /**
       * Remove the all flags for CSS transition effect.
       */
      $scope.removeAllInTransitionFlag = function() {
        //console.log('in remove newly added flag')
        for (var i= 0, ilen = $scope.lfData.length; i<ilen; i++) {
          var objWidgetData = $scope.lfData[i];
          if (objWidgetData) {
            for (var j= 0, jLen=objWidgetData.items.length; j<jLen; j++) {
              if (objWidgetData.items[j].inTransition)     {
                objWidgetData.items[j].inTransition = false;
              }
            }
            $scope.$apply();
          }
        }
      };

      /**
       * Remove one repeating item in a group
       * @param item
       */
      $scope.removeOneRepeatingItem = function(item) {
        $scope.lfData.removeRepeatingItems(item);
      };


      $scope.removeOneRepeatingItemRowInHorizontalTable = function(index) {
        $scope.lfData.removeOneRepeatingItemRowInHorizontalTable(index);
      };

      // temp. for testing
      $scope.switchLayout = function(item) {
        if (item.layout == 'horizontal') {
          item.layout = 'vertical';
        }
        else {
          item.layout = 'horizontal';
        }

        $scope.lfData._resetFieldsForHorizontalTableLayout();
      };

      /**
       * Check if there's only one repeating item in a group
       * (so that the 'remove' button won't show on this item)
       * @param item
       * @returns {boolean}
       */
      $scope.hasOneRepeatingItem = function(item) {
        var recCount = $scope.lfData.getRepeatingItemCount(item);
        return recCount > 1 ? false : true;
      };

      /**
       * Check if the current item is the last repeating item in a group
       * (so that the "add" button will show on this item.)
       * @param item
       * @returns {boolean}
       */
      $scope.lastOneRepeatingItem = function(item) {
        var maxRecId = $scope.lfData.getRepeatingItemMaxId(item);
        var recId = parseInt(item._id)
        return recId == maxRecId;
      };

      /**
       * If the current item is the last item within one or more
       * repeating items (or groups) and return those containing repeating
       * items (or groups)
       * If more than one item are returned, the returned items are ordered by the hierarchy level from bottom to top.
       * @param item
       * @return {array}
       */
      $scope.parentRepeatingItems = function(item) {

      };

      /**
       * Check if the current item is the last item within one or more
       * repeating items (or groups) and return those containing repeating
       * items (or groups)
       * @param item
       * @return {boolean}
       */
      $scope.isLastItemInRepeatingItems = function(index) {
        return $scope.lfData.isLastItemInRepeatingItems(index);
      };

      /**
       * Get the containing repeating item of the last item of repeating items or sections.
       * The containing item is itself if it the last item of a repeating items.
       * @param index
       * @returns {Array}
       */
      $scope.getParentRepeatingItemsOfLastItem = function(index) {
        return $scope.lfData.getParentRepeatingItemsOfLastItem(index);
      };


      $scope.firstOneRepeatingItem = function(item) {
        var minRecId = $scope.lfData.getRepeatingItemMinId(item);
        var recId = parseInt(item._id)
        return recId == minRecId;
      }

      /**
       * Check if the question needs an extra input
       * @param item
       * @returns {*}
       */
      $scope.needExtra = function(item) {
        var objWidgetData = $scope.lfData;
        var extra = objWidgetData.needExtra(item);
        return extra;
      };

      // for debugging only, not used,
      $scope.refresh = function(widgetContainer) {
        $compile(widgetContainer)($scope);
        $scope.$apply();
      };

    });
