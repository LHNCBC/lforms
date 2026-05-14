import { test, expect } from '@playwright/test';
import { byId, expectLoadButton, TIMEOUT_30S, uploadFile, waitForLFormsReady } from '../support/lforms-helpers';

test.describe('valueExpression on repeating items', () => {
  test('should create repeating items with correct SN.', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await page.click('#hideRepetitionNumber');
    await expectLoadButton(page, 'Load Form From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-repeating-item-calculatedExpression.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A list of Observations - for testing only', TIMEOUT_30S);

    await expect(byId(page, 'item-/code/1/1').locator('.lf-sn')).toHaveText('1.1');
    await expect(byId(page, 'item-/code/1/2').locator('.lf-sn')).toHaveText('1.2');
    await expect(byId(page, 'item-/code/1/3').locator('.lf-sn')).toHaveText('1.3');
    await expect(byId(page, 'item-/code/1/20').locator('.lf-sn')).toHaveText('1.20');

    await expect(byId(page, 'item-/display/1/1').locator('.lf-sn')).toHaveText('1.1');
    await expect(byId(page, 'item-/display/1/2').locator('.lf-sn')).toHaveText('1.2');
    await expect(byId(page, 'item-/display/1/3').locator('.lf-sn')).toHaveText('1.3');
    await expect(byId(page, 'item-/display/1/20').locator('.lf-sn')).toHaveText('1.20');
  });
});
