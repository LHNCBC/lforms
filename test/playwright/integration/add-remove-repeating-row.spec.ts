import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData, addFormToPage } from '../support/lforms-helpers';

test.describe('on repeating items', () => {
  const addButtonId = 'add-/54114-4/54117-7/1/1';
  const diseaseId1 = '/54114-4/54117-7/54116-9/1/1/1';
  const diseaseId2 = '/54114-4/54117-7/54116-9/1/2/1';
  const diseaseId3 = '/54114-4/54117-7/54116-9/1/3/1';
  const diseaseId4 = '/54114-4/54117-7/54116-9/1/4/1';
  const deleteButtonId1 = 'del-/54114-4/54117-7/1/1';
  const deleteButtonId2 = 'del-/54114-4/54117-7/1/2';
  const deleteButtonId3 = 'del-/54114-4/54117-7/1/3';
  const deleteButtonId4 = 'del-/54114-4/54117-7/1/4';

  test('should add and delete rows correctly', async ({ page }) => {
    await openFormByIndex(page, 2); // USSGFHTHorizontal

    // select a value in the disease field on the 1st row
    await byId(page, diseaseId1).click();
    await pressCypressKeys(byId(page, diseaseId1), '{downArrow}{enter}');
    await expect(byId(page, diseaseId1)).toHaveValue('Blood Clots');
    // add one row
    await byId(page, addButtonId).click();
    await expect(byId(page, diseaseId1)).toHaveValue('Blood Clots');
    await expect(byId(page, diseaseId2)).toBeVisible();
    await expect(byId(page, deleteButtonId1)).toBeVisible();
    await expect(byId(page, deleteButtonId2)).toBeVisible();
    await expect(byId(page, diseaseId2)).toHaveValue('');
    // select a value in the disease field on the 2nd row
    await byId(page, diseaseId2).click();
    await pressCypressKeys(byId(page, diseaseId2), '{downArrow}{downArrow}{enter}');
    await expect(byId(page, diseaseId2)).toHaveValue('-- Blood Clot in Leg');
    // add one row
    await byId(page, addButtonId).click();
    await expect(byId(page, diseaseId1)).toHaveValue('Blood Clots');
    await expect(byId(page, diseaseId2)).toHaveValue('-- Blood Clot in Leg');
    await expect(byId(page, diseaseId3)).toBeVisible();
    await expect(byId(page, deleteButtonId1)).toBeVisible();
    await expect(byId(page, deleteButtonId2)).toBeVisible();
    await expect(byId(page, deleteButtonId3)).toBeVisible();
    await expect(byId(page, diseaseId3)).toHaveValue('');
    // select a value in the disease field on the 3rd row
    await byId(page, diseaseId3).click();
    await pressCypressKeys(byId(page, diseaseId3), '{downArrow}{downArrow}{downArrow}{enter}');
    await expect(byId(page, diseaseId3)).toHaveValue('-- Blood Clot in Lungs');

    // delete a row at its position
    await byId(page, deleteButtonId2).click();
    await expect(byId(page, diseaseId1)).toHaveValue('Blood Clots');
    await expect(byId(page, diseaseId2)).not.toBeAttached();
    await expect(byId(page, diseaseId3)).toHaveValue('-- Blood Clot in Lungs');
    await expect(byId(page, deleteButtonId1)).toBeVisible();
    await expect(byId(page, deleteButtonId2)).not.toBeAttached();
    await expect(byId(page, deleteButtonId3)).toBeVisible();

    // add a new row at the end of the table after some rows are deleted
    await byId(page, addButtonId).click();
    await expect(byId(page, diseaseId1)).toHaveValue('Blood Clots');
    await expect(byId(page, diseaseId2)).not.toBeAttached();
    await expect(byId(page, diseaseId3)).toHaveValue('-- Blood Clot in Lungs');
    await expect(byId(page, diseaseId4)).toBeVisible();
    await expect(byId(page, diseaseId4)).toHaveValue('');
    await expect(byId(page, deleteButtonId1)).toBeVisible();
    await expect(byId(page, deleteButtonId2)).not.toBeAttached();
    await expect(byId(page, deleteButtonId3)).toBeVisible();
    await expect(byId(page, deleteButtonId4)).toBeVisible();
    // select a value in the disease field on the 4th row (the displayed 3rd row)
    await byId(page, diseaseId4).click();
    await pressCypressKeys(byId(page, diseaseId4), '{downArrow}{downArrow}{downArrow}{downArrow}{enter}');
    await expect(byId(page, diseaseId4)).toHaveValue('Cancer');

    // delete a row at its position after some rows are deleted and some are added
    await byId(page, deleteButtonId3).click();
    await expect(byId(page, diseaseId1)).toHaveValue('Blood Clots');
    await expect(byId(page, diseaseId2)).not.toBeAttached();
    await expect(byId(page, diseaseId3)).not.toBeAttached();
    await expect(byId(page, diseaseId4)).toHaveValue('Cancer');
    await expect(byId(page, deleteButtonId1)).toBeVisible();
    await expect(byId(page, deleteButtonId2)).not.toBeAttached();
    await expect(byId(page, deleteButtonId3)).not.toBeAttached();
    await expect(byId(page, deleteButtonId4)).toBeVisible();
  });
});

test.describe('repeating group with answerValueSet items', () => {
  test('should render radio button layout properly after adding a repeating group', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'repeating-group-that-contain-an-item-with-answerValueSet.R4.json', 'R4');
    // The form has a question with 7 radio button options.
    await expect(page.locator('.ant-radio-input')).toHaveCount(7);
    await page.locator('.ant-radio-input').first().click();
    // Add a repeating group.
    await page.getByText('+ repeating group').click();
    // The 7 radio button inputs in the repeating group should be rendered.
    await expect(page.locator('.ant-radio-input')).toHaveCount(14);
  });

  test('should render radio button layout properly after adding a nested repeating group', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'nested-repeating-groups-that-contain-an-item-with-answerValueSet.R4.json', 'R4');
    // The form has a question with 7 radio button options.
    await expect(page.locator('.ant-radio-input')).toHaveCount(7);
    await page.locator('[id="9744363809788/1"]').pressSequentially('some text');
    // Add a repeating group.
    await page.getByText('+ Outer group').click();
    // The 7 radio button inputs in the repeating group should be rendered.
    await expect(page.locator('.ant-radio-input')).toHaveCount(14);
  });
});

test.describe('repeating group with tooltip to show on empty items', () => {
  test('should display tooltips correctly when adding a repeating group', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'test-tooltip-on-repeat-item.json', 'R4');

    const allergy1 = '/allergies/allergy_name/1/1';
    const allergy2 = '/allergies/allergy_name/2/1';
    const allergy3 = '/allergies/allergy_name/3/1';
    const addButton = 'add-/allergies/1';
    const addTooltip = 'add-content-/allergies/1';

    await byId(page, allergy1).click();
    await pressCypressKeys(byId(page, allergy1), '{downArrow}{enter}');
    await expect(byId(page, allergy1)).toHaveValue('Chocolate');
    await byId(page, addButton).click();
    await expect(byId(page, allergy2)).toBeVisible();
    await expect(byId(page, addTooltip)).not.toBeAttached();
    await byId(page, addButton).click();
    await expect(byId(page, addTooltip)).toBeVisible();
    await expect(byId(page, addTooltip)).toContainText('Please enter info in the blank ');
    await byId(page, allergy2).click();
    await pressCypressKeys(byId(page, allergy2), '{downArrow}{downArrow}{enter}');
    await expect(byId(page, allergy2)).toHaveValue('Crab');
    await byId(page, addButton).click();
    await expect(byId(page, allergy3)).toBeVisible();
    await expect(byId(page, addTooltip)).not.toBeAttached();
  });
});

test.describe('multiple initial values on repeating question', () => {
  test('should render multiple questions, each with a single initial value - R4', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-multiple-initial-values-and-child-items.json', 'formContainer', { fhirVersion: 'R4' });
    // Should render two questions, each with a single default answer.
    await expect(byId(page, 'parent-decimal/1')).toHaveValue('10.5');
    await expect(byId(page, 'parent-decimal/2')).toHaveValue('2');
  });

  test('should render multiple questions, each with a single initial value - R5', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'q-with-multiple-initial-values-on-repeating-question.json', 'formContainer', { fhirVersion: 'R5' });
    await expect(byId(page, 'child-decimal/1/1')).toHaveValue('10.5');
    await expect(byId(page, 'child-decimal/1/2')).toHaveValue('2');
    // Adding a repeating question should not affect the initial values on the exported Questionnaire.
    await byId(page, 'add-child-decimal/1/2').click();
    await byId(page, 'child-decimal/1/3').pressSequentially('888');

    const q = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
    expect(q.item[0].item[0].initial).toEqual([
      { valueDecimal: 10.5 },
      { valueDecimal: 2 }
    ]);

    // Deleting the first repeating question should not affect the initial values.
    await byId(page, 'del-child-decimal/1/1').click();
    const q2 = await page.evaluate(() => (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
    expect(q2.item[0].item[0].initial).toEqual([
      { valueDecimal: 10.5 },
      { valueDecimal: 2 }
    ]);
  });
});
