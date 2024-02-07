import * as util from '../support/util.js';

describe('enableWhen where the references form a loop', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('q-enableWhen-with-reference-loop.json', null, {fhirVersion: 'R4'});
  });

  it('should show all items initially', () => {
    cy.byId('item1/1true').find('input').should('not.be.checked');
    cy.byId('item1/1false').find('input').should('be.checked');
    cy.byId('item1/1null').find('input').should('not.be.checked');

    cy.byId('item2/1true').find('input').should('not.be.checked');
    cy.byId('item2/1false').find('input').should('be.checked');
    cy.byId('item2/1null').find('input').should('not.be.checked');

    cy.byId('item3/1true').find('input').should('not.be.checked');
    cy.byId('item3/1false').find('input').should('be.checked');
    cy.byId('item3/1null').find('input').should('not.be.checked');

  });

  it('should work for all enableWhen', ()=> {
    // item 1 controls item 3
    cy.byId('item1/1true').find('input').click();
    cy.byId('label-item3/1').should('not.exist');
    cy.byId('item3/1true').should('not.exist');
    cy.byId('item3/1false').should('not.exist');
    cy.byId('item3/1null').should('not.exist');

    cy.byId('item1/1null').find('input').click();
    cy.byId('label-item3/1').should('be.visible');
    cy.byId('item3/1true').find('input').should('not.be.checked');
    cy.byId('item3/1false').find('input').should('be.checked');
    cy.byId('item3/1null').find('input').should('not.be.checked');

    // item 2 controls item 3
    cy.byId('item2/1true').find('input').click();
    cy.byId('labe2-item3/1').should('not.exist');
    cy.byId('item3/1true').should('not.exist');
    cy.byId('item3/1false').should('not.exist');
    cy.byId('item3/1null').should('not.exist');

    cy.byId('item2/1null').find('input').click();
    cy.byId('label-item3/1').should('be.visible');
    cy.byId('item3/1true').find('input').should('not.be.checked');
    cy.byId('item3/1false').find('input').should('be.checked');
    cy.byId('item3/1null').find('input').should('not.be.checked');

    // item 3 controls item 1 and item 2
    cy.byId('item3/1true').find('input').click();
    cy.byId('label-item1/1').should('not.exist');
    cy.byId('item1/1true').should('not.exist');
    cy.byId('item1/1false').should('not.exist');
    cy.byId('item1/1null').should('not.exist');

    cy.byId('label-item2/1').should('not.exist');
    cy.byId('item1/2true').should('not.exist');
    cy.byId('item1/2false').should('not.exist');
    cy.byId('item1/2null').should('not.exist');
  })

});
