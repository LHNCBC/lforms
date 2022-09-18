import * as util from "../support/util.js";

describe('entryFormat extension', () => {
  describe('', () => {
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('questionnaire-with-entryFormat.json', null, {fhirVersion: "R4"});
    });

    it('should display the tooltips imported from the entryFormat extensions', () => {
      cy.byId('/type-integer/1').invoke('attr', 'placeholder').should('eq','integer: a entry format from questionnaire');
      cy.byId('/type-decimal/1').invoke('attr', 'placeholder').should('eq','decimal: a entry format from questionnaire');
      cy.byId('/type-string/1').invoke('attr', 'placeholder').should('eq','string: a entry format from questionnaire');
      cy.byCss('#/type-date/1 input').invoke('attr', 'placeholder').should('eq','date: a entry format from questionnaire');
      cy.byCss('#/type-dateTime/1 input').invoke('attr', 'placeholder').should('eq','dateTime: a entry format from questionnaire');
      cy.byCss('#/type-time/1 input').invoke('attr', 'placeholder').should('eq','time: a entry format from questionnaire');
      cy.byId('/type-choice/1').invoke('attr', 'placeholder').should('eq','choice: a entry format from questionnaire');
      cy.byId('/type-open-choice/1').invoke('attr', 'placeholder').should('eq','open-choice: a entry format from questionnaire');
      cy.byId('/type-choice-m/1').invoke('attr', 'placeholder').should('eq','choice repeats: a entry format from questionnaire');
      cy.byId('/type-open-choice-m/1').invoke('attr', 'placeholder').should('eq','open-choice repeats: a entry format from questionnaire');
    });

  });
});
