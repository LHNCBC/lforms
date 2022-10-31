import {TestPage} from '../support/lforms_testpage.po.js';

describe('form validation', () => {
  const tp: TestPage = new TestPage();

  before(() => {
    tp.openBaseTestPage();
  });

  it('DT data type should work', () => {
    tp.loadFromTestData('test-date-validation.json');

    const dtEl = '/required_dt/1';
    const otherEl = '/required_tx/1'; // Use for creating blur event

    let dateStr = '02/032019';

    cy.byId(dtEl).find('input').clear().type(dateStr);
    cy.byId(otherEl).click();
    cy.byId(dtEl).find('input').should('have.value', '');

    dateStr = '02/03/2019';
    cy.byId(dtEl).find('input').clear().type(dateStr);
    cy.byId(otherEl).click();
    cy.byId(dtEl).find('input').should('have.value', dateStr);
  });

});
