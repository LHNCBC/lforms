import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-choice-autocomplete',
  templateUrl: './lhc-item-choice-autocomplete.component.html',
  styleUrls: ['./lhc-item-choice-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcItemChoiceAutocompleteComponent implements OnInit {


  // Handle the answer list of the "choice"/"opn-choice" typed item using the
  // lhc-autocomplete component

  @Input() item;

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
   //console.log("in lhc-item-choice-autocomplete: on init")

    if (this.item) {
      this.options.elementId = this.item._elementId;
      this.options.acOptions = this.item._autocompOptions;
      this.options.toolTip = this.item._toolTip;
      this.options.readOnly = this.item._readOnly;
    }

  }

  ngOnChanges(): void {
   //console.log("in lhc-item-choice-autocomplete: on change")

    if (this.item) {
      this.options.elementId = this.item._elementId;
      this.options.acOptions = this.item._autocompOptions;
      this.options.toolTip = this.item._toolTip;
      this.options.readOnly = this.item._readOnly;
    }

  }

}
