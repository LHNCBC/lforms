import { test, expect } from '@playwright/test';
import { byId, waitForLFormsReady, addFormToPage, loadFromTestData } from '../support/lforms-helpers';

test.describe('Tab Layout', () => {
  test('should render tab layout', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', { fhirVersion: 'R4' });
    const q1 = byId(page, 'q1/1/1/1');
    const q2 = byId(page, 'q2/1/1/1');
    await expect(q1).toBeVisible();
    await expect(q2).not.toBeAttached();
    await expect(page.locator('#formContainer .lhc-item-group-title')).toHaveCount(0);
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(q1).not.toBeVisible();
    await expect(q2).toBeVisible();
  });

  test('should apply tab options selected on the upload test page', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await page.locator('#tabLayoutVertical').check();
    await page.locator('#tabAnswerAlignmentContent').check();
    await page.locator('#showTabHeader').check();
    await page.locator('#stickyTabs').check();
    await loadFromTestData(page, 'tab-layout.json', 'R4');

    await expect(page.locator('#test-form .ant-tabs-left')).toHaveCount(1);
    await expect(page.locator('#test-form .ant-tabs-tabpane-active .lhc-item-group-title')).toContainText('Tab One');
    await expect(page.locator('#test-form nz-tabset.lhc-tabs-sticky')).toHaveCount(1);
    await expect.poll(() => page.locator('#test-form nz-tabset').evaluate(element =>
      parseFloat((element as HTMLElement).style.getPropertyValue('--lhc-tab-content-answer-width'))
    )).toBeGreaterThan(0);

    // check that selected options are correctly used when loading another questionnaire
    await page.evaluate(() => {
      (window as any).secondTabFormReady = false;
      document.querySelector('#test-form').addEventListener('onFormReady', () => {
        (window as any).secondTabFormReady = true;
      }, {once: true});
    });
    await loadFromTestData(page, 'tab-layout.json', 'R4');
    await page.waitForFunction(() => (window as any).secondTabFormReady);

    await expect(page.locator('#test-form .ant-tabs-left')).toHaveCount(1);
    await expect(page.locator('#test-form .ant-tabs-tabpane-active .lhc-item-group-title')).toContainText('Tab One');
    await expect(page.locator('#test-form nz-tabset.lhc-tabs-sticky')).toHaveCount(1);
    await expect.poll(() => page.locator('#test-form nz-tabset').evaluate(element =>
      parseFloat((element as HTMLElement).style.getPropertyValue('--lhc-tab-content-answer-width'))
    )).toBeGreaterThan(0);

    // Returning upload controls to their defaults must explicitly replace the
    // previous component overrides when another file is loaded.
    await page.locator('#tabLayoutHorizontal').check();
    await page.locator('#tabAnswerAlignmentForm').check();
    await page.locator('#showTabHeader').uncheck();
    await page.locator('#stickyTabs').uncheck();
    await loadFromTestData(page, 'tab-layout.json', 'R4');
    await expect(page.locator('#test-form nz-tabset')).toHaveClass(/ant-tabs-top/);
    await expect(page.locator('#test-form nz-tabset')).not.toHaveClass(/lhc-tabs-sticky/);
    await expect(page.locator('#test-form .ant-tabs-tabpane-active .lhc-item-group-title')).toHaveCount(0);
    await expect.poll(() => page.locator('#test-form').evaluate((element: any) =>
      element.lhcFormData.templateOptions.tabAnswerAlignment
    )).toBe('form');
  });

  test('should preserve native form tab defaults when upload controls remain at their defaults', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    const definition = await page.evaluate(async () => {
      const questionnaire = await fetch('/test/data/R4/tab-layout.json').then(response => response.json());
      const definition = (window as any).LForms.FHIR.R4.SDC.convertQuestionnaireToLForms(questionnaire);
      definition.templateOptions = {tabLayout: 'vertical', stickyTabs: true, showTabHeader: true};
      return definition;
    });
    await page.locator('#fileAnchor').setInputFiles({
      name: 'native-tab-defaults.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(definition))
    });

    await expect(page.locator('#test-form nz-tabset')).toHaveClass(/ant-tabs-left/);
    await expect(page.locator('#test-form nz-tabset')).toHaveClass(/lhc-tabs-sticky/);
    await expect(page.locator('#test-form .ant-tabs-tabpane-active .lhc-item-group-title')).toHaveText('Tab One');
  });

  (['horizontal', 'vertical'] as const).forEach(initialLayout => {
    test(`should expose tablist orientation for nested tabs initially using ${initialLayout} layout`, async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'tab-layout-nested-layout.json', 'formContainer', {
        fhirVersion: 'R4', tabLayout: initialLayout
      });
      const tablists = page.locator('#formContainer [role="tablist"]');
      await expect(tablists).toHaveCount(1);
      await expect(tablists.first()).toHaveAttribute('aria-orientation', initialLayout);
      // The nested tabset is created only when its outer tab is first opened.
      await tablists.first().getByRole('tab').nth(1).click();
      await expect(tablists).toHaveCount(2);
      const session = await page.context().newCDPSession(page);

      for (const [index, layout] of [initialLayout, 'horizontal', 'vertical', 'invalid', 'vertical'].entries()) {
        if (index > 0) {
          await page.locator('#formContainer wc-lhc-form').evaluate((element: any, tabLayout) => {
            element.options = {tabLayout};
          }, layout);
        }
        const orientation = layout === 'vertical' ? 'vertical' : 'horizontal';
        for (const tablist of await tablists.all()) {
          await expect(tablist).toHaveAttribute('aria-orientation', orientation);
        }
        // Verify the computed accessibility properties, not only the DOM
        // attributes, so assistive technology receives the same orientation.
        await expect.poll(async () => {
          const {nodes} = await session.send('Accessibility.getFullAXTree');
          return nodes.filter(node => !node.ignored && node.role?.value === 'tablist')
            .map(node => node.properties?.find(property => property.name === 'orientation')?.value.value);
        }).toEqual([orientation, orientation]);
      }
      const nestedTabs = tablists.nth(1).getByRole('tab');
      await nestedTabs.first().focus();
      await nestedTabs.first().press('ArrowDown');
      await expect(nestedTabs.nth(1)).toBeFocused();
      await nestedTabs.nth(1).press('Enter');
      await expect(byId(page, 'q2/1/1/1/1/1')).toBeVisible();
      await session.detach();
    });
  });

  test('should default showTabContainerText to false and apply the upload checkbox', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    const checkbox = page.locator('#showTabContainerText');
    await expect(checkbox).not.toBeChecked();

    for (const enabled of [false, true, false]) {
      await checkbox.setChecked(enabled);
      await loadFromTestData(page, 'tab-layout-container-text.json', 'R4');
      await expect.poll(() => page.locator('#test-form').evaluate((element: any) =>
        element.lhcFormData?.templateOptions.showTabContainerText
      )).toBe(enabled);
      await expect(page.locator('#test-form .lhc-tab-container-text')).toHaveCount(enabled ? 2 : 0);
    }
  });

  for (const tabLayout of ['horizontal', 'vertical'] as const) {
    test(`should show ${tabLayout} container text with orientation-specific indentation`, async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'tab-layout-container-text.json', 'formContainer', {
        fhirVersion: 'R4', tabLayout, hideTreeLine: false
      });
      const form = page.locator('#formContainer');
      const containers = form.locator('.lhc-tab-container-text');
      const headers = form.locator('.lhc-item-group-title:not(.lhc-tab-container-text)');
      const tabsets = form.locator('nz-tabset');
      const contentIndent = tabLayout === 'horizontal' ? '24px' : '12px';
      await expect(tabsets).toHaveCount(2);
      await expect(containers).toHaveCount(0);
      await expect(tabsets.first()).toHaveCSS('padding-left', '0px');
      await expect(tabsets.nth(1)).toHaveCSS('padding-left', '0px');
      const navPositions = await tabsets.evaluateAll(elements => elements.map(element =>
        element.querySelector(':scope > .ant-tabs-nav')!.getBoundingClientRect().left
      ));
      if (tabLayout === 'horizontal') {
        // Each tab's questions sit one level below its navigation.
        const outerQuestion = page.locator('#formContainer lhc-item[id^="item-q1/"]');
        const nestedQuestion = page.locator('#formContainer lhc-item[id^="item-nestedQ1/"]');
        await expect.poll(() => outerQuestion.evaluate((element, navLeft) =>
          Math.abs(element.getBoundingClientRect().left - navLeft - 24), navPositions[0]
        )).toBeLessThan(1);
        await expect.poll(() => nestedQuestion.evaluate((element, navLeft) =>
          Math.abs(element.getBoundingClientRect().left - navLeft - 24), navPositions[1]
        )).toBeLessThan(1);
        expect(Math.abs(navPositions[1] - navPositions[0] - 24)).toBeLessThan(1);
      }

      await form.locator('wc-lhc-form').evaluate((element: any) => {
        element.options = {showTabContainerText: true};
      });
      await expect(containers).toHaveText(['Outer tab container', 'Nested tab container']);
      await expect(headers).toHaveCount(0);
      await expect.poll(() => tabsets.evaluateAll((elements, before) => Math.max(...elements.map((element, index) =>
        Math.abs(element.querySelector(':scope > .ant-tabs-nav')!.getBoundingClientRect().left - before[index])
      )), navPositions)).toBeLessThan(1);
      for (const tabset of await tabsets.all()) {
        await expect(tabset).toHaveCSS('padding-left', '0px');
        const pane = tabset.locator(':scope > .ant-tabs-content-holder > .ant-tabs-content > .ant-tabs-tabpane-active');
        await expect(pane).toHaveCSS('padding-left', contentIndent);
        if (tabLayout === 'vertical') {
          await expect.poll(() => pane.evaluate(element => {
            const firstItem = element.querySelector(':scope > lhc-group-vertical > .lhc-item-group-body > lhc-item')!;
            return Math.abs(firstItem.getBoundingClientRect().left - element.getBoundingClientRect().left - 12);
          })).toBeLessThan(1);
        }
        await expect.poll(() => tabset.evaluate(element => {
          const nav = element.querySelector(':scope > .ant-tabs-nav')!;
          return nav.getBoundingClientRect().left - element.getBoundingClientRect().left;
        })).toBe(0);
      }
      // Container text never introduces lines or item indentation at a tab's first level.
      await expect(form.locator('.lhc-tree-line, .lhc-indentation')).toHaveCount(0);

      await form.locator('wc-lhc-form').evaluate((element: any) => {
        element.options = {showTabHeader: true};
      });
      await expect(headers).toHaveText(['Tab One', 'Nested Tab One']);
      await expect(containers).toHaveCount(2);
      await form.locator('wc-lhc-form').evaluate((element: any) => {
        element.options = {showTabContainerText: false};
      });
      await expect(containers).toHaveCount(0);
      await expect(headers).toHaveCount(2);
      await expect(tabsets.first()).toHaveCSS('padding-left', '0px');
      await expect(tabsets.nth(1)).toHaveCSS('padding-left', '0px');

      // Only boolean true enables container text; hideIndentation still controls its inset.
      await form.locator('wc-lhc-form').evaluate((element: any) => {
        element.options = {showTabContainerText: 'true'};
      });
      await expect(containers).toHaveCount(0);
      await form.locator('wc-lhc-form').evaluate((element: any) => {
        element.options = {showTabContainerText: true, hideIndentation: true};
      });
      await expect(containers).toHaveCount(2);
      for (const tabset of await tabsets.all()) {
        await expect(tabset).toHaveCSS('padding-left', '0px');
        await expect(tabset.locator(':scope > .ant-tabs-content-holder > .ant-tabs-content > .ant-tabs-tabpane-active'))
          .toHaveCSS('padding-left', '0px');
      }
      await expect(form.locator('.lhc-tree-line, .lhc-indentation')).toHaveCount(0);
    });
  }

  test('should keep outer tabs at level zero without an empty header when container text is missing', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', showTabContainerText: true
    });
    await expect(page.locator('#formContainer .lhc-tab-container-text')).toHaveCount(0);
    await expect(page.locator('#formContainer nz-tabset')).toHaveCSS('padding-left', '0px');
    await expect(page.locator('#formContainer .ant-tabs-tabpane-active')).toHaveCSS('padding-left', '24px');
  });

  test('should retain partial component overrides while respecting replacement native form defaults', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    const definition = {
      name: 'Native tab form',
      templateOptions: {
        tabLayout: 'horizontal', showTabHeader: false, showTabContainerText: false, stickyTabs: false,
        hideTreeLine: true
      },
      items: [{
        linkId: 'container', questionCode: 'container', question: 'Native container',
        dataType: 'SECTION', header: true, displayControl: {questionLayout: 'tabs'},
        items: [{
          linkId: 'tab', questionCode: 'tab', question: 'Native tab', dataType: 'SECTION', header: true,
          items: [{linkId: 'question', questionCode: 'question', question: 'Question', dataType: 'ST'}]
        }]
      }]
    };
    await page.evaluate(async definition => {
      const form = document.createElement('wc-lhc-form') as any;
      document.getElementById('formContainer').appendChild(form);
      form.options = {tabLayout: 'vertical', showTabContainerText: true, stickyTabs: true};
      // Accumulate option patches even before a questionnaire has been supplied.
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      form.options = {showTabHeader: true};
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      form.questionnaire = definition;
    }, definition);

    const form = page.locator('#formContainer wc-lhc-form');
    for (const name of ['Native tab form', 'Replacement native tab form']) {
      if (name !== definition.name) {
        await form.evaluate((element: any, definition) => {
          element.questionnaire = definition;
        }, {...definition, name, templateOptions: {...definition.templateOptions, hideTreeLine: false}});
      }
      await expect(form.locator('.lhc-form-title')).toContainText(name);
      await expect(form.locator('nz-tabset')).toHaveClass(/ant-tabs-left/);
      await expect(form.locator('nz-tabset')).toHaveClass(/lhc-tabs-sticky/);
      await expect(form.locator('.lhc-tab-container-text')).toHaveText('Native container');
      await expect(form.locator('.ant-tabs-tabpane-active .lhc-item-group-title')).toHaveText('Native tab');
      await expect.poll(() => form.evaluate((element: any) => element.lhcFormData.templateOptions.hideTreeLine))
        .toBe(name === definition.name);
    }
  });

  test('should retain partial tab options and explicit false overrides when a FHIR questionnaire is replaced', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', stickyTabs: true, allowHTML: true
    });
    const form = page.locator('#formContainer wc-lhc-form');
    await form.evaluate((element: any) => {
      element.options = {showTabHeader: true};
    });
    await expect(form.locator('.ant-tabs-tabpane-active .lhc-item-group-title')).toHaveText('Tab One');

    for (const enabled of [true, false]) {
      if (!enabled) {
        await form.evaluate((element: any) => {
          element.options = {
            tabLayout: 'horizontal', stickyTabs: false, showTabHeader: false, allowHTMLInInstructions: false
          };
        });
        await expect(form.locator('nz-tabset')).toHaveClass(/ant-tabs-top/);
      }
      const title = enabled ? 'Replacement vertical questionnaire' : 'Replacement horizontal questionnaire';
      await form.evaluate(async (element: any, title) => {
        const questionnaire = await fetch('/test/data/R4/tab-layout.json').then(response => response.json());
        element.questionnaire = {...questionnaire, title};
      }, title);

      await expect(form.locator('.lhc-form-title')).toHaveText(title);
      await expect(form.locator('nz-tabset')).toHaveClass(enabled ? /ant-tabs-left/ : /ant-tabs-top/);
      await expect.poll(() => form.evaluate((element: any) => ({
        tabLayout: element.lhcFormData.templateOptions.tabLayout,
        stickyTabs: element.lhcFormData.templateOptions.stickyTabs,
        showTabHeader: element.lhcFormData.templateOptions.showTabHeader,
        allowHTML: element.lhcFormData.templateOptions.allowHTML
      }))).toEqual({
        tabLayout: enabled ? 'vertical' : 'horizontal', stickyTabs: enabled, showTabHeader: enabled, allowHTML: enabled
      });
      if (enabled) {
        await expect(form.locator('nz-tabset')).toHaveClass(/lhc-tabs-sticky/);
      }
      else {
        await expect(form.locator('nz-tabset')).not.toHaveClass(/lhc-tabs-sticky/);
      }
      await expect(form.locator('.ant-tabs-tabpane-active .lhc-item-group-title')).toHaveCount(enabled ? 1 : 0);
    }
  });

  test('should not reuse a previous questionnaire response after a partial options update', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await page.evaluate(async () => {
      const questionnaire = {
        resourceType: 'Questionnaire', status: 'draft', title: 'Original response form',
        item: [{type: 'string', linkId: 'name', text: 'Name'}]
      };
      await (window as any).LForms.Util.addFormToPage(questionnaire, 'formContainer', {
        fhirVersion: 'R4', showQuestionCode: true,
        questionnaireResponse: {
          resourceType: 'QuestionnaireResponse', status: 'in-progress',
          item: [{linkId: 'name', answer: [{valueString: 'Original answer'}]}]
        }
      });
    });
    const form = page.locator('#formContainer wc-lhc-form');
    await expect(form.getByRole('textbox', {name: 'Name', exact: true})).toHaveValue('Original answer');
    await form.evaluate((element: any) => {
      element.options = {showTabHeader: true};
    });
    await expect.poll(() => form.evaluate((element: any) => element.lhcFormData.templateOptions.showTabHeader))
      .toBe(true);
    await form.evaluate((element: any) => {
      element.questionnaire = {
        resourceType: 'Questionnaire', status: 'draft', title: 'Replacement response form',
        item: [{type: 'string', linkId: 'name', text: 'Name'}]
      };
    });
    await expect(form.locator('.lhc-form-title')).toHaveText('Replacement response form');
    await expect(form.getByRole('textbox', {name: 'Name', exact: true})).toHaveValue('');
    await expect.poll(() => form.evaluate((element: any) => element.lhcFormData.templateOptions.showQuestionCode))
      .toBe(true);
  });

  (['horizontal', 'vertical'] as const).forEach(tabLayout => {
    test(`should highlight only the selected ${tabLayout} tab`, async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'tab-layout.json', 'formContainer', {fhirVersion: 'R4', tabLayout});
      const nav = page.locator('#formContainer nz-tabset > .ant-tabs-nav');
      const buttons = nav.getByRole('tab');
      for (const index of [0, 1, 0]) {
        await buttons.nth(index).click();
        const selected = nav.locator('.ant-tabs-tab-active');
        await expect(selected).toHaveCount(1);
        await expect(selected.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
        await expect(selected.getByRole('tab')).toHaveText(index === 0 ? 'Tab One' : 'Tab Two');
        await expect(selected).toHaveCSS('background-color', 'rgb(230, 241, 255)');
        await expect(selected.getByRole('tab')).toHaveCSS('color', 'rgb(0, 0, 0)');
        await expect(nav.locator('.ant-tabs-tab').nth(1 - index)).not.toHaveClass(/ant-tabs-tab-active/);
      }
    });
  });

  test('should wrap long vertical labels within responsive and custom navigation widths', async ({ page }) => {
    await page.setViewportSize({width: 1100, height: 900});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {fhirVersion: 'R4', tabLayout: 'vertical'});
    const nav = page.locator('#formContainer nz-tabset > .ant-tabs-nav');
    await expect.poll(() => nav.evaluate(element =>
      element.getBoundingClientRect().width < Math.min(
        20 * parseFloat(getComputedStyle(document.documentElement).fontSize),
        element.parentElement.getBoundingClientRect().width * 0.4
      )
    )).toBe(true);

    await addFormToPage(page, 'tab-layout-long-labels.json', 'formContainer', {fhirVersion: 'R4', tabLayout: 'vertical'});
    for (const width of [1100, 700]) {
      await page.setViewportSize({width, height: 900});
      await expect.poll(() => nav.evaluate(element => {
        const limit = Math.min(20 * parseFloat(getComputedStyle(document.documentElement).fontSize),
          element.parentElement.getBoundingClientRect().width * 0.4);
        const labels = Array.from(element.querySelectorAll('[role="tab"]')).slice(1);
        return element.getBoundingClientRect().width <= limit + 1 && labels.every(label => {
          const range = document.createRange();
          range.selectNodeContents(label);
          const lines = new Set(Array.from(range.getClientRects()).filter(rect => rect.width > 0).map(rect => Math.round(rect.top)));
          return lines.size > 1 && label.scrollWidth <= label.clientWidth + 1;
        });
      })).toBe(true);
    }
    await page.locator('#formContainer').evaluate((element: HTMLElement) => {
      element.style.setProperty('--lhc-vertical-tabs-max-width', '15rem');
    });
    await expect.poll(() => nav.evaluate(element => Math.abs(element.getBoundingClientRect().width -
      15 * parseFloat(getComputedStyle(document.documentElement).fontSize))
    )).toBeLessThan(1);
  });

  test('should show distinct content levels in the five-level sample', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-five-levels.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'horizontal', hideTreeLine: 'auto'
    });
    const form = page.locator('#formContainer');
    /**
     * Locate rendered item rows for a linkId in the hierarchy sample.
     * @param linkId Identifier of the sample question or group.
     * @returns A locator matching rows with that linkId, including any repetitions.
     */
    const row = (linkId: string) => form.locator(`lhc-item[id^="item-${linkId}/"]`);
    const rootLeft = await row('beforeTabs').evaluate(element => element.getBoundingClientRect().left);
    /**
     * Assert a sample item's visible content starts at the expected horizontal inset.
     * @param linkId Identifier of the sample question or group.
     * @param pixels Expected inset from the root row's left edge, in CSS pixels.
     * @returns A promise resolving when the visible item's inset is within one pixel.
     */
    const expectInset = async (linkId: string, pixels: number) => {
      await expect(row(linkId)).toBeVisible();
      await expect.poll(() => row(linkId).evaluate((element, expected) => {
        const rect = element.getBoundingClientRect();
        // Item padding belongs to ordinary group/question hierarchy levels.
        return Math.abs(rect.left + parseFloat(getComputedStyle(element).paddingLeft) - expected);
      }, rootLeft + pixels)).toBeLessThan(1);
    };
    await expectInset('tabQuestion', 24);
    await expectInset('ordinaryGroup', 24);
    await expectInset('groupQuestion', 48);
    await expectInset('deeperGroup', 48);
    await expectInset('deepQuestion1', 72);

    const outer = form.locator('nz-tabset').first();
    await outer.locator(':scope > .ant-tabs-nav').getByRole('tab').nth(1).click();
    await expectInset('beforeNestedTabs', 24);
    await expectInset('afterNestedTabs', 24);
    await expectInset('nestedQuestion1', 48);
    const nested = row('nestedTabs').locator('nz-tabset');
    await expect.poll(() => nested.locator(':scope > .ant-tabs-nav').evaluate((element, expected) =>
      Math.abs(element.getBoundingClientRect().left - expected), rootLeft + 24
    )).toBeLessThan(1);
  });

  test('should show tab content headers only when enabled', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', showTabHeader: true
    });
    const activeHeader = page.locator('#formContainer .ant-tabs-tabpane-active .lhc-item-group-title');
    await expect(page.locator('#formContainer .ant-tabs-top')).toHaveCount(1);
    await expect(activeHeader).toContainText('Tab One');
    await expect(page.locator('#formContainer .ant-tabs-tabpane-active')).toHaveCSS('padding-left', '24px');

    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'vertical', showTabHeader: true};
    });
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(1);
    await expect(activeHeader).toContainText('Tab One');
    await expect(page.locator('#formContainer .ant-tabs-tabpane-active')).toHaveCSS('padding-left', '12px');

    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'vertical', showTabHeader: false};
    });
    await expect(page.locator('#formContainer .lhc-item-group-title')).toHaveCount(0);
    await expect(page.locator('#formContainer .ant-tabs-tabpane-active')).toHaveCSS('padding-left', '12px');
    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'horizontal'};
    });
    await expect(page.locator('#formContainer .ant-tabs-tabpane-active')).toHaveCSS('padding-left', '24px');
  });

  test('should default to non-sticky top tabs without tab headers', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {fhirVersion: 'R4'});
    await expect(page.locator('#formContainer .ant-tabs-top')).toHaveCount(1);
    await expect(page.locator('#formContainer nz-tabset.lhc-tabs-sticky')).toHaveCount(0);
    await expect(page.locator('#formContainer .lhc-item-group-title')).toHaveCount(0);
    const originalNavTop = await page.locator('#formContainer .ant-tabs-nav').evaluate((nav) =>
      nav.getBoundingClientRect().top);
    await page.locator('#formContainer .ant-tabs-content-holder').evaluate((holder) => {
      (holder as HTMLElement).style.minHeight = '1200px';
    });
    await page.evaluate(() => window.scrollTo(0, 300));
    await expect.poll(() => page.locator('#formContainer .ant-tabs-nav').evaluate((nav) =>
      nav.getBoundingClientRect().top)).toBeLessThan(originalNavTop - 100);
  });

  (['horizontal', 'vertical'] as const).forEach(tabLayout => {
    test(`should not scroll visible ${tabLayout} sticky tabs`, async ({ page }) => {
      await page.setViewportSize({width: 800, height: 1000});
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'tab-layout.json', 'formContainer', {
        fhirVersion: 'R4', tabLayout, stickyTabs: true
      });
      await page.evaluate(() => window.scrollTo(0, 0));

      const formTitle = page.locator('#formContainer .lhc-form-title');
      const tabs = page.locator('#formContainer nz-tabset.lhc-tabs-sticky').getByRole('tab');
      const initialScrollPosition = await page.evaluate(() => window.scrollY);
      await expect(formTitle).toBeInViewport();

      await tabs.nth(1).click();
      await expect(byId(page, 'q2/1/1/1')).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollPosition);
      await expect(formTitle).toBeInViewport();

      await tabs.nth(0).click();
      await expect(byId(page, 'q1/1/1/1')).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollPosition);
      await expect(formTitle).toBeInViewport();
    });
  });

  (['horizontal', 'vertical'] as const).forEach(tabLayout => {
    [0, 40].forEach(offset => {
      test(`should reveal new ${tabLayout} tab content in a scrolling host with ${offset}px offset`, async ({ page }) => {
        await page.setViewportSize({width: 1100, height: 1000});
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
        await addFormToPage(page, 'tab-layout-long-content.json', 'formContainer', {
          fhirVersion: 'R4', tabLayout, stickyTabs: true
        });
        const host = page.locator('#formContainer');
        await host.evaluate((element: HTMLElement, offset) => {
          element.style.cssText = 'height:400px; overflow:auto; margin-top:50px; border:3px solid #888';
          element.style.setProperty('--lhc-sticky-tabs-offset', `${offset}px`);
        }, offset);
        const tabs = host.getByRole('tab');
        const initialWindowScroll = await page.evaluate(() => window.scrollY);

        for (const position of ['shallow', 'bottom', 'unscrolled']) {
          await tabs.nth(0).click();
          await host.evaluate((element, position) => {
            element.scrollTop = position === 'unscrolled' ? 0 : position === 'shallow' ? 100 : element.scrollHeight;
          }, position);
          await tabs.nth(1).click();
          await expect.poll(() => host.evaluate((element, {tabLayout, offset}) => {
            const nav = element.querySelector('.ant-tabs-nav').getBoundingClientRect();
            const input = element.querySelector('.ant-tabs-tabpane-active input').getBoundingClientRect();
            const host = element.getBoundingClientRect();
            const visibleTop = tabLayout === 'horizontal' ? nav.bottom : host.top + element.clientTop + offset;
            return input.top >= visibleTop - 1 && input.bottom <= host.bottom - element.clientTop;
          }, {tabLayout, offset})).toBe(true);
          await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialWindowScroll);
          if (position === 'unscrolled') {
            await expect.poll(() => host.evaluate(element => element.scrollTop)).toBe(0);
          }
        }
      });
    });
  });

  test('should size answer columns from the vertical tab content width', async ({ page }) => {
    await page.setViewportSize({width: 900, height: 720});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', tabAnswerAlignment: 'content'
    });
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(1);

    const contentHolder = page.locator(
      '#formContainer nz-tabset.ant-tabs-left > .ant-tabs-content-holder'
    );
    const answerColumn = contentHolder.locator('.lhc-de-input-unit').first();
    /**
     * Measure the rendered answer column for resize assertions.
     * @returns A promise resolving to the column's bounding width in CSS pixels.
     */
    const answerWidth = () => answerColumn.evaluate(element =>
      element.getBoundingClientRect().width);
    /**
     * Measure the tab content holder for answer-width comparisons.
     * @returns A promise resolving to the holder's bounding width in CSS pixels.
     */
    const contentWidth = () => contentHolder.evaluate(element =>
      element.getBoundingClientRect().width);

    // the difference between the answer width and half the content width should be less than
    // one pixel (allowing for fractional pixels)
    await expect.poll(async () =>
      Math.abs(await answerWidth() - await contentWidth() / 2)
    ).toBeLessThan(1);
    const initialAnswerWidth = await answerWidth();

    // resize and check again, also confirming that reducing viewport width reduces answer width
    await page.setViewportSize({width: 700, height: 720});
    await expect.poll(async () =>
      Math.abs(await answerWidth() - await contentWidth() / 2)
    ).toBeLessThan(1);
    await expect.poll(answerWidth).toBeLessThan(initialAnswerWidth);
  });

  test('should align mixed and nested tab answers with the rest of the form by default', async ({ page }) => {
    await page.setViewportSize({width: 1100, height: 900});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-answer-alignment.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical'
    });
    const columns = page.locator('#formContainer .lhc-de-input-unit:visible');
    await expect(columns).toHaveCount(4);

    for (const width of [1400, 1100]) {
      await page.setViewportSize({width, height: 900});
      await expect.poll(() => columns.evaluateAll(elements => {
        const rects = elements.map(element => element.getBoundingClientRect());
        return Math.max(...rects.map(rect => Math.max(
          Math.abs(rect.width - rects[0].width), Math.abs(rect.x - rects[0].x)
        )));
      })).toBeLessThan(1);
      await expect.poll(async () => {
        const answerWidth = await columns.first().evaluate(element => element.getBoundingClientRect().width);
        const formWidth = await page.locator('#formContainer wc-lhc-form')
          .evaluate(element => element.getBoundingClientRect().width);
        return Math.abs(answerWidth - formWidth / 2);
      }).toBeLessThan(1);
    }
  });

  test('should stack narrow form-aligned tab questions independently as nested content resizes', async ({ page }) => {
    await page.setViewportSize({width: 800, height: 900});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-nested-long-labels.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical'
    });
    const tabsets = page.locator('#formContainer nz-tabset');
    await expect(tabsets).toHaveCount(2);
    const outsideAnswer = page.locator('#formContainer .lhc-de-input-unit').first();

    // Narrow both tabsets, then widen only the outer one, then both. Repeat
    // the narrow case to check that resizing restores the stacked layout.
    for (const width of [800, 1100, 1400, 1600, 1900, 800]) {
      await page.setViewportSize({width, height: 900});
      const expectedStacked = width === 800 ? [true, true] : width < 1900 ? [false, true] : [false, false];
      for (let index = 0; index < 2; index++) {
        const holder = tabsets.nth(index).locator(':scope > .ant-tabs-content-holder');
        const row = holder.locator('lhc-item-question').first();
        await expect.poll(() => row.evaluate((element, stacked) => {
          const label = element.querySelector(':scope > .lhc-de-label-button').getBoundingClientRect();
          const answer = element.querySelector(':scope > .lhc-de-input-unit').getBoundingClientRect();
          const rect = element.getBoundingClientRect();
          const form = element.closest('wc-lhc-form').getBoundingClientRect();
          const style = getComputedStyle(element);
          const rowWidth = rect.width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) -
            parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
          return style.flexDirection === (stacked ? 'column' : 'row') &&
            label.width > 120 &&
            (!stacked || answer.top >= label.bottom - 1) &&
            Math.abs(answer.width - (stacked ? rowWidth : form.width / 2)) < 1 &&
            answer.right <= form.right + 1;
        }, expectedStacked[index])).toBe(true);
      }
      await expect.poll(() => page.evaluate(() =>
        document.documentElement.scrollWidth <= window.innerWidth
      )).toBe(true);
      // Questions outside tabs continue using the form's answer column width.
      await expect.poll(() => outsideAnswer.evaluate(element =>
        Math.abs(element.getBoundingClientRect().width - element.closest('wc-lhc-form').getBoundingClientRect().width / 2)
      )).toBeLessThan(1);
    }

    // Changing alignment without a resize must remove the fallback and retain
    // the explicitly requested two-column content alignment in each tabset.
    for (const alignment of ['content', 'form']) {
      await page.locator('#formContainer wc-lhc-form').evaluate((element: any, tabAnswerAlignment) => {
        element.options = {tabAnswerAlignment};
      }, alignment);
      for (let index = 0; index < 2; index++) {
        const holder = tabsets.nth(index).locator(':scope > .ant-tabs-content-holder');
        await expect.poll(() => holder.evaluate((element, alignment) => {
          const row = element.querySelector('lhc-item-question');
          const answer = row.querySelector('.lhc-de-input-unit').getBoundingClientRect();
          const label = row.querySelector('.lhc-de-label-button').getBoundingClientRect();
          return alignment === 'content'
            ? getComputedStyle(row).flexDirection === 'row' &&
              Math.abs(answer.width - element.getBoundingClientRect().width / 2) < 1
            : getComputedStyle(row).flexDirection === 'column' &&
              answer.top >= label.bottom - 1 && Math.abs(answer.width - label.width) < 1;
        }, alignment)).toBe(true);
      }
    }
    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'horizontal'};
    });
    for (const row of await tabsets.locator('lhc-item-question').all()) {
      await expect(row).toHaveCSS('flex-direction', 'row');
      await expect.poll(async () => Math.abs(
        await row.locator(':scope > .lhc-de-input-unit').evaluate(element => element.getBoundingClientRect().width) -
        await outsideAnswer.evaluate(element => element.getBoundingClientRect().width)
      )).toBeLessThan(1);
    }
  });

  test('should change alignment without resizing and use each nested tab content width', async ({ page }) => {
    await page.setViewportSize({width: 1100, height: 900});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-answer-alignment.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical'
    });
    const tabsets = page.locator('#formContainer nz-tabset');
    await expect(tabsets).toHaveCount(2);
    const outsideAnswer = page.locator('#formContainer .lhc-de-input-unit').first();

    for (const alignment of ['content', 'form', 'invalid', 'content']) {
      await page.locator('#formContainer wc-lhc-form').evaluate((element: any, tabAnswerAlignment) => {
        element.options = {tabAnswerAlignment};
      }, alignment);
      for (let index = 0; index < 2; index++) {
        const holder = tabsets.nth(index).locator(':scope > .ant-tabs-content-holder');
        const answer = holder.locator('.lhc-de-input-unit').first();
        await expect.poll(async () => {
          const expectedWidth = alignment === 'content'
            ? await holder.evaluate(element => element.getBoundingClientRect().width / 2)
            : await outsideAnswer.evaluate(element => element.getBoundingClientRect().width);
          return Math.abs(await answer.evaluate(element => element.getBoundingClientRect().width) - expectedWidth);
        }).toBeLessThan(1);
      }
    }

    // An orientation change must also remove the width override from every tabset.
    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'horizontal'};
    });
    await expect(page.locator('#formContainer .ant-tabs-top')).toHaveCount(2);
    for (let index = 0; index < 2; index++) {
      await expect.poll(() => tabsets.nth(index).evaluate(element =>
        (element as HTMLElement).style.getPropertyValue('--lhc-tab-content-answer-width')
      )).toBe('');
      await expect.poll(async () => Math.abs(
        await tabsets.nth(index).locator('.lhc-de-input-unit').first()
          .evaluate(element => element.getBoundingClientRect().width) -
        await outsideAnswer.evaluate(element => element.getBoundingClientRect().width)
      )).toBeLessThan(1);
    }
  });

  test('should restore nested content alignment after hiding and resizing its parent tab', async ({ page }) => {
    await page.setViewportSize({width: 1100, height: 900});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-answer-alignment.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', tabAnswerAlignment: 'content'
    });
    const outer = page.locator('#formContainer nz-tabset').first();
    const tabs = outer.locator(':scope > .ant-tabs-nav').getByRole('tab');
    await tabs.nth(1).click();
    await expect(byId(page, 'q2/1/1/1')).toBeVisible();
    await page.setViewportSize({width: 800, height: 900});
    await tabs.nth(0).click();

    const nested = outer.locator('nz-tabset');
    await nested.getByRole('tab').nth(1).click();
    await expect(byId(page, 'nestedQ2/1/1/1/1/1')).toBeVisible();
    const holder = nested.locator(':scope > .ant-tabs-content-holder');
    await expect.poll(async () => Math.abs(
      await holder.locator('.ant-tabs-tabpane-active .lhc-de-input-unit')
        .evaluate(element => element.getBoundingClientRect().width) -
      await holder.evaluate(element => element.getBoundingClientRect().width / 2)
    )).toBeLessThan(1);
  });

  (['form', 'content'] as const).forEach(tabAnswerAlignment => {
    test(`should keep responsive stacked questions with ${tabAnswerAlignment} alignment`, async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'tab-layout-answer-alignment.json', 'formContainer', {
        fhirVersion: 'R4', tabLayout: 'vertical', tabAnswerAlignment
      });

      for (const width of [600, 400]) {
        await page.setViewportSize({width, height: 900});
        await expect.poll(() => page.locator('#formContainer lhc-item-question:visible').evaluateAll(rows =>
          rows.every(row => {
            const answer = row.querySelector('.lhc-de-input-unit') as HTMLElement;
            const label = row.querySelector('.lhc-de-label-button');
            return answer.style.width === '' &&
              answer.getBoundingClientRect().top >= label.getBoundingClientRect().bottom - 1 &&
              answer.getBoundingClientRect().width > row.getBoundingClientRect().width * 0.9;
          })
        )).toBe(true);
      }
    });
  });

  ['tab-layout-answer-alignment.json', 'tab-layout-long-labels.json'].forEach(fixture => {
    test(`should render content alignment without resize-loop errors in ${fixture}`, async ({ page }) => {
      await page.addInitScript(() => {
        (window as any).resizeObserverErrors = [];
        window.addEventListener('error', event => {
          if (event.message.includes('ResizeObserver loop')) {
            (window as any).resizeObserverErrors.push(event.message);
          }
        });
      });
      await page.setViewportSize({width: 800, height: 900});
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, fixture, 'formContainer', {
        fhirVersion: 'R4', tabLayout: 'vertical', tabAnswerAlignment: 'content'
      });
      const holder = page.locator('#formContainer nz-tabset > .ant-tabs-content-holder').first();
      await expect.poll(async () => Math.abs(
        await holder.locator('.lhc-de-input-unit').first().evaluate(element => element.getBoundingClientRect().width) -
        await holder.evaluate(element => element.getBoundingClientRect().width / 2)
      )).toBeLessThan(1);
      // Allow the browser to deliver any resize-loop errors from the layout update.
      await page.evaluate(() => new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }));
      expect(await page.evaluate(() => (window as any).resizeObserverErrors)).toEqual([]);
    });
  });

  test('should support sticky vertical tabs', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', stickyTabs: true
    });
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(1);
    await expect(page.locator('#formContainer nz-tabset.lhc-tabs-sticky')).toHaveCount(1);
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'q2/1/1/1')).toBeVisible();
  });

  test('should apply vertical and sticky tab options to nested tab containers', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-nested-layout.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', showTabHeader: true, stickyTabs: true
    });
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(2);
    await expect(page.locator('#formContainer .ant-tabs-tabpane-active .lhc-item-group-title')).toHaveCount(2);
    await expect(page.locator('#formContainer nz-tabset.lhc-tabs-sticky')).toHaveCount(2);

    const initialScrollPosition = await page.evaluate(() => window.scrollY);
    const nestedTabset = page.locator('#formContainer nz-tabset.lhc-tabs-sticky').nth(1);
    await nestedTabset.getByRole('tab').nth(1).click();
    await expect(byId(page, 'q2/1/1/1/1/1')).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollPosition);
  });

  test('should only make the outer horizontal navigation sticky for nested tab containers', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-nested-layout.json', 'formContainer', {
      fhirVersion: 'R4', stickyTabs: true
    });
    await page.locator('button#nz-tabs-0-tab-1').click();

    const tabNavs = page.locator(
      '#formContainer nz-tabset.lhc-tabs-sticky.ant-tabs-top > .ant-tabs-nav'
    );
    await expect(tabNavs).toHaveCount(2);
    await expect(tabNavs.nth(0)).toHaveCSS('position', 'sticky');
    await expect(tabNavs.nth(1)).toHaveCSS('position', 'static');
  });

  for (const tabLayout of ['horizontal', 'vertical'] as const) {
    test(`should preserve the current answer position when an earlier nested ${tabLayout} tab is hidden`, async ({ page }) => {
      await page.setViewportSize({width: 1100, height: 900});
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await page.evaluate(async tabLayout => {
        const questionnaire = await fetch('/test/data/R4/tab-layout-answer-alignment.json')
          .then(response => response.json());
        const nestedTabs = questionnaire.item[1].item[0].item[1];
        nestedTabs.item[0].enableWhen = [{question: 'toggle', operator: '=', answerBoolean: true}];
        nestedTabs.item[1].item = Array.from({length: 40}, (_, index) => ({
          type: 'string', linkId: `long${index}`, text: `Question ${index + 1}`
        }));
        nestedTabs.item[1].item.push({
          type: 'boolean', linkId: 'toggle', text: 'Show preceding nested tab?', initial: [{valueBoolean: true}]
        });
        await (window as any).LForms.Util.addFormToPage(questionnaire, 'formContainer', {
          fhirVersion: 'R4', tabLayout, stickyTabs: true
        });
      }, tabLayout);

      const nestedTabs = page.locator('#formContainer nz-tabset').nth(1);
      const navigation = nestedTabs.locator(':scope > .ant-tabs-nav');
      await navigation.getByRole('tab', {name: 'Nested Tab Two'}).click();
      const hideEarlierTab = byId(page, 'toggle/1/1/1/1/1|false').locator('input');
      await hideEarlierTab.scrollIntoViewIfNeeded();
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(100);

      await hideEarlierTab.click();
      await expect(navigation.getByRole('tab')).toHaveCount(1);
      await expect(navigation.getByRole('tab', {name: 'Nested Tab Two'}))
        .toHaveAttribute('aria-selected', 'true');
      // Wait for the deferred scroll frame, so an unwanted reset cannot pass
      // simply because the assertion ran before the animation-frame callback.
      await page.evaluate(() => new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }));
      expect(await page.evaluate(() => window.scrollY)).toBe(scrollPosition);
      await expect(hideEarlierTab).toBeInViewport();
    });
  }

  test('should keep sticky tabs at the configured offset while their container scrolls', async ({ page }) => {
    await page.setViewportSize({width: 800, height: 720});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', stickyTabs: true
    });
    await page.locator('#formContainer').evaluate((container) => {
      (container as HTMLElement).style.setProperty('--lhc-sticky-tabs-offset', '40px');
      const holder = container.querySelector('.ant-tabs-content-holder') as HTMLElement;
      holder.style.minHeight = '1600px';
    });
    await page.evaluate(() => window.scrollTo(0, 300));
    await expect.poll(() => page.locator('#formContainer .ant-tabs-nav').evaluate((nav) =>
      Math.round(nav.getBoundingClientRect().top))).toBe(40);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'vertical', stickyTabs: true};
    });
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(1);
    await page.evaluate(() => window.scrollTo(0, 300));
    await expect.poll(() => page.locator('#formContainer .ant-tabs-nav').evaluate((nav) =>
      Math.round(nav.getBoundingClientRect().top))).toBe(40);

    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'q2/1/1/1')).toBeVisible();
    await expect.poll(() => page.locator('#formContainer .ant-tabs-left').evaluate((tabset) =>
      Math.round(tabset.getBoundingClientRect().top))).toBe(40);
  });

  test('should keep vertical tab navigation in view while its content scrolls', async ({ page }) => {
    await page.setViewportSize({width: 800, height: 720});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', stickyTabs: true
    });
    await page.locator('#formContainer').evaluate((container) => {
      (container as HTMLElement).style.setProperty('--lhc-sticky-tabs-offset', '40px');
      const holder = container.querySelector('.ant-tabs-content-holder') as HTMLElement;
      holder.style.minHeight = '1600px';
    });

    const navHeight = await page.locator('#formContainer .ant-tabs-nav').evaluate((nav) =>
      nav.getBoundingClientRect().height);
    const contentHeight = await page.locator('#formContainer .ant-tabs-content-holder').evaluate((content) =>
      content.getBoundingClientRect().height);
    expect(navHeight).toBeLessThan(contentHeight);

    await page.evaluate(() => window.scrollTo(0, 300));
    await expect.poll(() => page.locator('#formContainer .ant-tabs-nav').evaluate((nav) =>
      Math.round(nav.getBoundingClientRect().top))).toBe(40);
  });

  (['horizontal', 'vertical'] as const).forEach(tabLayout => {
    test(`should stop sticky ${tabLayout} navigation at the end of its container`, async ({ page }) => {
      await page.setViewportSize({width: 1100, height: 900});
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'tab-layout-long-content.json', 'formContainer', {
        fhirVersion: 'R4', tabLayout, stickyTabs: true
      });
      await page.locator('#formContainer').evaluate((element: HTMLElement) => {
        element.style.setProperty('--lhc-sticky-tabs-offset', '40px');
        const followingContent = document.createElement('div');
        followingContent.style.height = '2000px';
        element.after(followingContent);
      });
      const tabset = page.locator('#formContainer nz-tabset');
      const nav = tabset.locator(':scope > .ant-tabs-nav');
      await page.evaluate(() => window.scrollTo(0, 400));
      await expect.poll(() => nav.evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(40);
      await tabset.evaluate(element => window.scrollTo(0, window.scrollY + element.getBoundingClientRect().bottom + 100));
      await expect(nav).not.toBeInViewport();
    });
  });

  test('should constrain a long vertical tab list and keep its last tab keyboard-accessible', async ({ page }) => {
    await page.setViewportSize({width: 1100, height: 720});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await page.evaluate(async () => {
      const questionnaire = await fetch('/test/data/R4/tab-layout.json').then(response => response.json());
      questionnaire.item[0].item = Array.from({length: 30}, (_, tab) => ({
        type: 'group', linkId: `manyTab${tab}`, text: `Tab ${tab + 1}`,
        item: Array.from({length: tab === 0 ? 50 : 1}, (_, question) => ({
          type: 'string', linkId: `manyQuestion${tab}_${question}`, text: `Question ${question + 1} in tab ${tab + 1}`
        }))
      }));
      document.getElementById('formContainer').style.setProperty('--lhc-sticky-tabs-offset', '40px');
      await (window as any).LForms.Util.addFormToPage(questionnaire, 'formContainer', {
        fhirVersion: 'R4', tabLayout: 'vertical', stickyTabs: true
      });
    });
    const nav = page.locator('#formContainer nz-tabset > .ant-tabs-nav');
    const tabs = nav.getByRole('tab');
    await expect(tabs).toHaveCount(30);
    await expect.poll(() => nav.evaluate(element => element.getBoundingClientRect().height <= window.innerHeight - 40)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 300));
    await tabs.first().focus();
    await tabs.first().press('ArrowUp');
    await expect(tabs.last()).toBeFocused();
    await expect(tabs.last()).toBeInViewport();
    await tabs.last().press('Enter');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
    await expect(byId(page, 'manyQuestion29_0/1/1/1')).toBeInViewport();
  });

  test('should keep both outer and nested vertical navigation sticky while nested content scrolls', async ({ page }) => {
    await page.setViewportSize({width: 1400, height: 900});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-answer-alignment.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical', stickyTabs: true
    });
    const tabsets = page.locator('#formContainer nz-tabset');
    await expect(tabsets).toHaveCount(2);
    await page.locator('#formContainer').evaluate((element: HTMLElement) => {
      element.style.setProperty('--lhc-sticky-tabs-offset', '40px');
    });
    await tabsets.nth(1).locator(':scope > .ant-tabs-content-holder').evaluate((element: HTMLElement) => {
      element.style.minHeight = '1600px';
    });
    await tabsets.nth(1).evaluate(element => window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top + 150));
    for (const tabset of await tabsets.all()) {
      await expect.poll(() => tabset.locator(':scope > .ant-tabs-nav').evaluate(element =>
        Math.round(element.getBoundingClientRect().top)
      )).toBe(40);
    }
    await tabsets.nth(1).getByRole('tab').nth(1).click();
    await expect(byId(page, 'nestedQ2/1/1/1/1/1')).toBeInViewport();
    await expect.poll(() => tabsets.nth(1).evaluate(element =>
      Math.round(element.getBoundingClientRect().top)
    )).toBe(40);
  });

  test('enableWhen should work across tabs', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-with-enableWhen.json', 'formContainer', { fhirVersion: 'R4' });
    await expect(byId(page, 'Q1/1/1/1|true').locator('input')).not.toBeChecked();
    await expect(byId(page, 'Q1/1/1/1|false').locator('input')).not.toBeChecked();
    await expect(byId(page, 'Q1/1/1/1|null').locator('input')).toBeChecked();

    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'Q1-not-exists/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-not-true/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-exists/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-true/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-false/1/1/1')).not.toBeAttached();

    await page.locator('button#nz-tabs-0-tab-0').click();
    await byId(page, 'Q1/1/1/1|true').locator('input').click();
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'Q1-not-exists/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-not-true/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-exists/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-true/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-false/1/1/1')).not.toBeAttached();
    // Tab Three is shown by enableWhen condition.
    await page.locator('button#nz-tabs-0-tab-2').click();
    await expect(byId(page, 'q3/1/1/1')).toBeVisible();

    await page.locator('button#nz-tabs-0-tab-0').click();
    await byId(page, 'Q1/1/1/1|false').locator('input').click();
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(byId(page, 'Q1-not-exists/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-not-true/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-exists/1/1/1')).toBeVisible();
    await expect(byId(page, 'Q1-true/1/1/1')).not.toBeAttached();
    await expect(byId(page, 'Q1-false/1/1/1')).toBeVisible();
    // Tab Three is hidden by enableWhen condition.
    await expect(page.locator('button#nz-tabs-0-tab-2')).not.toBeAttached();
  });

  test('should render tab layout on nested layouts', async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout-nested-layout.json', 'formContainer', { fhirVersion: 'R4' });
    // Horizontal layout under Tab One.
    await expect(byId(page, '/g3/g1m1/1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g3/g1m2/1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g3/g1m3/1/1/1/1')).toBeVisible();
    await expect(byId(page, '/g3/g1m4/1/1/1/1')).toBeVisible();
    const nestedQ1 = byId(page, 'q1/1/1/1/1/1');
    const nestedQ2 = byId(page, 'q2/1/1/1/1/1');
    await expect(nestedQ1).not.toBeAttached();
    // Nested tabs layout under Tab Two.
    await page.locator('button#nz-tabs-0-tab-1').click();
    await expect(nestedQ1).toBeVisible();
    await expect(nestedQ2).not.toBeAttached();
    await page.locator('button#nz-tabs-1-tab-1').click();
    await expect(nestedQ1).not.toBeVisible();
    await expect(nestedQ2).toBeVisible();

    // Pick something on the first question in the first tab.
    // enableWhen conditions on the nested tab container item
    // should hide it in the second main tab.
    await page.locator('button#nz-tabs-0-tab-0').click();
    const field = byId(page, '/g3/g1m1/1/1/1/1');
    await field.click();
    await field.press('ArrowDown');
    await field.press('Enter');
    await page.locator('button#nz-tabs-0-tab-1').click();
    // The nested tabs are now hidden.
    await expect(byId(page, 'q1/1/1/1/1/1')).not.toBeAttached();
  });
});
