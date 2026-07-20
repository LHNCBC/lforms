import { Component, OnInit, OnChanges, Input, inject } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import {CommonUtilsService} from "../../lib/common-utils.service";

@Component({
    selector: 'lhc-item-choice-autocomplete',
    templateUrl: './lhc-item-choice-autocomplete.component.html',
    styleUrls: ['./lhc-item-choice-autocomplete.component.css'],
    standalone: false
})
export class LhcItemChoiceAutocompleteComponent implements OnChanges {

  // Handle the answer list of the "choice"/"open-choice/coding" typed item using the
  // lhc-autocomplete component

  @Input() item;
  @Input() acOptions; // item._autocompOptions
  @Input() readOnly;
  options: any={};
  private commonUtils = inject(CommonUtilsService);

  /**
   * Component class constructor
   */
  constructor(
    public lhcDataService: LhcDataService
  ) {}


  ngOnChanges(changes): void {
    if (this.item && (changes.acOptions || changes.readOnly)) {
      this.options = {
        elementId: this.item._elementId,
        acOptions: this.item._autocompOptions,
        placeholder: this.item._placeholder,
        readOnly: this.readOnly
      }
    }
    this.updateSubGroupsForMergedQR();
  }

  /**
   * Add or remove subgroups for the multi-select item based on the current value of the item.
   */
  addOrRemoveSubGroups(): void {
    if (!this.item.items) {
      return;
    }
    const validLinkIds = this.item.value?.map((v) => {
      return {
        'value': v,
        'linkId': this.lhcDataService.getLhcFormData().getLinkIdForMultiSelectSubGroup(v),
        'matched': false
      };
    }) || [];
    for (let i=0; i<this.item.items.length; i++) {
      if (!this.item.items[i].isSubGroupForMultiSelect) {
        continue;
      }
      const matched = validLinkIds.find((v) => v.linkId === this.item.items[i].linkId);
      if (matched) {
        matched.matched = true;
      }
      else {
        this.lhcDataService.getLhcFormData().deleteSubItemsForAutocomplete(this.item, i);
        i--; // Adjust the index since we removed an item from the array.
      }
    }
    validLinkIds.forEach((v) => {
      if (!v.matched) {
        this.lhcDataService.getLhcFormData().addSubItemsForMultiSelect(this.item, v.value);
      }
    });
  }

  /**
   * If rendering a merged QR, the subgroups for the autocomplete are missing some properties,
   * such as "question" and "multiSelectOption". This function is to update those properties for
   * the subgroups of autocomplete, so that they can be rendered correctly.
   */
  updateSubGroupsForMergedQR(): void {
    if (this.item.items && this.item.value && Array.isArray(this.item.value) &&
      this.item.answers && Array.isArray(this.item.answers) &&
      this.acOptions && this.acOptions.listItems) {
      const lfData = this.lhcDataService.getLhcFormData();
      for (let i = 0, len = this.acOptions.listItems.length; i < len; i++) {
        const multiSelectOption = this.acOptions.listItems[i];
        const answer = this.item.answers[i];
        const isOptionSelected = this.item.value.some(v => this.commonUtils.areTwoAnswersSame(v, answer, this.item));
        const subGroupLinkId = lfData.getLinkIdForMultiSelectSubGroup(multiSelectOption);
        const subGroupExists = lfData.hasSubGroupWithLinkId(this.item, subGroupLinkId);
        if (isOptionSelected && subGroupExists) {
          lfData.updateMultiSelectSubGroupProperties(this.item, multiSelectOption, subGroupLinkId);
        }
      }
    }
  }

}
