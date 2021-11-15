import { TestPage } from './lforms_testpage.po';
import TestUtil from './util';
import { element, by, ExpectedConditions, browser, protractor } from 'protractor';

const tp = new TestPage();

describe('Attachment support', ()=>{
  describe('', ()=>{ // series of tests that run together using same beforeAll
    beforeAll(()=>{
      tp.openBaseTestPage();
      tp.loadFromTestData('attachmentQ.json');
    });

    /**
     *  Removes the first attachment.
     */
    function removeFirstAttachment() {
      browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
      element(by.css('.lf-remove-attachment')).click(); // remove button
      // File input should return
      expect(element(by.id('file-upload/1')).getAttribute('type')).toBe('file');
    }


    it('should show file inputs in both vertical and horizontal layouts', ()=>{
      // Waits for the element with id 'abc' to be present on the dom.
      expect(element(by.id('file-upload/1')).getAttribute('type')).toBe('file');
      expect(element(by.id('file-upload-in-table/1/1')).getAttribute('type')).toBe('file');
    });


    it('should allow attachment of file data without a URL', ()=>{
      // Note that the test file we are attaching below is the same the file
      // containing the Questionnaire definition for the form (just for
      // convenience).
      let testFile = tp.getTestDataPathName('attachmentQ.json');
      TestUtil.sendKeys(element(by.id('file-upload/1')), testFile);
      // Confirm the file is replaced by a link
      browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
      expect(element(by.tagName('a')).getText()).toBe('attachmentQ.json');
      // Check the export into FHIR for the value
      tp.getQuestionnaireResponse(null).then((qr)=>{
        // @ts-ignore
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).toBe('attachmentQ.json');
        expect(typeof answer.data).toBe('string');
        expect(typeof answer.creation).toBe('string')
        expect(answer.contentType).toBe('application/json');
      });
    });


    it('should allow removal of an attachment', ()=>{
      // Assumes an attachment was created above
      removeFirstAttachment();
    });


    it('should not respond to presses of "enter" in unrelated fields', ()=>{
      // This is a test for the fix for
      // https://github.com/lhncbc/lforms/issues/71
      element(by.id('upload-desc/1/1')).sendKeys(protractor.Key.ENTER);
      browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css('.lf-attachment-url')))), 5000);
    });


    it('should not allow files over maxSize size', ()=>{
      // Create a temporary test file
      var testData = '';
      for (var i=0; i<5002; ++i)
        testData += 'z';
      var pathName = TestUtil.createTempFile('test.txt', testData);
      TestUtil.sendKeys(element(by.id('file-upload/1')), pathName);
      browser.wait(ExpectedConditions.alertIsPresent(), 5000);
      var alert = browser.switchTo().alert();
      alert.getText().then((msg)=>{
        expect(msg.indexOf('size')).not.toBe(-1);
      });
      alert.dismiss();
      // The file input should still be there and be blank.
      expect(element(by.id('file-upload/1')).getAttribute('value')).toBe('');
    });


    it('should only allow permitted mime types', ()=> {
      // The questionnaire is configured to only allow .json & .txt
      var testData = '';
      for (var i=0; i<2; ++i)
        testData += 'z';
      var pathName = TestUtil.createTempFile('test.zip', testData);
      TestUtil.sendKeys(element(by.id('file-upload/1')), pathName);
      browser.wait(ExpectedConditions.alertIsPresent(), 5000);
      var alert = browser.switchTo().alert();
      alert.getText().then((msg)=>{
        expect(msg.indexOf('type')).not.toBe(-1);
      });
      alert.dismiss();
      // The file input should still be there and be blank.
      expect(element(by.id('file-upload/1')).getAttribute('value')).toBe('');

      // Also try a blank mime type
      pathName = TestUtil.createTempFile('test', testData);
      TestUtil.sendKeys(element(by.id('file-upload/1')), pathName);
      alert = browser.switchTo().alert();
      alert.getText().then((msg)=>{
        expect(msg.indexOf('type')).not.toBe(-1);
      });
      alert.dismiss();
      // The file input should still be there and be blank.
      expect(element(by.id('file-upload/1')).getAttribute('value')).toBe('');
    });


    it('should allow attachment of a URL without file data and without name', ()=>{
      element(by.css('.toggle-attachment-fields')).click(); // button
      let newFields = element.all(by.css('input[type=text]'));
      // One already existing element below
      expect(newFields.count()).toBe(3);
      let urlField = newFields.get(0);
      let nameField = newFields.get(1);
      TestUtil.sendKeys(urlField, 'http://one');
      element(by.css('.attach-button')).click();
      // Confirm the fields are replaced by a link
      browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
      expect(element(by.tagName('a')).getText()).toBe('http://one');
      // Check the href for a URL attachment.  At least on Firefox, the href for
      // a hostname will have a trailing /.
      expect(element(by.tagName('a')).getAttribute('href')).toBe('http://one/');
      // Check the export into FHIR of the value
      tp.getQuestionnaireResponse(null).then((qr)=>{
        //@ts-ignore
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).toBeUndefined();
        expect(answer.data).toBeUndefined();
        expect(answer.url).toBe('http://one');
        expect(answer.creation).toBeUndefined()
        expect(answer.contentType).toBeUndefined();
      });
      removeFirstAttachment();
    });


    it('should allow attachment of a URL without file data', ()=>{
      element(by.css('.toggle-attachment-fields')).click(); // button
      let newFields = element.all(by.css('input[type=text]'));
      // One already existing element below
      expect(newFields.count()).toBe(3);
      let urlField = newFields.get(0);
      let nameField = newFields.get(1);
      TestUtil.sendKeys(urlField, 'http://one');
      TestUtil.sendKeys(nameField, 'two');
      element(by.css('.attach-button')).click();
      // Confirm the fields are replaced by a link
      browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
      expect(element(by.tagName('a')).getText()).toBe('two');
      // Check the href for a URL attachment.  At least on Firefox, the href for
      // a hostname will have a trailing /.
      expect(element(by.tagName('a')).getAttribute('href')).toBe('http://one/');
      // Check the export into FHIR of the value
      tp.getQuestionnaireResponse(null).then((qr)=>{
        //@ts-ignore
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).toBe('two');
        expect(answer.data).toBeUndefined();
        expect(answer.url).toBe('http://one');
        expect(answer.creation).toBeUndefined()
        expect(answer.contentType).toBeUndefined();
      });
    });


    it('should allow a second attachment, with both a URL and file data', ()=>{
      element(by.id('add-upload/1')).click(); // "add another"
      browser.wait(ExpectedConditions.presenceOf(element(by.css('.lf-attachment-button'))), 5000);
      element(by.css('.toggle-attachment-fields')).click(); // button
      let newFields = element.all(by.css('input[type=text]'));
      // One already existing element below
      expect(newFields.count()).toBe(3);
      let urlField = newFields.get(0);
      let nameField = newFields.get(1);
      TestUtil.sendKeys(urlField, 'http://three');
      TestUtil.sendKeys(nameField, 'four');
      let testFile = tp.getTestDataPathName('attachmentQ.json');
      TestUtil.sendKeys(element(by.id('file-upload/2')), testFile);
      element(by.css('.attach-button')).click();
      // Confirm the fields are replaced by a link
      browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
      let uploadLinks = element.all(by.tagName('a'));
      expect(uploadLinks.count()).toBe(2);
      expect(uploadLinks.get(1).getText()).toBe('four');
      // Check the export into FHIR for the value
      tp.getQuestionnaireResponse(null).then((qr)=>{
        //@ts-ignore
        let answer = qr.item[0].answer[1].valueAttachment;
        expect(answer.title).toBe('four');
        expect(typeof answer.data).toBe('string');
        expect(answer.url).toBe('http://three');
        expect(typeof answer.creation).toBe('string')
        expect(answer.contentType).toBe('application/json');
      });
    });
  });


  it('should support an attachment in a saved QuestionnaireRepsonse', ()=>{
    tp.openBaseTestPage();
    tp.loadFromTestData('attachmentQ.json');
    // Use the current page to get a QR
    let testFile = tp.getTestDataPathName('attachmentQ.json');
    TestUtil.sendKeys(element(by.id('file-upload/1')), testFile);
    // Confirm the file is replaced by a link
    browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
    expect(element(by.tagName('a')).getText()).toBe('attachmentQ.json');
    // Get the QuestionnaireResponse
    tp.getQuestionnaireResponse(null).then((qr)=>{
      var q = require(testFile); // read the Questionnaire
      browser.executeScript(
       "var lfData = LForms.Util.convertFHIRQuestionnaireToLForms(arguments[0], 'R4');"+
       "return LForms.Util.mergeFHIRDataIntoLForms('QuestionnaireResponse', arguments[1], lfData, 'R4')",
       q, qr).then((lfData)=>{
        // Open another page where we can use addFormToPage
        tp.openTestPage('/test/addFormToPageTest.html');
        // Add the form as the first on the page
        browser.executeScript("LForms.Util.addFormToPage(arguments[0], 'formContainer2')", lfData);
        expect(element(by.tagName('a')).getText()).toBe('attachmentQ.json');
        // // Check the export into FHIR for the value
        browser.executeScript(
         "return LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', document.getElementById('formContainer2'))").then((qr2)=>{
          //@ts-ignore
          let answer = qr2.item[0].answer[0].valueAttachment;
          expect(answer.title).toBe('attachmentQ.json');
          expect(typeof answer.data).toBe('string');
          expect(typeof answer.creation).toBe('string')
          expect(answer.contentType).toBe('application/json');
        });
      });
    });
  });


  it('should allow extraction of the attachment item into an Observation', function() {
    tp.openBaseTestPage();
    tp.loadFromTestData('attachmentQ.json');
    // Use the current page to get a QR
    let testFile = tp.getTestDataPathName('attachmentQ.json');
    TestUtil.sendKeys(element(by.id('file-upload/1')), testFile);
    // Confirm the file is replaced by a link
    browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('file-upload/1')))), 5000);
    expect(element(by.tagName('a')).getText()).toBe('attachmentQ.json');
    // Get the QuestionnaireResponse
    tp.getQuestionnaireResponse({extract:true}).then((fhirData)=>{
      expect(Array.isArray(fhirData)).toBe(true);
      //@ts-ignore
      expect(fhirData.length).toBe(2);
      let answer = fhirData[0].item[0].answer[0].valueAttachment;
      expect(answer.title).toBe('attachmentQ.json');
      expect(typeof answer.data).toBe('string');
      expect(typeof answer.creation).toBe('string')
      expect(answer.contentType).toBe('application/json');
      answer = fhirData[1].valueAttachment; // answer in the extracted Observation
      expect(answer.title).toBe('attachmentQ.json');
      expect(typeof answer.data).toBe('string');
      expect(typeof answer.creation).toBe('string')
      expect(answer.contentType).toBe('application/json');
    });
  });

});
