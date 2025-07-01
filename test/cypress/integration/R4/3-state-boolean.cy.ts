import {AddFormToPageTestPage} from "../../support/addFormToPageTest.po";
import * as util from "../../support/util";
const po = new AddFormToPageTestPage();
const answerId = util.answerId;

// Tests of the support for enableWhenExpression on choice, open-choice, and
// string, date, time and integer
describe('3 states boolean type', () => {
  beforeEach(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
  });

  it('should export 3 different values on boolean item', () => {
    util.addFormToPage('enableWhen-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId(answerId('Q1/1/1', 'true')).find('input').should('not.be.checked');
    cy.byId(answerId('Q1/1/1', 'false')).find('input').should('not.be.checked');
    cy.byId(answerId('Q1/1/1', 'null')).find('input').should('be.checked');

    // "Not Answered" is not in QR
    cy.window().then((win) => {
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      expect(qr.item).to.equal(undefined);

      // select "Yes"
      cy.byId(answerId('Q1/1/1', 'true')).find('input').click();
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
        expect(qr.item[0].linkId).to.equal('g1');
        expect(qr.item[0].item[0].linkId).to.equal('Q1');
        expect(qr.item[0].item[0].answer[0].valueBoolean).to.equal(true);

        // select "No"
        cy.byId(answerId('Q1/1/1', 'false')).find('input').click();
        cy.window().then((win) => {
          let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
          expect(qr.item[0].linkId).to.equal('g1');
          expect(qr.item[0].item[0].linkId).to.equal('Q1');
          expect(qr.item[0].item[0].answer[0].valueBoolean).to.equal(false);

          // select "Not Answered" again
          cy.byId(answerId('Q1/1/1', 'null')).find('input').click();
          cy.window().then((win) => {
            let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
            expect(qr.item).to.equal(undefined);
          });
        });
      });
    });
  });

  it('should set the boolean values correctly when loading data from QuestionnaireResponse', () => {
    util.addFormToPage('enableWhen-test.R4.json', null, {fhirVersion: 'R4'});
    // select "Yes"
    cy.byId(answerId('Q1/1/1', 'true')).find('input').click();
    cy.window().then((win) => {
      let q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");

      // merged qr where boolean item has a value of true
      let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
      win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
      cy.get('.lhc-form-title').contains('Questionnaire for enableWhen Tests');
      cy.byId(answerId('Q1/1/1', 'true')).find('input').should('be.checked');
      cy.byId(answerId('Q1/1/1', 'false')).find('input').should('not.be.checked');
      cy.byId(answerId('Q1/1/1', 'null')).find('input').should('not.be.checked');
    });

    // select "No"
    cy.byId(answerId('Q1/1/1', 'false')).find('input').click();
    cy.window().then((win) => {
      let q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");

      // merged qr where boolean item has a value of false
      let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
      win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
      cy.get('.lhc-form-title').contains('Questionnaire for enableWhen Tests');
      cy.byId(answerId('Q1/1/1', 'true')).find('input').should('not.be.checked');
      cy.byId(answerId('Q1/1/1', 'false')).find('input').should('be.checked');
      cy.byId(answerId('Q1/1/1', 'null')).find('input').should('not.be.checked');
    });

  });


});

