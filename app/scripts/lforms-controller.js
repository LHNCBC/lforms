'use strict';

angular.module('lformsWidget')
  .controller('LFormsCtrl',
    ['$scope', '$timeout', 'smoothScroll', 'LF_CONSTANTS', 'lformsConfig',
      function ($scope, $timeout, smoothScroll, LF_CONSTANTS, lformsConfig) {

      $scope.debug = false;

      $scope.hasUnused = false;
      $scope.repeatingSectionStatus = {};

      // Provide blank image to satisfy img tag. Bower packaging forces us to
      // avoid using image files from html templates, therefore using base64
      // encoding for a 1x1 blank gif file.
      $scope.blankGifDataUrl = LF_CONSTANTS.BLANK_GIF_DATAURL;

      // Default option for calendar
      $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0',
        showOn: 'button',
        buttonImage: LF_CONSTANTS.BLANK_GIF_DATAURL,
        buttonImageOnly: true,

        constrainInput: false,
        showOtherMonths: true,
        selectOtherMonths: true,
        showMonthAfterYear: true,
        buttonText: ""
      };

      /**
       * Set the active row in table
       * @param index index of an item in the lforms form items array
       */
      $scope.setActiveRow = function(item) {
        $scope.lfData.setActiveRow(item);
      };

      /**
       * Get the css class for the active row
       * @param item an item
       * @returns {string}
       */
      $scope.getActiveRowClass = function(item) {
        return $scope.lfData.getActiveRowClass(item);
      };

      /**
       * Reset the lfData
       */
      $scope.setFormData = function(formData) {
        $scope.lfData = formData;
      };

      /**
       * Check if the form is finished
       * @returns {boolean|*|*}
       */
      $scope.isFormDone = function() {
        return $scope.lfData.isFormDone();
      };

      /**
       * Check if there's a unit list
       * @param item an item in the lforms form items array
       * @returns {string}
       */
      $scope.checkUnits = function(item) {
        var ret;
        if (item.dataType != "CNE" &&
            item.dataType != "CWE" &&
            item.units &&
            jQuery.isArray(item.units)) {
          ret = 'list'
        }
        else {
          ret = 'none'
        }
        return ret;
      };

      /**
       * Get an item's skip logic status
       * @param item an item
       * @returns {*|string}
       */
      $scope.getSkipLogicClass = function(item) {
        return $scope.lfData.getSkipLogicClass(item);
      };

      /**
       * Check an item's skip logic status to decide if the item should be shown
       * @param item an item
       * @returns {boolean}
       */
      $scope.targetShown = function(item) {
        return $scope.lfData.getSkipLogicClass(item) !== 'target-hide';
      };

      /**
       * Check if the item has coding instructions
       * @param item an item in the lforms form items array
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
       * @param item an item in the lforms form items array
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
       * Get the sequence number for the current repeating item
       * @param item an item in the lforms form items array
       * @returns {string}
       */
      $scope.getRepeatingSN = function(item) {
        var ret = '';
        if (item._questionRepeatable) {
          var sn = item._idPath.slice(1);
          ret = sn.replace(/\//g,'.');
        }
        return ret;
      };


      /**
       * Watch on value and unit changes
       * also returns the element id with the changed data.
       */
        $scope.$watch(
            function () {
              var watchedSourceItems = null;
              if ($scope.lfData && $scope.lfData.itemList) {
                watchedSourceItems = [];
                for (var i= 0, iLen=$scope.lfData.itemList.length; i<iLen; i++) {
                  var item = $scope.lfData.itemList[i];
                  if (item._formulaTargets || item._dataControlTargets || item._skipLogicTargets) {
                    watchedSourceItems.push({value: item.value, unit: item.unit, id: item._elementId});
                  }
                }
              }
              return watchedSourceItems;
            },
            function(newValues, oldValues) {
              var lastUpdated = [];
              if (newValues) {
                // no oldValues, initial loading
                if (!oldValues) {
                  for (var i = 0, iLen = newValues.length; i < iLen; i++) {
                    lastUpdated.push(newValues[i].id);
                  }
                }
                // adding a new repeating item/section
                else if (oldValues.length < newValues.length) {
                  //// //or rules run at the add event
                  //// find out which one is added, solution 1
                  //for (var m= 0, mLen=newValues.length; m<mLen; m++) {
                  //  var newVal = newValues[m];
                  //  var isNew = true;
                  //  for (var n= 0, nLen=oldValues.length; n<nLen; n++) {
                  //    var oldVal = oldValues[n];
                  //    if (newVal.id === oldVal.id) {
                  //      isNew = false;
                  //      break;
                  //    }
                  //  }
                  //  if (isNew) {
                  //    lastUpdated.push(newVal.id)
                  //  }
                  //}
                  // find out which one is added, solution 2
                  // it is always the last one in current design
                  lastUpdated.push(newValues[newValues.length-1].id);
                }
                // removing a repeating item/section
                else if (oldValues.length > newValues.length) {
                  // rules run at the remove event
                }
                // data changes only
                else {
                  for (var i = 0, iLen = newValues.length; i < iLen; i++) {
                    if (!angular.equals(newValues[i], oldValues[i])) {
                      lastUpdated.push(newValues[i].id);
                    }
                  }
                }
                // do something
                for (var j = 0, jLen = lastUpdated.length; j < jLen; j++) {
                  var item = $scope.lfData.itemHash[lastUpdated[j]];
                  $scope.updateOnSourceItemValueChange(item);

  //                    console.log(item.question + item._elementId);
                }
              }
            },
            true
        );



      /**
       * Watch on the values of each item
       * When in a deep watch mode, angular makes a copy of the watched object.
       * Only the input values need to be watch. Not the entire lfData,
       * which could be huge depends on the actual form data.
       * todo: performance optimization!!!
       */
      //$scope.$watch(
      //  //get the values and watch on those values only
      //  function () {
      //    return $scope.lfData && $scope.lfData.itemList ? $scope.lfData.itemList.map(function(item) {return [item.value, item.unit];}) : null;
      //  },
      //  function() {
      //    $scope.updateOnValueChange();
      //  },
      //  true
      //);


      /**
       * Watch on form changes
       * Disable animation before a form is loaded, then re-enable animation the form is loaded
       */
      $scope.$watch("lfData", function() { // or watch on function() {return $scope.lfData;}
        // disable animation
        lformsConfig.disableAnimate();
        // re-enable animation after the form is loaded
        if ($scope.lfData && $scope.lfData.templateOptions && $scope.lfData.templateOptions.useAnimation) {
          $timeout(function () {
            // the templateOptions might be changed again after the $timeout was set
            if ($scope.lfData && $scope.lfData.templateOptions && $scope.lfData.templateOptions.useAnimation) {
              lformsConfig.enableAnimate();
            }
          }, 1);
        }
      });


      //$scope.updateOnValueChange = function() {
      //  var widgetData = $scope.lfData;
      //  if (widgetData) {
      //    widgetData.updateOnValueChange();
      //    $scope.sendActionsToScreenReader();
      //  }
      //};

        $scope.updateOnSourceItemValueChange = function(item) {
          var widgetData = $scope.lfData;
          if (widgetData) {
            widgetData.updateOnSourceItemValueChange(item);
            $scope.sendActionsToScreenReader();
          }
        };

      $scope.getNumberOfQuestions = function() {
        var ret = 0;
        var widgetData = $scope.lfData;
        if (widgetData && widgetData.itemList) {
          for (var i = 0, iLen = widgetData.itemList.length; i < iLen; i++) {
            if (!widgetData.itemList[i].header)
              ret++;
          }
        }
        return ret;
      };

      /**
       * Get the CSS class on each item row
       * @param item an item in the lforms form items array
       * @returns {string}
       */
      $scope.getRowClass = function(item) {
        var eleClass = '';
        if (item._answerRequired) {
          eleClass += ' answer-required';
        }
        if (item.header) {
          eleClass += ' section-header';
        }
        else {
          eleClass += ' question';
        }
        if (item.layout == 'horizontal') {
          eleClass += ' horizontal';
        }
        if (!item.question || item.question.length === 0) {
          eleClass += ' empty-question';
        }
        return eleClass;
      };

      /**
       *  Get the CSS class for tree lines at the current level.
       *  Unlimited levels are supported, although the screen size limits the number of the levels that can be shown.
       * @param level the tree level index from left/root to right starting with 0
       * @param lastStatusList the list that contains the last sibling status the item on each level starting from root
       * @return {string} 'line1', 'line2', 'line3', or 'no_display'
       */
      $scope.getTreeLevelClass = function(level, lastStatusList) {
        var ret ='';
        // leaf node
        if (level === lastStatusList.length-1) {
          if (lastStatusList[level]) {
            ret = 'line2'
          }
          else {
            ret = 'line3';
          }
        }
        // non-leaf node
        else {
          if (lastStatusList[level] === undefined) {
            ret = 'no_display';
          }
          else if (lastStatusList[level]) {
            ret = '';
          }
          else {
            ret = 'line1';
          }
        }
        return ret;
      };

      /**
       *  Get the CSS class for the extra row that holds the field for "Please Specify" value
       *  The class name depends on the tree level class that this row id depending on.
       * @param level the tree level index from left/root to right starting with 0
       * @param lastStatusList the list that contains the last sibling status the item on each level starting from root
       * @return 'line1', 'line2', 'line3', or 'no_display'
       */
      $scope.getExtraRowTreeLevelClass = function(level, lastStatusList) {
        var ret = '', cssClass = $scope.getTreeLevelClass(level, lastStatusList);
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
       * Add a repeating item or a repeating group
       * @param item an item in the lforms form items array
       */
      $scope.addOneRepeatingItem = function(item) {
        var widgetData = $scope.lfData;
        var anyEmpty = false;
        if ($scope.lfData && !$scope.lfData.templateOptions.allowMultipleEmptyRepeatingItems) {
          anyEmpty = widgetData.areAnyRepeatingItemsEmpty(item);
        }
        if (!anyEmpty) {
          var newItem = widgetData.addRepeatingItems(item);
          $scope.sendActionsToScreenReader();

          setTimeout(function() {
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            var headerItem = jQuery("label[for='" + newItem._elementId + "']")[0];
            var btnDel = document.getElementById("del-" + newItem._elementId);
            // vertical table, find the header item
            if (headerItem) {
              var anchorItem = headerItem;
            }
            // horizontal table, find the '-' button
            else if (btnDel) {
              var anchorItem = btnDel;
            }

            if (anchorItem) {
              var anchorPosition = anchorItem.getBoundingClientRect();
              // scroll down to show about 2 rows of the newly added section
              // if the new header item is close enough to the bottom so that the first 2 questions are not visible
              if (anchorPosition && anchorPosition.bottom > viewportHeight - 70) {
                smoothScroll(anchorItem, {
                  duration: 500,
                  easing: 'easeInQuad',
                  offset: viewportHeight - 105
                });
              }
              // move the focus to the '-' button of the newly added item/section
              // a table from the '-' button moves the focus to the next input field
              if (btnDel)
                btnDel.focus();
            }
          }, 1);

        }
      };


      /**
       * Unset the flag to hide the warning about unused repeating items
       * @param item a repeating item
       */
      $scope.hideUnusedItemWarning = function(item) {
        if ($scope.lfData && !$scope.lfData.templateOptions.allowMultipleEmptyRepeatingItems) {
          item._showUnusedItemWarning = false;
        }
      };


      /**
       * Write action logs from the lforms to reader_log element on the page
       * so that screen readers can read.
       */
      $scope.sendActionsToScreenReader = function() {
        var widgetData = $scope.lfData;
        if (widgetData._actionLogs.length > 0 && Def && Def.Autocompleter) {
          widgetData._actionLogs.forEach(function(log) {
            Def.Autocompleter.screenReaderLog(log);
          });
          // clean up logs
          widgetData._actionLogs = [];
        }

      };

      /**
       * Remove one repeating item in a group
       * @param item an item in the lforms form items array
       */
      $scope.removeOneRepeatingItem = function(item) {

        var widgetData = $scope.lfData;
        var nextItem = widgetData.getNextRepeatingItem(item);

        var btnId = '';
        // move the focus to the next '-' button if there's one displayed
        // ('-' buttons are shown only when there are two repeating items shown).
        if (nextItem) {
          if (widgetData.getRepeatingItemCount(item) === 2) {
            btnId = 'add-' + nextItem._elementId;
          }
          else {
            btnId = 'del-' + nextItem._elementId;
          }
        }
        // otherwise move the focus to the add button of the previous item
        else {
          var prevItem = widgetData.getPrevRepeatingItem(item);
          if (prevItem) {
            btnId = 'add-' + prevItem._elementId;
          }
        }

        // remove the items
        $scope.lfData.removeRepeatingItems(item);

        $scope.sendActionsToScreenReader();

        // set the focus
        setTimeout(function() {
          var btn = document.getElementById(btnId);
          if (btn) btn.focus();
        }, 1);
      };

      /**
       * Check if there's only one repeating item in a group
       * (so that the 'remove' button won't show on this item)
       * @param item an item in the lforms form items array
       * @returns {boolean}
       */
      $scope.hasOneRepeatingItem =function(item) {
        var recCount = $scope.lfData.getRepeatingItemCount(item);
        return recCount > 1 ? false : true;
      };

      /**
       * Check if the current horizontal table has one row only
       * @param item an item in the lforms form items array
       * @returns {boolean}
       */
      $scope.hasOneRepeatingRow = function(item) {
        var ret = false;
        var tableInfo = $scope.lfData._horizontalTableInfo[item._codePath + item._parentIdPath_];
        if (tableInfo && tableInfo.tableRows && tableInfo.tableRows.length === 1) {
          ret = true;
        }

        return ret;
      };


      /**
       * Check if the current item is the last item within one or more
       * repeating items (or groups) and return those containing repeating
       * items (or groups)
       * @param item an item in the lforms form items array
       * @return {boolean}
       */
      $scope.isLastItemInRepeatingItems = function(index) {
        return $scope.lfData.isLastItemInRepeatingItems(index);
      };


      /**
       * Check if the question needs an extra input
       * @param item an item in the lforms form items array
       * @returns {*}
       */
      $scope.needExtra = function(item) {
        var widgetData = $scope.lfData;
        var extra = widgetData.needExtra(item);
        return extra;
      };

      /**
       * Get the form data from the LForms widget. It might just include the "questionCode" and "value"
       * (and "unit" and "valueOther" if there's one). The same tree structure is returned.
       * @param noFormDefData optional, to not include form definition data, the default is false.
       * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
       * @param noHiddenItem optional, to remove items that are hidden by skip logic, the default is false.
       * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
       */
      $scope.getFormData = function(noFormDefData, noEmptyValue, noHiddenItem) {
        var formData =  $scope.lfData.getFormData(noFormDefData, noEmptyValue, noHiddenItem);
        return formData;
      };

      // for debug only. to be removed.
      $scope.onclick = function() {
        debugger
        var i = 1;
      };

      /**
       * Handle navigation keys using TAB/ SHIFT+TAB keys
       * @param event keypress event
       */
      $scope.handleNavigationKeyEventByTab = function(event) {

        var widgetData = $scope.lfData;
        if (widgetData.templateOptions.tabOnInputFieldsOnly && event.keyCode === widgetData.Navigation.TAB) {
          if (event.shiftKey) {
            var simArrowCode = widgetData.Navigation.ARROW.LEFT;
          }
          else {
            var simArrowCode = widgetData.Navigation.ARROW.RIGHT;
          }

          var nextId = event.target['id'], nextElement;
          // find the next element, bypass the invisible elements
          do {
            // get the DOM element id of next field
            nextId = widgetData.Navigation.getNextFieldId(simArrowCode, nextId);
            // get the next DOM element by ID
            nextElement = document.getElementById(nextId);
          } while (nextId && (!nextElement || !jQuery(nextElement).is(":visible")));

          // set the focus
          var currentElement = event.target;
          if (nextElement && nextElement.id !== currentElement.id) {
            event.preventDefault();
            event.stopPropagation();
            setTimeout(function() {
              nextElement.focus();
              nextElement.select();
            }, 1);
            currentElement.blur();
          }
        }

      };

      /**
       * Handle navigation keys using CTRL+arrow keys
       * @param event keypress event
       */
      $scope.handleNavigationKeyEventByArrowKeys = function(event) {

        var widgetData = $scope.lfData;
        // supported arrow keys
        var arrow = widgetData.Navigation.ARROW;

        // only when control key is also pressed
        if (event.ctrlKey &&
            jQuery.inArray(event.keyCode, [arrow.LEFT, arrow.UP, arrow.RIGHT, arrow.DOWN]) >= 0 ) {

          var nextId = event.target['id'], nextElement;
          // find the next element, bypass the invisible elements
          do {
            // get the DOM element id of next field
            nextId = widgetData.Navigation.getNextFieldId(event.keyCode, nextId);
            // get the next DOM element by ID
            nextElement = document.getElementById(nextId);
          } while (nextId && (!nextElement || !jQuery(nextElement).is(":visible")));

          // set the focus
          var currentElement = event.target;
          if (nextElement && nextElement.id !== currentElement.id) {
            event.preventDefault();
            event.stopPropagation();
            setTimeout(function() {
              nextElement.focus();
            }, 1);
            currentElement.blur();
          }
        }
      };
    }]);
