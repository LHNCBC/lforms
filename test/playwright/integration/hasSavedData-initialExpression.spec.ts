import { test, expect, type Page } from '@playwright/test';
import { addFormToPage, byId, TIMEOUT_30S, waitForLFormsReady } from '../support/lforms-helpers';
import fs from 'fs';
import path from 'path';

test.describe('initialExpression and hasSavedData=true/false tests', () => {
  const intFieldId = '/type-integer/1';
  const strFieldId = '/type-string/1';

  async function openPageAndLoadForm(page: Page) {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-initialExpression.json', 'formContainer', { fhirVersion: 'R4' });
  }

  async function getQR(page: Page) {
    return await page.evaluate(() => {
      return (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
    });
  }

  function readQuestionnaire() {
    const absPath = path.resolve('test/data/R4/questionnaire-initialExpression.json');
    return JSON.parse(fs.readFileSync(absPath, 'utf-8'));
  }

  test('should have initial values', async ({ page }) => {
    await openPageAndLoadForm(page);
    await expect(byId(page, intFieldId)).toHaveValue('123');
    await expect(byId(page, strFieldId)).toHaveValue('abc123');
  });

  test('should have the user saved data, instead of the initial values even if the user saved data are empty strings in QuestionnaireResponse', async ({ page }) => {
    await openPageAndLoadForm(page);
    const qr = await getQR(page);
    const q = readQuestionnaire();

    qr.item[0].answer[0].valueInteger = '';
    qr.item[1].answer[0].valueString = '';

    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      if (mergedFormData.hasSavedData !== true) throw new Error('hasSavedData should be true');
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(page.locator('.lhc-form-title')).toContainText('Questionnaire for testing initialExpression', TIMEOUT_30S);
    await expect(byId(page, intFieldId)).toHaveValue('');
    await expect(byId(page, strFieldId)).toHaveValue('');
  });

  test('should have the user saved data, instead of the initial values if there are saved user data in QuestionnaireResponse', async ({ page }) => {
    await openPageAndLoadForm(page);
    const qr = await getQR(page);
    const q = readQuestionnaire();

    qr.item[0].answer[0].valueInteger = '456';
    qr.item[1].answer[0].valueString = 'def456';

    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      if (mergedFormData.hasSavedData !== true) throw new Error('hasSavedData should be true');
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(page.locator('.lhc-form-title')).toContainText('Questionnaire for testing initialExpression', TIMEOUT_30S);
    await expect(byId(page, intFieldId)).toHaveValue('456');
    await expect(byId(page, strFieldId)).toHaveValue('def456');
  });

  test('should have the initial data, instead of the user saved data, if hasSavedData is set to false', async ({ page }) => {
    await openPageAndLoadForm(page);
    const qr = await getQR(page);
    const q = readQuestionnaire();

    qr.item[0].answer[0].valueInteger = '456';
    qr.item[1].answer[0].valueString = 'def456';

    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      if (mergedFormData.hasSavedData !== true) throw new Error('hasSavedData should be true');
      mergedFormData.hasSavedData = false;
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(page.locator('.lhc-form-title')).toContainText('Questionnaire for testing initialExpression', TIMEOUT_30S);
    await expect(byId(page, intFieldId)).toHaveValue('123');
    await expect(byId(page, strFieldId)).toHaveValue('abc123');
  });
});
