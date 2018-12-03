// Tests the LForm.Util functions for detecting FHIR versions of resources.
describe('guessFHIRVersion', function() {
  it('should recognize an STU3 Questionnaire with "option"', function(done) {
    $.get('/test/data/STU3/weightHeightQuestionnaire.json', function z(whQ) {
      // Remove the meta.profile so we can test whether the guess function can
      // correctly guess based on structure only.
      delete whQ.meta;
      var fhirVersion = LForms.Util.guessFHIRVersion(whQ);
      assert.equal(fhirVersion, 'STU3');
      done();
    });
  });

  it('should recognize an R4 Questionnaire with "option"', function(done) {
    $.get('/test/data/R4/weightHeightQuestionnaire.json', function z(whQ) {
      // Remove the meta.profile so we can test whether the guess function can
      // correctly guess based on structure only.
      delete whQ.meta;
      var fhirVersion = LForms.Util.guessFHIRVersion(whQ);
      assert.equal(fhirVersion, 'R4');
      done();
    });
  });
});
