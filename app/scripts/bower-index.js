// This is the entry point for the bower version of LForms.  It does not include
// any of the bower dependencies.
var Def = require('autocomplete-lhc');
var LForms = require('../lforms.js');
LForms.Def = Def;
require("./lforms-constants.js");
require("./lforms-config.js");
require("./lforms-controllers.js");
require("./lforms-directives.js");
require("./bootstrap-decorators.js");
require("./lib/date.js");
require("./lib/cross_browser.js");
require("./lib/lforms-util.js");
require("./lib/polyfill.js");
require("./lib/lforms-hl7.js");
require("./lib/lforms-validate.js");
require("./lib/lforms-data.js");
require("./lib/expression-processor.js");
LForms.Util.FHIRSupport = require("./fhir/versions.js");
require("../lforms.tpl.js");
// The NPM version of lforms puts elementResizeDetectorMaker in an internal
// variable to avoid creating another global.  For compatibility, do the same
// for this bower version.
LForms._elementResizeDetectorMaker = elementResizeDetectorMaker; // bower package

module.exports = LForms;
