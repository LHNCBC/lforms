import {Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonUtilsService } from '../../lib/common-utils.service';
import { LhcDataService} from '../../lib/lhc-data.service';
import language from '../../../language-config.json';

@Component({
    selector: 'lhc-item-choice-radio-button',
    templateUrl: './lhc-item-choice-radio-button.component.html',
    styleUrls: ['./lhc-item-choice-radio-button.component.css'],
    standalone: false
})
export class LhcItemChoiceRadioButtonComponent implements OnChanges {
  private _item;
  private _acOptions;

  @Input()
  set item(item) {
    this._item = item;
    this.updateAnswerLayout();
  }
  get item() {
    return this._item;
  }

  @Input()
  set acOptions(acOptions) {
    this._acOptions = acOptions;
    this.updateAnswerLayout();
  }
  get acOptions() { // item._autocompOptions
    return this._acOptions;
  }

  language = language;
  answerOptionColumnCount: number | null = null;
  answerOptionIsVertical = false;
  answerOptionIsGrid = false;

  // internal data models
  radioValue: any = null ;
  otherValue: string = null ;
  radioModels:  boolean[] = [];
  otherRadioModel: boolean = null;

  constructor(
    private commonUtils: CommonUtilsService,
    public lhcDataService: LhcDataService
  ) {}


  /**
   * Cache the answer layout values used by the template whenever its inputs change.
   */
  private updateAnswerLayout(): void {
    const displayControl = this.item?.displayControl;
    const answerCount = (this.acOptions?.listItems?.length || 0) +
      (this.item?.answerConstraint === 'optionsOrString' ? 1 : 0);
    this.answerOptionColumnCount = this.commonUtils.getDisplayControlEffectiveColumnCount(
      displayControl, answerCount
    );
    this.answerOptionIsVertical = this.commonUtils.getDisplayControlIsVertical(displayControl);
    this.answerOptionIsGrid = this.commonUtils.getDisplayControlIsGrid(displayControl);
  }


  /**
   * Set initial status
   */
  setInitialValue(): void {
    // there is a saved value and there is an answer list
    if (this.item && this.item.value &&
      this.item.answers && Array.isArray(this.item.answers)) {

      this.radioValue = this.item.value;
      // saved value is not on the answer list
      if (this.item.value._notOnList) {
        this.otherValue = this.item.value.text;
        this.otherRadioModel = true;
      }
      // saved value is on the answer list
      else {
        const iLen = this.item.answers.length;
        this.radioModels = new Array(iLen)

        for(let i=0; i < iLen; i++ ) {
          const answer = this.item.answers[i];
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
   * Invoked when the value of the radio group changes
   * @param value the new value of a radio button
   */
  onRadioModelChange(value: any): void {
    this.radioValue = value;
    const prevValue = this.item.value;
    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue)
  }


  /**
   * Invoked when the value in the other value input field changes
   * @param otherValue the value in the other value input
   */
  onOtherValueChange(otherValue: any) : void {
    this.otherValue = otherValue;
    const prevValue = this.item.value;
    this.item.value = { "text": otherValue, "_notOnList": true};
    this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue)
  }
}
