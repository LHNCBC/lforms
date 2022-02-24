// The project root directory is the root for the cypress server
describe('Multiple "valueExpression" extensions Test with RxTerms', () => {
  const problemId = 'medication/1/1',
        strengthId = 'strength/1/1',
        cuiId = 'rxcui/1/1';

  it('should have empty initial values', () => {
    // load rxterms R4 Questionnaire
    cy.visit('/test/pages/lforms_testpage.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/rxterms.R4.json');
    cy.get('.lhc-form-title').contains('RxTerms Lookup');

    cy.byId(problemId).should('have.value','');
    cy.byId(strengthId).should('have.value','');
    cy.byId(cuiId).should('have.value','');
    
  });

  it('should set a answer list on strength field and a value on cui field', () => {
    
    cy.byId(problemId).click().type('AR');
    cy.wait(100)
    cy.byId(problemId).type('{downarrow}').type('{enter}');
    cy.byId(problemId).should('have.value','ARAVA (Oral Pill)');

    cy.byId(strengthId).click().type('{downarrow}{enter}').should('have.value','10 mg Tab');
    cy.byId(cuiId).should('have.value','213377');    

    // pick a different strength
    cy.byId(strengthId).click().type('{downarrow}{downarrow}{enter}').should('have.value','20 mg Tab');
    cy.byId(cuiId).should('have.value','213379');    

  });

  it('should reset the strength field and the cui field when the problem field is cleared', () => {
    cy.byId(problemId).clear();
    cy.byId(problemId).type('{enter}');
    cy.byId(problemId).should('have.value','');
    cy.byId(strengthId).should('have.value','');
    cy.byId(cuiId).should('have.value','');
  });

  it('should set the strength field and the cui field when a new problem is entered', () => {
    cy.byId(problemId).click().type('AB');
    cy.byId(problemId).type('{downarrow}').type('{enter}');
    cy.byId(problemId).should('have.value','ABILIFY (Oral Pill)');

    cy.byId(strengthId).click().type('{downarrow}{enter}').should('have.value','2 mg Sensor Tab');
    cy.byId(cuiId).should('have.value','1998457');    

  });

});