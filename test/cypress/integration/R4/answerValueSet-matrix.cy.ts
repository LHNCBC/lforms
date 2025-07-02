import { AddFormToPageTestPage } from '../../support/addFormToPageTest.po';
import { TestUtil } from '../../support/testUtilFacade';
import * as util from '../../support/util';

const fhirVersion = 'R4';
const fhirMock = require('../../support/R4/fhir_context');

const po: AddFormToPageTestPage = new AddFormToPageTestPage();

describe('FHIR answerValueSet', () => {
  before(() => {
    cy.visit('test/pages/addFormToPageTest.html');
    TestUtil.waitForFHIRLibsLoaded();
  });

  describe('answerValueSet with FHIR context, answers displayed as matrix (first load)', () => {

    before(() => {
      cy.window().then((win) => {
        const fhirContext = new Function(
          'return ' + fhirMock.mockFHIRContext
        )();
        win.LForms.Util.setFHIRContext(
          fhirContext(fhirVersion, null, fhirMock.mockData)
        );
      });
    });

    it('should have expected answer list when the Questionnaire is loaded', () => {
      // load the questionnaire for the first time so that the answer list expanded from 
      // item.answerValueSet is not cached.
      util.addFormToPage('q-with-answerValueSet-matrix.json', null, {
        fhirVersion,
      });
      let g = 1,
        m = 1;
      while (g < 5) {
        while (m < 4) {
          cy.byId('/g' + g + 'm' + m + '/1/1N').should('be.visible');
          cy.byId('/g' + g + 'm' + m + '/1/1Y').should('be.visible');
          cy.byId('/g' + g + 'm' + m + '/1/1asked-unknown').should(
            'be.visible'
          );
          m++;
        }
        g++;
      }
      cy.byId('/g3m1/1/1_other').should('be.visible');
      cy.byId('/g3m2/1/1_other').should('be.visible');
      cy.byId('/g3m3/1/1_other').should('be.visible');

      cy.byId('/g4m1/1/1_other').should('be.visible');
      cy.byId('/g4m2/1/1_other').should('be.visible');
      cy.byId('/g4m3/1/1_other').should('be.visible');

    });
  });
});

