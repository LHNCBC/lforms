import { test, expect } from '@playwright/test';
import { byId, addFormToPage, answerId, waitForLFormsReady } from '../../support/lforms-helpers';

test.describe('3 states boolean type', () => {
  test('should export 3 different values on boolean item', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'enableWhen-test.R4.json', 'formContainer', { fhirVersion: 'R4' });

    await expect(byId(page, answerId('Q1/1/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'false')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'null')).locator('input')).toBeChecked();

    // "Not Answered" is not in QR
    let qr = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(qr.item).toBeUndefined();

    // select "Yes"
    await byId(page, answerId('Q1/1/1', 'true')).locator('input').click();
    qr = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(qr.item[0].linkId).toBe('g1');
    expect(qr.item[0].item[0].linkId).toBe('Q1');
    expect(qr.item[0].item[0].answer[0].valueBoolean).toBe(true);

    // select "No"
    await byId(page, answerId('Q1/1/1', 'false')).locator('input').click();
    qr = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(qr.item[0].linkId).toBe('g1');
    expect(qr.item[0].item[0].linkId).toBe('Q1');
    expect(qr.item[0].item[0].answer[0].valueBoolean).toBe(false);

    // select "Not Answered" again
    await byId(page, answerId('Q1/1/1', 'null')).locator('input').click();
    qr = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(qr.item).toBeUndefined();
  });

  test('should set the boolean values correctly when loading data from QuestionnaireResponse', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'enableWhen-test.R4.json', 'formContainer', { fhirVersion: 'R4' });

    // select "Yes"
    await byId(page, answerId('Q1/1/1', 'true')).locator('input').click();
    await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    });
    await expect(page.locator('.lhc-form-title')).toContainText('Questionnaire for enableWhen Tests');
    await expect(byId(page, answerId('Q1/1/1', 'true')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'false')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'null')).locator('input')).not.toBeChecked();

    // select "No"
    await byId(page, answerId('Q1/1/1', 'false')).locator('input').click();
    await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    });
    await expect(page.locator('.lhc-form-title')).toContainText('Questionnaire for enableWhen Tests');
    await expect(byId(page, answerId('Q1/1/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'false')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'null')).locator('input')).not.toBeChecked();
  });
});
