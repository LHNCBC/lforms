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
    const f1a1 = '/g1m1/1/1N',
      f1a2 = '/g1m1/1/1Y',
      f1a3 = '/g1m1/1/1asked-unknown',
      f2a1 = 'yesno2/1N',
      f2a2 = 'yesno2/1Y',
      f2a3 = 'yesno2/1asked-unknown',
      f3a1 = 'yesno3/1N',
      f3a2 = 'yesno3/1Y',
      f3a3 = 'yesno3/1asked-unknown',
      f3Other = 'yesno3/1_other',
      f4a1 = 'yesno4/1N',
      f4a2 = 'yesno4/1Y',
      f4a3 = 'yesno4/1asked-unknown',
      f4Other = 'yesno4/1_other',
      f5a1 = 'yesno5/1N',
      f5a2 = 'yesno5/1Y',
      f5a3 = 'yesno5/1asked-unknown',
      f5Other = 'yesno5/1_other',
      f5OtherValue = 'yesno5/1_otherValue',
      f6a1 = 'yesno6/1N',
      f6a2 = 'yesno6/1Y',
      f6a3 = 'yesno6/1asked-unknown',
      f6Other = 'yesno6/1_other',
      f6OtherValue = 'yesno6/1_otherValue';

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

      // check answers are loaded
    });

  });

 
});

