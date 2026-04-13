import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, loadFromTestData } from '../../support/lforms-helpers';
import { mockFHIRContext, mockData } from '../../support/R4/fhir_context';

const fhirVersion = 'R4';

test.describe('FHIR variables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
  });

  test.describe('FHIRPath variables', () => {
    const addGroupA = 'add-/groupA/1';
    const fieldB1 = '/groupA/fieldB/1/1';
    const addFieldB = 'add-/groupA/fieldB/1/1';
    const fieldB2 = '/groupA/fieldB/1/2';
    const fieldBg2f1 = '/groupA/fieldB/2/1';
    const fieldC = '/groupA/fieldC/1/1';
    const fieldCg2 = '/groupA/fieldC/2/1';
    const fieldD = '/groupB/fieldD/1/1';
    const fieldE = '/groupB/fieldE/1/1';

    test('should have expected values before typing', async ({ page }) => {
      await loadFromTestData(page, 'variable-scope-test.json', fhirVersion);

      await expect(byId(page, fieldB1)).toHaveValue('');
      await expect(byId(page, fieldC)).toHaveValue('');
      await expect(byId(page, fieldD)).toHaveValue('');
      await expect(byId(page, fieldE)).toHaveValue('');
    });

    test('should have expected values after typing', async ({ page }) => {
      await loadFromTestData(page, 'variable-scope-test.json', fhirVersion);

      await byId(page, fieldB1).pressSequentially('1');
      await byId(page, addFieldB).click();
      await byId(page, fieldB2).pressSequentially('2');
      await expect(byId(page, fieldB1)).toHaveValue('1');
      await expect(byId(page, fieldB2)).toHaveValue('2');
      await expect(byId(page, fieldC)).toHaveValue('8');
      await expect(byId(page, fieldD)).toHaveValue('');
      await expect(byId(page, fieldE)).toHaveValue('16');
    });

    test('should have working expressions for added groups', async ({ page }) => {
      await loadFromTestData(page, 'variable-scope-test.json', fhirVersion);

      await byId(page, fieldB1).pressSequentially('1');
      await byId(page, addFieldB).click();
      await byId(page, fieldB2).pressSequentially('2');

      await byId(page, addGroupA).click();
      await byId(page, fieldBg2f1).pressSequentially('3');
      await expect(byId(page, fieldC)).toHaveValue('8');
      await expect(byId(page, fieldCg2)).toHaveValue('10');
    });
  });

  test.describe('x-fhir-query variable test form', () => {
    test('should populate the lists when the controlling item is selected', async ({ page }) => {
      // Set up FHIR context mock
      await page.evaluate(({ mockFn, data }) => {
        const fhirContext = new Function('return ' + mockFn)();
        (window as any).LForms.Util.setFHIRContext(fhirContext('R4', null, data));
      }, { mockFn: mockFHIRContext, data: mockData });

      await loadFromTestData(page, 'x-fhir-query-test.R4.json', fhirVersion);

      const listSelField = 'listSelection/1';
      const urlFetchField = 'listViewFromURL/1';
      const contextField = 'listViewFromContext/1';

      await byId(page, listSelField).pressSequentially('la'); // language
      await page.locator('#lhc-tools-searchResults li:first-child').click();

      // Wait for field list updates
      await expect(byId(page, urlFetchField)).toBeVisible();
      await page.waitForFunction((fieldId) => {
        const el = document.querySelector(`[id="${fieldId}"]`) as any;
        return el?.autocomp?.rawList_?.length === 2;
      }, urlFetchField, { timeout: 10000 });

      await page.waitForFunction((fieldId) => {
        const el = document.querySelector(`[id="${fieldId}"]`) as any;
        return el?.autocomp?.rawList_?.length === 2;
      }, contextField, { timeout: 10000 });

      // After picking the language list, pick the second list, for which there
      // is no mock data, so only the first listView field should have a list.
      // Testing this here after the previous test checks that the second
      // listView field's list is empty.
      // This test code actually does not catch the bug which prompted it (and
      // in fact the problem does not happen when the test code is run), but I
      // am leaving the test here.
      // Switch to verification list
      await byId(page, listSelField).fill('');
      await byId(page, listSelField).pressSequentially('ve'); // verification
      await page.locator('#lhc-tools-searchResults li:first-child').click();

      // Wait for the other field lists to update
      await page.waitForFunction((fieldId) => {
        const el = document.querySelector(`[id="${fieldId}"]`) as any;
        return el?.autocomp?.rawList_?.length === 6;
      }, urlFetchField, { timeout: 10000 });

      await page.waitForFunction((fieldId) => {
        const el = document.querySelector(`[id="${fieldId}"]`) as any;
        return (el?.autocomp?.rawList_?.length || 0) === 0;
      }, contextField, { timeout: 10000 });
    });
  });

  test.describe('variables from named expressions', () => {
    test('should be useable by other expressions', async ({ page }) => {
      await loadFromTestData(page, 'named-expressions.json', fhirVersion);

      const fieldA = 'idA/1';
      const fieldC = 'idC/1';

      await byId(page, fieldA).pressSequentially('1');
      await expect(byId(page, fieldC)).toHaveValue('6');
      await byId(page, fieldA).fill('');
      await expect(byId(page, fieldC)).toHaveValue('');
      await byId(page, fieldA).pressSequentially('2');
      await expect(byId(page, fieldC)).toHaveValue('7');
    });
  });
});
