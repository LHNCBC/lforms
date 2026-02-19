import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { CommonUtilsService } from '../../lib/common-utils.service';
import deepEqual from "deep-equal";
import language from '../../../language-config.json';

@Component({
    selector: 'lhc-group-matrix',
    templateUrl: './lhc-group-matrix.component.html',
    styleUrls: ['./lhc-group-matrix.component.css'],
    standalone: false
})
export class LhcGroupMatrixComponent implements OnChanges {

  @Input() item;
  // item.item[0]._autocompOptions
  // Use the first child item's autocomplete options, assuming all the child items have the same answer list.
  // It could be delayed when the answer list is loaded from answerValueSet or answerExpression
  @Input() acOptions;
  @Input() formLevel: boolean = false;
  language = language;

  isCheckbox: boolean = false;

  constructor(
    private commonUtils: CommonUtilsService,
    public lhcDataService: LhcDataService) {
  }

  /**
   * Invoked when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes) {
    // reset initial status
    this.setInitialValue();
    // Set answerOption list items which have _displayText.
    const lhcFormData = this.lhcDataService.getLhcFormData();
  }


  /**
   * Updates the value for an item whose answers are displayed as a list of checkboxes,
   * one of which has just been selected or deselected
   * @param item a form item that has an answer list and supports multiple selections
   */
  updateCheckboxListValue(item): void {

    const newValues = [];
    for (let i=0, iLen= item._checkboxModels.length; i<iLen; i++) {
      if (item._checkboxModels[i]) {
        newValues.push(item.answers[i])
      }
    }
    if (item._answerOtherChecked) {
      newValues.push({"text": item._answerOther, "_notOnList": true})
    }
    item.value = newValues;

    // run the change function
    this.lhcDataService.onItemValueChange(item, null, null, true)
  }



  /**
   * Updates the value for an item whose answers are displayed as a list of radio buttons,
   * one of which has just been selected or deselected.
   * Reset the 'otherValue' when an answer from the list is selected by user.
   * @param item a form item that has an answer list and supports single selections
   * @param answer an answer object in the answer list
   */
  updateRadioListValue(item, answer, index) {
    item.value = answer;
    item._answerOtherChecked = false;
    item._selectedRadio = index;

    // run the change function
    this.lhcDataService.onItemValueChange(item, null, null, true)
  }


  /**
   * Update the item.value based on selection of extra data input by users
   * @param item a form item that has an answer list and support single selections
   * @param otherValue the user typed string value for the "OTHER" radio button
   */
  updateRadioListValueForOther(item, otherValue) {
    // add/update the other value
    if (item._answerOtherChecked) {
      item.value = { "text": otherValue, "_notOnList": true};

      // run the change function
      this.lhcDataService.onItemValueChange(item, null, null, true)
    }
  }


  /**
   * Set initial status for each row in the matrix
   */
  setInitialValue(): void {

    this.isCheckbox = this.item.items[0]?._multipleAnswers;

    this.item.items.forEach((subItem) => {
      if (this.isCheckbox) {
        this.setCheckboxInitialValue(subItem);
      }
      else {
        this.setRadioInitialValue(subItem);
      }
    });
  }


  /**
   * Set the initial status of radio bottons for answers of a sub item
   * @param subItem a sub item of the group item that has the matrix layout
   */
  setRadioInitialValue(subItem): void {
    // there is a saved value and there is an answer list
    if (subItem.value &&
      subItem.answers && Array.isArray(subItem.answers)) {

      // saved/initial value is not on the answer list
      if (subItem.value._notOnList) {
        subItem._answerOtherChecked = true;
        subItem._answerOther = subItem.value.text;
      }
      // set the radio button status
      // if saved/initial value is on the answer list
      else {
        for(let i=0; i < subItem.answers.length; i++ ) {
          const answer = subItem.answers[i];
          if (this.commonUtils.areTwoAnswersSame(subItem.value, answer, subItem)) {
            subItem._selectedRadio = i;
            break;
          }
        }
      }
    }
    // reset status
    else {
      subItem._answerOtherChecked = false;
      subItem._selectedRadio = null;
      delete subItem._answerOther;
    }
  }


  /**
   * Create the initial models for the checkboxes
   * @param initialValues the initial values of the item
   * @param answers the answers of the item
   * @returns boolean[]
   */
  _getCheckboxModels(initialValues, answers): boolean[] {
    const checkboxModels = new Array(answers.length).fill(false);

    for (let i=0, iLen=initialValues.length; i<iLen; i++) {
      for (let j=0, jLen=answers.length; j<jLen; j++) {
        if (deepEqual(initialValues[i], answers[j])) {
          checkboxModels[j]=true;
          break;
        }
      }
    }
    return checkboxModels;
  }


  /**
   * Set the initial status of checkboxes for answers of a sub item
   * @param subItem a sub item of the group item that has the matrix layout
   */
  setCheckboxInitialValue(subItem): void {

    // if there is answer list or the answer list has been loaded
    // (from answerValueSet or answerExpression)
    if (subItem.answers && Array.isArray(subItem.answers)) {
      // if there is an initial value or an existing value
      if (subItem.value && Array.isArray(subItem.value)) {
        const checkboxModels = new Array(subItem.answers.length).fill(false);
        for (let i=0, iLen=subItem.value.length; i<iLen; i++) {
          if (subItem.value[i]._notOnList) {
            subItem._answerOtherChecked = true;
            subItem._answerOther = subItem.value[i].text;
          }
          else {
            for (let j=0, jLen=subItem.answers.length; j<jLen; j++) {
              if (deepEqual(subItem.value[i], subItem.answers[j])) {
                checkboxModels[j]=true;
                break;
              }
            }
          }
        }
        subItem._checkboxModels = checkboxModels;
      }
      // reset the data models if there is no values
      else {
        subItem._checkboxModels= new Array(subItem.answers.length).fill(false);
        subItem._answerOtherChecked = false;
        delete subItem._answerOther;
      }
    }
  }
}
