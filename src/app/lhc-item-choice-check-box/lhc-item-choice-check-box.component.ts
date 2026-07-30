import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonUtilsService} from '../../lib/common-utils.service';
import {LhcDataService} from '../../lib/lhc-data.service';
import language from '../../../language-config.json';
import Def from 'autocomplete-lhc';

@Component({
    selector: 'lhc-item-choice-check-box',
    templateUrl: './lhc-item-choice-check-box.component.html',
    styleUrls: ['./lhc-item-choice-check-box.component.css'],
    standalone: false
})
export class LhcItemChoiceCheckBoxComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() item;
  @Input() acOptions; // item._autocompOptions
  @ViewChild("ac") ac: ElementRef<any>;
  language = language;
  checkboxModels: boolean[] = [];
  otherCheckboxModel: boolean = null;
  acInstance: any = null;
  initialOffListValues = [];
  viewInitialized = false;
  // the function returned by observeListSelections, used to remove the callback
  listSelectionObserver: () => void = null;

  // the previous value, because nz-checkbox-wrapper does not have access to the previous value in the ngOnChange event
  prevCheckBoxValue: any = null;

  constructor(
    private commonUtils: CommonUtilsService,
    public lhcDataService: LhcDataService
  ) {}

  /**
   * Set the initial status of the autocomplete for "Other" values.
   */
  setInitialValue(): void {
    if (this.item && this.item.value && Array.isArray(this.item.value) &&
        this.item.answers && Array.isArray(this.item.answers)) {
      const iLen = this.item.answers.length;
      this.checkboxModels = new Array(iLen);
      this.initialOffListValues = [];

      for (let j = 0, jLen = this.item.value.length; j < jLen; j++) {
        const value = this.item.value[j];
        if (value._notOnList && value.text) {
          this.initialOffListValues.push(value.text);
        }
        else if (!value._notOnList) {
          for (let i = 0; i < iLen; i++) {
            const answer = this.item.answers[i];
            if (this.commonUtils.areTwoAnswersSame(value, answer, this.item)) {
              this.checkboxModels[i] = true;
            }
          }
        }
      }
      if (this.initialOffListValues.length) {
        this.otherCheckboxModel = true;
        if (this.viewInitialized && this.ac) {
          this.cleanupAutocomplete();
          this.setupAutocomplete();
        } else if (this.viewInitialized && !this.ac && !this.acInstance) {
          // If "Other" is re-bound to true, #ac may not be rendered yet in this change cycle.
          // Retry setup after Angular applies the *ngIf DOM update.
          setTimeout(() => {
            if (this.otherCheckboxModel && this.ac && !this.acInstance) {
              this.setupAutocomplete();
            }
          }, 0);
        }
      } else {
        // The (re-bound) value has no off-list entries, so the "Other" checkbox should not
        // stay checked with a stale autocompleter left over from a previous value.
        this.otherCheckboxModel = false;
        this.cleanupAutocomplete();
      }

      this.prevCheckBoxValue = this.item.value;

      this.removeSubGroupsForNonExistentCheckboxes();
      this.updateSubGroupsForMergedQR();
    } else {
      this.checkboxModels = [];
      this.initialOffListValues = [];
      this.otherCheckboxModel = false;
      this.cleanupAutocomplete();
    }
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {}

  /**
   * Invokded when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes) {
    // reset initial status
    this.setInitialValue();
  }

  /**
   * Initialize the autocomplete-lhc
   * Cannot be done in ngOnInit because the DOM elements that autocomplete-lhc depends on are
   * not ready yet on ngOnInit
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.setupAutocomplete();
      this.viewInitialized = true;
    }, 0);
  }

  /**
   * Clean up the autocompleter and its list selection callback when the component is destroyed
   */
  ngOnDestroy(): void {
    this.cleanupAutocomplete();
  }

  /**
   * Clean up the autocompleter if there is one
   */
  cleanupAutocomplete(): void {
    // Remove the list selection callback. destroy() below does not remove it, and
    // observeListSelections stores callbacks in a global keyed by field id, so they
    // would otherwise accumulate and fire multiple times per selection.
    if (this.listSelectionObserver) {
      this.listSelectionObserver();
      this.listSelectionObserver = null;
    }
    if (this.acInstance) {
      // reset the field value
      this.acInstance.setFieldVal('', false);
      this.acInstance.destroy();
      this.acInstance = null;
    }
  }

  /**
   * Set up the autocompleter
   */
  setupAutocomplete() {
    // this.ac may be undefined if the "#ac" input (guarded by *ngIf="otherCheckboxModel")
    // has not been rendered yet when this is called; skip until it is available.
    if (this.otherCheckboxModel && this.ac) {
      const acOptions = {
        maxSelect: '*'
      };
      this.acInstance = new Def.Autocompleter.Prefetch(this.ac.nativeElement, [], acOptions);
      this.initialOffListValues.forEach(v => {
        this.acInstance.storeSelectedItem(v, null); // no code, only text
        this.acInstance.addToSelectedArea(v);
      });
      this.initialOffListValues.length = 0;
      this.listSelectionObserver = Def.Autocompleter.Event.observeListSelections(this.lhcDataService.getItemAnswerId(this.item, '_otherValueInput'), () => {
        const onListValues = (this.prevCheckBoxValue || []).filter(v => !v._notOnList);
        this.item.value = onListValues.concat(this.acInstance.getSelectedItems().map(x => ({text: x, _notOnList: true})));
        this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue);
        this.prevCheckBoxValue = this.item.value;
        this.item._visitedBefore = true;
      });
    }
  }

  /**
   * Invoked when the selection of checkbox changes
   * @param value the selected values of a checkbox group
   */
  onCheckboxModelChange(value: any[]): void {
    const hasOffListValue = value.some(v => v && v._notOnList);
    if (hasOffListValue) {
      if (this.acInstance) {
        const onListValues = value.filter(v => !v || !v._notOnList);
        value.splice(0, value.length, ...onListValues, ...this.acInstance.getSelectedItems().map(x => ({text: x, _notOnList: true})));
      } else {
        // If "Other" is checked but no values are in the autocomplete, remove all off-list
        // placeholders from item.value.
        const onListValues = value.filter(v => !v || !v._notOnList);
        value.splice(0, value.length, ...onListValues);
        setTimeout(() => {
          this.setupAutocomplete();
        }, 0);
      }
    }
    else {
      this.cleanupAutocomplete();
    }
    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue);
    this.prevCheckBoxValue = this.item.value;
    this.item._visitedBefore = true;

    this.addOrRemoveSubGroupsForCheckbox();
  }

  /**
   * Add or remove subgroups for the checkbox item, as the selection changes.
   */
  addOrRemoveSubGroupsForCheckbox(): void {
    if (!this.item.items) {
      return;
    }
    for (let i = 0, len = this.checkboxModels.length; i < len; i++) {
      const multiSelectOption = this.acOptions.listItems[i];
      const subGroupLinkId = this.lhcDataService.getLhcFormData().getLinkIdForMultiSelectSubGroup(multiSelectOption);
      const subGroupExists = this.lhcDataService.getLhcFormData().hasSubGroupWithLinkId(this.item, subGroupLinkId);
      if (this.checkboxModels[i] === true && !subGroupExists) {
        this.lhcDataService.getLhcFormData().addSubItemsForMultiSelect(this.item, multiSelectOption);
      } else if (!this.checkboxModels[i] && subGroupExists) {
        this.lhcDataService.getLhcFormData().deleteSubItemsForCheckbox(this.item, multiSelectOption);
      }
    }
  }

  /**
   * If rendering a merged QR, the subgroups for the checkboxes are missing some properties,
   * such as "question" and "multiSelectOption". This function is to update those properties for
   * the subgroups of checkboxes, so that they can be rendered correctly.
   */
  updateSubGroupsForMergedQR(): void {
    if (!this.item.items) {
      return;
    }
    for (let i = 0, len = this.checkboxModels.length; i < len; i++) {
      const multiSelectOption = this.acOptions.listItems[i];
      const subGroupLinkId = this.lhcDataService.getLhcFormData().getLinkIdForMultiSelectSubGroup(multiSelectOption);
      const subGroupExists = this.lhcDataService.getLhcFormData().hasSubGroupWithLinkId(this.item, subGroupLinkId);
      if (this.checkboxModels[i] === true && subGroupExists) {
        this.lhcDataService.getLhcFormData().updateMultiSelectSubGroupProperties(this.item, multiSelectOption, subGroupLinkId);
      }
    }
  }

  /**
   * Remove subgroups for non-existent checkbox options.
   * This could happen when some checkboxes are selected, and then those checkboxes are
   * removed from the answer options, due to answerExpression. The subgroups for those
   * removed checkboxes should also be removed.
   */
  removeSubGroupsForNonExistentCheckboxes(): void {
    const lhcFormData = this.lhcDataService.getLhcFormData();
    // A list of currently valid subgroup linkIds.
    const subGroupLinkIds = this.acOptions.listItems.map(x =>
      lhcFormData.getLinkIdForMultiSelectSubGroup(x));
    if (this.item.items) {
      this.item.items = this.item.items.filter(x =>
        !x.isSubGroupForMultiSelect ||
        subGroupLinkIds.indexOf(x.linkId) !== -1
      );
      lhcFormData._resetInternalData();
    }
  }

}
