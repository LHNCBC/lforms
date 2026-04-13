import { test, expect } from '@playwright/test';
import { byId, addFormToPage, pressCypressKeys, waitForLFormsReady } from '../../support/lforms-helpers';

test.describe('AnswerExpression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'answerExpTest.R4.json', 'formContainer', { fhirVersion: 'R4' });
  });

  test('should update answer list on an item whose type is string', async ({ page }) => {
    await byId(page, 'q2String/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q2String/1')).toHaveValue('one');
  });

  test('should update answer list on an item whose type is integer', async ({ page }) => {
    await byId(page, 'q3Integer/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q3Integer/1')).toHaveValue('12');
  });

  test('should update answer list on an item whose type is date', async ({ page }) => {
    await byId(page, 'q4Date/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q4Date/1')).toHaveValue('2022-11-12');
  });

  test('should update answer list on an item whose type is time', async ({ page }) => {
    await byId(page, 'q5Time/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q5Time/1')).toHaveValue('17:03:07');
  });

  test('should update answer list when the source item changes', async ({ page }) => {
    await byId(page, 'q1/1').click();
    await byId(page, 'q1/1').pressSequentially('abc');

    await byId(page, 'q1ListChoice/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q1ListChoice/1')).toHaveValue('abc');

    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q1ListString/1')).toHaveValue('abc');

    // added another q1
    await byId(page, 'add-q1/1').click();
    await byId(page, 'q1/2').click();
    await byId(page, 'q1/2').pressSequentially('def');
    // The selected answer 'abc' on 2 items should not disappear, as it is still valid.
    await expect(byId(page, 'q1ListChoice/1')).toHaveValue('abc');
    await expect(byId(page, 'q1ListString/1')).toHaveValue('abc');

    await byId(page, 'q1ListChoice/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(2);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q1ListChoice/1')).toHaveValue('abc');

    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(2);
    await page.locator('#lhc-tools-searchResults li:nth-child(2)').click();
    await expect(byId(page, 'q1ListString/1')).toHaveValue('def');
  });

  test('should get correct data in lforms internal format', async ({ page }) => {
    // Set up data: type abc in q1, def in q1/2, select items
    await byId(page, 'q1/1').click();
    await byId(page, 'q1/1').pressSequentially('abc');
    await byId(page, 'q1ListChoice/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'add-q1/1').click();
    await byId(page, 'q1/2').click();
    await byId(page, 'q1/2').pressSequentially('def');

    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(2);
    await page.locator('#lhc-tools-searchResults li:nth-child(2)').click();

    await byId(page, 'q2String/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'q3Integer/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'q4Date/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q4Date/1')).toHaveValue('2022-11-12');

    await byId(page, 'q5Time/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q5Time/1')).toHaveValue('17:03:07');
    await byId(page, 'q5Time/1').blur();

    const lfData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(lfData.items[0].value).toBe('abc');
    expect(lfData.items[1].value).toBe('def');
    expect(lfData.items[2].value).toEqual({ text: 'abc' });
    expect(lfData.items[3].value).toEqual({ text: 'def' });
    expect(lfData.items[4].value).toEqual({ text: 'one' });
    expect(lfData.items[5].value).toEqual({ text: 12 });
    expect(lfData.items[6].value).toEqual({ text: '2022-11-12' });
    expect(lfData.items[7].value).toEqual({ text: '17:03:07' });
  });

  test('should get correct data in QuestionnaireResponse', async ({ page }) => {
    // Set up same data
    await byId(page, 'q1/1').click();
    await byId(page, 'q1/1').pressSequentially('abc');
    await byId(page, 'q1ListChoice/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'add-q1/1').click();
    await byId(page, 'q1/2').click();
    await byId(page, 'q1/2').pressSequentially('def');

    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(2);
    await page.locator('#lhc-tools-searchResults li:nth-child(2)').click();

    await byId(page, 'q2String/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'q3Integer/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();

    await byId(page, 'q4Date/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q4Date/1')).toHaveValue('2022-11-12');

    await byId(page, 'q5Time/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(3);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q5Time/1')).toHaveValue('17:03:07');
    await byId(page, 'q5Time/1').blur();

    const qr = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(qr.item[0].answer).toEqual([{ valueString: 'abc' }, { valueString: 'def' }]);
    expect(qr.item[1].answer).toEqual([{ valueCoding: { display: 'abc' } }]);
    expect(qr.item[2].answer).toEqual([{ valueString: 'def' }]);
    expect(qr.item[3].answer).toEqual([{ valueString: 'one' }]);
    expect(qr.item[4].answer).toEqual([{ valueInteger: 12 }]);
    expect(qr.item[5].answer).toEqual([{ valueDate: '2022-11-12' }]);
    expect(qr.item[6].answer).toEqual([{ valueTime: '17:03:07' }]);
  });

  test('should get correct data in Questionnaire', async ({ page }) => {
    const q = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
    for (let i = 0; i < 7; i++) {
      expect(q.item[i].answerOption).toBeUndefined();
    }
  });

  test('should reset selected answer when source item changes and selected answer becomes invalid', async ({ page }) => {
    // Set up: type abc in q1, select it in q1ListChoice and q1ListString
    await byId(page, 'q1/1').click();
    await byId(page, 'q1/1').pressSequentially('abc');
    await byId(page, 'q1ListChoice/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q1ListChoice/1')).toHaveValue('abc');

    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(1);
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(byId(page, 'q1ListString/1')).toHaveValue('abc');

    // Add another q1 with 'def'
    await byId(page, 'add-q1/1').click();
    await byId(page, 'q1/2').click();
    await byId(page, 'q1/2').pressSequentially('def');

    // Select 'def' for q1ListString
    await byId(page, 'q1ListString/1').click();
    await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(2);
    await page.locator('#lhc-tools-searchResults li:nth-child(2)').click();
    await expect(byId(page, 'q1ListString/1')).toHaveValue('def');

    // Delete 'abc' from the answer list
    await byId(page, 'del-q1/1').click();
    // The selected answer 'abc' should be reset, as it is no longer valid.
    // The selected answer 'def' should not be affected, as it is still valid.
    await expect(byId(page, 'q1ListChoice/1')).toHaveValue('');
    await expect(byId(page, 'q1ListString/1')).toHaveValue('def');
  });
});
