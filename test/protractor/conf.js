exports.config = {
  // directConnect: true,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox'
  },
  specs: 'spec/*.js',
  exclude: ['spec/lforms_keyboard_navi.spec.js'],
  rootElement: 'body',
  framework: 'jasmine2',

  onPrepare: function() {

    // disable animation
    // http://stackoverflow.com/questions/26584451/how-to-disable-animations-in-protractor-for-angular-js-appliction
    var disableNgAnimate = function() {
      angular
        .module('disableNgAnimate', [])
        .run(['$animate', function($animate) {
          $animate.enabled(false);
        }]);
    };

    var disableCssAnimate = function() {
      angular
        .module('disableCssAnimate', [])
        .run(function() {
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = '* {' +
            '-webkit-transition: none !important;' +
            '-moz-transition: none !important' +
            '-o-transition: none !important' +
            '-ms-transition: none !important' +
            'transition: none !important' +
            '}';
          document.getElementsByTagName('head')[0].appendChild(style);
        });
    };

    // disable ng-animate during the testing
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('disableCssAnimate', disableCssAnimate);

    // try to load the page first
    browser.get('http://0.0.0.0:9001/');

  }

  //jasmineNodeOpts: {
  //  // Default time to wait in ms before a test fails.
  //  defaultTimeoutInterval: 20000
  //}
}
