import { test, expect } from '@playwright/test';
import { byId, openFormByIndex } from '../support/lforms-helpers';

test.describe('tree lines', () => {
  test('should show the last items correctly as a sub-items', async ({ page }) => {
    // FormBuilder is at index 5 in the form list
    await openFormByIndex(page, 5);

    const treeItem1 = '/questionHeaderC/answersC/textC/1/1/1';
    const treeItem2 = '/questionHeaderC/formulaC/1/1';

    await expect(byId(page, treeItem1)).toBeVisible();
    await expect(byId(page, treeItem2)).toBeVisible();
  });
});
