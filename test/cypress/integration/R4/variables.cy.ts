import {TestPage} from '../../support/lforms_testpage.po.js';
import {TestUtil} from '../../support/testUtilFacade';

const fhirVersion = 'R4';
const fhirMock = require('../../support/R4/fhir_context');
const tp: TestPage = new TestPage();

describe('FHIR variables', () => {
  before(() => {
    tp.openBaseTestPage();
    TestUtil.waitForFHIRLibsLoaded();
  });

  describe('FHIRPath variables', () => {
    const addGroupA = 'add-/groupA/1';
    const fieldB1 = '/groupA/fieldB/1/1';
    const addFieldB = 'add-/groupA/fieldB/1/1';
    const fieldB2 = '/groupA/fieldB/1/2';
    const fieldBg2f1 = '/groupA/fieldB/2/1';
    const fieldC = '/groupA/fieldC/1/1';
    const fieldCg2 = '/groupA/fieldC/2/1';
    const fieldD = '/groupB/fieldD/1/1';
    const fieldE = '/groupB/fieldE/1/1';

    before(() => {
      tp.loadFromTestData('variable-scope-test.json', 'R4');
    });

    it('should have expected values before typing', () => {
      cy.byId(fieldB1).should('have.value', '');
      cy.byId(fieldC).should('have.value', '');
      cy.byId(fieldD).should('have.value', '');
      cy.byId(fieldE).should('have.value', '');
    });

    it('should have expected values after typing', () => {
      cy.byId(fieldB1).type('1');
      cy.byId(addFieldB).click();
      cy.byId(fieldB2).type('2');
      cy.byId(fieldB1).should('have.value', '1');
      cy.byId(fieldB2).should('have.value', '2');
      cy.byId(fieldC).should('have.value', '8');
      cy.byId(fieldD).should('have.value', '');
      cy.byId(fieldE).should('have.value', '16');
    });

    it('should have working expressions for added groups', () => {
      cy.byId(addGroupA).click();
      cy.byId(fieldBg2f1).type('3');
      cy.byId(fieldC).should('have.value', '8');
      cy.byId(fieldCg2).should('have.value', '10');
    });
  });

  describe('x-fhir-query variable test form', () => {
    before(() => {
      cy.window().then((win) => {
        const fhirContext = new Function('return ' + fhirMock.mockFHIRContext)();
        win.LForms.Util.setFHIRContext(fhirContext(fhirVersion, null, fhirMock.mockData));
      });
      tp.loadFromTestData('x-fhir-query-test.R4.json', 'R4');
    });

    it('should populate the lists when the controlling item is selected', () => {
      const listSelField = 'listSelection/1';
      const urlFetchField = 'listViewFromURL/1';
      const contextField = 'listViewFromContext/1';
      cy.byId(listSelField).type('la'); // language
      cy.get('#lhc-tools-searchResults li:first-child').click();
      // Wait for the other field lists to update
      TestUtil.verifyFieldListLength(urlFetchField, 2);
      TestUtil.verifyFieldListLength(contextField, 2);

      // After picking the language list, pick the second list, for which there
      // is no mock data, so only the first listView field should have a list.
      // Testing this here after the previous test checks that the second
      // listView field's list is empty.
      // This test code actually does not catch the bug which prompted it (and
      // in fact the problem does not happen when the test code is run), but I
      // am leaving the test here.
      cy.byId(listSelField).clear().type('ve'); // verification
      cy.get('#lhc-tools-searchResults li:first-child').click();
      // Wait for the other field lists to update
      TestUtil.verifyFieldListLength(urlFetchField, 6);
      TestUtil.verifyFieldListLength(contextField, 0);
    });
  });

  describe('variables from named expressions', () => {
    it('should be useable by other expressions', () => {
      tp.loadFromTestData('named-expressions.json', 'R4');
      const fieldA = 'idA/1';
      const fieldC = 'idC/1';
      cy.byId(fieldA).type('1');
      cy.byId(fieldC).should('have.value', '6');
      cy.byId(fieldA).clear();
      cy.byId(fieldC).should('have.value', '');
      cy.byId(fieldA).type('2');
      cy.byId(fieldC).should('have.value', '7');
    });
  });
});
