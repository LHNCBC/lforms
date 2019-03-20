// This is the entry point for building the browser-ready version.
window.jQuery = require('jquery');
require('jquery-ui/ui/widgets/datepicker.js');
require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/datepicker.css');
require('jquery-ui/themes/base/theme.css');
//require('./jquery-imports');
// jQuery will be bundled separately using uglifyjs
window.angular = require('angular');
var Def = require('autocomplete-lhc');
require('./angular-packages.js');
require('ngSmoothScroll');
var LForms = require('../lforms.js');
LForms.Def = Def;
LForms._elementResizeDetectorMaker = require("element-resize-detector");
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
require("autocomplete-lhc/source/auto_completion.css");
require("../styles/lforms.css");
require("bootstrap/dist/css/bootstrap.css"); // fonts for datepicker, and a lot of CSS, but old build system did the same
module.exports = LForms;
