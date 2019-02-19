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
            }
          }
        }});
    });
    tp.loadFromTestData('ussg-fhp.json', 'R4');
  });

  it('should be possible to pull in data from a FHIR context', function() {
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
});

