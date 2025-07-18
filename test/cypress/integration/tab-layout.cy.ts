import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
const po = new AddFormToPageTestPage();

describe('Tab Layout', () => {
  beforeEach(() => {
    cy.visit('test/pages/addFormToPageTest.html');
  });

  it('should render tab layout', () => {
    util.addFormToPage('tab-layout.json', null, {fhirVersion: 'R4'});
    cy.byId('q1/1/1/1').should('be.visible');
    cy.byId('q2/1/1/1').should('not.exist');
    cy.byId('nz-tabs-0-tab-1').click();
    cy.byId('q1/1/1/1').should('not.be.visible');
    cy.byId('q2/1/1/1').should('be.visible');
  });

  it('enableWhen should work across tabs', () => {
    util.addFormToPage('tab-layout-with-enableWhen.json', null, {fhirVersion: 'R4'});
    cy.byId('Q1/1/1/1true').find('input').should('not.be.checked');
    cy.byId('Q1/1/1/1false').find('input').should('not.be.checked');
    cy.byId('Q1/1/1/1null').find('input').should('be.checked');

    cy.byId('nz-tabs-0-tab-1').click();
    cy.byId('Q1-not-exists/1/1/1').should('be.visible');
    cy.byId('Q1-not-true/1/1/1').should('be.visible');
    cy.byId('Q1-exists/1/1/1').should('not.exist');
    cy.byId('Q1-true/1/1/1').should('not.exist');
    cy.byId('Q1-false/1/1/1').should('not.exist');

    cy.byId('nz-tabs-0-tab-0').click();
    cy.byId('Q1/1/1/1true').find('input').click();
    cy.byId('nz-tabs-0-tab-1').click();
    cy.byId('Q1-not-exists/1/1/1').should('not.exist');
    cy.byId('Q1-not-true/1/1/1').should('not.exist');
    cy.byId('Q1-exists/1/1/1').should('be.visible');
    cy.byId('Q1-true/1/1/1').should('be.visible');
    cy.byId('Q1-false/1/1/1').should('not.exist');

    cy.byId('nz-tabs-0-tab-0').click();
    cy.byId('Q1/1/1/1false').find('input').click();
    cy.byId('nz-tabs-0-tab-1').click();
    cy.byId('Q1-not-exists/1/1/1').should('not.exist');
    cy.byId('Q1-not-true/1/1/1').should('be.visible');
    cy.byId('Q1-exists/1/1/1').should('be.visible');
    cy.byId('Q1-true/1/1/1').should('not.exist');
    cy.byId('Q1-false/1/1/1').should('be.visible');
  });
});
