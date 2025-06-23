import { AddFormToPageTestPage } from "../../support/addFormToPageTest.po";
import * as util from "../../support/util";
const answerId = util.answerId;

const po = new AddFormToPageTestPage();

describe('item.disabledDisplay is "protected" or its inherited disabledDisplay value is "protected"', () => {
  before(() => {
    po.openPage();
    let fileName = "questionnaire-disabledDisplay.R5.json";
    util.addFormToPage(fileName, null, {"fhirVersion":"R5"});
  });

  it('items should be displayed and disabled when enableWhen returns false', function() {
    // click on source item and select No
    cy.byId("s1/1false").click();

    // check items with disabledDisplay = 'protected'
    // string question
    cy.byId("item-a2/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("a2/1")
      .should("be.visible")
      .should("be.disabled");
    // coding question
    cy.byId("item-a2a/1")
    .should("have.class", "lhc-item-disabled-protected")
    .should("be.visible");
    cy.byId("a2a/1")
    .should("be.visible")
    .should("be.disabled");
    // display
    cy.byId("item-b2/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");

    // group, disabledDisplay is 'protected'
    cy.byId("item-g3/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // string question in a group
    cy.byId("item-g3a2/1/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("g3a2/1/1")
      .should("be.visible")
      .should("be.disabled");
    // coding question in a group
    cy.byId("item-g3a2a/1/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("g3a2a/1/1")
      .should("be.visible")
      .should("be.disabled");
    // display in a group
    cy.byId("item-g3b2/1/1")
    .should("have.class", "lhc-item-disabled-protected")
    .should("be.visible");
    // group in a group
    cy.byId("item-g3g2/1/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // question in a group in a group, (disabledDisplay is not set, but inherited from its parent group item)
    cy.byId("item-g3g2a1/1/1/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("g3g2a1/1/1/1")
      .should("be.visible")
      .should("be.disabled");
    // display in a group in a group, (disabledDisplay is not set, but inherited from its parent group item)
    cy.byId("item-g3g2b1/1/1/1")
    .should("have.class", "lhc-item-disabled-protected")
    .should("be.visible");


    // radio buttons
    cy.byId("item-coding1/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('coding1/1', undefined, 'c1')).find('input')
      .eq(0)
      //.should("be.visible") // why it can be seen on the screen but its opacity is 0?
      .should("be.disabled");

    // checkboxes
    cy.byId("item-coding2/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('coding2/1', undefined, 'c1')).find('input')
      .eq(0)
      //.should("be.visible") // why it can be seen on the screen but its opacity is 0?
      .should("be.disabled");

    // horizontal table
    cy.byId("item-g4/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // string question
    cy.byId("g4col1/1/1")
      .should("be.visible")
      .should("be.disabled");
    // coding question
    cy.byId("g4col2/1/1")
      .should("be.visible")
      .should("be.disabled");

    // matrix, with checkboxes
    cy.byId("item-g5/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('g5q1/1/1', undefined, 'c1'))
      .should("be.visible")
      .should("be.disabled");
    cy.byId(answerId('g5q1/1/1', '_other'))
      .should("be.visible")
      .should("be.disabled");
    cy.byId(answerId('g5q1/1/1', '_otherValue'))
      .should("be.visible")
      .should("be.disabled");

    // matrix, with radio buttons
    cy.byId("item-g6/1")
      .should("have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('g6q1/1/1', undefined, 'c1'))
      .should("be.visible")
      .should("be.disabled");
    cy.byId(answerId('g6q1/1/1', '_other'))
      .should("be.visible")
      .should("be.disabled");
    cy.byId(answerId('g6q1/1/1', '_otherValue'))
      .should("be.visible")
      .should("be.disabled");
  });

  it('exported QR should not include items that are disabled but protected when enableWhen returns false', function() {
    cy.window().then((win) => {
      let fhirQR = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', "R5");
      expect(fhirQR.item.length).to.equal(1)
      expect(fhirQR.item[0].linkId).to.equal('s1')
      expect(fhirQR.item[0].answer[0]).to.deep.equal({valueBoolean: false});
    });
  });

  it('items should be displayed and enabled when enableWhen returns true', function() {
    // click on source item and select Yes
    cy.byId("s1/1true").click();

    // check items with disabledDisplay = 'protected'
    // string question
    cy.byId("item-a2/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("a2/1")
      .should("be.visible")
      .should("not.be.disabled");
    // coding question
    cy.byId("item-a2a/1")
    .should("not.have.class", "lhc-item-disabled-protected")
    .should("be.visible");
    cy.byId("a2a/1")
    .should("be.visible")
    .should("not.be.disabled");
    // display
    cy.byId("item-b2/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");

    // group, disabledDisplay is 'protected'
    cy.byId("item-g3/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // string question in a group
    cy.byId("item-g3a2/1/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("g3a2/1/1")
      .should("be.visible")
      .should("not.be.disabled");
    // coding question in a group
    cy.byId("item-g3a2a/1/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("g3a2a/1/1")
      .should("be.visible")
      .should("not.be.disabled");
    // display in a group
    cy.byId("item-g3b2/1/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // group in a group
    cy.byId("item-g3g2/1/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // question in a group in a group, (disabledDisplay is not set, but inherited from its parent group item)
    cy.byId("item-g3g2a1/1/1/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId("g3g2a1/1/1/1")
      .should("be.visible")
      .should("not.be.disabled");
    // display in a group in a group, (disabledDisplay is not set, but inherited from its parent group item)
    cy.byId("item-g3g2b1/1/1/1")
    .should("not.have.class", "lhc-item-disabled-protected")
    .should("be.visible");


    // radio buttons
    cy.byId("item-coding1/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('coding1/1', undefined, 'c1')).find('input')
      .eq(0)
      //.should("be.visible") // why it can be seen on the screen but its opacity is 0?
      .should("not.be.disabled");

    // checkboxes
    cy.byId("item-coding2/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('coding2/1', undefined, 'c1')).find('input')
      .eq(0)
      //.should("be.visible") // why it can be seen on the screen but its opacity is 0?
      .should("not.be.disabled");

    // horizontal table
    cy.byId("item-g4/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    // string question
    cy.byId("g4col1/1/1")
      .should("be.visible")
      .should("not.be.disabled");
    // coding question
    cy.byId("g4col2/1/1")
      .should("be.visible")
      .should("not.be.disabled");

    // matrix, with checkboxes
    cy.byId("item-g5/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('g5q1/1/1', undefined, 'c1'))
      .should("be.visible")
      .should("not.be.disabled");
    cy.byId(answerId('g5q1/1/1', '_other'))
      .should("be.visible")
      .should("not.be.disabled");
    cy.byId(answerId('g5q1/1/1', '_otherValue'))
      .should("be.visible")
      .should("not.be.disabled");

    // matrix, with radio buttons
    cy.byId("item-g6/1")
      .should("not.have.class", "lhc-item-disabled-protected")
      .should("be.visible");
    cy.byId(answerId('g6q1/1/1', undefined, 'c1'))
      .should("be.visible")
      .should("not.be.disabled");
    cy.byId(answerId('g6q1/1/1', '_other'))
      .should("be.visible")
      .should("not.be.disabled");
    cy.byId(answerId('g6q1/1/1', '_otherValue'))
      .should("be.visible")
      .should("not.be.disabled");

  });

});




