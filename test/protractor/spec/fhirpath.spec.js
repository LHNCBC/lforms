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

  it('should not clear a list field if the form has just loaded with saved data', function () {
    // This is the case when a QuestionnaireResponse is loaded in that has a
    // value in a field whose list comes from an answerExpression or a
    // cqf-expression.  Initially, there is no list, but when the expression
    // runs, a list is obtained.  Because the data in the field is saved data,
    // it should not be cleared, even if it is not in the current list.  For
    // example, in the RxTerms form below, if the user saved a drug name and a
    // strength value, when the form is later loaded, RxTerms might have been
    // updated and no longer have the selected strength value, or even the drug
    // name itself.  We must be careful not to discard the user's data just
    // because the form is re-opened.

    // Load the RxTerms test form and get a QuestionnaireResponse.
    tp.loadFromTestData('rxterms.R4.json', 'R4');
    var medField = element(by.id('medication/1/1'));
    var EC = protractor.ExpectedConditions;
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

      // Confirms that the saved data is still on the displayed form.
      function checkSavedDataPresent() {
        browser.wait(EC.presenceOf(strengthField));
        browser.wait(()=>medField.getAttribute('value').then((v)=>v != ''), 5000);
        browser.wait(()=>strengthField.getAttribute('value').then((v)=>v != ''), 5000);
        browser.wait(()=>rxcuiField.getAttribute('value').then((v)=>v != ''), 5000);
      }

      // Open a page on which we can call addFormToPage, and get
      // rid of its forms.
      tp.openTestPage('/test/addFormToPageTest.html');
      browser.executeScript('LForms.Util.addFormToPage({}, "formContainer")');
      browser.executeScript('LForms.Util.addFormToPage({}, "formContainer2")');
      var q = JSON.parse(tp.getTestData('rxterms.R4.json', 'R4'));
      var qOrig = JSON.parse(JSON.stringify(q)); // a copy
      var qrOrig = JSON.parse(JSON.stringify(qr)); // a copy
      testUtil.showQQR(q, qr, 'formContainer');
      // Wait for the strength field to get its list again.
      browser.wait(EC.presenceOf(strengthField));
      browser.wait(testUtil.fieldHasList(strengthField));
      checkSavedDataPresent();

      // Now confirm that if the value in the strength field does not match its
      // list, it still does not get cleared (see note above).
      qr.item[0].item[1].answer[0].valueCoding.code = 'I am not in the list';
      testUtil.showQQR(q, qr, 'formContainer');
      // Wait for the strength field to get its list again.
      browser.wait(EC.presenceOf(strengthField));
      browser.wait(testUtil.fieldHasList(strengthField));
      checkSavedDataPresent();

      // Test the same thing with a vertical layout
      q.item[0].extension.splice(1,1); // delete itemControl "gtable" extension
      testUtil.showQQR(q, qr, 'formContainer');
      browser.wait(EC.presenceOf(strengthField));
      browser.wait(testUtil.fieldHasList(strengthField));
      checkSavedDataPresent();

      // Test again with a drug code that is off list
      qr.item[0].item[0].answer[0].valueCoding.code = 'off-list code';
      testUtil.showQQR(q, qr, 'formContainer');
      // Make sure the fields still have  their values.
      checkSavedDataPresent();

      // Test again with a drug name that has no code (was never on the list)
      qr.item[0].item[0].answer[0].valueCoding = {display: "Off-list drug name"};
      testUtil.showQQR(q, qr, 'formContainer');
      // Make sure the fields still have  their values.
      checkSavedDataPresent();

      // Test with multiple values in the strength
      q = JSON.parse(JSON.stringify(qOrig));
      qr = JSON.parse(JSON.stringify(qrOrig));
      q.item[0].item[1].repeats = true;
      delete q.item[0].item[2].extension
      qr.item[0].item[1].answer[1] = {valueCoding: {display: 'other value'}};
      testUtil.showQQR(q, qr, 'formContainer');
      browser.wait(EC.presenceOf(strengthField));
      browser.wait(testUtil.fieldHasList(strengthField));
      browser.wait(EC.presenceOf(strengthField));
      browser.wait(()=>medField.getAttribute('value').then((v)=>v != ''), 5000);
      // The strength field's values are in the multi-select area.
      browser.executeScript(function() {
        var strengthField = arguments[0];
        return strengthField.autocomp.getSelectedItems();
      }, strengthField).then((values) => {
        expect(values && values.length).toBe(2);
      });
      browser.wait(()=>rxcuiField.getAttribute('value').then((v)=>v != ''), 5000);

      // Test with radio buttons
      q = JSON.parse(JSON.stringify(qOrig));
      qr = JSON.parse(JSON.stringify(qrOrig));
      q.item[0].extension.splice(1,1); // delete itemControl "gtable" extension
      // Replace the strength field drop down with radio buttons
      q.item[0].item[1].extension[0] = {
        "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
        "valueCodeableConcept": {
          "text": "Radio Button",
          "coding": [
            {
              "code": "radio-button",
              "display": "Radio Button",
              "system": "http://hl7.org/fhir/questionnaire-item-control"
            }
          ]
        }
      };
      testUtil.showQQR(q, qr, 'formContainer');
      browser.wait(EC.presenceOf(medField));
      browser.wait(()=>medField.getAttribute('value').then((v)=>v != ''), 5000);
      let strengthAnswer1 = $('#strength\\/1\\/1213377');
      expect(strengthAnswer1.getAttribute('checked')).toBe('true');
      browser.wait(()=>rxcuiField.getAttribute('value').then((v)=>v != ''), 5000);

      // Test with checkboxes an multiple values
      q = JSON.parse(JSON.stringify(q)); // make a copy for the new test
      qr = JSON.parse(JSON.stringify(qr));
      q.item[0].item[1].repeats = true;
      q.item[0].item[1].extension[0] = {
        "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
        "valueCodeableConcept": {
          "text": "Check-box",
          "coding": [
            {
              "code": "check-box",
              "display": "Check-box",
              "system": "http://hl7.org/fhir/questionnaire-item-control"
            }
          ]
        }
      };
      qr.item[0].item[1].answer[1] = {valueString: 'other value'};
      testUtil.showQQR(q, qr, 'formContainer');
      browser.wait(EC.presenceOf(medField));
      browser.wait(()=>medField.getAttribute('value').then((v)=>v != ''), 5000);
      expect(strengthAnswer1.getAttribute('checked')).toBe('true');
      let strengthAnswerOther = $('#strength\\/1\\/1_other');
      let strengthOtherValue = $('#strength\\/1\\/1_otherValue');
      expect(strengthAnswerOther.getAttribute('checked')).toBe('true');
      expect(strengthOtherValue.getAttribute('value')).toBe('other value');
      browser.wait(()=>rxcuiField.getAttribute('value').then((v)=>v != ''), 5000);
    });
  });
});
