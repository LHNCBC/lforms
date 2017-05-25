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

    ff.dcTarget2.getAttribute('value').then(function(v) {
      expect(v.trim()).toBe("0.5 mg Tab");
    });

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
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(ff.dcTarget1.getAttribute('value')).toBe("5 mg/ml Sol");

    ff.dcTarget2.getAttribute('value').then(function(v) {
      expect(v.trim()).toBe("5 mg/ml Injection 1 ml");
    });

  });

  it('can control questionCardinality of a horizontal table', function() {
    tp.openFullFeaturedForm();

    var src = element(by.id('/cardinalityControl/1'));
    var btnAdd1 = element(by.id('add-/horizontalTable/1'));
    var btnAdd2 = element(by.id('add-/horizontalTable/2'));
    var btnDel1 = element(by.id('del-/horizontalTable/1'));
    var btnDel2 = element(by.id('del-/horizontalTable/2'));
    var field1 = element(by.id('/horizontalTable/colA/1/1'));
    var field2 = element(by.id('/horizontalTable/colA/2/1'));

    // initially a non-repeating table, no 'add' buttons
    expect(btnAdd1.isPresent()).toBe(false);
    expect(field1.isDisplayed()).toBe(true);
    expect(field2.isPresent()).toBe(false);

    // make it repeating
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    expect(btnAdd1.isDisplayed()).toBe(true);
    expect(btnAdd2.isPresent()).toBe(false);
    expect(btnDel1.isPresent()).toBe(false);
    expect(btnDel2.isPresent()).toBe(false);
    expect(btnAdd1.getText()).toBe('Add another "A repeating horizontal table"');

    // 'add' button works
    btnAdd1.click();
    expect(btnAdd1.isPresent()).toBe(true);
    expect(btnAdd2.isPresent()).toBe(false);
    expect(btnDel1.isDisplayed()).toBe(true);
    expect(btnDel2.isDisplayed()).toBe(true);
    expect(btnAdd1.getText()).toBe('Add another "A repeating horizontal table"');
    expect(field1.isDisplayed()).toBe(true);
    expect(field2.isDisplayed()).toBe(true);

    // 'del' button works
    ff.dcSource.sendKeys('Haloperidol');
    btnDel1.click();
    expect(btnAdd1.isPresent()).toBe(false);
    expect(btnAdd2.isDisplayed()).toBe(true);
    expect(btnDel1.isPresent()).toBe(false);
    expect(btnDel2.isPresent()).toBe(false);
    expect(field1.isPresent()).toBe(false);
    expect(field2.isDisplayed()).toBe(true);

    // change back to non-repeating table
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    expect(btnAdd1.isPresent()).toBe(false);
    expect(btnAdd2.isPresent()).toBe(false);
    expect(btnDel1.isPresent()).toBe(false);
    expect(btnDel2.isPresent()).toBe(false);
    expect(field1.isPresent()).toBe(false);
    expect(field2.isDisplayed()).toBe(true);


  });

});
