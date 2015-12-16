var tp = require('./lforms_testpage.po.js');
describe('CDE form template', function() {

  it('should hide empty section header', function() {

    tp.openBaseTestPage();
    tp.openFormByIndex(9);

    var headerLabel = element(by.css("label[for='//1']"));
    expect(headerLabel.isDisplayed()).toBe(false);

  });

  it('should have no OBR section', function() {

    var whereDone = element(by.id('date_done'));
    expect(whereDone.isPresent()).toBe(false);

  });
});
