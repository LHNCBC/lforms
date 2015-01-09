describe('autocomp list', function() {
  var listFieldID = '#ac4'; // "Were you adopted?"
  var showPanel = $('.btn');
  var searchResults = $('#searchResults');
  it('should not be visible when the form loads', function() {
    browser.get('http://0.0.0.0:9001/');
    var formSearch = $('#s2id_loinc_num1 a');
    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    $('.select2-result:first-of-type').click();
    $('.btn').click();
    var listField = $(listFieldID);
    browser.wait(function() {
      return listField.isDisplayed();
    }, 10000);
    expect(searchResults.isDisplayed()).toBeFalsy();
  });
  it('should be visible after the user clicks in a field', function() {
    var listField = $(listFieldID);
    listField.click();
    browser.wait(function() {
      return searchResults.isDisplayed();
    }, 10000);
    expect(searchResults.isDisplayed()).toBeTruthy();
  });
  it('should interoperate with score rules', function() {
    // The data model needs to be correctly updated
    // when the user enters a new value.
    browser.get('http://0.0.0.0:9001/');
    var formSearch = $('#s2id_loinc_num1 a');
    formSearch.click();
    var glasgow = $('.select2-result:last-child');
    glasgow.click();
    showPanel.click();
    var eyeField = $('#ac2');
    browser.wait(function() {
      return eyeField.isDisplayed();
    }, 10000);
    eyeField.click();
    browser.wait(function() {
      return searchResults.isDisplayed();
    }, 10000);
    // Check pre-condition
    var scoreField = $('input[name="GCS total"]');
    expect(scoreField.getAttribute('value')).toEqual('0');
    // Click first item in list, and then the score field to send the change
    // event.
    $('#searchResults li:first-child').click();
    scoreField.click();
    expect(scoreField.getAttribute('value')).toEqual('1');
    // Now try using keystrokes to select the third item.
    eyeField.click();
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.TAB);
    expect(scoreField.getAttribute('value')).toEqual('3');
  });
});
