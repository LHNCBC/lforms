import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId } from '../support/lforms-helpers';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Tests of addFormToPage test page', () => {
  test('should have two forms displayed on the page', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'allInOne.json', 'formContainer');
    await addFormToPage(page, 'rxTerms.json', 'formContainer2');
    await expect(page.locator('wc-lhc-form')).toHaveCount(2);
    await expect(page.locator('.lhc-form-title')).toHaveCount(2);
  });

  test('should have a drug name field in the RxTerms form', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'allInOne.json', 'formContainer');
    await addFormToPage(page, 'rxTerms.json', 'formContainer2');
    const rxDrugField = byId(page, '/X-002/nameAndRoute/1/1');
    await expect(rxDrugField).toBeVisible();
    await expect(page.locator('#lhc-tools-searchResults')).not.toBeVisible();
    await rxDrugField.type('ar');
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible();
    await rxDrugField.fill('');
  });

  test('should have a drug name field in the "full featured" form', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'allInOne.json', 'formContainer');
    const ffDrugField = byId(page, '/dataControlExamples/itemWithExtraData/1/1');
    await ffDrugField.click();
    await expect(page.locator('#lhc-tools-searchResults')).not.toBeVisible();
    await ffDrugField.type('ar');
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible();
    await ffDrugField.fill('');
  });

  test('DTM datetime picker should work', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'allInOne.json', 'formContainer');
    const dtmInput = page.locator('#\\/type7\\/1 input');
    await dtmInput.click();
    await page.locator('.ant-picker-now-btn').click();
    await page.locator('.ant-picker-ok button').click();
    const value = await dtmInput.inputValue();
    expect(value).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
  });

  test('should be able to display a very nested form', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'very-nested-form.json', 'formContainer');
    await expect(page.locator('#formContainer')).toContainText('NestedQ');
    await expect(byId(page, 'loadMsg')).toHaveText('');
  });

  test('should display answerValueSet with an old terminology server URL specified at root level', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'preferredTerminologyServer-at-root-level.json', 'formContainer', { fhirVersion: 'R4' });
    await expect(page.locator('.ant-radio-input')).toHaveCount(7);
  });

  test.describe('addFormToPage', () => {
    test('should be able to be called with FHIR Questionnaire', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const fhirData = JSON.parse(fs.readFileSync('test/data/R4/ussg-fhp.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        await (window as any).LForms.Util.addFormToPage(formDef, 'formContainer', { fhirVersion: 'R4' });
      }, { formDef: fhirData });
      await expect(page.locator('.lhc-form-title')).toBeVisible();
      await expect(page.locator('#formContainer')).toContainText('US Surgeon General family health portrait');
    });

    test('should be able to be called with a variable name', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const formDef = JSON.parse(fs.readFileSync('test/data/lforms/FHTData.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        (window as any).FHTData = formDef;
        await (window as any).LForms.Util.addFormToPage('FHTData', 'formContainer');
      }, { formDef });
      await expect(page.locator('#formContainer')).toContainText('USSG-FHT');
    });

    test('should be able to take a form object', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const formDef = JSON.parse(fs.readFileSync('test/data/lforms/FHTData.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        await (window as any).LForms.Util.addFormToPage(formDef, 'formContainer');
      }, { formDef });
      await expect(page.locator('#formContainer')).toContainText('USSG-FHT');
    });

    test('should be able to take a JSON form definition', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const formDef = JSON.parse(fs.readFileSync('test/data/lforms/FHTData.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        await (window as any).LForms.Util.addFormToPage(JSON.stringify(formDef), 'formContainer');
      }, { formDef });
      await expect(page.locator('#formContainer')).toContainText('USSG-FHT');
    });

    test('should be able to hide tree line', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const fhirData = JSON.parse(fs.readFileSync('test/data/lforms/fht-hide-tree-line.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        await (window as any).LForms.Util.addFormToPage(formDef, 'formContainer', { fhirVersion: 'R4' });
      }, { formDef: fhirData });
      await expect(page.locator('.lhc-form-title')).toBeVisible();
      await expect(page.locator('lhc-item.lhc-tree-line')).toHaveCount(0);
    });

    test('should be able to hide indentation', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const fhirData = JSON.parse(fs.readFileSync('test/data/lforms/fht-hide-indentation.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        await (window as any).LForms.Util.addFormToPage(formDef, 'formContainer', { fhirVersion: 'R4' });
      }, { formDef: fhirData });
      await expect(page.locator('.lhc-form-title')).toBeVisible();
      await expect(page.locator('lhc-item.lhc-tree-line')).toHaveCount(0);
      await expect(page.locator('lhc-item.lhc-indentation')).toHaveCount(0);
    });

    test('should be able to hide repetition number', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const fhirData = JSON.parse(fs.readFileSync('test/data/lforms/fht-hide-repetition-number.json', 'utf-8'));
      await page.evaluate(async ({ formDef }) => {
        await (window as any).LForms.Util.addFormToPage(formDef, 'formContainer', { fhirVersion: 'R4' });
      }, { formDef: fhirData });
      await expect(page.locator('.lhc-form-title')).toBeVisible();
      await expect(page.locator('.lf-sn')).toHaveCount(0);
    });

    test('should be able to take a questionnaireResponse in addFormToPage() options', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'fhir-context-q.json', 'formContainer', { fhirVersion: 'R4' });

      await byId(page, '/54126-8/54125-0/1/1').fill('Adam');
      await byId(page, '/54126-8/54128-4/1/1').click();
      await byId(page, '/54126-8/54128-4/1/1').press('ArrowDown');
      await byId(page, '/54126-8/54128-4/1/1').press('ArrowDown');
      await byId(page, '/54126-8/54128-4/1/1').press('Enter');
      const beforeValue = await byId(page, '/54126-8/54128-4/1/1').inputValue();

      const { q, qr } = await page.evaluate(() => {
        const win = window as any;
        return {
          q: win.LForms.Util.getFormFHIRData('Questionnaire', 'R4'),
          qr: win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
        };
      });

      await byId(page, '/54126-8/54125-0/1/1').fill('Bla');
      await byId(page, '/54126-8/54128-4/1/1').click();
      await byId(page, '/54126-8/54128-4/1/1').press('ArrowDown');
      await byId(page, '/54126-8/54128-4/1/1').press('Enter');

      await page.evaluate(async ({ q, qr }) => {
        await (window as any).LForms.Util.addFormToPage(q, 'formContainer', { questionnaireResponse: qr });
      }, { q, qr });
      await expect(page.locator('.lhc-form-title')).toBeVisible();

      await expect(byId(page, '/54126-8/54125-0/1/1')).toHaveValue('Adam');
      const afterValue = await byId(page, '/54126-8/54128-4/1/1').inputValue();
      expect(afterValue).toBe(beforeValue);
    });
  });

  test.describe('addFormToPage return values', () => {
    test('should return a complete list of the ValueSet loading errors', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const formDef = JSON.parse(fs.readFileSync('test/data/R4/fhir-context-q-wrong-valueset-url-fhircontext.json', 'utf-8'));
      const errCount = await page.evaluate(async ({ formDef }) => {
        const win = window as any;
        win.document.getElementById('formContainer').innerHTML = null;
        try {
          await win.LForms.Util.addFormToPage(formDef, 'formContainer');
          return -1; // should not succeed
        } catch (errors: any) {
          return errors.length;
        }
      }, { formDef });
      expect(errCount).toBe(2);
    });
  });
});
