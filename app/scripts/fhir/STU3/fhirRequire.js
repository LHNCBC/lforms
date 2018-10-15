// Initializes the FHIR structure for STU3
let fhirVersion = 'STU3';
if (!LForms.FHIR)
  LForms.FHIR = {};
var fhir = LForms.FHIR[fhirVersion] = {};
fhir.fhirpath = require('fhirpath');
import dr from './lforms-fhir-diagnostic-report.js';
fhir.DiagnosticReport = dr;
import fhir_sdc from './lforms-fhir-sdc.js';
fhir.SDC = fhir_sdc;
import addSDCImportFns from './lforms-fhir-sdc-converter.js';
addSDCImportFns(fhir.SDC);
fhir.SDC.fhirVersion = fhirVersion; // Needed by lfData for fhirpath, etc.
//LForms.FHIR = import('./lforms-fhir-diagnostic-report.js');
/*LForms.FHIR = await import('./lforms-fhir-diagnostic-report.js');
LForms.FHIR_SDC = await import('./lforms-fhir-sdc.js');
var addSDCImportFns = await import('./lforms-fhir-sdc-converter.js');
addSDCImportFns(LForms.FHIR_SDC);
*/
