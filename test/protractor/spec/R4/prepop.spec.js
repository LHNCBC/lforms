var fhirVersion = 'R4';

var tp = require('../lforms_testpage.po.js');
var mockFHIRContext = require('./fhir_context');

/**
 *  Sets up a mock server FHIR context.
 * @param fhirVersion the FHIR version number (as a string) for the mock server.
 * @param weightQuantity the quantity to return from a search for a weight.
 */
function setServerFHIRContext(fhirVersion, weightQuantity) {
  browser.executeScript(function(fhirVersion, mockFHIRContext, weightQuantity) {
    try {
      var fhirContext = new Function("return "+mockFHIRContext)();
      LForms.Util.setFHIRContext(fhirContext(fhirVersion, weightQuantity));
    }
    catch(e) {
      console.log("caught error in executeScript");
      console.log(e);
    }
  }, fhirVersion, mockFHIRContext, weightQuantity);
}

describe('Form pre-population', function() {
  fdescribe('with bower packages', function() {
    beforeAll(function () {
      tp.openBaseTestPage();
    });

    it('should be possible to pull in data from a FHIR context', function() {
      setServerFHIRContext('3.0');
      tp.loadFromTestData('ussg-fhp.json', 'R4');
      expect(tp.USSGFHTVertical.name.getAttribute('value')).toBe("John Smith");
      expect(tp.USSGFHTVertical.dob.getAttribute('value')).toBe("12/10/1990");
      // expect(tp.USSGFHTVertical.gender.getAttribute('value')).toBe("Male"); // TBD
      // initialExpression fields should not be read-only.
      expect(tp.USSGFHTVertical.name.getAttribute('disabled')).toBe(null);
    });

    it('should be possible to get a Questionnaire back with launchContext', function() {
      setServerFHIRContext('3.0');
      var launchContextExt = browser.executeScript(function(fhirVersion) {
        var q2Data = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion);
        return LForms.Util.findObjectInArray(q2Data.extension, 'url',
          "http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext",
          0);
      }, fhirVersion);
      expect(launchContextExt).not.toBeNull();
    });


    for (let serverFHIRNum of ['3.0', '4.0']) {
      describe('by observationLinkPeriod with server FHIR version '+serverFHIRNum,
               function() {
        it('should load values from observationLinkPeriod for server FHIR version '+
           serverFHIRNum, function() {
          setServerFHIRContext(serverFHIRNum);
          tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
          var weightField = element(by.id('/29463-7/1'));
          expect(weightField.getAttribute('value')).toBe('95');
          var unitField = element(by.id('unit_/29463-7/1'));
          expect(unitField.getAttribute('value')).toBe('kg');
        });

        it('should convert values from observationLinkPeriod for server FHIR version '+
           serverFHIRNum, function() {
          setServerFHIRContext(serverFHIRNum, {
            "value": 140,
            "unit": "[lb_av]",
            "system": "http://unitsofmeasure.org",
            "code": "[lb_av]"
          });

          tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
          var weightField = element(by.id('/29463-7/1'));
          expect(weightField.getAttribute('value')).toBe('63.5');
          var unitField = element(by.id('unit_/29463-7/1'));
          expect(unitField.getAttribute('value')).toBe('kg');
        });
      });
    }
  });

  describe('with npm packages', function() {
    it('should load values from observationLinkPeriod', function() {
      tp.openBuildTestFHIRPath();
      setServerFHIRContext('4.0');
      tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
      var weightField = element(by.id('/29463-7/1'));
      expect(weightField.getAttribute('value')).toBe('95');
      var unitField = element(by.id('unit_/29463-7/1'));
      expect(unitField.getAttribute('value')).toBe('kg');
    });
  });
});

