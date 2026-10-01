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
    await page.locator('#showTabHeader').check();
    await page.locator('#stickyTabs').check();
    await loadFromTestData(page, 'tab-layout.json', 'R4');

    await expect(page.locator('#test-form .ant-tabs-left')).toHaveCount(1);
    await expect(page.locator('#test-form .ant-tabs-tabpane-active .lhc-item-group-title')).toContainText('Tab One');
    await expect(page.locator('#test-form nz-tabset.lhc-tabs-sticky')).toHaveCount(1);

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

    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'vertical', showTabHeader: true};
    });
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(1);
    await expect(activeHeader).toContainText('Tab One');

    await page.locator('#formContainer wc-lhc-form').evaluate((element: any) => {
      element.options = {tabLayout: 'vertical', showTabHeader: false};
    });
    await expect(page.locator('#formContainer .lhc-item-group-title')).toHaveCount(0);
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

  test('should size answer columns from the vertical tab content width', async ({ page }) => {
    await page.setViewportSize({width: 900, height: 720});
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
    await addFormToPage(page, 'tab-layout.json', 'formContainer', {
      fhirVersion: 'R4', tabLayout: 'vertical'
    });
    await expect(page.locator('#formContainer .ant-tabs-left')).toHaveCount(1);

    const contentHolder = page.locator(
      '#formContainer nz-tabset.ant-tabs-left > .ant-tabs-content-holder'
    );
    const answerColumn = contentHolder.locator('.lhc-de-input-unit').first();
    const answerWidth = () => answerColumn.evaluate(element =>
      element.getBoundingClientRect().width);
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
