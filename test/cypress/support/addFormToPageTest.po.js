import { RxTerms } from "./rxterms.po";
import { TestPage } from "./lforms_testpage.po";
import {TestUtil} from "./testUtilFacade.js";
import {facadeExpect as expect, protractor, by, element, browser} from "../support/protractorFacade.js";

export class AddFormToPageTestPage {
  // This page has two LForms forms.

  rxtermsForm = new RxTerms();
  tp = new TestPage();
  // Fields on the RxTerms Demo form
  rxDrugNameField = this.rxtermsForm.drugName;
  searchResults = element(by.id('searchResults'));

  // Fields on the "full featured" form
  ffDrugNameFieldID = '/dataControlExamples/itemWithExtraData/1/1';
  ffDrugNameField = element(by.id(this.ffDrugNameFieldID));

  /**
   * Opens the test page.
   */
  openPage() {
    cy.visit('/test/pages/addFormToPageTest.html');
    TestUtil.waitForFHIRLibsLoaded();
  }

}

