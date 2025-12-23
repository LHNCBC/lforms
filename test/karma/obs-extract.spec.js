var fhirVersions = Object.keys(LForms.Util.FHIRSupport);
for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    const fhir = LForms.FHIR[fhirVersion];
    describe('observation extraction', ()=> {
      it('should handle observation-category-extract', (itDone)=> {
        const file = 'test/data/R4/Observation-Extract-Category-Test.R4.json';
        $.get(file, function (json) {
          const lfData = new LForms.LFormsData(fhir.SDC.convertQuestionnaireToLForms(json));
          const testAnswer = 'teststring'
          lfData.items[0].items[0].value = testAnswer;
          lfData.items[0].items[1].value = testAnswer+'2';
          const resList = LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion, lfData,
            {extract: true});
          assert.equal(resList.length, 2);
          assert.equal(resList[1].entry.length, 2);
          const qr = resList[0];
          assert.equal(qr.resourceType, 'QuestionnaireResponse');
          assert.equal(qr.item[0].item[0].answer[0].valueString, testAnswer);
          let obs = resList[1].entry[0].resource;
          assert.equal(obs.resourceType, 'Observation');
          assert.equal(obs.category.length, 2);
          const codeable1 = obs.category[0];
          assert.equal(codeable1.text, 'Vital Signs');
          assert.equal(codeable1.coding.length, 2);
          assert.equal(codeable1.coding[0].code, 'vital-signs');
          assert.equal(codeable1.coding[1].code, '123');
          const codeable2 = obs.category[1];
          assert.equal(codeable2.text, 'Vital Signs2');
          assert.equal(codeable2.coding.length, 2);
          assert.equal(codeable2.coding[0].code, 'vital-signs2');
          assert.equal(codeable2.coding[1].code, '1232');
          assert.equal(qr.item[0].item[1].answer[0].valueString, testAnswer+'2');
          obs = resList[1].entry[1].resource;
          assert.equal(obs.resourceType, 'Observation');
          assert.equal(obs.category.length, 1);
          const codeable = obs.category[0];
          assert.equal(codeable.text, 'Social History');
          assert.equal(codeable.coding.length, 1);
          assert.equal(codeable.coding[0].code, 'social-history');
          itDone();
        }).fail(function(err){console.log(': Unable to load ' + file);});
      });
    });
  })(fhirVersions[i]);
}
