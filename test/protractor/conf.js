exports.config = {
  // directConnect: true,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox'
  },
  specs: 'spec/*.js',
  rootElement: 'body',
  framework: 'jasmine2'

  //jasmineNodeOpts: {
  //  // Default time to wait in ms before a test fails.
  //  defaultTimeoutInterval: 20000
  //}
}
