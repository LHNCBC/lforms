var LForms = require('../lforms');

angular.module('lformsWidget')
    .controller('LFormsCtrl',
      ['$window','$scope', '$element', '$timeout', '$interval', '$sce', 'smoothScroll', 'LF_CONSTANTS', 'lformsConfig',
        function ($window, $scope, $element, $timeout, $interval, $sce, smoothScroll, LF_CONSTANTS, lformsConfig) {
        'use strict';

        $scope.debug = false;

        $scope.hasUnused = false;
        $scope.repeatingSectionStatus = {};

        $scope.validationInitialShowTime = LF_CONSTANTS.VALIDATION_MESSAGE_INITIAL_SHOW_TIME;

        // Provide blank image to satisfy img tag. Bower packaging forces us to
        // avoid using image files from html templates, therefore using base64
        // encoding for a 1x1 blank gif file.
        $scope.blankGifDataUrl = LF_CONSTANTS.BLANK_GIF_DATAURL;

        // Default option for calendar - for the JQuery datepicker
        $scope.dateOptions = {
          changeYear: true,
          changeMonth: true,
          yearRange: '1800:-0',
          showOn: 'button',
          constrainInput: false,
          showOtherMonths: true,
          selectOtherMonths: true,
          showMonthAfterYear: true,
          buttonText: "Show date picker"
        };

        // uib booststrap datetime picker, https://github.com/Gillardo/bootstrap-ui-datetime-picker
        $scope.uibDateTimePickerFormat = "MM/dd/yyyy HH:mm";
        $scope.uibDatePickerAltFormats = [
          'yyyy',
          'M/yyyy', 'MM/yyyy', 'yyyy/M', 'yyyy/MM',
          'M/d/yyyy', 'MM/d/yyyy', 'M/dd/yyyy', 'MM/dd/yyyy',
          "M/d/yyyy HH:mm", "MM/d/yyyy HH:mm", "M/dd/yyyy HH:mm",
          "yyyy-MM", "yyyy-MM-dd", "yyyy-MM-dd HH:mm"
        ];

        $scope.uibDatePickerOptions = {
          showWeeks: false
        };

        $scope.uibTimePickerOptions = {
          arrowkeys: true,
          //showSeconds: false
        };

        // open the uib bootstrap datetime picker
        $scope.openUibDtmPicker = function(e) {
          this.isOpen = true;
        }

        $scope.uibDtmPickerButtonBar = {
          // specify the class for the close button so that we can locate the element.
          // must specify each button but each button's conf fall back to system default if not specified.
          show: true,
          now: {},
          today: {},
          clear: {},
          date: {},
          time: {},
          close: {
            cls: 'btn-sm btn-default lf-dtmpk-close'
          },
          cancel: {}
        };

        // Close the uib bootstrap datetime picker if the input field loses focus -
        // if the input loses focus due to clicking on the calendar icon, it will open fine.
        // not intended to use on other fields but having the eleName param make it useful for troubleshooting
        $scope.uibDtmPickerOnBlur = function(eleName) {
          if(eleName === 'input' && this.isOpen) {
            setTimeout(function(){
              document.getElementsByClassName('lf-dtmpk-close')[0].click()
            });
          }
        };

        /**
         * Check the current view's width
         */
        $scope.checkViewWidth = function() {
          // the $element is where the controller is set on
          var width = $element.width(); //$window.innerWidth;
          $scope._viewMode = "";
          $scope._inputFieldWidth = "";

          // small screen
          if (width <= 400)  //480
            $scope._viewMode = "sm";
          // medium screen
          else if (width <= 600)  //800
            $scope._viewMode = "md";
          // large screen
          else {
            $scope._viewMode = "lg";
          }
          $scope._inputFieldWidth = {'width': width / 2};
        };


        // initialize an element resize detector
        var erd = LForms._elementResizeDetectorMaker({
          strategy: "scroll" //<- For ultra performance.
        });


        // check the width when the containing div changes its size
        erd.listenTo($element, function(element) {
          $scope.$apply($scope.checkViewWidth());
        });


        // initial values
        $scope.checkViewWidth();


        /**
         * get the CSS class the form's view mode
         * @returns {string}
         */
        $scope.getViewModeClass = function() {
          var viewModeClass = "";
          if ($scope.lfData) {
            var viewMode = $scope.lfData.templateOptions.viewMode;
            // responsive to the screen/container's size
            if (! viewMode || viewMode === "auto") {
              viewMode = $scope._viewMode;
            }
            switch (viewMode) {
                // fixed to be the large layout
              case "lg":
                viewModeClass = "lf-view-lg";
                break;
                // fixed to be the large layout
              case "md":
                viewModeClass = "lf-view-md";
                break;
                // fixed to be the large layout
              case "sm":
                viewModeClass = "lf-view-sm";
                break;
            }
          }

          return viewModeClass;
        };


        /**
         * get the CSS class for an item's view mode
         * @param item a form item
         * @returns {string}
         */
        $scope.getItemViewModeClass = function(item) {
          var viewMode;
          var viewModeClass = "";
          if ($scope.lfData) {
            // if viewMode is specified on the item
            if (item.displayControl && item.displayControl.viewMode) {
              viewMode = item.displayControl.viewMode;
            }
            // otherwise use the default viewMode of the form
            else {
              viewMode = $scope.lfData.templateOptions.viewMode;
            }

            // responsive to the screen/container's size
            if (!viewMode || viewMode === "auto") {
              viewMode = $scope._viewMode;
            }

            switch (viewMode) {
                // fixed to be the large layout
              case "lg":
                viewModeClass = "lf-item-view-lg";
                break;
                // fixed to be the large layout
              case "md":
                viewModeClass = "lf-item-view-md";
                break;
                // fixed to be the large layout
              case "sm":
                viewModeClass = "lf-item-view-sm";
                break;
              default:
                viewModeClass = "lf-item-view-lg";
            }
          }

          return viewModeClass;
        };


          /**
         * Set the active row in table
         * @param index index of an item in the lforms form items array
         */
        $scope.setActiveRow = function(item) {
          $scope.lfData.setActiveRow(item);
        };


        /**
         * Get the inline width for the input and unit part of a form item
         * @item a form item
         * @returns {*}
         */
        $scope.getFieldWidth = function(item) {
          return $scope.getItemViewModeClass(item) === 'lf-item-view-lg' ? $scope._inputFieldWidth : null;
        };


        /**
         * Set the time that a validation message shows for the first time.
         * @param ms time in ms
         */
        $scope.setValidationInitialShowTime = function(ms) {
          $scope.validationInitialShowTime = ms;
        };


        /**
         * Set up a timer to make validation messages disappear in 2 seconds when the input field loses focus
         * @param item the item which onBlur event happens on its input field
         */
        $scope.activeRowOnBlur = function(item) {

          // the first visit to the field (and leaving the field), show validation messages for a certain time
          if (!item._visitedBefore) {
            item._showValidation = true;

            // use $interval instead of $timeout so that protractor will not wait on $timeout
            var intervalCanceller = $interval(function() {
              // not to show validation messages after 2 seconds
              item._showValidation = false;
              item._visitedBefore = true;
              $interval.cancel(intervalCanceller);
            }, $scope.validationInitialShowTime);
          }
          // the following visits (and leaving the field), not to show validation messages
          else {
            item._showValidation = false;
          }
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
         * @returns {boolean}
         */
        $scope.checkUnits = function(item) {
          return !!(item._unitAutocompOptions ||
            (item._unitReadonly && item.unit && item.unit._displayUnit));
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
         * Get the CSS styles on an item in formHeaderItems
         * @param col an item in formHeaderItems
         * @returns {{}} CSS style object
         */
        $scope.getHeaderItemStyle = function(col) {
          var ret = {};
          if (col.displayControl &&
              angular.isArray(col.displayControl.colCSS)) {
            // only when the view mode is lg, i.e. the items are listed like table columns
            var viewModeClass = $scope.getViewModeClass();
            if (viewModeClass === 'lf-view-lg') {
              var colCSS = col.displayControl.colCSS;
              for (var i = 0, iLen = colCSS.length; i < iLen; i++) {
                var css = colCSS[i];
                ret[css.name] = css.value;
              }
            }
          }
          return ret;
        };


        /**
         * Get the CSS styles on a table column
          * @param col a column in a HTML table
         * @returns {{}} CSS style object
         */
        $scope.getTableColumnStyle = function(col) {
          var ret = {};
          if (col.displayControl && angular.isArray(col.displayControl.colCSS)) {
            var colCSS = col.displayControl.colCSS;
            for (var i= 0, iLen= colCSS.length; i<iLen; i++) {
              var css = colCSS[i];
              ret[ css.name ] = css.value;
            }
          }
          return ret;
        };


        /**
         * Get the CSS styles on an item itself
         * @param item an item in a form
         * @returns {{}} CSS style object
         */
        $scope.getItemStyle = function(item) {
          var ret = {};
          if (item.displayControl && angular.isArray(item.displayControl.css)) {
            for (var i= 0, iLen= item.displayControl.css.length; i<iLen; i++) {
              var css = item.displayControl.css[i];
              ret[ css.name ] = css.value;
            }
          }
          return ret;
        };


        /**
         * Check an item's skip logic status to decide if the item should be shown
         * @param item an item
         * @returns {boolean}
         */
        $scope.targetShown = function(item) {
          return item._enableWhenExpVal !== false &&
            $scope.lfData.getSkipLogicClass(item) !== 'target-disabled';
        };


        /**
         *  Hide/show the form option panel
         */
        $scope.hideShowFormOptionPanel = function() {
          $scope.lfData.templateOptions.showFormOptionPanel = !$scope.lfData.templateOptions.showFormOptionPanel;
        };


        /**
         * Check if the button for item option panel should be shown
         * @param item a form item
         */
        $scope.isItemOptionPanelButtonShown = function(item) {
          var buttonShown = $scope.lfData.templateOptions.showItemOptionPanelButton &&
              (item.dataType === "SECTION" || item.answers && (item.dataType === "CWE" || item.dataType === "CNE" ))
          if (!buttonShown)
            item._showItemOptionPanel = false;

          return buttonShown;
        };


        /**
         * Hide/show the item's option panel
         * @param item a form item
         */
        $scope.hideShowItemOptionPanel = function(item) {
          if ($scope.isItemOptionPanelButtonShown(item)) {
            item._showItemOptionPanel = !item._showItemOptionPanel;
          }
        };

        /**
         * Check if a particular layout is allowed for a section item
         * @param item a form item
         * @param layout a type of layout. permissible values are 'horizontal' and 'matrix'
         */
        $scope.isQuestionLayoutAllowed = function(item, layout) {

          var allowed = false;
          if (layout === 'matrix' || layout === 'horizontal') {
            allowed = true;
            //for both horizontal and matrix
            //the item has children but no grand children
            if (item.dataType === "SECTION" && item.items && item.items.length>0) {
              var firstItemAnswers = item.items[0].answers;
              var firstItemDataType = item.items[0].dataType;
              var firstItemAnswerCardinality = item.items[0].answerCardinality;
              for (var i = 0, iLen = item.items.length; i<iLen; i++) {
                var subItem = item.items[i];
                if (subItem.dataType === "SECTION" || subItem.dataType === "TITLE" || subItem.items && subItem.items.length > 0) {
                  allowed = false;
                  break;
                }
                // addition requirement for matrix layout: all answers are same
                if (layout === "matrix") {
                  if (subItem.dataType !== "CWE" && subItem.dataType !== "CNE") {
                    allowed = false;
                    break;
                  }
                  else if (i>0 && firstItemDataType !== item.items[i].dataType ||
                      !angular.equals(firstItemAnswerCardinality, subItem.answerCardinality) ||
                      !angular.equals(firstItemAnswers, subItem.answers)) {
                    allowed = false;
                    break;
                  }
                }
              }
            }
            else {
              allowed = false;
            }
          }

          return allowed;
        };


        /**
         * Check the display type of the coding instructions
         * @param item an item in the lforms form items array
         * @returns {string}
         */
        $scope.getCodingInstructionsDisplayType = function(item) {
          var ret ='';
          if (item.codingInstructions && item.codingInstructions.length > 0) {
            var position = $scope.lfData.templateOptions.showCodingInstruction ? "inline" : "popover";
            if ($scope.lfData.templateOptions.allowHTMLInInstructions && item.codingInstructionsFormat === "html") {
              var format = "html";
            }
            else {
              format = "escaped";
            }
            ret = position + "-" + format;
          }
          return ret;
        };


        /**
         * Get coding instructions with assumed safe HTML content
         * @param item an item in the lforms form items array
         * @returns {string}
         */
        $scope.getTrustedCodingInstructions = function(item) {
          return item.codingInstructions ? $sce.trustAsHtml(item.codingInstructions) : ''
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
         * Watch on value and unit changes of controlling/source items for skip logic
         * formulas and data controls.
         */
        $scope.$watch(
            function () {
              var watchedSourceItems = null;
              if ($scope.lfData && $scope.lfData.itemList) {
                watchedSourceItems = [];
                for (var i= 0, iLen=$scope.lfData.itemList.length; i<iLen; i++) {
                  var item = $scope.lfData.itemList[i];
                  if (item._formulaTargets || item._dataControlTargets || item._skipLogicTargets) {
                    watchedSourceItems.push({value: item.value, unit: item.unit,
                      id: item._elementId, enableWhenExp: item._enableWhenExpVal});
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
                  // rules run at the remove event, TBD
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
                  $scope.updateOnSourceItemChange(item);
                }
              }
            },
            true
        );


        /**
         * Watch on form changes (shallow watch on the form object)
         * Disable animation and validations before a form is loaded,
         * then re-enable animation and validations when the form is loaded
         */
        $scope.$watch("lfData", function() { // or watch on function() {return $scope.lfData;}
          var lfData = $scope.lfData;

          // disable animation
          lformsConfig.disableAnimate();
          // re-enable animation after the form is loaded
          if (lfData && lfData.templateOptions && lfData.templateOptions.useAnimation) {
            $timeout(function () {
              // the templateOptions might be changed again after the $timeout was set
              if (lfData && lfData.templateOptions && lfData.templateOptions.useAnimation) {
                lformsConfig.enableAnimate();
              }
            }, 1);
          }

          // Only when lfData changes as a whole do we check whether the new
          // form has FHIRPath or not.  This is to avoid the expensive (for
          // large forms) check on the whole of the form data for the need to
          // run FHIRPath.
          if (LForms.FHIR) {
            if (lfData) { // sometimes set to null to clear the page
              if (lfData._hasResponsiveExpr || lfData._hasInitialExpr) {
                // Watch for changes that require FHIRPath to run
                if (lfData._hasResponsiveExpr) {
                  if ($scope.unwatchFHIRPath)
                    $scope.unwatchFHIRPath();
                  $scope.unwatchFHIRPath = $scope.$watch(function() {
                    return JSON.stringify(lfData, function(key, val) {
                      // In Safari, "key" is a number (not a string) for arrays
                      key = ""+key; // a little faster than checking the type
                      // Ignore changes to internal variables and $$hashKey
                      return (key.indexOf('_') === 0 || key.indexOf('$$')===0) ? undefined : val;
                    });
                  }, function() {
                    if (lfData) {
                      lfData._expressionProcessor.runCalculations(false).then(()=>{
                        // We might or might not be in a digest cycle.
                        $scope.$evalAsync(); // will trigger a digest cycle
                      }); // pick up asynchronous model changes
                    }
                  });
                }
              }
              if (!lfData._controllerInit && (lfData._hasResponsiveExpr || lfData._hasInitialExpr)) {
                lfData._expressionProcessor.runCalculations(true).then(() => {
                  // We might or might not be in a digest cycle.
                  $scope.$evalAsync(); // will trigger a digest cycle
                });
              }
              // Angular calls this twice for the same lfData.  Set a flag.
              // Note:  For some reason the watches still need to be set up both times.
              lfData._controllerInit = true;
            }
            else {
              if ($scope.unwatchFHIRPath) {
                $scope.unwatchFHIRPath(); // stop watching because it is no longer needed
                $scope.unwatchFHIRPath = null;
              }
              if ($scope.unwatchAsync) {
                $scope.unwatchAsync();
                $scope.unwatchAsync = null;
              }
            }
          }
        });


        /**
         * Check skip logic, formulas and data controls when the source item changes.
         * @param item the controlling/source item
         */
        $scope.updateOnSourceItemChange = function(item) {
          var widgetData = $scope.lfData;
          if (widgetData) {
            widgetData.updateOnSourceItemChange(item);
            $scope.sendActionsToScreenReader();
          }
        };


        /**
         * Adjust the height of a textarea
         * @param e a textarea DOM element or a ID of a textarea element
         */
        $scope.autoExpand = function(e) {
          var element = typeof e === 'object' ? e.target : document.getElementById(e);
          var scrollHeight = element.scrollHeight +2;
          element.style.height =  scrollHeight + "px";
        };


        /**
         * Get total number of questions on the form, not including section headers or titles
         * @returns {number}
         */
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
         * Get CSS classes for the sibling status (whether it is the first or the last sibling)
         * @param item a form item
         * @returns {string}
         */
        $scope.getSiblingStatus = function(item) {
          var status = "";
          if (item._lastSibling)
            status += 'lf-last-item';
          if (item._firstSibling)
            status += ' lf-first-item'
          return status;
        };


        /**
         * Get the indentation style of the form
         * @returns {string}
         */
        $scope.getIndentationStyle = function () {
          return $scope.lfData.templateOptions.useTreeLineStyle ? "lf-indentation-tree" : "lf-indentation-bar";
        };


        /**
         * Get the CSS class on each item row
         * @param item an item in the lforms form items array
         * @returns {string}
         */
        $scope.getRowClass = function(item) {
          var eleClass = 'level' + item._displayLevel;
          eleClass += ' lf-datatype-' + item.dataType;
          if (item._answerRequired) {
            eleClass += ' lf-answer-required';
          }
          if (item.header) {
            eleClass += ' lf-section-header';
          }
          else {
            eleClass += ' lf-question';
          }
          if (!item.question || item.question.length === 0) {
            eleClass += ' lf-empty-question';
          }
          if (item._visitedBefore) {
            eleClass += ' lf-visited-before';
          }
          if (item._showValidation) {
            eleClass += ' lf-show-validation';
          }
          if (item._isHiddenFromView) {
            eleClass += ' lf-hidden-from-view';
          }
          if (item.dataType === 'TITLE') {
            eleClass += ' lf-title-row';
          }

          return eleClass;
        };


        /**
         * Add a repeating item or a repeating group
         * @param item an item in the lforms form items array
         * @param append an optional flag indicate if the new item is added to the end of the repeating group
         */
        $scope.addOneRepeatingItem = function(item, append) {
          var widgetData = $scope.lfData;
          var anyEmpty = false;
          if ($scope.lfData && !$scope.lfData.templateOptions.allowMultipleEmptyRepeatingItems) {
            anyEmpty = widgetData.areAnyRepeatingItemsEmpty(item);
            if (anyEmpty && item._showUnusedItemWarning) {
              if (!item._unusedItemWarning)
                item._unusedItemWarning = 'Please enter info in the blank "' +
                  item._text+'"';
              $scope.sendMsgToScreenReader(item._unusedItemWarning);
            }
          }
          if (!anyEmpty) {
            var newItem = append ? widgetData.appendRepeatingItems(item) : widgetData.addRepeatingItems(item);
            $scope.sendActionsToScreenReader();

            // broadcast the event
            $scope.$emit(LF_CONSTANTS.EVENT_REPEATING_ITEM_ADDED,
                {
                  "event": LF_CONSTANTS.EVENT_REPEATING_ITEM_ADDED,
                  "formId": $scope.lfData.code,
                  "itemId": newItem._elementId,
                  "time": new Date()
                });

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
         *  Writes a single message to the reader_log element on the page
         *  so that screen readers can read it.
         * @param msg the message to be read
         */
        $scope.sendMsgToScreenReader = function(msg) {
          LForms.Def.Autocompleter.screenReaderLog(msg);
        };


        /**
         * Write action logs from the lforms to reader_log element on the page
         * so that screen readers can read.
         */
        $scope.sendActionsToScreenReader = function() {
          var widgetData = $scope.lfData;
          if (widgetData._actionLogs.length > 0) {
            widgetData._actionLogs.forEach(function(log) {
              LForms.Def.Autocompleter.screenReaderLog(log);
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

          // broadcast the event
          $scope.$emit(LF_CONSTANTS.EVENT_REPEATING_ITEM_DELETED,
              {
                "event": LF_CONSTANTS.EVENT_REPEATING_ITEM_DELETED,
                "formId": $scope.lfData.code,
                "itemId": item._elementId,
                "time": new Date()
              });

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
         * Get user input data from the form, with or without form definition data.
         * @param noFormDefData optional, to not include form definition data, the default is false.
         * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
         * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
         * @returns {{itemsData: (*|Array), templateData: (*|Array)}} form data and template data
         */
        $scope.getUserData = function(noFormDefData, noEmptyValue, noDisabledItem) {
          var formData =  $scope.lfData.getUserData(noFormDefData, noEmptyValue, noDisabledItem);
          return formData;
        };


        /**
         * Get the complete form definition data, including the user input data from the form.
         * The returned data could be fed into a LForms widget directly to render the form.
         * @return {{}} form definition JSON object
         */
        $scope.getFormData = function() {
          var formData =  $scope.lfData.getFormData();
          return formData;
        };


          // for debug only. to be removed.
        $scope.onclick = function() {
          debugger
          var ele = $element;
          var i = 1;
        };


        /**
         * Get the display layout for each answer in a RADIO_CHECKBOX layout of an item's answers
         * @param item a form item
         * @returns {string}
         */
        $scope.getAnswerLayoutColumnClass = function(item) {
          var ret = "";
          if (item && item.displayControl && item.displayControl.answerLayout &&
              item.displayControl.answerLayout.type === "RADIO_CHECKBOX") {
            var colNum = parseInt(item.displayControl.answerLayout.columns);
            if (isNaN(colNum) || colNum >6 || colNum <0 )
              colNum = 0;
            ret = "lf-" + colNum + "-col";
          }

          return ret;
        };


        /**
         * Updates the value for an item whose answers are displayed as a list of checkboxes,
         * one of which has just been selected or deselected
         * @param item a form item that has an answer list and supports multiple selections
         * @param answer an answer object in the answer list
         */
        $scope.updateCheckboxList = function(item, answer) {
          if (item.value && angular.isArray(item.value)) {
            var index, selected = false;
            for(var i= 0,iLen=item.value.length; i<iLen; i++) {
              if (angular.equals(item.value[i],answer)) {
                selected = true;
                index = i;
                break;
              }
            }
            // if answer is currently selected
            if (selected) {
              // remove the answer from the selected list
              item.value.splice(index, 1);
            }
            // if answer is not currently selected
            else {
              // add the answer to the selected list
              item.value.push(answer);
            }
          }
          // the value is not accessed before
          else {
            // add the answer to the selected list
            item.value = [answer];
          }
        };


        /**
         * Updates the value for an item with the user typed data.
         * The item's answers are displayed as a list of checkboxes, and users have an option to type their own answer.
         * Update the item.value based on selection of extra data input by users
         * Note: In the checkbox display layout only one "OTHER" value is allowed, while in autocomplete multiple
         * "OTHER" values are allowed.
         * @param item a form item that has an answer list and supports multiple selections and user typed data.
         * @param otherValue the user typed string value for the "OTHER" checkbox
         */
        $scope.updateCheckboxListForOther = function(item, otherValue) {
          var other = {"text": otherValue, "_notOnList": true};

          // add/update the other value
          if (item._otherValueChecked) {
            // the list is not empty
            if (item.value && angular.isArray(item.value)) {
              var found = false;
              for(var i= 0,iLen=item.value.length; i<iLen; i++) {
                if (item.value[i]._notOnList) {
                  item.value[i] = other;
                  found = true;
                  break;
                }
              }
              // if the other value is not already in the list
              if (!found) {
                // add the other value to the list
                item.value.push(other);
              }
            }
            // the list is empty
            else {
              // add the other value to the list
              item.value = [other];
            }
          }
          // remove other value
          else {
            if (item.value && angular.isArray(item.value)) {
              var index, found = false;
              for(var i= 0,iLen=item.value.length; i<iLen; i++) {
                if (item.value[i]._notOnList) {
                  found = true;
                  index = i;
                  break;
                }
              }
              if (found) {
                item.value.splice(index, 1);
              }
            }
          }
        };


        /**
         *
         * Update the item.value based on selection of an answer by users
         * @param item a form item that has an answer list and support single selections
         */
        $scope.updateRadioList = function(item) {
          item._otherValueChecked = false;
        };


        /**
         * Update the item.value based on selection of extra data input by users
         * @param item a form item that has an answer list and support single selections
         * @param otherValue the user typed string value for the "OTHER" radio button
         */
        $scope.updateRadioListForOther = function(item, otherValue) {

          // add/update the other value
          if (item._otherValueChecked) {
            item.value = { "text": otherValue, "_notOnList": true};
          }
        };


        /**
         * Check if a checkbox should be checked based on the value of a form item
         * @param item a form item
         * @param answer an answer in the items' answer list
         * @returns {boolean}
         */
        $scope.checkAnswer = function(item,answer) {
          var checked = false;
          if (item && item.value) {
            if (angular.isArray(item.value)) {
              for(var i=0, iLen=item.value.length; i<iLen; i++) {
                var selectedAnswer = item.value[i];
                if (selectedAnswer.text === answer.text) {
                  checked = true;
                  break;
                }
              }
            }
            else {
              if (item.value.text === answer.text) {
                checked = true;
              }
            }
          }
          return checked;
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
