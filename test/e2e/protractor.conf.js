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
    './spec/argonaut.spec.ts',
    './spec/autocomp_list.spec.ts',
    './spec/buildTest.spec.ts',
    './spec/fhirpath.spec.ts', 
    './spec/lforms_datatype.spec.ts',
    './spec/lforms_fhirdata.spec.ts',
    './spec/lforms_formdata.spec.ts',
    './spec/lforms_formula.spec.ts',
    './spec/lforms_hl7.spec.ts',
    './spec/lforms_horizontal.spec.ts',
    './spec/lforms_load_user_data.spec.ts',
    './spec/lforms_matrix_layout.spec.ts',
    './spec/lforms_copyright_coding_instruction.spec.ts',
    './spec/lforms_datacontrol.spec.ts',
    './spec/lforms_skiplogic.spec.ts',
    './spec/lforms_validation.spec.ts', // has one failed test on DT
    './spec/lforms_validation_date.spec.ts',
    './spec/fhir_context.spec.ts',
    './spec/attachment.spec.ts',
    './spec/R4/prepop.spec.ts',
    './spec/R4/variables.spec.ts',
    './spec/addFormToPage.spec.ts', 
//    './spec/lforms_one_unused_repeating_item.spec.ts',
    './spec/lforms_tree.spec.ts',
    './spec/screen_reader_log.spec.ts',
    './spec/lforms_visual.spec.ts', // DT, DTM and TM input field's background-color is a little off
    './spec/lforms_display_controls.spec.ts'

    // ===Remaining tests===
    // lforms_keyboard_navi.spec.ts   // no navigation yet

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
