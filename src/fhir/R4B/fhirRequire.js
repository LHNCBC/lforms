import copy from "fast-copy"
// Initializes the FHIR structure for R4B
import versions from './fhirVersions.js';
if (!LForms.FHIR)
  LForms.FHIR = {};
import {LOINC_URI} from '../common/fhir-common.js';
var fhir = LForms.FHIR[versions.fhirVersion] = {
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
// need a copy of the object, to separate from R5
fhir.SDC = Object.assign({}, fhir_sdc);
fhir.SDC._commonExport = commonExport;
import addCommonSDCExportFns from '../common/sdc-export-common.js';
addCommonSDCExportFns(fhir.SDC);
import addCommonSDCImportFns from '../common/sdc-import-common.js';
addCommonSDCImportFns(fhir.SDC);
import addSDCImportFns from '../R4R5-common/sdc-import.js';
addSDCImportFns(fhir.SDC);
import addSTU3R4ExportFns from '../STU3R4-common/sdc-export.js'
addSTU3R4ExportFns(fhir.SDC);
import addSTU3R4ImportFns from '../STU3R4-common/sdc-import.js'
addSTU3R4ImportFns(fhir.SDC);
import addR4ExportFns from '../R4/sdc-export.js';
addR4ExportFns(fhir.SDC);
import addCommonSDCFns from '../common/sdc-common.js';
addCommonSDCFns(fhir.SDC);
import addR4ImportFns from '../R4/sdc-import.js';
addR4ImportFns(fhir.SDC)
import { addCommonRuntimeFns } from '../common/runtime-common.js';
addCommonRuntimeFns(fhir.SDC);
import { ExpressionProcessor } from '../expression-processor.js';
fhir.SDC.ExpressionProcessor = ExpressionProcessor;
Object.assign(fhir.SDC, versions);

fhir.reservedVarNames = {};
['context', 'resource'].forEach(function(name) {
  fhir.reservedVarNames[name] = true;
});
