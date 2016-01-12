var tp = require('./lforms_testpage.po.js');
var ff = tp.FullFeaturedForm;
describe('data control', function() {

  it('data change on source field should update target fields', function() {
    tp.openFullFeaturedForm();

    ff.dcSource.sendKeys('Haloperidol');
    browser.wait(function() {
      return ff.searchResults.isDisplayed();
    }, 5000);
    ff.dcSource.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcSource.sendKeys(protractor.Key.TAB);
    expect(ff.dcSource.getAttribute('value')).toBe("Haloperidol (Oral Pill)");

    ff.dcTarget1.click();
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(ff.dcTarget1.getAttribute('value')).toBe("1 mg Tab");

    expect(ff.dcTarget2.getAttribute('value')).toBe(" 0.5 mg Tab");  // there are heading spaces

    // pick a different value on source field
    ff.dcSource.clear();
    ff.dcSource.sendKeys('Haloperidol');
    browser.wait(function() {
      return ff.searchResults.isDisplayed();
    }, 5000);
    ff.dcSource.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcSource.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcSource.sendKeys(protractor.Key.TAB);
    expect(ff.dcSource.getAttribute('value')).toBe("Haloperidol (Injectable)");

    ff.dcTarget1.click();
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(ff.dcTarget1.getAttribute('value')).toBe("5 mg/ml Sol");

    expect(ff.dcTarget2.getAttribute('value')).toBe("  5 mg/ml Injection"); // there are heading spaces

  });
});
