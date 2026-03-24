import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, uploadFile, waitForLFormsReady } from '../support/lforms-helpers';

test.describe('Unused repeating item/section control', () => {

  test.describe('on repeating items', () => {
    test('should handle unused repeating item popover warnings', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical

      // should not add a new one when there is an unused item
      await byId(page, 'add-/54126-8/54125-0/1/1').click();
      await expect(byId(page, 'add-content-/54126-8/54125-0/1/1').first()).toBeVisible();

      // should add a new one when there is no unused item
      await byId(page, '/54126-8/54125-0/1/1').fill('a name');
      await byId(page, 'add-/54126-8/54125-0/1/1').click();
      await expect(byId(page, 'add-content-/54126-8/54125-0/1/1')).not.toBeAttached();

      // should not add a new one when there is an unused item and an used item
      await byId(page, 'add-/54126-8/54125-0/1/2').click();
      await expect(byId(page, 'add-content-/54126-8/54125-0/1/2').first()).toBeVisible();

      // should not add a new one when a previous used item becomes unused
      await byId(page, '/54126-8/54125-0/1/2').fill('another name');
      await byId(page, '/54126-8/54125-0/1/1').fill('');
      await byId(page, 'add-/54126-8/54125-0/1/2').click();
      await expect(byId(page, 'add-content-/54126-8/54125-0/1/2').first()).toBeVisible();
    });
  });

  test.describe('on repeating sections', () => {
    test('should handle unused repeating section popover warnings', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical

      // should not add a new one when all items in the section are empty
      await byId(page, 'add-/54126-8/54137-5/1/1').click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/1').first()).toBeVisible();

      // should add a new one when at least one item in the section is not empty
      await byId(page, '/54126-8/54137-5/54140-9/1/1/1').click();
      await pressCypressKeys(byId(page, '/54126-8/54137-5/54140-9/1/1/1'), '{downArrow}{enter}');
      await byId(page, 'add-/54126-8/54137-5/1/1').click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/1')).not.toBeAttached();

      // should not add a new one when an used item has been hidden by skip logic
      await byId(page, '/54126-8/54137-5/54130-0/1/2/1').click();
      await pressCypressKeys(byId(page, '/54126-8/54137-5/54130-0/1/2/1'), '{downArrow}{enter}');
      await expect(byId(page, '/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1')).toBeVisible();

      await byId(page, '/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1').fill('a value');
      await byId(page, '/54126-8/54137-5/54130-0/1/2/1').fill('');
      await byId(page, '/54126-8/54137-5/54130-0/1/2/1').blur();
      await expect(byId(page, '/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1')).not.toBeAttached();
      await byId(page, 'add-/54126-8/54137-5/1/2').scrollIntoViewIfNeeded();
      await byId(page, 'add-/54126-8/54137-5/1/2').click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/2').first()).toBeVisible();

      // should not add a new one when previous non-empty items become empty again
      await byId(page, '/54126-8/54137-5/54140-9/1/1/1').fill('');
      await byId(page, '/54126-8/54137-5/54140-9/1/1/1').blur();
      await byId(page, '/54126-8/54137-5/54140-9/1/2/1').click();
      await pressCypressKeys(byId(page, '/54126-8/54137-5/54140-9/1/1/1'), '{downArrow}{enter}');
      await byId(page, 'add-/54126-8/54137-5/1/2').click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/2').first()).toBeVisible();
    });
  });

  test.describe('repeating section within a repeating section', () => {
    test('should not add new section if any previous one is empty', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      await byId(page, 'add-/54114-4/54117-7/1/1').scrollIntoViewIfNeeded();
      await byId(page, 'add-/54114-4/54117-7/1/1').click();
      await expect(byId(page, 'add-content-/54114-4/54117-7/1/1').first()).toBeVisible();
      await byId(page, 'add-/54114-4/1').scrollIntoViewIfNeeded();
      await byId(page, 'add-/54114-4/1').click();
      await expect(byId(page, 'add-content-/54114-4/1').first()).toBeVisible();
    });
  });

  test.describe('repeating section containing date typed questions', () => {
    test('should not add new section if any DT/DTM fields are empty', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await expect(page.locator('#loadBtn')).toContainText('Load Form From File');
      await uploadFile(page, '#fileAnchor', 'test/data/R4/date-in-repeating-group.json');
      await expect(page.locator('.lhc-form-title')).toContainText('Demo form with DT, DTM in repeating group');

      await byId(page, 'add-X1/1').click();
      await expect(byId(page, 'add-content-X1/1').first()).toBeVisible();
      await byId(page, 'X11/1/1').locator('input').click();
      await byId(page, 'X11/1/1').locator('input').pressSequentially('01/01/2022');
      await byId(page, 'X11/1/1').locator('input').press('Enter');
      await byId(page, 'add-X1/1').click();
      await expect(byId(page, 'add-content-X1/1')).not.toBeAttached();
      await expect(byId(page, 'X11/2/1').locator('input')).toBeVisible();

      await byId(page, 'add-X1/2').click();
      await expect(byId(page, 'add-content-X1/2').first()).toBeVisible();
      await byId(page, 'X12/2/1').locator('input').click();
      await byId(page, 'X12/2/1').locator('input').pressSequentially('01/01/2022 01:02:03');
      await byId(page, 'X12/2/1').locator('input').press('Enter');
      await byId(page, 'add-X1/2').click();
      await expect(byId(page, 'add-content-X1/2')).not.toBeAttached();
      await expect(byId(page, 'X11/3/1').locator('input')).toBeVisible();
    });
  });
});
