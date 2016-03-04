'use strict';

angular.module('lformsWidget', [
    'ngAnimate',
    'ui.bootstrap',
    'smoothScroll',
    'autocompleteLhcMod'
    //'ngSanitize'
    ])
    .config(function ($animateProvider) {
      $animateProvider.classNameFilter(/has-ng-animate/);
    })
    .directive('lforms', function() {
      return {
        restrict: 'E',
        scope: {lfData: '=', lfOptions: '=?'},
        link: function(scope, element, attributes) {
          scope.$watch("lfOptions", function (value){
            if (scope.lfData && value)
              scope.lfData.setTemplateOptions(value);
          }, true);
        },
        transclude: true,
        controller: 'LFormsCtrl',
        templateUrl: 'form-view.html'
      };
    });
