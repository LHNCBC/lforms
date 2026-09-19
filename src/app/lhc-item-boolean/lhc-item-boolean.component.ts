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
    const prevValue = this.item.value;
    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue)
  }


  /**
   * Whether this boolean item requested the FHIR check-box item control.
   * @returns true if the item's displayControl.answerLayout.type is CHECK_BOX
   */
  usesCheckboxControl(): boolean {
    return this.item?.displayControl?.answerLayout?.type === 'CHECK_BOX';
  }


  /**
   * Advance the checkbox through unanswered, true, false, and back to unanswered.
   */
  cycleCheckboxState(): void {
    if (!this.item || this.item._readOnly) {
      return;
    }

    const prevValue = this.item.value;
    if (prevValue === true) {
      this.item.value = false;
    } else if (prevValue === false) {
      this.item.value = null;
    } else {
      this.item.value = true;
    }
    this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue);
  }


  /**
   * Return the localized status displayed beside the three-state checkbox.
   * @returns the localized "Yes", "No", or "Not Answered" text for the item's current value
   */
  getCheckboxStatus(): string {
    if (this.item?.value === true) {
      return this.language.booleanYes;
    } else if (this.item?.value === false) {
      return this.language.booleanNo;
    }
    return this.language.booleanNotAnswered;
  }


  /**
   * Return the WAI-ARIA checkbox state for the current boolean value.
   * @returns 'true' if the item value is true, 'false' if it is false, otherwise 'mixed'
   */
  getCheckboxAriaState(): 'true' | 'false' | 'mixed' {
    if (this.item?.value === true) {
      return 'true';
    } else if (this.item?.value === false) {
      return 'false';
    }
    return 'mixed';
  }


  /**
   * Set radio model values based on the item value.
   */
  setBooleanModels(): void {
    if (this.item) {
      const booleanValue = this.item.value;
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
