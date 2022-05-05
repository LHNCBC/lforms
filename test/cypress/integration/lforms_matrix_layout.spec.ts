import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Form level Matrix layout', function() {
  let tp: TestPage; 
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
  });


  it('displays a radio matrix table', function() {
    tp.LoadForm.openMatrixLayout1();

    var item1answer1 = element(by.id('/g1m1/1c1')),
        item1answer2 = element(by.id('/g1m1/1c2')),
        item4answer1 = element(by.id('/g1m4/1c1')),
        item4answer4 = element(by.id('/g1m4/1c4'));

    // browser.wait(function() {
    //   return item1answer1.isDisplayed();
    // }, tp.WAIT_TIMEOUT_1);

    expect(item1answer1.isDisplayed()).toBe(true);
    expect(item4answer4.isDisplayed()).toBe(true);

    // first question
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value).toBe(undefined);
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })

    item1answer1.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value.code).toBe('c1');
      expect(formData.itemsData[0].value.text).toBe('Answer a');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })

    item1answer2.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value.code).toBe('c2');
      expect(formData.itemsData[0].value.text).toBe('Answer b');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })

    item4answer1.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value.code).toBe('c2');
      expect(formData.itemsData[0].value.text).toBe('Answer b');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value.code).toBe('c1');
      expect(formData.itemsData[3].value.text).toBe('Answer a');
    })
    item4answer4.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value.code).toBe('c2');
      expect(formData.itemsData[0].value.text).toBe('Answer b');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value.code).toBe('c4');
      expect(formData.itemsData[3].value.text).toBe('Answer d');
    })

  });

  it('displays a checkbox matrix table', function() {
    tp.LoadForm.openMatrixLayout2();

    var item1answer1 = element(by.id('/g1m1/1c1')),
        item1answer2 = element(by.id('/g1m1/1c2')),
        item1Other = element(by.id('/g1m1/1_other')),
        item1OtherValue = element(by.id('/g1m1/1_otherValue')),
        item4answer1 = element(by.id('/g1m4/1c1')),
        item4answer4 = element(by.id('/g1m4/1c4')),
        item4Other = element(by.id('/g1m4/1_other')),
        item4OtherValue = element(by.id('/g1m4/1_otherValue'));

    // browser.wait(function() {
    //   return item1answer1.isDisplayed();
    // }, tp.WAIT_TIMEOUT_1);

    expect(item1answer1.isDisplayed()).toBe(true);
    expect(item4answer4.isDisplayed()).toBe(true);

    // first question
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value).toBe(undefined);
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })

    item1answer1.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })

    item1answer2.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })

    item1Other.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[0].value[2].code).toBe(undefined);
      expect(formData.itemsData[0].value[2].text).toBe(null);
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })
    TestUtil.sendKeys(item1OtherValue, 'other values');
    TestUtil.waitForValue(item1OtherValue, 'other values');
    // for test only: trigger a change event
    item1OtherValue.sendKeys(protractor.Key.TAB);

    item1OtherValue.click().then(()=> {
      browser.driver.executeAsyncScript(function() {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getUserData();
        callback(fData);
      }).then(function(formData:any) {
        expect(formData.itemsData[0].value[0].code).toBe('c1');
        expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
        expect(formData.itemsData[0].value[1].code).toBe('c2');
        expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
        expect(formData.itemsData[0].value[2].code).toBe(undefined);
        expect(formData.itemsData[0].value[2].text).toBe('other values'); 
        expect(formData.itemsData[1].value).toBe(undefined);
        expect(formData.itemsData[2].value).toBe(undefined);
        expect(formData.itemsData[3].value).toBe(undefined);
      })
    })
    
    // change the other value alone will update the data model when the checkbox is checked.
    item1OtherValue.clear();
    TestUtil.sendKeys(item1OtherValue, 'other values again');
    // for test only: trigger a change event
    item1OtherValue.sendKeys(protractor.Key.TAB);
    
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[0].value[2].code).toBe(undefined);
      expect(formData.itemsData[0].value[2].text).toBe('other values again');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value).toBe(undefined);
    })
    // fourth question
    item4answer1.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[0].value[2].code).toBe(undefined);
      expect(formData.itemsData[0].value[2].text).toBe('other values again');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value[0].code).toBe('c1');
      expect(formData.itemsData[3].value[0].text).toBe('Answer 1');
    })
    item4answer4.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[0].value[2].code).toBe(undefined);
      expect(formData.itemsData[0].value[2].text).toBe('other values again');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value[0].code).toBe('c1');
      expect(formData.itemsData[3].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[3].value[1].code).toBe('c4');
      expect(formData.itemsData[3].value[1].text).toBe('Answer 4');
    })
    TestUtil.sendKeys(item4OtherValue, 'others');
    // model value does not change when the checkbox is not checked
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[0].value[2].code).toBe(undefined);
      expect(formData.itemsData[0].value[2].text).toBe('other values again');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value.length).toBe(2);
      expect(formData.itemsData[3].value[0].code).toBe('c1');
      expect(formData.itemsData[3].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[3].value[1].code).toBe('c4');
      expect(formData.itemsData[3].value[1].text).toBe('Answer 4');
    })

    // mode value changes after the checkbox is clicked
    item4Other.click();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData:any) {
      expect(formData.itemsData[0].value[0].code).toBe('c1');
      expect(formData.itemsData[0].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[0].value[1].code).toBe('c2');
      expect(formData.itemsData[0].value[1].text).toBe('Answer 2');
      expect(formData.itemsData[0].value[2].code).toBe(undefined);
      expect(formData.itemsData[0].value[2].text).toBe('other values again');
      expect(formData.itemsData[1].value).toBe(undefined);
      expect(formData.itemsData[2].value).toBe(undefined);
      expect(formData.itemsData[3].value.length).toBe(3);
      expect(formData.itemsData[3].value[0].code).toBe('c1');
      expect(formData.itemsData[3].value[0].text).toBe('Answer 1');
      expect(formData.itemsData[3].value[1].code).toBe('c4');
      expect(formData.itemsData[3].value[1].text).toBe('Answer 4');
      expect(formData.itemsData[3].value[2].code).toBe(undefined);
      expect(formData.itemsData[3].value[2].text).toBe('others');
    })
    // the value on the first question does not change

  });

});
