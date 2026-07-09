import { Injectable } from '@angular/core';

import CommonUtils from './lforms/lhc-common-utils.js';

type AnswerLayoutType = 'RADIO_CHECKBOX' | 'COMBO_BOX';

/**
 * Partial shape of the LForms displayControl object used by common UI helpers.
 */
export interface DisplayControl {
  answerLayout?: {
    type?: AnswerLayoutType | null;
    columns?: string;
  };
}

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
      const intValue = parseInt(value)
      newValue = isNaN(intValue) ? null : intValue;
    }
    else if (dataType === "decimal") {
      const floatValue = parseFloat(value);
      newValue = isNaN(floatValue) ? null : floatValue;
    }

    return newValue;
  }


  /**
   * Check if a checkbox or radio button control should use vertical layout.
   * Returns true if it should use vertical layout, false if horizontal.
   * @param displayControl an object that controls the display of the selected template
   */
  getDisplayControlIsVertical(displayControl: DisplayControl): boolean {
    return displayControl?.answerLayout?.columns === '1';
  }


  /**
   * Check if a checkbox or radio button control should use a grid layout.
   * @param displayControl an object that controls the display of the selected template
   */
  getDisplayControlIsGrid(displayControl: DisplayControl): boolean {
    return this.getDisplayControlColumnCount(displayControl) > 1;
  }


  /**
   * Get the number of answer columns requested by the display control.
   * @param displayControl an object that controls the display of the selected template
   */
  getDisplayControlColumnCount(displayControl: DisplayControl): number | null {
    const columns = displayControl?.answerLayout?.columns;
    const columnCount = parseInt(columns, 10);
    return Number.isInteger(columnCount) && columnCount > 1 ? columnCount : null;
  }


  /**
   * Get the preferred answer column width requested by the display control.
   * @param displayControl an object that controls the display of the selected template
   */
  getDisplayControlColumnWidth(displayControl: DisplayControl): string | null {
    const columnCount = this.getDisplayControlColumnCount(displayControl);
    return columnCount ? `${Math.round((100 / columnCount) * 100000) / 100000}%` : null;
  }


  /**
   * Get the aria-label for a control
   */
  getAriaLabel(item) {
    return item.prefix ? `${item.prefix} ${item.question}` : item.question;
  }
}
