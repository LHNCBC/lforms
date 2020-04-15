var po = require('./addFormToPageTest.po');
var tp = require('./lforms_testpage.po');
var testUtil = require('./util');

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
    var minMax = [testUtil.getCurrentDTMString(-60000), testUtil.getCurrentDTMString(+60000)]; // -/+ a minute
    po.openPage();
    element(by.css('div.lf-dtm-picker-block > button.ui-datepicker-trigger')).click();
    element(by.css('div.lf-dtm-picker-block ul.datetime-picker-dropdown li span button')).click();
    expect(element(by.id('/type7/1')).getAttribute('value')).toBeGreaterThanOrEqual(minMax[0]);
    expect(element(by.id('/type7/1')).getAttribute('value')).toBeLessThanOrEqual(minMax[1]);
  });

  fdescribe('addFormToPage', function () {
    beforeEach(function(done) {
      po.openPage();
      // Pre-condition -- Form USSG-FHT should not be in formContainer
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") === -1');
      }, tp.WAIT_TIMEOUT_2);
      browser.driver.executeAsyncScript(
          "var callback = arguments[arguments.length - 1];" +
          "$.getJSON('/data/FHTData.json', function(FHTData) {window.FHTData = FHTData; callback();})"
      ).then(function() {
        done()
      });
    });

    it('should be able to called a second time with a new form for the same form '+
       'container', function() {
      // Now put form USSG-FHT on the page, using the variable name method
      // (FHTData).
      browser.driver.executeScript(
          "LForms.Util.addFormToPage('FHTData', 'formContainer');"
          );
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to take a form object',  function() {
      // Now put form USSG-FHT on the page, using the form object method
      browser.driver.executeScript(
          "LForms.Util.addFormToPage(FHTData, 'formContainer');"
      );
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to take a JSON form definition',  function() {
      // Now put form USSG-FHT on the page, using the form JSON string method
      browser.driver.executeScript(
          "LForms.Util.addFormToPage(JSON.stringify(FHTData), 'formContainer')"
      );
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to display a very nested form', function() {
      // AngularJS only supports a certain level of nesting of directives
      // calling directives, which limits the nesting level of forms.  We've
      // increased that limit via  $rootScopeProvider.digestTtl(...) and the
      // code below tests that at least one particular amount of nesting is handled.
      tp.loadFromTestData('very-nested-form.json'); // uses addFormToPage
      // Wait for addFormToPage to be done.
      browser.wait(function() {return browser.executeScript('return ' +
        'window.addFormToPageDone')}, 2000);
      // Make sure the error message div is blank
      expect($('#loadMsg').getText()).toBe('');
    });
  });
});
