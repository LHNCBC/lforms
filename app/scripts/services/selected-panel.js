'use strict';

angular.module('lformsWidget')
  .service('selectedFormData', function($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var selected = { lfData : null };

    // Public API here
    return {
      getFormData : function () {
        return selected.lfData;
      },

      updateForm: function(formData) {
        this.setFormData(formData);
        this.updateTemplate();
      },

      setFormData : function (formData) {
        selected.lfData = formData;
      },

      updateTemplate: function() {
        $rootScope.$broadcast('NewTemplate', selected.lfData)

      },

      updateFormData: function() {
        $rootScope.$broadcast('NewFormData', selected.lfData)

      }


    };
  });
