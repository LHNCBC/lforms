// Helper functions for the tests

var util = {
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
    let origStart = Def.Effect.Base.prototype.start;
    Def.Effect.Scroll.prototype.start = function(options) {
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
  }
}

module.exports = util;
