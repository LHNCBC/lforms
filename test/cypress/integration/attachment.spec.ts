import * as util from "../support/util.js";
import 'cypress-file-upload';
import {browser, by, element, ExpectedConditions, protractor} from "protractor";
import TestUtil from "../../e2e/spec/util";

describe('Attachment support', ()=>{
  describe('', ()=> {
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

    it('should show file inputs in both vertical and horizontal layouts', ()=>{
      cy.get('#file-upload\\/1').should('have.attr', 'type', 'file');
      cy.get('#file-upload-in-table\\/1\\/1').should('have.attr', 'type', 'file');
    });

    it('should allow attachment of file data without a URL', ()=>{
      // Note that the test file we are attaching below is the same the file
      // containing the Questionnaire definition for the form (just for
      // convenience).
      cy.get('#file-upload\\/1').attachFile('upload-file.json');
      // Confirm the file is replaced by a link
      cy.get('a').should('have.text', 'upload-file.json');
      // Check the export into FHIR for the value
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', null, arguments[0]);
        let answer = qr.item[0].answer[0].valueAttachment;
        expect(answer.title).to.equal('upload-file.json');
        expect(typeof answer.data).to.equal('string');
        expect(typeof answer.creation).to.equal('string')
        expect(answer.contentType).to.equal('application/json');
      });
    });

    it('should allow removal of an attachment', ()=>{
      // Assumes an attachment was created above
      removeFirstAttachment();
    });

    it('should not respond to presses of "enter" in unrelated fields', ()=>{
      // This is a test for the fix for
      // https://github.com/lhncbc/lforms/issues/71
      cy.get('#upload-desc\\/1\\/1').type('{enter}');
      cy.get('.lhc-attachment-url').should('not.exist');
    });
  });
});
