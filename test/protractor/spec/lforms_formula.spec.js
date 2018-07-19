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

  it('Two correctly structured TOTALSCORE rules on a form should both work', function() {

    var answer1 = element(by.id("/44249-1/44250-9/1/1")),
        answer2 = element(by.id("/44249-1/44255-8/1/1")),
        score1 = element(by.id("/44249-1/44261-6/1/1"));

    var answer3 = element(by.id("/38213-5/38216-8/1/1")),
        answer4 = element(by.id("/38213-5/38217-6/1/1")),
        score2 = element(by.id("/38213-5/38215-0/1/1"));

    tp.openTwoTotalScoreForm();
    expect(score1.getAttribute('value')).toBe("0");
    expect(score2.getAttribute('value')).toBe("0");

    //check total score #1
    answer1.click();
    answer1.sendKeys(protractor.Key.ARROW_DOWN);
    answer1.sendKeys(protractor.Key.ARROW_DOWN);
    answer1.sendKeys(protractor.Key.ENTER);
    expect(score1.getAttribute('value')).toBe("1");
    expect(score2.getAttribute('value')).toBe("0");
    answer2.click();
    answer2.sendKeys(protractor.Key.ARROW_DOWN);
    answer2.sendKeys(protractor.Key.ARROW_DOWN);
    answer2.sendKeys(protractor.Key.ENTER);
    expect(score1.getAttribute('value')).toBe("2");
    expect(score2.getAttribute('value')).toBe("0");

    //check total score #2
    answer3.click();
    answer3.sendKeys(protractor.Key.ARROW_DOWN);
    answer3.sendKeys(protractor.Key.ARROW_DOWN);
    answer3.sendKeys(protractor.Key.ARROW_DOWN);
    answer3.sendKeys(protractor.Key.ENTER);
    expect(score1.getAttribute('value')).toBe("2");
    expect(score2.getAttribute('value')).toBe("2");
    answer4.click();
    answer4.sendKeys(protractor.Key.ARROW_DOWN);
    answer4.sendKeys(protractor.Key.ARROW_DOWN);
    answer4.sendKeys(protractor.Key.ARROW_DOWN);
    answer4.sendKeys(protractor.Key.ENTER);
    expect(score1.getAttribute('value')).toBe("2");
    expect(score2.getAttribute('value')).toBe("4");

  })
});
