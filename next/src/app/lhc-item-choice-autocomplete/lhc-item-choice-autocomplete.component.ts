import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-choice-autocomplete',
  templateUrl: './lhc-item-choice-autocomplete.component.html',
  styleUrls: ['./lhc-item-choice-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcItemChoiceAutocompleteComponent implements OnInit, OnChanges {


  // Handle the answer list of the "choice"/"opn-choice" typed item using the
  // lhc-autocomplete component

  @Input() item;
  @Input() acOptions; // item._autocompOptions

  options: any={};

  /**
   * Component class constructor
   */
  constructor(public lhcDataService: LhcDataService) {

  }


  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    // console.log("in lhc-item-choice-autocomplete: on change")
    // console.log(changes);
    // console.log(this.item.question);

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
