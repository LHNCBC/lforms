var tp = require('./lforms_testpage.po.js');

describe('Copyright popover message', function() {

  var formCopyright = element(by.css('div[content="A Copyright notice of the form"]'));
  var itemCopyright = element(by.css('div[content="A Copyright notice of the item"]'));


  it('should show a copyright popover message on the form title', function () {
    tp.openFullFeaturedForm();
    //browser.wait(function() {
    //  return false;
    //}, 500000);
    element(by.id("copyright-all-in-one")).click();
    expect(formCopyright.isDisplayed()).toBe(true);
  });

  it('should show a copyright popover message on an item', function () {
    element(by.id("copyright-/type0/1")).click();
    expect(itemCopyright.isDisplayed()).toBe(true);
  });
});

