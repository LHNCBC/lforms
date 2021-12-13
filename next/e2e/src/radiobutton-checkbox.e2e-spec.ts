import { AppPage } from './app.po';
import { browser, logging, element, by, WebElementPromise } from 'protractor';

describe('Testing radio button and checkbox component', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new AppPage();
  });


  it('4 different types of Radio buttons and Checkboxes should all work', function () {

    page.navigateTo();

    let radioCNE = element(by.id('radio-cne')),
        radioCWE = element(by.id('radio-cwe')),
        checkboxCNE = element(by.id('checkbox-cne')),
        checkboxCWE = element(by.id('checkbox-cwe'));

    let cneRadio1 = radioCNE.element(by.css('#radio-cnec1 .ant-radio-input')),
        cneRadio2 = radioCNE.element(by.css('#radio-cnec2 .ant-radio-input')),
        cweRadio1 = radioCWE.element(by.css('#radio-cwec1 .ant-radio-input')),
        cweRadio2 = radioCWE.element(by.css('#radio-cwec2 .ant-radio-input')),
        cweRadioOther = radioCWE.element(by.css('#radio-cwe_other .ant-radio-input')),
        cweRadioOtherValue = radioCWE.element(by.id('radio-cwe_otherValue')),

        cneCheckbox1 = checkboxCNE.element(by.css('#checkbox-cnec1')),
        cneCheckbox2 = checkboxCNE.element(by.css('#checkbox-cnec2')),
        cweCheckbox1 = checkboxCWE.element(by.css('#checkbox-cwec1')),
        cweCheckbox2 = checkboxCWE.element(by.css('#checkbox-cwec2')),
        cweCheckboxOther = checkboxCWE.element(by.css('#checkbox-cwe_other')),
        cweCheckboxOtherValue = checkboxCWE.element(by.id('checkbox-cwe_otherValue'));

    // first list
    browser.executeScript('return arguments[0].item', radioCNE).then(function(item:any) {
      expect(item.value).toBeUndefined();
    });
    cneRadio1.click();
    browser.executeScript('return arguments[0].item', radioCNE).then(function(item:any) {
      expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
    });
    cneRadio2.click();
    browser.executeScript('return arguments[0].item', radioCNE).then(function(item:any) {
      expect(item.value).toEqual({'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'});
    });

    // second list
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toBeUndefined();
    });
    cweRadio1.click();
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
    });
    cweRadio2.click();
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toEqual({'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'});
    });
    cweRadioOther.click();
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toEqual({'text': null, '_notOnList': true});
    });
    cweRadioOtherValue.sendKeys('other values');
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toEqual({'text': 'other values', '_notOnList': true});
    });
    cweRadioOtherValue.clear();
    cweRadioOtherValue.sendKeys('other values again');
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toEqual({'text': 'other values again', '_notOnList': true});
    });

    // third list
    browser.executeScript('return arguments[0].item', checkboxCNE).then(function(item:any) {
      expect(item.value).toBeUndefined();
    });
    cneCheckbox1.click();
    browser.executeScript('return arguments[0].item', checkboxCNE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
    });
    cneCheckbox2.click();
    browser.executeScript('return arguments[0].item', checkboxCNE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'}]);
    });
    cneCheckbox1.click(); // deselects the first checkbox
    browser.executeScript('return arguments[0].item', checkboxCNE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'}]);
    });

    // fourth list
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toBeUndefined();
    });
    cweCheckbox1.click();
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'}]);
    });
    cweCheckbox2.click();
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'}]);
    });
    cweCheckboxOther.click();
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
      {'text': null, '_notOnList': true}]);
    });
    cweCheckboxOtherValue.sendKeys('other values');
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
      {'text': 'other values', '_notOnList': true}]);
    });

    // change the other value alone will update the data model when the checkbox is checked.
    cweCheckboxOtherValue.clear();
    cweCheckboxOtherValue.sendKeys('other values again');
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'},
      {'text': 'other values again', '_notOnList': true}]);
    });

    // deselect other
    cweCheckboxOther.click();
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'}]);
    });

  });

  it('Existing user data should change Radio buttons and Checkboxes', function () {

    page.navigateTo();

    let radioCNE = element(by.id('radio-cne-userdata')),
        radioCWE = element(by.id('radio-cwe-userdata')),
        checkboxCNE = element(by.id('checkbox-cne-userdata')),
        checkboxCWE = element(by.id('checkbox-cwe-userdata'));

    let cneRadio1 = radioCNE.element(by.css('#radio-cnec1 .ant-radio-input')),
        cneRadio2 = radioCNE.element(by.css('#radio-cnec2 .ant-radio-input')),
        cweRadio1 = radioCWE.element(by.css('#radio-cwec1 .ant-radio-input')),
        cweRadioOther = radioCWE.element(by.css('#radio-cwe_other .ant-radio-input')),
        cweRadioOtherValue = radioCWE.element(by.id('radio-cwe_otherValue')),

        cneCheckbox1 = checkboxCNE.element(by.css('#checkbox-cnec1 input[type="checkbox"]')),
        cneCheckbox2 = checkboxCNE.element(by.css('#checkbox-cnec2 input[type="checkbox"]')),
        cneCheckbox3 = checkboxCNE.element(by.css('#checkbox-cnec3 input[type="checkbox"]')),
        cweCheckbox1 = checkboxCWE.element(by.css('#checkbox-cwec1 input[type="checkbox"]')),
        cweCheckbox2 = checkboxCWE.element(by.css('#checkbox-cwec2 input[type="checkbox"]')),
        cweCheckboxOther = checkboxCWE.element(by.css('#checkbox-cwe_other input[type="checkbox"]')),
        cweCheckboxOtherValue = checkboxCWE.element(by.id('checkbox-cwe_otherValue'));

    // first list
    expect(cneRadio1.isSelected()).toBe(true);
    cneRadio1.click();
    cneRadio2.click();
    browser.executeScript('return arguments[0].item', radioCNE).then(function(item:any) {
      expect(item.value).toEqual({'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'});
    });

    // second list
    expect(cweRadioOther.isSelected()).toBe(true);
    expect(cweRadioOtherValue.getAttribute('value')).toEqual('other value, radio, cwe');
    cweRadio1.click();
    browser.executeScript('return arguments[0].item', radioCWE).then(function(item:any) {
      expect(item.value).toEqual({'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'});
    });

    // third list
    expect(cneCheckbox1.isSelected()).toBe(true);
    expect(cneCheckbox2.isSelected()).toBe(true);
    expect(cneCheckbox3.isSelected()).toBe(true);

    cneCheckbox3.click();
    browser.executeScript('return arguments[0].item', checkboxCNE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'code': 'c2', 'text': 'Answer Y', '_displayText': 'Answer Y'}]);
    });

    // fourth list
    expect(cweCheckbox2.isSelected()).toBe(true);
    expect(cweCheckboxOther.isSelected()).toBe(true);
    expect(cweCheckboxOtherValue.getAttribute('value')).toEqual('other value, checkbox, cwe');

    cweCheckbox1.click();
    cweCheckbox2.click();
    browser.executeScript('return arguments[0].item', checkboxCWE).then(function(item:any) {
      expect(item.value).toEqual([{'code': 'c1', 'text': 'Answer X', '_displayText': 'Answer X'},
      {'text': 'other value, checkbox, cwe', '_notOnList': true}]);
    });

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
