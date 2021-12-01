import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('508', function() {
  let tp: TestPage = new TestPage(); 

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  describe('screen reader log', function() {

    beforeAll(function() {
      tp.LoadForm.openUSSGFHTHorizontal();
      tp.resetReaderLog();
    });

    it('should be empty when the form loads', function() {
      tp.expectReaderLogEntries([]);
    });

    it('should contain an entry when skip logic shows a field', function() {
      TestUtil.sendKeys(tp.heightField, '10');
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10']);
    });

    it('should not add an extra entry if the field is already showing',
       function() {
      TestUtil.sendKeys(tp.heightField, '2');
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10']);
    });

    it('should contain an entry when skip logic hides a field', function() {
      tp.heightField.sendKeys(protractor.Key.BACK_SPACE);
      tp.heightField.sendKeys(protractor.Key.BACK_SPACE);
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10',
         'Hiding Mock-up item: Shown when Height >= 10']);
    });

    it('should not add an extra entry if the field is already hidden',
       function() {
      tp.heightField.sendKeys(protractor.Key.BACK_SPACE);
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10',
         'Hiding Mock-up item: Shown when Height >= 10',
         'Height requires a value']);
    });

    it('should add an entry when a section is added or removed', function () {
      // Reset the reader log
      tp.resetReaderLog();
      tp.expectReaderLogEntries([]);
      // Add a section
      element(by.id('add-/54126-8/54137-5/1/1')).click();  // Add another 'Your Diseases History'
      tp.expectReaderLogEntries(['Added section']);
      // Remove the section
      var minusButtonCSS = "button[title='Remove this \"Your diseases history\"']";
      element.all(by.css(minusButtonCSS)).first().click();
      tp.expectReaderLogEntries(['Added section', 'Removed section']);
    });

    it('should add an entry when a row is added or removed', function () {
      // Reset the reader log
      tp.resetReaderLog();
      tp.expectReaderLogEntries([]);
      // Add a row to the table by clicking the + button.
      TestUtil.safeClick(element(by.id('add-/54114-4/54117-7/1/1')));
      tp.expectReaderLogEntries(['Added row']);
      // Remove the row
      var minusButtonCSS =
        "button[title=\"Remove this row of \\\"This family member's history of disease\\\"\"]";
      var minusButton = element.all(by.css(minusButtonCSS)).first();
      TestUtil.safeClick(minusButton);
      tp.expectReaderLogEntries(['Added row', 'Removed row']);
    });

    it('should add an entry when a question is added or removed', function () {
      // Switch to the first form, which has a repeating question
      tp.LoadForm.openUSSGFHTVertical();
      var addNameButton = element(by.cssContainingText('button',
        'Add another "Name"'));
      browser.wait(function() {
        return addNameButton.isPresent();
      }, tp.WAIT_TIMEOUT_2);
      // Reset the reader log
      tp.resetReaderLog();
      tp.expectReaderLogEntries([]);
      // Add a question
      TestUtil.sendKeys(tp.USSGFHTVertical.name, "a name");
      addNameButton.click();
      tp.expectReaderLogEntries(['Added question']);
      // Remove the question
      element.all(by.css("button[title='Remove this \"Name\"']")).first().click();
      tp.expectReaderLogEntries(['Added question', 'Removed question']);
    });
  });

  /* This section is not about the screen reader log, but about things needed to
   * assist the screen reader.*/
  describe('field labels', function() {
    it('should be present on the questions in the vertical template', function() {
      tp.LoadForm.openUSSGFHTVertical();
      expect(tp.heightLabel.isPresent()).toBeTruthy();
    });
    it('should be present on the questions in the horizontal template', function() {
      tp.LoadForm.openUSSGFHTHorizontal();
      expect(tp.heightLabel.isPresent()).toBeTruthy();
    });
    
  });
});
