'use strict';

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
              if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
                throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use lf-date-format to convert it from a string');
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
  ])

  .constant('lfDateFormatConfig', '')

  .directive('lfDateFormat', ['lfDateFormatConfig', function(lfDateFormatConfig) {
    var directive = {
      require:'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var dateFormat = attrs.lfDateFormat || lfDateFormatConfig;
        if ( dateFormat ) {
          // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
          modelCtrl.$formatters.push(function(value) {
            if (angular.isString(value) ) {
              return jQuery.datepicker.parseDate(dateFormat, value);
            }
            return null;
          });
          modelCtrl.$parsers.push(function(value){
            if (value) {
              return jQuery.datepicker.formatDate(dateFormat, value);
            }
            return null;
          });
        } else {
          // Default to ISO formatting
          modelCtrl.$formatters.push(function(value) {
            if (angular.isString(value) ) {
              return new Date(value);
            }
            return null;
          });
          modelCtrl.$parsers.push(function(value){
            if (value) {
              return value.toISOString();
            }
            return null;
          });
        }
      }
    };
    return directive;
  }]);
