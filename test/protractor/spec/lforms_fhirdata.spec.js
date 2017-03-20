var tp = require('./lforms_testpage.po.js');
var ff = tp.USSGFHTVertical;
describe('get FHIR data from LForms forms', function() {

  it('should get a DiagnosticReport data from a form', function() {

    tp.openUSSGFHTVertical();

    // #1 all fields are empty
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getFormFHIRData();
      callback(fData);
    }).then(function(fhirData) {
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


      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getFormFHIRData();
        callback(fData);
      }).then(function (fhirData) {
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

  it('shout get FHIR SDC Questionnaire data from a form', function() {
    // data has not been tested for accuracy, TBD
  });

  it('should get FHIR SDC QuestionnaireResponse data from a form', function() {
    // data has not been tested for accuracy, TBD
  });

});


describe('merge FHIR data into form', function() {

  it('should merge all Diagnostic data back into the form', function() {

    tp.openUSSGFHTVertical();

    element(by.id("merge-fhir")).click();

    browser.wait(function() {
      return ff.name.isDisplayed();
    }, 5000);

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

  it('should merge FHIR SDC QuestionnaireResponse data back into the form', function() {
    // data has not been tested for accuracy, TBD
  });
});

