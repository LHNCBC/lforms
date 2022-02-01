// A replacement for the TestUtil class written for the protractor tests.

export const TestUtil = {
  /**
   * Sends a sequence of keys to an element.
   */
  sendKeys: function (elem, textStr) {
    elem.type(textStr);
  },

  /**
   *  Clicks an add or remove button.
   * @param button a "element" from the protractor facade.
   */
  clickAddRemoveButton: function(button) {
    button.getCyElem().scrollIntoView();
    button.click();
  }
};
