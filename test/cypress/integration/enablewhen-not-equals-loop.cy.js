import * as util from '../support/util.js';

describe('enableWhen != minimal reproduction', () => {
  it('checks if != on coded answer loops in init', () => {
    cy.visit('/test/pages/addFormToPageTest.html');

    cy.window().then((win) => {
      function run(q) {
        const proto = win.LForms.LFormsData.prototype;
        const origSet = proto._setSkipLogicStatusValue;
        const origUpd = proto._updateItemSkipLogicStatus;
        let guard = 0;
        let initError = null;

        proto._setSkipLogicStatusValue = function(item, newStatus, noLog = false) {
          return origSet.call(this, item, newStatus, noLog);
        };

        proto._updateItemSkipLogicStatus = function(item, disabled) {
          guard++;
          if (guard > 300000) {
            throw new Error('guard-hit');
          }
          return origUpd.call(this, item, disabled);
        };

        try {
          const lfDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
          new win.LForms.LFormsData(lfDef);
        } catch (e) {
          initError = e?.message || String(e);
        } finally {
          proto._setSkipLogicStatusValue = origSet;
          proto._updateItemSkipLogicStatus = origUpd;
        }
        return { initError, guard };
      }

      const qAnswerOption = {
        resourceType: 'Questionnaire',
        status: 'draft',
        item: [
          {
            linkId: 'q1',
            text: 'Controller',
            type: 'choice',
            answerOption: [
              { valueCoding: { code: 'A', display: 'A' } },
              { valueCoding: { code: 'B', display: 'B' } }
            ]
          },
          {
            linkId: 'q2',
            text: 'Dependent',
            type: 'string',
            enableBehavior: 'all',
            enableWhen: [
              {
                question: 'q1',
                operator: '!=',
                answerCoding: { code: 'A' }
              }
            ]
          }
        ]
      };

      const qAnswerValueSet = {
        resourceType: 'Questionnaire',
        status: 'draft',
        item: [
          {
            linkId: 'q1',
            text: 'Controller VS',
            type: 'choice',
            answerValueSet: 'https://art-decor.org/fhir/ValueSet/2.16.840.1.113883.3.1937.777.18.11.12046',
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
                valueCodeableConcept: {
                  coding: [
                    {
                      system: 'http://hl7.org/fhir/questionnaire-item-control',
                      code: 'autocomplete'
                    }
                  ]
                }
              }
            ]
          },
          {
            linkId: 'q2',
            text: 'Dependent VS',
            type: 'string',
            enableBehavior: 'all',
            enableWhen: [
              {
                question: 'q1',
                operator: '!=',
                answerCoding: { system: 'http://loinc.org', code: 'LA27259-3' }
              }
            ]
          }
        ]
      };

      const qNestedGroup = {
        resourceType: 'Questionnaire',
        status: 'draft',
        item: [
          {
            linkId: 'p1',
            text: 'Parent controller',
            type: 'choice',
            answerOption: [
              { valueCoding: { code: 'YES', display: 'Yes' } },
              { valueCoding: { code: 'NO', display: 'No' } }
            ]
          },
          {
            linkId: 'g1',
            text: 'Conditional group',
            type: 'group',
            enableBehavior: 'all',
            enableWhen: [
              {
                question: 'p1',
                operator: '=',
                answerCoding: { code: 'YES' }
              }
            ],
            item: [
              {
                linkId: 'c1',
                text: 'Inner controller',
                type: 'choice',
                answerOption: [
                  { valueCoding: { code: 'A', display: 'A' } },
                  { valueCoding: { code: 'B', display: 'B' } }
                ]
              },
              {
                linkId: 'd1',
                text: 'Inner dependent',
                type: 'string',
                enableBehavior: 'all',
                enableWhen: [
                  {
                    question: 'c1',
                    operator: '!=',
                    answerCoding: { code: 'A' }
                  }
                ]
              }
            ]
          }
        ]
      };

      win.__neqDiag = {
        answerOption: run(qAnswerOption),
        answerValueSet: run(qAnswerValueSet),
        nestedGroup: run(qNestedGroup)
      };
    });

    cy.window().then((win) => {
      const d = win.__neqDiag;
      cy.writeFile('enablewhen-not-equals-minimal.json', d);
      expect(d).to.exist;
      expect(d.answerOption.initError, JSON.stringify(d)).to.equal(null);
      expect(d.answerValueSet.initError, JSON.stringify(d)).to.equal(null);
      expect(d.nestedGroup.initError, JSON.stringify(d)).to.equal(null);
    });
  });

  it('should perform enableWhen logic correctly', () => {
    cy.visit('/test/pages/addFormToPageTest.html');
    util.addFormToPage('q-with-nested-enableWhen.json', null, {fhirVersion: 'R4'});
    cy.byId('p1/1').type('{downarrow}{enter}'); // select YES for parent question
    cy.byId('c1/1/1').type('{downarrow}{downarrow}{enter}'); // select B for inner controller
    cy.byId('d1/1/1').should('be.visible'); // inner dependent should be visible since c1 != A
    cy.byId('c1/1/1').clear().type('{downarrow}{enter}'); // change to A for inner controller
    cy.byId('d1/1/1').should('not.exist'); // inner dependent should be hidden since c1 = A
    // With another middle layer.
    cy.byId('cc1/1/1/1').type('{downarrow}{downarrow}{enter}'); // select B for inner controller
    cy.byId('dd1/1/1/1').should('be.visible'); // inner dependent should be visible since cc1 != A
    cy.byId('cc1/1/1/1').clear().type('{downarrow}{enter}'); // change to A for inner controller
    cy.byId('dd1/1/1/1').should('not.exist'); // inner dependent should be hidden since cc1 = A
  });
});
