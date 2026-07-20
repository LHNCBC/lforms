'use strict';

/*
 * Guard tests for src/lforms-vendor-reset.css.
 *
 * Background (https://github.com/LHNCBC/lforms/issues/169):
 * The vendor CSS bundle is wrapped in `@layer lforms` by
 * tools/postcss-lforms-scope so host pages can override LForms styles with
 * plain (un-layered) CSS. The catch: an un-layered author declaration ALWAYS
 * beats a layered one, regardless of specificity. So an un-layered host global
 * reset such as Bootstrap Reboot's `ul, ol { padding-left: 2rem }` (specificity
 * 0,0,1) defeats the layered vendor rule `.autocomp_selected ul { padding-left:
 * 0 }` even though the latter is far more specific.
 *
 * The fix (Option B): a few *structural* box-model / list resets in
 * src/lforms-vendor-reset.css live OUTSIDE `@layer lforms` and are scoped with
 * real class/id specificity (no `:where()`), so they:
 *   - outrank bare-element host resets (`ul {}` = 0,0,1), and
 *   - still yield to host rules that intentionally target LForms elements.
 *
 * These tests lock in that structure so the protection can't be silently
 * reverted (e.g. by moving the rules back into the layer or lowering their
 * specificity with `:where()`).
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const CSS_PATH = path.join(__dirname, '..', '..', 'src', 'lforms-vendor-reset.css');

/** True if `node` is nested (at any depth) inside an `@layer` at-rule. */
function isInsideLayer(node) {
  for (let p = node.parent; p; p = p.parent) {
    if (p.type === 'atrule' && /^layer$/i.test(p.name)) {
      return true;
    }
  }
  return false;
}

/** Find the first rule whose selector matches `re`. */
function findRule(root, re) {
  let match = null;
  root.walkRules((rule) => {
    if (!match && re.test(rule.selector)) {
      match = rule;
    }
  });
  return match;
}

/** Read a declaration's value from a rule, or undefined. */
function declValue(rule, prop) {
  let value;
  rule.walkDecls(prop, (decl) => {
    value = decl.value;
  });
  return value;
}

describe('lforms-vendor-reset.css structural (un-layered) resets', () => {
  let root;

  before(() => {
    root = postcss.parse(fs.readFileSync(CSS_PATH, 'utf8'));
  });

  it('parses without error', () => {
    assert.ok(root);
  });

  describe('autocomplete-lhc .autocomp_selected ul', () => {
    let rule;

    before(() => {
      rule = findRule(root, /\.autocomp_selected\s+ul/);
    });

    it('exists', () => {
      assert.ok(rule, 'expected a rule targeting `.autocomp_selected ul`');
    });

    it('resets padding-left to 0', () => {
      assert.strictEqual(declValue(rule, 'padding-left'), '0');
    });

    it('is OUTSIDE @layer lforms so it can beat an un-layered host `ul` reset', () => {
      assert.strictEqual(
        isInsideLayer(rule),
        false,
        'the .autocomp_selected ul reset must NOT be inside @layer lforms; ' +
          'otherwise a bare `ul { padding-left: 2rem }` host reset would win'
      );
    });

    it('uses real class/id specificity (no `:where()` that would zero it out)', () => {
      // Must scope with the class (and/or the results-popup id), and must not
      // wrap the scope in :where(), which contributes 0 specificity and would
      // fail to outrank a bare `ul` selector.
      assert.ok(/\.autocomp_selected/.test(rule.selector));
      assert.ok(!/:where\(/.test(rule.selector));
    });
  });

  describe('autocomplete-lhc results dropdown list (.auto_complete > ul)', () => {
    let rule;

    before(() => {
      rule = findRule(root, /\.auto_complete\s*>\s*ul/);
    });

    it('exists', () => {
      assert.ok(rule, 'expected a rule targeting `.auto_complete > ul`');
    });

    it('resets padding to 0 (defends against host `ul { padding-left: 2rem }`)', () => {
      assert.strictEqual(declValue(rule, 'padding'), '0');
    });

    it('resets margin to 0 (defends against host `ul { margin-bottom: 1rem }`)', () => {
      assert.strictEqual(declValue(rule, 'margin'), '0');
    });

    it('is OUTSIDE @layer lforms so it can beat an un-layered host `ul` reset', () => {
      assert.strictEqual(
        isInsideLayer(rule),
        false,
        'the .auto_complete > ul reset must NOT be inside @layer lforms; ' +
          'otherwise a bare `ul { padding-left: 2rem }` host reset would indent ' +
          'the dropdown option rows'
      );
    });

    it('uses real class/id specificity (no `:where()` that would zero it out)', () => {
      assert.ok(/\.auto_complete/.test(rule.selector));
      assert.ok(!/:where\(/.test(rule.selector));
    });
  });

  describe('autocomplete-lhc search loading indicator (.loading-indicator-container progress)', () => {
    let base;
    let shown;

    before(() => {
      base = findRule(root, /\.loading-indicator-container progress(?!\.show)(,|\s*\{|\s*$)/);
      shown = findRule(root, /\.loading-indicator-container progress\.show/);
    });

    it('exists (base + .show rules)', () => {
      assert.ok(base, 'expected a `.loading-indicator-container progress` rule');
      assert.ok(shown, 'expected a `.loading-indicator-container progress.show` rule');
    });

    it('hides the progress bar by default and pins its geometry', () => {
      assert.strictEqual(declValue(base, 'display'), 'none');
      assert.strictEqual(declValue(base, 'position'), 'absolute');
      assert.strictEqual(declValue(base, 'height'), '5px');
    });

    it('reveals the bar via .show', () => {
      assert.strictEqual(declValue(shown, 'display'), 'inline-block');
    });

    it('is OUTSIDE @layer lforms so a host `progress {}` reset cannot defeat it', () => {
      assert.strictEqual(isInsideLayer(base), false);
      assert.strictEqual(isInsideLayer(shown), false);
    });

    it('uses real class specificity (no `:where()` that would zero it out)', () => {
      assert.ok(/\.loading-indicator-container/.test(base.selector));
      assert.ok(!/:where\(/.test(base.selector));
      assert.ok(!/:where\(/.test(shown.selector));
    });
  });

  describe('box-sizing reset', () => {
    let rule;

    before(() => {
      rule = findRule(root, /\.lhc-form \*/);
    });

    it('exists and applies border-box', () => {
      assert.ok(rule, 'expected a `.lhc-form *` box-sizing rule');
      assert.strictEqual(declValue(rule, 'box-sizing'), 'border-box');
    });

    it('is OUTSIDE @layer lforms', () => {
      assert.strictEqual(isInsideLayer(rule), false);
    });
  });
});
