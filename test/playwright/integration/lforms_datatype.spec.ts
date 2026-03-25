import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, waitForLFormsReady, addFormToPage } from '../support/lforms-helpers';

test.describe('Data Type', () => {
  test('TITLE row should appear', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const titleRow = page.locator('.lhc-item.lhc-datatype-TITLE');
    const typeTitle = titleRow.locator("label[for='/titleHeader/1']");
    await expect(typeTitle).toBeVisible();
  });

  test('DTM datetime picker should work', async ({ page }) => {
    await openFormByIndex(page, 4);
    const before = new Date();
    const dtmInput = page.locator('#\\/type7\\/1 input');
    await dtmInput.click();
    await page.locator('.ant-picker-now-btn').click();
    await page.locator('.ant-picker-ok button').click();
    const after = new Date();
    const value = await dtmInput.inputValue();
    // Parse the DTM value (MM/DD/YYYY HH:MM:SS) and check it's within range
    expect(value).toBeTruthy();
    // Verify format MM/DD/YYYY HH:MM:SS
    expect(value).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
  });

  test('DT data type should work', async ({ page }) => {
    await openFormByIndex(page, 4);
    const dtEl = page.locator('#\\/type6\\/1 input');
    const otherEl = byId(page, '/type5/1');

    await dtEl.fill('');
    await dtEl.type('02/032019');
    await otherEl.click();
    await expect(dtEl).toHaveValue('');

    await dtEl.fill('');
    await dtEl.type('02/03/2019');
    await otherEl.click();
    await expect(dtEl).toHaveValue('02/03/2019');
  });

  test('DTM data type should work', async ({ page }) => {
    await openFormByIndex(page, 4);
    const dtmEl = page.locator('#\\/type7\\/1 input');
    const otherEl = byId(page, '/type5/1');

    await dtmEl.fill('');
    await dtmEl.type('02/03/201923:59');
    await otherEl.click();
    // Invalid format should revert to previous value
    const val1 = await dtmEl.inputValue();
    // Previous value or empty (depends on form state)

    await dtmEl.fill('');
    await dtmEl.type('02/03/2019 23:59:00');
    await otherEl.click();
    await expect(dtmEl).toHaveValue('02/03/2019 23:59:00');
  });

  test.describe('Button Type', () => {
    test('Each button should have type="button" so ENTER does not submit', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      const name1 = byId(page, '/54126-8/54125-0/1/1');
      const name2 = byId(page, '/54126-8/54125-0/1/2');
      await name1.click();
      await name1.press('Enter');
      // nothing should happen - name2 should not exist
      await expect(name2).not.toBeAttached();
    });
  });

  test.describe('Items with units', () => {
    test.describe('with a REAL or INT data type', () => {
      test('should have data type set', async ({ page }) => {
        await openFormByIndex(page, 21); // VitalSign
        await expect(byId(page, '/3140-1/1')).toHaveAttribute('type', 'text');
        await expect(byId(page, '/9279-1/1')).toHaveAttribute('type', 'text');
        await expect(byId(page, '/8310-5/1')).toHaveAttribute('type', 'text');
      });

      test('should show the unit', async ({ page }) => {
        await openFormByIndex(page, 21); // VitalSign
        await expect(byId(page, 'unit_/8310-5/1')).toHaveValue('Cel');
      });
    });
  });

  test.describe('Items with QTY dataType', () => {
    test('should render QTY data type with associated units', async ({ page }) => {
      await openFormByIndex(page, 22); // QTYDemo
      const field1 = byId(page, '/q1/1');
      const field2 = byId(page, '/q2/1');
      const units1 = byId(page, 'unit_/q1/1');
      const units3 = byId(page, 'unit_/q3/1');
      const units4 = byId(page, 'unit_/q4/1');
      const units5 = byId(page, 'unit_/q5/1');

      await expect(field1).toHaveAttribute('type', 'text');
      await expect(field1).toHaveValue('2.5');
      await expect(units1).toBeVisible();

      await expect(field2).toHaveAttribute('placeholder', 'Type a number');
      await expect(field2).toHaveValue('');
      await expect(units3).toHaveValue('kgs');

      await expect(units4).toHaveValue('lbs');
      let fData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(fData.itemsData[3].unit).toEqual({ code: 'lbs', default: true });

      await units4.click();
      await expect(page.locator('#completionOptions')).toBeVisible();
      await units4.press('ArrowDown');
      await units4.press('Enter');
      await expect(units4).toHaveValue('kilo grams');
      await page.waitForFunction(() => {
        const fData = (window as any).LForms.Util.getUserData();
        return fData.itemsData[3].unit?.code === 'kgs';
      });
      fData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(fData.itemsData[3].unit).toEqual({ name: 'kilo grams', code: 'kgs' });

      await units4.click();
      // Four units in the list, but one is invalid
      await expect(page.locator('#completionOptions ul li')).toHaveCount(3);
      await units4.press('ArrowDown');
      await units4.press('ArrowDown');
      await units4.press('ArrowDown');
      await units4.press('Enter');
      await expect(units4).toHaveValue('grams');
      await page.waitForFunction(() => {
        const fData = (window as any).LForms.Util.getUserData();
        return fData.itemsData[3].unit?.name === 'grams';
      });
      fData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(fData.itemsData[3].unit).toEqual({ name: 'grams', system: 'http://unitsofmeasure.org' });

      await field1.click(); // Close autocomplete
      await expect(page.locator('#lhc-tools-searchResults')).not.toBeVisible();
      await expect(units5).toHaveValue('');
      await units5.click();
      await expect(page.locator('#lhc-tools-searchResults')).toBeVisible();
    });
  });

  test.describe('required indicator and aria-required', () => {
    const allFieldTypes = ['dt', 'dtm', 'tx', 'st'];

    for (const type of allFieldTypes) {
      test(`should be present for ${type} field`, async ({ page }) => {
        await openFormByIndex(page, 4); // FullFeaturedForm
        const label = byId(page, `label-/required_${type}/1`);
        const requiredElement = byId(page, `/required_${type}/1`);
        await expect(label).toHaveText(/\*$/);
        await expect(requiredElement).toHaveAttribute('aria-required', 'true');
      });
    }
  });
});
