var tp = require('./lforms_testpage.po.js');
describe('CDE form template', function() {

  // TBD
  // CDE to LForms converted needs to be updated to handle linkId correctly.

  // it('empty header should have a "lf-empty-question" class', function() {
  //
  //   tp.openBaseTestPage();
  //   tp.openFormByIndex(8);
  //   tp.openCDESampleForm();
  //
  //   var headerRow = element(by.css(".lf-empty-question.lf-section-header"));
  //   var EC = protractor.ExpectedConditions;
  //   browser.wait(EC.presenceOf(headerRow), 5000);
  //   expect(headerRow.isDisplayed()).toBe(true);
  //
  //   var headerLabel = element(by.css("label[for='//1']"));
  //   expect(headerLabel.getText()).toBe("");
  // });
  //
  //
  // it('question code has no links if it is set to be shown', function() {
  //
  //   tp.openBaseTestPage();
  //   tp.openCDESampleForm();
  //
  //   var titleCode = element(by.css(".lf-form-title .lf-item-code span"));
  //   expect(titleCode.getText()).toBe("[5603071e1c7581941db4dd50]");
  //   var titleCodeLink = element(by.css(".lf-form-title .lf-item-code a"));
  //   expect(titleCodeLink.isPresent()).toBe(false);
  //
  // });
});

