import { expect, type Locator, type Page } from '@playwright/test';
import path from 'path';

export function escapeIdSelector(id: string): string {
  return id.replace(/([.#:[\]/\\|%])/g, '\\$1');
}

export function byId(page: Page, id: string): Locator {
  const rawId = id.startsWith('#') ? id.slice(1) : id;
  return page.locator('#' + escapeIdSelector(rawId));
}

/**
 * Wait for LForms and (optionally) FHIR libs to be fully loaded on the page.
 */
export async function waitForLFormsReady(page: Page, opts: { fhir?: boolean } = { fhir: true }): Promise<void> {
  await page.waitForLoadState('networkidle');
  if (opts.fhir) {
    await page.waitForFunction(() => {
      const w = window as any;
      return w.LForms && w.LForms.Util && w.LForms.FHIR;
    }, { timeout: 30000 });
  } else {
    await page.waitForFunction(() => {
      const w = window as any;
      return w.LForms && w.LForms.Util;
    }, { timeout: 30000 });
  }
}

export async function uploadFile(page: Page, inputSelector: string, filePath: string): Promise<void> {
  const absPath = path.resolve(filePath);
  const input = page.locator(inputSelector);
  // Temporarily unhide the file input (matching Cypress behavior)
  await input.evaluate(el => el.className = '');
  await input.setInputFiles(absPath);
  await input.evaluate(el => el.className = 'hide');
}

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
      await locator.type(token);
    }
  }
}

export async function expectLoadButton(page: Page, text: string): Promise<void> {
  await expect(page.locator('#loadBtn')).toContainText(text);
}
