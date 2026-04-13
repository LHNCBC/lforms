import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, waitForLFormsReady, loadFromTestData, addFormToPage } from '../support/lforms-helpers';

test.describe('popover buttons', () => {

  // copyright
  test.describe('Copyright popover message', () => {
    test('should show a copyright popover message on the form title', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await expect(byId(page, '/type0/1')).toBeVisible();
      await byId(page, 'copyright-button-all-in-one').click();
      const copyrightContent = byId(page, 'copyright-content-all-in-one');
      await expect(copyrightContent).toBeVisible();
      await expect(copyrightContent).toHaveText('A Copyright notice of the form');
    });

    test('should show a copyright popover message on an item', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await byId(page, 'legal-button-/type0/1').click();
      const legalContent = byId(page, 'legal-content-/type0/1');
      await expect(legalContent).toBeVisible();
      await expect(legalContent).toHaveText('A Copyright notice of the item');
    });

    test('should show a copyright popover message on the form title when there is no codes', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      const filePath = 'test/data/questionnaire-with-copyright-no-code.json';
      const { uploadFile } = await import('../support/lforms-helpers');
      await uploadFile(page, '#fileAnchor', filePath);
      await expect(page.locator('.lhc-form-title')).toBeVisible({ timeout: 10000 });
      await byId(page, 'copyright-button-Test-Questionnaire-with-a-copyright-and-no-code').click();
      const copyrightNoCode = byId(page, 'copyright-content-Test-Questionnaire-with-a-copyright-and-no-code');
      await expect(copyrightNoCode).toBeVisible();
      await expect(copyrightNoCode).toHaveText('A copyright notice');
    });
  });

  // coding instructions
  test.describe('coding instructions help message', () => {
    const helpButton0 = 'help-button-/type0/1'; // text formatted content, no 'codingInstructionsFormat'
    const helpButton1 = 'help-button-/type1/1'; // html formatted content, no 'codingInstructionsFormat'
    const helpButton2 = 'help-button-/type2/1'; // html formatted content, 'codingInstructionsFormat' is 'text'
    const helpButton3 = 'help-button-/type3/1'; // html formatted content, 'codingInstructionsFormat' is 'html'
    const helpPopover0 = 'help-content-/type0/1';
    const helpPopover1 = 'help-content-/type1/1';
    const helpPopover2 = 'help-content-/type2/1';
    const helpPopover3 = 'help-content-/type3/1';
    const field1 = '/q_lg/1';

    test('should have HTML and/or TEXT content when templateOptions.allowHTML is true', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm

      // popover
      await expect(byId(page, helpButton0)).toBeVisible();
      await expect(byId(page, helpButton1)).toBeVisible();
      await expect(byId(page, helpButton2)).toBeVisible();
      await expect(byId(page, helpButton3)).toBeVisible();

      await byId(page, helpButton0).click();
      await expect(byId(page, helpPopover0)).toBeVisible();
      await expect(byId(page, helpPopover0)).toHaveText('simple text instructions');

      await byId(page, field1).click();
      await expect(byId(page, helpPopover0)).not.toBeAttached();

      await byId(page, helpButton1).click();
      await expect(byId(page, helpPopover1)).toBeVisible();
      await expect(byId(page, helpPopover1).locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, helpPopover1)).toHaveText("<code>HTML</code> instructions, with a <button class='testButton'>button</button>LForms Demo 1");

      await byId(page, field1).click();
      await expect(byId(page, helpPopover1)).not.toBeAttached();
      await byId(page, helpButton2).click();
      await expect(byId(page, helpPopover2)).toBeVisible();
      await expect(byId(page, helpPopover2).locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, helpPopover2)).toHaveText("<code>HTML</code> instructions, with a <button class='testButton'>button</button>LForms Demo 2");

      await byId(page, field1).click();
      await expect(byId(page, helpPopover2)).not.toBeAttached();
      await byId(page, helpButton3).click();
      await expect(byId(page, helpPopover3)).toBeVisible();
      await expect(byId(page, helpPopover3).locator('button.testButton')).toBeVisible();

      // inline
      await page.evaluate(() => {
        const testForm = document.getElementById('test-form') as any;
        testForm.options = { showCodingInstruction: true };
      });
      await expect(byId(page, 'help-/type1/1')).toBeVisible();
      await expect(byId(page, 'help-/type1/1').locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, 'help-/type2/1')).toBeVisible();
      await expect(byId(page, 'help-/type2/1').locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, 'help-/type3/1')).toBeVisible();
      await expect(byId(page, 'help-/type3/1').locator('button.testButton')).toBeVisible();
    });

    test('should have only escaped TEXT content when templateOptions.allowHTML is false', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await page.click('#change-option');

      // popover
      await expect(byId(page, helpButton0)).toBeVisible();
      await byId(page, helpButton0).click();
      await expect(byId(page, helpPopover0)).toBeVisible();
      await expect(byId(page, helpPopover0)).toHaveText('simple text instructions');

      await byId(page, field1).click();
      await expect(byId(page, helpPopover0)).not.toBeAttached();
      await byId(page, helpButton1).click();
      await expect(byId(page, helpPopover1)).toBeVisible();
      await expect(byId(page, helpPopover1).locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, helpPopover1)).toHaveText("<code>HTML</code> instructions, with a <button class='testButton'>button</button>LForms Demo 1");

      await byId(page, field1).click();
      await expect(byId(page, helpPopover1)).not.toBeAttached();
      await byId(page, helpButton2).click();
      await expect(byId(page, helpPopover2)).toBeVisible();
      await expect(byId(page, helpPopover2).locator('button.testButton')).not.toBeAttached();

      await byId(page, field1).click();
      await byId(page, helpButton3).click();
      await expect(byId(page, helpPopover3).locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, helpPopover3)).toHaveText("<code>HTML</code> instructions, with a <button class='testButton'>button</button>LForms Demo 3");

      // inline
      await page.evaluate(() => {
        const testForm = document.getElementById('test-form') as any;
        testForm.options = { showCodingInstruction: true };
      });
      await expect(byId(page, 'help-/type1/1')).toBeVisible();
      await expect(byId(page, 'help-/type1/1').locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, 'help-/type2/1')).toBeVisible();
      await expect(byId(page, 'help-/type2/1').locator('button.testButton')).not.toBeAttached();
      await expect(byId(page, 'help-/type3/1')).toBeVisible();
      await expect(byId(page, 'help-/type3/1').locator('button.testButton')).not.toBeAttached();
    });

    test('should be able to display HTML/Text formatted coding instructions from FHIR R4 Questionnaire', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await loadFromTestData(page, 'ussg-fhp.json', 'R4');
      await page.evaluate(() => {
        const testForm = document.getElementById('test-form') as any;
        testForm.options = { allowHTML: true };
      });
      // Allow page to refresh this options change so that we don't get detached elements below.
      await page.waitForTimeout(100);

      const nameHelpButton = 'help-button-/54126-8/54125-0/1/1';
      const genderHelpButton = 'help-button-/54126-8/54131-8/1/1';
      const namePopover = 'help-content-/54126-8/54125-0/1/1';
      const genderPopover = 'help-content-/54126-8/54131-8/1/1';

      await expect(byId(page, nameHelpButton)).toBeVisible();
      await expect(byId(page, genderHelpButton)).toBeVisible();

      // HTML formatted coding instructions
      await byId(page, nameHelpButton).click();
      await expect(byId(page, namePopover)).toBeVisible();
      await expect(page.locator('button.testButton')).toBeVisible();

      await byId(page, '/54126-8/54131-8/1/1').click();
      await expect(page.locator('button.testButton')).not.toBeAttached();

      // Text coding instructions
      await byId(page, genderHelpButton).click();
      await expect(byId(page, genderPopover)).toBeVisible();
      await expect(page.locator('button.testButton')).not.toBeAttached();
    });

    async function test4PopoverCases(page, type: string) {
      let helpButton_0: string, helpButton_1: string, helpButton_2: string, helpButton_3: string;
      let popover0: string, popover1: string, popover2: string, popover3: string;
      let copyrightButton0: string, copyPopover0: string;

      switch (type) {
        case 'vertical':
          helpButton_0 = 'help-button-/type0/1'; helpButton_1 = 'help-button-/type1/1';
          helpButton_2 = 'help-button-/type2/1'; helpButton_3 = 'help-button-/type3/1';
          copyrightButton0 = 'legal-button-/type0/1';
          popover0 = 'help-content-/type0/1'; popover1 = 'help-content-/type1/1';
          popover2 = 'help-content-/type2/1'; popover3 = 'help-content-/type3/1';
          copyPopover0 = 'legal-content-/type0/1'; break;
        case 'horizontal':
          helpButton_0 = 'help-button-/horizontalTable/type0/1/1'; helpButton_1 = 'help-button-/horizontalTable/type1/1/1';
          helpButton_2 = 'help-button-/horizontalTable/type2/1/1'; helpButton_3 = 'help-button-/horizontalTable/type3/1/1';
          copyrightButton0 = 'legal-button-/horizontalTable/type0/1/1';
          popover0 = 'help-content-/horizontalTable/type0/1/1'; popover1 = 'help-content-/horizontalTable/type1/1/1';
          popover2 = 'help-content-/horizontalTable/type2/1/1'; popover3 = 'help-content-/horizontalTable/type3/1/1';
          copyPopover0 = 'legal-content-/horizontalTable/type0/1/1'; break;
        case 'matrix':
          helpButton_0 = 'help-button-/matrixTable/type0/1/1'; helpButton_1 = 'help-button-/matrixTable/type1/1/1';
          helpButton_2 = 'help-button-/matrixTable/type2/1/1'; helpButton_3 = 'help-button-/matrixTable/type3/1/1';
          copyrightButton0 = 'legal-button-/matrixTable/type0/1/1';
          popover0 = 'help-content-/matrixTable/type0/1/1'; popover1 = 'help-content-/matrixTable/type1/1/1';
          popover2 = 'help-content-/matrixTable/type2/1/1'; popover3 = 'help-content-/matrixTable/type3/1/1';
          copyPopover0 = 'legal-content-/matrixTable/type0/1/1'; break;
      }

      await loadFromTestData(page, 'copyright-help.json');

      const field_1 = '/type0/1';
      await expect(byId(page, field_1)).toBeVisible();
      await expect(byId(page, helpButton_0!)).toBeVisible();
      await expect(byId(page, helpButton_1!)).toBeVisible();
      await expect(byId(page, helpButton_2!)).toBeVisible();
      await expect(byId(page, helpButton_3!)).toBeVisible();
      await expect(byId(page, copyrightButton0!)).toBeVisible();

      // simple text coding instructions
      await byId(page, helpButton_0!).click();
      await expect(byId(page, popover0!)).toBeVisible();
      await expect(byId(page, popover0!)).toHaveText('simple text instructions');

      await byId(page, field_1).click();
      await expect(byId(page, popover0!)).not.toBeAttached();

      // escaped HTML coding instructions, when "codingInstructionsFormat" is not set
      await byId(page, helpButton_1!).click();
      await expect(byId(page, popover1!)).toBeVisible();
      await expect(byId(page, popover1!)).toHaveText("<code>HTML</code> instructions, with a <button>button</button>LForms Demo 1");

      await byId(page, field_1).click();
      await expect(byId(page, popover1!)).not.toBeAttached();

      // escaped HTML coding instructions, when "codingInstructionsFormat" = "text"
      await byId(page, helpButton_2!).click();
      await expect(byId(page, popover2!)).toBeVisible();
      await expect(byId(page, popover2!)).toHaveText("<code>HTML</code> instructions, with a <button>button</button>LForms Demo 2");

      await byId(page, field_1).click();
      await expect(byId(page, popover2!)).not.toBeAttached();

      // enabled HTML coding instructions, when "codingInstructionsFormat" = "html"
      await byId(page, helpButton_3!).click();
      await expect(byId(page, popover3!)).toBeVisible();
      await expect(byId(page, popover3!)).toHaveText('HTML instructions, with a buttonLForms Demo 3');
      await expect(byId(page, popover3!).locator('button')).toBeVisible();

      await byId(page, field_1).click();
      await expect(byId(page, popover3!)).not.toBeAttached();

      // copyright popover
      await byId(page, copyrightButton0!).click();
      await expect(byId(page, copyPopover0!)).toBeVisible();
      await expect(byId(page, copyPopover0!)).toHaveText('A Copyright notice of the item 1');

      await byId(page, field_1).click();
      await expect(byId(page, popover0!)).not.toBeAttached();
    }

    test('should display coding instructions and copyright in vertical list layout', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await test4PopoverCases(page, 'vertical');
    });

    test('should display coding instructions and copyright in horizontal table layout', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await test4PopoverCases(page, 'horizontal');
    });

    test('should display coding instructions and copyright in matrix layout', async ({ page }) => {
      await page.goto('/test/pages/lforms_testpage.html');
      await waitForLFormsReady(page);
      await test4PopoverCases(page, 'matrix');
    });
  });
});

test.describe('images in coding instructions', () => {
  test.describe('coding instructions with images shown inline', () => {
    test('should show images inline', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-with-contained-image.json', 'formContainer', {
        fhirVersion: 'R4', allowHTML: true, showCodingInstruction: true });

      // image with url in src attribute
      const img_a = page.locator('#help-a\\/1 img').first();
      await expect(img_a).toBeVisible();
      await expect(img_a).toHaveAttribute('src', '/test/data/a-picture.png');

      // image with local id in src attribute
      const img_b = page.locator('#help-b\\/1 img').first();
      await expect(img_b).toBeVisible();
      const srcB = await img_b.getAttribute('src');
      expect(srcB).toMatch(/^data:image\/png;base64/);

      // image with local id without quotes in src attribute
      const img_c = page.locator('#help-c\\/1 img').first();
      await expect(img_c).toBeVisible();
      const srcC = await img_c.getAttribute('src');
      expect(srcC).toMatch(/^data:image\/png;base64/);
    });
  });

  test.describe('coding instructions with images shown in popover', () => {
    test('should show images in popover', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-with-contained-image.json', 'formContainer', {
        fhirVersion: 'R4', allowHTML: true });

      // image with url
      await byId(page, 'help-button-a/1').click();
      const popover_img_a = page.locator('#help-content-a\\/1 img').first();
      await expect(popover_img_a).toBeVisible();
      await expect(popover_img_a).toHaveAttribute('src', '/test/data/a-picture.png');
      //make the popover disappear
      await page.locator('.lhc-form-title .lhc-question').first().click({ force: true });
      await expect(page.locator('#help-content-a\\/1')).not.toBeAttached();

      // image with local id
      await byId(page, 'help-button-b/1').click();
      const popover_img_b = page.locator('#help-content-b\\/1 img').first();
      await expect(popover_img_b).toBeVisible();
      const srcB = await popover_img_b.getAttribute('src');
      expect(srcB).toMatch(/^data:image\/png;base64/);
      //make the popover disappear
      await page.locator('.lhc-form-title .lhc-question').first().click({ force: true });
      await expect(page.locator('#help-content-b\\/1')).not.toBeAttached();

      // image with local id without quotes
      await byId(page, 'help-button-c/1').click();
      const popover_img_c = page.locator('#help-content-c\\/1 img').first();
      await expect(popover_img_c).toBeVisible();
      const srcC = await popover_img_c.getAttribute('src');
      expect(srcC).toMatch(/^data:image\/png;base64/);
      //make the popover disappear
      await page.locator('.lhc-form-title .lhc-question').first().click({ force: true });
      await expect(page.locator('#help-content-c\\/1')).not.toBeAttached();
    });
  });
});

test.describe('invalid html tags/attributes in coding instructions', () => {
  test.describe('regular text shown inline', () => {
    test('should show error message and regular help text', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-with-invalid-xhtml.json', 'formContainer', {
        fhirVersion: 'R4', messageLevel: 'error', allowHTML: true, displayInvalidHTML: false, showCodingInstruction: true });

      const itemError1 = page.locator('#item-item1\\/1 .lhc-item-error').first();
      await expect(itemError1).toBeVisible();
      await expect(itemError1).toHaveText('Error: Invalid HTML tags/attributes found in the help text.');
      const helpText1 = page.locator('#help-item1\\/1').first();
      await expect(helpText1).toBeVisible();
      await expect(helpText1).toHaveText('A plain text instruction.');
    });
  });

  test.describe('escaped invalid html shown inline', () => {
    test('should show error message and escaped html', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-with-invalid-xhtml.json', 'formContainer', {
        fhirVersion: 'R4', messageLevel: 'error', allowHTML: true, displayInvalidHTML: true, showCodingInstruction: true });

      const itemError2 = page.locator('#item-item1\\/1 .lhc-item-error').first();
      await expect(itemError2).toBeVisible();
      await expect(itemError2).toHaveText('Error: Invalid HTML tags/attributes found in the help text.');
      const helpText2 = page.locator('#help-item1\\/1').first();
      await expect(helpText2).toBeVisible();
      await expect(helpText2).toHaveText("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>.</a>");
    });
  });

  test.describe('regular text shown popover', () => {
    test('should show error message and regular help text in popover', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-with-invalid-xhtml.json', 'formContainer', {
        fhirVersion: 'R4', messageLevel: 'error', allowHTML: true, displayInvalidHTML: false, showCodingInstruction: false });

      const itemError3 = page.locator('#item-item1\\/1 .lhc-item-error').first();
      await expect(itemError3).toBeAttached();
      await expect(itemError3).toBeVisible();
      await expect(itemError3).toHaveText('Error: Invalid HTML tags/attributes found in the help text.');
      await byId(page, 'help-button-item1/1').click();
      const helpContent3 = page.locator('#help-content-item1\\/1').first();
      await expect(helpContent3).toBeAttached();
      await expect(helpContent3).toBeVisible();
      await expect(helpContent3).toHaveText('A plain text instruction.');
    });
  });

  test.describe('escaped invalid html shown in popover', () => {
    test('should show error message and escaped html in popover', async ({ page }) => {
      await page.goto('/test/pages/addFormToPageTest.html');
      await waitForLFormsReady(page);
      await addFormToPage(page, 'q-with-invalid-xhtml.json', 'formContainer', {
        fhirVersion: 'R4', messageLevel: 'error', allowHTML: true, displayInvalidHTML: true, showCodingInstruction: false });

      const itemError4 = page.locator('#item-item1\\/1 .lhc-item-error').first();
      await expect(itemError4).toBeAttached();
      await expect(itemError4).toBeVisible();
      await expect(itemError4).toHaveText('Error: Invalid HTML tags/attributes found in the help text.');
      await byId(page, 'help-button-item1/1').click();
      const helpContent4 = page.locator('#help-content-item1\\/1').first();
      await expect(helpContent4).toBeAttached();
      await expect(helpContent4).toBeVisible();
      await expect(helpContent4).toHaveText("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>.</a>");
    });
  });
});
