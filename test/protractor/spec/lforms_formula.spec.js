describe('formula', function() {

  it('Two BMI formulas should both work', function() {
    browser.get('http://0.0.0.0:9001/');
    var formSearch = element(by.css('#s2id_loinc_num1 a'));

    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    element(by.css('.select2-result:nth-of-type(1)')).click();
    element(by.css('.btn')).click();

    browser.waitForAngular();

    var height1= element(by.id('/54126-8/8302-2/1/1')),
        weight1 = element(by.id('/54126-8/29463-7/1/1')),
        bmi1 = element(by.id('/54126-8/39156-5/1/1')),
        heightUnit1 = element(by.id('ac1')),
        weightUnit1 = element(by.id('ac2')),
        height2 = element(by.id('/54114-4/54117-7/8302-2/1/1/1')),
        weight2 = element(by.id('/54114-4/54117-7/29463-7/1/1/1')),
        bmi2 = element(by.id('/54114-4/54117-7/39156-5/1/1/1'));

    // check bmi1
    height1.sendKeys("70");
    browser.waitForAngular();
    expect(bmi1.getAttribute('value')).toBe("");
    weight1.sendKeys("170");
    browser.waitForAngular();
    expect(bmi1.getAttribute('value')).toBe("24.39");
    height1.clear();
    browser.waitForAngular();
    height1.sendKeys("80");
    browser.waitForAngular();
    expect(bmi1.getAttribute('value')).toBe("18.68");

    // change height unit and check bmi1 again
    heightUnit1.click();
    browser.waitForAngular();
    // pick the 2nd item, centimeters
    heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    heightUnit1.sendKeys(protractor.Key.TAB);
    browser.waitForAngular();
    height1.clear();
    browser.waitForAngular();
    height1.sendKeys("170");
    browser.waitForAngular();
    expect(bmi1.getAttribute('value')).toBe("26.68");

    // change weight unit and check bmi1 again
    weightUnit1.click();
    // pick the 2nd item, kgs
    weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    weightUnit1.sendKeys(protractor.Key.TAB);
    weight1.clear();
    weight1.sendKeys("80");
    browser.waitForAngular();
    expect(bmi1.getAttribute('value')).toBe("27.68");

    // check bmi2
    height2.sendKeys("70");
    expect(bmi2.getAttribute('value')).toBe("");
    weight2.sendKeys("170");
    expect(bmi2.getAttribute('value')).toBe("24.39");
    height2.clear();
    height2.sendKeys("80");
    browser.waitForAngular();
    expect(bmi2.getAttribute('value')).toBe("18.68");
  });
});
