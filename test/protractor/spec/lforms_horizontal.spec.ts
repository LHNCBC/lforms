import { TestPage } from "./lforms_testpage.po";
import { RxTerms } from "./rxterms.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('horizontal table', function() {

  let tp: TestPage; 
  let rxtermsForm: RxTerms;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    rxtermsForm = new RxTerms();
  });

  let addRemoveButtons = element.all(by.css('.lhc-float-button'));

  /**
   *  Waits until the given number of add/remove buttons are on the page.
   */
  function waitForButtonCount(numButtons) {
    browser.wait(function() {
       return addRemoveButtons.count().then(function(n) {
         return numButtons==n;
       })
    }, 3000);
  }

  it('should have one add button in the horizontal table when the form loads', function() {

    tp.LoadForm.openUSSGFHTHorizontal();

    // there is an add button
    expect(addRemoveButtons.get(2).isPresent()).toBe(true);
    expect(addRemoveButtons.get(2).getText()).toBe('+ Add another row of "This family member\'s history of disease"');
  });
  it('should have two remove buttons visible after the user adds a row', function() {

    TestUtil.clickAddRemoveButton(addRemoveButtons.get(2));
    waitForButtonCount(6);
    // the first row has a '-' button only
    expect(addRemoveButtons.get(2).getText()).toBe('-');

    // the second row has a '-' button
    expect(addRemoveButtons.get(3).getText()).toBe('-');
    // and an add button
    expect(addRemoveButtons.get(4).getText()).toBe('+ Add another row of "This family member\'s history of disease"');

  });
  it('should have three remove buttons visible after the user adds a row', function() {
    TestUtil.clickAddRemoveButton(addRemoveButtons.get(4));
    waitForButtonCount(7);
    // the first row has a '-' button only
    expect(addRemoveButtons.get(2).getText()).toBe('-');

    // the second row has a '-' button only
    expect(addRemoveButtons.get(3).getText()).toBe('-');

    // the third row has a '-' button
    expect(addRemoveButtons.get(4).getText()).toBe('-');
    // and an add button
    expect(addRemoveButtons.get(5).getText()).toBe('+ Add another row of "This family member\'s history of disease"');
  });

  it('should have the 2 rows after the user removes the 2nd row', function() {
    waitForButtonCount(7); // precondition
    TestUtil.clickAddRemoveButton(addRemoveButtons.get(3));
    waitForButtonCount(6);
    // the first row has a '-' button only
    expect(addRemoveButtons.get(2).getText()).toBe('-');

    // the second row has a '-' button
    expect(addRemoveButtons.get(3).getText()).toBe('-');
    // and an add button
    expect(addRemoveButtons.get(4).getText()).toBe('+ Add another row of "This family member\'s history of disease"');
  });

  it('should not lose focus when the options for an autocompleter change', function() {
    tp.LoadForm.openRxTerms();
    var drugNameField = rxtermsForm.drugName;
    drugNameField.click();
    TestUtil.sendKeys(drugNameField, 'aspercreme');
    browser.wait(function(){return tp.Autocomp.searchResults.isDisplayed()}, tp.WAIT_TIMEOUT_2);
    drugNameField.sendKeys(protractor.Key.ARROW_DOWN);
    drugNameField.sendKeys(protractor.Key.TAB);
    //browser.waitForAngular();
    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(
      rxtermsForm.strengthAndFormID);
  });

  it('should populate the RxCUI field on the RxTerms form', function() {
    // There was a bug where this did not happen when the strength value was
    // padded.
    // Continuing from the previous test...
    browser.wait(function(){return tp.Autocomp.searchResults.isDisplayed()}, tp.WAIT_TIMEOUT_2);
    var strengthField = rxtermsForm.strengthAndForm;
    strengthField.sendKeys(protractor.Key.ARROW_DOWN);
    strengthField.sendKeys(protractor.Key.TAB);
    //browser.waitForAngular();
    expect(strengthField.getAttribute('value')).toBe('10% Cream');
    expect(rxtermsForm.rxcui.getAttribute('value')).toBe('1101827');
  });

});
