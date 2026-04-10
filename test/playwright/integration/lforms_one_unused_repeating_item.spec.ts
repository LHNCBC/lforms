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
      await byId(page, '/54126-8/54125-0/1/1').pressSequentially('a name');
      await byId(page, 'add-/54126-8/54125-0/1/1').click();
      await expect(byId(page, 'add-content-/54126-8/54125-0/1/1')).not.toBeAttached();

      // should not add a new one when there is an unused item and an used item
      await byId(page, 'add-/54126-8/54125-0/1/2').click();
      await expect(byId(page, 'add-content-/54126-8/54125-0/1/2').first()).toBeVisible();

      // should not add a new one when a previous used item becomes unused
      await byId(page, '/54126-8/54125-0/1/2').pressSequentially('another name');
      await byId(page, '/54126-8/54125-0/1/1').clear();
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
      const diseaseType1 = byId(page, '/54126-8/54137-5/54140-9/1/1/1');
      await diseaseType1.click();
      await pressCypressKeys(diseaseType1, '{downArrow}{enter}');
      await byId(page, 'add-/54126-8/54137-5/1/1').click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/1')).not.toBeAttached();

      // should not add a new one when an used item has been hidden by skip logic
      const otherDisease = byId(page, '/54126-8/54137-5/54130-0/1/2/1');
      await otherDisease.click();
      await pressCypressKeys(otherDisease, '{downArrow}{enter}');
      const subItem = byId(page, '/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1');
      await expect(subItem).toBeVisible();

      await subItem.pressSequentially('a value');
      await otherDisease.clear();
      await otherDisease.blur();
      await expect(subItem).not.toBeAttached();
      const addSection2 = byId(page, 'add-/54126-8/54137-5/1/2');
      await addSection2.scrollIntoViewIfNeeded();
      await addSection2.click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/2').first()).toBeVisible();

      // should not add a new one when previous non-empty items become empty again
      await diseaseType1.clear();
      await diseaseType1.blur();
      await byId(page, '/54126-8/54137-5/54140-9/1/2/1').click();
      await pressCypressKeys(diseaseType1, '{downArrow}{enter}');
      await addSection2.click();
      await expect(byId(page, 'add-content-/54126-8/54137-5/1/2').first()).toBeVisible();
    });
  });

  test.describe('repeating section within a repeating section', () => {
    test('should not add new section if any previous one is empty', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      const addRow = byId(page, 'add-/54114-4/54117-7/1/1');
      await addRow.scrollIntoViewIfNeeded();
      await addRow.click();
      await expect(byId(page, 'add-content-/54114-4/54117-7/1/1').first()).toBeVisible();
      const addSection = byId(page, 'add-/54114-4/1');
      await addSection.scrollIntoViewIfNeeded();
      await addSection.click();
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
      const itemInput1 = byId(page, 'X11/1/1').locator('input');
      await itemInput1.click();
      await itemInput1.pressSequentially('01/01/2022');
      await itemInput1.press('Enter');
      await byId(page, 'add-X1/1').click();
      await expect(byId(page, 'add-content-X1/1')).not.toBeAttached();
      await expect(byId(page, 'X11/2/1').locator('input')).toBeVisible();

      await byId(page, 'add-X1/2').click();
      await expect(byId(page, 'add-content-X1/2').first()).toBeVisible();
      const itemInput2 = byId(page, 'X12/2/1').locator('input');
      await itemInput2.click();
      await itemInput2.pressSequentially('01/01/2022 01:02:03');
      await itemInput2.press('Enter');
      await byId(page, 'add-X1/2').click();
      await expect(byId(page, 'add-content-X1/2')).not.toBeAttached();
      await expect(byId(page, 'X11/3/1').locator('input')).toBeVisible();
    });
  });
});
