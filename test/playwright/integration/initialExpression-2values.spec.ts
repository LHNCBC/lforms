import { test, expect } from '@playwright/test';
import { addFormToPage, byId, TIMEOUT_30S, waitForLFormsReady } from '../support/lforms-helpers';

// The project root directory is the root for the cypress server
test.describe('initialExpression with multiple values', () => {
  const field1 = 'answersFromParentQR/1/1/1';
  const field2 = 'answersFromParentQR/1/1/2';
  const answerField = 'questionUsingParentQRAnswersAsList/1/1/1';

  test('should add repeating items and set initial values', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    // This uses a form that is based on a user's form
    await addFormToPage(page, 'questionnaire-initialExpression-2values.json', 'formContainer', { fhirVersion: 'R4' });

    await expect(byId(page, field1)).toHaveValue('Blue');
    await expect(byId(page, field2)).toHaveValue('Green');

    await byId(page, answerField).click();
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible(TIMEOUT_30S);
    const items = page.locator('#lhc-tools-searchResults li');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toContainText('Blue');
    await expect(items.nth(1)).toContainText('Green');
  });

  test.describe('initialExpression form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'questionnaire-initialExpression.json', 'formContainer', { fhirVersion: 'R4' });
    });

    test('should set repeating string values on a string question', async ({ page }) => {
      await expect(byId(page, 'repeating-string/1')).toHaveValue('aaa');
      await expect(byId(page, 'repeating-string/2')).toHaveValue('bbb');
    });

    test('should set repeating string values on an open-choice question', async ({ page }) => {
      const prev = byId(page, 'repeating-open-choice/1').locator('xpath=preceding-sibling::*[1]');
      await expect(prev).toContainText('aaa');
      await expect(prev).toContainText('bbb');
    });

    test('should set repeating coding values on a choice question', async ({ page }) => {
      const prev = byId(page, 'repeating-choice/1').locator('xpath=preceding-sibling::*[1]');
      await expect(prev).toContainText('Blue');
      await expect(prev).toContainText('Green');
    });
  });
});
