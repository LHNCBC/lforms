import { test, expect } from '@playwright/test';
import { byId, answerId, waitForLFormsReady, loadFromTestData } from '../../support/lforms-helpers';

test.describe('rendering-xhtml (STU3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
  });

  test.describe('on answerOption', () => {

    test.describe('valueString', () => {
      test('should display answerOption html if allowed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'STU3');
        // radio
        await expect(byId(page, 'item-valueString-group2-item1/1/1').locator('.testBold')).toHaveCount(3);
        await expect(byId(page, 'item-valueString-group2-item1/1/1').locator('.testImage')).toBeVisible();
        // checkbox
        await expect(byId(page, 'item-valueString-group2-item2/1/1').locator('.testBold')).toHaveCount(3);
        await expect(byId(page, 'item-valueString-group2-item2/1/1').locator('.testImage')).toBeVisible();
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        // Use innerHTML checks
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; bold <b class="testBold">A</b>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold <b class="testBold">B</b>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold <b class="testBold">C</b><img class="testImage" src="/test/data/a-picture.png">');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueString-group1-item1/1/1')).toHaveValue('bold B');
      });

      test('should display answerOption text if not allowed in template options', async ({ page }) => {
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'STU3');
        await expect(page.locator('.testBold')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold a'))).toHaveText('bold a');
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold b'))).toHaveText('bold b');
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold c'))).toHaveText('bold c');
        // checkbox
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold a'))).toHaveText('bold a');
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold b'))).toHaveText('bold b');
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold c'))).toHaveText('bold c');
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; bold a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold c');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueString-group1-item1/1/1')).toHaveValue('bold b');
      });
    });

    test.describe('valueCoding.display', () => {
      test('should display answerOption html if allowed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'STU3');
        // radio
        await expect(byId(page, 'item-valueCoding-group2-item1/1/1').locator('.testItalic')).toHaveCount(3);
        // checkbox
        await expect(byId(page, 'item-valueCoding-group2-item2/1/1').locator('.testItalic')).toHaveCount(3);
        // autocomplete
        await byId(page, 'valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic <i class="testItalic">A</i>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic <i class="testItalic">B</i>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueCoding-group1-item1/1/1')).toHaveValue('italic B');
      });

      test('should display answerOption text if not allowed in template options', async ({ page }) => {
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'STU3');
        await expect(page.locator('.testItalic')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'a'))).toHaveText('italic a');
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'b'))).toHaveText('italic b');
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'c'))).toHaveText('italic c');
        // checkbox
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'a'))).toHaveText('italic a');
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'b'))).toHaveText('italic b');
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'c'))).toHaveText('italic c');
        // autocomplete
        await byId(page, 'valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic c');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueCoding-group1-item1/1/1')).toHaveValue('italic b');
      });
    });
  });
});
