import { test, expect } from '@playwright/test';
import { byId, answerId, waitForLFormsReady, addFormToPage } from '../support/lforms-helpers';

test.describe('Form with extract observation extension', () => {

  test('should be able to set initial boolean values, extract observations and get boolean values correctly', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'extractObs-test.R4.json', 'formContainer', { fhirVersion: 'R4' });

    // check default values
    let formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items.length).toBe(5);
    expect(formData.items[0].value).toBe(true);
    expect(formData.items[3].value).toBe(false);
    expect(formData.items[4].value).toBe(undefined);

    // check extracted
    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[0].item.length).toBe(4);
    expect(bundle[0].item[0].answer).toEqual([{ valueBoolean: true }]);
    expect(bundle[0].item[1].answer).toEqual([{ valueCoding: { code: 'code1', display: 'answer 1' } }]);
    expect(bundle[0].item[2].answer).toEqual([{ valueCoding: { code: 'codea', display: 'answer a' } }]);
    expect(bundle[0].item[3].answer).toEqual([{ valueBoolean: false }]);

    const obs = bundle[1].entry;
    expect(obs.length).toBe(4);
    expect(obs[0].resource.resourceType).toBe('Observation');
    expect(obs[0].resource.valueBoolean).toBe(true);
    expect(obs[1].resource.valueCodeableConcept).toEqual({ coding: [{ code: 'code1', display: 'answer 1' }], text: 'answer 1' });
    expect(obs[2].resource.valueCodeableConcept).toEqual({ coding: [{ code: 'codea', display: 'answer a' }], text: 'answer a' });
    expect(obs[3].resource.valueBoolean).toBe(false);
    // Default Bundle entry request object, in absence of observationExtractEntry extension.
    expect(obs[3].request).toEqual({ method: 'POST', url: 'Observation' });
  });

  test('should not extract observations from empty items', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'extractObs-test.R4.json', 'formContainer', { fhirVersion: 'R4' });

    const choiceItem2 = byId(page, 'choiceItem2/1');
    await choiceItem2.click();
    await choiceItem2.clear();
    await page.keyboard.press('Enter');
    await choiceItem2.blur();

    let bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].item.length).toBe(3);
    expect(bundle[0].item[0].answer).toEqual([{ valueBoolean: true }]);
    expect(bundle[0].item[1].answer).toEqual([{ valueCoding: { code: 'code1', display: 'answer 1' } }]);
    const obs = bundle[1].entry;
    expect(obs.length).toBe(3);
    expect(obs[0].resource.valueBoolean).toBe(true);
    expect(obs[1].resource.valueCodeableConcept).toEqual({ coding: [{ code: 'code1', display: 'answer 1' }], text: 'answer 1' });

    const choiceItem1 = byId(page, 'choiceItem1/1');
    await choiceItem1.click({ force: true });
    await choiceItem1.clear();
    await page.keyboard.press('Enter');
    await choiceItem1.blur();
    bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].item.length).toBe(2);
    expect(bundle[0].item[0].answer).toEqual([{ valueBoolean: true }]);
    expect(bundle[1].entry.length).toBe(2);
    expect(bundle[1].entry[0].resource.valueBoolean).toBe(true);
  });

  test('should not extract observations from hidden items and should get boolean value (false) correctly', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'extractObs-test.R4.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, answerId('blItem1/1', 'false')).click();
    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].item.length).toBe(2);
    expect(bundle[0].item[0].answer).toEqual([{ valueBoolean: false }]);
    expect(bundle[1].entry.length).toBe(2);
    expect(bundle[1].entry[0].resource.valueBoolean).toBe(false);
  });

  test('should extract multiple Observations for repeated items', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-obs-extract-repeats-true.json', 'formContainer', { fhirVersion: 'R4' });
    // Fill out answers for repeated questions.
    await byId(page, 'string/1').pressSequentially('A');
    await byId(page, 'add-string/1').click();
    await byId(page, 'string/2').pressSequentially('B');
    await byId(page, 'decimal/1').pressSequentially('1');
    await byId(page, 'add-decimal/1').click();
    await byId(page, 'decimal/2').pressSequentially('2');

    // Extract an Observation for each repeated item.
    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    const obs = bundle[1].entry;
    expect(obs.length).toBe(6);
    expect(obs[0].resource.valueString).toBe('A');
    expect(obs[1].resource.valueString).toBe('B');
    expect(obs[2].resource.valueQuantity).toEqual({
      value: '1', unit: 'kilogram', code: 'kg', system: 'http://unitsofmeasure.org'
    });
    expect(obs[3].resource.valueQuantity).toEqual({
      value: '2', unit: 'kilogram', code: 'kg', system: 'http://unitsofmeasure.org'
    });
    expect(obs[4].resource.valueCodeableConcept).toEqual({
      coding: [{ code: 'a', display: 'A', system: 's' }], text: 'A'
    });
    expect(obs[5].resource.valueCodeableConcept).toEqual({
      coding: [{ code: 'b', display: 'B', system: 's' }], text: 'B'
    });
  });

  test('should extract Questionnaire.item.code into Observation.code.coding', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'extractObsCode-test.R4.json', 'formContainer', { fhirVersion: 'R4' });

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    const obs = bundle[1].entry;
    // Should not extract child items if parent item has obsExtract=false.
    expect(obs.some((b: any) => b.resource.resourceType === 'Observation' && b.resource.code?.text === 'intItem0')).toBe(false);
    // Should extract child item if it turns extraction back on again with ObsExtract=true.
    expect(obs[0].resource.code.text).toBe('intItem1');
    // Should extract only the code with ObsExtract=true if the extension is on code level.
    expect(obs[1].resource.code.text).toBe('blItem3');
    expect(obs[1].resource.code.coding.length).toBe(1);
    expect(obs[1].resource.code.coding[0].code).toBe('code5');
    // Should extract more than one item.code into Observation.code.
    expect(obs[2].resource.code.text).toBe('codingItem2');
    expect(obs[2].resource.code.coding.length).toBe(2);
    // Should only skip codes with ObsExtract=false if item has ObsExtract=true.
    expect(obs[3].resource.code.text).toBe('blItem4');
    expect(obs[3].resource.code.coding.length).toBe(2);
    expect(obs[3].resource.code.coding[0].code).toBe('code6'); // code with ObsExtract=true
    expect(obs[3].resource.code.coding[1].code).toBe('code8'); // code without ObsExtract extension
  });

  test('should extract based on ObservationExtract valueCode relationship - component - R4', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'blood-pressure-q.json', 'formContainer', { fhirVersion: 'R4' });

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    const obs = bundle[1].entry;
    expect(obs.length).toBe(1);
    expect(obs[0].resource.code.coding).toEqual([
      { system: 'http://loinc.org', code: '8532-0', display: 'Blood pressure' }
    ]);
    expect(obs[0].resource.component).toEqual([
      {
        code: {
          coding: [{ system: 'http://loinc.org', code: '8478-0', display: 'Systolic blood pressure' }],
          text: 'What is your systolic blood pressure?'
        },
        valueQuantity: { value: '120', unit: 'millimeter of mercury', code: 'mm[Hg]', system: 'http://unitsofmeasure.org' }
      },
      {
        code: {
          coding: [{ system: 'http://loinc.org', code: '8462-7', display: 'Diastolic blood pressure' }],
          text: 'What is your diastolic blood pressure?'
        },
        valueQuantity: { value: '80', unit: 'millimeter of mercury', code: 'mm[Hg]', system: 'http://unitsofmeasure.org' }
      }
    ]);
  });

  test('should extract based on ObservationExtract valueCode relationship - member - R4', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'blood-count-panel-q.json', 'formContainer', { fhirVersion: 'R4' });

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    const obs = bundle[1].entry;
    expect(obs.length).toBe(3);
    expect(obs[0].resource.code.coding).toEqual([
      { system: 'http://loinc.org', code: '58410-2', display: 'CBC panel - Blood by Automated count' }
    ]);
    expect(obs[1].resource.valueQuantity).toEqual({
      value: '120', unit: 'thousand per microliter', code: '10*3/uL', system: 'http://unitsofmeasure.org'
    });
    expect(obs[2].resource.valueQuantity).toEqual({
      value: '80', unit: 'million per microliter', code: '10*6/uL', system: 'http://unitsofmeasure.org'
    });
    expect(obs[0].resource.hasMember[0].reference).toBe(obs[1].resource.id);
    expect(obs[0].resource.hasMember[1].reference).toBe(obs[2].resource.id);
  });

  test('should extract based on ObservationExtract valueCode relationship - component - STU3', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'blood-pressure-q.json', 'formContainer', { fhirVersion: 'STU3' });

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'STU3', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    const obs = bundle[1].entry;
    expect(obs.length).toBe(1);
    expect(obs[0].resource.code.coding).toEqual([
      { system: 'http://loinc.org', code: '8532-0', display: 'Blood pressure' }
    ]);
    expect(obs[0].resource.component.length).toBe(2);
  });

  test('should find the correct repeatable parents for ObservationExtract valueCode relationship', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-obs-extract-valueCode-with-repeatable-parents.json', 'formContainer', { fhirVersion: 'R4' });
    await byId(page, 'parentRepeatableItem/1').pressSequentially('Adam');
    await byId(page, 'add-parentRepeatableItem/1').click();
    await byId(page, 'parentRepeatableItem/2').pressSequentially('Ben');
    await byId(page, 'childItem1/2/1').pressSequentially('130');
    await byId(page, 'childItem2/2/1').pressSequentially('90');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    const obs = bundle[1].entry;
    expect(obs.length).toBe(2);
    expect(obs[0].resource.valueString).toBe('Adam');
    expect(obs[0].resource.component[0].valueQuantity.value).toBe('120');
    expect(obs[0].resource.component[1].valueQuantity.value).toBe('80');
    expect(obs[1].resource.valueString).toBe('Ben');
    expect(obs[1].resource.component[0].valueQuantity.value).toBe('130');
    expect(obs[1].resource.component[1].valueQuantity.value).toBe('90');
  });

  test('should not extract ObservationExtract valueCode items if no extractable parent is found', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-obs-extract-valueCode-with-no-extractable-parent.json', 'formContainer', { fhirVersion: 'R4' });

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(1);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
  });

  test('should set request properties based on observationExtractEntry subextensions', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'extractObs-test-with-observationExtractEntry.R4.json', 'formContainer', { fhirVersion: 'R4' });

    const result = await page.evaluate(() => {
      const w = window as any;
      const bundle = w.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true });
      return {
        bundleLength: bundle.length,
        qrType: bundle[0].resourceType,
        obsBundle: bundle[1]
      };
    });
    expect(result.bundleLength).toBe(2);
    expect(result.qrType).toBe('QuestionnaireResponse');
    expect(result.obsBundle.resourceType).toBe('Bundle');
    expect(result.obsBundle.entry.length).toBe(1);
    const resource = result.obsBundle.entry[0].resource;
    expect(resource.resourceType).toBe('Observation');
    expect(resource.valueBoolean).toBe(true);
    expect(resource.id).not.toBeNull();
    expect(result.obsBundle.entry[0].fullUrl).toBe(resource.id);
    const request = result.obsBundle.entry[0].request;
    expect(request.method).toBe('PUT');
    expect(request.url).toBe(`Observation/${resource.id}`);
    expect(request.ifNoneMatch).toBe(resource.id);
    expect(request.ifModifiedSince).toBe(new Date().toISOString().slice(0, 10));
    expect(request.ifMatch).toBe(resource.id);
    expect(request.ifNoneExist).toBe(resource.id);
  });
});
