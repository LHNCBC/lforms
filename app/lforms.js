angular.module('lformsWidget', [
    'ngRoute',
    "mgcrea.ngStrap",
    'ui.select2'
])
.directive('lformsPanelV', function() {
  return {
    restrict: 'E',
    scope: {
      hideCheckBoxes: '=?'
    },
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'panel-table-v-flat.html'
  };
})
.directive('lformsPanelH', function() {
  return {
    restrict: 'E',
    scope: {
      hideCheckBoxes: '=?'
    },
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'panel-table-h.html'
  };
});
;


