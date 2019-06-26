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

describe('_fhirVersionToRelease', function() {
  it('should correctly convert FHIR version number strings to FHIR releases', function() {
    assert.equal('STU3', LForms.Util._fhirVersionToRelease('3.0.0'));
    assert.equal('STU3', LForms.Util._fhirVersionToRelease('3.0.1'));
    assert.equal('STU3', LForms.Util._fhirVersionToRelease('3.0'));
    assert.equal('R4', LForms.Util._fhirVersionToRelease('3.1.0'));
    assert.equal('R4', LForms.Util._fhirVersionToRelease('4.0.0'));
    assert.equal('R4', LForms.Util._fhirVersionToRelease('4.0.1'));
    assert.equal('R4', LForms.Util._fhirVersionToRelease('4.0'));

  });

  it('should return the argument if the version number cannot be mapped', function () {
    assert.equal('abc', LForms.Util._fhirVersionToRelease('abc'));
    assert.equal('0.1.2', LForms.Util._fhirVersionToRelease('0.1.2'));
  });
});

describe('detectFHIRVersion', function() {
  it('should correctly detect FHIR/SDC version from FHIR resource', function() {
    $.get('/test/data/R4/phq9.json', function(q) {
      assert.equal('R4', LForms.Util.detectFHIRVersion(q));
    });
    $.get('/test/data/R4/ussg-fhp.json', function(q) {
      assert.equal(undefined, LForms.Util.detectFHIRVersion(q));
    });
    $.get('/test/data/STU3/weightHeightQuestionnaire.json', function(q) {
      assert.equal('STU3', LForms.Util.detectFHIRVersion(q));
    });
  })
});
