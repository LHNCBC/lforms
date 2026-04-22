import { test, expect } from '@playwright/test';
import { addFormToPage, byId, escapeIdSelector, fhirVersions, TIMEOUT_30S, waitForLFormsReady } from '../support/lforms-helpers';

// Field IDs from the USSG-FHT form
const ethnicityId = '/54126-8/54133-4/1/1';
const diseaseId = '/54126-8/54137-5/54140-9/1/1/1';

for (const fhirVersion of fhirVersions) {
  test.describe(`${fhirVersion}`, () => {
    test.describe('External prefetch answerValueSets', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'fhir-context-q.json', 'formContainer', { fhirVersion });
      });

      test('should be retrieved when a terminology server is specified', async ({ page }) => {
        await expect(page.locator('#label-' + escapeIdSelector('54127-6'))).toBeVisible(TIMEOUT_30S);
        const field = byId(page, '/54126-8/54128-4/1/1');
        await field.click();
        await page.locator('#lhc-tools-searchResults li:nth-child(3)').click();
        await expect(field).not.toHaveValue('', TIMEOUT_30S);
      });

      test('should be retrieved when a terminology server is not specified', async ({ page }) => {
        const field = byId(page, '/54114-4/54122-7/1/1');
        await field.click();
        await page.locator('#lhc-tools-searchResults li:nth-child(3)').click();
        await expect(field).not.toHaveValue('', TIMEOUT_30S);
      });
    });

    test.describe('External autocomplete answerValueSets', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'fhir-context-q.json', 'formContainer', { fhirVersion });
      });

      test('should be able to search via ValueSet expansion', async ({ page }) => {
        const ethnicity = byId(page, ethnicityId);
        await ethnicity.click();
        await ethnicity.pressSequentially('arg');
        await expect(page.locator('#lhc-tools-searchResults li').first()).toHaveText('Argentinean', TIMEOUT_30S);
        await ethnicity.press('Escape');

        const disease = byId(page, diseaseId);
        await disease.click();
        await disease.pressSequentially('arm');
        await expect(page.locator('#lhc-tools-searchResults li').first()).toHaveText('Arm pain', TIMEOUT_30S);
        await page.locator('#lhc-tools-searchResults li').first().click();
        await expect(disease).toHaveValue('Arm pain', TIMEOUT_30S);
      });
    });

    if (fhirVersion === 'R4') {
      test.describe('External prefetch answerValueSets with no FHIR context', () => {
        test.beforeEach(async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await page.evaluate(() => {
            (window as any).LForms.fhirContext = null;
            (window as any).LForms._valueSetAnswerCache = {};
          });
        });

        test('should be retrieved when a terminology server is specified', async ({ page }) => {
          await addFormToPage(page, 'bit-of-everything.json', 'formContainer', { fhirVersion });
          const item10 = byId(page, 'Item10/1/1');
          await item10.click();
          await page.locator('#lhc-tools-searchResults li:nth-child(4)').click();
          await expect(item10).not.toHaveValue('', TIMEOUT_30S);
        });
      });
    }
  });
}
