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
