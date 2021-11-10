import {Component, Input, OnInit, OnChanges, ViewEncapsulation} from '@angular/core';
import { CommonUtilsService } from '../../lib/common-utils.service';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-choice-radio-button',
  templateUrl: './lhc-item-choice-radio-button.component.html',
  styleUrls: ['./lhc-item-choice-radio-button.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcItemChoiceRadioButtonComponent implements OnInit, OnChanges {

  get isVertical() {
    return this.item.displayControl?.answerLayout?.columns !== undefined
      && this.item.displayControl.answerLayout.columns !== '0';
  }

  @Input() item;

  // internal data models
  radioValue: any = null ;
  otherValue: string = null ;
  radioModels:  boolean[] = [];
  otherRadioModel: boolean = null;

  constructor(
    private commonUtils: CommonUtilsService,
    public lhcDataService: LhcDataService) {}


  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    console.log('lhc-item-choice-raido-button, ngOnDestroy')
  }

  /**
   * Set initial status
   */
  setInitialValue(): void {
    // there is a saved value and there is an answer list
    if (this.item && this.item.value &&
      this.item._modifiedAnswers && Array.isArray(this.item._modifiedAnswers)) {

      this.radioValue = this.item.value;
      // saved value is not on the answer list
      if (this.item.value._notOnList) {
        this.otherValue = this.item.value.text;
        this.otherRadioModel = true;
      }
      // saved value is on the answer list
      else {
        let iLen = this.item._modifiedAnswers.length;
        this.radioModels = new Array(iLen)

        for(let i=0; i < iLen; i++ ) {
          let answer = this.item._modifiedAnswers[i];
          if (this.commonUtils.areTwoAnswersSame(this.item.value, answer, this.item)) {
            this.radioModels[i] = true;
            break;
          }
        }
      }
    }
  }


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
   * Invoked when the value in 'other' radio button changes
   * @param value the value object for 'other'
   */
  onRadioModelChange(value: any): void {
    this.item.value = this.radioValue;
  }


  /**
   * Invoked when the value in the other value input field changes
   * @param value
   */
  onOtherValueChange(value: any) : void {
    if (this.radioValue._notOnList) {
      this.item.value = this.radioValue = { "text": this.otherValue, "_notOnList": true};
    }

  }
}
