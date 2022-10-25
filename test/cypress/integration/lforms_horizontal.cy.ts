import {TestPage} from '../support/lforms_testpage.po.js';
import {rxtermsControls as rxtermsForm} from '../support/rxterms.po.js';

describe('horizontal table', () => {
  const tp: TestPage = new TestPage();
  const addRemoveButtons = '.lhc-float-button';

  it('should have one add button in the horizontal table when the form loads', () => {
    tp.LoadForm.openUSSGFHTHorizontal();

    cy.get(addRemoveButtons).eq(2)
      .should('be.visible')
      .should('contain', 'Add another row of "This family member\'s history of disease"');
  });

  it('should have two remove buttons visible after the user adds a row', () => {
    cy.get(addRemoveButtons).eq(2).click();
    cy.get(addRemoveButtons).should(($buttons) => {
      expect($buttons).to.have.length(6);
      // the first row has a '-' button only
      expect($buttons.eq(2)).to.have.text('-');
      // the second row has a '-' button
      expect($buttons.eq(3)).to.have.text('-');
      // and an add button
      expect($buttons.eq(4)).to.contain('Add another row of "This family member\'s history of disease"');
    });
  });

  it('should have three remove buttons visible after the user adds a row', () => {
    cy.get(addRemoveButtons).eq(4).click();
    cy.get(addRemoveButtons).should(($buttons) => {
      expect($buttons).to.have.length(7);
      // the first row has a '-' button only
      expect($buttons.eq(2)).to.have.text('-');
      // the second row has a '-' button
      expect($buttons.eq(3)).to.have.text('-');
      // the third row has a '-' button
      expect($buttons.eq(4)).to.have.text('-');
      // and an add button
      expect($buttons.eq(5)).to.contain('Add another row of "This family member\'s history of disease"');
    });
  });

  it('should have the 2 rows after the user removes the 2nd row', () => {
    cy.get(addRemoveButtons).should('have.length', 7); // precondition
    cy.get(addRemoveButtons).eq(3).click();
    cy.get(addRemoveButtons).should(($buttons) => {
      expect($buttons).to.have.length(6);
      // the first row has a '-' button only
      expect($buttons.eq(2)).to.have.text('-');
      // the second row has a '-' button
      expect($buttons.eq(3)).to.have.text('-');
      // and an add button
      expect($buttons.eq(4)).to.contain('Add another row of "This family member\'s history of disease"');
    });
  });

  it('should not lose focus when the options for an autocompleter change', () => {
    tp.LoadForm.openRxTerms();
    const drugNameField = rxtermsForm.drugName;
    cy.byId(drugNameField).click().type('aspercreme');
    cy.byId(tp.Autocomp.searchResults).should('be.visible');
    cy.byId(drugNameField).type('{downArrow}').tab();
    cy.byId(rxtermsForm.strengthAndForm).should('have.focus');
  });

  it('should populate the RxCUI field on the RxTerms form', () => {
    // There was a bug where this did not happen when the strength value was
    // padded.
    // Continuing from the previous test...
    cy.byId(tp.Autocomp.searchResults).should('be.visible');
    const strengthField = rxtermsForm.strengthAndForm;
    cy.byId(strengthField).type('{downArrow}').tab();
    cy.byId(strengthField).should('have.value', '10% Cream');
    cy.byId(rxtermsForm.rxcui).should('have.value', '1101827');
  });

});
