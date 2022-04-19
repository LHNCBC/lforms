import * as util from '../support/util.js';

// Tests of the support for calculatedExpression.
// Most of this is currently tested by either karma or protractor.
describe('calculatedExpression', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
  });

  it('should not cause a field to be readonly', () => {
    util.addFormToPage('editableCalcExp.json', null, {fhirVersion: 'R4'});
    // Check that the BMI field is not disabled
    cy.get('#\\/39156-5\\/1').invoke('attr', 'disabled').should('eq', undefined);
  });

  describe('for single-select lists', ()=>{
    it('should be able to set off-list Codings as answers', ()=> {
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

  describe('splitting a string', ()=>{
    before(()=>{
      util.addFormToPage('questionnaire-calculatedExpression.json', null, {fhirVersion: 'R4'});
      cy.get('#string-to-split\\/1').type('ab');
    });


    it('should be able to assign strings to a string field', ()=>{
      cy.get('#repeating-string\\/1').should('have.value', 'a');
      cy.get('#repeating-string\\/2').should('have.value', 'b');
    });

    it('should be able to assign strings to a list field', ()=>{
      cy.get('#repeating-open-choice\\/1').prev().find('li:first-child').should('contain', 'a');
      cy.get('#repeating-open-choice\\/1').prev().find('li:nth-child(2)').should('contain', 'b');
    });

    it('should be able to remove a repetition of a string field and a value from a list', ()=>{
      cy.get('#string-to-split\\/1').type('{moveToEnd}').type('{backspace}');
      cy.get('#string-to-split\\/1').should('have.value', 'a');
      cy.get('#repeating-string\\/1').should('have.value', 'a');
      cy.get('#repeating-string\\/2').should('not.exist');
      cy.get('#repeating-open-choice\\/1').prev().find('li:first-child').should('contain', 'a');
    });

    it('should be not delete the last repitition of a field', ()=>{
      cy.get('#string-to-split\\/1').type('{moveToEnd}').type('{backspace}');
      cy.get('#repeating-string\\/1').should('have.value', '');
      cy.get("#repeating-open-choice\\/1").prev().find('li').should('not.exist');
    });

    it('should allow the user to override values of the repeating string field', ()=> {
      cy.get('#repeating-string\\/1').type('o'); // check for bug where the first character is disappears
      cy.get('#repeating-string\\/1').should('have.value', 'o');
      cy.get('#repeating-string\\/1').type('ne');
      cy.get('#add-repeating-string\\/1').click();
      cy.get('#repeating-string\\/2').type('two');
      cy.get('#repeating-string\\/1').should('have.value', 'one');
      cy.get('#repeating-string\\/2').should('have.value', 'two');
    });

    it('should be able to update the number of selecting codings', ()=>{
      cy.get('#oneCoding\\/1').click();
      cy.byCss("#searchResults li").eq(0).contains('Yes').click();
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li:first-child').should('contain', 'Blue');
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li').its('length').should('eq', 1)
      // Now allow both codings.
      cy.get('#oneCoding\\/1').click();
      cy.byCss("#searchResults li").eq(1).contains('No').click();
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li:first-child').should('contain', 'Blue');
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li:nth-child(2)').should('contain', 'Green');
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li').its('length').should('eq', 2);
    });
  });
});
