import { test, expect, Page } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId, answerId } from '../support/lforms-helpers';

const lfDataTypes = ['ST', 'INT', 'DT', 'TM', 'CODING'];

const itemValues: Record<string, any> = {
  'valueString': {
    g1Answer1: 'a', g1Answer2: 'b', g1Answer3: 'c',
    g3Answer1: 'A. a - 1', g3Answer2: 'B. b - 2', g3Answer3: 'C. c - 3'
  },
  'valueInteger': {
    g1Answer1: '12', g1Answer2: '34', g1Answer3: '56',
    g3Answer1: 'A. 12 - 1', g3Answer2: 'B. 34 - 2', g3Answer3: 'C. 56 - 3'
  },
  'valueDate': {
    g1Answer1: '2022', g1Answer2: '2022-09', g1Answer3: '2022-09-20',
    g3Answer1: 'A. 2022 - 1', g3Answer2: 'B. 2022-09 - 2', g3Answer3: 'C. 2022-09-20 - 3'
  },
  'valueTime': {
    g1Answer1: '10:30:00', g1Answer2: '13:30:00', g1Answer3: '23:59:59',
    g3Answer1: 'A. 10:30:00 - 1', g3Answer2: 'B. 13:30:00 - 2', g3Answer3: 'C. 23:59:59 - 3'
  },
  'valueCoding': {
    g1Answer1: 'Answer 1', g1Answer2: 'Answer 2', g1Answer3: 'Answer 3',
    g1Code1: 'c1', g1Code2: 'c2', g1Code3: 'c3',
    g3Answer1: 'A. Answer 1 - 1', g3Answer2: 'B. Answer 2 - 2', g3Answer3: 'C. Answer 3 - 3'
  }
};

function getItemIds(valueType: string, values: any) {
  const coding = valueType === 'valueCoding';
  return {
    g1item1: `${valueType}-group1-item1/1/1`,
    g1item2: `${valueType}-group1-item2/1/1`,
    g3item1: `${valueType}-group3-item1/1/1`,
    g3item2: `${valueType}-group3-item2/1/1`,
    g5item1: `${valueType}-group5-item1/1/1`,
    g5item2: `${valueType}-group5-item2/1/1`,
    g2item1ans2: `${valueType}-group2-item1/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g2item2ans2: `${valueType}-group2-item2/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g4item1ans2: `${valueType}-group4-item1/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g4item2ans2: `${valueType}-group4-item2/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g6item1ans1: `${valueType}-group6-item1/1/1||${coding ? values.g1Code1 : values.g1Answer1}`,
    g6item1ans2: `${valueType}-group6-item1/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g6item1ans3: `${valueType}-group6-item1/1/1||${coding ? values.g1Code3 : values.g1Answer3}`,
    g6item2ans1: `${valueType}-group6-item2/1/1||${coding ? values.g1Code1 : values.g1Answer1}`,
    g6item2ans2: `${valueType}-group6-item2/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g6item2ans3: `${valueType}-group6-item2/1/1||${coding ? values.g1Code3 : values.g1Answer3}`,
    g6item1ansOther: answerId(`${valueType}-group6-item1/1/1`, '_other'),
    g6item1ansOtherValue: answerId(`${valueType}-group6-item1/1/1`, '_otherValue'),
    g6item2ansOther: answerId(`${valueType}-group6-item2/1/1`, '_other'),
    g6item2ansOtherValue: answerId(`${valueType}-group6-item2/1/1`, '_otherValue'),
    g7item1ans2: `${valueType}-group7-item1/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g7item2ansOther: answerId(`${valueType}-group7-item2/1/1`, '_other'),
    g7item2ansOtherValue: answerId(`${valueType}-group7-item2/1/1`, '_otherValue'),
    g8item1ans2: `${valueType}-group8-item1/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g8item1ans3: `${valueType}-group8-item1/1/1||${coding ? values.g1Code3 : values.g1Answer3}`,
    g8item2ans2: `${valueType}-group8-item2/1/1||${coding ? values.g1Code2 : values.g1Answer2}`,
    g8item2ansOther: answerId(`${valueType}-group8-item2/1/1`, '_other'),
    g8item2ansOtherValue: answerId(`${valueType}-group8-item2/1/1`, '_otherValue'),
  };
}

async function testRenderNullOrOptionsOnly(page: Page, ids: any, values: any) {
  // group 1 - autocomplete
  await expect(byId(page, ids.g1item1)).toBeVisible();
  await byId(page, ids.g1item1).click();
  const listItems = page.locator('#lhc-tools-searchResults li');
  await expect(listItems.nth(0)).toContainText(values.g1Answer1);
  await expect(listItems.nth(1)).toContainText(values.g1Answer2);
  await expect(listItems.nth(2)).toContainText(values.g1Answer3);
  await byId(page, ids.g1item2).click();
  await expect(listItems.nth(0)).toContainText(values.g1Answer1);
  await expect(listItems.nth(1)).toContainText(values.g1Answer2);
  await expect(listItems.nth(2)).toContainText(values.g1Answer3);

  // group 2 - radio/checkbox
  await expect(byId(page, ids.g2item1ans2)).toContainText(values.g1Answer2);
  await expect(byId(page, ids.g2item2ans2)).toContainText(values.g1Answer2);

  // group 3 - prefix, score
  await byId(page, ids.g3item1).click();
  await expect(listItems.nth(0)).toContainText(values.g3Answer1);
  await expect(listItems.nth(1)).toContainText(values.g3Answer2);
  await expect(listItems.nth(2)).toContainText(values.g3Answer3);
  await byId(page, ids.g3item2).click();
  await expect(listItems.nth(0)).toContainText(values.g3Answer1);
  await expect(listItems.nth(1)).toContainText(values.g3Answer2);
  await expect(listItems.nth(2)).toContainText(values.g3Answer3);

  // group 4 - radio/checkbox prefix
  await expect(byId(page, ids.g4item1ans2)).toContainText(values.g3Answer2);
  await expect(byId(page, ids.g4item2ans2)).toContainText(values.g3Answer2);

  // group 5 - initial
  await expect(byId(page, ids.g5item1)).toHaveValue(values.g1Answer2);
  await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li')).toHaveCount(2);
  await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);
  await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(1)).toHaveText('×' + values.g1Answer3);

  // group 6 - radio initial
  await expect(byId(page, ids.g6item1ans2)).toContainText(values.g1Answer2);
  await expect(byId(page, `${ids.g6item1ans2}`).locator('input').first()).toBeChecked();
  // checkbox initial
  await expect(byId(page, ids.g6item2ans2)).toContainText(values.g1Answer2);
  await expect(byId(page, `${ids.g6item2ans1}`).locator('input').first()).not.toBeChecked();
  await expect(byId(page, `${ids.g6item2ans2}`).locator('input').first()).toBeChecked();
  await expect(byId(page, ids.g6item2ans3)).toContainText(values.g1Answer3);
  await expect(byId(page, `${ids.g6item2ans3}`).locator('input').first()).toBeChecked();
}

async function testRenderOptionsOrString(page: Page, ids: any, values: any) {
  // group 1 - autocomplete
  await expect(byId(page, ids.g1item1)).toBeVisible();
  await byId(page, ids.g1item1).click();
  const listItems = page.locator('#lhc-tools-searchResults li');
  await expect(listItems.nth(0)).toContainText(values.g1Answer1);
  await expect(listItems.nth(1)).toContainText(values.g1Answer2);
  await expect(listItems.nth(2)).toContainText(values.g1Answer3);
  await byId(page, ids.g1item2).click();
  await expect(listItems.nth(0)).toContainText(values.g1Answer1);
  await expect(listItems.nth(1)).toContainText(values.g1Answer2);
  await expect(listItems.nth(2)).toContainText(values.g1Answer3);

  // group 2,3,4
  await expect(byId(page, ids.g2item1ans2)).toContainText(values.g1Answer2);
  await expect(byId(page, ids.g2item2ans2)).toContainText(values.g1Answer2);
  await byId(page, ids.g3item1).click();
  await expect(listItems.nth(0)).toContainText(values.g3Answer1);
  await byId(page, ids.g3item2).click();
  await expect(listItems.nth(0)).toContainText(values.g3Answer1);
  await expect(listItems.nth(1)).toContainText(values.g3Answer2);
  await expect(listItems.nth(2)).toContainText(values.g3Answer3);
  await expect(byId(page, ids.g4item1ans2)).toContainText(values.g3Answer2);
  await expect(byId(page, ids.g4item2ans2)).toContainText(values.g3Answer2);

  // group 5 - initial is "user typed value"
  await expect(byId(page, ids.g5item1)).toHaveValue('user typed value');
  await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li')).toHaveCount(2);
  await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);
  await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(1)).toHaveText('×user typed value');

  // group 6 - radio with "other"
  await expect(byId(page, ids.g6item1ans2)).toContainText(values.g1Answer2);
  await expect(byId(page, `${ids.g6item1ans2}`).locator('input').first()).not.toBeChecked();
  await expect(byId(page, ids.g6item1ansOther).locator('input').first()).toBeChecked();
  await expect(byId(page, ids.g6item1ansOtherValue)).toHaveValue('user typed value');
  // checkbox with "other"
  await expect(byId(page, ids.g6item2ans2)).toContainText(values.g1Answer2);
  await expect(byId(page, `${ids.g6item2ans1}`).locator('input').first()).not.toBeChecked();
  await expect(byId(page, `${ids.g6item2ans2}`).locator('input').first()).toBeChecked();
  await expect(byId(page, ids.g6item2ans3)).toContainText(values.g1Answer3);
  await expect(byId(page, `${ids.g6item2ans3}`).locator('input').first()).not.toBeChecked();
  await expect(byId(page, ids.g6item2ansOther).locator('input').first()).toBeChecked();
  await expect(byId(page, ids.g6item2ansOtherValue)).toHaveValue('user typed value');

  // group 7 - matrix radio
  await expect(byId(page, ids.g7item1ans2)).toBeChecked();
  await expect(byId(page, ids.g7item2ansOther)).toBeChecked();
  await expect(byId(page, ids.g7item2ansOtherValue)).toHaveValue('user typed value');

  // group 8 - matrix checkbox
  await expect(byId(page, ids.g8item1ans2)).toBeChecked();
  await expect(byId(page, ids.g8item1ans3)).toBeChecked();
  await expect(byId(page, ids.g8item2ans2)).toBeChecked();
  await expect(byId(page, ids.g8item2ansOther)).toBeChecked();
  await expect(byId(page, ids.g8item2ansOtherValue)).toHaveValue('user typed value');
}

test.describe('answerConstraint with different types', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/addFormToPageTest.html');
    await waitForLFormsReady(page);
  });

  const valueTypes = ['valueString', 'valueInteger', 'valueDate', 'valueTime', 'valueCoding'];

  for (let index = 0; index < valueTypes.length; index++) {
    const valueType = valueTypes[index];
    const lfDataType = lfDataTypes[index];
    const values = itemValues[valueType];
    const ids = getItemIds(valueType, values);

    test.describe(`${lfDataType} - no answerConstraint`, () => {
      test(`should render a questionnaire with ${lfDataType}`, async ({ page }) => {
        await addFormToPage(page, `answerConstraint/dataType-${lfDataType}.json`, 'formContainer');
        await testRenderNullOrOptionsOnly(page, ids, values);
      });
    });

    test.describe(`${lfDataType} - optionsOnly`, () => {
      test(`should render a questionnaire with ${lfDataType} and optionsOnly`, async ({ page }) => {
        await addFormToPage(page, `answerConstraint/dataType-${lfDataType}-optionsOnly.json`, 'formContainer');
        await testRenderNullOrOptionsOnly(page, ids, values);
      });
    });

    test.describe(`${lfDataType} - optionsOrString`, () => {
      test(`should render a questionnaire with ${lfDataType} and optionsOrString`, async ({ page }) => {
        await addFormToPage(page, `answerConstraint/dataType-${lfDataType}-optionsOrString.json`, 'formContainer');
        await testRenderOptionsOrString(page, ids, values);
      });
    });
  }
});
