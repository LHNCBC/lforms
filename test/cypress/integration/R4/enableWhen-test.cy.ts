import { AddFormToPageTestPage } from "../../support/addFormToPageTest.po";
import * as util from "../../support/util";
const po = new AddFormToPageTestPage();

// Tests of the support for answerExpression on choice, open-choice, and
// string, date, time and integer
describe('EnableWhen on different types ', () => {
  before(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('enableWhen-test.R4.json', null, {fhirVersion: 'R4'});
  });
  
  it('should work on boolean items', () => {
    cy.byId('Q1/1/1true').find('input').should('not.be.checked')
    cy.byId('Q1/1/1false').find('input').should('not.be.checked')
    cy.byId('Q1/1/1null').find('input').should('be.checked')
    
    cy.byId('Q1-not-exists/1/1').should('be.visible')
    cy.byId('Q1-not-true/1/1').should('be.visible')
    cy.byId('Q1-exists/1/1').should('not.exist')
    cy.byId('Q1-true/1/1').should('not.exist')
    cy.byId('Q1-false/1/1').should('not.exist')

    cy.byId('Q1/1/1true').find('input').click()
    cy.byId('Q1-not-exists/1/1').should('not.exist')
    cy.byId('Q1-not-true/1/1').should('not.exist')
    cy.byId('Q1-exists/1/1').should('be.visible')
    cy.byId('Q1-true/1/1').should('be.visible')
    cy.byId('Q1-false/1/1').should('not.exist')

    cy.byId('Q1/1/1false').find('input').click()
    cy.byId('Q1-not-exists/1/1').should('not.exist')
    cy.byId('Q1-not-true/1/1').should('be.visible')
    cy.byId('Q1-exists/1/1').should('be.visible')
    cy.byId('Q1-true/1/1').should('not.exist')
    cy.byId('Q1-false/1/1').should('be.visible')
    
  });

  it('should work on string as answerOption items', () => {

    cy.byId('Q9a-not-exists/1/1').should('be.visible')
    cy.byId('Q9a-exists/1/1').should('not.exist')
    cy.byId('Q9a-noteq-B/1/1').should('be.visible')
    cy.byId('Q9a-eq-B/1/1').should('not.exist')

    cy.byId('Q9a/1/1').click().type('{downarrow}').type('{enter}');
    cy.byId('Q9a/1/1').should('have.value',"A");
    cy.byId('Q9a-not-exists/1/1').should('not.exist')
    cy.byId('Q9a-exists/1/1').should('be.visible')
    cy.byId('Q9a-noteq-B/1/1').should('be.visible')
    cy.byId('Q9a-eq-B/1/1').should('not.exist')

    cy.byId('Q9a/1/1').click().type('{downarrow}{downarrow}').type('{enter}');
    cy.byId('Q9a/1/1').should('have.value',"B");
    cy.byId('Q9a-not-exists/1/1').should('not.exist')
    cy.byId('Q9a-exists/1/1').should('be.visible')
    cy.byId('Q9a-noteq-B/1/1').should('not.exist')
    cy.byId('Q9a-eq-B/1/1').should('be.visible')
 
  });


  it('should work on integer as answerOption items', () => {

    cy.byId('Q9b-not-exists/1/1').should('be.visible')
    cy.byId('Q9b-exists/1/1').should('not.exist')
    cy.byId('Q9b-noteq-B/1/1').should('be.visible')
    cy.byId('Q9b-eq-B/1/1').should('not.exist')

    cy.byId('Q9b/1/1').click().type('{downarrow}').type('{enter}');
    cy.byId('Q9b/1/1').should('have.value',"12");
    cy.byId('Q9b-not-exists/1/1').should('not.exist')
    cy.byId('Q9b-exists/1/1').should('be.visible')
    cy.byId('Q9b-noteq-B/1/1').should('be.visible')
    cy.byId('Q9b-eq-B/1/1').should('not.exist')

    cy.byId('Q9b/1/1').click().type('{downarrow}{downarrow}').type('{enter}');
    cy.byId('Q9b/1/1').should('have.value',"34");
    cy.byId('Q9b-not-exists/1/1').should('not.exist')
    cy.byId('Q9b-exists/1/1').should('be.visible')
    cy.byId('Q9b-noteq-B/1/1').should('not.exist')
    cy.byId('Q9b-eq-B/1/1').should('be.visible')
 
  });

  it('should work on date as answerOption items', () => {

    cy.byId('Q9c-not-exists/1/1').should('be.visible')
    cy.byId('Q9c-exists/1/1').should('not.exist')
    cy.byId('Q9c-noteq-B/1/1').should('be.visible')
    cy.byId('Q9c-eq-B/1/1').should('not.exist')

    cy.byId('Q9c/1/1').click().type('{downarrow}').type('{enter}');
    cy.byId('Q9c/1/1').should('have.value',"2022");
    cy.byId('Q9c-not-exists/1/1').should('not.exist')
    cy.byId('Q9c-exists/1/1').should('be.visible')
    cy.byId('Q9c-noteq-B/1/1').should('be.visible')
    cy.byId('Q9c-eq-B/1/1').should('not.exist')

    cy.byId('Q9c/1/1').click().type('{downarrow}{downarrow}').type('{enter}');
    cy.byId('Q9c/1/1').should('have.value',"2022-09");
    cy.byId('Q9c-not-exists/1/1').should('not.exist')
    cy.byId('Q9c-exists/1/1').should('be.visible')
    cy.byId('Q9c-noteq-B/1/1').should('not.exist')
    cy.byId('Q9c-eq-B/1/1').should('be.visible')
 
  });

  it('should work on time as answerOption items', () => {

    cy.byId('Q9d-not-exists/1/1').should('be.visible')
    cy.byId('Q9d-exists/1/1').should('not.exist')
    cy.byId('Q9d-noteq-B/1/1').should('be.visible')
    cy.byId('Q9d-eq-B/1/1').should('not.exist')

    cy.byId('Q9d/1/1').click().type('{downarrow}').type('{enter}');
    cy.byId('Q9d/1/1').should('have.value',"10:30:00");
    cy.byId('Q9d-not-exists/1/1').should('not.exist')
    cy.byId('Q9d-exists/1/1').should('be.visible')
    cy.byId('Q9d-noteq-B/1/1').should('be.visible')
    cy.byId('Q9d-eq-B/1/1').should('not.exist')

    cy.byId('Q9d/1/1').click().type('{downarrow}{downarrow}').type('{enter}');
    cy.byId('Q9d/1/1').should('have.value',"13:30:00");
    cy.byId('Q9d-not-exists/1/1').should('not.exist')
    cy.byId('Q9d-exists/1/1').should('be.visible')
    cy.byId('Q9d-noteq-B/1/1').should('not.exist')
    cy.byId('Q9d-eq-B/1/1').should('be.visible')
 
  });

});

