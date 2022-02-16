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
      }});
    });

    util.loadFromTestData('off-list-launchContext.json', 'R4');
    // Check that the BMI field is not disabled
    cy.get('#q1\\/1').should('have.value', 'testCase1');
  });
});



