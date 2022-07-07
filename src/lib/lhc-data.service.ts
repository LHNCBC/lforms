import { Injectable } from '@angular/core';
import { ScreenReaderLog } from './screen-reader-log';

// @Injectable({
//   providedIn: 'root'
// })

/**
 * A data service for the form data object that is used by various components
 */
export class LhcDataService {

  private lhcFormData:any;
  private srLog: ScreenReaderLog;

  constructor() {
    this.srLog = new ScreenReaderLog();
   }


  /**
   * Get the lhcFormData object
   * @returns the lhcFormData object
   */
  getLhcFormData(): any {
    return this.lhcFormData;
  }


  /**
   * Set the lhcFormData object
   * @returns the lhcFormData object
   */
  setLhcFormData(data:any): void {
    this.lhcFormData = data;
  }


  /**
   * The following functions are exposed to components and their templates through a service
   */

  /**
   * Set the active row in table
   * @param index index of an item in the lforms form items array
   */
   setActiveRow(item) {
    this.lhcFormData.setActiveRow(item);

    // for screen reader (only the newly added messages will be read by screen readers)
    if (item._validationErrors) {
      item._validationErrors.forEach(error => {
        this.sendMsgToScreenReader(`${item.question} ${error}`)
      });
    }

  }


  /**
   * Set up a timer to make validation messages disappear in 2 seconds when the input field loses focus
   * @param item the item which onBlur event happens on its input field
   */
  activeRowOnBlur(item) {

    // the first visit to the field (and leaving the field), show validation messages for a certain time
    if (!item._visitedBefore) {
      item._showValidation = true;

      // use $interval instead of $timeout so that protractor will not wait on $timeout
      // var intervalCanceller = $interval(function() {
      //   // not to show validation messages after 2 seconds
      //   item._showValidation = false;
      //   item._visitedBefore = true;
      //   $interval.cancel(intervalCanceller);
      // }, $scope.validationInitialShowTime);

      setTimeout(()=>{
        // not to show validation messages after 1.5 seconds
        item._showValidation = false;
        item._visitedBefore = true;
      }, window['LForms'].Validations._timeout);
    }
    // the following visits (and leaving the field), not to show validation messages
    // hover over the field still shows the validation messages
    else {
      item._showValidation = false;
    }
  }


  /**
   * Get the css class for the active row
   * @param item an item
   * @returns {string}
   */
  getActiveRowClass(item) {
    return this.lhcFormData.getActiveRowClass(item);
  }


  /**
   * Get an item's skip logic status
   * @param item an item
   * @returns {*|string}
   */
  getSkipLogicClass(item) {
    return this.lhcFormData.getSkipLogicClass(item);
  }


  /**
   * Get the CSS styles on a table column
   * @param col a column in a HTML table
   * @returns {{}} CSS style object
   */
  getTableColumnStyle(col) {
    var ret = {};
    if (col.displayControl && Array.isArray(col.displayControl.colCSS)) {
      var colCSS = col.displayControl.colCSS;
      for (var i= 0, iLen= colCSS.length; i<iLen; i++) {
        var css = colCSS[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }


  /**
   * Get the CSS styles on an item itself
   * @param item an item in a form
   * @returns {{}} CSS style object
   */
  getItemStyle(item) {
    var ret = {};
    if (item.displayControl && Array.isArray(item.displayControl.css)) {
      for (var i= 0, iLen= item.displayControl.css.length; i<iLen; i++) {
        var css = item.displayControl.css[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }


  /**
   * Check if there's only one repeating item in a group
   * (so that the 'remove' button won't show on this item)
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  hasOneRepeatingItem(item) {
    var recCount = this.lhcFormData.getRepeatingItemCount(item);
    return recCount > 1 ? false : true;
  }


  /**
   * Check if the current horizontal table has one row only
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
   hasOneRepeatingRow(item) {
    var ret = false;
    var tableInfo = this.lhcFormData._horizontalTableInfo[item._codePath + item._parentIdPath_];
    if (tableInfo && tableInfo.tableRows && tableInfo.tableRows.length === 1) {
      ret = true;
    }
    return ret;
  }


  /**
   * Check the display type of the coding instructions
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getCodingInstructionsDisplayType(item) {
    var ret ='';
    if (item.codingInstructions && item.codingInstructions.length > 0) {
      var position = this.lhcFormData.templateOptions.showCodingInstruction ? "inline" : "popover";
      if (this.lhcFormData.templateOptions.allowHTMLInInstructions && item.codingInstructionsFormat === "html") {
        var format = "html";
      }
      else {
        format = "escaped";
      }
      ret = position + "-" + format;
    }
    return ret;
  }


  /**
   * Check if the form is finished
   * @returns {boolean|*|*}
   */
  isFormDone() {
    return this.lhcFormData.isFormDone();
  }


  /**
   * Check if there's a unit list
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  checkUnits(item) {
    return !!(item._unitAutocompOptions ||
      (item._unitReadonly && item.unit && item.unit._displayUnit));
  }


  /**
   * Check an item's skip logic status to decide if the item should be shown
   * @param item an item
   * @returns {boolean}
   */
  targetShown(item) {
    return this.lhcFormData ? item._enableWhenExpVal !== false &&
      this.lhcFormData.getSkipLogicClass(item) !== 'target-disabled' : null;
  }


  /**
   * Get the sequence number for the current repeating item
   * @param item an item in the lforms form items array
   * @returns {string}
   */
   getRepeatingSN(item) {
    var ret = '';
    if (item._questionRepeatable) {
      var sn = item._idPath.slice(1);
      ret = sn.replace(/\//g, '.');
    }
    return ret;
  }


  /**
   * Get CSS classes for the sibling status (whether it is the first or the last sibling)
   * @param item a form item
   * @returns {string}
   */
  getSiblingStatus(item) {
    var status = "";
    if (item._lastSibling)
      status += 'lhc-last-item';
    if (item._firstSibling)
      status += ' lhc-first-item'
    return status;
  }

  /**
   * Get CSS classes for the tree line
   * @returns {string}
   */
  getTreeLineClass() {
    const templateOptions = this.getLhcFormData().templateOptions;
    return templateOptions.hideTreeLine || templateOptions.hideIndentation ? '' : 'lhc-tree-line';
  }

  /**
   * Get CSS classes for the indentation
   * @returns {string}
   */
  getIndentationClass() {
    return this.getLhcFormData().templateOptions.hideIndentation ? '' : 'lhc-indentation';
  }

  /**
   * get CSS class list for an item
   * @param item an item in a form
   * @param viewMode view mode of the item
   */
  getItemClassList(item, viewMode) {
    const classList = [
      'lhc-item',
      this.getItemViewModeClass(item, viewMode),
      this.getTreeLineClass(),
      this.getIndentationClass(),
      this.getSiblingStatus(item),
      this.getRowClass(item),
      this.getActiveRowClass(item)
    ];
    return classList.join(' ');
  }


  /**
   * Whether to hide repetition number before question text
   * @returns {boolean}
   */
  isHideRepetitionNumber() {
    return this.getLhcFormData().templateOptions.hideRepetitionNumber;
  }


  /**
   * Get the CSS class on each item row
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getRowClass(item) {
    //var eleClass = 'level' + item._displayLevel;
    var eleClass = ' lhc-datatype-' + item.dataType;
    if (item._answerRequired) {
      eleClass += ' lf-answer-required';
    }

    if (item.header) {
      eleClass += ' lhc-item-group';
    }
    else {
      eleClass += ' lhc-item-question';
    }
    // if (item.dataType === 'TITLE') {
    //   eleClass += ' lhc-item-display';
    // }

    if (!item.question || item.question.length === 0) {
      eleClass += ' lf-empty-question';
    }
    if (item._visitedBefore) {
      eleClass += ' lhc-visited-before';
    }
    if (item._showValidation) {
      eleClass += ' lhc-show-validation';
    }
    if (item._isHiddenFromView) {
      eleClass += ' lhc-hidden-from-view';
    }
    if (Array.isArray(item._validationErrors) && item._validationErrors.length > 0) {
      eleClass += ' lhc-invalid'
    }

    return eleClass;
  }


  /**
   * get the CSS class the form's view mode
   * @param currentViewMode the current view mode set by element size
   * @returns {string} the CSS class
   */
  getViewModeClass(currentViewMode) {
    let viewModeClass;
    let viewMode = this.lhcFormData?.templateOptions?.viewMode;

    if (!viewMode || viewMode === "auto") {
      viewMode = currentViewMode;
    }
    switch (viewMode) {
      case "lg":
        viewModeClass = "lhc-view-lg";
        break;
      case "md":
        viewModeClass = "lhc-view-md";
        break;
      case "sm":
        viewModeClass = "lhc-view-sm";
        break;
      default:
        viewModeClass = "lhc-view-lg";
    }
    return viewModeClass;
  }


  /**
   * get the CSS class for an item's view mode
   * @param item an item in the lforms form
   * @param currentViewMode the current view mode set by element size
   * @returns {string} the CSS class
   */
  getItemViewModeClass(item, currentViewMode) {
    let viewMode;
    let viewModeClass = "";
    if (item) {
      // if viewMode is specified on the item
      if (item.displayControl && item.displayControl.viewMode) {
        viewMode = item.displayControl.viewMode;
      }
      // otherwise use the default viewMode of the form
      else {
        viewMode = this.lhcFormData.templateOptions.viewMode;
      }

      // responsive to the screen/container's size
      if (!viewMode || viewMode === "auto") {
        viewMode = currentViewMode;
      }

      switch (viewMode) {
        case "lg":
          viewModeClass = "lhc-item-view-lg";
          break;
        case "md":
          viewModeClass = "lhc-item-view-md";
          break;
        case "sm":
          viewModeClass = "lhc-item-view-sm";
          break;
        default:
          viewModeClass = "lhc-item-view-lg";
      }
    }
    return viewModeClass;
  }


  /**
   * Add a repeating item or a repeating group
   * @param item an item in the lforms form items array
   * @param append an optional flag indicate if the new item is added to the end of the repeating group
   */
  addOneRepeatingItem(item, append) {
    var anyEmpty = false;
    if (this.lhcFormData && !this.lhcFormData.templateOptions.allowMultipleEmptyRepeatingItems) {
      anyEmpty = this.lhcFormData.areAnyRepeatingItemsEmpty(item);
      if (anyEmpty && item._showUnusedItemWarning) {
        if (!item._unusedItemWarning)
          item._unusedItemWarning = 'Please enter info in the blank "' +
            item._text+'"';
      }
    }
    if (!anyEmpty) {
      var newItem = append ? this.lhcFormData.appendRepeatingItems(item) : this.lhcFormData.addRepeatingItems(item);
      this.sendActionsToScreenReader();
    }
  }

  /**
   * Remove one repeating item in a group
   * @param item an item in the lforms form items array
   */
  removeOneRepeatingItem(item) {

    var nextItem = this.lhcFormData.getNextRepeatingItem(item);

    var btnId = '';
    // move the focus to the next '-' button if there's one displayed
    // ('-' buttons are shown only when there are two repeating items shown).
    if (nextItem) {
      if (this.lhcFormData.getRepeatingItemCount(item) === 2) {
        btnId = 'add-' + nextItem._elementId;
      }
      else {
        btnId = 'del-' + nextItem._elementId;
      }
    }
    // otherwise move the focus to the add button of the previous item
    else {
      var prevItem = this.lhcFormData.getPrevRepeatingItem(item);
      if (prevItem) {
        btnId = 'add-' + prevItem._elementId;
      }
    }

    // remove the items
    this.lhcFormData.removeRepeatingItems(item);

    this.sendActionsToScreenReader();

    // set the focus
    setTimeout(function() {
      var btn = document.getElementById(btnId);
      if (btn) btn.focus();
    }, 1);
  }


  /**
   * Unset the flag to hide the warning about unused repeating items
   * @param item a repeating item
   */
  hideUnusedItemWarning(item) {
    if (this.lhcFormData && !this.lhcFormData.templateOptions.allowMultipleEmptyRepeatingItems) {
      item._showUnusedItemWarning = false;
    }
  }


  /**
   * Return the horizontal table structure of the form
   * @returns {object}
   */
  getHorizontalTableInfo() {
    return this.lhcFormData._horizontalTableInfo;
  }


  /**
   * Track by item's element id for each cell in a table row
   * @param index *ngFor index, not used
   * @param item *ngFor item, an item of the form
   * @returns
   */
  trackByElementId(index, item) {
    // index is not used since item._elementId is unique
    return item._elementId;
  }


  /**
   * Track by each row's group header item's element id for each row in a horizontal table
   * @param index *ngFor index
   * @param item *ngFor item, the group/section item of a form
   * @returns
   */
  trackByRowHeaderElementId(index, row) {
    return row.header._elementId;
  }


  /**
   * Track by column's id, which is "col" + the item's element id in the first row
   * @param index *ngFor index, not used
   * @param item *ngFor item, an item in the headers array of the horizontal table structure
   * @returns
   */
  trackByColumnHeaderId(index, col) {
    return col.id;
  }


  /**
   * Check if the item is a subsequent item of a horizontal group item, which is handled separately
   * @param item a form item
   * @returns {boolean}
   */
  isSubsequentHorizontalTableGroupItem(item) {
    return item && item.displayControl && item.displayControl.questionLayout === "horizontal" && !item._horizontalTableHeader;
  }


  /**
   * Updates the value for an item whose answers are displayed as a list of checkboxes,
   * one of which has just been selected or deselected
   * @param item a form item that has an answer list and supports multiple selections
   * @param answer an answer object in the answer list
   */
  updateCheckboxListValue(item, answer) {
    if (item.value && Array.isArray(item.value)) {
      var index, selected = false;
      for(var i= 0,iLen=item.value.length; i<iLen; i++) {
        if (this.lhcFormData._objectEqual(item.value[i],answer)) {
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
  updateCheckboxListValueForOther(item, otherValue) {
    var other = {"text": otherValue, "_notOnList": true};

    // add/update the other value
    if (item._otherValueChecked) {
      // the list is not empty
      if (item.value && Array.isArray(item.value)) {
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
      if (item.value && Array.isArray(item.value)) {
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
   * Reset the 'otherValue' when an answer from the list is selected by user
   * @param item a form item that has an answer list and support single selections
   */
  resetRadioListOtherValue(item) {
    item._otherValueChecked = false;
  };


  /**
   * Update the item.value based on selection of extra data input by users
   * @param item a form item that has an answer list and support single selections
   * @param otherValue the user typed string value for the "OTHER" radio button
   */
  updateRadioListValueForOther(item, otherValue) {

    // add/update the other value
    if (item._otherValueChecked) {
      item.value = { "text": otherValue, "_notOnList": true};
    }
  };


  /**
   * Writes a single message to the reader_log element on the page
   * so that screen readers can read it.
   * @param msg the message to be read
   */
   sendMsgToScreenReader(msg) {
    this.srLog.add(msg);
  };


  /**
   * Write action logs from the lforms to reader_log element on the page
   * so that screen readers can read.
   */
  sendActionsToScreenReader() {
    if (this.lhcFormData && this.lhcFormData._actionLogs.length > 0) {
      this.lhcFormData._actionLogs.forEach((log) => {
        this.srLog.add(log);
      });
      // clean up logs
      this.lhcFormData._actionLogs = [];
    }
  };


  /**
   * Check if the form is rendered with all FHIR resources loaded
   * @returns {boolean}
   */
  isFormReady(): boolean {
    return !!this.lhcFormData._formReady;
  };

}


