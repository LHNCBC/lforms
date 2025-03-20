// Tests the LForm.Util functions for detecting FHIR versions of resources.
var $ = LForms.jQuery;

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
  it('should recognize an R5 Questionnaire with "option"', function(done) {
    $.get('/test/data/R5/weightHeightQuestionnaire.json', function z(whQ) {
      // Remove the meta.profile so we can test whether the guess function can
      // correctly guess based on structure only.
      delete whQ.meta;
      var fhirVersion = LForms.Util.guessFHIRVersion(whQ);
      assert.equal(fhirVersion, 'R5');
      done();
    });
  });
});

describe('_fhirVersionToRelease', function() {
  it('should correctly convert FHIR version number strings to FHIR releases', function() {
    assert.equal(LForms.Util._fhirVersionToRelease('3.0.0'), 'STU3');
    assert.equal(LForms.Util._fhirVersionToRelease('3.0.1'), 'STU3');
    assert.equal(LForms.Util._fhirVersionToRelease('3.0'), 'STU3');
    assert.equal(LForms.Util._fhirVersionToRelease('3.1.0'), 'R4');
    assert.equal(LForms.Util._fhirVersionToRelease('3.5a.0'), 'R4');
    assert.equal(LForms.Util._fhirVersionToRelease('4.0.0'), 'R4');
    assert.equal(LForms.Util._fhirVersionToRelease('4.0.1'), 'R4');
    assert.equal(LForms.Util._fhirVersionToRelease('4.0'), 'R4');
    assert.equal(LForms.Util._fhirVersionToRelease('4.1.0'), 'R4B');
    assert.equal(LForms.Util._fhirVersionToRelease('4.3.0-snapshot1'), 'R4B');
    assert.equal(LForms.Util._fhirVersionToRelease('4.3.0'), 'R4B');
    assert.equal(LForms.Util._fhirVersionToRelease('4.2.0'), 'R5');
    assert.equal(LForms.Util._fhirVersionToRelease('4.4.0'), 'R5');
    assert.equal(LForms.Util._fhirVersionToRelease('4.5.0'), 'R5');
    assert.equal(LForms.Util._fhirVersionToRelease('5.0.0'), 'R5');
    assert.equal(LForms.Util._fhirVersionToRelease('5.0.0-draft-final'), 'R5');

  });

  it('should return the argument if the version number cannot be mapped', function () {
    assert.equal(LForms.Util._fhirVersionToRelease('abc'), 'abc');
    assert.equal(LForms.Util._fhirVersionToRelease('0.1.2'), '0.1.2');
  });
});

describe('detectFHIRVersion', function() {
  it('should correctly detect FHIR/SDC version from FHIR resource', function(done) {
    $.get('/test/data/R4/phq9.json', function(q) {
      assert.equal(LForms.Util.detectFHIRVersion(q), 'R4');
      $.get('/test/data/R4/variable-scope-test.json', function(q) {
        assert.equal(LForms.Util.detectFHIRVersion(q), undefined);
        $.get('/test/data/STU3/weightHeightQuestionnaire.json', function(q) {
          assert.equal(LForms.Util.detectFHIRVersion(q), 'STU3');
          done();
        });
      });
    });
  })
});

describe('Exception in converting R5 to R4', function() {
  it('should not convert type "coding" with answerConstraint "optionsOrType" in R5 Questionnaire to R4', function(done) {
    $.get('/test/data/R5/answerOption/answerOption-valueCoding.optionsOrType.R5.json', function(q5) {
      let fhir = LForms.FHIR["R5"];
      let lfData = fhir.SDC.convertQuestionnaireToLForms(q5);
      try {
        let fhir = LForms.FHIR["R4"];
        let q4 = fhir.SDC.convertLFormsToQuestionnaire(lfData);
      }
      catch (e) {
        let errMessage = "The type 'coding' with answerConstraint 'optionsOrType' in R5 cannot be converted to a valid type in R4 or STU3."
        assert.equal(e.message, errMessage);
      }
      done();
    });
  })
});