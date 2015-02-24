describe('horizontal table', function() {

  it('should have one add button in the horizontal table when the form loads', function() {
    browser.get('http://0.0.0.0:9001/');
    //var formSearch = $('#s2id_loinc_num1 a');
    var formSearch = element(by.css('#s2id_loinc_num1 a'));

    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    //$('.select2-result:nth-of-type(2)').click();
    element(by.css('.select2-result:nth-of-type(2)')).click();
    //$('.btn').click();
    element(by.css('.btn')).click();

    browser.waitForAngular();

    // the first row on the horizontal table has a '+' button
    expect(element.all(by.css('.float-button')).get(1).isPresent()).toBe(true);
    expect(element.all(by.css('.float-button')).get(1).getText()).toBe('+');
  });
  it('should have the 2nd add button visible after the user adds a row', function() {

    element.all(by.css('.float-button')).get(1).click();

    browser.waitForAngular();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(1).getText()).toBe('-');

    // the second row has a '-' button and  a '+' button
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('+');

  });
  it('should have the 3nd add button visible after the user adds a row', function() {
    element.all(by.css('.float-button')).get(3).click();

    browser.waitForAngular();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(1).getText()).toBe('-');

    // the second row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');

    // the third row has a '-' button and  a '+' button
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe('+');
  });
  it('should have the 2 rows after the user removes the 2nd row', function() {
    element.all(by.css('.float-button')).get(2).click();

    browser.waitForAngular();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(1).getText()).toBe('-');


    // the second row has a '-' button and  a '+' button
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('+');
  });
});
