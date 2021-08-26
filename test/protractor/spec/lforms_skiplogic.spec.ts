var fhirSupport = require('../../../app/scripts/fhir/versions');
var testUtil = require('./util');
var fhirVersions = Object.keys(fhirSupport);
var tp = require('./lforms_testpage.po.js');
var ff = tp.FullFeaturedForm;
describe('skip logic', function() {

  it('target items should be hidden initially', function() {
    tp.openFullFeaturedForm();
    // initially all hidden
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isPresent()).toBeFalsy();
    expect(ff.t4.isPresent()).toBeFalsy();
    expect(ff.t5.isPresent()).toBeFalsy();
  });

  it('should have correct initial state for CNE/exists trigger targets', function() {
    expect(ff.dobIfLivingYes.isPresent()).toBeFalsy();
    expect(ff.ageIfLivingAnswered.isPresent()).toBeFalsy();
    expect(ff.deathCauseIfLivingNo.isPresent()).toBeFalsy();
    expect(ff.ageDeathIfLivingNotAnswered.isPresent()).toBeTruthy();
  });

  it('should show/hide elements per CNE/exists trigger settings if answered Yes', function() {
    // select "Yes" for is Living
    ff.cneTriggerSrc1.click();
    ff.cneTriggerSrc1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc1.sendKeys(protractor.Key.TAB);

    expect(ff.dobIfLivingYes.isDisplayed()).toBe(true);
    expect(ff.dobIfLivingYesB.isPresent()).toBeFalsy(); // trigger value has no 'system' while answers have 'system'
    expect(ff.ageIfLivingAnswered.isDisplayed()).toBe(true);
    expect(ff.deathCauseIfLivingNo.isPresent()).toBeFalsy();
    expect(ff.ageDeathIfLivingNotAnswered.isPresent()).toBeFalsy();
  });

  it('should show/hide elements per CNE/exists trigger settings if answered No', function() {
    // select "No" for is Living
    ff.cneTriggerSrc1.click();
    ff.cneTriggerSrc1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc1.sendKeys(protractor.Key.TAB);

    expect(ff.dobIfLivingYes.isPresent()).toBeFalsy();
    expect(ff.dobIfLivingYesB.isPresent()).toBeFalsy(); // trigger value has no 'system' while answers have 'system'
    expect(ff.ageIfLivingAnswered.isDisplayed()).toBe(true);
    expect(ff.deathCauseIfLivingNo.isDisplayed()).toBe(true);
    expect(ff.ageDeathIfLivingNotAnswered.isPresent()).toBeFalsy();
  });

  it('should show/hide elements per CNE/exists trigger settings if answer cleared', function() {
    // clear the answer to Living
    ff.cneTriggerSrc1.clear();

    expect(ff.dobIfLivingYes.isPresent()).toBeFalsy();
    expect(ff.dobIfLivingYesB.isPresent()).toBeFalsy();
    expect(ff.ageIfLivingAnswered.isPresent()).toBeFalsy();
    expect(ff.deathCauseIfLivingNo.isPresent()).toBeFalsy();
    expect(ff.ageDeathIfLivingNotAnswered.isDisplayed()).toBe(true);
  });

  it('should show/hide elements when "system" value is set correctly in trigger if answered Yes', function() {
    // clear the answer to Living
    ff.cneTriggerSrc2.click();
    ff.cneTriggerSrc2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc2.sendKeys(protractor.Key.TAB);

    expect(ff.dobIfLivingYes2C.isPresent()).toBeFalsy(); // trigger value has 'system' while answers have no 'system'
    expect(ff.dobIfLivingYes2D.isDisplayed()).toBe(true);
    expect(ff.deathCauseIfLivingNoB.isPresent()).toBeFalsy();

    ff.cneTriggerSrc2.click();
    ff.cneTriggerSrc2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.cneTriggerSrc2.sendKeys(protractor.Key.TAB);

    expect(ff.dobIfLivingYes2C.isPresent()).toBeFalsy(); // trigger value has 'system' while answers have no 'system'
    expect(ff.dobIfLivingYes2D.isPresent()).toBeFalsy();
    expect(ff.deathCauseIfLivingNoB.isDisplayed()).toBe(true);

  });

  it('should show a sibling and two items in a sibling section', function() {
    testUtil.sendKeys(ff.src, '1');
    expect(ff.t1.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should hide a sibling and show two items in a sibling section', function() {
    ff.src.clear();
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isPresent()).toBeFalsy();
    expect(ff.t4.isPresent()).toBeFalsy();
    expect(ff.t5.isPresent()).toBeFalsy();
    testUtil.sendKeys(ff.src, '2');
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should show/hide a sibling controlled by "notEqual"', function() {
    ff.src.clear();
    expect(ff.t6.isDisplayed()).toBe(true);
    testUtil.sendKeys(ff.src, '2');
    expect(ff.t6.isPresent()).toBeFalsy();
    ff.src.clear();
    testUtil.sendKeys(ff.src, '6');
    expect(ff.t6.isDisplayed()).toBe(true);
  });

  it('should show another sibling and hide two items in a sibling section', function() {
    ff.src.clear();
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isPresent()).toBeFalsy();
    expect(ff.t4.isPresent()).toBeFalsy();
    expect(ff.t5.isPresent()).toBeFalsy();
    testUtil.sendKeys(ff.src, '6');
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isPresent()).toBeFalsy();
    expect(ff.t5.isPresent()).toBeFalsy();
  });

  it('should work with logic ALL from two different sources', function() {
    // check logic ALL
    ff.allSrc1.clear();
    ff.allSrc2.clear();
    testUtil.sendKeys(ff.allSrc1, '1');
    expect(ff.allTarget.isPresent()).toBe(false);
    testUtil.sendKeys(ff.allSrc2, '2');
    expect(ff.allTarget.isDisplayed()).toBe(true);
    ff.anySrc1.clear();
    testUtil.sendKeys(ff.allSrc1, '2');
    expect(ff.allTarget.isPresent()).toBe(false);
  });

  it('should work with logic ANY from two different sources', function() {
    // check logic ANY
    ff.anySrc1.clear();
    ff.anySrc2.clear();
    testUtil.sendKeys(ff.anySrc1, '1');
    expect(ff.anyTarget.isDisplayed()).toBe(true);
    testUtil.sendKeys(ff.anySrc2, '1');
    expect(ff.anyTarget.isDisplayed()).toBe(true);
    testUtil.sendKeys(ff.anySrc1, '2');
    ff.anySrc1.clear();
    expect(ff.anyTarget.isPresent()).toBe(false);
    ff.anySrc2.clear();
    testUtil.sendKeys(ff.anySrc2, '2');
    expect(ff.anyTarget.isDisplayed()).toBe(true);

  });

  it('should be able to be controlled by an ancestors sibling', function() {

    expect(ff.rpTarget2a.isPresent()).toBe(false);
    expect(ff.rpTarget2b.isPresent()).toBe(false);
    ff.rpSrc2.clear();
    expect(ff.rpTarget2a.isPresent()).toBe(false);
    expect(ff.rpTarget2b.isPresent()).toBe(false);
    testUtil.sendKeys(ff.rpSrc2, '1');
    expect(ff.rpTarget2a.isPresent()).toBe(false);
    ff.rpSrc2.clear();
    testUtil.sendKeys(ff.rpSrc2, '2');
    expect(ff.rpTarget2a.isDisplayed()).toBe(true);

    expect(ff.rpTarget1a.isPresent()).toBe(false);
    expect(ff.rpTarget1ah1.isPresent()).toBe(false);
    testUtil.sendKeys(ff.rpSubSrc1, '1');
    expect(ff.rpTarget1a.isDisplayed()).toBe(true);
    expect(ff.rpTarget1ah1.isDisplayed()).toBe(true);

    // add a new section
    ff.rpAdd.click();
    expect(ff.rpTarget1b.isPresent()).toBe(false);
    expect(ff.rpTarget1bh1.isPresent()).toBe(false);

    expect(ff.rpTarget2a.isDisplayed()).toBe(true);
    expect(ff.rpTarget2b.isDisplayed()).toBe(true);
    ff.rpSrc2.clear();
    testUtil.sendKeys(ff.rpSrc2, '1');
    expect(ff.rpTarget2a.isPresent()).toBe(false);
    expect(ff.rpTarget2b.isPresent()).toBe(false);
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
          expect(targetEqual.isPresent()).toBe(false);
          expect(targetNotEqual.isDisplayed()).toBe(true);

          source.click();
          source.sendKeys(protractor.Key.ARROW_DOWN);
          source.sendKeys(protractor.Key.ENTER);
          expect(targetEqual.isDisplayed()).toBe(true);
          expect(targetNotEqual.isPresent()).toBe(false);

          source.click();
          source.sendKeys(protractor.Key.ARROW_DOWN);
          source.sendKeys(protractor.Key.ARROW_DOWN);
          source.sendKeys(protractor.Key.ENTER);

          expect(targetEqual.isPresent()).toBe(false);
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
        expect(targetWithSklSourceExists.isPresent()).toBe(false);
        expect(targetWithSklSourceNotExists.isDisplayed()).toBe(true);

        // Select to hide the skip logic target
        source.click();
        source.sendKeys(protractor.Key.ARROW_DOWN);
        source.sendKeys(protractor.Key.ENTER);
        expect(targetWithSklSourceExists.isPresent()).toBe(false);
        expect(targetWithSklSourceNotExists.isDisplayed()).toBe(true);

        // Select to show skip logic target item.
        source.click();
        source.sendKeys(protractor.Key.ARROW_DOWN);
        source.sendKeys(protractor.Key.ARROW_DOWN);
        source.sendKeys(protractor.Key.ENTER);
        expect(targetEqual.isDisplayed()).toBe(true);
        // Field is displayed but no value entered in the item. The chained targets skip logic is not satisfied.
        expect(targetWithSklSourceExists.isPresent()).toBe(false);
        expect(targetWithSklSourceNotExists.isDisplayed()).toBe(true);
        // Value entered in the item. The chained targets skip logic is satisfied.
        targetEqual.click();
        targetEqual.clear();
        testUtil.sendKeys(targetEqual, 'xxx');
        expect(targetWithSklSourceExists.isDisplayed()).toBe(true);
        expect(targetWithSklSourceNotExists.isPresent()).toBe(false);

      });
    }

    it('should work with data control whose source is controlled by skip logic', function () {
      tp.loadFromTestData('test-skiplogic-datacontrol.json');
      let source = element(by.id("1/1"));
      let skipLogicItem = element(by.id("2/1"));
      let dataControlItemWithSourceHavingSkipLogic = element(by.id("3/1"));

      expect(source.isDisplayed()).toBe(true);
      expect(skipLogicItem.isPresent()).toBe(false);
      expect(dataControlItemWithSourceHavingSkipLogic.isPresent()).toBe(false);

      // Not met skip logic condition ==> skip logic disabled
      source.click();
      testUtil.sendKeys(source, 'xxx');
      expect(skipLogicItem.isPresent()).toBe(false);
      expect(dataControlItemWithSourceHavingSkipLogic.isPresent()).toBe(false);

      // Met skip logic condition
      source.click();
      source.clear();
      testUtil.sendKeys(source, 'show 2');
      expect(skipLogicItem.isDisplayed()).toBe(true);

      // skipLogicItem is present but its value does not exists yet.
      expect(dataControlItemWithSourceHavingSkipLogic.isPresent()).toBe(false);

      skipLogicItem.click();
      testUtil.sendKeys(skipLogicItem, 'xxx');
      expect(dataControlItemWithSourceHavingSkipLogic.isDisplayed()).toBe(true);
      expect(dataControlItemWithSourceHavingSkipLogic.getAttribute('value')).toBe('xxx');
    });

  });
});
