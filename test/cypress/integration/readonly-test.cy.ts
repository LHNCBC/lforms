import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
const po = new AddFormToPageTestPage();
// The project root directory is the root for the cypress server
describe('calculatedExpression and hasSavedData=true/false tests', () => {
  const intFieldId = '/type-integer/1',
        strFieldId = '/type-string/1';
  let qr;

  it('should show disabled inputs', function() {
    po.openPage();
    util.addFormToPage('readonly-test.json', 'formContainer');

    // without values
    cy.byId("st/1/1").should("be.disabled");
    cy.byId("g2/bl/1/1true input").should("be.disabled")
    cy.byId("g2/bl/1/1false input").should("be.disabled")
    cy.byId("bl/1/1true input").should("be.disabled");
    cy.byId("bl/1/1false input").should("be.disabled");
    cy.byId("int/1/1").should("be.disabled");
    cy.byId("real/1/1").should("be.disabled");
    cy.byId("dt/1/1").should("have.class", "ant-picker-disabled");
    cy.byId("dt/1/1 input").should("be.disabled");
    cy.byId("dtm/1/1").should("have.class", "ant-picker-disabled");
    cy.byId("dtm/1/1 input").should("be.disabled");
    cy.byId("tm/1/1").should("have.class", "ant-picker-disabled");
    cy.byId("tm/1/1 input").should("be.disabled");

    cy.byId("cne-single/1/1").should("be.disabled");
    cy.byId("cne-multiple/1/1").should("be.disabled");
    cy.byId("cne-single-radio/1/1c1").find(".ant-radio").should("have.class", "ant-radio-disabled");
    cy.byId("cne-single-radio/1/1c1").find(".ant-radio input").should("be.disabled");
    cy.byId("cne-multiple-checkbox/1/1c1").find(".ant-checkbox").should("have.class", "ant-checkbox-disabled");
    cy.byId("cne-multiple-checkbox/1/1c1").find(".ant-checkbox input").should("be.disabled");

    cy.byId("cwe-single/1/1").should("be.disabled");
    cy.byId("cwe-multiple/1/1").should("be.disabled");
    cy.byId("cwe-single-radio/1/1c1").find(".ant-radio").should("have.class", "ant-radio-disabled");
    cy.byId("cwe-single-radio/1/1c1").find(".ant-radio input").should("be.disabled");
    cy.byId("cwe-multiple-checkbox/1/1c1").find(".ant-checkbox").should("have.class", "ant-checkbox-disabled");
    cy.byId("cwe-multiple-checkbox/1/1c1").find(".ant-checkbox input").should("be.disabled");


    // with values
    cy.byId("g2/st/1/1").should("be.disabled");
    cy.byId("g2/bl/1/1true input").should("be.disabled")
    cy.byId("g2/bl/1/1false input").should("be.disabled")
    cy.byId("g2/int/1/1").should("be.disabled");
    cy.byId("g2/real/1/1").should("be.disabled");
    cy.byId("g2/dt/1/1").should("have.class", "ant-picker-disabled");
    cy.byId("g2/dt/1/1 input").should("be.disabled");
    cy.byId("g2/dtm/1/1").should("have.class", "ant-picker-disabled");
    cy.byId("g2/dtm/1/1 input").should("be.disabled");
    cy.byId("g2/tm/1/1").should("have.class", "ant-picker-disabled");
    cy.byId("g2/tm/1/1 input").should("be.disabled");

    cy.byId("g2/cne-single/1/1").should("be.disabled");
    cy.byId("g2/cne-multiple/1/1").should("be.disabled");
    cy.byId("g2/cne-single-radio/1/1c1").find(".ant-radio").should("have.class", "ant-radio-disabled");
    cy.byId("g2/cne-single-radio/1/1c1").find(".ant-radio input").should("be.disabled");
    cy.byId("g2/cne-multiple-checkbox/1/1c1").find(".ant-checkbox").should("have.class", "ant-checkbox-disabled");
    cy.byId("g2/cne-multiple-checkbox/1/1c1").find(".ant-checkbox input").should("be.disabled");

    cy.byId("g2/cwe-single/1/1").should("be.disabled");
    cy.byId("g2/cwe-multiple/1/1").should("be.disabled");
    cy.byCss("#g2/cwe-single-radio/1/1c1").find(".ant-radio").should("have.class", "ant-radio-disabled");
    cy.byCss("#g2/cwe-single-radio/1/1c1").find(".ant-radio input").should("be.disabled");
    cy.byCss("#g2/cwe-multiple-checkbox/1/1c1").find(".ant-checkbox").should("have.class", "ant-checkbox-disabled");
    cy.byCss("#g2/cwe-multiple-checkbox/1/1c1").find(".ant-checkbox input").should("be.disabled");

    // selected answers in mutiple seletion ac should not have the x button
    cy.byCss("#item-g2/cne-multiple/1/1 .autocomp_selected li>button").should("have.text", "××");
    cy.byCss("#item-g2/cne-multiple/1/1 .autocomp_selected li>button").should("not.be.visible");
    cy.byCss("#item-g2/cwe-multiple/1/1 .autocomp_selected li>button").should("have.text", "××");
    cy.byCss("#item-g2/cwe-multiple/1/1 .autocomp_selected li>button").should("not.be.visible");

    // the other input field in CWE radio layout should be disabled too
    cy.byId("g2/cwe-single-radio/1/1_otherValue").should("be.disabled");
    // the other input field in CWE checkbox layout should be disabled too
    cy.byId("g2/cwe-multiple-checkbox/1/1_otherValue").should("be.disabled");
  });



});

describe('Questionnaire with readOnly and repeats items', () =>{
  it('should show disabled "+" button', function() {
    po.openPage();
    util.addFormToPage('q-with-readonly-repeating-items.json', null, {fhirVersion: 'R4'});
    cy.byId('add-q1/1').should('be.visible').should('be.disabled');
    cy.byId('add-g1q1/1/1').should('be.visible').should('be.disabled')

    cy.readFile('test/data/R4/qr-with-readonly-repeating-items.json').then((qr) => {
      cy.window().then((win) => {
        let q = win.LForms.Util.getFormFHIRData("Questionnaire", "R4");
        let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");
        let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");

        win.LForms.Util.addFormToPage(mergedFormData, "formContainer");

        cy.byId('add-q1/2').should('be.visible').should('be.disabled');
        cy.byId('del-q1/1').should('be.visible').should('be.disabled');
        cy.byId('q1/1').should('be.visible').should('be.disabled').should('have.value', 'aaa');
        cy.byId('del-q1/2').should('be.visible').should('be.disabled');
        cy.byId('q1/2').should('be.visible').should('be.disabled').should('have.value', 'bbb');

        cy.byId('add-g1q1/1/2').should('be.visible').should('be.disabled');
        cy.byId('del-g1q1/1/1').should('be.visible').should('be.disabled');
        cy.byId('g1q1/1/1').should('be.visible').should('be.disabled').should('have.value', 'ccc');
        cy.byId('del-g1q1/1/2').should('be.visible').should('be.disabled');
        cy.byId('g1q1/1/2').should('be.visible').should('be.disabled').should('have.value', 'ddd');

      });
    });
  })
})
