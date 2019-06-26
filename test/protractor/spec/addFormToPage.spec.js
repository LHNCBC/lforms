var po = require('./addFormToPageTest.po');
var tp = require('./lforms_testpage.po');

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
    }, tp.WAIT_TIMEOUT_1);
  });


  it('should have a drug name field in the "full featured" form', function() {
    po.ffDrugNameField.click();
    expect(po.searchResults.isDisplayed()).toBeFalsy();
    expect(po.ffDrugNameField.isDisplayed()).toBeTruthy();
    po.ffDrugNameField.sendKeys('ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
  });

  it('DTM datetime picker should work', function () {
    po.openPage();
    element(by.css('div.lf-dtm-picker-block > button.ui-datepicker-trigger')).click();
    element(by.css('div.lf-dtm-picker-block ul.datetime-picker-dropdown li span button')).click();
    expect(element(by.id('/type7/1')).getAttribute('value')).toBe(require('./test_utils').dtmTodayZeroHour());
  });

  describe('addFormToPage', function () {
    it('should be able to called a second time with a new form for the same form '+
       'container', function() {
      po.openPage();
      // Pre-condition -- Form USSG-FHT should not be in formContainer
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") === -1');
      }, tp.WAIT_TIMEOUT_2);
      // Now put form USSG-FHT on the page, using the variable name method
      // (FHTData).
      browser.driver.executeScript(
        'LForms.Util.addFormToPage("FHTData", "formContainer")');
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to take a form object',  function() {
      po.openPage();
      // Pre-condition -- Form USSG-FHT should not be in formContainer
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") === -1');
      }, tp.WAIT_TIMEOUT_2);
      // Now put form USSG-FHT on the page, using the form object method
      browser.driver.executeScript(
        'LForms.Util.addFormToPage(FHTData, "formContainer")');
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to take a JSON form definition',  function() {
      po.openPage();
      // Pre-condition -- Form USSG-FHT should not be in formContainer
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") === -1');
      }, tp.WAIT_TIMEOUT_2);
      // Now put form USSG-FHT on the page, using the form object method
      browser.driver.executeScript(
        'LForms.Util.addFormToPage(JSON.stringify(FHTData), "formContainer")');
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });
  });
});
