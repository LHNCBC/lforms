// This is the entry point for building the browser-ready version.
require('es6-promise').polyfill();
window.$ = window.jQuery = require('jquery');
require('jquery-ui/ui/widgets/datepicker.js');
require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/datepicker.css');
require("../styles/redmond-theme/theme.css");
require('angular-ui-bootstrap/dist/ui-bootstrap-csp.css');
window.angular = require('angular');
require('./angular-packages.js');
require('ngSmoothScroll');
require('angular-ui-bootstrap');
require('bootstrap-ui-datetime-picker');
var LForms = require('./lforms-index.js');
LForms.Def = require('autocomplete-lhc');
LForms.ucumPkg = require('@lhncbc/ucum-lhc');
// CSS
require("autocomplete-lhc/source/auto_completion.css");
require("../styles/lforms.css");
require("bootstrap/dist/css/bootstrap.css"); // fonts for datepicker, and a lot of CSS, but old build system did the same
module.exports = LForms;
