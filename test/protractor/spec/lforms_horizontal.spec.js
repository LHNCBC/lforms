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

    // there is an add button
    expect(element.all(by.css('.float-button')).get(2).isPresent()).toBe(true);
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe("Add another 'This family member's history of disease'");
  });
  it('should have two remove buttons visible after the user adds a row', function() {

    element.all(by.css('.float-button')).get(2).click();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');

    // the second row has a '-' button
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');
    // and an add button
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe("Add another 'This family member's history of disease'");

  });
  it('should have three remove buttons visible after the user adds a row', function() {
    element.all(by.css('.float-button')).get(4).click();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');

    // the second row has a '-' button only
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');

    // the third row has a '-' button
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe('-');
    // and an add button
    expect(element.all(by.css('.float-button')).get(5).getText()).toBe("Add another 'This family member's history of disease'");
  });
  it('should have the 2 rows after the user removes the 2nd row', function() {
    element.all(by.css('.float-button')).get(3).click();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');

    // the second row has a '-' button
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');
    // and an add button
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe("Add another 'This family member's history of disease'");
  });
});
