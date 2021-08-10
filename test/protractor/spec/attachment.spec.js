var tp = require('./lforms_testpage.po.js');
var testUtil = require('./util.js');
var EC = protractor.ExpectedConditions;

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
      browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
      $('.lf-remove-attachment').click(); // remove button
      // File input should return
      expect($('#file-upload\\/1').getAttribute('type')).toBe('file');
    }


    it('should show file inputs in both vertical and horizontal layouts', ()=>{
      // Waits for the element with id 'abc' to be present on the dom.
      expect($('#file-upload\\/1').getAttribute('type')).toBe('file');
      expect($('#file-upload-in-table\\/1\\/1').getAttribute('type')).toBe('file');
    });


    it('should allow attachment of file data without a URL', ()=>{
      // Note that the test file we are attaching below is the same the file
      // containing the Questionnaire definition for the form (just for
      // convenience).
      let testFile = tp.getTestDataPathName('attachmentQ.json');
      testUtil.sendKeys($('#file-upload\\/1'), testFile);
      // Confirm the file is replaced by a link
      browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
      expect($('a').getText()).toBe('attachmentQ.json');
      // Check the export into FHIR for the value
      tp.getQuestionnaireResponse().then((qr)=>{
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


    it('should not allow files over maxSize size', ()=>{
      // Create a temporary test file
      var testData = '';
      for (var i=0; i<5002; ++i)
        testData += 'z';
      var pathName = testUtil.createTempFile('test.txt', testData);
      testUtil.sendKeys($('#file-upload\\/1'), pathName);
      browser.wait(EC.alertIsPresent(), 5000);
      var alert = browser.switchTo().alert();
      alert.getText().then((msg)=>{
        expect(msg.indexOf('size')).not.toBe(-1);
      });
      alert.dismiss();
      // The file input should still be there and be blank.
      expect($('#file-upload\\/1').getAttribute('value')).toBe('');
    });


    it('should only allow permitted mime types', ()=> {
      // The questionnaire is configured to only allow .json & .txt
      var testData = '';
      for (var i=0; i<2; ++i)
        testData += 'z';
      var pathName = testUtil.createTempFile('test.zip', testData);
      testUtil.sendKeys($('#file-upload\\/1'), pathName);
      browser.wait(EC.alertIsPresent(), 5000);
      var alert = browser.switchTo().alert();
      alert.getText().then((msg)=>{
        expect(msg.indexOf('type')).not.toBe(-1);
      });
      alert.dismiss();
      // The file input should still be there and be blank.
      expect($('#file-upload\\/1').getAttribute('value')).toBe('');

      // Also try a blank mime type
      pathName = testUtil.createTempFile('test', testData);
      testUtil.sendKeys($('#file-upload\\/1'), pathName);
      alert = browser.switchTo().alert();
      alert.getText().then((msg)=>{
        expect(msg.indexOf('type')).not.toBe(-1);
      });
      alert.dismiss();
      // The file input should still be there and be blank.
      expect($('#file-upload\\/1').getAttribute('value')).toBe('');
    });


    it('should allow attachment of a URL without file data and without name', ()=>{
      $('.toggle-attachment-fields').click(); // button
      let newFields = $$('input[type=string]')
      expect(newFields.count()).toBe(2);
      let urlField = newFields.get(0);
      let nameField = newFields.get(1);
      testUtil.sendKeys(urlField, 'http://one');
      $('.attach-button').click();
      // Confirm the fields are replaced by a link
      browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
      expect($('a').getText()).toBe('http://one');
      // Check the href for a URL attachment.  At least on Firefox, the href for
      // a hostname will have a trailing /.
      expect($('a').getAttribute('href')).toBe('http://one/');
      // Check the export into FHIR of the value
      tp.getQuestionnaireResponse().then((qr)=>{
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
      $('.toggle-attachment-fields').click(); // button
      let newFields = $$('input[type=string]')
      expect(newFields.count()).toBe(2);
      let urlField = newFields.get(0);
      let nameField = newFields.get(1);
      testUtil.sendKeys(urlField, 'http://one');
      testUtil.sendKeys(nameField, 'two');
      $('.attach-button').click();
      // Confirm the fields are replaced by a link
      browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
      expect($('a').getText()).toBe('two');
      // Check the href for a URL attachment.  At least on Firefox, the href for
      // a hostname will have a trailing /.
      expect($('a').getAttribute('href')).toBe('http://one/');
      // Check the export into FHIR of the value
      tp.getQuestionnaireResponse().then((qr)=>{
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).toBe('two');
        expect(answer.data).toBeUndefined();
        expect(answer.url).toBe('http://one');
        expect(answer.creation).toBeUndefined()
        expect(answer.contentType).toBeUndefined();
      });
    });


    it('should allow a second attachment, with both a URL and file data', ()=>{
      $('#add-upload\\/1').click(); // "add another"
      browser.wait(EC.presenceOf($('.lf-attachment-button')), 5000);
      $('.toggle-attachment-fields').click(); // button
      let newFields = $$('input[type=string]')
      expect(newFields.count()).toBe(2);
      let urlField = newFields.get(0);
      let nameField = newFields.get(1);
      testUtil.sendKeys(urlField, 'http://three');
      testUtil.sendKeys(nameField, 'four');
      let testFile = tp.getTestDataPathName('attachmentQ.json');
      testUtil.sendKeys($('#file-upload\\/2'), testFile);
      $('.attach-button').click();
      // Confirm the fields are replaced by a link
      browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
      let uploadLinks = $$('a');
      expect(uploadLinks.count()).toBe(2);
      expect($$('a').get(1).getText()).toBe('four');
      // Check the export into FHIR for the value
      tp.getQuestionnaireResponse().then((qr)=>{
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
    testUtil.sendKeys($('#file-upload\\/1'), testFile);
    // Confirm the file is replaced by a link
    browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
    expect($('a').getText()).toBe('attachmentQ.json');
    // Get the QuestionnaireResponse
    tp.getQuestionnaireResponse().then((qr)=>{
      var q = require(testFile); // read the Questionnaire
      browser.executeScript(
       "var lfData = LForms.Util.convertFHIRQuestionnaireToLForms(arguments[0], 'R4');"+
       "return LForms.Util.mergeFHIRDataIntoLForms('QuestionnaireResponse', arguments[1], lfData, 'R4')",
       q, qr).then((lfData)=>{
        // Open another page where we can use addFormToPage
        tp.openTestPage('/test/addFormToPageTest.html');
        // Add the form as the first on the page
        browser.executeScript("LForms.Util.addFormToPage(arguments[0], 'formContainer2')", lfData);
        expect($('a').getText()).toBe('attachmentQ.json');
        // Check the export into FHIR for the value
        browser.executeScript(
         "return LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', '#formContainer2')").then((qr2)=>{
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
    testUtil.sendKeys($('#file-upload\\/1'), testFile);
    // Confirm the file is replaced by a link
    browser.wait(EC.not(EC.presenceOf($('#file-upload\\/1'))), 5000);
    expect($('a').getText()).toBe('attachmentQ.json');
    // Get the QuestionnaireResponse
    tp.getQuestionnaireResponse({extract:true}).then((fhirData)=>{
      expect(Array.isArray(fhirData)).toBe(true);
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
