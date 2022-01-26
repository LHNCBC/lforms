import * as util from './util.js';

// Tests of the support for calculatedExpression.
// Most of this is currently tested by either karma or protractor.
describe('calculatedExpression', () => {
  it.only('should not cause a field to be readonly', () => {
    util.visitTestPage();
    util.loadFromTestData('editableCalcExp.json', 'R4');
    cy.wait(2000);
  });
});


