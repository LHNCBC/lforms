import { test, expect } from '@playwright/test';
import { byId, addFormToPage, answerId, waitForLFormsReady } from '../../support/lforms-helpers';
import { mockFHIRContext, mockData } from '../../support/R4/fhir_context';

const fhirVersion = 'R4';

test.describe('FHIR answerValueSet (matrix first load)', () => {
  test('should have expected answer list when the Questionnaire is loaded', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);

    // Set up FHIR context
    await page.evaluate(({ mockFn, data }) => {
      const fhirContext = new Function('return ' + mockFn)();
      (window as any).LForms.Util.setFHIRContext(fhirContext('R4', null, data));
    }, { mockFn: mockFHIRContext, data: mockData });

    // load the questionnaire for the first time so that the answer list expanded from
    // item.answerValueSet is not cached.
    await addFormToPage(page, 'q-with-answerValueSet-matrix.json', 'formContainer', { fhirVersion });

    for (let g = 1; g < 5; g++) {
      for (let m = 1; m < 4; m++) {
        await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/v2-0136', 'N'))).toBeVisible();
        await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y'))).toBeVisible();
        await expect(byId(page, answerId(`/g${g}m${m}/1/1`, 'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown'))).toBeVisible();
      }
    }
    await expect(byId(page, answerId('/g3m1/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('/g3m2/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('/g3m3/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('/g4m1/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('/g4m2/1/1', '_other'))).toBeVisible();
    await expect(byId(page, answerId('/g4m3/1/1', '_other'))).toBeVisible();
  });
});
