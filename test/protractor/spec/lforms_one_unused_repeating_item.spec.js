var util = require('./util');
var tp = require('./lforms_testpage.po.js');
var ff = tp.USSGFHTVertical;
var EC = protractor.ExpectedConditions;

describe('Unused repeating item/section control', function() {

  var namePopover = element(by.css('div[content=\'Please enter info in the blank "Name"\']'));

  describe('on repeating items', function() {

    it('should not add a new one when there is an unused item', function () {
      tp.openUSSGFHTVertical();
      ff.btnName.click();
      expect(namePopover.isDisplayed()).toBe(true);
    });
    it('should add a new one when there is no unused item', function () {
      ff.name.sendKeys("a name");
      ff.btnName.click();
      expect(namePopover.isPresent()).toBe(false);
      // an add event emitted
      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var testData = window._emittedEvent;
        callback(testData);
      }).then(function (tData) {
        expect(tData.event).toBe('LF_EVENT_REPEATING_ITEM_ADDED')
        expect(tData.formId).toBe('54127-6N');
        expect(tData.itemId).toBe('/54126-8/54125-0/1/2');
      });
      ff.btnDelName2.click();
      // a delete event emitted
      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var testData = window._emittedEvent;
        callback(testData);
      }).then(function (tData) {
        expect(tData.event).toBe('LF_EVENT_REPEATING_ITEM_DELETED')
        expect(tData.formId).toBe('54127-6N');
        expect(tData.itemId).toBe('/54126-8/54125-0/1/2');
      });

      ff.btnName.click();

    });
    it('should not add a new one when there is an unused item and an used item', function () {
      ff.btnName2.click();
      expect(namePopover.isDisplayed()).toBe(true);
    });
    it('should not add a new one when a previous used item becomes unused', function () {
      ff.name2.sendKeys("another name");
      ff.name.clear();
      ff.btnName2.click();
      expect(namePopover.isDisplayed()).toBe(true);
    });
  });

  describe('on repeating sections', function() {
    var diseasesPopover = element(by.css('div[content=\'Please enter info in the blank "Your diseases history"\']'));

    it('should not add a new one when all item in the section are empty', function () {
      ff.btnDiseasesHist.click();
      expect(diseasesPopover.isDisplayed()).toBe(true);
    });
    it('should add a new one when at least one item in the section is not empty', function () {
      ff.disease.click();
      ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
      ff.disease.sendKeys(protractor.Key.TAB);
      ff.btnDiseasesHist.click();
      expect(diseasesPopover.isPresent()).toBe(false);
    });

    it('should not add a new one when an used item has been hidden by skip logic', function () {
      ff.ageAtDiag2.click();
      ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
      ff.ageAtDiag2.sendKeys(protractor.Key.TAB);
      expect(ff.mockSubItem2.isDisplayed()).toBe(true);
      ff.mockSubItem2.sendKeys("a value");
      ff.ageAtDiag2.clear();
      expect(ff.mockSubItem2.isPresent()).toBe(false);
      util.clickAddRemoveButton(ff.btnDiseasesHist2);
      expect(diseasesPopover.isDisplayed()).toBe(true);
    });


    it('should not add a new one when the previous non-empty items in the section become empty again', function () {
      ff.disease.clear();
      browser.wait(EC.elementToBeClickable(ff.disease2));
      ff.disease2.click();
      ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
      ff.disease.sendKeys(protractor.Key.TAB);
      ff.btnDiseasesHist2.click();
      expect(diseasesPopover.isDisplayed()).toBe(true);
    });

  });

  describe('repeating section within a repeating section', function() {
    var familyPopover = element(by.css('div[content=\'Please enter info in the blank "Family member health information"\']'));
    var diseHistPopover = element(by.css('div[content=\'Please enter info in the blank "This family member\\\'s history of disease"\']'));

    it("should not add new section if any previous one is empty", function() {
      ff.btnAnotherDiseasesHist.click();
      expect(diseHistPopover.isDisplayed()).toBe(true);
      ff.btnAnotherFamily.click();
      expect(familyPopover.isDisplayed()).toBe(true);
    });

  });
});
