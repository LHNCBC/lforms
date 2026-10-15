import { test, expect } from '@playwright/test';
import { addFormToPage, byId, openFormByIndex, waitForLFormsReady } from '../support/lforms-helpers';

test.describe('508', () => {
  const heightField = '/54126-8/8302-2/1/1';
  const heightLabel = 'label[for="/54126-8/8302-2/1/1"]';
  const readerLogEntries = '#reader_log p';

  async function resetReaderLog(page) {
    await page.evaluate(() => {
      const el = document.getElementById('reader_log');
      if (el) {
        el.innerHTML = '';
        el.style.height = 'auto';
        el.style.width = 'auto';
        el.style.top = 'auto';
        el.style.left = 'auto';
      }
    });
  }

  async function expectReaderLogEntries(page, expectedEntries: string[]) {
    await expect(page.locator(readerLogEntries)).toHaveCount(expectedEntries.length);
    for (let i = 0; i < expectedEntries.length; i++) {
      await expect(page.locator(readerLogEntries).nth(i)).toHaveText(expectedEntries[i]);
    }
  }

  async function expectReaderLogEntriesEmpty(page) {
    await expect(page.locator(readerLogEntries)).toHaveCount(0);
  }

  test.describe('screen reader log', () => {
    test('should work for skip logic show/hide', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await resetReaderLog(page);

      // should be empty when the form loads
      await expectReaderLogEntriesEmpty(page);

      // should contain an entry when skip logic shows a field
      await byId(page, heightField).pressSequentially('10');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10']);

      // should not add an extra entry if the field is already showing
      await byId(page, heightField).pressSequentially('2');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10']);

      // should contain an entry when skip logic hides a field
      await byId(page, heightField).press('Backspace');
      await byId(page, heightField).press('Backspace');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10',
          'Hiding Mock-up item: Shown when Height >= 10']);

      // should not add an extra entry if the field is already hidden
      await byId(page, heightField).press('Backspace');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10',
          'Hiding Mock-up item: Shown when Height >= 10',
          'Height requires a value.']);
    });

    test('should add an entry when a section is added or removed', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // Add a section
      await byId(page, 'add-/54126-8/54137-5/1/1').click();
      await expectReaderLogEntries(page, ['Added section']);
      // Remove the section
      const minusButtonCSS = 'button[title=\'Remove this "Your diseases history"\']';
      await page.locator(minusButtonCSS).first().click();
      await expectReaderLogEntries(page, ['Added section', 'Removed section']);
    });

    test('should add an entry when a row is added or removed', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // Add a row
      await byId(page, 'add-/54114-4/54117-7/1/1').click();
      await expectReaderLogEntries(page, ['Added row']);
      // Remove the row
      const minusButtonCSS =
        'button[title="Remove this row of \\"This family member\'s history of disease\\""]';
      await page.locator(minusButtonCSS).first().click();
      await expectReaderLogEntries(page, ['Added row', 'Removed row']);
    });

    test('should add an entry when a question is added or removed', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      const addNameBtn = byId(page, 'add-/54126-8/54125-0/1/1');
      await addNameBtn.waitFor({ state: 'visible' });
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // Add a question
      await byId(page, '/54126-8/54125-0/1/1').pressSequentially('a name');
      await addNameBtn.click();
      await expectReaderLogEntries(page, ['Added question']);
      // Remove the question
      await page.locator('button[title=\'Remove this "Name"\']').first().click();
      await expectReaderLogEntries(page, ['Added question', 'Removed question']);
    });

    test('should add an entry when a multi-select subgroup is added or removed, only if it is shown', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multi-select-with-hidden-child-items.json', 'formContainer', { fhirVersion: 'R4' });
      await byId(page, 'case1-visible/1||a').waitFor({ state: 'visible' });
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // The sub item is visible.
      const case1Apple = byId(page, 'case1-visible/1||a');
      await case1Apple.click();
      await expectReaderLogEntries(page, ['Added Apple']);
      await case1Apple.click();
      await expectReaderLogEntries(page, ['Added Apple', 'Removed Sub items for checkbox option: Apple']);

      // The only sub item is hidden.
      const case2Apple = byId(page, 'case2-hidden/1||a');
      await case2Apple.click();
      await expect(case2Apple).toBeChecked();
      await case2Apple.click();
      await expect(case2Apple).not.toBeChecked();
      await expectReaderLogEntries(page, ['Added Apple', 'Removed Sub items for checkbox option: Apple']);

      // The child is enabled only while Apple is selected. Its subgroup is
      // shown when Apple is checked and hidden before it is removed when Apple
      // is unchecked, so both structural changes should still be announced.
      // The child's own "Showing"/"Hiding" messages are not announced, for
      // either the original child or the copy for Apple.
      await resetReaderLog(page);
      const case5Apple = byId(page, 'case5-enablewhen-parent/1||a');
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Added Apple']);
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Added Apple', 'Removed Sub items for checkbox option: Apple']);

      // Banana stays checked, so its subgroup is only shown or hidden as Apple
      // is checked or unchecked, and is not added or removed. The copy of the
      // child for the Apple subgroup removed above is not announced either.
      await resetReaderLog(page);
      await byId(page, 'case5-enablewhen-parent/1||b').click();
      await expect(byId(page, 'case5-enablewhen-parent/1||b')).toBeChecked();
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Showing sub items for Banana', 'Added Apple']);
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Showing sub items for Banana', 'Added Apple',
        'Hiding sub items for Banana', 'Removed Sub items for checkbox option: Apple']);

      // The subgroup is initially hidden because its child is controlled by a
      // different question. It should be announced as shown or hidden when
      // that question changes, and as removed when Apple is unchecked.
      await resetReaderLog(page);
      const case4Apple = byId(page, 'case4-enablewhen-other/1||a');
      await case4Apple.click();
      await expect(case4Apple).toBeChecked();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Apple' })).toHaveCount(0);
      await byId(page, 'show-details/1|true').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Showing sub items for Apple' })).toHaveCount(1);
      await byId(page, 'show-details/1|false').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Hiding sub items for Apple' })).toHaveCount(1);
      await expect(case4Apple).toBeChecked();
      await byId(page, 'show-details/1|true').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Showing sub items for Apple' })).toHaveCount(2);
      await case4Apple.click();
      await expect(page.locator(readerLogEntries).filter({
        hasText: 'Removed Sub items for checkbox option: Apple'
      })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Added Apple' })).toHaveCount(0);

      // The only sub item is hidden, autocomplete.
      await resetReaderLog(page);
      const dropdown = byId(page, 'case6-autocomplete-hidden/1');
      await dropdown.click();
      await dropdown.press('ArrowDown');
      await dropdown.press('Enter');
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Selected Apple' })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Added' })).toHaveCount(0);

      // One child stays visible, so the subgroup stays shown, and the other
      // child's own message is announced. The original children are not
      // announced.
      await byId(page, 'show-details/1|false').click();
      await resetReaderLog(page);
      const case7Apple = byId(page, 'case7-enablewhen-mixed/1||a');
      await case7Apple.click();
      await expectReaderLogEntries(page, ['Added Apple']);
      await byId(page, 'show-details/1|true').click();
      await case7Apple.click();
      const case7Entries = ['Added Apple',
        "Showing How ripe? (enabled when 'Show follow-up questions' is Yes)",
        'Removed Sub items for checkbox option: Apple'];
      await expectReaderLogEntries(page, case7Entries);
    });
  });

  test.describe('field labels', () => {
    test('should be present on the questions in the vertical template', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      await expect(page.locator(heightLabel)).toBeVisible();
    });

    test('should be present on the questions in the horizontal template', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await expect(page.locator(heightLabel)).toBeVisible();
    });
  });
});
