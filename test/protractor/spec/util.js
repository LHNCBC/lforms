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
