// Helper functions for the tests

var util = {
  /**
   *  Returns a function that returns a promise for the given element.
   * @param elemLoc either a string for the ID of an element or a protractor
   *  locator.
   */
  elementFactory: function (elemLoc) {
    if (typeof elemLoc === 'string')
      elemLoc = by.id(elemLoc);
    return function () {
      return element(elemLoc);
    }
  },


  /**
   *  Waits for the a field to have the given value.
   * @param field a protractor element locator (e.g. returned by $)
   * @param value the value to wait for
   */
  waitForValue: function (field, value) {
    return browser.wait(function() {
      return field.getAttribute('value').then(function(val) {
        return val === value;
      })
    }, 5000);// Debugging: .then(function() {console.log("got "+value)}, function() {console.log("didn't get "+value)});
  },


  /**
   *  The selenium sendKeys function sends events for each character and the
   *  result is not stable, so we use this instead.  Only the key events for the
   *  last character are sent.
   * @param field a protractor element locator (e.g. returned by $)
   * @param str the value (either a string or a number)
   */
  sendKeys: function(field, str) {
    str = '' + str; // convert numbers to strings
    field.getAttribute('value').then(function(oldVal) {
      var allButLastChar = oldVal+str.slice(0,-1);
      browser.executeScript('arguments[0].value = "'+allButLastChar+'"',
        field.getWebElement()).then(function success() {
          util.waitForValue(field, allButLastChar);
          field.sendKeys(str.slice(-1));
          util.waitForValue(field, oldVal+str);
        }, function rejected() {
          // For type=file, you can't set the value programmatically.  I think
          // protractor does something special.  Also, the value starts with
          // something like C:\fakepath for reason, so just let
          // protractor handle it.
          field.sendKeys(str);
        });
      });
  },


  /**
   *  The selenium clearField function does not wait for the field to be cleared
   *  before the next field runs (https://stackoverflow.com/a/43616117) so we
   *  use this instead.
   * @param field a protractor element locator (e.g. returned by $)
   */
  clearField: function(field) {
    field.clear();
    this.waitForValue(field, '');
  },


  /**
   *  Erases the value in the given field.  Leaves the focus in the
   *  field afterward (unlike clearField, which uses the protractor API which
   *  does something to the focus.
   */
  eraseField: function(field) {
    field.click();
    field.sendKeys(protractor.Key.CONTROL, 'a'); // select all
    field.sendKeys(protractor.Key.BACK_SPACE); // clear the field
    this.waitForValue(field, '');
  },


  /**
   *  Clicks the given add/remove repeating item button, and sleeps a bit to let the page stop moving.
   */
  clickAddRemoveButton: function (button) {
    browser.executeScript('arguments[0].scrollIntoView({behavior: "instant"})',
      button.getWebElement());
    browser.sleep(300); // allow page to scroll or adjust
    button.click();
    browser.sleep(300); // allow page to scroll or adjust
  },

  /**
   *  Waits for the given element to be present on the page.
   */
  waitForElementPresent: function(elem) {
    browser.wait(function(){return browser.isElementPresent(elem)}, 30000);
  },

  /**
   *  Waits for the given element to not be present on the page.
   */
  waitForElementNotPresent: function(elem) {
    var EC = protractor.ExpectedConditions;
    browser.wait(function(){return EC.not(browser.isElementPresent(elem))}, 3000);
  },

  /**
   *  Waits for the given element to be displayed on the page.
   */
  waitForElementDisplayed: function(elem) {
    // Make sure it is displayed first.
    util.waitForElementPresent(elem);
    browser.wait(function(){return elem.isDisplayed()}, 3000);
  },

  /**
   *  Disables Autocompleter scrolling (by making the move immediate).
   */
  disableAutocompleterScroll: function() {
    let origStart = LForms.Def.Effect.Base.prototype.start;
    LForms.Def.Effect.Scroll.prototype.start = function(options) {
      options.duration = 0;
      origStart.call(this, options);
    }
  },

  /**
   *  Disables CSS animation.
   */
  disableCssAnimate: function() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '* {' +
      '-webkit-transition: none !important;' +
      '-moz-transition: none !important;' +
      '-o-transition: none !important;' +
      '-ms-transition: none !important;' +
      'transition: none !important;'
      '}';
    document.getElementsByTagName('head')[0].appendChild(style);
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
      (100 + date.getMinutes()).toString().substr(1)].join(':');
  }
};

module.exports = util;
