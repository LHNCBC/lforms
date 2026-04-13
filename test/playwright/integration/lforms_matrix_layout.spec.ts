import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';

test.describe('Form level Matrix layout', () => {

  test('displays a radio matrix table', async ({ page }) => {
    await openFormByIndex(page, 11); // MatrixLayout1
    const item1answer1 = '/g1m1/1||c1';
    const item1answer2 = '/g1m1/1||c2';
    const item4answer1 = '/g1m4/1||c1';
    const item4answer4 = '/g1m4/1||c4';

    await expect(byId(page, item1answer1)).toBeVisible();
    await expect(byId(page, item4answer4)).toBeVisible();

    // first question
    let formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value).toBeUndefined();
    expect(formData.itemsData[1].value).toBeUndefined();
    expect(formData.itemsData[2].value).toBeUndefined();
    expect(formData.itemsData[3].value).toBeUndefined();

    await byId(page, item1answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value.code).toBe('c1');
    expect(formData.itemsData[0].value.text).toBe('Answer a');
    expect(formData.itemsData[1].value).toBeUndefined();
    expect(formData.itemsData[2].value).toBeUndefined();
    expect(formData.itemsData[3].value).toBeUndefined();

    await byId(page, item1answer2).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value.code).toBe('c2');
    expect(formData.itemsData[0].value.text).toBe('Answer b');

    await byId(page, item4answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value.code).toBe('c2');
    expect(formData.itemsData[3].value.code).toBe('c1');
    expect(formData.itemsData[3].value.text).toBe('Answer a');

    await byId(page, item4answer4).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[3].value.code).toBe('c4');
    expect(formData.itemsData[3].value.text).toBe('Answer d');
  });

  test('displays a checkbox matrix table', async ({ page }) => {
    await openFormByIndex(page, 12); // MatrixLayout2
    const item1answer1 = '/g1m1/1||c1';
    const item1answer2 = '/g1m1/1||c2';
    const item1Other = '/g1m1/1|_other';
    const item1OtherValue = '/g1m1/1|_otherValue';
    const item4answer1 = '/g1m4/1||c1';
    const item4answer4 = '/g1m4/1||c4';
    const item4Other = '/g1m4/1|_other';
    const item4OtherValue = '/g1m4/1|_otherValue';

    await expect(byId(page, item1answer1)).toBeVisible();
    await expect(byId(page, item4answer4)).toBeVisible();

    // first question
    let formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value).toBeUndefined();

    await byId(page, item1answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value[0].code).toBe('c1');
    expect(formData.itemsData[0].value[0].text).toBe('Answer 1');

    await byId(page, item1answer2).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value[0].code).toBe('c1');
    expect(formData.itemsData[0].value[1].code).toBe('c2');

    await byId(page, item1Other).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value[2]).toBeUndefined();

    await byId(page, item1OtherValue).pressSequentially('other values');
    await byId(page, item1OtherValue).blur();
    await byId(page, item1OtherValue).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value[2]).toBe('other values');

    // change the other value alone
    await byId(page, item1OtherValue).clear();
    await byId(page, item1OtherValue).pressSequentially('other values again');
    await byId(page, item1OtherValue).blur();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[0].value[2]).toBe('other values again');

    // fourth question
    await byId(page, item4answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[3].value[0].code).toBe('c1');

    await byId(page, item4answer4).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[3].value[0].code).toBe('c1');
    expect(formData.itemsData[3].value[1].code).toBe('c4');

    await byId(page, item4OtherValue).pressSequentially('others');
    // model value does not change when the checkbox is not checked
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[3].value.length).toBe(2);

    // model value changes after the checkbox is clicked
    await byId(page, item4Other).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
    expect(formData.itemsData[3].value.length).toBe(3);
    expect(formData.itemsData[3].value[2]).toBe('others');
    // the value on the first question does not change
  });

  test.describe('Use data files in lforms internal data format', () => {
    test('displays a radio matrix table with initial values displayed', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'matrixLayoutSingleSelectionWithData.json');
      await expect(byId(page, '/g1m1/1||c1')).toBeChecked();
      await expect(byId(page, '/g1m2/1|_other')).toBeChecked();
      await expect(byId(page, '/g1m2/1|_otherValue')).toHaveValue('User typed string');

      // first question
      const formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(formData.itemsData[0].value).toEqual({code: 'c1', text: 'Answer a'});
      expect(formData.itemsData[1].value).toEqual('User typed string');
      expect(formData.itemsData[2].value).toEqual({code: 'c3', text: 'Answer c'});
      expect(formData.itemsData[3].value).toBeUndefined();
    });

    test('displays a checkbox matrix table with initial values displayed', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'matrixLayoutMultipleSelectionWithData.json');
      await expect(byId(page, '/g1m1/1||c1')).toBeChecked();
      await expect(byId(page, '/g1m1/1||c2')).toBeChecked();
      await expect(byId(page, '/g1m2/1||c1')).toBeChecked();
      await expect(byId(page, '/g1m2/1|_other')).toBeChecked();
      await expect(byId(page, '/g1m2/1|_otherValue')).toHaveValue('user typed string');

      // first question
      const formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(formData.itemsData[0].value).toEqual([{code: 'c1', text: 'Answer 1'}, {code: 'c2', text: 'Answer 2'}]);
      expect(formData.itemsData[1].value).toEqual([{code: 'c1', text: 'Answer 1'}, 'user typed string']);
      expect(formData.itemsData[2].value).toEqual([{code: 'c3', text: 'Answer 3'}]);
      expect(formData.itemsData[3].value).toBeUndefined();
    });
  });

  test.describe('Use FHIR R4 Questionnaire data files', () => {
    test('displays a radio matrix table with initial values displayed', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'matrixLayoutSingleSelectionWithData.R4.json', 'R4');
      await expect(byId(page, '/g1m1/1/1||c1')).toBeChecked();
      await expect(byId(page, '/g1m2/1/1|_other')).toBeChecked();
      await expect(byId(page, '/g1m2/1/1|_otherValue')).toHaveValue('User typed string');

      // first question
      const formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(formData.itemsData[0].items[0].value).toEqual({code: 'c1', text: 'Answer a'});
      expect(formData.itemsData[0].items[1].value).toEqual('User typed string');
      expect(formData.itemsData[0].items[2].value).toEqual({code: 'c3', text: 'Answer c'});
      expect(formData.itemsData[0].items[3].value).toBeUndefined();
    });

    test('displays a checkbox matrix table with initial values displayed', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'matrixLayoutMultipleSelectionWithData.R4.json', 'R4');
      await expect(byId(page, '/g1m1/1/1||c1')).toBeChecked();
      await expect(byId(page, '/g1m1/1/1||c2')).toBeChecked();
      await expect(byId(page, '/g1m2/1/1||c1')).toBeChecked();
      await expect(byId(page, '/g1m2/1/1|_other')).toBeChecked();
      await expect(byId(page, '/g1m2/1/1|_otherValue')).toHaveValue('user typed string');

      // first question
      const formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(formData.itemsData[0].items[0].value).toEqual([{code: 'c1', text: 'Answer 1'}, {code: 'c2', text: 'Answer 2'}]);
      expect(formData.itemsData[0].items[1].value).toEqual([{code: 'c1', text: 'Answer 1'}, 'user typed string']);
      expect(formData.itemsData[0].items[2].value).toEqual([{code: 'c3', text: 'Answer 3'}]);
      expect(formData.itemsData[0].items[3].value).toBeUndefined();
    });
  });
});
