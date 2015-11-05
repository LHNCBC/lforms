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
    //browser.driver.manage().window().maximize();
    browser.get('http://0.0.0.0:9001/');
  }

  //jasmineNodeOpts: {
  //  // Default time to wait in ms before a test fails.
  //  defaultTimeoutInterval: 20000
  //}
}
