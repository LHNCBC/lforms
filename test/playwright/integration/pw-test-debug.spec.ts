import { test, expect } from '@playwright/test';
import * as path from 'path';
import { uploadFile, waitForLFormsReady, expectLoadButton } from '../support/lforms-helpers';

test('upload with fixed config', async ({ page }) => {
  await page.goto('/test/pages/addFormToPageTest.html');
  await waitForLFormsReady(page);
  await expectLoadButton(page, 'Load From File');
  
  await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
  
  await expect(page.locator('.lhc-form-title')).toContainText('FHIR context 1', { timeout: 30000 });
  await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet', { timeout: 30000 });
});
