// Karma configuration
// Generated on Tue Dec 06 2016 16:36:46 GMT-0500 (EST)

module.exports = function(config) {
  config.set({


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',

    // Set a "proxy" so that the JSON test data files can be retrieved via AJAX.
    proxies: {
      '/test/data/': '/base/test/data/',
      '/lib': '/base/src/lib'
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-mocha-reporter')

    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha', 'chai', 'webpack'],
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/lib/item-controls.json', included: false, served: true}, 
      {pattern: 'test/data/**/*.json', included: false, served: true},
      {pattern: 'test/data/**/*.js', included: true, served: true},
      {pattern: 'dist/lforms/webcomponent/*.js.map', included: false, served: true},
      'dist/lforms/webcomponent/assets/lib/zone.min.js',
      'dist/lforms/webcomponent/runtime.js',
      'dist/lforms/webcomponent/polyfills.js',
      'dist/lforms/webcomponent/main.js',
      'dist/fhir/*/lformsFHIR.js',
      'test/karma/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    mochaReporter: {
      output: 'minimal'
    },

    client: {
      captureConsole: true
    },


    // web server port
    port: 9898,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//    browsers: ['Chrome_without_password_security'],
    browsers: ['ChromeHeadless_without_password_security'],
    customLaunchers: {
      ChromeHeadless_without_password_security: {
        base: 'ChromeHeadless',
        flags: ['--password-store=basic']
      },
      Chrome_without_password_security: {
        base: 'Chrome',
        flags: ['--password-store=basic']
      },
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,


    listenAddress: 'localhost', // binds the test server to localhost

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
