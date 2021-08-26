var tp = require('./lforms_testpage.po.js');
describe('tree lines', function() {

  it('should show the last items correctly as a sub-items', function() {

    tp.openFormBuilder();
    var treeItem1 = element(by.id('/questionHeaderC/answersC/textC/1/1/1')),
        treeItem2 = element(by.id('/questionHeaderC/formulaC/1/1'));

    expect(treeItem1.isDisplayed()).toBe(true);
    expect(treeItem2.isDisplayed()).toBe(true);

  });
});
