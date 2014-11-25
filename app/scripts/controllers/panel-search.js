'use strict';

angular.module('lformsWidget')
  .controller('PanelSearchCtrl', function ($scope, $http, selectedFormData) {
    $scope.selectedPanel = [null,null,null, null];
    $scope.pIndex = 0;

    $scope.panelList = [
      {text: 'USSG-FHT, (with mock-up items for skip logic demo)', id: '54127-6N'},
      {text: 'USSG-FHT, (with mock-up items for horizontal layout demo)', id: '54127-6H'}
    ];

    // base config for ui-select2
    $scope.tagOptions = {
      width: "100%",
      maximumSelectionSize:1,
      minimumInputLength: 0,
      minimumResultsForSearch: -1,
      allowClear: false,
      selectOnBlur: false,
      multiple: false
    };

    $scope.panelListOpt = function() {
      var answerList = $scope.panelList

      return jQuery.extend({}, $scope.tagOptions, {
        data:answerList,
        placeholder: "Select from the list"
      });
    };

    $scope.addMoreWidget = function(tabIndex) {

      // get the widget data
      // some selected panels
      if($scope.selectedPanel[tabIndex]) {
        var loinc_num = $scope.selectedPanel[tabIndex].id;
      }
      if (loinc_num) {
        if (loinc_num == '54127-6N') {
          selectedFormData.updateForm(new WidgetData(angular.copy(FHTData)));
        }
        else if (loinc_num == '54127-6H') {
          selectedFormData.updateForm(new WidgetData(angular.copy(horizontalFHTData)));
        }
      }
    };

  });
