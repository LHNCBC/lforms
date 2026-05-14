import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { byId, answerId, addFormToPage, waitForLFormsReady, loadFromTestData } from '../../support/lforms-helpers';
import { mockFHIRContext, mockData } from '../../support/R4/fhir_context';

const fhirVersion = 'R4';

async function setFHIRContext(page) {
  await page.evaluate(({ mockFn, data, ver }) => {
    const fhirContext = new Function('return ' + mockFn)();
    (window as any).LForms.Util.setFHIRContext(fhirContext(ver, null, data));
  }, { mockFn: mockFHIRContext, data: mockData, ver: fhirVersion });
}

test.describe('FHIR answerValueSet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await setFHIRContext(page);
  });

  test.describe('answerValueSet with FHIR context, answers displayed as drop-down list (autocomplete)', () => {
    // yesno1: choice, yesno2: choice (repeats), yesno3: open-choice,
    // yesno4: open-choice, yesno5: open-choice (repeats), yesno6: open-choice (repeats)
    const answerFields = ['yesno1/1', 'yesno2/1', 'yesno3/1', 'yesno4/1', 'yesno5/1', 'yesno6/1'];
    const searchResults = 'lhc-tools-searchResults';
    
    test('should have expected answer list when the Questionnaire is loaded', async ({ page }) => {
      await addFormToPage(page, 'q-with-answerValueSet-autocomplete.json', 'formContainer', { fhirVersion });
      const listItems = page.locator(`#${searchResults} li`);

      for (const answerField of answerFields) {
        await byId(page, answerField).click();
        await expect(byId(page, searchResults)).toBeVisible();
        await expect(listItems).toHaveCount(3);
        await expect(listItems.nth(0)).toContainText('No');
        await expect(listItems.nth(1)).toContainText('Yes');
        await expect(listItems.nth(2)).toContainText("Don't know");
      }
    });

    test('should have expected answer list and saved value when the QR is merged to the Questionnaire', async ({ page }) => {
      const q = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/q-with-answerValueSet-autocomplete.json'), 'utf-8'));
      const qr = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/qr-with-answerValueSet-autocomplete.json'), 'utf-8'));

      await page.evaluate(({ q, qr, fhirVersion }) => {
        const win = window as any;
        const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
        const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
        win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
      }, { q, qr, fhirVersion });
      await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();

      // Define expected values
      const expectedSavedValues = {
        'yesno1/1': { type: 'single', value: 'Yes' },
        'yesno2/1': { type: 'multi', values: ['×Yes', '×No'] },
        'yesno3/1': { type: 'single', value: 'Yes' },
        'yesno4/1': { type: 'single', value: 'offlist answer 1' },
        'yesno5/1': { type: 'multi', values: ['×Yes', '×No'] },
        'yesno6/1': { type: 'multi', values: ['×Yes', '×offlist answer 2'] }
      };

      // check saved values
      for (const [fieldId, expected] of Object.entries(expectedSavedValues)) {
        if (expected.type === 'single') {
          await expect(byId(page, fieldId)).toHaveValue(expected.value);
        } else {
          const container = byId(page, `item-${fieldId}`);
          const items = container.locator('span.autocomp_selected li');
          for (let i = 0; i < expected.values.length; i++) {
            await expect(items.nth(i)).toContainText(expected.values[i]);
          }
        }
      }

      // Define expected answer lists per field
      const answerListConfigs = {
        'yesno1/1': { count: 3, answers: ['No', 'Yes', "Don't know"] },
        'yesno2/1': { count: 1, answers: ["Don't know"] },
        'yesno3/1': { count: 3, answers: ['No', 'Yes', "Don't know"] },
        'yesno4/1': { count: 3, answers: ['No', 'Yes', "Don't know"] },
        'yesno5/1': { count: 1, answers: ["Don't know"] },
        'yesno6/1': { count: 2, answers: ['No', "Don't know"] }
      };

      // check answer list
      for (const [fieldId, config] of Object.entries(answerListConfigs)) {
        await byId(page, fieldId).click();
        await expect(byId(page, searchResults)).toBeVisible();
        const listItems = page.locator(`#${searchResults} li`);
        await expect(listItems).toHaveCount(config.count);
        for (let i = 0; i < config.answers.length; i++) {
          await expect(listItems.nth(i)).toContainText(config.answers[i]);
        }
      }

      // export a correct QR again
      const exportedQR = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
      );
      expect(exportedQR.item[0].linkId).toBe('yesno1');
      expect(exportedQR.item[0].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[1].linkId).toBe('yesno2');
      expect(exportedQR.item[1].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[1].answer[1]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'N', display: 'No' } });
      expect(exportedQR.item[2].linkId).toBe('yesno3');
      expect(exportedQR.item[2].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[3].linkId).toBe('yesno4');
      expect(exportedQR.item[3].answer[0]).toEqual({ valueString: 'offlist answer 1' });
      expect(exportedQR.item[4].linkId).toBe('yesno5');
      expect(exportedQR.item[4].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[4].answer[1]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'N', display: 'No' } });
      expect(exportedQR.item[5].linkId).toBe('yesno6');
      expect(exportedQR.item[5].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[5].answer[1]).toEqual({ valueString: 'offlist answer 2' });
    });
  });

  test.describe('answerValueSet with FHIR context, answers displayed as radio buttons or checkboxes', () => {
    const f1a1 = answerId('yesno1/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'),
      f1a2 = answerId('yesno1/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'),
      f1a3 = answerId('yesno1/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'),
      f2a1 = answerId('yesno2/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'),
      f2a2 = answerId('yesno2/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'),
      f2a3 = answerId('yesno2/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'),
      f3a1 = answerId('yesno3/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'),
      f3a2 = answerId('yesno3/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'),
      f3a3 = answerId('yesno3/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'),
      f3Other = answerId('yesno3/1', '_other'),
      f4a1 = answerId('yesno4/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'),
      f4a2 = answerId('yesno4/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'),
      f4a3 = answerId('yesno4/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'),
      f4Other = answerId('yesno4/1', '_other'),
      f5a1 = answerId('yesno5/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'),
      f5a2 = answerId('yesno5/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'),
      f5a3 = answerId('yesno5/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'),
      f5Other = answerId('yesno5/1', '_other'),
      f5OtherValue = answerId('yesno5/1', '_otherValue'),
      f6a1 = answerId('yesno6/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'),
      f6a2 = answerId('yesno6/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'),
      f6a3 = answerId('yesno6/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'),
      f6Other = answerId('yesno6/1', '_other'),
      f6OtherValue = answerId('yesno6/1', '_otherValue');

    test('should have expected answer list displayed as radio buttons or checkboxes when the Questionnaire is loaded', async ({ page }) => {
      await addFormToPage(page, 'q-with-answerValueSet-radiobutton-checkbox.json', 'formContainer', { fhirVersion });

      const allAnswers = [
        [f1a1, f1a2, f1a3],
        [f2a1, f2a2, f2a3],
        [f3a1, f3a2, f3a3],
        [f4a1, f4a2, f4a3],
        [f5a1, f5a2, f5a3],
        [f6a1, f6a2, f6a3]
      ];
      for (const answers of allAnswers) {
        for (const a of answers) {
          await expect(byId(page, a)).toBeVisible();
        }
      }
      await expect(byId(page, f3Other)).toBeVisible();
      await expect(byId(page, f4Other)).toBeVisible();
      await expect(byId(page, f5Other)).toBeVisible();
      await expect(byId(page, f6Other)).toBeVisible();
    });

    test('should have expected answer list and saved value when the QR is merged to the Questionnaire', async ({ page }) => {
      const q = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/q-with-answerValueSet-radiobutton-checkbox.json'), 'utf-8'));
      const qr = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/qr-with-answerValueSet-radiobutton-checkbox.json'), 'utf-8'));

      await page.evaluate(({ q, qr, fhirVersion }) => {
        const win = window as any;
        const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
        const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
        win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
      }, { q, qr, fhirVersion });
      await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();

      // Define expected checkbox states per field
      const fieldStates = {
        f1: { f1a1: false, f1a2: true, f1a3: false },
        f2: { f2a1: true, f2a2: true, f2a3: false },
        f3: { f3a1: false, f3a2: true, f3a3: false, f3Other: false },
        f4: { f4a1: true, f4a2: true, f4a3: false, f4Other: false },
        f5: { f5a1: false, f5a2: false, f5a3: false, f5Other: true, f5OtherValue: 'offlist answer 1' },
        f6: { f6a1: false, f6a2: true, f6a3: false, f6Other: true, f6OtherValue: 'offlist answer 2' }
      };

      // check saved values
      for (const [groupKey, states] of Object.entries(fieldStates)) {
        for (const [fieldId, expectedState] of Object.entries(states)) {
          const field = byId(page, eval(fieldId));
          await expect(field).toBeVisible();
          
          if (typeof expectedState === 'string') {
            // It's a text field (e.g., OtherValue)
            await expect(field).toHaveValue(expectedState);
          } else {
            // It's a checkbox
            const input = field.locator('input').first();
            if (expectedState) {
              await expect(input).toBeChecked();
            } else {
              await expect(input).not.toBeChecked();
            }
          }
        }
      }

      // export a correct QR
      const exportedQR = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
      );
      expect(exportedQR.item[0].linkId).toBe('yesno1');
      expect(exportedQR.item[0].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[1].linkId).toBe('yesno2');
      expect(exportedQR.item[1].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'N', display: 'No' } });
      expect(exportedQR.item[1].answer[1]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[2].linkId).toBe('yesno3');
      expect(exportedQR.item[2].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[3].linkId).toBe('yesno4');
      expect(exportedQR.item[3].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'N', display: 'No' } });
      expect(exportedQR.item[3].answer[1]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[4].linkId).toBe('yesno5');
      expect(exportedQR.item[4].answer[0]).toEqual({ valueString: 'offlist answer 1' });
      expect(exportedQR.item[5].linkId).toBe('yesno6');
      expect(exportedQR.item[5].answer[0]).toEqual({ valueCoding: { system: 'http://terminology.hl7.org/CodeSystem/v2-0136', code: 'Y', display: 'Yes' } });
      expect(exportedQR.item[5].answer[1]).toEqual({ valueString: 'offlist answer 2' });
    });
  });

  test.describe('answerValueSet with FHIR context, answers displayed as matrix', () => {
    test('should have expected answer list when the Questionnaire is loaded', async ({ page }) => {
      await addFormToPage(page, 'q-with-answerValueSet-matrix.json', 'formContainer', { fhirVersion });

      for (let g = 1; g < 5; g++) {
        for (let m = 1; m < 4; m++) {
          await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'))).toBeVisible();
          await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'))).toBeVisible();
          await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'))).toBeVisible();
        }
      }
      await expect(byId(page, answerId('/g3m1/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g3m2/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g3m3/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g4m1/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g4m2/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g4m3/1/1', '_other'))).toBeVisible();
    });

    test('should have expected answer list and saved value when the QR is merged, and export QR', async ({ page }) => {
      const q = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/q-with-answerValueSet-matrix.json'), 'utf-8'));
      const qr = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/qr-with-answerValueSet-matrix.json'), 'utf-8'));

      await page.evaluate(({ q, qr, fhirVersion }) => {
        const win = window as any;
        const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
        const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
        win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
      }, { q, qr, fhirVersion });
      await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();

      // check saved values
      // check answer list after merge
      for (let g = 1; g < 5; g++) {
        for (let m = 1; m < 4; m++) {
          await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'))).toBeVisible();
          await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'))).toBeVisible();
          await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'))).toBeVisible();
        }
      }
      await expect(byId(page, answerId('/g3m1/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g3m2/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g3m3/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g4m1/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g4m2/1/1', '_other'))).toBeVisible();
      await expect(byId(page, answerId('/g4m3/1/1', '_other'))).toBeVisible();

      // export QR
      const exportedQR = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
      );

      const V2_0136 = 'http://terminology.hl7.org/CodeSystem/v2-0136';
      const DATA_ABSENT_REASON = 'http://terminology.hl7.org/CodeSystem/data-absent-reason';

      const expectedMatrixQR = [
        {
          linkId: 'g1', // first group
          item: [
            { linkId: '/g1m1', answer: [ { valueCoding: { code: 'N', display: 'No', system: V2_0136 } } ] },
            { linkId: '/g1m2', answer: [ { valueCoding: { code: 'Y', display: 'Yes', system: V2_0136 } } ] },
            { linkId: '/g1m3', answer: [ { valueCoding: { code: 'asked-unknown', display: "Don't know", system: DATA_ABSENT_REASON } } ] }
          ]
        },
        {
          linkId: 'g2', // second group
          item: [
            { linkId: '/g2m1', answer: [ { valueCoding: { code: 'N', display: 'No', system: V2_0136 } } ] },
            { linkId: '/g2m2', answer: [ { valueCoding: { code: 'N', display: 'No', system: V2_0136 } }, { valueCoding: { code: 'Y', display: 'Yes', system: V2_0136 } } ] },
            { linkId: '/g2m3', answer: [ { valueCoding: { code: 'N', display: 'No', system: V2_0136 } }, { valueCoding: { code: 'Y', display: 'Yes', system: V2_0136 } }, { valueCoding: { code: 'asked-unknown', display: "Don't know", system: DATA_ABSENT_REASON } } ] }
          ]
        },
        {
          linkId: 'g3', // third group
          item: [
            { linkId: '/g3m1', answer: [{ valueCoding: { code: 'N', display: 'No', system: V2_0136 } }] },
            { linkId: '/g3m2', answer: [{ valueCoding: { code: 'Y', display: 'Yes', system: V2_0136 } }] },
            { linkId: '/g3m3', answer: [{ valueString: 'offlist answer 1' }] }
          ]
        },
        {
          linkId: 'g4', // fourth group
          item: [
            { linkId: '/g4m1', answer: [{ valueCoding: { code: 'Y', display: 'Yes', system: V2_0136 } }] },
            { linkId: '/g4m2', answer: [{ valueString: 'offlist answer 2' }] },
            { linkId: '/g4m3', answer: [{ valueCoding: { code: 'Y', display: 'Yes', system: V2_0136 } }, { valueString: 'offlist answer 3' }] }
          ]
        }
      ];

      // Validate exported QR
      expectedMatrixQR.forEach((expectedGroup, groupIdx) => {
        const groupItem = exportedQR.item[groupIdx];
        expect(groupItem.linkId).toBe(expectedGroup.linkId);

        expectedGroup.item.forEach((item, itemIdx) => {
          const expectedItem = expectedGroup.item[itemIdx];
          expect(item.linkId).toBe(expectedItem.linkId);
          expect(item.answer).toEqual(expectedItem.answer); 
        });
      });

    });
  });

  test.describe('answerValueSet with FHIR context, answers displayed as search field (autocomplete)', () => {
    test('should have expected answer list and saved value when the QR is merged, and export QR', async ({ page }) => {
      const q = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/q-with-answerValueSet-autocomplete-searchfield.json'), 'utf-8'));
      const qr = JSON.parse(fs.readFileSync(path.resolve('test/data/R4/qr-with-answerValueSet-autocomplete-searchfield.json'), 'utf-8'));

      await page.evaluate(({ q, qr, fhirVersion }) => {
        const win = window as any;
        const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
        const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
        win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
      }, { q, qr, fhirVersion });
      await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();

      // check saved values
      await expect(byId(page, 'yesno1/1')).toHaveValue('Abdominal pain');
      await expect(byId(page, 'item-yesno2/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Abdominal pain');
      await expect(byId(page, 'item-yesno2/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Arteriovenous fistula');
      await expect(byId(page, 'yesno3/1')).toHaveValue('Abdominal pain');
      await expect(byId(page, 'yesno4/1')).toHaveValue('aaa');
      await expect(byId(page, 'item-yesno5/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Abdominal pain');
      await expect(byId(page, 'item-yesno5/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Arteriovenous fistula');
      await expect(byId(page, 'item-yesno6/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Abdominal pain');
      await expect(byId(page, 'item-yesno6/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Arteriovenous fistula');
      await expect(byId(page, 'item-yesno6/1').locator('span.autocomp_selected li').nth(2)).toHaveText('×aaa');

      // export QR
      const exportedQR = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
      );
      const condSystem = 'http://clinicaltables.nlm.nih.gov/fhir/CodeSystem/conditions';
      expect(exportedQR.item[0].linkId).toBe('yesno1');
      expect(exportedQR.item[0].answer[0]).toEqual({ valueCoding: { system: condSystem, code: '3982', display: 'Abdominal pain' } });
      expect(exportedQR.item[1].linkId).toBe('yesno2');
      expect(exportedQR.item[1].answer[0]).toEqual({ valueCoding: { system: condSystem, code: '3982', display: 'Abdominal pain' } });
      expect(exportedQR.item[1].answer[1]).toEqual({ valueCoding: { system: condSystem, code: '4351', display: 'Arteriovenous fistula' } });
      expect(exportedQR.item[2].linkId).toBe('yesno3');
      expect(exportedQR.item[2].answer[0]).toEqual({ valueCoding: { system: condSystem, code: '3982', display: 'Abdominal pain' } });
      expect(exportedQR.item[3].linkId).toBe('yesno4');
      expect(exportedQR.item[3].answer[0]).toEqual({ valueString: 'aaa' });
      expect(exportedQR.item[4].linkId).toBe('yesno5');
      expect(exportedQR.item[4].answer[0]).toEqual({ valueCoding: { system: condSystem, code: '3982', display: 'Abdominal pain' } });
      expect(exportedQR.item[4].answer[1]).toEqual({ valueCoding: { system: condSystem, code: '4351', display: 'Arteriovenous fistula' } });
      expect(exportedQR.item[5].linkId).toBe('yesno6');
      expect(exportedQR.item[5].answer[0]).toEqual({ valueCoding: { system: condSystem, code: '3982', display: 'Abdominal pain' } });
      expect(exportedQR.item[5].answer[1]).toEqual({ valueCoding: { system: condSystem, code: '4351', display: 'Arteriovenous fistula' } });
      expect(exportedQR.item[5].answer[2]).toEqual({ valueString: 'aaa' });
    });
  });
});

test.describe('contained ValueSet without expansion', () => {
  test('should load contained ValueSet with no expansion from terminology server', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);

    const expandResponse = {
      resourceType: 'ValueSet',
      id: 'test-valueset',
      meta: {
        extension: [{
          url: 'http://hapifhir.io/fhir/StructureDefinition/valueset-expansion-message',
          valueString: 'ValueSet with URL "ValueSet.id[ValueSet/test-valueset]" was expanded using an in-memory expansion'
        }]
      },
      status: 'active',
      compose: {
        include: [{
          system: 'lhc.forms.test.code.system',
          concept: [
            { code: 'a', display: 'Answer 1' },
            { code: 'b', display: 'Answer 2' },
            { code: 'c', display: 'Answer 3' }
          ]
        }]
      },
      expansion: {
        offset: 0,
        parameter: [{ name: 'offset', valueInteger: 0 }, { name: 'count', valueInteger: 1000 }],
        contains: [
          { system: 'lhc.forms.test.code.system', code: 'a', display: 'Answer 1' },
          { system: 'lhc.forms.test.code.system', code: 'b', display: 'Answer 2' },
          { system: 'lhc.forms.test.code.system', code: 'c', display: 'Answer 3' }
        ]
      }
    };
    await page.route('**/ValueSet/$expand', route =>
      route.fulfill({ contentType: 'application/json', body: JSON.stringify(expandResponse) })
    );
    await loadFromTestData(page, 'q-with-contained-valueset-without-expansion.json', 'R4');
    // autocomplete
    await byId(page, 'group1-item1/1/1').focus();
    const listOptions = page.locator('#completionOptions li');
    await expect(listOptions.first()).toBeVisible();
    await expect(listOptions).toHaveCount(3);
    // radio
    await expect(byId(page, answerId('group2-item1/1/1', 'lhc.forms.test.code.system', 'a'))).toHaveText('Answer 1');
    await expect(byId(page, answerId('group2-item1/1/1', 'lhc.forms.test.code.system', 'b'))).toHaveText('Answer 2');
    await expect(byId(page, answerId('group2-item1/1/1', 'lhc.forms.test.code.system', 'c'))).toHaveText('Answer 3');
    // checkbox
    await expect(byId(page, answerId('group2-item2/1/1', 'lhc.forms.test.code.system', 'a'))).toHaveText('Answer 1');
    await expect(byId(page, answerId('group2-item2/1/1', 'lhc.forms.test.code.system', 'b'))).toHaveText('Answer 2');
    await expect(byId(page, answerId('group2-item2/1/1', 'lhc.forms.test.code.system', 'c'))).toHaveText('Answer 3');
  });

  test('should load contained ValueSet with no expansion from FHIR context', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await setFHIRContext(page);

    const filePath = path.resolve('test/data/R4/q-with-contained-valueset-without-expansion.json');
    const fhirData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // Remove terminology server so we test expansion using FHIR client
    delete fhirData.extension;

    await page.evaluate(({ fhirData, fhirVersion }) => {
      (window as any).LForms.Util.addFormToPage(fhirData, 'formContainer', { fhirVersion });
    }, { fhirData, fhirVersion: 'R4' });
    await expect(page.locator('.lhc-form-title')).toBeVisible();

    // autocomplete
    await byId(page, 'group1-item1/1/1').focus();
    const listOptions = page.locator('#completionOptions li');
    await expect(listOptions.first()).toBeVisible();
    await expect(listOptions).toHaveCount(3);
    // radio
    await expect(byId(page, answerId('group2-item1/1/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'))).toHaveText('No');
    await expect(byId(page, answerId('group2-item1/1/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'))).toHaveText('Yes');
    await expect(byId(page, answerId('group2-item1/1/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'))).toHaveText("Don't know");
    // checkbox
    await expect(byId(page, answerId('group2-item2/1/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'))).toHaveText('No');
    await expect(byId(page, answerId('group2-item2/1/1', 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'))).toHaveText('Yes');
    await expect(byId(page, answerId('group2-item2/1/1', 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'))).toHaveText("Don't know");
  });
});
