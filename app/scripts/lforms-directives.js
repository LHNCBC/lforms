(function() {
  'use strict';
  var INTEGER_REGEXP = /^\-?\d+$/;
  var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
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
      // each item, use inherited scope
      .directive('lfListItem', ["RecursionHelper", function (RecursionHelper) {
        return {
          restrict: "E",
          templateUrl: "list-item.html",
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
      // answers field, (CNE and CWE) (search field?), inherited scope
      .directive('lfAnswers', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'field-answers.html'
        };
      })
      // units field, isolated scope?
      .directive('lfUnits', function() {
        return {
          restrict: 'E',
          scope: {
            item: '='},
          transclude: true,
          templateUrl: 'field-units.html'
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
      })
      // horizontal layout, inherited scope
      .directive('lfSectionHorizontal', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'layout-horizontal.html'
        };
      })
      // matrix layout, inherited scope
      .directive('lfSectionMatrix', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'layout-matrix.html'
        };
      })
      .directive('ensureUnique', ['$http', function($http) {
        return {
          require: 'ngModel',
          link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
              $http({
                method: 'POST',
                url: '/api/check/' + attrs.ensureUnique,
                data: {'field': attrs.ensureUnique}
              }).success(function(data, status, headers, cfg) {
                c.$setValidity('unique', data.isUnique);
              }).error(function(data, status, headers, cfg) {
                c.$setValidity('unique', false);
              });
            });
          }
        }
      }])
      .directive('integer', function() {
        return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
              if (INTEGER_REGEXP.test(viewValue)) {
                // it is valid
                ctrl.$setValidity('integer', true);
                return viewValue;
              } else {
                // it is invalid, return undefined (no model update)
                ctrl.$setValidity('integer', false);
                return undefined;
              }
            });
          }
        };
      })
      .directive('smartFloat', function() {
        return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
              if (FLOAT_REGEXP.test(viewValue)) {
                ctrl.$setValidity('float', true);
                return parseFloat(viewValue.replace(',', '.'));
              } else {
                ctrl.$setValidity('float', false);
                return undefined;
              }
            });
          }
        };
      })
      .directive('contenteditable', function() {
        return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.on('blur', function() {
              scope.$apply(function() {
                ctrl.$setViewValue(elm.html());
              });
            });

            // model -> view
            ctrl.$render = function() {
              elm.html(ctrl.$viewValue);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());
          }
        };
      })
      // more standard process
      .directive('blacklist', function (){
        return {
          require: 'ngModel',
          link: function(scope, elem, attr, ngModel) {
            var blacklist = attr.blacklist.split(',');

            function validate(value) {
              var valid = blacklist.indexOf(value) === -1;
              ngModel.$setValidity('blacklist', valid);
              return valid ? value : undefined;
            }

            //For DOM -> model validation
            ngModel.$parsers.unshift(function(value) {
              var valid = blacklist.indexOf(value) === -1;
              ngModel.$setValidity('blacklist', valid);
              return valid ? value : undefined;
            });

            //For model -> DOM validation
            ngModel.$formatters.unshift(function(value) {
              ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
              return value;
            });
          }
        };
      })
      // check data-type
      .directive('checkDataType', function (){
        return {
          require: 'ngModel',
          link: function(scope, elem, attr, ngModel) {
            var dataType = attr.lfDataType;
            //console.log(attr)

            function validate(value) {
              var valid = checkDataType(dataType, value);
              ngModel.$setValidity('data-type', valid);
              return valid ? value : undefined;
            }

            //For DOM -> model validation
            ngModel.$parsers.unshift(function(value) {
              var valid = checkDataType(dataType, value);
              ngModel.$setValidity('data-type', valid);
              return valid ? value : undefined;
            });

            //For model -> DOM validation
            ngModel.$formatters.unshift(function(value) {
              var valid = checkDataType(dataType, value);
              ngModel.$setValidity('data-type', valid);
              return value;
            });
          }
        };
      })

      .directive('regexValidate', function() {
        return {
          // restrict to an attribute type.
          restrict: 'A',

          // element must have ng-model attribute.
          require: 'ngModel',

          // scope = the parent scope
          // elem = the element the directive is on
          // attr = a dictionary of attributes on the element
          // ctrl = the controller for ngModel.
          link: function(scope, elem, attr, ctrl) {

            //get the regex flags from the regex-validate-flags="" attribute (optional)
            var flags = attr.regexValidateFlags || '';

            // create the regex obj.
            var regex = new RegExp(attr.regexValidate, flags);

            // add a parser that will process each time the value is
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function(value) {
              // test and set the validity after update.
              var valid = regex.test(value);
              ctrl.$setValidity('regexValidate', valid);

              // if it's valid, return the value to the model,
              // otherwise return undefined.
              return valid ? value : undefined;
            });

            // add a formatter that will process each time the value
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function(value) {
              // validate.
              ctrl.$setValidity('regexValidate', regex.test(value));

              // return the value or nothing will be written to the DOM.
              return value;
            });
          }
        };
      })
      .directive('lfValidate', function () {
        return {
          require: 'ngModel',
          restrict: 'A',
          scope: {
            itemData: '=lfValidate'
          },
          transclude: true,
          templateUrl: 'vali      dation-errors.html',
        //  template:
        //    <ng-transclude></ng-transclude>
        //    <div
        //uib-popover='Please enter info in the blank "{{ itemData.question }}".'
        //popover-placement="top-left" popover-title="Warning"
        //popover-trigger="none"
        //popover-is-open="invalid">Error</div>

          link: function(scope, elem, attr, ctrl) {

            scope.errors = [];
            var dataType = scope.itemData.dataType;
            var restrictions = scope.itemData.restrictions;

            //For DOM -> model validation
            ctrl.$parsers.unshift(function(value) {
              scope.errors = [];
              var valid1 = checkDataType(dataType, value, scope.errors);
              ctrl.$setValidity('data-type', valid1);
              var valid2 = checkRestrictions(restrictions, value, scope.errors);
              ctrl.$setValidity('restrictions', valid2);
              scope.invalid = valid1 && valid2;
              return valid1 && valid2 ? value : undefined;
            });

            //For model -> DOM validation
            ctrl.$formatters.unshift(function(value) {
              scope.errors = [];
              var valid1 = checkDataType(dataType, value, scope.errors);
              ctrl.$setValidity('data-type', valid1);
              var valid2 = checkRestrictions(restrictions, value, scope.errors);
              ctrl.$setValidity('restrictions', valid2);
              scope.invalid = valid1 && valid2;
              return value;
            });
          }
        };
      })
  ;

})();
