import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, addFormToPage, pressCypressKeys, escapeIdSelector } from '../support/lforms-helpers';

test.describe('Question with sub items', () => {
  for (const layout of ['check-box', 'autocomplete']) {
    test(`should load and save unanswered and typed Other child items in ${layout} layout`, async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await page.evaluate(async layout => {
        const control = (code: string) => ({
          url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
          valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code}]}
        });
        const q = {resourceType: 'Questionnaire', status: 'draft', item: [{
          linkId: 'ms', text: 'Fruits', type: 'open-choice', repeats: true,
          extension: [control(layout)], answerOption: [{valueCoding: {code: 'a', display: 'Apple'}}],
          item: [{linkId: 'help', text: 'Choose fruits', type: 'display', extension: [control('help')]},
            {linkId: 'child', text: 'How many?', type: 'string'}]
        }]};
        const qr = {resourceType: 'QuestionnaireResponse', status: 'in-progress', item: [{
          linkId: 'ms', answer: [
            {valueCoding: {code: 'a', display: 'Apple'}, item: [{linkId: 'help'}]},
            {valueString: 'Mango'},
            {valueString: 'Papaya', item: [{linkId: 'child', answer: [{valueString: 'nine'}]}]}
          ]
        }]};
        const util = (window as any).LForms.Util;
        const merged = util.mergeFHIRDataIntoLForms(qr, util.convertFHIRQuestionnaireToLForms(q, 'R4'), 'R4');
        await util.addFormToPage(merged, 'formContainer');
      }, layout);

      // Imported subgroups have ordinal paths; identify each input by its group.
      const group = (answer: string) => page.locator('lhc-item-group').filter({
        has: page.locator('.lhc-item-group-title', {hasText: new RegExp('^\\s*' + answer + '\\s*$')})
      });
      await expect(group('Apple')).toBeVisible();
      await expect(group('Mango')).toBeVisible();
      await expect(group('Papaya')).toBeVisible();
      await expect(page.locator('[id^="label-multi-select-subgroup"]')).toHaveCount(3);
      await expect(group('Papaya').locator('input')).toHaveValue('nine');
      await group('Apple').locator('input').fill('three');
      await group('Apple').locator('input').blur();
      await group('Mango').locator('input').fill('seven');
      await group('Mango').locator('input').blur();

      const saved = await page.evaluate(() => (window as any).LForms.Util
        .getFormFHIRData('QuestionnaireResponse', 'R4', 'formContainer'));
      const answers = saved.item[0].answer;
      expect(answers.find((a: any) => a.valueCoding?.code === 'a').item[0].answer).toEqual([{valueString: 'three'}]);
      expect(answers.find((a: any) => a.valueString === 'Mango').item[0].answer).toEqual([{valueString: 'seven'}]);
      expect(answers.find((a: any) => a.valueString === 'Papaya').item[0].answer).toEqual([{valueString: 'nine'}]);

      await page.evaluate(() => document.getElementById('reader_log').replaceChildren());
      await byId(page, 'item-ms/1').locator('.autocomp_selected li', {hasText: 'Mango'}).locator('button').click();
      await expect(group('Mango')).toHaveCount(0);
      await expect(group('Papaya').locator('input')).toHaveValue('nine');
      await expect(page.locator('#reader_log p').filter({hasText: /^Removed\s+(Sub items for checkbox|sub items for autocomplete) option:/}))
        .toHaveText([layout === 'check-box' ?
          'Removed Sub items for checkbox option: Mango' : 'Removed sub items for autocomplete option: Mango']);
    });
  }

  test('should not create per-option subgroups for a help extension', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);

    const questionnaire = {
      resourceType: 'Questionnaire',
      status: 'draft',
      item: [{
        linkId: 'multi-select',
        text: 'Question',
        type: 'choice',
        repeats: true,
        answerOption: [{valueCoding: {code: 'a', display: 'Answer A'}}],
        extension: [{
          url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
          valueCodeableConcept: {
            coding: [{
              system: 'http://hl7.org/fhir/questionnaire-item-control',
              code: 'radio-button'
            }]
          }
        }],
        item: [{
          linkId: 'multi-select-help',
          text: 'Help text',
          type: 'display',
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              coding: [{
                system: 'http://hl7.org/fhir/questionnaire-item-control',
                code: 'help'
              }]
            }
          }],
          _text: {
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/rendering-xhtml',
              valueString: '<p>Formatted help text</p>'
            }]
          }
        }]
      }]
    };

    const convertedItem = await page.evaluate(q => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const convertedItem = {
        codingInstructions: formDef.items[0].codingInstructions,
        hasItems: Object.prototype.hasOwnProperty.call(formDef.items[0], 'items')
      };
      win.LForms.Util.addFormToPage(formDef, 'formContainer');
      return convertedItem;
    }, questionnaire);

    expect(convertedItem.codingInstructions).toBe('<p>Formatted help text</p>');
    expect(convertedItem.hasItems).toBe(false);
    const checkbox = byId(page, 'multi-select/1||a');
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await expect(page.locator('.lhc-item-group-body')).toHaveCount(0);
  });

  test('should not raise an error when selecting an answer in a single-select drop-down with sub items', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('TypeError')) {
        errors.push(msg.text());
      }
    });
    await page.evaluate(() => {
      (window as any).LForms.Util.addFormToPage({
        lformsVersion: '30.0.0',
        name: 'Single-select drop-down with a child question',
        items: [{
          linkId: 'single-select',
          question: 'Single-select',
          dataType: 'CODING',
          displayControl: {answerLayout: {type: 'COMBO_BOX'}},
          answers: [{code: 'a', text: 'Answer A'}, {code: 'b', text: 'Answer B'}],
          items: [{linkId: 'single-select-child', question: 'Child', dataType: 'ST'}]
        }]
      }, 'formContainer');
    });

    const dropdown = byId(page, 'single-select/1');
    await dropdown.click();
    await dropdown.press('ArrowDown');
    await dropdown.press('Enter');
    await expect(dropdown).toHaveValue('Answer A');
    expect(errors).toEqual([]);
  });

  test('should show a selected option\'s subgroup only when one of its sub items is shown', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'multi-select-with-hidden-child-items.json', 'formContainer', { fhirVersion: 'R4' });
    const subGroupLabel = (parentLinkId: string, code: string) =>
      byId(page, 'item-' + parentLinkId + '/1').locator(
        '#' + escapeIdSelector('label-multi-select-subgroup||' + code + '/1/multi-select-subgroup||' + code));

    // Case 1: the sub item is visible.
    await byId(page, 'case1-visible/1||a').click();
    await expect(subGroupLabel('case1-visible', 'a')).toBeVisible();

    // Case 2: the only sub item is hidden by the questionnaire-hidden extension.
    const case2Apple = byId(page, 'case2-hidden/1||a');
    await case2Apple.click();
    await expect(case2Apple).toBeChecked();
    await expect(subGroupLabel('case2-hidden', 'a')).not.toBeAttached();

    // Case 3: one hidden and one visible sub item.
    await byId(page, 'case3-mixed/1||a').click();
    await expect(subGroupLabel('case3-mixed', 'a')).toBeVisible();

    // Case 4: the only sub item is enabled by another question.
    const case4Apple = byId(page, 'case4-enablewhen-other/1||a');
    await case4Apple.click();
    await expect(case4Apple).toBeChecked();
    await expect(subGroupLabel('case4-enablewhen-other', 'a')).not.toBeAttached();
    await byId(page, 'show-details/1|true').click();
    await expect(subGroupLabel('case4-enablewhen-other', 'a')).toBeVisible();
    await byId(page, 'show-details/1|false').click();
    await expect(subGroupLabel('case4-enablewhen-other', 'a')).not.toBeAttached();

    // Case 5: the only sub item is enabled when Apple is selected.
    const case5Banana = byId(page, 'case5-enablewhen-parent/1||b');
    await case5Banana.click();
    await expect(case5Banana).toBeChecked();
    await expect(subGroupLabel('case5-enablewhen-parent', 'b')).not.toBeAttached();
    await byId(page, 'case5-enablewhen-parent/1||a').click();
    await expect(subGroupLabel('case5-enablewhen-parent', 'a')).toBeVisible();
    await expect(subGroupLabel('case5-enablewhen-parent', 'b')).toBeVisible();

    // Case 6: autocomplete, the only sub item is hidden.
    const dropdown = byId(page, 'case6-autocomplete-hidden/1');
    await dropdown.click();
    await dropdown.press('ArrowDown');
    await dropdown.press('Enter');
    await expect(subGroupLabel('case6-autocomplete-hidden', 'a')).not.toBeAttached();

    // The subgroups whose headings are not shown are still in the form data.
    const subGroupCounts = await page.evaluate(() => {
      const items = (window as any).LForms.Util.getFormData('formContainer', false, false, true).items;
      const counts: Record<string, number> = {};
      items.forEach((item: any) => {
        counts[item.linkId] = (item.items || []).filter((x: any) => x.isSubGroupForMultiSelect).length;
      });
      return counts;
    });
    expect(subGroupCounts['case2-hidden']).toBe(1);
    expect(subGroupCounts['case4-enablewhen-other']).toBe(1);
    expect(subGroupCounts['case6-autocomplete-hidden']).toBe(1);
  });

  test('should render sub items for each selected option and export/merge properly, checkbox layout', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'checkbox-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    await byId(page, 'parent-checkbox/1||a').click();
    await byId(page, 'parent-checkbox/1||b').click();
    await byId(page, 'parent-checkbox/1||o').click();
    await expect(byId(page, 'label-multi-select-subgroup||a/1/multi-select-subgroup||a')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||b/1/multi-select-subgroup||b')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||o/1/multi-select-subgroup||o')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await byId(page, 'parent-checkbox/1||o').click();
    await expect(byId(page, 'label-multi-select-subgroup||o/1/multi-select-subgroup||o')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||a/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||b/1').pressSequentially('22');

    // getFormData() should not include checkbox sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[0].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[0].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[0].item.length).toBe(1);
    expect(q.item[0].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueCoding: { code: 'a', display: 'Apple' },
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueCoding: { code: 'b', display: 'Banana' },
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer')!.innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||a/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||b/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||a/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||b/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should render sub items for each selected option and export/merge properly, autocomplete layout', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    // Select all 3 options from the dropdown. Sub groups for all 3 options should be shown.
    await byId(page, 'parent-dropdown/1').click();
    await byId(page, 'parent-dropdown/1').press('ArrowDown');
    await byId(page, 'parent-dropdown/1').press('Enter');
    await byId(page, 'parent-dropdown/1').press('Enter');
    await byId(page, 'parent-dropdown/1').press('Enter');
    await expect(byId(page, 'label-multi-select-subgroup||a/1/multi-select-subgroup||a')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||b/1/multi-select-subgroup||b')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||o/1/multi-select-subgroup||o')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await page.locator('.autocomp_selected ul li:nth-child(3) button').click();
    await expect(byId(page, 'label-multi-select-subgroup||o/1/multi-select-subgroup||o')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||a/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||b/1').pressSequentially('22');

    // getFormData() should not include sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[0].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[0].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[0].item.length).toBe(1);
    expect(q.item[0].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueCoding: { code: 'a', display: 'Apple' },
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueCoding: { code: 'b', display: 'Banana' },
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer').innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||a/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||b/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||a/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||b/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should render sub items for each selected option and export/merge properly, autocomplete layout, valueString answerOption', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items-primitive-types.json', 'formContainer', { fhirVersion: 'R4' });

    // Select all 3 options from the dropdown. Sub groups for all 3 options should be shown.
    await byId(page, 'parent-dropdown-string/1').click();
    await byId(page, 'parent-dropdown-string/1').press('ArrowDown');
    await byId(page, 'parent-dropdown-string/1').press('Enter');
    await byId(page, 'parent-dropdown-string/1').press('Enter');
    await byId(page, 'parent-dropdown-string/1').press('Enter');
    await expect(byId(page, 'label-multi-select-subgroup||Apple/1/multi-select-subgroup||Apple')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||Banana/1/multi-select-subgroup||Banana')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||Orange/1/multi-select-subgroup||Orange')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await page.locator('.autocomp_selected ul li:nth-child(3) button').click();
    await expect(byId(page, 'label-multi-select-subgroup||Orange/1/multi-select-subgroup||Orange')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||Apple/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||Banana/1').pressSequentially('22');

    // getFormData() should not include sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[0].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[0].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[0].item.length).toBe(1);
    expect(q.item[0].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueString: 'Apple',
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueString:'Banana',
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer').innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||Apple/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||Banana/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||Apple/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||Banana/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should render sub items for each selected option and export/merge properly, autocomplete layout, valueInteger answerOption', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items-primitive-types.json', 'formContainer', { fhirVersion: 'R4' });

    // Select all 3 options from the dropdown. Sub groups for all 3 options should be shown.
    await byId(page, 'parent-dropdown-integer/1').click();
    await byId(page, 'parent-dropdown-integer/1').press('ArrowDown');
    await byId(page, 'parent-dropdown-integer/1').press('Enter');
    await byId(page, 'parent-dropdown-integer/1').press('Enter');
    await byId(page, 'parent-dropdown-integer/1').press('Enter');
    await expect(byId(page, 'label-multi-select-subgroup||10/1/multi-select-subgroup||10')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||20/1/multi-select-subgroup||20')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||30/1/multi-select-subgroup||30')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await page.locator('.autocomp_selected ul li:nth-child(3) button').click();
    await expect(byId(page, 'label-multi-select-subgroup||30/1/multi-select-subgroup||30')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||10/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||20/1').pressSequentially('22');

    // getFormData() should not include sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[1].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[1].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[1].item.length).toBe(1);
    expect(q.item[1].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueInteger: 10,
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueInteger: 20,
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer').innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||10/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||20/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||10/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||20/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should render sub items for each selected option and export/merge properly, autocomplete layout, valueDate answerOption', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items-primitive-types.json', 'formContainer', { fhirVersion: 'R4' });

    // Select all 3 options from the dropdown. Sub groups for all 3 options should be shown.
    await byId(page, 'parent-dropdown-date/1').click();
    await byId(page, 'parent-dropdown-date/1').press('ArrowDown');
    await byId(page, 'parent-dropdown-date/1').press('Enter');
    await byId(page, 'parent-dropdown-date/1').press('Enter');
    await byId(page, 'parent-dropdown-date/1').press('Enter');
    await expect(byId(page, 'label-multi-select-subgroup||2026/1/multi-select-subgroup||2026')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||2027/1/multi-select-subgroup||2027')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||2028/1/multi-select-subgroup||2028')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await page.locator('.autocomp_selected ul li:nth-child(3) button').click();
    await expect(byId(page, 'label-multi-select-subgroup||2028/1/multi-select-subgroup||2028')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||2026/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||2027/1').pressSequentially('22');

    // getFormData() should not include sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[2].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[2].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[2].item.length).toBe(1);
    expect(q.item[2].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueDate: '2026',
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueDate: '2027',
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer').innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||2026/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||2027/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||2026/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||2027/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should render sub items for each selected option and export/merge properly, autocomplete layout, valueTime answerOption', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items-primitive-types.json', 'formContainer', { fhirVersion: 'R4' });

    // Select all 3 options from the dropdown. Sub groups for all 3 options should be shown.
    await byId(page, 'parent-dropdown-time/1').click();
    await byId(page, 'parent-dropdown-time/1').press('ArrowDown');
    await byId(page, 'parent-dropdown-time/1').press('Enter');
    await byId(page, 'parent-dropdown-time/1').press('Enter');
    await byId(page, 'parent-dropdown-time/1').press('Enter');
    await expect(byId(page, 'label-multi-select-subgroup||10:00:10/1/multi-select-subgroup||10:00:10')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||10:00:20/1/multi-select-subgroup||10:00:20')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||10:00:30/1/multi-select-subgroup||10:00:30')).toBeVisible();
    // Unchecking an option should remove the sub items for that option.
    await page.locator('.autocomp_selected ul li:nth-child(3) button').click();
    await expect(byId(page, 'label-multi-select-subgroup||10:00:30/1/multi-select-subgroup||10:00:30')).not.toBeAttached();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||10:00:10/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||10:00:20/1').pressSequentially('22');

    // getFormData() should not include sub groups by default.
    const formData1 = await page.evaluate(() => (window as any).LForms.Util.getFormData());
    expect(formData1.items[3].items.length).toBe(1);
    const formData2 = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, null, null, true));
    expect(formData2.items[3].items.length).toBe(3);

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });

    expect(q.item[3].item.length).toBe(1);
    expect(q.item[3].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(2);
    expect(qr.item[0].answer[0]).toEqual({
      valueTime: '10:00:10',
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[0].answer[1]).toEqual({
      valueTime: '10:00:20',
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer').innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||10:00:10/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||10:00:20/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||10:00:10/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||10:00:20/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });

  test('should merge back the QR properly if only one answer is selected, autocomplete layout', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'dropdown-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    // Select all 3 options from the dropdown. Sub groups for all 3 options should be shown.
    await byId(page, 'parent-dropdown/1').click();
    await byId(page, 'parent-dropdown/1').press('ArrowDown');
    await byId(page, 'parent-dropdown/1').press('Enter');
    await expect(byId(page, 'label-multi-select-subgroup||a/1/multi-select-subgroup||a')).toBeVisible();
    // Fill out the sub items.
    await byId(page, 'child-integer/1/multi-select-subgroup||a/1').pressSequentially('11');

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      const q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      return { q, qr };
    });
    expect(q.item[0].item.length).toBe(1);
    expect(q.item[0].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[0].answer.length).toBe(1);
    expect(qr.item[0].answer[0]).toEqual({
      valueCoding: { code: 'a', display: 'Apple' },
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer').innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||a/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||a/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
  });

  test('should remove invalid sub items when options are removed by answerExpression', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'checkbox-answerExpression-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    // Build the answer options list for the checkbox question.
    await byId(page, 'fruit/1').pressSequentially('Apple');
    await byId(page, 'add-fruit/1').click();
    await byId(page, 'fruit/2').pressSequentially('Banana');
    await byId(page, 'add-fruit/2').click();
    await byId(page, 'fruit/3').pressSequentially('Orange');
    // Select Apple and Banana.
    await byId(page, 'parent-checkbox/1||Apple').click();
    await byId(page, 'parent-checkbox/1||Banana').click();
    await expect(byId(page, 'label-multi-select-subgroup||Apple/1/multi-select-subgroup||Apple')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||Banana/1/multi-select-subgroup||Banana')).toBeVisible();
    // Fill out sub items for Apple and Banana.
    await byId(page, 'child-integer/1/multi-select-subgroup||Apple/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||Banana/1').pressSequentially('22');
    // Delete the option Banana from answerExpression source, which should remove the sub items for Banana.
    await byId(page, 'del-fruit/2').click();
    // Banana is removed.
    await expect(byId(page, 'parent-checkbox/1||Banana')).not.toBeAttached();
    await expect(byId(page, 'label-multi-select-subgroup||Banana/1/multi-select-subgroup||Banana')).not.toBeAttached();
    // Apple should still be selected, and its sub items should still be there.
    await expect(byId(page, 'parent-checkbox/1||Apple').locator('input[type="checkbox"]')).toBeChecked();
    await expect(byId(page, 'label-multi-select-subgroup||Apple/1/multi-select-subgroup||Apple')).toBeVisible();
    // Orange should not be selected, and its sub items should not be there.
    await expect(byId(page, 'parent-checkbox/1||Orange').locator('input[type="checkbox"]')).not.toBeChecked();
    await expect(byId(page, 'label-multi-select-subgroup||o/1/multi-select-subgroup||o')).not.toBeAttached();
  });

  test('should load back merged QR, when checkbox options are set by answerExpression', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'checkbox-answerExpression-with-child-items.json', 'formContainer', { fhirVersion: 'R4' });

    // Build the answer options list for the checkbox question.
    await byId(page, 'fruit/1').pressSequentially('Apple');
    await byId(page, 'add-fruit/1').click();
    await byId(page, 'fruit/2').pressSequentially('Banana');
    // Select Apple and Banana.
    await byId(page, 'parent-checkbox/1||Apple').click();
    await byId(page, 'parent-checkbox/1||Banana').click();
    // Fill out sub items for Apple and Banana.
    await byId(page, 'child-integer/1/multi-select-subgroup||Apple/1').pressSequentially('11');
    await byId(page, 'child-integer/1/multi-select-subgroup||Banana/1').pressSequentially('22');

    // Verify the exports.
    const { q, qr } = await page.evaluate(() => {
      const win = window as any;
      return {
        q: win.LForms.Util.getFormFHIRData('Questionnaire', 'R4'),
        qr: win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4')
      };
    });

    expect(q.item[1].item.length).toBe(1);
    expect(q.item[1].item[0]).toEqual({
      type: 'integer',
      linkId: 'child-integer',
      text: 'How many of this?'
    });
    expect(qr.item[1].answer.length).toBe(2);
    expect(qr.item[1].answer[0]).toEqual({
      valueCoding: { display: 'Apple' },
      item: [{ answer: [{ valueInteger: 11 }], linkId: 'child-integer', text: 'How many of this?' }]
    });
    expect(qr.item[1].answer[1]).toEqual({
      valueCoding: { display: 'Banana' },
      item: [{ answer: [{ valueInteger: 22 }], linkId: 'child-integer', text: 'How many of this?' }]
    });

    // Load back the merged QR.
    await page.evaluate(({ q, qr }) => {
      const win = window as any;
      const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
      const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, 'R4');
      document.getElementById('formContainer')!.innerHTML = '';
      return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
    }, { q, qr });

    await expect(byId(page, 'label-multi-select-subgroup||Apple/1/1')).toBeVisible();
    await expect(byId(page, 'label-multi-select-subgroup||Banana/1/1')).toBeVisible();
    await expect(byId(page, 'item-multi-select-subgroup||Apple/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('11');
    await expect(byId(page, 'item-multi-select-subgroup||Banana/1/1').locator('#' + escapeIdSelector('child-integer/1/1/1'))).toHaveValue('22');
  });
});
