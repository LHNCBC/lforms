import { browser, element, by } from 'protractor';
import { RxTerms } from "./rxterms.po";
import { TestPage } from "./lforms_testpage.po";
import { config } from "../protractor.conf.js";
import { protractor } from 'protractor/built/ptor';
import TestUtil from "./util";

export class AddFormToPageTestPage {
  // This page has two LForms forms.

  rxtermsForm = new RxTerms();
  tp = new TestPage();
  // Fields on the RxTerms Demo form
  rxDrugNameField = this.rxtermsForm.drugName;
  searchResults = element(by.id('searchResults'));

  // Fields on the "full featured" form
  ffDrugNameFieldID = '/dataControlExamples/itemWithExtraData/1/1';
  ffDrugNameField = element(by.id('/dataControlExamples/itemWithExtraData/1/1'));

  /**
   * Opens the test page.
   */
  openPage() {
    browser.get(config.baseUrl + '/test/addFormToPageTest.html');
    TestUtil.waitForFHIRLibsLoaded()
    TestUtil.waitForElementPresent(element(by.id(this.ffDrugNameFieldID)))
  };

}

