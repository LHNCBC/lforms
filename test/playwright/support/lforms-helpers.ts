import { expect, type Locator, type Page } from '@playwright/test';
import path from 'path';
import FHIRSupport from '../../../src/fhir/versions.js';

/** Supported FHIR version strings derived from src/fhir/versions.js. */
export const fhirVersions: string[] = Object.keys(FHIRSupport);


/** Reusable 30-second timeout option for Playwright assertions and waitFor calls. */
export const TIMEOUT_30S = { timeout: 30000 };


/**
 * Escape special characters in an ID string for use in a CSS selector.
 * @param id - The raw element ID to escape.
 * @returns The escaped ID safe for use in `#id` selectors.
 */
export function escapeIdSelector(id: string): string {
  return id.replace(/([.#:[\]/\\|%])/g, '\\$1');
}

/**
 * Escape a value for use in a CSS attribute selector string (double-quoted).
 */
function escapeAttrValue(val: string): string {
  return val.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}


/**
 * Locate an element by its ID, escaping special characters as needed.
 * @param page - The Playwright page instance.
 * @param id - The element ID (with or without a leading `#`).
 * @returns A Playwright Locator for the matching element.
 */
export function byId(page: Page, id: string): Locator {
  const rawId = id.startsWith('#') ? id.slice(1) : id;
  return page.locator(`[id="${escapeAttrValue(rawId)}"]`);
}


/**
 * Wait for LForms and (optionally) FHIR libs to be fully loaded on the page.
 * @param page - The Playwright page instance.
 * @param opts - Options object. Set `fhir` to `false` to skip waiting for FHIR libs (default: `true`).
 * @returns A promise that resolves when LForms (and optionally FHIR) libraries are ready.
 */
export async function waitForLFormsReady(page: Page, opts: { fhir?: boolean } = { fhir: true }): Promise<void> {
  await page.waitForLoadState('networkidle');
  if (opts.fhir) {
    await page.waitForFunction(() => {
      const w = window as any;
      return w.LForms && w.LForms.Util && w.LForms.FHIR;
    }, TIMEOUT_30S);
  } else {
    await page.waitForFunction(() => {
      const w = window as any;
      return w.LForms && w.LForms.Util;
    }, TIMEOUT_30S);
  }
}


/**
 * Upload a file via a file input element.
 * Temporarily unhides the input, sets the file, then re-hides it.
 * @param page - The Playwright page instance.
 * @param inputSelector - CSS selector for the `<input type="file">` element.
 * @param filePath - Relative or absolute path to the file to upload.
 * @returns A promise that resolves once the file has been set on the input.
 */
export async function uploadFile(page: Page, inputSelector: string, filePath: string): Promise<void> {
  const absPath = path.resolve(filePath);
  const input = page.locator(inputSelector);
  // Temporarily unhide the file input (matching Cypress behavior)
  await input.evaluate(el => el.className = '');
  await input.setInputFiles(absPath);
  await input.evaluate(el => el.className = 'hide');
}


/**
 * Simulate Cypress-style key sequences on a Playwright locator.
 * Supports special keys in braces (e.g. `{enter}`, `{downarrow}`) and plain text.
 * @param locator - The Playwright Locator to send keys to.
 * @param keys - A Cypress-style key string (e.g. `'hello{enter}'`, `'{downarrow}{downarrow}'`).
 * @returns A promise that resolves after all keys have been pressed.
 */
export async function pressCypressKeys(locator: Locator, keys: string): Promise<void> {
  const tokens = keys.match(/\{[^}]+\}|[^{}]+/g) || [];
  for (const token of tokens) {
    if (token.startsWith('{') && token.endsWith('}')) {
      const raw = token.slice(1, -1).toLowerCase();
      const map: Record<string, string> = {
        downarrow: 'ArrowDown',
        uparrow: 'ArrowUp',
        leftarrow: 'ArrowLeft',
        rightarrow: 'ArrowRight',
        enter: 'Enter',
        tab: 'Tab',
        esc: 'Escape',
        backspace: 'Backspace',
        del: 'Delete'
      };
      await locator.press(map[raw] || raw);
    }
    else {
      await locator.pressSequentially(token);
    }
  }
}


/**
 * Assert that the load button contains the expected text.
 * @param page - The Playwright page instance.
 * @param text - The expected button text.
 * @returns A promise that resolves when the assertion passes.
 */
export async function expectLoadButton(page: Page, text: string): Promise<void> {
  await expect(page.locator('#loadBtn')).toContainText(text);
}


/**
 * Construct the HTML element ID for an answer option (radio button, checkbox, etc.).
 * Mirrors InternalUtil.getItemAnswerId from the lforms library.
 * @param elementId - The base element ID of the question item.
 * @param systemOrOther - The code system URI, or the "other" label when `code` is omitted.
 * @param code - The answer code. When provided, builds a `elementId|system|code` ID.
 * @returns The fully constructed answer element ID.
 */
export function answerId(elementId: string, systemOrOther?: string, code?: string): string {
  if (code !== undefined) {
    const system = systemOrOther
      ? systemOrOther.replaceAll('\\', '\\\\').replaceAll('|', '\\|')
      : '';
    const answerCode = code
      .replaceAll('%', '%25')
      .replaceAll(' ', '%20')
      .replaceAll('\\', '\\\\')
      .replaceAll('|', '\\|');
    return elementId + '|' + system + '|' + answerCode;
  } else {
    return (
      elementId.replaceAll('\\', '\\\\').replaceAll('|', '\\|') +
      '|' +
      systemOrOther
    );
  }
}


/**
 * Open the lforms test page and load a form by its dropdown index.
 * @param page - The Playwright page instance.
 * @param formIndex - The zero-based index in the form dropdown to select.
 * @returns A promise that resolves when the form is fully loaded and visible.
 */
export async function openFormByIndex(page: Page, formIndex: number): Promise<void> {
  await page.goto('/test/pages/lforms_testpage.html');
  await waitForLFormsReady(page);
  await page.selectOption('#form-list', { index: formIndex });
  await page.click('#load-form-data');
  await expect(page.locator('.lhc-form-title')).toBeVisible({ timeout: 10000 });
  // Wait for onFormReady event
  await page.waitForFunction(() => {
    const el = document.getElementById('test-form');
    return el && el.querySelector('.lhc-question');
  }, { timeout: 10000 });
}


/**
 * Load a form definition file onto the addFormToPageTest page via LForms.Util.addFormToPage.
 * @param page - Playwright page (should already be on addFormToPageTest.html with LForms loaded).
 * @param fileName - The form definition file name under test/data/.
 * @param container - The container element ID (default: `'formContainer'`).
 * @param options - Options passed to LForms.Util.addFormToPage (e.g. `{ fhirVersion: 'R4' }`).
 * @returns A promise that resolves when the form is rendered and visible in the container.
 */
export async function addFormToPage(
  page: Page,
  fileName: string,
  container = 'formContainer',
  options?: Record<string, any>
): Promise<void> {
  const fhirVersion = options?.fhirVersion;
  const fhirVersionInFile = fhirVersion === 'R4B' ? 'R4' : fhirVersion;
  const filePath = fhirVersionInFile
    ? fhirVersionInFile + '/' + fileName
    : 'lforms/' + fileName;
  const absPath = path.resolve('test/data/' + filePath);
  const formDef = JSON.parse(require('fs').readFileSync(absPath, 'utf-8'));

  await page.evaluate(
    async ({ formDef, container, options }) => {
      document.getElementById(container)!.innerHTML = '';
      // addFormToPage may reject with warnings for some forms, but still loads
      await (window as any).LForms.Util.addFormToPage(formDef, container, options).catch(() => {});
    },
    { formDef, container, options }
  );

  await expect(page.locator('#' + container + ' .lhc-form-title')).toBeVisible({ timeout: 10000 });
}


/**
 * On the lforms_testpage.html, upload a test data file and wait for form to load.
 * @param page - Playwright page (should already be on lforms_testpage.html).
 * @param fileName - File name under test/data/{fhirVersion}/.
 * @param fhirVersion - Subdirectory under test/data (default: `'lforms'`).
 * @returns A promise that resolves when the form title is visible.
 */
export async function loadFromTestData(page: Page, fileName: string, fhirVersion = 'lforms'): Promise<void> {
  if (fhirVersion !== 'lforms') {
    await page.locator('#fhirVersion').selectOption(fhirVersion);
  }
  const fhirVersionInFile = fhirVersion === 'R4B' ? 'R4' : fhirVersion;
  const filePath = `test/data/${fhirVersionInFile}/${fileName}`;
  await uploadFile(page, '#fileAnchor', filePath);
  await expect(page.locator('.lhc-form-title')).toBeVisible({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
}
