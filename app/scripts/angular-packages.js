// These would be in index.js, but the imports need to happen after
// window.angular is defined.
var Def = require('autocomplete-lhc');
// Angular-ui-bootstrap gets loaded differently as an npm module than as a
// bower package.  This is a hack to set up the right dependecies for the LForms
// AngularJS module.
import popover from 'angular-ui-bootstrap/src/popover';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
Def._popover = popover;
Def._tooltip = tooltip;
Def._animate = require('angular-animate');
