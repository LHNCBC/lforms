var tp = require('./lforms_testpage.po.js');

describe('display controls demo', function() {

  it('should show values as selected radio buttons/checkboxes', function() {
    tp.openDisplayControlsDemo();

    var item1Answer2 = element(by.id('/q1a/1c2'))
    var item1Answer3 = element(by.id('/q1a/1c3'))
    browser.wait(function () {
      return item1Answer2.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);

    expect(item1Answer2.isSelected()).not.toBe(true);
    expect(item1Answer3.isSelected()).toBe(true);

    var item3Answer2 = element(by.id('/q1c/1c2'))
    var item3Answer3 = element(by.id('/q1c/1c3'))
    expect(item3Answer2.isSelected()).toBe(true);
    expect(item3Answer3.isSelected()).toBe(true);
  });


  it('displays 4 different types of answer layouts', function () {
    tp.openDisplayControlsDemo();

    var item1answer1 = element(by.id('/q1a/1c1')),
        item1answer3 = element(by.id('/q1a/1c3')),
        item2answer1 = element(by.id('/q1b/1c1')),
        item2Other = element(by.id('/q1b/1_other')),
        item2OtherValue = element(by.id('/q1b/1_otherValue')),

        item3answer1 = element(by.id('/q1c/1c1')),
        item3answer3 = element(by.id('/q1c/1c3')),
        item4answer1 = element(by.id('/q1d/1c1')),
        item4Other = element(by.id('/q1d/1_other')),
        item4OtherValue = element(by.id('/q1d/1_otherValue'));

    browser.wait(function () {
      return item1answer1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);

    expect(item1answer1.isDisplayed()).toBe(true);
    expect(item4answer1.isDisplayed()).toBe(true);

    // check answers in 4 different column settings
    expect(element.all(by.css("span.lf-answer.lf-2-col")).count()).toBe(9);
    expect(element.all(by.css("span.lf-answer.lf-3-col")).count()).toBe(10);
    expect(element.all(by.css("span.lf-answer.lf-1-col")).count()).toBe(9);
    expect(element.all(by.css("span.lf-answer.lf-0-col")).count()).toBe(10);

    // first answer list
    item1answer1.evaluate("item.value").then(function (value) {
      // default value
      expect(value.code).toBe("c3");
      expect(value.text).toBe("Extra long answer text 123456789 Answer Z");
    });

    item1answer1.click();
    item1answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('c1');
      expect(value.text).toBe('Extra long answer text 123456789 Answer X');
    });
    item1answer3.click();
    item1answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('c3');
      expect(value.text).toBe('Extra long answer text 123456789 Answer Z');
    });

    // second answer list
    item2answer1.evaluate("item.value").then(function (value) {
      expect(value).toBe(null);
    });

    item2answer1.click();
    item2answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('c1');
      expect(value.text).toBe('Long answer text 123 Answer X');
    });
    item2Other.click();
    item2answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe(null);
      expect(value.text).toBe(null);
    });
    item2OtherValue.sendKeys('other values');
    item2answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('other values');
      expect(value.text).toBe('other values');
    });
    item2OtherValue.clear();
    item2OtherValue.sendKeys('other values again');
    item2answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('other values again');
      expect(value.text).toBe('other values again');
    });

    // third answer list
    item3answer1.evaluate("item.value").then(function (value) {
      expect(value).toEqual([{"code": "c2", "text": "Answer Y", "_displayText": "Answer Y" },
        {"code": "c3", "text": "Answer Z", "_displayText": "Answer Z" }]); // default values
    });

    item3answer1.click(); // appends first answer
    item3answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(3);
      expect(value[2].code).toBe('c1');
      expect(value[2].text).toBe('Answer X');
    });
    item3answer3.click(); // deselects third answer
    item3answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c2');
      expect(value[0].text).toBe('Answer Y');
      expect(value[1].code).toBe('c1');
      expect(value[1].text).toBe('Answer X');
    });

    // fourth answer list
    item4answer1.evaluate("item.value").then(function (value) {
      expect(value).toBe(null);
    });

    item4answer1.click();
    item4answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(1);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
    });
    item4Other.click();
    item4answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
      expect(value[1].code).toBe(null);
      expect(value[1].text).toBe(null);
    });

    item4OtherValue.sendKeys('other values');
    item4answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
      expect(value[1].code).toBe('other values');
      expect(value[1].text).toBe('other values');
    });

    // change the other value alone will update the data model when the checkbox is checked.
    item4OtherValue.clear();
    item4OtherValue.sendKeys('other values again');
    item4answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
      expect(value[1].code).toBe('other values again');
      expect(value[1].text).toBe('other values again');
    });

    // other model values are not changed
    item1answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('c3');
      expect(value.text).toBe('Extra long answer text 123456789 Answer Z');
    });
    item2answer1.evaluate("item.value").then(function (value) {
      expect(value.code).toBe('other values again');
      expect(value.text).toBe('other values again');
    });
    item3answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c2');
      expect(value[0].text).toBe('Answer Y');
      expect(value[1].code).toBe('c1');
      expect(value[1].text).toBe('Answer X');
    });

  });

  it('repeating items/sections works', function () {
    tp.openDisplayControlsDemo();

    var btnAdd1 = element(by.id('add-/g1/1')),
        btnAdd2 = element(by.id('add-/g1/g1g2/1/1')),
        btnAdd3 = element(by.id('add-/g2/1')),

        btnDel1 = element(by.id('del-/g1/2')),
        btnDel2 = element(by.id('del-/g1/g1g2/1/2')),
        btnDel3 = element(by.id('del-/g2/2')),

        q11 = element(by.id('/g1/g1m1/1/1')),
        q21 = element(by.id('/g1/g1g2/g1g2q1/1/1/1')),
        q31 = element(by.id('/g2/g1m1/1/1')),

        q12 = element(by.id('/g1/g1m1/2/1')),
        q22 = element(by.id('/g1/g1g2/g1g2q1/1/2/1')),
        q32 = element(by.id('/g2/g1m1/2/1'));

    browser.wait(function () {
      return btnAdd1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);

    expect(q11.isDisplayed()).toBe(true);
    expect(q21.isDisplayed()).toBe(true);
    expect(q31.isDisplayed()).toBe(true);
    expect(q12.isPresent()).toBe(false);
    expect(q22.isPresent()).toBe(false);
    expect(q32.isPresent()).toBe(false);

    btnAdd1.click();
    expect(q12.isDisplayed()).toBe(true);
    btnDel1.click();
    expect(q12.isPresent()).toBe(false);

    btnAdd2.click();
    expect(q22.isDisplayed()).toBe(true);
    btnDel2.click();
    expect(q22.isPresent()).toBe(false);

    btnAdd3.click();
    expect(q32.isDisplayed()).toBe(true);
    btnDel3.click();
    expect(q32.isPresent()).toBe(false);

  });

  it('section matrix works', function () {
    tp.openDisplayControlsDemo();

    var item1answer1 = element(by.id('/g4/g1m1/1/1c1')),
        item1answer2 = element(by.id('/g4/g1m1/1/1c2')),
        item2answer1 = element(by.id('/g4/g1m2/1/1c1')),
        item2answer3 = element(by.id('/g4/g1m2/1/1c3'));

    browser.wait(function () {
      return item1answer1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);

    // first row in matrix
    item1answer1.evaluate("subItem.value").then(function (value) {
      expect(value).toBe(null);
    });
    item1answer1.click();
    item1answer1.evaluate("subItem.value").then(function (value) {
      expect(value.length).toBe(1);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
    });
    item1answer2.click();
    item1answer1.evaluate("subItem.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
    });

    // second row in matrix
    item2answer1.evaluate("subItem.value").then(function (value) {
      expect(value).toBe(null);
    });
    item2answer1.click();
    item2answer1.evaluate("subItem.value").then(function (value) {
      expect(value.length).toBe(1);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
    });
    item2answer3.click();
    item2answer3.evaluate("subItem.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c3');
      expect(value[1].text).toBe('Answer 3');
    });
    // first row is data model does not change
    item1answer1.evaluate("subItem.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer 1');
      expect(value[1].code).toBe('c2');
      expect(value[1].text).toBe('Answer 2');
    });

  });

  it('should show disabled inputs', function() {
    tp.openFullFeaturedForm();

    var item1 = element(by.id('/readonlyST/1'));
    var item2 = element(by.id('/readonlyCNE-s/1'));
    var item3 = element(by.id('/readonlyCWE-m/1'));
    var item4c1 = element(by.id('/readonlyCNE-sb/1c1'));
    var item4c2 = element(by.id('/readonlyCNE-sb/1c2'));
    var item4c3 = element(by.id('/readonlyCNE-sb/1c3'));
    var item4c4 = element(by.id('/readonlyCNE-sb/1c4'));
    var item5c1 = element(by.id('/readonlyCWE-mb/1c1'));
    var item5c2 = element(by.id('/readonlyCWE-mb/1c2'));
    var item5c3 = element(by.id('/readonlyCWE-mb/1c3'));
    var item5c4 = element(by.id('/readonlyCWE-mb/1c4'));
    browser.wait(function () {
      return item1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
    expect(item1.isEnabled()).toBe(false);
    expect(item2.isEnabled()).toBe(false);
    expect(item3.isEnabled()).toBe(false);
    expect(item4c1.isEnabled()).toBe(false);
    expect(item4c2.isEnabled()).toBe(false);
    expect(item4c3.isEnabled()).toBe(false);
    expect(item4c4.isEnabled()).toBe(false);
    expect(item5c1.isEnabled()).toBe(false);
    expect(item5c2.isEnabled()).toBe(false);
    expect(item5c3.isEnabled()).toBe(false);
    expect(item5c4.isEnabled()).toBe(false);

  });

  it('should show changed font color', function() {
    tp.openFullFeaturedForm();

    var label1 = element(by.id('label-/q_lg/1'));

    browser.wait(function () {
      return label1.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
    expect(label1.getCssValue('color')).toBe('rgba(255, 0, 0, 1)'); // red

  });
});
