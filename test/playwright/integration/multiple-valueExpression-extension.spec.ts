import { test, expect, type Page } from '@playwright/test';
import { byId, expectLoadButton, TIMEOUT_30S, pressCypressKeys, uploadFile, waitForLFormsReady } from '../support/lforms-helpers';

// The project root directory is the root for the cypress server
test.describe('Multiple "valueExpression" extensions Test with RxTerms', () => {
  const problemId = 'medication/1/1';
  const strengthId = 'strength/1/1';
  const cuiId = 'rxcui/1/1';

  async function loadRxTermsForm(page: Page) {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await expectLoadButton(page, 'Load Form From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/rxterms.R4.json');
    await expect(page.locator('.lhc-form-title')).toContainText('RxTerms Lookup', TIMEOUT_30S);
    await expect(byId(page, problemId)).toBeVisible(TIMEOUT_30S);
  }

  async function chooseMedication(page: Page, prefix: string, firstOptionText: string) {
    const problem = byId(page, problemId);
    await problem.click();
    await problem.pressSequentially(prefix);
    
    await expect(page.locator('#lhc-tools-searchResults li').first()).toHaveText(firstOptionText, TIMEOUT_30S);
    await pressCypressKeys(problem, '{downarrow}{enter}');
  }

  test('should have empty initial values', async ({ page }) => {
    // load rxterms R4 Questionnaire
    await loadRxTermsForm(page);

    await expect(byId(page, problemId)).toHaveValue('');
    await expect(byId(page, strengthId)).toHaveValue('');
    await expect(byId(page, cuiId)).toHaveValue('');
  });

  test('should set a answer list on strength field and a value on cui field', async ({ page }) => {
    await loadRxTermsForm(page);

    await chooseMedication(page, 'AR', 'ARAVA (Oral Pill)');
    await expect(byId(page, problemId)).toHaveValue('ARAVA (Oral Pill)', TIMEOUT_30S);

    const strength = byId(page, strengthId);
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{enter}');
    await expect(strength).toHaveValue('10 mg Tab', TIMEOUT_30S);
    await expect(byId(page, cuiId)).toHaveValue('213377', TIMEOUT_30S);

    // pick a different strength
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{downarrow}{enter}');
    await expect(strength).toHaveValue('20 mg Tab', TIMEOUT_30S);
    await expect(byId(page, cuiId)).toHaveValue('213379', TIMEOUT_30S);
  });

  test('should reset the strength field and the cui field when the problem field is cleared', async ({ page }) => {
    await loadRxTermsForm(page);

    await chooseMedication(page, 'AR', 'ARAVA (Oral Pill)');
    const strength = byId(page, strengthId);
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{enter}');
    await expect(strength).toHaveValue('10 mg Tab', TIMEOUT_30S);

    const problem = byId(page, problemId);
    await problem.clear();
    await problem.blur();

    await expect(problem).toHaveValue('', TIMEOUT_30S);
    await expect(strength).toHaveValue('', TIMEOUT_30S);
    await expect(byId(page, cuiId)).toHaveValue('', TIMEOUT_30S);
  });

  test('should set the strength field and the cui field when a new problem is entered', async ({ page }) => {
    await loadRxTermsForm(page);

    await chooseMedication(page, 'AB', 'ABILIFY (Oral Pill)');
    await expect(byId(page, problemId)).toHaveValue('ABILIFY (Oral Pill)', TIMEOUT_30S);

    const strength = byId(page, strengthId);
    await strength.click();
    await pressCypressKeys(strength, '{downarrow}{enter}');
    await expect(strength).toHaveValue('2 mg Sensor Tab', TIMEOUT_30S);
    await expect(byId(page, cuiId)).toHaveValue('1998457', TIMEOUT_30S);
  });
});
