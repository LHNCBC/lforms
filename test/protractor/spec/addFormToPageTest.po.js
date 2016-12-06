function AddFormToPageTestPage() {
  // This page has two LForms forms.

  var rxtermsForm = require('./rxterms.fo.js');
  // Fields on the RxTerms Demo form
  this.rxDrugNameField = rxtermsForm.drugName;
  this.searchResults = element(by.id('searchResults'));

  // Fields on the "full featured" form
  this.ffDrugNameFieldID = '/dataControlExamples/itemWithExtraData/1/1';
  this.ffDrugNameField = element(by.id('/dataControlExamples/itemWithExtraData/1/1'));

  /**
   * Opens the test page.
   */
  this.openPage = function() {
    var conf = require('../conf').config;
    browser.get(conf.baseUrl + '/test/addFormToPageTest.html');
    browser.ignoreSynchronization = true;
    browser.driver.wait(protractor.until.elementLocated(By.id(this.ffDrugNameFieldID)), 10000);
  };

}

module.exports = new AddFormToPageTestPage();
