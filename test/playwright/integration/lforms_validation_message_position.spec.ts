import { test, expect, type Page } from '@playwright/test';
import { byId, loadFromTestData, waitForLFormsReady } from '../support/lforms-helpers';


/**
 * Types an invalid value into a field, triggers validation by blurring, then
 * clicks back to show the validation popover. Verifies the popover is
 * horizontally aligned with and positioned directly above its input field.
 * @param page - Playwright page
 * @param index - The nth index of the validation popover / input-content div to check
 * @param typeValue - The value to type (should trigger a validation error)
 * @param inputId - The element ID of the input field
 * @param otherEl - The element ID of another field to click (to blur the input)
 */
async function testOneType(page: Page, index: number, typeValue: string, inputId: string, otherEl: string) {
  const input = byId(page, inputId);
  await input.click();
  await input.clear();
  await input.pressSequentially(typeValue);
  await byId(page, otherEl).click();
  await input.click();

  const msgDivs = page.locator('.lhc-validation-popover');
  const contentDivs = page.locator('.lhc-de-input-unit-content');

  const msgRect = await msgDivs.nth(index).boundingBox();
  const contentRect = await contentDivs.nth(index).boundingBox();

  expect(msgRect).toBeTruthy();
  expect(contentRect).toBeTruthy();
  expect(msgRect!.x).toBeCloseTo(contentRect!.x, 0);
  // 35px is the bottom position of the .lhc-validation-popover element, set in validation.css
  expect(msgRect!.y + msgRect!.height).toBeCloseTo(contentRect!.y, 1);
}

test.describe('Validations Message Position', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'validationOnRepeatingItems.json');
  });

  test('Validation messages should be right above the input field', async ({ page }) => {
    const addButtonIds = ['add-/int1/1', 'add-/st1/1', 'add-/group1/1', 'add-/group2/1'];
    const otherEl = '/other/1'; // Use for creating blur event

    // No need to test normal cases that are not repeating.

    // add a repeating item and test message positions
    await byId(page, addButtonIds[0]).click();
    await testOneType(page, 3, 'ss', '/int1/2', otherEl);
    await byId(page, addButtonIds[1]).click();
    await testOneType(page, 5, '55', '/st1/2', otherEl);

    // test validation messages in repeating groups
    await byId(page, addButtonIds[2]).click();
    await testOneType(page, 6, 'ss', '/group1/int1/1/1', otherEl);
    await testOneType(page, 7, '55', '/group1/st1/1/1', otherEl);
    await testOneType(page, 8, 'ss', '/group1/int1/2/1', otherEl);
    await testOneType(page, 9, '55', '/group1/st1/2/1', otherEl);

    await byId(page, addButtonIds[3]).click();
    await testOneType(page, 10, 'ss', '/group2/int1/1/1', otherEl);
    await testOneType(page, 11, '55', '/group2/st1/1/1', otherEl);
    await testOneType(page, 12, 'ss', '/group2/int1/2/1', otherEl);
    await testOneType(page, 13, '55', '/group2/st1/2/1', otherEl);
  });
});
