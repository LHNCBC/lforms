import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId } from '../support/lforms-helpers';

const fhirVersions = ['R4', 'R5'];

for (const fhirVersion of fhirVersions) {
  test.describe(`AnswerOption display - ${fhirVersion}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
    });

    test('should display answerOption correctly even when missing either a code or a display string (but not both)', async ({ page }) => {
      await addFormToPage(page, 'questionnaire-answerOption-without-code-or-display.json', 'formContainer', { fhirVersion });
      await byId(page, '/answers/1').click();
      const listItems = page.locator('#lhc-tools-searchResults li');
      await expect(listItems).toHaveCount(3);
      await expect(listItems.nth(0)).toContainText('c1');
      await expect(listItems.nth(1)).toContainText('Answer 2');
      await expect(listItems.nth(2)).toContainText('Answer 3');
    });

    test('should use openLabel for "other" answer option', async ({ page }) => {
      await addFormToPage(page, 'q-with-openLabel.json', 'formContainer', { fhirVersion });
      await expect(byId(page, 'group1-item1/1/1|_other')).toContainText('Other event (specify)');
      await expect(byId(page, 'group1-item2/1/1|_other')).toContainText('Other event (specify)');
    });

    test('should use openLabel for "other" answer option in matrix layout', async ({ page }) => {
      await addFormToPage(page, 'q-with-openLabel-matrix-layout.json', 'formContainer', { fhirVersion });
      await expect(byId(page, '/matrixTable1/1_header_other')).toContainText('Other event (specify) 1');
      await expect(byId(page, '/matrixTable2/1_header_other')).toContainText('Other event (specify) 2');
    });
  });
}
