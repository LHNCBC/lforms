import { Injectable } from '@angular/core';
import { ScreenReaderLog } from './screen-reader-log';
import CommonUtils from "./lforms/lhc-common-utils.js";
import {InternalUtil} from "./lforms/internal-utils.js";
import language from '../../language-config.json';
import {Subject} from "rxjs";
declare let LForms: any;
// @Injectable({
//   providedIn: 'root'
// })

/**
 * A data service for the form data object that is used by various components
 */
export class LhcDataService {

  private lhcFormData:any;
  private srLog: ScreenReaderLog;

  private formChangeEventSource = new Subject<any>();
  public formChangeEvent$ = this.formChangeEventSource.asObservable();

  /**
   * Initialize the screen-reader log used for form announcements.
   */
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
   * @param data Form data model to expose to components, or null while clearing the form.
   */
  setLhcFormData(data:any): void {
    this.lhcFormData = data;
  }


  /**
   * Get the widget options
   * @returns The current form template options, or an empty object when no model is available.
   */
  getTemplateOptions() {
    return this.lhcFormData?.templateOptions || {};
  }

  /**
   * Gets the NG-ZORRO tab position selected for the whole form.
   * Invalid or omitted values preserve the historic top-positioned tabs.
   * @returns 'left' for a vertical tab layout; 'top' for missing, horizontal, or invalid values.
   */
  getTabPosition(): 'top' | 'left' {
    return this.getTemplateOptions().tabLayout === 'vertical' ? 'left' : 'top';
  }

  /**
   * Resolve the configured answer-alignment policy for vertical tabs. The form policy can use a
   *  stacked layout when content is narrow.
   * @returns 'content' when explicitly configured; 'form' otherwise.
   */
  getTabAnswerAlignment(): 'form' | 'content' {
    return this.getTemplateOptions().tabAnswerAlignment === 'content' ? 'content' : 'form';
  }

  /**
   * Whether each tab's label should also be shown as a header in its content.
   * Only boolean true enables the header.
   * @returns True only when showTabHeader is the boolean true.
   */
  getShowTabHeader(): boolean {
    return this.getTemplateOptions().showTabHeader === true;
  }

  /**
   * Check whether the tab-container group's text should appear above its tabset.
   * @returns True only when showTabContainerText is the boolean true.
   */
  getShowTabContainerText(): boolean {
    return this.getTemplateOptions().showTabContainerText === true;
  }

  /**
   * Whether the form's tab navigation should be sticky. Only boolean true
   * enables this so string values from HTML attributes cannot enable it.
   * @returns True only when stickyTabs is the boolean true; individual tabsets apply their
   *  layout-specific sticky rules.
   */
  getStickyTabs(): boolean {
    return this.getTemplateOptions().stickyTabs === true;
  }


  /**
   * The following functions are exposed to components and their templates through a service
   */

  /**
   * Set the active form item and announce its validation errors to screen readers.
   * @param item Form item to activate.
   */
  setActiveRow(item) {
    if (this.lhcFormData && item) {
      this.lhcFormData.setActiveRow(item);

      // for screen reader (only the newly added messages will be read by screen readers)
      if (item._validationErrors) {
        item._validationErrors.forEach(error => {
          this.sendMsgToScreenReader(`${item.question} ${error}`)
        });
      }
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
   * @returns 'lhc-active-row' for the active item, or an empty string otherwise.
   */
  getActiveRowClass(item) {
    return this.lhcFormData.getActiveRowClass(item);
  }


  /**
   * Get an item's skip logic status
   * @param item an item
   * @returns The item's current skip-logic status CSS class.
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
    const ret = {};
    if (col.displayControl && Array.isArray(col.displayControl.colCSS)) {
      const colCSS = col.displayControl.colCSS;
      for (let i= 0, iLen= colCSS.length; i<iLen; i++) {
        const css = colCSS[i];
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
    const ret = {};
    if (item.displayControl && Array.isArray(item.displayControl.css)) {
      for (let i= 0, iLen= item.displayControl.css.length; i<iLen; i++) {
        const css = item.displayControl.css[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }


  /**
   * Check if there's only one repeating item in a group
   * (so that the 'remove' button won't show on this item)
   * @param item an item in the lforms form items array
   * @returns True when at most one repetition exists, so its remove button is hidden.
   */
  hasOneRepeatingItem(item) {
    const recCount = this.lhcFormData.getRepeatingItemCount(item);
    return recCount > 1 ? false : true;
  }


  /**
   * Check if the current horizontal table has one row only
   * @param item an item in the lforms form items array
   * @returns True when the corresponding horizontal table contains exactly one row.
   */
  hasOneRepeatingRow(item) {
    let ret = false;
    const tableInfo = this.lhcFormData._horizontalTableInfo[item._codePath + item._parentIdPath_];
    if (tableInfo && tableInfo.tableRows && tableInfo.tableRows.length === 1) {
      ret = true;
    }
    return ret;
  }


  /**
   * Get the last repeating item.
   * Returns null if the item is not repeatable.
   * @param item an item. It may not be the last of the repeating items.
   * @returns The last sibling repetition, or null when the item is not repeatable.
   */
  getLastRepeatingItem(item) {
    const repeatingItems = this.lhcFormData._getRepeatingItems(item);
    return repeatingItems.length ? repeatingItems[repeatingItems.length - 1] : null;
  }


  /**
   * Check the display type of item.text or an answerOption.
   * @param item an item in the lforms form items array, or an answerOption in the lforms form
   *  answers array.
   * @returns The text format: 'plain', 'html', 'escaped', or 'markdown'.
   */
  getTextDisplayType(item) {
    return this.lhcFormData?.getTextDisplayType(item) || 'plain';
  }


  /**
   * Check the display type of item.prefix.
   * @param item an item in the lforms form items array, or an answerOption in the lforms form
   *  answers array.
   * @returns The prefix format: 'plain', 'html', 'escaped', or 'markdown'.
   */
  getPrefixDisplayType(item) {
    return this.lhcFormData?.getPrefixDisplayType(item) || 'plain';
  }


  /**
   * Check the display type of the coding instructions
   * @param item an item in the lforms form items array
   * @returns A position-format combination such as 'inline-html', or an empty string when no
   *  instructions exist.
   */
  getCodingInstructionsDisplayType(item) {
    let ret ='';
    if (item.codingInstructions && item.codingInstructions.length > 0) {
      const position = this.lhcFormData.templateOptions.showCodingInstruction ? "inline" : "popover";
      if (this.lhcFormData.templateOptions.allowHTML && item.codingInstructionsFormat === "html") {
        var format = "html";  // use item.codingInstructions (safe html)
        if (item.codingInstructionsHasInvalidHtmlTag) {
          if (this.lhcFormData.templateOptions.displayInvalidHTML) {
            format = "escaped" // use item.codingInstructions (escaped)
          }
          else {
            format = "plain"; // use item.codingInstructionsPlain
          }
        }
      }
      else if (this.lhcFormData.templateOptions.allowMarkdown && item.codingInstructionsFormat === "markdown") {
        format = "markdown"; // use item.legal (markdown)
      }
      else {
        format = "escaped"; // use item.codingInstructions
      }
      ret = position + "-" + format;
    }
    return ret;
  }


  /**
   * Check the display type of item.legal
   * @param item an item in the lforms form items array
   * @returns A position-format combination such as 'popover-plain', or an empty string when no
   *  legal text exists.
   */
  getLegalDisplayType(item) {
    let ret ='';
    if (item.legal && item.legal.length > 0) {
      const position = this.lhcFormData.templateOptions.showCodingInstruction ? "inline" : "popover";
      if (this.lhcFormData.templateOptions.allowHTML && item.legalFormat === "html") {
        var format = "html";  // use item.legal (safe html)
        if (item.legalHasInvalidHtmlTag) {
          if (this.lhcFormData.templateOptions.displayInvalidHTML) {
            format = "escaped" // use item.legal (escaped)
          }
          else {
            format = "plain"; // use item.legalPlain
          }
        }
      }
      else if (this.lhcFormData.templateOptions.allowMarkdown && item.legalFormat === "markdown") {
        format = "markdown"; // use item.legal (markdown)
      }
      else {
        format = "escaped"; // use item.legal
      }
      ret = position + "-" + format;
    }
    return ret;
  }


  /**
   * Check if there's a unit list
   * @param item an item in the lforms form items array
   * @returns True when unit autocomplete options or a readonly display unit are available.
   */
  checkUnits(item) {
    return !!(item._unitAutocompOptions ||
      (item._unitReadonly && item.unit && item.unit._displayUnit));
  }


  /**
   * Check an item's skip logic status to decide if the item is enabled
   * @param item an item
   * @returns Whether the item is enabled; false when no form model is available.
   */
  targetEnabled(item) {
    return this.lhcFormData ? InternalUtil.targetEnabled(item): false;
  }


  /**
   * Check whether an item is disabled but remains visible with protected display.
   * @param item an item
   * @returns Whether the item is disabled and protected; false when no form model is available.
   */
  targetDisabledAndProtected(item) {
    return this.lhcFormData ? InternalUtil.targetDisabledAndProtected(item) : false;
  }


  /**
   * Check if the item should be displayed (enabled or disabled but protected)
   * @param item an item
   * @returns Whether the item should be displayed; false when no form model is available.
   */
  targetShown(item) {
    return this.lhcFormData ? InternalUtil.targetShown(item) : false;
  }


  /**
   * Check if a multi-select subgroup should be displayed (at least one of its
   * sub items is displayed). Items that are not multi-select subgroups are not
   * affected.
   * @param item an item
   * @returns Whether the subgroup has displayed children, or the item is an ordinary item; false
   *  without a form model.
   */
  multiSelectSubGroupShown(item) {
    return this.lhcFormData ? InternalUtil.multiSelectSubGroupShown(item) : false;
  }


  /**
   * Get the sequence number for the current repeating item
   * @param item an item in the lforms form items array
   * @returns The dot-separated repetition path, or an empty string for a non-repeatable item.
   */
  getRepeatingSN(item) {
    let ret = '';
    if (item._questionRepeatable) {
      const sn = item._idPath.slice(1);
      ret = sn.replace(/\//g, '.');
    }
    return ret;
  }


  /**
   * Construct an id for an answer when it is rendered as a radio button
   * or a checkbox.
   * @param item an item in lhc-forms
   * @param answer an answer in the item's answer list.  If this is a
   *  string  an id for an "Other" option element is created.
   * @returns the constructed id
   */
  getItemAnswerId(item, answer) {
    return InternalUtil.getItemAnswerId(item, answer);
  }


  /**
   * Get CSS classes for the sibling status (whether it is the first or the last sibling)
   * @param item a form item
   * @returns The applicable first-sibling and last-sibling CSS classes, or an empty string.
   */
  getSiblingStatus(item) {
    let status = "";
    if (item._lastSibling)
      status += 'lhc-last-item';
    if (item._firstSibling)
      status += ' lhc-first-item'
    return status;
  }

  /**
   * Choose tree-line decoration while suppressing it at form/tab roots and when indentation or tree
   *  lines are hidden.
   * @param isTopLevelItem Whether the item starts a visual hierarchy at the form or tab-content
   *  root.
   * @returns 'lhc-tree-line' when lines should be drawn, or an empty string; auto mode hides lines
   *  for hierarchies of at most three levels.
   */
  getTreeLineClass(isTopLevelItem = false) {
    if (isTopLevelItem) {
      return '';
    }
    const templateOptions = this.getLhcFormData().templateOptions;
    if (templateOptions.hideIndentation ||
      templateOptions.hideTreeLine === 'true' ||
      templateOptions.hideTreeLine === true ||
      (templateOptions.hideTreeLine === 'auto' && this.getLhcFormData()._totalLevelsOfHierarchy <= 3)) {
      return '';
    } else {
      return 'lhc-tree-line';
    }
  }

  /**
   * Get CSS classes for the indentation
   * @param isTopLevelItem Whether the item starts a visual hierarchy at the form or tab-content
   *  root.
   * @returns 'lhc-indentation' for indented descendants, or an empty string at roots or when
   *  indentation is hidden.
   */
  getIndentationClass(isTopLevelItem = false) {
    return isTopLevelItem || this.getLhcFormData().templateOptions.hideIndentation ? '' : 'lhc-indentation';
  }

  /**
   * get CSS class list for an item
   * @param item an item in a form
   * @param viewMode view mode of the item
   * @param isTopLevelItem Whether this item is a form/tab-content root whose tree decoration is
   *  suppressed.
   * @returns Space-separated item, view-mode, sibling, state, and applicable tree-decoration
   *  classes.
   */
  getItemClassList(item, viewMode, isTopLevelItem = false) {
    const classList = [
      'lhc-item',
      this.getItemViewModeClass(item, viewMode),
      this.getTreeLineClass(isTopLevelItem),
      this.getIndentationClass(isTopLevelItem),
      this.getSiblingStatus(item),
      this.getRowClass(item)
    ];
    return classList.join(' ');
  }


  /**
   * Whether to hide repetition number before question text
   * @returns The hideRepetitionNumber template option.
   */
  isHideRepetitionNumber() {
    return this.getLhcFormData().templateOptions.hideRepetitionNumber;
  }


  /**
   * Get the CSS class on each item row
   * @param item an item in the lforms form items array
   * @returns CSS classes describing item data type, validation, visibility, and interaction state.
   */
  getRowClass(item) {
    //var eleClass = 'level' + item._displayLevel;
    let eleClass = ' lhc-datatype-' + item.dataType;
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
    if (this.targetDisabledAndProtected(item)) {
      eleClass += ' lhc-item-disabled-protected'
    }
    if (Array.isArray(item._validationErrors) && item._validationErrors.length > 0) {
      eleClass += ' lhc-invalid'
    }
    if (Array.isArray(item._validationWarnings) && item._validationWarnings.length > 0) {
      eleClass += ' lhc-warning'
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
    let anyEmpty = false;
    if (this.lhcFormData && !this.lhcFormData.templateOptions.allowMultipleEmptyRepeatingItems) {
      anyEmpty = this.lhcFormData.areAnyRepeatingItemsEmpty(item);
      if (anyEmpty && item._showUnusedItemWarning) {
        if (!item._unusedItemWarning)
          item._unusedItemWarning = language.pleaseEnterInfoForTheBlank.replace('{lformsParam}',  item._text);
      }
    }
    if (!anyEmpty) {
      const newItem = append ? this.lhcFormData.appendRepeatingItems(item) : this.lhcFormData.addRepeatingItems(item);
      this.sendActionsToScreenReader();
      this.formChangeEventSource.next({
        'event': 'itemAdded',
        'linkId': item.linkId
      });
    }
  }

  /**
   * Remove one repeating item in a group
   * @param item an item in the lforms form items array
   */
  removeOneRepeatingItem(item) {

    const nextItem = this.lhcFormData.getNextRepeatingItem(item);

    let btnId = '';
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
      const prevItem = this.lhcFormData.getPrevRepeatingItem(item);
      if (prevItem) {
        btnId = 'add-' + prevItem._elementId;
      }
    }

    // remove the items
    this.lhcFormData.removeRepeatingItems(item);

    this.sendActionsToScreenReader();

    this.formChangeEventSource.next({
      'event': 'itemRemoved',
      'linkId': item.linkId
    });

    // set the focus
    setTimeout(function() {
      const btn = document.getElementById(btnId);
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
   * @returns The form model's horizontal-table structure, keyed by table identifiers.
   */
  getHorizontalTableInfo() {
    return this.lhcFormData._horizontalTableInfo;
  }


  /**
   * Track by item's element id for each cell in a table row
   * @param index *ngFor index, not used
   * @param item *ngFor item, an item of the form
   * @returns The item's unique element ID used as the Angular tracking key.
   */
  trackByElementId(index, item) {
    // index is not used since item._elementId is unique
    return item._elementId;
  }


  /**
   * Track by each row's group header item's element id for each row in a horizontal table
   * @param index *ngFor index
   * @param row Horizontal-table row containing a header item.
   * @returns The row header item's unique element ID.
   */
  trackByRowHeaderElementId(index, row) {
    return row.header._elementId;
  }


  /**
   * Track by column's id, which is "col" + the item's element id in the first row
   * @param index *ngFor index, not used
   * @param col Column header in the horizontal-table structure.
   * @returns The column header's ID.
   */
  trackByColumnHeaderId(index, col) {
    return col.id;
  }


  /**
   * Check if the item is a subsequent item of a horizontal group item, which is handled separately
   * @param item a form item
   * @returns Truthy for a horizontal group item without a table-header marker; falsy otherwise.
   */
  isSubsequentHorizontalTableGroupItem(item) {
    return item && item.displayControl && item.displayControl.questionLayout === "horizontal" && !item._horizontalTableHeader;
  }


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
   * @returns True when the current model has been marked ready for interaction.
   */
  isFormReady(): boolean {
    return !!this.lhcFormData._formReady;
  };


  /**
   * Run LhcFormData's skip logic, formula and data control, and
   * run FHIRPath expressions if FHIRPath lib is loaded and there are FHIRPath expressions
   * in the Quesionnaire.
   * @param item an item in the LhcFormData
   * @param currentValue the current value of an item.value
   * @param previousValue the previous value of an item.value
   * @param skipComparison whether to skip comparision of previous value and current value. defalut is false.
   * @param updateSubGroups optional synchronous dropdown model/structure update,
   *  run after subgroup visibility is captured but before form controls run
   */
  onItemValueChange(item, currentValue, previousValue, skipComparison=false, updateSubGroups?: () => void) {
    if (this.lhcFormData &&
      (skipComparison || !skipComparison && !CommonUtils.deepEqual(currentValue, previousValue))) {

      // run lforms internal changes
      const expressionsDone = this.lhcFormData.updateOnSourceItemChange(item, updateSubGroups);

      this.sendActionsToScreenReader();
      // Expressions run asynchronously and can produce more announcements.
      expressionsDone?.then(() => this.sendActionsToScreenReader());

      this.formChangeEventSource.next({
        'event': 'dataChanged',
        'linkId': item.linkId
      });

    }
  };

}
