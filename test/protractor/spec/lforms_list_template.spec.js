var tp = require('./lforms_testpage.po.js');

describe('List template', function() {

  it('displays 4 different types of answer layouts', function () {
    tp.openListTemplate();

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
    }, 5000);

    expect(item1answer1.isDisplayed()).toBe(true);
    expect(item4answer1.isDisplayed()).toBe(true);

    // first answer list
    item1answer1.evaluate("item.value").then(function (value) {
      expect(value).toBe(null);
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
      expect(value).toBe(null);
    });

    item3answer1.click();
    item3answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(1);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
    });
    item3answer3.click();
    item3answer1.evaluate("item.value").then(function (value) {
      expect(value.length).toBe(2);
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
      expect(value[1].code).toBe('c3');
      expect(value[1].text).toBe('Answer Z');
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

    // other model values are not changes
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
      expect(value[0].code).toBe('c1');
      expect(value[0].text).toBe('Answer X');
      expect(value[1].code).toBe('c3');
      expect(value[1].text).toBe('Answer Z');
    });

  });

  it('repeating items/sections works', function () {
    tp.openListTemplate();

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
    }, 5000);

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
    tp.openListTemplate();

    var item1answer1 = element(by.id('/g4/g1m1/1/1c1')),
        item1answer2 = element(by.id('/g4/g1m1/1/1c2')),
        item2answer1 = element(by.id('/g4/g1m2/1/1c1')),
        item2answer3 = element(by.id('/g4/g1m2/1/1c3'));

    browser.wait(function () {
      return item1answer1.isDisplayed();
    }, 5000);

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

});
