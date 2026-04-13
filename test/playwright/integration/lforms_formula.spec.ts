import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';

test.describe('formula', () => {
  test('Two BMI formulas should both work', async ({ page }) => {
    await openFormByIndex(page, 1); // USSGFHTVertical

    // check bmi1
    const height1 = byId(page, '/54126-8/8302-2/1/1');
    const bmi1 = byId(page, '/54126-8/39156-5/1/1');
    await height1.pressSequentially('70');
    await expect(bmi1).toHaveValue('');
    await byId(page, '/54126-8/29463-7/1/1').pressSequentially('170');
    await expect(bmi1).toHaveValue('24.39');
    await height1.clear();
    await height1.pressSequentially('80');
    await expect(bmi1).toHaveValue('18.68');

    // change height unit and check bmi1 again
    const heightUnit = byId(page, 'unit_/54126-8/8302-2/1/1');
    await heightUnit.click();
    // pick the 2nd item, centimeters
    await pressCypressKeys(heightUnit, '{downArrow}{downArrow}');
    await heightUnit.blur();
    await height1.clear();
    await height1.pressSequentially('170');
    await expect(bmi1).toHaveValue('26.68');

    // change weight unit and check bmi1 again
    const weightUnit = byId(page, 'unit_/54126-8/29463-7/1/1');
    await weightUnit.click();
    // pick the 2nd item, kgs
    await pressCypressKeys(weightUnit, '{downArrow}{downArrow}');
    await weightUnit.blur();
    await byId(page, '/54126-8/29463-7/1/1').clear();
    await byId(page, '/54126-8/29463-7/1/1').pressSequentially('80');
    await expect(bmi1).toHaveValue('27.68');

    // check bmi2
    const height2 = byId(page, '/54114-4/54117-7/8302-2/1/1/1');
    const bmi2 = byId(page, '/54114-4/54117-7/39156-5/1/1/1');
    await height2.pressSequentially('70');
    await expect(bmi2).toHaveValue('');
    await byId(page, '/54114-4/54117-7/29463-7/1/1/1').pressSequentially('170');
    await expect(bmi2).toHaveValue('24.39');
    await height2.clear();
    await height2.pressSequentially('80');
    await expect(bmi2).toHaveValue('18.68');
  });

  test('should work with calculation method having skip logic disabled sources', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'skip-logic-calculation-method.json');

    const sklSource = 'SKL-CONTROL/1';
    const sklTarget = 'A-ITEM/1';
    const noSklItem = 'B-ITEM/1';
    const totalScore = 'TS/1';

    await expect(byId(page, sklSource)).toBeVisible();
    await expect(byId(page, sklSource)).toHaveValue('');
    await expect(byId(page, sklTarget)).not.toBeAttached();
    await expect(byId(page, noSklItem)).toBeVisible();
    await expect(byId(page, noSklItem)).toHaveValue('');
    await expect(byId(page, totalScore)).toBeVisible();
    await expect(byId(page, totalScore)).toHaveValue('0');

    await byId(page, noSklItem).click();
    await pressCypressKeys(byId(page, noSklItem), '{downArrow}{downArrow}{enter}');
    await expect(byId(page, noSklItem)).toHaveValue('1. B2 - 10');
    await expect(byId(page, totalScore)).toHaveValue('10');

    await byId(page, sklSource).click();
    await pressCypressKeys(byId(page, sklSource), '{downArrow}{downArrow}{enter}');
    await expect(byId(page, sklTarget)).toBeVisible();
    await expect(byId(page, totalScore)).toHaveValue('10');

    await pressCypressKeys(byId(page, sklTarget), '{downArrow}{downArrow}{downArrow}{enter}');
    await expect(byId(page, sklTarget)).toHaveValue('2. A3 - 20');
    await expect(byId(page, totalScore)).toHaveValue('30');

    // Hide skip logic target, total score should change to 10
    await pressCypressKeys(byId(page, sklSource), '{downArrow}{enter}');
    await expect(byId(page, sklTarget)).not.toBeAttached();
    await expect(byId(page, totalScore)).toHaveValue('10');

    // Show skip logic target, total score should change back to 30
    await byId(page, sklSource).click();
    await pressCypressKeys(byId(page, sklSource), '{downArrow}{downArrow}{enter}');
    await expect(byId(page, sklTarget)).toBeVisible();
    await expect(byId(page, sklTarget)).toHaveValue('2. A3 - 20');
    await expect(byId(page, totalScore)).toHaveValue('30');
  });
});
