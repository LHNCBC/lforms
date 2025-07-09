import * as util from '../support/util.js';
const answerId = util.answerId;

// Tests the interaction between enableWhen and calculatedExpression.
describe('enableWhen on calculatedExpression', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('enableWhenOnCalculatedValueFromFHIRPath.json', null, {fhirVersion: 'R4'});
  });

  it('should show the positive/negative results', () => {
    cy.byId(answerId('Q1apples/1', 'http://loinc.org', 'LA33-6')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "1");
    cy.byId(answerId('Q2berries/1', 'http://loinc.org', 'LA33-6')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "2");
    cy.byId(answerId('Q3cherries/1', 'http://loinc.org', 'LA33-6')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "3");
    cy.byId(answerId('Q4dates/1', 'http://loinc.org', 'LA33-6')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "4");
    // the fifth item has no answer yet. the result items should not be displayed
    cy.byId("posResultInterpretation/1").should('not.exist')
    cy.byId("negResultInterpretation/1").should('not.exist')
    cy.byId(answerId('Q5figs/1', 'http://loinc.org', 'LA33-6')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "5");

    // all conditions met, the positive result item should show
    cy.byId("posResultInterpretation/1").should('be.visible')
    cy.byId("posResultInterpretation/1").should('have.value', 'positive.')
    cy.byId("negResultInterpretation/1").should('not.exist')

    // select on "No", there are still 4 "Yes" remaining, the result item should still show
    cy.byId(answerId('Q1apples/1', 'http://loinc.org', 'LA32-8')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "4");
    cy.byId("posResultInterpretation/1").should('be.visible')
    cy.byId("posResultInterpretation/1").should('have.value', 'positive.')
    cy.byId("negResultInterpretation/1").should('not.exist')

    // select another "No", there are 3 "Yes" remaining,
    // the postive result item is replaced by a negative result item
    cy.byId(answerId('Q2berries/1', 'http://loinc.org', 'LA32-8')).find('input').click();
    cy.byId("fruitScore/1").should('have.value', "3");
    cy.byId("posResultInterpretation/1").should('not.exist')
    cy.byId("negResultInterpretation/1").should('be.visible')
    cy.byId("negResultInterpretation/1").should('have.value', 'negative.')

  });

});
