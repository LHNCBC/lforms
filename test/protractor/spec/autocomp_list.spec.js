"use strict";
describe('autocomp list', function() {

  var tp = require('./lforms_testpage.po.js');
  var ff = tp.Autocomp;
  it('should not be visible when the form loads', function() {
    tp.openUSSGFHTVertical();
    expect(ff.searchResults.isDisplayed()).toBeFalsy();
  });

  it('should be visible after the user clicks in a field', function() {
    ff.listField.click();
    browser.wait(function() {
      return ff.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_2);
    //browser.sleep(tp.WAIT_TIMEOUT_1);
    expect(ff.searchResults.isDisplayed()).toBeTruthy();
  });

  it('should work with multiple-select fields', function() {
    expect(ff.raceField.isDisplayed()).toBeTruthy();
    expect(browser.driver.executeScript('return typeof jQuery(document.getElementById("/54126-8/54134-2/1/1"))[0].autocomp')).toBe('object');
  });

  it('should interoperate with score rules', function() {
    // The data model needs to be correctly updated
    // when the user enters a new value.
    tp.openGlasgowForm();

    browser.wait(function() {
      return ff.eyeField.isDisplayed();
    }, tp.WAIT_TIMEOUT_2);
    ff.eyeField.click();
    browser.wait(function() {
      return ff.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_2);
    // Check pre-condition
    expect(ff.scoreField.getAttribute('value')).toEqual('0');
    // Click first item in list, and then the score field to send the change
    // event.
    $('#searchResults li:first-child').click();
    ff.scoreField.click();
    expect(ff.scoreField.getAttribute('value')).toEqual('1');
    // Now try using keystrokes to select the third item.
    ff.eyeField.click();
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.TAB);
    expect(ff.eyeField.getAttribute('value')).toBe("3. Eye opening to verbal command - 3");
    expect(ff.scoreField.getAttribute('value')).toEqual('3');

    // Try the 4th answer, which has a null label
    ff.eyeField.click();
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.ARROW_DOWN);
    ff.eyeField.sendKeys(protractor.Key.TAB);
    expect(ff.eyeField.getAttribute('value')).toBe("4. Eyes open spontaneously - 4");
    expect(ff.scoreField.getAttribute('value')).toEqual('4');
  });

  it('should receive default values set via defaultAnswer', function() {
    tp.openFullFeaturedForm();
    expect(tp.FullFeaturedForm.cneField.getAttribute('value')).toEqual('Answer 2');
  });


  it('should set column headers when specified', function() {
    tp.openHL7GeneticPanel();
    // Open the "simple variation" section
    var kindField = tp.HL7GeneticPanel.kindOfMutations;
    browser.wait(function() {
      return kindField.isDisplayed();
    }, tp.WAIT_TIMEOUT_2);
    kindField.click();
    kindField.sendKeys(protractor.Key.ARROW_DOWN);
    kindField.sendKeys(protractor.Key.TAB);

    // Bring up the variant ID search results list
    var varIDField = tp.HL7GeneticPanel.variantID;
    browser.wait(function() {
      return varIDField.isDisplayed();
    }, tp.WAIT_TIMEOUT_2);
    varIDField.click();
    varIDField.sendKeys('ar');

    // Confirm that the header row appears over the search results
    var searchRes = tp.Autocomp.searchResults;
    expect(searchRes.isPresent()).toBe(true);
    var EC = protractor.ExpectedConditions;
    browser.wait(function() {
      return searchRes.isDisplayed();
    }, tp.WAIT_TIMEOUT_2);
    // This test also checks the escaping of HTML tags
    expect($('#searchResults th:first-child').getText()).toBe('Variant ID <a>');
  });


  it('should autofill lists when there is just one item', function() {
    tp.openRxTerms();
    var rxterms = require('./rxterms.fo');
    tp.Autocomp.helpers.autocompPickFirst(rxterms.drugName, 'AZELEX');
    expect(rxterms.strengthAndForm.getAttribute('value')).toEqual('20% Cream');
  });

  it('should not display SeqNum on answers that one of them has a numeric value', function() {
    tp.openFullFeaturedForm();

    // no sequence number
    var numericAnswer = element(by.id('/numeric_answer/1'));
    numericAnswer.click();
    expect($('#searchResults #completionOptions ul li:first-child').getText()).toBe('1');
    expect($('#searchResults #completionOptions ul li:nth-child(2)').getText()).toBe('Answer 2');
    expect($('#searchResults #completionOptions ul li:nth-child(3)').getText()).toBe('Answer 3');

    // has sequence number
    var textAnswer = element(by.id('/type9/1'));
    textAnswer.click();
    expect($('#searchResults #completionOptions ul li:first-child').getText()).toBe('1:  Answer 1');
    expect($('#searchResults #completionOptions ul li:nth-child(2)').getText()).toBe('2:  Answer 2');
    expect($('#searchResults #completionOptions ul li:nth-child(3)').getText()).toBe('3:  Answer 3');


  });

});
