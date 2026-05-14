import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId, answerId } from '../support/lforms-helpers';

test.describe('enableWhen where the references form a loop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-enableWhen-with-reference-loop.json', 'formContainer', { fhirVersion: 'R4' });
  });

  test('should show all items initially', async ({ page }) => {
    await expect(byId(page, answerId('item1/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('item1/1', 'false')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('item1/1', 'null')).locator('input')).not.toBeChecked();

    await expect(byId(page, answerId('item2/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('item2/1', 'false')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('item2/1', 'null')).locator('input')).not.toBeChecked();

    await expect(byId(page, answerId('item3/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('item3/1', 'false')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('item3/1', 'null')).locator('input')).not.toBeChecked();
  });

  test('should work for all enableWhen', async ({ page }) => {
    // item 1 controls item 3
    await byId(page, answerId('item1/1', 'true')).locator('input').click();
    await expect(byId(page, 'label-item3/1')).not.toBeAttached();
    await expect(byId(page, answerId('item3/1', 'true'))).not.toBeAttached();
    await expect(byId(page, answerId('item3/1', 'false'))).not.toBeAttached();
    await expect(byId(page, answerId('item3/1', 'null'))).not.toBeAttached();

    await byId(page, answerId('item1/1', 'null')).locator('input').click();
    await expect(byId(page, 'label-item3/1')).toBeVisible();
    await expect(byId(page, answerId('item3/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('item3/1', 'false')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('item3/1', 'null')).locator('input')).not.toBeChecked();

    // item 2 controls item 3
    await byId(page, answerId('item2/1', 'true')).locator('input').click();
    await expect(byId(page, 'label-item3/1')).not.toBeAttached();
    await expect(byId(page, answerId('item3/1', 'true'))).not.toBeAttached();
    await expect(byId(page, answerId('item3/1', 'false'))).not.toBeAttached();
    await expect(byId(page, answerId('item3/1', 'null'))).not.toBeAttached();

    await byId(page, answerId('item2/1', 'null')).locator('input').click();
    await expect(byId(page, 'label-item3/1')).toBeVisible();
    await expect(byId(page, answerId('item3/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('item3/1', 'false')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('item3/1', 'null')).locator('input')).not.toBeChecked();

    // item 3 controls item 1 and item 2
    await byId(page, answerId('item3/1', 'true')).locator('input').click();
    await expect(byId(page, 'label-item1/1')).not.toBeAttached();
    await expect(byId(page, answerId('item1/1', 'true'))).not.toBeAttached();
    await expect(byId(page, answerId('item1/1', 'false'))).not.toBeAttached();
    await expect(byId(page, answerId('item1/1', 'null'))).not.toBeAttached();

    await expect(byId(page, 'label-item2/1')).not.toBeAttached();
    await expect(byId(page, answerId('item2/1', 'true'))).not.toBeAttached();
    await expect(byId(page, answerId('item2/1', 'false'))).not.toBeAttached();
    await expect(byId(page, answerId('item2/1', 'null'))).not.toBeAttached();
  });
});
