import * as util from '../support/util.js';
const answerId = util.answerId;

// Tests of the support for calculatedExpression.
describe('calculatedExpression', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
  });

  it('should not cause a field to be readonly', () => {
    util.addFormToPage('editableCalcExp.json', null, {fhirVersion: 'R4'});
    // Check that the BMI field is not disabled
    cy.get('#\\/39156-5\\/1').invoke('attr', 'disabled').should('eq', undefined);
  });

  it('should update the boolean field when the calculatedExpression changes', () => {
    util.addFormToPage('calculatedExpression-on-boolean-item.json', null, {fhirVersion: 'R4'});
    cy.byId(answerId('overweight/1', 'null')).should('have.class', 'ant-radio-wrapper-checked');
    cy.byId('weight/1').type('10');
    cy.byId(answerId('overweight/1', 'false')).should('have.class', 'ant-radio-wrapper-checked');
    cy.byId('weight/1').type('2');
    cy.byId(answerId('overweight/1', 'true')).should('have.class', 'ant-radio-wrapper-checked');
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

    it('should be able to assign off-list string values from another field as values', ()=>{
      cy.get('#repeating-open-choice-from-string\\/1').prev().find('li:first-child').should('contain', 'a');
      cy.get('#repeating-open-choice-from-string\\/1').prev().find('li:nth-child(2)').should('contain', 'b');
    });

    it('should be able to remove a repetition of a string field and a value from a list', ()=>{
      cy.get('#string-to-split\\/1').type('{moveToEnd}').type('{backspace}');
      cy.get('#string-to-split\\/1').should('have.value', 'a');
      cy.get('#repeating-string\\/1').should('have.value', 'a');
      cy.get('#repeating-string\\/2').should('not.exist');
      cy.get('#repeating-open-choice\\/1').prev().find('li:first-child').should('contain', 'a');
    });

    it('should be not delete the last repetition of a field', ()=>{
      cy.get('#string-to-split\\/1').type('{moveToEnd}').type('{backspace}');
      cy.get('#repeating-string\\/1').should('have.value', '');
      cy.get("#repeating-open-choice\\/1").prev().find('li').should('not.exist');
    });

    it('should allow the user to override values of the repeating string field', ()=> {
      // Type 'one', but while doing so, check for a bug where the first character disappears
      cy.get('#repeating-string\\/1').type('o').should('have.value', 'o').type('ne');

      cy.get('#add-repeating-string\\/1').click();
      cy.get('#repeating-string\\/2').type('two');
      cy.get('#repeating-string\\/1').should('have.value', 'one');
      cy.get('#repeating-string\\/2').should('have.value', 'two');
    });

    it('should be able to update the number of selecting codings', ()=>{
      cy.get('#oneCoding\\/1').click();
      cy.byCss("#lhc-tools-searchResults li").eq(0).contains('Yes').click();
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li:first-child').should('contain', 'Blue');
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li').its('length').should('eq', 1)
      // Now allow both codings.
      cy.get('#oneCoding\\/1').click();
      cy.byCss("#lhc-tools-searchResults li").eq(1).contains('No').click();
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li:first-child').should('contain', 'Blue');
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li:nth-child(2)').should('contain', 'Green');
      cy.get("#repeating-open-choice-coding\\/1").prev().find('li').its('length').should('eq', 2);
    });
  });

  describe('splitting a string in a repeating group', ()=>{
    it('should be able to have separate repetition sets within repetitions of a group', ()=>{
      cy.byId('non-repeating-q/1/1').type('ab');
      cy.byId('add-repeating-group/1').click(); // add repetition of group
      cy.byId('non-repeating-q/2/1').type('cd');
      cy.byId('repeating-q-in-repeating-group/1/1').should('have.value', 'a');
      cy.byId('repeating-q-in-repeating-group/1/2').should('have.value', 'b');
      cy.byId('repeating-q-in-repeating-group/2/1').should('have.value', 'c');
      cy.byId('repeating-q-in-repeating-group/2/2').should('have.value', 'd');
    });
  });

  describe('answerExpression and calculatedExpress on repeating items', ()=>{
    it('should have FHIRPath expression calculated when a repeating item is added and/or removed', ()=>{
      util.addFormToPage('fhirpath-expression-on-repeating-items.R4.json', null, {fhirVersion: 'R4'});

      // expression works on the first group
      cy.byId('p1.10.1.1/1/1/1/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 2);
      cy.get('#lhc-tools-searchResults li').first().should('be.visible');
      cy.byId('p1.10.1.1/1/1/1/1').type('{downArrow}').type('{enter}');
      cy.byId('p1.10.1.1/1/1/1/1').should('have.value', 'NIH');
      cy.byId('p1.10.1.2/1/1/1/1').should('have.value', 'NIH-2021-5678901234567');

      // add a new repeating group
      cy.byId('add-p1.10.1/1/1/1').click();
      // expression works on the second group
      cy.byId('p1.10.1.1/1/1/2/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 2);
      cy.get('#lhc-tools-searchResults li').first().should('be.visible');
      cy.byId('p1.10.1.1/1/1/2/1').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('p1.10.1.1/1/1/2/1').should('have.value', 'Immunotherapy Industry Association');
      cy.byId('p1.10.1.2/1/1/2/1').should('have.value', 'IIA900000');

      // add a third repeating group
      cy.byId('add-p1.10.1/1/1/2').click();
      // expression works on the third group
      cy.byId('p1.10.1.1/1/1/3/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 2);
      cy.get('#lhc-tools-searchResults li').first().should('be.visible');
      cy.byId('p1.10.1.1/1/1/3/1').type('{downArrow}').type('{enter}');
      cy.byId('p1.10.1.1/1/1/3/1').should('have.value', 'NIH');
      cy.byId('p1.10.1.2/1/1/3/1').should('have.value', 'NIH-2021-5678901234567');

      // delete the second repeating group
      cy.byId('del-p1.10.1/1/1/2').click();
      // values remains in the remaining 2 groups
      cy.byId('p1.10.1.1/1/1/1/1').should('have.value', 'NIH');
      cy.byId('p1.10.1.2/1/1/1/1').should('have.value', 'NIH-2021-5678901234567');
      cy.byId('p1.10.1.1/1/1/3/1').should('have.value', 'NIH');
      cy.byId('p1.10.1.2/1/1/3/1').should('have.value', 'NIH-2021-5678901234567');
      // expression works in the remaining 2 groups
      cy.byId('p1.10.1.1/1/1/1/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 2);
      cy.get('#lhc-tools-searchResults li').first().should('be.visible');
      cy.byId('p1.10.1.1/1/1/1/1').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('p1.10.1.1/1/1/1/1').should('have.value', 'Immunotherapy Industry Association');
      cy.byId('p1.10.1.2/1/1/1/1').should('have.value', 'IIA900000');

      cy.byId('p1.10.1.1/1/1/3/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 2);
      cy.get('#lhc-tools-searchResults li').first().should('be.visible');
      cy.byId('p1.10.1.1/1/1/3/1').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('p1.10.1.1/1/1/3/1').should('have.value', 'Immunotherapy Industry Association');
      cy.byId('p1.10.1.2/1/1/3/1').should('have.value', 'IIA900000');
    });

    it('should have FHIRPath expressions work with R5 Coding items', ()=>{
      util.addFormToPage('calculatedListAnswers.R5.json', null, {fhirVersion: 'R5'});

      // input
      cy.byId('inputList/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 2);
      cy.byId('inputList/1').type('{downArrow}').type('{enter}');
      cy.byId('item-inputList/1')
        .find('lhc-autocomplete li')
        .should('have.length', 1);
      cy.byId('item-inputList/1')
        .get('lhc-autocomplete li')
        .eq(0)
        .should('contain.text', 'blue');

      // single-select output calculated answer
      cy.byId('calculatedAnswer/1/1').should('have.value', 'blue');

      // single-select output calculated list option
      cy.byId('calculatedListOption/1/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 1);
      cy.get('#lhc-tools-searchResults li').first().should('contain.text', 'blue');

      // multi-select output calculated answers
      cy.byId('item-calculatedAnswers/1/1')
        .find('lhc-autocomplete li')
        .should('have.length', 1);
      cy.byId('item-calculatedAnswers/1/1')
        .get('lhc-autocomplete li')
        .eq(0)
        .should('contain.text', 'blue');

      // multi-select output calculated list options
      cy.byId('calculatedListOptions/1/1').click();
      cy.get('#lhc-tools-searchResults li').should('have.length', 1);
      cy.get('#lhc-tools-searchResults li').first().should('contain.text', 'blue');
    });
  });

  describe('calculatedExpression on valueset.expansion contained codings', () => {
    it('should support itemWeight extension in R4 for calculating scores', () => {
      util.addFormToPage('calc-weight/q-with-contained-valueset-with-itemWeight.json', null, {fhirVersion: 'R4'});
      // ordinalValue
      cy.byId('link-1.1.1/1/1/1').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('link-1.1.2/1/1/1').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('link-2/1').should('have.value', '12');
      // itemWeight
      cy.byId('link-1.1.1/1/1/1').type('{downArrow}').type('{enter}');
      cy.byId('link-1.1.2/1/1/1').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('link-2/1').should('have.value', '21');
      // initialExpression should also work with itemWeight.
      cy.byId('link-3/1').should('have.value', '1');
    });

    it('should support ordinalValue extension in R5 for calculating scores', () => {
      util.addFormToPage('calc-weight/q-with-contained-valueset-with-ordinalValue.json', null, {fhirVersion: 'R5'});
      cy.byId('link-2/1').should('have.value', '');
      // itemWeight
      cy.byId('link-1.1.1/1/1/1').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('link-1.1.2/1/1/1').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('link-2/1').should('have.value', '12');
      // ordinalValue
      cy.byId('link-1.1.1/1/1/1').type('{downArrow}').type('{enter}');
      cy.byId('link-1.1.2/1/1/1').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
      cy.byId('link-2/1').should('have.value', '21');
    });
  });
});
