const fs = require('fs');
const path = require('path');

const targets = {
  'test/cypress/integration/addFormToPage-error-message.cy.js': 'test/playwright/integration/addFormToPage-error-message.spec.ts',
  'test/cypress/integration/multiple-valueExpression-extension.cy.ts': 'test/playwright/integration/multiple-valueExpression-extension.spec.ts'
};

function addFormToPageErrorMessageSpec() {
  return `import { test, expect } from '@playwright/test';
import { byId, expectLoadButton, uploadFile } from '../support/lforms-helpers';

test.describe('addFormToPage Error Message Test', () => {
  test('show an error when a valueset cannot be loaded because of a wrong valueset url', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A questionnaire for testing code that requires a FHIR context 1');
    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet');

    const itemError = byId(page, 'item-/54126-8/54128-4/1/1').locator('.lhc-item-error');
    await expect(itemError).toBeVisible();
    await expect(itemError).toHaveText('Error: Unable to load the answer list for this question.');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A questionnaire for testing code that requires a FHIR context');
    await expect(page.locator('.lhc-item-error')).toHaveCount(0);

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A questionnaire for testing code that requires a FHIR context 1');
    await expect(itemError).toBeVisible();
    await expect(itemError).toHaveText('Error: Unable to load the answer list for this question.');
  });

  test('show an error when a valueset cannot be loaded because of a wrong fhir context', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-fhircontext.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A questionnaire for testing code that requires a FHIR context 2');
    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server');
  });

  test('show only the first error when there are multiple valuesets cannot be loaded.', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/fhir-context-q-wrong-valueset-url-fhircontext.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A questionnaire for testing code that requires a FHIR context 3');

    await expect(page.locator('#loadMsg')).toContainText('Unable to load ValueSet');
    await expect(page.locator('#loadMsg')).toContainText(/v3-MessageWaitingPriority-invalid|yesnodontknow-invalid/g);
  });

  test('successfully load a form that requests AnswerValueSet', async ({ page }) => {
    await page.route('https://sqlonfhir-r4.azurewebsites.net/fhir/ValueSet/$expand?url=http://fhir.telstrahealth.com.au/tcm/ValueSet/ARE&_format=json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resourceType: 'ValueSet',
          id: '866d7924e20711d48c540020182939f7',
          meta: { versionId: '3', lastUpdated: '2022-01-10T10:40:11.73+00:00' },
          text: {
            status: 'additional',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Expansion of [ARE] where filter = \"%\" (count=9 of 9)</div>'
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
    await expectLoadButton(page, 'Load From File');

    await uploadFile(page, '#fileAnchor', 'test/data/R4/bit-of-everything.json');
    await expect(page.locator('.lhc-form-title')).toContainText('Bit of everything');
    await expect(page.locator('#loadMsg')).not.toContainText('Unable to load ValueSet from');
  });

  test('should show errors for duplicate variable names - root level', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await expectLoadButton(page, 'Load From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-names-root-level.json');
    await expect(page.locator('#loadMsg')).toHaveText('Duplicate variable name "X" found at root level.');
  });

  test('should show errors for duplicate variable names - item level', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await expectLoadButton(page, 'Load From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-names-item-level.json');
    await expect(page.locator('#loadMsg')).toHaveText('Duplicate variable name "Y" found. Item linkId: /fieldA.');
  });

  test('should show errors if a duplicate name is found in variable extension and launchContext extension', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await expectLoadButton(page, 'Load From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/q-with-duplicate-variable-name-as-launchContext.json');
    await expect(page.locator('#loadMsg')).toHaveText('Duplicate variable name "patient" found at root level.');
  });
});
`;
}

function multipleValueExpressionSpec() {
  return `import { test, expect, type Page } from '@playwright/test';
import { byId, expectLoadButton, pressCypressKeys, uploadFile } from '../support/lforms-helpers';

test.describe('Multiple "valueExpression" extensions Test with RxTerms', () => {
  const problemId = 'medication/1/1';
  const strengthId = 'strength/1/1';
  const cuiId = 'rxcui/1/1';

  async function loadRxTermsForm(page: Page) {
    await page.goto('/test/pages/lforms_testpage.html');
    await expectLoadButton(page, 'Load Form From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/rxterms.R4.json');
    await expect(page.locator('.lhc-form-title')).toContainText('RxTerms Lookup');
  }

  async function chooseMedication(page: Page, prefix: string, firstOptionText: string) {
    const problem = byId(page, problemId);
    await problem.click();
    await problem.type(prefix);
    await expect(page.locator('#lhc-tools-searchResults li').first()).toHaveText(firstOptionText);
    await pressCypressKeys(problem, '{downarrow}{enter}');
  }

  test('should have empty initial values', async ({ page }) => {
    await loadRxTermsForm(page);

    await expect(byId(page, problemId)).toHaveValue('');
    await expect(byId(page, strengthId)).toHaveValue('');
    await expect(byId(page, cuiId)).toHaveValue('');
  });

  test('should set a answer list on strength field and a value on cui field', async ({ page }) => {
    await loadRxTermsForm(page);

    await chooseMedication(page, 'AR', 'ARAVA (Oral Pill)');
    await expect(byId(page, problemId)).toHaveValue('ARAVA (Oral Pill)');

    const strength = byId(page, strengthId);
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{enter}');
    await expect(strength).toHaveValue('10 mg Tab');
    await expect(byId(page, cuiId)).toHaveValue('213377');

    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{downarrow}{enter}');
    await expect(strength).toHaveValue('20 mg Tab');
    await expect(byId(page, cuiId)).toHaveValue('213379');
  });

  test('should reset the strength field and the cui field when the problem field is cleared', async ({ page }) => {
    await loadRxTermsForm(page);

    await chooseMedication(page, 'AR', 'ARAVA (Oral Pill)');
    const strength = byId(page, strengthId);
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{enter}');

    const problem = byId(page, problemId);
    await problem.fill('');
    await pressCypressKeys(problem, '{enter}');

    await expect(problem).toHaveValue('');
    await expect(strength).toHaveValue('');
    await expect(byId(page, cuiId)).toHaveValue('');
  });

  test('should set the strength field and the cui field when a new problem is entered', async ({ page }) => {
    await loadRxTermsForm(page);

    await chooseMedication(page, 'AB', 'ABILIFY (Oral Pill)');
    await expect(byId(page, problemId)).toHaveValue('ABILIFY (Oral Pill)');

    const strength = byId(page, strengthId);
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{enter}');
    await expect(strength).toHaveValue('2 mg Sensor Tab');
    await expect(byId(page, cuiId)).toHaveValue('1998457');
  });
});
`;
}

function generate(src) {
  if (src.endsWith('addFormToPage-error-message.cy.js')) return addFormToPageErrorMessageSpec();
  if (src.endsWith('multiple-valueExpression-extension.cy.ts')) return multipleValueExpressionSpec();
  throw new Error(`No converter mapping yet for ${src}`);
}

for (const [src, dest] of Object.entries(targets)) {
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source file: ${src}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, generate(src));
  console.log(`Converted ${src} -> ${dest}`);
}
