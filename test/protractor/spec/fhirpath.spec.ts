import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import * as FHIRSupport from "../../../app/scripts/fhir/versions.js";

let fhirVersions = Object.keys(FHIRSupport);
let tp: TestPage; 
let LForms: any = (global as any).LForms;
tp = new TestPage();

for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion, function() {
      beforeAll(async () => {
        await browser.waitForAngularEnabled(false);
      });
      describe('FHIRPath functionality', function() {
        describe('FHIRPath calculated-expression', function() {
          function testBMIFormula() {
            tp.loadFromTestData('weightHeightQuestionnaire.json', fhirVersion);
            let weightField = element(by.id('/29463-7/1'));
            weightField.click();
            TestUtil.sendKeys(weightField, '70');
            let heightField = element(by.id('/8302-2/1'));
            TestUtil.sendKeys(heightField, '60');
            heightField.click();
            weightField.click(); // so heightField gets a change event
            let bmiField = element(by.id('/39156-5/1'));
            expect(TestUtil.getAttribute(bmiField,'value')).toBeCloseTo(30, 0);
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

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp.openBaseTestPage();
    tp.loadFromTestData('answerExpressionTest.json');
  });

  it('should be able to populate a list', function() {
    var language = element(by.id('language/1'));
    language.click();
    TestUtil.waitForElementVisible(element(by.id("searchResults")))
    expect(tp.Autocomp.listIsVisible()).toBe(true); 
    expect(tp.Autocomp.shownItemCount()).toBe(2);
  });

  it('should not cause answerOptions to be generated in the Questionnaire', function() {
    browser.executeScript(
      'return LForms.Util.getFormFHIRData("Questionnaire", "R4")').then((val:any)=>{
      expect(val.item[0].answerOption).toBe(undefined);
    });
    browser.executeScript(
      'return LForms.Util.getFormFHIRData("Questionnaire", "STU3")').then((val:any)=>{
      expect(val.item[0].option).toBe(undefined);
    });
  });

  // TODO: there is bug causing form data are shared among multiple rendered forms on one page.
  // To be fixed in next PR. 
  // it('should not clear a list field if the form has just loaded with saved data', function () {
  //   // This is the case when a QuestionnaireResponse is loaded in that has a
  //   // value in a field whose list comes from an answerExpression or a
  //   // cqf-expression.  Initially, there is no list, but when the expression
  //   // runs, a list is obtained.  Because the data in the field is saved data,
  //   // it should not be cleared, even if it is not in the current list.  For
  //   // example, in the RxTerms form below, if the user saved a drug name and a
  //   // strength value, when the form is later loaded, RxTerms might have been
  //   // updated and no longer have the selected strength value, or even the drug
  //   // name itself.  We must be careful not to discard the user's data just
  //   // because the form is re-opened.

  //   // Load the RxTerms test form and get a QuestionnaireResponse.
  //   tp.loadFromTestData('rxterms.R4.json', 'R4');
  //   var medField = element(by.id('medication/1/1'));
  //   var EC = protractor.ExpectedConditions;
  //   TestUtil.waitForElementPresent(medField)
  //   tp.Autocomp.helpers.autocompPickFirst(medField, 'ar');
  //   var strengthField = element(by.id('strength/1/1'));
  //   TestUtil.waitForElementPresent(strengthField)
  //   browser.wait(TestUtil.fieldHasList(strengthField));
  //   tp.Autocomp.helpers.autocompPickFirst(strengthField);
  //   var rxcuiField = element(by.id('rxcui/1/1'));
  //   // Wait for the RxCUI field to have a value
  //   browser.wait(TestUtil.getAttribute(rxcuiField,'value').then((v)=>v != ''));

  //   // Get the QuestionnaireResponse
  //   browser.executeScript('return LForms.Util.getFormFHIRData('+
  //     '"QuestionnaireResponse", "R4")').then((qr:any)=> {

  //     // Confirms that the saved data is still on the displayed form.
  //     function checkSavedDataPresent() {
  //       TestUtil.waitForElementPresent(strengthField)
  //       browser.wait(()=>TestUtil.getAttribute(strengthField,'value').then((v)=>v != ''), 5000);
  //       browser.wait(()=>TestUtil.getAttribute(rxcuiField,'value').then((v)=>v != ''), 5000);
  //     }

  //     // Open a page on which we can call addFormToPage, and get
  //     // rid of its forms.
  //     tp.openTestPage('/test/addFormToPageTest.html');
  //     browser.executeScript('LForms.Util.addFormToPage({}, "formContainer")');
  //     browser.executeScript('LForms.Util.addFormToPage({}, "formContainer2")');
  //     var q = JSON.parse(tp.getTestData('rxterms.R4.json', 'R4'));
  //     var qOrig = JSON.parse(JSON.stringify(q)); // a copy
  //     var qrOrig = JSON.parse(JSON.stringify(qr)); // a copy
  //     TestUtil.showQQR(q, qr, 'formContainer');
  //     // Wait for the strength field to get its list again.
  //     //browser.wait(EC.presenceOf(strengthField));
  //     TestUtil.waitForElementPresent(strengthField)
  //     browser.wait(TestUtil.fieldHasList(strengthField));
  // //    checkSavedDataPresent();

  //   //   // Now confirm that if the value in the strength field does not match its
  //   //   // list, it still does not get cleared (see note above).
  //   //   qr.item[0].item[1].answer[0].valueCoding.code = 'I am not in the list';
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   // Wait for the strength field to get its list again.
  //   //   browser.wait(EC.presenceOf(strengthField));
  //   //   browser.wait(TestUtil.fieldHasList(strengthField));
  //   //   checkSavedDataPresent();

  //   //   // Test the same thing with a vertical layout
  //   //   q.item[0].extension.splice(1,1); // delete itemControl "gtable" extension
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   browser.wait(EC.presenceOf(strengthField));
  //   //   browser.wait(TestUtil.fieldHasList(strengthField));
  //   //   checkSavedDataPresent();

  //   //   // Test again with a drug code that is off list
  //   //   qr.item[0].item[0].answer[0].valueCoding.code = 'off-list code';
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   // Make sure the fields still have  their values.
  //   //   checkSavedDataPresent();

  //   //   // Test again with a drug name that has no code (was never on the list)
  //   //   qr.item[0].item[0].answer[0].valueCoding = {display: "Off-list drug name"};
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   // Make sure the fields still have  their values.
  //   //   checkSavedDataPresent();

  //   //   // Test with multiple values in the strength
  //   //   q = JSON.parse(JSON.stringify(qOrig));
  //   //   qr = JSON.parse(JSON.stringify(qrOrig));
  //   //   q.item[0].item[1].repeats = true;
  //   //   delete q.item[0].item[2].extension
  //   //   qr.item[0].item[1].answer[1] = {valueCoding: {display: 'other value'}};
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   browser.wait(EC.presenceOf(strengthField));
  //   //   browser.wait(TestUtil.fieldHasList(strengthField));
  //   //   browser.wait(EC.presenceOf(strengthField));
  //   //   browser.wait(()=>TestUtil.getAttribute(medField,'value').then((v)=>v != ''), 5000);
  //   //   // The strength field's values are in the multi-select area.
  //   //   browser.executeScript(function() {
  //   //     var strengthField = arguments[0];
  //   //     return strengthField.autocomp.getSelectedItems();
  //   //   }, strengthField).then((values:any) => {
  //   //     expect(values && values.length).toBe(2);
  //   //   });
  //   //   browser.wait(()=>TestUtil.getAttribute(rxcuiField,'value').then((v)=>v != ''), 5000);

  //   //   // Test with radio buttons
  //   //   q = JSON.parse(JSON.stringify(qOrig));
  //   //   qr = JSON.parse(JSON.stringify(qrOrig));
  //   //   q.item[0].extension.splice(1,1); // delete itemControl "gtable" extension
  //   //   // Replace the strength field drop down with radio buttons
  //   //   q.item[0].item[1].extension[0] = {
  //   //     "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
  //   //     "valueCodeableConcept": {
  //   //       "text": "Radio Button",
  //   //       "coding": [
  //   //         {
  //   //           "code": "radio-button",
  //   //           "display": "Radio Button",
  //   //           "system": "http://hl7.org/fhir/questionnaire-item-control"
  //   //         }
  //   //       ]
  //   //     }
  //   //   };
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   browser.wait(EC.presenceOf(medField));
  //   //   browser.wait(()=>TestUtil.getAttribute(medField,'value').then((v)=>v != ''), 5000);
  //   //   let strengthAnswer1 = element(by.id('strength\\/1\\/1213377'));
  //   //   expect(strengthAnswer1.getAttribute('checked')).toBe('true');
  //   //   browser.wait(()=>TestUtil.getAttribute(rxcuiField,'value').then((v)=>v != ''), 5000);

  //   //   // Test with checkboxes an multiple values
  //   //   q = JSON.parse(JSON.stringify(q)); // make a copy for the new test
  //   //   qr = JSON.parse(JSON.stringify(qr));
  //   //   q.item[0].item[1].repeats = true;
  //   //   q.item[0].item[1].extension[0] = {
  //   //     "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
  //   //     "valueCodeableConcept": {
  //   //       "text": "Check-box",
  //   //       "coding": [
  //   //         {
  //   //           "code": "check-box",
  //   //           "display": "Check-box",
  //   //           "system": "http://hl7.org/fhir/questionnaire-item-control"
  //   //         }
  //   //       ]
  //   //     }
  //   //   };
  //   //   qr.item[0].item[1].answer[1] = {valueString: 'other value'};
  //   //   TestUtil.showQQR(q, qr, 'formContainer');
  //   //   browser.wait(EC.presenceOf(medField));
  //   //   browser.wait(()=>TestUtil.getAttribute(medField,'value').then((v)=>v != ''), 5000);
  //   //   expect(TestUtil.getAttribute(strengthAnswer1,'checked')).toBe('true');
  //   //   let strengthAnswerOther = element(by.id('strength\\/1\\/1_other'));
  //   //   let strengthOtherValue = element(by.id('strength\\/1\\/1_otherValue'));
  //   //   expect(TestUtil.getAttribute(strengthAnswerOther,'checked')).toBe('true');
  //   //   expect(TestUtil.getAttribute(strengthOtherValue,'value')).toBe('other value');
  //   //   browser.wait(()=>TestUtil.getAttribute(rxcuiField,'value').then((v)=>v != ''), 5000);
  //   });
  // });
});
