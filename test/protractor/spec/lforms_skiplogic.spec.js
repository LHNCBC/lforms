describe('skip logic', function() {

  it('target items should be hidden initially', function() {
    browser.get('http://0.0.0.0:9001/');
    var formSearch = element(by.css('#s2id_loinc_num1 a'));

    browser.wait(function () {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    element(by.css('.select2-result:nth-of-type(5)')).click();
    element(by.css('.btn')).click();

    var ff = require('./fullFeaturedForm.po');
    ff.openFullFeaturedForm();

    // initially all hidden
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isPresent()).toBeFalsy();
    expect(ff.t4.isPresent()).toBeFalsy();
    expect(ff.t5.isPresent()).toBeFalsy();
  });

  it('should show a sibling and two items in a sibling section', function() {
    var ff = require('./fullFeaturedForm.po');
    ff.src.sendKeys('1');
    expect(ff.t1.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should hide a sibling and show two items in a sibling section', function() {
    var ff = require('./fullFeaturedForm.po');
    ff.src.clear();
    ff.src.sendKeys('2');
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isDisplayed()).toBe(true);
    expect(ff.t5.isDisplayed()).toBe(true);
  });

  it('should show another sibling and hide two items in a sibling section', function() {
    var ff = require('./fullFeaturedForm.po');
    ff.src.clear();
    ff.src.sendKeys('6');
    expect(ff.t1.isPresent()).toBeFalsy();
    expect(ff.t2.isDisplayed()).toBe(true);
    expect(ff.t4.isPresent()).toBeFalsy();
    expect(ff.t5.isPresent()).toBeFalsy();
  });

  it('should work with logic ALL from two different sources', function() {
    var ff = require('./fullFeaturedForm.po');
    // check logic ALL
    ff.allSrc1.clear();
    ff.allSrc2.clear();
    ff.allSrc1.sendKeys('1');
    expect(ff.allTarget.isPresent()).toBe(false);
    ff.allSrc2.sendKeys('2');
    expect(ff.allTarget.isDisplayed()).toBe(true);
    ff.anySrc1.clear();
    ff.allSrc1.sendKeys('2');
    expect(ff.allTarget.isPresent()).toBe(false);
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
    expect(ff.anyTarget.isPresent()).toBe(false);
    ff.anySrc2.clear();
    ff.anySrc2.sendKeys('2');
    expect(ff.anyTarget.isDisplayed()).toBe(true);

  });
});
