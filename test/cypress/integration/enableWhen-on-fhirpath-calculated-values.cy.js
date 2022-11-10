import * as util from '../support/util.js';

// Tests the interaction between enableWhen and calculatedExpression.
describe('enableWhen on calculatedExpression', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('enableWhenOnCalculatedValueFromFHIRPath.json', null, {fhirVersion: 'R4'});
  });

  it('should show the positive/negative results', () => {
    cy.byId("Q1apples/1LA33-6").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "1");
    cy.byId("Q2berries/1LA33-6").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "2");
    cy.byId("Q3cherries/1LA33-6").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "3");
    cy.byId("Q4dates/1LA33-6").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "4");
    // the fifth item has no answer yet. the result items should not be displayed
    cy.byId("posResultInterpretation/1").should('not.exist')
    cy.byId("negResultInterpretation/1").should('not.exist')
    cy.byId("Q5figs/1LA33-6").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "5");

    // all conditions met, the positive result item should show
    cy.byId("posResultInterpretation/1").should('be.visible')
    cy.byId("posResultInterpretation/1").should('have.value', 'positive.')
    cy.byId("negResultInterpretation/1").should('not.exist')

    // select on "No", there are still 4 "Yes" remaining, the result item should still show
    cy.byId("Q1apples/1LA32-8").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "4");
    cy.byId("posResultInterpretation/1").should('be.visible')
    cy.byId("posResultInterpretation/1").should('have.value', 'positive.')
    cy.byId("negResultInterpretation/1").should('not.exist')

    // select another "No", there are 3 "Yes" remaining,
    // the postive result item is replaced by a negative result item
    cy.byId("Q2berries/1LA32-8").find('input').click();
    cy.byId("fruitScore/1").should('have.value', "3");
    cy.byId("posResultInterpretation/1").should('not.exist')
    cy.byId("negResultInterpretation/1").should('be.visible')
    cy.byId("negResultInterpretation/1").should('have.value', 'negative.')

  });

});
