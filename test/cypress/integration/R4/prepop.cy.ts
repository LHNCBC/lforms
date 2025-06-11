import {TestPage} from '../../support/lforms_testpage.po.js';
import {AddFormToPageTestPage} from '../../support/addFormToPageTest.po.js';
import {TestUtil} from '../../support/testUtilFacade.js';
import * as util from '../../support/util.js';

const fhirVersion = 'R4'; // for questionnaire resources
const mockFHIRContext = require('../../support/R4/fhir_context').mockFHIRContext;
const tp: TestPage = new TestPage();
const po = new AddFormToPageTestPage();

/**
 *  Sets up a mock server FHIR context.  This will also set the page to do
 *  prepopulation.  (If that is not desired, set prepopFHIR to false.)
 * @param fhirVersion the FHIR version number (as a string) for the mock server.
 * @param weightQuantity the quantity to return from a search for a weight.
 * @param prepopFHIR whether the prepopulation should be enabled.
 */
function setServerFHIRContext(fhirVersion, weightQuantity = null, prepopFHIR = true) {
  cy.window().then((win) => {
    win.LForms.Util.setFHIRContext(mockFHIRContext(fhirVersion, weightQuantity));
    win.prepopulateFHIR = prepopFHIR;
  });
}

describe('Form pre-population', () => {
  ['3.0', '4.0'].forEach(serverFHIRNum => {
    it('should be able to use %questionnaire in expressions with server FHIR version ' + serverFHIRNum, () => {
      tp.openBaseTestPage();
      TestUtil.waitForFHIRLibsLoaded();
      setServerFHIRContext(serverFHIRNum);
      tp.loadFromTestData('phq9.json', 'R4');

      // This test form does prepoluation of the first answer.
      // This is also a test of prepoluation of list questions.
      const firstQ = '/44250-9/1';
      cy.byId(firstQ).should('exist').should('have.value', '0. Not at all - 0');
      const sum = '/44261-6/1';
      cy.byId(sum).should('have.value', '0');
    });
  });

  describe('with bower packages', () => {
    before(() => {
      tp.openBaseTestPage();
      TestUtil.waitForFHIRLibsLoaded();
    });

    it('should be possible to pull in data from a FHIR context', () => {
      setServerFHIRContext('3.0');
      tp.loadFromTestData('ussg-fhp.json', 'R4');
      cy.byId(tp.USSGFHTVertical.name).should('have.value', 'John Smith');
      cy.byId(tp.USSGFHTVertical.dob).should('have.value', '12/10/1990');
      // expect(tp.USSGFHTVertical.gender.getAttribute('value')).toBe("Male"); // TBD
      // initialExpression fields should not be read-only.
      cy.byId(tp.USSGFHTVertical.name).should('not.be.disabled');
    });

    it('should be possible to get a Questionnaire back with launchContext', () => {
      setServerFHIRContext('3.0');
      cy.window().then((win) => {
        const q2Data = win.LForms.Util.getFormFHIRData('Questionnaire', fhirVersion);
        const launchContextExt = win.LForms.Util.findObjectInArray(q2Data.extension, 'url',
          win.LForms.FHIR.R4.SDC.fhirExtLaunchContext, 0);
        expect(launchContextExt).not.to.be.null;
      });
    });

    ['3.0', '4.0'].forEach(serverFHIRNum => {
      describe('by observationLinkPeriod with server FHIR version ' + serverFHIRNum, () => {
        before(() => {
          tp.openBaseTestPage();
          TestUtil.waitForFHIRLibsLoaded();
          setServerFHIRContext(serverFHIRNum);
        });

        it('should load values from observationLinkPeriod', () => {
          tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
          const weightField = '/29463-7/1';
          cy.byId(weightField).should('exist').should('have.value', '95');
          const unitField = 'unit_/29463-7/1';
          cy.byId(unitField).should('have.value', 'kg');
        });

        it('should populate observationLinkPeriod fields that are not top-level', () => {
          tp.loadFromTestData('ussg-fhp.json', 'R4');
          const weightField = '/54126-8/29463-7/1/1';
          cy.byId(weightField).should('exist').should('have.value', '95');
        });

        it('should extract observationExtract fields that are not top-level', () => {
          // Follows previous test on population
          const releaseVersion = serverFHIRNum == '3.0' ? 'STU3' : 'R4';
          cy.window().then((win) => {
            const resources = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', releaseVersion, null, {extract: true});
            expect(resources.length).to.equal(2); // One QR and one observation
            const obs = resources[1];
            expect(obs.resourceType).to.equal('Observation');
            expect(obs.valueQuantity.value).to.equal(95);
            expect(obs.valueQuantity.code).to.equal('kg');
          });
        });

        it('should populate observationLinkPeriod fields when multiple codes are present', () => {
          tp.loadFromTestData('multipleCodes.json', 'R4');
          const weightField = '/29463-7/1';
          cy.byId(weightField).should('exist').should('have.value', '96');
        });

        it('should extract observationExtract fields when multiple codes are present', () => {
          // Follows previous test on population
          let releaseVersion = serverFHIRNum == '3.0' ? 'STU3' : 'R4';
          cy.window().then((win) => {
            const resources = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', releaseVersion, null, {extract: true});
            expect(resources.length).to.equal(3); // One QR and two observation
            const obs = resources[1];
            expect(obs.code.coding.length).to.equal(2);
            expect(obs.resourceType).to.equal('Observation');
            expect(obs.valueQuantity.value).to.equal(96);
            expect(obs.valueQuantity.code).to.equal('kg');
          });
        });

        it('should not load values from observationLinkPeriod if prepopulation is disabled', () => {
          setServerFHIRContext(serverFHIRNum, null, false);
          tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
          cy.wait(20); // give asynchronous prepopulation a chance to happen
          cy.byId('/29463-7/1').should('have.value', '');
        });

        it('should convert values from observationLinkPeriod', () => {
          tp.openBaseTestPage();
          TestUtil.waitForFHIRLibsLoaded();
          setServerFHIRContext(serverFHIRNum, {
            value: 140,
            unit: '[lb_av]',
            system: 'http://unitsofmeasure.org',
            code: '[lb_av]'
          });

          tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
          cy.byId('/29463-7/1').should('have.value', '63.5');
          cy.byId('unit_/29463-7/1').should('have.value', 'kg');
        });
      });

      describe('addFormToPage', () => {
        it('should not load values from observationLinkPeriod if prepopulation ' +
          'is disabled, with server FHIR version ' + serverFHIRNum, () => {
          po.openPage();
          setServerFHIRContext(serverFHIRNum, null, false);
          cy.get('#fileAnchor').uploadFile('test/data/R4/weightHeightQuestionnaire.json');
          cy.wait(20);
          cy.byId('/29463-7/1').should('have.value', '');
        });

        it('should load values from observationLinkPeriod if prepopulation ' +
          'is enabled, with server FHIR version ' + serverFHIRNum, () => {
          po.openPage();
          setServerFHIRContext(serverFHIRNum);
          cy.get('#fileAnchor').uploadFile('test/data/R4/weightHeightQuestionnaire.json');
          cy.byId('/29463-7/1').should('have.value', '95');
        });
      });
    });
  });

  describe('with npm packages', () => {
    it('should load values from observationLinkPeriod', () => {
      tp.openBuildTestFHIRPath();
      TestUtil.waitForFHIRLibsLoaded();
      setServerFHIRContext('4.0');
      tp.loadFromTestData('weightHeightQuestionnaire.json', 'R4');
      cy.byId('/29463-7/1').should('have.value', '95');
      cy.byId('unit_/29463-7/1').should('have.value', 'kg');
    });
  });

  describe('enableWhen and initialExpression', ()=>{
    it('enableWhen should work on the answer lists populated by initialExpression', ()=>{
      cy.visit('test/pages/addFormToPageTest.html');

      util.addFormToPage('expression-on-data-from-prepopulation.json', null, {fhirVersion: 'R4'});

      cy.byId('p1.1/1/1').should('have.value','Interventional')
      cy.byId('p1.2/1/1').should('be.visible');
      cy.byId('p1.2/1/1').should('have.value','');
      cy.byId('p1.2/1/1').click()
      cy.get('#searchResults li').should('have.length', 4);

      cy.byId('p3.1.14/1').should('be.visible');

    });
  });
});
