'use strict';

angular.module('lformsWidget', [
    "mgcrea.ngStrap",
    'smoothScroll',
    'autocompleteLhcMod'
])
.directive('lforms', function() {
  return {
    restrict: 'E',
//    scope: {lfData: '=', templateOption: '=lfOption'},
    scope: {lfData: '='},
    link: linkFunction,
    transclude: false,
    controller: 'LFormsCtrl',
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

  //var options = attributes['lfOption'];
  //if (options && angular.isObject(options)) {
  //  scope.lfData.setTemplateOptions(options);
  //}


  //scope.hideHeader = attributes['hideHeader'] === 'true' ? true : false ;
  //scope.hideCheckBoxes = attributes['hideCheckBoxes'] === 'true' ? true : false;
  //if (scope.lfOption === undefined) {
  //  scope.lfOption = {
  //    showQuestionCode: true,   // whether question code is displayed next to the question
  //    showCodingInstruction: false, // whether to show coding instruction inline. (false: inline; true: in popup)
  //    tabOnInputFieldsOnly: false, // whether to control TAB keys to stop on the input fields only (not buttons, or even units fields).
  //    hideHeader: false, // whether to hide the header section on top of the form
  //    hideCheckBoxes: false, // whether to hide checkboxes in the header section on top of the form
  //    hideFormInfoQuestions: false // whether to show additional questions about the form
  //  };
  //}
}

