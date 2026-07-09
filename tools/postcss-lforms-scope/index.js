'use strict';

/*
 * postcss-lforms-scope
 *
 * A build-time PostCSS plugin that prevents the LForms web component's
 * third-party vendor CSS (ng-zorro-antd + autocomplete-lhc) from polluting
 * host-page global styles, without a separate "rebuild vendor CSS" step.
 *
 * For every vendor stylesheet (detected by source path) it:
 *   1. Strips ng-zorro's bare-element global reset (html/body/*, h1-h6, a,
 *      button, ...) from the ng-zorro "core" file -- those rules leak out of
 *      the component because the build does not use Shadow DOM.
 *   2. Rewrites the remaining selectors so they only match inside LForms-owned
 *      containers: the form itself (`.lhc-form`), the CDK overlay container
 *      that hosts ng-zorro popovers / date & time pickers
 *      (`.lhc-form-overlay-container`), and the autocomplete-lhc results popup
 *      (`#lhc-tools-searchResults`). Scoping uses `:where(...)` so it adds no
 *      specificity and host pages can still override with plain CSS.
 *   3. Wraps the result in `@layer lforms` so any unlayered host rule wins on
 *      conflict, keeping internal styles user-overridable.
 *
 * First-party LForms stylesheets and Angular component styles are left
 * untouched. See https://github.com/LHNCBC/lforms/issues/169
 */

const IN_FORM = ':where(.lhc-form)';
const IN_OVERLAY = ':where(.lhc-form-overlay-container)';

/**
 * Split a comma-separated selector list while respecting quotes, attribute
 * brackets and functional-pseudo parentheses (e.g. `:not(a, b)`).
 */
function splitSelectorList(selectorList) {
  const selectors = [];
  let start = 0;
  let quote = null;
  let bracketDepth = 0;
  let parenDepth = 0;

  for (let i = 0; i < selectorList.length; i++) {
    const ch = selectorList[i];
    if (quote) {
      if (ch === '\\') {
        i++;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '[') {
      bracketDepth++;
    } else if (ch === ']') {
      bracketDepth--;
    } else if (ch === '(') {
      parenDepth++;
    } else if (ch === ')') {
      parenDepth--;
    } else if (ch === ',' && bracketDepth === 0 && parenDepth === 0) {
      selectors.push(selectorList.slice(start, i).trim());
      start = i + 1;
    }
  }

  selectors.push(selectorList.slice(start).trim());
  return selectors.filter(Boolean);
}

/**
 * A rule is kept only if at least one of its comma-separated selectors
 * references a class (`.`), id (`#`), the `ant-` token or the `cdk-` token.
 * Rules made purely of bare elements / pseudos are ng-zorro's global reset and
 * are dropped (the safe subset is re-applied, scoped, by lforms-vendor-reset.css).
 */
function shouldKeepSelector(selectorList) {
  return splitSelectorList(selectorList).some((sel) => {
    const s = sel.trim();
    if (!s) return false;
    return (
      s.includes('.') ||
      s.includes('#') ||
      s.includes('ant-') ||
      s.includes('cdk-')
    );
  });
}

function scopeNgZorroSelector(selector) {
  const s = selector.trim();
  if (!s) return [];

  // The CDK overlay container element itself -- scope on the same element so
  // only LForms' overlay container is matched, not other apps' overlays.
  if (s.includes('.cdk-overlay-container')) {
    return [
      s.replace(
        /\.cdk-overlay-container/g,
        '.lhc-form-overlay-container.cdk-overlay-container'
      )
    ];
  }

  // Other overlay-only constructs live under the overlay container.
  if (
    s.includes('.cdk-overlay') ||
    s.includes('.cdk-global-overlay-wrapper') ||
    s.includes('.cdk-visually-hidden') ||
    s.includes('.nz-overlay')
  ) {
    const highContrastPrefix = '.cdk-high-contrast-active ';
    if (s.startsWith(highContrastPrefix)) {
      return [
        `${highContrastPrefix}${IN_OVERLAY} ${s.slice(highContrastPrefix.length)}`
      ];
    }
    return [`${IN_OVERLAY} ${s}`];
  }

  // ng-zorro components can render either inside the form or inside the CDK
  // overlay container, so scope both cases.
  return [`${IN_FORM} ${s}`, `${IN_OVERLAY} ${s}`];
}

function scopeAutocompleteSelector(selector) {
  const s = selector.trim();
  if (!s) return [];

  if (s === '.screen_reader_only') {
    return [
      `${IN_FORM} .screen_reader_only`,
      '[id^="reader_log"].screen_reader_only'
    ];
  }

  // The autocomplete results popup uses fixed ids; leave them as-is.
  if (s.startsWith('#lhc-tools-') || s.startsWith('#completionOptionsScroller')) {
    return [s];
  }

  const scoped = [`${IN_FORM} ${s}`];

  // autocomplete-lhc renders a shared results popup outside the form. Generic
  // class names there still need styles, but must not touch host-page elements
  // with names like .heading or .suggestion.
  if (s.startsWith('.form_auto_complete')) {
    scoped.push(`#lhc-tools-searchResults${s}`);
  } else {
    scoped.push(`#lhc-tools-searchResults ${s}`);
  }

  return scoped;
}

function transformSelectorList(selectorList, scopeSelector) {
  return splitSelectorList(selectorList).flatMap(scopeSelector).filter(Boolean);
}

/**
 * Classify a stylesheet by its source path.
 *
 * NOTE: this depends on ng-zorro's internal layout -- the global reset lives in
 * `ng-zorro-antd/style/index*` (verified against ng-zorro-antd@20.4.3). If a
 * future ng-zorro version relocates or renames that file, `ngzorro-core` will
 * no longer be detected and the reset would stop being stripped; re-check this
 * matcher (and src/lforms-vendor-reset.css) when bumping ng-zorro.
 * @returns {'ngzorro-core'|'ngzorro'|'autocomplete'|null}
 */
function categorize(file) {
  if (!file) return null;
  const f = file.split('\\').join('/');
  if (f.includes('/ng-zorro-antd/')) {
    return /\/ng-zorro-antd\/style\/index/.test(f) ? 'ngzorro-core' : 'ngzorro';
  }
  if (f.includes('/autocomplete-lhc/')) {
    return 'autocomplete';
  }
  return null;
}

const plugin = () => ({
  postcssPlugin: 'postcss-lforms-scope',
  Once(root, { AtRule }) {
    const file =
      root.source && root.source.input && root.source.input.file;
    const kind = categorize(file);
    if (!kind) {
      return; // not a vendor stylesheet -- leave it untouched
    }

    const scopeSelector =
      kind === 'autocomplete' ? scopeAutocompleteSelector : scopeNgZorroSelector;
    const stripReset = kind === 'ngzorro-core';

    // Viewport at-rules affect the whole page, not safe from a web component.
    root.walkAtRules(/^-?(\w+-)*viewport$/i, (at) => {
      if (/viewport$/i.test(at.name)) at.remove();
    });

    root.walkRules((rule) => {
      // Never touch keyframe step selectors (0%, from, to, ...).
      for (let p = rule.parent; p; p = p.parent) {
        if (p.type === 'atrule' && /keyframes$/i.test(p.name)) {
          return;
        }
      }

      if (stripReset && !shouldKeepSelector(rule.selector)) {
        rule.remove();
        return;
      }

      const scoped = transformSelectorList(rule.selector, scopeSelector);
      if (scoped.length === 0) {
        rule.remove();
        return;
      }
      rule.selector = Array.from(new Set(scoped)).join(',');
    });

    // Wrap the (now scoped) stylesheet in `@layer lforms`, leaving any leading
    // @charset / @import at the top level where the spec requires them.
    const layer = new AtRule({ name: 'layer', params: 'lforms' });
    const toMove = [];
    root.each((node) => {
      if (node.type === 'atrule' && /^(charset|import)$/i.test(node.name)) {
        return;
      }
      toMove.push(node);
    });
    if (toMove.length === 0) {
      return;
    }
    toMove.forEach((node) => layer.append(node));
    root.append(layer);
  }
});

plugin.postcss = true;

module.exports = plugin;
