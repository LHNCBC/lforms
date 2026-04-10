import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady } from '../support/lforms-helpers';
import fs from 'fs';


// build_test.html uses a copy of the transpiled lhc-forms.js in dist/webcomponent/lhc-forms.js
test.describe('build test page', () => {
  const drugNameField = '/dataControlExamples/itemWithExtraData/1/1';

  test('should have a drug name field that autocompletes', async ({ page }) => {
    await page.goto('/test/pages/build_test.html');
    await waitForLFormsReady(page, { fhir: false });
    const field = byId(page, drugNameField);
    await expect(field).toBeVisible();
    await field.pressSequentially('ar');
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible({ timeout: 20000 });
  });
});
