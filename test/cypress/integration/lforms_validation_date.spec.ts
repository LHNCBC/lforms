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

  // as of 09/16/2021,this test passed on firefox but not on linux chrome. Other tests in this file need to run with chrome to pass.
  it('should validate when required inputs are entered', () => {
    tp.loadFromTestData('test-date-validation.json');

    const skipLogicTrigger = '/sl_source_to_test_required/1';
    // Entering 1 will show a previously hidden section with required inputs to make sure they now
    // trigger the validation
    cy.byId(skipLogicTrigger).type('1');

    const otherEl = '/required_tx/1';

    // Fill the required fields
    cy.byId('/required_dt/1').find('input').clear()
      // this test does not work with chrome v93.0.4577.82 and/or its webdriver. "/" is not appearing in the field
      .type('10/16/2020');
    cy.byId(otherEl).click();
    cy.byId('/required_dtm/1').find('input')
      // this test does not work with chrome v93.0.4577.82 and/or its webdriver. "/" is not appearing in the field
      .type('10/16/2020 16:00:00');
    cy.byId(otherEl).click();
    cy.byId('/required_tx/1').type('test');
    cy.byId('/required_st/1').type('test');
    cy.byId('/sl_target_to_test_required1/1').type('test');
    cy.byId('/sl_target_header/sl_target_to_test_required/1/1').type('test');

    cy.window().then((win) => {
      const error = win.LForms.Util.checkValidity();
      expect(error).to.be.null;
    });
  });

});
