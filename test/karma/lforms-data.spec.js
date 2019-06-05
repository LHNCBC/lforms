// Tests for the HL7 generation library
describe('LFormsData class', function() {
  describe('constructor', function() {
    it('should create with empty items',function () {
      var lfData = new LForms.LFormsData({name: 'test form', items: []});
      assert.equal(lfData.name, 'test form');
    });
  });
});