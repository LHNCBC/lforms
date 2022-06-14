// Karma configuration
// Generated on Tue Dec 06 2016 16:36:46 GMT-0500 (EST)

module.exports = function(config) {
  config.set({


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',

    // Set a "proxy" so that the JSON test data files can be retrieved via AJAX.
    proxies: {
      '/base/app/data/': '/base/src/test-data/form-data/',
      '/test/data/': '/base/src/test-data/e2e/'
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
      {pattern: 'src/test-data/**/*.json', included: false, served: true},
      {pattern: 'src/test-data/**/*.js', included: true, served: true},
      'dist/webcomponent/assets/lib/zone.min.js',
      'dist/webcomponent/lhc-forms.es5.js',
      'src/fhir/*/lformsFHIR.js',
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
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};