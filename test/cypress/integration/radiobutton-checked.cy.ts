import {TestPage} from '../support/lforms_testpage.po.js';

describe('Radio button checked/unchecked', () => {
  const tp: TestPage = new TestPage();

  it('should display checked state correctly', () => {
    tp.LoadForm.openDisplayControlsDemo();
    cy.wait(500)
    const item2answer1 = '/q1b/1c1',
      item2Other = '/q1b/1_other',
      item2OtherValue = '/q1b/1_otherValue';
   
    cy.byId(item2answer1).click();
    cy.byId(item2answer1).find('span.ant-radio').should('have.class', 'ant-radio-checked')
    
    cy.byId(item2Other).click()
    cy.byId(item2Other).find('span.ant-radio').should('have.class', 'ant-radio-checked')
    cy.byId(item2answer1).find('span.ant-radio').should('not.have.class', 'ant-radio-checked')

    // the 'other' radio should remain checked when other value is typed
    cy.byId(item2OtherValue).type('other values');
    cy.byId(item2Other).find('span.ant-radio').should('have.class', 'ant-radio-checked')

    // click away 
    cy.byId(item2answer1).click();
    cy.byId(item2answer1).find('span.ant-radio').should('have.class', 'ant-radio-checked')
    cy.byId(item2Other).find('span.ant-radio').should('not.have.class', 'ant-radio-checked')

  });
});