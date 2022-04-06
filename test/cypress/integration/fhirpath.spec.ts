import {TestPage} from '../support/lforms_testpage.po.js';
import * as FHIRSupport from '../../../src/fhir/versions.js';
import {TestUtil} from '../support/testUtilFacade.js';

const fhirVersions = Object.keys(FHIRSupport);
const tp = new TestPage();

for (let i = 0, len = fhirVersions.length; i < len; ++i) {
  (fhirVersion => {
    describe(fhirVersion, () => {
      describe('FHIRPath functionality', () => {
        describe('FHIRPath calculated-expression', () => {
          function testBMIFormula() {
            TestUtil.waitForFHIRLibsLoaded();
            cy.get('#fileAnchor').uploadFile(`test/data/${fhirVersion}/weightHeightQuestionnaire.json`);
            cy.byId('/29463-7/1').click().type('70');
            cy.byId('/8302-2/1').click().type('60');
            cy.byId('/39156-5/1').should('have.value', 30.1);
          }

          // A test of the questionnaire-calculatedExpression extension
          it('work to compute a BMI value', () => {
            tp.openBaseTestPage();
            testBMIFormula();
          });

          it('work to compute a BMI value with the built files', () => {
            tp.openBuildTestFHIRPath();
            testBMIFormula();
          });
        });
      });

    });
  })(fhirVersions[i]);
}
