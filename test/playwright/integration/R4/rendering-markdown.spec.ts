import { test, expect } from '@playwright/test';
import { byId, answerId, waitForLFormsReady, loadFromTestData } from '../../support/lforms-helpers';

test.describe('rendering-markdown', () => {
  test.describe('on item.text', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
    });

    test('should display question html if allowed in template options', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-text.json', 'R4');
      await expect(page.getByText('Please answer Yes or No to each of the following questions:')).not.toBeAttached();
      const eleLabel = byId(page, 'label-1.1/1');
      await expect(eleLabel.locator('h1')).toHaveText('This is a markdown heading');
      await expect(eleLabel.locator('li')).toHaveCount(2);
      await expect(eleLabel.locator('strong')).toHaveText('This text is bold');
      await expect(eleLabel.locator('em')).toHaveText('This text is italicized');
    });

    test('should display question text if not allowed in template options', async ({ page }) => {
      await loadFromTestData(page, 'q-with-rendering-markdown-text.json', 'R4');
      await expect(page.getByText('This is a markdown heading')).not.toBeAttached();
      await expect(page.locator('.question').first()).toHaveText('Please answer Yes or No to each of the following questions:');
    });

    test('should display question escaped html for invalid tags in markdown', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-text-with-invalid-tag.json', 'R4');
      await expect(page.getByText('This is a markdown heading')).not.toBeAttached();
      await expect(page.locator('.question').first()).toHaveText("This is a <script>Yes</script> markdown heading\n");
    });

    test('should use rendering-xhtml if both rendering-markdown and rendering-xhtml are present', async ({ page }) => {
      await page.click('#allowHTML');
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-xhtml-and-rendering-markdown.json', 'R4');
      await expect(page.getByText('This is a markdown heading')).not.toBeAttached();
      const questionHtml = await page.locator('.question').first().innerHTML();
      expect(questionHtml).toBe('<i class="testPlease">Please</i> answer <b>Yes</b> or <b>No</b> to each of the following questions:');
    });
  });

  test.describe('on item.prefix', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
    });

    test('should display prefix html if allowed in template options', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-prefix.json', 'R4');
      await expect(byId(page, 'label-1.1/1').locator('.prefix h1')).toHaveText('This is a markdown heading');
    });

    test('should display prefix text if not allowed in template options', async ({ page }) => {
      await loadFromTestData(page, 'q-with-rendering-markdown-prefix.json', 'R4');
      await expect(page.getByText('This is a markdown heading')).not.toBeAttached();
      await expect(page.locator('.prefix').first()).toHaveText('A:');
    });

    test('should display prefix escaped html for invalid tags in markdown', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-prefix-with-invalid-tag.json', 'R4');
      await expect(page.getByText('This is a markdown heading')).not.toBeAttached();
      await expect(page.locator('.prefix').first()).toHaveText("This is a <script>Yes</script> markdown heading\n");
    });
  });

  test.describe('on item.legal and item.codingInstructions', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
    });

    test('should display help and legal html if allowed in template options', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-help-and-legal.json', 'R4');
      await byId(page, 'help-button-1.1/1').click();
      await expect(byId(page, 'help-content-1.1/1').locator('h1')).toHaveText('This is a markdown heading');
      await byId(page, 'legal-button-1.2/1').click();
      await expect(byId(page, 'legal-content-1.2/1').locator('h1')).toHaveText('This is a markdown heading');
    });

    test('should display help and legal escaped html for invalid tags in markdown', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-help-and-legal-with-invalid-tag.json', 'R4');
      await byId(page, 'help-button-1.1/1').click();
      await expect(byId(page, 'help-content-1.1/1')).toHaveText("This is a <script>bad</script> markdown heading\n");
      await byId(page, 'legal-button-1.2/1').click();
      await expect(byId(page, 'legal-content-1.2/1')).toHaveText("This is a <script>bad</script> markdown heading\n");
    });
  });

  test.describe('on answerOption', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
    });

    test.describe('valueString', () => {
      test('should display answerOption html if allowed in template options', async ({ page }) => {
        await page.click('#allowMarkdown');
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption.json', 'R4');
        // radio
        await expect(byId(page, '#item-valueString-group2-item1/1/1').locator('strong')).toHaveCount(3);
        // checkbox
        await expect(byId(page, '#item-valueString-group2-item2/1/1').locator('strong')).toHaveCount(3);
        // autocomplete
        await byId(page, '#valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        const html0 = await listOptions.nth(0).innerHTML();
        const html1 = await listOptions.nth(1).innerHTML();
        const html2 = await listOptions.nth(2).innerHTML();
        expect(html0).toBe('<span class="listNum">1:</span>&nbsp; <p><strong>This text is bold A</strong></p>');
        expect(html1).toBe('<span class="listNum">2:</span>&nbsp; <p><strong>This text is bold B</strong></p>');
        expect(html2).toBe('<span class="listNum">3:</span>&nbsp; <p><strong>This text is bold C</strong></p>');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, '#valueString-group1-item1/1/1')).toHaveValue("This text is bold B");
      });

      test('should display answerOption text if not allowed in template options', async ({ page }) => {
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption.json', 'R4');
        await expect(page.getByText('This text is bold')).not.toBeAttached();
        // radio
        await expect(byId(page, answerId('#valueString-group2-item1/1/1', undefined, 'bold a'))).toHaveText("bold a");
        await expect(byId(page, answerId('#valueString-group2-item1/1/1', undefined, 'bold b'))).toHaveText("bold b");
        await expect(byId(page, answerId('#valueString-group2-item1/1/1', undefined, 'bold c'))).toHaveText("bold c");
        // checkbox
        await expect(byId(page, answerId('#valueString-group2-item2/1/1', undefined, 'bold a'))).toHaveText("bold a");
        await expect(byId(page, answerId('#valueString-group2-item2/1/1', undefined, 'bold b'))).toHaveText("bold b");
        await expect(byId(page, answerId('#valueString-group2-item2/1/1', undefined, 'bold c'))).toHaveText("bold c");
        // autocomplete
        await byId(page, '#valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; bold a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; bold b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; bold c');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, '#valueString-group1-item1/1/1')).toHaveValue("bold b");
      });

      test('should display answerOption escaped html for invalid tags in markdown', async ({ page }) => {
        await page.click('#allowMarkdown');
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption-with-invalid-tag.json', 'R4');
        // radio
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold a'))).toHaveText("This text is <script>bad</script> bold A\n");
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold b'))).toHaveText("This text is <script>bad</script> bold B\n");
        await expect(byId(page, answerId('valueString-group2-item1/1/1', undefined, 'bold c'))).toHaveText("This text is <script>bad</script> bold C\n");
        // checkbox
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold a'))).toHaveText("This text is <script>bad</script> bold A\n");
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold b'))).toHaveText("This text is <script>bad</script> bold B\n");
        await expect(byId(page, answerId('valueString-group2-item2/1/1', undefined, 'bold c'))).toHaveText("This text is <script>bad</script> bold C\n");
        // autocomplete
        await byId(page, 'valueString-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; <p><strong>This text is &lt;script&gt;bad&lt;/script&gt; bold A</strong></p>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; <p><strong>This text is &lt;script&gt;bad&lt;/script&gt; bold B</strong></p>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; <p><strong>This text is &lt;script&gt;bad&lt;/script&gt; bold C</strong></p>');
        // Check the value in the field after the user selects something.
        await listOptions.nth(0).click();
        await expect(byId(page, '#valueString-group1-item1/1/1')).toHaveValue("This text is &lt;script&gt;bad&lt;/script&gt; bold A");
      });
    });

    test.describe('valueCoding.display', () => {
      test('should display answerOption html if allowed in template options', async ({ page }) => {
        await page.click('#allowMarkdown');
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption.json', 'R4');
        // radio
        await expect(byId(page, '#item-valueCoding-group2-item1/1/1').locator('em')).toHaveCount(3);
        // checkbox
        await expect(byId(page, '#item-valueCoding-group2-item2/1/1').locator('em')).toHaveCount(3);
        // autocomplete
        await byId(page, '#valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; <p><em>This text is italicized A</em></p>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; <p><em>This text is italicized B</em></p>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; <p><em>This text is italicized C</em></p>');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, '#valueCoding-group1-item1/1/1')).toHaveValue("This text is italicized B");
      });

      test('should display answerOption text if not allowed in template options', async ({ page }) => {
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption.json', 'R4');
        // radio
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'a'))).toHaveText("italic a");
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'b'))).toHaveText("italic b");
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'c'))).toHaveText("italic c");
        // checkbox
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'a'))).toHaveText("italic a");
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'b'))).toHaveText("italic b");
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'c'))).toHaveText("italic c");
        // autocomplete
        await byId(page, '#valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; italic a');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; italic b');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; italic c');
        // Check the value in the field after the user selects something.
        await listOptions.nth(1).click();
        await expect(byId(page, '#valueCoding-group1-item1/1/1')).toHaveValue("italic b");
      });

      test('should display answerOption escaped html for invalid tags in markdown', async ({ page }) => {
        await page.click('#allowMarkdown');
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption-with-invalid-tag.json', 'R4');
        // radio
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'a'))).toHaveText("This text is <script>bad</script> italicized A\n");
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'b'))).toHaveText("This text is <script>bad</script> italicized B\n");
        await expect(byId(page, answerId('valueCoding-group2-item1/1/1', undefined, 'c'))).toHaveText("This text is <script>bad</script> italicized C\n");
        // checkbox
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'a'))).toHaveText("This text is <script>bad</script> italicized A\n");
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'b'))).toHaveText("This text is <script>bad</script> italicized B\n");
        await expect(byId(page, answerId('valueCoding-group2-item2/1/1', undefined, 'c'))).toHaveText("This text is <script>bad</script> italicized C\n");
        // autocomplete
        await byId(page, '#valueCoding-group1-item1/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; <p><em>This text is &lt;script&gt;bad&lt;/script&gt; italicized A</em></p>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; <p><em>This text is &lt;script&gt;bad&lt;/script&gt; italicized B</em></p>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; <p><em>This text is &lt;script&gt;bad&lt;/script&gt; italicized C</em></p>');
        // Check the value in the field after the user selects something.
        await listOptions.nth(0).click();
        await expect(byId(page, '#valueCoding-group1-item1/1/1')).toHaveValue("This text is &lt;script&gt;bad&lt;/script&gt; italicized A");
      });

      test('should remove the option after user selects it in multi-select list', async ({ page }) => {
        await page.click('#allowMarkdown');
        await loadFromTestData(page, 'q-with-rendering-markdown-answerOption.json', 'R4');
        // autocomplete
        await byId(page, '#valueCoding-group1-item2/1/1').focus();
        const listOptions = page.locator('#completionOptions li');
        await expect(listOptions.first()).toBeVisible();
        await expect(listOptions).toHaveCount(3);
        expect(await listOptions.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; <p><em>This text is italicized A</em></p>');
        expect(await listOptions.nth(1).innerHTML()).toBe('<span class="listNum">2:</span>&nbsp; <p><em>This text is italicized B</em></p>');
        expect(await listOptions.nth(2).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; <p><em>This text is italicized C</em></p>');
        // Check the list after the user selects something.
        await listOptions.nth(1).click();
        const listOptionsAfter = page.locator('#completionOptions li');
        await expect(listOptionsAfter.first()).toBeVisible();
        await expect(listOptionsAfter).toHaveCount(2);
        expect(await listOptionsAfter.nth(0).innerHTML()).toBe('<span class="listNum">1:</span>&nbsp; <p><em>This text is italicized A</em></p>');
        expect(await listOptionsAfter.nth(1).innerHTML()).toBe('<span class="listNum">3:</span>&nbsp; <p><em>This text is italicized C</em></p>');
      });
    });
  });

  test.describe('matrix layout', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
    });

    test('should display markdown - valueString', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-matrix-layout-valueString.json', 'R4');
      const tableHeaders = byId(page, 'item-/matrixTable1/1').locator('th.lhc-form-matrix-cell');
      await expect(tableHeaders).toHaveCount(3);
      await expect(tableHeaders.nth(0).locator('strong')).toBeAttached();
      await expect(tableHeaders.nth(1).locator('strong')).toBeAttached();
      await expect(tableHeaders.nth(2).locator('strong')).toBeAttached();
    });

    test('should display markdown - valueCoding', async ({ page }) => {
      await page.click('#allowMarkdown');
      await loadFromTestData(page, 'q-with-rendering-markdown-matrix-layout-valueCoding.json', 'R4');
      const tableHeaders = byId(page, 'item-/matrixTable1/1').locator('th.lhc-form-matrix-cell');
      await expect(tableHeaders).toHaveCount(3);
      await expect(tableHeaders.nth(0).locator('strong')).toBeAttached();
      await expect(tableHeaders.nth(1).locator('strong')).toBeAttached();
      await expect(tableHeaders.nth(2).locator('strong')).toBeAttached();
    });
  });
});
