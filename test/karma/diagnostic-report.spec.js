// Tests for DiagnosticReport and Observation generation.
describe('DiagnoticReport', ()=>{
  describe('export', ()=>{
    it('should put lformsVersion in the DiagnosticReport resource', ()=>{
      var lfData = new LForms.LFormsData({name: 'test form', items: [{
        question: 'q1', dataType: 'ST', value: 'green'
      }]});
      var lfDataVersion = lfData.lformsVersion;
      var fhirVersion = 'STU3';
      var dr = LForms.Util.getFormFHIRData('DiagnosticReport', fhirVersion, lfData)
      var drVersion = dr.meta.tag[0].code;
      assert.equal(typeof drVersion, 'string');
      assert.equal(drVersion, 'lformsVersion: '+lfDataVersion);
      // Also check the observation
      var obsVersion = dr.contained[0].meta.tag[0].code;
      assert.equal(typeof obsVersion, 'string');
      assert.equal(obsVersion, 'lformsVersion: '+lfDataVersion);
    });
  });
});
