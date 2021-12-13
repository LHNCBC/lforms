import { AppPage } from './app.po';
import { browser, logging, element, by, WebElementPromise } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('Testing item with unit component:', () => {
  let page: AppPage;

  // the elements that the web compoments are attached to, and
  // the input elements in autocompleter, for prefetch and search type autocompleters
  let eleInt = element(by.id('int-unit')),
      eleReal = element(by.id('real-unit')),
      eleQty = element(by.id('qty-units'));
  let eleIntUnit = element(by.id('unit_int-unit')),
      eleRealUnit = element(by.id('unit_real-unit')),
      eleQtyUnit = element(by.id('unit_qty-units'));
  let eleIntComp = element(by.id('int-with-unit')),
      eleRealComp = element(by.id('real-with-unit')),
      eleQtyComp = element(by.id('qty-with-units'));

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

  beforeEach(() => {
    page.scrollToTop(eleQty);
  });

  it('should display a unit field for an "INT" item', function() {
    expect(eleIntUnit.getAttribute('value')).toBe("kgs")

    eleInt.click()
    eleInt.sendKeys("123");
    browser.executeScript('return arguments[0].item', eleIntComp).then(function(item:any) {
      expect(item.value).toBe("123");
      expect(item.unit).toEqual({name: "kgs"});
    });

    eleInt.clear()
    eleInt.sendKeys("456");
    browser.executeScript('return arguments[0].item', eleIntComp).then(function(item:any) {
      expect(item.value).toBe("456");
    });

  });

  it('should display a unit field for a "REAL" item', function() {
    expect(eleRealUnit.getAttribute('value')).toBe("lbs")

    eleReal.click()
    eleReal.sendKeys("123.12");
    browser.executeScript('return arguments[0].item', eleRealComp).then(function(item:any) {
      expect(item.value).toBe("123.12");
      expect(item.unit).toEqual({name: "lbs"});
    });
    eleReal.clear();
    eleReal.sendKeys("456.78");
    browser.executeScript('return arguments[0].item', eleRealComp).then(function(item:any) {
      expect(item.value).toBe("456.78");
    });

  });

  it('should display units for a "QTY" item', function() {

    expect(eleQtyUnit.getAttribute('value')).toBe("lbs")

    eleQty.click()
    eleQty.sendKeys("123.45");
    eleQtyUnit.click()
    eleQtyUnit.sendKeys(protractor.Key.ARROW_DOWN);
    eleQtyUnit.sendKeys(protractor.Key.TAB);
    browser.executeScript('return arguments[0].item', eleQtyComp).then(function(item:any) {
      expect(item.value).toBe("123.45");
      expect(item.unit).toEqual({
        "name": "lbs",
        "default": true,
        "_displayUnit": "lbs"
      });
    });

    eleQty.clear();
    eleQty.sendKeys("456.78");
    browser.executeScript('return arguments[0].item', eleQtyComp).then(function(item:any) {
      expect(item.value).toBe("456.78");
    });

    eleQtyUnit.click()
    eleQtyUnit.sendKeys(protractor.Key.ARROW_DOWN);
    eleQtyUnit.sendKeys(protractor.Key.ARROW_DOWN);
    eleQtyUnit.sendKeys(protractor.Key.TAB);
    browser.executeScript('return arguments[0].item', eleQtyComp).then(function(item:any) {
      expect(item.unit).toEqual({
        "name": "kgs",
        "_displayUnit": "kgs"
      });
    });
  });

});


