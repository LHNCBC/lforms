import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady } from '../support/lforms-helpers';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

test.describe('Attachment support', () => {
  async function removeFirstAttachment(page: any) {
    await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
    await page.locator('.lf-remove-attachment').click();
    await expect(page.locator('#file-upload\\/1')).toHaveAttribute('type', 'file');
  }

  test.describe('main tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'attachmentQ.json', 'formContainer', {});
    });

    test('should show file inputs in both vertical and horizontal layouts', async ({ page }) => {
      await expect(page.locator('#file-upload\\/1')).toHaveAttribute('type', 'file');
      await expect(page.locator('#file-upload-in-table\\/1\\/1')).toHaveAttribute('type', 'file');
    });

    test('should allow attachment of file data without a URL', async ({ page }) => {
      // Note that the test file we are attaching below is the same the file
      // containing the Questionnaire definition for the form (just for
      // convenience).
      await page.locator('#file-upload\\/1').setInputFiles('test/data/lforms/attachmentQ.json');
      await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
      await expect(page.locator('a')).toHaveText('attachmentQ.json');
      const answer = await page.evaluate(() => {
        const qr = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        return qr.item[0].answer[0].valueAttachment;
      });
      expect(answer.title).toBe('attachmentQ.json');
      expect(typeof answer.data).toBe('string');
      expect(typeof answer.creation).toBe('string');
      expect(answer.contentType).toBe('application/json');
    });

    test('should allow removal of an attachment', async ({ page }) => {
      await page.locator('#file-upload\\/1').setInputFiles('test/data/lforms/attachmentQ.json');
      await removeFirstAttachment(page);
    });

    test('should not respond to presses of "enter" in unrelated fields', async ({ page }) => {
      // This is a test for the fix for
      // https://github.com/lhncbc/lforms/issues/71
      await page.locator('#upload-desc\\/1\\/1').press('Enter');
      await expect(page.locator('.lhc-attachment-url')).not.toBeAttached();
    });

    test('should not allow files over maxSize size', async ({ page }) => {
      // Create a temporary test file
      let testData = '';
      for (let i = 0; i < 5002; i++) testData += 'z';
      const tempFile = path.join(os.tmpdir(), 'test.txt');
      fs.writeFileSync(tempFile, testData);
      let dialogMessage = '';
      page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await page.locator('#file-upload\\/1').setInputFiles(tempFile);
      expect(dialogMessage).toContain('size');
      await expect(page.locator('#file-upload\\/1')).toHaveValue('');
      fs.unlinkSync(tempFile);
    });

    test('should only allow permitted mime types', async ({ page }) => {
      // The questionnaire is configured to only allow .json & .txt
      let testData = 'zz';
      const tempZip = path.join(os.tmpdir(), 'test.zip');
      fs.writeFileSync(tempZip, testData);
      let dialogMessage = '';
      page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await page.locator('#file-upload\\/1').setInputFiles(tempZip);
      expect(dialogMessage).toContain('type');
      // The file input should still be there and be blank.
      await expect(page.locator('#file-upload\\/1')).toHaveValue('');
      fs.unlinkSync(tempZip);

      // Also try a blank mime type
      const tempBlank = path.join(os.tmpdir(), 'test');
      fs.writeFileSync(tempBlank, testData);
      let dialogMessage2 = '';
      page.once('dialog', async dialog => {
        dialogMessage2 = dialog.message();
        await dialog.accept();
      });
      await page.locator('#file-upload\\/1').setInputFiles(tempBlank);
      expect(dialogMessage2).toContain('type');
      // The file input should still be there and be blank.
      await expect(page.locator('#file-upload\\/1')).toHaveValue('');
      fs.unlinkSync(tempBlank);
    });

    test('should allow attachment of a URL without file data and without name', async ({ page }) => {
      await page.locator('.toggle-attachment-fields').first().click();
      const inputs = page.locator('input[type=text]');
      await expect(inputs).toHaveCount(3);
      await inputs.nth(0).fill('http://one');
      await page.locator('.attach-button').click();
      // Confirm the fields are replaced by a link
      await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
      await expect(page.locator('a')).toHaveText('http://one');
      await expect(page.locator('a')).toHaveAttribute('href', 'http://one');
      const answer = await page.evaluate(() => {
        const qr = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        return qr.item[0].answer[0].valueAttachment;
      });
      expect(answer.title).toBeUndefined();
      expect(answer.data).toBeUndefined();
      expect(answer.url).toBe('http://one');
      expect(answer.creation).toBeUndefined();
      expect(answer.contentType).toBeUndefined();
      await removeFirstAttachment(page);
    });

    test('should allow attachment of a URL without file data', async ({ page }) => {
      await page.locator('.toggle-attachment-fields').first().click();
      const inputs = page.locator('input[type=text]');
      await inputs.nth(0).fill('http://one');
      await inputs.nth(1).fill('two');
      await page.locator('.attach-button').click();
      // Confirm the fields are replaced by a link
      await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
      await expect(page.locator('a')).toHaveText('two');
      await expect(page.locator('a')).toHaveAttribute('href', 'http://one');
      const answer = await page.evaluate(() => {
        const qr = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        return qr.item[0].answer[0].valueAttachment;
      });
      expect(answer.title).toBe('two');
      expect(answer.data).toBeUndefined();
      expect(answer.url).toBe('http://one');
      expect(answer.creation).toBeUndefined();
      expect(answer.contentType).toBeUndefined();
    });

    test('should allow a second attachment, with both a URL and file data', async ({ page }) => {
      // First attach a URL
      await page.locator('.toggle-attachment-fields').first().click();
      const inputs = page.locator('input[type=text]');
      await inputs.nth(0).fill('http://one');
      await inputs.nth(1).fill('two');
      await page.locator('.attach-button').click();
      await expect(page.locator('a')).toHaveText('two');

      // Add another
      await page.locator('#add-upload\\/1').click();
      await expect(page.locator('.lhc-attachment-button').first()).toBeVisible();
      await page.locator('.toggle-attachment-fields').first().click();
      const inputs2 = page.locator('input[type=text]');
      await inputs2.nth(0).fill('http://three');
      await inputs2.nth(1).fill('four');
      await page.locator('#file-upload\\/2').setInputFiles('test/data/lforms/attachmentQ.json');
      await page.locator('.attach-button').click();
      // Confirm the fields are replaced by a link
      await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
      await expect(page.locator('a')).toHaveCount(2);
      await expect(page.locator('a').nth(1)).toHaveText('four');
      const answer = await page.evaluate(() => {
        const qr = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        return qr.item[0].answer[1].valueAttachment;
      });
      expect(answer.title).toBe('four');
      expect(typeof answer.data).toBe('string');
      expect(answer.url).toBe('http://three');
      expect(typeof answer.creation).toBe('string');
      expect(answer.contentType).toBe('application/json');
    });

    test('should support an attachment in a saved QuestionnaireResponse', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'attachmentQ.json', 'formContainer', {});
      await page.locator('#file-upload\\/1').setInputFiles('test/data/lforms/attachmentQ.json');
      await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
      await expect(page.locator('a')).toHaveText('attachmentQ.json');

      const { lfData } = await page.evaluate(() => {
        const win = window as any;
        const q = JSON.parse(JSON.stringify(win.LForms.Util.convertFHIRQuestionnaireToLForms(
          // Use the form definition from the page
          win.LForms.Util.getFormFHIRData('Questionnaire', 'R4'), 'R4')));
        const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        const lfData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, q, 'R4');
        return { lfData };
      });
      // Open another page where we can use addFormToPage
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await page.evaluate(async ({ lfData }) => {
        await (window as any).LForms.Util.addFormToPage(lfData, 'formContainer2');
      }, { lfData });
      await expect(page.locator('a')).toHaveText('attachmentQ.json');
      const answer = await page.evaluate(() => {
        const qr2 = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4',
          document.getElementById('formContainer2'));
        return qr2.item[0].answer[0].valueAttachment;
      });
      expect(answer.title).toBe('attachmentQ.json');
      expect(typeof answer.data).toBe('string');
      expect(typeof answer.creation).toBe('string');
      expect(answer.contentType).toBe('application/json');
    });

    test('should allow extraction of the attachment item into an Observation', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'attachmentQ.json', 'formContainer', {});
      // Use the current page to get a QR
      await page.locator('#file-upload\\/1').setInputFiles('test/data/lforms/attachmentQ.json');
      await expect(page.locator('#file-upload\\/1')).not.toBeAttached();
      await expect(page.locator('a')).toHaveText('attachmentQ.json');
      const fhirData = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, { extract: true })
      );
      expect(Array.isArray(fhirData)).toBe(true);
      expect(fhirData.length).toBe(2);
      const answer = fhirData[0].item[0].answer[0].valueAttachment;
      expect(answer.title).toBe('attachmentQ.json');
      expect(typeof answer.data).toBe('string');
      expect(typeof answer.creation).toBe('string');
      expect(answer.contentType).toBe('application/json');
      const obsAnswer = fhirData[1].entry[0].resource.valueAttachment;
      expect(obsAnswer.title).toBe('attachmentQ.json');
      expect(typeof obsAnswer.data).toBe('string');
      expect(typeof obsAnswer.creation).toBe('string');
      expect(obsAnswer.contentType).toBe('application/json');
    });
  });
});
