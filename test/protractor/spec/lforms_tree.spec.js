describe('tree lines', function() {

  it('should show the last items correctly as a sub-items', function() {
    browser.get('http://0.0.0.0:9001/');
    //var formSearch = $('#s2id_loinc_num1 a');
    var formSearch = element(by.css('#s2id_loinc_num1 a'));

    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    //$('.select2-result:nth-of-type(2)').click();
    element(by.css('.select2-result:nth-of-type(6)')).click();
    //$('.btn').click();
    element(by.css('.btn')).click();

    browser.waitForAngular();

    var treeItem1 = element(by.id('/questionHeaderC/answersC/textC/1/1/1')),
        treeItem2 = element(by.id('/questionHeaderC/formulaC/1/1'));

    expect(treeItem1.isDisplayed()).toBe(true);
    expect(treeItem2.isDisplayed()).toBe(true);

  });
});