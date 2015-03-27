'use strict';

angular.module('lformsWidget', [
    "mgcrea.ngStrap",
    'ui.select2',
    'autocompPhr'
])
.constant('LF_CONSTANTS', {
  BLANK_GIF_DATAURL: "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw=="
})

.directive('lformsPanelV', function() {
  return {
    restrict: 'E',
    link: linkFunction,
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'panel-table-v.html'
  };
})
.directive('lformsPanelH', function() {
  return {
    restrict: 'E',
    link: linkFunction,
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'panel-table-h.html'
  };
});

/**
 * Add element attributes to the scope.
 * 
 * @param {Object} scope
 * @param {Object} element 
 * @param {Object} attributes 
 * @returns {void}
 */
function linkFunction(scope, element, attributes) {
  scope.hideCheckBoxes = attributes['hideCheckBoxes'];
}

