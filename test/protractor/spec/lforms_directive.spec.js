const testUtil = require('./util');

describe('directive: ', function() {
  describe('horizontal table', function() {

    var BLANK_GIF_DATAURL = 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw==';
    var tp = require('./lforms_testpage.po.js');

    describe('should have BLANK_GIF_DATAURL', function() {
      it('in datepicker stop-sign image tag', function() {
        tp.openDirectiveTest();
        expect(element.all(by.css('img.stop-sign'))
          .getAttribute('src')).toContain(BLANK_GIF_DATAURL);
      });
    });

    it('should have one add button in the horizontal table when the form loads', function() {
      tp.openDirectiveTest();

      // there is an add button
      expect(element.all(by.css('.lf-float-button')).get(2).isPresent()).toBe(true);
      expect(element.all(by.css('.lf-float-button')).get(2).getText()).toBe('+ Add another "This family member\'s history of disease"');
    });

    it('should still have two remove buttons visible after the user adds a row', function() {

      element.all(by.css('.lf-float-button')).get(2).click();

      // the first row has a '-' button only
      expect(element.all(by.css('.lf-float-button')).get(2).getText()).toBe('-');

      // the second row has a '-' button
      expect(element.all(by.css('.lf-float-button')).get(3).getText()).toBe('-');
      // and an add button
      expect(element.all(by.css('.lf-float-button')).get(4).getText()).toBe('+ Add another "This family member\'s history of disease"');

    });

    it('should have three remove buttons visible after the user adds a row', function() {
      testUtil.safeClick(element.all(by.css('.lf-float-button')).get(4));

      // Wait for the page to update.  (Shouldn't be necessary?)
      // The count is the number of add and remove buttons anywhere on the page
      browser.wait(function() {
        return element.all(by.css('.lf-float-button')).count().then(n=>n==7);
      });

      // the first row has a '-' button only
      expect(element.all(by.css('.lf-float-button')).get(2).getText()).toBe('-');

      // the second row has a '-' button only
      expect(element.all(by.css('.lf-float-button')).get(3).getText()).toBe('-');

      // the third row has a '-' button
      expect(element.all(by.css('.lf-float-button')).get(4).getText()).toBe('-');
      // and an add button
      expect(element.all(by.css('.lf-float-button')).get(5).getText()).toBe('+ Add another "This family member\'s history of disease"');
    });

    it('should have the 2 rows after the user removes the 2nd row', function() {
      testUtil.safeClick(element.all(by.css('.lf-float-button')).get(3));

      // Wait for the page to update.  (Shouldn't be necessary?)
      // The count is the number of add and remove buttons anywhere on the page
      browser.wait(function() {
        return element.all(by.css('.lf-float-button')).count().then(n=>n==6);
      });

      // the first row has a '-' button only
      expect(element.all(by.css('.lf-float-button')).get(2).getText()).toBe('-');

      // the second row has a '-' button
      expect(element.all(by.css('.lf-float-button')).get(3).getText()).toBe('-');
      // and an add button
      browser.wait(function() {
        return element.all(by.css('.lf-float-button')).get(4).getText().then(text=>
          text == '+ Add another "This family member\'s history of disease"');
      }, 5000);
    });


    describe('autocomp list inside lforms directive', function() {

      var listFieldID = '/54126-8/54132-6/1/1'; // "Were you born a twin?"
      var searchResults = $('#searchResults');

      it('should be visible after the user clicks in a field', function() {
        tp.openDirectiveTest();

        var listField = element(by.id(listFieldID));
        browser.wait(function() {
          return listField.isDisplayed();
        }, tp.WAIT_TIMEOUT_2);
        listField.click();
        browser.wait(function() {
          return searchResults.isDisplayed();
        }, tp.WAIT_TIMEOUT_2);
        expect(searchResults.isDisplayed()).toBeTruthy();
      });
    });
  });

  describe('checkbox controlled by templateOptions in the form data: ', function() {

    var tp = require('./lforms_testpage.po.js');

    var loadForm1 = 'load1';
    var loadForm2 = 'load2';
    var loadForm3 = 'load3';

    it('default value of the checkboxes should not be checked', function() {
      tp.openDirectiveTest();

      var checkboxes = element.all(by.css('div.lf-form-control > label > input[type="checkbox"]'));
      expect(checkboxes.get(0).isSelected()).toBe(false);
      expect(checkboxes.get(1).isSelected()).toBe(false);
      expect(checkboxes.get(2).isSelected()).toBe(false);

    });

    it('2 checkboxes should be checked on form 1', function() {

      element(by.id(loadForm2)).click();
      browser.waitForAngular();
      var checkboxes = element.all(by.css('div.lf-form-control > label > input[type="checkbox"]'));
      expect(checkboxes.get(0).isSelected()).toBe(true);
      expect(checkboxes.get(1).isSelected()).toBe(true);
      expect(checkboxes.get(2).isSelected()).toBe(false);

      // and the question code is displayed
      var code = element(by.css('a[href="http://s.details.loinc.org/LOINC/54126-8.html"]'));
      expect(code.isDisplayed()).toBe(true);
    });

    it('1 checkbox should be checked on form 1', function() {
      element(by.id(loadForm1)).click();
      browser.waitForAngular();
      var checkboxes = element.all(by.css('div.lf-form-control > label > input[type="checkbox"]'));
      expect(checkboxes.get(0).isSelected()).toBe(true);
      expect(checkboxes.get(1).isSelected()).toBe(false);
      expect(checkboxes.get(2).isSelected()).toBe(false);
      // and the question code is displayed
      var code = element(by.css('a[href="http://s.details.loinc.org/LOINC/54126-8.html"]'));
      expect(code.isDisplayed()).toBe(true);
    });

    it('changing templateOptions alone should also change the form', function() {
      element(by.id(loadForm3)).click();
      browser.waitForAngular();
      var checkboxes = element(by.css('div.lf-form-control > label > input[type="checkbox"]'));
      // no checkboxes
      expect(checkboxes.isPresent()).toBeFalsy();
      // no obr header
      expect(element(by.id('date_done')).isPresent()).toBe(false);
    });
  });
});

