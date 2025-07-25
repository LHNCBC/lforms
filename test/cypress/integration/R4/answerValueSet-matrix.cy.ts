import { AddFormToPageTestPage } from '../../support/addFormToPageTest.po';
import { TestUtil } from '../../support/testUtilFacade';
import * as util from '../../support/util';
const answerId = util.answerId;

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
          cy.byId(answerId('/g' + g + 'm' + m + '/1/1',
            'http://terminology.hl7.org/CodeSystem/v2-0136', 'N')).should('be.visible');
          cy.byId(answerId('/g' + g + 'm' + m + '/1/1',
            'http://terminology.hl7.org/CodeSystem/v2-0136', 'Y')).should('be.visible');
          cy.byId(answerId('/g' + g + 'm' + m + '/1/1',
            'http://terminology.hl7.org/CodeSystem/data-absent-reason', 'asked-unknown')).should(
            'be.visible'
          );
          m++;
        }
        g++;
      }
      cy.byId(answerId('/g3m1/1/1', '_other')).should('be.visible');
      cy.byId(answerId('/g3m2/1/1', '_other')).should('be.visible');
      cy.byId(answerId('/g3m3/1/1', '_other')).should('be.visible');

      cy.byId(answerId('/g4m1/1/1', '_other')).should('be.visible');
      cy.byId(answerId('/g4m2/1/1', '_other')).should('be.visible');
      cy.byId(answerId('/g4m3/1/1', '_other')).should('be.visible');

    });
  });
});

