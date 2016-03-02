var po = require('./buildTest.po');
describe('build test page', function() {
  fit('should have a drug name field that autocompletes', function() {
    po.openPage();
    expect(po.drugNameField.isDisplayed()).toBeTruthy();
    po.drugNameField.sendKeys('ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, 5000);
  });
});
