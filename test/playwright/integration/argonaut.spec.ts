import { test, expect } from '@playwright/test';
import { addFormToPage, escapeIdSelector, fhirVersions, waitForLFormsReady } from '../support/lforms-helpers';

// Testing that questionnaire-hidden extension works as expected.
for (const fhirVersion of fhirVersions) {
  test.describe(`${fhirVersion}: questionnaire-hidden extension`, () => {
    test('Instructions field G0.d should be hidden', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'Argonaut-questionnaire-questionnaire-example-asq3.json', 'formContainer', { fhirVersion });
      await expect(page.locator('#label-' + escapeIdSelector('G0.d/1/1'))).toHaveCount(0);
    });

    test('non-hidden field G1/G1.4 should be displayed', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'Argonaut-questionnaire-questionnaire-example-asq3.json', 'formContainer', { fhirVersion });
      await expect(page.locator('.lhc-form-title')).toBeVisible();
      await expect(page.locator('#label-' + escapeIdSelector('G1.4/1/1'))).toBeVisible();
    });
  });
}
