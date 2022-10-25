import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
// The project root directory is the root for the cypress server
describe('initialExpression with mulitple values', () => {
  const field1 = 'answersFromParentQR/1/1/1',
        field2 = 'answersFromParentQR/1/1/2',
        answerField = 'questionUsingParentQRAnswersAsList/1/1/1';
  const po = new AddFormToPageTestPage();

  it.only('should add repeating items and set initial values', () => {
    po.openPage();
    // This uses a form that is based on a user's form
    util.addFormToPage('questionnaire-initialExpression-2values.json', 'formContainer', {fhirVersion: "R4"});
    cy.byId(field1).should('have.value','Blue');
    cy.byId(field2).should('have.value','Green');

    cy.byId(answerField).click()
    po.searchResults.should('be.visible');
    cy.byCss("#searchResults li").its('length').should('eq', 2);
    cy.byCss("#searchResults li").eq(0).contains('Blue');
    cy.byCss("#searchResults li").eq(1).contains('Green');
  });

  describe('initialExpression form', ()=> {
    before(() => {
      util.addFormToPage('questionnaire-initialExpression.json', 'formContainer', {fhirVersion: "R4"});
    });

    it('should set repeating string values on an string question', ()=>{
      cy.byId('repeating-string/1').should('have.value', 'aaa');
      cy.byId('repeating-string/2').should('have.value', 'bbb');
    });

    it('should set repeating string values on an open-choice question', ()=>{
      cy.byId('repeating-open-choice/1').then((jqEl)=>{
        expect(jqEl.prev()).to.include.text('aaa');
        expect(jqEl.prev()).to.include.text('bbb');
      });
    });

    it('should set repeating coding values on an choice question', ()=>{
      cy.byId('repeating-choice/1').then((jqEl)=>{
        expect(jqEl.prev()).to.include.text('Blue');
        expect(jqEl.prev()).to.include.text('Green');
      });
    });
  });

});
