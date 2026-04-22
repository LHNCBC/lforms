import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId, answerId } from '../support/lforms-helpers';

// Tests of the support for calculatedExpression.
test.describe('calculatedExpression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
  });

  test('should not cause a field to be readonly', async ({ page }) => {
    await addFormToPage(page, 'editableCalcExp.json', 'formContainer', { fhirVersion: 'R4' });
    // Check that the BMI field is not disabled
    const disabled = await byId(page, '/39156-5/1').getAttribute('disabled');
    expect(disabled).toBeNull();
  });

  test('should update the boolean field when the calculatedExpression changes', async ({ page }) => {
    await addFormToPage(page, 'calculatedExpression-on-boolean-item.json', 'formContainer', { fhirVersion: 'R4' });
    await expect(byId(page, answerId('overweight/1', 'null'))).toHaveClass(/ant-radio-wrapper-checked/);
    await byId(page, 'weight/1').pressSequentially('10');
    await expect(byId(page, answerId('overweight/1', 'false'))).toHaveClass(/ant-radio-wrapper-checked/);
    await byId(page, 'weight/1').fill('');
    await byId(page, 'weight/1').pressSequentially('102');
    await expect(byId(page, answerId('overweight/1', 'true'))).toHaveClass(/ant-radio-wrapper-checked/);
  });

  test.describe('for single-select lists', () => {
    
    test('should be able to set and reset answer/list using calculatedExpression and answerExpression', async ({ page }) => {
      await addFormToPage(page, 'calculatedListAnwers.json', 'formContainer', { fhirVersion: 'R4' });
      await page.locator('#inputList\\/1').click();
      // pick the first item, which is "blue"
      await page.locator('#completionOptions li').first().click();
      // assert the calculated answer is set to "blue"
      await expect(page.locator('#calculatedAnswer\\/1\\/1')).toHaveValue('blue');
      // assert the calculated list option is set to "blue"      // Clearing the field, which is currently autopopulated, but we will be
      // disabling that behavior soon.      await page.locator('#calculatedListOption\\/1\\/1').fill('');
      await page.locator('#calculatedListOption\\/1\\/1').click();
      await expect(page.locator('#completionOptions li').first()).toBeVisible();
      await expect(page.locator('#completionOptions li').first()).toContainText('blue');

      // assert selected item contains 'blue' before removal
      await expect(page.locator('#inputList\\/1').locator('..').locator('li:first-child')).toContainText('blue');
      // remove the selected item
      const selectedItem = page.locator('#inputList\\/1').locator('..').locator('li:first-child span');
      await selectedItem.click();
      // assert 'blue' is gone after removal
      await expect(page.locator('#inputList\\/1').locator('..')).not.toContainText('blue');
      // assert the calculated answer is reset to empty
      await expect(page.locator('#calculatedAnswer\\/1\\/1')).toHaveValue('');
      // assert the calculated list option is reset to empty
      await expect(page.locator('#calculatedListOption\\/1\\/1')).toHaveValue('');
    });
  });

  test.describe('for multi-select lists', () => {
    test('should be able to set and reset answers/list using calculatedExpression and answerExpression', async ({ page }) => {
      await addFormToPage(page, 'calculatedListAnwers.json', 'formContainer', { fhirVersion: 'R4' });
      await page.locator('#inputList\\/1').click();
      const completionOptions = page.locator('#completionOptions li');

      // pick the first item, which is "blue"
      await completionOptions.first().click();
      // After selecting "blue", the dropdown keeps only the remaining option.
      // Pick that remaining option, which is "green".
      await expect(completionOptions.first()).toContainText('green');
      await completionOptions.first().click();
      // assert both "blue" and "green" are selected
      await expect(byId(page, 'calculatedAnswers/1/1').locator('..')).toContainText('blue');
      await expect(byId(page, 'calculatedAnswers/1/1').locator('..')).toContainText('green');
      // assert the calculated list options are set to "blue" and "green" but nothing is seleted
      await expect(page.locator('#calculatedListOptions\\/1\\/1')).toHaveValue('');
      await page.locator('#calculatedListOptions\\/1\\/1').click();
      await expect(completionOptions.first()).toBeVisible();
      await expect(completionOptions.first()).toContainText('blue');
      await expect(completionOptions.nth(1)).toContainText('green');

      // remove the selected item, "blue"
      const selectedItem = page.locator('#inputList\\/1').locator('..').locator('li:first-child span');
      await selectedItem.click();
      // assert only "green" is selected
      await expect(byId(page, 'calculatedAnswers/1/1').locator('..')).toContainText('green');
      // assert the calculated list options is set to "green" but nothing is seleted
      await expect(page.locator('#calculatedListOptions\\/1\\/1')).toHaveValue('');
      await page.locator('#calculatedListOptions\\/1\\/1').click();
      await expect(completionOptions.first()).toBeVisible();
      await expect(completionOptions.first()).toContainText('green');
    });

  });

  test.describe('splitting a string', () => {
    test.beforeEach(async ({ page }) => {
      await addFormToPage(page, 'questionnaire-calculatedExpression.json', 'formContainer', { fhirVersion: 'R4' });
      await page.locator('#string-to-split\\/1').pressSequentially('ab');
    });

    test('should be able to assign strings to a string field', async ({ page }) => {
      await expect(page.locator('#repeating-string\\/1')).toHaveValue('a');
      await expect(page.locator('#repeating-string\\/2')).toHaveValue('b');
    });

    test('should be able to assign strings to a list field', async ({ page }) => {
      await expect(byId(page, 'repeating-open-choice/1').locator('..').locator('li').first()).toContainText('a');
      await expect(byId(page, 'repeating-open-choice/1').locator('..').locator('li').nth(1)).toContainText('b');
    });

    test('should be able to assign off-list string values from another field as values', async ({ page }) => {
      await expect(byId(page, 'repeating-open-choice-from-string/1').locator('..').locator('li').first()).toContainText('a');
      await expect(byId(page, 'repeating-open-choice-from-string/1').locator('..').locator('li').nth(1)).toContainText('b');
    });

    test('should be able to remove a repetition of a string field and a value from a list', async ({ page }) => {
      const field = page.locator('#string-to-split\\/1');
      await field.press('End');
      await field.press('Backspace');
      await expect(field).toHaveValue('a');
      await expect(page.locator('#repeating-string\\/1')).toHaveValue('a');
      await expect(page.locator('#repeating-string\\/2')).not.toBeAttached();
      await expect(byId(page, 'repeating-open-choice/1').locator('..').locator('li').first()).toContainText('a');
    });

    test('should not delete the last repetition of a field', async ({ page }) => {
      const field = page.locator('#string-to-split\\/1');
      await field.press('End');
      await field.press('Backspace');
      await field.press('Backspace');
      await expect(page.locator('#repeating-string\\/1')).toHaveValue('');
      await expect(byId(page, 'repeating-open-choice/1').locator('..').locator('li')).toHaveCount(0);
    });

    test('should allow the user to override values of the repeating string field', async ({ page }) => {
      // Clear source field to disable calculated expression
      // Clear source field to disable calculated expression
      await page.locator('#string-to-split\\/1').fill('');
      await page.locator('#string-to-split\\/1').blur();
      await expect(page.locator('#repeating-string\\/1')).toHaveValue('');
      // Type 'one', but while doing so, check for a bug where the first character disappears
      const repField = page.locator('#repeating-string\\/1');
      await repField.pressSequentially('o');
      await expect(repField).toHaveValue('o');
      await repField.pressSequentially('ne');

      await page.locator('#add-repeating-string\\/1').click();
      await page.locator('#repeating-string\\/2').fill('two');
      await expect(page.locator('#repeating-string\\/1')).toHaveValue('one');
      await expect(page.locator('#repeating-string\\/2')).toHaveValue('two');
    });

    test('should be able to update the number of selecting codings', async ({ page }) => {
      await page.locator('#oneCoding\\/1').click();
      const listItems = page.locator('#lhc-tools-searchResults li');
      await expect(listItems.first()).toBeVisible();
      await listItems.filter({ hasText: 'Yes' }).first().click();
      await expect(byId(page, 'repeating-open-choice-coding/1').locator('..').locator('li')).toHaveCount(1);
      await expect(byId(page, 'repeating-open-choice-coding/1').locator('..').locator('li').first()).toContainText('Blue');

      // Now allow both codings
      await page.locator('#oneCoding\\/1').click();
      await expect(listItems.first()).toBeVisible();
      await listItems.filter({ hasText: 'No' }).first().click();
      await expect(byId(page, 'repeating-open-choice-coding/1').locator('..').locator('li')).toHaveCount(2);
      await expect(byId(page, 'repeating-open-choice-coding/1').locator('..').locator('li').first()).toContainText('Blue');
      await expect(byId(page, 'repeating-open-choice-coding/1').locator('..').locator('li').nth(1)).toContainText('Green');
    });
  });

  test.describe('splitting a string in a repeating group', () => {
    test('should have separate repetition sets within group repetitions', async ({ page }) => {
      await addFormToPage(page, 'questionnaire-calculatedExpression.json', 'formContainer', { fhirVersion: 'R4' });
      await byId(page, 'non-repeating-q/1/1').pressSequentially('ab');
      await byId(page, 'add-repeating-group/1').click();
      await byId(page, 'non-repeating-q/2/1').pressSequentially('cd');
      await expect(byId(page, 'repeating-q-in-repeating-group/1/1')).toHaveValue('a');
      await expect(byId(page, 'repeating-q-in-repeating-group/1/2')).toHaveValue('b');
      await expect(byId(page, 'repeating-q-in-repeating-group/2/1')).toHaveValue('c');
      await expect(byId(page, 'repeating-q-in-repeating-group/2/2')).toHaveValue('d');
    });
  });

  test.describe('answerExpression and calculatedExpression on repeating items', () => {
    test('should have FHIRPath expression calculated when a repeating item is added and/or removed', async ({ page }) => {
      await addFormToPage(page, 'fhirpath-expression-on-repeating-items.R4.json', 'formContainer', { fhirVersion: 'R4' });
      const searchResults = page.locator('#lhc-tools-searchResults li');

      // expression works on the first group
      const p1 = byId(page, 'p1.10.1.1/1/1/1/1');
      const p0 = byId(page, 'p1.10.1.2/1/1/1/1');
      await p1.click();
      await expect(searchResults).toHaveCount(2);
      await p1.press('ArrowDown');
      await p1.press('Enter');
      await expect(p1).toHaveValue('NIH');
      await expect(p0).toHaveValue('NIH-2021-5678901234567');

      // add a new repeating group
      await byId(page, 'add-p1.10.1/1/1/1').click();
      // expression works on the second group
      const p2 = byId(page, 'p1.10.1.1/1/1/2/1');
      await p2.click();
      await expect(searchResults).toHaveCount(2);
      await p2.press('ArrowDown');
      await p2.press('ArrowDown');
      await p2.press('Enter');
      await expect(p2).toHaveValue('Immunotherapy Industry Association');
      await expect(byId(page, 'p1.10.1.2/1/1/2/1')).toHaveValue('IIA900000');

      // add a third repeating group
      await byId(page, 'add-p1.10.1/1/1/2').click();
      const p3 = byId(page, 'p1.10.1.1/1/1/3/1');
      await p3.click();
      await expect(searchResults).toHaveCount(2);
      await p3.press('ArrowDown');
      await p3.press('Enter');
      await expect(p3).toHaveValue('NIH');
      await expect(byId(page, 'p1.10.1.2/1/1/3/1')).toHaveValue('NIH-2021-5678901234567');

      // delete the second repeating group
      await byId(page, 'del-p1.10.1/1/1/2').click();
      // values remain in the remaining 2 groups
      await expect(p1).toHaveValue('NIH');
      await expect(p0).toHaveValue('NIH-2021-5678901234567');
      await expect(p3).toHaveValue('NIH');
      await expect(byId(page, 'p1.10.1.2/1/1/3/1')).toHaveValue('NIH-2021-5678901234567');

      // expression works in the remaining 2 groups
      await p1.click();
      await expect(searchResults).toHaveCount(2);
      await p1.press('ArrowDown');
      await p1.press('ArrowDown');
      await p1.press('Enter');
      await expect(p1).toHaveValue('Immunotherapy Industry Association');
      await expect(p0).toHaveValue('IIA900000');

      await p3.click();
      await expect(searchResults).toHaveCount(2);
      await p3.press('ArrowDown');
      await p3.press('ArrowDown');
      await p3.press('Enter');
      await expect(p3).toHaveValue('Immunotherapy Industry Association');
      await expect(byId(page, 'p1.10.1.2/1/1/3/1')).toHaveValue('IIA900000');
    });

    test('should have FHIRPath expressions work with R5 Coding items', async ({ page }) => {
      await addFormToPage(page, 'calculatedListAnswers.R5.json', 'formContainer', { fhirVersion: 'R5' });
      const searchResults = page.locator('#lhc-tools-searchResults li');

      // input
      await byId(page, 'inputList/1').click();
      await expect(searchResults).toHaveCount(2);
      await byId(page, 'inputList/1').press('ArrowDown');
      await byId(page, 'inputList/1').press('Enter');
      await expect(byId(page, 'item-inputList/1').locator('lhc-autocomplete li')).toHaveCount(1);
      await expect(byId(page, 'item-inputList/1').locator('lhc-autocomplete li').first()).toContainText('blue');

      // single-select calculated answer
      await expect(byId(page, 'calculatedAnswer/1/1')).toHaveValue('blue');

      // single-select calculated list option
      await byId(page, 'calculatedListOption/1/1').click();
      await expect(searchResults).toHaveCount(1);
      await expect(searchResults.first()).toContainText('blue');

      // multi-select calculated answers
      await expect(byId(page, 'item-calculatedAnswers/1/1').locator('lhc-autocomplete li')).toHaveCount(1);
      await expect(byId(page, 'item-calculatedAnswers/1/1').locator('lhc-autocomplete li').first()).toContainText('blue');

      // multi-select calculated list options
      await byId(page, 'calculatedListOptions/1/1').click();
      await expect(searchResults).toHaveCount(1);
      await expect(searchResults.first()).toContainText('blue');
    });
  });

  test.describe('calculatedExpression on valueset.expansion contained codings', () => {
    test('should support itemWeight extension in R4 for calculating scores', async ({ page }) => {
      await addFormToPage(page, 'calc-weight/q-with-contained-valueset-with-itemWeight.json', 'formContainer', { fhirVersion: 'R4' });
      // ordinalValue
      const link1 = byId(page, 'link-1.1.1/1/1/1');
      await link1.click();
      await link1.press('ArrowDown');
      await link1.press('ArrowDown');
      await link1.press('Enter');
      const link2 = byId(page, 'link-1.1.2/1/1/1');
      await link2.click();
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('Enter');
      await expect(byId(page, 'link-2/1')).toHaveValue('12');

      // itemWeight
      await link1.click();
      await link1.press('ArrowDown');
      await link1.press('Enter');
      await link2.click();
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('Enter');
      await expect(byId(page, 'link-2/1')).toHaveValue('21');

      // initialExpression should also work with itemWeight.
      await expect(byId(page, 'link-3/1')).toHaveValue('1');
    });

    test('should support ordinalValue extension in R5 for calculating scores', async ({ page }) => {
      await addFormToPage(page, 'calc-weight/q-with-contained-valueset-with-ordinalValue.json', 'formContainer', { fhirVersion: 'R5' });
      await expect(byId(page, 'link-2/1')).toHaveValue('');
      const link1 = byId(page, 'link-1.1.1/1/1/1');
      await link1.click();
      await link1.press('ArrowDown');
      await link1.press('ArrowDown');
      await link1.press('Enter');
      const link2 = byId(page, 'link-1.1.2/1/1/1');
      await link2.click();
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('Enter');
      await expect(byId(page, 'link-2/1')).toHaveValue('12');

      await link1.click();
      await link1.press('ArrowDown');
      await link1.press('Enter');
      await link2.click();
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('ArrowDown');
      await link2.press('Enter');
      await expect(byId(page, 'link-2/1')).toHaveValue('21');
    });
  });
});
