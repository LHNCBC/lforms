// Tests for the HL7 generation library
describe('LFormsData class', function() {
  describe('subgroup announcement tracking', function() {
    it('should reindex retained item messages when a new subgroup suppresses its own messages', function() {
      const form = new LForms.LFormsData({name: 'test form', items: []});
      const apple = {};
      const banana = {};
      form._actionLogs = ['Showing Apple details', 'Showing Banana details', 'Added Apple'];
      form._subGroupItemLogs = [{subGroup: apple, index: 0}, {subGroup: banana, index: 1}];

      form._removeSubGroupItemLogs(new Set([apple]), true);
      assert.deepEqual(form._actionLogs, ['Showing Banana details', 'Added Apple']);
      assert.deepEqual(form._subGroupItemLogs, [{subGroup: banana, index: 0}]);

      form._actionLogs.push('Showing sub items for Banana');
      form._removeSubGroupItemLogs(new Set([banana]));
      assert.deepEqual(form._actionLogs, ['Added Apple', 'Showing sub items for Banana']);
      assert.isNull(form._subGroupItemLogs);
    });

    it('should retain item messages for other subgroups while processing a hidden addition', function() {
      const form = new LForms.LFormsData({name: 'test form', items: []});
      const hiddenGroup = {};
      const banana = {};
      form._actionLogs = ['Showing Banana details'];
      form._subGroupItemLogs = [{subGroup: banana, index: 0}];

      form._removeSubGroupItemLogs(new Set([hiddenGroup]), true);
      assert.deepEqual(form._actionLogs, ['Showing Banana details']);
      assert.deepEqual(form._subGroupItemLogs, [{subGroup: banana, index: 0}]);
    });
  });

  describe('constructor', function() {
    it('should create with empty items',function () {
      var lfData = new LForms.LFormsData({name: 'test form', items: []});
      assert.equal(lfData.name, 'test form');
    });

    it('should change REAL to QTY  for multiple units', function() {
      // This is done for backward compatibility with existing LOINC forms
      var lfd = new LForms.LFormsData({name: 'test form', items: [
       {linkId: "a", dataType: 'REAL', units: [{code: '[lb_ab]'}, {code: 'kgs'}]}]});
      assert.equal(lfd.items[0].dataType, 'QTY');
    });

    it('should have lformsVersion set', function() {
      var lfData = new LForms.LFormsData({name: 'test form', items: []});
      assert(typeof lfData.lformsVersion === 'string');
      assert(lfData.lformsVersion.length > 0);
    });

    it('should set validation for answer-list items that must match the list', function() {
      var lfData = new LForms.LFormsData({name: 'test form', items: [
        {
          linkId: 'options-only',
          question: 'Options only autocomplete',
          dataType: 'ST',
          answers: [{text: 'A'}, {text: 'B'}]
        },
        {
          linkId: 'options-or-string',
          question: 'Options or string',
          dataType: 'CODING',
          answerConstraint: 'optionsOrString',
          answers: [{text: 'A'}, {text: 'B'}]
        },
        {
          linkId: 'options-only-radio-checkbox',
          question: 'Options only radio checkbox',
          dataType: 'ST',
          displayControl: {
            answerLayout: {
              type: 'RADIO_CHECKBOX'
            }
          },
          answers: [{text: 'A'}, {text: 'B'}]
        }
      ]});

      assert.equal(lfData.items[0]._hasValidation, true);
      assert.equal(lfData.items[1]._hasValidation, undefined);
      assert.equal(lfData.items[2]._hasValidation, undefined);
    });

  });
});
