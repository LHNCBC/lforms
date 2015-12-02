'use strict';

angular.module('lformsWidget', [
    "mgcrea.ngStrap",
    'smoothScroll',
    'autocompleteLhcMod',
    'lfConstants'
])
.directive('lforms', function() {
  return {
    restrict: 'E',
    scope: {lfData: '=', lfOpt: '='},
    link: linkFunction,
    transclude: false,
    controller: 'PanelTableCtrl',
    templateUrl: 'form-view.html'
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
  scope.hideHeader = attributes['hideHeader'] === 'true' ? true : false ;
  scope.hideCheckBoxes = attributes['hideCheckBoxes'] === 'true' ? true : false;
}

