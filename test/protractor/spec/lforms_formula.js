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
        heightUnit1 = element(by.id('ac15')),
        weightUnit1 = element(by.id('ac16')),
        height2 = element(by.id('/54114-4/54117-7/8302-2/1/1/1')),
        weight2 = element(by.id('/54114-4/54117-7/29463-7/1/1/1')),
        bmi2 = element(by.id('/54114-4/54117-7/39156-5/1/1/1'));

    browser.waitForAngular();

    // check bmi1
    height1.sendKeys("70");
    expect(bmi1.getVal().toBe(""));
    weight1.sendKeys("170");
    expect(bmi1.getVal().toBe("24.39"));
    height1.clear();
    height1.sendKeys("80");
    expect(bmi1.getVal().toBe("18.68"));

    // change height unit and check bmi1 again
    heightUnit1.click();
    browser.waitForAngular();
    // pick the 2nd item, centimeters
    heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    heightUnit1.sendKeys(protractor.Key.TAB);
    browser.waitForAngular();
    height1.clear();
    height1.sendKeys("170");
    expect(bmi1.getVal().toBe("16.68"));

    // change weight unit and check bmi1 again
    weightUnit1.click();
    browser.waitForAngular();
    // pick the 2nd item, kgs
    weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    weightUnit1.sendKeys(protractor.Key.TAB);
    weight1.clear();
    weight1.sendKeys("80");
    expect(bmi1.getVal().toBe("17.68"));

    // check bmi2
    height2.sendKeys("70");
    expect(bmi2.getVal().toBe(""));
    weight2.sendKeys("170");
    expect(bmi2.getVal().toBe("24.39"));
    height2.clear();
    height2.sendKeys("80");
    expect(bmi2.getVal().toBe("18.68"));
  });
});
