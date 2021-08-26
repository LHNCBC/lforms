import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('load saved user data', function() {
  let tp: TestPage; 
  let ff: any;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    tp.LoadForm.openFormWithUserData()
    ff = tp.FormWithUserData;
  });


  it('should load BL, ST, DT, DTM, INT, answer lists', function() {

    expect(ff.q0.getAttribute('ng-reflect-model')).toBe("true");
    expect(ff.q1.getAttribute('value')).toBe('no data type');
    expect(ff.q2.getAttribute('value')).toBe('100');
    expect(ff.q3.getAttribute('value')).toBe('user input value');
    expect(ff.q4.getAttribute('value')).toBe('11/17/2015');
    expect(ff.q5.getAttribute('value')).toBe('Answer 2');
    expect(ff.q6.getAttribute('value')).toBe('Answer 2');
    expect(ff.q7.getAttribute('value')).toBe('Answer 3');

    expect(ff.q8.getAttribute('value')).toBe('');
    expect(ff.q9.getAttribute('value')).toBe('');
    // NEXT: the saved value is 11/20/2015 10:10 !!
    expect(ff.q99.getAttribute('value')).toBe('11/20/2015 10:10:00'); //DTM 
    expect(ff.multiAnswers.count()).toBe(6);
    expect(ff.multiAnswers.get(0).getText()).toBe('×Answer 1');
    expect(ff.multiAnswers.get(1).getText()).toBe('×Answer 3');
    expect(ff.multiAnswers.get(2).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(3).getText()).toBe('×User created answer');
    expect(ff.multiAnswers.get(4).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(5).getText()).toBe('×User created answer');

  });

  it('should load unit value', function(){
    expect(ff.unit1.getAttribute('value')).toBe('123');
    expect(ff.unit1_unit.getAttribute('value')).toBe('kgs');
    expect(ff.unit2.getAttribute('value')).toBe('456');
    expect(ff.unit2_unit.getAttribute('value')).toBe('kgs');
    expect(TestUtil.getAttribute(element(by.id('/unit3/1')),'value')).toBe('789');
    expect(TestUtil.getAttribute(element(by.id('unit_/unit3/1')),'value')).toBe('kgs');
  });

  it('skip logic should work with loaded user data', function() {
    expect(ff.src.getAttribute('value')).toBe('2');
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t2.getAttribute('value')).toBe('200');
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t4.getAttribute('value')).toBe('201');
    expect(ff.t5.isDisplayed()).toBe(true);
    expect(ff.t5.getAttribute('value')).toBe('202');
  });

  it('repeating items should be shown', function() {
    expect(ff.rpq1_1.isDisplayed()).toBe(true);
    expect(ff.rpq1_1.getAttribute('value')).toBe('instance A');
    expect(ff.rpq1_2.isDisplayed()).toBe(true);
    expect(ff.rpq1_2.getAttribute('value')).toBe('instance B');
    expect(ff.rpq1_add_btn.isDisplayed()).toBe(true);
    expect(ff.rpq1_add_btn.getText()).toBe('+ Add another "A Repeating Item"');

  });

  it('repeating items/section within a repeating section should be shown', function() {
    expect(ff.rpq2_1.isDisplayed()).toBe(true);
    expect(ff.rpq2_2.isDisplayed()).toBe(true);
    expect(ff.rpq3_1.isDisplayed()).toBe(true);
    expect(ff.rpq3_1.getAttribute('value')).toBe('300');
    expect(ff.rpq3_2.isDisplayed()).toBe(true);
    expect(ff.rpq3_2.getAttribute('value')).toBe('301');
    expect(ff.rpq4_1.isDisplayed()).toBe(true);
    expect(ff.rpq4_2.isDisplayed()).toBe(true);
    expect(ff.rpq4_3.isDisplayed()).toBe(true);
    expect(ff.rpq4_5.isDisplayed()).toBe(true);
    expect(ff.rpq5_1.isDisplayed()).toBe(true);
    expect(ff.rpq5_1.getAttribute('value')).toBe('400');
    expect(ff.rpq5_2.isDisplayed()).toBe(true);
    expect(ff.rpq5_2.getAttribute('value')).toBe('401');
    expect(ff.rpq5_3.isDisplayed()).toBe(true);
    expect(ff.rpq5_3.getAttribute('value')).toBe('402');
    expect(ff.rpq5_5.isDisplayed()).toBe(true);
    expect(ff.rpq5_5.getAttribute('value')).toBe('403');

    expect(ff.rpq4_add_btn_1.isDisplayed()).toBe(true);
    expect(ff.rpq4_add_btn_1.getText()).toBe('+ Add another "A repeating section in a repeating section"');
    expect(ff.rpq4_add_btn_2.isDisplayed()).toBe(true);
    expect(ff.rpq4_add_btn_2.getText()).toBe('+ Add another "A repeating section in a repeating section"');
    expect(ff.rpq2_add_btn.isDisplayed()).toBe(true);
    expect(ff.rpq2_add_btn.getText()).toBe('+ Add another "A Repeating Section"');

    expect(ff.rpq4_del_btn_3.isDisplayed()).toBe(true);
    expect(ff.rpq4_del_btn_3.getText()).toBe('-');
    expect(ff.rqp2_del_btn_2.isDisplayed()).toBe(true);
    expect(ff.rqp2_del_btn_2.getText()).toBe('-');

  });

  it('skip logic on repeating section should work too', function() {
    ff.rpSrc2.clear();
    TestUtil.sendKeys(ff.rpSrc2, '1');
    // NEXT: isPresent() with false is not working 
    //expect(ff.rpTarget2a.isPresent()).toBe(false);
    ff.rpSrc2.clear();
    TestUtil.sendKeys(ff.rpSrc2, '2');
    expect(ff.rpTarget2a.isDisplayed()).toBe(true);
    ff.rpAdd.click();

    expect(ff.rpTarget2a.isDisplayed()).toBe(true);
    expect(ff.rpTarget2b.isDisplayed()).toBe(true);
    ff.rpSrc2.clear();
    TestUtil.sendKeys(ff.rpSrc2, '1');
    // NEXT: isPresent() with false is not working 
    //expect(ff.rpTarget2a.isPresent()).toBe(false);
    expect(ff.rpTarget2b.isPresent()).toBe(false);
  });

  it('form should be actionable', function() {

    // add a repeating item
    TestUtil.clickAddRemoveButton(ff.rpq1_add_btn);
    expect(ff.rpq1_add_btn.isPresent()).toBe(false);
    expect(ff.rpq1_add_btn_3.isDisplayed()).toBe(true);
    expect(ff.rpq1_add_btn_3.getText()).toBe('+ Add another "A Repeating Item"');
    expect(ff.rpq1_3.getAttribute('value')).toBe('');
    // add a repeating section
    TestUtil.clickAddRemoveButton(ff.rpq4_add_btn_1);
    expect(ff.rpq4_add_btn_1.isPresent()).toBe(false);
    expect(ff.rpq4_add_btn_1b.isDisplayed()).toBe(true);
    expect(ff.rpq4_add_btn_1b.getText()).toBe('+ Add another "A repeating section in a repeating section"');
    expect(ff.rpq5_4.getAttribute('value')).toBe('');

    // select from an answer list
    ff.q5.click();
    // pick the 1st item, Answer 1
    ff.q5.sendKeys(protractor.Key.ARROW_DOWN);
    ff.q5.sendKeys(protractor.Key.TAB);
    expect(ff.q5.getAttribute('value')).toBe('Answer 1');

    // select one more answer from multi select field
    ff.q8.click();
    // pick the 1st item, Answer 2
    ff.q8.sendKeys(protractor.Key.ARROW_DOWN);
    ff.q8.sendKeys(protractor.Key.TAB);
    expect(ff.multiAnswers.count()).toBe(7);
    expect(ff.multiAnswers.get(0).getText()).toBe('×Answer 1');
    expect(ff.multiAnswers.get(1).getText()).toBe('×Answer 3');
    expect(ff.multiAnswers.get(2).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(3).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(4).getText()).toBe('×User created answer');
    expect(ff.multiAnswers.get(5).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(6).getText()).toBe('×User created answer');
  });

  it('adding a repeating section that has repeating sub items with user data should show just one repeating item', function() {

    var addSectionButton = element(by.id("add-/rp-q2/2")),
        section3Label = element(by.id("label-/rp-q2/3")),
        section31Label = element(by.id("label-/rp-q2/rp-q4/3/1")),
        item31 = element(by.id("/rp-q2/rp-q3/3/1")),
        item311 = element(by.id("/rp-q2/rp-q4/rp-q5/3/1/1")),
        item312 = element(by.id("/rp-q2/rp-q4/rp-q5/3/1/2"));

    addSectionButton.click();

    expect(section3Label.isDisplayed()).toBe(true);
    expect(section31Label.isDisplayed()).toBe(true);
    expect(item31.isDisplayed()).toBe(true);
    expect(item31.getAttribute('value')).toBe('');
    expect(item311.isDisplayed()).toBe(true);
    expect(item311.getAttribute('value')).toBe('');
    expect(item312.isPresent()).toBe(false);

  });

  it('should display user value and default answers on CWE typed items when answers are displayed as radio buttons and checkboxes', function() {

    var cwe1Other = element(by.id("/cwe-checkbox-user-value/1_other")).element(by.css('input')),
        cwe1OtherValue = element(by.id("/cwe-checkbox-user-value/1_otherValue")),

        cwe2Ans1 = element(by.id("/cwe-checkbox-user-value-and-answer-code/1c1")).element(by.css('input')),
        cwe2Other = element(by.id("/cwe-checkbox-user-value-and-answer-code/1_other")).element(by.css('input')),
        cwe2OtherValue = element(by.id("/cwe-checkbox-user-value-and-answer-code/1_otherValue")),

        cwe3Ans2 = element(by.id("/cwe-checkbox-user-value-and-answer-text/1c2")).element(by.css('input')),
        cwe3Other = element(by.id("/cwe-checkbox-user-value-and-answer-text/1_other")).element(by.css('input')),
        cwe3OtherValue = element(by.id("/cwe-checkbox-user-value-and-answer-text/1_otherValue")),

        cwe4Ans3 = element(by.id("/cwe-checkbox-user-value-and-answer/1c3")).element(by.css('input')),
        cwe4Other = element(by.id("/cwe-checkbox-user-value-and-answer/1_other")).element(by.css('input')),
        cwe4OtherValue = element(by.id("/cwe-checkbox-user-value-and-answer/1_otherValue")),

        cwe5Other = element(by.id("/cwe-checkbox-default-answer/1_other")).element(by.css('input')),
        cwe5OtherValue = element(by.id("/cwe-checkbox-default-answer/1_otherValue")),

        cwe6Other = element(by.id("/cwe-radio-user-value/1_other")).element(by.css('input')),
        cwe6OtherValue = element(by.id("/cwe-radio-user-value/1_otherValue")),

        cwe7Other = element(by.id("/cwe-radio-default-answer/1_other")).element(by.css('input')),
        cwe7OtherValue = element(by.id("/cwe-radio-default-answer/1_otherValue"));


    // OTHER in checkbox display with the user value not in the answer list
    expect(cwe1Other.isSelected()).toBe(true);
    expect(cwe1OtherValue.getAttribute('value')).toBe('user typed value');
    // OTHER and an answer that has only a 'code', in checkbox display with the user value not in the answer list
    expect(cwe2Ans1.isSelected()).toBe(true);
    expect(cwe2Other.isSelected()).toBe(true);
    expect(cwe2OtherValue.getAttribute('value')).toBe('user typed value');
    // OTHER and an answer that has only a 'text', in checkbox display with the user value not in the answer list
    expect(cwe3Ans2.isSelected()).toBe(true);
    expect(cwe3Other.isSelected()).toBe(true);
    expect(cwe3OtherValue.getAttribute('value')).toBe('user typed value');
    // OTHER and an answer that has a 'code and a 'text', in checkbox display with the user value not in the answer list
    expect(cwe4Ans3.isSelected()).toBe(true);
    expect(cwe4Other.isSelected()).toBe(true);
    expect(cwe4OtherValue.getAttribute('value')).toBe('user typed value');
    // default answer is not in the answer list, checkbox display, other value set
    expect(cwe5Other.isSelected()).toBe(true);
    expect(cwe5OtherValue.getAttribute('value')).toBe('off-list default answer');
    // OTHER, in radiobutton display with the user value not in the answer list
    expect(cwe6Other.isSelected()).toBe(true);
    expect(cwe6OtherValue.getAttribute('value')).toBe('user typed value');
    // default answer is not in the answer list, radiobutton display, other value set
    expect(cwe7Other.isSelected()).toBe(true);
    expect(cwe7OtherValue.getAttribute('value')).toBe('off-list default answer');

  });


});

describe('load saved user data, where hasSavedData is set to true', function() {
  let tp: TestPage; 
  let ff: any;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    tp.LoadForm.openFormWithUserData()
    ff = tp.FormWithUserData;
  });

  it('should not load default values', function () {

    tp.LoadForm.openFormWithUserDataWithHasSavedData();
    expect(ff.q5.getAttribute('value')).toBe('');

    var cwe5Other = element(by.id("/cwe-checkbox-default-answer/1_other")),
        cwe7Other = element(by.id("/cwe-radio-default-answer/1_other"));

    // default answer is not in the answer list,
    expect(cwe5Other.isSelected()).toBe(false);
    expect(cwe7Other.isSelected()).toBe(false);

  });
});
