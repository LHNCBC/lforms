import * as ucumPkg from '@lhncbc/ucum-lhc';
import LhcFormUtils from '../lib/lforms/lhc-form-utils.js';
import LhcFormData  from '../lib/lforms/lhc-form-data';
import LhcHL7 from '../lib/lforms/lhc-hl7.js';
import Def from 'autocomplete-lhc'; // see docs at http://lhncbc.github.io/autocomplete-lhc/docs.html
import Validation from '../lib/lforms/lhc-form-validation.js';
import * as FHIRSupport from '../fhir/versions.js';
import version from '../version.json';

export const LForms = {
  LFormsData: LhcFormData,
  HL7: LhcHL7,
  ucumPkg: ucumPkg,
  Util: LhcFormUtils,
  Def: Def,
  Validations: Validation,
  lformsVersion: version.lformsVersion
}
LForms.Util.FHIRSupport = FHIRSupport;
