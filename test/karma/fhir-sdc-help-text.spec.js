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
