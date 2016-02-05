'use strict';

angular.module('lformsWidget')
    .service('lformsConfig', function($animate) {
      return {
        'enableAnimate': function() {
          $animate.enabled(true);
        },
        'disableAnimate': function() {
          $animate.enabled(false);
        }
      };
    });