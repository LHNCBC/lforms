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
    // finished tests
    '../../test/protractor/spec/argonaut.spec.ts',
    '../../test/protractor/spec/autocomp_list.spec.ts',
    '../../test/protractor/spec/buildTest.spec.ts',
    '../../test/protractor/spec/fhirpath.spec.ts', // has failed tests when adding two forms to a page
    '../../test/protractor/spec/lforms_datatype.spec.ts',
    '../../test/protractor/spec/lforms_fhirdata.spec.ts',
    '../../test/protractor/spec/lforms_formdata.spec.ts',
    '../../test/protractor/spec/lforms_formula.spec.ts',
    '../../test/protractor/spec/lforms_hl7.spec.ts',
    '../../test/protractor/spec/lforms_horizontal.spec.ts',
    '../../test/protractor/spec/lforms_load_user_data.spec.ts',
    '../../test/protractor/spec/lforms_matrix_layout.spec.ts',
    '../../test/protractor/spec/lforms_copyright_coding_instruction.spec.ts',
    '../../test/protractor/spec/lforms_datacontrol.spec.ts',
    '../../test/protractor/spec/lforms_skiplogic.spec.ts',
    '../../test/protractor/spec/lforms_validation.spec.ts', // has one failed test on DT
    '../../test/protractor/spec/lforms_validation_date.spec.ts',
    '../../test/protractor/spec/fhir_context.spec.ts',
    '../../test/protractor/spec/attachment.spec.ts'

  ],
  capabilities: {
    'browserName': 'chrome',
    // 'browserName': 'firefox',
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
