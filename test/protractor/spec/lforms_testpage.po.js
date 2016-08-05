var TestPage = function() {

  var attrTestUrl = 'http://0.0.0.0:9001/test/directiveAttrTest.html';
  var directiveTestUrl = 'http://0.0.0.0:9001/test/directiveTest.html';
  var testPageUrl = 'http://0.0.0.0:9001/test/lforms_testpage.html';


  /**
   *  Makes the screen reader log visible so that getText() will be
   *  able to read it.
   */
  function makeReaderLogVisible() {
    browser.driver.executeScript(function() {
      var r = $('#reader_log');
      r.css({height: "auto", width: "auto", top: "auto", left: "auto"});
    });
  };

  /**
   * Select an option in HTML 'select' element by number
   * @param element The 'select' elment
   * @param optionNum the option index number
   */
  function selectDropdownbyNum(element, optionNum ) {
    if (optionNum){
      var options = element.all(by.tagName('option'))
          .then(function(options){
            options[optionNum].click();
          });
    }
  };

  var heightFieldID= '/54126-8/8302-2/1/1';
  return {
    checkboxesFinder: element.all(by.css('div.checkbox > label > input[type="checkbox"]')),
    headerEl: $('div.row[ng-if="!lfData.templateOptions.hideHeader"]'),
    heightFieldID: heightFieldID,
    heightField: element(by.id(heightFieldID)),
    heightLabel: element(by.css('label[for="' + heightFieldID + '"]')),
    readerLog: $('#reader_log'),
    readerLogEntries: element.all(by.css('#reader_log p')),

    Autocomp: {
      listFieldID: '/54126-8/54132-6/1/1', // "Were you born a twin?"
      listField: element(by.id('/54126-8/54132-6/1/1')),
      searchResults: element(by.id('searchResults')),
      raceField: element(by.id('/54126-8/54134-2/1/1')),
      eyeField: element(by.id('/9267-6/1')),
      scoreField: element(by.css('input[name="GCS total"]'))
    },

    USSGFHTVertical: {
      comment: element(by.id('comment')), // comment, template data
      name: element(by.id('/54126-8/54125-0/1/1')), // string
      gender: element(by.id('/54126-8/54131-8/1/1')), // answer
      race: element(by.id('/54126-8/54134-2/1/1')), // multiple answers
      dob: element(by.id('/54126-8/21112-8/1/1')), // for empty value comparison
      height: element(by.id('/54126-8/8302-2/1/1')), // number
      weight: element(by.id('/54126-8/29463-7/1/1')), // number
      bmi: element(by.id('/54126-8/39156-5/1/1')), // formula

      height1: element(by.id('/54126-8/8302-2/1/1')),
      weight1: element(by.id('/54126-8/29463-7/1/1')),
      bmi1: element(by.id('/54126-8/39156-5/1/1')),
      heightUnit1: element(by.id('ac1')),
      weightUnit1: element(by.id('ac2')),
      height2: element(by.id('/54114-4/54117-7/8302-2/1/1/1')),
      weight2: element(by.id('/54114-4/54117-7/29463-7/1/1/1')),
      bmi2: element(by.id('/54114-4/54117-7/39156-5/1/1/1')),

      name2: element(by.id('/54126-8/54125-0/1/2')),
      name3: element(by.id('/54126-8/54125-0/1/3')),
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
      mockSubItem2: element(by.id('/54126-8/54137-5/54137-5XA/54140-9XA/1/2/1/1')),

      btnAnotherFamily: element(by.id('add-/54114-4/1')),
      btnAnotherDiseasesHist: element(by.id('add-/54114-4/54117-7/1/1'))
    },

    FullFeaturedForm: {
      cneField: element(by.id('/type9/1')),
      src: element(by.id('/slSource1/1')),
      t1: element(by.id('/slTargetItem1/1')),
      t2: element(by.id('/slTargetItem2/1')),
      t4: element(by.id('/slTargetHeader1/slTargetSubItem1/1/1')),
      t5: element(by.id('/slTargetHeader1/slTargetSubItem2/1/1')),

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

      searchResults: element(by.id('searchResults'))
    },

    HL7GeneticPanel: {
      kindOfMutations: element(by.id("/XXXXX-12/1")),
      variantID: element(by.id("/XXXXX-9/XXXXX-5/1/1"))
    },

    FormWithUserData: {
      q1: element(by.id('/q1/1')),
      q2: element(by.id('/q2/1')),
      q3: element(by.id('/q3/1')),
      q4: element(by.id('/q4/1')),
      q5: element(by.id('/q5/1')),
      q6: element(by.id('/q6/1')),
      q7: element(by.id('/q7/1')),
      q8: element(by.id('/q8/1')),
      q9: element(by.id('/q9/1')),

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

      rpq2_1: element(by.id('/rp-q2/1')),
      rpq2_2: element(by.id('/rp-q2/2')),

      rpq3_1: element(by.id('/rp-q2/rp-q3/1/1')),
      rpq3_2: element(by.id('/rp-q2/rp-q3/2/1')),

      rpq4_1: element(by.id('/rp-q2/rp-q4/1/1')),
      rpq4_2: element(by.id('/rp-q2/rp-q4/1/2')),
      rpq4_3: element(by.id('/rp-q2/rp-q4/1/3')),
      rpq4_4: element(by.id('/rp-q2/rp-q4/1/4')),
      rpq4_5: element(by.id('/rp-q2/rp-q4/2/1')),

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
      rpAdd: element(by.id('add-/repeatingSection1/1'))
    },

    /**
     * Reset reader log
     */
    resetReaderLog: function () {
      browser.driver.executeScript(function () {
        $('#reader_log').html('')
      });
      makeReaderLogVisible();
    },

    /**
     * Display a form on the test page
     * @param formIndex the form's index in the forms list
     */
    openFormByIndex: function (formIndex) {
      // make a selection on the 'select' dropdown list
      var select = element(by.id('form-list'));
      selectDropdownbyNum(select, formIndex);
      var button = element(by.id('load-form-data'));

      if (button) {
        button.click();
      }
      browser.waitForAngular();
    },

    /**
     * Open the base directive test page
     */
    openBaseTestPage: function () {
      browser.get(testPageUrl);
      browser.waitForAngular();
    },

    /**
     *  Open the directive test page.
     */
    openDirectiveTest: function () {
      browser.get(directiveTestUrl);
      browser.waitForAngular();
    },

    /**
     * Open directive templateOption test page
     * @param urlPart parameter part of URL
     */
    openDirectiveAttrTest: function (urlPart) {
      browser.get(attrTestUrl + urlPart);
      browser.waitForAngular();
    },

    /**
     *  Opens the USSG-FHT vertical layout form
     */
    openUSSGFHTVertical: function () {
      this.openBaseTestPage();
      this.openFormByIndex(1);
    },

    /**
     *  Opens the USSG-FHT horizontal layout form
     */
    openUSSGFHTHorizontal: function () {
      this.openBaseTestPage();
      this.openFormByIndex(2);
    },

    /**
     *  Open the glasgow form
     */
    openGlasgowForm: function () {
      this.openBaseTestPage();
      this.openFormByIndex(3);
    },

    /**
     *  Open the "full featured" form.
     */
    openFullFeaturedForm: function () {
      this.openBaseTestPage();
      this.openFormByIndex(4);
    },

    /**
     *  Open the form-builder form
     */
    openFormBuilder: function () {
      this.openBaseTestPage();
      this.openFormByIndex(5);
    },

    /**
     *  Open the MDS3 form
     */
    openMDS3: function () {
      this.openBaseTestPage();
      this.openFormByIndex(6);
    },

    /**
     *  Open the form with user data
     */
    openFormWithUserData: function () {
      this.openBaseTestPage();
      this.openFormByIndex(7);
    },


    /**
     *  Opens the RxTerms form.
     */
    openRxTerms: function () {
      this.openBaseTestPage();
      this.openFormByIndex(9);
    },


    /**
     *  Opens the List Template form
     */
    openListTemplate: function () {
      this.openBaseTestPage();
      this.openFormByIndex(10);
    },


    /**
     *  Opens the Matrix form #1.
     */
    openMatrixLayout1: function () {
      this.openBaseTestPage();
      this.openFormByIndex(11);
    },


    /**
     *  Opens the Matrix form #2.
     */
    openMatrixLayout2: function () {
      this.openBaseTestPage();
      this.openFormByIndex(12);
    },


    /**
     *  Opens the Validation Test form.
     */
    openValidationTest: function () {
      this.openBaseTestPage();
      this.openFormByIndex(13);
    },


    /**
     *  Opens the HL7 Genetic Test Panel.
     */
    openHL7GeneticPanel: function () {
      this.openBaseTestPage();
      this.openFormByIndex(14);
    }
  }
};

module.exports = TestPage();
