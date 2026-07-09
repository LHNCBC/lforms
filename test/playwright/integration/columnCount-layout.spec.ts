import { test, expect, type Page } from '@playwright/test';
import { waitForLFormsReady } from '../support/lforms-helpers';

const urinaryContinenceAnswerOptions = [
  {
    code: 'LA11042-1',
    display: 'Always continent'
  },
  {
    code: 'LA11043-9',
    display: 'Occasionally incontinent (less than 7 episodes of incontinence)'
  },
  {
    code: 'LA11044-7',
    display: 'Frequently incontinent (7 or more episodes of urinary incontinence, but with at least one episode of continent voiding)'
  },
  {
    code: 'LA11045-4',
    display: 'Always incontinent (no episodes of continent voiding)'
  },
  {
    code: 'LA11046-2',
    display: 'Not rated, resident had a catheter (indwelling, condom), urinary ostomy, or no urine output for the entire 7 days'
  }
];

function buildQuestionnaire(controlCode: 'radio-button' | 'check-box') {
  return {
    resourceType: 'Questionnaire',
    title: 'Column count layout test',
    status: 'draft',
    code: [
      {
        system: 'http://loinc.org',
        code: '54770-3',
        display: 'Urinary continence in last 7 days [CMS Assessment]'
      }
    ],
    item: [
      {
        type: 'choice',
        repeats: controlCode === 'check-box',
        linkId: '/column-count-layout',
        text: 'Urinary continence in last 7 days',
        code: [
          {
            system: 'http://loinc.org',
            code: '54770-3',
            display: 'Urinary continence in last 7 days [CMS Assessment]'
          }
        ],
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation',
            valueCode: 'horizontal'
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'http://hl7.org/fhir/questionnaire-item-control',
                  code: controlCode,
                  display: controlCode === 'radio-button' ? 'Radio Button' : 'Check-box'
                }
              ],
              text: controlCode === 'radio-button' ? 'Radio Button' : 'Check-box'
            }
          },
          {
            url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-columnCount',
            valuePositiveInt: 4
          }
        ],
        answerOption: urinaryContinenceAnswerOptions.map(({ code, display }) => ({
          valueCoding: { code, display, system: 'http://loinc.org' }
        }))
      }
    ]
  };
}

async function addInlineQuestionnaire(page: Page, controlCode: 'radio-button' | 'check-box') {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/test/pages/addFormToPageTest.html');
  await waitForLFormsReady(page);

  await page.evaluate(
    async ({ questionnaire }) => {
      document.getElementById('formContainer')!.innerHTML = '';
      await (window as any).LForms.Util.addFormToPage(questionnaire, 'formContainer', { fhirVersion: 'R4' });
    },
    { questionnaire: buildQuestionnaire(controlCode) }
  );

  await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();
}

async function expectFourColumnHintLayout(page: Page, containerSelector: string) {
  const container = page.locator(containerSelector);
  await expect(container).toHaveClass(/lhc-grid/);
  await expect(container).toHaveCSS('--lhc-answer-column-width', '25%');

  const answers = container.locator('.lhc-answer');
  await expect(answers).toHaveCount(5);

  const boxes = await Promise.all(
    Array.from({ length: 5 }, (_, index) => answers.nth(index).boundingBox())
  );
  expect(boxes.every(Boolean)).toBeTruthy();

  const firstRowTop = boxes[0]!.y;
  for (let i = 0; i < 4; i++) {
    expect(Math.abs(boxes[i]!.y - firstRowTop)).toBeLessThan(2);
    expect(Math.abs(boxes[i]!.width - boxes[0]!.width)).toBeLessThan(2);
  }
  expect(boxes[4]!.y).toBeGreaterThan(firstRowTop + 1);
  expect(Math.abs(boxes[4]!.width - boxes[0]!.width)).toBeLessThan(2);

  for (const answerOption of urinaryContinenceAnswerOptions) {
    await expect(answers.filter({ hasText: answerOption.display })).toHaveCount(1);
  }

  const lineCounts = await page.evaluate(
    ({ selector, shortAnswerText, longAnswerText }) => {
      const getTextLineCount = (answerText: string) => {
        const answerElement = Array.from(document.querySelectorAll(`${selector} .lhc-answer`))
          .find((element) => element.textContent?.includes(answerText));
        if (!answerElement) {
          return 0;
        }

        const walker = document.createTreeWalker(answerElement, NodeFilter.SHOW_TEXT);
        let textNode = walker.nextNode();
        while (textNode) {
          const text = textNode.textContent || '';
          const textIndex = text.indexOf(answerText);
          if (textIndex >= 0) {
            const range = document.createRange();
            range.setStart(textNode, textIndex);
            range.setEnd(textNode, textIndex + answerText.length);
            const lineCount = range.getClientRects().length;
            range.detach();
            return lineCount;
          }
          textNode = walker.nextNode();
        }

        return 0;
      };

      return {
        shortAnswer: getTextLineCount(shortAnswerText),
        longAnswer: getTextLineCount(longAnswerText)
      };
    },
    {
      selector: containerSelector,
      shortAnswerText: urinaryContinenceAnswerOptions[0].display,
      longAnswerText: urinaryContinenceAnswerOptions[4].display
    }
  );
  expect(lineCounts.shortAnswer).toBe(1);
  expect(lineCounts.longAnswer).toBeGreaterThan(1);
}

test.describe('Questionnaire columnCount layout', () => {
  test('renders radio answer options as equal-width column hints', async ({ page }) => {
    await addInlineQuestionnaire(page, 'radio-button');
    await expectFourColumnHintLayout(page, 'nz-radio-group.lhc-grid');
  });

  test('renders checkbox answer options as equal-width column hints', async ({ page }) => {
    await addInlineQuestionnaire(page, 'check-box');
    await expectFourColumnHintLayout(page, '.lhc-checkbox-group.lhc-grid');
  });
});
