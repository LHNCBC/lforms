import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, addFormToPage, pressCypressKeys, escapeIdSelector } from '../support/lforms-helpers';

test.describe('Question with sub items', () => {
  test('should render sub items for each selected checkbox and export properly', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'checkbox-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'parent-checkbox/1||a').click();
    await byId(page, 'parent-checkbox/1||b').click();
    await byId(page, 'parent-checkbox/1||o').click();
    await expect(byId(page, 'label-checkbox-subgroup||a/1/checkbox-subgroup||a')).toBeVisible();
    await expect(byId(page, 'label-checkbox-subgroup||b/1/checkbox-subgroup||b')).toBeVisible();
    await expect(byId(page, 'label-checkbox-subgroup||o/1/checkbox-subgroup||o')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await byId(page, 'parent-checkbox/1||o').click();
    await expect(byId(page, 'label-checkbox-subgroup||o/1/checkbox-subgroup||o')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/checkbox-subgroup||a/1').pressSequentially('11');
    await byId(page, 'child-integer/1/checkbox-subgroup||b/1').pressSequentially('22');

    // getFormData() should not include checkbox sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[0].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[0].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[0].item.length).toBe(1);
    expect(q.item[0].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueCoding: { code: 'a', display: 'Apple' },
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueCoding: { code: 'b', display: 'Banana' },
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer')!.innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-checkbox-subgroup||a/1/1')).toBeVisible();
    await expect(byId(page, 'label-checkbox-subgroup||b/1/1')).toBeVisible();
    await expect(byId(page, 'item-checkbox-subgroup||a/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-checkbox-subgroup||b/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should show as repeating question for dropdown layout with sub items', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });
    await expect(byId(page, 'add-parent-checkbox/1')).toBeVisible();
    await expect(byId(page, 'child-integer/1/1')).toBeVisible();
    await pressCypressKeys(byId(page, 'parent-checkbox/1'), '{downArrow}{enter}');
    await byId(page, 'add-parent-checkbox/1').click();
    await expect(byId(page, 'child-integer/2/1')).toBeVisible();
  });

  test('should remove invalid sub items when options are removed by answerExpression', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'checkbox-answerExpression-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    // Build the answer options list for the checkbox question.
    await byId(page, 'fruit/1').pressSequentially('Apple');
    await byId(page, 'add-fruit/1').click();
    await byId(page, 'fruit/2').pressSequentially('Banana');
    await byId(page, 'add-fruit/2').click();
    await byId(page, 'fruit/3').pressSequentially('Orange');
    // Select Apple and Banana.
    await byId(page, 'parent-checkbox/1||Apple').click();
    await byId(page, 'parent-checkbox/1||Banana').click();
    await expect(byId(page, 'label-checkbox-subgroup||Apple/1/checkbox-subgroup||Apple')).toBeVisible();
    await expect(byId(page, 'label-checkbox-subgroup||Banana/1/checkbox-subgroup||Banana')).toBeVisible();
    // Fill out sub items for Apple and Banana.
    await byId(page, 'child-integer/1/checkbox-subgroup||Apple/1').pressSequentially('11');
    await byId(page, 'child-integer/1/checkbox-subgroup||Banana/1').pressSequentially('22');
    // Delete the option Banana from answerExpression source, which should remove the sub items for Banana.
    await byId(page, 'del-fruit/2').click();
    // Banana is removed.
    await expect(byId(page, 'parent-checkbox/1||Banana')).not.toBeAttached();
    await expect(byId(page, 'label-checkbox-subgroup||Banana/1/checkbox-subgroup||Banana')).not.toBeAttached();
    // Apple should still be selected, and its sub items should still be there.
    await expect(byId(page, 'parent-checkbox/1||Apple').locator('input[type="checkbox"]')).toBeChecked();
    await expect(byId(page, 'label-checkbox-subgroup||Apple/1/checkbox-subgroup||Apple')).toBeVisible();
    // Orange should not be selected, and its sub items should not be there.
    await expect(byId(page, 'parent-checkbox/1||Orange').locator('input[type="checkbox"]')).not.toBeChecked();
    await expect(byId(page, 'label-checkbox-subgroup||o/1/checkbox-subgroup||o')).not.toBeAttached();
  });

  test('should load back merged QR, when checkbox options are set by answerExpression', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'checkbox-answerExpression-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    // Build the answer options list for the checkbox question.
    await byId(page, 'fruit/1').pressSequentially('Apple');
    await byId(page, 'add-fruit/1').click();
    await byId(page, 'fruit/2').pressSequentially('Banana');
    // Select Apple and Banana.
    await byId(page, 'parent-checkbox/1||Apple').click();
    await byId(page, 'parent-checkbox/1||Banana').click();
    // Fill out sub items for Apple and Banana.
    await byId(page, 'child-integer/1/checkbox-subgroup||Apple/1').pressSequentially('11');
    await byId(page, 'child-integer/1/checkbox-subgroup||Banana/1').pressSequentially('22');

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      return {
        q: win.LForms.Util.getFormFHIRData('Questionnaire', 'R4'),
        qr: win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
      };
    });

    expect(q.item[1].item.length).toBe(1);
    expect(q.item[1].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[1].answer.length).toBe(2);
    expect(qr.item[1].answer[0]).toEqual({
      valueCoding: { display: 'Apple' },
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[1].answer[1]).toEqual({
      valueCoding: { display: 'Banana' },
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer')!.innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-checkbox-subgroup||Apple/1/1')).toBeVisible();
    await expect(byId(page, 'label-checkbox-subgroup||Banana/1/1')).toBeVisible();
    await expect(byId(page, 'item-checkbox-subgroup||Apple/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-checkbox-subgroup||Banana/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });
});
