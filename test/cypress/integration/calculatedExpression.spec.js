import * as util from '../support/util.js';

// Tests of the support for calculatedExpression.
// Most of this is currently tested by either karma or protractor.
describe('calculatedExpression', () => {
  it('should not cause a field to be readonly', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.loadFromTestData('editableCalcExp.json', 'R4');
    // Check that the BMI field is not disabled
    cy.get('#\\/39156-5\\/1').invoke('attr', 'disabled').should('eq', undefined);
  });
});


