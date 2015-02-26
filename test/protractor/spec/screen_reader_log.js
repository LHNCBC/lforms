describe('screen reader log', function() {

  var readerLog = $('#reader_log');
  var readerLogEntries = element.all(by.css('#reader_log p'));
  var formSearch = $('#s2id_loinc_num1 a');
  var showPanel = $('.btn');
  var searchResults = $('#searchResults');
  var heightField = element(by.id('/54126-8/8302-2/1/1'));


  it('should be empty when the form loads', function() {
    // This is not so much a requirement as a precondition
    // for subsequent tests.
    browser.get('http://0.0.0.0:9001/');
    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    $('.select2-result:nth-of-type(2)').click();
    showPanel.click();
    browser.wait(function() {
      return heightField.isDisplayed();
    }, 10000);
    // At this point the form is showing
    expect(readerLogEntries.getText()).toEqual([]);
  });
  it('should contain an entry when skip logic shows a field', function() {
    heightField.sendKeys('10');
    expect(readerLogEntries.getText()).toEqual(
      ['Showing Mock-up item: Shown when Height >= 10']);
  });
  it('should not add an extra entry if the field is already showing',
     function() {
    heightField.sendKeys('2');
    expect(readerLogEntries.getText()).toEqual(
      ['Showing Mock-up item: Shown when Height >= 10']);
  });
  it('should contain an entry when skip logic hides a field', function() {
    heightField.sendKeys(protractor.Key.BACK_SPACE);
    heightField.sendKeys(protractor.Key.BACK_SPACE);
    expect(readerLogEntries.getText()).toEqual(
      ['Showing Mock-up item: Shown when Height >= 10',
       'Hiding Mock-up item: Shown when Height >= 10']);
  });
  it('should not add an extra entry if the field is already hidden',
     function() {
    heightField.sendKeys(protractor.Key.BACK_SPACE);
    expect(readerLogEntries.getText()).toEqual(
      ['Showing Mock-up item: Shown when Height >= 10',
       'Hiding Mock-up item: Shown when Height >= 10']);
  });
  it('should add an entry when a section is added or removed', function () {
    // Reset the reader log
    browser.driver.executeScript(function() {$('reader_log').innerHTML = ''});
    expect(readerLogEntries.getText()).toEqual([]);
    // Add a section
    element(by.id('/54126-8/54137-5/1/1')).click();  // Add another 'Your Diseases History'
    expect(readerLogEntries.getText()).toEqual(['Added section']);
    // Remove the section
    element(by.css("button[title=\"Remove this'Your diseases history'\"]")).click();
    expect(readerLogEntries.getText()).toEqual(['Added section', 'Removed section']);
  });
  it('should add an entry when a row is added or removed', function () {
    // Reset the reader log
    browser.driver.executeScript(function() {$('reader_log').innerHTML = ''});
    expect(readerLogEntries.getText()).toEqual([]);
    // Add a row
    element(by.id('/54114-4/54117-7/1/1')).click();  // The + button on the table
    expect(readerLogEntries.getText()).toEqual(['Added row']);
    // Remove the row
    var minusButton = element(by.css(
      "button[title=\"Remove this row of 'This family member's history of disease'\"]"));
    minusButton.click();
    expect(readerLogEntries.getText()).toEqual(['Added row', 'Removed row']);
  });
});
