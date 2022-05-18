import {TestPage} from '../support/lforms_testpage.po.js';
import * as FHIRSupport from '../../../src/fhir/versions.js';
import * as util from '../support/util';

const fhirVersions = Object.keys(FHIRSupport);
const tp = new TestPage();
const ff = tp.USSGFHTVertical;

for (let i = 0, len = fhirVersions.length; i < len; ++i) {
  (fhirVersion => {
    describe(fhirVersion, () => {
      before(() => {
        cy.visit('test/pages/addFormToPageTest.html');
        util.addFormToPage('fhir-context-q.json', null, {fhirVersion});
      });

      describe('External prefetch answerValueSets', () => {
        it('should be retrieved when a terminology server is specified', () => {
          cy.byId('label-54127-6').should('be.visible');
          cy.byId('/54126-8/54128-4/1/1').click();
          cy.get('#searchResults li:nth-child(3)').click();
          cy.byId('/54126-8/54128-4/1/1').should('have.value', 'Don\'t know');
        });

        it('should be retrieved when a terminology server is not specified', () => {
          cy.byId('/54114-4/54122-7/1/1').click();
          cy.get('#searchResults li:nth-child(3)').click();
          cy.byId('/54114-4/54122-7/1/1').should('have.value', 'High');
        });
      });

      describe('External autocomplete answerValueSets', () => {
        it('should be able to search via ValueSet expansion', () => {
          cy.byId(ff.ethnicity).click().typeAndWait('arg');
          cy.get('#searchResults li:first-child').should('have.text', 'Argentinean');

          cy.byId(ff.disease).click().typeAndWait('arm');
          cy.get('#searchResults li:first-child').click();
          cy.byId(ff.disease).should('have.value', 'Arm pain');
        });
      });

    });
  })(fhirVersions[i]);
}
