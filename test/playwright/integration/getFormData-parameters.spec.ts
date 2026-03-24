import { test, expect } from '@playwright/test';
import { openFormByIndex } from '../support/lforms-helpers';

test.describe('LForms.Util.getFormData parameters', () => {
  // FullFeaturedForm is at index 4 in the form list

  test('should work when element is not provided', async ({ page }) => {
    await openFormByIndex(page, 4);

    const count1 = await page.evaluate(() => {
      return (window as any).LForms.Util.getUserData().itemsData.length;
    });
    expect(count1).toBe(63);

    const count2 = await page.evaluate(() => {
      return (window as any).LForms.Util.getUserData(null, false, true).itemsData.length;
    });
    expect(count2).toBe(5);
  });

  test('should work when element is a DOM element', async ({ page }) => {
    await openFormByIndex(page, 4);

    const count1 = await page.evaluate(() => {
      const formContainer = document.getElementById('lforms-form');
      return (window as any).LForms.Util.getUserData(formContainer).itemsData.length;
    });
    expect(count1).toBe(63);

    const count2 = await page.evaluate(() => {
      const formContainer = document.getElementById('lforms-form');
      return (window as any).LForms.Util.getUserData(formContainer, false, true).itemsData.length;
    });
    expect(count2).toBe(5);
  });

  test('should work when element is a CSS selector', async ({ page }) => {
    await openFormByIndex(page, 4);

    const count1 = await page.evaluate(() => {
      return (window as any).LForms.Util.getUserData('#lforms-form').itemsData.length;
    });
    expect(count1).toBe(63);

    const count2 = await page.evaluate(() => {
      return (window as any).LForms.Util.getUserData('#lforms-form', false, true).itemsData.length;
    });
    expect(count2).toBe(5);
  });
});
