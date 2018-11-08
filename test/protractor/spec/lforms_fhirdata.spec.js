var tp = require('./lforms_testpage.po.js');
var rxtermsForm = require('./rxterms.fo.js');
var ff = tp.USSGFHTVertical;
var fhirSupport = require('../../../app/scripts/fhir/versions');
var fhirVersions = Object.keys(fhirSupport);

/**
 *  Returns a promise that will resolve to an array of two elements, the first
 *  of which will be an error message (if any), and the second of which will be
 *  the requested diagnostic report for the given fhirVersion (if there was no
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
      describe('FHIR Data: ', function () {
        describe('get FHIR data from LForms forms', function() {

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

              ff.btnDiseasesHist.click();

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
                expect(fhirData.contained.length).toBe(15);
                // name 1
                expect(fhirData.contained[0].resourceType).toBe("Observation");
                expect(fhirData.contained[0].id).not.toBe(undefined);
                expect(fhirData.contained[0].code.coding[0].code).toBe("54125-0");
                expect(fhirData.contained[0].code.coding[0].system).toBe("http://loinc.org");
                expect(fhirData.contained[0].code.text).toBe("Name");
                expect(fhirData.contained[0].valueString).toBe("name 1");
                // name 2
                expect(fhirData.contained[1].resourceType).toBe("Observation");
                expect(fhirData.contained[1].id).not.toBe(undefined);
                expect(fhirData.contained[1].code.coding[0].code).toBe("54125-0");
                expect(fhirData.contained[1].code.coding[0].system).toBe("http://loinc.org");
                expect(fhirData.contained[1].code.text).toBe("Name");
                expect(fhirData.contained[1].valueString).toBe("name 2");
                // gender
                expect(fhirData.contained[2].resourceType).toBe("Observation");
                expect(fhirData.contained[2].id).not.toBe(undefined);
                expect(fhirData.contained[2].code.coding[0].code).toBe("54131-8");
                expect(fhirData.contained[2].code.coding[0].system).toBe("http://loinc.org");
                expect(fhirData.contained[2].code.text).toBe("Gender");
                expect(fhirData.contained[2].valueCodeableConcept).toEqual({"coding": [{"code": "LA2-8", "display": "Male", "system": "http://loinc.org"}], "text": "Male"});
                // DOB
                expect(fhirData.contained[3].valueDateTime).toBe("2016-10-27T00:00:00-04:00");
                // Height
                expect(fhirData.contained[4].valueQuantity).toEqual({"code":"inches","system":"http://unitsofmeasure.org","unit":"inches","value":70});
                // Weight
                expect(fhirData.contained[5].valueQuantity).toEqual({"code":"lbs","system":"http://unitsofmeasure.org","unit":"lbs","value":170});
                // BMI
                expect(fhirData.contained[6].valueString).toBe("24.39");
                // Race
                expect(fhirData.contained[7].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10608-0",
                      display:"American Indian or Alaska Native",
                      system:"http://loinc.org"
                    },
                    {
                      code:"LA6156-9",
                      display:"Asian",
                      system:"http://loinc.org"
                    }]
                });
                // Disease
                expect(fhirData.contained[8].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10533-0",
                      display:"Blood Clots",
                      system:"http://loinc.org"
                    }],
                  "text": "Blood Clots"
                });
                // Age at diagnosis
                expect(fhirData.contained[9].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10403-6",
                      display:"Newborn",
                      system:"http://loinc.org"
                    }],
                  "text": "Newborn"
                });
                // Your diseases history (sub panel)
                expect(fhirData.contained[10].related.length).toBe(2);
                // Disease 2
                expect(fhirData.contained[11].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10572-8",
                      display:"-- Blood Clot in Leg",
                      system:"http://loinc.org"
                    }],
                  "text": "-- Blood Clot in Leg"
                });
                // Age at diagnosis 2
                expect(fhirData.contained[12].valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10394-7",
                      display:"Infancy",
                      system:"http://loinc.org"
                    }],
                  "text": "Infancy"
                });
                // Your diseases history (sub panel) 2
                expect(fhirData.contained[13].related.length).toBe(2);
                // Your health information
                expect(fhirData.contained[14].related.length).toBe(10);

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

              ff.btnDiseasesHist.click();

              ff.disease2.click();
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.disease2.sendKeys(protractor.Key.TAB);
              ff.ageAtDiag2.click();
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
              ff.ageAtDiag2.sendKeys(protractor.Key.TAB);


              getFHIRResource("DiagnosticReport", fhirVersion,
                  {bundleType: "collection"}).then(function(callbackData) {
                [error, fhirData] = callbackData;
                expect(error).toBeNull();
                expect(fhirData.resourceType).toBe("Bundle");
                expect(fhirData.entry.length).toBe(16);
                expect(fhirData.entry[0].resource.resourceType).toBe("DiagnosticReport");
                expect(fhirData.entry[0].resource.result.length).toBe(1);
                expect(fhirData.entry[0].resource.result[0].reference).not.toBe(undefined);
                // name 1
                expect(fhirData.entry[1].resource.resourceType).toBe("Observation");
                expect(fhirData.entry[1].resource.id).not.toBe(undefined);
                expect(fhirData.entry[1].resource.code.coding[0].code).toBe("54125-0");
                expect(fhirData.entry[1].resource.code.coding[0].system).toBe("http://loinc.org");
                expect(fhirData.entry[1].resource.code.text).toBe("Name");
                expect(fhirData.entry[1].resource.valueString).toBe("name 1");
                // name 2
                expect(fhirData.entry[2].resource.resourceType).toBe("Observation");
                expect(fhirData.entry[2].resource.id).not.toBe(undefined);
                expect(fhirData.entry[2].resource.code.coding[0].code).toBe("54125-0");
                expect(fhirData.entry[2].resource.code.coding[0].system).toBe("http://loinc.org");
                expect(fhirData.entry[2].resource.code.text).toBe("Name");
                expect(fhirData.entry[2].resource.valueString).toBe("name 2");
                // gender
                expect(fhirData.entry[3].resource.resourceType).toBe("Observation");
                expect(fhirData.entry[3].resource.id).not.toBe(undefined);
                expect(fhirData.entry[3].resource.code.coding[0].code).toBe("54131-8");
                expect(fhirData.entry[3].resource.code.coding[0].system).toBe("http://loinc.org");
                expect(fhirData.entry[3].resource.code.text).toBe("Gender");
                expect(fhirData.entry[3].resource.valueCodeableConcept).toEqual({"coding": [{"code": "LA2-8", "display": "Male", "system": "http://loinc.org"}], "text": "Male"});
                // DOB
                expect(fhirData.entry[4].resource.valueDateTime).toBe("2016-10-27T00:00:00-04:00");
                // Height
                expect(fhirData.entry[5].resource.valueQuantity).toEqual({"code":"inches","system":"http://unitsofmeasure.org","unit":"inches","value":70});
                // Weight
                expect(fhirData.entry[6].resource.valueQuantity).toEqual({"code":"lbs","system":"http://unitsofmeasure.org","unit":"lbs","value":170});
                // BMI
                expect(fhirData.entry[7].resource.valueString).toBe("24.39");
                // Race
                expect(fhirData.entry[8].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10608-0",
                      display:"American Indian or Alaska Native",
                      system:"http://loinc.org"
                    },
                    {
                      code:"LA6156-9",
                      display:"Asian",
                      system:"http://loinc.org"
                    }]
                });
                // Disease
                expect(fhirData.entry[9].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10533-0",
                      display:"Blood Clots",
                      system:"http://loinc.org"
                    }],
                  "text": "Blood Clots"
                });
                // Age at diagnosis
                expect(fhirData.entry[10].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10403-6",
                      display:"Newborn",
                      system:"http://loinc.org"
                    }],
                  "text": "Newborn"
                });
                // Your diseases history (sub panel)
                expect(fhirData.entry[11].resource.related.length).toBe(2);
                // Disease 2
                expect(fhirData.entry[12].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10572-8",
                      display:"-- Blood Clot in Leg",
                      system:"http://loinc.org"
                    }],
                  "text": "-- Blood Clot in Leg"
                });
                // Age at diagnosis 2
                expect(fhirData.entry[13].resource.valueCodeableConcept).toEqual({
                  "coding": [
                    {
                      code:"LA10394-7",
                      display:"Infancy",
                      system:"http://loinc.org"
                    }],
                  "text": "Infancy"
                });
                // Your diseases history (sub panel) 2
                expect(fhirData.entry[14].resource.related.length).toBe(2);
                // Your health information
                expect(fhirData.entry[15].resource.related.length).toBe(10);

              });
            });
          });

          it('should get a SDC Questionnaire data from a form', function() {

            tp.openUSSGFHTVertical();
            getFHIRResource("Questionnaire", fhirVersion,
                ).then(function(callbackData) {
              let [error, fhirData] = callbackData;

              expect(error).toBeNull();
              var assertFHTQuestionnaire = require('../../data/'+fhirVersion+'/assert-sdc-questionnaire').assertFHTQuestionnaire;
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

            ff.btnDiseasesHist.click();

            ff.disease2.click();
            ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.disease2.sendKeys(protractor.Key.TAB);
            ff.ageAtDiag2.click();
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
            ff.ageAtDiag2.sendKeys(protractor.Key.TAB);


            getFHIRResource("QuestionnaireResponse", fhirVersion,
                ).then(function(callbackData) {
              let [error, fhirData] = callbackData;
              expect(error).toBeNull();
              expect(fhirData.resourceType).toBe("QuestionnaireResponse");
              expect(fhirData.identifier.value).toBe("54127-6N");
              expect(fhirData.identifier.system).toBe("http://loinc.org");
              expect(fhirData.questionnaire.reference).toBe("Questionnaire/{{questionnaireId}}");

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
              expect(fhirData.item[0].item[1].answer[0].valueCoding.system).toBe("http://loinc.org");
              // DOB
              expect(fhirData.item[0].item[2].text).toBe("Date of Birth");
              expect(fhirData.item[0].item[2].linkId).toBe("/54126-8/21112-8");
              expect(fhirData.item[0].item[2].answer.length).toBe(1);
              expect(fhirData.item[0].item[2].answer[0].valueDateTime).toBe("2016-10-27T00:00:00-04:00");
              // Height
              expect(fhirData.item[0].item[3].text).toBe("Height");
              expect(fhirData.item[0].item[3].linkId).toBe("/54126-8/8302-2");
              expect(fhirData.item[0].item[3].answer.length).toBe(1);
              expect(fhirData.item[0].item[3].answer[0].valueQuantity.code).toBe("inches");
              expect(fhirData.item[0].item[3].answer[0].valueQuantity.system).toBe("http://unitsofmeasure.org");
              expect(fhirData.item[0].item[3].answer[0].valueQuantity.unit).toBe("inches");
              expect(fhirData.item[0].item[3].answer[0].valueQuantity.value).toBe(70);
              // Weight
              expect(fhirData.item[0].item[4].text).toBe("Weight");
              expect(fhirData.item[0].item[4].linkId).toBe("/54126-8/29463-7");
              expect(fhirData.item[0].item[4].answer.length).toBe(1);
              expect(fhirData.item[0].item[4].answer[0].valueQuantity.code).toBe("lbs");
              expect(fhirData.item[0].item[4].answer[0].valueQuantity.system).toBe("http://unitsofmeasure.org");
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
              expect(fhirData.contained[0].code.coding[0].system).toBe("http://loinc.org");
              expect(fhirData.contained[0].code.text).toBe("Drug Name");
              expect(fhirData.contained[0].valueCodeableConcept).toEqual({"coding": [{"code": "ASPERCREME (Topical)", "display": "ASPERCREME (Topical)", "system": "http://loinc.org"}], "text": "ASPERCREME (Topical)"});
            });
          });

        });


        describe('merge FHIR data into form', function() {

          it('should merge all DiagnosticReport (contained) data back into the form', function() {

            tp.openUSSGFHTVertical();

            element(by.id("merge-dr")).click();

            browser.wait(function() {
              return ff.name.isDisplayed();
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

            tp.openUSSGFHTVertical();

            element(by.id("merge-bundle-dr")).click();

            browser.wait(function() {
              return ff.name.isDisplayed();
            }, tp.WAIT_TIMEOUT_1);

            expect(ff.name.getAttribute('value')).toBe("12");
            expect(ff.gender.getAttribute('value')).toBe("Male");
            expect(ff.dob.getAttribute('value')).toBe("01/10/2018");

            var races = element.all(by.css('.autocomp_selected li'));
            expect(races.get(0).getText()).toBe('×American Indian or Alaska Native');
            expect(races.get(1).getText()).toBe('×Asian');

            expect(ff.disease.getAttribute('value')).toBe("Hemolytic-uremic syndrome (HUS)");
            expect(ff.ageAtDiag.getAttribute('value')).toBe("Newborn");
          });

          it('should merge FHIR SDC QuestionnaireResponse data back into the form', function() {
            tp.openUSSGFHTVertical();

            element(by.id("merge-qr")).click();

            browser.wait(function() {
              return ff.name.isDisplayed();
            }, tp.WAIT_TIMEOUT_1);

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
        });

        describe('Converted Questionnaire', function () {
          beforeEach(function() {
            tp.openQuestionnaire();
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
    });
  })(fhirVersions[i]);
}
