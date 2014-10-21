'use strict';

angular.module('lformsWidget')
  .controller('PanelSearchCtrl', function ($scope, $http, selectedFormData) {
    $scope.selectedPanel = [null,null,null, null];
    $scope.pIndex = 0;

    $scope.panelList = [
      {text: 'USSG-FHT, (vertical layout)', id: '54127-6N'},
      {text: 'USSG-FHT, (with horizontal table layout)', id: '54127-6H'}

    ];

    $scope.scorePanelList = [
      {text: "Glasgow Coma Score", id: "35088-4"},
      {text: "FLACC Pain Assessment Panel", id: "38213-5"},
      {text: "Braden scale skin assessment panel", id: "38228-3"},
      {text: "PHQ-9 depression survey", id: "44249-1"},
      {text: "Apgar Panel 10M post birth", id: "48332-1"},
      {text: "Apgar Panel 5M post birth", id: "48333-9"},
      {text: "Apgar Panel 1M post birth", id: "48334-7"},
      {text: "GDS.short Panel", id: "48543-3"}
    ];

    $scope.experimentList = [
      {text: 'Panel with tables', id: 'X2'}
    ];

    // base config for ui-select2
    $scope.tagOptions = {
      width: "100%",
      maximumSelectionSize:1,
      minimumInputLength: 0,
      // minimumResultsForSearch: 6,   // -1 will hide the search(input) field
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

    $scope.scorePanelListOpt = function() {
      var answerList = $scope.scorePanelList

      return jQuery.extend({}, $scope.tagOptions, {
        data:answerList,
        placeholder: "Select from the list"
      });
    };


    $scope.experimentListOpt = function() {
      var answerList = $scope.experimentList

      return jQuery.extend({}, $scope.tagOptions, {
        data:answerList,
        placeholder: "Select from the list"
      });
    };

      $scope.panelSearchOpt = function() {
      return jQuery.extend({}, $scope.tagOptions, {
        placeholder: "Type to search",
        minimumInputLength: 1,
        ajax: {
          url: "/get_panel_list",
          dataType: "json",
          data: function(term) {
            return {
              term: term
            };
          },
          results: function (data) {
            return {results: data};
          }
        }
//      initSelection: function(element, callback) {
//        var id=$(element).val();
//        if (id !== "") {
//          jQuery.ajax("/get_panels")
//        }
//      }

      });
    };


    $scope.addMoreWidget = function(tabIndex) {

      var startLoad = new Date().getTime();

      // get the widget data
      // some selected panels
      if($scope.selectedPanel[tabIndex]) {
        var loinc_num = $scope.selectedPanel[tabIndex].id;
      }
      if (loinc_num) {
        if(loinc_num == '74080-3') {
          selectedFormData.updateForm(new WidgetData(angular.copy(AHRQData)));

        }
        else if(loinc_num == '54127-6') {
          selectedFormData.updateForm(new WidgetData(angular.copy(FHTData)));

        }
        else if(loinc_num == '54127-6N') {
          selectedFormData.updateForm(new WidgetData(angular.copy(expectedFHTData)));
        }
        else if(loinc_num == '54127-6H') {
            selectedFormData.updateForm(new WidgetData(angular.copy(horizontalFHTData)));
        }
        // RI sample data
        else if(loinc_num == '74725-3') {
          var newData = WidgetUtil.convertFromEmbeddedToReference(loinc74725);
          selectedFormData.updateForm(new WidgetData(newData));
        }
        else if(loinc_num == '74501-8') {
          var newData = WidgetUtil.convertFromEmbeddedToReference(loinc74501);
          selectedFormData.updateForm(new WidgetData(newData));
        }
        else if(loinc_num == '54127-6RI') {
          var newData = WidgetUtil.convertFromEmbeddedToReference(loinc54127);
          selectedFormData.updateForm(new WidgetData(newData));
        }


        else if (loinc_num !== '') {
          var riFlag = loinc_num.slice(0,4);
          if (riFlag == "RI2-") {
            loinc_num = loinc_num.slice(4);
          }
          $http({
            url: "def?p_num=" + loinc_num,
            method: "GET"
           // data: {"p_num" : loinc_num}
          })
          .success(function(data, status, headers, config) {
             if (riFlag == "RI2-") {
               var newData = WidgetUtil.convertFromEmbeddedToReference(data);
             }
             else {
               var newData = data;
             }
             selectedFormData.updateForm(new WidgetData(newData));
          })
          .error(function(data, status, headers, config) {
             alert('Failed');
          });
        }
      }

      var time = 'in panel-search.js, lfData is retrieved from server side in ' +(new Date().getTime() - startLoad)/1000 +
          ' seconds';
      console.log(time);
    };



    $scope.onclick = function () {
      debugger
      var i=1;
    };




  });
