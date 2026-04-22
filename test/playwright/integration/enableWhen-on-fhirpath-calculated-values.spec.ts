import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId, answerId } from '../support/lforms-helpers';

// Tests the interaction between enableWhen and calculatedExpression.
test.describe('enableWhen on calculatedExpression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'enableWhenOnCalculatedValueFromFHIRPath.json', 'formContainer', { fhirVersion: 'R4' });
  });

  test('should show the positive/negative results', async ({ page }) => {
    await byId(page, answerId('Q1apples/1', 'http://loinc.org', 'LA33-6')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('1');
    await byId(page, answerId('Q2berries/1', 'http://loinc.org', 'LA33-6')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('2');
    await byId(page, answerId('Q3cherries/1', 'http://loinc.org', 'LA33-6')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('3');
    await byId(page, answerId('Q4dates/1', 'http://loinc.org', 'LA33-6')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('4');
    // the fifth item has no answer yet. result items should not be displayed
    await expect(byId(page, 'posResultInterpretation/1')).not.toBeAttached();
    await expect(byId(page, 'negResultInterpretation/1')).not.toBeAttached();
    await byId(page, answerId('Q5figs/1', 'http://loinc.org', 'LA33-6')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('5');

    // all conditions met, positive result item should show
    await expect(byId(page, 'posResultInterpretation/1')).toBeVisible();
    await expect(byId(page, 'posResultInterpretation/1')).toHaveValue('positive.');
    await expect(byId(page, 'negResultInterpretation/1')).not.toBeAttached();

    // select "No", there are still 4 "Yes" remaining
    await byId(page, answerId('Q1apples/1', 'http://loinc.org', 'LA32-8')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('4');
    await expect(byId(page, 'posResultInterpretation/1')).toBeVisible();
    await expect(byId(page, 'posResultInterpretation/1')).toHaveValue('positive.');
    await expect(byId(page, 'negResultInterpretation/1')).not.toBeAttached();

    // select another "No", 3 "Yes" remaining, replaced by negative
    await byId(page, answerId('Q2berries/1', 'http://loinc.org', 'LA32-8')).locator('input').click();
    await expect(byId(page, 'fruitScore/1')).toHaveValue('3');
    await expect(byId(page, 'posResultInterpretation/1')).not.toBeAttached();
    await expect(byId(page, 'negResultInterpretation/1')).toBeVisible();
    await expect(byId(page, 'negResultInterpretation/1')).toHaveValue('negative.');
  });
});
