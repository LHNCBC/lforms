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

      for (let j = 0, jLen = this.item.value.length; j < jLen; j++) {
        const value = this.item.value[j];
        if (value._notOnList) {
          this.otherCheckboxModel = true;
          this.otherValue = value.text;
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
    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue)
    this.prevCheckBoxValue = this.item.value;
    this.item._visitedBefore = true;

    this.addOrRemoveSubGroupsForCheckbox();
  }

  /**
   * Checks if an item has a checkbox subgroup with a specific linkId.
   * @param item an LForms item with checkbox layout and sub items.
   * @param linkId the linkId of the checkbox subgroup.
   */
  hasSubGroupWithLinkId(item, linkId): boolean {
    if (item.items && item.items.some(x => x.isSubGroupForCheckbox === true && x.linkId === linkId)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Add or remove subgroups for the checkbox item, as the selection changes.
   */
  addOrRemoveSubGroupsForCheckbox(): void {
    if (!this.item.items) {
      return;
    }
    for (let i = 0, len = this.checkboxModels.length; i < len; i++) {
      const checkboxOption = this.acOptions.listItems[i];
      const subGroupLinkId = this.lhcDataService.getLhcFormData().getLinkIdForCheckboxSubGroup(checkboxOption);
      const subGroupExists = this.hasSubGroupWithLinkId(this.item, subGroupLinkId);
      if (this.checkboxModels[i] === true && !subGroupExists) {
        this.lhcDataService.getLhcFormData().addSubItemsForCheckbox(this.item, checkboxOption);
      } else if (!this.checkboxModels[i] && subGroupExists) {
        this.lhcDataService.getLhcFormData().deleteSubItemsForCheckbox(this.item, checkboxOption);
      }
    }
  }

  /**
   * If rendering a merged QR, the subgroups for the checkboxes are missing some properties,
   * such as "question" and "checkboxOption". This function is to update those properties for
   * the subgroups of checkboxes, so that they can be rendered correctly.
   */
  updateSubGroupsForMergedQR(): void {
    if (!this.item.items) {
      return;
    }
    for (let i = 0, len = this.checkboxModels.length; i < len; i++) {
      const checkboxOption = this.acOptions.listItems[i];
      const subGroupLinkId = this.lhcDataService.getLhcFormData().getLinkIdForCheckboxSubGroup(checkboxOption);
      const subGroupExists = this.hasSubGroupWithLinkId(this.item, subGroupLinkId);
      if (this.checkboxModels[i] === true && subGroupExists) {
        this.lhcDataService.getLhcFormData().updateCheckboxSubGroupProperties(this.item, checkboxOption, subGroupLinkId);
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
      lhcFormData.getLinkIdForCheckboxSubGroup(x));
    if (this.item.items) {
      this.item.items = this.item.items.filter(x =>
        !x.isSubGroupForCheckbox ||
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
      this.item.value = CommonUtils.deepCopy(this.prevCheckBoxValue).map((answer) => {
        if (answer._notOnList) {
          answer.text = otherValue;
        }
        return answer;
      });
      this.otherValue = otherValue;
      this.lhcDataService.onItemValueChange(this.item, this.item.value, this.prevCheckBoxValue)
      this.prevCheckBoxValue = this.item.value;
    }
  }
}
