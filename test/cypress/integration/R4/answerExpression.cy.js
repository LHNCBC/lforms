import { AddFormToPageTestPage } from "../../support/addFormToPageTest.po";
import * as util from "../../support/util";
const po = new AddFormToPageTestPage();

// Tests of the support for answerExpression on choice, open-choice, and
// string, date, time and integer
describe('AnswerExpression ', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('answerExpTest.R4.json', null, {fhirVersion: 'R4'});
  });

  it('should update answer list on an item whose type is string', () => {
    cy.byId('q2String/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 3);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q2String/1').should('have.value', 'one');
  });

  it('should update answer list on an item whose type is integer', () => {
    cy.byId('q3Integer/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 3);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q3Integer/1').should('have.value', '12');
  });

  it('should update answer list on an item whose type is date', () => {
    cy.byId('q4Date/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 3);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q4Date/1').should('have.value', '2022-11-12');
  });

  it('should update answer list on an item whose type is time', () => {
    cy.byId('q5Time/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 3);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q5Time/1').should('have.value', '17:03:07');
  });

  it('should update answer list on when the source item changes', () => {
    cy.byId('q1/1').click().type("abc");

    cy.byId('q1ListChoice/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 1);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q1ListChoice/1').should('have.value', 'abc');

    cy.byId('q1ListString/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 1);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q1ListString/1').should('have.value', 'abc');

    // added another q1
    cy.byId('add-q1/1').click()
    cy.byId('q1/2').click().type("def");
    // the existing answer lists on 2 items disappeared (expected behavior)
    cy.byId('q1ListChoice/1').should('have.value', '');
    cy.byId('q1ListString/1').should('have.value', '');

    cy.byId('q1ListChoice/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 2);
    cy.get('#lhc-tools-searchResults li:first-child').click();
    cy.byId('q1ListChoice/1').should('have.value', 'abc');

    cy.byId('q1ListString/1').click();
    cy.get('#lhc-tools-searchResults li').should('have.length', 2);
    cy.get('#lhc-tools-searchResults li:nth-child(2)').click();
    cy.byId('q1ListString/1').should('have.value', 'def');

  });

  it('should get correct data in lforms internal format', () => {
    cy.window().then((win) => {
      let lfData = win.LForms.Util.getFormData();
      expect(lfData.items[0].value).to.equal("abc");
      expect(lfData.items[1].value).to.equal("def");
      expect(lfData.items[2].value).to.eql({"text": "abc"});
      expect(lfData.items[3].value).to.eql({"text": "def"});
      expect(lfData.items[4].value).to.eql({"text": "one"});
      expect(lfData.items[5].value).to.eql({"text": 12});
      expect(lfData.items[6].value).to.eql({"text": "2022-11-12"});
      expect(lfData.items[7].value).to.eql({"text": "17:03:07"});

    });
  });

  it('should get correct data in QuestionnaireResponse', () => {
    cy.window().then((win) => {
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      expect(qr.item[0].answer).to.eql([{"valueString": "abc"}, {"valueString": "def"}]);
      expect(qr.item[1].answer).to.eql([{"valueCoding": {"display": "abc"}}]);
      expect(qr.item[2].answer).to.eql([{"valueString": "def"}]);
      expect(qr.item[3].answer).to.eql([{"valueString": "one"}]);
      expect(qr.item[4].answer).to.eql([{"valueInteger": 12}]);
      expect(qr.item[5].answer).to.eql([{"valueDate": "2022-11-12"}]);
      expect(qr.item[6].answer).to.eql([{"valueTime": "17:03:07"}]);
    });
  });

  it('should get correct data in Questionnaire', () => {
    cy.window().then((win) => {
      let q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      for (let i=0; i<7; i++) {
        expect(q.item[i].answerOption).to.equal(undefined)
      }
    });
  });
});
