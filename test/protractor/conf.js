var port = 9001;
exports.config = {
  port: port,
  baseUrl: 'http://localhost.nlm.nih.gov:' + (process.env.PORT || port),

  //directConnect: true,
  //Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  specs: 'spec/*.spec.js',
  exclude: ['spec/lforms_keyboard_navi.spec.js'],
  rootElement: 'body',
  framework: 'jasmine2',

  onPrepare: function() {

    // Replace default dot reporter with something better.
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new
    SpecReporter({displayStacktrace: true}));

    // disable animation
    // http://stackoverflow.com/questions/26584451/how-to-disable-animations-in-protractor-for-angular-js-appliction
    var disableNgAnimate = function() {
      angular
        .module('disableNgAnimate', [])
        .run(['$animate', function($animate) {
          $animate.enabled(false);
        }]);
    };

    var setTestFlag = function() {
      angular
          .module('setTestFlag', [])
          .run(function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = 'window._INTESTING_ = true;';
            document.getElementsByTagName('head')[0].appendChild(script);
          });
    };


    // disable ng-animate during the testing
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('setTestFlag', setTestFlag);

    // Disable smoothScroll during testing
    browser.addMockModule('smoothScroll', function() {
      var smooth = angular.module('smoothScroll', []);
      smooth.factory('smoothScroll', function() {
        return function(element){
          element.scrollIntoView({behavior: "instant"});
        };
      });
      smooth.directive('smoothScroll', ['smoothScroll', function(smoothScroll) {
        return {
           link: function($scope, $elem) {
             $elem.scrollIntoView({behavior: "instant"});
           }
        }
      }]);
    });

    // try to load the page first
    //browser.get('http://0.0.0.0:9001/');

  },

  jasmineNodeOpts: {
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 200000
  }
};
