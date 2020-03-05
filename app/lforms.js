// Use IIFE so that strict mode is not at the file level
(function() {
  'use strict';
  var widgetDeps = [
    'smoothScroll',
    'autocompleteLhcMod',
    'ui.bootstrap.datetimepicker'];
  var Def = require('autocomplete-lhc');
  if (Def._tooltip)
    widgetDeps = [Def._animate, Def._popover, Def._tooltip, 'ui.bootstrap'].concat(widgetDeps);
  else
    widgetDeps = ['ngAnimate', 'ui.bootstrap'].concat(widgetDeps);
  angular.module('lformsWidget', widgetDeps)
    .config(['$animateProvider', '$rootScopeProvider', function ($animateProvider, $rootScopeProvider) {
      $animateProvider.classNameFilter(/has-ng-animate/);
      // AngularJS complains if there are too many levels of nesting in the form
      // (due to directives calling directives....)  Increase the maximum from
      // the default of 10.  When the number of levels is exceeded, the form
      // still renders, but error messages appear in the console, and it is
      // probably not properly initialized.
      $rootScopeProvider.digestTtl(20);
    }])
    .directive('lforms', function() {
      return {
        restrict: 'E',
        scope: {
          lfData: '=',
          // set a variable 'item' for 'lfData'
          // 'item' is used by some internal recursive directives
          item: '=lfData',
          lfOptions: '=?'},
        link: function(scope, element, attributes) {
          // watch on data change
          scope.$watch("lfOptions", function (value){
            if (scope.lfData && value)
              scope.lfData.setTemplateOptions(value);
          }, true);
          // watch on variable change
          scope.$watch("lfOptions", function (value){
            if (scope.lfData && value)
              scope.lfData.setTemplateOptions(value);
          });
        },
        transclude: true,
        controller: 'LFormsCtrl',
        templateUrl: 'form-view.html'
      };
    });
})();

// Define the top-level namespace object
var LForms = Object.assign({}, require('./version'));
module.exports = LForms;
