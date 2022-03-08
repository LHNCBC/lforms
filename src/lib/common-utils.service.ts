import { Injectable } from '@angular/core';

import CommonUtils from './lforms/lhc-common-utils.js';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  /**
   * Check if two answers can be treated as same
   * @param answer an answer item that could have part of the attributes set
   * @param completeAnswer an answer in the answer list that usually has more attributes set
   * @param item the lforms item that has the completeAnswer in the answer list
   * @private
   */
  areTwoAnswersSame(answer: any, completeAnswer: any, item: any): boolean {
    return CommonUtils.areTwoAnswersSame(answer, completeAnswer, item);
  }


  /**
   * Convert a string to a number
   * @param value string value
   * @param dataType the data type of the converted value. 'integer' or 'decimal'
   */
  str2num(value, dataType) {
    let newValue: number=null;
    if (dataType === "integer") {
      let intValue = parseInt(value)
      newValue = isNaN(intValue) ? null : intValue;
    }
    else if (dataType === "decimal") {
      let floatValue = parseFloat(value);
      newValue = isNaN(floatValue) ? null : floatValue;
    }

    return newValue;
  }


  /**
   * Check if a checkbox or radio button control should use vertical layout.
   * Returns true if it should use vertical layout, false if horizontal.
   * @param displayControl an object that controls the display of the selected template
   */
  getDisplayControlIsVertical(displayControl) {
    return displayControl?.answerLayout?.columns !== undefined
      && displayControl.answerLayout.columns !== '0';
  }


  /**
   * Get the aria-label for a control
   */
  getAriaLabel(item) {
    return item.prefix ? `${item.prefix} ${item.question}` : item.question;
  }
}
