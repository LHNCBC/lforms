// Use IIFE so that strict mode is not at the file level
(function() {
  'use strict';
  angular.module('lformsWidget', [
    'ngAnimate',
    'ui.bootstrap',
    'smoothScroll',
    'autocompleteLhcMod'
    ])
    .config(function ($animateProvider) {
      $animateProvider.classNameFilter(/has-ng-animate/);
    })
    .directive('lforms', function() {
      return {
        restrict: 'E',
        scope: {lfData: '=', item: "=lfData", lfOptions: '=?'},
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
            // set a variable 'item' for 'lfData'
            // 'item' is used by some internal recursive directives
            scope.item = scope.lfData;
          });
        },
        transclude: true,
        controller: 'LFormsCtrl',
        templateUrl: 'form-view.html'
      };
    })
})();
