import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('formula', function() {
  let tp: TestPage; 
  let ff: any;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    ff = tp.USSGFHTVertical;
  });

  it('Two BMI formulas should both work', function() {

    tp.LoadForm.openUSSGFHTVertical();

    // check bmi1
    TestUtil.sendKeys(ff.height1, "70");
    browser.sleep(5000)
    expect(TestUtil.getAttribute(ff.bmi1,'value')).toBe("");
    TestUtil.sendKeys(ff.weight1, "170");
    expect(TestUtil.getAttribute(ff.bmi1,'value')).toBe("24.39");
    ff.height1.clear();
    TestUtil.sendKeys(ff.height1, "80");
    expect(TestUtil.getAttribute(ff.bmi1,'value')).toBe("18.68");

    // change height unit and check bmi1 again
    ff.heightUnit1.click();
    // pick the 2nd item, centimeters
    ff.heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.heightUnit1.sendKeys(protractor.Key.TAB);
    ff.height1.clear();
    TestUtil.sendKeys(ff.height1, "170");
    expect(TestUtil.getAttribute(ff.bmi1,'value')).toBe("26.68");

    // change weight unit and check bmi1 again
    ff.weightUnit1.click();
    // pick the 2nd item, kgs
    ff.weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.weightUnit1.sendKeys(protractor.Key.TAB);
    ff.weight1.clear();
    TestUtil.sendKeys(ff.weight1, "80");
    expect(TestUtil.getAttribute(ff.bmi1,'value')).toBe("27.68");

    // check bmi2
    TestUtil.sendKeys(ff.height2, "70");
    expect(ff.bmi2.getAttribute('value')).toBe("");
    TestUtil.sendKeys(ff.weight2, "170");
    expect(ff.bmi2.getAttribute('value')).toBe("24.39");
    ff.height2.clear();
    TestUtil.sendKeys(ff.height2, "80");
    expect(ff.bmi2.getAttribute('value')).toBe("18.68");
  });

  it('should work with calculation method having skip logic disabled sources', function() {
    tp.openBaseTestPage();
    tp.loadFromTestData('skip-logic-calculation-method.json'); 
    let sklSource = element(by.id('SKL-CONTROL/1'));
    let sklTarget = element(by.id('A-ITEM/1'));
    let noSklItem = element(by.id('B-ITEM/1'));
    let totalScore = element(by.id('TS/1'));

    expect(sklSource.isDisplayed()).toBe(true);
    expect(TestUtil.getAttribute(sklSource,'value')).toBe('');
    expect(sklTarget.isPresent()).toBe(false);
    expect(noSklItem.isDisplayed()).toBe(true);
    expect(TestUtil.getAttribute(noSklItem,'value')).toBe('');
    expect(totalScore.isDisplayed()).toBe(true);
    expect(TestUtil.getAttribute(totalScore,'value')).toBe('0');

    noSklItem.click();
    noSklItem.sendKeys(protractor.Key.ARROW_DOWN);
    noSklItem.sendKeys(protractor.Key.ARROW_DOWN);
    noSklItem.sendKeys(protractor.Key.ENTER);
    expect(TestUtil.getAttribute(noSklItem,'value')).toBe('1. B2 - 10');
    expect(TestUtil.getAttribute(totalScore,'value')).toBe('10');

    sklSource.click();
    sklSource.sendKeys(protractor.Key.ARROW_DOWN);
    sklSource.sendKeys(protractor.Key.ARROW_DOWN);
    sklSource.sendKeys(protractor.Key.ENTER);
    expect(sklTarget.isDisplayed()).toBe(true);
    expect(TestUtil.getAttribute(totalScore,'value')).toBe('10');

    sklTarget.sendKeys(protractor.Key.ARROW_DOWN);
    sklTarget.sendKeys(protractor.Key.ARROW_DOWN);
    sklTarget.sendKeys(protractor.Key.ARROW_DOWN);
    sklTarget.sendKeys(protractor.Key.ENTER);
    expect(TestUtil.getAttribute(sklTarget,'value')).toBe('2. A3 - 20');
    expect(TestUtil.getAttribute(totalScore,'value')).toBe('30');

    // Hide skip logic target, total score should change to 10
    sklSource.click();
    sklSource.sendKeys(protractor.Key.ARROW_DOWN);
    sklSource.sendKeys(protractor.Key.ENTER);
    expect(sklTarget.isPresent()).toBe(false);
    expect(TestUtil.getAttribute(totalScore,'value')).toBe('10');

    // Show skip logic target, total score should change back to 30
    sklSource.click();
    sklSource.sendKeys(protractor.Key.ARROW_DOWN);
    sklSource.sendKeys(protractor.Key.ARROW_DOWN);
    sklSource.sendKeys(protractor.Key.ENTER);
    expect(sklTarget.isDisplayed()).toBe(true);
    expect(TestUtil.getAttribute(sklTarget,'value')).toBe('2. A3 - 20');
    expect(TestUtil.getAttribute(totalScore,'value')).toBe('30');
  });

  // Multiple total scores are not supported any more. We might bring it back if there are such use cases.
  //
  // it('Two correctly structured TOTALSCORE rules on a form should both work', function() {
  //
  //   var answer1 = element(by.id("/44249-1/44250-9/1/1")),
  //       answer2 = element(by.id("/44249-1/44255-8/1/1")),
  //       score1 = element(by.id("/44249-1/44261-6/1/1"));
  //
  //   var answer3 = element(by.id("/38213-5/38216-8/1/1")),
  //       answer4 = element(by.id("/38213-5/38217-6/1/1")),
  //       score2 = element(by.id("/38213-5/38215-0/1/1"));
  //
  //   tp.openTwoTotalScoreForm();
  //   expect(score1.getAttribute('value')).toBe("0");
  //   expect(score2.getAttribute('value')).toBe("0");
  //
  //   //check total score #1
  //   answer1.click();
  //   answer1.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer1.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer1.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("1");
  //   expect(score2.getAttribute('value')).toBe("0");
  //   answer2.click();
  //   answer2.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer2.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer2.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("2");
  //   expect(score2.getAttribute('value')).toBe("0");
  //
  //   //check total score #2
  //   answer3.click();
  //   answer3.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer3.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer3.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer3.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("2");
  //   expect(score2.getAttribute('value')).toBe("2");
  //   answer4.click();
  //   answer4.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer4.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer4.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer4.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("2");
  //   expect(score2.getAttribute('value')).toBe("4");
  //
  // })
});
