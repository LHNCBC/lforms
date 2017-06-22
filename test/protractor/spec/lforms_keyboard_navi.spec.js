var tp = require('./lforms_testpage.po.js');
describe('keyboard navigation', function() {

  it('should have one add button in the horizontal table when the form loads', function() {
    tp.openUSSGFHTHorizontal();
    // there is an add button
    expect(element.all(by.css('.lf-float-button')).get(2).isPresent()).toBe(true);
    expect(element.all(by.css('.lf-float-button')).get(2).getText()).toBe('+ Add another "This family member\'s history of disease"');
  });

  it('should move around the lists and the tables by using ctrl-arrow keys', function() {
    // get the name field
    var eleName = element(by.id('/54126-8/54125-0/1/1'));
    var eleGender = element(by.id('/54126-8/54131-8/1/1'));
    var eleDOB = element(by.id('/54126-8/21112-8/1/1'));

    var eleEthnicity = element(by.id('/54114-4/54120-1/1/1'));
    var eleRace = element(by.id('/54114-4/54119-3R/1/1'));

    var eleDisease1 = element(by.id('/54114-4/54117-7/54116-9/1/1/1'));
    var eleAgeAtD1 = element(by.id('/54114-4/54117-7/54115-1/1/1/1'));
    var eleBMI1 = element(by.id('/54114-4/54117-7/39156-5/1/1/1'));

    // test arrow keys on a list
    eleName.click();
    // down
    eleName.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleGender.getAttribute('id'));
    // down
    eleGender.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDOB.getAttribute('id'));
    // up
    eleDOB.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_UP);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleGender.getAttribute('id'));
    // left
    eleGender.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleName.getAttribute('id'));
    // left on 1st
    eleName.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleName.getAttribute('id'));
    // up on 1st
    eleName.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_UP);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleName.getAttribute('id'));
    // right
    eleName.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_RIGHT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleGender.getAttribute('id'));

    // add a 2nd row
    element.all(by.css('.lf-float-button')).get(2).click();
    // the first row has a '-' button only
    expect(element.all(by.css('.lf-float-button')).get(2).getText()).toBe('-');
    // the second row has a '-' button
    expect(element.all(by.css('.lf-float-button')).get(3).getText()).toBe('-');
    // and an add button
    expect(element.all(by.css('.lf-float-button')).get(4).getText()).toBe('+ Add another "This family member\'s history of disease"');

    var eleDisease2 = element(by.id('/54114-4/54117-7/54116-9/1/2/1'));
    var eleAgeAtD2 = element(by.id('/54114-4/54117-7/54115-1/1/2/1'));
    var eleBMI2 = element(by.id('/54114-4/54117-7/39156-5/1/2/1'));

    // test arrow keys on a table
    eleEthnicity.click();
    // down to table
    eleEthnicity.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease1.getAttribute('id'));
    // up to outside
    eleDisease1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_UP);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleEthnicity.getAttribute('id'));
    // right to table
    eleEthnicity.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_RIGHT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease1.getAttribute('id'));
    // left to outside
    eleDisease1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleEthnicity.getAttribute('id'));
    // down to table
    eleEthnicity.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease1.getAttribute('id'));
    // down to 2nd row
    eleDisease1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease2.getAttribute('id'));
    // right to 2nd column
    eleDisease2.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_RIGHT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleAgeAtD2.getAttribute('id'));
    // up to 1st row
    eleAgeAtD2.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_UP);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleAgeAtD1.getAttribute('id'));
    // left to 1st column
    eleAgeAtD1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease1.getAttribute('id'));

    // down to outside
    eleDisease1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease2.getAttribute('id'));
    eleDisease2.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_DOWN);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleRace.getAttribute('id'));

    // left to table
    eleRace.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleBMI2.getAttribute('id'));
    // right to outside
    eleBMI2.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_RIGHT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleRace.getAttribute('id'));

    // left to table
    eleRace.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleBMI2.getAttribute('id'));

    // up to 1st row
    eleBMI2.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_UP);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleBMI1.getAttribute('id'));

    // right to 1st column of 2nd row
    eleBMI1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_RIGHT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleDisease2.getAttribute('id'));

    // left to last column of 1nd row
    eleDisease2.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_LEFT);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleBMI1.getAttribute('id'));

    // up to outside
    eleBMI1.sendKeys(protractor.Key.CONTROL,protractor.Key.ARROW_UP);
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(eleEthnicity.getAttribute('id'));



  });

});
