import { test, expect } from '@playwright/test';
import { byId, openFormByIndex } from '../support/lforms-helpers';

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
          'Height requires a value']);
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
