//NEXT:  Repurposed. this is now for concatecated es5 js files in the /dist/webcomponent directory
import { config } from "../protractor.conf.js";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';

export class BuildTestPage {
  drugNameField = element(by.id('/dataControlExamples/itemWithExtraData/1/1'));
  searchResults = element(by.id('searchResults'));

  /**
   * Opens the test page.
   */
  openPage() {
    browser.get(config.baseUrl + '/test/build_test.html');
  }
}

