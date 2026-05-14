import { test, expect } from '@playwright/test';
import { byId, addFormToPage, waitForLFormsReady, loadFromTestData, uploadFile } from '../../support/lforms-helpers';
import { mockFHIRContext } from '../../support/R4/fhir_context';

const fhirVersion = 'R4';

/**
 *  Sets up a mock server FHIR context.  This will also set the page to do
 *  prepopulation.  (If that is not desired, set prepopFHIR to false.)
 * @param page the Playwright page object.
 * @param serverFHIRNum the FHIR version number (as a string) for the mock server.
 * @param weightQuantity the quantity to return from a search for a weight.
 * @param prepopFHIR whether the prepopulation should be enabled.
 */
async function setServerFHIRContext(page:any, serverFHIRNum:string, weightQuantity:any=null, prepopFHIR = true) {
  await page.evaluate(({ mockFn, serverFHIRNum, weightQuantity, prepopFHIR }) => {
    const fhirContext = new Function('return ' + mockFn)();
    (window as any).LForms.Util.setFHIRContext(fhirContext(serverFHIRNum, weightQuantity));
    (window as any).prepopulateFHIR = prepopFHIR;
  }, { mockFn: mockFHIRContext, serverFHIRNum, weightQuantity, prepopFHIR });
}

test.describe('Form pre-population', () => {
  for (const serverFHIRNum of ['3.0', '4.0']) {
    test(`should be able to use %questionnaire in expressions with server FHIR version ${serverFHIRNum}`, async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await setServerFHIRContext(page, serverFHIRNum);
      await loadFromTestData(page, 'phq9.json', fhirVersion);

      // This test form does prepoluation of the first answer.
      // This is also a test of prepoluation of list questions.
      const firstQ = '/44250-9/1';
      await expect(byId(page, firstQ)).toBeVisible();
      await expect(byId(page, firstQ)).toHaveValue('0. Not at all - 0');
      await expect(byId(page, '/44261-6/1')).toHaveValue('0');
    });
  }

  test.describe('with bower packages', () => {
    test('should be possible to pull in data from a FHIR context', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await setServerFHIRContext(page, '3.0');
      await loadFromTestData(page, 'ussg-fhp.json', fhirVersion);

      await expect(byId(page, '/54126-8/54125-0/1/1')).toHaveValue('John Smith');
      await expect(byId(page, '/54126-8/21112-8/1/1').locator('input')).toHaveValue('12/10/1990');
      // expect(gender).toBe("Male"); // TBD
      // initialExpression fields should not be read-only.
      await expect(byId(page, '/54126-8/54125-0/1/1')).not.toBeDisabled();
    });

    test('should be possible to get a Questionnaire back with launchContext', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await setServerFHIRContext(page, '3.0');
      await loadFromTestData(page, 'ussg-fhp.json', fhirVersion);

      const result = await page.evaluate(() => {
        const win = window as any;
        const q2Data = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
        const launchContextExt = win.LForms.Util.findObjectInArray(
          q2Data.extension, 'url', win.LForms.FHIR.R4.SDC.fhirExtLaunchContext, 0
        );
        return launchContextExt !== null;
      });
      expect(result).toBe(true);
    });

    for (const serverFHIRNum of ['3.0', '4.0']) {
      test.describe(`by observationLinkPeriod with server FHIR version ${serverFHIRNum}`, () => {
        test('should load values from observationLinkPeriod', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum);
          await loadFromTestData(page, 'weightHeightQuestionnaire.json', fhirVersion);

          await expect(byId(page, '/29463-7/1')).toBeVisible();
          await expect(byId(page, '/29463-7/1')).toHaveValue('95');
          await expect(byId(page, 'unit_/29463-7/1')).toHaveValue('kg');
        });

        test('should populate observationLinkPeriod fields that are not top-level', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum);
          await loadFromTestData(page, 'ussg-fhp.json', fhirVersion);

          await expect(byId(page, '/54126-8/29463-7/1/1')).toBeVisible();
          await expect(byId(page, '/54126-8/29463-7/1/1')).toHaveValue('95');
        });

        test('should extract observationExtract fields that are not top-level', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum);
          await loadFromTestData(page, 'ussg-fhp.json', fhirVersion);

          const releaseVersion = serverFHIRNum === '3.0' ? 'STU3' : 'R4';
          const resources = await page.evaluate((rv) =>
            (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', rv, null, { extract: true }),
            releaseVersion
          );
          expect(resources.length).toBe(2);
          expect(resources[1].entry.length).toBe(1); // One QR and one observation
          const obs = resources[1].entry[0].resource;
          expect(obs.resourceType).toBe('Observation');
          expect(obs.valueQuantity.value).toBe(95);
          expect(obs.valueQuantity.code).toBe('kg');
        });

        test('should populate observationLinkPeriod fields when multiple codes are present', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum);
          await loadFromTestData(page, 'multipleCodes.json', fhirVersion);

          await expect(byId(page, '/29463-7/1')).toBeVisible();
          await expect(byId(page, '/29463-7/1')).toHaveValue('96');
        });

        test('should extract observationExtract fields when multiple codes are present', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum);
          await loadFromTestData(page, 'multipleCodes.json', fhirVersion);

          const releaseVersion = serverFHIRNum === '3.0' ? 'STU3' : 'R4';
          const resources = await page.evaluate((rv) =>
            (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', rv, null, { extract: true }),
            releaseVersion
          );
          expect(resources.length).toBe(2);
          expect(resources[1].entry.length).toBe(2); // One QR and two observation
          const obs = resources[1].entry[0].resource;
          expect(obs.code.coding.length).toBe(2);
          expect(obs.resourceType).toBe('Observation');
          expect(obs.valueQuantity.value).toBe(96);
          expect(obs.valueQuantity.code).toBe('kg');
        });

        test('should not load values from observationLinkPeriod if prepopulation is disabled', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum, null, false);
          await loadFromTestData(page, 'weightHeightQuestionnaire.json', fhirVersion);

          await page.waitForTimeout(50);
          await expect(byId(page, '/29463-7/1')).toHaveValue('');
        });

        test('should convert values from observationLinkPeriod', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          // Load a different form first to avoid caching issues
          await setServerFHIRContext(page, serverFHIRNum);
          await loadFromTestData(page, 'multipleCodes.json', fhirVersion);

          await setServerFHIRContext(page, serverFHIRNum, {
            value: 140,
            unit: '[lb_av]',
            system: 'http://unitsofmeasure.org',
            code: '[lb_av]'
          });
          await loadFromTestData(page, 'weightHeightQuestionnaire.json', fhirVersion);

          await expect(byId(page, '/29463-7/1')).toHaveValue('63.5');
          await expect(byId(page, 'unit_/29463-7/1')).toHaveValue('kg');
        });
      });

      test.describe('addFormToPage', () => {
        test(`should not load values from observationLinkPeriod if prepopulation is disabled, with server FHIR version ${serverFHIRNum}`, async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum, null, false);
          await uploadFile(page, '#fileAnchor', 'test/data/R4/weightHeightQuestionnaire.json');
          await page.waitForTimeout(50);
          await expect(byId(page, '/29463-7/1')).toHaveValue('');
        });

        test(`should load values from observationLinkPeriod if prepopulation is enabled, with server FHIR version ${serverFHIRNum}`, async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await setServerFHIRContext(page, serverFHIRNum);
          await uploadFile(page, '#fileAnchor', 'test/data/R4/weightHeightQuestionnaire.json');
          await expect(byId(page, '/29463-7/1')).toHaveValue('95');
        });
      });
    }
  });

  test.describe('with npm packages', () => {
    test('should load values from observationLinkPeriod', async ({ page }) => {
      await page.goto('/test/pages/buildTest.html');
      await waitForLFormsReady(page);
      await setServerFHIRContext(page, '4.0');
      await loadFromTestData(page, 'weightHeightQuestionnaire.json', fhirVersion);

      await expect(byId(page, '/29463-7/1')).toHaveValue('95');
      await expect(byId(page, 'unit_/29463-7/1')).toHaveValue('kg');
    });
  });

  test.describe('enableWhen and initialExpression', () => {
    test('enableWhen should work on the answer lists populated by initialExpression', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'expression-on-data-from-prepopulation.json', 'formContainer', { fhirVersion: 'R4' });

      await expect(byId(page, 'p1.1/1/1')).toHaveValue('Interventional');
      const p1_2 = byId(page, 'p1.2/1/1');
      await expect(p1_2).toBeVisible();
      await expect(p1_2).toHaveValue('');
      await p1_2.click();
      await expect(page.locator('#lhc-tools-searchResults li')).toHaveCount(4);
      await expect(byId(page, 'p3.1.14/1')).toBeVisible();
    });
  });
});
