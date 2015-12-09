'use strict';

angular.module('lformsWidgetDev')
  .service('lfFormDataService', function($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = { lfData : null };

    // Public API here
    return {
      getFormData : function () {
        return data.lfData;
      },

      setFormData : function (formData) {
        data.lfData = formData;
        $rootScope.$broadcast('LF_NEW_DATA');
      }
    };
  });
