'use strict';

angular.module('lformsWidget', [
    "mgcrea.ngStrap",
    'ui.select2',
    'autocompPhr'
])
.directive('lformsPanelV', function() {
  return {
    restrict: 'E',
//    scope: {
//      hideCheckBoxes: '=?'
//    },
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'panel-table-v.html'
  };
})
.directive('lformsPanelH', function() {
  return {
    restrict: 'E',
//    scope: {
//      hideCheckBoxes: '=?'
//    },
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'panel-table-h.html'
  };
});
;


