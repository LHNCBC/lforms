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
            tp.loadFromTestData('weightHeightQuestionnaire.json', fhirVersion);
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

describe('answerExpression', () => {
  before(() => {
    tp.openBaseTestPage();
    TestUtil.waitForFHIRLibsLoaded();
    tp.loadFromTestData('answerExpressionTest.json');
  });

  it('should be able to populate a list', () => {
    cy.byId('language/1').click();
    cy.get('#searchResults li').should('have.length', 2);
    cy.get('#searchResults li').first().should('be.visible');
  });

  it('should not cause answerOptions to be generated in the Questionnaire', () => {
    cy.window().then((win) => {
      const data1 = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      expect(data1.item[0].answerOption).to.be.undefined;
      const data2 = win.LForms.Util.getFormFHIRData('Questionnaire', 'STU3');
      expect(data2.item[0].option).to.be.undefined;
    });
  });

  it('should not clear a list field if the form has just loaded with saved data', () => {
    // This is the case when a QuestionnaireResponse is loaded in that has a
    // value in a field whose list comes from an answerExpression or a
    // cqf-expression.  Initially, there is no list, but when the expression
    // runs, a list is obtained.  Because the data in the field is saved data,
    // it should not be cleared, even if it is not in the current list.  For
    // example, in the RxTerms form below, if the user saved a drug name and a
    // strength value, when the form is later loaded, RxTerms might have been
    // updated and no longer have the selected strength value, or even the drug
    // name itself.  We must be careful not to discard the user's data just
    // because the form is re-opened.

    // Load the RxTerms test form and get a QuestionnaireResponse.
    tp.loadFromTestData('rxterms.R4.json', 'R4');
    cy.byId('medication/1/1').click().typeAndWait('ar');
    cy.get('#searchResults li:first-child').click();
    cy.byId('strength/1/1').click();
    cy.get('#searchResults li').should('have.length.above', 0);
    cy.get('#searchResults li:first-child').click();
    cy.byId('rxcui/1/1').should('not.have.value', '');
    cy.window().then((win) => {
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      cy.visit('/test/pages/addFormToPageTest.html');
      cy.window().then((win2) => {
        win2.LForms.Util.removeFormsFromPage('formContainer');
        win2.LForms.Util.removeFormsFromPage('formContainer2');
        cy.readFile('test/data/R4/rxterms.R4.json').then((q) => {
          const qOrig = JSON.parse(JSON.stringify(q)); // a copy
          const qrOrig = JSON.parse(JSON.stringify(qr)); // a copy
          showQQR(q, qr, 'formContainer', win2);
          cy.byId('strength/1/1').click();
          cy.get('#searchResults li').should('have.length.above', 0);
          checkSavedDataPresent();
          cy.then(() => {
            // Now confirm that if the value in the strength field does not match its
            // list, it still does not get cleared (see note above).
            qr.item[0].item[1].answer[0].valueCoding.code = 'I am not in the list';
            showQQR(q, qr, 'formContainer', win2);
            cy.byId('strength/1/1').click();
            cy.get('#searchResults li').should('have.length.above', 0);
            checkSavedDataPresent();
            cy.then(() => {
              // Test the same thing with a vertical layout
              q.item[0].extension.splice(1, 1); // delete itemControl "gtable" extension
              showQQR(q, qr, 'formContainer', win2);
              cy.byId('strength/1/1').click();
              cy.get('#searchResults li').should('have.length.above', 0);
              checkSavedDataPresent();
              cy.then(() => {
                // Test again with a drug code that is off list
                qr.item[0].item[0].answer[0].valueCoding.code = 'off-list code';
                showQQR(q, qr, 'formContainer', win2);
                cy.byId('strength/1/1').should('be.visible');
                checkSavedDataPresent();
                cy.then(() => {
                  // Test again with a drug name that has no code (was never on the list)
                  qr.item[0].item[0].answer[0].valueCoding = {display: 'Off-list drug name'};
                  showQQR(q, qr, 'formContainer', win2);
                  cy.byId('strength/1/1').should('be.visible');
                  checkSavedDataPresent();

                  cy.then(() => {
                    // Test with multiple values in the strength
                    q = JSON.parse(JSON.stringify(qOrig));
                    qr = JSON.parse(JSON.stringify(qrOrig));
                    q.item[0].item[1].repeats = true;
                    delete q.item[0].item[2].extension;
                    qr.item[0].item[1].answer[1] = {valueCoding: {display: 'other value'}};
                    showQQR(q, qr, 'formContainer', win2);
                    cy.byId('strength/1/1').click();
                    cy.get('#searchResults li').should('have.length.above', 0);
                    cy.byId('medication/1/1').should('not.have.value', '');
                    // The strength field's values are in the multi-select area.
                    cy.byId('strength/1/1').then((el) => {
                      const selectedItems = el[0].autocomp.getSelectedItems();
                      expect(selectedItems && selectedItems.length).to.equal(2);
                    });
                    cy.byId('rxcui/1/1').should('not.have.value', '');
                    cy.then(() => {
                      // Test with radio buttons
                      q = JSON.parse(JSON.stringify(qOrig));
                      qr = JSON.parse(JSON.stringify(qrOrig));
                      q.item[0].extension.splice(1, 1); // delete itemControl "gtable" extension
                      // Replace the strength field drop down with radio buttons
                      q.item[0].item[1].extension[0] = {
                        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
                        valueCodeableConcept: {
                          text: 'Radio Button',
                          coding: [
                            {
                              code: 'radio-button',
                              display: 'Radio Button',
                              system: 'http://hl7.org/fhir/questionnaire-item-control'
                            }
                          ]
                        }
                      };
                      showQQR(q, qr, 'formContainer', win2);
                      cy.byId('medication/1/1').should('not.have.value', '');
                      cy.byId('strength/1/1213377').find('input').should('be.checked');
                      cy.byId('rxcui/1/1').should('not.have.value', '');
                      cy.then(() => {
                        // Test with checkboxes an multiple values
                        q = JSON.parse(JSON.stringify(q)); // make a copy for the new test
                        qr = JSON.parse(JSON.stringify(qr));
                        q.item[0].item[1].repeats = true;
                        q.item[0].item[1].extension[0] = {
                          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                          "valueCodeableConcept": {
                            "text": "Check-box",
                            "coding": [
                              {
                                "code": "check-box",
                                "display": "Check-box",
                                "system": "http://hl7.org/fhir/questionnaire-item-control"
                              }
                            ]
                          }
                        };
                        qr.item[0].item[1].answer[1] = {valueString: 'other value'};
                        showQQR(q, qr, 'formContainer', win2);
                        cy.byId('medication/1/1').should('not.have.value', '');
                        cy.byId('strength/1/1213377').find('input').should('be.checked');
                        cy.byId('strength/1/1_other').find('input').should('be.checked');
                        cy.byId('strength/1/1_otherValue').should('have.value', 'other value');
                        cy.byId('rxcui/1/1').should('not.have.value', '');
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

/**
 *  Converts a Questionnaire and QuestionnaireResponse into an LFormsData
 *  object, and uses addFormToPage to render it in the specified element.
 * @param q the Questionnaire (parsed)
 * @param qr the QuestionnaireResponse
 * @param elemID the ID of an element into which the form should be shown.
 * @param win the window object.
 */
function showQQR(q, qr, elemID, win) {
  const lfd = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, 'R4');
  let merged = win.LForms.Util.mergeFHIRDataIntoLForms(qr, lfd, 'R4');
  merged = new win.LForms.LFormsData(merged);
  cy.wrap(win.LForms.Util.addFormToPage(merged, elemID));
}

// Confirms that the saved data is still on the displayed form.
function checkSavedDataPresent() {
  cy.byId('strength/1/1').should('not.have.value', '');
  cy.byId('rxcui/1/1').should('not.have.value', '');
}
