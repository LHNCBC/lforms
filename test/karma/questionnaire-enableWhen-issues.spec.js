var $ = LForms.jQuery;

describe('Questionnaire enableWhen issues', function() {
  let fhirVersions = Object.keys(LForms.Util.FHIRSupport);
  for (let i=0, len=fhirVersions.length; i<len; ++i) {
    (function (fhirVersion) {
      describe('questionnaire where enableWhen contains no question field', function () {
        it('should throw error message', function (done) {
          var qFile = 'test/data/questionnaire-enableWhen-missing-question-field.json';
          $.get(qFile, function (qData) {
            try {
              LForms.Util.convertFHIRQuestionnaireToLForms(qData, 'R4')
            }
            catch (error) {
              assert.equal(error.message, "Question with linkId 'q3' contains enableWhen that is missing the enableWhen.question field.");
              done();
            }
          }).fail(function (err) {
            done(err);
          });
        });
      });

      describe('questionnaire where enableWhen contains an invalid linkId', function () {
        it('should throw error message', function (done) {
          var qFile = 'test/data/questionnaire-enableWhen-missing-linkId.json';
          $.get(qFile, function (qData) {
            try {
              LForms.Util.convertFHIRQuestionnaireToLForms(qData, 'R4')
            }
            catch (error) {
              assert.equal(error.message, "Question with linkId 'q3' contains enableWhen pointing to a question with linkId 'q11' that does not exist.");
              done();
            }
          }).fail(function (err) {
            done(err);
          });
        });
      });
    })(fhirVersions[i]);
  }
});
