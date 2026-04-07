import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, addFormToPage, answerId } from '../support/lforms-helpers';
import fs from 'fs';
import path from 'path';

test.describe('calculatedExpression and hasSavedData=true/false tests', () => {
  test('should show disabled inputs', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'readonly-test.json', 'formContainer');

    // without values
    await expect(byId(page, 'st/1/1')).toBeDisabled();
    await expect(byId(page, answerId('g2/bl/1/1', 'true')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('g2/bl/1/1', 'false')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('bl/1/1', 'true')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('bl/1/1', 'false')).locator('input')).toBeDisabled();
    await expect(byId(page, 'int/1/1')).toBeDisabled();
    await expect(byId(page, 'real/1/1')).toBeDisabled();
    await expect(byId(page, 'dt/1/1')).toHaveClass(/ant-picker-disabled/);
    await expect(byId(page, 'dt/1/1').locator('input')).toBeDisabled();
    await expect(byId(page, 'dtm/1/1')).toHaveClass(/ant-picker-disabled/);
    await expect(byId(page, 'dtm/1/1').locator('input')).toBeDisabled();
    await expect(byId(page, 'tm/1/1')).toHaveClass(/ant-picker-disabled/);
    await expect(byId(page, 'tm/1/1').locator('input')).toBeDisabled();

    await expect(byId(page, 'cne-single/1/1')).toBeDisabled();
    await expect(byId(page, 'cne-multiple/1/1')).toBeDisabled();
    await expect(byId(page, answerId('cne-single-radio/1/1', undefined, 'c1')).locator('.ant-radio')).toHaveClass(/ant-radio-disabled/);
    await expect(byId(page, answerId('cne-single-radio/1/1', undefined, 'c1')).locator('.ant-radio input')).toBeDisabled();
    await expect(byId(page, answerId('cne-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox')).toHaveClass(/ant-checkbox-disabled/);
    await expect(byId(page, answerId('cne-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox input')).toBeDisabled();

    await expect(byId(page, 'cwe-single/1/1')).toBeDisabled();
    await expect(byId(page, 'cwe-multiple/1/1')).toBeDisabled();
    await expect(byId(page, answerId('cwe-single-radio/1/1', undefined, 'c1')).locator('.ant-radio')).toHaveClass(/ant-radio-disabled/);
    await expect(byId(page, answerId('cwe-single-radio/1/1', undefined, 'c1')).locator('.ant-radio input')).toBeDisabled();
    await expect(byId(page, answerId('cwe-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox')).toHaveClass(/ant-checkbox-disabled/);
    await expect(byId(page, answerId('cwe-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox input')).toBeDisabled();

    // with values
    await expect(byId(page, 'g2/st/1/1')).toBeDisabled();
    await expect(byId(page, answerId('g2/bl/1/1', 'true')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('g2/bl/1/1', 'false')).locator('input')).toBeDisabled();
    await expect(byId(page, 'g2/int/1/1')).toBeDisabled();
    await expect(byId(page, 'g2/real/1/1')).toBeDisabled();
    await expect(byId(page, 'g2/dt/1/1')).toHaveClass(/ant-picker-disabled/);
    await expect(byId(page, 'g2/dt/1/1').locator('input')).toBeDisabled();
    await expect(byId(page, 'g2/dtm/1/1')).toHaveClass(/ant-picker-disabled/);
    await expect(byId(page, 'g2/dtm/1/1').locator('input')).toBeDisabled();
    await expect(byId(page, 'g2/tm/1/1')).toHaveClass(/ant-picker-disabled/);
    await expect(byId(page, 'g2/tm/1/1').locator('input')).toBeDisabled();

    await expect(byId(page, 'g2/cne-single/1/1')).toBeDisabled();
    await expect(byId(page, 'g2/cne-multiple/1/1')).toBeDisabled();
    await expect(byId(page, answerId('g2/cne-single-radio/1/1', undefined, 'c1')).locator('.ant-radio')).toHaveClass(/ant-radio-disabled/);
    await expect(byId(page, answerId('g2/cne-single-radio/1/1', undefined, 'c1')).locator('.ant-radio input')).toBeDisabled();
    await expect(byId(page, answerId('g2/cne-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox')).toHaveClass(/ant-checkbox-disabled/);
    await expect(byId(page, answerId('g2/cne-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox input')).toBeDisabled();

    await expect(byId(page, 'g2/cwe-single/1/1')).toBeDisabled();
    await expect(byId(page, 'g2/cwe-multiple/1/1')).toBeDisabled();
    await expect(byId(page, answerId('#g2/cwe-single-radio/1/1', undefined, 'c1')).locator('.ant-radio')).toHaveClass(/ant-radio-disabled/);
    await expect(byId(page, answerId('#g2/cwe-single-radio/1/1', undefined, 'c1')).locator('.ant-radio input')).toBeDisabled();
    await expect(byId(page, answerId('#g2/cwe-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox')).toHaveClass(/ant-checkbox-disabled/);
    await expect(byId(page, answerId('#g2/cwe-multiple-checkbox/1/1', undefined, 'c1')).locator('.ant-checkbox input')).toBeDisabled();

    // selected answers in multiple selection ac should not have the x button
    const cneButtons = page.locator('#item-g2\\/cne-multiple\\/1\\/1 .autocomp_selected li>button');
    await expect(cneButtons).toHaveText(['×', '×']);
    await expect(cneButtons.first()).not.toBeVisible();
    const cweButtons = page.locator('#item-g2\\/cwe-multiple\\/1\\/1 .autocomp_selected li>button');
    await expect(cweButtons).toHaveText(['×', '×']);
    await expect(cweButtons.first()).not.toBeVisible();

    // the other input field in CWE radio layout should be disabled too
    await expect(byId(page, answerId('g2/cwe-single-radio/1/1', '_otherValue'))).toBeDisabled();
    // the other input field in CWE checkbox layout should be disabled too
    await expect(byId(page, answerId('g2/cwe-multiple-checkbox/1/1', '_otherValue'))).toBeDisabled();
  });
});

test.describe('Questionnaire with readOnly and repeats items', () => {
  test('should show disabled "+" button', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-readonly-repeating-items.json', 'formContainer', { fhirVersion: 'R4' });
    const addQ1 = byId(page, 'add-q1/1');
    await expect(addQ1).toBeVisible();
    await expect(addQ1).toBeDisabled();
    const addG1q1 = byId(page, 'add-g1q1/1/1');
    await expect(addG1q1).toBeVisible();
    await expect(addG1q1).toBeDisabled();

    const qrPath = path.resolve('test/data/R4/qr-with-readonly-repeating-items.json');
    const qr = JSON.parse(fs.readFileSync(qrPath, 'utf-8'));

    await page.evaluate(({ qr }) => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { qr });

    const addQ1_2 = byId(page, 'add-q1/2');
    await expect(addQ1_2).toBeVisible();
    await expect(addQ1_2).toBeDisabled();
    const delQ1_1 = byId(page, 'del-q1/1');
    await expect(delQ1_1).toBeVisible();
    await expect(delQ1_1).toBeDisabled();
    const q1_1 = byId(page, 'q1/1');
    await expect(q1_1).toBeVisible();
    await expect(q1_1).toBeDisabled();
    await expect(q1_1).toHaveValue('aaa');
    const delQ1_2 = byId(page, 'del-q1/2');
    await expect(delQ1_2).toBeVisible();
    await expect(delQ1_2).toBeDisabled();
    const q1_2 = byId(page, 'q1/2');
    await expect(q1_2).toBeVisible();
    await expect(q1_2).toBeDisabled();
    await expect(q1_2).toHaveValue('bbb');

    const addG1q1_2 = byId(page, 'add-g1q1/1/2');
    await expect(addG1q1_2).toBeVisible();
    await expect(addG1q1_2).toBeDisabled();
    const delG1q1_1 = byId(page, 'del-g1q1/1/1');
    await expect(delG1q1_1).toBeVisible();
    await expect(delG1q1_1).toBeDisabled();
    const g1q1_1 = byId(page, 'g1q1/1/1');
    await expect(g1q1_1).toBeVisible();
    await expect(g1q1_1).toBeDisabled();
    await expect(g1q1_1).toHaveValue('ccc');
    const delG1q1_2 = byId(page, 'del-g1q1/1/2');
    await expect(delG1q1_2).toBeVisible();
    await expect(delG1q1_2).toBeDisabled();
    const g1q1_2 = byId(page, 'g1q1/1/2');
    await expect(g1q1_2).toBeVisible();
    await expect(g1q1_2).toBeDisabled();
    await expect(g1q1_2).toHaveValue('ddd');
  });
});

test.describe('templateOption readonlyMode', () => {
  test('should render the form in readonly mode', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'bit-of-everything.json', 'formContainer', { fhirVersion: 'R4', readonlyMode: true });
    await expect(page.locator('input[disabled]')).toHaveCount(20);
  });
});
