angular.module('lformsWidget', [])
.directive('lformsPanelV', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'app/scripts/views/panel-table-v.html'
  };
})
.directive('lformsPanelH', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'app/scripts/views/panel-table-h.html'
  };
});
;


