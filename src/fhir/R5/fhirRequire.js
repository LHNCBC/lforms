// Initializes the FHIR structure for R5
let fhirVersion = 'R5';
if (!LForms.FHIR)
  LForms.FHIR = {};
import {LOINC_URI} from '../common/fhir-common';
var fhir = LForms.FHIR[fhirVersion] = {
  LOINC_URI: LOINC_URI
};
fhir.fhirpath = require('fhirpath');
fhir.fhirpathModel = require('fhirpath/fhir-context/r4');
import dr from '../common/diagnostic-report.js';
// Because we are assigning ./export.js to dr below, we need our own copy of the
// dr object.
fhir.DiagnosticReport = Object.assign({}, dr);
import commonExport from '../R4R5-common/export.js';
fhir.DiagnosticReport._commonExport = commonExport;
import fhir_sdc from '../R4R5-common/sdc-export.js';
// need a copy of the object, to separate from R4
fhir.SDC = Object.assign({}, fhir_sdc);
fhir.SDC._commonExport = commonExport;
import addCommonSDCExportFns from '../common/sdc-export-common.js';
addCommonSDCExportFns(fhir.SDC);
import addCommonSDCImportFns from '../common/sdc-import-common.js';
addCommonSDCImportFns(fhir.SDC);
import addSDCImportFns from '../R4R5-common/sdc-import.js';
addSDCImportFns(fhir.SDC);
import addR5ExportFns from './sdc-export.js';
addR5ExportFns(fhir.SDC);
import addCommonSDCFns from '../common/sdc-common.js';
addCommonSDCFns(fhir.SDC);
import addR5ImportFns from './sdc-import.js';
addR5ImportFns(fhir.SDC);
import { addCommonRuntimeFns } from '../common/runtime-common.js';
addCommonRuntimeFns(fhir.SDC);
import { ExpressionProcessor } from '../expression-processor.js';
fhir.SDC.ExpressionProcessor = ExpressionProcessor;
fhir.SDC.fhirVersion = fhirVersion; // Needed by lfData for fhirpath, etc.

fhir.reservedVarNames = {};
['context', 'resource'].forEach(function(name) {
  fhir.reservedVarNames[name] = true;
});
