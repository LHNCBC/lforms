var tp = require('./lforms_testpage.po.js');

fdescribe('FHIRPath functionality', function() {
  describe('FHIRPath calculated-expression', function() {
    // A test of the questionnaire-calculatedExpression extension
    it('work to compute a BMI value', function() {
      tp.openBaseTestPage();
      let path = require('path');
      let testFile = path.join(__dirname, '../../../app/data/weightHeightQuestionnaire.json');
      tp.loadFromDisk(testFile);
      let weightField = element(by.id('/29463-7/1'));
      weightField.click();
      weightField.sendKeys('70');
      let heightField = element(by.id('/8302-2/1'));
      heightField.sendKeys('60');
      heightField.click();
      weightField.click(); // so heightField gets a change event
      let bmiField = element(by.id('/39156-5/1'));
      expect(bmiField.getAttribute('value')).toBeCloseTo(30, 0);
    });
  });
});
