// Tests for the HL7 generation library
describe('LFormsData class', function() {
  describe('constructor', function() {
    it('should create with empty items',function () {
      var lfData = new LForms.LFormsData({name: 'test form', items: []});
      assert.equal(lfData.name, 'test form');
    });

    it('should change REAL to QTY  for multiple units', function() {
      // This is done for backward compatibility with existing LOINC forms
      var lfd = new LForms.LFormsData({name: 'test form', items: [
       {dataType: 'REAL', units: [{code: '[lb_ab]'}, {code: 'kgs'}]}]});
      assert.equal(lfd.items[0].dataType, 'QTY');
    });

    it('should have lformsVersion set', function() {
      var lfData = new LForms.LFormsData({name: 'test form', items: []});
      assert(typeof lfData.lformsVersion === 'string');
      assert(lfData.lformsVersion.length > 0);
    });

  });
});
