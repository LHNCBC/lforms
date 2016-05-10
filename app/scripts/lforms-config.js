
angular.module('lformsWidget')
    .service('lformsConfig', ['$animate', function($animate) {
      'use strict';
      return {
        'enableAnimate': function() {
          $animate.enabled(true);
        },
        'disableAnimate': function() {
          $animate.enabled(false);
        }
      };
    }]);
