import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId } from '../support/lforms-helpers';

test.describe('answerOption.initialSelected in Questionnaire', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'questionnaire-answerOption.initialSelected.json', 'formContainer', { fhirVersion: 'R4' });
  });

  test('should display default value set in answerOption.initialSelected', async ({ page }) => {
    await expect(byId(page, '/type-choice-is/1')).toHaveValue('Answer 1');
    await expect(byId(page, '/type-choice-is-iv/1')).toHaveValue('Answer 1');
    await expect(byId(page, '/type-open-choice-is/1')).toHaveValue('1. With a label 1 - 1');
    await expect(byId(page, '/type-open-choice-is-iv/1')).toHaveValue('1. With a label 1 - 1');

    await expect(byId(page, 'item-/type-choice-m-2is/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Answer 1');
    await expect(byId(page, 'item-/type-choice-m-2is/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Answer 2');

    await expect(byId(page, 'item-/type-choice-m-2is-2iv/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Answer 1');
    await expect(byId(page, 'item-/type-choice-m-2is-2iv/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Answer 2');

    await expect(byId(page, 'item-/type-open-choice-m-2is/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Answer 1');
    await expect(byId(page, 'item-/type-open-choice-m-2is/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Answer 2');

    await expect(byId(page, 'item-/type-open-choice-m-2is-2iv/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Answer 1');
    await expect(byId(page, 'item-/type-open-choice-m-2is-2iv/1').locator('span.autocomp_selected li').nth(1)).toHaveText('×Answer 2');
  });

  test('should export the data set by answerOption.initialSelected', async ({ page }) => {
    // check lforms data
    const formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData.items.length).toBe(8);
    expect(formData.items[0].value).toEqual({ code: 'c1', text: 'Answer 1' });
    expect(formData.items[1].value).toEqual({ code: 'c1', text: 'Answer 1' });
    expect(formData.items[2].value).toEqual({ label: '1', score: 1, code: 'c01', text: 'With a label 1' });
    expect(formData.items[3].value).toEqual({ label: '1', score: 1, code: 'c01', text: 'With a label 1' });
    expect(formData.items[4].value).toEqual([{ code: 'c1', text: 'Answer 1' }, { code: 'c2', text: 'Answer 2' }]);
    expect(formData.items[5].value).toEqual([{ code: 'c1', text: 'Answer 1' }, { code: 'c2', text: 'Answer 2' },
      { code: 'c3', text: 'Answer 3' }, { code: 'c4', text: 'Answer 4' }]);
    expect(formData.items[6].value).toEqual([{ code: 'c1', text: 'Answer 1' }, { code: 'c2', text: 'Answer 2' }]);
    expect(formData.items[7].value).toEqual([{ code: 'c1', text: 'Answer 1' }, { code: 'c2', text: 'Answer 2' },
      { code: 'c3', text: 'Answer 3' }, 'User typed answer a']);

    // check exported FHIR data
    const resource = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
    expect(resource.resourceType).toBe('QuestionnaireResponse');
    expect(resource.item.length).toBe(8);
    expect(resource.item[0].answer).toEqual([{ valueCoding: { code: 'c1', display: 'Answer 1' } }]);
    expect(resource.item[1].answer).toEqual([{ valueCoding: { code: 'c1', display: 'Answer 1' } }]);
    expect(resource.item[2].answer).toEqual([{
      valueCoding: {
        code: 'c01', display: 'With a label 1', extension: [{
          url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
          valueDecimal: 1
        }]
      }
    }]);
    expect(resource.item[3].answer).toEqual([{
      valueCoding: {
        code: 'c01', display: 'With a label 1', extension: [{
          url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
          valueDecimal: 1
        }]
      }
    }]);
    expect(resource.item[4].answer).toEqual([
      { valueCoding: { code: 'c1', display: 'Answer 1' } },
      { valueCoding: { code: 'c2', display: 'Answer 2' } }
    ]);
    expect(resource.item[5].answer).toEqual([
      { valueCoding: { code: 'c1', display: 'Answer 1' } },
      { valueCoding: { code: 'c2', display: 'Answer 2' } },
      { valueCoding: { code: 'c3', display: 'Answer 3' } },
      { valueCoding: { code: 'c4', display: 'Answer 4' } }
    ]);
    expect(resource.item[6].answer).toEqual([
      { valueCoding: { code: 'c1', display: 'Answer 1' } },
      { valueCoding: { code: 'c2', display: 'Answer 2' } }
    ]);
    expect(resource.item[7].answer).toEqual([
      { valueCoding: { code: 'c1', display: 'Answer 1' } },
      { valueCoding: { code: 'c2', display: 'Answer 2' } },
      { valueCoding: { code: 'c3', display: 'Answer 3' } },
      { valueString: 'User typed answer a' }
    ]);
  });
});
