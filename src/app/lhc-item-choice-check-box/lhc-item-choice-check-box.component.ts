import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonUtilsService } from '../../lib/common-utils.service';
import { LhcDataService} from '../../lib/lhc-data.service';
import CommonUtils from "../../lib/lforms/lhc-common-utils.js";
import language from '../../../language-config.json';

@Component({
    selector: 'lhc-item-choice-check-box',
    templateUrl: './lhc-item-choice-check-box.component.html',
    styleUrls: ['./lhc-item-choice-check-box.component.css'],
    standalone: false
})
export class LhcItemChoiceCheckBoxComponent implements OnInit, OnChanges {
  @Input() item;
  @Input() acOptions; // item._autocompOptions
  language = language;

  // internal data models
  otherValue: string = null;
  otherValues: string[] = [];
  checkboxModels: boolean[] = [];
  otherCheckboxModel: boolean = null;

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

      const lastOffListIndex = this.item.value.findLastIndex(x => x._notOnList);
      for (let j = 0, jLen = this.item.value.length; j < jLen; j++) {
        const value = this.item.value[j];
        if (value._notOnList) {
          this.otherCheckboxModel = true;
          if (lastOffListIndex !== -1 && j === lastOffListIndex) {
            // The last off list value is in this.otherValue, and the rest are in this.otherValues.
            this.otherValue = value.text;
          } else {
            // this.otherValues holds the off list values except the last one, which is in this.otherValue.
            this.otherValues.push(value.text);
          }
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
   * Invoked when the selection of checkbox changes
   * @param value the selected values of a checkbox group
   */
  onCheckboxModelChange(value: any): void {
    const otherCheckboxValue = value[value.length - 1];
    if (!otherCheckboxValue?._notOnList) {
      // If the Other checkbox is unchecked, clear this.otherValues and this.otherValue.
      this.otherValues = [];
      this.otherValue = null;
    }
    if (this.otherValues.length) {
      // The off list values displayed like tags and stored in this.otherValues are not part of the checkbox list.
      // The last off list value, stored in this.otherValue, is already in the value array.
      // Add them to the value array, to the second to last position.
      value.splice(-1, 0, ...this.otherValues.map(x => ({text: x, _notOnList: true})));
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

  /**
   * Invoked when the value in the input field of 'other' changes
   * @param otherValue the value in the other value input
   */
  onOtherValueChange(otherValue: any): void {
    if (this.otherCheckboxModel) {
      const newValue = CommonUtils.deepCopy(this.prevCheckBoxValue);
      if (this.otherValue === null && this.otherValues.length) {
        // If the event is fired right after the Add button is clicked, push the new other value
        // to the end of the value array, since it was not added during Add button click.
        newValue.push({"text": otherValue, "_notOnList": true});
      } else {
        // Find the position of the last off list value, which is stored
        // in this.otherValue. Update it with the new value.
        const lastOffListIndex = newValue.findLastIndex(x => x._notOnList);
        if (lastOffListIndex !== -1) {
          newValue[lastOffListIndex].text = otherValue;
        } else {
          // No off list value to update (unexpected, since the Other checkbox is checked);
          // add one so the typed value is not lost.
          newValue.push({"text": otherValue, "_notOnList": true});
        }
      }
      this.item.value = newValue;
      this.otherValue = otherValue;
      this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue);
      this.prevCheckBoxValue = this.item.value;
    }
  }

  /**
   * Invoked when the Add button next to the other value input is clicked to add another other value.
   */
  onAddOtherValue(): void {
    if (this.otherValue) {
      this.otherValues.push(this.otherValue);
      this.otherValue = null;
    }
  }

  /**
   * Find the position in the value array of the nth (0-based) off list value.
   * The off list values are not guaranteed to be contiguous in the value array
   * (e.g. an initial value could interleave off list and on list values), so the
   * position is found by counting the off list entries rather than assuming they
   * are adjacent to each other.
   * @param value the item value array
   * @param n the 0-based index of the off list value among all off list values
   * @return the index in the value array, or -1 if there is no such off list value
   */
  getOffListValueIndex(value: any[], n: number): number {
    let count = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      if (value[i]._notOnList) {
        if (count === n) {
          return i;
        }
        count++;
      }
    }
    return -1;
  }

  /**
   * Invoked when the Remove button next to an other value is clicked to remove that other value.
   * @param index the index of the other value to remove
   */
  onRemoveOtherValue(index: number): void {
    if (this.item._readOnly) {
      return;
    }
    this.otherValues.splice(index, 1);
    const newValue = CommonUtils.deepCopy(this.prevCheckBoxValue);
    // this.otherValues holds the off list values in order (except the last one, which is in
    // this.otherValue), so the tag at position "index" is the "index"th off list value.
    const offListValueIndex = this.getOffListValueIndex(newValue, index);
    if (offListValueIndex !== -1) {
      newValue.splice(offListValueIndex, 1);
    }
    this.item.value = newValue;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue)
    this.prevCheckBoxValue = this.item.value;
    this.item._visitedBefore = true;
  }

}
