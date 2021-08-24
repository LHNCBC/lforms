// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './src/**/*.e2e-spec.ts'
    // './spec/**/*.e2e-spec.todo.failed.ts'
    './spec/**/*.e2e-spec.done.ts'
    // './spec/**/*.e2e-spec.ts'
    // './spec/autocomp_list.e2e-spec.done.ts'
    // './spec/lforms_skiplogic.e2e-spec.todo.failed.ts'
    // './spec/lforms_matrix_layout.e2e-spec.done.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    // 'chromeOptions': {
    //     'args': [
    //         '--headless'
    //     ]
    // }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4201/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: async () => {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: StacktraceOption.PRETTY } }));

    await browser.waitForAngularEnabled(false);
    await browser.manage().window().maximize();
    await browser.manage().timeouts().implicitlyWait(10000);
  }
};
