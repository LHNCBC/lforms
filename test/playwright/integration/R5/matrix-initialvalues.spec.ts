import { test, expect } from '@playwright/test';
import { byId, answerId, waitForLFormsReady, loadFromTestData } from '../../support/lforms-helpers';

test.describe('Matrix Initial values on Radio buttons (R5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
  });

  test('displays a radio matrix table with initial values displayed --coding', async ({ page }) => {
    const files = [
      'matrixLayout-initialvalue-coding-non-repeats.R5.json',
      'matrixLayout-initialvalue-coding-optionsOrString-non-repeats.R5.json'
    ];

    for (const file of files) {
      await loadFromTestData(page, file, 'R5');

      const item1answer2 = answerId('/g1m1/1/1', undefined, 'c2');
      const item2answer1 = answerId('/g1m2/1/1', undefined, 'c1');
      const item3answer3 = answerId('/g1m3/1/1', undefined, 'c3');

      await expect(byId(page, item1answer2)).toBeChecked();
      await expect(byId(page, item2answer1)).toBeChecked();
      await expect(byId(page, item3answer3)).toBeChecked();

      const qr = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R5')
      );
      expect(qr.item[0].item.length).toBe(3);
      expect(qr.item[0].item[0].answer[0].valueCoding.code).toBe('c2');
      expect(qr.item[0].item[0].answer[0].valueCoding.display).toBe('Answer b');
      expect(qr.item[0].item[0].linkId).toBe('/g1m1');
      expect(qr.item[0].item[1].answer[0].valueCoding.code).toBe('c1');
      expect(qr.item[0].item[1].answer[0].valueCoding.display).toBe('Answer a');
      expect(qr.item[0].item[1].linkId).toBe('/g1m2');
      expect(qr.item[0].item[2].answer[0].valueCoding.code).toBe('c3');
      expect(qr.item[0].item[2].answer[0].valueCoding.display).toBe('Answer c');
      expect(qr.item[0].item[2].linkId).toBe('/g1m3');
    }
  });

  test('displays a radio matrix table with initial values displayed --string', async ({ page }) => {
    const files = [
      'matrixLayout-initialvalue-string-non-repeats.R5.json',
      'matrixLayout-initialvalue-string-optionsOrString-non-repeats.R5.json'
    ];

    for (const file of files) {
      await loadFromTestData(page, file, 'R5');

      const item1answer2 = answerId('/g1m1/1/1', undefined, 'b');
      const item2answer1 = answerId('/g1m2/1/1', undefined, 'a');
      const item3answer3 = answerId('/g1m3/1/1', undefined, 'c');

      await expect(byId(page, item1answer2)).toBeChecked();
      await expect(byId(page, item2answer1)).toBeChecked();
      await expect(byId(page, item3answer3)).toBeChecked();

      const qr = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R5')
      );
      expect(qr.item[0].item.length).toBe(3);
      expect(qr.item[0].item[0].answer[0].valueString).toBe('b');
      expect(qr.item[0].item[0].linkId).toBe('/g1m1');
      expect(qr.item[0].item[1].answer[0].valueString).toBe('a');
      expect(qr.item[0].item[1].linkId).toBe('/g1m2');
      expect(qr.item[0].item[2].answer[0].valueString).toBe('c');
      expect(qr.item[0].item[2].linkId).toBe('/g1m3');
    }
  });
});
