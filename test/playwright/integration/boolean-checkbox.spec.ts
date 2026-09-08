import { test, expect, type Page } from '@playwright/test';
import { addFormToPage, answerId, byId, waitForLFormsReady } from '../support/lforms-helpers';

/**
 * Assert that a boolean item is rendered as a group of three radio buttons
 * (true / false / not-answered), and that selecting each option sets (or, for
 * "not answered", clears) the boolean value correctly in the exported
 * QuestionnaireResponse.
 * @param page - The Playwright page instance, with the form already loaded.
 */
async function testThreeStateRadioButtons(page: Page): Promise<void> {
  const yesOption = byId(page, answerId('1/1', 'true'));
  const noOption = byId(page, answerId('1/1', 'false'));
  const notAnsweredOption = byId(page, answerId('1/1', 'null'));

  await expect(page.locator('input[type="radio"]')).toHaveCount(3);
  await expect(page.locator('[role="checkbox"]')).toHaveCount(0);

  await yesOption.click();
  await expect(yesOption.locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
  let questionnaireResponse = await page.evaluate(() =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
  expect(questionnaireResponse.item[0].answer[0].valueBoolean).toBe(true);

  await noOption.click();
  await expect(noOption.locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
  await expect(yesOption.locator('span.ant-radio')).not.toHaveClass(/ant-radio-checked/);
  questionnaireResponse = await page.evaluate(() =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
  expect(questionnaireResponse.item[0].answer[0].valueBoolean).toBe(false);

  await notAnsweredOption.click();
  await expect(notAnsweredOption.locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
  await expect(noOption.locator('span.ant-radio')).not.toHaveClass(/ant-radio-checked/);
  questionnaireResponse = await page.evaluate(() =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
  expect(questionnaireResponse.item).toBeUndefined();
}

test.describe('Boolean item control rendering', () => {
  test.describe('No item control (default)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'default-boolean.json', 'formContainer', { fhirVersion: 'R4' });
    });

    test('should render as radio buttons and set the boolean value correctly', async ({ page }) => {
      await testThreeStateRadioButtons(page);
    });

    test('should not add an itemControl extension when exporting the Questionnaire', async ({ page }) => {
      const questionnaire = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
      const itemControl = questionnaire.item[0].extension?.find(
        (extension: any) => extension.url ===
          'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');

      expect(itemControl).toBeUndefined();
    });
  });

  test.describe('Radio-button item control', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'radio-button-boolean.json', 'formContainer', { fhirVersion: 'R4' });
    });

    test('should render as radio buttons and set the boolean value correctly', async ({ page }) => {
      await testThreeStateRadioButtons(page);
    });

    test('should preserve the radio-button item control when exporting the Questionnaire', async ({ page }) => {
      const questionnaire = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
      const itemControl = questionnaire.item[0].extension.find(
        (extension: any) => extension.url ===
          'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');

      expect(itemControl.valueCodeableConcept.coding[0].code).toBe('radio-button');
    });
  });

  test.describe('Check-box item control', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'checkbox-boolean.json', 'formContainer', { fhirVersion: 'R4' });
    });

    test('should render as a checkbox (not radio buttons)', async ({ page }) => {
      const checkbox = byId(page, answerId('1/1', 'checkbox'));

      await expect(checkbox).toHaveAttribute('role', 'checkbox');
      await expect(checkbox).toHaveAccessibleName('Do you agree?');
      await expect(checkbox).toHaveAccessibleDescription('Not Answered');
      await expect(page.locator('input[type="radio"]')).toHaveCount(0);
    });

    test('should render and store all three boolean states', async ({ page }) => {
      const checkbox = byId(page, answerId('1/1', 'checkbox'));
      const status = page.locator('.lhc-boolean-checkbox-status');

      await expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      await expect(status).toHaveText('Not Answered');

      await checkbox.click();
      await expect(checkbox).toHaveAttribute('aria-checked', 'true');
      await expect(checkbox).toHaveClass(/lhc-boolean-checkbox-positive/);
      await expect(status).toHaveText('Yes');
      let questionnaireResponse = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
      expect(questionnaireResponse.item[0].answer[0].valueBoolean).toBe(true);

      await checkbox.click();
      await expect(checkbox).toHaveAttribute('aria-checked', 'false');
      await expect(checkbox).toHaveClass(/lhc-boolean-checkbox-negative/);
      await expect(status).toHaveText('No');
      questionnaireResponse = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
      expect(questionnaireResponse.item[0].answer[0].valueBoolean).toBe(false);

      await checkbox.press('Space');
      await expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      await expect(checkbox).toHaveClass(/lhc-boolean-checkbox-unanswered/);
      await expect(status).toHaveText('Not Answered');
      questionnaireResponse = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
      expect(questionnaireResponse.item).toBeUndefined();
    });

    test('should preserve the check-box item control when exporting the Questionnaire', async ({ page }) => {
      const questionnaire = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
      const itemControl = questionnaire.item[0].extension.find(
        (extension: any) => extension.url ===
          'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');

      expect(itemControl.valueCodeableConcept.coding[0].code).toBe('check-box');
    });
  });
});
