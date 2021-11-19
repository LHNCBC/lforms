import { TestPage } from "./lforms_testpage.po";
import { RxTerms } from "./rxterms.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
let LForms: any = (global as any).LForms;
let window: any = global as any;

describe('Unused repeating item/section control', function() {
  let tp: TestPage = new TestPage(); 
  let ff: any = tp.USSGFHTVertical;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  describe('on repeating items', function() {
    let namePopover1 = element(by.id('add-content-/54126-8/54125-0/1/1')),
        namePopover2 = element(by.id('add-content-/54126-8/54125-0/1/2'));

    it('should not add a new one when there is an unused item', function () {
      tp.LoadForm.openUSSGFHTVertical();
      ff.btnName.click();
      TestUtil.waitForElementDisplayed(namePopover1)
      expect(namePopover1.isDisplayed()).toBe(true);
    });
    it('should add a new one when there is no unused item', function () {
      TestUtil.sendKeys(ff.name, "a name");
      ff.btnName.click();
      TestUtil.waitForElementNotPresent(namePopover1)
      // NEXT: TODO: these events are not supported yet. Need to make them not angular events, but regular DOM events
      // an add event emitted
      // browser.driver.executeAsyncScript(function () {
      //   var callback = arguments[arguments.length - 1];
      //   var testData = window._emittedEvent;
      //   callback(testData);
      // }).then(function (tData:any) {
      //   expect(tData.event).toBe('LF_EVENT_REPEATING_ITEM_ADDED')
      //   expect(tData.formId).toBe('54127-6N');
      //   expect(tData.itemId).toBe('/54126-8/54125-0/1/2');
      // });
      // ff.btnDelName2.click();
      // // a delete event emitted
      // browser.driver.executeAsyncScript(function () {
      //   var callback = arguments[arguments.length - 1];
      //   var testData = window._emittedEvent;
      //   callback(testData);
      // }).then(function (tData:any) {
      //   expect(tData.event).toBe('LF_EVENT_REPEATING_ITEM_DELETED')
      //   expect(tData.formId).toBe('54127-6N');
      //   expect(tData.itemId).toBe('/54126-8/54125-0/1/2');
      // });

      // ff.btnName.click();

    });
    it('should not add a new one when there is an unused item and an used item', function () {
      ff.btnName2.click();
      TestUtil.waitForElementDisplayed(namePopover2)
      expect(namePopover2.isDisplayed()).toBe(true);
    });
    it('should not add a new one when a previous used item becomes unused', function () {
      TestUtil.sendKeys(ff.name2, "another name");
      TestUtil.clear(ff.name)
      ff.btnName2.click();
      TestUtil.waitForElementDisplayed(namePopover2)
      expect(namePopover2.isDisplayed()).toBe(true);
    });
  });

  describe('on repeating sections', function() {
    let diseasesPopover1 = element(by.id('add-content-/54126-8/54137-5/1/1')),
        diseasesPopover2 = element(by.id('add-content-/54126-8/54137-5/1/2'));
        
    it('should not add a new one when all item in the section are empty', function () {
      ff.btnDiseasesHist.click();
      TestUtil.waitForElementDisplayed(diseasesPopover1)
      expect(diseasesPopover1.isDisplayed()).toBe(true);
    });
    it('should add a new one when at least one item in the section is not empty', function () {
      ff.disease.click();
      ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
      ff.disease.sendKeys(protractor.Key.TAB);
      ff.btnDiseasesHist.click();
      TestUtil.waitForElementNotPresent(diseasesPopover1)
    });

    it('should not add a new one when an used item has been hidden by skip logic', function () {
      ff.ageAtDiag2.click();
      ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
      ff.ageAtDiag2.sendKeys(protractor.Key.TAB);
      expect(ff.mockSubItem2.isDisplayed()).toBe(true);
      TestUtil.sendKeys(ff.mockSubItem2, "a value");
      ff.ageAtDiag2.clear();
      TestUtil.waitForElementNotPresent(ff.mockSubItem2)
      TestUtil.clickAddRemoveButton(ff.btnDiseasesHist2);
      expect(diseasesPopover2.isDisplayed()).toBe(true);
    });


    it('should not add a new one when the previous non-empty items in the section become empty again', function () {
      TestUtil.clear(ff.disease);
      browser.wait(ExpectedConditions.elementToBeClickable(ff.disease2));
      ff.disease2.click();
      ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
      ff.disease.sendKeys(protractor.Key.TAB);
      ff.btnDiseasesHist2.click();
      TestUtil.waitForElementDisplayed(diseasesPopover2)
      expect(diseasesPopover2.isDisplayed()).toBe(true);
    });

  });

  describe('repeating section within a repeating section', function() {
    let familyPopover = element(by.id('add-content-/54114-4/1')),
        diseHistPopover = element(by.id('add-content-/54114-4/54117-7/1/1'));
    it("should not add new section if any previous one is empty", function() {
      ff.btnAnotherDiseasesHist.click();
      TestUtil.waitForElementDisplayed(diseHistPopover)
      expect(diseHistPopover.isDisplayed()).toBe(true);
      ff.btnAnotherFamily.click();
      TestUtil.waitForElementDisplayed(familyPopover)
      expect(familyPopover.isDisplayed()).toBe(true);
    });

  });
});
