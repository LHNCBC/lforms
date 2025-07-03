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

}
