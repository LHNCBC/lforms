import { test, expect, type Locator, type Page } from '@playwright/test';
import { addFormToPage, answerId, byId, waitForLFormsReady } from '../support/lforms-helpers';
import fs from 'fs';
import path from 'path';

/**
 * Assert that a boolean item is rendered as three radio buttons and that its
 * expected initial state is selected.
 * @param page - The Playwright page instance, with the form already loaded.
 * @param linkId - The linkId of the boolean item.
 * @param initialState - The radio button expected to be selected: 'false' for
 *  "No" or 'null' for "Not Answered".
 */
async function expectThreeStateRadioButtons(
  page: Page,
  linkId: string,
  initialState: 'false' | 'null'
): Promise<void> {
  const elementId = `${linkId}/1`;
  const yesOption = byId(page, answerId(elementId, 'true'));
  const noOption = byId(page, answerId(elementId, 'false'));
  const notAnsweredOption = byId(page, answerId(elementId, 'null'));

  await expect(yesOption.locator('input[type="radio"]')).not.toBeChecked();
  await expect(noOption.locator('input[type="radio"]')).toBeChecked({checked: initialState === 'false'});
  await expect(notAnsweredOption.locator('input[type="radio"]')).toBeChecked({checked: initialState === 'null'});
  await expect(byId(page, answerId(elementId, 'checkbox'))).toHaveCount(0);
}

/**
 * Assert that a boolean item is rendered as a three-state checkbox with the
 * expected ARIA state and localized status text.
 * @param page - The Playwright page instance, with the form already loaded.
 * @param linkId - The linkId of the boolean item.
 * @param ariaChecked - The expected aria-checked value: 'true', 'false', or
 *  'mixed' for "Not Answered".
 * @param statusText - The expected localized status text shown beside the checkbox.
 */
async function expectThreeStateCheckbox(
  page: Page,
  linkId: string,
  ariaChecked: 'true' | 'false' | 'mixed',
  statusText: string
): Promise<void> {
  const elementId = `${linkId}/1`;
  const checkbox = byId(page, answerId(elementId, 'checkbox'));

  await expect(checkbox).toHaveAttribute('role', 'checkbox');
  await expect(checkbox).toHaveAttribute('aria-checked', ariaChecked);
  await expect(byId(page, `boolean-status-${elementId}`)).toHaveText(statusText);
  await expect(checkbox.locator('input')).toHaveCount(0);
  await expect(byId(page, answerId(elementId, 'null'))).toHaveCount(0);
}

/**
 * Return the exported boolean answer for a linkId, or undefined if unanswered.
 * @param page - The Playwright page instance, with the form already loaded.
 * @param fhirVersion - The FHIR version of the exported QuestionnaireResponse.
 * @param linkId - The linkId of the top-level boolean item.
 * @returns The item's valueBoolean in the exported QuestionnaireResponse, or
 *  undefined if the item has no answer.
 */
async function exportedBoolean(page: Page, fhirVersion: string, linkId: string): Promise<boolean | undefined> {
  const questionnaireResponse = await page.evaluate(version =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', version), fhirVersion);
  const item = (questionnaireResponse.item || []).find((qrItem: any) => qrItem.linkId === linkId);
  return item?.answer[0].valueBoolean;
}

/**
 * Locate the native input of a two-state checkbox.
 * @param page - The Playwright page instance, with the form already loaded.
 * @param elementId - The element ID of the boolean item, e.g. 'qualifying/1'.
 * @returns A Locator for the checkbox's input element.
 */
function twoStateInput(page: Page, elementId: string): Locator {
  return byId(page, answerId(elementId, 'checkbox')).locator('input[type="checkbox"]');
}

/**
 * Load the checkbox-boolean Questionnaire merged with a saved
 * QuestionnaireResponse, so that the form has saved data.
 * @param page - The Playwright page instance, on the addFormToPageTest page.
 * @param fhirVersion - The FHIR version of the Questionnaire and the response.
 * @param responseItems - The items of the saved QuestionnaireResponse.
 * @returns A promise that resolves when the form has been added to the page.
 */
async function loadWithSavedResponse(page: Page, fhirVersion: string, responseItems: any[]): Promise<void> {
  const questionnaire = JSON.parse(fs.readFileSync(
    path.resolve(`test/data/${fhirVersion}/checkbox-boolean.json`), 'utf-8'));
  const questionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    status: 'in-progress',
    item: responseItems
  };

  await page.evaluate(({ q, qr, version }) => {
    const win = window as any;
    const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, version);
    const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, version);
    if (mergedFormData.hasSavedData !== true) throw new Error('hasSavedData should be true');
    return win.LForms.Util.addFormToPage(mergedFormData, 'formContainer');
  }, { q: questionnaire, qr: questionnaireResponse, version: fhirVersion });
}

/**
 * Click "+" for the repeating group and for the repeating two-state question,
 * and assert that each new two-state checkbox starts with its initial value
 * while the other new boolean items start unanswered.
 * @param page - The Playwright page instance, with the form already loaded.
 */
async function addRepeatsAndExpectInitialValues(page: Page): Promise<void> {
  await byId(page, 'add-group/1').click();
  await byId(page, 'add-repeating-qualifying/1').click();

  await expect(twoStateInput(page, 'group-qualifying-true/2/1')).toBeChecked();
  await expect(twoStateInput(page, 'group-qualifying-false/2/1')).not.toBeChecked();
  await expect(byId(page, answerId('group-three-state/2/1', 'checkbox')))
    .toHaveAttribute('aria-checked', 'mixed');
  await expect(byId(page, answerId('group-no-item-control/2/1', 'null')).locator('input[type="radio"]'))
    .toBeChecked();
  await expect(twoStateInput(page, 'repeating-qualifying/2')).toBeChecked();
}

/**
 * Return the exported answers of the repeating group and the repeating question.
 * @param page - The Playwright page instance, with the form already loaded.
 * @param fhirVersion - The FHIR version of the exported QuestionnaireResponse.
 * @returns For each repetition of the group, a map of answered child linkIds to
 *  their valueBoolean; and the valueBoolean answers of the repeating question.
 */
async function exportedRepeats(page: Page, fhirVersion: string):
  Promise<{groups: Record<string, boolean>[], repeating: boolean[]}> {
  return page.evaluate(version => {
    const qr = (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', version);
    const groups = qr.item.filter((item: any) => item.linkId === 'group').map((group: any) =>
      Object.fromEntries(group.item.map((child: any) => [child.linkId, child.answer[0].valueBoolean])));
    const repeating = qr.item.find((item: any) => item.linkId === 'repeating-qualifying').answer
      .map((answer: any) => answer.valueBoolean);
    return {groups, repeating};
  }, fhirVersion);
}

for (const fhirVersion of ['R4', 'R5']) {
  test.describe(`${fhirVersion} boolean checkbox rendering`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'checkbox-boolean.json', 'formContainer', {fhirVersion});
    });

    test('renders a two-state checkbox only when all three conditions are met', async ({ page }) => {
      const checkboxLabel = byId(page, answerId('qualifying/1', 'checkbox'));
      const checkbox = checkboxLabel.locator('input[type="checkbox"]');

      await expect(checkbox).toHaveCount(1);
      await expect(checkbox).not.toBeChecked();
      await expect(checkboxLabel).not.toHaveAttribute('role', 'checkbox');
      await expect(byId(page, answerId('qualifying/1', 'null'))).toHaveCount(0);
      await expect(twoStateInput(page, 'qualifying-initial-true/1')).toBeChecked();

      await expectThreeStateCheckbox(page, 'optional', 'false', 'No');
      await expectThreeStateCheckbox(page, 'no-initial', 'mixed', 'Not Answered');
      // an initialExpression does not count as an initial value
      await expectThreeStateCheckbox(page, 'initial-expression', 'true', 'Yes');
      await expectThreeStateRadioButtons(page, 'no-item-control', 'false');
      await expectThreeStateRadioButtons(page, 'radio-button', 'false');
      await expectThreeStateRadioButtons(page, 'plain-boolean', 'null');
    });

    test('toggles the two-state checkbox when its question text is clicked', async ({ page }) => {
      const checkbox = twoStateInput(page, 'qualifying/1');

      // the question label's "for" attribute targets the input, so the name is native
      await expect(checkbox).toHaveAttribute('id', 'qualifying/1');
      await expect(checkbox).toHaveAccessibleName('Qualifying two-state checkbox *');

      await byId(page, 'label-qualifying/1').click();
      await expect(checkbox).toBeChecked();
      expect(await exportedBoolean(page, fhirVersion, 'qualifying')).toBe(true);

      await byId(page, 'label-qualifying/1').click();
      await expect(checkbox).not.toBeChecked();
      expect(await exportedBoolean(page, fhirVersion, 'qualifying')).toBe(false);
    });

    test('does not toggle a two-state checkbox when its table column header is clicked', async ({ page }) => {
      const checkBoxControl = {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
        valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code: 'check-box'}]}
      };
      const questionnaire = {
        resourceType: 'Questionnaire',
        status: 'active',
        item: [{
          linkId: 'table', text: 'Table', type: 'group', repeats: true,
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code: 'gtable'}]}
          }],
          item: [
            {linkId: 'agree', text: 'Agree', type: 'boolean', required: true,
              initial: [{valueBoolean: false}], extension: [checkBoxControl]},
            {linkId: 'note', text: 'Note', type: 'string'}
          ]
        }]
      };
      await page.evaluate(({q, version}) =>
        (window as any).LForms.Util.addFormToPage(q, 'formContainer', {fhirVersion: version}),
        {q: questionnaire, version: fhirVersion});
      await byId(page, 'add-table/1').click();
      const row1 = twoStateInput(page, 'agree/1/1');
      const row2 = twoStateInput(page, 'agree/2/1');
      await expect(row2).toHaveCount(1);
      // each row's checkbox is named with the question text, without linking it to the header
      await expect(row1).toHaveAccessibleName('Agree');
      await expect(row2).toHaveAccessibleName('Agree');

      // the column header is the question text of the first row's item
      await byId(page, 'label-agree/1/1').click();

      await expect(row1).not.toBeChecked();
      await expect(row2).not.toBeChecked();
      const exported = await page.evaluate(version =>
        (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', version).item
          .map((row: any) => row.item.find((item: any) => item.linkId === 'agree').answer[0].valueBoolean),
        fhirVersion);
      expect(exported).toEqual([false, false]);
    });

    test('settles when a data control copies an unanswered value into a two-state checkbox', async ({ page }) => {
      const lformsForm = {
        lformsVersion: '30.0.0', name: 'Data control into a two-state checkbox', code: 'data-control-two-state',
        items: [
          {questionCode: 'source', linkId: '/source', question: 'Source', dataType: 'BL'},
          {questionCode: 'target', linkId: '/target', question: 'Target', dataType: 'BL',
            answerCardinality: {min: '1', max: '1'}, defaultAnswer: false,
            displayControl: {answerLayout: {type: 'CHECK_BOX'}},
            dataControl: [{source: {sourceType: 'INTERNAL', sourceLinkId: '/source'},
              construction: 'SIMPLE', dataFormat: 'value', onAttribute: 'value'}]}
        ]
      };
      await page.evaluate(form => (window as any).LForms.Util.addFormToPage(form, 'formContainer'), lformsForm);
      const target = twoStateInput(page, '/target/1');
      const targetValue = () => page.evaluate(() =>
        (window as any).LForms.Util._getFormObjectInScope('#formContainer').items[1].value);
      const countIdleUpdates = async () => {
        await page.evaluate(() => {
          const formData = (window as any).LForms.Util._getFormObjectInScope('#formContainer');
          const update = formData.updateOnSourceItemChange.bind(formData);
          (window as any).updateCount = 0;
          formData.updateOnSourceItemChange = (item: any) => {
            (window as any).updateCount++;
            return update(item);
          };
        });
        // allow time for any repeated updates to accumulate
        await page.waitForTimeout(1000);
        return page.evaluate(() => (window as any).updateCount);
      };

      await expect(target).not.toBeChecked();
      expect(await targetValue()).toBe(false);
      expect(await countIdleUpdates()).toBe(0);

      await byId(page, answerId('/source/1', 'true')).click();
      await expect(target).toBeChecked();
      await byId(page, answerId('/source/1', 'null')).click();
      await expect(target).not.toBeChecked();
      expect(await targetValue()).toBe(false);
      expect(await countIdleUpdates()).toBe(0);
    });

    test('exposes the required state to assistive technologies', async ({ page }) => {
      const radioGroup = (linkId: string) =>
        byId(page, answerId(`${linkId}/1`, 'true')).locator('xpath=ancestor::*[@role="radiogroup"]');

      // unchecked (false) already satisfies the requirement, so "required" would mislead
      await expect(twoStateInput(page, 'qualifying/1')).not.toHaveAttribute('aria-required');
      await expect(byId(page, answerId('no-initial/1', 'checkbox'))).toHaveAttribute('aria-required', 'true');
      await expect(byId(page, answerId('optional/1', 'checkbox'))).not.toHaveAttribute('aria-required');
      await expect(radioGroup('no-item-control')).toHaveAttribute('aria-required', 'true');
    });

    test('cycles and exports all three states for a non-qualifying check-box item', async ({ page }) => {
      const checkbox = byId(page, answerId('no-initial/1', 'checkbox'));

      await expect(checkbox).toHaveAccessibleName(/Required boolean without an initial value/);
      await expect(checkbox).toHaveAccessibleDescription('Not Answered');
      expect(await exportedBoolean(page, fhirVersion, 'no-initial')).toBeUndefined();

      await checkbox.click();
      await expectThreeStateCheckbox(page, 'no-initial', 'true', 'Yes');
      await expect(checkbox).toHaveClass(/lhc-boolean-checkbox-positive/);
      expect(await exportedBoolean(page, fhirVersion, 'no-initial')).toBe(true);

      await checkbox.click();
      await expectThreeStateCheckbox(page, 'no-initial', 'false', 'No');
      await expect(checkbox).toHaveClass(/lhc-boolean-checkbox-negative/);
      expect(await exportedBoolean(page, fhirVersion, 'no-initial')).toBe(false);

      await checkbox.press('Space');
      await expectThreeStateCheckbox(page, 'no-initial', 'mixed', 'Not Answered');
      await expect(checkbox).toHaveClass(/lhc-boolean-checkbox-unanswered/);
      expect(await exportedBoolean(page, fhirVersion, 'no-initial')).toBeUndefined();
    });

    test('toggles and exports only true and false for the two-state checkbox', async ({ page }) => {
      const checkbox = twoStateInput(page, 'qualifying/1');

      await checkbox.check();
      expect(await exportedBoolean(page, fhirVersion, 'qualifying')).toBe(true);

      await checkbox.uncheck();
      expect(await exportedBoolean(page, fhirVersion, 'qualifying')).toBe(false);
    });

    test('does not change a two-state checkbox value when checking validity or exporting', async ({ page }) => {
      const checkbox = twoStateInput(page, 'qualifying-initial-true/1');
      await expect(checkbox).toBeChecked();

      // Direct writes to item.value are not supported, but they are the only way to
      // get an empty two-state value, to show that reading the form leaves it as is.
      await page.evaluate(() => {
        const formData = (window as any).LForms.Util._getFormObjectInScope('#formContainer');
        formData.items.find((entry: any) => entry.linkId === 'qualifying-initial-true').value = null;
      });
      // Trigger an Angular change-detection pass without changing an answer.
      // (Clicking this item's own label would toggle its checkbox.)
      await byId(page, 'label-plain-boolean/1').click();
      await expect(checkbox).not.toBeChecked();

      const result = await page.evaluate(version => {
        const win = window as any;
        const formData = win.LForms.Util._getFormObjectInScope('#formContainer');
        const item = formData.items.find((entry: any) => entry.linkId === 'qualifying-initial-true');
        const valueAfterRendering = item.value;
        const validityErrors = win.LForms.Util.checkValidity();
        const valueAfterValidation = item.value;
        win.LForms.Util.getUserData();
        const valueAfterUserData = item.value;
        const response = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', version);
        return {
          valueAfterRendering,
          validityErrors,
          valueAfterValidation,
          valueAfterUserData,
          exported: response.item.some((entry: any) => entry.linkId === 'qualifying-initial-true'),
          valueAfterExport: item.value
        };
      }, fhirVersion);
      expect(result).toEqual({
        valueAfterRendering: null,
        validityErrors: [
          'Qualifying two-state checkbox with initial true requires a value.',
          'Required boolean without an initial value requires a value.'
        ],
        valueAfterValidation: null,
        valueAfterUserData: null,
        exported: false,
        valueAfterExport: null
      });
    });

    test('normalizes an empty two-state checkbox value when lforms is notified of the change', async ({ page }) => {
      const lformsForm = {
        lformsVersion: '30.0.0', name: 'Notified two-state checkbox', code: 'notified-two-state',
        items: [
          {questionCode: 'source', linkId: '/source', question: 'Source', dataType: 'BL',
            answerCardinality: {min: '1', max: '1'}, defaultAnswer: true,
            displayControl: {answerLayout: {type: 'CHECK_BOX'}}},
          {questionCode: 'dependent', linkId: '/dependent', question: 'Shown when the source is answered',
            dataType: 'ST', skipLogic: {action: 'show',
              conditions: [{source: '/source', trigger: {exists: true}}]}}
        ]
      };
      await page.evaluate(form => (window as any).LForms.Util.addFormToPage(form, 'formContainer'), lformsForm);
      const source = twoStateInput(page, '/source/1');
      await expect(source).toBeChecked();

      const result = await page.evaluate(version => {
        const win = window as any;
        const formData = win.LForms.Util._getFormObjectInScope('#formContainer');
        const [sourceItem, dependentItem] = formData.items;
        const isShown = () => dependentItem._skipLogicStatus !== 'target-disabled';
        const shownBefore = isShown();
        sourceItem.value = null;
        formData.updateOnSourceItemChange(sourceItem);
        const response = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', version);
        return {
          shownBefore,
          sourceValue: sourceItem.value,
          // skip logic sees the normalized value, so the source still has an answer
          shownAfter: isShown(),
          validityErrors: win.LForms.Util.checkValidity(),
          exportedSource: response.item.find((entry: any) => entry.linkId === '/source').answer[0].valueBoolean
        };
      }, fhirVersion);
      expect(result).toEqual({
        shownBefore: true,
        sourceValue: false,
        shownAfter: true,
        validityErrors: null,
        exportedSource: false
      });
      await expect(source).not.toBeChecked();
    });

    test('normalizes every empty two-state checkbox value assigned by setRepeatingItems', async ({ page }) => {
      await byId(page, 'add-repeating-qualifying/1').click();
      await expect(twoStateInput(page, 'repeating-qualifying/1')).toBeChecked();
      await expect(twoStateInput(page, 'repeating-qualifying/2')).toBeChecked();

      const result = await page.evaluate(() => {
        const formData = (window as any).LForms.Util._getFormObjectInScope('#formContainer');
        const items = (linkId: string) => formData.itemList.filter((entry: any) => entry.linkId === linkId);
        // a repeating question, with a value for each existing repetition
        formData.setRepeatingItems(items('repeating-qualifying')[0], [null, null], [], 'review');
        // a non-repeating question, with no value
        formData.setRepeatingItems(items('qualifying-initial-true')[0], [], [], 'review');
        return {
          repeating: items('repeating-qualifying').map((entry: any) => entry.value),
          nonRepeating: items('qualifying-initial-true').map((entry: any) => entry.value),
          validityErrors: (window as any).LForms.Util.checkValidity()
        };
      });
      expect(result).toEqual({
        repeating: [false, false],
        nonRepeating: [false],
        validityErrors: ['Required boolean without an initial value requires a value.']
      });
      expect((await exportedRepeats(page, fhirVersion)).repeating).toEqual([false, false]);
      expect(await exportedBoolean(page, fhirVersion, 'qualifying-initial-true')).toBe(false);
      await expect(twoStateInput(page, 'repeating-qualifying/1')).not.toBeChecked();
      await expect(twoStateInput(page, 'repeating-qualifying/2')).not.toBeChecked();
      await expect(twoStateInput(page, 'qualifying-initial-true/1')).not.toBeChecked();
    });

    test('treats missing saved answers as false for two-state checkboxes', async ({ page }) => {
      // a saved response that has no answer for any of the checkbox items
      await loadWithSavedResponse(page, fhirVersion, [{linkId: 'no-item-control', answer: [{valueBoolean: true}]}]);

      // a two-state checkbox cannot show "not answered", so it is unchecked whatever its initial value
      for (const elementId of ['qualifying/1', 'qualifying-initial-true/1', 'group-qualifying-true/1/1',
        'group-qualifying-false/1/1', 'repeating-qualifying/1']) {
        await expect(twoStateInput(page, elementId)).not.toBeChecked();
      }
      expect(await exportedBoolean(page, fhirVersion, 'qualifying')).toBe(false);
      expect(await exportedBoolean(page, fhirVersion, 'qualifying-initial-true')).toBe(false);
      expect(await exportedRepeats(page, fhirVersion)).toEqual({
        groups: [{'group-qualifying-true': false, 'group-qualifying-false': false}],
        repeating: [false]
      });

      // the rule does not apply to three-state checkboxes, which can show "Not Answered"
      await expectThreeStateCheckbox(page, 'optional', 'mixed', 'Not Answered');
      await expectThreeStateCheckbox(page, 'no-initial', 'mixed', 'Not Answered');
      await expectThreeStateCheckbox(page, 'initial-expression', 'mixed', 'Not Answered');
      expect(await exportedBoolean(page, fhirVersion, 'optional')).toBeUndefined();
      expect(await exportedBoolean(page, fhirVersion, 'no-item-control')).toBe(true);
    });

    test('keeps saved answers for two-state checkboxes', async ({ page }) => {
      await loadWithSavedResponse(page, fhirVersion, [
        {linkId: 'qualifying', answer: [{valueBoolean: true}]},
        {linkId: 'qualifying-initial-true', answer: [{valueBoolean: false}]}
      ]);

      await expect(twoStateInput(page, 'qualifying/1')).toBeChecked();
      await expect(twoStateInput(page, 'qualifying-initial-true/1')).not.toBeChecked();
      expect(await exportedBoolean(page, fhirVersion, 'qualifying')).toBe(true);
      expect(await exportedBoolean(page, fhirVersion, 'qualifying-initial-true')).toBe(false);
    });

    test('does not export or validate a disabled two-state checkbox with no saved answer', async ({ page }) => {
      const questionnaire = {
        resourceType: 'Questionnaire',
        status: 'active',
        item: [
          {linkId: 'source', text: 'Source', type: 'boolean'},
          {linkId: 'target', text: 'Target', type: 'boolean', required: true,
            initial: [{valueBoolean: true}],
            enableWhen: [{question: 'source', operator: '=', answerBoolean: true}],
            extension: [{
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
              valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code: 'check-box'}]}
            }]}
        ]
      };
      const savedResponse = {
        resourceType: 'QuestionnaireResponse',
        status: 'in-progress',
        item: [{linkId: 'source', answer: [{valueBoolean: false}]}]
      };
      await page.evaluate(({q, qr, version}) => {
        const win = window as any;
        const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, version);
        return win.LForms.Util.addFormToPage(
          win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, version), 'formContainer');
      }, {q: questionnaire, qr: savedResponse, version: fhirVersion});
      await expect(byId(page, answerId('source/1', 'false')).locator('input[type="radio"]')).toBeChecked();
      const target = twoStateInput(page, 'target/1');
      await expect(target).toHaveCount(0);

      const disabledState = await page.evaluate(() => {
        const formData = (window as any).LForms.Util._getFormObjectInScope('#formContainer');
        const item = formData.itemList.find((entry: any) => entry.linkId === 'target');
        return {
          skipLogicStatus: item._skipLogicStatus,
          value: item.value,
          validityErrors: (window as any).LForms.Util.checkValidity()
        };
      });
      // the value is normalized like any other two-state checkbox, but a disabled item is not exported
      expect(disabledState).toEqual({skipLogicStatus: 'target-disabled', value: false, validityErrors: null});
      expect(await exportedBoolean(page, fhirVersion, 'target')).toBeUndefined();
      expect(await exportedBoolean(page, fhirVersion, 'source')).toBe(false);

      await byId(page, answerId('source/1', 'true')).click();
      await expect(target).toHaveCount(1);
      await expect(target).not.toBeChecked();
      expect(await exportedBoolean(page, fhirVersion, 'target')).toBe(false);
    });

    test('starts new repetitions of two-state checkboxes with their initial values', async ({ page }) => {
      // change the first repetitions so that copies of them would not match the initial values
      await twoStateInput(page, 'group-qualifying-true/1/1').uncheck();
      await twoStateInput(page, 'group-qualifying-false/1/1').check();
      await twoStateInput(page, 'repeating-qualifying/1').uncheck();
      await addRepeatsAndExpectInitialValues(page);

      expect(await exportedRepeats(page, fhirVersion)).toEqual({
        groups: [
          {'group-qualifying-true': false, 'group-qualifying-false': true, 'group-no-item-control': true},
          {'group-qualifying-true': true, 'group-qualifying-false': false}
        ],
        repeating: [false, true]
      });
      // the new repetitions have values, so only the unanswered no-initial item is reported
      expect(await page.evaluate(() => (window as any).LForms.Util.checkValidity()))
        .toEqual(['Required boolean without an initial value requires a value.']);
    });

    test('starts new repetitions of two-state checkboxes with their initial values on a saved form', async ({ page }) => {
      await loadWithSavedResponse(page, fhirVersion, [{linkId: 'no-item-control', answer: [{valueBoolean: true}]}]);
      await addRepeatsAndExpectInitialValues(page);

      expect(await exportedRepeats(page, fhirVersion)).toEqual({
        groups: [
          {'group-qualifying-true': false, 'group-qualifying-false': false},
          {'group-qualifying-true': true, 'group-qualifying-false': false}
        ],
        repeating: [false, true]
      });
    });

    test('preserves explicit item-control codes when exporting the Questionnaire', async ({ page }) => {
      const questionnaire = await page.evaluate(version =>
        (window as any).LForms.Util.getFormFHIRData('Questionnaire', version), fhirVersion);
      const itemControlCode = (linkId: string) => questionnaire.item
        .find((item: any) => item.linkId === linkId)
        .extension?.find((extension: any) => extension.url ===
          'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl')
        ?.valueCodeableConcept.coding[0].code;

      expect(itemControlCode('qualifying')).toBe('check-box');
      expect(itemControlCode('qualifying-initial-true')).toBe('check-box');
      expect(itemControlCode('optional')).toBe('check-box');
      expect(itemControlCode('no-initial')).toBe('check-box');
      expect(itemControlCode('initial-expression')).toBe('check-box');
      expect(itemControlCode('repeating-qualifying')).toBe('check-box');
      expect(itemControlCode('radio-button')).toBe('radio-button');
      expect(itemControlCode('no-item-control')).toBeUndefined();
      expect(itemControlCode('plain-boolean')).toBeUndefined();
    });
  });
}

/**
 * Assert that a boolean item is rendered as a group of three radio buttons
 * (true / false / not-answered), and that selecting each option sets (or, for
 * "not answered", clears) the boolean value correctly in the exported
 * QuestionnaireResponse.
 * @param page - The Playwright page instance, with the form already loaded.
 */
async function testThreeStateRadioButtons(page: Page): Promise<void> {
  const yesOption = byId(page, answerId('1/1', 'true'));
  const noOption = byId(page, answerId('1/1', 'false'));
  const notAnsweredOption = byId(page, answerId('1/1', 'null'));

  await expect(page.locator('input[type="radio"]')).toHaveCount(3);
  await expect(page.locator('[role="checkbox"]')).toHaveCount(0);

  await yesOption.click();
  await expect(yesOption.locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
  let questionnaireResponse = await page.evaluate(() =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
  expect(questionnaireResponse.item[0].answer[0].valueBoolean).toBe(true);

  await noOption.click();
  await expect(noOption.locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
  await expect(yesOption.locator('span.ant-radio')).not.toHaveClass(/ant-radio-checked/);
  questionnaireResponse = await page.evaluate(() =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
  expect(questionnaireResponse.item[0].answer[0].valueBoolean).toBe(false);

  await notAnsweredOption.click();
  await expect(notAnsweredOption.locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
  await expect(noOption.locator('span.ant-radio')).not.toHaveClass(/ant-radio-checked/);
  questionnaireResponse = await page.evaluate(() =>
    (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4'));
  expect(questionnaireResponse.item).toBeUndefined();
}

test.describe('Boolean item control rendering', () => {
  test.describe('No item control (default)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'default-boolean.json', 'formContainer', { fhirVersion: 'R4' });
    });

    test('should render as radio buttons and set the boolean value correctly', async ({ page }) => {
      await testThreeStateRadioButtons(page);
    });

    test('should not add an itemControl extension when exporting the Questionnaire', async ({ page }) => {
      const questionnaire = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
      const itemControl = questionnaire.item[0].extension?.find(
        (extension: any) => extension.url ===
          'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');

      expect(itemControl).toBeUndefined();
    });
  });

  test.describe('Radio-button item control', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'radio-button-boolean.json', 'formContainer', { fhirVersion: 'R4' });
    });

    test('should render as radio buttons and set the boolean value correctly', async ({ page }) => {
      await testThreeStateRadioButtons(page);
    });

    test('should preserve the radio-button item control when exporting the Questionnaire', async ({ page }) => {
      const questionnaire = await page.evaluate(() =>
        (window as any).LForms.Util.getFormFHIRData('Questionnaire', 'R4'));
      const itemControl = questionnaire.item[0].extension.find(
        (extension: any) => extension.url ===
          'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl');

      expect(itemControl.valueCodeableConcept.coding[0].code).toBe('radio-button');
    });
  });
});
