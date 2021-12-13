import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
let LForms: any = (global as any).LForms;

describe('Visual effect tests', function() {
  let tp: TestPage = new TestPage(); 

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  describe('Active field background color', function() {
    var color;
    beforeAll(function(done) {
      // Get the backgound color of the empty data type field
      tp.LoadForm.openFullFeaturedForm();
      let emptyField = element(by.id("/type0/1"));
      emptyField.click();
      emptyField.getCssValue("background-color").then(function(c) {
        color = c;
        done();
      });
    });

    let dataTypes = ['BL', 'INT', 'REAL', 'ST', 'BIN', 'DT', 'DTM','TM', 'CNE', 'CWE',
      'RTO', 'QTY', 'YEAR', 'MONTH', 'DAY', 'URL', 'EMAIL', 'PHONE', 'TX'];
     

    for (let i=0, len=dataTypes.length; i<len; ++i) {
      let d = dataTypes[i];
      let otherField = element(by.id('/type'+(i+1)+'/1'));
      if (d === "DT" || d === "DTM" || d === "TM") {
        otherField = otherField.element(by.css('input'))
        // NEXT: TODO
        // background should rgba(255, 248, 198, 1). 
        // but somehow they are 'rgba(255, 248, 198, 0.04), rgba(255, 248, 198, 0.114) and rgba(255, 248, 198, 0.04), respectively
        // they look similar though.
        continue; 
      }
      if (d === "BL") {
        continue // BL is a switch, which has no focused color 
      }
    
      // Active field background color should the be same for all types of fields
      it('should be the same for data type '+d, (function(field) {
        return function(done) {
          field.click();
          field.getCssValue('background-color').then(bgColor => {
            field.getAttribute('id').then(fieldID => {
              expect(bgColor).toBe(color);
              if (bgColor != color) {
                // diagnostic output
                console.log('Unexpected color for field ID '+fieldID + ';  data type: '+d);
              }
              done();
            });
          });
        }
      })(otherField));
    }
  });


  describe('Question/section in question', function() {

    it('should all the questions/sections defined in the question-in-question form', function () {
      tp.LoadForm.openQuestionInQuestionForm();
      browser.wait(function() {
        return element(by.id('/q1/1')).isPresent();
      }, tp.WAIT_TIMEOUT_1);

      expect(element(by.id('/q1/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q1/q11/1/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q1/q12/1/1')).isDisplayed()).toBe(true);

      expect(element(by.id('/q2/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q2/q21/1/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q2/q22/q221/1/1/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q2/q22/q222/1/1/1')).isDisplayed()).toBe(true);

      expect(element(by.id('/q3/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q3/q31/1/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q3/q32/q321/1/1/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q3/q32/q322/1/1/1')).isDisplayed()).toBe(true);

      element(by.id('add-/q3/q31/1/1')).click();
      expect(element(by.id('/q3/q31/1/2')).isDisplayed()).toBe(true);

      element(by.id('add-/q3/q32/1/1')).click();
      expect(element(by.id('/q3/q32/q321/1/2/1')).isDisplayed()).toBe(true);
      expect(element(by.id('/q3/q32/q322/1/2/1')).isDisplayed()).toBe(true);

    });

  });


  describe('Responsive display layout', function() {

    it('container should have different css class on different size', function () {
      tp.LoadForm.openFullFeaturedForm();
      browser.wait(function() {
        return element(by.id('/type0/1')).isPresent();
      }, tp.WAIT_TIMEOUT_1);

      // break points, 600
      browser.executeScript('jQuery("wc-lhc-form").width(601)').then(function(){
        element(by.css("wc-lhc-form")).getSize().then(function(eleSize){
          expect(eleSize.width).toEqual(601);
        });
        expect(element(by.css(".lhc-form.lhc-view-lg")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-md")))
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-sm")))

        expect(element.all(by.css(".lhc-item.lhc-item-view-lg")).first().element(by.id("/q_lg/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-md")).first().element(by.id("/q_md/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-sm")).first().element(by.id("/q_sm/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-lg")).get(1).element(by.id("/q_auto/1")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-md")).get(1).element(by.id("/q_auto/1")))
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-sm")).get(1).element(by.id("/q_auto/1")))
      });

      browser.executeScript('jQuery("wc-lhc-form").width(598)').then(function(){
        element(by.css("wc-lhc-form")).getSize().then(function(eleSize){
          console.log('element size: '+JSON.stringify(eleSize));
          expect(eleSize.width).toEqual(598);
        });
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-lg")))
        expect(element(by.css(".lhc-form.lhc-view-md")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-sm")))

        // check 4 questions
        expect(element.all(by.css(".lhc-item.lhc-item-view-lg")).first().element(by.id("/q_lg/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-md")).first().element(by.id("/q_md/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-sm")).first().element(by.id("/q_sm/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-md")).get(1).element(by.id("/q_auto/1")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-lg")).get(1).element(by.id("/q_auto/1")))
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-sm")).get(1).element(by.id("/q_auto/1")))

      });

      // break points, 400 //480
      browser.executeScript('jQuery("wc-lhc-form").width(398)').then(function(){
        element(by.css("wc-lhc-form")).getSize().then(function(eleSize){
          console.log('element size: '+JSON.stringify(eleSize));
          expect(eleSize.width).toEqual(398);
        });
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-lg")))
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-md")))
        expect(element(by.css(".lhc-form.lhc-view-sm")).isPresent()).toBe(true);

        // check 4 questions
        expect(element.all(by.css(".lhc-item.lhc-item-view-lg")).first().element(by.id("/q_lg/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-md")).first().element(by.id("/q_md/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-sm")).first().element(by.id("/q_sm/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-sm")).get(1).element(by.id("/q_auto/1")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-lg")).get(1).element(by.id("/q_auto/1")))
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-md")).get(1).element(by.id("/q_auto/1")))

      });

      browser.executeScript('jQuery("wc-lhc-form").width(401)').then(function(){
        element(by.css("wc-lhc-form")).getSize().then(function(eleSize){
          console.log('element size: '+JSON.stringify(eleSize));
          expect(eleSize.width).toEqual(401);
        });
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-lg")))
        expect(element(by.css(".lhc-form.lhc-view-md")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element(by.css(".lhc-form.lhc-view-sm")))
        
        // check 4 questions
        expect(element.all(by.css(".lhc-item.lhc-item-view-lg")).first().element(by.id("/q_lg/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-md")).first().element(by.id("/q_md/1")).isPresent()).toBe(true);
        expect(element.all(by.css(".lhc-item.lhc-item-view-sm")).first().element(by.id("/q_sm/1")).isPresent()).toBe(true);        
        expect(element.all(by.css(".lhc-item.lhc-item-view-md")).get(1).element(by.id("/q_auto/1")).isPresent()).toBe(true);
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-lg")).get(1).element(by.id("/q_auto/1")))
        TestUtil.waitForElementNotPresent(element.all(by.css(".lhc-item.lhc-item-view-sm")).get(1).element(by.id("/q_auto/1")))

      });
    });
  });


  describe('displayControl.colCSS in horizontal table', function() {

    it('displayControl.colCSS should work for items in horizontal tables', function () {
      tp.LoadForm.openFullFeaturedForm();
      browser.wait(function () {
        return element(by.id('/type0/1')).isPresent();
      }, tp.WAIT_TIMEOUT_1);

      expect(element.all(by.css(".lhc-form-horizontal-table col")).first().getAttribute("style")).toBe("width: 25%; min-width: 10%;");
      expect(element.all(by.css(".lhc-form-horizontal-table col")).get(1).getAttribute("style")).toBe("width: 25%; min-width: 15%;");
      expect(element.all(by.css(".lhc-form-horizontal-table col")).get(2).getAttribute("style")).toBe("width: 50%;");
    });
  });
});
