import { TestPage } from "./lforms_testpage.po";
import { BuildTestPage } from "./buildTest.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';

// Run 'npm run build:elements' before running this test
// test/build_test.html uses a copy of the transpiled lhc-forms.es5.js in dist/webcomponent/lhc-forms.es5.js

describe('build test page', function() {
  let tp: TestPage; 
  let btp: BuildTestPage;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    btp = new BuildTestPage();
  });

  it('should have a drug name field that autocompletes', function() {
    btp.openPage();
    expect(btp.drugNameField.isDisplayed()).toBeTruthy();
    TestUtil.sendKeys(btp.drugNameField, 'ar');

    browser.wait(function() {
      return btp.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
  });
});
