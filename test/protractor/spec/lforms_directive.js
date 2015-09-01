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

    // the first row on the horizontal table has a '+' button
    expect(element.all(by.css('.float-button')).get(2).isPresent()).toBe(true);
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('+');
  });
  it('should have the 2nd add button visible after the user adds a row', function() {

    element.all(by.css('.float-button')).get(2).click();

    browser.waitForAngular();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');

    // the second row has a '-' button and  a '+' button
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe('+');

  });
  it('should have the 3nd add button visible after the user adds a row', function() {
    element.all(by.css('.float-button')).get(4).click();

    browser.waitForAngular();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');

    // the second row has a '-' button only
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');

    // the third row has a '-' button and  a '+' button
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe('-');
    expect(element.all(by.css('.float-button')).get(5).getText()).toBe('+');
  });
  it('should have the 2 rows after the user removes the 2nd row', function() {
    element.all(by.css('.float-button')).get(3).click();

    browser.waitForAngular();
    // the first row has a '-' button only
    expect(element.all(by.css('.float-button')).get(2).getText()).toBe('-');


    // the second row has a '-' button and  a '+' button
    expect(element.all(by.css('.float-button')).get(3).getText()).toBe('-');
    expect(element.all(by.css('.float-button')).get(4).getText()).toBe('+');
  });

  describe('autocomp list inside lforms directive', function() {

    browser.get('http://0.0.0.0:9001/test/directiveTest.html');

    var listFieldID = '/54126-8/54128-4/1/1'; // "Were you adopted?"
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
