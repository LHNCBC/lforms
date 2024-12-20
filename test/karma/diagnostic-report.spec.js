// Tests for DiagnosticReport and Observation generation.
describe('DiagnosticReport', ()=>{
  var fhirVersions = ['R5', 'R4', 'STU3'];
  for (var i=0, len=fhirVersions.length; i<len; ++i) {

    (function (fhirVersion) {
      var fhir = LForms.FHIR[fhirVersion];
      describe(fhirVersion, function() {
        it('should put lformsVersion in the DiagnosticReport resource', ()=>{
          var lfData = new LForms.LFormsData({name: 'test form', items: [{
            question: 'q1', dataType: 'ST', value: 'green'
          }]});
          var lfDataVersion = lfData.lformsVersion;
          var dr = LForms.Util.getFormFHIRData('DiagnosticReport', fhirVersion, lfData)
          var drVersion = dr.meta.tag[0].code;
          assert.equal(typeof drVersion, 'string');
          assert.equal(drVersion, 'lformsVersion: '+lfDataVersion);
          // Also check the observation
          var obsVersion = dr.contained[0].meta.tag[0].code;
          assert.equal(typeof obsVersion, 'string');
          assert.equal(obsVersion, 'lformsVersion: '+lfDataVersion);
        });
      
        it('should convert lforms data to DiagnosticReport resource with correct code and code system', ()=>{
          var lfData = new LForms.LFormsData({name: 'test form', code: 'code1', codeSystem: 'code_system',
            items: [{question: 'q1', dataType: 'ST', value: 'green'
          }]});
          var dr = LForms.Util.getFormFHIRData('DiagnosticReport', fhirVersion, lfData)
          assert.equal(dr.code.coding[0].system, 'code_system');
          assert.equal(dr.code.coding[0].code, 'code1');         
        });

        it('should convert Questionnaire data to DiagnosticReport resource with correct code and code system', ()=>{
      
          var q = 
          {
            "resourceType": "Questionnaire",
            "title": "A questionnaire with code",
            "name": "A questionnaire with code",
            "code": [
              {
                "system": "http://example.org",
                "code": "example",
                "display": "Example"
              }
            ],
            "item": [
              {
                "required": false,
                "linkId": "/29463-7",
                "text": "Weight",
                "type": "decimal"
              }
            ]
          };
          
          var lfData = fhir.SDC.convertQuestionnaireToLForms(q);
          var dr = LForms.Util.getFormFHIRData('DiagnosticReport', fhirVersion, lfData);
          assert.equal(dr.code.coding[0].system, 'http://example.org');
          assert.equal(dr.code.coding[0].code, 'example');
        });
      });

    })(fhirVersions[i]);
  }
});
 

