// The main file for package.json
// Note that zone.min.js should only be included if you don't have it already.
import './lforms/webcomponent/assets/lib/zone.min.js';
import './lforms/webcomponent/scripts.js';
import './lforms/webcomponent/runtime-es5.js';
import './lforms/webcomponent/polyfills-es5.js';
import './lforms/webcomponent/main-es5.js';
// If you only want to include one version of FHIR, you can import the support
// for just that version, for instance:
//   dist/lforms/fhir/R4/lformsFHIR.min.js
import './lforms/fhir/lformsFHIRAll.min.js';
