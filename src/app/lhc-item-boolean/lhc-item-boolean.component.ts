import {OnChanges, Component, Input } from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import language from '../../../language-config.json';

@Component({
    selector: 'lhc-item-boolean',
    templateUrl: './lhc-item-boolean.component.html',
    styleUrls: ['./lhc-item-boolean.component.css'],
    standalone: false
})
export class LhcItemBooleanComponent implements OnChanges {
  @Input() item: any;
  booleanModels:  boolean[] = new Array(3);
  language = language;

  constructor(public lhcDataService: LhcDataService) {}

  /**
   * Invokded when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
   ngOnChanges(changes) {
    // changes.prop contains the old and the new value...
    // reset initial status
    this.setInitialValue();
  }

  /**
   * onModelChange handler
   * @param value the new value in model
   */
  onModelChange(value) {
    let prevValue = this.item.value;
    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue)
  }


  /**
   * Set initial status
   */
  setInitialValue(): void {
    if (this.item) {
      let booleanValue = this.item.value;
      if (booleanValue === true) {
        this.booleanModels[0] = true;
      }
      else if (booleanValue === false) {
        this.booleanModels[1] = true;
      }
      else if (booleanValue === undefined || booleanValue === null) {
        this.booleanModels[2] = true;
      }
    }
  }

}
