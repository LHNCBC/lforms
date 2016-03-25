var tp = require('./lforms_testpage.po.js');
describe('CDE form template', function() {

  it('empty header should have an "empty-question" class', function() {

    tp.openBaseTestPage();
    tp.openFormByIndex(8);

    var headerRow = element(by.css(".empty-question.section-header"));
    expect(headerRow.isDisplayed()).toBe(true);

    var headerLabel = element(by.css("label[for='//1']"));
    expect(headerLabel.getText()).toBe("");
  });


  it('question code has no links if it is set to be shown', function() {

    tp.openBaseTestPage();
    tp.openFormByIndex(8);

    var titleCode = element(by.css(".lf-form-title .item-code span"));
    expect(titleCode.getText()).toBe("[5603071e1c7581941db4dd50]");
    var titleCodeLink = element(by.css(".lf-form-title .item-code a"));
    expect(titleCodeLink.isPresent()).toBe(false);

  });
});

