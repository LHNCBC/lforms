describe('Repeating choice items that has child items', function() {
  let fhirVersions = Object.keys(LForms.Util.FHIRSupport);
  for (let i=0, len=fhirVersions.length; i<len; ++i) {
    (function (fhirVersion) {
      let fhir = LForms.FHIR[fhirVersion];
      let fhirVerisonInData = fhirVersion === 'R4B' ? 'R4' : fhirVersion;
      let $ = LForms.jQuery;

      describe(fhirVersion, function() {

          it('should get the correct Questionnaire', function (itDone) {
            let qFile = `test/data/${fhirVerisonInData}/q-items-under-repeating-choice-item.json`;

            $.get(qFile, function(q) { // load the questionnaire json
                let lfData = fhir.SDC.convertQuestionnaireToLForms(q);
                let fhirQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, LForms.Util.deepCopy(lfData));
                // questionnarie should be same after removing meta
                delete q.meta;
                delete fhirQ.meta;
                assert.deepEqual(q, fhirQ);
                itDone();
            }).done().fail(function(err){console.log('Unable to load ' + qFile);});
          });

          it('should merge QuestionnaireResponse to Questionnaire and get QuestionnaireResponse correctly', function (itDone) {
            let qFile = `test/data/${fhirVerisonInData}/q-items-under-repeating-choice-item.json`;
            let qrFile = `test/data/${fhirVerisonInData}/qr-items-under-repeating-choice-item.json`;

            $.get(qFile, function(q) { // load the questionnaire json
              $.get(qrFile, function(qr) { // load the questionnaire response json

                let lfData = fhir.SDC.convertQuestionnaireToLForms(q);
                let mergedFormData = LForms.Util.mergeFHIRDataIntoLForms(
                  'QuestionnaireResponse', LForms.Util.deepCopy(qr), lfData, fhirVersion);

                let fhirQR = LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion, LForms.Util.deepCopy(mergedFormData));
                // ignore meta and authored
                delete qr.meta;
                delete qr.authored;
                delete fhirQR.meta;
                delete fhirQR.authored;
                assert.deepEqual(qr, fhirQR);
                itDone();
              }).done().fail(function(err){console.log('Unable to load ' + qrFile);});
            }).done().fail(function(err){console.log('Unable to load ' + qFile);});
          });

      });
    })(fhirVersions[i]);
  }
});

