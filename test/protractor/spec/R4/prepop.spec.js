var fhirVersion = 'R4';

var tp = require('../lforms_testpage.po.js');
describe('Form pre-population', function() {
  beforeAll(function () {
    tp.openBaseTestPage();
    browser.executeScript(function() {
      LForms.Util.setFHIRContext({
        getCurrent:  function(typeList, callback) {
          var rtn = null;
          if (typeList.indexOf('Patient') >= 0) {
            rtn = {resourceType: "Patient",
              name: [{
                family: "Smith",
                given: ["John", "Adam"]
              }],
              birthDate: "1990-12-10",
              gender: "male"
            }
          }
          callback(rtn);
        },
        getFHIRAPI: function() {
          return {
            conformance: function() {
              return {
                then: function(callback) {
                  callback({data: {fhirVersion: '3.0'}});
                }
              }
            },
            search: function(queryParams) {
              // For now, we just have one test.
              return {
                then: function(callback) {
                  callback({
                    "data": {
                      "resourceType": "Bundle",
                      "type": "searchset",
                      "entry": [
                        {
                          "fullUrl": "https://launch.smarthealthit.org/v/r3/fhir/Observation/8919e529-7c56-41e0-a696-2b974d4c95ae",
                          "resource": {
                            "code": {
                              "coding": [
                                {
                                  "system": "http://loinc.org",
                                  "code": "29463-7",
                                  "display": "Body Weight"
                                }
                              ],
                              "text": "Body Weight"
                            },
                            "effectiveDateTime": "2016-06-29T19:14:57-04:00",
                            "issued": "2016-06-29T19:14:57-04:00",
                            "valueQuantity": {
                              "value": 95,
                              "unit": "kg",
                              "system": "http://unitsofmeasure.org",
                              "code": "kg"
                            }
                          }
                        }
                      ]
                    }
                  });
                }
              };
            }
          }
        }});
    });
  });

  it('should be possible to pull in data from a FHIR context', function() {
    tp.loadFromTestData('ussg-fhp.json', 'R4');
    expect(tp.USSGFHTVertical.name.getAttribute('value')).toBe("John Smith");
    expect(tp.USSGFHTVertical.dob.getAttribute('value')).toBe("12/10/1990");
    // expect(tp.USSGFHTVertical.gender.getAttribute('value')).toBe("Male"); // TBD
    // initialExpression fields should not be read-only.
    expect(tp.USSGFHTVertical.name.getAttribute('disabled')).toBe(null);
  });

  it('should be possible to get a Questionnaire back with launchContext', function() {
    var launchContextExt = browser.executeScript(function(fhirVersion) {
      var q2Data = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion);
      return LForms.Util.findObjectInArray(q2Data.extension, 'url',
        "http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext",
        0);
    }, fhirVersion);
    expect(launchContextExt).not.toBeNull();
  });

  it('should load values from observationLinkPeriod', function() {
    tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
    var weightField = element(by.id('/29463-7/1'));
    expect(weightField.getAttribute('value')).toBe('95');
    var unitField = element(by.id('unit_/29463-7/1'));
    expect(unitField.getAttribute('value')).toBe('kg');
  });
});

