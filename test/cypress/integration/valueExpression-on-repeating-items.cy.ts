describe('valueExpression on repeating items', () => {

  it('should create repeating items with correct SN.', () => {
    cy.visit('/test/pages/lforms_testpage.html');
    cy.get('#hideRepetitionNumber').click();
    cy.get("#loadBtn").contains("Load Form From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/q-repeating-item-calculatedExpression.json');
    cy.get('.lhc-form-title').contains('A list of Observations - for testing only');

    cy.byId('item-/code/1/1')
      .byCss('.lf-sn')
      .should('have.text', '1.1');
    cy.byId('item-/code/1/2')
      .byCss('.lf-sn')
      .should('have.text', '1.2');
    cy.byId('item-/code/1/3')
      .byCss('.lf-sn')
      .should('have.text', '1.3');
    cy.byId('item-/code/1/20')
      .byCss('.lf-sn')
      .should('have.text', '1.20');

    cy.byId('item-/value/1/1')
      .byCss('.lf-sn')
      .should('have.text', '1.1');
    cy.byId('item-/value/1/2')
      .byCss('.lf-sn')
      .should('have.text', '1.2');
    cy.byId('item-/value/1/3')
      .byCss('.lf-sn')
      .should('have.text', '1.3');
    cy.byId('item-/value/1/20')
      .byCss('.lf-sn')
      .should('have.text', '1.20');

  });


});
