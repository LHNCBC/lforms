'use strict';

angular.module('lformsWidget')

  .constant('phrAutocompleteConfig', {})

  .directive('phrAutocomplete', ['phrAutocompleteConfig', '$timeout', function (phrAutocompleteConfig, $timeout) {
    'use strict';
    var options;
    options = {};
    angular.extend(options, phrAutocompleteConfig);
    return {
      require:'?ngModel',
      link:function (scope, element, attrs, controller) {
        var getOptions = function () {
          return angular.extend({}, phrAutocompleteConfig, scope.$eval(attrs.phrAutocomplete));
        };

        var initWidget = function () {
          var opts = getOptions();

          // If we have a controller (i.e. ngModelController) then wire it up
          if (controller) {
            var itemText = [];
            var itemTextToItem = {};
            var itemLabel;
            for (var i=0, len=opts.source.length; i<len; ++i) {
              var item = opts.source[i];
              itemLabel = item.label;
              itemText[i] = itemLabel;
              itemTextToItem[itemLabel] = item;
            }
            var phrAutoOpts = {matchListValue: !opts.allowFreeText}

            // Set the default value, if there is one
            var defaultIndex = -1;
            if (opts.selectFirst)
              defaultIndex = 0;
            else if (opts.preSelected !== undefined)
              defaultIndex = opts.preSelected;
            if (defaultIndex >= 0) {
              itemLabel = itemText[defaultIndex];
              phrAutoOpts.defaultValue = itemLabel;
              element.val(itemLabel);
              controller.$setViewValue(itemTextToItem[itemLabel]);
            }

            var pElem = element[0];
            // The autocompleter uses the ID attribute of the element. If pElem
            // does not have an ID, give it one.
            if (pElem.id === '') {
              if (pElem.name === '') {
                // In this case just make up an ID.
                if (!Def.Autocompleter.lastGeneratedID_)
                  Def.Autocompleter.lastGeneratedID_ = 0;
                pElem.id = ++Def.Autocompleter.lastGeneratedID_;
              }
              else {
                // Use the name attribute.  This might not be unique, so we need
                // to check.
                var id = pElem.name, ctr = 0;
                while ($(id)) {
                  ctr += 1;
                  id = pElem.name + ctr;
                }
                pElem.id = id;
              }
            }

            new Def.Autocompleter.Prefetch(pElem.id, itemText, phrAutoOpts);
            Def.Autocompleter.Event.observeListSelections(pElem.name, function(eventData) {
              scope.$apply(function() {
                var finalVal = eventData.final_val;
                var item = itemTextToItem[finalVal] ||
                  {value: finalVal, id: finalVal, label: finalVal};
                controller.$setViewValue(item);
              });
            });
          }
        }; // if controller
        // Run initWiget once after the name attribute has been filled in
        scope.$watch({}, initWidget, true); // i.e. run once
      }
    };
  }]
  );
