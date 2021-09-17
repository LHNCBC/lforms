import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

let tp = new TestPage();
let LForms: any = (global as any).LForms;

  describe('form validation', function () {
    beforeAll(async () => {
      await browser.waitForAngularEnabled(false);
      tp.openBaseTestPage();
    });  


    it('DT data type should work', function () {

      tp.loadFromTestData('test-date-validation.json');

      let dtEl = element(by.id('/required_dt/1')).element(by.css("input"));
      let otherEl = element(by.id('/required_tx/1')); // Use for creating blur event
  
      let dateStr = '02/032019';
      dtEl.clear();
      TestUtil.sendKeys(dtEl, dateStr);
      otherEl.click();
      expect(dtEl.getAttribute("value")).toBe('')
      //expect(dtEl.getCssValue('border-color')).toEqual('rgb(255, 0, 0)'); // Red border
      
  
      dateStr = '02/03/2019';
      dtEl.clear();
      TestUtil.sendKeys(dtEl, dateStr);
      otherEl.click();
      expect(dtEl.getAttribute("value")).toEqual(dateStr);
      browser.sleep(10000)
      // expect(dtEl.getAttribute("class")).toContain('ng-valid'); 
    });
  

    // as of 09/16/2021,this test passed on firefox but not on linux chrome. Other tests in this file need to run with chrome to pass.
    fit('should validate when required inputs are entered', function () {

      tp.loadFromTestData('test-date-validation.json');

      const skipLogicTrigger = element(by.id('/sl_source_to_test_required/1'));
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      TestUtil.sendKeys(skipLogicTrigger, '1');

      let otherEl = element(by.id("/required_tx/1"))

      // Fill the required fields
      const dtEl = element(by.id('/required_dt/1')).element(by.css("input"));
      dtEl.clear()
      // this test does not work with chrome v93.0.4577.82 and/or its webdriver. "/" is not appearing in the field
      TestUtil.sendKeys(dtEl, '10/16/2020');  
      otherEl.click();
      const dtmEl = element(by.id('/required_dtm/1')).element(by.css("input"));
      // this test does not work with chrome v93.0.4577.82 and/or its webdriver. "/" is not appearing in the field
      TestUtil.sendKeys(dtmEl, '10/16/2020 16:00:00');
      otherEl.click()
      const txEl = element(by.id('/required_tx/1'));
      TestUtil.sendKeys(txEl, 'test');
      const stEl = element(by.id('/required_st/1'));
      TestUtil.sendKeys(stEl, 'test');
      const originalHiddenEl1 = element(by.id('/sl_target_to_test_required1/1'));
      TestUtil.sendKeys(originalHiddenEl1, 'test');
      const originalHiddenSubEl1 = element(by.id('/sl_target_header/sl_target_to_test_required/1/1'));
      TestUtil.sendKeys(originalHiddenSubEl1, 'test');

      const errors = browser.driver.executeScript('return LForms.Util.checkValidity()');
      expect(errors).toEqual(null);
    });
  });

