import { test, expect, type Locator } from '@playwright/test';
import { addFormToPage, byId, openFormByIndex, waitForLFormsReady } from '../support/lforms-helpers';

/**
 * Assert that matching rows have no tree classes, indentation, or generated branches.
 * @param items Locator matching item rows to inspect.
 * @returns A promise resolving when every matched row satisfies the layout assertions.
 */
async function expectNoTreeOrIndentation(items: Locator): Promise<void> {
  for (const row of await items.all()) {
    await expect(row).not.toHaveClass(/\blhc-tree-line\b|\blhc-indentation\b/);
    await expect(row).toHaveCSS('padding-left', '0px');
    await expect.poll(() => row.evaluate(element => [
      getComputedStyle(element, '::before').content,
      getComputedStyle(element, '::after').content
    ])).toEqual(['none', 'none']);
  }
}

test.describe('tree lines', () => {
  test('should show the last items correctly as a sub-items', async ({ page }) => {
    // FormBuilder is at index 5 in the form list
    await openFormByIndex(page, 5);

    const treeItem1 = '/questionHeaderC/answersC/textC/1/1/1';
    const treeItem2 = '/questionHeaderC/formulaC/1/1';

    await expect(byId(page, treeItem1)).toBeVisible();
    await expect(byId(page, treeItem2)).toBeVisible();
  });

  for (const tabLayout of ['horizontal', 'vertical'] as const) {
    for (const showTabHeader of [false, true]) {
      test(`should never indent or draw tree lines on the first level of the form or any tab with ${tabLayout} tabs and headers ${showTabHeader ? 'shown' : 'hidden'}`, async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'tab-layout-answer-alignment.json', 'formContainer', {
          fhirVersion: 'R4', tabLayout, showTabHeader, hideTreeLine: false, hideIndentation: false
        });

        // Include both ordinary group descendants and question descendants in a tab.
        await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
          const questionnaire = JSON.parse(JSON.stringify(element.questionnaire));
          questionnaire.item[1].item[0].item.push({
            type: 'group', linkId: 'ordinaryGroup', text: 'An ordinary group', item: [{
              type: 'string', linkId: 'groupQuestion', text: 'A question inside the group', item: [{
                type: 'string', linkId: 'childQuestion', text: 'A child of the question'
              }]
            }]
          }, {type: 'string', linkId: 'qAfterNested', text: 'Question after nested tabs'});
          return new Promise<void>(resolve => {
            element.addEventListener('onFormReady', () => resolve(), {once: true});
            element.questionnaire = questionnaire;
            // Supply the complete configuration again for this new load.
            element.options = {...element.options};
          });
        });

        // The first level contains questions before/after a group holding tabs.
        const topLevelItems = page.locator('#formContainer .lhc-form-body > lhc-item');
        await expect(topLevelItems).toHaveCount(3);
        const tabRootItems = page.locator('#formContainer .ant-tabs-tabpane > lhc-group-vertical > .lhc-item-group-body > lhc-item');
        await expect(tabRootItems).toHaveCount(5);
        const deeperItems = page.locator('#formContainer lhc-item[id^="item-groupQuestion/"], #formContainer lhc-item[id^="item-childQuestion/"]');
        await expect(deeperItems).toHaveCount(2);

        for (const options of [
          {hideTreeLine: false, hideIndentation: false},
          {hideTreeLine: true, hideIndentation: false},
          {hideTreeLine: 'true', hideIndentation: false},
          {hideTreeLine: 'auto', hideIndentation: false},
          {hideTreeLine: false, hideIndentation: true},
          {hideTreeLine: false, hideIndentation: false}
        ]) {
          await page.locator('#formContainer wc-lhc-form').evaluate((element: any, options) => {
            element.options = options;
          }, options);

          await expectNoTreeOrIndentation(topLevelItems);
          await expectNoTreeOrIndentation(tabRootItems);
          for (const pane of await page.locator('#formContainer .ant-tabs-tabpane-active').all()) {
            await expect(pane).toHaveCSS('padding-left',
              options.hideIndentation ? '0px' : tabLayout === 'horizontal' ? '24px' : '12px');
          }

          // Only direct tab children reset the level; ordinary descendants keep their layout.
          if (options.hideIndentation) {
            await expect(page.locator('#formContainer .lhc-indentation, #formContainer .lhc-tree-line'))
              .toHaveCount(0);
            await expectNoTreeOrIndentation(deeperItems);
          } else {
            for (const child of await deeperItems.all()) {
              await expect(child).toHaveClass(/\blhc-indentation\b/);
              await expect(child).toHaveCSS('padding-left', '24px');
            }
            if (options.hideTreeLine === true || options.hideTreeLine === 'true') {
              await expect(page.locator('#formContainer .lhc-tree-line')).toHaveCount(0);
              for (const child of await deeperItems.all()) {
                await expect.poll(() => child.evaluate(element => [
                  getComputedStyle(element, '::before').content,
                  getComputedStyle(element, '::after').content
                ])).toEqual(['none', 'none']);
              }
            } else {
              for (const child of await deeperItems.all()) {
                await expect(child).toHaveClass(/\blhc-tree-line\b/);
                // The branch must align with its trunk and fit the indentation.
                await expect.poll(() => child.evaluate(element => {
                  const horizontal = getComputedStyle(element, '::before');
                  const vertical = getComputedStyle(element, '::after');
                  return Math.max(
                    Math.abs(parseFloat(horizontal.left) - parseFloat(vertical.left)),
                    Math.abs(parseFloat(horizontal.left) + parseFloat(horizontal.width) -
                      parseFloat(getComputedStyle(element).paddingLeft))
                  );
                })).toBeLessThan(1);
              }
            }
          }
        }

        // Newly selected panes must also start without indentation or tree lines.
        const tabsets = page.locator('#formContainer nz-tabset');
        await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
          element.options = {hideTreeLine: false, hideIndentation: false};
        });
        await tabsets.nth(1).locator(':scope > .ant-tabs-nav').getByRole('tab').nth(1).click();
        await expect(byId(page, 'nestedQ2/1/1/1/1/1')).toBeVisible();
        await expectNoTreeOrIndentation(tabRootItems);
        await tabsets.first().locator(':scope > .ant-tabs-nav').getByRole('tab').nth(1).click();
        await expect(byId(page, 'q2/1/1/1')).toBeVisible();
        await expectNoTreeOrIndentation(tabRootItems);
      });
    }
  }
});
