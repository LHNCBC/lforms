import { config } from "../protractor.conf.js";
import TestUtil from "./util";
import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

let $: any = (global as any).jQuery;

const autoCompBasePage = require("../../../node_modules/autocomplete-lhc/test/protractor/basePage").BasePage;
const elementFactory = TestUtil.elementFactory;

export class TestPage {

  attrTestUrl = config.baseUrl + '/test/directiveAttrTest.html';
  directiveTestUrl = config.baseUrl + '/test/directiveTest.html';
  testPageUrl = config.baseUrl + '/test/lforms_testpage.html';
  buildFHIRPathURL = config.baseUrl + '/test/build_test_fhirpath.html';
  addFormToPageTest = config.baseUrl + '/test/addFormToPageTest.html';


  /**
   * Navigate to the main page
   */
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  /**
   *  Makes the screen reader log visible so that getText() will be
   *  able to read it.
   */
  makeReaderLogVisible() {
    browser.driver.executeScript(function() {
      var r = document.getElementById('reader_log');
      $(r).css({height: "auto", width: "auto", top: "auto", left: "auto"});
    });
  };

  /**
   * Select an option in HTML 'select' element by number
   * @param element The 'select' elment
   * @param optionNum the option index number
   */
  selectDropdownbyNum(element, optionNum ) {
    if (optionNum){
      var options = element.all(by.tagName('option'))
          .then(function(options){
            options[optionNum].click();
          });
    }
  };

  heightFieldID= '/54126-8/8302-2/1/1';

  autoCompHelpers = new autoCompBasePage();
  LoadForm:any = {};

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
//    comment: element(by.id('comment')), // comment, template data
//    whereDone: element(by.id('where_done')), // where done, template data
    nameID: '/54126-8/54125-0/1/1', // string
    gender: element(by.id('/54126-8/54131-8/1/1')), // answer
    race: element(by.id('/54126-8/54134-2/1/1')), // multiple answers
    ethnicity: elementFactory('/54126-8/54133-4/1/1'),
    //dob: element(by.id('/54126-8/21112-8/1/1')), // for empty value comparison
    dob: element(by.id('/54126-8/21112-8/1/1')).element(by.css('input')),
    height: element(by.id('/54126-8/8302-2/1/1')), // number
    weight: element(by.id('/54126-8/29463-7/1/1')), // number
    bmi: element(by.id('/54126-8/39156-5/1/1')), // formula
    related : element(by.id('/54126-8/54135-9/1/1')), // parents related

    height1: element(by.id('/54126-8/8302-2/1/1')),
    weight1: element(by.id('/54126-8/29463-7/1/1')),
    bmi1: element(by.id('/54126-8/39156-5/1/1')),
    heightUnit1: element(by.id('unit_/54126-8/8302-2/1/1')),
    weightUnit1: element(by.id('unit_/54126-8/29463-7/1/1')),
    height2: element(by.id('/54114-4/54117-7/8302-2/1/1/1')),
    weight2: element(by.id('/54114-4/54117-7/29463-7/1/1/1')),
    bmi2: element(by.id('/54114-4/54117-7/39156-5/1/1/1')),

    name: element(by.id('/54126-8/54125-0/1/1')),
    name2: element(by.id('/54126-8/54125-0/1/2')),
    name3: element(by.id('/54126-8/54125-0/1/3')),
    name4: element(by.id('/54126-8/54125-0/1/4')),
    btnName: element(by.id('add-/54126-8/54125-0/1/1')),
    btnName2: element(by.id('add-/54126-8/54125-0/1/2')),
    btnName3: element(by.id('add-/54126-8/54125-0/1/3')),
    btnDelName2: element(by.id('del-/54126-8/54125-0/1/2')),

    disease: element(by.id('/54126-8/54137-5/54140-9/1/1/1')),
    ageAtDiag: element(by.id('/54126-8/54137-5/54130-0/1/1/1')),
    btnDiseasesHist: element(by.id('add-/54126-8/54137-5/1/1')),
    disease2: element(by.id('/54126-8/54137-5/54140-9/1/2/1')),
    ageAtDiag2: element(by.id('/54126-8/54137-5/54130-0/1/2/1')),
    btnDiseasesHist2: element(by.id('add-/54126-8/54137-5/1/2')),
    disease3: element(by.id('/54126-8/54137-5/54140-9/1/3/1')),
    ageAtDiag3: element(by.id('/54126-8/54137-5/54130-0/1/3/1')),
    btnDiseasesHist3: element(by.id('add-/54126-8/54137-5/1/3')),
    mockSubItem2: element(by.id('/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1')),

    fmName: element(by.id('/54114-4/54138-3/1/1')),
    fmNameB: element(by.id('/54114-4/54138-3/1/2')),
    fmNameC: element(by.id('/54114-4/54138-3/1/3')),
    fmNameD: element(by.id('/54114-4/54138-3/1/4')),
    fmDisease: element(by.id('/54114-4/54117-7/54116-9/1/1/1')),
    btnAnotherFamily: element(by.id('add-/54114-4/1')),
    btnAnotherDiseasesHist: element(by.id('add-/54114-4/54117-7/1/1')),
    mockedHeight: element(by.id('/54114-4/54117-7/8302-2/1/1/1')),

    fmName2: element(by.id('/54114-4/54138-3/2/1')),
    fmDisease2: element(by.id('/54114-4/54117-7/54116-9/2/1/1')),
    btnAnotherFamily2: element(by.id('add-/54114-4/2')),
    btnAnotherDiseasesHist2: element(by.id('add-/54114-4/54117-7/2/1')),

  };


  /**
   *  Returns true if two arrays are equal (a shallow comparison)
   */
  arraysEqual(array1, array2) {
    // https://stackoverflow.com/a/19746771
    return array1.length === array2.length &&
      array1.every(function(value, index) { return value === array2[index]});
  };


  WAIT_TIMEOUT_1 = 20000
  WAIT_TIMEOUT_2 = 40000
  checkboxesFinder = element.all(by.css('div.lf-form-control > label > input[type="checkbox"]'))
  heightField = element(by.id(this.heightFieldID))
  heightLabel = element(by.css('label[for="' + this.heightFieldID + '"]'))
  readerLog = element(by.css('#reader_log'))
  readerLogEntries = element.all(by.css('#reader_log p'))
  expectReaderLogEntries(expectedEntries) {
    let self = this;
    browser.wait(function() {
      return self.readerLogEntries.getText().then((textArray) => {
        var rtn = self.arraysEqual(textArray, expectedEntries);
        if (!rtn) {
          console.log("Screen reader log test:  expecting +"+
            JSON.stringify(expectedEntries)+ " but got " +
            JSON.stringify(textArray) +", retrying until timeout");
          // Sleep a bit and try again.
          rtn = browser.sleep(100).then(()=>false);
        }
        return rtn;
      });
    }, 5000);
  }

  Autocomp = {
    listFieldID: '/54126-8/54132-6/1/1', // "Were you born a twin?"
    listField: element(by.id('/54126-8/54132-6/1/1')),
    raceField: element(by.id('/54126-8/54134-2/1/1')),
    eyeField: element(by.id('/9267-6/1')),    
    scoreField: element(by.id('/9269-2/1')),    
    searchResults: this.autoCompHelpers.searchResults,
    searchResult: this.autoCompHelpers.searchResult,
    helpers: this.autoCompHelpers,
    shownItemCount: function() {
      return browser.driver.executeScript(
        'return jQuery("#searchResults li").length;'
      );
    },
    listIsVisible: function() {
      return browser.driver.executeScript(
        'return jQuery("#searchResults")[0].style.visibility === "visible"'
      );
    }
  }

  FullFeaturedForm = {
    cneField: element(by.id('/type9/1')),
    booleanField: element(by.id('/type1/1')),
    src: element(by.id('/slSource1/1')),
    t1: element(by.id('/slTargetItem1/1')),
    t2: element(by.id('/slTargetItem2/1')),
    t4: element(by.id('/slTargetHeader1/slTargetSubItem1/1/1')),
    t5: element(by.id('/slTargetHeader1/slTargetSubItem2/1/1')),
    t6: element(by.id('/slTargetItem6/1')),

    allSrc1: element(by.id('/slALLSource1/1')),
    allSrc2: element(by.id('/slALLSource2/1')),
    allTarget: element(by.id('/slALLTargetItem/1')),
    anySrc1: element(by.id('/slANYSource1/1')),
    anySrc2: element(by.id('/slANYSource2/1')),
    anyTarget: element(by.id('/slANYTargetItem/1')),

    rpSrc2: element(by.id('/rpSource2/1')),
    rpTarget2a: element(by.id('/repeatingSection1/rpTargetItem2/1/1')),
    rpTarget2b: element(by.id('/repeatingSection1/rpTargetItem2/2/1')),
    rpAdd: element(by.id('add-/repeatingSection1/1')),
    rpSubSrc1: element(by.id('/repeatingSection1/rpSource1/1/1')),
    rpTarget1a: element(by.id('/repeatingSection1/rpTargetItem1/1/1')),
    rpTarget1b: element(by.id('/repeatingSection1/rpTargetItem1/2/1')),
    rpTarget1ah1: element(by.id('/repeatingSection1/rpTargetHeader1/rpTargetSubItem1/1/1/1')),
    rpTarget1bh1: element(by.id('/repeatingSection1/rpTargetHeader1/rpTargetSubItem1/2/1/1')),

    dcSource: element(by.id('/dataControlExamples/itemWithExtraData/1/1')),
    dcTarget1: element(by.id('/dataControlExamples/controlledItem_LIST/1/1')),
    dcTarget2: element(by.id('/dataControlExamples/controlledItem_TEXT/1/1')),

    searchResults: element(by.id('searchResults')),

    cneTriggerSrc1: element(by.id('/54139-1-cnesrc-1/1')),
    dobIfLivingYes: element(by.id('/54139-1-cnesrc-1/54124-3/1/1')).element(by.css('input')),
    dobIfLivingYesB: element(by.id('/54139-1-cnesrc-1/54124-3b/1/1')).element(by.css('input')),
    ageIfLivingAnswered: element(by.id('/54139-1-cnesrc-1/54141-7/1/1')),
    deathCauseIfLivingNo: element(by.id('/54139-1-cnesrc-1/54112-8/1/1')),
    ageDeathIfLivingNotAnswered: element(by.id('/54139-1-cnesrc-1/54113-6/1/1')),

    cneTriggerSrc2: element(by.id('/54139-1-cnesrc-2/1')),
    dobIfLivingYes2C: element(by.id('/54139-1-cnesrc-2/54124-3c/1/1')).element(by.css('input')),
    dobIfLivingYes2D: element(by.id('/54139-1-cnesrc-2/54124-3d/1/1')).element(by.css('input')),
    deathCauseIfLivingNoB: element(by.id('/54139-1-cnesrc-2/54112-8b/1/1'))

  }

  HL7GeneticPanel= {
    kindOfMutations: element(by.id("/XXXXX-12/1")),
    variantID: element(by.id("/XXXXX-9/XXXXX-5/1/1"))
  }

  FormWithUserData= {
    q0: element(by.id('/q0/1')),
    q1: element(by.id('/q1/1')),
    q2: element(by.id('/q2/1')),
    q3: element(by.id('/q3/1')),
    q4: element(by.id('/q4/1')).element(by.css('input')),
    q5: element(by.id('/q5/1')),
    q6: element(by.id('/q6/1')),
    q7: element(by.id('/q7/1')),
    q8: element(by.id('/q8/1')),
    q9: element(by.id('/q9/1')),
    q99: element(by.id('/q99/1')).element(by.css('input')),

    multiAnswers: element.all(by.css('.autocomp_selected li')),

    src: element(by.id('/slSource1/1')),
    t1: element(by.id('/slTargetItem1/1')),
    t2: element(by.id('/slTargetItem2/1')),
    t4: element(by.id('/slTargetHeader1/slTargetSubItem1/1/1')),
    t5: element(by.id('/slTargetHeader1/slTargetSubItem2/1/1')),

    rpq1_1: element(by.id('/rp-q1/1')),
    rpq1_2: element(by.id('/rp-q1/2')),
    rpq1_3: element(by.id('/rp-q1/3')),
    rpq1_add_btn: element(by.id('add-/rp-q1/2')),
    rpq1_add_btn_3: element(by.id('add-/rp-q1/3')),

    rpq2_1: element(by.css('label[for="/rp-q2/1"]')),
    rpq2_2: element(by.css('label[for="/rp-q2/2"]')),

    rpq3_1: element(by.id('/rp-q2/rp-q3/1/1')),
    rpq3_2: element(by.id('/rp-q2/rp-q3/2/1')),

    rpq4_1: element(by.css('label[for="/rp-q2/rp-q4/1/1"]')),
    rpq4_2: element(by.css('label[for="/rp-q2/rp-q4/1/2"]')),
    rpq4_3: element(by.css('label[for="/rp-q2/rp-q4/1/3"]')),
    rpq4_4: element(by.css('label[for="/rp-q2/rp-q4/1/4"]')),
    rpq4_5: element(by.css('label[for="/rp-q2/rp-q4/2/1"]')),

    rpq5_1: element(by.id('/rp-q2/rp-q4/rp-q5/1/1/1')),
    rpq5_2: element(by.id('/rp-q2/rp-q4/rp-q5/1/2/1')),
    rpq5_3: element(by.id('/rp-q2/rp-q4/rp-q5/1/3/1')),
    rpq5_4: element(by.id('/rp-q2/rp-q4/rp-q5/1/4/1')),
    rpq5_5: element(by.id('/rp-q2/rp-q4/rp-q5/2/1/1')),

    rpq4_add_btn_1: element(by.id('add-/rp-q2/rp-q4/1/3')),
    rpq4_add_btn_1b: element(by.id('add-/rp-q2/rp-q4/1/4')),
    rpq4_add_btn_2: element(by.id('add-/rp-q2/rp-q4/2/1')),
    rpq4_del_btn_1: element(by.id('del-/rp-q2/rp-q4/1/1')),
    rpq4_del_btn_2: element(by.id('del-/rp-q2/rp-q4/1/2')),
    rpq4_del_btn_3: element(by.id('del-/rp-q2/rp-q4/1/3')),

    rpq2_add_btn: element(by.id('add-/rp-q2/2')),
    rqp2_del_btn_1: element(by.id('del-/rp-q2/1')),
    rqp2_del_btn_2: element(by.id('del-/rp-q2/2')),

    rpSrc2: element(by.id('/rpSource2/1')),
    rpTarget2a: element(by.id('/repeatingSection1/rpTargetItem2/1/1')),
    rpTarget2b: element(by.id('/repeatingSection1/rpTargetItem2/2/1')),
    rpAdd: element(by.id('add-/repeatingSection1/1')),
    unit1: element(by.id('/unit1/1')),
    unit1_unit: element(by.id('unit_/unit1/1')),
    unit2: element(by.id('/unit2/1')),
    unit2_unit: element(by.id('unit_/unit2/1'))
  }

  /**
   * Reset reader log
   */
  resetReaderLog() {
    browser.driver.executeScript(function () {
      document.getElementById('reader_log').innerHTML = "";
    });
    this.makeReaderLogVisible();
  }

  /**
   * Display a form on the test page
   * @param formIndex the form's index in the forms list
   */
  openFormByIndex(formIndex) {
    // make a selection on the 'select' dropdown list
    var select = element(by.id('form-list'));
    this.selectDropdownbyNum(select, formIndex);
    var button = element(by.id('load-form-data'));

    if (button) {
      button.click();
    }
    browser.wait(function () { // wait for the form to render
      // Note that this tests that a form is rendered.  If another form was already
      // rendered, this might detect that previous form.  We could clear the
      // form definition, wait it the form to be not rendered, and then open
      // the new form.   I am not sure it is worth it, but I am leaving this note
      // in case there is a problem in the future.
      return element(by.css('.lhc-form-title')).isPresent();
    }, this.WAIT_TIMEOUT_1);
    //browser.waitForAngular();
  }

  /**
   *  Opens the given test page URL
   * @param pageURL the URL of the test page to open.
   */
  openTestPage(pageURL) {
    browser.get(pageURL);
    //browser.waitForAngular();
    //browser.executeScript(TestUtil.disableAutocompleterScroll);
    //browser.executeScript(TestUtil.disableCssAnimate);
  }

  /**
   * Open the base directive test page
   */
  openBaseTestPage() {
    this.openTestPage(this.testPageUrl);
  }

  /**
   *  Open the directive test page.
   */
  openDirectiveTest() {
    this.openTestPage(this.directiveTestUrl);
  }

  /**
   *  Open directive templateOption test page
   * @param urlPart parameter part of URL
   */
  openDirectiveAttrTest(urlPart) {
    this.openTestPage(this.attrTestUrl + urlPart);
  }

  /**
   *  Opens the build test with FHIRPath page.
   */
  openBuildTestFHIRPath() {
    this.openTestPage(this.buildFHIRPathURL);
  }


  /**
   *  Selects a FHIR version.
   * @param version the FHIR version to use.
   */
  setFHIRVersion(version) {
    let fhirVersionField = element(by.css('#fhirVersion'));
    fhirVersionField.element(by.cssContainingText('option', version)).click();
  }


  /**
   *  Returns the full path to a  JSON form definition file in the test/data
   *  directory.
   * @param filepath the path to the form definition file, relative to
   *  test/data/fhirVersion (or just test/data if fhirVersion is not
   *  provided.)
   * @param fhirVersion (optional) the version of FHIR to use.
   */
  getTestDataPathName(filepath, fhirVersion=null) {
    let pathParts = [__dirname, '../../../src/test-data/e2e']
    if (fhirVersion) {
      this.setFHIRVersion(fhirVersion);
      pathParts.push(fhirVersion);
    }
    pathParts.push(filepath);
    return require('path').join(...pathParts);
  }


  /**
   *  Returns a JSON form definition  file from the test/data
   *  directory.
   * @param filepath the path to the form definition file, relative to
   *  test/data/fhirVersion (or just test/data if fhirVersion is not
   *  provided.)
   * @param fhirVersion (optional) the version of FHIR to use.
   */
  getTestData(filepath, fhirVersion=null) {
    let testFile = this.getTestDataPathName(filepath, fhirVersion);
    return require('fs').readFileSync(testFile, 'utf8');
  }


  /**
   *  Loads a form from a JSON form definition file from the test/data
   *  directory, and displays the form.
   * @param filepath the path to the form definition file, relative to
   *  test/data/fhirVersion (or just test/data if fhirVersion is not
   *  provided.)
   * @param fhirVersion (optional) the version of FHIR to use.
   */
  loadFromTestData(filepath, fhirVersion=null) {
    let testFile = this.getTestDataPathName(filepath, fhirVersion);
    // Temporarily unhide the file input element.
    let fileInput = element(by.css('#fileAnchor'));
    browser.executeScript("document.getElementById('fileAnchor').className = ''");
    TestUtil.sendKeys(fileInput, testFile);
    // Re-hide the file input element
    browser.executeScript("document.getElementById('fileAnchor').className = 'hide'");
    // wait for the form to render
    browser.wait(function () { 
      return element(by.css('.lhc-form-title')).isPresent();
    }, this.WAIT_TIMEOUT_1);
  }


  /**
   *  Returns the QuestionnaireResponse (as an object) for the form on the page.
   * @param options options for the getFormFHIRData call (the fourth
   * parameter).
   */
   getQuestionnaireResponse(options) {
    return browser.executeScript("return LForms.Util.getFormFHIRData("+
     "'QuestionnaireResponse', getFHIRVersion(), null, arguments[0])", options);
  }
}

