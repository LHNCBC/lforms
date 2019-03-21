// This is the entry point for building the browser-ready version.
window.jQuery = require('jquery');
require('jquery-ui/ui/widgets/datepicker.js');
require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/datepicker.css');
require("../../start-theme/theme.css");
//require('jquery-ui/themes/base/theme.css'); // default theme
//require('./jquery-imports');
// jQuery will be bundled separately using uglifyjs
window.angular = require('angular');
require('./angular-packages.js');
require('ngSmoothScroll');
var LForms = require('./lforms-index.js');
LForms.Def = require('autocomplete-lhc');
// CSS
require("autocomplete-lhc/source/auto_completion.css");
require("../styles/lforms.css");
require("bootstrap/dist/css/bootstrap.css"); // fonts for datepicker, and a lot of CSS, but old build system did the same
module.exports = LForms;
