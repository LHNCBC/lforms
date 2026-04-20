import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

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

  /**
   * Component class constructor
   */
  constructor(public lhcDataService: LhcDataService) {}


  ngOnChanges(changes): void {
    if (this.item && (changes.acOptions || changes.readOnly)) {
      this.options = {
        elementId: this.item._elementId,
        acOptions: this.item._autocompOptions,
        placeholder: this.item._placeholder,
        readOnly: this.readOnly
      }
    }
  }

  addOrRemoveSubGroups(): void {
    if (!this.item.items) {
      return;
    }
    const validLinkIds = this.item.value.map((v) => {
      return {
        'linkId': this.lhcDataService.getLhcFormData().getLinkIdForCheckboxSubGroup(v),
        'matched': false
      };
    });
    for (let i=0; i<this.item.items.length; i++) {
      if (!this.item.items[i].isSubGroupForCheckbox) {
        continue;
      }
      if (validLinkIds.includes(this.item.items[i].linkId)) {
        validLinkIds.find((v) => v.linkId === this.item.items[i].linkId).matched = true;
      }
      else {
        this.item.items.splice(i, 1);
      }
    }
    validLinkIds.forEach((v) => {
      if (!v.matched) {
        this.lhcDataService.getLhcFormData().addSubItemsForCheckbox(this.item, v);
      }
    });
    console.log(this.item.items);
  }

}
