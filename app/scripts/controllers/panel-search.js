'use strict';

angular.module('lformsWidget')
  .controller('PanelSearchCtrl', function ($scope, $http, selectedFormData) {
    $scope.selectedPanel = [null,null,null, null];
    $scope.pIndex = 0;

    $scope.panelList = [
      {text: 'USSG-FHT, (with mock-up items for skip logic demo)', id: '54127-6N'},
      {text: 'USSG-FHT, (with mock-up items for horizontal layout demo)', id: '54127-6H'},
      {text: 'Glasgow Coma Score (with score rules)', id: '35088-4B'},
      {text: 'Glasgow Coma Score (with score rules)--RI', id: '35088-4'},
      {text: 'Full-Featured Demo', id: 'all-in-one'},
      {text: 'Form Builder created test form', id: 'formC'},
      {text: 'Minimum Data Set - version 3.0', id: '54580-6NEW'},
      {text: 'Form With User Data', id: 'form-with-user-data'}
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
      if($scope.selectedPanel[tabIndex] && $scope.selectedPanel[tabIndex].id) {
        var loincNum = $scope.selectedPanel[tabIndex].id;

        if (loincNum == '54127-6N') {
          selectedFormData.updateForm(new LFormsData(angular.copy(FHTData)));
        }
        else if (loincNum == '54127-6H') {
          selectedFormData.updateForm(new LFormsData(angular.copy(horizontalFHTData)));
        }
        else if (loincNum == '54580-6NEW') {
          selectedFormData.updateForm(new LFormsData(angular.copy(MDS3)));
        }
        else if (loincNum == '35088-4B') {
          selectedFormData.updateForm(new LFormsData(angular.copy(glasgow)));
        }
        else if (loincNum == '35088-4') {
          var newData = angular.copy(glasgowRI);
          WidgetUtil.preprocessRIData(newData.items);
          selectedFormData.updateForm(new LFormsData(newData));
        }
        else if (loincNum == 'all-in-one') {
          selectedFormData.updateForm(new LFormsData(angular.copy(allInOne)));
        }
        else if (loincNum == 'formC') {
          selectedFormData.updateForm(new LFormsData(angular.copy(formBuilder)));
        }
        else if (loincNum == 'form-with-user-data') {
          selectedFormData.updateForm(new LFormsData(angular.copy(formWithUserData)));
        }
      }
    };

  });
