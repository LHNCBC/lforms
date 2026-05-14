// Tests FHIR output and import of FHIR resources.
import { test, expect, Page } from '@playwright/test';
import { byId, openFormByIndex, waitForLFormsReady, addFormToPage, answerId, loadFromTestData } from '../support/lforms-helpers';
// R4B is same as R4 for Questionnaire and QuestionnaireResponse.
// Only need to test R4B in the test for profile.
const fhirVersions = ['R4', 'R5', 'STU3'];

/**
 *  Returns a promise that will resolve to an array of two elements, the first
 *  of which will be an error message (if any), and the second of which will be
 *  the requested FHIR resource for the given fhirVersion (if there was no
 *  error).
 * @param resourceType the type of the requested FHIR resource
 * @param fhirVersion the FHIR version for which the resource is to be
 *  generated.
 * @param options The optional options parameter to pass to getFormFHIRData.
 */
async function getFHIRResource(page: Page, resourceType: string, fhirVersion: string, options: any = null) {
  return page.evaluate(({ resourceType, fhirVersion, options }) => {
    try {
      const resData = (window as any).LForms.Util.getFormFHIRData(resourceType, fhirVersion, null, options);
      return [null, resData];
    } catch (e: any) {
      return [[e.message, e.stack].join('\n')];
    }
  }, { resourceType, fhirVersion, options });
}

// Fill in the USSG-FHT form with standard test data
async function fillInFHTForm(page: Page) {
  // Name, repeating
  await byId(page, '/54126-8/54125-0/1/1').fill('name 1');
  await byId(page, 'add-/54126-8/54125-0/1/1').click();
  await byId(page, '/54126-8/54125-0/1/2').fill('name 2');
  // DOB, Date field needs pressSequentially for date picker to process
  const dobInput = byId(page, '/54126-8/21112-8/1/1').locator('input');
  await dobInput.click();
  await dobInput.pressSequentially('10/27/2016');
  await dobInput.press('Tab');
  // Gender, CWE/CNE - pick 1st item
  const gender = byId(page, '/54126-8/54131-8/1/1');
  await gender.click();
  await gender.press('ArrowDown');
  await gender.press('Enter');
  // Race, multiple answers - pick first 2 items
  const race = byId(page, '/54126-8/54134-2/1/1');
  await race.click();
  await race.press('ArrowDown');
  await race.press('Enter');
  await race.press('Enter');
  // Weight and Height, Quantity fields
  // FHTData.json uses calculationMethod (not FHIRPath), so fill() is fine.
  await byId(page, '/54126-8/8302-2/1/1').fill('70');
  await byId(page, '/54126-8/29463-7/1/1').fill('170');
  // Wait for BMI calculation to complete
  await expect(byId(page, '/54126-8/39156-5/1/1')).toHaveValue('24.39');
  // Your deseases history, repeating sub panel
  // Disease or condition, pick 1st item
  const disease1 = byId(page, '/54126-8/54137-5/54140-9/1/1/1');
  await disease1.click();
  await disease1.press('ArrowDown');
  await disease1.press('Enter');
  // Age at diagnosis, pick 2nd item
  const age1 = byId(page, '/54126-8/54137-5/54130-0/1/1/1');
  await age1.click();
  await age1.press('ArrowDown');
  await age1.press('ArrowDown');
  await age1.press('Enter');
  // add another disease history
  await byId(page, 'add-/54126-8/54137-5/1/1').click();
  const disease2 = byId(page, '/54126-8/54137-5/54140-9/1/2/1');
  await expect(disease2).toBeVisible();
  // Disease or condition, pick 2nd item
  await disease2.click();
  await disease2.press('ArrowDown');
  await disease2.press('ArrowDown');
  await disease2.press('Enter');
  // Age at diagnosis, pick 3rd item
  const age2 = byId(page, '/54126-8/54137-5/54130-0/1/2/1');
  await age2.click();
  await age2.press('ArrowDown');
  await age2.press('ArrowDown');
  await age2.press('ArrowDown');
  await age2.press('Enter');
  // Blur the last field to commit the value
  await age2.blur();
  // Blue sometimes doesn't trigger the change event for the last field, so click on another field to make sure the value is committed.
  await disease2.click();
}

for (const fhirVersion of fhirVersions) {
  test.describe(`${fhirVersion} - FHIR Data`, () => {
    test.describe('rendering-style extension', () => {
      test('should work on Questionnaire.title, item.prefix, and item.text', async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'argonaut-phq9-ish.json', 'formContainer', { fhirVersion });
        await expect(byId(page, 'label-44249-1')).toHaveAttribute('style', 'background-color: white; color: green;');
        await expect(page.locator('#label-g1\\.q2\\/1\\/1 .prefix')).toHaveAttribute('style', 'font-weight: bold;');
        await expect(page.locator('#label-g1\\.q2\\/1\\/1 .question')).toHaveAttribute('style', 'font-style: italic;');
      });

      test('should work on checkboxes and radio buttons', async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'q-with-rendering-style-radio-and-checkbox.json', 'formContainer', { fhirVersion });
        await expect(byId(page, answerId('1.1/1', undefined, 'code1'))).toHaveAttribute('style', 'font-style: italic;');
        await expect(byId(page, answerId('1.1/1', undefined, 'code2'))).toHaveAttribute('style', 'font-style: italic;');
        await expect(byId(page, answerId('1.2/1', undefined, 'Answer string 1'))).toHaveAttribute('style', 'font-weight: bold;');
        await expect(byId(page, answerId('1.2/1', undefined, 'Answer string 2'))).toHaveAttribute('style', 'font-weight: bold;');
        await expect(byId(page, answerId('1.3/1', undefined, '2025-05-23'))).toHaveAttribute('style', 'font-style: italic;');
        await expect(byId(page, answerId('1.3/1', undefined, '2025-05-24'))).toHaveAttribute('style', 'font-style: italic;');
        await expect(byId(page, answerId('1.4/1', undefined, '10:30:00'))).toHaveAttribute('style', 'font-weight: bold;');
        await expect(byId(page, answerId('1.4/1', undefined, '13:30:00'))).toHaveAttribute('style', 'font-weight: bold;');
        await expect(byId(page, answerId('1.5/1', undefined, '1'))).toHaveAttribute('style', 'font-style: italic;');
        await expect(byId(page, answerId('1.5/1', undefined, '2'))).toHaveAttribute('style', 'font-style: italic;');
      });

      if (fhirVersion !== 'STU3') {
        test('should work on question text in horizontal tables', async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await addFormToPage(page, 'tables.json', 'formContainer', { fhirVersion });
          await expect(page.locator('#col\\/g2\\/g1m1\\/1\\/1 .prefix')).toHaveAttribute('style', 'font-weight: bold;');
          await expect(page.locator('#col\\/g2\\/g1m1\\/1\\/1 .question')).toHaveAttribute('style', 'font-style: italic;');
        });

        test('should work on question text in a matrix layout', async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await addFormToPage(page, 'tables.json', 'formContainer', { fhirVersion });
          await expect(page.locator('#label-\\/g4\\/g1m2\\/1\\/1 .prefix')).toHaveAttribute('style', 'font-weight: bold;');
          await expect(page.locator('#label-\\/g4\\/g1m2\\/1\\/1 .question')).toHaveAttribute('style', 'font-style: italic;');
        });

        test('should work on legal and help text, inline', async ({ page }) => {
          await page.goto('/test/pages/lforms_testpage.html');
          await waitForLFormsReady(page);
          await page.click('#showCodingInstruction');
          await loadFromTestData(page, 'q-with-rendering-style-help-and-legal.json', fhirVersion);
          await expect(byId(page, 'help-1.1/1')).toHaveAttribute('style', 'font-weight: bold;');
          await expect(byId(page, 'legal-1.1/1')).toHaveAttribute('style', 'font-style: italic;');
        });

        test('should work on legal and help text, popover', async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await addFormToPage(page, 'q-with-rendering-style-help-and-legal.json', 'formContainer', { fhirVersion });
          await byId(page, 'legal-button-1.1/1').click();
          await expect(byId(page, 'legal-content-1.1/1')).toHaveAttribute('style', 'font-style: italic;');
          await byId(page, 'help-button-1.1/1').click();
          await expect(byId(page, 'help-content-1.1/1')).toHaveAttribute('style', 'font-weight: bold;');
        });

        test('should work on matrix layout', async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await addFormToPage(page, 'answerOption-rendering-style-matrix-layout.json', 'formContainer', { fhirVersion });
          await expect(page.locator('th.lhc-form-matrix-cell').nth(0)).toHaveAttribute('style', 'font-style: italic;');
          await expect(page.locator('th.lhc-form-matrix-cell').nth(3)).toHaveAttribute('style', 'font-style: italic;');
        });
      }
    });

    test.describe('FHIR Data', () => {
      test('should generate correct Observations for type integer', async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'allInOne.json', 'formContainer');
        await byId(page, '/q_lg/1').fill('3');
        await byId(page, '/type2/1').fill('4');
        const [error, fhirData] = await getFHIRResource(page, 'DiagnosticReport', fhirVersion);
        expect(error).toBeNull();
        expect(fhirData.resourceType).toBe('DiagnosticReport');
        expect(fhirData.contained[0].code.coding[0].code).toBe('q_lg');
        expect(fhirData.contained[0].valueQuantity).toEqual({ value: 3, unit: 'lbs' });
        expect(fhirData.contained[1].code.coding[0].code).toBe('type2');
        if (fhirVersion === 'STU3')
          expect(fhirData.contained[1].valueQuantity).toEqual({ value: 4 });
        else
          expect(fhirData.contained[1].valueInteger).toBe(4);
      });

      test('should get a DiagnosticReport (contained) data from a form', async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'FHTData.json', 'formContainer');

        // #1 empty form
        let [error, fhirData] = await getFHIRResource(page, 'DiagnosticReport', fhirVersion);
        expect(error).toBeNull();
        expect(fhirData.resourceType).toBe('DiagnosticReport');
        expect(fhirData.result.length).toBe(0);
        expect(fhirData.contained).toEqual([]);

        // #2 fill data
        await fillInFHTForm(page);

        [error, fhirData] = await getFHIRResource(page, 'DiagnosticReport', fhirVersion);
        expect(error).toBeNull();
        expect(fhirData.resourceType).toBe('DiagnosticReport');
        expect(fhirData.code.coding[0].system).toBe('LOINC');
        expect(fhirData.code.coding[0].code).toBe('54127-6N');
        expect(fhirData.result.length).toBe(1);
        expect(fhirData.result[0].reference).not.toBe(undefined);
        expect(fhirData.contained.length).toBe(16);
        // name 1
        expect(fhirData.contained[0].resourceType).toBe('Observation');
        expect(fhirData.contained[0].id).not.toBe(undefined);
        expect(fhirData.contained[0].code.coding[0].code).toBe('54125-0');
        expect(fhirData.contained[0].code.coding[0].system).toBe(undefined);
        expect(fhirData.contained[0].code.text).toBe('Name');
        expect(fhirData.contained[0].valueString).toBe('name 1');
        // name 2
        expect(fhirData.contained[1].resourceType).toBe('Observation');
        expect(fhirData.contained[1].id).not.toBe(undefined);
        expect(fhirData.contained[1].code.coding[0].code).toBe('54125-0');
        expect(fhirData.contained[1].code.coding[0].system).toBe(undefined);
        expect(fhirData.contained[1].code.text).toBe('Name');
        expect(fhirData.contained[1].valueString).toBe('name 2');
        // gender
        expect(fhirData.contained[2].resourceType).toBe('Observation');
        expect(fhirData.contained[2].id).not.toBe(undefined);
        expect(fhirData.contained[2].code.coding[0].code).toBe('54131-8');
        expect(fhirData.contained[2].code.coding[0].system).toBe(undefined);
        expect(fhirData.contained[2].code.text).toBe('Gender');
        expect(fhirData.contained[2].valueCodeableConcept).toEqual({ coding: [{ code: 'LA2-8', display: 'Male' }], text: 'Male' });
        // DOB
        expect(fhirData.contained[3].valueDate).toBe('2016-10-27');
        // Height
        expect(fhirData.contained[4].valueQuantity).toEqual({ unit: 'inches', value: 70 });
        // Weight
        expect(fhirData.contained[5].valueQuantity).toEqual({ unit: 'lbs', value: 170 });
        // BMI
        expect(fhirData.contained[6].valueString).toBe('24.39');
        // Race
        expect(fhirData.contained[7].valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10608-0', display: 'American Indian or Alaska Native', system: 'http://loinc.org' }],
          text: 'American Indian or Alaska Native'
        });
        expect(fhirData.contained[8].valueCodeableConcept).toEqual({
          coding: [{ code: 'LA6156-9', display: 'Asian', system: 'http://loinc.org' }],
          text: 'Asian'
        });
        // Disease
        expect(fhirData.contained[9].valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10533-0', display: 'Blood Clots', system: 'http://loinc.org' }],
          text: 'Blood Clots'
        });
        // Age at diagnosis
        expect(fhirData.contained[10].valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10403-6', display: 'Newborn', system: 'http://loinc.org' }],
          text: 'Newborn'
        });
        // Sub panel
        expect(fhirData.contained[11].related.length).toBe(2);
        // Disease 2
        expect(fhirData.contained[12].valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10572-8', display: '-- Blood Clot in Leg', system: 'http://loinc.org' }],
          text: '-- Blood Clot in Leg'
        });
        // Age at diagnosis 2
        expect(fhirData.contained[13].valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10394-7', display: 'Infancy', system: 'http://loinc.org' }],
          text: 'Infancy'
        });
        // Sub panel 2
        expect(fhirData.contained[14].related.length).toBe(2);
        // Your health information
        expect(fhirData.contained[15].related.length).toBe(11);
      });

      test('should get a DiagnosticReport (Bundle) data from a form', async ({ page }) => {
        await openFormByIndex(page, 1); // USSGFHTVertical

        // #1 empty form
        let [error, fhirData] = await getFHIRResource(page, 'DiagnosticReport', fhirVersion, { bundleType: 'collection' });
        expect(error).toBeNull();
        expect(fhirData.resourceType).toBe('Bundle');
        expect(fhirData.entry.length).toBe(1);
        expect(fhirData.entry[0].resource.resourceType).toBe('DiagnosticReport');
        expect(fhirData.entry[0].resource.code.coding[0].system).toBe('LOINC');
        expect(fhirData.entry[0].resource.code.coding[0].code).toBe('54127-6N');
        expect(fhirData.entry[0].resource.result).toEqual([]);

        // #2 fill data
        await fillInFHTForm(page);

        [error, fhirData] = await getFHIRResource(page, 'DiagnosticReport', fhirVersion, { bundleType: 'collection' });
        expect(error).toBeNull();
        expect(fhirData.resourceType).toBe('Bundle');
        expect(fhirData.entry.length).toBe(17);
        expect(fhirData.entry[0].resource.resourceType).toBe('DiagnosticReport');
        expect(fhirData.entry[0].resource.result.length).toBe(1);
        expect(fhirData.entry[0].resource.result[0].reference).not.toBe(undefined);
        // name 1
        expect(fhirData.entry[1].resource.resourceType).toBe('Observation');
        expect(fhirData.entry[1].resource.id).not.toBe(undefined);
        expect(fhirData.entry[1].resource.code.coding[0].code).toBe('54125-0');
        expect(fhirData.entry[1].resource.code.coding[0].system).toBe(undefined);
        expect(fhirData.entry[1].resource.code.text).toBe('Name');
        expect(fhirData.entry[1].resource.valueString).toBe('name 1');
        // name 2
        expect(fhirData.entry[2].resource.resourceType).toBe('Observation');
        expect(fhirData.entry[2].resource.id).not.toBe(undefined);
        expect(fhirData.entry[2].resource.code.coding[0].code).toBe('54125-0');
        expect(fhirData.entry[2].resource.code.coding[0].system).toBe(undefined);
        expect(fhirData.entry[2].resource.code.text).toBe('Name');
        expect(fhirData.entry[2].resource.valueString).toBe('name 2');
        // gender
        expect(fhirData.entry[3].resource.resourceType).toBe('Observation');
        expect(fhirData.entry[3].resource.id).not.toBe(undefined);
        expect(fhirData.entry[3].resource.code.coding[0].code).toBe('54131-8');
        expect(fhirData.entry[3].resource.code.coding[0].system).toBe(undefined);
        expect(fhirData.entry[3].resource.code.text).toBe('Gender');
        expect(fhirData.entry[3].resource.valueCodeableConcept).toEqual({ coding: [{ code: 'LA2-8', display: 'Male' }], text: 'Male' });
        // DOB
        expect(fhirData.entry[4].resource.valueDate).toBe('2016-10-27');
        // Height
        expect(fhirData.entry[5].resource.valueQuantity).toEqual({ unit: 'inches', value: 70 });
        // Weight
        expect(fhirData.entry[6].resource.valueQuantity).toEqual({ unit: 'lbs', value: 170 });
        // BMI
        expect(fhirData.entry[7].resource.valueString).toBe('24.39');
        // Race
        expect(fhirData.entry[8].resource.valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10608-0', display: 'American Indian or Alaska Native', system: 'http://loinc.org' }],
          text: 'American Indian or Alaska Native'
        });
        expect(fhirData.entry[9].resource.valueCodeableConcept).toEqual({
          coding: [{ code: 'LA6156-9', display: 'Asian', system: 'http://loinc.org' }],
          text: 'Asian'
        });
        // Disease
        expect(fhirData.entry[10].resource.valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10533-0', display: 'Blood Clots', system: 'http://loinc.org' }],
          text: 'Blood Clots'
        });
        // Age at diagnosis
        expect(fhirData.entry[11].resource.valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10403-6', display: 'Newborn', system: 'http://loinc.org' }],
          text: 'Newborn'
        });
        // Sub panel
        expect(fhirData.entry[12].resource.related.length).toBe(2);
        // Disease 2
        expect(fhirData.entry[13].resource.valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10572-8', display: '-- Blood Clot in Leg', system: 'http://loinc.org' }],
          text: '-- Blood Clot in Leg'
        });
        // Age at diagnosis 2
        expect(fhirData.entry[14].resource.valueCodeableConcept).toEqual({
          coding: [{ code: 'LA10394-7', display: 'Infancy', system: 'http://loinc.org' }],
          text: 'Infancy'
        });
        // Sub panel 2
        expect(fhirData.entry[15].resource.related.length).toBe(2);
        // Your health information
        expect(fhirData.entry[16].resource.related.length).toBe(11);
      });

      test('should get a SDC QuestionnaireResponse data from a form', async ({ page }) => {
        await openFormByIndex(page, 1); // USSGFHTVertical
        await fillInFHTForm(page);

        const [error, fhirData] = await getFHIRResource(page, 'QuestionnaireResponse', fhirVersion);
        expect(error).toBeNull();
        expect(fhirData.resourceType).toBe('QuestionnaireResponse');
        expect(!!fhirData.identifier).toBe(false);

        expect(fhirData.item.length).toBe(1);
        const item0 = fhirData.item[0];
        expect(item0.linkId).toBe('/54126-8');
        expect(item0.text).toBe('Your health information');
        expect(item0.item.length).toBe(9);

        // name 1 & 2
        expect(item0.item[0].text).toBe('Name');
        expect(item0.item[0].linkId).toBe('/54126-8/54125-0');
        expect(item0.item[0].answer.length).toBe(2);
        expect(item0.item[0].answer[0].valueString).toBe('name 1');
        expect(item0.item[0].answer[1].valueString).toBe('name 2');
        // gender
        expect(item0.item[1].text).toBe('Gender');
        expect(item0.item[1].linkId).toBe('/54126-8/54131-8');
        expect(item0.item[1].answer.length).toBe(1);
        expect(item0.item[1].answer[0].valueCoding.code).toBe('LA2-8');
        expect(item0.item[1].answer[0].valueCoding.display).toBe('Male');
        expect(item0.item[1].answer[0].valueCoding.system).toBe(undefined);
        // DOB
        expect(item0.item[2].text).toBe('Date of Birth');
        expect(item0.item[2].linkId).toBe('/54126-8/21112-8');
        expect(item0.item[2].answer.length).toBe(1);
        expect(item0.item[2].answer[0].valueDate).toBe('2016-10-27');
        // Height
        expect(item0.item[3].text).toBe('Height');
        expect(item0.item[3].linkId).toBe('/54126-8/8302-2');
        expect(item0.item[3].answer.length).toBe(1);
        expect(item0.item[3].answer[0].valueQuantity.unit).toBe('inches');
        expect(item0.item[3].answer[0].valueQuantity.value).toBe(70);
        // Weight
        expect(item0.item[4].text).toBe('Weight');
        expect(item0.item[4].linkId).toBe('/54126-8/29463-7');
        expect(item0.item[4].answer.length).toBe(1);
        expect(item0.item[4].answer[0].valueQuantity.unit).toBe('lbs');
        expect(item0.item[4].answer[0].valueQuantity.value).toBe(170);
        // BMI
        expect(item0.item[5].text).toBe('Mock-up item: Body mass index (BMI) [Ratio]');
        expect(item0.item[5].linkId).toBe('/54126-8/39156-5');
        expect(item0.item[5].answer.length).toBe(1);
        expect(item0.item[5].answer[0].valueString).toBe('24.39');
        // Race
        expect(item0.item[6].text).toBe('Race');
        expect(item0.item[6].linkId).toBe('/54126-8/54134-2');
        expect(item0.item[6].answer.length).toBe(2);
        expect(item0.item[6].answer[0].valueCoding.code).toBe('LA10608-0');
        expect(item0.item[6].answer[0].valueCoding.display).toBe('American Indian or Alaska Native');
        expect(item0.item[6].answer[0].valueCoding.system).toBe('http://loinc.org');
        expect(item0.item[6].answer[1].valueCoding.code).toBe('LA6156-9');
        expect(item0.item[6].answer[1].valueCoding.display).toBe('Asian');
        expect(item0.item[6].answer[1].valueCoding.system).toBe('http://loinc.org');
        // Disease history #1
        expect(item0.item[7].text).toBe('Your diseases history');
        expect(item0.item[7].linkId).toBe('/54126-8/54137-5');
        expect(item0.item[7].item.length).toBe(2);
        //-- Disease or Condition
        expect(item0.item[7].item[0].text).toBe('Disease or Condition');
        expect(item0.item[7].item[0].linkId).toBe('/54126-8/54137-5/54140-9');
        expect(item0.item[7].item[0].answer.length).toBe(1);
        expect(item0.item[7].item[0].answer[0].valueCoding.code).toBe('LA10533-0');
        expect(item0.item[7].item[0].answer[0].valueCoding.display).toBe('Blood Clots');
        expect(item0.item[7].item[0].answer[0].valueCoding.system).toBe('http://loinc.org');
        //-- Age at Diagnosis
        expect(item0.item[7].item[1].text).toBe('Age at Diagnosis');
        expect(item0.item[7].item[1].linkId).toBe('/54126-8/54137-5/54130-0');
        expect(item0.item[7].item[1].answer.length).toBe(1);
        expect(item0.item[7].item[1].answer[0].valueCoding.code).toBe('LA10403-6');
        expect(item0.item[7].item[1].answer[0].valueCoding.display).toBe('Newborn');
        expect(item0.item[7].item[1].answer[0].valueCoding.system).toBe('http://loinc.org');
        // Disease history #2
        expect(item0.item[8].text).toBe('Your diseases history');
        expect(item0.item[8].linkId).toBe('/54126-8/54137-5');
        expect(item0.item[8].item.length).toBe(2);
        //-- Disease or Condition
        expect(item0.item[8].item[0].text).toBe('Disease or Condition');
        expect(item0.item[8].item[0].linkId).toBe('/54126-8/54137-5/54140-9');
        expect(item0.item[8].item[0].answer.length).toBe(1);
        expect(item0.item[8].item[0].answer[0].valueCoding.code).toBe('LA10572-8');
        expect(item0.item[8].item[0].answer[0].valueCoding.display).toBe('-- Blood Clot in Leg');
        expect(item0.item[8].item[0].answer[0].valueCoding.system).toBe('http://loinc.org');
        //-- Age at Diagnosis
        expect(item0.item[8].item[1].text).toBe('Age at Diagnosis');
        expect(item0.item[8].item[1].linkId).toBe('/54126-8/54137-5/54130-0');
        expect(item0.item[8].item[1].answer.length).toBe(1);
        expect(item0.item[8].item[1].answer[0].valueCoding.code).toBe('LA10394-7');
        expect(item0.item[8].item[1].answer[0].valueCoding.display).toBe('Infancy');
        expect(item0.item[8].item[1].answer[0].valueCoding.system).toBe('http://loinc.org');
      });

      test('should get a DiagnosticReport data from an RxTerms form', async ({ page }) => {
        await openFormByIndex(page, 9); // RxTerms
        const drugField = byId(page, '/X-002/nameAndRoute/1/1');
        await drugField.click();
        await drugField.pressSequentially('aspercreme', { delay: 50 });
        await expect(page.locator('#completionOptions tr.suggestion')).not.toHaveCount(0, { timeout: 15000 });
        await drugField.press('ArrowDown');
        await drugField.press('Enter');
        // Wait for the autocomplete selection to propagate to the LForms model
        await page.waitForFunction(() => {
          try {
            const dr = (window as any).LForms.Util.getFormFHIRData('DiagnosticReport', 'R4');
            return dr && dr.result && dr.result.length > 0;
          } catch { return false; }
        }, { timeout: 10000 });

        const [error, fhirData] = await getFHIRResource(page, 'DiagnosticReport', fhirVersion);
        expect(error).toBeNull();
        expect(fhirData.result.length).toBe(1);
        expect(fhirData.result[0].reference).not.toBe(undefined);
        expect(fhirData.contained.length).toBe(2);
        // drug name
        expect(fhirData.contained[0].resourceType).toBe('Observation');
        expect(fhirData.contained[0].id).not.toBe(undefined);
        expect(fhirData.contained[0].code.coding[0].code).toBe('nameAndRoute');
        expect(fhirData.contained[0].code.coding[0].system).toBe(undefined);
        expect(fhirData.contained[0].code.text).toBe('Drug Name');
        expect(fhirData.contained[0].valueCodeableConcept).toEqual({ coding: [{ code: 'ASPERCREME (Topical)', display: 'ASPERCREME (Topical)' }], text: 'ASPERCREME (Topical)' });
      });
    });

    test.describe('merge FHIR data into form', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/lforms_testpage.html');
        await waitForLFormsReady(page);
        await page.locator('#fhirVersion').selectOption(fhirVersion);
      });

      test('should merge all DiagnosticReport (contained) data back into the form', async ({ page }) => {
        await page.click('#merge-dr');
        await expect(byId(page, '/54126-8/54125-0/1/1')).toHaveValue('name 1');
        await expect(byId(page, '/54126-8/54125-0/1/2')).toHaveValue('name 2');
        await expect(byId(page, '/54126-8/54131-8/1/1')).toHaveValue('Male');
        await expect(byId(page, '/54126-8/21112-8/1/1').locator('input')).toHaveValue('10/27/2016');
        await expect(byId(page, '/54126-8/8302-2/1/1')).toHaveValue('70');
        await expect(byId(page, '/54126-8/29463-7/1/1')).toHaveValue('170');
        await expect(byId(page, '/54126-8/39156-5/1/1')).toHaveValue('24.39');
        const races = page.locator('.autocomp_selected li');
        await expect(races.nth(0)).toHaveText('×American Indian or Alaska Native');
        await expect(races.nth(1)).toHaveText('×Asian');
        await expect(byId(page, '/54126-8/54137-5/54140-9/1/1/1')).toHaveValue('Blood Clots');
        await expect(byId(page, '/54126-8/54137-5/54130-0/1/1/1')).toHaveValue('Newborn');
        await expect(byId(page, '/54126-8/54137-5/54140-9/1/2/1')).toHaveValue('-- Blood Clot in Leg');
        await expect(byId(page, '/54126-8/54137-5/54130-0/1/2/1')).toHaveValue('Infancy');
      });

      test('should merge all DiagnosticReport (Bundle) data back into the form', async ({ page }) => {
        await page.click('#merge-bundle-dr');
        await expect(byId(page, '/54126-8/54125-0/1/1')).toHaveValue('12');
        await expect(byId(page, '/54126-8/54131-8/1/1')).toHaveValue('Male');
        await expect(byId(page, '/54126-8/21112-8/1/1').locator('input')).toHaveValue('01/10/2018');
        const races = page.locator('.autocomp_selected li');
        await expect(races.nth(0)).toHaveText('×American Indian or Alaska Native');
        await expect(races.nth(1)).toHaveText('×Asian');
        await expect(byId(page, '/54126-8/54137-5/54140-9/1/1/1')).toHaveValue('Hypertension');
        await expect(byId(page, '/54126-8/54137-5/54130-0/1/1/1')).toHaveValue('Newborn');
      });

      test('should merge all DiagnosticReport (contained) data without setting default values', async ({ page }) => {
        await page.click('#merge-dr-default-values');
        await expect(byId(page, '/intField/1')).toHaveValue('24');
        await expect(byId(page, '/decField/1')).toHaveValue('');
        await expect(byId(page, '/strField/1')).toHaveValue('');
        await expect(byId(page, '/dateField/1').locator('input')).toHaveValue('');
        await expect(byId(page, '/ansCodeDefault/1')).toHaveValue('');
      });

      test('should merge FHIR SDC QuestionnaireResponse data back into the form', async ({ page }) => {
        await page.click('#merge-qr');
        await expect(byId(page, '/54126-8/54125-0/1/1')).toHaveValue('name 1');
        await expect(byId(page, '/54126-8/54125-0/1/2')).toHaveValue('name 2');
        await expect(byId(page, '/54126-8/54125-0/1/3')).toHaveValue('name 3');
        await expect(byId(page, '/54126-8/54125-0/1/4')).toHaveValue('name 4');
        await expect(byId(page, '/54126-8/54131-8/1/1')).toHaveValue('Male');
        await expect(byId(page, '/54126-8/21112-8/1/1').locator('input')).toHaveValue('10/27/2016');
        await expect(byId(page, '/54126-8/8302-2/1/1')).toHaveValue('70');
        await expect(byId(page, '/54126-8/29463-7/1/1')).toHaveValue('170');
        await expect(byId(page, '/54126-8/39156-5/1/1')).toHaveValue('24.39');
        const races = page.locator('.autocomp_selected li');
        await expect(races.nth(0)).toHaveText('×American Indian or Alaska Native');
        await expect(races.nth(1)).toHaveText('×Asian');
        await expect(byId(page, '/54126-8/54137-5/54140-9/1/1/1')).toHaveValue('Blood Clots');
        await expect(byId(page, '/54126-8/54137-5/54130-0/1/1/1')).toHaveValue('Newborn');
        await expect(byId(page, '/54126-8/54137-5/54140-9/1/2/1')).toHaveValue('-- Blood Clot in Leg');
        await expect(byId(page, '/54126-8/54137-5/54130-0/1/2/1')).toHaveValue('Infancy');
        await expect(byId(page, '/54114-4/54138-3/1/1')).toHaveValue('another name 1');
        await expect(byId(page, '/54114-4/54138-3/1/2')).toHaveValue('another name 2');
        await expect(byId(page, '/54114-4/54138-3/1/3')).toHaveValue('another name 3');
        await expect(byId(page, '/54114-4/54138-3/1/4')).toHaveValue('another name 4');
      });

      test('should merge FHIR SDC QR with User Data on CWE fields', async ({ page }) => {
        await page.click('#merge-qr-cwe');

        await expect(byId(page, '/type2/1')).toHaveValue('0');
        await expect(byId(page, '/type3/1')).toHaveValue('-1.1');
        // defaults should not be set
        await expect(byId(page, '/type9/1')).toHaveValue('');
        await expect(byId(page, '/type4/1')).toHaveValue('');

        await expect(byId(page, answerId('/type1/1', 'true')).locator('input')).toBeChecked();
        await expect(byId(page, answerId('/type1b/1', 'false')).locator('input')).toBeChecked();
        await expect(byId(page, '/type10/1')).toHaveValue('user typed value');

        const cweRepeatsValues = page.locator('.autocomp_selected li');
        await expect(cweRepeatsValues.nth(0)).toHaveText('×Answer 1');
        await expect(cweRepeatsValues.nth(1)).toHaveText('×Answer 2');
        await expect(cweRepeatsValues.nth(2)).toHaveText('×user value1');
        await expect(cweRepeatsValues.nth(3)).toHaveText('×user value2');

        const formData = await page.evaluate(() => {
          return (window as any).LForms.Util.getUserData(null, false, true);
        });
        expect(formData.itemsData.length).toBe(9);
        expect(formData.itemsData[0].value).toBe(true);
        expect(formData.itemsData[1].value).toBe(false);
        expect(formData.itemsData[2].value).toBe(0);
        expect(formData.itemsData[3].value).toBe(-1.1);
        expect(formData.itemsData[4].value).toBe('user typed value');
        expect(formData.itemsData[5].value.length).toBe(4);
        expect(formData.itemsData[5].value[0].code).toEqual('c1');
        expect(formData.itemsData[5].value[0].text).toEqual('Answer 1');
        expect(formData.itemsData[5].value[0].system).toEqual(undefined);
        expect(formData.itemsData[5].value[1].code).toEqual('c2');
        expect(formData.itemsData[5].value[1].text).toEqual('Answer 2');
        expect(formData.itemsData[5].value[1].system).toEqual(undefined);
        expect(formData.itemsData[5].value[2]).toEqual('user value1');
        expect(formData.itemsData[5].value[3]).toEqual('user value2');
      });
    });

    test.describe('Converted Questionnaire', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, '4712701.json', 'formContainer', { fhirVersion });
      });

      test('should be able to show a converted questionnaire', async ({ page }) => {
        await expect(byId(page, 'label-4.3.3.1/1/1/1/1')).toContainText('Rezidiv/Progress aufgetreten');
      });

      test('should have functioning skiplogic when codes are not present', async ({ page }) => {
        await expect(byId(page, '1.5.4/1/1/1')).not.toBeAttached();
        await byId(page, answerId('1.5.1/1/1/1', 'true')).click();
        await expect(byId(page, '1.5.4/1/1/1')).toBeVisible();
        await byId(page, answerId('1.5.1/1/1/1', 'false')).click();
        await expect(byId(page, '1.5.4/1/1/1')).not.toBeAttached();
      });

      test('should have functioning skiplogic when codes are present', async ({ page }) => {
        await expect(byId(page, '4.3.3.2/1/1/1/1')).not.toBeAttached();
        await byId(page, answerId('4.3.3.1/1/1/1/1', 'true')).click();
        await expect(byId(page, '4.3.3.2/1/1/1/1')).toBeVisible();
        await byId(page, answerId('4.3.3.1/1/1/1/1', 'false')).click();
        await expect(byId(page, '4.3.3.2/1/1/1/1')).not.toBeAttached();
      });
    });

    test.describe('Subject option', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'weightHeightQuestionnaire.json', 'formContainer', { fhirVersion });
      });

      test('should put the patient ID into the QuestionnaireResponse', async ({ page }) => {
        await byId(page, '/8302-2/1').fill('70');

        const patientRes = { id: 3, resourceType: 'Patient', name: [{ family: 'Smith', given: ['John'] }] };
        const [error, fhirData] = await page.evaluate(({ fhirVersion, patientRes }) => {
          try {
            const data = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion, null, { subject: patientRes });
            return [null, data];
          } catch (e: any) { return [e.message]; }
        }, { fhirVersion, patientRes });
        expect(error).toBeNull();
        expect(fhirData.subject.reference).toBe('Patient/3');
        expect(fhirData.subject.display).toBe('John Smith');
      });

      test('should put the patient ID into the DiagnosticReport', async ({ page }) => {
        await byId(page, '/8302-2/1').fill('70');

        const patientRes = { id: 3, resourceType: 'Patient', name: [{ family: 'Smith', given: ['John'] }] };
        const [error, fhirData] = await page.evaluate(({ fhirVersion, patientRes }) => {
          try {
            const data = (window as any).LForms.Util.getFormFHIRData('DiagnosticReport', fhirVersion, null, { subject: patientRes });
            return [null, data];
          } catch (e: any) { return [e.message]; }
        }, { fhirVersion, patientRes });
        expect(error).toBeNull();
        expect(fhirData.subject.reference).toBe('Patient/3');
        expect(fhirData.subject.display).toBe('John Smith');
      });
    });

    test.describe('data control in Questionnaire', () => {
      test('should have data control working correctly', async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await page.locator('#fhirVersion').selectOption(fhirVersion);
        await addFormToPage(page, 'questionnaire-data-control.json', 'formContainer', { fhirVersion });

        const dcSource = byId(page, '/dataControlSource/1');
        const dcTarget1 = byId(page, '/controlledItem_LIST/1');
        const dcTarget2 = byId(page, '/controlledItem_TEXT/1');

        await dcSource.click();
        await dcSource.pressSequentially('ALTABAX (Topical)');
        await expect(page.locator('#lhc-tools-searchResults')).toBeVisible();
        await dcSource.press('ArrowDown');
        await dcSource.press('Enter');

        await expect(dcTarget1).toHaveValue('');
        await dcTarget1.click();
        await expect(page.locator('#lhc-tools-searchResults')).toBeVisible();
        await dcTarget1.press('ArrowDown');
        await dcTarget1.press('Enter');
        await expect(dcTarget1).toHaveValue('1% Ointment');
        await expect(dcTarget2).toHaveValue('1% Ointment');
      });
    });

    test.describe('initial[x] in Questionnaire', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'questionnaire-initialx.json', 'formContainer', { fhirVersion });
      });

      test('should display initial[x] values correctly', async ({ page }) => {

        await expect(byId(page, answerId('/type-boolean/1', 'true')).locator('input')).toBeChecked();

        await expect(byId(page, '/type-integer/1')).toHaveValue('123');
        await expect(byId(page, '/type-decimal/1')).toHaveValue('123.45');
        await expect(byId(page, '/type-string/1')).toHaveValue('abc123');
        await expect(byId(page, '/type-date/1').locator('input')).toHaveValue('09/03/2019');
        await expect(byId(page, '/type-dateTime/1').locator('input')).toHaveValue('02/07/2015 13:28:17');
        await expect(byId(page, '/type-time/1').locator('input')).toHaveValue('13:28:17');
        await expect(byId(page, '/type-choice/1')).toHaveValue('Answer 2');
        await expect(byId(page, '/type-open-choice/1')).toHaveValue('User typed answer');

        if (fhirVersion === 'R4') {
          const selectedItems = page.locator('.autocomp_selected li');
          await expect(selectedItems.nth(0)).toHaveText('×Answer 1');
          await expect(selectedItems.nth(1)).toHaveText('×Answer 3');
          await expect(selectedItems.nth(2)).toHaveText('×Answer 1');
          await expect(selectedItems.nth(3)).toHaveText('×Answer 3');
          await expect(selectedItems.nth(4)).toHaveText('×User typed answer a');
          await expect(selectedItems.nth(5)).toHaveText('×User typed answer b');

          const formData = await page.evaluate(() => {
            return (window as any).LForms.Util.getUserData(null, false, true);
          });
          expect(formData.itemsData.length).toBe(11);
          expect(formData.itemsData[0].value).toBe(true);
          expect(formData.itemsData[1].value).toBe(123);
          expect(formData.itemsData[2].value).toBe(123.45);
          expect(formData.itemsData[3].value).toBe('abc123');
          expect(formData.itemsData[4].value).toBe('2019-09-03');
          expect(formData.itemsData[5].value).toBe('2015-02-07T18:28:17.000Z');
          expect(formData.itemsData[6].value).toBe('13:28:17');
          expect(formData.itemsData[7].value.code).toBe('c2');
          expect(formData.itemsData[7].value.text).toBe('Answer 2');
          expect(formData.itemsData[8].value).toBe('User typed answer');
          expect(formData.itemsData[9].value[0].code).toEqual('c1');
          expect(formData.itemsData[9].value[1].code).toEqual('c3');
          expect(formData.itemsData[10].value[0].code).toEqual('c1');
          expect(formData.itemsData[10].value[1].code).toEqual('c3');
          expect(formData.itemsData[10].value[2]).toEqual('User typed answer a');
          expect(formData.itemsData[10].value[3]).toEqual('User typed answer b');
        }

        if (fhirVersion === 'STU3') {
          const formData = await page.evaluate(() => {
            return (window as any).LForms.Util.getUserData(null, false, true);
          });
          expect(formData.itemsData.length).toBe(9);
          expect(formData.itemsData[0].value).toBe(true);
          expect(formData.itemsData[1].value).toBe(123);
          expect(formData.itemsData[2].value).toBe(123.45);
          expect(formData.itemsData[3].value).toBe('abc123');
          expect(formData.itemsData[4].value).toBe('2019-09-03');
          expect(formData.itemsData[5].value).toBe('2015-02-07T18:28:17.000Z');
          expect(formData.itemsData[6].value).toBe('13:28:17');
          expect(formData.itemsData[7].value.code).toBe('c2');
          expect(formData.itemsData[8].value).toBe('User typed answer');
        }
      });

      test('should keep the initial[x] values when converted back to Questionnaire', async ({ page }) => {
        const [error, fhirData] = await getFHIRResource(page, 'Questionnaire', fhirVersion);
        expect(error).toBeNull();

        if (fhirVersion === 'R4') {
          expect(fhirData.item[0].initial).toEqual([{ valueBoolean: true }]);
          expect(fhirData.item[1].initial).toEqual([{ valueInteger: 123 }]);
          expect(fhirData.item[2].initial).toEqual([{ valueDecimal: 123.45 }]);
          expect(fhirData.item[3].initial).toEqual([{ valueString: 'abc123' }]);
          expect(fhirData.item[4].initial).toEqual([{ valueDate: '2019-09-03' }]);
          expect(fhirData.item[5].initial).toEqual([{ valueDateTime: '2015-02-07T18:28:17.000Z' }]);
          expect(fhirData.item[6].initial).toEqual([{ valueTime: '13:28:17' }]);
          expect(fhirData.item[7].answerOption[1].initialSelected).toEqual(true);
          expect(fhirData.item[7].initial).toEqual(undefined);
          expect(fhirData.item[8].initial).toEqual([{ valueString: 'User typed answer' }]);
          // choice, multiple selection
          expect(fhirData.item[9].answerOption[0].initialSelected).toEqual(true);
          expect(fhirData.item[9].answerOption[2].initialSelected).toEqual(true);
          expect(fhirData.item[9].initial).toEqual(undefined);
          // open-choice, multiple selection
          expect(fhirData.item[10].answerOption[0].initialSelected).toEqual(true);
          expect(fhirData.item[10].answerOption[2].initialSelected).toEqual(true);
          expect(fhirData.item[10].initial).toEqual([
            { valueString: 'User typed answer a' },
            { valueString: 'User typed answer b' }
          ]);
        }
        if (fhirVersion === 'STU3') {
          expect(fhirData.item[0].initialBoolean).toBe(true);
          expect(fhirData.item[1].initialInteger).toBe(123);
          expect(fhirData.item[2].initialDecimal).toBe(123.45);
          expect(fhirData.item[3].initialString).toBe('abc123');
          expect(fhirData.item[4].initialDate).toBe('2019-09-03');
          expect(fhirData.item[5].initialDateTime).toBe('2015-02-07T18:28:17.000Z');
          expect(fhirData.item[6].initialTime).toBe('13:28:17');
          expect(fhirData.item[7].initialCoding).toEqual({ code: 'c2', display: 'Answer 2' });
          expect(fhirData.item[8].initialString).toBe('User typed answer');
        }
      });
    });

    if (fhirVersion === 'R4') {
      test.describe('QuestionnaireResponse special case', () => {
        test.beforeEach(async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
        });

        test('should NOT get answers from a question under a question with no answer', async ({ page }) => {
          await addFormToPage(page, 'question-under-question.R4.json', 'formContainer', { fhirVersion });

          let [error, fhirData] = await getFHIRResource(page, 'QuestionnaireResponse', fhirVersion);
          expect(error).toBeNull();
          expect(fhirData.item).toBeUndefined();

          await byId(page, 'q2/1/1').fill('123');
          [error, fhirData] = await getFHIRResource(page, 'QuestionnaireResponse', fhirVersion);
          expect(error).toBeNull();
          expect(fhirData.item).toBeUndefined();
        });

        test('should NOT get answers from a question in a group under a question with no answer', async ({ page }) => {
          await addFormToPage(page, 'group-under-question.R4.json', 'formContainer', { fhirVersion });

          let [error, fhirData] = await getFHIRResource(page, 'QuestionnaireResponse', fhirVersion);
          expect(error).toBeNull();
          expect(fhirData.item).toBeUndefined();

          await byId(page, 'q2/1/1/1').fill('123');
          [error, fhirData] = await getFHIRResource(page, 'QuestionnaireResponse', fhirVersion);
          expect(error).toBeNull();
          expect(fhirData.item).toBeUndefined();
        });
      });
    }
  });
}

for (const fhirVersion of ['R4', 'R4B']) {
  test.describe(`Test ${fhirVersion} meta.profile`, () => {
    test('should get a SDC Questionnaire data from a form', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      const [error, fhirData] = await getFHIRResource(page, 'Questionnaire', fhirVersion);
      expect(error).toBeNull();
      expect(fhirData.resourceType).toBe('Questionnaire');
      expect(fhirData.title).toBe('USSG-FHT, (with mock-up items for skip logic demo)');
      if (fhirVersion === 'R4B')
        expect(fhirData.meta.profile).toEqual(['http://hl7.org/fhir/4.3/StructureDefinition/Questionnaire']);
      else
        expect(fhirData.meta.profile).toEqual(['http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire']);
      expect(fhirData.code[0].code).toBe('54127-6N');
      expect(fhirData.code[0].display).toBe('USSG-FHT, (with mock-up items for skip logic demo)');
      expect(fhirData.code[0].system).toBe('http://loinc.org');
      expect(fhirData.item.length).toBe(2);
      expect(fhirData.item[0].code[0].code).toBe('54126-8');
      expect(fhirData.item[0].text).toBe('Your health information');
      expect(fhirData.item[0].linkId).toBe('/54126-8');
      expect(fhirData.item[0].type).toBe('group');
      expect(fhirData.item[0].item.length).toBe(13);
      expect(fhirData.item[0].item[0].text).toBe('Name');
      expect(fhirData.item[0].item[0].type).toBe('text');
      expect(fhirData.item[0].item[0].repeats).toBe(true);
      expect(fhirData.item[0].item[12].text).toBe('Your diseases history');
      expect(fhirData.item[0].item[12].type).toBe('group');
      expect(fhirData.item[0].item[12].repeats).toBe(true);
      expect(fhirData.item[0].item[12].item.length).toBe(3);
      expect(fhirData.item[0].item[12].item[0].answerOption.length).toBe(66);
      expect(fhirData.item[1].item.length).toBe(9);
      expect(fhirData.item[1].code[0].code).toBe('54114-4');
    });
  });
}
