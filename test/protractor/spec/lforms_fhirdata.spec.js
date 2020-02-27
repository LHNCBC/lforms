// Tests FHIR output and import of FHIR resources.

var util = require('./util');
var tp = require('./lforms_testpage.po.js');
var rxtermsForm = require('./rxterms.fo.js');
var ff = tp.USSGFHTVertical;
var fhirSupport = require('../../../app/scripts/fhir/versions');
var fhirVersions = Object.keys(fhirSupport);
var EC = protractor.ExpectedConditions;


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
function getFHIRResource(resourceType, fhirVersion, options) {
  return browser.driver.executeAsyncScript(function() {
    var callback = arguments[arguments.length-1];
    var resourceType = arguments[0];
    var fhirVersion = arguments[1];
    var options = arguments.length > 3 ? arguments[2] : null;
    try {
      var fData = LForms.Util.getFormFHIRData(resourceType, fhirVersion,
        null, options);
    }
    catch (e) {callback([[e.message].concat(e.stack).join("\n")])}
    callback([null, fData]);
  }, resourceType, fhirVersion, options)
}

for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion, function() {
      describe('rendering-style extension', function() {
        it('should work on Questionnaire.title, item.prefix, and item.text', function() {
          tp.openBaseTestPage();
          tp.loadFromTestData('argonaut-phq9-ish.json', fhirVersion);
          expect(element(by.id('label-44249-1')).getAttribute('style')).toBe('color: green; background-color: white;');
          var idCSS = '#label-\\/44249-1\\/44255-8\\/1\\/1';
          expect(element(by.css(idCSS+' .prefix')).getAttribute('style')).toBe('font-weight: bold;');
          expect(element(by.css(idCSS+' .question')).getAttribute('style')).toBe('font-style: italic;');
        });

        if (fhirVersion !== 'STU3') { // supported in STU3, but sufficient to test R4
          it('should work on question text in horizontal tables', function() {
            tp.loadFromTestData('tables.json', fhirVersion);
            var idCSS = '#col\\/g2\\/g1m1\\/1\\/1';
            expect(element(by.css(idCSS+' .prefix')).getAttribute('style')).toBe('font-weight: bold;');
            expect(element(by.css(idCSS+' .question')).getAttribute('style')).toBe('font-style: italic;');
          });
          it('should work on question text in a matrix layout', function () {
            var idCSS = '#label-\\/g4\\/g1m2\\/1\\/1';
            expect(element(by.css(idCSS+' .prefix')).getAttribute('style')).toBe('font-weight: bold;');
            expect(element(by.css(idCSS+' .question')).getAttribute('style')).toBe('font-style: italic;');
          });
        }
      });

      describe('FHIR Data: ', function () {
        describe('get FHIR data from LForms forms', function() {
          it('should generate correct Observations for type integer', function() {
            tp.openFullFeaturedForm();
            let integerWithUnit = $('#\\/q_lg\\/1')
            integerWithUnit.sendKeys(3);
            let integerNoUnit = $('#\\/type2\\/1');
            integerNoUnit.sendKeys(4);
            getFHIRResource("DiagnosticReport", fhirVersion).then(function(callbackData) {
              [error, fhirData] = callbackData;

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

            tp.openUSSGFHTVertical();
            // #1 all fields are empty
            getFHIRResource("DiagnosticReport", fhirVersion).then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("DiagnosticReport");
              expect(fhirData.result.length).toBe(0);
              expect(fhirData.contained).toEqual([]);

              // #2 has some values
              // ST, repeating
              ff.name.sendKeys("name 1");
              ff.btnName.click();
              ff.name2.sendKeys("name 2");
              // DT
              ff.dob.sendKeys("10/27/2016");
              // CWE/CNE
              ff.gender.click();
              // pick the 1st item
              ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
              ff.gender.sendKeys(protractor.Key.TAB);
              // CWE, multiple answers
              ff.race.click();
              // pick the first 2 items
              ff.race.sendKeys(protractor.Key.ARROW_DOWN);
              ff.race.sendKeys(protractor.Key.TAB);
              ff.race.click();
              ff.race.sendKeys(protractor.Key.ARROW_DOWN);
              ff.race.sendKeys(protractor.Key.TAB);
              // REAL
              ff.height.sendKeys("70");
              ff.weight.sendKeys("170");
              // repeating sub panel
              ff.disease.click();
              ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease.sendKeys(protractor.Key.TAB);
              ff.ageAtDiag.click();
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.TAB);

              util.clickAddRemoveButton(ff.btnDiseasesHist);

              ff.disease2.click();
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.TAB);
              ff.ageAtDiag2.click();
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.TAB);

              getFHIRResource("DiagnosticReport", fhirVersion).then(function(callbackData) {
                [error, fhirData] = callbackData;

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

            tp.openUSSGFHTVertical();

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
              ff.name.sendKeys("name 1");
              ff.btnName.click();
              ff.name2.sendKeys("name 2");
              // DT
              ff.dob.sendKeys("10/27/2016");
              // CWE/CNE
              ff.gender.click();
              // pick the 1st item
              ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
              ff.gender.sendKeys(protractor.Key.TAB);
              // CWE, multiple answers
              ff.race.click();
              // pick the first 2 items
              ff.race.sendKeys(protractor.Key.ARROW_DOWN);
              ff.race.sendKeys(protractor.Key.TAB);
              ff.race.click();
              ff.race.sendKeys(protractor.Key.ARROW_DOWN);
              ff.race.sendKeys(protractor.Key.TAB);
              // REAL
              ff.height.sendKeys("70");
              ff.weight.sendKeys("170");
              // repeating sub panel
              ff.disease.click();
              ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease.sendKeys(protractor.Key.TAB);
              ff.ageAtDiag.click();
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag.sendKeys(protractor.Key.TAB);

              util.clickAddRemoveButton(ff.btnDiseasesHist);

              ff.disease2.click();
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.TAB);
              ff.ageAtDiag2.click();
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.TAB);

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
                [error, fhirData] = callbackData;
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

            tp.openUSSGFHTVertical();
            getFHIRResource("Questionnaire", fhirVersion,
                ).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              var assertFHTQuestionnaire = require('./'+fhirVersion+'/assert-sdc-questionnaire').assertFHTQuestionnaire;
              assertFHTQuestionnaire(fhirData);
            });
          });

          it('should get a SDC QuestionnaireResponse data from a form', function() {

            tp.openUSSGFHTVertical();

            // ST, repeating
            ff.name.sendKeys("name 1");
            ff.btnName.click();
            ff.name2.sendKeys("name 2");
            // DT
            ff.dob.sendKeys("10/27/2016");
            // CWE/CNE
            ff.gender.click();
            // pick the 1st item
            ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
            ff.gender.sendKeys(protractor.Key.TAB);
            // CWE, multiple answers
            ff.race.click();
            // pick the first 2 items
            ff.race.sendKeys(protractor.Key.ARROW_DOWN);
            ff.race.sendKeys(protractor.Key.TAB);
            ff.race.click();
            ff.race.sendKeys(protractor.Key.ARROW_DOWN);
            ff.race.sendKeys(protractor.Key.TAB);
            // REAL
            ff.height.sendKeys("70");
            ff.weight.sendKeys("170");
            // repeating sub panel
            ff.disease.click();
            ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease.sendKeys(protractor.Key.TAB);
            ff.ageAtDiag.click();
            ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag.sendKeys(protractor.Key.TAB);

            util.clickAddRemoveButton(ff.btnDiseasesHist);

            ff.disease2.click();
            ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease2.sendKeys(protractor.Key.TAB);
            ff.ageAtDiag2.click();
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.TAB);


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

            tp.openRxTerms();

            var drugNameField = rxtermsForm.drugName;
            drugNameField.click();
            drugNameField.sendKeys('aspercreme');
            browser.wait(function(){return tp.Autocomp.searchResults.isDisplayed()}, tp.WAIT_TIMEOUT_2);
            drugNameField.sendKeys(protractor.Key.ARROW_DOWN);
            drugNameField.sendKeys(protractor.Key.TAB);

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

            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-dr")).click();
            browser.waitForAngular();

            browser.wait(EC.visibilityOf(ff.name), 2000);
            browser.wait(function() {
              try {
                return ff.name.isDisplayed(); // sometimes results in a "stale reference" error
              }
              catch (e) {
                // Try to refresh the element
                ff.name = element(ff.name.locator())
              }
            }, tp.WAIT_TIMEOUT_1);

            expect(ff.name.getAttribute('value')).toBe("name 1");
            expect(ff.name2.getAttribute('value')).toBe("name 2");
            expect(ff.gender.getAttribute('value')).toBe("Male");
            expect(ff.dob.getAttribute('value')).toBe("10/27/2016");
            expect(ff.height.getAttribute('value')).toBe("70");
            expect(ff.weight.getAttribute('value')).toBe("170");
            expect(ff.bmi.getAttribute('value')).toBe("24.39");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(ff.disease.getAttribute('value')).toBe("Blood Clots");
            expect(ff.ageAtDiag.getAttribute('value')).toBe("Newborn");
            expect(ff.disease2.getAttribute('value')).toBe("-- Blood Clot in Leg");
            expect(ff.ageAtDiag2.getAttribute('value')).toBe("Infancy");
          });

          it('should merge all DiagnosticReport (Bundle) data back into the form', function() {

            tp.openBaseTestPage();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-bundle-dr")).click();

            // sometimes ff.name is "not attached to the page document"
            var name = element(by.id('/54126-8/54125-0/1/1'));
            browser.wait(function() {
              return name.isDisplayed();
            }, tp.WAIT_TIMEOUT_1);

            expect(name.getAttribute('value')).toBe("12");
            expect(ff.gender.getAttribute('value')).toBe("Male");
            expect(ff.dob.getAttribute('value')).toBe("01/10/2018");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(ff.disease.getAttribute('value')).toBe("Hypertension");
            expect(ff.ageAtDiag.getAttribute('value')).toBe("Newborn");
          });


          it('should merge all DiagnosticReport (contained) data back into the form without setting default values', function() {

            //tp.openUSSGFHTVertical();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-dr-default-values")).click();
            browser.waitForAngular();

            var intField = element(by.id('/intField/1')),
                decField = element(by.id('/decField/1')),
                strField = element(by.id('/strField/1')),
                dateField = element(by.id('/dateField/1')),
                listField = element(by.id('/ansCodeDefault/1'));

            browser.wait(function() {
              try {
                return intField.isDisplayed(); // sometimes results in a "stale reference" error
              }
              catch (e) {
                // Try to refresh the element
                intField = element(by.id('/intField/1'));
              }
            }, tp.WAIT_TIMEOUT_1);

            expect(intField.getAttribute('value')).toBe('24'); // it is a value in dr
            expect(decField.getAttribute('value')).toBe('');
            expect(strField.getAttribute('value')).toBe('');
            expect(dateField.getAttribute('value')).toBe('');
            expect(listField.getAttribute('value')).toBe('');

          });


          it('should merge FHIR SDC QuestionnaireResponse data back into the form', function() {
            tp.openUSSGFHTVertical();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-qr")).click();

            browser.wait(function() {
              return element(by.id(ff.nameID)).isDisplayed(); // .name is sometimes stale
            }, tp.WAIT_TIMEOUT_1);

            browser.wait(EC.textToBePresentInElementValue(ff.name,
              'name 1'), 2000);
            expect(ff.name.getAttribute('value')).toBe("name 1");
            expect(ff.name2.getAttribute('value')).toBe("name 2");
            expect(ff.name3.getAttribute('value')).toBe("name 3");
            expect(ff.name4.getAttribute('value')).toBe("name 4");
            expect(ff.gender.getAttribute('value')).toBe("Male");
            expect(ff.dob.getAttribute('value')).toBe("10/27/2016");
            expect(ff.height.getAttribute('value')).toBe("70");
            expect(ff.weight.getAttribute('value')).toBe("170");
            expect(ff.bmi.getAttribute('value')).toBe("24.39");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(ff.disease.getAttribute('value')).toBe("Blood Clots");
            expect(ff.ageAtDiag.getAttribute('value')).toBe("Newborn");
            expect(ff.disease2.getAttribute('value')).toBe("-- Blood Clot in Leg");
            expect(ff.ageAtDiag2.getAttribute('value')).toBe("Infancy");

            expect(ff.fmName.getAttribute('value')).toBe("another name 1");
            expect(ff.fmNameB.getAttribute('value')).toBe("another name 2");
            expect(ff.fmNameC.getAttribute('value')).toBe("another name 3");
            expect(ff.fmNameD.getAttribute('value')).toBe("another name 4");

          });

          it('should merge FHIR SDC QuestionnaireResponse with User Data on CWE fields back into the form', function() {
            tp.openFullFeaturedForm();
            tp.setFHIRVersion(fhirVersion);

            element(by.id("merge-qr-cwe")).click();

            var bl1 = element(by.id('/type1/1')), bl2 = element(by.id('/type1b/1'));
            var cwe = element(by.id('/type10/1'));
            var cweRepeats = element(by.id('/multiSelectCWE/1'));
            // CNE field with a default value
            var cne = element(by.id('/type9/1'));
            // ST field with a default value
            var st = element(by.id('/type4/1'));
            browser.wait(function() {
              return cwe.isDisplayed();
            }, tp.WAIT_TIMEOUT_1);

            // the default value should not be set
            expect(cne.getAttribute('value')).toBe('');
            expect(st.getAttribute('value')).toBe('');

            expect(bl1.isSelected()).toBe(true);
            bl1.evaluate('item.value').then(function(val) {
              expect(val).toEqual(true);
            });
            expect(bl2.isSelected()).toBe(false);
            bl2.evaluate('item.value').then(function(val) {
              expect(val).toBeFalsy(); //null, not false
            });

            expect(cwe.getAttribute('value')).toBe("user typed value");
            cwe.evaluate('item.value').then(function(val) {
              expect(val.code).toEqual(undefined);
              expect(val.text).toEqual('user typed value');
              expect(val._displayText).toEqual('user typed value');
            });

            var cweRepeatsValues = element.all(by.css('.autocomp_selected li'));
            expect(cweRepeatsValues.get(0).getText()).toBe('×Answer 1');
            expect(cweRepeatsValues.get(1).getText()).toBe('×Answer 2');
            expect(cweRepeatsValues.get(2).getText()).toBe('×user value1');
            expect(cweRepeatsValues.get(3).getText()).toBe('×user value2');
            cweRepeats.evaluate('item.value').then(function(val) {
              expect(val.length).toEqual(4);
              expect(val[0].code).toEqual('c1');
              expect(val[0].text).toEqual('Answer 1');
              expect(val[0]._displayText).toEqual('Answer 1');
              expect(val[0].codeSystem).toEqual(undefined);
              expect(val[1].code).toEqual('c2');
              expect(val[1].text).toEqual('Answer 2');
              expect(val[1]._displayText).toEqual('Answer 2');
              expect(val[1].codeSystem).toEqual(undefined);
              expect(val[2].code).toEqual(undefined);
              expect(val[2].text).toEqual('user value1');
              expect(val[2]._displayText).toEqual('user value1');
              expect(val[2].codeSystem).toEqual(undefined);
              expect(val[3].code).toEqual(undefined);
              expect(val[3].text).toEqual('user value2');
              expect(val[3]._displayText).toEqual('user value2');
              expect(val[3].codeSystem).toEqual(undefined);
            });

          });
        });

        describe('Converted Questionnaire', function () {
          beforeEach(function() {
            tp.openBaseTestPage();
            tp.setFHIRVersion(fhirVersion);
            tp.loadFromTestData('4712701.json', fhirVersion);
          });

          it('should be able to show a converted questionnaire', function() {
            // Check to see that the last question has rendered
            expect(element(by.id('label-/4/TBD3/TBD19/TBD20/1/1/1/1')).getText()).toBe(
              "Rezidiv/Progress aufgetreten");
          });

          it('should have functioning skiplogic when codes are not present', function() {
            let packungenField = element(by.id('/1/1.5/1.5.4/1/1/1'));
            expect(packungenField.isPresent()).toBe(false);
            let raucherField = element(by.id('/1/1.5/1.5.1/1/1/1'));
            raucherField.click();
            expect(packungenField.isPresent()).toBe(true);
            raucherField.click();
            expect(packungenField.isPresent()).toBe(false);
          });

          it('should have functioning skiplogic when the codes are present', function() {
            let progressField = element(by.id('/4/TBD3/TBD19/TBD20/1/1/1/1'));
            let zeitpunktField = element(by.id('/4/TBD3/TBD19/TBD21/1/1/1/1'));
            expect(zeitpunktField.isPresent()).toBe(false);
            progressField.click();
            expect(zeitpunktField.isPresent()).toBe(true);
            progressField.click();
            expect(zeitpunktField.isPresent()).toBe(false);
          });
        });
      });

      describe('Subject option with a Patient resource', function() {
       beforeAll(function() {
          tp.openBaseTestPage();
          tp.setFHIRVersion(fhirVersion);
          tp.loadFromTestData('weightHeightQuestionnaire.json', fhirVersion);
          var height = element(by.id('/8302-2/1'));
          height.sendKeys('70');
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

      describe('initial[x] in Questionnaire', function() {
        beforeAll(function() {
          tp.openBaseTestPage();
          tp.setFHIRVersion(fhirVersion);
          tp.loadFromTestData('questionnaire-initialx.json', fhirVersion);
        });

        it('should display initial[x] values correctly', function() {
          var typeBoolean = element(by.id('/type-boolean/1')),
              typeInteger = element(by.id('/type-integer/1')),
              typeDecimal = element(by.id('/type-decimal/1')),
              typeString = element(by.id('/type-string/1')),
              typeDate = element(by.id('/type-date/1')),
              typeDateTime = element(by.id('/type-dateTime/1')),
              typeTime = element(by.id('/type-time/1')),
              typeChoice = element(by.id('/type-choice/1')),
              typeOpenChoice = element(by.id('/type-open-choice/1')),
              typeChoiceMulti = element(by.id('/type-choice-m/1')),
              typeOpenChoiceMulti = element(by.id('/type-open-choice-m/1'));

          browser.wait(function() {
            return typeBoolean.isDisplayed();
          }, tp.WAIT_TIMEOUT_1);

          if (fhirVersion === "R4") {

            expect(typeBoolean.getAttribute('value')).toBe('on');
            typeBoolean.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual(true);
            });

            expect(typeInteger.getAttribute('value')).toBe('123');
            typeInteger.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual(123);
            });

            expect(typeDecimal.getAttribute('value')).toBe('123.45');
            typeDecimal.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual(123.45);
            });

            expect(typeString.getAttribute('value')).toBe("abc123");
            typeString.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("abc123");
            });

            expect(typeDate.getAttribute('value')).toBe("09/03/2019");
            typeDate.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("2019-09-03");
            });

            // initial[x] valueDateTime does not work yet
            //expect(typeDateTime.getAttribute('value')).toBe("2015-02-07T13:28:17-05:00");
            typeDateTime.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("2015-02-07T13:28:17-05:00");
            });

            expect(typeTime.getAttribute('value')).toBe("13:28:17");
            typeTime.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("13:28:17");
            });

            expect(typeChoice.getAttribute('value')).toBe("Answer 2");
            typeChoice.evaluate('item.defaultAnswer').then(function(val) {
              expect(val.code).toEqual("c2");
              expect(val.text).toEqual('Answer 2');
            });

            expect(typeOpenChoice.getAttribute('value')).toBe("User typed answer");
            typeOpenChoice.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("User typed answer");

            });

            var repeatsElements = element.all(by.css('.autocomp_selected li'));
            expect(repeatsElements.get(0).getText()).toBe('×Answer 1');
            expect(repeatsElements.get(1).getText()).toBe('×Answer 3');
            typeChoiceMulti.evaluate('item.defaultAnswer').then(function(val) {
              expect(val.length).toEqual(2);
              expect(val[0].code).toEqual('c1');
              expect(val[0].text).toEqual('Answer 1');
              expect(val[1].code).toEqual('c3');
              expect(val[1].text).toEqual('Answer 3');
            });

            expect(repeatsElements.get(2).getText()).toBe('×Answer 1');
            expect(repeatsElements.get(3).getText()).toBe('×Answer 3');
            expect(repeatsElements.get(4).getText()).toBe('×User typed answer a');
            expect(repeatsElements.get(5).getText()).toBe('×User typed answer b');
            typeOpenChoiceMulti.evaluate('item.defaultAnswer').then(function(val) {
              expect(val.length).toEqual(4);
              expect(val[0].code).toEqual('c1');
              expect(val[0].text).toEqual('Answer 1');
              expect(val[1].code).toEqual('c3');
              expect(val[1].text).toEqual('Answer 3');
              expect(val[2]).toEqual('User typed answer a');
              expect(val[3]).toEqual('User typed answer b');
            });

          }
          if (fhirVersion === "STU3") {
            expect(typeBoolean.getAttribute('value')).toBe('on');
            typeBoolean.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual(true);
            });

            expect(typeInteger.getAttribute('value')).toBe('123');
            typeInteger.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual(123);
            });

            expect(typeDecimal.getAttribute('value')).toBe('123.45');
            typeDecimal.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual(123.45);
            });

            expect(typeString.getAttribute('value')).toBe("abc123");
            typeString.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("abc123");
            });

            expect(typeDate.getAttribute('value')).toBe("09/03/2019");
            typeDate.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("2019-09-03");
            });

            // initial[x] valueDateTime does not work yet
            //expect(typeDateTime.getAttribute('value')).toBe("2015-02-07T13:28:17-05:00");
            typeDateTime.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("2015-02-07T13:28:17-05:00");
            });

            expect(typeTime.getAttribute('value')).toBe("13:28:17");
            typeTime.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("13:28:17");
            });

            expect(typeChoice.getAttribute('value')).toBe("Answer 2");
            typeChoice.evaluate('item.defaultAnswer').then(function(val) {
              expect(val.code).toEqual("c2");
              expect(val.text).toEqual('Answer 2');
            });

            expect(typeOpenChoice.getAttribute('value')).toBe("User typed answer");
            typeOpenChoice.evaluate('item.defaultAnswer').then(function(val) {
              expect(val).toEqual("User typed answer");

            });

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
              expect(fhirData.item[7].initial).toEqual([
                {
                  "valueCoding": {
                    "code": "c2",
                    "display": "Answer 2"
                  }
                }
              ]);
              // open-choice
              expect(fhirData.item[8].initial).toEqual([
                {
                  "valueString":"User typed answer"
                }
              ]);


              // choice, multiple selection
              expect(fhirData.item[9].initial).toEqual([
                {
                  "valueCoding": {
                    "code": "c1",
                    "display": "Answer 1"
                  }
                },
                {
                  "valueCoding": {
                    "code": "c3",
                    "display": "Answer 3"
                  }
                }
              ]);
              // open-choice, multiple selection
              expect(fhirData.item[10].initial).toEqual([
                {
                  "valueCoding": {
                    "code": "c1",
                    "display": "Answer 1"
                  }
                },
                {
                  "valueCoding": {
                    "code": "c3",
                    "display": "Answer 3"
                  }
                },
                { "valueString" :  "User typed answer a"},
                { "valueString" :  "User typed answer b"}
              ]);
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
    });

  })(fhirVersions[i]);
}
