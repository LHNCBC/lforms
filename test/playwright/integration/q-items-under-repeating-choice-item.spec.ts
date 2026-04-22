import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId } from '../support/lforms-helpers';
import * as fs from 'fs';
// R4B is same as R4 for Questionnaire and QuestionnaireResponse.
// No need to test R4B in this test file.
const fhirVersions = ['R4', 'R5', 'STU3'];

for (const fhirVersion of fhirVersions) {
  test.describe(`Repeating choice/coding item with child items - ${fhirVersion}`, () => {
    test('should get the correct QuestionnaireResponse', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-items-under-repeating-choice-item.json', 'formContainer', { fhirVersion });

      // a set of items under a choice/coding item
      await byId(page, '/choice/1').click();
      await byId(page, '/choice/1').press('ArrowDown');
      await byId(page, '/choice/1').press('Enter');
      await byId(page, '/choice/st/1/1').click();
      await byId(page, '/choice/st/1/1').fill('a');
      await byId(page, '/choice/int/1/1').click();
      await byId(page, '/choice/int/1/1').fill('1');
      await byId(page, 'add-/choice/int/1/1').click();
      await byId(page, '/choice/int/1/2').click();
      await byId(page, '/choice/int/1/2').fill('2');

      await byId(page, '/choice/group/st/1/1/1').click();
      await byId(page, '/choice/group/st/1/1/1').fill('b');
      await byId(page, '/choice/group/int/1/1/1').click();
      await byId(page, '/choice/group/int/1/1/1').fill('3');
      await byId(page, 'add-/choice/group/int/1/1/1').click();
      await byId(page, '/choice/group/int/1/1/2').click();
      await byId(page, '/choice/group/int/1/1/2').fill('4');

      // same set of item under another layer of choice/coding item
      await byId(page, '/choice/choice/1/1').click();
      await byId(page, '/choice/choice/1/1').press('ArrowDown');
      await byId(page, '/choice/choice/1/1').press('ArrowDown');
      await byId(page, '/choice/choice/1/1').press('Enter');
      await byId(page, '/choice/choice/st/1/1/1').click();
      await byId(page, '/choice/choice/st/1/1/1').fill('c');
      await byId(page, '/choice/choice/int/1/1/1').click();
      await byId(page, '/choice/choice/int/1/1/1').fill('5');
      await byId(page, 'add-/choice/choice/int/1/1/1').click();
      await byId(page, '/choice/choice/int/1/1/2').click();
      await byId(page, '/choice/choice/int/1/1/2').fill('6');

      await byId(page, 'add-/choice/choice/1/1').click();
      await byId(page, '/choice/choice/1/2').click();
      await byId(page, '/choice/choice/1/2').press('ArrowDown');
      await byId(page, '/choice/choice/1/2').press('ArrowDown');
      await byId(page, '/choice/choice/1/2').press('ArrowDown');
      await byId(page, '/choice/choice/1/2').press('Enter');
      await byId(page, '/choice/choice/st/1/2/1').click();
      await byId(page, '/choice/choice/st/1/2/1').fill('d');
      await byId(page, '/choice/choice/int/1/2/1').click();
      await byId(page, '/choice/choice/int/1/2/1').fill('7');
      await byId(page, 'add-/choice/choice/int/1/2/1').click();
      await byId(page, '/choice/choice/int/1/2/2').click();
      await byId(page, '/choice/choice/int/1/2/2').fill('8');

      // add another instance of the parent choice/coding item
      await byId(page, 'add-/choice/1').click();
      await byId(page, '/choice/2').click();
      await byId(page, '/choice/2').press('ArrowDown');
      await byId(page, '/choice/2').press('ArrowDown');
      await byId(page, '/choice/2').press('Enter');
      await byId(page, '/choice/st/2/1').click();
      await byId(page, '/choice/st/2/1').fill('aa');
      await byId(page, '/choice/int/2/1').click();
      await byId(page, '/choice/int/2/1').fill('11');
      await byId(page, 'add-/choice/int/2/1').click();
      await byId(page, '/choice/int/2/2').click();
      await byId(page, '/choice/int/2/2').fill('22');

      await byId(page, '/choice/group/st/2/1/1').click();
      await byId(page, '/choice/group/st/2/1/1').fill('bb');
      await byId(page, '/choice/group/int/2/1/1').click();
      await byId(page, '/choice/group/int/2/1/1').fill('33');
      await byId(page, 'add-/choice/group/int/2/1/1').click();
      await byId(page, '/choice/group/int/2/1/2').click();
      await byId(page, '/choice/group/int/2/1/2').fill('44');

      await byId(page, '/choice/choice/2/1').click();
      await byId(page, '/choice/choice/2/1').press('ArrowDown');
      await byId(page, '/choice/choice/2/1').press('ArrowDown');
      await byId(page, '/choice/choice/2/1').press('Enter');
      await byId(page, '/choice/choice/st/2/1/1').click();
      await byId(page, '/choice/choice/st/2/1/1').fill('cc');
      await byId(page, '/choice/choice/int/2/1/1').click();
      await byId(page, '/choice/choice/int/2/1/1').fill('55');
      await byId(page, 'add-/choice/choice/int/2/1/1').click();
      await byId(page, '/choice/choice/int/2/1/2').click();
      await byId(page, '/choice/choice/int/2/1/2').fill('66');

      await byId(page, 'add-/choice/choice/2/1').click();
      await byId(page, '/choice/choice/2/2').click();
      await byId(page, '/choice/choice/2/2').press('ArrowDown');
      await byId(page, '/choice/choice/2/2').press('ArrowDown');
      await byId(page, '/choice/choice/2/2').press('ArrowDown');
      await byId(page, '/choice/choice/2/2').press('Enter');
      await byId(page, '/choice/choice/st/2/2/1').click();
      await byId(page, '/choice/choice/st/2/2/1').fill('dd');
      await byId(page, '/choice/choice/int/2/2/1').click();
      await byId(page, '/choice/choice/int/2/2/1').fill('77');
      await byId(page, 'add-/choice/choice/int/2/2/1').click();
      await byId(page, '/choice/choice/int/2/2/2').click();
      await byId(page, '/choice/choice/int/2/2/2').fill('88');

      const fhirQR = await page.evaluate((fv) =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', fv), fhirVersion);

      const fhirVersionInFile = fhirVersion === 'R4B' ? 'R4' : fhirVersion;
      const qrFile = `test/data/${fhirVersionInFile}/qr-items-under-repeating-choice-item.json`;
      const expectedQR = JSON.parse(fs.readFileSync(qrFile, 'utf-8'));
      delete expectedQR.meta;
      delete expectedQR.authored;
      delete fhirQR.meta;
      delete fhirQR.authored;
      expect(fhirQR).toEqual(expectedQR);
    });
  });
}
