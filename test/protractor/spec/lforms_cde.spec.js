var tp = require('./lforms_testpage.po.js');
describe('CDE form template', function() {

  it('empty header should have an "empty-question" class', function() {

    tp.openBaseTestPage();
    tp.openFormByIndex(9);

    var headerRow = element(by.css(".empty-question.section-header"));
    expect(headerRow.isDisplayed()).toBe(true);

    var headerLabel = element(by.css("label[for='//1']"));
    expect(headerLabel.getText()).toBe("");
  });

});
