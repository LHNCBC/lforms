import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-choice-autocomplete',
  templateUrl: './lhc-item-choice-autocomplete.component.html',
  styleUrls: ['./lhc-item-choice-autocomplete.component.css']
})
export class LhcItemChoiceAutocompleteComponent implements OnChanges {

  // Handle the answer list of the "choice"/"opn-choice" typed item using the
  // lhc-autocomplete component

  @Input() item;
  @Input() acOptions; // item._autocompOptions

  options: any={};

  /**
   * Component class constructor
   */
  constructor(public lhcDataService: LhcDataService) {}


  ngOnChanges(changes): void {
    if (changes.acOptions) {
      if (this.item) {
        this.options = {
          elementId: this.item._elementId,
          acOptions: this.item._autocompOptions,
          toolTip: this.item._toolTip,
          readOnly: this.item._readOnly
        }
      }  
    }
  }

}
