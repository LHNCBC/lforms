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
  },


  /**
   *  Waits for an element to not be present on the page.
   * @param elem an "element" from the protractor facade.
   */
  waitForElementNotPresent: function(elem) {
    elem.getCyElem().should('not.exist');
  },


  /**
   *  Waits for an element to be present on the page.
   * @param elem an "element" from the protractor facade.
   */
  waitForElementPresent: function(elem) {
    elem.getCyElem().should('exist');
  },

  /**
   *  Waits for an element to have the given value.
   * @param elem an "element" from the protractor facade.
   * @param val the value to wait for
   */
  waitForValue: function(elem, val) {
    elem.getCyElem().should('have.value', val);
  },


  /**
   * Wait for the externally linked FHIR libraries to be loaded.
   */
  waitForFHIRLibsLoaded() {
    cy.window().then(win => {
      let LForms = win.LForms;
      expect(typeof(LForms.FHIR) === "object" && typeof(LForms.FHIR.R4) === "object" && typeof(LForms.FHIR.STU3) === "object").to.be.true;
    });
  },


  /**
   * Get the datetime string in DTM picker's default format for the current time with the given offset.
   * @param offsetMS the offset from the current time, in milliseconds, optional.
   *        Use a negative offset for past time, positive for future, zero or unspecified for "current"
   * @return the datetime string in the DTM datetime picker's default format (MM/DD/YYYY HH:MM).
   */
  getCurrentDTMString: function(offsetMS) {
    offsetMS = offsetMS || 0;
    var date = new Date(new Date().getTime() + offsetMS);
    return [
      (101 + date.getMonth()).toString().substr(1),
      (100 + date.getDate()).toString().substr(1),
      (10000 + date.getFullYear()).toString().substr(1)].join('/')
      + ' ' +
      [(100 + date.getHours()).toString().substr(1),
      (100 + date.getMinutes()).toString().substr(1), "00"].join(':');
  }

};
