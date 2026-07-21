import { test, expect, type Locator, type Page } from '@playwright/test';
import { waitForLFormsReady } from '../support/lforms-helpers';

type AnswerOption = {
  code: string;
  display: string;
  system?: string;
};

const urinaryContinenceAnswerOptions: AnswerOption[] = [
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

const assistanceAnswerOptions: AnswerOption[] = [
  { code: 'independent', display: 'Independent', system: 'http://example.org/lforms-test-codes' },
  { code: 'setup-assistance', display: 'Setup or clean-up assistance', system: 'http://example.org/lforms-test-codes' },
  { code: 'supervision-assistance', display: 'Supervision or touching assistance', system: 'http://example.org/lforms-test-codes' },
  { code: 'partial-assistance', display: 'Partial/moderate assistance', system: 'http://example.org/lforms-test-codes' },
  { code: 'substantial-assistance', display: 'Substantial/maximal assistance', system: 'http://example.org/lforms-test-codes' },
  { code: 'dependent', display: 'Dependent', system: 'http://example.org/lforms-test-codes' },
  { code: 'not-attempted', display: 'Activity not attempted', system: 'http://example.org/lforms-test-codes' }
];

const shortAnswerOptions: AnswerOption[] = [
  { code: 'a', display: 'A' },
  { code: 'b', display: 'B' },
  { code: 'c', display: 'C' },
  { code: 'd', display: 'D' },
  { code: 'e', display: 'E' }
];

const moderatelyLongAnswerOptions: AnswerOption[] = [
  { code: 'a', display: 'AAA' },
  { code: 'b', display: 'BBB' },
  { code: 'c', display: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC' },
  { code: 'd', display: 'DDD' },
  { code: 'e', display: 'EEE' },
  { code: 'f', display: 'FFF' },
  { code: 'g', display: 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG' },
  { code: 'h', display: 'HHH' },
  { code: 'i', display: 'III' },
  { code: 'j', display: 'JJJ' }
];

function buildQuestionnaire(
  controlCode: 'radio-button' | 'check-box',
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  columnCount = 4,
  answerOptions = urinaryContinenceAnswerOptions
) {
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
            valueCode: orientation
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
            valuePositiveInt: columnCount
          }
        ],
        answerOption: answerOptions.map(({ code, display, system = 'http://loinc.org' }) => ({
          valueCoding: { code, display, system }
        }))
      }
    ]
  };
}

async function addInlineQuestionnaire(
  page: Page,
  controlCode: 'radio-button' | 'check-box',
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  columnCount = 4,
  answerOptions = urinaryContinenceAnswerOptions
) {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/test/pages/addFormToPageTest.html');
  await waitForLFormsReady(page);

  await page.evaluate(
    async ({ questionnaire }) => {
      document.getElementById('formContainer')!.innerHTML = '';
      await (window as any).LForms.Util.addFormToPage(questionnaire, 'formContainer', { fhirVersion: 'R4' });
    },
    { questionnaire: buildQuestionnaire(controlCode, orientation, columnCount, answerOptions) }
  );

  await expect(page.locator('#formContainer .lhc-form-title')).toBeVisible();
}

/**
 * Wait for the answer-width directive and any resulting resize measurement to finish.
 * @param container the answer group being measured
 * @returns a promise that resolves after the measured width is set and the layout settles
 */
async function waitForAnswerColumnMeasurement(container: Locator): Promise<void> {
  await expect.poll(async () => container.evaluate(element =>
    parseFloat(getComputedStyle(element).getPropertyValue('--lhc-answer-option-width')) || 0
  )).toBeGreaterThan(0);
  await container.evaluate(() => new Promise<void>(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  ));
}

async function expectFourColumnHintLayout(page: Page, containerSelector: string) {
  const container = page.locator(containerSelector);
  await expect(container).toHaveClass(/lhc-grid/);
  await waitForAnswerColumnMeasurement(container);

  const answers = container.locator('.lhc-answer');
  await expect(answers).toHaveCount(5);
  await expect.poll(async () => {
    const boxes = await Promise.all(
      Array.from({ length: 5 }, (_, index) => answers.nth(index).boundingBox())
    );
    if (boxes.some(box => !box)) {
      return false;
    }

    const firstRowTop = boxes[0]!.y;
    const firstFourShareRow = boxes.slice(0, 4)
      .every(box => Math.abs(box!.y - firstRowTop) < 2);
    const widthsAreEqual = boxes
      .every(box => Math.abs(box!.width - boxes[0]!.width) < 2);
    return firstFourShareRow && widthsAreEqual && boxes[4]!.y > firstRowTop + 1;
  }).toBe(true);

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

async function expectVerticalThreeColumnLayout(page: Page, containerSelector: string) {
  const container = page.locator(containerSelector);
  await expect(container).toHaveClass(/lhc-grid/);
  await expect(container).toHaveClass(/lhc-vertical/);
  await waitForAnswerColumnMeasurement(container);

  const answers = container.locator('.lhc-answer');
  await expect(answers).toHaveCount(7);

  const boxes = await Promise.all(
    Array.from({ length: 7 }, (_, index) => answers.nth(index).boundingBox())
  );
  expect(boxes.every(Boolean)).toBeTruthy();

  expect(Math.abs(boxes[0]!.x - boxes[1]!.x)).toBeLessThan(2);
  expect(Math.abs(boxes[1]!.x - boxes[2]!.x)).toBeLessThan(2);
  expect(Math.abs(boxes[3]!.x - boxes[4]!.x)).toBeLessThan(2);
  expect(Math.abs(boxes[4]!.x - boxes[5]!.x)).toBeLessThan(2);
  expect(boxes[3]!.x).toBeGreaterThan(boxes[0]!.x + boxes[0]!.width - 2);
  expect(boxes[6]!.x).toBeGreaterThan(boxes[3]!.x + boxes[3]!.width - 2);

  expect(Math.abs(boxes[0]!.y - boxes[3]!.y)).toBeLessThan(2);
  expect(Math.abs(boxes[3]!.y - boxes[6]!.y)).toBeLessThan(2);
  expect(Math.abs(boxes[1]!.y - boxes[4]!.y)).toBeLessThan(2);
  expect(Math.abs(boxes[2]!.y - boxes[5]!.y)).toBeLessThan(2);
  expect(boxes[2]!.y).toBeGreaterThan(boxes[1]!.y + 1);
}

async function expectShortColumnsToRemainCompact(page: Page, containerSelector: string) {
  const container = page.locator(containerSelector);
  await waitForAnswerColumnMeasurement(container);

  const containerBox = await container.boundingBox();
  const availableWidth = await container.evaluate(element => element.parentElement!.getBoundingClientRect().width);
  const answers = container.locator('.lhc-answer');
  const boxes = await Promise.all(
    Array.from({ length: 5 }, (_, index) => answers.nth(index).boundingBox())
  );
  expect(containerBox).toBeTruthy();
  expect(boxes.every(Boolean)).toBeTruthy();
  expect(containerBox!.width).toBeLessThan(availableWidth);

  for (const box of boxes) {
    expect(Math.abs(box!.y - boxes[0]!.y)).toBeLessThan(2);
    expect(Math.abs(box!.width - containerBox!.width / 5)).toBeLessThan(2);
  }
}

async function expectLongColumnsToUseAvailableWidth(page: Page, containerSelector: string) {
  const container = page.locator(containerSelector);
  await waitForAnswerColumnMeasurement(container);
  const availableWidth = await container.evaluate(element => element.parentElement!.getBoundingClientRect().width);
  const measuredWidths = await container.evaluate(element => {
    const computedStyle = getComputedStyle(element);
    return {
      group: parseFloat(computedStyle.getPropertyValue('--lhc-answer-group-width')),
      option: parseFloat(computedStyle.getPropertyValue('--lhc-answer-option-width'))
    };
  });

  expect(Math.abs(measuredWidths.group - availableWidth)).toBeLessThan(2);
  expect(Math.abs(measuredWidths.option - availableWidth / 2)).toBeLessThan(2);
}

async function expectLongColumnsToRemainCompact(page: Page, containerSelector: string) {
  const container = page.locator(containerSelector);
  await waitForAnswerColumnMeasurement(container);
  const containerBox = await container.boundingBox();
  const availableWidth = await container.evaluate(element => element.parentElement!.getBoundingClientRect().width);
  const optionWidth = await container.evaluate(element =>
    parseFloat(getComputedStyle(element).getPropertyValue('--lhc-answer-option-width'))
  );

  expect(containerBox).toBeTruthy();
  expect(containerBox!.width).toBeLessThan(availableWidth);
  expect(Math.abs(containerBox!.width - optionWidth * 2)).toBeLessThan(2);
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

  test('keeps short answer columns compact when fewer answers exist than requested columns', async ({ page }) => {
    await addInlineQuestionnaire(page, 'radio-button', 'horizontal', 10, shortAnswerOptions);
    await expectShortColumnsToRemainCompact(page, 'nz-radio-group.lhc-grid');
  });

  test('keeps two horizontal columns compact when long answers fit in less than the available width', async ({ page }) => {
    await addInlineQuestionnaire(page, 'radio-button', 'horizontal', 2, moderatelyLongAnswerOptions);
    await expectLongColumnsToRemainCompact(page, 'nz-radio-group.lhc-grid');
  });

  test('keeps two vertical columns compact when long answers fit in less than the available width', async ({ page }) => {
    await addInlineQuestionnaire(page, 'check-box', 'vertical', 2, moderatelyLongAnswerOptions);
    await expectLongColumnsToRemainCompact(page, '.lhc-checkbox-group.lhc-grid');
  });

  test('lets two horizontal columns use the available width when answers need it', async ({ page }) => {
    await addInlineQuestionnaire(page, 'radio-button', 'horizontal', 2);
    await expectLongColumnsToUseAvailableWidth(page, 'nz-radio-group.lhc-grid');
  });

  test('lets two vertical columns use the available width when answers need it', async ({ page }) => {
    await addInlineQuestionnaire(page, 'check-box', 'vertical', 2);
    await expectLongColumnsToUseAvailableWidth(page, '.lhc-checkbox-group.lhc-grid');
  });

  test('updates long vertical columns when the viewport is resized', async ({ page }) => {
    await addInlineQuestionnaire(page, 'check-box', 'vertical', 2);
    const containerSelector = '.lhc-checkbox-group.lhc-grid';
    const initialWidth = await page.locator(containerSelector).boundingBox().then(box => box!.width);

    await page.setViewportSize({ width: 1400, height: 900 });
    await expect.poll(async () =>
      page.locator(containerSelector).boundingBox().then(box => box!.width)
    ).toBeLessThan(initialWidth);
    await expectLongColumnsToUseAvailableWidth(page, containerSelector);
  });

  test('reduces vertical columns and preserves vertical order when the requested columns do not fit', async ({ page }) => {
    await addInlineQuestionnaire(page, 'check-box', 'vertical', 4, assistanceAnswerOptions);
    const container = page.locator('.lhc-checkbox-group.lhc-grid');
    await waitForAnswerColumnMeasurement(container);

    await container.evaluate(element => {
      element.parentElement!.style.width = '500px';
    });
    await expect.poll(async () => container.evaluate(element =>
      getComputedStyle(element).getPropertyValue('--lhc-answer-effective-column-count').trim()
    )).toBe('2');

    const answers = container.locator('.lhc-answer');
    await expect(answers).toHaveCount(7);
    await expect.poll(async () => answers.evaluateAll(elements => elements.map(element => ({
      column: (element as HTMLElement).style.gridColumn,
      row: (element as HTMLElement).style.gridRow
    })))).toEqual([
      { column: '1', row: '1' },
      { column: '1', row: '2' },
      { column: '1', row: '3' },
      { column: '1', row: '4' },
      { column: '2', row: '1' },
      { column: '2', row: '2' },
      { column: '2', row: '3' }
    ]);

    await container.evaluate(element => {
      element.parentElement!.style.width = '800px';
    });
    await expect.poll(async () => container.evaluate(element =>
      getComputedStyle(element).getPropertyValue('--lhc-answer-effective-column-count').trim()
    )).toBe('4');
    await expect.poll(async () => answers.evaluateAll(elements => elements.map(element => ({
      column: (element as HTMLElement).style.gridColumn,
      row: (element as HTMLElement).style.gridRow
    })))).toEqual([
      { column: '1', row: '1' },
      { column: '1', row: '2' },
      { column: '2', row: '1' },
      { column: '2', row: '2' },
      { column: '3', row: '1' },
      { column: '3', row: '2' },
      { column: '4', row: '1' }
    ]);
  });

  test('renders vertical radio answer options down each hinted column', async ({ page }) => {
    await addInlineQuestionnaire(page, 'radio-button', 'vertical', 3, assistanceAnswerOptions);
    await expectVerticalThreeColumnLayout(page, 'nz-radio-group.lhc-grid');
  });

  test('renders vertical checkbox answer options down each hinted column', async ({ page }) => {
    await addInlineQuestionnaire(page, 'check-box', 'vertical', 3, assistanceAnswerOptions);
    await expectVerticalThreeColumnLayout(page, '.lhc-checkbox-group.lhc-grid');
  });
});
