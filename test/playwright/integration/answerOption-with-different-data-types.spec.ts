import { test, expect } from '@playwright/test';
import { addFormToPage, waitForLFormsReady, byId, answerId } from '../support/lforms-helpers';
import * as fs from 'fs';

const fhirVersions = ['R4', 'STU3'];

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
  'valueCoding.choice': {
    g1Answer1: 'Answer 1', g1Answer2: 'Answer 2', g1Answer3: 'Answer 3',
    g1Code1: 'c1', g1Code2: 'c2', g1Code3: 'c3',
    g3Answer1: 'A. Answer 1 - 1', g3Answer2: 'B. Answer 2 - 2', g3Answer3: 'C. Answer 3 - 3'
  },
  'valueCoding.open-choice': {
    g1Answer1: 'Answer 1', g1Answer2: 'Answer 2', g1Answer3: 'Answer 3',
    g1Code1: 'c1', g1Code2: 'c2', g1Code3: 'c3',
    g3Answer1: 'A. Answer 1 - 1', g3Answer2: 'B. Answer 2 - 2', g3Answer3: 'C. Answer 3 - 3'
  }
};

const qrItemValues: Record<string, any> = {
  'valueString': {
    g1Answer1: { valueString: 'a' }, g1Answer2: { valueString: 'b' }, g1Answer3: { valueString: 'c' }
  },
  'valueInteger': {
    g1Answer1: { valueInteger: 12 }, g1Answer2: { valueInteger: 34 }, g1Answer3: { valueInteger: 56 }
  },
  'valueDate': {
    g1Answer1: { valueDate: '2022' }, g1Answer2: { valueDate: '2022-09' }, g1Answer3: { valueDate: '2022-09-20' }
  },
  'valueTime': {
    g1Answer1: { valueTime: '10:30:00' }, g1Answer2: { valueTime: '13:30:00' }, g1Answer3: { valueTime: '23:59:59' }
  },
  'valueCoding.choice': {
    g1Answer1: { valueCoding: { code: 'c1', display: 'Answer 1' } },
    g1Answer2: { valueCoding: { code: 'c2', display: 'Answer 2' } },
    g1Answer3: { valueCoding: { code: 'c3', display: 'Answer 3' } }
  },
  'valueCoding.open-choice': {
    g1Answer1: { valueCoding: { code: 'c1', display: 'Answer 1' } },
    g1Answer2: { valueCoding: { code: 'c2', display: 'Answer 2' } },
    g1Answer3: { valueCoding: { code: 'c3', display: 'Answer 3' } }
  }
};

function getItemIds(valueType: string, values: any) {
  const coding = valueType === 'valueCoding.choice' || valueType === 'valueCoding.open-choice';
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
    g6item2ans3: `${valueType}-group6-item2/1/1||${coding ? values.g1Code3 : values.g1Answer3}`
  };
}

for (const fhirVersion of fhirVersions) {
  test.describe(`AnswerOption with different types - ${fhirVersion}`, () => {
    const valueTypes = ['valueString', 'valueInteger', 'valueDate', 'valueTime', 'valueCoding.choice', 'valueCoding.open-choice'];

    for (const valueType of valueTypes) {
      const values = itemValues[valueType];
      const ids = getItemIds(valueType, values);
      const qrValues = qrItemValues[valueType];
      const fhirVersionInFile = fhirVersion === 'R4B' ? 'R4' : fhirVersion;
      const fileName = `answerOption/answerOption-${valueType}.${fhirVersionInFile}.json`;

      test.describe(`${fhirVersion} - ${valueType}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto('/test/pages/addFormToPageTest.html');
          await waitForLFormsReady(page);
          await addFormToPage(page, fileName, 'formContainer', { fhirVersion });
        });

        test(`should render a questionnaire with ${valueType} in answerOption`, async ({ page }) => {
          const listItems = page.locator('#lhc-tools-searchResults li');

          // group 1
          // autocomplete, non-repearts
          await byId(page, ids.g1item1).click();
          await expect(listItems.nth(0)).toContainText(values.g1Answer1);
          await expect(listItems.nth(1)).toContainText(values.g1Answer2);
          await expect(listItems.nth(2)).toContainText(values.g1Answer3);
          // autocomplete, repeats
          await byId(page, ids.g1item2).click();
          await expect(listItems.nth(0)).toContainText(values.g1Answer1);
          await expect(listItems.nth(1)).toContainText(values.g1Answer2);
          await expect(listItems.nth(2)).toContainText(values.g1Answer3);

          // group 2 
          // radio
          await expect(byId(page, ids.g2item1ans2)).toContainText(values.g1Answer2);
          // checkbox
          await expect(byId(page, ids.g2item2ans2)).toContainText(values.g1Answer2);

          // group 3
          // autocomplete, non-repeats, prefix, score
          await byId(page, ids.g3item1).click();
          await expect(listItems.nth(0)).toContainText(values.g3Answer1);
          await expect(listItems.nth(1)).toContainText(values.g3Answer2);
          await expect(listItems.nth(2)).toContainText(values.g3Answer3);
          // autocomplete, repeats, prefix, score
          await byId(page, ids.g3item2).click();
          await expect(listItems.nth(0)).toContainText(values.g3Answer1);
          await expect(listItems.nth(1)).toContainText(values.g3Answer2);
          await expect(listItems.nth(2)).toContainText(values.g3Answer3);

          // group 4
          // radiobutton, prefix, score
          await expect(byId(page, ids.g4item1ans2)).toContainText(values.g3Answer2);
          // checkbox, prefix, score
          await expect(byId(page, ids.g4item2ans2)).toContainText(values.g3Answer2);

          // group 5
          // autocomplete, non-repeats, initial
          // for open-choice, the initial value is free text
          if (valueType === 'valueCoding.open-choice') {
            await expect(byId(page, ids.g5item1)).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g5item1)).toHaveValue(values.g1Answer2);
          }
          // autocomplete, repeats, initial
          if (fhirVersion === 'R4' || fhirVersion === 'R4B') {
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li')).toHaveCount(2);
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);
            if (valueType === 'valueCoding.open-choice') {
              // for open-choice, the 2nd initial value is free text
              await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(1)).toHaveText('×user typed value');
            } else {
              await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(1)).toHaveText('×' + values.g1Answer3);
            }
          } else {
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li')).toHaveCount(1);
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);
          }

          // group 6 
          // radiobutton, non-repeats, initial
          await expect(byId(page, ids.g6item1ans2)).toContainText(values.g1Answer2);
          // for open-choice, the initial value is free text
          if (valueType === 'valueCoding.open-choice') {
            await expect(byId(page, ids.g6item1ans2).locator('input').first()).not.toBeChecked();
            await expect(byId(page, answerId('valueCoding.open-choice-group6-item1/1/1', '_other')).locator('input').first()).toBeChecked();
            await expect(byId(page, answerId('valueCoding.open-choice-group6-item1/1/1', '_otherValue'))).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g6item1ans2).locator('input').first()).toBeChecked();
          }
          // checkbox, repeats, initial
          await expect(byId(page, ids.g6item2ans2)).toContainText(values.g1Answer2);
          await expect(byId(page, `${ids.g6item2ans1}`).locator('input').first()).not.toBeChecked();
          await expect(byId(page, `${ids.g6item2ans2}`).locator('input').first()).toBeChecked();
          await expect(byId(page, ids.g6item2ans3)).toContainText(values.g1Answer3);

          if (fhirVersion === 'R4' || fhirVersion === 'R4B') {
            if (valueType === 'valueCoding.open-choice') {
              await expect(byId(page, ids.g6item2ans3).locator('input').first()).not.toBeChecked();
              await expect(byId(page, answerId('valueCoding.open-choice-group6-item2/1/1', '_other')).locator('input').first()).toBeChecked();
              await expect(byId(page, answerId('valueCoding.open-choice-group6-item2/1/1', '_otherValue'))).toHaveValue('user typed value');
            } else {
              await expect(byId(page, ids.g6item2ans3).locator('input').first()).toBeChecked();
            }
          } else {
            await expect(byId(page, ids.g6item2ans3).locator('input').first()).not.toBeChecked();
          }
        });

        test(`should get correct QR and merge back for ${valueType}`, async ({ page }) => {
          // Select values
          // group 1
          // autocomplete, non-repeats
          await byId(page, ids.g1item1).click();
          await byId(page, ids.g1item1).press('ArrowDown');
          await byId(page, ids.g1item1).press('ArrowDown');
          await byId(page, ids.g1item1).press('Enter');
          // autocomplete, repeats
          await byId(page, ids.g1item2).click();
          await byId(page, ids.g1item2).press('ArrowDown');
          await byId(page, ids.g1item2).press('ArrowDown');
          await byId(page, ids.g1item2).press('Enter');
          // group 2
          // raidobutoon
          await byId(page, ids.g2item1ans2).click();
          // checkbox
          await byId(page, ids.g2item2ans2).click();
          // group 3
          // autocomplete, non-repeats, prefix, score
          await byId(page, ids.g3item1).click();
          await byId(page, ids.g3item1).press('ArrowDown');
          await byId(page, ids.g3item1).press('ArrowDown');
          await byId(page, ids.g3item1).press('Enter');
          // autocomplete, repeats, prefix, score
          await byId(page, ids.g3item2).click();
          await byId(page, ids.g3item2).press('ArrowDown');
          await byId(page, ids.g3item2).press('ArrowDown');
          await byId(page, ids.g3item2).press('Enter');
          // group 4
          // radiobutton, prefix, score
          await byId(page, ids.g4item1ans2).click();
          // checkbox, prefix, score
          await byId(page, ids.g4item2ans2).click();

          // group 5 and group 6 use the initial values

          // Get QR and merge back
          const qr = await page.evaluate((fv) => (window as any).LForms.Util.getFormFHIRData('QuestionnaireResponse', fv), fhirVersion);
          expect(qr.item[0].item[0].answer).toEqual([qrValues.g1Answer2]);
          expect(qr.item[0].item[1].answer).toEqual([qrValues.g1Answer2]);
          expect(qr.item[1].item[0].answer).toEqual([qrValues.g1Answer2]);
          expect(qr.item[1].item[1].answer).toEqual([qrValues.g1Answer2]);
          const ordinalValueExtension = {
            extension: [{
              url: fhirVersion === 'STU3' ? 'http://hl7.org/fhir/StructureDefinition/questionnaire-ordinalValue' : 'http://hl7.org/fhir/StructureDefinition/ordinalValue',
              valueDecimal: 2
            }]
          };
          if (!valueType.startsWith('valueCoding')) {
            const g1Answer2WithExtension = {...qrValues.g1Answer2, [`_${valueType}`]: ordinalValueExtension};
            expect(qr.item[2].item[0].answer).toEqual([g1Answer2WithExtension]);
            expect(qr.item[2].item[1].answer).toEqual([g1Answer2WithExtension]);
            expect(qr.item[3].item[0].answer).toEqual([g1Answer2WithExtension]);
            expect(qr.item[3].item[1].answer).toEqual([g1Answer2WithExtension]);
          } else {
            const g1AnswerCodingWithExtension = {...qrValues.g1Answer2.valueCoding, ...ordinalValueExtension};
            expect(qr.item[2].item[0].answer[0].valueCoding).toEqual(g1AnswerCodingWithExtension);
            expect(qr.item[2].item[1].answer[0].valueCoding).toEqual(g1AnswerCodingWithExtension);
            expect(qr.item[3].item[0].answer[0].valueCoding).toEqual(g1AnswerCodingWithExtension);
            expect(qr.item[3].item[1].answer[0].valueCoding).toEqual(g1AnswerCodingWithExtension);
          }
          if (valueType === 'valueCoding.open-choice') {
            expect(qr.item[4].item[0].answer).toEqual([{valueString: 'user typed value'}]);
          } else {
            expect(qr.item[4].item[0].answer).toEqual([qrValues.g1Answer2]);
          }
          if (fhirVersion === 'R4' || fhirVersion === 'R4B') {
            if (valueType === 'valueCoding.open-choice') {
              expect(qr.item[4].item[1].answer).toEqual([qrValues.g1Answer2, {valueString: 'user typed value'}]);
            } else {
              expect(qr.item[4].item[1].answer).toEqual([qrValues.g1Answer2, qrValues.g1Answer3]);
            }
          } else {
            expect(qr.item[4].item[1].answer).toEqual([qrValues.g1Answer2]);
          }
          if (valueType === 'valueCoding.open-choice') {
            expect(qr.item[5].item[0].answer).toEqual([{valueString: 'user typed value'}]);
          } else {
            expect(qr.item[5].item[0].answer).toEqual([qrValues.g1Answer2]);
          }
          if (fhirVersion === 'R4' || fhirVersion === 'R4B') {
            if (valueType === 'valueCoding.open-choice') {
              expect(qr.item[5].item[1].answer).toEqual([qrValues.g1Answer2, {valueString: 'user typed value'}]);
            } else {
              expect(qr.item[5].item[1].answer).toEqual([qrValues.g1Answer2, qrValues.g1Answer3]);
            }
          } else {
            expect(qr.item[5].item[1].answer).toEqual([qrValues.g1Answer2]);
          }

          // merge the QuestionnaireResonse back to the Questionnaire
          const qData = JSON.parse(fs.readFileSync(`test/data/${fhirVersionInFile}/${fileName}`, 'utf-8'));
          const hasSavedData = await page.evaluate(async ({ q, qr, fhirVersion }) => {
            const win = window as any;
            const formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
            const mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
            document.getElementById('formContainer')!.innerHTML = '';
            await win.LForms.Util.addFormToPage(mergedFormData, 'formContainer', { fhirVersion });
            return mergedFormData?.hasSavedData;
          }, { q: qData, qr, fhirVersion });
          expect(hasSavedData).toBe(true);
          await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();

          // Verify merged data
          // group 1
          // autocomplete, non-repeats
          await expect(byId(page, ids.g1item1)).toHaveValue(values.g1Answer2);
          // autocomplete, repeats
          await expect(byId(page, `item-${ids.g1item2}`).locator('span.autocomp_selected li')).toHaveCount(1);
          await expect(byId(page, `item-${ids.g1item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);

          // group 2
          // raidobutoon
          await expect(byId(page, `${ids.g2item1ans2}`).locator('input').first()).toBeChecked();
          // checkbox
          await expect(byId(page, `${ids.g2item2ans2}`).locator('input').first()).toBeChecked();

          // group 3
          // autocomplete, non-repeats, prefix, score
          await expect(byId(page, ids.g3item1)).toHaveValue(values.g3Answer2);
          // autocomplete, repeats, prefix, score
          await expect(byId(page, `item-${ids.g3item2}`).locator('span.autocomp_selected li')).toHaveCount(1);
          await expect(byId(page, `item-${ids.g3item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g3Answer2);

          // group 4
          // radiobutton, prefix, score
          await expect(byId(page, `${ids.g4item1ans2}`).locator('input').first()).toBeChecked();
          // checkbox, prefix, score
          await expect(byId(page, `${ids.g4item2ans2}`).locator('input').first()).toBeChecked();

          // group 5
          // autocomplete, non-repeats, initial
          if (valueType === 'valueCoding.open-choice') {
            await expect(byId(page, ids.g5item1)).toHaveValue('user typed value');
          } else {
            await expect(byId(page, ids.g5item1)).toHaveValue(values.g1Answer2);
          }
          // autocomplete, repeats, initial
          if (fhirVersion === 'R4' || fhirVersion === 'R4B') {
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li')).toHaveCount(2);
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);
            if (valueType === 'valueCoding.open-choice') {
              await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(1)).toHaveText('×user typed value');
            } else {
              await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(1)).toHaveText('×' + values.g1Answer3);
            }
          } else {
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li')).toHaveCount(1);
            await expect(byId(page, `item-${ids.g5item2}`).locator('span.autocomp_selected li').nth(0)).toHaveText('×' + values.g1Answer2);
          }

          // group 6
          // radiobutton, non-repeats, initial
          await expect(byId(page, `${ids.g6item1ans1}`).locator('input').first()).not.toBeChecked();
          await expect(byId(page, `${ids.g6item1ans3}`).locator('input').first()).not.toBeChecked();
          if (valueType === 'valueCoding.open-choice') {
            await expect(byId(page, `${ids.g6item1ans2}`).locator('input').first()).not.toBeChecked();
            await expect(byId(page, answerId('valueCoding.open-choice-group6-item1/1/1', '_other')).locator('input').first()).toBeChecked();
            await expect(byId(page, answerId('valueCoding.open-choice-group6-item1/1/1', '_otherValue'))).toHaveValue('user typed value');
          } else {
            await expect(byId(page, `${ids.g6item1ans2}`).locator('input').first()).toBeChecked();
          }
          // checkbox, repeats, initial
          await expect(byId(page, `${ids.g6item2ans1}`).locator('input').first()).not.toBeChecked();
          await expect(byId(page, `${ids.g6item2ans2}`).locator('input').first()).toBeChecked();
          if (fhirVersion === 'R4' || fhirVersion === 'R4B') {
            if (valueType === 'valueCoding.open-choice') {
              await expect(byId(page, `${ids.g6item2ans3}`).locator('input').first()).not.toBeChecked();
              await expect(byId(page, answerId('valueCoding.open-choice-group6-item2/1/1', '_other')).locator('input').first()).toBeChecked();
              await expect(byId(page, answerId('valueCoding.open-choice-group6-item2/1/1', '_otherValue'))).toHaveValue('user typed value');
            } else {
              await expect(byId(page, `${ids.g6item2ans3}`).locator('input').first()).toBeChecked();
            }
          } else {
            await expect(byId(page, `${ids.g6item2ans3}`).locator('input').first()).not.toBeChecked();
          }
        });
      });
    }
  });
}
