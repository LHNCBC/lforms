// The main file for package.json
// This file is unlikely to work if processed by another bundler, because the
// files listed here have already been bundled and minified by webpack
// Use the lforms-loader package instead, which will dynamically load lforms
// onto your webpage.

// Note that zone.min.js should only be included if you don't have it already.
import './lforms/webcomponent/assets/lib/zone.min.js';
import './lforms/webcomponent/scripts.js';
import './lforms/webcomponent/runtime.js';
import './lforms/webcomponent/polyfills.js';
import './lforms/webcomponent/main.js';
// If you only want to include one version of FHIR, you can import the support
// for just that version, for instance:
//   dist/lforms/fhir/R4/lformsFHIR.min.js
import './lforms/fhir/lformsFHIRAll.min.js';
