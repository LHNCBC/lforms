'use strict';

angular.module('lformsWidget', [
    "ui.bootstrap",
    'smoothScroll',
    'autocompleteLhcMod'
])
.directive('lforms', function() {
  return {
    restrict: 'E',
    scope: {lfData: '=', lfOptions: '=?'},
    link: function(scope, elment, attributes) {
      scope.$watch("lfOptions", function (value){
        if (value)
          scope.lfData.setTemplateOptions(value);
      }, true);
    },
    transclude: true,
    controller: 'LFormsCtrl',
    templateUrl: 'form-view.html'
  };
});