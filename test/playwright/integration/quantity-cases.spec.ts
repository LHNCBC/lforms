import { test, expect } from '@playwright/test';
import { waitForLFormsReady } from '../support/lforms-helpers';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Quantities with and without unit lists and unit-open', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    const filePath = path.resolve('test/data/R4/quantity-units.json');
    const formDef = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    await page.evaluate(async ({ formDef }) => {
      document.getElementById('formContainer')!.innerHTML = '';
      await (window as any).LForms.Util.addFormToPage(formDef, 'formContainer');
    }, { formDef });
    await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();
  });

  // Some cases are tested via Karma, in lhc-unit.component.spec.ts

  test('should have a CNE list for a quantity with units list but without unit-open', async ({ page }) => {
    const unitField = page.locator('#unit_q5\\/1');
    await unitField.click();
    await unitField.pressSequentially('meters');
    await unitField.blur();
    await expect(unitField).toHaveValue('');
    const fhirData = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(fhirData.item).toBeUndefined();
  });

  test('should have a CWE list for a quantity with units list and with unit-open=optionsOrString', async ({ page }) => {
    const valueField = page.locator('#q6\\/1');
    const unitField = page.locator('#unit_q6\\/1');
    const nextInput = page.locator('#q7\\/1');

    await valueField.click();
    await valueField.pressSequentially('5');
    await valueField.blur();

    await unitField.click();
    await unitField.clear();
    await unitField.pressSequentially('meters1');
    await nextInput.click();
    await expect(unitField).toHaveValue('meters1');

    await unitField.click();
    await unitField.clear();
    await unitField.pressSequentially('meters');
    await nextInput.click();
    await expect(unitField).toHaveValue('meters');

    await expect.poll(async () => {
      const fhirData = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
      return fhirData?.item?.[0]?.answer?.[0]?.valueQuantity;
    }).toEqual({ value: 5, unit: 'meters' });

    // Clean up
    await valueField.click();
    await valueField.fill('');
    await valueField.blur();
  });

  test('should have a CNE list for a quantity with units list and with unit-open=optionsOrType', async ({ page }) => {
    // This is because we don't currently provide the user with a way to enter
    // an off-list coding.
    const unitField = page.locator('#unit_q7\\/1');
    await unitField.click();
    await unitField.pressSequentially('meters');
    await unitField.blur();
    await expect(unitField).toHaveValue('');
    const fhirData = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(fhirData.item).toBeUndefined();
  });

  test('should have a CNE list for a quantity with units list and with unit-open=optionsOnly', async ({ page }) => {
    const unitField = page.locator('#unit_q8\\/1');
    await unitField.click();
    await unitField.pressSequentially('meters');
    await unitField.blur();
    await expect(unitField).toHaveValue('');
    const fhirData = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(fhirData.item).toBeUndefined();
  });
});
