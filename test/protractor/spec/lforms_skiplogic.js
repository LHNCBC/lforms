describe('skip logic', function() {

  it('entire section should hide and show', function() {
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

    var src = element(by.id('/slSource1/1')),
        t1 = element(by.id('/slTargetItem1/1')),
        t2 = element(by.id('/slTargetItem2/1')),
        t4 = element(by.id('/slTargetHeader1/slTargetSubItem1/1/1')),
        t5 = element(by.id('/slTargetHeader1/slTargetSubItem2/1/1'));

    // initially all hidden
    browser.waitForAngular();
    expect(t1.isDisplayed()).toBe(false);
    expect(t2.isDisplayed()).toBe(false);
    expect(t4.isDisplayed()).toBe(false);
    expect(t5.isDisplayed()).toBe(false);


    src.sendKeys('1');
    browser.waitForAngular();
    expect(t1.isDisplayed()).toBe(true);
    expect(t4.isDisplayed()).toBe(true);
    expect(t5.isDisplayed()).toBe(true);

    src.clear();
    src.sendKeys('2');
    browser.waitForAngular();
    expect(t1.isDisplayed()).toBe(false);
    expect(t2.isDisplayed()).toBe(true);
    expect(t4.isDisplayed()).toBe(true);
    expect(t5.isDisplayed()).toBe(true);

    src.clear();
    src.sendKeys('6');
    browser.waitForAngular();
    expect(t1.isDisplayed()).toBe(false);
    expect(t2.isDisplayed()).toBe(true);
    expect(t4.isDisplayed()).toBe(false);
    expect(t5.isDisplayed()).toBe(false);

  });
});