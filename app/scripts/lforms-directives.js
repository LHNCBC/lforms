(function() {
  'use strict';
  angular.module('lformsWidget')
      .factory('RecursionHelper', ['$compile', function($compile){
        return {
          /**
           * From: http://stackoverflow.com/questions/14430655/recursion-in-angular-directives
           * Manually compiles the element, fixing the recursion loop.
           * @param element
           * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
           * @returns An object containing the linking functions.
           */
          compile: function(element, link){
            // Normalize the link parameter
            if(angular.isFunction(link)){
              link = { post: link };
            }
            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
              pre: (link && link.pre) ? link.pre : null,
              /**
               * Compiles and re-adds the contents
               */
              post: function(scope, element){
                // Compile the contents
                if(!compiledContents){
                  compiledContents = $compile(contents);
                }
                // Re-add the compiled contents to the element
                compiledContents(scope, function(clone){
                  element.append(clone);
                });
                // Call the post-linking function, if any
                if(link && link.post){
                  link.post.apply(null, arguments);
                }
              }
            };
          }
        };
      }])
      // each item
      .directive('lfItem', ["RecursionHelper", function (RecursionHelper) {
        return {
          restrict: "E",
          // use inherited scope for now
          //scope: {
          //  item: '=',
          //  targetShown: '&',
          //  getRowClass: '&',
          //  getSkipLogicClass: '&',
          //  getActiveRowClass: '&',
          //  hasOneRepeatingItem: '&',
          //  addOneRepeatingItem: '&',
          //  removeOneRepeatingItem: '&',
          //  hideUnusedItemWarning: '&',
          //  setActiveRow: '&',
          //  checkUnits: '&',
          //  autoExpand: '&',
          //  getTrustedCodingInstructions: '&'
          //},
          templateUrl: "item.html",
          compile: function (element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element);
          }
        }
      }])
      // date field
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
      ])
      // CWE field
      .directive('lfCwe', function() {
        return {
          restrict: 'E',
          scope: {
            item: '=',
            toggleCheckbox: '&'},
          transclude: true,
          templateUrl: 'cwe-field.html'
        };
      })
      // CNE field
      .directive('lfCne', function() {
        return {
          restrict: 'E',
          scope: {
            item: '=',
            toggleCheckbox: '&'},
          transclude: true,
          templateUrl: 'cne-field.html'
        };
      })
      // field validation, TBD
      .directive('lfValidation', function() {
        return {
          restrict: 'E',
          scope: {
            item: '='
            },
          transclude: false,
          templateUrl: 'validation.html'
        };
      });

})();
