import * as util from '../support/util.js';

// Tests of the support for launchContext.
// Most of this is currently tested by either karma or protractor.
describe('launchContext', () => {
  it('should support off-list "name" values', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    // Add a non-standard context variable for launchContext
    cy.window().then(win => {
      win.LForms.Util.setFHIRContext(null, {myCustomVar: {
        resourceType: 'Basic',
        identifier: 'testCase1'
      },
      varNameFromValueId: {
        resourceType: 'Basic',
        identifier: 'testCase2'
      }});
    });

    util.addFormToPage('launchContext.json', null, {fhirVersion: 'R4'});
    cy.get('#q1\\/1').should('have.value', 'testCase1');
    cy.get('#q2\\/1').should('have.value', 'testCase2');
  });
});



