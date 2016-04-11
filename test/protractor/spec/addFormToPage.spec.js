var po = require('./addFormToPageTest.po');
describe('addFormToPage test page', function() {
  it('should have two forms on the page', function() {
    po.openPage();
    element.all(by.tagName('lforms')).then(function (items) {
      expect(items.length).toBe(2);
    });
  });

  it('should have a drug name field in the RxTerms form', function() {
    expect(po.rxDrugNameField.isDisplayed()).toBeTruthy();
    po.rxDrugNameField.sendKeys('ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, 5000);
  });


  it('should have a drug name field in the "full featured" form', function() {
    po.ffDrugNameField.click();
    expect(po.searchResults.isDisplayed()).toBeFalsy();
    expect(po.ffDrugNameField.isDisplayed()).toBeTruthy();
    po.ffDrugNameField.sendKeys('ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, 5000);
  });
});


describe('addFormToPage', function () {
  it('should be able to called a second time with a new form for the same form '+
     'container', function() {
    po.openPage();
    // Pre-condition -- Form USSG-FHT should not be in formContainer
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.not(EC.textToBePresentInElement($('#formContainer'),
      'USSG-FHT')), 1000);
    // Now put form USSG-FHT on the page
    browser.driver.executeScript(
      'WidgetUtil.addFormToPage("FHTData", "formContainer")');
    // Confirm it is there
    browser.wait(EC.textToBePresentInElement($('#formContainer'), 'USSG-FHT'), 1000);
  });
});
