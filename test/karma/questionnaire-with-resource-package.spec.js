describe('questionnaire with a provided resource package file', function () {
  it('should load value sets from the package', function (done) {
    var packageFile = 'test/data/vs-package.json';
    var qFile = 'test/data/questionnaire-use-package.json';
    var answers = [
      {
        "system": "http://loinc.org",
        "code": "14647-2",
        "text": "Cholesterol [Moles/volume] in Serum or Plasma"
      },
      {
        "system": "http://loinc.org",
        "code": "2096-6",
        "text": "Cholesterol/Triglyceride [Mass Ratio] in Serum or Plasma"
      },
      {
        "system": "http://loinc.org",
        "code": "35200-5",
        "text": "Cholesterol/Triglyceride [Mass Ratio] in Serum or Plasma"
      },
      {
        "system": "http://loinc.org",
        "code": "48089-7",
        "text": "Cholesterol/Apolipoprotein B [Molar ratio] in Serum or Plasma"
      },
      {
        "system": "http://loinc.org",
        "code": "55838-7",
        "text": "Cholesterol/Phospholipid [Molar ratio] in Serum or Plasma"
      }
    ];

    $.get(qFile, function(qData) {
      var formData = LForms.Util.convertFHIRQuestionnaireToLForms(qData, 'R4')
      $.get(packageFile, function(package) {
        var lfData = new LForms.LFormsData(formData, package);
        console.log("*** files loaded ***")
        console.log(lfData.items[0].answerValueSet)
        console.log(lfData.items[0].answers)
        assert.equal(lfData.items[0].answerValueSet, "http://hl7.org/fhir/ValueSet/example-expansion|20150622")
        assert.deepEqual(lfData.items[0].answers, answers);
        assert.equal(lfData.items[1].answerValueSet, "http://hl7.org/fhir/ValueSet/example-expansion")
        assert.deepEqual(lfData.items[1].answers, answers);
        assert.equal(lfData.items[2].answerValueSet, "#example-expansion")
        assert.deepEqual(lfData.items[2].answers, answers);
        done()
      });
    }).fail(function (err) {
      done(err);
    });
  });
});
