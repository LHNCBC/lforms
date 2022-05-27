// Tests FHIR output and import of FHIR resources.
import { RxTerms } from "../support/rxterms.po";
import * as util from "../support/util";
import * as FHIRSupport from "../../../src/fhir/versions.js";
import {facadeExpect as expect, protractor, by, element, browser} from "../support/protractorFacade.js";
import {TestUtil} from "../support/testUtilFacade.js";
import {TestPage} from '../support/lforms_testpage.po.js';

delete FHIRSupport.default; // not sure why that is added now
let fhirVersions = Object.keys(FHIRSupport);

let rxterms = new RxTerms();
let tp = new TestPage();
let ff = {}; // element from tp.USSGFHTVertical;
for (let k of Object.keys(tp.USSGFHTVertical)) {
  if (k === "nameID")
    ff[k] = tp.USSGFHTVertical[k];
  else
    ff[k] = element(by.css(tp.USSGFHTVertical[k]));
}


/**
 *  Returns a promise that will resolve to an array of two elements, the first
 *  of which will be an error message (if any), and the second of which will be
 *  the requested FHIR resource for the given fhirVersion (if there was no
 *  error).
 * @param resourceType the type of the requested FHIR resource
 * @param fhirVersion the FHIR version for which the resource is to be
 *  generated.
 * @param options The optional options parameter to pass to getFormFHIRData.
 */
function getFHIRResource(resourceType, fhirVersion, options=null) {
  return cy.window().then(win => {
    try {
      const resData = win.LForms.Util.getFormFHIRData(resourceType, fhirVersion,
        null, options);
      return [null, resData];
    }
    catch (e) {return ([[e.message].concat(e.stack).join("\n")])}
  });
}

for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion, function() {
      describe('rendering-style extension', function() {
        it('should work on Questionnaire.title, item.prefix, and item.text', function() {
          cy.visit('test/pages/addFormToPageTest.html');
          util.addFormToPage('argonaut-phq9-ish.json', null, {fhirVersion});
          expect(element(by.id('label-44249-1')).getAttribute('style')).toBe('background-color: white; color: green;');
          var idCSS = '#label-g1\\.q2/1/1';
          expect(element(by.css(idCSS+' .prefix')).getAttribute('style')).toBe('font-weight: bold;');
          expect(element(by.css(idCSS+' .question')).getAttribute('style')).toBe('font-style: italic;');
        });

        if (fhirVersion !== 'STU3') { // supported in STU3, but sufficient to test R4
          it('should work on question text in horizontal tables', function() {
            util.addFormToPage('tables.json', null, {fhirVersion});
            var idCSS = '#col/g2/g1m1/1/1';
            expect(element(by.css(idCSS+' .prefix')).getAttribute('style')).toBe('font-weight: bold;');
            expect(element(by.css(idCSS+' .question')).getAttribute('style')).toBe('font-style: italic;');
          });
          it('should work on question text in a matrix layout', function () {
            var idCSS = '#label-/g4/g1m2/1/1';
            expect(element(by.css(idCSS+' .prefix')).getAttribute('style')).toBe('font-weight: bold;');
            expect(element(by.css(idCSS+' .question')).getAttribute('style')).toBe('font-style: italic;');
          });
        }
      });

      describe('FHIR Data: ', function () {
        describe('get FHIR data from LForms forms', function() {
          it('should generate correct Observations for type integer', function() {
            util.addFormToPage('allInOne.json');
            let integerWithUnit = element(by.id('/q_lg/1'));
            TestUtil.sendKeys(integerWithUnit, 3);
            let integerNoUnit = element(by.id('/type2/1'));
            TestUtil.sendKeys(integerNoUnit, 4);
            getFHIRResource("DiagnosticReport", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("DiagnosticReport");
              // integer with unit
              expect(fhirData.contained[0].resourceType).toBe("Observation");
              expect(fhirData.contained[0].id).not.toBe(undefined);
              expect(fhirData.contained[0].code.coding[0].code).toBe("q_lg");
              expect(fhirData.contained[0].valueQuantity).toEqual({value: 3, unit: 'lbs'});

              // integer without unit
              expect(fhirData.contained[1].resourceType).toBe("Observation");
              expect(fhirData.contained[1].id).not.toBe(undefined);
              expect(fhirData.contained[1].code.coding[0].code).toBe("type2");
              if (fhirVersion === 'STU3')
                expect(fhirData.contained[1].valueQuantity).toEqual({value: 4});
              else
                expect(fhirData.contained[1].valueInteger).toBe(4);
            });
          });

          it('should get a DiagnosticReport (contained) data from a form', function() {
            util.addFormToPage('FHTData.json');
            // #1 all fields are empty
            getFHIRResource("DiagnosticReport", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("DiagnosticReport");

              expect(fhirData.result.length).toBe(0);
              expect(fhirData.contained).toEqual([]);

              // #2 has some values
              // ST, repeating
              TestUtil.sendKeys(ff.name, "name 1");
              ff.btnName.click();
              TestUtil.sendKeys(ff.name2, "name 2");
              // DT
              TestUtil.sendKeys(ff.dob, "10/27/2016");
              // CWE/CNE
              ff.gender.click();
              // pick the 1st item
              ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
              ff.gender.sendKeys(protractor.Key.ENTER);
              // CWE, multiple answers
              ff.race.click();
              // pick the first 2 items
              ff.race.sendKeys(protractor.Key.ARROW_DOWN);
              ff.race.sendKeys(protractor.Key.ENTER);
              ff.race.sendKeys(protractor.Key.ENTER);
              // REAL
              TestUtil.sendKeys(ff.height, "70");
              TestUtil.sendKeys(ff.weight, "170");
              // repeating sub panel
              ff.disease.click();
              ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease.sendKeys(protractor.Key.ENTER);
              ff.ageAtDiag.click();
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.ENTER);

              TestUtil.clickAddRemoveButton(ff.btnDiseasesHist);

              ff.disease2.click();
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ENTER);
              ff.ageAtDiag2.click();
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ENTER);

              getFHIRResource("DiagnosticReport", fhirVersion).then(function(callbackData) {
                let [error, fhirData] = callbackData;
                expect(error).toBeNull();
                expect(fhirData.resourceType).toBe("DiagnosticReport");
                expect(fhirData.result.length).toBe(1);
                expect(fhirData.result[0].reference).not.toBe(undefined);
                expect(fhirData.contained.length).toBe(16);
                // name 1
                expect(fhirData.contained[0].resourceType).toBe("Observation");
                expect(fhirData.contained[0].id).not.toBe(undefined);
                expect(fhirData.contained[0].code.coding[0].code).toBe("54125-0");
                expect(fhirData.contained[0].code.coding[0].system).toBe(undefined);
                expect(fhirData.contained[0].code.text).toBe("Name");
                expect(fhirData.contained[0].valueString).toBe("name 1");

                // name 2
                expect(fhirData.contained[1].resourceType).toBe("Observation");
                expect(fhirData.contained[1].id).not.toBe(undefined);
                expect(fhirData.contained[1].code.coding[0].code).toBe("54125-0");
                expect(fhirData.contained[1].code.coding[0].system).toBe(undefined);
                expect(fhirData.contained[1].code.text).toBe("Name");
                expect(fhirData.contained[1].valueString).toBe("name 2");
                // gender
                expect(fhirData.contained[2].resourceType).toBe("Observation");
                expect(fhirData.contained[2].id).not.toBe(undefined);
                expect(fhirData.contained[2].code.coding[0].code).toBe("54131-8");
                expect(fhirData.contained[2].code.coding[0].system).toBe(undefined);
                expect(fhirData.contained[2].code.text).toBe("Gender");
                expect(fhirData.contained[2].valueCodeableConcept).toEqual({"coding": [{"code": "LA2-8", "display": "Male"}], "text": "Male"});
                // DOB
                expect(fhirData.contained[3].valueDate).toBe("2016-10-27");
                // Height
                expect(fhirData.contained[4].valueQuantity).toEqual({"unit":"inches","value":70});
                // Weight
                expect(fhirData.contained[5].valueQuantity).toEqual({"unit":"lbs","value":170});
                // BMI
                expect(fhirData.contained[6].valueString).toBe("24.39");
                // Race
                expect(fhirData.contained[7].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10608-0",
                      display:"American Indian or Alaska Native",
                      system:"http://loinc.org"
                    }],
                  "text": "American Indian or Alaska Native"
                });
                expect(fhirData.contained[8].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA6156-9",
                      display:"Asian",
                      system:"http://loinc.org"
                    }],
                  "text": "Asian"
                });

                // Disease
                expect(fhirData.contained[9].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10533-0",
                      display:"Blood Clots",
                      system:"http://loinc.org"
                    }],
                  "text": "Blood Clots"
                });
                // Age at diagnosis
                expect(fhirData.contained[10].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10403-6",
                      display:"Newborn",
                      system:"http://loinc.org"
                    }],
                  "text": "Newborn"
                });
                // Your diseases history (sub panel)
                expect(fhirData.contained[11].related.length).toBe(2);
                // Disease 2
                expect(fhirData.contained[12].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10572-8",
                      display:"-- Blood Clot in Leg",
                      system:"http://loinc.org"
                    }],
                  "text": "-- Blood Clot in Leg"
                });
                // Age at diagnosis 2
                expect(fhirData.contained[13].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10394-7",
                      display:"Infancy",
                      system:"http://loinc.org"
                    }],
                  "text": "Infancy"
                });
                // Your diseases history (sub panel) 2
                expect(fhirData.contained[14].related.length).toBe(2);
                // Your health information
                expect(fhirData.contained[15].related.length).toBe(11);
              });
            });
          });

          it('should get a DiagnosticReport (Bundle) data from a form', function() {

            tp.LoadForm.openUSSGFHTVertical();

            // #1 all fields are empty
            getFHIRResource("DiagnosticReport", fhirVersion,
                {bundleType: "collection"}).then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("Bundle");
              expect(fhirData.entry.length).toBe(1);
              expect(fhirData.entry[0].resource.resourceType).toBe("DiagnosticReport");
              expect(fhirData.entry[0].resource.result).toEqual([]);

              // #2 has some values
              // ST, repeating
              TestUtil.sendKeys(ff.name, "name 1");
              ff.btnName.click();
              TestUtil.sendKeys(ff.name2, "name 2");
              // DT
              TestUtil.sendKeys(ff.dob, "10/27/2016");
              // CWE/CNE
              ff.gender.click();
              // pick the 1st item
              ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
              ff.gender.sendKeys(protractor.Key.ENTER);
              // CWE, multiple answers
              ff.race.click();
              // pick the first 2 items
              ff.race.sendKeys(protractor.Key.ARROW_DOWN);
              ff.race.sendKeys(protractor.Key.ENTER);
              ff.race.sendKeys(protractor.Key.ENTER);
              // REAL
              TestUtil.sendKeys(ff.height, "70");
              TestUtil.sendKeys(ff.weight, "170");
              // repeating sub panel
              ff.disease.click();
              ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease.sendKeys(protractor.Key.ENTER);
              ff.ageAtDiag.click();
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.ENTER);

              TestUtil.clickAddRemoveButton(ff.btnDiseasesHist);

              ff.disease2.click();
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ENTER);
              ff.ageAtDiag2.click();
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ENTER);

              // // remove the default values on the 2 items
              // expect(ff.related.getAttribute('value')).toEqual('No');
              // ff.related.clear();
              // expect(ff.related.getAttribute('value')).toEqual('');
              //
              // expect(ff.mockedHeight.getAttribute('value')).toEqual('72');
              // ff.mockedHeight.clear();
              // expect(ff.mockedHeight.getAttribute('value')).toEqual('');

              getFHIRResource("DiagnosticReport", fhirVersion,
                  {bundleType: "collection"}).then(function(callbackData) {
                let [error, fhirData] = callbackData;
                expect(error).toBeNull();
                expect(fhirData.resourceType).toBe("Bundle");
                expect(fhirData.entry.length).toBe(17);
                expect(fhirData.entry[0].resource.resourceType).toBe("DiagnosticReport");
                expect(fhirData.entry[0].resource.result.length).toBe(1);
                expect(fhirData.entry[0].resource.result[0].reference).not.toBe(undefined);
                // name 1
                expect(fhirData.entry[1].resource.resourceType).toBe("Observation");
                expect(fhirData.entry[1].resource.id).not.toBe(undefined);
                expect(fhirData.entry[1].resource.code.coding[0].code).toBe("54125-0");
                expect(fhirData.entry[1].resource.code.coding[0].system).toBe(undefined);
                expect(fhirData.entry[1].resource.code.text).toBe("Name");
                expect(fhirData.entry[1].resource.valueString).toBe("name 1");
                // name 2
                expect(fhirData.entry[2].resource.resourceType).toBe("Observation");
                expect(fhirData.entry[2].resource.id).not.toBe(undefined);
                expect(fhirData.entry[2].resource.code.coding[0].code).toBe("54125-0");
                expect(fhirData.entry[2].resource.code.coding[0].system).toBe(undefined);
                expect(fhirData.entry[2].resource.code.text).toBe("Name");
                expect(fhirData.entry[2].resource.valueString).toBe("name 2");
                // gender
                expect(fhirData.entry[3].resource.resourceType).toBe("Observation");
                expect(fhirData.entry[3].resource.id).not.toBe(undefined);
                expect(fhirData.entry[3].resource.code.coding[0].code).toBe("54131-8");
                expect(fhirData.entry[3].resource.code.coding[0].system).toBe(undefined);
                expect(fhirData.entry[3].resource.code.text).toBe("Gender");
                expect(fhirData.entry[3].resource.valueCodeableConcept).toEqual({"coding": [{"code": "LA2-8", "display": "Male"}], "text": "Male"});
                // DOB
                expect(fhirData.entry[4].resource.valueDate).toBe("2016-10-27");
                // Height
                expect(fhirData.entry[5].resource.valueQuantity).toEqual({"unit":"inches","value":70});
                // Weight
                expect(fhirData.entry[6].resource.valueQuantity).toEqual({"unit":"lbs","value":170});
                // BMI
                expect(fhirData.entry[7].resource.valueString).toBe("24.39");
                // Race
                expect(fhirData.entry[8].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10608-0",
                      display:"American Indian or Alaska Native",
                      system:"http://loinc.org"
                    }],
                  "text": "American Indian or Alaska Native"
                });
                expect(fhirData.entry[9].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA6156-9",
                      display:"Asian",
                      system:"http://loinc.org"
                    }],
                  "text": "Asian"
                });
                // Disease
                expect(fhirData.entry[10].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10533-0",
                      display:"Blood Clots",
                      system:"http://loinc.org"
                    }],
                  "text": "Blood Clots"
                });
                // Age at diagnosis
                expect(fhirData.entry[11].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10403-6",
                      display:"Newborn",
                      system:"http://loinc.org"
                    }],
                  "text": "Newborn"
                });
                // Your diseases history (sub panel)
                expect(fhirData.entry[12].resource.related.length).toBe(2);
                // Disease 2
                expect(fhirData.entry[13].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10572-8",
                      display:"-- Blood Clot in Leg",
                      system:"http://loinc.org"
                    }],
                  "text": "-- Blood Clot in Leg"
                });
                // Age at diagnosis 2
                expect(fhirData.entry[14].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10394-7",
                      display:"Infancy",
                      system:"http://loinc.org"
                    }],
                  "text": "Infancy"
                });
                // Your diseases history (sub panel) 2
                expect(fhirData.entry[15].resource.related.length).toBe(2);
                // Your health information
                expect(fhirData.entry[16].resource.related.length).toBe(11);

              });
            });
          });

          it('should get a SDC Questionnaire data from a form', function() {

            tp.LoadForm.openUSSGFHTVertical();
            getFHIRResource("Questionnaire", fhirVersion,
                ).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              var assertFHTQuestionnaire = require('../support/'+fhirVersion+'/assert-sdc-questionnaire.js').assertFHTQuestionnaire;
              assertFHTQuestionnaire(fhirData);
            });
          });

          it('should get a SDC QuestionnaireResponse data from a form', function() {

            tp.LoadForm.openUSSGFHTVertical();

            // ST, repeating
            TestUtil.sendKeys(ff.name, "name 1");
            ff.btnName.click();
            TestUtil.sendKeys(ff.name2, "name 2");
            // DT
            TestUtil.sendKeys(ff.dob, "10/27/2016");
            // CWE/CNE
            ff.gender.click();
            // pick the 1st item
            ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
            ff.gender.sendKeys(protractor.Key.ENTER);
            // CWE, multiple answers
            ff.race.click();
            // pick the first 2 items
            ff.race.sendKeys(protractor.Key.ARROW_DOWN);
            ff.race.sendKeys(protractor.Key.ENTER);
            ff.race.sendKeys(protractor.Key.ENTER);
            // REAL
            TestUtil.sendKeys(ff.height, "70");
            TestUtil.sendKeys(ff.weight, "170");
            // repeating sub panel
            ff.disease.click();
            ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease.sendKeys(protractor.Key.ENTER);
            ff.ageAtDiag.click();
            ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag.sendKeys(protractor.Key.ENTER);

            TestUtil.clickAddRemoveButton(ff.btnDiseasesHist);

            ff.disease2.click();
            ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease2.sendKeys(protractor.Key.ENTER);
            ff.ageAtDiag2.click();
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ENTER);


            getFHIRResource("QuestionnaireResponse", fhirVersion).
                then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("QuestionnaireResponse");
              // Per LF-1183, not to include identifier for exported QuestionnaireResponse
              // expect(fhirData.identifier.value).toBe("54127-6N");
              // expect(fhirData.identifier.system).toBe("http://loinc.org");
              expect(!!fhirData.identifier).toBe(false);

              expect(fhirData.item.length).toBe(1);
              expect(fhirData.item[0].linkId).toBe("/54126-8");
              expect(fhirData.item[0].text).toBe("Your health information");

              expect(fhirData.item[0].item.length).toBe(9);

              // name 1 & name 2
              expect(fhirData.item[0].item[0].text).toBe("Name");
              expect(fhirData.item[0].item[0].linkId).toBe("/54126-8/54125-0");
              expect(fhirData.item[0].item[0].answer.length).toBe(2);
              expect(fhirData.item[0].item[0].answer[0].valueString).toBe("name 1");
              expect(fhirData.item[0].item[0].answer[1].valueString).toBe("name 2");
              // gender
              expect(fhirData.item[0].item[1].text).toBe("Gender");
              expect(fhirData.item[0].item[1].linkId).toBe("/54126-8/54131-8");
              expect(fhirData.item[0].item[1].answer.length).toBe(1);
              expect(fhirData.item[0].item[1].answer[0].valueCoding.code).toBe("LA2-8");
              expect(fhirData.item[0].item[1].answer[0].valueCoding.display).toBe("Male");
              expect(fhirData.item[0].item[1].answer[0].valueCoding.system).toBe(undefined);
              // DOB
              expect(fhirData.item[0].item[2].text).toBe("Date of Birth");
              expect(fhirData.item[0].item[2].linkId).toBe("/54126-8/21112-8");
              expect(fhirData.item[0].item[2].answer.length).toBe(1);
              expect(fhirData.item[0].item[2].answer[0].valueDate).toBe("2016-10-27");
              // Height
              expect(fhirData.item[0].item[3].text).toBe("Height");
              expect(fhirData.item[0].item[3].linkId).toBe("/54126-8/8302-2");
              expect(fhirData.item[0].item[3].answer.length).toBe(1);
              expect(fhirData.item[0].item[3].answer[0].valueQuantity.unit).toBe("inches");
              expect(fhirData.item[0].item[3].answer[0].valueQuantity.value).toBe(70);
              // Weight
              expect(fhirData.item[0].item[4].text).toBe("Weight");
              expect(fhirData.item[0].item[4].linkId).toBe("/54126-8/29463-7");
              expect(fhirData.item[0].item[4].answer.length).toBe(1);
              expect(fhirData.item[0].item[4].answer[0].valueQuantity.unit).toBe("lbs");
              expect(fhirData.item[0].item[4].answer[0].valueQuantity.value).toBe(170);
              // BMI
              expect(fhirData.item[0].item[5].text).toBe("Mock-up item: Body mass index (BMI) [Ratio]");
              expect(fhirData.item[0].item[5].linkId).toBe("/54126-8/39156-5");
              expect(fhirData.item[0].item[5].answer.length).toBe(1);
              expect(fhirData.item[0].item[5].answer[0].valueString).toBe("24.39");
              // Race
              expect(fhirData.item[0].item[6].text).toBe("Race");
              expect(fhirData.item[0].item[6].linkId).toBe("/54126-8/54134-2");
              expect(fhirData.item[0].item[6].answer.length).toBe(2);
              expect(fhirData.item[0].item[6].answer[0].valueCoding.code).toBe("LA10608-0");
              expect(fhirData.item[0].item[6].answer[0].valueCoding.display).toBe("American Indian or Alaska Native");
              expect(fhirData.item[0].item[6].answer[0].valueCoding.system).toBe("http://loinc.org");
              expect(fhirData.item[0].item[6].answer[1].valueCoding.code).toBe("LA6156-9");
              expect(fhirData.item[0].item[6].answer[1].valueCoding.display).toBe("Asian");
              expect(fhirData.item[0].item[6].answer[1].valueCoding.system).toBe("http://loinc.org");
              // Disease history #1
              expect(fhirData.item[0].item[7].text).toBe("Your diseases history");
              expect(fhirData.item[0].item[7].linkId).toBe("/54126-8/54137-5");
              expect(fhirData.item[0].item[7].item.length).toBe(2);
              //-- Disease or Condition
              expect(fhirData.item[0].item[7].item[0].text).toBe("Disease or Condition");
              expect(fhirData.item[0].item[7].item[0].linkId).toBe("/54126-8/54137-5/54140-9");
              expect(fhirData.item[0].item[7].item[0].answer.length).toBe(1);
              expect(fhirData.item[0].item[7].item[0].answer[0].valueCoding.code).toBe("LA10533-0");
              expect(fhirData.item[0].item[7].item[0].answer[0].valueCoding.display).toBe("Blood Clots");
              expect(fhirData.item[0].item[7].item[0].answer[0].valueCoding.system).toBe("http://loinc.org");
              //-- Age at Diagnosis
              expect(fhirData.item[0].item[7].item[1].text).toBe("Age at Diagnosis");
              expect(fhirData.item[0].item[7].item[1].linkId).toBe("/54126-8/54137-5/54130-0");
              expect(fhirData.item[0].item[7].item[1].answer.length).toBe(1);
              expect(fhirData.item[0].item[7].item[1].answer[0].valueCoding.code).toBe("LA10403-6");
              expect(fhirData.item[0].item[7].item[1].answer[0].valueCoding.display).toBe("Newborn");
              expect(fhirData.item[0].item[7].item[1].answer[0].valueCoding.system).toBe("http://loinc.org");

              // Disease history #2
              expect(fhirData.item[0].item[8].text).toBe("Your diseases history");
              expect(fhirData.item[0].item[8].linkId).toBe("/54126-8/54137-5");
              expect(fhirData.item[0].item[8].item.length).toBe(2);
              //-- Disease or Condition
              expect(fhirData.item[0].item[8].item[0].text).toBe("Disease or Condition");
              expect(fhirData.item[0].item[8].item[0].linkId).toBe("/54126-8/54137-5/54140-9");
              expect(fhirData.item[0].item[8].item[0].answer.length).toBe(1);
              expect(fhirData.item[0].item[8].item[0].answer[0].valueCoding.code).toBe("LA10572-8");
              expect(fhirData.item[0].item[8].item[0].answer[0].valueCoding.display).toBe("-- Blood Clot in Leg");
              expect(fhirData.item[0].item[8].item[0].answer[0].valueCoding.system).toBe("http://loinc.org");
              //-- Age at Diagnosis
              expect(fhirData.item[0].item[8].item[1].text).toBe("Age at Diagnosis");
              expect(fhirData.item[0].item[8].item[1].linkId).toBe("/54126-8/54137-5/54130-0");
              expect(fhirData.item[0].item[8].item[1].answer.length).toBe(1);
              expect(fhirData.item[0].item[8].item[1].answer[0].valueCoding.code).toBe("LA10394-7");
              expect(fhirData.item[0].item[8].item[1].answer[0].valueCoding.display).toBe("Infancy");
              expect(fhirData.item[0].item[8].item[1].answer[0].valueCoding.system).toBe("http://loinc.org");
            });
          });

          it('should get a DiagnosticReport data from a form without questions in header', function() {

            tp.LoadForm.openRxTerms();

            var drugNameField = rxterms.drugName;
            drugNameField.click();
            TestUtil.sendKeys(drugNameField, 'aspercreme');
            cy.get(tp.Autocomp.searchResults).should('be.visible');
            drugNameField.sendKeys(protractor.Key.ARROW_DOWN);
            drugNameField.sendKeys(protractor.Key.ENTER);

            getFHIRResource("DiagnosticReport", fhirVersion,
                ).then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.result.length).toBe(1);
              expect(fhirData.result[0].reference).not.toBe(undefined);
              expect(fhirData.contained.length).toBe(2);
              // drug name
              expect(fhirData.contained[0].resourceType).toBe("Observation");
              expect(fhirData.contained[0].id).not.toBe(undefined);
              expect(fhirData.contained[0].code.coding[0].code).toBe("nameAndRoute");
              expect(fhirData.contained[0].code.coding[0].system).toBe(undefined);
              expect(fhirData.contained[0].code.text).toBe("Drug Name");
              expect(fhirData.contained[0].valueCodeableConcept).toEqual({"coding": [{"code": "ASPERCREME (Topical)", "display": "ASPERCREME (Topical)"}], "text": "ASPERCREME (Topical)"});
            });
          });

        });


        describe('merge FHIR data into form', function() {

          it('should merge all DiagnosticReport (contained) data back into the form', function() {
            tp.openBaseTestPage();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-dr")).click();
            //browser.waitForAngular();

            expect(TestUtil.getAttribute(ff.name,'value')).toBe("name 1");
            expect(TestUtil.getAttribute(ff.name2,'value')).toBe("name 2");
            expect(TestUtil.getAttribute(ff.gender,'value')).toBe("Male");
            expect(TestUtil.getAttribute(ff.dob,'value')).toBe("10/27/2016");
            expect(TestUtil.getAttribute(ff.height,'value')).toBe("70");
            expect(TestUtil.getAttribute(ff.weight,'value')).toBe("170");
            expect(TestUtil.getAttribute(ff.bmi,'value')).toBe("24.39");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(TestUtil.getAttribute(ff.disease,'value')).toBe("Blood Clots");
            expect(TestUtil.getAttribute(ff.ageAtDiag,'value')).toBe("Newborn");
            expect(TestUtil.getAttribute(ff.disease2,'value')).toBe("-- Blood Clot in Leg");
            expect(TestUtil.getAttribute(ff.ageAtDiag2,'value')).toBe("Infancy");
          });

          it('should merge all DiagnosticReport (Bundle) data back into the form', function() {

            tp.openBaseTestPage();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-bundle-dr")).click();

            expect(TestUtil.getAttribute(ff.name,'value')).toBe("12");
            expect(TestUtil.getAttribute(ff.gender,'value')).toBe("Male");
            expect(TestUtil.getAttribute(ff.dob,'value')).toBe("01/10/2018");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(TestUtil.getAttribute(ff.disease,'value')).toBe("Hypertension");
            expect(TestUtil.getAttribute(ff.ageAtDiag,'value')).toBe("Newborn");
          });


          it('should merge all DiagnosticReport (contained) data back into the form without setting default values', function() {

          //  tp.LoadForm.openUSSGFHTVertical();
            tp.openBaseTestPage();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-dr-default-values")).click();
            //browser.waitForAngular();

            var intField = element(by.id('/intField/1')),
                decField = element(by.id('/decField/1')),
                strField = element(by.id('/strField/1')),
                dateField = element(by.css('#/dateField/1 input')),
                listField = element(by.id('/ansCodeDefault/1'));

            expect(TestUtil.getAttribute(intField,'value')).toBe('24'); // it is a value in dr
            expect(TestUtil.getAttribute(decField,'value')).toBe('');
            expect(TestUtil.getAttribute(strField,'value')).toBe('');
            expect(TestUtil.getAttribute(dateField,'value')).toBe('');
            expect(TestUtil.getAttribute(listField,'value')).toBe('');

          });


          it('should merge FHIR SDC QuestionnaireResponse data back into the form', function() {
            tp.LoadForm.openUSSGFHTVertical();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-qr")).click();
            // Make it wait for a value to appear
            ff.name.getCyElem().should('have.value', 'name 1');

            expect(TestUtil.getAttribute(ff.name2,'value')).toBe("name 2");
            expect(TestUtil.getAttribute(ff.name3,'value')).toBe("name 3");
            expect(TestUtil.getAttribute(ff.name4,'value')).toBe("name 4");
            expect(TestUtil.getAttribute(ff.gender,'value')).toBe("Male");
            expect(TestUtil.getAttribute(ff.dob,'value')).toBe("10/27/2016");
            expect(TestUtil.getAttribute(ff.height,'value')).toBe("70");
            expect(TestUtil.getAttribute(ff.weight,'value')).toBe("170");
            expect(TestUtil.getAttribute(ff.bmi,'value')).toBe("24.39");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(TestUtil.getAttribute(ff.disease,'value')).toBe("Blood Clots");
            expect(TestUtil.getAttribute(ff.ageAtDiag,'value')).toBe("Newborn");
            expect(TestUtil.getAttribute(ff.disease2,'value')).toBe("-- Blood Clot in Leg");
            expect(TestUtil.getAttribute(ff.ageAtDiag2,'value')).toBe("Infancy");

            expect(TestUtil.getAttribute(ff.fmName,'value')).toBe("another name 1");
            expect(TestUtil.getAttribute(ff.fmNameB,'value')).toBe("another name 2");
            expect(TestUtil.getAttribute(ff.fmNameC,'value')).toBe("another name 3");
            expect(TestUtil.getAttribute(ff.fmNameD,'value')).toBe("another name 4");

          });

          it('should merge FHIR SDC QuestionnaireResponse with User Data on CWE fields back into the form', function() {
            tp.LoadForm.openFullFeaturedForm();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-qr-cwe")).click();

            var bl1 = element(by.css('#/type1/1 button')), bl2 = element(by.css('#/type1b/1 button'));
            var cwe = element(by.id('/type10/1'));
            var cweRepeats = element(by.id('/multiSelectCWE/1'));
            // CNE field with a default value
            var cne = element(by.id('/type9/1'));
            // ST field with a default value
            var st = element(by.id('/type4/1'));

            // the default value should not be set
            expect(TestUtil.getAttribute(cne,'value')).toBe('');
            expect(TestUtil.getAttribute(st,'value')).toBe('');

            bl1.getCyElem().should('have.class', 'ant-switch-checked');
            bl2.getCyElem().should('not.have.class', 'ant-switch-checked');

            expect(TestUtil.getAttribute(cwe,'value')).toBe("user typed value");

            var cweRepeatsValues = element.all(by.css('.autocomp_selected li'));
            expect(cweRepeatsValues.get(0).getText()).toBe('×Answer 1');
            expect(cweRepeatsValues.get(1).getText()).toBe('×Answer 2');
            expect(cweRepeatsValues.get(2).getText()).toBe('×user value1');
            expect(cweRepeatsValues.get(3).getText()).toBe('×user value2');
            cy.window().then((win)=> {
              return win.LForms.Util.getUserData(null, false, true);
            }).then(function (formData) {

              expect(formData.itemsData.length).toBe(7);
              expect(formData.itemsData[0].value).toBe(true);
              expect(formData.itemsData[1].value).toBe(false);
              expect(formData.itemsData[2].value).toBe("user typed value");
              expect(formData.itemsData[3].value.length).toBe(4);
              expect(formData.itemsData[3].value[0].code).toEqual('c1');
              expect(formData.itemsData[3].value[0].text).toEqual('Answer 1');
              expect(formData.itemsData[3].value[0].system).toEqual(undefined);
              expect(formData.itemsData[3].value[1].code).toEqual('c2');
              expect(formData.itemsData[3].value[1].text).toEqual('Answer 2');
              expect(formData.itemsData[3].value[1].system).toEqual(undefined);
              expect(formData.itemsData[3].value[2]).toEqual('user value1');
              expect(formData.itemsData[3].value[3]).toEqual('user value2');

            })

          });
        });

        describe('Converted Questionnaire', function () {

          beforeEach(function() {
            cy.visit('test/pages/addFormToPageTest.html');
            util.addFormToPage('4712701.json', null, {fhirVersion});
          });

          it('should be able to show a converted questionnaire', function() {
            // Check to see that the last question has rendered
            let label = element(by.id('label-4.3.3.1/1/1/1/1'));
            TestUtil.waitForElementPresent(label);
            expect(label.getText()).toBe(
              "Rezidiv/Progress aufgetreten *");
          });

          it('should have functioning skiplogic when codes are not present', function() {
            let packungenField = element(by.id('1.5.4/1/1/1'));
            TestUtil.waitForElementNotPresent(packungenField);
            let raucherField = element(by.id('1.5.1/1/1/1'));
            raucherField.click();
            TestUtil.waitForElementPresent(packungenField);
            raucherField.click();
            TestUtil.waitForElementNotPresent(packungenField);
            //TestUtil.waitForElementNotPresent(raucherField); // was this in protractor, which looks incorrect
          });

          it('should have functioning skiplogic when the codes are present', function() {
            let progressField = element(by.id('4.3.3.1/1/1/1/1'));
            let zeitpunktField = element(by.id('4.3.3.2/1/1/1/1'));
            TestUtil.waitForElementNotPresent(zeitpunktField);
            progressField.click();
            TestUtil.waitForElementPresent(zeitpunktField);
            progressField.click();
            TestUtil.waitForElementNotPresent(zeitpunktField);
          });
        });
      });

      describe('Subject option with a Patient resource', function() {
       before(function() {
          cy.visit('test/pages/addFormToPageTest.html');
          util.addFormToPage('weightHeightQuestionnaire.json', null, {fhirVersion});
          var height = element(by.id('/8302-2/1'));
          TestUtil.sendKeys(height, '70');
        });

        var patientRes = {
          id: 3,
          resourceType: 'Patient',
          name: [ {
            family: 'Smith',
            given: ['John']
          }]
        };

        it('should put the patient ID into the QuestionnaireResponse', function() {
          getFHIRResource("QuestionnaireResponse", fhirVersion, {subject: patientRes}).
              then(function(callbackData) {
            let [error, fhirData] = callbackData;
            expect(error).toBeNull();
            expect(fhirData.resourceType).toBe("QuestionnaireResponse");
            expect(fhirData.subject.reference).toBe('Patient/3');
            expect(fhirData.subject.display).toBe('John Smith');
          });
        });

        it('should put the patient ID into the DiagnosticReport', function() {
          getFHIRResource("DiagnosticReport", fhirVersion, {subject: patientRes}).
              then(function(callbackData) {
            let [error, fhirData] = callbackData;
            expect(error).toBeNull();
            expect(fhirData.resourceType).toBe("DiagnosticReport");
            expect(fhirData.subject.reference).toBe('Patient/3');
            expect(fhirData.subject.display).toBe('John Smith');
          });
        });
      });

      describe('data control in Questionnaire', function() {
        before(function () {
          cy.visit('test/pages/addFormToPageTest.html');
          tp.setFHIRVersion(fhirVersion);
          util.addFormToPage('questionnaire-data-control.json', null, {fhirVersion});
        });

        it('should have data control working correctly', function () {
          var dcSource = element(by.id('/dataControlSource/1')),
              dcTarget1 = element(by.id('/controlledItem_LIST/1')),
              dcTarget2 = element(by.id('/controlledItem_TEXT/1'));

          dcSource.click();
          TestUtil.sendKeys(dcSource, "ALTABAX (Topical)")
          cy.get(tp.Autocomp.searchResults).should('be.visible');

          dcSource.sendKeys(protractor.Key.ARROW_DOWN);
          dcSource.sendKeys(protractor.Key.ENTER);

          TestUtil.waitForValue(dcTarget1, '1% Ointment')
          expect(TestUtil.getAttribute(dcTarget1,'value')).toBe('1% Ointment');
          expect(TestUtil.getAttribute(dcTarget2,'value')).toBe('1% Ointment');
        });
      });

      describe('initial[x] in Questionnaire', function() {
        before(function() {
          cy.visit('test/pages/addFormToPageTest.html');
          util.addFormToPage('questionnaire-initialx.json', null, {fhirVersion});
        });

        it('should display initial[x] values correctly', function() {
          var typeBoolean = element(by.id('/type-boolean/1 button')),
              typeInteger = element(by.id('/type-integer/1')),
              typeDecimal = element(by.id('/type-decimal/1')),
              typeString = element(by.id('/type-string/1')),
              typeDate = element(by.id('/type-date/1')).element(by.css('input')),
              typeDateTime = element(by.id('/type-dateTime/1')).element(by.css('input')),
              typeTime = element(by.id('/type-time/1')).element(by.css('input')),
              typeChoice = element(by.id('/type-choice/1')),
              typeOpenChoice = element(by.id('/type-open-choice/1')),
              typeChoiceMulti = element(by.id('/type-choice-m/1')),
              typeOpenChoiceMulti = element(by.id('/type-open-choice-m/1'));

          // NEXT: new boolean implementation
          typeBoolean.getCyElem().should('have.class', 'ant-switch-checked');

          if (fhirVersion === "R4") {

            expect(TestUtil.getAttribute(typeInteger,'value')).toBe('123');

            expect(TestUtil.getAttribute(typeDecimal,'value')).toBe('123.45');

            expect(TestUtil.getAttribute(typeString,'value')).toBe("abc123");

            expect(TestUtil.getAttribute(typeDate,'value')).toBe("09/03/2019");

            // initial[x] valueDateTime
            expect(TestUtil.getAttribute(typeDateTime,'value')).toBe("02/07/2015 13:28:17");

            expect(TestUtil.getAttribute(typeTime,'value')).toBe("13:28:17");

            expect(TestUtil.getAttribute(typeChoice,'value')).toBe("Answer 2");

            expect(TestUtil.getAttribute(typeOpenChoice,'value')).toBe("User typed answer");

            var repeatsElements = element.all(by.css('.autocomp_selected li'));
            expect(repeatsElements.get(0).getText()).toBe('×Answer 1');
            expect(repeatsElements.get(1).getText()).toBe('×Answer 3');

            expect(repeatsElements.get(2).getText()).toBe('×Answer 1');
            expect(repeatsElements.get(3).getText()).toBe('×Answer 3');
            expect(repeatsElements.get(4).getText()).toBe('×User typed answer a');
            expect(repeatsElements.get(5).getText()).toBe('×User typed answer b');

            cy.window().then((win)=> {
              return win.LForms.Util.getUserData(null, false, true);
            }).then(function (formData) {

              expect(formData.itemsData.length).toBe(11);
              expect(formData.itemsData[0].value).toBe(true);
              expect(formData.itemsData[1].value).toBe(123);
              expect(formData.itemsData[2].value).toBe(123.45);
              expect(formData.itemsData[3].value).toBe('abc123');
              expect(formData.itemsData[4].value).toBe('2019-09-03');
              expect(formData.itemsData[5].value).toBe('2015-02-07T18:28:17.000Z'); //"2015-02-07T13:28:17-05:00" in initial value
              expect(formData.itemsData[6].value).toBe('13:28:17');
              expect(formData.itemsData[7].value.code).toBe('c2');
              expect(formData.itemsData[7].value.text).toBe('Answer 2');
              expect(formData.itemsData[8].value).toBe('User typed answer');

              expect(formData.itemsData[9].value[0].code).toEqual('c1');
              expect(formData.itemsData[9].value[0].text).toEqual('Answer 1');
              expect(formData.itemsData[9].value[1].code).toEqual('c3');
              expect(formData.itemsData[9].value[1].text).toEqual('Answer 3');

              expect(formData.itemsData[10].value[0].code).toEqual('c1');
              expect(formData.itemsData[10].value[0].text).toEqual('Answer 1');
              expect(formData.itemsData[10].value[1].code).toEqual('c3');
              expect(formData.itemsData[10].value[1].text).toEqual('Answer 3');
              expect(formData.itemsData[10].value[2]).toEqual('User typed answer a');
              expect(formData.itemsData[10].value[3]).toEqual('User typed answer b');

            })



          }
          if (fhirVersion === "STU3") {
            expect(TestUtil.getAttribute(typeInteger,'value')).toBe('123');

            expect(TestUtil.getAttribute(typeDecimal,'value')).toBe('123.45');

            expect(TestUtil.getAttribute(typeString,'value')).toBe("abc123");

            expect(TestUtil.getAttribute(typeDate,'value')).toBe("09/03/2019");

            // initial[x] valueDateTime
            expect(TestUtil.getAttribute(typeDateTime, 'value')).toBe("02/07/2015 13:28:17");

            expect(TestUtil.getAttribute(typeTime,'value')).toBe("13:28:17");

            expect(TestUtil.getAttribute(typeChoice,'value')).toBe("Answer 2");

            expect(TestUtil.getAttribute(typeOpenChoice,'value')).toBe("User typed answer");

            cy.window().then((win)=> {
              return win.LForms.Util.getUserData(null, false, true);
            }).then(function (formData) {

              expect(formData.itemsData.length).toBe(9);
              expect(formData.itemsData[0].value).toBe(true);
              expect(formData.itemsData[1].value).toBe(123);
              expect(formData.itemsData[2].value).toBe(123.45);
              expect(formData.itemsData[3].value).toBe('abc123');
              expect(formData.itemsData[4].value).toBe('2019-09-03');
              expect(formData.itemsData[5].value).toBe('2015-02-07T18:28:17.000Z'); //"2015-02-07T13:28:17-05:00" in initial value
              expect(formData.itemsData[6].value).toBe('13:28:17');
              expect(formData.itemsData[7].value.code).toBe('c2');
              expect(formData.itemsData[7].value.text).toBe('Answer 2');
              expect(formData.itemsData[8].value).toBe('User typed answer');
            })

          }
        });

        it('should keep the initial[x] values when converted back to Questionnaire', function() {
          if (fhirVersion === "R4") {
            getFHIRResource("Questionnaire", fhirVersion).
            then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              // boolean
              expect(fhirData.item[0].initial).toEqual([
                {
                  "valueBoolean": true
                }
              ]);
              // integer
              expect(fhirData.item[1].initial).toEqual([
                {
                  "valueInteger": 123
                }
              ]);
              // decimal
              expect(fhirData.item[2].initial).toEqual([
                {
                  "valueDecimal": 123.45
                }
              ]);

              // string
              expect(fhirData.item[3].initial).toEqual([
                {
                  "valueString": "abc123"
                }
              ]);

              // date
              expect(fhirData.item[4].initial).toEqual([
                {
                  "valueDate": "2019-09-03"
                }
              ]);

              // dateTime
              expect(fhirData.item[5].initial).toEqual([
                { // Use converted FHIR datetime format.
                  "valueDateTime": "2015-02-07T18:28:17.000Z"
                }
              ]);

              // time
              expect(fhirData.item[6].initial).toEqual([
                {
                  "valueTime": "13:28:17"
                }
              ]);
              // choice
              expect(fhirData.item[7].answerOption[1].initialSelected).toEqual(true)
              expect(fhirData.item[7].initial).toEqual(undefined);
              // open-choice
              expect(fhirData.item[8].initial).toEqual(undefined);

              // choice, multiple selection
              expect(fhirData.item[9].answerOption[0].initialSelected).toEqual(true)
              expect(fhirData.item[9].answerOption[2].initialSelected).toEqual(true)
              expect(fhirData.item[9].initial).toEqual(undefined);

              // open-choice, multiple selection
              expect(fhirData.item[10].answerOption[0].initialSelected).toEqual(true)
              expect(fhirData.item[10].answerOption[2].initialSelected).toEqual(true)
              expect(fhirData.item[10].initial).toEqual(undefined);
             
            });
          }

          if (fhirVersion === "STU3") {
            getFHIRResource("Questionnaire", fhirVersion).
            then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              // boolean
              expect(fhirData.item[0].initialBoolean).toBe(true);
              // integer
              expect(fhirData.item[1].initialInteger).toBe(123);
              // decimal
              expect(fhirData.item[2].initialDecimal).toBe(123.45);
              // string
              expect(fhirData.item[3].initialString).toBe("abc123");
              // date
              expect(fhirData.item[4].initialDate).toBe( "2019-09-03");
              // dateTime
              expect(fhirData.item[5].initialDateTime).toBe("2015-02-07T18:28:17.000Z"); // use converted FHIR format
              // time
              expect(fhirData.item[6].initialTime).toBe("13:28:17");
              // choice
              expect(fhirData.item[7].initialCoding).toEqual({
                "code": "c2",
                "display": "Answer 2"
              });
              // open-choice
              expect(fhirData.item[8].initialString).toBe("User typed answer");
            });
          }


        });
      });

      describe('QuestionnaireResponse special case', function () {

        if (fhirVersion === 'R4') {
          it('should get answers from a question that is under a question that has no answer values', function() {
            cy.visit('test/pages/addFormToPageTest.html');
            tp.setFHIRVersion(fhirVersion);
            util.addFormToPage('question-under-question.R4.json', null, {fhirVersion});

            let childItem = element(by.id('q2/1/1'));
            getFHIRResource("QuestionnaireResponse", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("QuestionnaireResponse");
              expect(fhirData.item).toBe(undefined);
            });

            TestUtil.sendKeys(childItem, '123');
            getFHIRResource("QuestionnaireResponse", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("QuestionnaireResponse");
              expect(fhirData.item[0].answer[0].item[0].answer[0].valueString).toBe('123');
            });

          });

          it('should get answers from a question in a group that is under a question that has no answer values', function() {
            cy.visit('test/pages/addFormToPageTest.html');
            tp.setFHIRVersion(fhirVersion);
            util.addFormToPage('group-under-question.R4.json', null, {fhirVersion});

            let childItem = element(by.id('q2/1/1/1'));

            getFHIRResource("QuestionnaireResponse", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("QuestionnaireResponse");
              expect(fhirData.item).toBe(undefined);
            });

            TestUtil.sendKeys(childItem, '123');
            getFHIRResource("QuestionnaireResponse", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("QuestionnaireResponse");
              expect(fhirData.item[0].answer[0].item[0].item[0].answer[0].valueString).toBe('123');
            });
          });
        }
      });
    });
  })(fhirVersions[i]);
}
