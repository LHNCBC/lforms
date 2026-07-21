import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
export class LhcItemChoiceCheckBoxComponent implements OnInit, OnChanges {
  @Input() item;
  @Input() acOptions; // item._autocompOptions
  @ViewChild("ac") ac: ElementRef<any>;
  language = language;
  checkboxModels: boolean[] = [];
  otherCheckboxModel: boolean = null;
  acInstance: any = null;
  offListValues = [];
  viewInitialized = false;

  // the previous value, because nz-checkbox-wrapper does not have access to the previous value in the ngOnChange event
  prevCheckBoxValue: any = null;

  constructor(
    private commonUtils: CommonUtilsService,
    public lhcDataService: LhcDataService
  ) {}

  /**
   * Set initial status of the component
   */
  setInitialValue(): void {

    if (this.item && this.item.value && Array.isArray(this.item.value) &&
        this.item.answers && Array.isArray(this.item.answers)) {
      const iLen = this.item.answers.length;
      this.checkboxModels = new Array(iLen);

      for (let j = 0, jLen = this.item.value.length; j < jLen; j++) {
        const value = this.item.value[j];
        if (value._notOnList) {
          this.offListValues.push(value.text);
        }
        else {
          for (let i = 0; i < iLen; i++) {
            const answer = this.item.answers[i];
            if (this.commonUtils.areTwoAnswersSame(value, answer, this.item)) {
              this.checkboxModels[i] = true;
            }
          }
        }
      }
      if (this.offListValues.length) {
        this.otherCheckboxModel = true;
        if (this.viewInitialized) {
          this.cleanupAutocomplete();
          this.setupAutocomplete();
        }
      }

      this.prevCheckBoxValue = this.item.value;

      this.removeSubGroupsForNonExistentCheckboxes();
      this.updateSubGroupsForMergedQR();
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
    this.setupAutocomplete();
    this.viewInitialized = true;
  }

  /**
   * Clean up the autocompleter if there is one
   */
  cleanupAutocomplete(): void {
    if (this.acInstance) {
      // reset the field value
      this.acInstance.setFieldVal('', false);
      this.acInstance.destroy();
      this.acInstance = null;
      this.offListValues = [];
    }
  }

  /**
   * Set up the autocompleter
   */
  setupAutocomplete() {
    if (this.otherCheckboxModel) {
      const acOptions = {
        maxSelect: '*'
      };
      this.acInstance = new Def.Autocompleter.Prefetch(this.ac.nativeElement, [], acOptions);
      this.offListValues.forEach(v => {
        this.acInstance.storeSelectedItem(v, null); // no code, only text
        this.acInstance.addToSelectedArea(v);
      });
      Def.Autocompleter.Event.observeListSelections(this.lhcDataService.getItemAnswerId(this.item, '_otherValue'), (e) => {
        this.item.value = this.prevCheckBoxValue
          .filter(v => !v._notOnList)
          .concat(this.acInstance.getSelectedItems().map(x => ({text: x, _notOnList: true})));
        this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue)
        this.prevCheckBoxValue = this.item.value;
        this.item._visitedBefore = true;
      });
    }
  }

  /**
   * Invoked when the selection of checkbox changes
   * @param value the selected values of a checkbox group
   */
  onCheckboxModelChange(value: any): void {
    const lastCheckboxValue = value[value.length - 1];
    if (lastCheckboxValue && lastCheckboxValue._notOnList) {
      if (this.acInstance) {
        value.splice(-1, 1, ...this.acInstance.getSelectedItems().map(x => ({text: x, _notOnList: true})));
      } else {
        // If "Other" is checked but no values are in the autocomplete, remove the "Other" value from the item.value array.
        value.splice(-1, 1);
        setTimeout(() => {
          this.setupAutocomplete();
        }, 0);
      }
    }
    else {
      this.cleanupAutocomplete();
    }
    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue)
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
