import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-validate',
  templateUrl: './lhc-validate.component.html',
  styleUrls: ['./lhc-validate.component.css'],
})
export class LhcValidateComponent implements OnChanges {
  @Input() item: any;
  @Input() value: any;

  constructor(private lhcDataService: LhcDataService) {}

  /**
   * Invokded when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes) {
    if (changes.value && !changes.value.firstChange) {
      let lfData = this.lhcDataService.getLhcFormData();

      // check validation on the item
      setTimeout(() => {
        lfData._checkValidations(this.item);
        if (this.item._validationErrors) {
          this.item._validationErrors.forEach((error) => {
            this.lhcDataService.sendMsgToScreenReader(
              `${this.item.question} ${error}`
            );
          });
        }
      }, 1);
    }
  }
}
