'use strict';

angular.module('lformsWidget')
  .controller('MainCtrl', function ($scope) {

      $scope.totalWatchers = function () {
        var watchers = ($scope.$$watchers) ? $scope.$$watchers.length : 0;
        var child = $scope.$$childHead;
        while (child) {
          watchers += (child.$$watchers) ? child.$$watchers.length : 0;
          child = child.$$nextSibling;
        }
        return watchers;
      };


      // get the total number of ng watchers on the page
      $scope.getTotalWatchers = function () {

        var root = jQuery(document.getElementsByTagName('body'));
        var watchers = 0;

        var f = function (element) {
          if (element.data().hasOwnProperty('$scope')) {
            watchers += (element.data().$scope.$$watchers || []).length;
          }

          angular.forEach(element.children(), function (childElement) {
            f(jQuery(childElement));
          });
        };

        f(root);

        return watchers;
      }
    });
