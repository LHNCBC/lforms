describe('skip logic', function() {


  it('target items should be hidden initially', function() {
    var dp = require('./demopage.po');
    dp.openFullFeaturedForm();
    var ff = require('./fullFeaturedForm.po');

    // initially all hidden
    browser.waitForAngular();
    expect(ff.t1.isDisplayed()).toBe(false);
    expect(ff.t2.isDisplayed()).toBe(false);
    expect(ff.t4.isDisplayed()).toBe(false);
    expect(ff.t5.isDisplayed()).toBe(false);
  });

  it('should show a sibling and two items in a sibling section', function() {
    var ff = require('./fullFeaturedForm.po');
    ff.src.sendKeys('1');
    browser.waitForAngular();
    expect(ff.t1.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should hide a sibling and show two items in a sibling section', function() {
    var ff = require('./fullFeaturedForm.po');
    ff.src.clear();
    ff.src.sendKeys('2');
    browser.waitForAngular();
    expect(ff.t1.isDisplayed()).toBe(false);
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should show another sibling and hide two items in a sibling section', function() {
    var ff = require('./fullFeaturedForm.po');
    ff.src.clear();
    ff.src.sendKeys('6');
    browser.waitForAngular();
    expect(ff.t1.isDisplayed()).toBe(false);
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(false);
    expect(ff.t5.isDisplayed()).toBe(false);

  });

  it('should work with logic ALL from two different sources', function() {
    var ff = require('./fullFeaturedForm.po');
    // check logic ALL
    ff.allSrc1.clear();
    ff.allSrc2.clear();
    ff.allSrc1.sendKeys('1');
    expect(ff.allTarget.isDisplayed()).toBe(false);
    ff.allSrc2.sendKeys('2');
    expect(ff.allTarget.isDisplayed()).toBe(true);
    ff.anySrc1.clear();
    ff.allSrc1.sendKeys('2');
    expect(ff.allTarget.isDisplayed()).toBe(false);
  });

  it('should work with logic ANY from two different sources', function() {
    var ff = require('./fullFeaturedForm.po');
    // check logic ANY
    ff.anySrc1.clear();
    ff.anySrc2.clear();
    ff.anySrc1.sendKeys('1');
    expect(ff.anyTarget.isDisplayed()).toBe(true);
    ff.anySrc2.sendKeys('1');
    expect(ff.anyTarget.isDisplayed()).toBe(true);
    ff.anySrc1.sendKeys('2');
    ff.anySrc1.clear();
    expect(ff.anyTarget.isDisplayed()).toBe(false);
    ff.anySrc2.clear();
    ff.anySrc2.sendKeys('2');
    expect(ff.anyTarget.isDisplayed()).toBe(true);

  });
});
