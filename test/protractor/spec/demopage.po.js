var attrTestUrl = 'http://0.0.0.0:9001/test/directiveAttrTest.html';

var DemoPage = function() {
  var heightFieldID = '/54126-8/8302-2/1/1';

  /**
   *  Makes the screen reader log visible so that getText() will be
   *  able to read it.
   */
  function makeReaderLogVisible() {
    browser.driver.executeScript(function() {
      var r = $('#reader_log');
      r.css({height: "auto", width: "auto", top: "auto", left: "auto"});
    });
  }

  return {
    checkboxesFinder: element.all(by.css('div.checkbox > label > input[type="checkbox"]')),
    headerEl: $('div.row[ng-if="!lfData.templateOption.hideHeader"]'),
    heightFieldID: heightFieldID,
    heightField: element(by.id(heightFieldID)),
    heightLabel: element(by.css('label[for="' + heightFieldID + '"]')),
    showPanel: $('.btn'),
    readerLog: $('#reader_log'),
    readerLogEntries: element.all(by.css('#reader_log p')),
    searchResults: $('#searchResults'),

    // some fields
    USSGFHTVertical: {
      comment: element(by.id('comment')), // comment, template data
      name: element(by.id('/54126-8/54125-0/1/1')), // string
      gender: element(by.id('/54126-8/54131-8/1/1')), // answer
      race: element(by.id('/54126-8/54134-2/1/1')), // multiple answers
      dob: element(by.id('/54126-8/21112-8/1/1')), // for empty value comparison
      height: element(by.id('/54126-8/8302-2/1/1')), // number
      weight: element(by.id('/54126-8/29463-7/1/1')), // number
      bmi: element(by.id('/54126-8/39156-5/1/1')) // formula
    },

    formSearch: $('#s2id_loinc_num1 a'),

    /**
     *  Opens the USSG-FHT vertical layout form
     */
    openUSSGFHTVertical: function () {
      browser.get('http://0.0.0.0:9001/');
      makeReaderLogVisible();
      this.formSearch.click();
      $('.select2-result:first-child').click();
      this.showPanel.click();
    },

    /**
     *  Opens the USSG-FHT horizontal layout form
     */
    openUSSGFHTHorizontal: function () {
      browser.get('http://0.0.0.0:9001/');
      makeReaderLogVisible();
      this.formSearch.click();
      $('.select2-result:nth-of-type(2)').click();
      this.showPanel.click();
    },

    /**
     *  Opens the directive test page.
     */
    openDirectiveTest: function () {
      browser.get('http://0.0.0.0:9001/test/directiveTest.html');
    },


    /**
     *  Opens the directive attribute test page.
     *  @param {String} urlPart - Any thing to attach to base url
     */
    openDirectiveTest: function () {
      browser.get('http://0.0.0.0:9001/test/directiveTest.html');
    },

    /**
     * Reset reader log
     */
    resetReaderLog: function () {
      browser.driver.executeScript(function () {
        $('#reader_log').html('')
      });
    },

    openDirectiveAttrTest: function (urlPart) {
      browser.get(attrTestUrl + urlPart);
    }
  }
};

module.exports = DemoPage();
