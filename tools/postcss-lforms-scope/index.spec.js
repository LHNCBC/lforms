'use strict';

/*
 * Unit tests for the postcss-lforms-scope build-time plugin.
 *
 * Run with: npm run test:tools
 *
 * These tests feed small CSS snippets through PostCSS with a fake `from` path
 * (the plugin classifies stylesheets by their source path) and assert on the
 * transformed output.
 */

const assert = require('assert');
const postcss = require('postcss');
const plugin = require('./index');

// Fake source paths that make the plugin treat the input as vendor CSS.
const NGZORRO_CORE = 'node_modules/ng-zorro-antd/style/index.min.css';
const NGZORRO_COMPONENT = 'node_modules/ng-zorro-antd/button/style/index.min.css';
const AUTOCOMPLETE = 'node_modules/autocomplete-lhc/css/auto_completion.css';
const FIRST_PARTY = 'src/lhc-form.css';

/**
 * Run the plugin over `css`, classified according to `from`, and return the
 * resulting CSS string.
 */
async function run(css, from) {
  const result = await postcss([plugin]).process(css, { from });
  return result.css;
}

describe('postcss-lforms-scope', () => {
  it('leaves first-party (non-vendor) stylesheets untouched', async () => {
    const input = '.lhc-form .foo { color: red; }';
    const output = await run(input, FIRST_PARTY);
    assert.strictEqual(output, input);
    assert.ok(!output.includes('@layer'));
  });

  it('scopes ng-zorro component selectors to both the form and the overlay', async () => {
    const output = await run('.ant-btn { color: red; }', NGZORRO_COMPONENT);
    assert.ok(output.includes('@layer lforms'));
    assert.ok(output.includes(':where(.lhc-form) .ant-btn'));
    assert.ok(output.includes(':where(.lhc-form-overlay-container) .ant-btn'));
  });

  it('strips ng-zorro core bare-element reset rules', async () => {
    const output = await run('body { margin: 0; } h1 { font-size: 2em; }', NGZORRO_CORE);
    assert.ok(!output.includes('body'));
    assert.ok(!output.includes('margin'));
    assert.ok(!output.includes('h1'));
  });

  it('keeps and scopes class-bearing rules in the ng-zorro core file', async () => {
    const output = await run('a { color: blue; } .ant-btn { color: red; }', NGZORRO_CORE);
    // Bare-element rule dropped.
    assert.ok(!output.includes('blue'));
    // Class rule kept and scoped.
    assert.ok(output.includes(':where(.lhc-form) .ant-btn'));
    assert.ok(output.includes(':where(.lhc-form-overlay-container) .ant-btn'));
  });

  it('does NOT strip bare-element rules from non-core ng-zorro files (scopes them instead)', async () => {
    const output = await run('body { margin: 0; }', NGZORRO_COMPONENT);
    assert.ok(output.includes(':where(.lhc-form) body'));
    assert.ok(output.includes(':where(.lhc-form-overlay-container) body'));
  });

  it('scopes .cdk-overlay-container onto the LForms marker class', async () => {
    const output = await run('.cdk-overlay-container { z-index: 1000; }', NGZORRO_COMPONENT);
    assert.ok(output.includes('.lhc-form-overlay-container.cdk-overlay-container'));
    // Must not also emit a plain in-form/in-overlay descendant variant.
    assert.ok(!output.includes(':where(.lhc-form) .cdk-overlay-container'));
  });

  it('scopes overlay-only cdk constructs under the overlay container', async () => {
    const output = await run('.cdk-overlay-pane { position: absolute; }', NGZORRO_COMPONENT);
    assert.ok(output.includes(':where(.lhc-form-overlay-container) .cdk-overlay-pane'));
    assert.ok(!output.includes(':where(.lhc-form) .cdk-overlay-pane'));
  });

  it('preserves the high-contrast prefix when scoping overlay constructs', async () => {
    const output = await run(
      '.cdk-high-contrast-active .cdk-overlay-pane { outline: 1px solid; }',
      NGZORRO_COMPONENT
    );
    assert.ok(
      output.includes('.cdk-high-contrast-active :where(.lhc-form-overlay-container) .cdk-overlay-pane')
    );
  });

  it('scopes autocomplete-lhc generic classes to the form and results popup', async () => {
    const output = await run('.form_auto_complete { color: red; }', AUTOCOMPLETE);
    assert.ok(output.includes(':where(.lhc-form) .form_auto_complete'));
    assert.ok(output.includes('#lhc-tools-searchResults.form_auto_complete'));
  });

  it('leaves autocomplete-lhc fixed ids untouched', async () => {
    const output = await run('#lhc-tools-searchResults { color: red; }', AUTOCOMPLETE);
    assert.ok(output.includes('#lhc-tools-searchResults'));
    assert.ok(!output.includes(':where(.lhc-form) #lhc-tools-searchResults'));
  });

  it('does not scope keyframe step selectors', async () => {
    const output = await run(
      '@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }',
      NGZORRO_COMPONENT
    );
    assert.ok(output.includes('@keyframes spin'));
    assert.ok(output.includes('from'));
    assert.ok(output.includes('to'));
    assert.ok(!output.includes(':where(.lhc-form) from'));
  });

  it('respects commas inside functional pseudo-classes when splitting selectors', async () => {
    const output = await run('.ant-x:not(.a, .b) { color: red; }', NGZORRO_COMPONENT);
    // The :not(...) list must remain a single, intact selector (not split on
    // the inner comma), scoped to both containers.
    assert.ok(output.includes(':where(.lhc-form) .ant-x:not(.a, .b)'));
    assert.ok(output.includes(':where(.lhc-form-overlay-container) .ant-x:not(.a, .b)'));
  });

  it('keeps @charset / @import at the top level, outside @layer lforms', async () => {
    const output = await run(
      "@charset \"utf-8\"; .ant-btn { color: red; }",
      NGZORRO_COMPONENT
    );
    // @charset stays before the @layer wrapper.
    assert.ok(/^@charset[^]*@layer lforms/.test(output.trim()));
  });

  it('removes page-level @viewport at-rules', async () => {
    const output = await run('@viewport { width: device-width; } .ant-btn { color: red; }', NGZORRO_COMPONENT);
    assert.ok(!output.includes('@viewport'));
    assert.ok(output.includes(':where(.lhc-form) .ant-btn'));
  });
});
