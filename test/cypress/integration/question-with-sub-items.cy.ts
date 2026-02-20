import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
const po = new AddFormToPageTestPage();

describe('Question with sub items', () => {
  beforeEach(() => {
    cy.visit('test/pages/addFormToPageTest.html');
  });

  it('should render sub items for each selected checkbox and export properly', () => {
    util.addFormToPage('checkbox-with-child-items.json', null, {fhirVersion: 'R4'});
    cy.byId('parent-checkbox/1||a').click();
    cy.byId('parent-checkbox/1||b').click();
    cy.byId('parent-checkbox/1||o').click();
    cy.contains('Sub questions for answer: Apple').should('be.visible');
    cy.contains('Sub questions for answer: Banana').should('be.visible');
    cy.contains('Sub questions for answer: Orange').should('be.visible');
    // Unchecking an option should remove the sub items for that option.
    cy.byId('parent-checkbox/1||o').click();
    cy.contains('Sub questions for answer: Orange').should('not.be.visible');
    // Fill out the sub items.
    cy.byId('child-integer/1/checkbox-subgroup-parent-checkbox/1||a/1').type('11');
    cy.byId('child-integer/1/checkbox-subgroup-parent-checkbox/1||b/1').type('22');
    // Verify the exports.
    cy.window().then((win) => {
      const q = win.LForms.Util.getFormFHIRData("Questionnaire", "R4");
      const qr = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4");
      expect(q.item[0].item.length).to.equal(1);
      expect(q.item[0].item[0]).to.deep.equal({
        "type": "integer",
        "linkId": "child-integer",
        "text": "How many of this?"
      });
      expect(qr.item[0].answer.length).to.equal(2);
      expect(qr.item[0].answer[0]).to.deep.equal({
        "valueCoding": {
          "code": "a",
          "display": "Apple"
        },
        "item": [
          {
            "answer": [
              {
                "valueInteger": 11
              }
            ],
            "linkId": "child-integer",
            "text": "How many of this?"
          }
        ]
      });
      expect(qr.item[0].answer[1]).to.deep.equal({
        "valueCoding": {
          "code": "b",
          "display": "Banana"
        },
        "item": [
          {
            "answer": [
              {
                "valueInteger": 22
              }
            ],
            "linkId": "child-integer",
            "text": "How many of this?"
          }
        ]
      });
    });
  });

  it('should show as repeating question for dropdown layout with sub items', () => {
    util.addFormToPage('dropdown-with-child-items.json', null, {fhirVersion: 'R4'});
    cy.byId('add-parent-checkbox/1').should('be.visible');
    cy.byId('child-integer/1/1').should('be.visible');
    cy.byId('parent-checkbox/1').type('{Downarrow}{Enter}');
    cy.byId('add-parent-checkbox/1').click();
    cy.byId('child-integer/2/1').should('be.visible');
  });

  it('should remove invalid sub items when options are removed by answerExpression', () => {
    util.addFormToPage('checkbox-answerExpression-with-child-items.json', null, {fhirVersion: 'R4'});
    // Build the answer options list for the checkbox question.
    cy.byId('fruit/1').type('Apple');
    cy.byId('add-fruit/1').click();
    cy.byId('fruit/2').type('Banana');
    cy.byId('add-fruit/2').click();
    cy.byId('fruit/3').type('Orange');
    // Select Apple and Banana.
    cy.byId('parent-checkbox/1||Apple').click();
    cy.byId('parent-checkbox/1||Banana').click();
    cy.contains('Sub questions for answer: Apple').should('be.visible');
    cy.contains('Sub questions for answer: Banana').should('be.visible');
    // Fill out sub items for Apple and Banana.
    cy.byId('child-integer/1/checkbox-subgroup-parent-checkbox/1||Apple/1').type('11');
    cy.byId('child-integer/1/checkbox-subgroup-parent-checkbox/1||Banana/1').type('22');
    // Delete the option Banana from answerExpression source, which should remove the sub items for Banana.
    cy.byId('del-fruit/2').click();
    // Banana is removed.
    cy.byId('parent-checkbox/1||Banana').should('not.exist');
    cy.contains('Sub questions for answer: Banana').should('not.be.visible');
    // Apple should still be selected, and its sub items should still be there.
    cy.byId('parent-checkbox/1||Apple').find('input[type="checkbox"]').should('be.checked');
    cy.contains('Sub questions for answer: Apple').should('be.visible');
    // Orange should not be selected, and its sub items should not be there.
    cy.byId('parent-checkbox/1||Orange').find('input[type="checkbox"]').should('not.be.checked');
    cy.contains('Sub questions for answer: Orange').should('not.exist');
  });
});
