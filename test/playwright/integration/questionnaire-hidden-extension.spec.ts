import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, uploadFile, answerId, addFormToPage } from '../support/lforms-helpers';
import fs from 'fs';
import path from 'path';

test.describe('"questionnaire-hidden" extension Test', () => {
  test('should hide all kinds of items that have the questionnnaire-hidden extension', async ({ page }) => {
    // load a lforms form data
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await expect(page.locator('#loadBtn')).toContainText('Load Form From File');
    await uploadFile(page, '#fileAnchor', 'test/data/R4/questionnaire-hidden-extension.json');
    await expect(page.locator('.lhc-form-title')).toContainText('A questionnaire for testing questionnaire-hidden extension');

    // normal item
    await expect(byId(page, 'label-q1/1')).toBeVisible();
    // hidden item
    await expect(byId(page, 'label-q2/1')).not.toBeAttached();

    // hidden vertical group
    await expect(byId(page, 'label-g-hidden-vertical-group/1')).not.toBeAttached();
    await expect(byId(page, 'label-g-hidden-vertical-group/q1/1/1')).not.toBeAttached();

    // hidden group in a displayed group
    // displayed vertical group that contains a hidden group
    await expect(byId(page, 'label-g-displayed-vertical-group/1')).toBeVisible();
    await expect(byId(page, 'label-g-displayed-vertical-group/g-hidden-vertical-group/1/1')).not.toBeAttached();
    await expect(byId(page, 'label-g-displayed-vertical-group/g-hidden-vertical-group/q1/1/1/1')).not.toBeAttached();

    // hidden horizontal group
    await expect(byId(page, 'label-g-hidden-horizontal-group/1')).not.toBeAttached();
    await expect(byId(page, 'label-g-hidden-horizontal-group/q1/1/1')).not.toBeAttached();

    // hidden matrix
    await expect(byId(page, 'label-g-hidden-matrix/1')).not.toBeAttached();
    await expect(byId(page, 'label-g-hidden-matrix/q1/1/1')).not.toBeAttached();

    // hidden column in a horizontal group
    // horizontal group with a hidden column
    await expect(byId(page, 'label-g-horizontal-group/1')).toBeVisible();
    // a hidden question in a horizontal group
    await expect(byId(page, 'label-g-horizontal-group/q1/1/1')).not.toBeAttached();
    await expect(byId(page, 'g-horizontal-group/q1/1/1')).not.toBeAttached();
    // a displayed question in a horizontal group
    await expect(byId(page, 'label-g-horizontal-group/q2/1/1')).toBeVisible();
    await expect(byId(page, 'g-horizontal-group/q2/1/1')).toBeVisible();

    // hidden question row in a matrix
    const radio1 = answerId('g-displayed-matrix/q1/1/1', 'http://loinc.org', 'LA10427-5');
    const radio2 = answerId('g-displayed-matrix/q2/1/1', 'http://loinc.org', 'LA10427-5');
    // displayed matrix
    await expect(byId(page, 'label-g-displayed-matrix/1')).toBeVisible();
    // a hidden question in a matrix
    await expect(byId(page, 'label-g-displayed-matrix/q1/1/1')).not.toBeAttached();
    await expect(byId(page, radio1)).not.toBeAttached();
    // a displayed question in a matrix
    await expect(byId(page, 'label-g-displayed-matrix/q2/1/1')).toBeVisible();
    await expect(byId(page, radio2)).toBeVisible();
  });

  test('should load a QuestionnaireResponse with values on hidden items and keep the hidden items hidden', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);

    const qPath = path.resolve('test/data/R4/hidden-item-questionnaire.R4.json');
    const qrPath = path.resolve('test/data/R4/hidden-item-questionnaire-response.R4.json');
    const q = JSON.parse(fs.readFileSync(qPath, 'utf-8'));
    const qr = JSON.parse(fs.readFileSync(qrPath, 'utf-8'));

    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const fhirVersion = 'R4';
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
    }, { q, qr });

    // 4 items visible
    const ceVisible = byId(page, 'CE-VISIBLE/1');
    await expect(ceVisible).toBeVisible();
    await expect(ceVisible).toHaveValue('2');
    const itemVisible = byId(page, 'ITEM-VISIBLE/1');
    await expect(itemVisible).toBeVisible();
    await expect(itemVisible).toHaveValue('2');
    await expect(byId(page, 'label-GROUP-VISIBLE/1')).toBeVisible();
    const groupCeVisible = byId(page, 'GROUP-VISIBLE/CE-VISIBLE/1/1');
    await expect(groupCeVisible).toBeVisible();
    await expect(groupCeVisible).toHaveValue('2');

    // others are hidden
    await expect(byId(page, 'CE-HIDDEN/1')).not.toBeAttached();
    await expect(byId(page, 'GROUP-VISIBLE/CE-HIDDEN/1/1')).not.toBeAttached();
    await expect(byId(page, 'label-GROUP-HIDDEN/1')).not.toBeAttached();
    await expect(byId(page, 'GROUP-HIDDEN/CE-HIDDEN/1/1')).not.toBeAttached();
  });
});
