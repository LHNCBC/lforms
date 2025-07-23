import {OnChanges, Component, Input} from '@angular/core';
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
  @Input() value: any;
  booleanModels: boolean[] = new Array(3);
  language = language;

  constructor(public lhcDataService: LhcDataService) {
  }

  /**
   * Invoked when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes) {
    this.setBooleanModels();
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
   * Set radio model values based on the item value.
   */
  setBooleanModels(): void {
    if (this.item) {
      let booleanValue = this.item.value;
      if (booleanValue === true) {
        this.booleanModels = [true, false, false];
      } else if (booleanValue === false) {
        this.booleanModels = [false, true, false];
      } else if (booleanValue === undefined || booleanValue === null) {
        this.booleanModels = [false, false, true];
      }
    }
  }

}
