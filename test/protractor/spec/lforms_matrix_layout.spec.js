var tp = require('./lforms_testpage.po.js');

describe('Form level Matrix layout', function() {

  it('displays a radio matrix table', function() {
    tp.openMatrixLayout1();

    var item1answer1 = element(by.id('/g1m1/1c1')),
        item1answer2 = element(by.id('/g1m1/1c2')),
        item4answer1 = element(by.id('/g1m4/1c1')),
        item4answer4 = element(by.id('/g1m4/1c4'));

    browser.wait(function() {
      return item1answer1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);

    expect(item1answer1.isDisplayed()).toBe(true);
    expect(item4answer4.isDisplayed()).toBe(true);

    // first question
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value).toBe(null);
    });

    item1answer1.click();
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.code).toBe('c1');
      expect(value.text).toBe('Answer a');
    });
    item1answer2.click();
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.code).toBe('c2');
      expect(value.text).toBe('Answer b');
    });

    // fourth question
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value).toBe(null);
    });

    item4answer1.click();
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value.code).toBe('c1');
      expect(value.text).toBe('Answer a');
    });
    item4answer4.click();
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value.code).toBe('c4');
      expect(value.text).toBe('Answer d');
    });

    // the value on the first question does not change
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.code).toBe('c2');
      expect(value.text).toBe('Answer b');
    });

  });

  it('displays a checkbox matrix table', function() {
    tp.openMatrixLayout2();

    var item1answer1 = element(by.id('/g1m1/1c1')),
        item1answer2 = element(by.id('/g1m1/1c2')),
        item1Other = element(by.id('/g1m1/1_other')),
        item1OtherValue = element(by.id('/g1m1/1_otherValue')),
        item4answer1 = element(by.id('/g1m4/1c1')),
        item4answer4 = element(by.id('/g1m4/1c4')),
        item4Other = element(by.id('/g1m4/1_other')),
        item4OtherValue = element(by.id('/g1m4/1_otherValue'));

    browser.wait(function() {
      return item1answer1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);

    expect(item1answer1.isDisplayed()).toBe(true);
    expect(item4answer4.isDisplayed()).toBe(true);

    // first question
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value).toBe(null);
    });

    item1answer1.click();
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(1);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
    });
    item1answer2.click();
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
    });
    item1Other.click();
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(3);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
      expect(value[2].code).toBe(null);
      expect(value[2].text).toBe(null);
    });

    item1OtherValue.sendKeys('other values');
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(3);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
      expect(value[2].code).toBe('other values');
      expect(value[2].text).toBe('other values');
    });

    // change the other value alone will update the data model when the checkbox is checked.
    item1OtherValue.clear();
    item1OtherValue.sendKeys('other values again');
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(3);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
      expect(value[2].code).toBe('other values again');
      expect(value[2].text).toBe('other values again');
    });

    // fourth question
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value).toBe(null);
    });

    item4answer1.click();
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(1);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
    });
    item4answer4.click();
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c4');
      expect(value[1].text).toBe('Answer 4');
    });

    item4OtherValue.sendKeys('others');
    // model value does not change when the checkbox is not checked
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c4');
      expect(value[1].text).toBe('Answer 4');
    });
    // mode value changes after the checkbox is clicked
    item4Other.click();
    item4answer4.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(3);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c4');
      expect(value[1].text).toBe('Answer 4');
      expect(value[2].code).toBe('others');
      expect(value[2].text).toBe('others');
    });

    // the value on the first question does not change
    item1answer1.evaluate("subItem.value").then(function(value) {
      expect(value.length).toBe(3);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
      expect(value[2].code).toBe('other values again');
      expect(value[2].text).toBe('other values again');
    });

  });

});
