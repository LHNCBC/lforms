function BuildTestPage() {
  this.drugNameField = element(by.id('/dataControlExamples/itemWithExtraData/1/1'));
  this.searchResults = element(by.id('searchResults'));

  /**
   * Opens the test page.
   */
  this.openPage = function() {
    var conf = require('../conf').config;
    browser.get(conf.baseUrl + '/test/build_test.html');
  };
}

module.exports = new BuildTestPage();
