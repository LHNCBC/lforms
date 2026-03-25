import { test, expect, Page } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';
import * as fs from 'fs';
import * as path from 'path';

async function testOneType(page: Page, eleInput: string, eleAway: string, eleContainer: string, eleMessage: string, value1: string, value2: string) {
  // no initial validations
  await expect(page.locator(eleContainer)).not.toBeAttached();
  // no error messages on first visit
  await byId(page, eleInput).type(value1);
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeAttached();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).not.toBeVisible();
  // show message when the focus is gone
  await page.locator(eleAway).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeVisible();
  // message disappears after a short period
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).not.toBeVisible();
  // get back focus again and message should be shown
  await byId(page, eleInput).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeVisible();

  // no message on the 2nd time when the focus is lost
  await page.locator(eleAway).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).not.toBeVisible();
  // get back focus the 3rd time and message should be shown
  await byId(page, eleInput).click();
  await expect(page.locator(eleContainer).filter({ hasText: eleMessage })).toBeVisible();
  // valid value no messages
  await byId(page, eleInput).fill('');
  await byId(page, eleInput).type(value2);
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
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await byId(page, '/ST0/1').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await byId(page, '/ST0/1').type('abc');
      await byId(page, '/ST0/1').fill('');
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      await page.locator('label[for=\'/ST3/1\']').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      await byId(page, '/ST0/1').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      await byId(page, '/ST0/1').fill('');
      await byId(page, '/ST0/1').type('abcde');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator('label[for=\'/ST3/1\']').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate required on CNE (single)', async ({ page }) => {
      await openFormByIndex(page, 13);
      const cne1 = byId(page, '/CNE1/1');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await cne1.click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await pressCypressKeys(cne1, '{downArrow}{enter}');
      // Clear the autocomplete (select-all + backspace keeps focus like Cypress .clear())
      await cne1.click({ clickCount: 3 });
      await cne1.press('Backspace');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible({ timeout: 10000 });
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      await cne1.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible({ timeout: 10000 });
      // Clear and re-select
      await cne1.click({ clickCount: 3 });
      await cne1.press('Backspace');
      await cne1.click();
      await pressCypressKeys(cne1, '{downArrow}{enter}');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate required on CWE (single)', async ({ page }) => {
      await openFormByIndex(page, 13);
      const cwe1 = byId(page, '/CWE1/1');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await cwe1.click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await pressCypressKeys(cwe1, '{downArrow}{enter}');
      await expect(cwe1).not.toHaveValue('');
      await cwe1.press('Control+a');
      await cwe1.press('Backspace');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).not.toBeVisible();
      await cwe1.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorRequire })).toBeVisible();
      await cwe1.press('Control+a');
      await cwe1.press('Backspace');
      await cwe1.click();
      await pressCypressKeys(cwe1, '{downArrow}{enter}');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator('label[for=\'/BL/1\']').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      // valid user input no message
      await cwe1.press('Control+a');
      await cwe1.press('Backspace');
      await cwe1.type('user input');
      await cwe1.blur();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate multiple restrictions on INT', async ({ page }) => {
      await openFormByIndex(page, 13);
      const inta = byId(page, '/INTA/1');
      const lblbl = 'label[for=\'/BL/1\']';
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await inta.type('1');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).not.toBeAttached();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      await inta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      await inta.fill('');
      await inta.type('10');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).not.toBeVisible();
      await inta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      await inta.fill('');
      await inta.type('9');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate multiple restrictions on REAL', async ({ page }) => {
      await openFormByIndex(page, 13);
      const reala = byId(page, '/REALA/1');
      const lblbl = 'label[for=\'/BL/1\']';
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await reala.type('1.0');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).not.toBeVisible();
      await reala.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinInclusive })).toBeVisible();
      await reala.fill('');
      await reala.type('10.0');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).not.toBeVisible();
      await reala.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxExclusive })).toBeVisible();
      await reala.fill('');
      await reala.type('9.999');
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should validate multiple restrictions on ST', async ({ page }) => {
      await openFormByIndex(page, 13);
      const sta = byId(page, '/STA/1');
      const lblbl = 'label[for=\'/BL/1\']';
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await sta.type('123');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).not.toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).not.toBeVisible();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).not.toBeVisible();
      await sta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      await sta.fill('');
      await sta.type('abcde678901');
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinLength })).not.toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      await page.locator(lblbl).click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).not.toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).not.toBeVisible();
      await sta.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxLength })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorPattern })).toBeVisible();
      await sta.fill('');
      await sta.type('abcde');
      await expect(page.locator(errorContainer)).not.toBeAttached();
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
      let errors = await page.evaluate(() => (window as any).LForms.Util.checkValidity());
      expect(errors).toEqual([
        'Required DT field requires a value',
        'Required DTM field requires a value',
        'Required TX field requires a value',
        'Required ST field requires a value'
      ]);

      await byId(page, '/sl_source_to_test_required/1').type('1');
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
      await byId(page, '/sl_source_to_test_required/1').type('1');

      await byId(page, '/required_dt/1').locator('input').fill('');
      await byId(page, '/required_dt/1').locator('input').type('10/16/2020');
      await byId(page, '/required_tx/1').click();
      await byId(page, '/required_dtm/1').locator('input').type('10/16/2020 16:00:00');
      await byId(page, '/required_tx/1').click();
      await byId(page, '/required_tx/1').type('test');
      await byId(page, '/required_st/1').type('test');
      await byId(page, '/sl_target_to_test_required1/1').type('test');
      await byId(page, '/sl_target_header/sl_target_to_test_required/1/1').type('test');

      const errors = await page.evaluate(() => (window as any).LForms.Util.checkValidity());
      expect(errors).toBeNull();
    });

    test('should validate when required inputs are entered, with a short form', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'test-date-validation.json');

      await byId(page, '/sl_source_to_test_required/1').type('1');
      await byId(page, '/required_dt/1').locator('input').fill('');
      await byId(page, '/required_dt/1').locator('input').type('10/16/2020');
      await byId(page, '/required_tx/1').click();
      await byId(page, '/required_dtm/1').locator('input').type('10/16/2020 16:00:00');
      await byId(page, '/required_tx/1').click();
      await byId(page, '/required_tx/1').type('test');
      await byId(page, '/required_st/1').type('test');
      await byId(page, '/sl_target_to_test_required1/1').type('test');
      await byId(page, '/sl_target_header/sl_target_to_test_required/1/1').type('test');

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
        await expect(page.locator('div.lhc-item-error')).toBeVisible();
        await expect(page.locator('div.lhc-item-error')).toContainText('One or more modifierExtensions are found');
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

      await eleInput.click();
      await pressCypressKeys(eleInput, '{downArrow}{enter}');
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeAttached();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).not.toBeVisible();
      await eleAway.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).not.toBeVisible();
      await eleInput.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      await eleAway.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).not.toBeVisible();
      await eleInput.click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMinOccurs })).toBeVisible();
      // valid value no messages
      await eleInput.click();
      await pressCypressKeys(eleInput, '{downArrow}{enter}');
      await expect(page.locator(errorContainer)).not.toBeAttached();
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
      await byId(page, '1.3/1/1||Orange').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
      await byId(page, '1.3/1/1||Banana').click();
      await byId(page, '1.3/1/1||Pear').click();
      await expect(page.locator(errorContainer).filter({ hasText: errorMaxOccurs })).toBeVisible();
      await byId(page, '1.3/1/1||Apple').click();
      await expect(page.locator(errorContainer)).not.toBeAttached();
    });

    test('should limit the number of repeated groups based on minOccurs and maxOccurs', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-with-minOccurs-maxOccurs.json', 'R4');
      await expect(page.locator('text=This repeatable item should have at least 2 occurrences.')).toBeVisible();
      await byId(page, '1.2/1/1').type('a');
      await byId(page, 'add-1/1').click();
      await expect(page.locator('text=This repeatable item should have at least 2 occurrences.')).not.toBeAttached();
      await byId(page, '1.2/2/1').type('a');
      await byId(page, 'add-1/2').click();
      await expect(byId(page, 'add-1/3')).not.toBeAttached();
      await byId(page, 'del-1/3').click();
      await expect(byId(page, 'add-1/2')).toBeVisible();
    });

    test('should limit the number of repeated groups - horizontal layout', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'q-with-repeating-group-with-horizontal-layout.json', 'R4');
      await expect(page.locator('text=This repeatable item should have at least 2 occurrences.')).toBeVisible();
      await pressCypressKeys(byId(page, '/g3/g1m1/1/1'), '{downArrow}{enter}');
      await byId(page, 'add-/g3/1').click();
      await expect(page.locator('text=This repeatable item should have at least 2 occurrences.')).not.toBeAttached();
      await pressCypressKeys(byId(page, '/g3/g1m1/2/1'), '{downArrow}{enter}');
      await byId(page, 'add-/g3/1').click();
      await expect(byId(page, 'add-/g3/1')).not.toBeAttached();
      await byId(page, 'del-/g3/3').click();
      await expect(byId(page, 'add-/g3/1')).toBeVisible();
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

      await expect(page.locator('text=This repeatable item should have at most 3 occurrences.')).toBeVisible();
      await byId(page, 'del-1/4').click();
      await expect(page.locator('text=This repeatable item should have at most 3 occurrences.')).not.toBeAttached();
      await byId(page, 'del-1/3').click();
      await expect(byId(page, 'add-1/2')).toBeVisible();
    });
  });
});
