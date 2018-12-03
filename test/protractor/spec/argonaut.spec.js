var tp = require('./lforms_testpage.po.js');
var fhirSupport = require('../../../app/scripts/fhir/versions');
var fhirVersions = Object.keys(fhirSupport);

// Testing that questionnaire-hidden extension works as expected.
for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion + ': questionnaire-hidden extension', function() {
      it('Instructions field G0.d should be hidden', function() {
        tp.openBaseTestPage();
        tp.loadFromTestData('Argonaut-questionnaire-questionnaire-example-asq3.json', fhirVersion);
        let hiddenInstructinsField = element(by.id(   'label-/G0/G0.d/1/1'));
        expect(hiddenInstructinsField.isDisplayed()).toBe(false);
      });
    });
  })(fhirVersions[i]);
}

