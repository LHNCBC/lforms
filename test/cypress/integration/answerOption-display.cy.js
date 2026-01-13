import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
const po = new AddFormToPageTestPage();
var fhirVersions = ["R4", "R5"];

describe('AnswerOption display', () => {
  before(() => {
    po.openPage();
  });

  for (var i=0, len=fhirVersions.length; i<len; ++i) {
    (function (fhirVersion) {

      describe(fhirVersion, () => {
        it('should display answerOption correctly even when when it is missing either a code or a display string (but not both)', () => {
          let fileName = 'questionnaire-answerOption-without-code-or-display.json';
          util.addFormToPage(fileName, null, {fhirVersion});

          cy.byId('/answers/1')
            .should('be.visible')
            .click();
          cy.byCss("#lhc-tools-searchResults li").eq(0).contains('c1');
          cy.byCss("#lhc-tools-searchResults li").eq(1).contains('Answer 2');
          cy.byCss("#lhc-tools-searchResults li").eq(2).contains('Answer 3');
        });

        it('should use openLabel for "other" answer option', () => {
          const fileName = 'q-with-openLabel.json';
          util.addFormToPage(fileName, null, {fhirVersion});
          cy.byId('group1-item1/1/1|_other').should('contain.text', 'Other event (specify)');
          cy.byId('group1-item2/1/1|_other').should('contain.text', 'Other event (specify)');
        });

        it('should use openLabel for "other" answer option in matrix layout', () => {
          const fileName = 'q-with-openLabel-matrix-layout.json';
          util.addFormToPage(fileName, null, {fhirVersion});
          cy.byId('/matrixTable1/1_header_other').should('contain.text', 'Other event (specify) 1');
          cy.byId('/matrixTable2/1_header_other').should('contain.text', 'Other event (specify) 2');
        });
      });
    })(fhirVersions[i]);
  }
});




