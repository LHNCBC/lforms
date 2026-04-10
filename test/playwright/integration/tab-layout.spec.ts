import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, addFormToPage } from '../support/lforms-helpers';

test.describe('Tab Layout', () => {
  test('should render tab layout', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', { fhirVersion: 'R4' });
    const q1 = byId(page, 'q1/1/1/1');
    const q2 = byId(page, 'q2/1/1/1');
    await expect(q1).toBeVisible();
    await expect(q2).not.toBeAttached();
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(q1).not.toBeVisible();
    await expect(q2).toBeVisible();
  });

  test('enableWhen should work across tabs', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-with-enableWhen.json', 'formContainer', { fhirVersion: 'R4' });
    await expect(byId(page, 'Q1/1/1/1|true').locator('input')).not.toBeChecked();
    await expect(byId(page, 'Q1/1/1/1|false').locator('input')).not.toBeChecked();
    await expect(byId(page, 'Q1/1/1/1|null').locator('input')).toBeChecked();

    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'Q1-not-exists/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-not-true/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-exists/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-true/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-false/1/1/1')).not.toBeAttached();

    await page.locator('button#nz-tabs-0-tab-0').click();
    await byId(page, 'Q1/1/1/1|true').locator('input').click();
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'Q1-not-exists/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-not-true/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-exists/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-true/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-false/1/1/1')).not.toBeAttached();
    // Tab Three is shown by enableWhen condition.
    await page.locator('button#nz-tabs-0-tab-2').click();
    await expect(byId(page, 'q3/1/1/1')).toBeVisible();

    await page.locator('button#nz-tabs-0-tab-0').click();
    await byId(page, 'Q1/1/1/1|false').locator('input').click();
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'Q1-not-exists/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-not-true/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-exists/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-true/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-false/1/1/1')).toBeVisible();
    // Tab Three is hidden by enableWhen condition.
    await expect(page.locator('button#nz-tabs-0-tab-2')).not.toBeAttached();
  });

  test('should render tab layout on nested layouts', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-nested-layout.json', 'formContainer', { fhirVersion: 'R4' });
    // Horizontal layout under Tab One.
    await expect(byId(page, '/g3/g1m1/1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g3/g1m2/1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g3/g1m3/1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g3/g1m4/1/1/1/1')).toBeVisible();
    const nestedQ1 = byId(page, 'q1/1/1/1/1/1');
    const nestedQ2 = byId(page, 'q2/1/1/1/1/1');
    await expect(nestedQ1).not.toBeAttached();
    // Nested tabs layout under Tab Two.
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(nestedQ1).toBeVisible();
    await expect(nestedQ2).not.toBeAttached();
    await page.locator('button#nz-tabs-1-tab-1').click();
    await expect(nestedQ1).not.toBeVisible();
    await expect(nestedQ2).toBeVisible();

    // Pick something on the first question in the first tab.
    // enableWhen conditions on the nested tab container item
    // should hide it in the second main tab.
    await page.locator('button#nz-tabs-0-tab-0').click();
    const field = byId(page, '/g3/g1m1/1/1/1/1');
    await field.click();
    await field.press('ArrowDown');
    await field.press('Enter');
    await page.locator('button#nz-tabs-0-tab-1').click();
    // The nested tabs are now hidden.
    await expect(byId(page, 'q1/1/1/1/1/1')).not.toBeAttached();
  });
});
