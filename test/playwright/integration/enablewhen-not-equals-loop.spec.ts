import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId } from '../support/lforms-helpers';

test.describe('enableWhen != minimal reproduction', () => {
  test('checks if != on coded answer loops in init', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);

    const result = await page.evaluate(() => {
      const win = window as any;

      function run(q: any) {
        const proto = win.LForms.LFormsData.prototype;
        const origSet = proto._setSkipLogicStatusValue;
        const origUpd = proto._updateItemSkipLogicStatus;
        let guard = 0;
        let initError: string | null = null;

        proto._setSkipLogicStatusValue = function(item: any, newStatus: any, noLog = false) {
          return origSet.call(this, item, newStatus, noLog);
        };

        proto._updateItemSkipLogicStatus = function(item: any, disabled: any) {
          guard++;
          if (guard > 300000) {
            throw new Error('guard-hit');
          }
          return origUpd.call(this, item, disabled);
        };

        try {
          const lfDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
          new win.LForms.LFormsData(lfDef);
        } catch (e: any) {
          initError = e?.message || String(e);
        } finally {
          proto._setSkipLogicStatusValue = origSet;
          proto._updateItemSkipLogicStatus = origUpd;
        }
        return { initError, guard };
      }

      const qAnswerOption = {
        resourceType: 'Questionnaire', status: 'draft',
        item: [
          { linkId: 'q1', text: 'Controller', type: 'choice',
            answerOption: [
              { valueCoding: { code: 'A', display: 'A' } },
              { valueCoding: { code: 'B', display: 'B' } }
            ]
          },
          { linkId: 'q2', text: 'Dependent', type: 'string', enableBehavior: 'all',
            enableWhen: [{ question: 'q1', operator: '!=', answerCoding: { code: 'A' } }]
          }
        ]
      };

      const qAnswerValueSet = {
        resourceType: 'Questionnaire', status: 'draft',
        item: [
          { linkId: 'q1', text: 'Controller VS', type: 'choice',
            answerValueSet: 'https://art-decor.org/fhir/ValueSet/2.16.840.1.113883.3.1937.777.18.11.12046',
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
              valueCodeableConcept: {
                coding: [{ system: 'http://hl7.org/fhir/questionnaire-item-control', code: 'autocomplete' }]
              }
            }]
          },
          { linkId: 'q2', text: 'Dependent VS', type: 'string', enableBehavior: 'all',
            enableWhen: [{ question: 'q1', operator: '!=', answerCoding: { system: 'http://loinc.org', code: 'LA27259-3' } }]
          }
        ]
      };

      const qNestedGroup = {
        resourceType: 'Questionnaire', status: 'draft',
        item: [
          { linkId: 'p1', text: 'Parent controller', type: 'choice',
            answerOption: [
              { valueCoding: { code: 'YES', display: 'Yes' } },
              { valueCoding: { code: 'NO', display: 'No' } }
            ]
          },
          { linkId: 'g1', text: 'Conditional group', type: 'group', enableBehavior: 'all',
            enableWhen: [{ question: 'p1', operator: '=', answerCoding: { code: 'YES' } }],
            item: [
              { linkId: 'c1', text: 'Inner controller', type: 'choice',
                answerOption: [
                  { valueCoding: { code: 'A', display: 'A' } },
                  { valueCoding: { code: 'B', display: 'B' } }
                ]
              },
              { linkId: 'd1', text: 'Inner dependent', type: 'string', enableBehavior: 'all',
                enableWhen: [{ question: 'c1', operator: '!=', answerCoding: { code: 'A' } }]
              }
            ]
          }
        ]
      };

      return {
        answerOption: run(qAnswerOption),
        answerValueSet: run(qAnswerValueSet),
        nestedGroup: run(qNestedGroup)
      };
    });

    expect(result.answerOption.initError).toBeNull();
    expect(result.answerValueSet.initError).toBeNull();
    expect(result.nestedGroup.initError).toBeNull();
  });

  test('should perform enableWhen logic correctly', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-nested-enableWhen.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'p1/1').press('ArrowDown');
    await byId(page, 'p1/1').press('Enter'); // select YES
    await byId(page, 'c1/1/1').press('ArrowDown');
    await byId(page, 'c1/1/1').press('ArrowDown');
    await byId(page, 'c1/1/1').press('Enter'); // select B
    await expect(byId(page, 'd1/1/1')).toBeVisible(); // visible since c1 != A

    // Clear the autocomplete and select A.
    // Cypress .clear() resets the autocomplete-lhc internal model; replicate via
    // triple-click to select all, then type the replacement value directly.
    await byId(page, 'c1/1/1').click({ clickCount: 3 });
    await byId(page, 'c1/1/1').press('Backspace');
    await expect(byId(page, 'c1/1/1')).toHaveValue('');
    await byId(page, 'c1/1/1').blur();
    // Re-focus and make a new selection
    await byId(page, 'c1/1/1').click();
    await byId(page, 'c1/1/1').press('ArrowDown');
    await byId(page, 'c1/1/1').press('Enter'); // select A
    await byId(page, 'c1/1/1').blur();
    await expect(byId(page, 'd1/1/1')).not.toBeAttached(); // hidden since c1 = A

    // With another middle layer
    await byId(page, 'cc1/1/1/1').press('ArrowDown');
    await byId(page, 'cc1/1/1/1').press('ArrowDown');
    await byId(page, 'cc1/1/1/1').press('Enter'); // select B
    await expect(byId(page, 'dd1/1/1/1')).toBeVisible(); // visible since cc1 != A

    // Clear the autocomplete and select A
    await byId(page, 'cc1/1/1/1').click({ clickCount: 3 });
    await byId(page, 'cc1/1/1/1').press('Backspace');
    await expect(byId(page, 'cc1/1/1/1')).toHaveValue('');
    await byId(page, 'cc1/1/1/1').blur();
    await byId(page, 'cc1/1/1/1').click();
    await byId(page, 'cc1/1/1/1').press('ArrowDown');
    await byId(page, 'cc1/1/1/1').press('Enter'); // select A
    await expect(byId(page, 'dd1/1/1/1')).not.toBeAttached(); // hidden since cc1 = A
  });
});
