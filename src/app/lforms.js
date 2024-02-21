import * as ucumPkg from '@lhncbc/ucum-lhc';
import LhcFormUtils from '../lib/lforms/lhc-form-utils.js';
import LhcFormData  from '../lib/lforms/lhc-form-data';
import LhcHL7 from '../lib/lforms/lhc-hl7.js';
import './importJQuery'; // sets window.jQuery, needed for autocomplete-lhc, if not set; also sets window.LForms
import Def from 'autocomplete-lhc'; // see docs at http://lhncbc.github.io/autocomplete-lhc/docs.html
import Validation from '../lib/lforms/lhc-form-validation.js';
import * as FHIRSupport from '../fhir/versions.js';
import version from '../version.json';

export const LForms = window.LForms; // set above by importJQuery
LForms.LFormsData = LhcFormData;
LForms.HL7 = LhcHL7;
LForms.ucumPkg = ucumPkg;
LForms.Util = LhcFormUtils;
LForms.Def = Def;
LForms.Validations =  Validation;
LForms.lformsVersion = version.lformsVersion
//LForms.jQuery is set above in importJQuery
LForms.Util.FHIRSupport = FHIRSupport;

// Above in ./importJQuery, we temporarily set window.jQuery, which is needed
// for the autocomplete-lhc initialization.  Reset that now.
if (LForms.externalJQuery)
  window.jQuery = LForms.externalJQuery;
else
  delete window.jQuery;
delete LForms.externalJQuery;
