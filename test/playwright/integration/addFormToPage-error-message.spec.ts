import { test, expect } from '@playwright/test';
import { byId, expectLoadButton, TIMEOUT_30S, uploadFile, waitForLFormsReady } from '../support/lforms-helpers';

async function expectFormTitle(page, title: string) {
  await expect(page.locator('.lhc-form-title')).toContainText(title, TIMEOUT_30S);
}

test.describe('addFormToPage Error Message Test', () => {
  test.beforeEach(async ({ page }) => { 
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load From File');  
  });

  test('show an error when a valueset cannot be loaded because of a wrong valueset url', async ({ page }) => {
    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 1');
    // has an error message
    // This also tests that the url parameter gets URL-encoded.
    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet', TIMEOUT_30S);
    // An error message is shown under the field for which answerValueSet expansion failed.
    const itemError = byId(page, 'item-/54126-8/54128-4/1/1').locator('.lhc-item-error');
    await expect(itemError).toBeVisible(TIMEOUT_30S);
    await expect(itemError).toHaveText('Error: Unable to load the answer list for this question.', TIMEOUT_30S);
    // Load some other file that doesn't have expansion failures.
    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context');
    await expect(page.locator('.lhc-item-error')).toHaveCount(0, TIMEOUT_30S);
    // Load the original file again, the error message should still be shown
    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 1');
    await expect(itemError).toBeVisible(TIMEOUT_30S);
    await expect(itemError).toHaveText('Error: Unable to load the answer list for this question.', TIMEOUT_30S);
  });

  test('show an error when a valueset cannot be loaded because of a wrong fhir context', async ({ page }) => {
    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-fhircontext.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 2');
    // has an error message
    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server', TIMEOUT_30S);
  });

  test('show only the first error when there are multiple valuesets cannot be loaded.', async ({ page }) => {
    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url-fhircontext.json');
    await expectFormTitle(page, 'A questionnaire for testing code that requires a FHIR context 3');
    // has one of the error messages (most of the time it's the first error message)
    //"Unable to load ValueSet from https://lforms-fhir.nlm.nih.gov/baseDstu3/ValueSet/$expand?url=http://hl7.org/fhir/ValueSet/yesnodontknow-invalid"
    //"Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server"
    const loadMsg = page.locator('#loadMsg');
    await expect(loadMsg).toContainText('Unable to load ValueSet', TIMEOUT_30S);
    await expect(loadMsg).toContainText(/v3-MessageWaitingPriority-invalid|yesnodontknow-invalid/, TIMEOUT_30S);
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

    await uploadFile(page, '#fileAnchor', 'test/data/R4/bit-of-everything.json');
    await expectFormTitle(page, 'Bit of everything');
    // has no error message
    await expect(page.locator('#loadMsg')).not.toContainText('Unable to load ValueSet from');
  });

  test('should show errors for duplicate variable names - root level', async ({ page }) => {
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-names-root-level.json');
    await expect(page.locator('#loadMsg')).toContainText('Duplicate variable name "X" found at root level.', TIMEOUT_30S);
  });

  test('should show errors for duplicate variable names - item level', async ({ page }) => {
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-names-item-level.json');
    await expect(page.locator('#loadMsg')).toContainText('Duplicate variable name "Y" found. Item linkId: /fieldA.', TIMEOUT_30S);
  });

  test('should show errors if a duplicate name is found in variable extension and launchContext extension', async ({ page }) => {
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-name-as-launchContext.json');
    await expect(page.locator('#loadMsg')).toContainText('Duplicate variable name "patient" found at root level.', TIMEOUT_30S);
  });
});
