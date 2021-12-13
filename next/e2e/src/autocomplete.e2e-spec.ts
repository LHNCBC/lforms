import { AppPage } from './app.po';
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('Testing autocomplete component:', () => {
  let page: AppPage;

  // the elements that the web compoments are attached to, and
  // the input elements in autocompleter, for prefetch and search type autocompleters
  let autoPrefetchEle1 = element(by.id('autocomplete-single-cne')),
      autoPrefetchEle2 = element(by.id('autocomplete-single-cwe')),
      autoPrefetchEle3 = element(by.id('autocomplete-multiple-cne')),
      autoPrefetchEle4 = element(by.id('autocomplete-multiple-cwe'));

  let autoPrefetch1 = element(by.id('auto-single-cne')),
      autoPrefetch2 = element(by.id('auto-single-cwe')),
      autoPrefetch3 = element(by.id('auto-multiple-cne')),
      autoPrefetch4 = element(by.id('auto-multiple-cwe'));

  let autoSearchEle1 = element(by.id('autocomplete-single-cne-url')),
      autoSearchEle2 = element(by.id('autocomplete-single-cwe-url')),
      autoSearchEle3 = element(by.id('autocomplete-multiple-cne-url')),
      autoSearchEle4 = element(by.id('autocomplete-multiple-cwe-url'));

  let autoSearch1 = element(by.id('auto-single-cne-url')),
      autoSearch2 = element(by.id('auto-single-cwe-url')),
      autoSearch3 = element(by.id('auto-multiple-cne-url')),
      autoSearch4 = element(by.id('auto-multiple-cwe-url'));

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    page = new AppPage();
    await page.navigateTo();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  describe('prefetch type autocomplete should work:', function () {

    let eleArray = [autoPrefetchEle1, autoPrefetchEle2, autoPrefetchEle3, autoPrefetchEle4];

    beforeEach(() => {
      page.scrollToTop(autoPrefetchEle1);
    });

    // initial values are undefined
    it('all initial values should be undefined', function() {
      eleArray.forEach(ele => {
        browser.executeScript('return arguments[0].item', ele).then(function(item:any) {
          expect(item.value).toBeUndefined();
        });
      })
    });

    // prefetch, single, cne
    it('prefetch type autocomplete, single selection, without exception', function() {
      // select an answer
      autoPrefetch1.click()
      autoPrefetch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
      });
      // remove the selection
      autoPrefetch1.clear()
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select another answer
      autoPrefetch1.click()
      autoPrefetch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'});
      });
      // remove and try to add user typed value
      autoPrefetch1.clear()
      autoPrefetch1.click()
      autoPrefetch1.sendKeys("Some values not on the list");
      autoPrefetch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });

    });

    // prefetch, single, cwe
    it('prefetch type autocomplete, single selection, with exception', function() {
      // select an answer
      autoPrefetch2.click()
      autoPrefetch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
      });
      // remove the selection
      autoPrefetch2.clear()
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select another answer
      autoPrefetch2.click()
      autoPrefetch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'});
      });
      // remove and add user typed value
      autoPrefetch2.clear()
      autoPrefetch2.click()
      autoPrefetch2.sendKeys("Some values not on the list");
      autoPrefetch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toEqual({'text': 'Some values not on the list', '_notOnList': true});
      });

    });

    // prefetch, multiple, cne
    it('prefetch type autocomplete, multiple selection, without exception', function() {
      // select an answer
      autoPrefetch3.click()
      autoPrefetch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });
      // remove the selection
      let xButton = autoPrefetchEle3.element(by.tagName('button'));
      xButton.click();
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select two answers
      autoPrefetch3.click()
      autoPrefetch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch3.sendKeys(protractor.Key.TAB);
      autoPrefetch3.click()
      autoPrefetch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });
      // try to add user typed value
      autoPrefetch3.click()
      autoPrefetch3.sendKeys("Some values not on the list");
      autoPrefetch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });

    });

    // prefetch, multiple, cwe
    it('prefetch type autocomplete, multiple selection, with exception', function() {
      // select an answer
      autoPrefetch4.click()
      autoPrefetch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });
      // remove the selection
      let xButton = autoPrefetchEle4.element(by.tagName('button'));
      xButton.click();
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select two answers
      autoPrefetch4.click()
      autoPrefetch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch4.sendKeys(protractor.Key.TAB);
      autoPrefetch4.click()
      autoPrefetch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });
      // add user typed value
      autoPrefetch4.click()
      autoPrefetch4.sendKeys("Some values not on the list");
      autoPrefetch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
        {'text': 'Some values not on the list', '_notOnList': true}]);
      });

    });

  });

  describe('search type autocomplete should work:', function () {

    let eleArray = [autoSearchEle1, autoSearchEle2, autoSearchEle3, autoSearchEle4];

    beforeEach(() => {
      page.scrollToTop(autoSearchEle1);
    });

    // initial values are undefined
    it('all initial values should be undefined', function() {
      eleArray.forEach(ele => {
        browser.executeScript('return arguments[0].item', ele).then(function(item:any) {
          expect(item.value).toBeUndefined();
        });
      })
    });

    // search, single, cne
    it('search type autocomplete, single selection, without exception', function() {
      // select an answer
      autoSearch1.click()
      autoSearch1.sendKeys('as')
      page.waitForACSearchResults()
      autoSearch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}});
      });
      // remove the selection
      autoSearch1.clear()
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select another answer
      autoSearch1.click()
      autoSearch1.sendKeys('b')
      page.waitForACSearchResults()
      autoSearch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': "CORTANE-B (Otic)", text: "CORTANE-B (Otic)",
        'data': {'RXCUIS': ["1293876"], 'STRENGTHS_AND_FORMS': ["0.1-1-1% Sol"]}});
      });
      // remove the answer and try to add user typed value
      autoSearch1.clear()
      autoSearch1.click()
      autoSearch1.sendKeys("Some values not on the list");
      autoSearch1.sendKeys(protractor.Key.TAB); // first tab shows error styles
      autoSearch1.sendKeys(protractor.Key.TAB); // second tab clean up the filed and leaves
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });

    });

    // search, single, cwe
    it('search type autocomplete, single selection, with exception', function() {
      // select an answer
      autoSearch2.click()
      autoSearch2.sendKeys('as')
      page.waitForACSearchResults()
      autoSearch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toEqual({'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}});
      });
      // remove the selection
      autoSearch2.clear()
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select another answer
      autoSearch2.click()
      autoSearch2.sendKeys('b')
      page.waitForACSearchResults()
      autoSearch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toEqual({'code': "CORTANE-B (Otic)", text: "CORTANE-B (Otic)",
        'data': {'RXCUIS': ["1293876"], 'STRENGTHS_AND_FORMS': ["0.1-1-1% Sol"]}});
      });
      // remove the answer and add user typed value
      autoSearch2.clear()
      autoSearch2.click()
      autoSearch2.sendKeys("Some values not on the list");
      autoSearch2.sendKeys(protractor.Key.TAB);
      autoSearch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toEqual({'text': 'Some values not on the list', '_notOnList': true});
      });

    });

    // search, multiple, cne
    it('search type autocomplete, multiple selection, without exception', function() {
      // select an answer
      autoSearch3.click()
      autoSearch3.sendKeys('as')
      page.waitForACSearchResults()
      autoSearch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });
      // remove the selection
      let xButton = autoSearchEle3.element(by.tagName('button'));
      xButton.click();
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([]);
      });
      // select two answers
      autoSearch3.click()
      autoSearch3.sendKeys('as')
      page.waitForACSearchResults()
      autoSearch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch3.sendKeys(protractor.Key.TAB);
      autoSearch3.click()
      autoSearch3.sendKeys('b')
      page.waitForACSearchResults()
      autoSearch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}},
        {'code': "CORTANE-B (Otic)", text: "CORTANE-B (Otic)",
        'data': {'RXCUIS': ["1293876"], 'STRENGTHS_AND_FORMS': ["0.1-1-1% Sol"]}}]);
      });
      // try to add user typed value
      autoSearch3.click()
      autoSearch3.sendKeys("Some values not on the list");
      autoSearch3.sendKeys(protractor.Key.TAB);
      autoSearch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}},
        {'code': "CORTANE-B (Otic)", text: "CORTANE-B (Otic)",
        'data': {'RXCUIS': ["1293876"], 'STRENGTHS_AND_FORMS': ["0.1-1-1% Sol"]}}]);
      });

    });

    // search, multiple, cwe
    it('search type autocomplete, multiple selection, with exception', function() {
      // select an answer
      autoSearch4.click()
      autoSearch4.sendKeys('as')
      autoSearch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });
      // remove the selection
      let xButton = autoSearchEle4.element(by.tagName('button'));
      xButton.click();
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([]);
      });
      // select two answers
      autoSearch4.click()
      autoSearch4.sendKeys('as')
      autoSearch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch4.sendKeys(protractor.Key.TAB);
      autoSearch4.click()
      autoSearch4.sendKeys('b')
      autoSearch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}},
        {'code': "CORTANE-B (Otic)", text: "CORTANE-B (Otic)",
        'data': {'RXCUIS': ["1293876"], 'STRENGTHS_AND_FORMS': ["0.1-1-1% Sol"]}}]);
      });
      // add user typed value
      autoSearch4.click()
      autoSearch4.sendKeys("Some values not on the list");
      autoSearch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}},
        {'code': "CORTANE-B (Otic)", text: "CORTANE-B (Otic)",
        'data': {'RXCUIS': ["1293876"], 'STRENGTHS_AND_FORMS': ["0.1-1-1% Sol"]}},
        {'text': 'Some values not on the list', '_notOnList': true}]);
      });
    });
  });


});

describe('Testing autocomplete component with initial values:', () => {
  let page: AppPage;

  // the elements that the web compoments are attached to, and
  // the input elements in autocompleter, for prefetch and serach type autocompleters
  let autoPrefetchEle1 = element(by.id('autocomplete-single-cne-userdata')),
      autoPrefetchEle2 = element(by.id('autocomplete-single-cwe-userdata')),
      autoPrefetchEle3 = element(by.id('autocomplete-multiple-cne-userdata')),
      autoPrefetchEle4 = element(by.id('autocomplete-multiple-cwe-userdata'));

  let autoPrefetch1 = element(by.id('auto-single-cne-userdata')),
      autoPrefetch2 = element(by.id('auto-single-cwe-userdata')),
      autoPrefetch3 = element(by.id('auto-multiple-cne-userdata')),
      autoPrefetch4 = element(by.id('auto-multiple-cwe-userdata'));

  let autoSearchEle1 = element(by.id('autocomplete-single-cne-url-userdata')),
      autoSearchEle2 = element(by.id('autocomplete-single-cwe-url-userdata')),
      autoSearchEle3 = element(by.id('autocomplete-multiple-cne-url-userdata')),
      autoSearchEle4 = element(by.id('autocomplete-multiple-cwe-url-userdata'));

  let autoSearch1 = element(by.id('auto-single-cne-url-userdata')),
      autoSearch2 = element(by.id('auto-single-cwe-url-userdata')),
      autoSearch3 = element(by.id('auto-multiple-cne-url-userdata')),
      autoSearch4 = element(by.id('auto-multiple-cwe-url-userdata'));

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    page = new AppPage();
    await page.navigateTo();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  describe('prefetch type autocomplete should work:', function () {

    beforeEach(() => {
      page.scrollToTop(autoPrefetchEle1);
    });

    // prefetch, single, cne
    it('prefetch type autocomplete, single selection, without exception', function() {

      // initial value
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'});
      });
      // remove the initicial value and select an answer
      autoPrefetch1.clear()
      autoPrefetch1.click()
      autoPrefetch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
      });
      // remove the selection and try to add user typed value
      autoPrefetch1.clear()
      autoPrefetch1.click()
      autoPrefetch1.sendKeys("Some values not on the list");
      autoPrefetch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });
    });

    // prefetch, single, cwe
    it('prefetch type autocomplete, single selection, with exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toEqual({'text': 'Answer user typed', '_notOnList': true});
      });
      // remove the initicial value and select an answer
      autoPrefetch2.clear()
      autoPrefetch2.click()
      autoPrefetch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
      });
      // remove the selection
      autoPrefetch2.clear()
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // add user typed value
      autoPrefetch2.click()
      autoPrefetch2.sendKeys("Some values not on the list");
      autoPrefetch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle2).then(function(item:any) {
        expect(item.value).toEqual({'text': 'Some values not on the list', '_notOnList': true});
      });

    });

    // prefetch, multiple, cne
    it('prefetch type autocomplete, multiple selection, without exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
        {'code': 'c3', 'text': 'Answer Z', '_displayText': 'Answer Z'}]);
      });
      // remove one answer
      //let xButton = autoPrefetchEle3.element.all(by.tagName('button')).get(0);
      let xButton = element.all(by.css('#autocomplete-multiple-cne-userdata button')).get(0);
      xButton.click();
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c3', 'text': 'Answer Z', '_displayText': 'Answer Z'}]);
      });
      // select another answer
      autoPrefetch3.click()
      autoPrefetch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c3', 'text': 'Answer Z', '_displayText': 'Answer Z'},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });
      // try to add user typed value
      autoPrefetch3.click()
      autoPrefetch3.sendKeys("Some values not on the list");
      autoPrefetch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle3).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c3', 'text': 'Answer Z', '_displayText': 'Answer Z'},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });

    });

    // prefetch, multiple, cwe
    it('prefetch type autocomplete, multiple selection, with exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
        {'text': 'Answer user typed', '_notOnList': true}]);
      });
      // remove one answer
      let xButton = element.all(by.css('#autocomplete-multiple-cwe-userdata button')).get(0);
      xButton.click();
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'text': 'Answer user typed', '_notOnList': true}]);
      });
      // select another answer
      autoPrefetch4.click()
      autoPrefetch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoPrefetch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        expect(item.value).toEqual([{'text': 'Answer user typed', '_notOnList': true},
        {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
      });
      // add user typed value
      autoPrefetch4.click()
      autoPrefetch4.sendKeys("Some values not on the list");
      autoPrefetch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
        browser.executeScript('return arguments[0].item', autoPrefetchEle4).then(function(item:any) {
          expect(item.value).toEqual([{'text': 'Answer user typed', '_notOnList': true},
          {'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
          {'text': 'Some values not on the list', '_notOnList': true}]);
        });
      });
    });

  });

  describe('search type autocomplete should work:', function () {

    beforeEach(() => {
      page.scrollToTop(autoSearchEle1);
    });


    // search, single, cne
    it('search type autocomplete, single selection, without exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toEqual({
          "code": "ALAVERT D XR (Oral Pill)",
          "text": "ALAVERT D XR (Oral Pill)",
          "data": {
            "RXCUIS": ["1242401"],
            "STRENGTHS_AND_FORMS": ["5-120 mg 12 HR XR Tab"]
          }});
      });
      // remove the answer
      autoSearch1.clear()
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select another answer
      autoSearch1.click()
      autoSearch1.sendKeys('as')
      autoSearch1.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch1.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toEqual({'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}});
      });
      // remove the answer and try to add user typed value
      autoSearch1.clear()
      autoSearch1.click()
      autoSearch1.sendKeys("Some values not on the list");
      autoSearch1.sendKeys(protractor.Key.TAB); // first tab shows error styles
      autoSearch1.sendKeys(protractor.Key.TAB); // second tab clean up the filed and leaves
      browser.executeScript('return arguments[0].item', autoSearchEle1).then(function(item:any) {
        expect(item.value).toBeNull();
      });

    });

    // search, single, cwe
    it('search type autocomplete, single selection, with exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toEqual({
          "text": "User typed value",
          "_notOnList": true
        });
      });
      // remove the answer
      autoSearch2.clear()
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toBeNull();
      });
      // select another answer
      autoSearch2.click()
      autoSearch2.sendKeys('as')
      page.waitForACSearchResults()
      autoSearch2.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toEqual({'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}});
      });
      // remove the answer and add user typed value
      autoSearch2.clear()
      autoSearch2.click()
      autoSearch2.sendKeys("Some values not on the list");
      autoSearch2.sendKeys(protractor.Key.TAB);
      autoSearch2.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle2).then(function(item:any) {
        expect(item.value).toEqual({'text': 'Some values not on the list', '_notOnList': true});
      });

    });

    // search, multiple, cne
    it('search type autocomplete, multiple selection, without exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        // initial value
        expect(item.value).toEqual([{
          "code": "ALAVERT D XR (Oral Pill)",
          "text": "ALAVERT D XR (Oral Pill)",
          "data": {
            "RXCUIS": ["1242401"],
            "STRENGTHS_AND_FORMS": ["5-120 mg 12 HR XR Tab"]
          }
        }, {
          "code": "ALPHANINE SD (Injectable)",
          "text": "ALPHANINE SD (Injectable)",
          "data": {
            "RXCUIS": ["1666309"],
            "STRENGTHS_AND_FORMS": ["1 unt Injection"]
          }
        }]);
      });
      // select another answer
      autoSearch3.click()
      autoSearch3.sendKeys('as')
      page.waitForACSearchResults()
      autoSearch3.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([{
          "code": "ALAVERT D XR (Oral Pill)",
          "text": "ALAVERT D XR (Oral Pill)",
          "data": {
            "RXCUIS": ["1242401"],
            "STRENGTHS_AND_FORMS": ["5-120 mg 12 HR XR Tab"]
          }
        }, {
          "code": "ALPHANINE SD (Injectable)",
          "text": "ALPHANINE SD (Injectable)",
          "data": {
            "RXCUIS": ["1666309"],
            "STRENGTHS_AND_FORMS": ["1 unt Injection"]
          }
        },{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });
      // delete the first answer
      let xButton = element.all(by.css('#autocomplete-multiple-cne-url-userdata button')).get(0);
      xButton.click();
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([{
          "code": "ALPHANINE SD (Injectable)",
          "text": "ALPHANINE SD (Injectable)",
          "data": {
            "RXCUIS": ["1666309"],
            "STRENGTHS_AND_FORMS": ["1 unt Injection"]
          }
        },{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });
      //try to add user typed value
      autoSearch3.click()
      autoSearch3.sendKeys("Some values not on the list");
      autoSearch3.sendKeys(protractor.Key.TAB);
      autoSearch3.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle3).then(function(item:any) {
        expect(item.value).toEqual([{
          "code": "ALPHANINE SD (Injectable)",
          "text": "ALPHANINE SD (Injectable)",
          "data": {
            "RXCUIS": ["1666309"],
            "STRENGTHS_AND_FORMS": ["1 unt Injection"]
          }
        },{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });

    });

    // search, multiple, cwe
    it('search type autocomplete, multiple selection, with exception', function() {
      // initial value
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{
          "code": "ALAVERT D XR (Oral Pill)",
          "text": "ALAVERT D XR (Oral Pill)",
          "data": {
            "RXCUIS": ["1242401"],
            "STRENGTHS_AND_FORMS": ["5-120 mg 12 HR XR Tab"]
          }
        }, {
          "text": "User typed value",
          "_notOnList": true
        }]);
      });
      // select another answer
      autoSearch4.click()
      autoSearch4.sendKeys('as')
      autoSearch4.sendKeys(protractor.Key.ARROW_DOWN);
      autoSearch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{
          "code": "ALAVERT D XR (Oral Pill)",
          "text": "ALAVERT D XR (Oral Pill)",
          "data": {
            "RXCUIS": ["1242401"],
            "STRENGTHS_AND_FORMS": ["5-120 mg 12 HR XR Tab"]
          }
        }, {
          "text": "User typed value",
          "_notOnList": true
        },{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });
      // delete the first answer
      let xButton = element.all(by.css('#autocomplete-multiple-cwe-url-userdata button')).get(0);
      xButton.click();
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{
          "text": "User typed value",
          "_notOnList": true
        },{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}}]);
      });
      // add user typed value
      autoSearch4.click()
      autoSearch4.sendKeys("Some values not on the list");
      autoSearch4.sendKeys(protractor.Key.TAB);
      browser.executeScript('return arguments[0].item', autoSearchEle4).then(function(item:any) {
        expect(item.value).toEqual([{
          "text": "User typed value",
          "_notOnList": true
        },{'code': "ASTELIN (Nasal)", 'text': "ASTELIN (Nasal)",
        'data': {'RXCUIS': ["1797876"], 'STRENGTHS_AND_FORMS': ["137 mcg/puff Metered dose spray"]}},
        {'text': 'Some values not on the list', '_notOnList': true}]);
      });
    });
  });



});


