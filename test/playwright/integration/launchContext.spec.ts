import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady } from '../support/lforms-helpers';

// Tests of the support for launchContext.
test.describe('launchContext', () => {
  test('should support off-list "name" values', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);

    await page.evaluate(() => {
      (window as any).LForms.Util.setFHIRContext(null, {
        myCustomVar: { resourceType: 'Basic', identifier: 'testCase1' },
        varNameFromValueId: { resourceType: 'Basic', identifier: 'testCase2' }
      });
    });

    await addFormToPage(page, 'launchContext.json', 'formContainer', { fhirVersion: 'R4' });
    await expect(page.locator('#q1\\/1')).toHaveValue('testCase1');
    await expect(page.locator('#q2\\/1')).toHaveValue('testCase2');
  });
});
