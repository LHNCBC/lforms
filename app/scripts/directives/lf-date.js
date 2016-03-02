angular.module('lformsWidget')
  .constant('lfDateConfig', {})

  .directive('lfDate', ['lfDateConfig', '$timeout', function (lfDateConfig, $timeout) {
    'use strict';
    var options;
    options = {};
    angular.extend(options, lfDateConfig);
    return {
      require:'?ngModel',
      link:function (scope, element, attrs, controller) {
        var getOptions = function () {
          return angular.extend({}, lfDateConfig, scope.$eval(attrs.lfDate));
        };
        var initDateWidget = function () {
          var showing = false;
          var opts = getOptions();

          // If we have a controller (i.e. ngModelController) then wire it up
          if (controller) {

            // Set the view value in a $apply block when users selects
            // (calling directive user's function too if provided)
            var _onSelect = opts.onSelect || angular.noop;
            opts.onSelect = function (value, picker) {
              showing = true;
              controller.$setViewValue(element.datepicker("getDate"));
              _onSelect(value, picker);
              element.change();
            };
            opts.beforeShow = function() {
              showing = true;
            };
            opts.onClose = function(value, picker) {
              showing = false;
            };
            element.on('change', function() {
              var valid_date = Date.parse(this.value);
              if(valid_date) {
                controller.$setViewValue(valid_date);
                element.datepicker("setDate", valid_date);
              }
              if ( !showing ) {
                scope.$apply(function() {
                  element.datepicker("setDate", element.datepicker("getDate"));
                  controller.$setViewValue(element.datepicker("getDate"));
                });
              }
            });

            // Update the date picker when the model changes
            controller.$render = function () {
              var date = controller.$viewValue;
              if ( angular.isDefined(date) && date !== null && !angular.isDate(date) && typeof(date) !== "string" ) {
                throw new Error('ng-Model value must be a Date object or a string - currently it is a ' + typeof date);
              }
              // convert saved user data into date
              else if (typeof(date) === "string") {
                date = new Date(date);
              }
              element.datepicker("setDate", date);
            };
          }
          // If we don't destroy the old one it doesn't update properly when the config changes
          element.datepicker('destroy');
          // Create the new datepicker widget
          element.datepicker(opts);
          if ( controller ) {
            // Force a render to override whatever is in the input text box
            controller.$render();
          }
        };
        // Run initDateWiget once
        scope.$watch({}, initDateWidget, true);

      }
    };
  }
  ]);
