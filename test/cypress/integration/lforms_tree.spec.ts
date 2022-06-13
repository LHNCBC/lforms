import {TestPage} from '../support/lforms_testpage.po.js';

describe('tree lines', () => {
  const tp: TestPage = new TestPage();

  it('should show the last items correctly as a sub-items', () => {
    tp.LoadForm.openFormBuilder();
    const treeItem1 = '/questionHeaderC/answersC/textC/1/1/1';
    const treeItem2 = '/questionHeaderC/formulaC/1/1';

    cy.byId(treeItem1).should('be.visible');
    cy.byId(treeItem2).should('be.visible');
  });

});
