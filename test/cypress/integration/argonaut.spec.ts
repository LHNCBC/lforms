import * as util from "../support/util.js";
import * as FHIRSupport from "../../../src/fhir/versions.js";

const fhirVersions = Object.keys(FHIRSupport);

// Testing that questionnaire-hidden extension works as expected.
for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion + ': questionnaire-hidden extension', function () {
      it('Instructions field G0.d should be hidden', function() {
        cy.visit('test/pages/addFormToPageTest.html');
        util.addFormToPage('Argonaut-questionnaire-questionnaire-example-asq3.json', null, {fhirVersion});
        cy.get('#label-G0\\.d\\/1\\/1').should('not.exist');
      });

      it('non-hidden field G1/G1.4 should be displayed', function() {
        cy.visit('test/pages/addFormToPageTest.html');
        util.addFormToPage('Argonaut-questionnaire-questionnaire-example-asq3.json', null, {fhirVersion});
        cy.get('.lhc-form-title').should('be.visible');
        cy.get('#label-G1\\.4\\/1\\/1').should('be.visible');
      });
    });
  })(fhirVersions[i]);
}
