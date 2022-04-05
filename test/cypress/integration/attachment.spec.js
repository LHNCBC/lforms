import * as util from "../support/util.js";

describe('Attachment support', () => {
  describe('', () => {
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('attachmentQ.json', null, {});
    });

    /**
     *  Removes the first attachment.
     */
    function removeFirstAttachment() {
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('.lf-remove-attachment').click();
      // File input should return
      cy.get('#file-upload\\/1').should('have.attr', 'type', 'file');
    }

    it('should show file inputs in both vertical and horizontal layouts', () => {
      cy.get('#file-upload\\/1').should('have.attr', 'type', 'file');
      cy.get('#file-upload-in-table\\/1\\/1').should('have.attr', 'type', 'file');
    });

    it('should allow attachment of file data without a URL', () => {
      // Note that the test file we are attaching below is the same the file
      // containing the Questionnaire definition for the form (just for
      // convenience).
      cy.get('#file-upload\\/1').uploadFile('test/data/lforms/attachmentQ.json');
      // Confirm the file is replaced by a link
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('a').should('have.text', 'attachmentQ.json');
      // Check the export into FHIR for the value
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).to.equal('attachmentQ.json');
        expect(typeof answer.data).to.equal('string');
        expect(typeof answer.creation).to.equal('string');
        expect(answer.contentType).to.equal('application/json');
      });
    });

    it('should allow removal of an attachment', () => {
      // Assumes an attachment was created above
      removeFirstAttachment();
    });

    it('should not respond to presses of "enter" in unrelated fields', () => {
      // This is a test for the fix for
      // https://github.com/lhncbc/lforms/issues/71
      cy.get('#upload-desc\\/1\\/1').type('{enter}');
      cy.get('.lhc-attachment-url').should('not.exist');
    });

    it('should not allow files over maxSize size', () => {
      // Create a temporary test file
      let testData = '';
      for (var i = 0; i < 5002; ++i) {
        testData += 'z';
      }
      cy.task('createTempFileAndCleanup', {fileName: 'test.txt', content: testData}).then((tempFilePath) => {
        cy.on('window:alert', (str) => {
          expect(str).to.contains('size');
          // The file input should still be there and be blank.
          cy.get('#file-upload\\/1').should('have.value', '');
        });
        cy.get('#file-upload\\/1').uploadFile(tempFilePath);
      });
    });

    it('should only allow permitted mime types', () => {
      // The questionnaire is configured to only allow .json & .txt
      var testData = '';
      for (var i = 0; i < 2; ++i)
        testData += 'z';
      cy.task('createTempFileAndCleanup', {fileName: 'test.zip', content: testData}).then((tempFilePath) => {
        cy.on('window:alert', (str) => {
          expect(str).to.contains('type');
          // The file input should still be there and be blank.
          cy.get('#file-upload\\/1').should('have.value', '');
        });
        cy.get('#file-upload\\/1').uploadFile(tempFilePath);
      });

      // Also try a blank mime type
      cy.task('createTempFileAndCleanup', {fileName: 'test', content: testData}).then((tempFilePath) => {
        cy.on('window:alert', (str) => {
          expect(str).to.contains('type');
          // The file input should still be there and be blank.
          cy.get('#file-upload\\/1').should('have.value', '');
        });
        cy.get('#file-upload\\/1').uploadFile(tempFilePath);
      });
    });

    it('should allow attachment of a URL without file data and without name', () => {
      cy.get('.toggle-attachment-fields').eq(0).click(); // button
      cy.get('input[type=text]').as('inputs').should('have.length', 3);
      cy.get('@inputs').eq(0).type('http://one');
      cy.get('.attach-button').click();
      // Confirm the fields are replaced by a link
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('a').should('have.text', 'http://one')
        .and('have.attr', 'href', 'http://one');
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).to.be.undefined;
        expect(answer.data).to.be.undefined;
        expect(answer.url).to.equal('http://one');
        expect(answer.creation).to.be.undefined;
        expect(answer.contentType).to.be.undefined;
        removeFirstAttachment();
      });
    });

    it('should allow attachment of a URL without file data', () => {
      cy.get('.toggle-attachment-fields').eq(0).click(); // button
      cy.get('input[type=text]').as('inputs').should('have.length', 3);
      cy.get('@inputs').eq(0).type('http://one');
      cy.get('@inputs').eq(1).type('two');
      cy.get('.attach-button').click();
      // Confirm the fields are replaced by a link
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('a').should('have.text', 'two')
        .and('have.attr', 'href', 'http://one');
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).to.equal('two');
        expect(answer.data).to.be.undefined;
        expect(answer.url).to.equal('http://one');
        expect(answer.creation).to.be.undefined;
        expect(answer.contentType).to.be.undefined;
      });
    });

    it('should allow a second attachment, with both a URL and file data', () => {
      cy.get('#add-upload\\/1').click(); // "add another"
      cy.get('.lhc-attachment-button').should('exist');
      cy.get('.toggle-attachment-fields').eq(0).click(); // button
      cy.get('input[type=text]').as('inputs').should('have.length', 3);
      cy.get('@inputs').eq(0).type('http://three');
      cy.get('@inputs').eq(1).type('four');
      cy.get('#file-upload\\/2').uploadFile('test/data/lforms/attachmentQ.json');
      cy.get('.attach-button').click();
      // Confirm the fields are replaced by a link
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('a').as('anchors').should('have.length', 2);
      cy.get('@anchors').eq(1).should('have.text', 'four');
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
        let answer = qr.item[0].answer[1].valueAttachment;
        expect(answer.title).to.equal('four');
        expect(typeof answer.data).to.equal('string');
        expect(answer.url).to.equal('http://three');
        expect(typeof answer.creation).to.equal('string');
        expect(answer.contentType).to.equal('application/json');
      });
    });

    it('should support an attachment in a saved QuestionnaireRepsonse', () => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('attachmentQ.json', null, {});
      // Use the current page to get a QR
      cy.get('#file-upload\\/1').uploadFile('test/data/lforms/attachmentQ.json');
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('a').should('have.text', 'attachmentQ.json');
      cy.readFile(`test/data/lforms/attachmentQ.json`).then((q) => {
        cy.window().then((win) => {
          var lfData_temp = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
          let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, null);
          var lfData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, lfData_temp, 'R4');
          // Open another page where we can use addFormToPage
          cy.visit('test/pages/addFormToPageTest.html');
          // Add the form as the first on the page
          cy.get('#formContainer2').then(() => {
            win.LForms.Util.addFormToPage(lfData, 'formContainer2');
            cy.get('a').should('have.text', 'attachmentQ.json')
              .then(() => {
                const qr2 = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', document.getElementById('formContainer2'));
                let answer = qr2.item[0].answer[0].valueAttachment;
                expect(answer.title).to.equal('attachmentQ.json');
                expect(typeof answer.data).to.equal('string');
                expect(typeof answer.creation).to.equal('string')
                expect(answer.contentType).to.equal('application/json');
              });
          });
        });
      });
    });

    it('should allow extraction of the attachment item into an Observation', function () {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('attachmentQ.json', null, {});
      // Use the current page to get a QR
      cy.get('#file-upload\\/1').uploadFile('test/data/lforms/attachmentQ.json');
      cy.get('#file-upload\\/1').should('not.exist');
      cy.get('a').should('have.text', 'attachmentQ.json');
      cy.window().then((win) => {
        let fhirData = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, {extract: true});
        expect(Array.isArray(fhirData)).to.equal(true);
        expect(fhirData.length).to.equal(2);
        let answer = fhirData[0].item[0].answer[0].valueAttachment;
        expect(answer.title).to.equal('attachmentQ.json');
        expect(typeof answer.data).to.equal('string');
        expect(typeof answer.creation).to.equal('string')
        expect(answer.contentType).to.equal('application/json');
        answer = fhirData[1].valueAttachment; // answer in the extracted Observation
        expect(answer.title).to.equal('attachmentQ.json');
        expect(typeof answer.data).to.equal('string');
        expect(typeof answer.creation).to.equal('string')
        expect(answer.contentType).to.equal('application/json');
      });
    });
  });
});
