import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { InternalUtil } from '../../lib/lforms/internal-utils';


@Component({
    selector: 'lhc-unit',
    templateUrl: './lhc-unit.component.html',
    styleUrls: ['./lhc-unit.component.css'],
    standalone: false
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
  hasUnitInputField: boolean = false;

  constructor(public lhcDataService: LhcDataService) { }


  /**
   * Invoked when the properties change
   * Reset the default settings
   * @param changes changes.prop contains the old and the new value
   */
  ngOnChanges(changes) {
    let item = this.item;
    if (item) {
      this.hasUnitAutocomplete = !!item._unitAutocompOptions;

      // Set whether the field is readOnly.
      // For now, if unitOpen is set optionsOrType and there are no units, make
      // it read-only, because there is no way a user to enter a coding unless
      // we provide a list for the specified code system.
      // We could do that for UCUM, but that will be TBD for now.
      // readOnly = true if:
      //    - the whole item is read-only
      //    - OR there is units list and _unitOpen is set to something other than optionsOrString
      this.options.readOnly = this.lhcDataService.getTemplateOptions().readonlyMode || item._readOnly ||
        !item.units && (item._unitOpen && item._unitOpen != 'optionsOrString');

      this.options.elementId = "unit_" + item._elementId
      this.options.acOptions = item._unitAutocompOptions;
      this.options.placeholder = item._placeholder;
      this.options.modelForOffListItem = InternalUtil.modelForOffListUnit;
    }
  }


  /**
   *  Updates the model in response to a change event on the input (non-autocompleter) field.
   */
  updateModel(event) {
    let offListUnit = event.target.value;
    this.item.unit = {name: offListUnit};
  }
}
