import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonUtilsService } from '../../lib/common-utils.service';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-choice-check-box',
  templateUrl: './lhc-item-choice-check-box.component.html',
  styleUrls: ['./lhc-item-choice-check-box.component.css'],
})
export class LhcItemChoiceCheckBoxComponent implements OnInit, OnChanges {
  @Input() item;
  @Input() acOptions; // item._autocompOptions

  // internal data models
  otherValue: string = null;
  checkboxModels: boolean[] = [];
  otherCheckboxModel: boolean = null;

  constructor(
    private commonUtils: CommonUtilsService,
    public lhcDataService: LhcDataService
  ) {}

  /**
   * Set initial status of the component
   */
  setInitialValue(): void {

    if (
      this.item &&
      this.item.value &&
      Array.isArray(this.item.value) &&
      this.item._modifiedAnswers &&
      Array.isArray(this.item._modifiedAnswers)
    ) {
      let iLen = this.item._modifiedAnswers.length;
      this.checkboxModels = new Array(iLen);

      for (let j = 0, jLen = this.item.value.length; j < jLen; j++) {
        let value = this.item.value[j];
        if (value._notOnList) {
          this.otherCheckboxModel = true;
          this.otherValue = value.text;
        } else {
          for (let i = 0; i < iLen; i++) {
            let answer = this.item._modifiedAnswers[i];
            if (this.commonUtils.areTwoAnswersSame(value, answer, this.item)) {
              this.checkboxModels[i] = true;
            }
          }
        }
      }
    }
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {}

  /**
   * Invokded when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes) {
    // reset initial status
    this.setInitialValue();
  }

  /**
   * Invoked when the selection of checkbox changes
   * @param value
   */
  onCheckboxModelChange(value: any): void {
    this.item.value = value;
  }

  /**
   * Invoked when the value in the input field of 'other' changes
   * @param value change event
   */
  onOtherValueChange(value: any): void {
    if (this.otherCheckboxModel) {
      this.item.value = this.item.value.map((answer) => {
        if (answer._notOnList) {
          answer.text = this.otherValue;
        }
        return answer;
      });
    }
  }
}
