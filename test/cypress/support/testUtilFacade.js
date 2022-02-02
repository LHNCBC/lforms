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
   * @param button an "element" from the protractor facade.
   */
  clickAddRemoveButton: function(button) {
    button.getCyElem().scrollIntoView();
    button.click();
  },


  /**
   *  Returns the given attribute value.
   * @param elem an "element" from the protractor facade.
   * @param attrName the attribute name
   */
  getAttribute: function(elem, attrName) {
    let rtn;
    if (attrName === 'value') {
      rtn = elem.getCyElem().invoke('val');
    }
    else
      rtn = elem.getCyElem().invoke('attr', attrName);
    return rtn;
  }


};
