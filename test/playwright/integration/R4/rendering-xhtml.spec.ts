import { test, expect } from '@playwright/test';
import { byId, answerId, addFormToPage, waitForLFormsReady, loadFromTestData } from '../../support/lforms-helpers';

test.describe('rendering-xhtml', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);
  });

  test.describe('on item.text', () => {
    test('should display question html if allowed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-text.json', 'R4');
      await expect(page.locator('.testPlease')).toBeVisible();
      await expect(page.locator('.testPlease')).toHaveText('Please');
      // contained image
      await expect(page.locator('.testContainedImage').first()).toBeVisible();
    });

    test('should display question text if not allowed in template options', async ({ page }) => {
      await loadFromTestData(page, 'q-with-rendering-xhtml-text.json', 'R4');
      await expect(page.locator('.testPlease')).not.toBeAttached();
      await expect(page.locator('.question').first()).toHaveText('Please answer Yes or No to each of the following questions:');
    });

    test('should display question escaped html, if invalid tags are displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await page.click('#displayInvalidHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
      await expect(page.locator('.testPlease')).not.toBeAttached();
      await expect(page.locator('.question').first()).toHaveText("<i class='testPlease'>Please</i> answer <script>Yes</script> or <b>No</b> to each of the following questions:");
    });

    test('should display question text, if invalid tags are not displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
      await expect(page.locator('.testPlease')).not.toBeAttached();
      await expect(page.locator('.question').first()).toHaveText('Please answer Yes or No to each of the following questions:');
    });
  });

  test.describe('on item.prefix', () => {
    test('should display prefix html if allowed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-prefix.json', 'R4');
      await expect(page.locator('.testPlease')).toBeVisible();
      await expect(page.locator('.testPlease')).toHaveText('A');
      // contained image
      await expect(page.locator('.testContainedImage').first()).toBeVisible();
    });

    test('should display prefix text if not allowed in template options', async ({ page }) => {
      await loadFromTestData(page, 'q-with-rendering-xhtml-prefix.json', 'R4');
      await expect(page.locator('.testPlease')).not.toBeAttached();
      await expect(page.locator('.prefix').first()).toHaveText('A:');
    });

    test('should display prefix escaped html, if invalid tags are displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await page.click('#displayInvalidHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-prefix-with-invalid-tag.json', 'R4');
      await expect(page.locator('.testPlease')).not.toBeAttached();
      await expect(page.locator('.prefix').first()).toHaveText("<i class='testPlease'>A</i> HTML <script>prefix:</script>");
    });

    test('should display prefix text, if invalid tags are not displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-prefix-with-invalid-tag.json', 'R4');
      await expect(page.locator('.testPlease')).not.toBeAttached();
      await expect(page.locator('.prefix').first()).toHaveText('A:');
    });
  });

  test.describe('on item.legal and item.codingInstructions', () => {
    test('should display help and legal html if allowed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-help-and-legal.json', 'R4');
      await byId(page, 'help-button-1.1/1').click();
      expect(await byId(page, 'help-content-1.1/1').innerHTML()).toBe('some help <button>button</button> text');
      await byId(page, 'legal-button-1.2/1').click();
      expect(await byId(page, 'legal-content-1.2/1').innerHTML()).toBe('some legal <button>button</button> text');
    });

    test('should display help and legal escaped html, if invalid tags are displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await page.click('#displayInvalidHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-help-and-legal-with-invalid-tag.json', 'R4');
      await byId(page, 'help-button-1.1/1').click();
      await expect(byId(page, 'help-content-1.1/1')).toHaveText('some <script>help</script> <button>button</button> text');
      await byId(page, 'legal-button-1.2/1').click();
      await expect(byId(page, 'legal-content-1.2/1')).toHaveText('some <script>legal</script> <button>button</button> text');
    });

    test('should display help and legal text, if invalid tags are not displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-help-and-legal-with-invalid-tag.json', 'R4');
      await byId(page, 'help-button-1.1/1').click();
      await expect(byId(page, 'help-content-1.1/1')).toHaveText('some help text');
      await byId(page, 'legal-button-1.2/1').click();
      await expect(byId(page, 'legal-content-1.2/1')).toHaveText('some legal text');
    });
  });

  test.describe('on answerOption', () => {
    test.describe('valueString', () => {
      test('should display answerOption html if allowed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'R4');
        // radio
        await expect(byId(page, 'item-valueString-group2-item1/1/1').locator('.testBold')).toHaveCount(3);
        await expect(byId(page, 'item-valueString-group2-item1/1/1').locator('.testImage')).toBeVisible();
        // checkbox
        await expect(byId(page, 'item-valueString-group2-item2/1/1').locator('.testBold')).toHaveCount(3);
        await expect(byId(page, 'item-valueString-group2-item2/1/1').locator('.testImage')).toBeVisible();
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; bold <b class="testBold">A</b>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold <b class="testBold">B</b>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold <b class="testBold">C</b><img class="testImage" src="/test/data/a-picture.png">');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueString-group1-item1/1/1')).toHaveValue('bold B');
      });

      test('should display answerOption text if not allowed in template options', async ({ page }) => {
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'R4');
        await expect(page.locator('.testBold')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold a'))).toHaveText('bold a');
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold b'))).toHaveText('bold b');
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold c'))).toHaveText('bold c');
        // checkbox
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold a'))).toHaveText('bold a');
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold b'))).toHaveText('bold b');
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold c'))).toHaveText('bold c');
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; bold a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold c');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueString-group1-item1/1/1')).toHaveValue('bold b');
      });

      test('should display answerOption escaped html, if invalid tags are displayed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await page.click('#displayInvalidHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        await expect(page.locator('.testBold')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold a'))).toHaveText("<script>bold</script> <b class='testBold'>A</b>");
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold b'))).toHaveText("<script>bold</script> <b class='testBold'>B</b>");
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold c'))).toHaveText("<script>bold</script> <b class='testBold'>C</b>");
        // checkbox
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold a'))).toHaveText("<script>bold</script> <b class='testBold'>A</b>");
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold b'))).toHaveText("<script>bold</script> <b class='testBold'>B</b>");
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold c'))).toHaveText("<script>bold</script> <b class='testBold'>C</b>");
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; &lt;script&gt;bold&lt;/script&gt; A');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold <b class="testBold">C</b><img class="testImage" src="/test/data/a-picture.png">');
        // Check the value in the field after the user selects something.
        await listOptions.nth(0).click();
        await expect(byId(page, 'valueString-group1-item1/1/1')).toHaveValue('&lt;script&gt;bold&lt;/script&gt; A');
      });

      test('should display answerOption text, if invalid tags are not displayed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        await expect(page.locator('.testBold')).not.toBeAttached();
        // An error message should be shown on each question with invalid HTML tags in answerOptions.
        await expect(page.locator('text=Invalid HTML tags/attributes found in answerOptions.').first()).toBeVisible();
        // radio
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold a'))).toHaveText('bold a');
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold b'))).toHaveText('bold b');
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold c'))).toHaveText('bold c');
        // checkbox
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold a'))).toHaveText('bold a');
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold b'))).toHaveText('bold b');
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold c'))).toHaveText('bold c');
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; bold a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold <b class="testBold">C</b><img class="testImage" src="/test/data/a-picture.png">');
      });
    });

    test.describe('matrix layout', () => {
      test('should display plain text', async ({ page }) => {
        await loadFromTestData(page, 'answerOption-html-matrix-layout.json', 'R4');
        // Plain text
        const headers0 = byId(page, 'item-/matrixTable0/1').locator('th.lhc-form-matrix-cell');
        await expect(headers0).toHaveCount(3);
        await expect(headers0.nth(0)).toHaveText('Answer 1');
        await expect(headers0.nth(1)).toHaveText('Answer 2');
        await expect(headers0.nth(2)).toHaveText('Answer 3');
        // HTML options should display text when HTML is not allowed
        const headers1 = byId(page, 'item-/matrixTable1/1').locator('th.lhc-form-matrix-cell');
        await expect(headers1).toHaveCount(3);
        await expect(headers1.nth(0)).toHaveText('Answer 1');
        await expect(headers1.nth(1)).toHaveText('Answer 2');
        await expect(headers1.nth(2)).toHaveText('Answer 3');
        // Invalid HTML options should display text when HTML is not allowed
        const headers2 = byId(page, 'item-/matrixTable2/1').locator('th.lhc-form-matrix-cell');
        await expect(headers2).toHaveCount(3);
        await expect(headers2.nth(0)).toHaveText('Answer 1');
        await expect(headers2.nth(1)).toHaveText('Answer 2');
        await expect(headers2.nth(2)).toHaveText('Answer 3');
      });

      test('should display HTML', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'answerOption-html-matrix-layout.json', 'R4');
        const headers1 = byId(page, 'item-/matrixTable1/1').locator('th.lhc-form-matrix-cell');
        await expect(headers1).toHaveCount(3);
        await expect(headers1.nth(0).locator('button')).toBeAttached();
        await expect(headers1.nth(1).locator('button')).toBeAttached();
        await expect(headers1.nth(2).locator('button')).toBeAttached();
        // Invalid HTML options should display text when invalid HTML is not displayed.
        const headers2 = byId(page, 'item-/matrixTable2/1').locator('th.lhc-form-matrix-cell');
        await expect(headers2).toHaveCount(3);
        await expect(headers2.nth(0)).toHaveText('Answer 1');
        await expect(headers2.nth(1)).toHaveText('Answer 2');
        await expect(headers2.nth(2)).toHaveText('Answer 3');
      });

      test('should display escaped HTML', async ({ page }) => {
        await page.click('#allowHTML');
        await page.click('#displayInvalidHTML');
        await loadFromTestData(page, 'answerOption-html-matrix-layout.json', 'R4');
        const headers2 = byId(page, 'item-/matrixTable2/1').locator('th.lhc-form-matrix-cell');
        await expect(headers2).toHaveCount(3);
        await expect(headers2.nth(0)).toHaveText('Answer <script>button</script> 1');
        await expect(headers2.nth(1)).toHaveText('Answer <script>button</script> 2');
        await expect(headers2.nth(2)).toHaveText('Answer <script>button</script> 3');
      });
    });

    test.describe('valueCoding.display', () => {
      test('should display answerOption html if allowed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'R4');
        // radio
        await expect(byId(page, 'item-valueCoding-group2-item1/1/1').locator('.testItalic')).toHaveCount(3);
        // checkbox
        await expect(byId(page, 'item-valueCoding-group2-item2/1/1').locator('.testItalic')).toHaveCount(3);
        // autocomplete
        await byId(page, 'valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic <i class="testItalic">A</i>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic <i class="testItalic">B</i>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueCoding-group1-item1/1/1')).toHaveValue('italic B');
      });

      test('should display answerOption text if not allowed in template options', async ({ page }) => {
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'R4');
        await expect(page.locator('.testItalic')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'a'))).toHaveText('italic a');
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'b'))).toHaveText('italic b');
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'c'))).toHaveText('italic c');
        // checkbox
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'a'))).toHaveText('italic a');
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'b'))).toHaveText('italic b');
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'c'))).toHaveText('italic c');
        // autocomplete
        await byId(page, 'valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic c');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, 'valueCoding-group1-item1/1/1')).toHaveValue('italic b');
      });

      test('should display answerOption escaped html, if invalid tags are displayed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await page.click('#displayInvalidHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        await expect(page.locator('.testItalic')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'a'))).toHaveText("<script>italic</script> <i class='testItalic'>A</i>");
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'b'))).toHaveText("<script>italic</script> <i class='testItalic'>B</i>");
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'c'))).toHaveText("<script>italic</script> <i class='testItalic'>C</i>");
        // checkbox
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'a'))).toHaveText("<script>italic</script> <i class='testItalic'>A</i>");
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'b'))).toHaveText("<script>italic</script> <i class='testItalic'>B</i>");
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'c'))).toHaveText("<script>italic</script> <i class='testItalic'>C</i>");
        // autocomplete
        await byId(page, 'valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; &lt;script&gt;italic&lt;/script&gt; A');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i><img class="testImage" src="/test/data/a-picture.png">');
        // Check the value in the field after the user selects something.
        await listOptions.nth(0).click();
        await expect(byId(page, 'valueCoding-group1-item1/1/1')).toHaveValue('&lt;script&gt;italic&lt;/script&gt; A');
      });

      test('should display answerOption text, if invalid tags are not displayed in template options', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        await expect(page.locator('.testItalic')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'a'))).toHaveText('italic a');
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'b'))).toHaveText('italic b');
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'c'))).toHaveText('italic c');
        // checkbox
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'a'))).toHaveText('italic a');
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'b'))).toHaveText('italic b');
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'c'))).toHaveText('italic c');
        // autocomplete
        await byId(page, 'valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i><img class="testImage" src="/test/data/a-picture.png">');
      });

      test('should remove the option after user selects it in multi-select list', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'q-with-rendering-xhtml-answerOption.json', 'R4');
        // autocomplete multi-select
        await byId(page, 'valueCoding-group1-item2/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic <i class="testItalic">A</i>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic <i class="testItalic">B</i>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
        // Select an item and check list shrinks
        await listOptions.nth(1).click();
        const updatedOptions = page.locator('#completionOptions li');
        await expect(updatedOptions.first()).toBeVisible();
        await expect(updatedOptions).toHaveCount(2);
        expect(await updatedOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic <i class="testItalic">A</i>');
        expect(await updatedOptions.nth(1).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
      });
    });

    test.describe('displayScoreWithAnswerText', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/test/pages/addFormToPageTest.html');
        await waitForLFormsReady(page);
      });

      test('should honor rendering-xhtml when displayScoreWithAnswerText is set to false', async ({ page }) => {
        await addFormToPage(page, 'q-with-scores-with-rendering-xhtml.json', 'formContainer', { fhirVersion: 'R4', allowHTML: true, displayScoreWithAnswerText: false });
        await byId(page, 'A-1/1/1').click();
        await expect(page.locator('#lhc-tools-searchResults li').first()).toContainText('A - display from rendering-xhtml');
        await byId(page, 'A-1/1/1').blur();
        await expect(page.locator('#lhc-tools-searchResults li').first()).not.toBeVisible();
        await byId(page, 'B-1/1/1').click();
        await expect(page.locator('#lhc-tools-searchResults li').first()).toContainText('B - display from rendering-xhtml');
      });

      test('should honor rendering-xhtml when displayScoreWithAnswerText is set to true', async ({ page }) => {
        await addFormToPage(page, 'q-with-scores-with-rendering-xhtml.json', 'formContainer', { fhirVersion: 'R4', allowHTML: true, displayScoreWithAnswerText: true });
        await byId(page, 'A-1/1/1').click();
        await expect(page.locator('#lhc-tools-searchResults li').first()).toContainText('A - display from rendering-xhtml');
        await byId(page, 'A-1/1/1').blur();
        await expect(page.locator('#lhc-tools-searchResults li').first()).not.toBeVisible();
        await byId(page, 'B-1/1/1').click();
        await expect(page.locator('#lhc-tools-searchResults li').first()).toContainText('B - display from rendering-xhtml - 1');
      });
    });
  });

  test.describe('on contained valueset', () => {
    test('should display html if allowed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-contained-valueset.json', 'R4');
      // radio
      await expect(byId(page, 'item-group2-item1/1/1').locator('.testItalic')).toHaveCount(3);
      // checkbox
      await expect(byId(page, 'item-group2-item2/1/1').locator('.testItalic')).toHaveCount(3);
      // autocomplete
      await byId(page, 'group1-item1/1/1').focus();
      const listOptions = page.locator('#completionOptions li');
      await expect(listOptions.first()).toBeVisible();
      await expect(listOptions).toHaveCount(3);
      expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic <i class="testItalic">A</i>');
      expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic <i class="testItalic">B</i>');
      expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
      // Check the value in the field after the user selects something.
      await listOptions.nth(1).click();
      await expect(byId(page, 'group1-item1/1/1')).toHaveValue('italic B');
    });

    test('should display text if not allowed in template options', async ({ page }) => {
      await loadFromTestData(page, 'q-with-rendering-xhtml-contained-valueset.json', 'R4');
      await expect(page.locator('.testItalic')).not.toBeAttached();
      // radio
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'a'))).toHaveText('italic a');
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'b'))).toHaveText('italic b');
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'c'))).toHaveText('italic c');
      // checkbox
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'a'))).toHaveText('italic a');
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'b'))).toHaveText('italic b');
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'c'))).toHaveText('italic c');
      // autocomplete
      await byId(page, 'group1-item1/1/1').focus();
      const listOptions = page.locator('#completionOptions li');
      await expect(listOptions.first()).toBeVisible();
      await expect(listOptions).toHaveCount(3);
      expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic a');
      expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
      expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic c');
      // Check the value in the field after the user selects something.
      await listOptions.nth(1).click();
      await expect(byId(page, 'group1-item1/1/1')).toHaveValue('italic b');
    });

    test('should display escaped html, if invalid tags are displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await page.click('#displayInvalidHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-contained-valueset-with-invalid-tag.json', 'R4');
      // radio
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'a'))).toHaveText('<script>italic</script> A');
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'b'))).toHaveText('italic b');
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'c')).locator('.testItalic')).toHaveCount(1);
      // checkbox
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'a'))).toHaveText('<script>italic</script> A');  // displays invalid tags
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'b'))).toHaveText('italic b'); // displays plain text
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'c')).locator('.testItalic')).toHaveCount(1);  // displays HTML
      // autocomplete
      await byId(page, 'group1-item1/1/1').focus();
      const listOptions = page.locator('#completionOptions li');
      await expect(listOptions.first()).toBeVisible();
      await expect(listOptions).toHaveCount(3);
      expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; &lt;script&gt;italic&lt;/script&gt; A');
      expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
      expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
      // Check selection
      await listOptions.nth(1).click();
      await expect(byId(page, 'group1-item1/1/1')).toHaveValue('italic b');
      await byId(page, 'group1-item1/1/1').click();
      const listOptions2 = page.locator('#completionOptions li');
      await expect(listOptions2.first()).toBeVisible();
      await expect(listOptions2).toHaveCount(3);
      await listOptions2.nth(2).click();
      // When user changes selection to the 3rd option, input field should display
      // the string stripped of the HTML tags.
      await expect(byId(page, 'group1-item1/1/1')).toHaveValue('italic C');
    });

    test('should display text, if invalid tags are not displayed in template options', async ({ page }) => {
      await page.click('#allowHTML');
      await loadFromTestData(page, 'q-with-rendering-xhtml-contained-valueset-with-invalid-tag.json', 'R4');
      // radio
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'a'))).toHaveText('italic a'); // displays plain text
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'b'))).toHaveText('italic b'); // displays plain text
      await expect(byId(page, answerId('group2-item1/1/1', 'test', 'c')).locator('.testItalic')).toHaveCount(1);  // displays HTML
      // checkbox
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'a'))).toHaveText('italic a');
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'b'))).toHaveText('italic b');
      await expect(byId(page, answerId('group2-item2/1/1', 'test', 'c')).locator('.testItalic')).toHaveCount(1);
      // autocomplete
      await byId(page, 'group1-item1/1/1').focus();
      const listOptions = page.locator('#completionOptions li');
      await expect(listOptions.first()).toBeVisible();
      await expect(listOptions).toHaveCount(3);
      expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic a');
      expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
      expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic <i class="testItalic">C</i>');
      // Check the value in the field after the user selects something.
      await listOptions.nth(0).click();
      await expect(byId(page, 'group1-item1/1/1')).toHaveValue('italic a');
    });

    test('should display html on externally loaded answerValueSet', async ({ page }) => {
      await page.click('#allowHTML');
      const expandResponse = {
        resourceType: 'ValueSet',
        id: 'test-valueset',
        meta: {
          extension: [{
            url: 'http://hapifhir.io/fhir/StructureDefinition/valueset-expansion-message',
            valueString: 'ValueSet with URL "ValueSet.id[ValueSet/test-valueset]" was expanded using an in-memory expansion'
          }]
        },
        status: 'active',
        compose: {
          include: [{
            system: 'lhc.forms.test.code.system',
            concept: [
              { code: 'a', display: 'Answer 1', _display: { extension: [{ url: 'http://hl7.org/fhir/StructureDefinition/rendering-xhtml', valueString: 'Answer <button>button</button> 1' }] } },
              { code: 'b', display: 'Answer 2', _display: { extension: [{ url: 'http://hl7.org/fhir/StructureDefinition/rendering-xhtml', valueString: 'Answer <button>button</button> 2' }] } },
              { code: 'c', display: 'Answer 3', _display: { extension: [{ url: 'http://hl7.org/fhir/StructureDefinition/rendering-xhtml', valueString: 'Answer <button>button</button> 3' }] } }
            ]
          }]
        },
        expansion: {
          offset: 0,
          parameter: [{ name: 'offset', valueInteger: 0 }, { name: 'count', valueInteger: 1000 }],
          contains: [
            { system: 'lhc.forms.test.code.system', code: 'a', display: 'Answer 1' },
            { system: 'lhc.forms.test.code.system', code: 'b', display: 'Answer 2' },
            { system: 'lhc.forms.test.code.system', code: 'c', display: 'Answer 3' }
          ]
        }
      };
      await page.route('**/ValueSet/$expand', route =>
        route.fulfill({ contentType: 'application/json', body: JSON.stringify(expandResponse) })
      );
      await loadFromTestData(page, 'q-with-contained-valueset-without-expansion.json', 'R4');
      // radio
      await expect(byId(page, 'item-group2-item1/1/1').locator('button')).toHaveCount(3);
      // checkbox
      await expect(byId(page, 'item-group2-item2/1/1').locator('button')).toHaveCount(3);
      // autocomplete
      await byId(page, 'group1-item1/1/1').focus();
      const listOptions = page.locator('#completionOptions li');
      await expect(listOptions.first()).toBeVisible();
      await expect(listOptions).toHaveCount(3);
      expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; Answer <button>button</button> 1');
      expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; Answer <button>button</button> 2');
      expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; Answer <button>button</button> 3');
      // Check the value in the field after the user selects something.
      await listOptions.nth(1).click();
      await expect(byId(page, 'group1-item1/1/1')).toHaveValue('Answer button 2');
    });

    test.describe('contained valueset matrix layout', () => {
      test('should display plain text', async ({ page }) => {
        await loadFromTestData(page, 'contained-valueset-html-matrix-layout.json', 'R4');
        const headers0 = byId(page, 'item-/matrixTable0/1').locator('th.lhc-form-matrix-cell');
        await expect(headers0).toHaveCount(3);
        await expect(headers0.nth(0)).toHaveText('Answer 1');
        await expect(headers0.nth(1)).toHaveText('Answer 2');
        await expect(headers0.nth(2)).toHaveText('Answer 3');
        // HTML options should display text when HTML is not allowed.
        const headers1 = byId(page, 'item-/matrixTable1/1').locator('th.lhc-form-matrix-cell');
        await expect(headers1).toHaveCount(3);
        await expect(headers1.nth(0)).toHaveText('Answer 1');
        await expect(headers1.nth(1)).toHaveText('Answer 2');
        await expect(headers1.nth(2)).toHaveText('Answer 3');
        // Invalid HTML options should display text when HTML is not allowed.
        const headers2 = byId(page, 'item-/matrixTable2/1').locator('th.lhc-form-matrix-cell');
        await expect(headers2).toHaveCount(3);
        await expect(headers2.nth(0)).toHaveText('Answer 1');
        await expect(headers2.nth(1)).toHaveText('Answer 2');
        await expect(headers2.nth(2)).toHaveText('Answer 3');
      });

      test('should display HTML', async ({ page }) => {
        await page.click('#allowHTML');
        await loadFromTestData(page, 'contained-valueset-html-matrix-layout.json', 'R4');
        const headers1 = byId(page, 'item-/matrixTable1/1').locator('th.lhc-form-matrix-cell');
        await expect(headers1).toHaveCount(3);
        await expect(headers1.nth(0).locator('button')).toBeAttached();
        await expect(headers1.nth(1).locator('button')).toBeAttached();
        await expect(headers1.nth(2).locator('button')).toBeAttached();
        // Invalid HTML options should display text when invalid HTML is not displayed.
        const headers2 = byId(page, 'item-/matrixTable2/1').locator('th.lhc-form-matrix-cell');
        await expect(headers2).toHaveCount(3);
        await expect(headers2.nth(0)).toHaveText('Answer 1');
        await expect(headers2.nth(1)).toHaveText('Answer 2');
        await expect(headers2.nth(2)).toHaveText('Answer 3');
      });

      test('should display escaped HTML', async ({ page }) => {
        await page.click('#allowHTML');
        await page.click('#displayInvalidHTML');
        await loadFromTestData(page, 'contained-valueset-html-matrix-layout.json', 'R4');
        const headers2 = byId(page, 'item-/matrixTable2/1').locator('th.lhc-form-matrix-cell');
        await expect(headers2).toHaveCount(3);
        await expect(headers2.nth(0)).toHaveText('Answer <script>button</script> 1');
        await expect(headers2.nth(1)).toHaveText('Answer <script>button</script> 2');
        await expect(headers2.nth(2)).toHaveText('Answer <script>button</script> 3');
      });
    });
  });
});
