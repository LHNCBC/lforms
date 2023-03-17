// Initializes the FHIR structure for R4
let fhirVersion = 'R4';
if (!LForms.FHIR)
  LForms.FHIR = {};
import {LOINC_URI} from '../fhir-common';
var fhir = LForms.FHIR[fhirVersion] = {
  LOINC_URI: LOINC_URI
};
fhir.fhirpath = require('fhirpath');
fhir.fhirpathModel = require('fhirpath/fhir-context/r4');
import dr from '../diagnostic-report.js';
// Because we are assigning ./export.js to dr below, we need our own copy of the
// dr object.
const drCopy = Object.assign({}, dr);
fhir.DiagnosticReport = drCopy;
import commonExport from '../R4R5-common/export.js';
fhir.DiagnosticReport._commonExport = commonExport;
import fhir_sdc from '../R4R5-common/sdc-export.js';
// need a copy of the object, to separate from R5
const fhirSdc = Object.assign({}, fhir_sdc);
fhir.SDC = fhirSdc;
fhir.SDC._commonExport = commonExport;
import addCommonSDCExportFns from '../sdc-export-common.js';
addCommonSDCExportFns(fhir.SDC);
import addCommonSDCImportFns from '../sdc-import-common.js';
addCommonSDCImportFns(fhir.SDC);
import addSDCImportFns from '../R4R5-common/sdc-import.js';
addSDCImportFns(fhir.SDC);
import addCommonSDCFns from '../sdc-common.js';
addCommonSDCFns(fhir.SDC);
import addR4ImportFns from './sdc-import.js';
addR4ImportFns(fhir.SDC)
import { addCommonRuntimeFns } from '../runtime-common.js';
addCommonRuntimeFns(fhir.SDC);
import { ExpressionProcessor } from '../expression-processor.js';
fhir.SDC.ExpressionProcessor = ExpressionProcessor;
fhir.SDC.fhirVersion = fhirVersion; // Needed by lfData for fhirpath, etc.

fhir.reservedVarNames = {};
['context', 'resource'].forEach(function(name) {
  fhir.reservedVarNames[name] = true;
});
