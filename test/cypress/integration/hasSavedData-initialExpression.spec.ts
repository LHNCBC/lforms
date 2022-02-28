import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
// The project root directory is the root for the cypress server
describe('initialExpression and hasSavedData=true/false tests', () => {
  const intFieldId = '/type-integer/1',
        strFieldId = '/type-string/1';
  const po = new AddFormToPageTestPage();      
  let qr;
  it('should have initial values', () => {
    po.openPage();
    util.addFormToPage('questionnaire-initialExpression.json', 'formContainer', {fhirVersion: "R4"});
    cy.byId(intFieldId).should('have.value','123');
    cy.byId(strFieldId).should('have.value','abc123');
    cy.window().then((win) => {
      qr = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
    });
  });

  it('should have the user saved data, instead of the initial values even if the user saved data are empty strings in QuestionnaireResponse', () => {
    po.openPage();
    cy.readFile('test/data/R4/questionnaire-initialExpression.json').then((q) => {  // readFile will parse the JSON
      cy.window().then((win) => {
        let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");
        qr.item[0].answer[0].valueInteger = '';
        qr.item[1].answer[0].valueString = '';
        let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
        expect(mergedFormData.hasSavedData).to.equal(true)
        win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
        cy.get('.lhc-form-title').contains('Questionnaire for testing initialExpression');        
        cy.byId(intFieldId).should('have.value','');
        cy.byId(strFieldId).should('have.value','');      
      });
    });
  });

  it('should have the user saved data, instead of the initial values if there are saved user data in QuestionnaireResponse', () => {
    po.openPage();
    cy.readFile('test/data/R4/questionnaire-initialExpression.json').then((q) => {  // readFile will parse the JSON
      cy.window().then((win) => {
        let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");
        qr.item[0].answer[0].valueInteger = '456';
        qr.item[1].answer[0].valueString = 'def456';
        let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
        expect(mergedFormData.hasSavedData).to.equal(true)
        win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
        cy.get('.lhc-form-title').contains('Questionnaire for testing initialExpression');        
        cy.byId(intFieldId).should('have.value','456');
        cy.byId(strFieldId).should('have.value','def456');      
      });
    });
  });

  it('should have the initial data, instead of the user saved data, if hasSavedData is set to false', () => {
    po.openPage();
    cy.readFile('test/data/R4/questionnaire-initialExpression.json').then((q) => {  // readFile will parse the JSON
      cy.window().then((win) => {
        let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");
        qr.item[0].answer[0].valueInteger = '456';
        qr.item[1].answer[0].valueString = 'def456';
        let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
        expect(mergedFormData.hasSavedData).to.equal(true)

        mergedFormData.hasSavedData = false;

        win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
        cy.get('.lhc-form-title').contains('Questionnaire for testing initialExpression');        
        cy.byId(intFieldId).should('have.value','123');
        cy.byId(strFieldId).should('have.value','abc123');
      
      });
    });  
  });

});