// This is the entry point for the bower version of LForms.  It does not include
// any of the bower dependencies.
var LForms = require('./lforms-index.js');
LForms.Def = Def; // from the bower autocomplete-lhc package

if (!LForms.ucumPkg)
  LForms.ucumPkg = window.ucumPkg; // window.ucumPkg is defined by the bower ucum-lhc package

// The NPM version of lforms puts elementResizeDetectorMaker in an internal
// variable to avoid creating another global.  For compatibility, do the same
// for this bower version.
LForms._elementResizeDetectorMaker = elementResizeDetectorMaker; // bower package

module.exports = LForms;
