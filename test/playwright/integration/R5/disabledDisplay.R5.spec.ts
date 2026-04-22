import { test, expect } from '@playwright/test';
import { byId, answerId, addFormToPage, waitForLFormsReady } from '../../support/lforms-helpers';

test.describe('item.disabledDisplay is "protected" or its inherited disabledDisplay value is "protected"', () => {

  async function setupPage(page) {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-disabledDisplay.R5.json', 'formContainer', { fhirVersion: 'R5' });
  }

  test('items should be displayed and disabled when enableWhen returns false', async ({ page }) => {
    await setupPage(page);
    // click on source item and select No
    await byId(page, answerId('s1/1', 'false')).click();

    // check items with disabledDisplay = 'protected'
    // string question
    await expect(byId(page, 'item-a2/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-a2/1')).toBeVisible();
    await expect(byId(page, 'a2/1')).toBeVisible();
    await expect(byId(page, 'a2/1')).toBeDisabled();
    // coding question
    await expect(byId(page, 'item-a2a/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-a2a/1')).toBeVisible();
    await expect(byId(page, 'a2a/1')).toBeVisible();
    await expect(byId(page, 'a2a/1')).toBeDisabled();
    // display
    await expect(byId(page, 'item-b2/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-b2/1')).toBeVisible();

    // group, disabledDisplay is 'protected'
    await expect(byId(page, 'item-g3/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3/1')).toBeVisible();
    // string question in a group
    await expect(byId(page, 'item-g3a2/1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3a2/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2/1/1')).toBeDisabled();
    // coding question in a group
    await expect(byId(page, 'item-g3a2a/1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3a2a/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2a/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2a/1/1')).toBeDisabled();
    // display in a group
    await expect(byId(page, 'item-g3b2/1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3b2/1/1')).toBeVisible();
    // group in a group
    await expect(byId(page, 'item-g3g2/1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3g2/1/1')).toBeVisible();
    // question in a group in a group
    await expect(byId(page, 'item-g3g2a1/1/1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3g2a1/1/1/1')).toBeVisible();
    await expect(byId(page, 'g3g2a1/1/1/1')).toBeVisible();
    await expect(byId(page, 'g3g2a1/1/1/1')).toBeDisabled();
    // display in a group in a group
    await expect(byId(page, 'item-g3g2b1/1/1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3g2b1/1/1/1')).toBeVisible();

    // radio buttons
    await expect(byId(page, 'item-coding1/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-coding1/1')).toBeVisible();
    await expect(byId(page, answerId('coding1/1', undefined, 'c1')).locator('input').first()).toBeDisabled();

    // checkboxes
    await expect(byId(page, 'item-coding2/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-coding2/1')).toBeVisible();
    await expect(byId(page, answerId('coding2/1', undefined, 'c1')).locator('input').first()).toBeDisabled();

    // horizontal table
    await expect(byId(page, 'item-g4/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g4/1')).toBeVisible();
    await expect(byId(page, 'g4col1/1/1')).toBeVisible();
    await expect(byId(page, 'g4col1/1/1')).toBeDisabled();
    await expect(byId(page, 'g4col2/1/1')).toBeVisible();
    await expect(byId(page, 'g4col2/1/1')).toBeDisabled();

    // matrix, with checkboxes
    await expect(byId(page, 'item-g5/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g5/1')).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', undefined, 'c1'))).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', undefined, 'c1'))).toBeDisabled();
    await expect(byId(page, answerId('g5q1/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', '_other'))).toBeDisabled();
    await expect(byId(page, answerId('g5q1/1/1', '_otherValue'))).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', '_otherValue'))).toBeDisabled();

    // matrix, with radio buttons
    await expect(byId(page, 'item-g6/1')).toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g6/1')).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', undefined, 'c1'))).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', undefined, 'c1'))).toBeDisabled();
    await expect(byId(page, answerId('g6q1/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', '_other'))).toBeDisabled();
    await expect(byId(page, answerId('g6q1/1/1', '_otherValue'))).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', '_otherValue'))).toBeDisabled();
  });

  test('exported QR should not include items that are disabled but protected when enableWhen returns false', async ({ page }) => {
    await setupPage(page);
    // click on source item and select No
    await byId(page, answerId('s1/1', 'false')).click();

    const fhirQR = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R5')
    );
    expect(fhirQR.item.length).toBe(1);
    expect(fhirQR.item[0].linkId).toBe('s1');
    expect(fhirQR.item[0].answer[0]).toEqual({ valueBoolean: false });
  });

  test('items should be displayed and enabled when enableWhen returns true', async ({ page }) => {
    await setupPage(page);
    // click on source item and select Yes
    await byId(page, answerId('s1/1', 'true')).click();

    // check items without disabled-protected class
    await expect(byId(page, 'item-a2/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-a2/1')).toBeVisible();
    await expect(byId(page, 'a2/1')).toBeVisible();
    await expect(byId(page, 'a2/1')).not.toBeDisabled();

    await expect(byId(page, 'item-a2a/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-a2a/1')).toBeVisible();
    await expect(byId(page, 'a2a/1')).toBeVisible();
    await expect(byId(page, 'a2a/1')).not.toBeDisabled();

    await expect(byId(page, 'item-b2/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-b2/1')).toBeVisible();

    // group
    await expect(byId(page, 'item-g3/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3/1')).toBeVisible();
    await expect(byId(page, 'item-g3a2/1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3a2/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2/1/1')).not.toBeDisabled();
    await expect(byId(page, 'item-g3a2a/1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3a2a/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2a/1/1')).toBeVisible();
    await expect(byId(page, 'g3a2a/1/1')).not.toBeDisabled();
    await expect(byId(page, 'item-g3b2/1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3b2/1/1')).toBeVisible();
    await expect(byId(page, 'item-g3g2/1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3g2/1/1')).toBeVisible();
    await expect(byId(page, 'item-g3g2a1/1/1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3g2a1/1/1/1')).toBeVisible();
    await expect(byId(page, 'g3g2a1/1/1/1')).toBeVisible();
    await expect(byId(page, 'g3g2a1/1/1/1')).not.toBeDisabled();
    await expect(byId(page, 'item-g3g2b1/1/1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g3g2b1/1/1/1')).toBeVisible();

    // radio buttons
    await expect(byId(page, 'item-coding1/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-coding1/1')).toBeVisible();
    await expect(byId(page, answerId('coding1/1', undefined, 'c1')).locator('input').first()).not.toBeDisabled();

    // checkboxes
    await expect(byId(page, 'item-coding2/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-coding2/1')).toBeVisible();
    await expect(byId(page, answerId('coding2/1', undefined, 'c1')).locator('input').first()).not.toBeDisabled();

    // horizontal table
    await expect(byId(page, 'item-g4/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g4/1')).toBeVisible();
    await expect(byId(page, 'g4col1/1/1')).toBeVisible();
    await expect(byId(page, 'g4col1/1/1')).not.toBeDisabled();
    await expect(byId(page, 'g4col2/1/1')).toBeVisible();
    await expect(byId(page, 'g4col2/1/1')).not.toBeDisabled();

    // matrix, with checkboxes
    await expect(byId(page, 'item-g5/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g5/1')).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', undefined, 'c1'))).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', undefined, 'c1'))).not.toBeDisabled();
    await expect(byId(page, answerId('g5q1/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', '_other'))).not.toBeDisabled();
    await expect(byId(page, answerId('g5q1/1/1', '_otherValue'))).toBeVisible();
    await expect(byId(page, answerId('g5q1/1/1', '_otherValue'))).not.toBeDisabled();

    // matrix, with radio buttons
    await expect(byId(page, 'item-g6/1')).not.toHaveClass(/lhc-item-disabled-protected/);
    await expect(byId(page, 'item-g6/1')).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', undefined, 'c1'))).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', undefined, 'c1'))).not.toBeDisabled();
    await expect(byId(page, answerId('g6q1/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', '_other'))).not.toBeDisabled();
    await expect(byId(page, answerId('g6q1/1/1', '_otherValue'))).toBeVisible();
    await expect(byId(page, answerId('g6q1/1/1', '_otherValue'))).not.toBeDisabled();
  });
});
