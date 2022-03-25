import * as util from '../support/util.js';

// Tests of the support for calculatedExpression.
// Most of this is currently tested by either karma or protractor.
describe('calculatedExpression', () => {
  it('should not cause a field to be readonly', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('editableCalcExp.json', null, {fhirVersion: 'R4'});
    // Check that the BMI field is not disabled
    cy.get('#\\/39156-5\\/1').invoke('attr', 'disabled').should('eq', undefined);
  });

  describe('for single-select lists', ()=>{
    it('should be able to set off-list Codings as answers', ()=> {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('calculatedListAnwers.json', null, {fhirVersion: 'R4'});
      cy.get('#inputList\\/1').click();
      cy.get('#completionOptions li:first-child').click();
      cy.get('#calculatedAnswer\\/1\\/1').should('have.value', 'blue');
    });

    it('should be able to clear answers', ()=> {
      // Depends on previous test
      cy.get('#inputList\\/1').prev().find('li:first-child').contains('blue'); // remove the input answer
      cy.get('#inputList\\/1').prev().find('li:first-child span').click(); // remove the input answer
      cy.get('#inputList\\/1').prev().should('not.contain', 'blue');
      cy.get('#calculatedAnswer\\/1\\/1').should('have.value', '');
    });

    it('should be able to set answer lists from list answers', ()=> {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('calculatedListAnwers.json', null, {fhirVersion: 'R4'});
      cy.get('#inputList\\/1').click();
      cy.get('#completionOptions li:first-child').click(); // first item in list
      // Clearing the field, which is currently autopopulated, but we will be
      // disabling that behavior soon.
      cy.get('#calculatedListOption\\/1\\/1').clear();
      cy.get('#calculatedListOption\\/1\\/1').click();
      cy.get('#completionOptions li:first-child').should('be.visible');
      cy.get('#completionOptions li:first-child').should('contain', 'blue');
    });
  });

  describe('for multi-select lists', ()=>{
    it('should be able to set off-list Codings as answers', ()=> {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('calculatedListAnwers.json', null, {fhirVersion: 'R4'});
      cy.get('#inputList\\/1').click();
      cy.get('#completionOptions li:first-child').click()
      cy.get('#calculatedAnswers\\/1\\/1').prev().should('contain', 'blue');
      cy.get('#completionOptions li:first-child').click()
      cy.get('#calculatedAnswers\\/1\\/1').prev().should('contain', 'green');
    });

    it('should be able to set answer lists from list answers', ()=> {
      // Depends on previous test
      // Open the list for calculatedOptions and check it
      cy.get('#calculatedListOptions\\/1\\/1').should('have.value', '');
      cy.get('#calculatedListOptions\\/1\\/1').click();
      cy.get('#completionOptions li:first-child').should('be.visible');
      cy.get('#completionOptions li:first-child').contains('blue');
      cy.get('#completionOptions li:nth-child(2)').contains('green');
    });
  });
});
