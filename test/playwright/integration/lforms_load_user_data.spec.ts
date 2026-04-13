import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, answerId } from '../support/lforms-helpers';

test.describe('load saved user data', () => {

  test('should load BL, ST, DT, DTM, INT, answer lists and unit values', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData

    await expect(byId(page, answerId('#/q0/1', 'true')).locator('input')).toBeChecked();
    await expect(byId(page, '/q1/1')).toHaveValue('no data type');
    await expect(byId(page, '/q2/1')).toHaveValue('100');
    await expect(byId(page, '/q3/1')).toHaveValue('user input value');
    await expect(byId(page, '/q4/1').locator('input')).toHaveValue('11/17/2015');
    await expect(byId(page, '/q5/1')).toHaveValue('Answer 2');
    await expect(byId(page, '/q6/1')).toHaveValue('Answer 2');
    await expect(byId(page, '/q7/1')).toHaveValue('Answer 3');
    await expect(byId(page, '/q8/1')).toHaveValue('');
    await expect(byId(page, '/q9/1')).toHaveValue('');
    // NEXT: the saved value is 11/20/2015 10:10 !!
    await expect(byId(page, '/q99/1').locator('input')).toHaveValue('11/20/2015 10:10:00');

    const multiAnswers = page.locator('.autocomp_selected li');
    await expect(multiAnswers).toHaveCount(6);
    await expect(multiAnswers.nth(0)).toHaveText('×Answer 1');
    await expect(multiAnswers.nth(1)).toHaveText('×Answer 3');
    await expect(multiAnswers.nth(2)).toHaveText('×Answer 2');
    await expect(multiAnswers.nth(3)).toHaveText('×User created answer');
    await expect(multiAnswers.nth(4)).toHaveText('×Answer 2');
    await expect(multiAnswers.nth(5)).toHaveText('×User created answer');

    // unit values
    await expect(byId(page, '/unit1/1')).toHaveValue('123');
    await expect(byId(page, 'unit_/unit1/1')).toHaveValue('kgs');
    await expect(byId(page, '/unit2/1')).toHaveValue('456');
    await expect(byId(page, 'unit_/unit2/1')).toHaveValue('kgs');
    await expect(byId(page, '/unit3/1')).toHaveValue('789');
    await expect(byId(page, 'unit_/unit3/1')).toHaveValue('kgs');
  });

  test('skip logic should work with loaded user data', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData
    await expect(byId(page, '/slSource1/1')).toHaveValue('2');
    const slTarget2 = byId(page, '/slTargetItem2/1');
    await expect(byId(page, '/slTargetItem1/1')).not.toBeAttached();
    await expect(slTarget2).toBeVisible();
    await expect(slTarget2).toHaveValue('200');
    const slSubItem1 = byId(page, '/slTargetHeader1/slTargetSubItem1/1/1');
    await expect(slSubItem1).toBeVisible();
    await expect(slSubItem1).toHaveValue('201');
    const slSubItem2 = byId(page, '/slTargetHeader1/slTargetSubItem2/1/1');
    await expect(slSubItem2).toBeVisible();
    await expect(slSubItem2).toHaveValue('202');
  });

  test('repeating items should be shown', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData
    const rpQ1_1 = byId(page, '/rp-q1/1');
    await expect(rpQ1_1).toBeVisible();
    await expect(rpQ1_1).toHaveValue('instance A');
    const rpQ1_2 = byId(page, '/rp-q1/2');
    await expect(rpQ1_2).toBeVisible();
    await expect(rpQ1_2).toHaveValue('instance B');
    const addRpQ1 = byId(page, 'add-/rp-q1/2');
    await expect(addRpQ1).toBeVisible();
    await expect(addRpQ1).toContainText('+ A Repeating Item');
  });

  test('repeating items/section within a repeating section should be shown', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData
    await expect(page.locator('label[for="/rp-q2/1"]')).toBeVisible();
    await expect(page.locator('label[for="/rp-q2/2"]')).toBeVisible();
    const rpQ3_1 = byId(page, '/rp-q2/rp-q3/1/1');
    await expect(rpQ3_1).toBeVisible();
    await expect(rpQ3_1).toHaveValue('300');
    const rpQ3_2 = byId(page, '/rp-q2/rp-q3/2/1');
    await expect(rpQ3_2).toBeVisible();
    await expect(rpQ3_2).toHaveValue('301');
    await expect(page.locator('label[for="/rp-q2/rp-q4/1/1"]')).toBeVisible();
    await expect(page.locator('label[for="/rp-q2/rp-q4/1/2"]')).toBeVisible();
    await expect(page.locator('label[for="/rp-q2/rp-q4/1/3"]')).toBeVisible();
    await expect(page.locator('label[for="/rp-q2/rp-q4/2/1"]')).toBeVisible();
    const rpQ5_1_1 = byId(page, '/rp-q2/rp-q4/rp-q5/1/1/1');
    await expect(rpQ5_1_1).toBeVisible();
    await expect(rpQ5_1_1).toHaveValue('400');
    const rpQ5_1_2 = byId(page, '/rp-q2/rp-q4/rp-q5/1/2/1');
    await expect(rpQ5_1_2).toBeVisible();
    await expect(rpQ5_1_2).toHaveValue('401');
    const rpQ5_1_3 = byId(page, '/rp-q2/rp-q4/rp-q5/1/3/1');
    await expect(rpQ5_1_3).toBeVisible();
    await expect(rpQ5_1_3).toHaveValue('402');
    const rpQ5_2_1 = byId(page, '/rp-q2/rp-q4/rp-q5/2/1/1');
    await expect(rpQ5_2_1).toBeVisible();
    await expect(rpQ5_2_1).toHaveValue('403');

    const addQ4_1_3 = byId(page, 'add-/rp-q2/rp-q4/1/3');
    await expect(addQ4_1_3).toBeVisible();
    await expect(addQ4_1_3).toContainText('+ A repeating section in a repeating section');
    const addQ4_2_1 = byId(page, 'add-/rp-q2/rp-q4/2/1');
    await expect(addQ4_2_1).toBeVisible();
    await expect(addQ4_2_1).toContainText('+ A repeating section in a repeating section');
    const addQ2_2 = byId(page, 'add-/rp-q2/2');
    await expect(addQ2_2).toBeVisible();
    await expect(addQ2_2).toContainText('+ A Repeating Section');

    const delQ4_1_3 = byId(page, 'del-/rp-q2/rp-q4/1/3');
    await expect(delQ4_1_3).toBeVisible();
    await expect(delQ4_1_3).toHaveText('-');
    const delQ2_2 = byId(page, 'del-/rp-q2/2');
    await expect(delQ2_2).toBeVisible();
    await expect(delQ2_2).toHaveText('-');
  });

  test('skip logic on repeating section should work too', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData
    const rpSrc2 = byId(page, '/rpSource2/1');
    const rpTarget2a = byId(page, '/repeatingSection1/rpTargetItem2/1/1');
    const rpTarget2b = byId(page, '/repeatingSection1/rpTargetItem2/2/1');
    const rpAdd = byId(page, 'add-/repeatingSection1/1');

    await rpSrc2.clear();
    await rpSrc2.pressSequentially('1');
    await expect(rpTarget2a).not.toBeAttached();
    await rpSrc2.clear();
    await rpSrc2.pressSequentially('2');
    await expect(rpTarget2a).toBeVisible();
    await rpAdd.click();
    await expect(rpTarget2a).toBeVisible();
    await expect(rpTarget2b).toBeVisible();
    await rpSrc2.clear();
    await rpSrc2.pressSequentially('1');
    await expect(rpTarget2a).not.toBeAttached();
    await expect(rpTarget2b).not.toBeAttached();
  });

  test('form should be actionable', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData
    // add a repeating item
    await byId(page, 'add-/rp-q1/2').click();
    const addRpQ1_2 = byId(page, 'add-/rp-q1/2');
    await expect(addRpQ1_2).not.toBeAttached();
    const addRpQ1_3 = byId(page, 'add-/rp-q1/3');
    await expect(addRpQ1_3).toBeVisible();
    await expect(addRpQ1_3).toContainText('+ A Repeating Item');
    await expect(byId(page, '/rp-q1/3')).toHaveValue('');

    // add a repeating section
    await byId(page, 'add-/rp-q2/rp-q4/1/3').click();
    const addQ4_1_3 = byId(page, 'add-/rp-q2/rp-q4/1/3');
    await expect(addQ4_1_3).not.toBeAttached();
    const addQ4_1_4 = byId(page, 'add-/rp-q2/rp-q4/1/4');
    await expect(addQ4_1_4).toBeVisible();
    await expect(addQ4_1_4).toContainText('+ A repeating section in a repeating section');
    await expect(byId(page, '/rp-q2/rp-q4/rp-q5/1/4/1')).toHaveValue('');

    // select from an answer list
    // pick the 1st item, Answer 1
    const q5 = byId(page, '/q5/1');
    await q5.click();
    await pressCypressKeys(q5, '{downArrow}');
    await q5.blur();
    await expect(q5).toHaveValue('Answer 1');

    // select one more answer from multi select field
    // pick the 1st item, Answer 2
    const q8 = byId(page, '/q8/1');
    await q8.click();
    await pressCypressKeys(q8, '{downArrow}');
    await q8.blur();
    const multiAnswers = page.locator('.autocomp_selected li');
    await expect(multiAnswers).toHaveCount(7);
    await expect(multiAnswers.nth(0)).toHaveText('×Answer 1');
    await expect(multiAnswers.nth(1)).toHaveText('×Answer 3');
    await expect(multiAnswers.nth(2)).toHaveText('×Answer 2');
    await expect(multiAnswers.nth(3)).toHaveText('×Answer 2');
    await expect(multiAnswers.nth(4)).toHaveText('×User created answer');
    await expect(multiAnswers.nth(5)).toHaveText('×Answer 2');
    await expect(multiAnswers.nth(6)).toHaveText('×User created answer');
  });

  test('adding a repeating section that has repeating sub items with user data should show just one repeating item', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData
    await byId(page, 'add-/rp-q2/2').click();
    await expect(page.locator('label[id="label-/rp-q2/3"]')).toBeVisible();
    await expect(page.locator('label[id="label-/rp-q2/rp-q4/3/1"]')).toBeVisible();
    const rpQ3_3 = byId(page, '/rp-q2/rp-q3/3/1');
    await expect(rpQ3_3).toBeVisible();
    await expect(rpQ3_3).toHaveValue('');
    const rpQ5_3_1 = byId(page, '/rp-q2/rp-q4/rp-q5/3/1/1');
    await expect(rpQ5_3_1).toBeVisible();
    await expect(rpQ5_3_1).toHaveValue('');
    await expect(byId(page, '/rp-q2/rp-q4/rp-q5/3/1/2')).not.toBeAttached();
  });

  test('should display user value and default answers on CWE typed items with radio buttons and checkboxes', async ({ page }) => {
    await openFormByIndex(page, 7); // FormWithUserData

    // OTHER in checkbox display with the user value not in the answer list
    await expect(byId(page, '/cwe-checkbox-user-value/1|_other').locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value/1|_otherValue')).toHaveValue('user typed value');
    // OTHER and an answer that has only a 'code', in checkbox display
    await expect(byId(page, answerId('/cwe-checkbox-user-value-and-answer-code/1', undefined, 'c1')).locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value-and-answer-code/1|_other').locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value-and-answer-code/1|_otherValue')).toHaveValue('user typed value');
    // OTHER and an answer that has only a 'text', in checkbox display
    await expect(byId(page, answerId('/cwe-checkbox-user-value-and-answer-text/1', undefined, 'c2')).locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value-and-answer-text/1|_other').locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value-and-answer-text/1|_otherValue')).toHaveValue('user typed value');
    // OTHER and an answer that has a 'code' and a 'text', in checkbox display
    await expect(byId(page, answerId('/cwe-checkbox-user-value-and-answer/1', undefined, 'c3')).locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value-and-answer/1|_other').locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-user-value-and-answer/1|_otherValue')).toHaveValue('user typed value');
    // default answer is not in the answer list, checkbox display, other value set
    await expect(byId(page, '/cwe-checkbox-default-answer/1|_other').locator('input[type=checkbox]')).toBeChecked();
    await expect(byId(page, '/cwe-checkbox-default-answer/1|_otherValue')).toHaveValue('off-list default answer');
    // OTHER, in radiobutton display with the user value not in the answer list
    await expect(byId(page, '/cwe-radio-user-value/1|_other').locator('input[type=radio]')).toBeChecked();
    await expect(byId(page, '/cwe-radio-user-value/1|_otherValue')).toHaveValue('user typed value');
    // default answer is not in the answer list, radiobutton display, other value set
    await expect(byId(page, '/cwe-radio-default-answer/1|_other').locator('input[type=radio]')).toBeChecked();
    await expect(byId(page, '/cwe-radio-default-answer/1|_otherValue')).toHaveValue('off-list default answer');
  });
});

test.describe('load saved user data, where hasSavedData is set to true', () => {
  test('should not load default values', async ({ page }) => {
    await openFormByIndex(page, 8); // FormWithUserDataWithHasSavedData
    await expect(byId(page, '/q5/1')).toHaveValue('');
    // default answer is not in the answer list
    await expect(byId(page, '/cwe-checkbox-default-answer/1|_other').locator('input')).not.toBeChecked();
    await expect(byId(page, '/cwe-radio-default-answer/1|_other').locator('input')).not.toBeChecked();
  });
});
