// Based on https://stackoverflow.com/a/26339919/360782
angular.module('lformsWidget')
  .config(['$provide', function Decorate($provide) {
    var directiveToTemplate = {
      'uibPopoverPopupDirective': "uib-popover-templates/uib-popover.html",
      'uibPopoverTemplatePopupDirective': "uib-popover-templates/uib-popover-template.html"
    };

    var names=Object.keys(directiveToTemplate);
    for (var len=names.length, i=0; i<len; ++i) {
      var directiveName = names[i];
      var template = directiveToTemplate[directiveName];

      $provide.decorator(directiveName, ['$delegate', (function(templatePath) {
        return function($delegate) {
          var directive = $delegate[0];

          directive.templateUrl = templatePath;

          //  For future reference...
          // directive.compile = function() {
          //  return function link() {
          //    // can probably access popover element here
          //  }
          //}

          return $delegate;
        }
      })(template)]);
    }
  }]);
