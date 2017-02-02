var tp = require('./lforms_testpage.po.js');
var ff = tp.USSGFHTVertical;
describe('formula', function() {

  it('Two BMI formulas should both work', function() {

    tp.openUSSGFHTVertical();

    // check bmi1
    ff.height1.sendKeys("70");
    expect(ff.bmi1.getAttribute('value')).toBe("");
    ff.weight1.sendKeys("170");
    expect(ff.bmi1.getAttribute('value')).toBe("24.39");
    ff.height1.clear();
    ff.height1.sendKeys("80");
    expect(ff.bmi1.getAttribute('value')).toBe("18.68");

    // change height unit and check bmi1 again
    ff.heightUnit1.click();
    // pick the 2nd item, centimeters
    ff.heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.heightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.heightUnit1.sendKeys(protractor.Key.TAB);
    ff.height1.clear();
    ff.height1.sendKeys("170");
    expect(ff.bmi1.getAttribute('value')).toBe("26.68");

    // change weight unit and check bmi1 again
    ff.weightUnit1.click();
    // pick the 2nd item, kgs
    ff.weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.weightUnit1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.weightUnit1.sendKeys(protractor.Key.TAB);
    ff.weight1.clear();
    ff.weight1.sendKeys("80");
    expect(ff.bmi1.getAttribute('value')).toBe("27.68");

    // check bmi2
    ff.height2.sendKeys("70");
    expect(ff.bmi2.getAttribute('value')).toBe("");
    ff.weight2.sendKeys("170");
    expect(ff.bmi2.getAttribute('value')).toBe("24.39");
    ff.height2.clear();
    ff.height2.sendKeys("80");
    expect(ff.bmi2.getAttribute('value')).toBe("18.68");
  });
});
