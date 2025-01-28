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
        it('should display answerOption correcotly even when there are no code or display', () => {
          let fileName = 'questionnaire-answerOption.json';
          util.addFormToPage(fileName, null, {fhirVersion});
  
          cy.byId('/answers/1')
            .should('be.visible')
            .click();
          cy.byCss("#searchResults li").eq(0).contains('c1');
          cy.byCss("#searchResults li").eq(1).contains('Answer 2');
          cy.byCss("#searchResults li").eq(2).contains('Answer 3');
        }); 
      });
    })(fhirVersions[i]);
  }
});




