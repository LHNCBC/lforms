(function() {
  'use strict';
  var LForms = require('../lforms');
//  var angular = require('angular');
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
      .directive('lfItem', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'item.html'
        };
      })
      // each item in table template, use inherited scope
      .directive('lfTableItem', ["RecursionHelper", function (RecursionHelper) {
        return {
          restrict: "E",
          templateUrl: "table-item.html",
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
                  element.click(); // without this, the UIB datetime picker does not close (if it were open)
                  showing = true;
                };
                opts.onClose = function(value, picker) {
                  showing = false;
                };
                element.on('change', function() {
                  var valid_date = LForms.Util.stringToDate(this.value);
                  if(valid_date) {
                    controller.$setViewValue(valid_date);
                    element.datepicker("setDate", valid_date);
                    if ( !showing ) {
                      scope.$apply(function() {
                        element.datepicker("setDate", element.datepicker("getDate"));
                        controller.$setViewValue(element.datepicker("getDate"));
                      });
                    }
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
                    date = LForms.Util.stringToDate(date, true);
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
      .directive('lfRepeatingButton', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'repeating-button.html'
        };
      })
      .directive('lfFormControls', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'form-controls.html'
        };
      })
      .directive('lfFormTitle', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'form-title.html'
        };
      })
      .directive('lfFormOptions', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'form-options.html'
        };
      })
      .directive('lfItemOptions', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'item-options.html'
        };
      })
      .directive('lfFormHeader', function() {
        return {
          restrict: 'E',
          transclude: true,
          templateUrl: 'form-header.html'
        };
      })
      .directive('lfAttachment', ['$timeout', function ($timeout) {
        // Thanks to https://github.com/mistralworks/ng-file-model/blob/master/ng-file-model.js
        // and https://embed.plnkr.co/plunk/7BBYAa
        return {
          restrict: 'E',
          templateUrl: 'attachment.html',
          scope: {
            item: "=",
            labelledBy: "=",
          },
          controller: ['$scope', function ($scope) {

            /**
             *  Creates an attachment for an item based on the data entered by the
             *  user.
             */
            $scope.removeAttachment = function(item) {
              delete item.value;
              delete item._attachmentName;
              delete item._attachmentURL;
              delete item._fileInfo;
              delete item._useURL;
            },


            /**
             *  Creates an attachment for an item based on the data entered by the
             *  user.
             */
            $scope.createAttachment = function(item) {
              if (!item._fileInfo && !item._attachmentURL) {
                alert("An attachment must have either a file or a URL (or both).");
              }
              else {
                item.value = {title: item._attachmentName || item._fileInfo?.name};
                var value = item.value;
                if (item._attachmentURL)
                  value.url = item._attachmentURL;
                if (item._fileInfo) { // attach the data too
                  var fileInfo = item._fileInfo
                  value.contentType = fileInfo.type
                  if (fileInfo.lastModified)
                    value.creation = new Date(fileInfo.lastModified).toISOString();
                  else if (fileInfo.lastModifiedDate) // IE 11
                    value.creation = fileInfo.lastModifiedDate.toISOString();
                  item.value._progress = 0.001; // 0.1% of loading; non-zero to trigger display
                  var reader = new FileReader();
                  reader.onload = function (loadEvent) {
                    var data = loadEvent.target.result;
                    var commaIndex = data.indexOf(',');
                    if (data.indexOf('data:')!=0 || commaIndex<0) {
                      throw new Error('data URL did not start with expected prefix, but with '+
                         data.slice(0, 30));
                      alert('Unable to attach the file data.');
                    }
                    $scope.$apply(function () {
                      delete value._progress;
                      value.data = data.slice(commaIndex+1);
                    });
                  };
                  reader.onprogress = function(progressEvent) {
                    $scope.$apply(function() {
                      item._progress =
                        progressEvent.loaded/progressEvent.total;
                    });
                  };
                  reader.readAsDataURL(fileInfo);
                }
              }
            },


            /**
             *  Downloads the item's Attachment.
             * @param attachment the FHIR Attachment.
             * @param event the click event object
             * @return a "data:" URL (base 64)
             */
            $scope.downloadAttachment = function(attachment, event) {
              //var a = document.createElement('a');
              if (attachment.data) {
                var a = event.target; //document.createElement('a');
                var originalHref = a.href
                a.href= 'data:'+(attachment.contentType ? attachment.contentType : '') +';base64,'+attachment.data;
                a.download = attachment.title;
                $timeout(function() {
                  a.href = originalHref;
                });
              }
            };
          }],
          link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
              if (changeEvent.target.files) {
                var newFile = changeEvent.target.files[0];
                var item = scope.item;
                if (!newFile.type) {
                  // Per the FHIR specification, we can't proceed without a mime
                  // type.
                  alert('Unknown file type.  Please ensure the file has an '+
                    'appropriate extension');
                  newFile = null; // don't proceed
                }
                else if (item.allowedAttachmentTypes &&
                         item.allowedAttachmentTypes.indexOf(newFile.type)<0) {
                  let types = item.allowedAttachmentTypes;
                  alert('The file '+newFile.name+' is not one of the mime types '+
                    'permitted by this questionnaire ('+types.slice(0,-1).join(', ')+
                    ' and ' +types.slice(-1)+').  Please make sure your file has '+
                    'an appropriate file extension for its type in its filename.');
                  newFile = null; // don't proceed
                }
                else if (newFile.size > item.maxAttachmentSize) {
                  var msg = 'The file '+newFile.name+' exceeds the maximum '+
                    'attachment size of '+item.maxAttachmentSize+' bytes permitted by '+
                    'this questionnaire.  If you can specify the file with a URL, '+
                    'use the button to open the URL field and enter that instead.';
                  alert(msg);
                  newFile = null; // don't proceed
                }
                else if (newFile.size > 500000000) {
                  var msg = 'Adding a large file as an attachment might cause your '+
                    'computer to run low on memory.  There is a button to enter a '+
                    'URL instead of attaching the file data.  Are you sure you want '+
                    'to attach the file data?';
                  if (!confirm(msg))
                    newFile = null; // don't proceed
                }
                if (!newFile)
                  element[0].getElementsByTagName('input')[0].value = null; // clear the field
                item._fileInfo = newFile;
                if (newFile && !item._useURL) {
                  scope.$apply(function () {
                    scope.createAttachment(item); // see & binding above
                  });
                }
                // else Wait for the "create attachment" click
              }
            });
          }
        }
      }])
      .directive('lfValidate', function () {
        return {
          require: 'ngModel',
          restrict: 'A',
          scope: {
            itemData: '=lfValidate'
          },
          //transclude: true,
          template: '<div ng-repeat="error in itemData._validationErrors">' +
              '<div class="validation-error">"{{itemData.question}}" {{error}}</div>' +
              '</div>',

          link: function(scope, elem, attr, ctrl) {

            /**
             * Validate model data on an item
             * @param item an item in the form
             * @param value the user input data
             * @param ctrl the directive control
             */
            function validate(item, value, ctrl) {
              item._validationErrors = [];
              var valid1 = LForms.Validations.checkDataType(item.dataType,
                  value, item._validationErrors);
              ctrl.$setValidity('lf-datatype', valid1);
              var valid2 = LForms.Validations.checkRestrictions(item.restrictions,
                  value, item._validationErrors);
              ctrl.$setValidity('lf-restrictions', valid2);
              var valid3 = LForms.Validations.checkRequired(item._answerRequired,
                  value, item._validationErrors);
              ctrl.$setValidity('lf-required', valid3);

              for (var i=0, len=item._validationErrors.length; i<len; ++i)
                scope.$parent.sendMsgToScreenReader('"'+item._text+'"'+item._validationErrors[i]);

              return valid1 && valid2 && valid3
            };

            //For DOM -> model validation
            ctrl.$parsers.unshift(function(value) {
              if (value !==undefined) {
                scope.itemData._validationErrors = [];
                var valid = validate(scope.itemData, value, ctrl);
                return valid? value : undefined;
              }
            });

            //For model -> DOM validation
            // In the current use, lf-validate is applied to a separate non-input element, the validation always
            // happens when the model data changes, i.e. in this function.
            ctrl.$formatters.unshift(function(value) {
              if (value !==undefined) {
                scope.itemData._validationErrors = [];
                validate(scope.itemData, value, ctrl);
                return value;
              }
            });
          }
        };
      })
  ;
})();
