import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { byId, answerId, addFormToPage, waitForLFormsReady } from '../../support/lforms-helpers';

const fhirVersion = 'R5';
const itemWeightExtension = {
  extension: [{
    url: 'http://hl7.org/fhir/StructureDefinition/itemWeight',
    valueDecimal: 2
  }]
};

const itemValues = {
  valueString: {
    g1Answer1: 'a', g1Answer2: 'b', g1Answer3: 'c',
    g3Answer1: 'A. a - 1', g3Answer2: 'B. b - 2', g3Answer3: 'C. c - 3'
  },
  valueInteger: {
    g1Answer1: '12', g1Answer2: '34', g1Answer3: '56',
    g3Answer1: 'A. 12 - 1', g3Answer2: 'B. 34 - 2', g3Answer3: 'C. 56 - 3'
  },
  valueDate: {
    g1Answer1: '2022', g1Answer2: '2022-09', g1Answer3: '2022-09-20',
    g3Answer1: 'A. 2022 - 1', g3Answer2: 'B. 2022-09 - 2', g3Answer3: 'C. 2022-09-20 - 3'
  },
  valueTime: {
    g1Answer1: '10:30:00', g1Answer2: '13:30:00', g1Answer3: '23:59:59',
    g3Answer1: 'A. 10:30:00 - 1', g3Answer2: 'B. 13:30:00 - 2', g3Answer3: 'C. 23:59:59 - 3'
  },
  valueCoding: {
    g1Answer1: 'Answer 1', g1Answer2: 'Answer 2', g1Answer3: 'Answer 3',
    g1Code1: 'c1', g1Code2: 'c2', g1Code3: 'c3',
    g3Answer1: 'A. Answer 1 - 1', g3Answer2: 'B. Answer 2 - 2', g3Answer3: 'C. Answer 3 - 3'
  }
};

const qrItemValues = {
  valueString: {
    g1Answer1: { valueString: 'a' }, g1Answer2: { valueString: 'b' }, g1Answer3: { valueString: 'c' }
  },
  valueInteger: {
    g1Answer1: { valueInteger: 12 }, g1Answer2: { valueInteger: 34 }, g1Answer3: { valueInteger: 56 }
  },
  valueDate: {
    g1Answer1: { valueDate: '2022' }, g1Answer2: { valueDate: '2022-09' }, g1Answer3: { valueDate: '2022-09-20' }
  },
  valueTime: {
    g1Answer1: { valueTime: '10:30:00' }, g1Answer2: { valueTime: '13:30:00' }, g1Answer3: { valueTime: '23:59:59' }
  },
  valueCoding: {
    g1Answer1: { valueCoding: { code: 'c1', display: 'Answer 1' } },
    g1Answer2: { valueCoding: { code: 'c2', display: 'Answer 2' } },
    g1Answer3: { valueCoding: { code: 'c3', display: 'Answer 3' } }
  }
};

function getItemIds(valueType: string, values: any) {
  const coding = (valueType === 'valueCoding');
  return {
    g1item1: `${valueType}-group1-item1/1/1`,
    g1item2: `${valueType}-group1-item2/1/1`,
    g3item1: `${valueType}-group3-item1/1/1`,
    g3item2: `${valueType}-group3-item2/1/1`,
    g5item1: `${valueType}-group5-item1/1/1`,
    g5item2: `${valueType}-group5-item2/1/1`,
    g2item1ans2: answerId(`${valueType}-group2-item1/1/1`, undefined,
      `${coding ? values.g1Code2 : values.g1Answer2}`),
    g2item2ans2: answerId(`${valueType}-group2-item2/1/1`, undefined,
      `${coding ? values.g1Code2 : values.g1Answer2}`),
    g4item1ans2: answerId(`${valueType}-group4-item1/1/1`, undefined,
      `${coding ? values.g1Code2 : values.g1Answer2}`),
    g4item2ans2: answerId(`${valueType}-group4-item2/1/1`, undefined,
      `${coding ? values.g1Code2 : values.g1Answer2}`),
    g6item1ans1: answerId(`${valueType}-group6-item1/1/1`, undefined,
      `${coding ? values.g1Code1 : values.g1Answer1}`),
    g6item1ans2: answerId(`${valueType}-group6-item1/1/1`, undefined,
      `${coding ? values.g1Code2 : values.g1Answer2}`),
    g6item1ans3: answerId(`${valueType}-group6-item1/1/1`, undefined,
      `${coding ? values.g1Code3 : values.g1Answer3}`),
    g6item2ans1: answerId(`${valueType}-group6-item2/1/1`, undefined,
      `${coding ? values.g1Code1 : values.g1Answer1}`),
    g6item2ans2: answerId(`${valueType}-group6-item2/1/1`, undefined,
      `${coding ? values.g1Code2 : values.g1Answer2}`),
    g6item2ans3: answerId(`${valueType}-group6-item2/1/1`, undefined,
      `${coding ? values.g1Code3 : values.g1Answer3}`)
  };
}

const valueTypes = ['valueString', 'valueInteger', 'valueDate', 'valueTime', 'valueCoding'];
const answerConstraints = ['optionsOnly', 'optionsOrString'];

test.describe('AnswerOption with different types', () => {
  for (const valueType of valueTypes) {
    const values = itemValues[valueType];
    const ids = getItemIds(valueType, values);
    const qrValues = qrItemValues[valueType];

    for (const answerConstraint of answerConstraints) {
      const fileName = `answerOption/answerOption-${valueType}.${answerConstraint}.${fhirVersion}.json`;

      test.describe(`${fhirVersion} - ${valueType} - ${answerConstraint}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await addFormToPage(page, fileName, 'formContainer', { fhirVersion });
        });

        test(`should render a questionnaire with answerOption where item.type=${valueType} and item.answerConstraint=${answerConstraint}`, async ({ page }) => {
          // group 1 - autocomplete, non-repeats
          await expect(byId(page, ids.g1item1)).toBeVisible();
          await byId(page, ids.g1item1).click();
          const searchResults = page.locator('#lhc-tools-searchResults li');
          await expect(searchResults.nth(0)).toContainText(values.g1Answer1);
          await expect(searchResults.nth(1)).toContainText(values.g1Answer2);
          await expect(searchResults.nth(2)).toContainText(values.g1Answer3);
          // autocomplete, repeats
          await expect(byId(page, ids.g1item2)).toBeVisible();
          await byId(page, ids.g1item2).click();
          const searchResults2 = page.locator('#lhc-tools-searchResults li');
          await expect(searchResults2.nth(0)).toContainText(values.g1Answer1);
          await expect(searchResults2.nth(1)).toContainText(values.g1Answer2);
          await expect(searchResults2.nth(2)).toContainText(values.g1Answer3);

          // group 2 - radiobutton
          await expect(byId(page, ids.g2item1ans2)).toBeVisible();
          await expect(byId(page, ids.g2item1ans2)).toContainText(values.g1Answer2);
          // checkbox
          await expect(byId(page, ids.g2item2ans2)).toBeVisible();
          await expect(byId(page, ids.g2item2ans2)).toContainText(values.g1Answer2);

          // group 3 - autocomplete, non-repeats, prefix, score
          await expect(byId(page, ids.g3item1)).toBeVisible();
          await byId(page, ids.g3item1).click();
          const searchResults3 = page.locator('#lhc-tools-searchResults li');
          await expect(searchResults3.nth(0)).toContainText(values.g3Answer1);
          await expect(searchResults3.nth(1)).toContainText(values.g3Answer2);
          await expect(searchResults3.nth(2)).toContainText(values.g3Answer3);
          // autocomplete, repeats, prefix, score
          await expect(byId(page, ids.g3item2)).toBeVisible();
          await byId(page, ids.g3item2).click();
          const searchResults4 = page.locator('#lhc-tools-searchResults li');
          await expect(searchResults4.nth(0)).toContainText(values.g3Answer1);
          await expect(searchResults4.nth(1)).toContainText(values.g3Answer2);
          await expect(searchResults4.nth(2)).toContainText(values.g3Answer3);

          // group 4 - radiobutton, prefix, score
          await expect(byId(page, ids.g4item1ans2)).toBeVisible();
          await expect(byId(page, ids.g4item1ans2)).toContainText(values.g3Answer2);
          // checkbox, prefix, score
          await expect(byId(page, ids.g4item2ans2)).toBeVisible();
          await expect(byId(page, ids.g4item2ans2)).toContainText(values.g3Answer2);

          // group 5 - autocomplete, non-repeats, initial
          if (answerConstraint === 'optionsOrString') {
            await expect(byId(page, ids.g5item1)).toBeVisible();
            await expect(byId(page, ids.g5item1)).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g5item1)).toBeVisible();
            await expect(byId(page, ids.g5item1)).toHaveValue(values.g1Answer2);
          }
          // autocomplete, repeats, initial
          await expect(byId(page, ids.g5item2)).toBeVisible();
          const selectedItems = byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li');
          await expect(selectedItems).toHaveCount(2);
          await expect(selectedItems.nth(0)).toHaveText('×' + values.g1Answer2);
          if (answerConstraint === 'optionsOrString') {
            await expect(selectedItems.nth(1)).toHaveText('×user typed value');
          } else {
            await expect(selectedItems.nth(1)).toHaveText('×' + values.g1Answer3);
          }

          // group 6 - radiobutton, non-repeats, initial
          await expect(byId(page, ids.g6item1ans2)).toBeVisible();
          await expect(byId(page, ids.g6item1ans2)).toContainText(values.g1Answer2);
          if (answerConstraint === 'optionsOrString') {
            await expect(byId(page, ids.g6item1ans2).locator('input')).not.toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item1/1/1`, '_other')).locator('input').first()).toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item1/1/1`, '_otherValue'))).toBeVisible();
            await expect(byId(page, answerId(`${valueType}-group6-item1/1/1`, '_otherValue'))).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g6item1ans2).locator('input')).toBeChecked();
          }

          // checkbox, repeats, initial
          await expect(byId(page, ids.g6item2ans2)).toBeVisible();
          await expect(byId(page, ids.g6item2ans2)).toContainText(values.g1Answer2);
          await expect(byId(page, ids.g6item2ans1).locator('input')).not.toBeChecked();
          await expect(byId(page, ids.g6item2ans2).locator('input')).toBeChecked();
          await expect(byId(page, ids.g6item2ans3)).toBeVisible();
          await expect(byId(page, ids.g6item2ans3)).toContainText(values.g1Answer3);
          if (answerConstraint === 'optionsOrString') {
            await expect(byId(page, ids.g6item2ans3).locator('input')).not.toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item2/1/1`, '_other')).locator('input').first()).toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item2/1/1`, '_otherValue'))).toBeVisible();
            await expect(byId(page, answerId(`${valueType}-group6-item2/1/1`, '_otherValue'))).toHaveValue('user typed value');
          } else {
            await expect(byId(page, `${ids.g6item2ans3}`).locator('input')).toBeChecked();
          }
        });

        test(`should get a correct QR from a questionnaire with answerOption where item.type=${valueType} and item.answerConstraint=${answerConstraint}, and should merge back`, async ({ page }) => {
          // group 1 - autocomplete, non-repeats: select 2nd item
          const g1item1 = byId(page, ids.g1item1);
          await g1item1.click();
          await g1item1.press('ArrowDown');
          await g1item1.press('ArrowDown');
          await g1item1.press('Enter');
          // autocomplete, repeats: select 2nd item
          const g1item2 = byId(page, ids.g1item2);
          await g1item2.click();
          await g1item2.press('ArrowDown');
          await g1item2.press('ArrowDown');
          await g1item2.press('Enter');

          // group 2 - radiobutton
          await byId(page, ids.g2item1ans2).click();
          // checkbox
          await byId(page, ids.g2item2ans2).click();

          // group 3 - autocomplete, non-repeats, prefix, score: select 2nd item
          const g3item1 = byId(page, ids.g3item1);
          await g3item1.click();
          await g3item1.press('ArrowDown');
          await g3item1.press('ArrowDown');
          await g3item1.press('Enter');
          // autocomplete, repeats, prefix, score: select 2nd item
          const g3item2 = byId(page, ids.g3item2);
          await g3item2.click();
          await g3item2.press('ArrowDown');
          await g3item2.press('ArrowDown');
          await g3item2.press('Enter');

          // group 4 - radiobutton, prefix, score
          await byId(page, ids.g4item1ans2).click();
          // checkbox, prefix, score
          await byId(page, ids.g4item2ans2).click();

          // group 5 and group 6 use initial values

          // get QuestionnaireResponse
          const qr = await page.evaluate((ver) =>
            (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', ver),
            fhirVersion
          );

          expect(qr.item[0].item[0].answer).toEqual([qrValues.g1Answer2]);
          expect(qr.item[0].item[1].answer).toEqual([qrValues.g1Answer2]);
          expect(qr.item[1].item[0].answer).toEqual([qrValues.g1Answer2]);
          expect(qr.item[1].item[1].answer).toEqual([qrValues.g1Answer2]);

          if (valueType !== 'valueCoding') {
            const g1Answer2WithExt = { ...qrValues.g1Answer2, [`_${valueType}`]: itemWeightExtension };
            expect(qr.item[2].item[0].answer).toEqual([g1Answer2WithExt]);
            expect(qr.item[2].item[1].answer).toEqual([g1Answer2WithExt]);
            expect(qr.item[3].item[0].answer).toEqual([g1Answer2WithExt]);
            expect(qr.item[3].item[1].answer).toEqual([g1Answer2WithExt]);
          } else {
            const g1AnswerCodingWithExt = { ...qrValues.g1Answer2.valueCoding, ...itemWeightExtension };
            expect(qr.item[2].item[0].answer[0].valueCoding).toEqual(g1AnswerCodingWithExt);
            expect(qr.item[2].item[1].answer[0].valueCoding).toEqual(g1AnswerCodingWithExt);
            expect(qr.item[3].item[0].answer[0].valueCoding).toEqual(g1AnswerCodingWithExt);
            expect(qr.item[3].item[1].answer[0].valueCoding).toEqual(g1AnswerCodingWithExt);
          }

          if (answerConstraint === 'optionsOrString') {
            expect(qr.item[4].item[0].answer).toEqual([{ valueString: 'user typed value' }]);
            expect(qr.item[4].item[1].answer).toEqual([qrValues.g1Answer2, { valueString: 'user typed value' }]);
            expect(qr.item[5].item[0].answer).toEqual([{ valueString: 'user typed value' }]);
            expect(qr.item[5].item[1].answer).toEqual([qrValues.g1Answer2, { valueString: 'user typed value' }]);
          } else {
            expect(qr.item[4].item[0].answer).toEqual([qrValues.g1Answer2]);
            expect(qr.item[4].item[1].answer).toEqual([qrValues.g1Answer2, qrValues.g1Answer3]);
            expect(qr.item[5].item[0].answer).toEqual([qrValues.g1Answer2]);
            expect(qr.item[5].item[1].answer).toEqual([qrValues.g1Answer2, qrValues.g1Answer3]);
          }

          // merge the QuestionnaireResponse back to the Questionnaire
          const fhirVersionInFile = 'R5';
          const filePath = path.resolve(`test/data/${fhirVersionInFile}/${fileName}`);
          const q = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

          await page.evaluate(({ q, qr, fhirVersion }) => {
            const win = window as any;
            const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
            const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
            win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
          }, { q, qr, fhirVersion });

          await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();

          // user data should be displayed
          // group 1 - autocomplete, non-repeats
          await expect(byId(page, ids.g1item1)).toHaveValue(values.g1Answer2);
          // autocomplete, repeats
          const sel1 = byId(page, `item-${ids.g1item2}`).locator('span.autocomp_selected li');
          await expect(sel1).toHaveCount(1);
          await expect(sel1.nth(0)).toHaveText('×' + values.g1Answer2);

          // group 2 - radiobutton
          await expect(byId(page, ids.g2item1ans2).locator('input')).toBeChecked();
          // checkbox
          await expect(byId(page, ids.g2item2ans2).locator('input')).toBeChecked();

          // group 3 - autocomplete, non-repeats, prefix, score
          await expect(byId(page, ids.g3item1)).toHaveValue(values.g3Answer2);
          // autocomplete, repeats, prefix, score
          const sel3 = byId(page, `item-${ids.g3item2}`).locator('span.autocomp_selected li');
          await expect(sel3).toHaveCount(1);
          await expect(sel3.nth(0)).toHaveText('×' + values.g3Answer2);

          // group 4 - radiobutton, prefix, score
          await expect(byId(page, ids.g4item1ans2).locator('input')).toBeChecked();
          // checkbox, prefix, score
          await expect(byId(page, ids.g4item2ans2).locator('input')).toBeChecked();

          // group 5 - autocomplete, non-repeats, initial
          if (answerConstraint === 'optionsOrString') {
            await expect(byId(page, ids.g5item1)).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g5item1)).toHaveValue(values.g1Answer2);
          }
          // autocomplete, repeats, initial
          const sel5 = byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li');
          await expect(sel5).toHaveCount(2);
          await expect(sel5.nth(0)).toHaveText('×' + values.g1Answer2);
          if (answerConstraint === 'optionsOrString') {
            await expect(sel5.nth(1)).toHaveText('×user typed value');
          } else {
            await expect(sel5.nth(1)).toHaveText('×' + values.g1Answer3);
          }

          // group 6 - radiobutton, non-repeats, initial
          await expect(byId(page, ids.g6item1ans1).locator('input')).not.toBeChecked();
          await expect(byId(page, ids.g6item1ans3).locator('input')).not.toBeChecked();
          if (answerConstraint === 'optionsOrString') {
            await expect(byId(page, ids.g6item1ans2).locator('input')).not.toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item1/1/1`, '_other')).locator('input').first()).toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item1/1/1`, '_otherValue'))).toBeVisible();
            await expect(byId(page, answerId(`${valueType}-group6-item1/1/1`, '_otherValue'))).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g6item1ans2).locator('input')).toBeChecked();
          }

          // checkbox, repeats, initial
          await expect(byId(page, ids.g6item2ans1).locator('input')).not.toBeChecked();
          await expect(byId(page, ids.g6item2ans2).locator('input')).toBeChecked();
          if (answerConstraint === 'optionsOrString') {
            await expect(byId(page, ids.g6item2ans3).locator('input')).not.toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item2/1/1`, '_other')).locator('input').first()).toBeChecked();
            await expect(byId(page, answerId(`${valueType}-group6-item2/1/1`, '_otherValue'))).toBeVisible();
            await expect(byId(page, answerId(`${valueType}-group6-item2/1/1`, '_otherValue'))).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g6item2ans3).locator('input')).toBeChecked();
          }
        });
      });
    }
  }
});
