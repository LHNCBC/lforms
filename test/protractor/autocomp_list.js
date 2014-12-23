describe('autocomp list', function() {
  var listFieldID = '#ac4'; // "Were you adopted?"
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
    var searchResults = $('#searchResults');
    expect(searchResults.isDisplayed()).toBeFalsy();
  });
  it('should be visible after the user clicks in a field', function() {
    var listField = $(listFieldID);
    listField.click();
    var searchResults = $('#searchResults');
    browser.wait(function() {
      return searchResults.isDisplayed();
    }, 10000);
    expect(searchResults.isDisplayed()).toBeTruthy();
  });
});
