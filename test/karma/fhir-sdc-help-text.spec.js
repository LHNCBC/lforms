var $ = LForms.jQuery;

describe('Questionnaire item-control help text issues', function() {
  const displayItemControls = {
    help: function(item) {
      assert.equal(item.codingInstructions, '<p>Formatted help text</p>');
      assert.equal(item.codingInstructionsFormat, 'html');
    },
    legal: function(item) {
      assert.equal(item.legal, '<p>Formatted legal text</p>');
      assert.equal(item.legalFormat, 'html');
    },
    unit: function(item) {
      assert.equal(item.itemControlUnit, 'Unit text');
      assert.equal(item.itemControlUnitLinkId, 'multi-select-unit');
    }
  };
  Object.keys(displayItemControls).forEach(function(code) {
    it('should not treat a ' + code + ' extension as a child item', function() {
      const label = code.charAt(0).toUpperCase() + code.slice(1);
      const questionnaire = {
        resourceType: 'Questionnaire',
        status: 'draft',
        item: [{
          linkId: 'multi-select',
          text: 'Question',
          type: 'choice',
          repeats: true,
          answerOption: [{valueCoding: {code: 'a', display: 'Answer A'}}],
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              coding: [{
                system: 'http://hl7.org/fhir/questionnaire-item-control',
                code: 'radio-button'
              }]
            }
          }],
          item: [{
            linkId: 'multi-select-' + code,
            text: label + ' text',
            type: 'display',
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
              valueCodeableConcept: {
                coding: [{
                  system: 'http://hl7.org/fhir/questionnaire-item-control',
                  code: code
                }]
              }
            }],
            _text: {
              extension: [{
                url: 'http://hl7.org/fhir/StructureDefinition/rendering-xhtml',
                valueString: '<p>Formatted ' + code + ' text</p>'
              }]
            }
          }]
        }]
      };

      const formDef = LForms.Util.convertFHIRQuestionnaireToLForms(questionnaire, 'R4');

      displayItemControls[code](formDef.items[0]);
      assert.notProperty(formDef.items[0], 'items');
    });
  });

  describe('QuestionnaireResponse with help, legal, or unit display items', function() {
    const checkBoxExt = {
      url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
      valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code: 'check-box'}]}
    };
    const answerOption = [{valueCoding: {code: 'a', display: 'Apple'}}, {valueCoding: {code: 'b', display: 'Banana'}}];
    const apple = {valueCoding: {code: 'a', display: 'Apple'}};
    function displayItem(linkId, code) {
      return {
        linkId: linkId,
        text: code + ' text',
        type: 'display',
        extension: [{
          url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
          valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code: code}]}
        }]
      };
    }
    function merge(qItems, qrItems) {
      const formDef = LForms.Util.convertFHIRQuestionnaireToLForms(
        {resourceType: 'Questionnaire', status: 'draft', item: qItems}, 'R4');
      return LForms.Util.mergeFHIRDataIntoLForms('QuestionnaireResponse',
        {resourceType: 'QuestionnaireResponse', status: 'in-progress', item: qrItems}, formDef, 'R4');
    }

    ['help', 'legal', 'unit'].forEach(function(code) {
      it('should merge a multi-select answer whose only Questionnaire child is a ' + code + ' item', function() {
        const merged = merge([{
          linkId: 'ms', text: 'Fruits', type: 'choice', repeats: true, extension: [checkBoxExt],
          answerOption: answerOption, item: [displayItem('ms-' + code, code)]
        }], [{linkId: 'ms', answer: [Object.assign({item: [{linkId: 'ms-' + code}]}, apple)]}]);

        assert.deepEqual(merged.items[0].value.map(v => v.code), ['a']);
        assert.notProperty(merged.items[0], 'items');
      });
    });

    it('should merge a multi-select answer whose items include a help item and a child item', function() {
      const merged = merge([{
        linkId: 'ms', text: 'Fruits', type: 'choice', repeats: true, extension: [checkBoxExt],
        answerOption: answerOption,
        item: [displayItem('ms-help', 'help'), {linkId: 'ms-child', text: 'How many?', type: 'string'}]
      }], [{linkId: 'ms', answer: [Object.assign({item: [
        {linkId: 'ms-help'}, {linkId: 'ms-child', answer: [{valueString: 'three'}]}
      ]}, apple)]}]);

      const subGroups = merged.items[0].items.filter(item => item.isSubGroupForMultiSelect);
      assert.equal(subGroups.length, 1);
      assert.deepEqual(subGroups[0].items.map(item => item.linkId), ['ms-child']);
      assert.equal(subGroups[0].items[0].value, 'three');
    });

    it('should merge a single-select answer whose items include a help item', function() {
      const merged = merge([{
        linkId: 'single', text: 'Fruit', type: 'choice', answerOption: answerOption,
        item: [displayItem('single-help', 'help')]
      }], [{linkId: 'single', answer: [Object.assign({item: [{linkId: 'single-help'}]}, apple)]}]);

      assert.equal(merged.items[0].value.code, 'a');
      assert.notProperty(merged.items[0], 'items');
    });

    it('should merge a group whose items include a help item', function() {
      const merged = merge([{
        linkId: 'grp', text: 'Group', type: 'group',
        item: [displayItem('grp-help', 'help'), {linkId: 'grp-child', text: 'Name', type: 'string'}]
      }], [{linkId: 'grp', item: [{linkId: 'grp-help'}, {linkId: 'grp-child', answer: [{valueString: 'Ann'}]}]}]);

      assert.equal(merged.items[0].items[0].value, 'Ann');
    });

    ['help', 'legal', 'unit'].forEach(function(code) {
      it('should merge a multi-select answer whose items include two ' + code + ' items', function() {
        const merged = merge([{
          linkId: 'ms', text: 'Fruits', type: 'choice', repeats: true, extension: [checkBoxExt],
          answerOption: answerOption, item: [displayItem('ms-' + code + '-1', code), displayItem('ms-' + code + '-2', code)]
        }], [{linkId: 'ms', answer: [Object.assign({item: [
          {linkId: 'ms-' + code + '-1'}, {linkId: 'ms-' + code + '-2'}
        ]}, apple)]}]);

        assert.deepEqual(merged.items[0].value.map(v => v.code), ['a']);
        assert.notProperty(merged.items[0], 'items');
      });
    });

    it('should merge a group whose items include the first of two help items', function() {
      const merged = merge([{
        linkId: 'grp', text: 'Group', type: 'group',
        item: [displayItem('grp-help-1', 'help'), displayItem('grp-help-2', 'help'),
          {linkId: 'grp-child', text: 'Name', type: 'string'}]
      }], [{linkId: 'grp', item: [{linkId: 'grp-help-1'}, {linkId: 'grp-child', answer: [{valueString: 'Ann'}]}]}]);

      assert.equal(merged.items[0].items[0].value, 'Ann');
    });
  });

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
