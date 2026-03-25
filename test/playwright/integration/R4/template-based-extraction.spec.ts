import { test, expect } from '@playwright/test';
import { byId, addFormToPage, pressCypressKeys, waitForLFormsReady } from '../../support/lforms-helpers';

test.describe('Template based extraction', () => {
  test('should work on templateExtract', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-extract-complex-template.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'given/1/1/1').type('Adam');
    await byId(page, 'family/1/1/1').type('Xie');
    const gender = byId(page, 'gender/1/1');
    await gender.click();
    await pressCypressKeys(gender, '{downArrow}{enter}');
    await byId(page, 'ihi/1/1').type('111');
    await byId(page, 'mobile-phone/1/1').type('123');
    await byId(page, 'height/1/1').type('44');
    await byId(page, 'weight/1/1').type('55');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[1].resourceType).toBe('Bundle');
    expect(bundle[1].entry.length).toBe(3);

    const patient = bundle[1].entry[0].resource;
    expect(patient.resourceType).toBe('Patient');
    expect(patient.identifier).toEqual([{
      type: { text: 'National Identifier (IHI)' },
      system: 'http://example.org/nhio',
      value: '111'
    }]);
    expect(patient.name).toEqual([{
      text: 'Adam Xie',
      family: 'Xie',
      given: ['Adam']
    }]);
    expect(patient.telecom).toEqual([{
      system: 'phone',
      use: 'mobile',
      value: '123'
    }]);
    expect(patient.gender).toBe('male');
    expect(patient._gender).toBeUndefined();
    expect(bundle[1].entry[0].request).toEqual({ method: 'POST', url: 'Patient' });

    const height = bundle[1].entry[1].resource;
    expect(height.resourceType).toBe('Observation');
    expect(height.valueQuantity).toEqual({
      unit: 'cm', system: 'http://unitsofmeasure.org', code: 'cm', value: 4400
    });
    expect(height._valueQuantity).toBeUndefined();
    expect(height.subject).toBe(bundle[1].entry[0].fullUrl);
    expect(height.issued).toBe(bundle[0].authored);
    expect(height.effectiveDateTime).toBe(bundle[0].authored);
    expect(height._effectiveDateTime).toBeUndefined();
    expect(height.derivedFrom[0].reference).toBe(`QuestionnaireResponse/${bundle[0].id}`);
    expect(bundle[1].entry[1].request).toEqual({ method: 'POST', url: 'Observation' });

    const weight = bundle[1].entry[2].resource;
    expect(weight.resourceType).toBe('Observation');
    expect(weight.valueQuantity).toEqual({
      unit: 'kg', system: 'http://unitsofmeasure.org', code: 'kg', value: 55
    });
    expect(weight._valueQuantity).toBeUndefined();
    expect(weight.subject).toBe(bundle[1].entry[0].fullUrl);
    expect(weight.issued).toBe(bundle[0].authored);
    expect(weight.effectiveDateTime).toBe(bundle[0].authored);
    expect(weight._effectiveDateTime).toBeUndefined();
    expect(weight.derivedFrom[0].reference).toBe(`QuestionnaireResponse/${bundle[0].id}`);
    expect(weight.derivedFrom[0].extension).toBeUndefined();
    expect(weight.extension).toEqual([{ url: 'test extension url', valueString: 'test extension value' }]);
    expect(bundle[1].entry[2].request).toEqual({ method: 'POST', url: 'Observation' });

    // Clear weight and verify it's removed
    await byId(page, 'weight/1/1').fill('');
    const bundle2 = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle2.length).toBe(2);
    expect(bundle2[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle2[1].resourceType).toBe('Bundle');
    expect(bundle2[1].entry.length).toBe(2);
  });

  test('should work on templateExtractBundle', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-extract-complex-template-bundle.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'given/1/1/1').type('Adam');
    await byId(page, 'family/1/1/1').type('Xie');
    const gender = byId(page, 'gender/1/1');
    await gender.click();
    await pressCypressKeys(gender, '{downArrow}{enter}');
    await byId(page, 'ihi/1/1').type('111');
    await byId(page, 'mobile-phone/1/1').type('123');
    await byId(page, 'height/1/1').type('44');
    await byId(page, 'weight/1/1').type('55');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[1].resourceType).toBe('Bundle');
    expect(bundle[1].entry.length).toBe(3);

    const patient = bundle[1].entry[0].resource;
    expect(patient.resourceType).toBe('Patient');
    expect(patient.identifier).toEqual([{
      type: { text: 'National Identifier (IHI)' },
      system: 'http://example.org/nhio',
      value: '111'
    }]);
    expect(patient.name).toEqual([{ text: 'Adam Xie', family: 'Xie', given: ['Adam'] }]);
    expect(patient.telecom).toEqual([{ system: 'phone', use: 'mobile', value: '123' }]);
    expect(patient.gender).toBe('male');
    expect(patient._gender).toBeUndefined();
    expect(bundle[1].entry[0].request).toEqual({
      method: 'POST', url: 'Patient', ifMatch: `Patient?_name=${bundle[1].entry[0].fullUrl}`
    });

    const height = bundle[1].entry[1].resource;
    expect(height.resourceType).toBe('Observation');
    expect(height.valueQuantity).toEqual({ unit: 'cm', system: 'http://unitsofmeasure.org', code: 'cm', value: 4400 });
    expect(height._valueQuantity).toBeUndefined();
    expect(height.subject.reference).toBe(bundle[1].entry[0].fullUrl);
    expect(height.issued).toBe(bundle[0].authored);
    expect(height.effectiveDateTime).toBe(bundle[0].authored);
    expect(height._effectiveDateTime).toBeUndefined();
    expect(height.derivedFrom[0].reference).toBe(`QuestionnaireResponse/${bundle[0].id}`);
    expect(bundle[1].entry[1].request).toEqual({ method: 'POST', url: 'Observation' });

    const weight = bundle[1].entry[2].resource;
    expect(weight.resourceType).toBe('Observation');
    expect(weight.valueQuantity).toEqual({ unit: 'kg', system: 'http://unitsofmeasure.org', code: 'kg', value: 55 });
    expect(weight._valueQuantity).toBeUndefined();
    expect(weight.subject.reference).toBe(bundle[1].entry[0].fullUrl);
    expect(weight.issued).toBe(bundle[0].authored);
    expect(weight.effectiveDateTime).toBe(bundle[0].authored);
    expect(weight._effectiveDateTime).toBeUndefined();
    expect(weight.derivedFrom[0].reference).toBe(`QuestionnaireResponse/${bundle[0].id}`);
    expect(bundle[1].entry[2].request).toEqual({ method: 'POST', url: 'Observation' });
  });

  test('should work on a questionnaire with both templateExtract and templateExtractBundle', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-template-extraction.json', 'formContainer', { fhirVersion: 'STU3' });

    await byId(page, 'height/1/1').type('44');
    await byId(page, 'weight/1/1').type('55');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'STU3', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[1].resourceType).toBe('Bundle');
    expect(bundle[1].entry.length).toBe(2);
    const weight = bundle[1].entry[0].resource;
    expect(weight.resourceType).toBe('Observation');
    expect(weight.valueQuantity).toEqual({ unit: 'kg', system: 'http://unitsofmeasure.org', code: 'kg', value: 55 });
    expect(weight._valueQuantity).toBeUndefined();
    const height2 = bundle[1].entry[1].resource;
    expect(height2.resourceType).toBe('Observation');
    expect(height2.valueQuantity).toEqual({ unit: 'cm', system: 'http://unitsofmeasure.org', code: 'cm', value: 4400 });
    expect(height2._valueQuantity).toBeUndefined();
  });

  test('should work if templateExtract extension is at root level', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-extract-template-root-level.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'height/1').type('44');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[1].resourceType).toBe('Bundle');
    expect(bundle[1].entry.length).toBe(1);
    const height = bundle[1].entry[0].resource;
    expect(height.resourceType).toBe('Observation');
    expect(height.valueQuantity).toEqual({ unit: 'cm', system: 'http://unitsofmeasure.org', code: 'cm', value: 4400 });
    expect(height._valueQuantity).toBeUndefined();
  });

  test('should allocate different values if extractAllocateId extension is defined on a repeating item', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-extract-template-with-allocateId-on-repeating-item.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'height/1/1').type('44');
    await byId(page, 'add-height/1/1').click();
    await byId(page, 'height/1/2').type('55');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[1].resourceType).toBe('Bundle');
    expect(bundle[1].entry.length).toBe(2);
    const h1 = bundle[1].entry[0].resource;
    expect(h1.resourceType).toBe('Observation');
    expect(h1.subject).not.toBeNull();
    const h2 = bundle[1].entry[1].resource;
    expect(h2.resourceType).toBe('Observation');
    expect(h2.subject).not.toBeNull();
    expect(h1.subject).not.toBe(h2.subject);
  });

  test('should set request properties based on templateExtract subextensions', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-extract-template-with-subextensions.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'height/1/1').type('44');

    const bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[0].resourceType).toBe('QuestionnaireResponse');
    expect(bundle[1].resourceType).toBe('Bundle');
    expect(bundle[1].entry.length).toBe(1);
    const height = bundle[1].entry[0].resource;
    expect(height.resourceType).toBe('Observation');
    expect(height.valueQuantity).toEqual({ unit: 'cm', system: 'http://unitsofmeasure.org', code: 'cm', value: 4400 });
    expect(height.id).not.toBeNull();
    expect(bundle[1].entry[0].fullUrl).toBe(height.id);
    const req = bundle[1].entry[0].request;
    expect(req.method).toBe('PUT');
    expect(req.url).toBe(`Observation/${height.id}`);
    expect(req.ifNoneMatch).toBe(height.id);
    expect(req.ifModifiedSince).toBe(new Date().toISOString().slice(0, 10));
    expect(req.ifMatch).toBe(height.id);
    expect(req.ifNoneExist).toBe(height.id);
  });

  test('should extract multiple items if templateExtractContext extension evaluates to multiple results', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-extract-complex-template.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'given/1/1/1').type('a1');
    await byId(page, 'add-given/1/1/1').click();
    await byId(page, 'given/1/1/2').type('a2');
    await byId(page, 'family/1/1/1').type('aa');
    await byId(page, 'add-name/1/1').click();

    let bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[1].entry.length).toBe(2);
    const patient1 = bundle[1].entry[0].resource;
    expect(patient1.resourceType).toBe('Patient');
    expect(patient1.name).toEqual([{ text: 'a1 a2 aa', family: 'aa', given: ['a1', 'a2'] }]);

    // Fill out another name entry
    await byId(page, 'given/1/2/1').type('b1');
    await byId(page, 'add-given/1/2/1').click();
    await byId(page, 'given/1/2/2').type('b2');
    await byId(page, 'family/1/2/1').type('bb');

    bundle = await page.evaluate(() =>
      (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
    );
    expect(bundle.length).toBe(2);
    expect(bundle[1].entry.length).toBe(2);
    const patient2 = bundle[1].entry[0].resource;
    expect(patient2.resourceType).toBe('Patient');
    expect(patient2.name).toEqual([
      { text: 'a1 a2 aa', family: 'aa', given: ['a1', 'a2'] },
      { text: 'b1 b2 bb', family: 'bb', given: ['b1', 'b2'] }
    ]);
  });
});
