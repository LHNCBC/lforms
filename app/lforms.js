// Use IIFE so that strict mode is not at the file level
(function() {
  'use strict';
  var widgetDeps = [
    'smoothScroll',
    'autocompleteLhcMod',
    'ui.bootstrap.datetimepicker'];
  if (Def._tooltip)
    widgetDeps = [Def._animate, Def._popover, Def._tooltip, 'ui.bootstrap'].concat(widgetDeps);
  else
    widgetDeps = ['ngAnimate', 'ui.bootstrap'].concat(widgetDeps);
  angular.module('lformsWidget', widgetDeps)
    .config(['$animateProvider', function ($animateProvider) {
      $animateProvider.classNameFilter(/has-ng-animate/);
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
var LForms = {};
module.exports = LForms;
