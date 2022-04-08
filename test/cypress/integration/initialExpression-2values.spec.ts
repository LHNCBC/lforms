import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
// The project root directory is the root for the cypress server
describe('initialExpression has mulitple values', () => {
  const field1 = 'answersFromParentQR/1/1/1',
        field2 = 'answersFromParentQR/1/1/2',
        answerField = 'questionUsingParentQRAnswersAsList/1/1/1';
  const po = new AddFormToPageTestPage();      

  it('should add repeating items and set initival values', () => {
    po.openPage();
    util.addFormToPage('questionnaire-initialExpression-2values.json', 'formContainer', {fhirVersion: "R4"});
    cy.byId(field1).should('have.value','Blue');
    cy.byId(field2).should('have.value','Green');

    cy.byId(answerField).click()
    po.searchResults.should('be.visible');
    cy.byCss("#searchResults li").its('length').should('eq', 2);
    cy.byCss("#searchResults li").eq(0).contains('Blue');
    cy.byCss("#searchResults li").eq(1).contains('Green');
  });

  
});