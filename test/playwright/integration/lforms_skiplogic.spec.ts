import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';
import * as FHIRSupport from '../../../src/fhir/versions.js';

const fhirVersions = Object.keys(FHIRSupport).filter(k => k !== 'default');

test.describe('skip logic', () => {

  test('should support enableWhenExpression', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'enableWhenExpressionTest.json', 'R4');

    const n1 = byId(page, 'n1/1/1');
    const n2 = byId(page, 'n2/1/1');
    const n3 = byId(page, 'n3/1/1');
    const q4 = byId(page, 'q4/1/1'); // present when n1+n2+n3 >= 5;

    await expect(n1).toBeVisible();
    await expect(q4).not.toBeAttached();
    await n1.click();
    await n1.pressSequentially('5');
    await n2.click();
    await expect(n1).toBeVisible();
    await n1.clear();
    await n1.click();
    await n1.pressSequentially('1');
    await n2.click();
    await n2.pressSequentially('2');
    await expect(q4).not.toBeAttached();
    await n3.click();
    await n3.pressSequentially('3');
    await n1.click();
    await expect(n1).toBeVisible();
  });

  test('should remove enableWhenExpression items from QuestionnaireResponse properly', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
    await loadFromTestData(page, 'enableWhenExpressionTest.json', 'R4');
    const n1 = byId(page, 'n1/1/1');
    const q4 = byId(page, 'q4/1/1'); // present when n1+n2+n3 >= 5;
    await expect(n1).toBeVisible();
    await expect(q4).not.toBeAttached();
    await n1.click();
    await n1.fill('5');
    await expect(q4).toBeVisible();
    await q4.click();
    await q4.fill('888');
    const qr1 = await page.evaluate(() => {
      return (window as any).LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
    });
    expect(qr1.item[0].item.length).toBe(2);
    await n1.fill('4');
    await expect(q4).not.toBeAttached();
    const qr2 = await page.evaluate(() => {
      return (window as any).LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
    });
    expect(qr2.item[0].item.length).toBe(1);
  });

  test('target items should be hidden initially', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    await expect(byId(page, '/slTargetItem1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetItem2/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem1/1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem2/1/1')).not.toBeAttached();
  });

  test('should have correct initial state for CNE/exists trigger targets', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    await expect(byId(page, '/54139-1-cnesrc-1/54124-3/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54141-7/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54112-8/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54113-6/1/1')).toBeVisible();
  });

  test('should show/hide elements per CNE/exists trigger settings if answered Yes', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const cneTriggerSrc1 = byId(page, '/54139-1-cnesrc-1/1');
    // select "Yes" for is Living
    await cneTriggerSrc1.click();
    await pressCypressKeys(cneTriggerSrc1, '{downArrow}');
    await cneTriggerSrc1.blur();
    await expect(page.locator('#\\/54139-1-cnesrc-1\\/54124-3\\/1\\/1 input')).toBeVisible();
    // trigger value has no 'system' while answers have 'system'
    await expect(byId(page, '/54139-1-cnesrc-1/54124-3b/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54141-7/1/1')).toBeVisible();
    await expect(byId(page, '/54139-1-cnesrc-1/54112-8/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54113-6/1/1')).not.toBeAttached();
  });

  test('should show/hide elements per CNE/exists trigger settings if answered No', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const cneTriggerSrc1 = byId(page, '/54139-1-cnesrc-1/1');
    // select "No" for is Living
    await cneTriggerSrc1.click();
    await pressCypressKeys(cneTriggerSrc1, '{downArrow}{downArrow}');
    await cneTriggerSrc1.blur();
    await expect(byId(page, '/54139-1-cnesrc-1/54124-3/1/1')).not.toBeAttached();
    // trigger value has no 'system' while answers have 'system'
    await expect(byId(page, '/54139-1-cnesrc-1/54124-3b/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54141-7/1/1')).toBeVisible();
    await expect(byId(page, '/54139-1-cnesrc-1/54112-8/1/1')).toBeVisible();
    await expect(byId(page, '/54139-1-cnesrc-1/54113-6/1/1')).not.toBeAttached();
  });

  test('should show/hide elements per CNE/exists trigger settings if answer cleared', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const cneTriggerSrc1 = byId(page, '/54139-1-cnesrc-1/1');
    // clear the answer to Living
    await cneTriggerSrc1.clear();
    await expect(byId(page, '/54139-1-cnesrc-1/54124-3/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54124-3b/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54141-7/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54112-8/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-1/54113-6/1/1')).toBeVisible();
  });

  test('should show/hide elements when system value is set correctly in trigger', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const cneTriggerSrc2 = byId(page, '/54139-1-cnesrc-2/1');

    // clear the answer to Living
    await cneTriggerSrc2.click();
    await pressCypressKeys(cneTriggerSrc2, '{downArrow}');
    await cneTriggerSrc2.blur();
    // trigger value has 'system' while answers have no 'system'
    await expect(byId(page, '/54139-1-cnesrc-2/54124-3c/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-2/54124-3d/1/1')).toBeVisible();
    await expect(byId(page, '/54139-1-cnesrc-2/54112-8b/1/1')).not.toBeAttached();

    await cneTriggerSrc2.click();
    await pressCypressKeys(cneTriggerSrc2, '{downArrow}{downArrow}');
    await cneTriggerSrc2.blur();
    // trigger value has 'system' while answers have no 'system'
    await expect(byId(page, '/54139-1-cnesrc-2/54124-3c/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-2/54124-3d/1/1')).not.toBeAttached();
    await expect(byId(page, '/54139-1-cnesrc-2/54112-8b/1/1')).toBeVisible();
  });

  test('should show a sibling and two items in a sibling section', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    await byId(page, '/slSource1/1').pressSequentially('1');
    await expect(byId(page, '/slTargetItem1/1')).toBeVisible();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem1/1/1')).toBeVisible();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem2/1/1')).toBeVisible();
  });

  test('should hide a sibling and show two items in a sibling section', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const src = byId(page, '/slSource1/1');
    await expect(byId(page, '/slTargetItem1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetItem2/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem1/1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem2/1/1')).not.toBeAttached();

    await src.pressSequentially('2');
    await expect(byId(page, '/slTargetItem1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetItem2/1')).toBeVisible();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem1/1/1')).toBeVisible();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem2/1/1')).toBeVisible();
  });

  test('should show/hide a sibling controlled by notEqual', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const src = byId(page, '/slSource1/1');
    const target6 = byId(page, '/slTargetItem6/1');
    await expect(target6).toBeVisible();
    await src.pressSequentially('2');
    await expect(target6).not.toBeAttached();
    await src.clear();
    await src.pressSequentially('6');
    await expect(target6).toBeVisible();
  });

  test('should show another sibling and hide two items in a sibling section', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const src = byId(page, '/slSource1/1');
    await expect(byId(page, '/slTargetItem1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetItem2/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem1/1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem2/1/1')).not.toBeAttached();
    await src.pressSequentially('6');
    await expect(byId(page, '/slTargetItem1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetItem2/1')).toBeVisible();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem1/1/1')).not.toBeAttached();
    await expect(byId(page, '/slTargetHeader1/slTargetSubItem2/1/1')).not.toBeAttached();
  });

  test('should work with logic ALL from two different sources', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    // check logic ALL
    const allSrc1 = byId(page, '/slALLSource1/1');
    const allSrc2 = byId(page, '/slALLSource2/1');
    const allTarget = byId(page, '/slALLTargetItem/1');

    await allSrc1.clear();
    await allSrc2.clear();
    await allSrc1.pressSequentially('1');
    await expect(allTarget).not.toBeAttached();
    await allSrc2.pressSequentially('2');
    await expect(allTarget).toBeVisible();
    await byId(page, '/slANYSource1/1').clear();
    await allSrc1.clear();
    await allSrc1.pressSequentially('2');
    await expect(allTarget).not.toBeAttached();
  });

  test('should work with logic ANY from two different sources', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    // check logic ANY
    const anySrc1 = byId(page, '/slANYSource1/1');
    const anySrc2 = byId(page, '/slANYSource2/1');
    const anyTarget = byId(page, '/slANYTargetItem/1');

    await anySrc1.clear();
    await anySrc2.clear();
    await anySrc1.pressSequentially('1');
    await expect(anyTarget).toBeVisible();
    await anySrc2.pressSequentially('1');
    await expect(anyTarget).toBeVisible();
    await anySrc1.clear();
    await anySrc1.pressSequentially('2');
    await anySrc1.clear();
    await expect(anyTarget).not.toBeAttached();
    await anySrc2.clear();
    await anySrc2.pressSequentially('2');
    await expect(anyTarget).toBeVisible();
  });

  test('should be able to be controlled by an ancestors sibling', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const rpSrc2 = byId(page, '/rpSource2/1');
    const rpTarget2_1 = byId(page, '/repeatingSection1/rpTargetItem2/1/1');
    const rpTarget2_2 = byId(page, '/repeatingSection1/rpTargetItem2/2/1');

    await expect(rpTarget2_1).not.toBeAttached();
    await expect(rpTarget2_2).not.toBeAttached();
    await rpSrc2.clear();
    await rpSrc2.pressSequentially('1');
    await expect(rpTarget2_1).not.toBeAttached();
    await rpSrc2.clear();
    await rpSrc2.pressSequentially('2');
    await expect(rpTarget2_1).toBeVisible();

    const rpTarget1_1 = byId(page, '/repeatingSection1/rpTargetItem1/1/1');
    const rpSubItem1_1 = byId(page, '/repeatingSection1/rpTargetHeader1/rpTargetSubItem1/1/1/1');
    await expect(rpTarget1_1).not.toBeAttached();
    await expect(rpSubItem1_1).not.toBeAttached();
    await byId(page, '/repeatingSection1/rpSource1/1/1').pressSequentially('1');
    await expect(rpTarget1_1).toBeVisible();
    await expect(rpSubItem1_1).toBeVisible();

    // add a new section
    await byId(page, 'add-/repeatingSection1/1').click();
    await expect(byId(page, '/repeatingSection1/rpTargetItem1/2/1')).not.toBeAttached();
    await expect(byId(page, '/repeatingSection1/rpTargetHeader1/rpTargetSubItem1/2/1/1')).not.toBeAttached();
    await expect(rpTarget2_1).toBeVisible();
    await expect(rpTarget2_2).toBeVisible();
    await rpSrc2.clear();
    await rpSrc2.pressSequentially('1');
    await expect(rpTarget2_1).not.toBeAttached();
    await expect(rpTarget2_2).not.toBeAttached();
  });

  test.describe('Skip logic equal and notEqual operators', () => {
    for (let i = 0; i < fhirVersions.length; i++) {
      test('should work with = and != operators - ' + fhirVersions[i], async ({ page }) => {
        await page.goto('/test/pages/lforms_testpage.html');
        await waitForLFormsReady(page);
        await loadFromTestData(page, 'test-enablewhen.json', fhirVersions[1]);
        const source = byId(page, '4.1/1');
        const targetEqual = byId(page, '4.2/1');
        const targetNotEqual = byId(page, '4.3/1');

        await expect(source).toBeVisible();
        await expect(targetEqual).not.toBeAttached();
        await expect(targetNotEqual).toBeVisible();

        await source.click();
        await pressCypressKeys(source, '{downArrow}{enter}');
        await expect(targetEqual).toBeVisible();
        // It looks like below line was not supposed to be here:
        // TestUtil.waitForElementNotPresent(targetEqual)

        await source.click();
        await pressCypressKeys(source, '{downArrow}{downArrow}{enter}');
        await expect(targetEqual).not.toBeAttached();
        await expect(targetNotEqual).toBeVisible();
      });

      test('should work with skip logic source that itself is a skip logic target - ' + fhirVersions[i], async ({ page }) => {
        await page.goto('/test/pages/lforms_testpage.html');
        await waitForLFormsReady(page);
        await loadFromTestData(page, 'test-enablewhen.json', fhirVersions[i]);
        const source = byId(page, '4.1/1');
        const targetEqual = byId(page, '4.3/1');
        const targetWithSklSourceExists = byId(page, '4.4/1');
        const targetWithSklSourceNotExists = byId(page, '4.5/1');

        // Initial setup
        await expect(source).toBeVisible();
        await expect(targetWithSklSourceExists).not.toBeAttached();
        await expect(targetWithSklSourceNotExists).toBeVisible();

        // Select to hide the skip logic target
        await source.click();
        await pressCypressKeys(source, '{downArrow}{enter}');
        await expect(targetWithSklSourceExists).not.toBeAttached();
        await expect(targetWithSklSourceNotExists).toBeVisible();

        // Select to show skip logic target item.
        await source.click();
        await pressCypressKeys(source, '{downArrow}{downArrow}{enter}');
        await expect(targetEqual).toBeVisible();
        // Field is displayed but no value entered in the item. The chained targets skip logic is not satisfied.
        await expect(targetWithSklSourceExists).not.toBeAttached();
        await expect(targetWithSklSourceNotExists).toBeVisible();
        // Value entered in the item. The chained targets skip logic is satisfied.
        await targetEqual.click();
        await targetEqual.clear();
        await targetEqual.pressSequentially('xxx');
        await expect(targetWithSklSourceExists).toBeVisible();
        await expect(targetWithSklSourceNotExists).not.toBeAttached();
      });
    }

    test('should work with data control whose source is controlled by skip logic', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'test-skiplogic-datacontrol.json');
      const source = byId(page, '1/1');
      const skipLogicItem = byId(page, '2/1');
      const dataControlItemWithSourceHavingSkipLogic = byId(page, '3/1');

      await expect(source).toBeVisible();
      await expect(skipLogicItem).not.toBeAttached();
      await expect(dataControlItemWithSourceHavingSkipLogic).not.toBeAttached();

      // Not met skip logic condition ==> skip logic disabled
      await source.click();
      await source.pressSequentially('xxx');
      await expect(skipLogicItem).not.toBeAttached();
      await expect(dataControlItemWithSourceHavingSkipLogic).not.toBeAttached();

      // Met skip logic condition
      await source.click();
      await source.clear();
      await source.pressSequentially('show 2');
      await expect(skipLogicItem).toBeVisible();

      // skipLogicItem is present but its value does not exists yet.
      await expect(dataControlItemWithSourceHavingSkipLogic).not.toBeAttached();

      await skipLogicItem.click();
      await skipLogicItem.pressSequentially('xxx');
      await expect(dataControlItemWithSourceHavingSkipLogic).toBeVisible();
      await expect(dataControlItemWithSourceHavingSkipLogic).toHaveValue('xxx');
    });
  });
});
