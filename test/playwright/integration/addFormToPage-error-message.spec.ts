import { test, expect } from '@playwright/test';
import { byId, expectLoadButton, uploadFile, waitForLFormsReady } from '../support/lforms-helpers';

const LONG = { timeout: 30000 };

async function expectFormTitle(page, title: string) {
  await expect(page.locator('.lhc-form-title')).toContainText(title, LONG);
}

test.describe('addFormToPage Error Message Test', () => {
  test('show an error when a valueset cannot be loaded because of a wrong valueset url', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 1');
    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet', LONG);

    const itemError = byId(page, 'item-/54126-8/54128-4/1/1').locator('.lhc-item-error');
    await expect(itemError).toBeVisible(LONG);
    await expect(itemError).toHaveText('Error: Unable to load the answer list for this question.', LONG);

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context');
    await expect(page.locator('.lhc-item-error')).toHaveCount(0, LONG);

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 1');
    await expect(itemError).toBeVisible(LONG);
    await expect(itemError).toHaveText('Error: Unable to load the answer list for this question.', LONG);
  });

  test('show an error when a valueset cannot be loaded because of a wrong fhir context', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-fhircontext.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 2');
    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server', LONG);
  });

  test('show only the first error when there are multiple valuesets cannot be loaded.', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url-fhircontext.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 3');

    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet', LONG);
    await expect(page.locator('#loadMsg')).toContainText(/v3-MessageWaitingPriority-invalid|yesnodontknow-invalid/, LONG);
  });

  test('successfully load a form that requests AnswerValueSet', async ({ page }) => {
    await page.route('https://sqlonfhir-r4.azurewebsites.net/fhir/ValueSet/$expand?url=http%3A%2F%2Ffhir.telstrahealth.com.au%2Ftcm%2FValueSet%2FARE&_format=json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resourceType: 'ValueSet',
          id: '866d7924e20711d48c540020182939f7',
          meta: { versionId: '3', lastUpdated: '2022-01-10T10:40:11.73+00:00' },
          text: {
            status: 'additional',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Expansion of [ARE] where filter = "%" (count=9 of 9)</div>'
          },
          url: 'http://fhir.telstrahealth.com.au/tcm/ValueSet/ARE',
          version: '7.29.0',
          name: 'ARE',
          title: 'State',
          status: 'active',
          date: '2021-08-27',
          publisher: 'Telstra Health - TCM',
          expansion: {
            total: 9,
            contains: [
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '8', display: 'Australian Capital Territory' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '7', display: 'Northern Territory' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '1', display: 'NSW' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '9', display: 'Other Territories' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '3', display: 'Queensland' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '4', display: 'South Australia' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '6', display: 'Tasmania' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '2', display: 'Victoria' },
              { system: 'http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local', code: '5', display: 'Western Australia' }
            ]
          }
        })
      });
    });

    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/bit-of-everything.json');
    await expectFormTitle(page, 'Bit of everything');
    await expect(page.locator('#loadMsg')).not.toContainText('Unable to load ValueSet from');
  });

  test('should show errors for duplicate variable names - root level', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-names-root-level.json');
    await expect(page.locator('#loadMsg')).toContainText('Duplicate variable name "X" found at root level.', LONG);
  });

  test('should show errors for duplicate variable names - item level', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-names-item-level.json');
    await expect(page.locator('#loadMsg')).toContainText('Duplicate variable name "Y" found. Item linkId: /fieldA.', LONG);
  });

  test('should show errors if a duplicate name is found in variable extension and launchContext extension', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-name-as-launchContext.json');
    await expect(page.locator('#loadMsg')).toContainText('Duplicate variable name "patient" found at root level.', LONG);
  });
});
