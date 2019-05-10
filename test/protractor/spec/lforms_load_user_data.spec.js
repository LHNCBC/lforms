var util = require('./util');
var tp = require('./lforms_testpage.po.js');
var ff = tp.FormWithUserData;
describe('load saved user data', function() {

  it('should load ST, DT, DTM, INT, answer lists', function() {

    tp.openFormWithUserData();
    expect(ff.q1.getAttribute('value')).toBe('no data type');
    expect(ff.q2.getAttribute('value')).toBe('100');
    expect(ff.q3.getAttribute('value')).toBe('user input value');
    expect(ff.q4.getAttribute('value')).toBe('11/17/2015');
    expect(ff.q5.getAttribute('value')).toBe('Answer 2');
    expect(ff.q6.getAttribute('value')).toBe('Answer 1');
    expect(ff.q7.getAttribute('value')).toBe('Answer 3');

    expect(ff.q8.getAttribute('value')).toBe('');
    expect(ff.q9.getAttribute('value')).toBe('');
    expect(ff.q99.getAttribute('value')).toBe('11/20/2015 10:10'); //DTM
    expect(ff.multiAnswers.count()).toBe(6);
    expect(ff.multiAnswers.get(0).getText()).toBe('×Answer 1');
    expect(ff.multiAnswers.get(1).getText()).toBe('×Answer 3');
    expect(ff.multiAnswers.get(2).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(3).getText()).toBe('×User created answer');
    expect(ff.multiAnswers.get(4).getText()).toBe('×Answer 2');
    expect(ff.multiAnswers.get(5).getText()).toBe('×User created answer');

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
    ff.rpSrc2.sendKeys('1');
    expect(ff.rpTarget2a.isPresent()).toBe(false);
    ff.rpSrc2.clear();
    ff.rpSrc2.sendKeys('2');
    expect(ff.rpTarget2a.isDisplayed()).toBe(true);
    ff.rpAdd.click();

    expect(ff.rpTarget2a.isDisplayed()).toBe(true);
    expect(ff.rpTarget2b.isDisplayed()).toBe(true);
    ff.rpSrc2.clear();
    ff.rpSrc2.sendKeys('1');
    expect(ff.rpTarget2a.isPresent()).toBe(false);
    expect(ff.rpTarget2b.isPresent()).toBe(false);
  });

  it('form should be actionable', function() {

    // add a repeating item
    util.clickAddRemoveButton(ff.rpq1_add_btn);
    expect(ff.rpq1_add_btn.isPresent()).toBe(false);
    expect(ff.rpq1_add_btn_3.isDisplayed()).toBe(true);
    expect(ff.rpq1_add_btn_3.getText()).toBe('+ Add another "A Repeating Item"');
    expect(ff.rpq1_3.getAttribute('value')).toBe('');
    // add a repeating section
    util.clickAddRemoveButton(ff.rpq4_add_btn_1);
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


});
