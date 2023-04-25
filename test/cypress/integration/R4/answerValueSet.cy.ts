import { AddFormToPageTestPage } from "../../support/addFormToPageTest.po";
import {TestUtil} from '../../support/testUtilFacade';
import * as util from "../../support/util";

const fhirVersion = 'R4';
const fhirMock = require('../../support/R4/fhir_context');

const po: AddFormToPageTestPage = new AddFormToPageTestPage();

describe('FHIR variables', () => {
  before(() => {
    cy.visit('test/pages/addFormToPageTest.html');
    TestUtil.waitForFHIRLibsLoaded();
  });

  describe('answerValueSet with FHIR context', () => {
    const answerField1 = 'yesno1/1', // choice
          answerField2 = 'yesno2/1', // choice
          answerField3 = 'yesno3/1', // open-choice
          answerField4 = 'yesno4/1', // open-choice
          searchResults = 'searchResults';

    before(() => {
      cy.window().then((win) => {
        const fhirContext = new Function('return ' + fhirMock.mockFHIRContext)();
        win.LForms.Util.setFHIRContext(fhirContext(fhirVersion, null, fhirMock.mockData));
      });
    });

    it('should have expected answer list when the Questionnaire is loaded', () => {
      util.addFormToPage('q-with-answerValueSet.json', null, {fhirVersion});
      [answerField1, answerField2, answerField3, answerField4].forEach(answerField => {
        cy.byId(answerField).click();
        cy.byId(searchResults).should('be.visible');
        cy.byCss("#searchResults li").its('length').should('eq', 3);
        cy.byCss("#searchResults li").eq(0).contains('No');
        cy.byCss("#searchResults li").eq(1).contains('Yes');
        cy.byCss("#searchResults li").eq(2).contains("Don't know");  
      });
    });

    it('should have expected answer list and saved value when the QuestionnaireReponse is merged to the Questionnaire', () => {
      cy.window().then((win) => {
        cy.readFile('test/data/R4/q-with-answerValueSet.json').then((q) => {  // readFile will parse the JSON
          let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
          cy.readFile('test/data/R4/qr-with-answerValueSet.json').then((qr) => {
            let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
            win.LForms.Util.addFormToPage(mergedFormData, "formContainer", {fhirVersion});

            // check saved values
            cy.byId(answerField1).should('have.value', 'Yes');
            cy.byId(answerField2).should('have.value', 'No');
            cy.byId(answerField3).should('have.value', 'Yes');
            cy.byId(answerField4).should('have.value', 'No');
            // check answer list
            [answerField1, answerField2, answerField3, answerField4].forEach(answerField => {
              cy.byId(answerField).click();
              cy.byId(searchResults).should('be.visible');
              cy.byCss("#searchResults li").its('length').should('eq', 3);
              cy.byCss("#searchResults li").eq(0).contains('No');
              cy.byCss("#searchResults li").eq(1).contains('Yes');
              cy.byCss("#searchResults li").eq(2).contains("Don't know");  
            });
          });

        });
      });

    });

    it('should export a correct QR again', () => {
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
        expect(qr.item[0].linkId).to.equal('yesno1');
        expect(qr.item[0].answer[0].valueCoding).to.eql({
          "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
          "code": "Y",
          "display": "Yes"
        });
        expect(qr.item[1].linkId).to.equal('yesno2');
        expect(qr.item[1].answer[0].valueCoding).to.eql({
          "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
          "code": "N",
          "display": "No"
        });
        expect(qr.item[2].linkId).to.equal('yesno3');
        expect(qr.item[2].answer[0].valueCoding).to.eql({
          "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
          "code": "Y",
          "display": "Yes"
        });
        expect(qr.item[3].linkId).to.equal('yesno4');
        expect(qr.item[3].answer[0].valueCoding).to.eql({
          "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
          "code": "N",
          "display": "No"
        });
      })
    })

  });

});
