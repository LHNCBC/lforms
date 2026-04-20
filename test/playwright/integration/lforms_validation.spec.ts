import { test, expect, Page } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests validation behavior for a single input type: verifies error messages
 * appear/disappear correctly on focus changes and with valid/invalid values.
 * @param page - The Playwright page object.
 * @param eleInput - Selector for the input element to test.
 * @param eleAway - Selector for an element to click to move focus away.
 * @param eleContainer - Selector for the validation message container.
 * @param eleMessage - The expected validation message text.
 * @param value1 - An invalid value that should trigger the validation message.
 * @param value2 - A valid value that should clear the validation message.
 * @returns A promise that resolves when all validation checks complete.
 */
async function testOneType(page: Page, eleInput: string, eleAway: string, eleContainer: string, eleMessage: string, value1: string, value2: string) {
  // no initial validations
  await expect(page.locator(eleContainer)).not.toBeAttached();
  // no error messages on first visit
  await byId(page, eleInput).pressSequentially(value1);
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeAttached();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).not.toBeVisible();
  // show message when the focus is gone
  await page.locator(eleAway).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeAttached();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeVisible();
  // message disappears after a short period
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).not.toBeVisible();
  // get back focus again and message should be shown
  await expect(byId(page, eleInput)).toBeVisible();
  await byId(page, eleInput).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeVisible();

  // no message on the 2nd time when the focus is lost
  await page.locator(eleAway).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).not.toBeVisible();
  // get back focus the 3rd time and message should be shown
  await byId(page, eleInput).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeVisible();
  // valid value no messages
  await byId(page, eleInput).clear();
  await byId(page, eleInput).pressSequentially(value2);
  await expect(page.locator(eleContainer)).not.toBeAttached();
  // still no message when the focus is gone
  await page.locator(eleAway).click();
  await expect(page.locator(eleContainer)).not.toBeAttached();
}

test.describe('Validations', () => {
  test.use({ expect: { timeout: 10000 } });
  const errorContainer = 'div.validation-error';
  const errorINT = 'must be an integer number';
  const errorREAL = 'must be a decimal number';
  const errorURL = 'must be a valid URL';
  const errorEMAIL = 'must be a valid email address';
  const errorPHONE = 'must be a valid phone number';
  const errorNR = 'must be two numeric values separated by a ^. One value can be omitted, but not the ^';
  const errorMinExclusive = 'must be a value greater than ';
  const errorMinInclusive = 'must be a value greater than or equal to ';
  const errorMaxExclusive = 'must be a value less than ';
  const errorMaxInclusive = 'must be a value less than or equal to ';
  const errorLength = 'must have a total length of ';
  const errorMaxLength = 'must have a total length less than or equal to ';
  const errorMinLength = 'must have a total length greater than or equal to ';
  const errorPattern = 'must match a RegExp pattern of';
  const errorMaxDecimalPlaces = ' decimal places.';
  const errorRequire = 'requires a value';
  const errorMinOccurs = 'must have at least ';
  const errorMaxOccurs = 'must not have more than ';

  test.describe('data type validations (table)', () => {
    test('should validate INT type', async ({ page }) => {
      await openFormByIndex(page, 13); // ValidationTest
      await expect(byId(page, '/INT/1')).toBeVisible();
      await testOneType(page, '/INT/1', 'label[for=\'/BL/1\']', errorContainer, errorINT, '1234.56', '123');
    });

    test('should validate INT type, for positive values', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/INT/1', 'label[for=\'/BL/1\']', errorContainer, errorINT, '+1234.56', '+123');
    });

    test('should validate INT type, for negative values', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/INT/1', 'label[for=\'/BL/1\']', errorContainer, errorINT, '-1234.56', '-123');
    });

    test('should validate REAL type', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL/1', 'label[for=\'/INT/1\']', errorContainer, errorREAL, 'not a number', '123.45');
    });

    test('should validate REAL type, for positive values', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL/1', 'label[for=\'/INT/1\']', errorContainer, errorREAL, '+ 123.45', '+123.45');
    });

    test('should validate REAL type, for negative values', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL/1', 'label[for=\'/INT/1\']', errorContainer, errorREAL, '- 123.45', '-123.45');
    });

    test('should validate PHONE type', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/PHONE/1', 'label[for=\'/REAL/1\']', errorContainer, errorPHONE, 'not a phone number', '3011235555');
    });

    test('should validate EMAIL type', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/EMAIL/1', 'label[for=\'/PHONE/1\']', errorContainer, errorEMAIL, 'somebody@com', 'somebody@some.com');
    });

    test('should validate URL type', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/URL/1', 'label[for=\'/EMAIL/1\']', errorContainer, errorURL, 'http:/somecompany.com', 'http://somecompany.com');
    });

    test('should validate NR type', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/NR/1', 'label[for=\'/URL/1\']', errorContainer, errorNR, '-123 567', '-123^ 567');
    });
  });

  test.describe('restrictions validations (table)', () => {
    test('should validate minInclusive on INT', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/INT1/1', 'label[for=\'/URL/1\']', errorContainer, errorMinInclusive, '2', '5');
    });

    test('should validate minExclusive on INT', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/INT2/1', 'label[for=\'/INT1/1\']', errorContainer, errorMinExclusive, '5', '6');
    });

    test('should validate maxInclusive on INT', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/INT3/1', 'label[for=\'/INT2/1\']', errorContainer, errorMaxInclusive, '12', '10');
    });

    test('should validate maxExclusive on INT', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/INT4/1', 'label[for=\'/INT3/1\']', errorContainer, errorMaxExclusive, '12', '9');
    });

    test('should validate minInclusive on REAL', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL1/1', 'label[for=\'/INT4/1\']', errorContainer, errorMinInclusive, '4.9', '5.0');
    });

    test('should validate minExclusive on REAL', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL2/1', 'label[for=\'/REAL1/1\']', errorContainer, errorMinExclusive, '5.0', '5.01');
    });

    test('should validate maxInclusive on REAL', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL3/1', 'label[for=\'/REAL2/1\']', errorContainer, errorMaxInclusive, '10.01', '10');
    });

    test('should validate maxExclusive on REAL', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL4/1', 'label[for=\'/REAL3/1\']', errorContainer, errorMaxExclusive, '12', '9');
    });

    test('should validate length', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/ST1/1', 'label[for=\'/REAL4/1\']', errorContainer, errorLength, 'abcd', 'abcde');
    });

    test('should validate minLength', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/ST2/1', 'label[for=\'/ST1/1\']', errorContainer, errorMinLength, 'abcd', 'abcde');
    });

    test('should validate maxLength', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/ST3/1', 'label[for=\'/ST2/1\']', errorContainer, errorMaxLength, '12345678901', '1234567890');
    });

    test('should validate pattern, with /', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/STA/1', 'label[for=\'/ST3/1\']', errorContainer, errorPattern, 'AAAAA', 'aaaaa');
    });

    test('should validate pattern, without /', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/STA2/1', 'label[for=\'/ST3/1\']', errorContainer, errorPattern, 'AAAAA', 'aaaaa');
    });

    test('should validate pattern, with / and flags', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/STB/1', 'label[for=\'/STA/1\']', errorContainer, errorPattern, '2/AAAAA', '/aBBBc');
    });

    test('should validate maxDecimalPlaces', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL5/1', 'label[for=\'/REAL4/1\']', errorContainer, errorMaxDecimalPlaces, '10.123', '10.12');
    });

    test('should validate maxDecimalPlaces with positive scientific notions', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL5/1', 'label[for=\'/REAL4/1\']', errorContainer, errorMaxDecimalPlaces, '1.12345e2', '1.1234e2');
    });

    test('should validate maxDecimalPlaces with negative scientific notions', async ({ page }) => {
      await openFormByIndex(page, 13);
      await testOneType(page, '/REAL5/1', 'label[for=\'/REAL4/1\']', errorContainer, errorMaxDecimalPlaces, '123.1e-2', '123e-2');
    });

    test('should validate required on ST', async ({ page }) => {
      await openFormByIndex(page, 13);
      const st0 = byId(page, '/ST0/1');
      // no initial validations
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first time getting focus
      await st0.click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first visit
      await st0.pressSequentially('abc');
      await st0.clear();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      // show message when the focus is gone
      await page.locator('label[for=\'/ST3/1\']').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(st0).toBeVisible();
      await st0.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      // valid value no messages
      await st0.clear();
      await st0.pressSequentially('abcde');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await page.locator('label[for=\'/ST3/1\']').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate required on CNE (single)', async ({ page }) => {
      await openFormByIndex(page, 13);
      const cne1 = byId(page, '/CNE1/1');
      // no initial validations
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first time getting focus
      await cne1.click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first visit
      await pressCypressKeys(cne1, '{downArrow}{enter}');
      await cne1.press('Control+a');
      await cne1.press('Backspace');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // show message when the focus is gone
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(cne1).toBeVisible();
      await cne1.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      // valid value no messages
      await cne1.press('Control+a');
      await cne1.press('Backspace');
      await cne1.click();
      await pressCypressKeys(cne1, '{downArrow}{enter}');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate required on CWE (single)', async ({ page }) => {
      await openFormByIndex(page, 13);
      const cwe1 = byId(page, '/CWE1/1');
      // no initial validations
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first time getting focus
      await cwe1.click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first visit
      await pressCypressKeys(cwe1, '{downArrow}{enter}');
      await expect(cwe1).not.toHaveValue('');
      await cwe1.press('Control+a');
      await cwe1.press('Backspace');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // show message when the focus is gone
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(cwe1).toBeVisible();
      await cwe1.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      // valid value no messages
      await cwe1.press('Control+a');
      await cwe1.press('Backspace');
      await cwe1.click();
      await pressCypressKeys(cwe1, '{downArrow}{enter}');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // valid user input no message
      await cwe1.press('Control+a');
      await cwe1.press('Backspace');
      await cwe1.pressSequentially('user input');
      await cwe1.blur();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    // CNE/CWE with multiple selections does not work with validations. Need a fix in autocomplete directive.

    test('should validate multiple restrictions on INT', async ({ page }) => {
      await openFormByIndex(page, 13);
      const inta = byId(page, '/INTA/1');
      const lblbl = 'label[for=\'/BL/1\']';
      // no initial validations
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first visit
      await inta.pressSequentially('1');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).not.toBeAttached();
      // show message when the focus is gone
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(inta).toBeVisible();
      await inta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      // try again, message shown since it is not the first visit
      await inta.clear();
      await inta.pressSequentially('10');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      // not to show message when the focus is gone, since it is not the first visit
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(inta).toBeVisible();
      await inta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      // valid value no messages
      await inta.clear();
      await inta.pressSequentially('9');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate multiple restrictions on REAL', async ({ page }) => {
      await openFormByIndex(page, 13);
      const reala = byId(page, '/REALA/1');
      const lblbl = 'label[for=\'/BL/1\']';
      // no initial validations
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first visit
      await reala.pressSequentially('1.0');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      // show message when the focus is gone
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(reala).toBeVisible();
      await reala.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      // try again, message shown since it is not the first visit
      await reala.clear();
      await reala.pressSequentially('10.0');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      // not to show message when the focus is gone, since it is not the first visit
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(reala).toBeVisible();
      await reala.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      // valid value no messages
      await reala.clear();
      await reala.pressSequentially('9.999');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate multiple restrictions on ST', async ({ page }) => {
      await openFormByIndex(page, 13);
      const sta = byId(page, '/STA/1');
      const lblbl = 'label[for=\'/BL/1\']';
      // no initial validations
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // no error messages on first visit
      await sta.pressSequentially('123');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).not.toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).not.toBeVisible();
      // show message when the focus is gone
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).not.toBeVisible();
      // get back focus and message should be shown
      await expect(sta).toBeVisible();
      await sta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      // try again, message shown since it is not the first visit
      await sta.clear();
      await sta.pressSequentially('abcde678901');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).not.toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      // not to show message when the focus is gone, since it is not the first visit
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).not.toBeVisible();
      // get back focus and message should be shown
      await sta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      // valid value no messages
      await sta.clear();
      await sta.fill('abcde');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });
  });

  test.describe('validation messages should be shown in horizontal table', () => {
    test('should validate REAL type in horizontal table', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      const height1 = '/54114-4/54117-7/8302-2/1/1/1';
      const weight1 = '/54114-4/54117-7/29463-7/1/1/1';
      const heightError = 'must be a decimal number';
      const weightError = 'must be a decimal number';
      const clickAwayElem = 'label[for=\'/54114-4/54138-3/1/1\']';

      await expect(byId(page, height1)).toBeVisible();
      await testOneType(page, height1, clickAwayElem, errorContainer, heightError, 'not a number', '123.45');
      await testOneType(page, weight1, clickAwayElem, errorContainer, weightError, 'not a number', '123.45');

      // add a new row
      await byId(page, 'add-/54114-4/54117-7/1/1').click();
      const height2 = '/54114-4/54117-7/8302-2/1/2/1';
      const weight2 = '/54114-4/54117-7/29463-7/1/2/1';
      await testOneType(page, height2, clickAwayElem, errorContainer, heightError, 'not a number', '123.45');
      await testOneType(page, weight2, clickAwayElem, errorContainer, weightError, 'not a number', '123.45');
    });
  });

  test.describe('form validation', () => {
    test('should not validate when required inputs are empty', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      // Required fields are empty
      let errors = await page.evaluate(() => (window as any).LForms.Util.checkValidity());
      expect(errors).toEqual([
        'Required DT field requires a value',
        'Required DTM field requires a value',
        'Required TX field requires a value',
        'Required ST field requires a value'
      ]);

      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      await byId(page, '/sl_source_to_test_required/1').pressSequentially('1');
      errors = await page.evaluate(() => (window as any).LForms.Util.checkValidity());
      expect(errors).toEqual([
        'Required DT field requires a value',
        'Required DTM field requires a value',
        'Required TX field requires a value',
        'Required ST field requires a value',
        "Required RT1: Shown when 'Skip Logic Required Source' == 1; requires a value",
        'RT4: Shown when my section header is shown; requires a value'
      ]);
    });

    test('should validate when required inputs are entered', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      await byId(page, '/sl_source_to_test_required/1').pressSequentially('1');

      // Fill the required fields
      const requiredDtInput = byId(page, '/required_dt/1').locator('input');
      const requiredDtmInput = byId(page, '/required_dtm/1').locator('input');
      const requiredTx = byId(page, '/required_tx/1');
      await requiredDtInput.click();
      await requiredDtInput.pressSequentially('10/16/2020');
      await requiredTx.click();
      await requiredDtmInput.click();
      await requiredDtmInput.pressSequentially('10/16/2020 16:00:00');
      await requiredTx.click();
      await requiredTx.pressSequentially('test');
      await byId(page, '/required_st/1').pressSequentially('test');
      await byId(page, '/sl_target_to_test_required1/1').pressSequentially('test');
      await byId(page, '/sl_target_header/sl_target_to_test_required/1/1').pressSequentially('test');

      const errors = await page.evaluate(() => (window as any).LForms.Util.checkValidity());
      expect(errors).toBeNull();
    });

    test('should validate when required inputs are entered, with a short form', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'test-date-validation.json');

      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      await byId(page, '/sl_source_to_test_required/1').pressSequentially('1');
      // Fill the required fields
      const requiredDtInput = byId(page, '/required_dt/1').locator('input');
      const requiredDtmInput = byId(page, '/required_dtm/1').locator('input');
      const requiredTx = byId(page, '/required_tx/1');
      await requiredDtInput.click();
      await requiredDtInput.pressSequentially('10/16/2020');
      await requiredTx.click();
      await requiredDtmInput.click();
      await requiredDtmInput.pressSequentially('10/16/2020 16:00:00');
      await requiredTx.click();
      await requiredTx.pressSequentially('test');
      await byId(page, '/required_st/1').pressSequentially('test');
      await byId(page, '/sl_target_to_test_required1/1').pressSequentially('test');
      await byId(page, '/sl_target_header/sl_target_to_test_required/1/1').pressSequentially('test');

      const error = await page.evaluate(() => (window as any).LForms.Util.checkValidity());
      expect(error).toBeNull();
    });
  });

  test.describe('modifierExtension', () => {
    for (const fhirVersion of ['R4', 'R5']) {
      test('should display message if modifierExtension is found - ' + fhirVersion, async ({ page }) => {
        await page.goto('/test/pages/lforms_testpage.html');
        await waitForLFormsReady(page);
        await loadFromTestData(page, 'q-with-modifierExtension.json', fhirVersion);
        const itemError = page.locator('div.lhc-item-error');
        await expect(itemError).toBeVisible();
        await expect(itemError).toContainText('One or more modifierExtensions are found');
      });
    }
  });

  test.describe('minOccurs and maxOccurs', () => {
    test('should validate minOccurs and maxOccurs on multiselect input', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-with-minOccurs-maxOccurs.json', 'R4');
      const eleInput = byId(page, '1.1/1/1');
      const eleAway = byId(page, '1.2/1/1');

      // no error messages on first visit
      await eleInput.click();
      await pressCypressKeys(eleInput, '{downArrow}{enter}');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).not.toBeVisible();
      // show message when the focus is gone
      await eleAway.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      // message disappears after a short period
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).not.toBeVisible();
      // get back focus again and message should be shown
      await expect(eleInput).toBeVisible();
      await eleInput.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      // no message on the 2nd time when the focus is lost
      await eleAway.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).not.toBeVisible();
      // get back focus the 3rd time and message should be shown
      await expect(eleInput).toBeVisible();
      await eleInput.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      // valid value no messages
      await eleInput.click();
      await pressCypressKeys(eleInput, '{downArrow}{enter}');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // still no message when the focus is gone
      await eleAway.click();
      await expect(page.locator(errorContainer)).not.toBeAttached();

      // Add too many answers.
      await eleInput.click();
      await pressCypressKeys(eleInput, '{downArrow}{enter}');
      await eleInput.click();
      await pressCypressKeys(eleInput, '{downArrow}{enter}');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxOccurs })).toBeVisible();
      // Remove one answer, error should go away.
      await page.locator('.autocomp_selected button').first().click({ force: true });
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate minOccurs and maxOccurs on multiselect input - checkbox layout', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-with-minOccurs-maxOccurs.json', 'R4');
      await byId(page, '1.3/1/1||Apple').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      // valid value no messages
      await byId(page, '1.3/1/1||Orange').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // Add too many answers.
      await byId(page, '1.3/1/1||Banana').click();
      await byId(page, '1.3/1/1||Pear').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxOccurs })).toBeVisible();
      // Remove one answer, error should go away.
      await byId(page, '1.3/1/1||Apple').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should limit the number of repeated groups based on minOccurs and maxOccurs', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-with-minOccurs-maxOccurs.json', 'R4');
      // Initially there is one group, an error message about minOccurs should be shown.
      const minOccursMsg = page.locator('text=This repeatable item should have at least 2 occurrences.');
      await expect(minOccursMsg).toBeVisible();
      // Add another repeatable group, the error message should disappear.
      await byId(page, '1.2/1/1').pressSequentially('a');
      await byId(page, 'add-1/1').click();
      await expect(minOccursMsg).not.toBeAttached();
      // Add another repeatable group, the Add button should disappear.
      await byId(page, '1.2/2/1').pressSequentially('a');
      await byId(page, 'add-1/2').click();
      await expect(byId(page, 'add-1/3')).not.toBeAttached();
      // Remove a group, the Add button should come back.
      await byId(page, 'del-1/3').click();
      await expect(byId(page, 'add-1/2')).toBeVisible();
    });

    test('should limit the number of repeated groups - horizontal layout', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-with-repeating-group-with-horizontal-layout.json', 'R4');
      // Initially there is one group, an error message about minOccurs should be shown.
      const minOccursMsg = page.locator('text=This repeatable item should have at least 2 occurrences.');
      await expect(minOccursMsg).toBeVisible();
      // Add another repeatable group, the error message should disappear.
      await pressCypressKeys(byId(page, '/g3/g1m1/1/1'), '{downArrow}{enter}');
      const addG3 = byId(page, 'add-/g3/1');
      await addG3.click();
      await expect(minOccursMsg).not.toBeAttached();
      // Add another repeatable group, the Add button should disappear.
      await pressCypressKeys(byId(page, '/g3/g1m1/2/1'), '{downArrow}{enter}');
      await addG3.click();
      await expect(addG3).not.toBeAttached();
      // Remove a group, the Add button should come back.
      await byId(page, 'del-/g3/3').click();
      await expect(addG3).toBeVisible();
    });

    test('should load a QuestionnaireResponse with more repeating items than maxOccurs', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);

      const qPath = path.resolve('test/data/R4/q-with-minOccurs-maxOccurs.json');
      const qrPath = path.resolve('test/data/R4/qr-with-repeating-group-exceed-maxOccurs.json');
      const q = JSON.parse(fs.readFileSync(qPath, 'utf-8'));
      const qr = JSON.parse(fs.readFileSync(qrPath, 'utf-8'));

      await page.evaluate(({ q, qr }) => {
        const w = window as any;
        const formDef = w.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
        const mergedFormData = w.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
        w.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion: 'R4' });
      }, { q, qr });

      // Initially there are 4 groups, an error message about maxOccurs should be shown.
      const maxOccursMsg = page.locator('text=This repeatable item should have at most 3 occurrences.');
      await expect(maxOccursMsg).toBeVisible();
      // Remove a group, the error message should disappear.
      await byId(page, 'del-1/4').click();
      await expect(maxOccursMsg).not.toBeAttached();
      // Remove another group, the Add button should appear.
      await byId(page, 'del-1/3').click();
      await expect(byId(page, 'add-1/2')).toBeVisible();
    });
  });

  test.describe('targetConstraint', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
    });

    test('should validate targetConstraint', async ({ page }) => {
      await loadFromTestData(page, 'q-with-targetConstraint.json', 'R4');
      await byId(page, '1.1/1/1').fill('2');
      await byId(page, '1.2/1/1').fill('1');
      await byId(page, '1.2/1/1').blur();
      const errors1 = await page.evaluate(() => {
        return (window as any).LForms.Util.checkValidity();
      });
      expect(errors1).toEqual([
        'Please enter a minimum and maximum value. The minimum value must be less than or equal to the maximum value. The targetConstraint key is: min-max-check.'
      ]);
      // The error message should be shown on the Maximum Value field, as defined in the
      // targetConstraint extension 'location' sub extension.
      await expect(
        byId(page, 'item-1.2/1/1').locator(':text("The minimum value must be less than or equal to the maximum value.")')
      ).toBeVisible();
      // Change to valid values.
      await byId(page, '1.2/1/1').fill('3');
      await byId(page, '1.2/1/1').blur();
      const errors2 = await page.evaluate(() => {
        return (window as any).LForms.Util.checkValidity();
      });
      expect(errors2).toBeNull();
      await expect(
        page.locator(':text("The minimum value must be less than or equal to the maximum value.")')
      ).not.toBeVisible();
    });
  });
});
