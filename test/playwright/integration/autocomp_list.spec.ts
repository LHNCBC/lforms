import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';

test.describe('autocomp list', () => {
  const searchResults = '#lhc-tools-searchResults';

  test('should not be visible when the form loads', async ({ page }) => {
    await openFormByIndex(page, 1); // USSGFHTVertical
    await expect(page.locator(searchResults)).not.toBeVisible();
  });

  test('should be visible after the user clicks in a field', async ({ page }) => {
    await openFormByIndex(page, 1); // USSGFHTVertical
    // "Were you born a twin?" field
    await byId(page, '/54126-8/54132-6/1/1').click();
    await expect(page.locator(searchResults)).toBeVisible();
  });

  test('should work with multiple-select fields', async ({ page }) => {
    await openFormByIndex(page, 1); // USSGFHTVertical
    const raceField = byId(page, '/54126-8/54134-2/1/1');
    await expect(raceField).toBeVisible();
    const hasAutocomp = await raceField.evaluate(el => typeof (el as any).autocomp === 'object');
    expect(hasAutocomp).toBe(true);
  });

  test('should interoperate with score rules', async ({ page }) => {
    await openFormByIndex(page, 3); // GlasgowForm
    const eyeField = byId(page, '/9267-6/1');
    const scoreField = byId(page, '/9269-2/1');

    await eyeField.click();
    await expect(page.locator(searchResults)).toBeVisible();
    // Check pre-condition
    await expect(scoreField).toHaveValue('0');
    await page.locator('#lhc-tools-searchResults li:first-child').click();
    await expect(scoreField).toHaveValue('1');
    // Now try using keystrokes to select the third item.
    await eyeField.click();
    await pressCypressKeys(eyeField, '{downArrow}{downArrow}{downArrow}{enter}');
    await expect(eyeField).toHaveValue('3. Eye opening to verbal command - 3');
    await expect(scoreField).toHaveValue('3');

    // Try the 4th answer, which has a null label
    await eyeField.click();
    await pressCypressKeys(eyeField, '{downArrow}{downArrow}{downArrow}{downArrow}{enter}');
    await expect(eyeField).toHaveValue('4. Eyes open spontaneously - 4');
    await expect(scoreField).toHaveValue('4');
  });

  test('should receive default values set via defaultAnswer', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    await expect(byId(page, '/type9/1')).toHaveValue('Answer 2');
  });

  test('should set column headers when specified', async ({ page }) => {
    await openFormByIndex(page, 15); // HL7GeneticPanel
    // Open the "simple variation" section
    const kindOfMutations = byId(page, '/XXXXX-12/1');
    await kindOfMutations.click();
    await pressCypressKeys(kindOfMutations, '{downArrow}{enter}');

    // Bring up the variant ID search results list
    const variantID = byId(page, '/XXXXX-9/XXXXX-5/1/1');
    await variantID.click();
    await variantID.pressSequentially('ar');

    // Confirm that the header row appears over the search results
    await expect(page.locator(searchResults)).toBeVisible();
    // This test also checks the escaping of HTML tags
    await expect(page.locator(searchResults)).toContainText('Variant ID <a>');
  });

  test('should not autofill lists when there is just one answer', async ({ page }) => {
    await openFormByIndex(page, 9); // RxTerms
    const drugName = byId(page, '/X-002/nameAndRoute/1/1');
    await drugName.pressSequentially('AZELEX');
    await page.locator('#lhc-tools-searchResults').waitFor({ state: 'visible' });
    await page.locator('#lhc-tools-searchResults tr:first-child').click();
    await expect(byId(page, '/X-002/strengthAndForm/1/1')).toHaveValue('');
  });

  const testFiles = {
    'rxterms.R4.with-autofill-calexp.json': 'should autofill lists when there is just one answer, on the item that has a calculationExpression (to autofill) listed before an answerExpression',
    'rxterms.R4.with-autofill-calexp2.json': 'should autofill lists when there is just one answer, on the item that has an answerExpressn listed before a calculationExpression (to autofill)'
  };

  for (const [qFile, testName] of Object.entries(testFiles)) {
    test(testName, async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'rxtermsAnswerExpTests/' + qFile, 'R4');

      // autofill when the strength has one item in the list
      const medication = byId(page, 'medication/1/1');
      await medication.pressSequentially('AZELEX');
      await page.locator('#lhc-tools-searchResults').waitFor({ state: 'visible' });
      await page.locator('#lhc-tools-searchResults li:first-child').click();
      await expect(byId(page, 'strength/1/1')).toHaveValue('20% Cream');
      await expect(byId(page, 'rxcui/1/1')).toHaveValue('1043753');

      await medication.fill('');
      await medication.pressSequentially('Factor X');
      await page.locator('#lhc-tools-searchResults').waitFor({ state: 'visible' });
      await page.locator('#lhc-tools-searchResults li:first-child').click();
      await expect(byId(page, 'strength/1/1')).toHaveValue('1 unt Injection');
      await expect(byId(page, 'rxcui/1/1')).toHaveValue('1719235');

      // no autofill when the strength has more than one item in the list
      await medication.fill('');
      await medication.pressSequentially('GAS-X');
      await page.locator('#lhc-tools-searchResults').waitFor({ state: 'visible' });
      await page.locator('#lhc-tools-searchResults li:first-child').click();
      await expect(byId(page, 'strength/1/1')).toHaveValue('');
      await expect(byId(page, 'rxcui/1/1')).toHaveValue('');

      await byId(page, 'strength/1/1').click();
      await page.locator('#lhc-tools-searchResults li:first-child').click();
      await expect(byId(page, 'strength/1/1')).toHaveValue('80 mg Tab');
      await expect(byId(page, 'rxcui/1/1')).toHaveValue('210273');

      // still works: autofill when the strength has one item in the list
      await medication.fill('');
      await medication.pressSequentially('Factor X');
      await page.locator('#lhc-tools-searchResults').waitFor({ state: 'visible' });
      await page.locator('#lhc-tools-searchResults li:first-child').click();
      await expect(byId(page, 'strength/1/1')).toHaveValue('1 unt Injection');
      await expect(byId(page, 'rxcui/1/1')).toHaveValue('1719235');
    });
  }

  test('should not display SeqNum on answers that one of them has a numeric value', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm

    // no sequence number
    await byId(page, '/numeric_answer/1').click();
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:first-child')).toHaveText('1');
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:nth-child(2)')).toHaveText('Answer 2');
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:nth-child(3)')).toHaveText('Answer 3');

    // has sequence number
    await byId(page, '/type9/1').click();
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:first-child .listNum')).toBeVisible();
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:first-child .listNum')).toHaveText('1:');
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:nth-child(2) .listNum')).toBeVisible();
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:nth-child(2) .listNum')).toHaveText('2:');
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:nth-child(3) .listNum')).toBeVisible();
    await expect(page.locator('#lhc-tools-searchResults #completionOptions ul li:nth-child(3) .listNum')).toHaveText('3:');
  });
});
