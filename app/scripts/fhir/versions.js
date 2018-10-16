// Contains information about the supported FHIR versions.
var FHIRSupport =  {
  'STU3': 'partial',
  'R4': 'WIP'
};

// Also for loading either in browser or on the server side.
if (typeof LForms != 'undefined' && LForms.Util)
  LForms.Util.FHIRSupport = FHIRSupport;

if (typeof module != 'undefined')
  module.exports = FHIRSupport;
