import copy from "fast-copy"
// Initializes the FHIR structure for STU3
import versions from './fhirVersions.js';
if (!LForms.FHIR)
  LForms.FHIR = {};
import {LOINC_URI} from '../fhir-common';
var fhir = LForms.FHIR[versions.fhirVersion] = {
  LOINC_URI: LOINC_URI
}
fhir.fhirpath = require('fhirpath');
fhir.fhirpathModel = require('fhirpath/fhir-context/stu3');
import dr from '../diagnostic-report.js';
// Because we are assigning ./export.js to dr below, we need our own copy of the
// dr object.
fhir.DiagnosticReport = copy(dr);
import commonExport from './export.js';
fhir.DiagnosticReport._commonExport = commonExport;
import fhir_sdc from './sdc-export.js';
fhir.SDC = fhir_sdc;
fhir.SDC._commonExport = commonExport;
import addCommonSDCExportFns from '../sdc-export-common.js'
addCommonSDCExportFns(fhir.SDC);
import addSDCImportFns from './sdc-import.js';
addSDCImportFns(fhir.SDC);
import addCommonSDCFns from '../sdc-common.js';
addCommonSDCFns(fhir.SDC);
import addCommonSDCImportFns from '../sdc-import-common.js';
addCommonSDCImportFns(fhir.SDC);
import { addCommonRuntimeFns } from '../runtime-common.js';
addCommonRuntimeFns(fhir.SDC);
import { ExpressionProcessor } from '../expression-processor.js';
fhir.SDC.ExpressionProcessor = ExpressionProcessor;
Object.assign(fhir.SDC, versions);

fhir.reservedVarNames = {};
['context', 'resource'].forEach(function(name) {
  fhir.reservedVarNames[name] = true;
});

