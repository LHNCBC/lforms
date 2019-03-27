// Initializes the FHIR structure for R4
let fhirVersion = 'R4';
if (!LForms.FHIR)
  LForms.FHIR = {};
var fhir = LForms.FHIR[fhirVersion] = {
  LOINC_URI: 'http://loinc.org'
};
fhir.fhirpath = require('fhirpath');
import dr from '../lforms-fhir-diagnostic-report.js';
fhir.DiagnosticReport = dr;
import fhir_sdc from './sdc-export.js';
fhir.SDC = fhir_sdc;
import addCommonSDCExportFns from '../sdc-export-common.js';
addCommonSDCExportFns(fhir.SDC);
import addSDCImportFns from './sdc-import.js';
addSDCImportFns(fhir.SDC);
import addCommonSDCFns from '../sdc-common.js';
addCommonSDCFns(fhir.SDC);
import addCommonSDCImportFns from '../sdc-import-common.js';
addCommonSDCImportFns(fhir.SDC);
fhir.SDC.fhirVersion = fhirVersion; // Needed by lfData for fhirpath, etc.

fhir.reservedVarNames = {};
['context', 'resource'].forEach(function(name) {
  fhir.reservedVarNames[name] = true;
});

