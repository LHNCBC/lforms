var $ = LForms.jQuery;

describe('Questionnaire item-control help text issues', function() {
  let fhirVersions = Object.keys(LForms.Util.FHIRSupport);
  for (let i=0, len=fhirVersions.length; i<len; ++i) {
    (function (fhirVersion) {
      describe('linkId ' + fhirVersion, function () {
        it('should import and export the help text item linkId', function (done) {
          var qFile = 'test/data/q-help-text-linkId.json';
          $.get(qFile, function (qData) {           
            try {
              let formDef = LForms.Util.convertFHIRQuestionnaireToLForms(qData, fhirVersion);
              assert.equal(formDef.items[0].codingInstructionsLinkId, 'helptext3');
              assert.equal(formDef.items[0].items[0].codingInstructionsLinkId, 'helptext1');
              assert.equal(formDef.items[0].items[1].codingInstructionsLinkId, 'helptext2');
  
              let q = LForms.Util._convertLFormsToFHIRData("Questionnaire", fhirVersion, formDef);
              assert.equal(q.item[0].item[2].linkId, "helptext3");
              assert.equal(q.item[0].item[0].item[0].linkId, "helptext1");
              assert.equal(q.item[0].item[1].item[0].linkId, "helptext2");
              done();  
            } 
            catch(err) {
              done(err)
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
