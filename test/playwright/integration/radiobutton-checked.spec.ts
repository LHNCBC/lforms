import { test, expect } from '@playwright/test';
import { answerId, byId, openFormByIndex, pressCypressKeys } from '../support/lforms-helpers';

test.describe('Radio button checked/unchecked', () => {
  test('should display checked state correctly', async ({ page }) => {
    // DisplayControlsDemo is at index 10 in the form list
    await openFormByIndex(page, 10);
    await page.waitForTimeout(500);

    const item2answer1 = answerId('/q1b/1', undefined, 'c1');
    const item2Other = answerId('/q1b/1', '_other');
    const item2OtherValue = answerId('/q1b/1', '_otherValue');

    await byId(page, item2answer1).click();
    await expect(byId(page, item2answer1).locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);

    await byId(page, item2Other).click();
    await expect(byId(page, item2Other).locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
    await expect(byId(page, item2answer1).locator('span.ant-radio')).not.toHaveClass(/ant-radio-checked/);

    // the 'other' radio should remain checked when other value is typed
    await byId(page, item2OtherValue).pressSequentially('other values');
    await expect(byId(page, item2Other).locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);

    // click away
    await byId(page, item2answer1).click();
    await expect(byId(page, item2answer1).locator('span.ant-radio')).toHaveClass(/ant-radio-checked/);
    await expect(byId(page, item2Other).locator('span.ant-radio')).not.toHaveClass(/ant-radio-checked/);
  });
});
