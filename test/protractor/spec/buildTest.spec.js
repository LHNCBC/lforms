var po = require('./buildTest.po');
var tp = require('./lforms_testpage.po');
var testUtil = require('./util.js');

describe('build test page', function() {
  it('should have a drug name field that autocompletes', function() {
    po.openPage();
    expect(po.drugNameField.isDisplayed()).toBeTruthy();
    testUtil.sendKeys(po.drugNameField, 'ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
  });
});
