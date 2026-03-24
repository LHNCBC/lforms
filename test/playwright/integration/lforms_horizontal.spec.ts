import { test, expect } from '@playwright/test';
import { byId, openFormByIndex } from '../support/lforms-helpers';

const LONG = { timeout: 30000 };

test.describe('horizontal table', () => {
  const addRemoveButtons = '.lhc-float-button';

  test('should handle add/remove buttons in the horizontal table', async ({ page }) => {
    // USSGFHTHorizontal is at index 2
    await openFormByIndex(page, 2);

    // should have one add button in the horizontal table when the form loads
    const buttons = page.locator(addRemoveButtons);
    await expect(buttons.nth(2)).toBeVisible();
    await expect(buttons.nth(2)).toContainText("+ This family member's history of disease");

    // should have two remove buttons visible after the user adds a row
    await buttons.nth(2).click();
    await expect(buttons).toHaveCount(6);
    await expect(buttons.nth(2)).toHaveText('-');
    await expect(buttons.nth(3)).toHaveText('-');
    await expect(buttons.nth(4)).toContainText("+ This family member's history of disease");

    // should have three remove buttons visible after the user adds a row
    await buttons.nth(4).click();
    await expect(buttons).toHaveCount(7);
    await expect(buttons.nth(2)).toHaveText('-');
    await expect(buttons.nth(3)).toHaveText('-');
    await expect(buttons.nth(4)).toHaveText('-');
    await expect(buttons.nth(5)).toContainText("+ This family member's history of disease");

    // should have 2 rows after the user removes the 2nd row
    await buttons.nth(3).click();
    await expect(buttons).toHaveCount(6);
    await expect(buttons.nth(2)).toHaveText('-');
    await expect(buttons.nth(3)).toHaveText('-');
    await expect(buttons.nth(4)).toContainText("+ This family member's history of disease");
  });

  test('should not lose focus when the options for an autocompleter change', async ({ page }) => {
    // RxTerms is at index 9
    await openFormByIndex(page, 9);

    const drugNameField = '/X-002/nameAndRoute/1/1';
    const strengthField = '/X-002/strengthAndForm/1/1';

    await byId(page, drugNameField).click();
    await byId(page, drugNameField).pressSequentially('aspercreme', { delay: 50 });
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible(LONG);
    await byId(page, drugNameField).press('ArrowDown');
    await page.keyboard.press('Tab');
    await expect(byId(page, strengthField)).toBeFocused();
  });

  test('should populate the RxCUI field on the RxTerms form', async ({ page }) => {
    // RxTerms is at index 9
    await openFormByIndex(page, 9);

    const drugNameField = '/X-002/nameAndRoute/1/1';
    const strengthField = '/X-002/strengthAndForm/1/1';
    const rxcuiField = '/X-002/RxCUI/1/1';

    // Select a drug first
    await byId(page, drugNameField).click();
    await byId(page, drugNameField).pressSequentially('aspercreme', { delay: 50 });
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible(LONG);
    await byId(page, drugNameField).press('ArrowDown');
    await page.keyboard.press('Tab');

    // Now select a strength
    await expect(page.locator('#lhc-tools-searchResults')).toBeVisible(LONG);
    await byId(page, strengthField).press('ArrowDown');
    await page.keyboard.press('Tab');
    await expect(byId(page, strengthField)).toHaveValue('10% Cream', LONG);
    await expect(byId(page, rxcuiField)).toHaveValue('1101827', LONG);
  });
});
