'use strict';

angular.module('lformsWidget')
    .service('lformsService', function($animate) {
      // Public API here
      return {
        'enableAnimate': function() {
          $animate.enabled(true);
        },
        'disableAnimate': function() {
          $animate.enabled(false);
        }
      };
    });