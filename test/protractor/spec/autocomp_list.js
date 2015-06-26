describe('autocomp list', function() {

  var listFieldID = '/54126-8/54128-4/1/1'; // "Were you adopted?"
  var showPanel = $('.btn');
  var searchResults = $('#searchResults');
  var formSearch = $('#s2id_loinc_num1 a');
  var raceFieldID = '/54126-8/54134-2/1/1';
  var raceField = element(by.id(raceFieldID));
  var dp = require('./demopage');

  it('should not be visible when the form loads', function() {
    browser.get('http://0.0.0.0:9001/');
    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    $('.select2-result:first-of-type').click();
    $('.btn').click();
    var listField = element(by.id(listFieldID));
    browser.wait(function() {
      return listField.isDisplayed();
    }, 10000);
    expect(searchResults.isDisplayed()).toBeFalsy();
  });
  it('should be visible after the user clicks in a field', function() {
    var listField = element(by.id(listFieldID));
    listField.click();
    browser.wait(function() {
      return searchResults.isDisplayed();
    }, 10000);
    expect(searchResults.isDisplayed()).toBeTruthy();
  });
  it('should work with multiple-select fields', function() {
    expect(raceField.isDisplayed()).toBeTruthy();
    expect(browser.driver.executeScript('return typeof jQuery(document.getElementById("/54126-8/54134-2/1/1"))[0].autocomp')).toBe('object');
  });

  it('should interoperate with score rules', function() {
    // The data model needs to be correctly updated
    // when the user enters a new value.
    browser.get('http://0.0.0.0:9001/');
    formSearch.click();
    var glasgow = $('.select2-result:nth-child(4)');
    glasgow.click();
    showPanel.click();
    var eyeField = element(by.id('/9267-6/1'));
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
    expect(eyeField.getAttribute('value')).toBe("3. Eye opening to verbal command");
    expect(scoreField.getAttribute('value')).toEqual('3');

    // Try the 4th answer, which has a null label
    eyeField.click();
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    eyeField.sendKeys(protractor.Key.TAB);
    expect(eyeField.getAttribute('value')).toBe("Eyes open spontaneously");
    expect(scoreField.getAttribute('value')).toEqual('4');
  });


  it('should receive default values set via defaultAnswer', function() {
    dp.openFullFeaturedForm();
    var ff = require('./fullFeaturedForm');
    expect(ff.cneField.getAttribute('value')).toEqual('Answer 2');
  });

});
