import * as util from '../support/util.js';
const answerId = util.answerId;

describe('enableWhen where the references form a loop', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('q-enableWhen-with-reference-loop.json', null, {fhirVersion: 'R4'});
  });

  it('should show all items initially', () => {
    cy.byId(answerId('item1/1', 'true')).find('input').should('not.be.checked');
    cy.byId(answerId('item1/1', 'false')).find('input').should('be.checked');
    cy.byId(answerId('item1/1', 'null')).find('input').should('not.be.checked');

    cy.byId(answerId('item2/1', 'true')).find('input').should('not.be.checked');
    cy.byId(answerId('item2/1', 'false')).find('input').should('be.checked');
    cy.byId(answerId('item2/1', 'null')).find('input').should('not.be.checked');

    cy.byId(answerId('item3/1', 'true')).find('input').should('not.be.checked');
    cy.byId(answerId('item3/1', 'false')).find('input').should('be.checked');
    cy.byId(answerId('item3/1', 'null')).find('input').should('not.be.checked');

  });

  it('should work for all enableWhen', ()=> {

    // item 1 controls item 3
    cy.byId(answerId('item1/1', 'true')).find('input').click();
    cy.byId('label-item3/1').should('not.exist');
    cy.byId(answerId('item3/1', 'true')).should('not.exist');
    cy.byId(answerId('item3/1', 'false')).should('not.exist');
    cy.byId(answerId('item3/1', 'null')).should('not.exist');

    cy.byId(answerId('item1/1', 'null')).find('input').click();
    cy.byId('label-item3/1').should('be.visible');
    cy.byId(answerId('item3/1', 'true')).find('input').should('not.be.checked');
    cy.byId(answerId('item3/1', 'false')).find('input').should('be.checked');
    cy.byId(answerId('item3/1', 'null')).find('input').should('not.be.checked');

    // item 2 controls item 3
    cy.byId(answerId('item2/1', 'true')).find('input').click();
    cy.byId('labe2-item3/1').should('not.exist');
    cy.byId(answerId('item3/1', 'true')).should('not.exist');
    cy.byId(answerId('item3/1', 'false')).should('not.exist');
    cy.byId(answerId('item3/1', 'null')).should('not.exist');

    cy.byId(answerId('item2/1', 'null')).find('input').click();
    cy.byId('label-item3/1').should('be.visible');
    cy.byId(answerId('item3/1', 'true')).find('input').should('not.be.checked');
    cy.byId(answerId('item3/1', 'false')).find('input').should('be.checked');
    cy.byId(answerId('item3/1', 'null')).find('input').should('not.be.checked');

    // item 3 controls item 1 and item 2
    cy.byId(answerId('item3/1', 'true')).find('input').click();
    cy.byId('label-item1/1').should('not.exist');
    cy.byId(answerId('item1/1', 'true')).should('not.exist');
    cy.byId(answerId('item1/1', 'false')).should('not.exist');
    cy.byId(answerId('item1/1', 'null')).should('not.exist');

    cy.byId('label-item2/1').should('not.exist');
    cy.byId(answerId('item1/2', 'true')).should('not.exist');
    cy.byId(answerId('item1/2', 'false')).should('not.exist');
    cy.byId(answerId('item1/2', 'null')).should('not.exist');

  })
});
