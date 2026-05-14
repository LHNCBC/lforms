import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, answerId, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';

test.describe('display controls demo', () => {

  test('should show values as selected radio buttons/checkboxes', async ({ page }) => {
    await openFormByIndex(page, 10); // DisplayControlsDemo
    await expect(byId(page, answerId('/q1a/1', undefined, 'c2')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('/q1a/1', undefined, 'c3')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('/q1c/1', undefined, 'c2')).locator('input')).toBeChecked();
    await expect(byId(page, answerId('/q1c/1', undefined, 'c3')).locator('input')).toBeChecked();
  });

  test('displays 4 different types of answer layouts', async ({ page }) => {
    await openFormByIndex(page, 10); // DisplayControlsDemo

    const item1answer1 = '/q1a/1||c1';
    const item1answer3 = '/q1a/1||c3';
    const item2answer1 = '/q1b/1||c1';
    const item2Other = '/q1b/1|_other';
    const item2OtherValue = '/q1b/1|_otherValue';
    const item3answer1 = answerId('/q1c/1', undefined, 'c1');
    const item3answer3 = answerId('/q1c/1', undefined, 'c3');
    const item4answer1 = answerId('/q1d/1', undefined, 'c1');
    const item4Other = '/q1d/1|_other';
    const item4OtherValue = '/q1d/1|_otherValue';

    await expect(byId(page, item1answer1)).toBeVisible();
    await expect(byId(page, item4answer1)).toBeVisible();

    // first answer list
    let formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items.length).toBe(10);
    expect(formData.items[1].value.code).toBe('c3');
    expect(formData.items[1].value.text).toBe('Extra long answer text 123456789 Answer Z');

    await byId(page, item1answer1).locator('input').click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[1].value.code).toBe('c1');
    expect(formData.items[1].value.text).toBe('Extra long answer text 123456789 Answer X');

    await byId(page, item1answer3).locator('input').click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[1].value.code).toBe('c3');
    expect(formData.items[1].value.text).toBe('Extra long answer text 123456789 Answer Z');
    // second answer list
    expect(formData.items[2].value == null).toBe(true);

    await byId(page, item2answer1).locator('input').click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[2].value.code).toBe('c1');
    expect(formData.items[2].value.text).toBe('Long answer text 123 Answer X');

    await byId(page, item2Other).locator('input').click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[2].value == null).toBe(true); // allow undefined (Chrome)

    await byId(page, item2OtherValue).pressSequentially('other values');
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[2].value).toBe('other values');

    await byId(page, item2OtherValue).clear();
    await byId(page, item2OtherValue).pressSequentially('other values again');
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[2].value).toBe('other values again');

    // third answer list
    expect(formData.items[3].value).toEqual([{code: 'c2', text: 'Answer Y'}, {code: 'c3', text: 'Answer Z'}]); // default values

    await byId(page, item3answer1).click(); // appends first answer
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[3].value).toEqual([{code: 'c1', text: 'Answer X'}, {code: 'c2', text: 'Answer Y'}, {code: 'c3', text: 'Answer Z'}]);

    await byId(page, item3answer3).click(); // deselects third answer
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[3].value).toEqual([{code: 'c1', text: 'Answer X'}, {code: 'c2', text: 'Answer Y'}]);
    // fourth answer list
    expect(formData.items[4].value).toBeUndefined();

    await byId(page, item4answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[4].value).toEqual([{code: 'c1', text: 'Answer X'}]);

    await byId(page, item4Other).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[4].value[0]).toEqual({code: 'c1', text: 'Answer X'});
    expect(formData.items[4].value[1] == null).toBe(true); // allow undefined

    await byId(page, item4OtherValue).pressSequentially('other values');
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[4].value.length).toBe(2);
    expect(formData.items[4].value[0].code).toBe('c1');
    expect(formData.items[4].value[0].text).toBe('Answer X');
    expect(formData.items[4].value[1]).toBe('other values');

    // change the other value alone will update the data model when the checkbox is checked.
    await byId(page, item4OtherValue).clear();
    await byId(page, item4OtherValue).pressSequentially('other values again');
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[4].value.length).toBe(2);
    expect(formData.items[4].value[0].code).toBe('c1');
    expect(formData.items[4].value[0].text).toBe('Answer X');
    expect(formData.items[4].value[1]).toBe('other values again');

    // other model values are not changed
    expect(formData.items[1].value.code).toBe('c3');
    expect(formData.items[1].value.text).toBe('Extra long answer text 123456789 Answer Z');
    expect(formData.items[2].value).toBe('other values again');
    expect(formData.items[3].value).toEqual([{code: 'c1', text: 'Answer X'}, {code: 'c2', text: 'Answer Y'}]);
  });

  test('repeating items/sections works', async ({ page }) => {
    await openFormByIndex(page, 10); // DisplayControlsDemo

    const btnAdd1 = byId(page, 'add-/g1/1');
    const btnAdd2 = byId(page, 'add-/g1/g1g2/1/1');
    const btnAdd3 = byId(page, 'add-/g2/1');

    await expect(btnAdd1).toBeAttached();
    await expect(byId(page, '/g1/g1m1/1/1')).toBeVisible();
    await expect(byId(page, '/g1/g1g2/g1g2q1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g2/g1m1/1/1')).toBeVisible();
    const g1m1_2 = byId(page, '/g1/g1m1/2/1');
    await expect(g1m1_2).not.toBeAttached();
    const g1g2q1_2 = byId(page, '/g1/g1g2/g1g2q1/1/2/1');
    await expect(g1g2q1_2).not.toBeAttached();
    const g2m1_2 = byId(page, '/g2/g1m1/2/1');
    await expect(g2m1_2).not.toBeAttached();

    await btnAdd1.click();
    await expect(g1m1_2).toBeVisible();
    await byId(page, 'del-/g1/2').click();
    await expect(g1m1_2).not.toBeAttached();

    await btnAdd2.click();
    await expect(g1g2q1_2).toBeVisible();
    await byId(page, 'del-/g1/g1g2/1/2').click();
    await expect(g1g2q1_2).not.toBeAttached();

    await btnAdd3.click();
    await expect(g2m1_2).toBeVisible();
    await byId(page, 'del-/g2/2').click();
    await expect(g2m1_2).not.toBeAttached();
  });

  test('section matrix works', async ({ page }) => {
    await openFormByIndex(page, 10); // DisplayControlsDemo

    const item1answer1 = '/g4/g1m1/1/1||c1';
    const item1answer2 = '/g4/g1m1/1/1||c2';
    const item2answer1 = '/g4/g1m2/1/1||c1';
    const item2answer3 = '/g4/g1m2/1/1||c3';

    await expect(byId(page, item1answer1)).toBeAttached();

    // first row in matrix
    let formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[8].items[0].value).toBeUndefined();

    await byId(page, item1answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[8].items[0].value[0].code).toBe('c1');
    expect(formData.items[8].items[0].value[0].text).toBe('Answer 1');

    await byId(page, item1answer2).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[8].items[0].value[0].code).toBe('c1');
    expect(formData.items[8].items[0].value[0].text).toBe('Answer 1');
    expect(formData.items[8].items[0].value[1].code).toBe('c2');
    expect(formData.items[8].items[0].value[1].text).toBe('Answer 2');
    // second row in matrix
    expect(formData.items[8].items[1].value).toBeUndefined();

    await byId(page, item2answer1).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[8].items[1].value[0].code).toBe('c1');
    expect(formData.items[8].items[1].value[0].text).toBe('Answer 1');

    await byId(page, item2answer3).click();
    formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items[8].items[1].value[0].code).toBe('c1');
    expect(formData.items[8].items[1].value[0].text).toBe('Answer 1');
    expect(formData.items[8].items[1].value[1].code).toBe('c3');
    expect(formData.items[8].items[1].value[1].text).toBe('Answer 3');
    // first row data model does not change
    expect(formData.items[8].items[0].value[0].code).toBe('c1');
    expect(formData.items[8].items[0].value[0].text).toBe('Answer 1');
    expect(formData.items[8].items[0].value[1].code).toBe('c2');
    expect(formData.items[8].items[0].value[1].text).toBe('Answer 2');
  });

  test('should show disabled inputs', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const readonlyST = byId(page, '/readonlyST/1');
    await expect(readonlyST).toBeAttached();
    await expect(readonlyST).toBeDisabled();
    await expect(byId(page, '/readonlyCNE-s/1')).toBeDisabled();
    await expect(byId(page, '/readonlyCWE-m/1')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCNE-sb/1', undefined, 'c1')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCNE-sb/1', undefined, 'c2')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCNE-sb/1', undefined, 'c3')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCNE-sb/1', undefined, 'c4')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCWE-mb/1', undefined, 'c1')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCWE-mb/1', undefined, 'c2')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCWE-mb/1', undefined, 'c3')).locator('input')).toBeDisabled();
    await expect(byId(page, answerId('/readonlyCWE-mb/1', undefined, 'c4')).locator('input')).toBeDisabled();
  });

  test('should show changed font color', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    await expect(byId(page, 'label-/q_lg/1')).toBeAttached();
    await expect(byId(page, 'label-/q_lg/1')).toHaveCSS('color', 'rgb(255, 0, 0)'); // red
  });

  test('should display unit in item-control sub-item when exists', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'q-with-item-control-unit.json', 'R5');
    // Should use the unit display from the sub-item with item-control unit,
    // instead of the Coding display from questionnaire-unit extension.
    await expect(byId(page, 'unit_/height/1')).toHaveValue('international inch');
  });
});
