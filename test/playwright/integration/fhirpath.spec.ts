import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, loadFromTestData, answerId, addFormToPage } from '../support/lforms-helpers';
import * as FHIRSupport from '../../../src/fhir/versions.js';
import * as fs from 'fs';
import * as path from 'path';

const fhirVersions = Object.keys(FHIRSupport).filter(k => k !== 'default');

for (const fhirVersion of fhirVersions) {
  test.describe(fhirVersion, () => {
    test.describe('FHIRPath calculated-expression', () => {
      async function testBMIFormula(page) {
        await page.waitForFunction(() => {
          const w = window as any;
          return w.LForms && w.LForms.FHIR;
        }, { timeout: 30000 });
        await loadFromTestData(page, 'weightHeightQuestionnaire.json', fhirVersion);
        const weight = byId(page, '/29463-7/1');
        const height = byId(page, '/8302-2/1');
        const bmi = byId(page, '/39156-5/1');
        await weight.click();
        await weight.pressSequentially('70');
        await height.click();
        await height.pressSequentially('60');
        await expect(bmi).toHaveValue('30.1');
      }

      // A test of the questionnaire-calculatedExpression extension
      test('work to compute a BMI value', async ({ page }) => {
        await page.goto('/test/pages/lforms_testpage.html');
        await waitForLFormsReady(page);
        await testBMIFormula(page);
      });

      test('work to compute a BMI value with the built files', async ({ page }) => {
        await page.goto('/test/pages/build_test_fhirpath.html');
        await waitForLFormsReady(page, { fhir: false });
        await testBMIFormula(page);
      });

      test('should not stop running fhirpath expression when a valid QR is not available', async ({ page }) => {
        await page.goto('/test/pages/lforms_testpage.html');
        await waitForLFormsReady(page);
        await page.waitForFunction(() => {
          const w = window as any;
          return w.LForms && w.LForms.FHIR;
        }, { timeout: 30000 });
        await loadFromTestData(page, 'weightHeightQuestionnaire.json', fhirVersion);
        const weight = byId(page, '/29463-7/1');
        const height = byId(page, '/8302-2/1');
        const bmi = byId(page, '/39156-5/1');
        await weight.click();
        await weight.pressSequentially('123abc');
        await height.click();
        await height.pressSequentially('60');
        await expect(bmi).toHaveValue('');

        await weight.click();
        await weight.clear();
        await weight.pressSequentially('70');
        await expect(bmi).toHaveValue('30.1');

        await weight.click();
        await weight.clear();
        await weight.pressSequentially('123');
        if (fhirVersion === 'R4') {
          await expect(byId(page, '/39156-5/1')).toHaveValue('53'); // the calculated bmi value when '123' was typed.
        } else if (fhirVersion === 'STU3') {
          await expect(byId(page, '/39156-5/1')).toHaveValue('52.9'); // the calculated bmi value when '123' was typed.
        }
        await weight.pressSequentially('abc');
        if (fhirVersion === 'R4') {
          await expect(byId(page, '/39156-5/1')).toHaveValue('53');
        } else if (fhirVersion === 'STU3') {
          await expect(byId(page, '/39156-5/1')).toHaveValue('52.9');
        }
      });
    });
  });
}

test.describe('answerExpression', () => {
  test('should be able to populate a list', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await page.waitForFunction(() => {
      const w = window as any;
      return w.LForms && w.LForms.FHIR;
    }, { timeout: 30000 });
    await loadFromTestData(page, 'answerExpressionTest.json');
    await byId(page, 'language/1').click();
    const searchResults = page.locator('#lhc-tools-searchResults li');
    await expect(searchResults).toHaveCount(2);
    await expect(searchResults.first()).toBeVisible();
  });

  test('should not cause answerOptions to be generated in the Questionnaire', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await page.waitForFunction(() => {
      const w = window as any;
      return w.LForms && w.LForms.FHIR;
    }, { timeout: 30000 });
    await loadFromTestData(page, 'answerExpressionTest.json');

    const result = await page.evaluate(() => {
      const w = window as any;
      const data1 = w.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const data2 = w.LForms.Util.getFormFHIRData('Questionnaire', 'STU3');
      return {
        r4answerOption: data1.item[0].answerOption,
        stu3option: data2.item[0].option
      };
    });
    expect(result.r4answerOption).toBeUndefined();
    expect(result.stu3option).toBeUndefined();
  });

  const rxTermsQs = [ // rxterms Questionnaires
    'rxterms.R4', // where the strength item has an answerExpression
    'rxtermsAnswerExpTests/rxterms.R4.with-autofill-calexp', // where the strength item has an answerExpression then a calculatedExpression (autofill)
    'rxtermsAnswerExpTests/rxterms.R4.with-autofill-calexp2' // where the strength item has a calculatedExpression (autofill) then an answerExpression
  ];

  test.describe('answerExpression tests with the RxTerms form', () => {

    for (const q of rxTermsQs) {
      test.describe('Questionnaire ' + q, () => {
        test('should not clear a list field if the form has just loaded with saved data', async ({ page }) => {
          // This is the case when a QuestionnaireResponse is loaded in that has a
          // value in a field whose list comes from an answerExpression or a
          // cqf-expression.  Initially, there is no list, but when the expression
          // runs, a list is obtained.  Because the data in the field is saved data,
          // it should not be cleared, even if it is not in the current list.  For
          // example, in the RxTerms form below, if the user saved a drug name and a
          // strength value, when the form is later loaded, RxTerms might have been
          // updated and no longer have the selected strength value, or even the drug
          // name itself.  We must be careful not to discard the user's data just
          // because the form is re-opened.

          // First, create a QR by loading the base form
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await page.waitForFunction(() => {
            const w = window as any;
            return w.LForms && w.LForms.FHIR;
          }, { timeout: 30000 });
          await loadFromTestData(page, 'rxterms.R4.json', 'R4');
          const medication = byId(page, 'medication/1/1');
          const strength = byId(page, 'strength/1/1');
          const firstResult = page.locator('#lhc-tools-searchResults li:first-child');
          await medication.click();
          await medication.pressSequentially('ar');
          await expect(page.locator('#lhc-tools-searchResults li').first()).toBeVisible({ timeout: 10000 });
          await firstResult.click();
          await strength.click();
          await page.waitForSelector('#lhc-tools-searchResults li', { timeout: 10000 });
          await firstResult.click();
          await expect(byId(page, 'rxcui/1/1')).not.toHaveValue('');

          // get QR
          const qrData = await page.evaluate(() =>
            (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
          );

          // Navigate to addFormToPageTest to load with saved data
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);

          const qFilePath = path.resolve('test/data/R4/' + q + '.json');
          const qData = JSON.parse(fs.readFileSync(qFilePath, 'utf-8'));
          const qOrig = JSON.parse(JSON.stringify(qData));
          const qrOrig = JSON.parse(JSON.stringify(qrData));

          // Helper to show QQR on the page
          async function showQQR(qDef, qr, elemID) {
            await page.evaluate(({ qDef, qr, elemID }) => {
              const w = window as any;
              const lfd = w.LForms.Util.convertFHIRQuestionnaireToLForms(qDef, 'R4');
              let merged = w.LForms.Util.mergeFHIRDataIntoLForms(qr, lfd, 'R4');
              merged = new w.LForms.LFormsData(merged);
              w.LForms.Util.addFormToPage(merged, elemID);
            }, { qDef, qr, elemID });
          }

          // Confirms that the saved data is still on the displayed form.
          async function checkSavedDataPresent() {
            await expect(byId(page, 'strength/1/1')).not.toHaveValue('');
            await expect(byId(page, 'rxcui/1/1')).not.toHaveValue('');
          }

          // Test 1: basic load with saved data
          let qr = JSON.parse(JSON.stringify(qrData));
          await showQQR(qData, qr, 'formContainer');
          await byId(page, 'strength/1/1').click();
          await page.waitForSelector('#lhc-tools-searchResults li', { timeout: 10000 });
          await checkSavedDataPresent();

          // Test 2: strength value not in list - should still preserve it
          qr.item[0].item[1].answer[0].valueCoding.code = 'I am not in the list';
          await showQQR(JSON.parse(JSON.stringify(qOrig)), qr, 'formContainer');
          await byId(page, 'strength/1/1').click();
          await page.waitForSelector('#lhc-tools-searchResults li', { timeout: 10000 });
          await checkSavedDataPresent();

          // Test 3: vertical layout (remove gtable extension)
          let qDataVert = JSON.parse(JSON.stringify(qOrig));
          // delete itemControl "gtable" extension
          qDataVert.item[0].extension = qDataVert.item[0].extension.filter(
            (e: any) => e.url !== 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');
          await showQQR(qDataVert, qr, 'formContainer');
          const strengthField = byId(page, 'strength/1/1');
          await strengthField.click();
          await page.waitForSelector('#lhc-tools-searchResults li', { timeout: 10000 });
          await strengthField.blur();
          await checkSavedDataPresent();

          // Test 4: drug code that is off list
          qr.item[0].item[0].answer[0].valueCoding.code = 'off-list code';
          await showQQR(JSON.parse(JSON.stringify(qOrig)), qr, 'formContainer');
          await expect(byId(page, 'strength/1/1')).toBeVisible();
          await checkSavedDataPresent();

          // Test 5: drug name that has no code (was never on the list)
          qr.item[0].item[0].answer[0].valueCoding = { display: 'Off-list drug name' };
          await showQQR(JSON.parse(JSON.stringify(qOrig)), qr, 'formContainer');
          await expect(byId(page, 'strength/1/1')).toBeVisible();
          await checkSavedDataPresent();

          // Test 6: multiple values in strength (multi-select)
          let qDataMulti = JSON.parse(JSON.stringify(qOrig));
          qDataMulti.item[0].item[1].repeats = true;
          delete qDataMulti.item[0].item[2].extension; // deletes calculatedExpression for rxcui
          qr = JSON.parse(JSON.stringify(qrOrig));
          qr.item[0].item[1].answer[1] = { valueCoding: { display: 'other value' } };
          await showQQR(qDataMulti, qr, 'formContainer');
          await byId(page, 'strength/1/1').click();
          await page.waitForSelector('#lhc-tools-searchResults li', { timeout: 10000 });
          await expect(byId(page, 'medication/1/1')).not.toHaveValue('');
          // The strength field's values are in the multi-select area.
          const selectedItems = await byId(page, 'strength/1/1').evaluate(
            el => (el as any).autocomp.getSelectedItems()
          );
          expect(selectedItems && selectedItems.length).toBe(2);
          await expect(byId(page, 'rxcui/1/1')).not.toHaveValue('');

          // Test 7: radio buttons
          let qDataRadio = JSON.parse(JSON.stringify(qOrig));
          // delete itemControl "gtable" extension
          qDataRadio.item[0].extension = qDataRadio.item[0].extension.filter(
            (e: any) => e.url !== 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');
          const exts = qDataRadio.item[0].item[1].extension;
          expect(exts[0].url).toBe('http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');
          // Replace the strength field drop down with radio buttons
          exts[0] = {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              text: 'Radio Button',
              coding: [
                {
                  code: 'radio-button',
                  display: 'Radio Button',
                  system: 'http://hl7.org/fhir/questionnaire-item-control'
                }
              ]
            }
          };
          qr = JSON.parse(JSON.stringify(qrOrig));
          await showQQR(qDataRadio, qr, 'formContainer');
          await expect(byId(page, 'medication/1/1')).not.toHaveValue('');
          await expect(byId(page, 'strength/1/1||213377').locator('input')).toBeChecked();
          await expect(byId(page, 'rxcui/1/1')).not.toHaveValue('');
        });
      });

      test.describe('Questionnaire ' + q + ' with checkboxes', () => {
        test('should not clear a list field if the form has just loaded with saved data', async ({ page }) => {
          // Test with checkboxes and multiple values
          // First, create a QR by loading the base form
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await page.waitForFunction(() => {
            const w = window as any;
            return w.LForms && w.LForms.FHIR;
          }, { timeout: 30000 });
          await loadFromTestData(page, 'rxterms.R4.json', 'R4');
          const medication = byId(page, 'medication/1/1');
          const firstResult = page.locator('#lhc-tools-searchResults li:first-child');
          await medication.click();
          await medication.pressSequentially('ar');
          await expect(page.locator('#lhc-tools-searchResults li').first()).toBeVisible({ timeout: 10000 });
          await firstResult.click();
          await byId(page, 'strength/1/1').click();
          await page.waitForSelector('#lhc-tools-searchResults li', { timeout: 10000 });
          await firstResult.click();
          await expect(byId(page, 'rxcui/1/1')).not.toHaveValue('');

          const qrData = await page.evaluate(() =>
            (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
          );

          // Load checkbox questionnaire
          const qFile = q === 'rxterms.R4' ? 'rxtermsAnswerExpTests/' + q : q;
          const qFilePath = path.resolve('test/data/R4/' + qFile + '.checkboxes.json');
          const qData = JSON.parse(fs.readFileSync(qFilePath, 'utf-8'));
          const qr = JSON.parse(JSON.stringify(qrData));
          qr.item[0].item[1].answer[1] = { valueString: 'other value' };

          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);

          await page.evaluate(({ qDef, qr, elemID }) => {
            const w = window as any;
            const lfd = w.LForms.Util.convertFHIRQuestionnaireToLForms(qDef, 'R4');
            let merged = w.LForms.Util.mergeFHIRDataIntoLForms(qr, lfd, 'R4');
            merged = new w.LForms.LFormsData(merged);
            w.LForms.Util.addFormToPage(merged, elemID);
          }, { qDef: qData, qr, elemID: 'formContainer' });

          await expect(byId(page, 'medication/1/1')).not.toHaveValue('');
          await expect(byId(page, answerId('strength/1/1', undefined, '213377')).locator('input')).toBeChecked();
          await expect(byId(page, answerId('strength/1/1', '_other')).locator('input')).toBeChecked();
          await expect(byId(page, answerId('strength/1/1', '_otherValue'))).toHaveValue('other value');
          await expect(byId(page, 'rxcui/1/1')).not.toHaveValue('');
        });
      });
    }
  });
});
