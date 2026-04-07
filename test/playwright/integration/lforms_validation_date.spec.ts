import { test, expect } from '@playwright/test';
import { byId, loadFromTestData, waitForLFormsReady } from '../support/lforms-helpers';

test.describe('form validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
  });

  test('DT data type should work', async ({ page }) => {
    await loadFromTestData(page, 'test-date-validation.json');

    const dtEl = byId(page, 'item-/required_dt/1');
    const otherEl = byId(page, '/required_tx/1');

    let dateStr = '02/032019';
    await dtEl.locator('input').clear();
    await dtEl.locator('input').pressSequentially(dateStr);
    await otherEl.click();
    await expect(dtEl.locator('input')).toHaveValue('');

    dateStr = '02/03/2019';
    await dtEl.locator('input').clear();
    await dtEl.locator('input').pressSequentially(dateStr);
    await otherEl.click();
    await expect(dtEl.locator('input')).toHaveValue(dateStr);
  });
});
