// A list of files from the lforms package itself to be combined with webpack.
// For the full list for the bower or npm package, see bower-index.js or
// index.js.
var LForms = require('../lforms.js');
require("./lforms-constants.js");
require("./lforms-config.js");
require("./lforms-controllers.js");
require("./lforms-directives.js");
require("./bootstrap-decorators.js");
require("./lib/cross_browser.js");
require("./lib/lforms-util.js");
require("./lib/polyfill.js");
require("./lib/lforms-hl7.js");
require("./lib/lforms-validate.js");
require("./lib/lforms-data.js");
LForms.Util.FHIRSupport = require("./fhir/versions.js");
require("../lforms.tpl.js");
LForms._elementResizeDetectorMaker = require("element-resize-detector");

module.exports = LForms;
