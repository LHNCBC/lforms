var tp = require('./lforms_testpage.po.js');
var testUtil = require('./util.js');
var fhirSupport = require('../../../app/scripts/fhir/versions');
var fhirVersions = Object.keys(fhirSupport);

for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion, function() {
      describe('FHIRPath functionality', function() {
        describe('FHIRPath calculated-expression', function() {
          function testBMIFormula() {
            tp.loadFromTestData('weightHeightQuestionnaire.json', fhirVersion);
            let weightField = element(by.id('/29463-7/1'));
            weightField.click();
            testUtil.sendKeys(weightField, '70');
            let heightField = element(by.id('/8302-2/1'));
            testUtil.sendKeys(heightField, '60');
            heightField.click();
            weightField.click(); // so heightField gets a change event
            let bmiField = element(by.id('/39156-5/1'));
            expect(bmiField.getAttribute('value')).toBeCloseTo(30, 0);
          }

          // A test of the questionnaire-calculatedExpression extension
          it('work to compute a BMI value', function() {
            tp.openBaseTestPage();
            testBMIFormula();
          });

          it('work to compute a BMI value with the built files', function() {
            tp.openBuildTestFHIRPath();
            testBMIFormula();
          });
        });
      });
    });
  })(fhirVersions[i]);
}

describe('answerExpression', function() {
  beforeAll(function() {
    tp.openBaseTestPage();
    tp.loadFromTestData('answerExpressionTest.json');
  });

  it('should be able to populate a list', function() {
    var language = $('#language\\/1');
    language.click();
    expect(tp.Autocomp.helpers.listIsVisible(language)).toBe(true);
    expect(tp.Autocomp.helpers.shownItemCount()).toBe(2);
  });

  it('should not cause answerOptions to be generated in the Questionnaire', function() {
    browser.executeScript(
      'return LForms.Util.getFormFHIRData("Questionnaire", "R4")').then((val)=>{
      expect(val.item[0].answerOption).toBe(undefined);
    });
    browser.executeScript(
      'return LForms.Util.getFormFHIRData("Questionnaire", "STU3")').then((val)=>{
      expect(val.item[0].option).toBe(undefined);
    });
  });

  fit('should not clear a list field if the list field had no list and the value is in the new list', function () {
    // This is the case when a QuestionnaireResponse is loaded in that has a
    // value in a field whose list comes from an answerExpression.  Initially,
    // there is no list, but when the answerExpression runs, a list is obtained,
    // and the value in the field should be in the list, so it should not be
    // cleared.
    // Load the RxTerms test form and get a QuestionnaireResponse.
    tp.loadFromTestData('rxterms.R4.json', 'R4');
    var medField = element(by.id('medication/1/1'));
    //var EC = protractor.ExpectedConditions;
    //browser.wait(EC.presenceOf(medField), 5000);
    tp.Autocomp.helpers.autocompPickFirst(medField, 'ar');
    var strengthField = element(by.id('strength/1/1'));
    //browser.wait(EC.presenceOf(strengthField), 5000);
    browser.wait(testUtil.fieldHasList(strengthField));
    tp.Autocomp.helpers.autocompPickFirst(strengthField);
    var rxcuiField = element(by.id('rxcui/1/1'));
    // Wait for the RxCUI field to have a value
    browser.wait(rxcuiField.getAttribute('value').then((v)=>v != ''));

    // Get the QuestionnaireResponse
    browser.executeScript('return LForms.Util.getFormFHIRData('+
      '"QuestionnaireResponse", "R4")').then((qr)=> {

      // Open a page on which we can call addFormToPage, and get
      // rid of its forms.
      tp.openTestPage('/test/addFormToPageTest.html');
      browser.executeScript('LForms.Util.addFormToPage({}, "formContainer")');
      browser.executeScript('LForms.Util.addFormToPage({}, "formContainer2")');
      var q = JSON.parse(tp.getTestData('rxterms.R4.json', 'R4'));
      return testUtil.showQQR(q, qr, 'formContainer');
    }).then(()=>{
      // Wait for the strength field to get its list again.
      browser.wait(testUtil.fieldHasList(strengthField));
      // Make sure it and the rxcui field have not lost their value.
      browser.wait(()=>strengthField.getAttribute('value').then((v)=>v != ''), 5000);
      browser.wait(()=>rxcuiField.getAttribute('value').then((v)=>v != ''), 5000);
      // Now confirm that if the value in the strength field does not match its
      // list, it gets cleared.
console.log(JSON.stringify(qr, null, 2));
      qr.item[1].answer[0].valueCoding = {code: 'I am not in the list'};
      return testUtil.showQQR(q, qr, 'formContainer');
    }).then(()=>{
      // Wait for the strength field to get its list again.
      browser.wait(testUtil.fieldHasList(strengthField));
      // Wait for LForms to finish rendering the form
      browser.wait(function () {
        return browser.executeScript("return document.getElementById('formContainer'"+
          ").getAttribute('lformsReady')")
      }, 5000);
      // Make sure it and the rxcui field have lost their values.
      browser.sleep(250); // give the expressions a chance to run
      expect(strengthField.getAttribute('value')).toBe('');
      expect(rxcuiField.getAttribute('value')).toBe('');
    });
  });
});
