describe('horizontal table', function() {
  var BLANK_GIF_DATAURL = 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw==';

  describe('should have BLANK_GIF_DATAURL', function() {
    browser.get('http://0.0.0.0:9001/test/directiveTest.html');
    browser.waitForAngular();
    it('in datepicker img tags', function() {
      expect(element.all(by.css('img.ui-datepicker-trigger'))
        .getAttribute('src')).toContain(BLANK_GIF_DATAURL);
    });
    it('in datepicker stop-sign image tag', function() {
      expect(element.all(by.css('img.stop-sign'))
        .getAttribute('src')).toContain(BLANK_GIF_DATAURL);
    });
  });

  it('should have one add button in the horizontal table when the form loads', function() {
    browser.get('http://0.0.0.0:9001/test/directiveTest.html');

    browser.waitForAngular();
    var hForm = element(by.css('#horizontal-form'));

    // there is an add button
    expect(element.all(by.css('.float-button')).get(2).isPresent()).toBe(true);
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe("Add another 'This family member's history of disease'");
  });

  it('should still have two remove buttons visible after the user adds a row', function() {

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

  describe('autocomp list inside lforms directive', function() {

    browser.get('http://0.0.0.0:9001/test/directiveTest.html');

    var listFieldID = '/54126-8/54132-6/1/1'; // "Were you born a twin?"
    var showPanel = $('.btn');
    var searchResults = $('#searchResults');

    it('should be visible after the user clicks in a field', function() {
      var listField = element(by.id(listFieldID));
      browser.wait(function() {
        return listField.isDisplayed();
      }, 10000);
      listField.click();
      browser.wait(function() {
        return searchResults.isDisplayed();
      }, 10000);
      expect(searchResults.isDisplayed()).toBeTruthy();
    });
  });
});

describe('checkbox controlled by templateOption in the form data: ', function() {
  browser.get('http://0.0.0.0:9001/test/directiveTest.html');
  browser.waitForAngular();
  var loadForm1 = 'load1';
  var loadForm2 = 'load2';

  it('default value of the checkboxes should not be checked', function() {
    var checkboxes = element.all(by.css('div.checkbox > label > input[type="checkbox"]'));
    expect(checkboxes.get(0).isSelected()).toBe(false);
    expect(checkboxes.get(1).isSelected()).toBe(false);
    expect(checkboxes.get(2).isSelected()).toBe(false);

  });

  it('2 checkboxes should be checked on form 1', function() {

    element(by.id(loadForm2)).click();
    browser.waitForAngular();
    var checkboxes = element.all(by.css('div.checkbox > label > input[type="checkbox"]'));
    expect(checkboxes.get(0).isSelected()).toBe(true);
    expect(checkboxes.get(1).isSelected()).toBe(true);
    expect(checkboxes.get(2).isSelected()).toBe(false);

    // and the question code is displayed
    var code = element(by.css('a[href="http://s.details.loinc.org/LOINC/54126-8.html"]'));
    expect(code.isDisplayed()).toBe(true);
  });

  it('no checkboxes should be checked on form 1', function() {
    element(by.id(loadForm1)).click();
    browser.waitForAngular();
    var checkboxes = element.all(by.css('div.checkbox > label > input[type="checkbox"]'));
    expect(checkboxes.get(0).isSelected()).toBe(false);
    expect(checkboxes.get(1).isSelected()).toBe(false);
    expect(checkboxes.get(2).isSelected()).toBe(false);
    // and the question code is displayed
    var code = element(by.css('a[href="http://s.details.loinc.org/LOINC/54126-8.html"]'));
    expect(code.isDisplayed()).toBe(false);
  });

});

