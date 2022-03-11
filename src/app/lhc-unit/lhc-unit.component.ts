import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-unit',
  templateUrl: './lhc-unit.component.html',
  styleUrls: ['./lhc-unit.component.css']
})
export class LhcUnitComponent implements OnChanges {

  // Handle the unit list of the "quantity' typed item using the
  // lhc-autocomplete component
  // http://hl7.org/fhir/StructureDefinition/questionnaire-unitOption
  // In lforms:
  // "units": [{
  //   "name": string,
  //   "code": string,
  //   "system": string,
  //   "default": boolean
  // }],

  @Input() item;
  options: any={};
  hasUnitAutocomplete: boolean = false;

  constructor(public lhcDataService: LhcDataService) { }

  
  /**
   * Invoked when the properties change
   * Reset the defualt settings
   * @param changes changes.prop contains the old and the new value
   */
  ngOnChanges(changes) {
    if (this.item) {
      this.hasUnitAutocomplete = !!this.item._unitAutocompOptions;
      this.options.elementId = "unit_" + this.item._elementId
      this.options.acOptions = this.item._unitAutocompOptions;
      this.options.tooltip = this.item._toolTip;
      this.options.readOnly = this.item._readOnly;
    }
  }

}
