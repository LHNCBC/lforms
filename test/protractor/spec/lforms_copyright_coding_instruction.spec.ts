import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

let tp: TestPage; 
let LForms: any = (global as any).LForms;

describe('popover buttons', function() {

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
  });

  // copyright
  describe('Copyright popover message', function() {

    var copyrightForm = element(by.id('copyright-content-all-in-one')),
    copyrightItem = element(by.id('copyright-content-/type0/1'));

    it('should show a copyright popover message on the form title', function () {
      tp.LoadForm.openFullFeaturedForm();
      TestUtil.waitForElementPresent(element(by.id('/type0/1')))
      element(by.id("copyright-button-all-in-one")).click();
      TestUtil.waitForElementPresent(copyrightForm);
      expect(copyrightForm.getText()).toBe("A Copyright notice of the form");
    });

    it('should show a copyright popover message on an item', function () {
      element(by.id("/type0/1")).click();
      TestUtil.waitForElementNotPresent(copyrightForm)
      element(by.id("copyright-button-/type0/1")).click();
      TestUtil.waitForElementPresent(copyrightItem)
      expect(copyrightItem.getText()).toBe("A Copyright notice of the item");
    });
  });

  // coding instructions
  describe('coding instructions help message', function() {

    var popoverHTMLLink1 = element(by.css('a[href="http://lforms-demo1.nlm.nih.gov"]'));
    var popoverHTMLLink2 = element(by.css('a[href="http://lforms-demo2.nlm.nih.gov"]'));
    var popoverHTMLLink3 = element(by.css('a[href="http://lforms-demo3.nlm.nih.gov"]'));

    var inline1 = element(by.id('help-/type1/1'))
    var inline2 = element(by.id('help-/type2/1'))
    var inline3 = element(by.id('help-/type3/1'))
    

    var inlineHTMLLink1 = inline1.element(by.css('a[href="http://lforms-demo1.nlm.nih.gov"]'));
    var inlineHTMLLink2 = inline2.element(by.css('a[href="http://lforms-demo2.nlm.nih.gov"]'));
    var inlineHTMLLink3 = inline3.element(by.css('a[href="http://lforms-demo3.nlm.nih.gov"]'));
    var helpButton0 = element(by.id("help-button-/type0/1")); // text formatted content, no 'codingInstructionsFormat'
    var helpButton1 = element(by.id("help-button-/type1/1")); // html formatted content, no 'codingInstructionsFormat'
    var helpButton2 = element(by.id("help-button-/type2/1")); // html formatted content, 'codingInstructionsFormat' is 'text'
    var helpButton3 = element(by.id("help-button-/type3/1")); // html formatted content, 'codingInstructionsFormat' is 'html'

    var helpPopover0 = element(by.id('help-content-/type0/1'));
    var helpPopover1 = element(by.id('help-content-/type1/1'));
    var helpPopover2 = element(by.id('help-content-/type2/1'));
    var helpPopover3 = element(by.id('help-content-/type3/1'));

    var field1 = element(by.id("/q_lg/1"));

    beforeAll(function() {
      tp.LoadForm.openFullFeaturedForm();
    });


    it('should have HTML and/or TEXT content when templateOptions.allowHTMLInInstructions is true', async function () {
      // popover
      expect(helpButton0.isDisplayed()).toBe(true);
      expect(helpButton1.isDisplayed()).toBe(true);
      expect(helpButton2.isDisplayed()).toBe(true);
      expect(helpButton3.isDisplayed()).toBe(true);

      helpButton0.click();
      TestUtil.waitForElementDisplayed(helpPopover0);
      expect(helpPopover0.isDisplayed()).toBe(true);
      expect(helpPopover0.getText()).toBe( "simple text instructions");

      field1.click();
      TestUtil.waitForElementNotPresent(helpPopover0);

      helpButton1.click();
      TestUtil.waitForElementDisplayed(helpPopover1);
      expect(helpPopover1.isDisplayed()).toBe(true);
      TestUtil.waitForElementNotPresent(popoverHTMLLink1)
      expect(helpPopover1.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo1.nlm.nih.gov'>LForms Demo 1</a>");

      field1.click();
      TestUtil.waitForElementNotPresent(helpPopover1)
      helpButton2.click();
      TestUtil.waitForElementDisplayed(helpPopover2);
      expect(helpPopover2.isDisplayed()).toBe(true);
      TestUtil.waitForElementNotPresent(popoverHTMLLink2)
      expect(helpPopover2.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo2.nlm.nih.gov'>LForms Demo 2</a>");

      field1.click();
      TestUtil.waitForElementNotPresent(helpPopover2);
      helpButton3.click();
      TestUtil.waitForElementDisplayed(helpPopover3);
      expect(helpPopover3.isDisplayed()).toBe(true);

      
      popoverHTMLLink3 = helpPopover3.element(by.css('a[href="http://lforms-demo3.nlm.nih.gov"]'));
      TestUtil.waitForElementDisplayed(popoverHTMLLink3); 
      expect(await popoverHTMLLink3.isDisplayed()).toBe(true); 

      // inline
      browser.driver.executeAsyncScript(function () {
        let testForm: any = document.getElementById('test-form');
        testForm.lfOptions = {showCodingInstruction: true}
        var callback = arguments[arguments.length - 1];        
        callback();
      }).then(async function () {
        expect(inline1.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(inlineHTMLLink1);

        expect(inline2.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(inlineHTMLLink2);
  
        expect(inline3.isDisplayed()).toBe(true);

        let link = element(by.id('help-/type3/1')).element(by.css('a'))
        TestUtil.waitForElementDisplayed(link);
        expect(link.getAttribute('href')).toBe("http://lforms-demo3.nlm.nih.gov/")
        expect(inlineHTMLLink3.isDisplayed()).toBe(true);
        });

    });

    it('should have only escaped TEXT content when templateOptions.allowHTMLInInstructions is false', function () {

      tp.LoadForm.openFullFeaturedForm();

      element(by.id("change-option")).click();

      // popover
      expect(helpButton0.isDisplayed()).toBe(true);
      expect(helpButton1.isDisplayed()).toBe(true);
      expect(helpButton2.isDisplayed()).toBe(true);
      expect(helpButton3.isDisplayed()).toBe(true);

      helpButton0.click();
      TestUtil.waitForElementDisplayed(helpPopover0);
      expect(helpPopover0.isDisplayed()).toBe(true);
      expect(helpPopover0.getText()).toBe( "simple text instructions");

      field1.click();
      TestUtil.waitForElementNotPresent(helpPopover0);
      helpButton1.click();
      TestUtil.waitForElementDisplayed(helpPopover1);
      expect(helpPopover1.isDisplayed()).toBe(true);
      TestUtil.waitForElementNotPresent(inlineHTMLLink1);
      expect(helpPopover1.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo1.nlm.nih.gov'>LForms Demo 1</a>");

      field1.click();
      TestUtil.waitForElementNotPresent(helpPopover1);
      helpButton2.click();
      TestUtil.waitForElementDisplayed(helpPopover2);
      expect(helpPopover2.isDisplayed()).toBe(true);
      TestUtil.waitForElementNotPresent(inlineHTMLLink2);
      expect(helpPopover2.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo2.nlm.nih.gov'>LForms Demo 2</a>");

      field1.click();
      TestUtil.waitForElementNotPresent(helpPopover2);
      helpButton3.click();
      TestUtil.waitForElementDisplayed(helpPopover3);
      expect(helpPopover3.isDisplayed()).toBe(true);
      expect(helpPopover3.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo3.nlm.nih.gov'>LForms Demo 3</a>");

      // inline
      browser.driver.executeAsyncScript(function () {
        let testForm: any = document.getElementById('test-form');
        testForm.lfOptions = {showCodingInstruction: true}
        var callback = arguments[arguments.length - 1];        
        callback();
      }).then(async function () {
        expect(inline1.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(inlineHTMLLink1);
  
        expect(inline2.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(inlineHTMLLink2);
  
        expect(inline3.isDisplayed()).toBe(true);
        TestUtil.waitForElementNotPresent(inlineHTMLLink3);
  
      });
      
    });


    it('should be able to display HTML/Text formatted coding instructions from '+
       'FHIR R4 Questionnaire', function() {
      tp.loadFromTestData('ussg-fhp.json', 'R4');
      browser.driver.executeAsyncScript(function () {
        let testForm: any = document.getElementById('test-form');
        testForm.lfOptions = {allowHTMLInInstructions: true}
        var callback = arguments[arguments.length - 1];        
        callback();
      }).then(async function () {
        var nameHelpButton = element(by.id("help-button-/54126-8/54125-0/1/1"));
        var genderHelpButton = element(by.id("help-button-/54126-8/54131-8/1/1"));
        var gender = element(by.id("/54126-8/54131-8/1/1"));
        var popoverHTMLLink = element(by.css('a[href="http://google.com"]'));
  
        var popover = element(by.css('.help-class-54126-8-54125-0-1-1 .ant-popover-inner-content'));
  
        TestUtil.waitForElementDisplayed(nameHelpButton);
        expect(nameHelpButton.isDisplayed()).toBe(true);
        expect(genderHelpButton.isDisplayed()).toBe(true);
  
        // HTML formatted coding instructions
        nameHelpButton.click();
        TestUtil.waitForElementDisplayed(popover); 
        expect(popover.isDisplayed()).toBe(true);
        var popoverHTMLLink = element(by.css('a[href="http://google.com"]'));
        
        TestUtil.waitForElementDisplayed(popoverHTMLLink);  
        expect(popoverHTMLLink.isDisplayed()).toBe(true); 
  
        gender.click()
        TestUtil.waitForElementNotPresent(popoverHTMLLink);
  
        // Text coding instructions
        genderHelpButton.click();
        popover = element(by.css('.help-class-54126-8-54131-8-1-1 .ant-popover-content')); 
        TestUtil.waitForElementDisplayed(popover);
        expect(popover.isDisplayed()).toBe(true); 
        TestUtil.waitForElementNotPresent(popoverHTMLLink);
  
      });

    });

    function test4PopoverCases(type) {
      let helpButton0, helpButton1, helpButton2, helpButton3, popover0, popover1, popover2, popover3,
      copyrightButton0, copyPopover0;
      switch(type) {
        case 'vertical':
          helpButton0 = element(by.id("help-button-/type0/1")),
          helpButton1 = element(by.id("help-button-/type1/1")),
          helpButton2 = element(by.id("help-button-/type2/1")),
          helpButton3 = element(by.id("help-button-/type3/1")),
          copyrightButton0 = element(by.id("copyright-button-/type0/1")),
          popover0 = element(by.css('.help-class-type0-1 .ant-popover-inner-content')),
          popover1 = element(by.css('.help-class-type1-1 .ant-popover-inner-content')),
          popover2 = element(by.css('.help-class-type2-1 .ant-popover-inner-content')),
          popover3 = element(by.css('.help-class-type3-1 .ant-popover-inner-content')),
          copyPopover0 = element(by.css('.copyright-class-type0-1 .ant-popover-inner-content'));
          
          break;
        case 'horizontal':
          helpButton0 = element(by.id("help-button-/horizontalTable/type0/1/1")),
          helpButton1 = element(by.id("help-button-/horizontalTable/type1/1/1")),
          helpButton2 = element(by.id("help-button-/horizontalTable/type2/1/1")),
          helpButton3 = element(by.id("help-button-/horizontalTable/type3/1/1")),
          copyrightButton0 = element(by.id("copyright-button-/horizontalTable/type0/1/1")),
          
          popover0 = element(by.css(".help-class-horizontalTable-type0-1-1 .ant-popover-inner-content")),
          popover1 = element(by.css(".help-class-horizontalTable-type1-1-1 .ant-popover-inner-content")),
          popover2 = element(by.css(".help-class-horizontalTable-type2-1-1 .ant-popover-inner-content")),
          popover3 = element(by.css(".help-class-horizontalTable-type3-1-1 .ant-popover-inner-content")),
          copyPopover0 = element(by.css('.copyright-class-horizontalTable-type0-1-1 .ant-popover-inner-content'));
          break;
        case 'matrix':
          helpButton0 = element(by.id("help-button-/matrixTable/type0/1/1")),
          helpButton1 = element(by.id("help-button-/matrixTable/type1/1/1")),
          helpButton2 = element(by.id("help-button-/matrixTable/type2/1/1")),
          helpButton3 = element(by.id("help-button-/matrixTable/type3/1/1")),
          copyrightButton0 = element(by.id("copyright-button-/matrixTable/type0/1/1")),
          popover0 = element(by.css(".help-class-matrixTable-type0-1-1 .ant-popover-inner-content")),
          popover1 = element(by.css(".help-class-matrixTable-type1-1-1 .ant-popover-inner-content")),
          popover2 = element(by.css(".help-class-matrixTable-type2-1-1 .ant-popover-inner-content")),
          popover3 = element(by.css(".help-class-matrixTable-type3-1-1 .ant-popover-inner-content")),
          copyPopover0 = element(by.css('.copyright-class-matrixTable-type0-1-1 .ant-popover-inner-content'));
          break;
      }

      tp.loadFromTestData('copyright-help.json');

      let field1 = element(by.id("/type0/1"));

      TestUtil.waitForElementDisplayed(field1);
      expect(helpButton0.isDisplayed()).toBe(true);
      expect(helpButton1.isDisplayed()).toBe(true);
      expect(helpButton2.isDisplayed()).toBe(true);
      expect(helpButton3.isDisplayed()).toBe(true);
      expect(copyrightButton0.isDisplayed()).toBe(true);

      // simple text coding instructions
      helpButton0.click();
      TestUtil.waitForElementDisplayed(popover0); 
      expect(popover0.isDisplayed()).toBe(true);
      expect(popover0.getText()).toBe("simple text instructions");
      
      field1.click()
      TestUtil.waitForElementNotPresent(popover0);

      // escaped HTML coding instructions, when "codingInstructionsFormat" is not set
      helpButton1.click();
      //popover = element(by.css('.ant-popover-inner-content'));
      TestUtil.waitForElementDisplayed(popover1); 
      expect(popover1.isDisplayed()).toBe(true);
      expect(popover1.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo1.nlm.nih.gov'>LForms Demo 1</a>");

      field1.click()
      TestUtil.waitForElementNotPresent(popover1);

      // escaped HTML coding instructions, when "codingInstructionsFormat" = "text",
      helpButton2.click();
      TestUtil.waitForElementDisplayed(popover2); 
      expect(popover2.isDisplayed()).toBe(true);
      expect(popover2.getText()).toBe("<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo2.nlm.nih.gov'>LForms Demo 2</a>");

      field1.click()
      TestUtil.waitForElementNotPresent(popover2);
      // enabled HTML coding instructions, when "codingInstructionsFormat" = "html",
      helpButton3.click();
      TestUtil.waitForElementDisplayed(popover3); 
      expect(popover3.isDisplayed()).toBe(true);
      expect(popover3.getText()).toBe("HTML instructions, with a button and a link LForms Demo 3");
      let link = popover3.element(by.css('a'));
      expect(link.getAttribute("href")).toBe('http://lforms-demo3.nlm.nih.gov/') // "/" added to the end of the url

      field1.click()
      TestUtil.waitForElementNotPresent(popover3);

      //copyright popover
      copyrightButton0.click();
      TestUtil.waitForElementDisplayed(copyPopover0); 
      expect(copyPopover0.isDisplayed()).toBe(true);
      expect(copyPopover0.getText()).toBe("A Copyright notice of the item 1");
      
      field1.click()
      TestUtil.waitForElementNotPresent(copyPopover0);

    }

    it('should be able to display HTML/Text formatted coding instructions and copyright notice in vertical list layout', async function() {
      test4PopoverCases('vertical')
    });
    it('should be able to display HTML/Text formatted coding instructions and copyright notice in horizontal table layout', async function() {
      test4PopoverCases('horizontal')
    });
    it('should be able to display HTML/Text formatted coding instructions and copyright notice in matrix layout', async function() {
      test4PopoverCases('matrix')
    });

  });
});
