import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId } from '../support/lforms-helpers';

test.describe('entryFormat extension', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-with-entryFormat.json', 'formContainer', { fhirVersion: 'R4' });
  });

  test('should display the placeholders imported from the entryFormat extensions', async ({ page }) => {
    await expect(byId(page, '/type-integer/1')).toHaveAttribute('placeholder', 'integer: a entry format from questionnaire');
    await expect(byId(page, '/type-decimal/1')).toHaveAttribute('placeholder', 'decimal: a entry format from questionnaire');
    await expect(byId(page, '/type-string/1')).toHaveAttribute('placeholder', 'string: a entry format from questionnaire');
    await expect(page.locator('#\\/type-date\\/1 input')).toHaveAttribute('placeholder', 'date: a entry format from questionnaire');
    await expect(page.locator('#\\/type-dateTime\\/1 input')).toHaveAttribute('placeholder', 'dateTime: a entry format from questionnaire');
    await expect(page.locator('#\\/type-time\\/1 input')).toHaveAttribute('placeholder', 'time: a entry format from questionnaire');
    await expect(byId(page, '/type-choice/1')).toHaveAttribute('placeholder', 'choice: a entry format from questionnaire');
    await expect(byId(page, '/type-open-choice/1')).toHaveAttribute('placeholder', 'open-choice: a entry format from questionnaire');
    await expect(byId(page, '/type-choice-m/1')).toHaveAttribute('placeholder', 'choice repeats: a entry format from questionnaire');
    await expect(byId(page, '/type-open-choice-m/1')).toHaveAttribute('placeholder', 'open-choice repeats: a entry format from questionnaire');
  });
});
