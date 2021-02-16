import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonUtilsService } from '../../lib/common-utils.service';


@Component({
  selector: 'lhc-item-choice-radio-button',
  templateUrl: './lhc-item-choice-radio-button.component.html',
  styleUrls: ['./lhc-item-choice-radio-button.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcItemChoiceRadioButtonComponent implements OnInit {

  @Input() item;

  // internal data models
  radioValue: any = null ;
  otherValue: string = null ;
  radioModels:  boolean[] = [];
  otherRadioModel: boolean = null;

  constructor(private commonUtils: CommonUtilsService) {}


  /**
   * Initialize the component
   */
  ngOnInit(): void {

    // console.log("in lhc-item-choice-radio-button")
    // if (this.item) {
    //   console.log(this.item);
    //   console.log(this.item._modifiedAnswers.length);
    // }
    // set the initial status if there are data in item.value
    this.setInitialValue();

  }


  /**
   * Set initial status
   */
  setInitialValue(): void {
    // console.log('in setInitialValue')
    if (this.item && this.item.value &&
      this.item._modifiedAnswers && Array.isArray(this.item._modifiedAnswers)) {

      this.radioValue = this.item.value;

      if (this.item.value._notOnList) {
        this.otherValue = this.item.value.text;
        this.otherRadioModel = true;
      }
      else {
        let iLen = this.item._modifiedAnswers.length;
        this.radioModels = new Array(iLen)

        for(let i=0; i < iLen; i++ ) {
          let answer = this.item._modifiedAnswers[i];
          if (this.commonUtils.areTwoAnswersSame(this.item.value, answer, this.item)) {
            this.radioModels[i] = true;
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

    // console.log("in lhc-item-choice-radio-button: on changes")
    // console.log(changes);
    // console.log(this.item);

    // reset initial status
    this.setInitialValue();
  }


  /**
   * Invoked when the value in 'other' radio button changes
   * @param value the value object for 'other'
   */
  onRadioModelChange(value: any): void {
    // console.log(value);
    this.item.value = this.radioValue;
  }


  /**
   * Invoked when the value in the other value input field changes
   * @param value
   */
  onOtherValueChange(value: any) : void {
    // console.log(this.radioValue);
    // console.log(this.otherValue)
    if (this.radioValue._notOnList) {
      this.item.value = this.radioValue = { "text": this.otherValue, "_notOnList": true};
    }

  }
}
