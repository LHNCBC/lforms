'use strict';

angular.module('lformsWidget')

  .constant('lfAutocompleteConfig', {})

  .directive('lfAutocomplete', ['lfAutocompleteConfig', '$timeout', function (lfAutocompleteConfig, $timeout) {
    'use strict';
    var options;
    options = {};
    angular.extend(options, lfAutocompleteConfig);
    return {
      require:'?ngModel',
      link:function (scope, element, attrs, controller) {
        var getOptions = function () {
          return angular.extend({}, lfAutocompleteConfig, scope.$eval(attrs.lfAutocomplete));
        };

        // display the list on focus event
        element.on('focus', function() {
          var opts = getOptions();
          if (opts.openOnFocus) {
            // without '' it uses current input's value to search from the list
            // with '' it display all items
            element.autocomplete('search','');
          }
        });
        // display the list on click event too
        element.on('click', function() {
          var opts = getOptions();
          if (opts.openOnFocus) {
            // without '' it uses current input's value to search from the list
            // with '' it display all items
            element.autocomplete('search','');
          }
        });

        var initWidget = function () {
          var opts = getOptions();

          // overwrite minLength to 0 if openOnFocus
          if (opts.openOnFocus) opts.minLength = 0;

          // If we have a controller (i.e. ngModelController) then wire it up
          if (controller) {

            // Set the view value in a $apply block when users selects
            // (calling directive user's function too if provided)
            var _select = opts.select || angular.noop;
            opts.select = function (event, ui) {
              scope.$apply(function() {
                controller.$setViewValue(ui.item);
                _select(event, ui);
              });
            };
            // support selectFirst and preSelected
            var _create = opts.create || angular.noop
            opts.create = function (event, ui) {
              _create(event, ui);
              if (opts.selectFirst) {
                element.val(opts.source[0].value)       // set the field value to the first unit's label
                //element.trigger("autocompleteselect")   // trigger the select event of the autocomplete, not needed if the angular is updated
                controller.$setViewValue(opts.source[0]); // update the data model in angular  (unit)
              } else if (opts.preSelected !== undefined && opts.preSelected >= 0 && opts.preSelected < opts.source.length) {
                element.val(opts.source[opts.preSelected].value)       // set the field value to the first unit's label
                //element.trigger("autocompleteselect")   // trigger the select event of the autocomplete, not needed if the angular is updated
                controller.$setViewValue(opts.source[opts.preSelected]); // update the data model in angular  (unit)
              }
            };
            // support allowFreeText
            var _change = opts.change || angular.noop;
            opts.change = function (event, ui) {
              scope.$apply(function() {
                var userTypedValue = element.val();
                if ( ui.item === null && userTypedValue !== '') {
                  if (opts.allowFreeText) {
                    // we use {value, id, label} object for selected item
                    ui.item = {value: userTypedValue, id: userTypedValue, label: userTypedValue}
                  }
                  else {
                    element.val('');
                  }
                }
                controller.$setViewValue(ui.item);
                _change(event, ui);
              });
            };
          }
          // Create the new autocomplete widget
          element.autocomplete(opts);
        };
        // Run initWiget once
        scope.$watch({}, initWidget, true);
      }
    };
  }]
  );
