var DemoPage = function() {
  var heightFieldID = '/54126-8/8302-2/1/1';

  /**
   *  Makes the screen reader log visible so that getText() will be
   *  able to read it.
   */
  function makeReaderLogVisible() {
    browser.driver.executeScript(function() {
      var r = $('reader_log'); // uses prototypejs' $ in the browser
      r.style.height = 'auto';
      r.style.width = 'auto'
      r.style.top = 'auto'
      r.style.left = 'auto'
    });
  }

  return {
    heightFieldID: heightFieldID,
    heightField: element(by.id(heightFieldID)),
    heightLabel: element(by.css('label[for="'+heightFieldID+'"]')),
    showPanel: $('.btn'),
    readerLog: $('#reader_log'),
    readerLogEntries: element.all(by.css('#reader_log p')),
    searchResults: $('#searchResults'),

    formSearch: $('#s2id_loinc_num1 a'),
    /**
     *  Opens the USSG-FHT vertical layout form
     */
    openUSSGFHTVertical: function() {
      browser.get('http://0.0.0.0:9001/');
      makeReaderLogVisible();
      this.formSearch.click();
      $('.select2-result:first-child').click();
      this.showPanel.click();
    },

    /**
     *  Opens the USSG-FHT horizontal layout form
     */
    openUSSGFHTHorizontal: function() {
      browser.get('http://0.0.0.0:9001/');
      makeReaderLogVisible();
      this.formSearch.click();
      $('.select2-result:nth-of-type(2)').click();
      this.showPanel.click();
    },

    /**
     *  Opens the "full featured" form.
     */
    openFullFeaturedForm: function() {
      browser.get('http://0.0.0.0:9001/');
      this.formSearch.click();
      $('.select2-result:nth-of-type(5)').click();
      this.showPanel.click();
    },

    /**
     *  Opens the directive test page.
     */
    openDirectiveTest: function() {
      browser.get('http://0.0.0.0:9001/test/directiveTest.html');
    }
  }
};
module.exports = DemoPage();
