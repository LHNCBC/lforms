import { test, expect } from '@playwright/test';
import { byId, addFormToPage, answerId, pressCypressKeys, waitForLFormsReady } from '../../support/lforms-helpers';

// Tests of the support for answerExpression on choice, open-choice, and
// string, date, time and integer
test.describe('EnableWhen on different types', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'enableWhen-test.R4.json', 'formContainer', { fhirVersion: 'R4' });
  });

  test('should work on boolean items', async ({ page }) => {
    await expect(byId(page, answerId('Q1/1/1', 'true')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'false')).locator('input')).not.toBeChecked();
    await expect(byId(page, answerId('Q1/1/1', 'null')).locator('input')).toBeChecked();

    const q1NotExists = byId(page, 'Q1-not-exists/1/1');
    const q1NotTrue = byId(page, 'Q1-not-true/1/1');
    const q1Exists = byId(page, 'Q1-exists/1/1');
    const q1True = byId(page, 'Q1-true/1/1');
    const q1False = byId(page, 'Q1-false/1/1');

    await expect(q1NotExists).toBeVisible();
    await expect(q1NotTrue).toBeVisible();
    await expect(q1Exists).not.toBeAttached();
    await expect(q1True).not.toBeAttached();
    await expect(q1False).not.toBeAttached();

    await byId(page, answerId('Q1/1/1', 'true')).locator('input').click();
    await expect(q1NotExists).not.toBeAttached();
    await expect(q1NotTrue).not.toBeAttached();
    await expect(q1Exists).toBeVisible();
    await expect(q1True).toBeVisible();
    await expect(q1False).not.toBeAttached();

    await byId(page, answerId('Q1/1/1', 'false')).locator('input').click();
    await expect(q1NotExists).not.toBeAttached();
    await expect(q1NotTrue).toBeVisible();
    await expect(q1Exists).toBeVisible();
    await expect(q1True).not.toBeAttached();
    await expect(q1False).toBeVisible();
  });

  test('should work on string as answerOption items', async ({ page }) => {

    const q9aNotExists = byId(page, 'Q9a-not-exists/1/1');
    const q9aExists = byId(page, 'Q9a-exists/1/1');
    const q9aNotEqB = byId(page, 'Q9a-noteq-B/1/1');
    const q9aEqB = byId(page, 'Q9a-eq-B/1/1');

    await expect(q9aNotExists).toBeVisible();
    await expect(q9aExists).not.toBeAttached();
    await expect(q9aNotEqB).toBeVisible();
    await expect(q9aEqB).not.toBeAttached();

    const q9a = byId(page, 'Q9a/1/1');
    await q9a.click();
    await pressCypressKeys(q9a, '{downArrow}{enter}');
    await expect(q9a).toHaveValue('A');
    await expect(q9aNotExists).not.toBeAttached();
    await expect(q9aExists).toBeVisible();
    await expect(q9aNotEqB).toBeVisible();
    await expect(q9aEqB).not.toBeAttached();

    await q9a.click();
    await pressCypressKeys(q9a, '{downArrow}{downArrow}{enter}');
    await expect(q9a).toHaveValue('B');
    await expect(q9aNotExists).not.toBeAttached();
    await expect(q9aExists).toBeVisible();
    await expect(q9aNotEqB).not.toBeAttached();
    await expect(q9aEqB).toBeVisible();
  });

  test('should work on integer as answerOption items', async ({ page }) => {
    const q9bNotExists = byId(page, 'Q9b-not-exists/1/1');
    const q9bExists = byId(page, 'Q9b-exists/1/1');
    const q9bNotEqB = byId(page, 'Q9b-noteq-B/1/1');
    const q9bEqB = byId(page, 'Q9b-eq-B/1/1');

    await expect(q9bNotExists).toBeVisible();
    await expect(q9bExists).not.toBeAttached();
    await expect(q9bNotEqB).toBeVisible();
    await expect(q9bEqB).not.toBeAttached();

    const q9b = byId(page, 'Q9b/1/1');
    await q9b.click();
    await pressCypressKeys(q9b, '{downArrow}{enter}');
    await expect(q9b).toHaveValue('12');
    await expect(q9bNotExists).not.toBeAttached();
    await expect(q9bExists).toBeVisible();
    await expect(q9bNotEqB).toBeVisible();
    await expect(q9bEqB).not.toBeAttached();

    await q9b.click();
    await pressCypressKeys(q9b, '{downArrow}{downArrow}{enter}');
    await expect(q9b).toHaveValue('34');
    await expect(q9bNotExists).not.toBeAttached();
    await expect(q9bExists).toBeVisible();
    await expect(q9bNotEqB).not.toBeAttached();
    await expect(q9bEqB).toBeVisible();
  });

  test('should work on date as answerOption items', async ({ page }) => {
    const q9cNotExists = byId(page, 'Q9c-not-exists/1/1');
    const q9cExists = byId(page, 'Q9c-exists/1/1');
    const q9cNotEqB = byId(page, 'Q9c-noteq-B/1/1');
    const q9cEqB = byId(page, 'Q9c-eq-B/1/1');

    await expect(q9cNotExists).toBeVisible();
    await expect(q9cExists).not.toBeAttached();
    await expect(q9cNotEqB).toBeVisible();
    await expect(q9cEqB).not.toBeAttached();

    const q9c = byId(page, 'Q9c/1/1');
    await q9c.click();
    await pressCypressKeys(q9c, '{downArrow}{enter}');
    await expect(q9c).toHaveValue('2022');
    await expect(q9cNotExists).not.toBeAttached();
    await expect(q9cExists).toBeVisible();
    await expect(q9cNotEqB).toBeVisible();
    await expect(q9cEqB).not.toBeAttached();

    await q9c.click();
    await pressCypressKeys(q9c, '{downArrow}{downArrow}{enter}');
    await expect(q9c).toHaveValue('2022-09');
    await expect(q9cNotExists).not.toBeAttached();
    await expect(q9cExists).toBeVisible();
    await expect(q9cNotEqB).not.toBeAttached();
    await expect(q9cEqB).toBeVisible();
  });

  test('should work on time as answerOption items', async ({ page }) => {
    const q9dNotExists = byId(page, 'Q9d-not-exists/1/1');
    const q9dExists = byId(page, 'Q9d-exists/1/1');
    const q9dNotEqB = byId(page, 'Q9d-noteq-B/1/1');
    const q9dEqB = byId(page, 'Q9d-eq-B/1/1');

    await expect(q9dNotExists).toBeVisible();
    await expect(q9dExists).not.toBeAttached();
    await expect(q9dNotEqB).toBeVisible();
    await expect(q9dEqB).not.toBeAttached();

    const q9d = byId(page, 'Q9d/1/1');
    await q9d.click();
    await pressCypressKeys(q9d, '{downArrow}{enter}');
    await expect(q9d).toHaveValue('10:30:00');
    await expect(q9dNotExists).not.toBeAttached();
    await expect(q9dExists).toBeVisible();
    await expect(q9dNotEqB).toBeVisible();
    await expect(q9dEqB).not.toBeAttached();

    await q9d.click();
    await pressCypressKeys(q9d, '{downArrow}{downArrow}{enter}');
    await expect(q9d).toHaveValue('13:30:00');
    await expect(q9dNotExists).not.toBeAttached();
    await expect(q9dExists).toBeVisible();
    await expect(q9dNotEqB).not.toBeAttached();
    await expect(q9dEqB).toBeVisible();
  });
});
