import { browser, by, element } from 'protractor';

export class AppPage {

  /**
   * Navigate to the main page
   */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }


  /**
   * Scroll an element to the top of the page
   * @param ele a protractor element
   */
  scrollToTop(ele:any) {
    browser.executeScript('arguments[0].scrollIntoView(true)', ele.getWebElement());
    browser.sleep(300); // allow page to scroll or adjust
  }


  /**
   * Wait for autocomplete search results to be displayed.
   */
  waitForACSearchResults() {
    let searchResultsEle = element(by.id('searchResults'))
    expect(searchResultsEle.isPresent()).toBe(true);
    browser.wait(function() {
      return searchResultsEle.isDisplayed();
    }, 10000);
  }

}
