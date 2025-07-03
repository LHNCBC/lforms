// Contains information about the supported FHIR versions.
var FHIRSupport =  {
  'STU3': 'partial',
  'R4': 'WIP',
  'R4B': 'WIP',
  'R5': 'WIP'
};

if (typeof module != 'undefined')
  module.exports = FHIRSupport;
