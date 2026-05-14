import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, answerId, waitForLFormsReady, loadFromTestData, addFormToPage } from '../support/lforms-helpers';

test.describe('Visual effect tests', () => {

  test.describe('Active field background color', () => {
    const dataTypes = ['BL', 'INT', 'REAL', 'ST', 'BIN', 'DT', 'DTM', 'TM', 'CODING',
      'RTO', 'QTY', 'YEAR', 'MONTH', 'DAY', 'URL', 'EMAIL', 'PHONE', 'TX'];

    for (let i = 0, len = dataTypes.length; i < len; ++i) {
      const d = dataTypes[i];
      const otherField = '/type' + (i + 1) + '/1';
      // NEXT: TODO
      // background should rgba(255, 248, 198, 1).
      // but somehow they are 'rgba(255, 248, 198, 0.04), rgba(255, 248, 198, 0.114) and rgba(255, 248, 198, 0.04), respectively
      // they look similar though.
      if (d === 'DT' || d === 'DTM' || d === 'TM') continue;
      if (d === 'BL') continue; // BL is a switch, which has no focused color

      // Active field background color should the be same for all types of fields
      test('should be the same for data type ' + d, async ({ page }) => {
        await openFormByIndex(page, 4); // FullFeaturedForm
        // Get background color of the empty data type field when focused
        const type0 = byId(page, '/type0/1');
        // The element changes background color on focus. For some reason this guarantees
        // that we get the updated color instead of sometimes getting rgb(255, 255, 255).
        await type0.focus();
        await type0.blur();
        await type0.click();

        const color = await type0.evaluate(
          el => getComputedStyle(el).backgroundColor
        );
        await byId(page, otherField).click();
        const otherColor = await byId(page, otherField).evaluate(
          el => getComputedStyle(el).backgroundColor
        );
        expect(otherColor).toBe(color);
      });
    }
  });

  test.describe('Question/section in question', () => {
    test('should show all the questions/sections defined in the question-in-question form', async ({ page }) => {
      await openFormByIndex(page, 14); // QuestionInQuestionForm

      await expect(byId(page, '/q1/1')).toBeVisible();
      await expect(byId(page, '/q1/q11/1/1')).toBeVisible();
      await expect(byId(page, '/q1/q12/1/1')).toBeVisible();

      await expect(byId(page, '/q2/1')).toBeVisible();
      await expect(byId(page, '/q2/q21/1/1')).toBeVisible();
      await expect(byId(page, '/q2/q22/q221/1/1/1')).toBeVisible();
      await expect(byId(page, '/q2/q22/q222/1/1/1')).toBeVisible();

      await expect(byId(page, '/q3/1')).toBeVisible();
      await expect(byId(page, '/q3/q31/1/1')).toBeVisible();
      await expect(byId(page, '/q3/q32/q321/1/1/1')).toBeVisible();
      await expect(byId(page, '/q3/q32/q322/1/1/1')).toBeVisible();

      await byId(page, 'add-/q3/q31/1/1').click();
      await expect(byId(page, '/q3/q31/1/2')).toBeVisible();

      await byId(page, 'add-/q3/q32/1/1').click();
      await expect(byId(page, '/q3/q32/q321/1/2/1')).toBeVisible();
      await expect(byId(page, '/q3/q32/q322/1/2/1')).toBeVisible();
    });
  });

  test.describe('Responsive display layout', () => {
    test('container should have different css class on different size', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await expect(byId(page, '/type0/1')).toBeAttached();

      // break point, 600
      await page.evaluate(() => (window as any).LForms.jQuery("wc-lhc-form").width(601));
      await expect(page.locator('wc-lhc-form')).toHaveJSProperty('offsetWidth', 601);
      await expect(page.locator('.lhc-form.lhc-view-lg')).toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-md')).not.toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-sm')).not.toBeAttached();

      await expect(page.locator('.lhc-item.lhc-item-view-lg').first().locator('#\\/q_lg\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-md').first().locator('#\\/q_md\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').first().locator('#\\/q_sm\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-lg').nth(1).locator('#\\/q_auto\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-md').nth(1)).not.toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').nth(1)).not.toBeAttached();

      await page.evaluate(() => (window as any).LForms.jQuery("wc-lhc-form").width(598));
      await expect(page.locator('.lhc-form.lhc-view-lg')).not.toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-md')).toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-sm')).not.toBeAttached();
      // check 4 questions
      await expect(page.locator('.lhc-item.lhc-item-view-lg').first().locator('#\\/q_lg\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-md').first().locator('#\\/q_md\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').first().locator('#\\/q_sm\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-md').nth(1).locator('#\\/q_auto\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-lg').nth(1).locator('#\\/q_auto\\/1')).not.toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').nth(1)).not.toBeAttached();

      // break point, 400
      await page.evaluate(() => (window as any).LForms.jQuery("wc-lhc-form").width(398));
      await expect(page.locator('.lhc-form.lhc-view-lg')).not.toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-md')).not.toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-sm')).toBeAttached();
      // check 4 questions
      await expect(page.locator('.lhc-item.lhc-item-view-lg').first().locator('#\\/q_lg\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-md').first().locator('#\\/q_md\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').first().locator('#\\/q_sm\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').nth(1).locator('#\\/q_auto\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-lg').nth(1)).not.toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-md').nth(1).locator('#\\/q_auto\\/1')).not.toBeAttached();

      await page.evaluate(() => (window as any).LForms.jQuery("wc-lhc-form").width(401));
      await expect(page.locator('.lhc-form.lhc-view-lg')).not.toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-md')).toBeAttached();
      await expect(page.locator('.lhc-form.lhc-view-sm')).not.toBeAttached();
      // check 4 questions
      await expect(page.locator('.lhc-item.lhc-item-view-md').nth(1).locator('#\\/q_auto\\/1')).toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-lg').nth(1)).not.toBeAttached();
      await expect(page.locator('.lhc-item.lhc-item-view-sm').nth(1).locator('#\\/q_auto\\/1')).not.toBeAttached();
    });
  });

  test.describe('displayControl.colCSS in horizontal table', () => {
    test('displayControl.colCSS should work for items in horizontal tables', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await expect(byId(page, '/type0/1')).toBeAttached();
      const firstCol = page.locator('.lhc-form-horizontal-table col').first();
      await expect(firstCol).toHaveAttribute('style', /width: 25%/);
      await expect(firstCol).toHaveAttribute('style', /min-width: 10%/);
      const secondCol = page.locator('.lhc-form-horizontal-table col').nth(1);
      await expect(secondCol).toHaveAttribute('style', /width: 25%/);
      await expect(secondCol).toHaveAttribute('style', /min-width: 15%/);
      const thirdCol = page.locator('.lhc-form-horizontal-table col').nth(2);
      await expect(thirdCol).toHaveAttribute('style', /width: 50%/);
    });
  });

  test.describe('radio buttons in a radio group', () => {
    test('should get to the first radio button using tab key and rest using arrow keys', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await byId(page, '/type0/1').click();
      await page.keyboard.press('Tab'); // focus on help button
      await page.keyboard.press('Tab'); // move to radio 'Not Answered'
      const focused = page.locator(':focus');
      await expect(focused).toHaveAttribute('name', 'radiogroup_/type1/1');
      await expect(focused.locator('xpath=../..')).toHaveAttribute('id', answerId('/type1/1', 'null'));
      // move to radio 'No'
      await page.keyboard.press('ArrowLeft');
      await expect(focused).toHaveAttribute('name', 'radiogroup_/type1/1');
      await expect(focused.locator('xpath=../..')).toHaveAttribute('id', answerId('/type1/1', 'false'));
      // move to radio 'Yes'
      await page.keyboard.press('ArrowLeft');
      await expect(focused).toHaveAttribute('name', 'radiogroup_/type1/1');
      await expect(focused.locator('xpath=../..')).toHaveAttribute('id', answerId('/type1/1', 'true'));
      // back to radio 'No'
      await page.keyboard.press('ArrowRight');
      await expect(focused).toHaveAttribute('name', 'radiogroup_/type1/1');
      await expect(focused.locator('xpath=../..')).toHaveAttribute('id', answerId('/type1/1', 'false'));

      // go to next question
      await page.keyboard.press('Tab');
      // move to radio 'Not Answered'
      await page.keyboard.press('Tab');
      await expect(focused).toHaveAttribute('name', 'radiogroup_/type1b/1');
      await expect(focused.locator('xpath=../..')).toHaveAttribute('id', answerId('/type1b/1', 'null'));
      // move to radio 'No'
      await page.keyboard.press('ArrowLeft');
      await expect(focused).toHaveAttribute('name', 'radiogroup_/type1b/1');
      await expect(focused.locator('xpath=../..')).toHaveAttribute('id', answerId('/type1b/1', 'false'));

      // go to next question
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(focused).toHaveAttribute('id', '/type2/1');
    });

    test('should clear radio selection when "clear selection" button is clicked', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'answerOption/answerOption-valueCoding.open-choice.R4.json', 'formContainer', {fhirVersion: 'R4', showRadioClearSelectionButton: true});
      const optionC3 = byId(page, 'valueCoding.open-choice-group2-item1/1/1||c3');
      const clearSelectionBtn = byId(page, 'valueCoding.open-choice-group2-item1/1/1|_clearSelection');
      const otherOption = byId(page, 'valueCoding.open-choice-group2-item1/1/1|_other');
      const otherValueInput = byId(page, 'valueCoding.open-choice-group2-item1/1/1|_otherValue');

      // Select a radio option.
      await optionC3.click();
      await expect(optionC3.locator('input')).toBeChecked();
      // Clear selection.
      await clearSelectionBtn.click();
      // Radio option should be unselected.
      await expect(optionC3.locator('input')).not.toBeChecked();
      // Check Other option and type in Other value.
      await otherOption.click();
      await expect(otherOption.locator('input[type="radio"]')).toBeChecked();
      await otherValueInput.fill('abc');
      // Exported QR has 3 items.
      const qr1 = await page.evaluate(() => {
        return (window as any).LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
      });
      expect(qr1.item.length).toBe(3);
      // Clear selection.
      await clearSelectionBtn.click();
      // Other option should be unselected, and Other value should be gone.
      await expect(otherOption.locator('input[type="radio"]')).not.toBeChecked();
      await expect(otherValueInput).not.toBeAttached();
      // Exported QR now has 2 items because the radio selection is cleared.
      const qr2 = await page.evaluate(() => {
        return (window as any).LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
      });
      expect(qr2.item.length).toBe(2);
    });

    test('should clear radio selection when "clear selection" button is clicked - matrix layout', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'matrixLayout-initialvalue-choice-non-repeats.R4.json', 'formContainer', {
        fhirVersion: 'R4',
        showRadioClearSelectionButton: true
      });
      // A radio option is initially selected.
      await expect(byId(page, '/g1m1/1/1||c2')).toBeChecked();
      // Exported QR has 3 items.
      const qr1 = await page.evaluate(() => {
        return (window as any).LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
      });
      expect(qr1.item[0].item.length).toBe(3);
      // Clear selection.
      await byId(page, '/g1m1/1/1|_clearSelection').click();
      // Radio option should be unselected.
      await expect(byId(page, '/g1m1/1/1||c2')).not.toBeChecked();
      // Exported QR now has 2 items because the radio selection is cleared.
      const qr2 = await page.evaluate(() => {
        return (window as any).LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
      });
      expect(qr2.item[0].item.length).toBe(2);
    });
  });

  test.describe('tree lines', () => {
    test('should reset treeline after enableWhenExpression is run', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await page.click('#hideTreeLineFalse');
      await loadFromTestData(page, 'enableWhenExpressionTest.json', 'R4');

      const n1 = byId(page, 'n1/1/1');
      const n2 = byId(page, 'n2/1/1');
      const n3 = byId(page, 'n3/1/1');
      const q4 = byId(page, 'q4/1/1'); // present when n1+n2+n3 >= 5;

      await expect(n1).toBeVisible();
      await expect(q4).not.toBeAttached();
      await n1.click();
      await n1.pressSequentially('1');
      await n2.click();
      await n2.pressSequentially('2');
      await n3.click();
      await n3.pressSequentially('3');
      await expect(q4).toBeVisible();

      const itemN3 = byId(page, 'item-n3/1/1');
      await expect(itemN3).toHaveClass(/lhc-tree-line/);
      await expect(itemN3).not.toHaveClass(/lhc-last-item/);
      const itemQ4 = byId(page, 'item-q4/1/1');
      await expect(itemQ4).toHaveClass(/lhc-tree-line/);
      await expect(itemQ4).toHaveClass(/lhc-last-item/);
    });

    test('should not show treeline by default if the questionnaire is 3 levels deep', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-3-level-deep.json', 'R4');
      await expect(byId(page, 'item-level3/1/1/1')).not.toHaveClass(/lhc-tree-line/);
    });

    test('should show treeline by default if the questionnaire is 4 levels deep', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-4-level-deep.json', 'R4');
      await expect(byId(page, 'item-level2/1/1')).toHaveClass(/lhc-tree-line/);
      await expect(byId(page, 'item-level3/1/1/1')).toHaveClass(/lhc-tree-line/);
      await expect(byId(page, 'item-level4/1/1/1/1')).toHaveClass(/lhc-tree-line/);
    });
  });

  test.describe('Questionnaire.code and item.code', () => {
    test('should not display any code when showQuestionCode is false', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multipleCodes.json', 'formContainer', { fhirVersion: 'R4', showQuestionCode: false });
      await expect(page.locator('.lhc-item-code')).toHaveCount(0);
    });

    test('should not display any code when showQuestionCode is not present', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multipleCodes.json', 'formContainer', { fhirVersion: 'R4' });
      await expect(page.locator('.lhc-item-code')).toHaveCount(0);
    });

    test('should display all codes when showQuestionCode is true', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multipleCodes.json', 'formContainer', { fhirVersion: 'R4', showQuestionCode: true });
      const itemCodes = page.locator('.lhc-item-code');
      await expect(itemCodes.nth(0)).toContainText('[example]');
      await expect(itemCodes.nth(0)).not.toHaveAttribute('href');
      await expect(itemCodes.nth(1)).toContainText('[85353-1]');
      await expect(itemCodes.nth(1)).toHaveAttribute('href', 'https://loinc.org/85353-1');
      await expect(itemCodes.nth(2)).toContainText('[example]');
      await expect(itemCodes.nth(2)).not.toHaveAttribute('href');
      await expect(itemCodes.nth(3)).toContainText('[29463-7]');
      await expect(itemCodes.nth(3)).toHaveAttribute('href', 'https://loinc.org/29463-7');
      await expect(itemCodes.nth(4)).toContainText('[example]');
      await expect(itemCodes.nth(5)).toContainText('[29463-7]');
      await expect(itemCodes.nth(6)).toContainText('[example]');
      await expect(itemCodes.nth(7)).toContainText('[29463-7]');
    });
  });
});
