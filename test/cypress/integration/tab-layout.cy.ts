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
    cy.byId('nz-tabs-0-tab-2').click();
    cy.byId('q3/1/1/1').should('be.visible');

    cy.byId('nz-tabs-0-tab-0').click();
    cy.byId('Q1/1/1/1false').find('input').click();
    cy.byId('nz-tabs-0-tab-1').click();
    cy.byId('Q1-not-exists/1/1/1').should('not.exist');
    cy.byId('Q1-not-true/1/1/1').should('be.visible');
    cy.byId('Q1-exists/1/1/1').should('be.visible');
    cy.byId('Q1-true/1/1/1').should('not.exist');
    cy.byId('Q1-false/1/1/1').should('be.visible');
    cy.byId('nz-tabs-0-tab-2').click();
    cy.byId('q3/1/1/1').should('not.exist');
  });

  it('should render tab layout on nested layouts', () => {
    util.addFormToPage('tab-layout-nested-layout.json', null, {fhirVersion: 'R4'});
    // Horizontal layout under Tab One.
    cy.byId('/g3/g1m1/1/1/1/1').should('be.visible');
    cy.byId('/g3/g1m2/1/1/1/1').should('be.visible');
    cy.byId('/g3/g1m3/1/1/1/1').should('be.visible');
    cy.byId('/g3/g1m4/1/1/1/1').should('be.visible');
    cy.byId('q1/1/1/1/1/1').should('not.exist');
    // Nested tabs layout under Tab Two.
    cy.byId('nz-tabs-0-tab-1').click();
    cy.byId('q1/1/1/1/1/1').should('be.visible');
    cy.byId('q2/1/1/1/1/1').should('not.exist');
    cy.byId('nz-tabs-1-tab-1').click();
    cy.byId('q1/1/1/1/1/1').should('not.be.visible');
    cy.byId('q2/1/1/1/1/1').should('be.visible');

    // Pick something on the first question in the first tab.
    // enableWhen conditions on the nested tab container item
    // should hide it in the second main tab.
    cy.byId('nz-tabs-0-tab-0').click();
    cy.byId('/g3/g1m1/1/1/1/1').click().type('{downArrow}{enter}');
    cy.byId('nz-tabs-0-tab-1').click();
    // The nested tabs are now hidden.
    cy.byId('q1/1/1/1/1/1').should('not.exist');
  });
});
