var tp = require('./lforms_testpage.po.js');

describe('Copyright popover message', function() {

  var formCopyright = element(by.css('div[content="A Copyright notice of the form"]'));
  var itemCopyright = element(by.css('div[content="A Copyright notice of the item"]'));

  it('should show a copyright popover message on the form title', function () {
    tp.openFullFeaturedForm();
    element(by.id("copyright-all-in-one")).click();
    expect(formCopyright.isDisplayed()).toBe(true);
  });

  it('should show a copyright popover message on an item', function () {
    element(by.id("copyright-/type0/1")).click();
    browser.wait(function() {
      return itemCopyright.isPresent();
    }, 5000);
    expect(itemCopyright.isDisplayed()).toBe(true);
  });
});

describe('coding instructions help message', function() {

  var popover = element(by.css('.name-label .popover-content'));
  var popverHTMLLink = popover.element(by.css('a[href="http://lforms-demo.nlm.nih.gov"]'));

  var codeCheckbox = tp.checkboxesFinder.get(1);

  it('should have HTML content', function () {
    var inline = element.all(by.css('.name-label span[ng-switch-when="inline-html"]')).get(1);
    var inlineHTMLLink = inline.element(by.css('a[href="http://lforms-demo.nlm.nih.gov"]'));
    var helpButton1 = element(by.id("help-/type0/1"));
    var helpButton2 = element(by.id("help-/type1/1"));

    var field1 = element(by.id("/type0/1"));

    tp.openFullFeaturedForm();

    // popover
    expect(helpButton1.isDisplayed()).toBe(true);
    expect(helpButton2.isDisplayed()).toBe(true);

    helpButton1.click();
    expect(popover.isDisplayed()).toBe(true);
    expect(popover.getText()).toBe( "simple text instructions");

    field1.click();
    browser.wait(function() {
      return popover.isPresent().then(function(result){return !result});
    }, 5000);

    helpButton2.click();
    expect(popover.isDisplayed()).toBe(true);
    expect(popverHTMLLink.isDisplayed()).toBe(true);

    // inline
    codeCheckbox.click();
    expect(inline.isDisplayed()).toBe(true);
    expect(inlineHTMLLink.isDisplayed()).toBe(true);

  });

  it('should have escaped HTML content', function () {
    var inline2 = element.all(by.css('.name-label span[ng-switch-when="inline-escaped"]')).get(0);
    var helpButton3 = element(by.id("help-/q1/1"));

    tp.openFormWithUserData();

    // popover
    expect(helpButton3.isDisplayed()).toBe(true);
    helpButton3.click();
    expect(popover.isDisplayed()).toBe(true);
    expect(popover.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo.nlm.nih.gov'>LForms Demo</a>");

    // inline
    codeCheckbox.click();
    expect(inline2.isDisplayed()).toBe(true);
    expect(inline2.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo.nlm.nih.gov'>LForms Demo</a>");

  });

});
