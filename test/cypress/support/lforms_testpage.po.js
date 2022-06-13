// TODO $ not defined in BasePage
//const autoCompBasePage = require("autocomplete-lhc/test/protractor/basePage").BasePage;
//const elementFactory = TestUtil.elementFactory;

export class TestPage {

  attrTestUrl = '/test/pages/directiveAttrTest.html';
  directiveTestUrl = '/test/pages/directiveTest.html';
  testPageUrl = '/test/pages/lforms_testpage.html';
  buildFHIRPathURL = '/test/pages/build_test_fhirpath.html';
  addFormToPageTest = '/test/pages/addFormToPageTest.html';

//  autoCompHelpers = new autoCompBasePage();
  LoadForm = {};

  // Define functions for opening forms, via a hashmap from form name (short)
  // to its index. Functions will be named open[Form name].
  formToIndex = {
    USSGFHTVertical: 1,
    USSGFHTHorizontal: 2,
    GlasgowForm: 3,
    FullFeaturedForm: 4,
    FormBuilder: 5,
    MDS3: 6,
    FormWithUserData: 7,
    FormWithUserDataWithHasSavedData: 8,
    RxTerms: 9,
    DisplayControlsDemo: 10,
    MatrixLayout1: 11,
    MatrixLayout2: 12,
    ValidationTest: 13,
    QuestionInQuestionForm: 14,
    HL7GeneticPanel: 15,
    DefaultAnswerForm: 17,
    NewGeneticForm: 19,
    TwoTotalScoreForm: 20,
    VitalSign: 21,
    QTYDemo: 22
  };

  constructor() {
    let that = this;
    for (let f of Object.keys(this.formToIndex)) {

      this.LoadForm['open'+f] = (function(index) {
        return function() {
          that.openBaseTestPage();
          that.openFormByIndex(index);
        }
      })(this.formToIndex[f]);
    }
  }



  USSGFHTVertical = {
    nameID: '/54126-8/54125-0/1/1', // string
    gender: '#/54126-8/54131-8/1/1', // answer
    race: '#/54126-8/54134-2/1/1', // multiple answers
    ethnicity: '#/54126-8/54133-4/1/1',
    dob: '#/54126-8/21112-8/1/1 input',
    height: '#/54126-8/8302-2/1/1', // number
    weight: '#/54126-8/29463-7/1/1', // number
    bmi: '#/54126-8/39156-5/1/1', // formula
    related : '#/54126-8/54135-9/1/1', // parents related

    height1: '#/54126-8/8302-2/1/1',
    weight1: '#/54126-8/29463-7/1/1',
    bmi1: '#/54126-8/39156-5/1/1',
    heightUnit1: '#unit_/54126-8/8302-2/1/1',
    weightUnit1: '#unit_/54126-8/29463-7/1/1',
    height2: '#/54114-4/54117-7/8302-2/1/1/1',
    weight2: '#/54114-4/54117-7/29463-7/1/1/1',
    bmi2: '#/54114-4/54117-7/39156-5/1/1/1',

    name: '#/54126-8/54125-0/1/1',
    name2: '#/54126-8/54125-0/1/2',
    name3: '#/54126-8/54125-0/1/3',
    name4: '#/54126-8/54125-0/1/4',
    btnName: '#add-/54126-8/54125-0/1/1',
    btnName2: '#add-/54126-8/54125-0/1/2',
    btnName3: '#add-/54126-8/54125-0/1/3',
    btnDelName2: '#del-/54126-8/54125-0/1/2',

    disease: '#/54126-8/54137-5/54140-9/1/1/1',
    ageAtDiag: '#/54126-8/54137-5/54130-0/1/1/1',
    btnDiseasesHist: '#add-/54126-8/54137-5/1/1',
    disease2: '#/54126-8/54137-5/54140-9/1/2/1',
    ageAtDiag2: '#/54126-8/54137-5/54130-0/1/2/1',
    btnDiseasesHist2: '#add-/54126-8/54137-5/1/2',
    disease3: '#/54126-8/54137-5/54140-9/1/3/1',
    ageAtDiag3: '#/54126-8/54137-5/54130-0/1/3/1',
    btnDiseasesHist3: '#add-/54126-8/54137-5/1/3',
    mockSubItem2: '#/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1',

    fmName: '#/54114-4/54138-3/1/1',
    fmNameB: '#/54114-4/54138-3/1/2',
    fmNameC: '#/54114-4/54138-3/1/3',
    fmNameD: '#/54114-4/54138-3/1/4',
    fmDisease: '#/54114-4/54117-7/54116-9/1/1/1',
    btnAnotherFamily: '#add-/54114-4/1',
    btnAnotherDiseasesHist: '#add-/54114-4/54117-7/1/1',
    mockedHeight: '#/54114-4/54117-7/8302-2/1/1/1',

    fmName2: '#/54114-4/54138-3/2/1',
    fmDisease2: '#/54114-4/54117-7/54116-9/2/1/1',
    btnAnotherFamily2: '#add-/54114-4/2',
    btnAnotherDiseasesHist2: '#add-/54114-4/54117-7/2/1',

  };



  WAIT_TIMEOUT_1 = 20000
  WAIT_TIMEOUT_2 = 40000


  heightField = '#/54126-8/8302-2/1/1';
  heightLabel = 'label[for="/54126-8/8302-2/1/1"]';
  readerLog = '#reader_log';
  readerLogEntries = '#reader_log p';

  expectReaderLogEntries(expectedEntries) {
    cy.get(this.readerLogEntries).should(($p) => {
      expect($p).to.have.length(expectedEntries.length);
      for (let i = 0; i < expectedEntries.length; i++) {
        expect($p.eq(i).text()).to.equal(expectedEntries[i]);
      }
    });
  }

  expectReaderLogEntriesEmpty() {
    cy.get(this.readerLogEntries).should('not.exist');
  }

  Autocomp = {
    listFieldID: '/54126-8/54132-6/1/1', // "Were you born a twin?"
    listField: '#/54126-8/54132-6/1/1',
    raceField: '#/54126-8/54134-2/1/1',
    eyeField: '#/9267-6/1',
    scoreField: '#/9269-2/1',
    searchResults: '#searchResults'
    // searchResult: this.autoCompHelpers.searchResult, //TODO, probably not working with cypress
    // helpers: this.autoCompHelpers,
    // TODO rewrite in cypress
    // shownItemCount: function() {
    //   return browser.driver.executeScript(
    //     'return jQuery("#searchResults li").length;'
    //   );
    // },
    // listIsVisible: function() {
    //   return browser.driver.executeScript(
    //     'return jQuery("#searchResults")[0].style.visibility === "visible"'
    //   );
    // }
  }

  FullFeaturedForm = {
    cneField: '#/type9/1',
    booleanField: '#/type1/1',
    src: '#/slSource1/1',
    t1: '#/slTargetItem1/1',
    t2: '#/slTargetItem2/1',
    t4: '#/slTargetHeader1/slTargetSubItem1/1/1',
    t5: '#/slTargetHeader1/slTargetSubItem2/1/1',
    t6: '#/slTargetItem6/1',

    allSrc1: '#/slALLSource1/1',
    allSrc2: '#/slALLSource2/1',
    allTarget: '#/slALLTargetItem/1',
    anySrc1: '#/slANYSource1/1',
    anySrc2: '#/slANYSource2/1',
    anyTarget: '#/slANYTargetItem/1',

    rpSrc2: '#/rpSource2/1',
    rpTarget2a: '#/repeatingSection1/rpTargetItem2/1/1',
    rpTarget2b: '#/repeatingSection1/rpTargetItem2/2/1',
    rpAdd: '#add-/repeatingSection1/1',
    rpSubSrc1: '#/repeatingSection1/rpSource1/1/1',
    rpTarget1a: '#/repeatingSection1/rpTargetItem1/1/1',
    rpTarget1b: '#/repeatingSection1/rpTargetItem1/2/1',
    rpTarget1ah1: '#/repeatingSection1/rpTargetHeader1/rpTargetSubItem1/1/1/1',
    rpTarget1bh1: '#/repeatingSection1/rpTargetHeader1/rpTargetSubItem1/2/1/1',

    dcSource: '#/dataControlExamples/itemWithExtraData/1/1',
    dcTarget1: '#/dataControlExamples/controlledItem_LIST/1/1',
    dcTarget2: '#/dataControlExamples/controlledItem_TEXT/1/1',

    searchResults: '#searchResults',

    cneTriggerSrc1: '#/54139-1-cnesrc-1/1',
    dobIfLivingYes: '#/54139-1-cnesrc-1/54124-3/1/1 input',
    dobIfLivingYesB: '#/54139-1-cnesrc-1/54124-3b/1/1 input',
    ageIfLivingAnswered: '#/54139-1-cnesrc-1/54141-7/1/1',
    deathCauseIfLivingNo: '#/54139-1-cnesrc-1/54112-8/1/1',
    ageDeathIfLivingNotAnswered: '#/54139-1-cnesrc-1/54113-6/1/1',

    cneTriggerSrc2: '#/54139-1-cnesrc-2/1',
    dobIfLivingYes2C: '#/54139-1-cnesrc-2/54124-3c/1/1 input',
    dobIfLivingYes2D: '#/54139-1-cnesrc-2/54124-3d/1/1 input',
    deathCauseIfLivingNoB: '#/54139-1-cnesrc-2/54112-8b/1/1'

  }

  HL7GeneticPanel= {
    kindOfMutations: "#/XXXXX-12/1",
    variantID: "#/XXXXX-9/XXXXX-5/1/1"
  }

  FormWithUserData= {
    q0: '#/q0/1',
    q1: '#/q1/1',
    q2: '#/q2/1',
    q3: '#/q3/1',
    q4: '#/q4/1 input',
    q5: '#/q5/1',
    q6: '#/q6/1',
    q7: '#/q7/1',
    q8: '#/q8/1',
    q9: '#/q9/1',
    q99: '#/q99/1 input',

    multiAnswers: '.autocomp_selected li',

    src: '#/slSource1/1',
    t1: '#/slTargetItem1/1',
    t2: '#/slTargetItem2/1',
    t4: '#/slTargetHeader1/slTargetSubItem1/1/1',
    t5: '#/slTargetHeader1/slTargetSubItem2/1/1',

    rpq1_1: '#/rp-q1/1',
    rpq1_2: '#/rp-q1/2',
    rpq1_3: '#/rp-q1/3',
    rpq1_add_btn: '#add-/rp-q1/2',
    rpq1_add_btn_3: '#add-/rp-q1/3',

    rpq2_1: 'label[for="/rp-q2/1"]',
    rpq2_2: 'label[for="/rp-q2/2"]',

    rpq3_1: '#/rp-q2/rp-q3/1/1',
    rpq3_2: '#/rp-q2/rp-q3/2/1',

    rpq4_1: 'label[for="/rp-q2/rp-q4/1/1"]',
    rpq4_2: 'label[for="/rp-q2/rp-q4/1/2"]',
    rpq4_3: 'label[for="/rp-q2/rp-q4/1/3"]',
    rpq4_4: 'label[for="/rp-q2/rp-q4/1/4"]',
    rpq4_5: 'label[for="/rp-q2/rp-q4/2/1"]',

    rpq5_1: '#/rp-q2/rp-q4/rp-q5/1/1/1',
    rpq5_2: '#/rp-q2/rp-q4/rp-q5/1/2/1',
    rpq5_3: '#/rp-q2/rp-q4/rp-q5/1/3/1',
    rpq5_4: '#/rp-q2/rp-q4/rp-q5/1/4/1',
    rpq5_5: '#/rp-q2/rp-q4/rp-q5/2/1/1',

    rpq4_add_btn_1: '#add-/rp-q2/rp-q4/1/3',
    rpq4_add_btn_1b: '#add-/rp-q2/rp-q4/1/4',
    rpq4_add_btn_2: '#add-/rp-q2/rp-q4/2/1',
    rpq4_del_btn_1: '#del-/rp-q2/rp-q4/1/1',
    rpq4_del_btn_2: '#del-/rp-q2/rp-q4/1/2',
    rpq4_del_btn_3: '#del-/rp-q2/rp-q4/1/3',

    rpq2_add_btn: '#add-/rp-q2/2',
    rqp2_del_btn_1: '#del-/rp-q2/1',
    rqp2_del_btn_2: '#del-/rp-q2/2',

    rpSrc2: '#/rpSource2/1',
    rpTarget2a: '#/repeatingSection1/rpTargetItem2/1/1',
    rpTarget2b: '#/repeatingSection1/rpTargetItem2/2/1',
    rpAdd: '#add-/repeatingSection1/1',
    unit1: '#/unit1/1',
    unit1_unit: '#unit_/unit1/1',
    unit2: '#/unit2/1',
    unit2_unit: '#unit_/unit2/1'
  }


  /**
   * Display a form on the test page, and asserts that the form is ready
   * @param formIndex the form's index in the forms list
   */
  openFormByIndex(formIndex) {
    let formFinished=false;
    function formFinishedListener() {formFinished = true}
    cy.get('#test-form').then((el)=> {
      el[0].addEventListener('onFormReady', formFinishedListener);
      el[0].addEventListener('onError', formFinishedListener);
    });

    // make a selection on the 'select' dropdown list
    cy.get("#form-list").select(formIndex);
    var button = cy.get('#load-form-data');
    if (button) {
      button.click();
    }

    // Wait for the form to appear and be "ready" (or error out)
    cy.get('.lhc-form-title', {timeout: 4000}).should('be.visible').then(
      {timeout: 4000}, ()=>{

      return new Cypress.Promise((resolve) => {
        function checkFormFinished() {
          if (formFinished) {
            resolve();
            cy.get('#test-form').then((el)=> {
              el[0].removeEventListener('onFormReady', formFinishedListener);
              el[0].removeEventListener('onError', formFinishedListener);
            });
          }
          else
            setTimeout(checkFormFinished, 50);
        }
        setTimeout(checkFormFinished, 50);
      });
    });
  }

  /**
   * Open the base directive test page
   */
  openBaseTestPage() {
    cy.visit(this.testPageUrl);
    cy.window().then((win) => {
      // Reduce the duration that validation messages stay, to have faster tests.
      win.LForms.Validations._timeout = 100;
    });
  }

  /**
   *  Open the directive test page.
   */
  openDirectiveTest() {
    cy.visit(this.directiveTestUrl);
  }

  /**
   *  Open directive templateOption test page
   * @param urlPart parameter part of URL
   */
  openDirectiveAttrTest(urlPart) {
    cy.visit(this.attrTestUrl + urlPart);
  }

  /**
   *  Opens the build test with FHIRPath page.
   */
  openBuildTestFHIRPath() {
    cy.visit(this.buildFHIRPathURL);
  }


  /**
   *  Selects a FHIR version.
   * @param version the FHIR version to use.
   */
  setFHIRVersion(version) {
    let fhirVersionField = cy.get('#fhirVersion');
    fhirVersionField.select(version);
  }

  /**
   *  Clicks the given add/remove repeating item button, and sleeps a bit to let the page stop moving.
   */
  clickAddRemoveButton(button) {
    cy.byCss(button).scrollIntoView().click();
  }

  /**
   *  Returns the full path to a  JSON form definition file in the test/data
   *  directory.
   * @param filepath the path to the form definition file, relative to
   *  test/data/fhirVersion (or just test/data if fhirVersion is not
   *  provided.)
   * @param fhirVersion (optional) the version of FHIR to use.
   */
  // TODO rewrite in cypress when data path changes
  getTestDataPathName(filepath, fhirVersion=null) {
    let pathParts = [__dirname, '../../src/test-data/e2e']
    if (fhirVersion) {
      this.setFHIRVersion(fhirVersion);
      pathParts.push(fhirVersion);
    }
    pathParts.push(filepath);
    return require('path').join(...pathParts);
  }


  /**
   *  Returns a JSON form definition file from the test/data
   *  directory.
   * @param filepath the path to the form definition file, relative to
   *  test/data/fhirVersion (or just test/data if fhirVersion is not
   *  provided.)
   * @param fhirVersion (optional) the version of FHIR to use.
   */
  // TODO rewrite in cypress when data path changes
  getTestData(filepath, fhirVersion=null) {
    let testFile = this.getTestDataPathName(filepath, fhirVersion);
    return require('fs').readFileSync(testFile, 'utf8');
  }

  /**
   *  Returns the QuestionnaireResponse (as an object) for the form on the page.
   * @param options options for the getFormFHIRData call (the fourth
   * parameter).
   */
  getQuestionnaireResponse(options) {
    let fhirVersion = cy.get("#fhirVersion").its('value');
    return cy.window().invoke("LForms.Util.getFormFHIRData", 'QuestionnaireResponse', fhirVersion, null, options);
  }

 /**
   * Get the datetime string in DTM picker's default format for the current time with the given offset.
   * @param offsetMS the offset from the current time, in milliseconds, optional.
   *        Use a negative offset for past time, positive for future, zero or unspecified for "current"
   * @return the datetime string in the DTM datetime picker's default format (MM/DD/YYYY HH:MM).
   */
  getCurrentDTMString(offsetMS) {
    offsetMS = offsetMS || 0;
    var date = new Date(new Date().getTime() + offsetMS);
    return [
      (101 + date.getMonth()).toString().substr(1),
      (100 + date.getDate()).toString().substr(1),
      (10000 + date.getFullYear()).toString().substr(1)].join('/')
      + ' ' +
      [(100 + date.getHours()).toString().substr(1),
      (100 + date.getMinutes()).toString().substr(1), "00"].join(':');
  }

  /**
   *  Makes the screen reader log visible so that getText() will be
   *  able to read it.
   */
  makeReaderLogVisible() {
    cy.get("#reader_log").invoke("css", {height: "auto", width: "auto", top: "auto", left: "auto"})
  }

  /**
   * Reset reader log
   */
  resetReaderLog() {
    cy.get("#reader_log").invoke("html", "")
    this.makeReaderLogVisible();
  }

  /**
   *  Loads a form from a JSON form definition file from the test/data
   *  directory, and displays the form.
   * @param filepath the path to the form definition file, relative to
   *  test/data/fhirVersion (or just test/data if fhirVersion is not
   *  provided.)
   * @param fhirVersion (optional) the version of FHIR to use.
   */
  loadFromTestData(filepath, fhirVersion = 'lforms') {
    if (fhirVersion !== 'lforms') {
      this.setFHIRVersion(fhirVersion);
    }

    let formFinished = false;
    function formFinishedListener() {formFinished = true}
    cy.get('#test-form').then((el)=> {
      el[0].addEventListener('onFormReady', formFinishedListener);
      el[0].addEventListener('onError', formFinishedListener);
    });

    cy.get('#fileAnchor').uploadFile(`test/data/${fhirVersion}/${filepath}`);

    // Wait for the form to appear and be "ready" (or error out)
    cy.get('.lhc-form-title').should('be.visible').then(
      {timeout: 4000}, ()=>{
        return new Cypress.Promise((resolve) => {
          function checkFormFinished() {
            if (formFinished) {
              resolve();
              cy.get('#test-form').then((el)=> {
                el[0].removeEventListener('onFormReady', formFinishedListener);
                el[0].removeEventListener('onError', formFinishedListener);
              });
            }
            else
              setTimeout(checkFormFinished, 50);
          }
          setTimeout(checkFormFinished, 50);
        });
      });
  }

  /**
   *  Selects a FHIR version.
   * @param version the FHIR version to use.
   */
  setFHIRVersion(version) {
    cy.get('#fhirVersion').select(version);
  }


}

