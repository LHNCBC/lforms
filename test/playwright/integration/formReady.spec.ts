// Tests the onFormReady event

import { test, expect } from '@playwright/test';
import { waitForLFormsReady } from '../support/lforms-helpers';
import fs from 'fs';
import path from 'path';

test.describe('onFormReady', () => {
  /**
   *  Tests that the given form data file can be successfully loaded.
   * @param filePath the relative path for the form definition under test/data.
   */
  async function testFormLoad(page, filePath: string) {
    const container = 'formContainer';
    const absPath = path.resolve('test/data/' + filePath);
    const formDef = JSON.parse(fs.readFileSync(absPath, 'utf-8'));

    // Do not use util.addFormToPage, which waits for the form to be visible.
    // addFormDataToPage waits for LForms.Util.addFormToPage, which waits for
    // the onFormReady event.
    await page.evaluate(async ({ formDef, container }) => {
      document.getElementById(container)!.innerHTML = '';
      await (window as any).LForms.Util.addFormToPage(formDef, container);
    }, { formDef, container });

    await expect(page.locator('wc-lhc-form')).toBeAttached({ timeout: 10000 });
    await expect(page.locator('wc-lhc-form .lhc-question').first()).toBeAttached({ timeout: 10000 });
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
  });

  test('should not send onFormReady until the form is visible on the page (case 1, no answerValueSets)', async ({ page }) => {
    await testFormLoad(page, 'R4/phq9.json');
  });

  test('should not send onFormReady until the form is visible on the page (case 2, with answerValueSets)', async ({ page }) => {
    await testFormLoad(page, 'R4/q-with-answerValueSet-autocomplete.json');
  });
});
