import { test, expect } from '@playwright/test';
import { addFormToPage, byId, openFormByIndex, waitForLFormsReady } from '../support/lforms-helpers';

test.describe('508', () => {
  const heightField = '/54126-8/8302-2/1/1';
  const heightLabel = 'label[for="/54126-8/8302-2/1/1"]';
  const readerLogEntries = '#reader_log p';

  async function resetReaderLog(page) {
    await page.evaluate(() => {
      const el = document.getElementById('reader_log');
      if (el) {
        el.innerHTML = '';
        el.style.height = 'auto';
        el.style.width = 'auto';
        el.style.top = 'auto';
        el.style.left = 'auto';
      }
    });
  }

  async function expectReaderLogEntries(page, expectedEntries: string[]) {
    await expect(page.locator(readerLogEntries)).toHaveCount(expectedEntries.length);
    for (let i = 0; i < expectedEntries.length; i++) {
      await expect(page.locator(readerLogEntries).nth(i)).toHaveText(expectedEntries[i]);
    }
  }

  async function expectReaderLogEntriesEmpty(page) {
    await expect(page.locator(readerLogEntries)).toHaveCount(0);
  }

  test.describe('screen reader log', () => {
    test('should work for skip logic show/hide', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await resetReaderLog(page);

      // should be empty when the form loads
      await expectReaderLogEntriesEmpty(page);

      // should contain an entry when skip logic shows a field
      await byId(page, heightField).pressSequentially('10');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10']);

      // should not add an extra entry if the field is already showing
      await byId(page, heightField).pressSequentially('2');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10']);

      // should contain an entry when skip logic hides a field
      await byId(page, heightField).press('Backspace');
      await byId(page, heightField).press('Backspace');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10',
          'Hiding Mock-up item: Shown when Height >= 10']);

      // should not add an extra entry if the field is already hidden
      await byId(page, heightField).press('Backspace');
      await expectReaderLogEntries(page,
        ['Showing Mock-up item: Shown when Height >= 10',
          'Hiding Mock-up item: Shown when Height >= 10',
          'Height requires a value.']);
    });

    test('should add an entry when a section is added or removed', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // Add a section
      await byId(page, 'add-/54126-8/54137-5/1/1').click();
      await expectReaderLogEntries(page, ['Added section']);
      // Remove the section
      const minusButtonCSS = 'button[title=\'Remove this "Your diseases history"\']';
      await page.locator(minusButtonCSS).first().click();
      await expectReaderLogEntries(page, ['Added section', 'Removed section']);
    });

    test('should add an entry when a row is added or removed', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // Add a row
      await byId(page, 'add-/54114-4/54117-7/1/1').click();
      await expectReaderLogEntries(page, ['Added row']);
      // Remove the row
      const minusButtonCSS =
        'button[title="Remove this row of \\"This family member\'s history of disease\\""]';
      await page.locator(minusButtonCSS).first().click();
      await expectReaderLogEntries(page, ['Added row', 'Removed row']);
    });

    test('should add an entry when a question is added or removed', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      const addNameBtn = byId(page, 'add-/54126-8/54125-0/1/1');
      await addNameBtn.waitFor({ state: 'visible' });
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // Add a question
      await byId(page, '/54126-8/54125-0/1/1').pressSequentially('a name');
      await addNameBtn.click();
      await expectReaderLogEntries(page, ['Added question']);
      // Remove the question
      await page.locator('button[title=\'Remove this "Name"\']').first().click();
      await expectReaderLogEntries(page, ['Added question', 'Removed question']);
    });

    test('should add an entry when a multi-select subgroup is added or removed, only if it is shown', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multi-select-with-hidden-child-items.json', 'formContainer', { fhirVersion: 'R4' });
      await byId(page, 'case1-visible/1||a').waitFor({ state: 'visible' });
      await resetReaderLog(page);
      await expectReaderLogEntriesEmpty(page);

      // The sub item is visible.
      const case1Apple = byId(page, 'case1-visible/1||a');
      await case1Apple.click();
      await expectReaderLogEntries(page, ['Added Apple']);
      await case1Apple.click();
      await expectReaderLogEntries(page, ['Added Apple', 'Removed Sub items for checkbox option: Apple']);

      // The only sub item is hidden.
      const case2Apple = byId(page, 'case2-hidden/1||a');
      await case2Apple.click();
      await expect(case2Apple).toBeChecked();
      await case2Apple.click();
      await expect(case2Apple).not.toBeChecked();
      await expectReaderLogEntries(page, ['Added Apple', 'Removed Sub items for checkbox option: Apple']);

      // The child is enabled only while Apple is selected. Its subgroup is
      // shown when Apple is checked and hidden before it is removed when Apple
      // is unchecked, so both structural changes should still be announced.
      // The child's own "Showing"/"Hiding" messages are not announced, for
      // either the original child or the copy for Apple.
      await resetReaderLog(page);
      const case5Apple = byId(page, 'case5-enablewhen-parent/1||a');
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Added Apple']);
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Added Apple', 'Removed Sub items for checkbox option: Apple']);

      // Banana stays checked, so its subgroup is only shown or hidden as Apple
      // is checked or unchecked, and is not added or removed. The copy of the
      // child for the Apple subgroup removed above is not announced either.
      await resetReaderLog(page);
      await byId(page, 'case5-enablewhen-parent/1||b').click();
      await expect(byId(page, 'case5-enablewhen-parent/1||b')).toBeChecked();
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Showing sub items for Banana', 'Added Apple']);
      await case5Apple.click();
      await expectReaderLogEntries(page, ['Showing sub items for Banana', 'Added Apple',
        'Hiding sub items for Banana', 'Removed Sub items for checkbox option: Apple']);

      // The subgroup is initially hidden because its child is controlled by a
      // different question. It should be announced as shown or hidden when
      // that question changes, and as removed when Apple is unchecked.
      await resetReaderLog(page);
      const case4Apple = byId(page, 'case4-enablewhen-other/1||a');
      await case4Apple.click();
      await expect(case4Apple).toBeChecked();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Apple' })).toHaveCount(0);
      await byId(page, 'show-details/1|true').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Showing sub items for Apple' })).toHaveCount(1);
      await byId(page, 'show-details/1|false').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Hiding sub items for Apple' })).toHaveCount(1);
      await expect(case4Apple).toBeChecked();
      await byId(page, 'show-details/1|true').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Showing sub items for Apple' })).toHaveCount(2);
      await case4Apple.click();
      await expect(page.locator(readerLogEntries).filter({
        hasText: 'Removed Sub items for checkbox option: Apple'
      })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Added Apple' })).toHaveCount(0);

      // The only sub item is hidden, autocomplete.
      await resetReaderLog(page);
      const dropdown = byId(page, 'case6-autocomplete-hidden/1');
      await dropdown.click();
      await dropdown.press('ArrowDown');
      await dropdown.press('Enter');
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Selected Apple' })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Added' })).toHaveCount(0);

      // One child stays visible, so the subgroup stays shown, and the other
      // child's own message is announced. The original children are not
      // announced.
      await byId(page, 'show-details/1|false').click();
      await resetReaderLog(page);
      const case7Apple = byId(page, 'case7-enablewhen-mixed/1||a');
      await case7Apple.click();
      await expectReaderLogEntries(page, ['Added Apple']);
      await byId(page, 'show-details/1|true').click();
      await case7Apple.click();
      const case7Entries = ['Added Apple',
        "Showing How ripe? (enabled when 'Show follow-up questions' is Yes)",
        'Removed Sub items for checkbox option: Apple'];
      await expectReaderLogEntries(page, case7Entries);
    });


    for (const hasVisibleSibling of [false, true]) {
      // A whole subgroup transition gets one answer-specific message. If a
      // sibling stays visible, retain the conditional child's own message.
      test(`should announce dropdown visibility changes with ${hasVisibleSibling ? 'a visible sibling' : 'all children conditional'}`, async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await page.evaluate(async hasVisibleSibling => {
          const q = await fetch('/test/data/R4/multi-select-with-hidden-child-items.json').then(r => r.json());
          const item = q.item.find(i => i.linkId === 'case5-enablewhen-parent');
          item.extension[0].valueCodeableConcept.coding[0].code = 'drop-down';
          item.item[0].text = 'Details';
          if (hasVisibleSibling) {
            item.item.push({linkId: 'always-visible', text: 'Always visible', type: 'string'});
          }
          q.item = [item];
          await (window as any).LForms.Util.addFormToPage(q, 'formContainer', {fhirVersion: 'R4'});
        }, hasVisibleSibling);

        const dropdown = byId(page, 'case5-enablewhen-parent/1');
        const headings = page.locator('[id^="label-multi-select-subgroup"]');
        await dropdown.click();
        await dropdown.press('ArrowDown');
        await dropdown.press('ArrowDown');
        await dropdown.press('Enter');
        await expect(byId(page, 'item-case5-enablewhen-parent/1').locator('.autocomp_selected li'))
          .toContainText(['Banana']);
        await expect(headings).toHaveText(hasVisibleSibling ? ['Banana'] : []);
        await resetReaderLog(page);

        await dropdown.press('ArrowDown');
        await dropdown.press('Enter');
        await expect(headings).toHaveText(['Apple', 'Banana']);
        await expect(page.locator(readerLogEntries).filter({hasText: /^Showing /}))
          .toHaveText([hasVisibleSibling ? 'Showing Details' : 'Showing sub items for Banana']);
        await expect(page.locator(readerLogEntries).filter({hasText: 'Added Apple'})).toHaveCount(1);
        await resetReaderLog(page);

        await byId(page, 'item-case5-enablewhen-parent/1').locator('.autocomp_selected li', {hasText: 'Apple'})
          .locator('button').click();
        await expect(headings).toHaveText(hasVisibleSibling ? ['Banana'] : []);
        await expect(byId(page, 'item-case5-enablewhen-parent/1').locator('.autocomp_selected li'))
          .toContainText(['Banana']);
        await expect(page.locator(readerLogEntries).filter({hasText: /^Hiding /}))
          .toHaveText([hasVisibleSibling ? 'Hiding Details' : 'Hiding sub items for Banana']);
        await expect(page.locator(readerLogEntries).filter({hasText: 'Removed sub items for autocomplete option: Apple'}))
          .toHaveCount(1);
      });
    }

    test('should add an entry when an enableWhenExpression shows or hides a multi-select subgroup', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multi-select-with-enablewhenexpression-child-items.json', 'formContainer', { fhirVersion: 'R4' });
      await byId(page, 'case1-expression-other/1||a').waitFor({ state: 'visible' });
      await resetReaderLog(page);

      // The child is controlled by another question.
      const case1Apple = byId(page, 'case1-expression-other/1||a');
      await case1Apple.click();
      await expect(case1Apple).toBeChecked();
      await byId(page, 'show-details/1|true').click();
      await expectReaderLogEntries(page, ['Showing sub items for Apple']);
      await byId(page, 'show-details/1|false').click();
      await expectReaderLogEntries(page, ['Showing sub items for Apple', 'Hiding sub items for Apple']);
      await expect(case1Apple).toBeChecked();
      await byId(page, 'show-details/1|true').click();
      await case1Apple.click();
      await expectReaderLogEntries(page, ['Showing sub items for Apple', 'Hiding sub items for Apple',
        'Showing sub items for Apple', 'Removed Sub items for checkbox option: Apple']);

      // The child is enabled only while Apple is selected. Banana stays
      // checked, so its subgroup is only shown or hidden.
      await resetReaderLog(page);
      const case2Banana = byId(page, 'case2-expression-parent/1||b');
      await case2Banana.click();
      await expect(case2Banana).toBeChecked();
      const case2Apple = byId(page, 'case2-expression-parent/1||a');
      await case2Apple.click();
      await expectReaderLogEntries(page, ['Added Apple', 'Showing sub items for Banana']);
      await case2Apple.click();
      await expectReaderLogEntries(page, ['Added Apple', 'Showing sub items for Banana',
        'Removed Sub items for checkbox option: Apple', 'Hiding sub items for Banana']);

      // The same, with autocomplete.
      await resetReaderLog(page);
      const dropdown = byId(page, 'case3-autocomplete-expression-parent/1');
      await dropdown.click();
      await dropdown.press('ArrowDown');
      await dropdown.press('ArrowDown');
      await dropdown.press('Enter');
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Selected Banana' })).toHaveCount(1);
      await dropdown.press('ArrowDown');
      await dropdown.press('Enter');
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Showing sub items for Banana' })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Added Apple' })).toHaveCount(1);
      await page.locator('#item-case3-autocomplete-expression-parent\\/1 .autocomp_selected li', { hasText: 'Apple' })
        .locator('button').click();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Hiding sub items for Banana' })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({
        hasText: 'Removed sub items for autocomplete option: Apple'
      })).toHaveCount(1);
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Added Banana' })).toHaveCount(0);
    });


    test('should add one entry when a calculated value shows or hides a multi-select subgroup', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multi-select-with-calculated-child-items.json', 'formContainer', { fhirVersion: 'R4' });
      await byId(page, 'case1-calculated-other/1||a').waitFor({ state: 'visible' });
      await resetReaderLog(page);

      // The child is controlled by a calculated value that depends on another
      // question. The value is set while FHIRPath expressions run, which
      // starts another round of form updates before the expressions finish.
      const case1Apple = byId(page, 'case1-calculated-other/1||a');
      await case1Apple.click();
      await expect(case1Apple).toBeChecked();
      await expect(page.locator(readerLogEntries).filter({ hasText: 'Apple' })).toHaveCount(0);
      await resetReaderLog(page);
      const number = byId(page, 'number/1');
      await number.fill('10');
      await number.press('Tab');
      await expect(byId(page, 'case1-child/1/multi-select-subgroup||a/1')).toBeVisible();
      const case1Shown = ['Set values for question', 'Showing sub items for Apple'];
      await expectReaderLogEntries(page, case1Shown);
      await number.fill('1');
      await number.press('Tab');
      await expect(byId(page, 'case1-child/1/multi-select-subgroup||a/1')).toHaveCount(0);
      const case1Hidden = case1Shown.concat(['Set values for question', 'Hiding sub items for Apple']);
      await expectReaderLogEntries(page, case1Hidden);
      // Wait for any late messages from the end of the expression run.
      await page.waitForTimeout(500);
      expect(await page.locator(readerLogEntries).allTextContents()).toEqual(case1Hidden);

      // The child is controlled by a calculated value that is true when Apple
      // is selected. The subgroup is hidden when it is added, and is shown by
      // the calculated value, so it is announced as added.
      await resetReaderLog(page);
      const case2Apple = byId(page, 'case2-calculated-parent/1||a');
      await case2Apple.click();
      await expect(byId(page, 'case2-child/1/multi-select-subgroup||a/1')).toBeVisible();
      const case2Added = ['Set values for question', 'Added Apple'];
      await expectReaderLogEntries(page, case2Added);
      await case2Apple.click();
      await expect(byId(page, 'case2-child/1/multi-select-subgroup||a/1')).toHaveCount(0);
      const case2Removed = case2Added.concat(['Removed  Sub items for checkbox option: Apple', 'Set values for question']);
      await expectReaderLogEntries(page, case2Removed);
      await page.waitForTimeout(500);
      expect(await page.locator(readerLogEntries).allTextContents()).toEqual(case2Removed);
    });

    test('should discard item messages when a newly copied subgroup stays hidden', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'multi-select-with-hidden-child-items.json', 'formContainer', { fhirVersion: 'R4' });

      const result = await page.evaluate(() => {
        const form = (window as any).LForms.Util._getFormObjectInScope('#formContainer');
        const parent = form.items.find(item => item.linkId === 'case4-enablewhen-other');
        // Exercise the defensive cleanup: a copied template's cached status
        // can differ from the status calculated for its new subgroup.
        parent.items[0]._skipLogicStatus = 'target-enabled';
        parent.value = [parent.answers[0]];
        form._actionLogs = [];
        form.addSubItemsForMultiSelect(parent, parent.value[0]);
        const subgroup = parent.items.find(item => item.isSubGroupForMultiSelect);
        return {
          shown: form._getMultiSelectSubGroupVisibility().get(subgroup),
          childStatus: subgroup.items[0]._skipLogicStatus,
          messages: form._actionLogs
        };
      });
      expect(result.shown).toBe(false);
      expect(result.childStatus).toBe('target-disabled');
      expect(result.messages).toEqual([]);
    });

    for (const layout of ['check-box', 'autocomplete']) {
      test(`should not announce nested subgroup visibility when its ${layout} ancestor is removed`, async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await page.evaluate(async layout => {
          const control = (code: string) => ({
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {coding: [{system: 'http://hl7.org/fhir/questionnaire-item-control', code}]}
          });
          await (window as any).LForms.Util.addFormToPage({
            resourceType: 'Questionnaire', status: 'draft',
            item: [{linkId: 'details', text: 'Show details?', type: 'boolean', initial: [{valueBoolean: true}]}, {
              linkId: 'outer', text: 'Fruits', type: 'choice', repeats: true,
              extension: [control(layout)],
              answerOption: [{valueCoding: {code: 'a', display: 'Apple'}}],
              item: [{
                linkId: 'inner', text: 'Size', type: 'choice', repeats: true,
                extension: [control('check-box')],
                answerOption: [{valueCoding: {code: 's', display: 'Small'}}],
                item: [{
                  linkId: 'leaf', text: 'How many?', type: 'string',
                  enableBehavior: 'all',
                  enableWhen: [{question: 'outer', operator: '=', answerCoding: {code: 'a'}},
                    {question: 'details', operator: '=', answerBoolean: true}]
                }]
              }]
            }]
          }, 'formContainer', {fhirVersion: 'R4'});
        }, layout);

        const outer = byId(page, 'outer/1');
        if (layout === 'check-box') {
          await byId(page, 'outer/1||a').click();
        } else {
          await outer.click();
          await outer.press('ArrowDown');
          await outer.press('Enter');
        }
        await byId(page, 'inner/1/multi-select-subgroup||a/1||s').click();
        await expect(page.locator('input[id^="leaf/"]')).toBeVisible();
        await resetReaderLog(page);

        // Visibility changes of a nested subgroup are still announced while
        // its containing answer remains selected.
        await byId(page, 'details/1|false').click();
        await expectReaderLogEntries(page, ['Hiding sub items for Small']);
        await byId(page, 'details/1|true').click();
        await expectReaderLogEntries(page, ['Hiding sub items for Small', 'Showing sub items for Small']);
        await resetReaderLog(page);

        if (layout === 'check-box') {
          await byId(page, 'outer/1||a').click();
        } else {
          await byId(page, 'item-outer/1').locator('.autocomp_selected li button').click();
        }
        await expect(page.locator('input[id^="leaf/"]')).toHaveCount(0);
        await expect(page.locator(readerLogEntries).filter({hasText: /sub items/i}))
          .toHaveText([layout === 'check-box' ?
            'Removed Sub items for checkbox option: Apple' : 'Removed sub items for autocomplete option: Apple']);
      });
    }

  });

  test.describe('field labels', () => {
    test('should be present on the questions in the vertical template', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      await expect(page.locator(heightLabel)).toBeVisible();
    });

    test('should be present on the questions in the horizontal template', async ({ page }) => {
      await openFormByIndex(page, 2); // USSGFHTHorizontal
      await expect(page.locator(heightLabel)).toBeVisible();
    });
  });
});
