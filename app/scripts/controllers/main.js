'use strict';

angular.module('lformsWidget')
  .controller('MainCtrl', function ($scope, $http, selectedFormData) {

      /**
       * Return the included template name in 'ng-include'
       * @returns {string}
       */
      $scope.getTemplateUrl = function () {

        return $scope.selectedTemplate;

      };

      $scope.$on('$viewContentLoaded', function () {
              console.log("in main.js, template compiled");
      });
      $scope.$on('$includeContentLoaded', function () {
              console.log("in main.js, includeContentLoaded");
      });


      /**
       * Update the form with data when the template included in 'ng-include'
       * is loaded. It happens after the template name is reset.
       * This function name appears in 'onload' attribute of 'ng-include'.
       *
       */
      $scope.updateFormData = function () {
        //      console.log("in main.js, updateFormData")
        selectedFormData.updateFormData();
      };

      /**
       * Reset the template name included in 'ng-include'
       * by listening on a broadcast event
       */
      $scope.$on('NewTemplate', function (event, panelData) {
        // clean up the initial message
        $scope.initialLoad = false;

        if (!panelData) {
          $scope.selectedTemplate = "partials/loading";
        }
        else if (!panelData.template) {
          $scope.selectedTemplate = "views/partials/panel-table-v.html";
        }
        else {
          switch (panelData.template) {
            case "panelTableV":
              $scope.selectedTemplate = "views/partials/panel-table-v.html";
              break;
            case "panelTableH":
              $scope.selectedTemplate = "views/partials/panel-table-h.html";
              break;
            case "panelTable":
              $scope.selectedTemplate = "views/partials/panel-table-v.html";
              break;
            default:
              $scope.selectedTemplate = "views/partials/panel-table-v.html";
          }
        }

        selectedFormData.updateFormData();

      });

      $scope.totalWatchers = function () {
        var watchers = ($scope.$$watchers) ? $scope.$$watchers.length : 0;
        var child = $scope.$$childHead;
        while (child) {
          watchers += (child.$$watchers) ? child.$$watchers.length : 0;
          child = child.$$nextSibling;
        }
        return watchers;
      }


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


/**
 * On IE 9, the window.console is undefined unless dev tools are open. This can cause the program
 * crashing when making function calls like console.log etc. The following code is used to prevent
 * the crashing. For details, see the web link listed belw:
 * http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer.
 **/
(function() {
  if (!window.console) {
    window.console = {};
    // union of Chrome, FF, IE, and Safari console methods
    var m = [ "log", "info", "warn", "error", "debug", "trace", "dir", "group",
      "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
      "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
    // define undefined methods as noops to prevent errors
    for (var i = 0; i < m.length; i++) {
      if (!window.console[m[i]])
        window.console[m[i]] = function () {
        };
    }
  }
 })();
