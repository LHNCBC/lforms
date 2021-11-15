import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import * as FHIRSupport from "../../../app/scripts/fhir/versions.js";

let fhirVersions = Object.keys(FHIRSupport);

describe('skip logic', function() {
  let tp: TestPage; 
  let ff: any;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    ff = tp.FullFeaturedForm;
  });

  beforeEach(function () {
    tp.LoadForm.openFullFeaturedForm();
  });

  it('should support enableWhenExpression', function() {
    tp.openBaseTestPage();
    tp.loadFromTestData('enableWhenExpressionTest.json', 'R4');
    var n1 = element(by.id('n1/1'));
    var n2 = element(by.id('n2/1'));
    var n3 = element(by.id('n3/1'));
    var q4 = element(by.id('q4/1')); // present when n1+n2+n3 >= 5;
    TestUtil.waitForElementPresent(n1),
    TestUtil.waitForElementNotPresent(q4)
    n1.click();
    n1.sendKeys('5');
    n2.click();
    TestUtil.waitForElementPresent(n1)
    n1.clear();
    n1.click();
    n1.sendKeys('1');
    n2.click();
    n2.sendKeys('2');
    TestUtil.waitForElementNotPresent(q4)
    n3.click();
    n3.sendKeys('3');
    n1.click();
    TestUtil.waitForElementPresent(n1)
  });

  it('target items should be hidden initially', function() {
    TestUtil.waitForElementNotPresent(ff.t1)
    TestUtil.waitForElementNotPresent(ff.t2)
    TestUtil.waitForElementNotPresent(ff.t4)
    TestUtil.waitForElementNotPresent(ff.t5)

  });

  it('should have correct initial state for CNE/exists trigger targets', function() {
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYes)
    TestUtil.waitForElementNotPresent(ff.ageIfLivingAnswered)
    TestUtil.waitForElementNotPresent(ff.deathCauseIfLivingNo)
    expect(ff.ageDeathIfLivingNotAnswered.isPresent()).toBeTruthy();
  });

  it('should show/hide elements per CNE/exists trigger settings if answered Yes', function() {
    // select "Yes" for is Living
    ff.cneTriggerSrc1.click();
    ff.cneTriggerSrc1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc1.sendKeys(protractor.Key.TAB);

    expect(ff.dobIfLivingYes.isDisplayed()).toBe(true);
    // trigger value has no 'system' while answers have 'system'
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYesB)
    expect(ff.ageIfLivingAnswered.isDisplayed()).toBe(true);
    TestUtil.waitForElementNotPresent(ff.deathCauseIfLivingNo)
    TestUtil.waitForElementNotPresent(ff.ageDeathIfLivingNotAnswered)
  });

  it('should show/hide elements per CNE/exists trigger settings if answered No', function() {
    // select "No" for is Living
    ff.cneTriggerSrc1.click();
    ff.cneTriggerSrc1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc1.sendKeys(protractor.Key.TAB);

    TestUtil.waitForElementNotPresent(ff.dobIfLivingYes)
    // trigger value has no 'system' while answers have 'system'
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYesB)
    expect(ff.ageIfLivingAnswered.isDisplayed()).toBe(true);
    expect(ff.deathCauseIfLivingNo.isDisplayed()).toBe(true);
    TestUtil.waitForElementNotPresent(ff.ageDeathIfLivingNotAnswered)
  });

  it('should show/hide elements per CNE/exists trigger settings if answer cleared', function() {
    // clear the answer to Living
    ff.cneTriggerSrc1.clear();

    TestUtil.waitForElementNotPresent(ff.dobIfLivingYes)
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYesB)
    TestUtil.waitForElementNotPresent(ff.ageIfLivingAnswered)
    TestUtil.waitForElementNotPresent(ff.deathCauseIfLivingNo)
    expect(ff.ageDeathIfLivingNotAnswered.isDisplayed()).toBe(true);
  });

  it('should show/hide elements when "system" value is set correctly in trigger if answered Yes', function() {
    // clear the answer to Living
    ff.cneTriggerSrc2.click();
    ff.cneTriggerSrc2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc2.sendKeys(protractor.Key.TAB);

    // trigger value has 'system' while answers have no 'system'
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYes2C)
    expect(ff.dobIfLivingYes2D.isDisplayed()).toBe(true);
    TestUtil.waitForElementNotPresent(ff.deathCauseIfLivingNoB)

    ff.cneTriggerSrc2.click();
    ff.cneTriggerSrc2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc2.sendKeys(protractor.Key.TAB);

    // trigger value has 'system' while answers have no 'system'
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYes2C)
    TestUtil.waitForElementNotPresent(ff.dobIfLivingYes2D)
    expect(ff.deathCauseIfLivingNoB.isDisplayed()).toBe(true);

  });

  it('should show a sibling and two items in a sibling section', function() {
    TestUtil.sendKeys(ff.src, '1');
    expect(ff.t1.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should hide a sibling and show two items in a sibling section', function() {
    ff.src.clear();
    TestUtil.waitForElementNotPresent(ff.t1)
    TestUtil.waitForElementNotPresent(ff.t2)
    TestUtil.waitForElementNotPresent(ff.t4)
    TestUtil.waitForElementNotPresent(ff.t5)

    TestUtil.sendKeys(ff.src, '2');
    TestUtil.waitForElementNotPresent(ff.t1)
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should show/hide a sibling controlled by "notEqual"', function() {
    ff.src.clear();
    expect(ff.t6.isDisplayed()).toBe(true);
    TestUtil.sendKeys(ff.src, '2');
    TestUtil.waitForElementNotPresent(ff.t6)
    ff.src.clear();    
    TestUtil.sendKeys(ff.src, '6');
    expect(ff.t6.isDisplayed()).toBe(true);
  });

  it('should show another sibling and hide two items in a sibling section', function() {
    ff.src.clear();
    TestUtil.waitForElementNotPresent(ff.t1)
    TestUtil.waitForElementNotPresent(ff.t2)
    TestUtil.waitForElementNotPresent(ff.t4)
    TestUtil.waitForElementNotPresent(ff.t5)
    TestUtil.sendKeys(ff.src, '6');
    TestUtil.waitForElementNotPresent(ff.t1)
    expect(ff.t2.isDisplayed()).toBe(true);
    TestUtil.waitForElementNotPresent(ff.t4)
    TestUtil.waitForElementNotPresent(ff.t5)
  });

  it('should work with logic ALL from two different sources', function() {
    // check logic ALL
    ff.allSrc1.clear();
    ff.allSrc2.clear();
    TestUtil.sendKeys(ff.allSrc1, '1');
    TestUtil.waitForElementNotPresent(ff.allTarget)
    TestUtil.sendKeys(ff.allSrc2, '2');
    expect(ff.allTarget.isDisplayed()).toBe(true);
    ff.anySrc1.clear();
    TestUtil.sendKeys(ff.allSrc1, '2');
    TestUtil.waitForElementNotPresent(ff.allTarget)
  });

  it('should work with logic ANY from two different sources', function() {
    // check logic ANY
    ff.anySrc1.clear();
    ff.anySrc2.clear();
    TestUtil.sendKeys(ff.anySrc1, '1');
    expect(ff.anyTarget.isDisplayed()).toBe(true);
    TestUtil.sendKeys(ff.anySrc2, '1');
    expect(ff.anyTarget.isDisplayed()).toBe(true);
    TestUtil.sendKeys(ff.anySrc1, '2');
    ff.anySrc1.clear();
    TestUtil.waitForElementNotPresent(ff.anyTarget)
    ff.anySrc2.clear();
    TestUtil.sendKeys(ff.anySrc2, '2');
    expect(ff.anyTarget.isDisplayed()).toBe(true);

  });

  it('should be able to be controlled by an ancestors sibling', function() {

    TestUtil.waitForElementNotPresent(ff.rpTarget2a)
    TestUtil.waitForElementNotPresent(ff.rpTarget2b)
    ff.rpSrc2.clear();
    TestUtil.waitForElementNotPresent(ff.rpTarget2a)
    TestUtil.waitForElementNotPresent(ff.rpTarget2b)
    TestUtil.sendKeys(ff.rpSrc2, '1');
    TestUtil.waitForElementNotPresent(ff.rpTarget2a)
    ff.rpSrc2.clear();
    TestUtil.sendKeys(ff.rpSrc2, '2');
    expect(ff.rpTarget2a.isDisplayed()).toBe(true);

    TestUtil.waitForElementNotPresent(ff.rpTarget1a)
    TestUtil.waitForElementNotPresent(ff.rpTarget1ah1)
    TestUtil.sendKeys(ff.rpSubSrc1, '1');
    expect(ff.rpTarget1a.isDisplayed()).toBe(true);
    expect(ff.rpTarget1ah1.isDisplayed()).toBe(true);

    // add a new section
    ff.rpAdd.click();
    TestUtil.waitForElementNotPresent(ff.rpTarget1b)
    TestUtil.waitForElementNotPresent(ff.rpTarget1bh1)
    expect(ff.rpTarget2a.isDisplayed()).toBe(true);
    expect(ff.rpTarget2b.isDisplayed()).toBe(true);
    ff.rpSrc2.clear();
    TestUtil.sendKeys(ff.rpSrc2, '1');
    TestUtil.waitForElementNotPresent(ff.rpTarget2a)
    TestUtil.waitForElementNotPresent(ff.rpTarget2b)
  });

  describe('Skip logic equal and notEqual operators', function () {
    beforeAll(function () {
      tp.openBaseTestPage();
    });

    for(let i = 0; i < fhirVersions.length; i++) {
      if (fhirVersions[i] !== 'STU3') {
        it('should work with = and != operators - ' + fhirVersions[i], function () {
          tp.loadFromTestData('test-enablewhen.json', fhirVersions[i]);
          let source = element(by.id("4.1/1"));
          let targetEqual = element(by.id("4.2/1"));
          let targetNotEqual = element(by.id("4.3/1"));

          expect(source.isDisplayed()).toBe(true);
          TestUtil.waitForElementNotPresent(targetEqual)
          expect(targetNotEqual.isDisplayed()).toBe(true);

          source.click();
          source.sendKeys(protractor.Key.ARROW_DOWN);
          source.sendKeys(protractor.Key.ENTER);
          expect(targetEqual.isDisplayed()).toBe(true);
          TestUtil.waitForElementNotPresent(targetEqual)

          source.click();
          source.sendKeys(protractor.Key.ARROW_DOWN);
          source.sendKeys(protractor.Key.ARROW_DOWN);
          source.sendKeys(protractor.Key.ENTER);

          TestUtil.waitForElementNotPresent(targetEqual)
          expect(targetNotEqual.isDisplayed()).toBe(true);
        });
      }

      it('should work with skip logic source that itself is a skip logic target - ' + fhirVersions[i], function () {
        tp.loadFromTestData('test-enablewhen.json', fhirVersions[i]);
        let source = element(by.id("4.1/1"));
        let targetEqual = element(by.id("4.3/1"));
        let targetWithSklSourceExists = element(by.id("4.4/1"));
        let targetWithSklSourceNotExists = element(by.id("4.5/1"));

        // Initial setup
        expect(source.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(targetWithSklSourceExists)
        expect(targetWithSklSourceNotExists.isDisplayed()).toBe(true);

        // Select to hide the skip logic target
        source.click();
        source.sendKeys(protractor.Key.ARROW_DOWN);
        source.sendKeys(protractor.Key.ENTER);
        TestUtil.waitForElementNotPresent(targetWithSklSourceExists)
        expect(targetWithSklSourceNotExists.isDisplayed()).toBe(true);

        // Select to show skip logic target item.
        source.click();
        source.sendKeys(protractor.Key.ARROW_DOWN);
        source.sendKeys(protractor.Key.ARROW_DOWN);
        source.sendKeys(protractor.Key.ENTER);
        expect(targetEqual.isDisplayed()).toBe(true);
        // Field is displayed but no value entered in the item. The chained targets skip logic is not satisfied.
        TestUtil.waitForElementNotPresent(targetWithSklSourceExists)
        expect(targetWithSklSourceNotExists.isDisplayed()).toBe(true);
        // Value entered in the item. The chained targets skip logic is satisfied.
        targetEqual.click();
        targetEqual.clear();
        TestUtil.sendKeys(targetEqual, 'xxx');
        expect(targetWithSklSourceExists.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(targetWithSklSourceNotExists)

      });
    }

    it('should work with data control whose source is controlled by skip logic', function () {
      tp.loadFromTestData('test-skiplogic-datacontrol.json');
      let source = element(by.id("1/1"));
      let skipLogicItem = element(by.id("2/1"));
      let dataControlItemWithSourceHavingSkipLogic = element(by.id("3/1"));

      expect(source.isDisplayed()).toBe(true);
      TestUtil.waitForElementNotPresent(skipLogicItem)
      TestUtil.waitForElementNotPresent(dataControlItemWithSourceHavingSkipLogic)

      // Not met skip logic condition ==> skip logic disabled
      source.click();
      TestUtil.sendKeys(source, 'xxx');
      TestUtil.waitForElementNotPresent(skipLogicItem)
      TestUtil.waitForElementNotPresent(dataControlItemWithSourceHavingSkipLogic)

      // Met skip logic condition
      source.click();
      source.clear();
      TestUtil.sendKeys(source, 'show 2');
      expect(skipLogicItem.isDisplayed()).toBe(true);

      // skipLogicItem is present but its value does not exists yet.
      TestUtil.waitForElementNotPresent(dataControlItemWithSourceHavingSkipLogic)

      skipLogicItem.click();
      TestUtil.sendKeys(skipLogicItem, 'xxx');
      expect(dataControlItemWithSourceHavingSkipLogic.isDisplayed()).toBe(true);
      expect(dataControlItemWithSourceHavingSkipLogic.getAttribute('value')).toBe('xxx');
    });

  });
});
