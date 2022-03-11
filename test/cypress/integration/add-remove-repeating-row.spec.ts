import { TestPage } from "../support/lforms_testpage.po.js";

describe('on repeating items', function() {
  const tp: any = new TestPage();
  const addButtonId = 'add-/54114-4/54117-7/1/1',
        diseaseId1 = '/54114-4/54117-7/54116-9/1/1/1',
        diseaseId2 = '/54114-4/54117-7/54116-9/1/2/1',
        diseaseId3 = '/54114-4/54117-7/54116-9/1/3/1',
        diseaseId4 = '/54114-4/54117-7/54116-9/1/4/1',
        deleteButtonId1 = 'del-/54114-4/54117-7/1/1',
        deleteButtonId2 = 'del-/54114-4/54117-7/1/2',
        deleteButtonId3 = 'del-/54114-4/54117-7/1/3',
        deleteButtonId4 = 'del-/54114-4/54117-7/1/4';

  it('should add a new row at the end of the table', function () {
    tp.LoadForm.openUSSGFHTHorizontal();
    // select a value in the desease field on the 1st row
    cy.byId(diseaseId1).click();
    cy.byId(diseaseId1).type('{downarrow}').type('{enter}');
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    // add one row
    cy.byId(addButtonId).click();
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    cy.byId(diseaseId2).should('be.visible');
    cy.byId(deleteButtonId1).should('be.visible');
    cy.byId(deleteButtonId2).should('be.visible');
    cy.byId(diseaseId2).should('have.value',"");
    // select a value in the desease field on the 2nd row
    cy.byId(diseaseId2).click();
    cy.byId(diseaseId2).type('{downarrow}{downarrow}').type('{enter}');
    cy.byId(diseaseId2).should('have.value',"-- Blood Clot in Leg");
    // add one row
    cy.byId(addButtonId).click();
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    cy.byId(diseaseId2).should('have.value',"-- Blood Clot in Leg");
    cy.byId(diseaseId3).should('be.visible');
    cy.byId(deleteButtonId1).should('be.visible');
    cy.byId(deleteButtonId2).should('be.visible');
    cy.byId(deleteButtonId3).should('be.visible');
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    cy.byId(diseaseId3).should('have.value',"");
    // select a value in the desease field on the 3rd row
    cy.byId(diseaseId3).click();
    cy.byId(diseaseId3).type('{downarrow}{downarrow}{downarrow}').type('{enter}');
    cy.byId(diseaseId3).should('have.value',"-- Blood Clot in Lungs");

  });

  it('should delete a row at its position', function () {
    cy.byId(deleteButtonId2).click();
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    cy.byId(diseaseId2).should('not.exist');
    cy.byId(diseaseId3).should('have.value',"-- Blood Clot in Lungs");
    cy.byId(deleteButtonId1).should('be.visible');
    cy.byId(deleteButtonId2).should('not.exist');
    cy.byId(deleteButtonId3).should('be.visible');

  });

  it('should add a new row at the end of the table after some rows are deleted', function () {
    // add one row
    cy.byId(addButtonId).click();
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    cy.byId(diseaseId2).should('not.exist');
    cy.byId(diseaseId3).should('have.value',"-- Blood Clot in Lungs");
    cy.byId(diseaseId4).should('be.visible');
    cy.byId(diseaseId4).should('have.value',"");
    cy.byId(deleteButtonId1).should('be.visible');
    cy.byId(deleteButtonId2).should('not.exist');
    cy.byId(deleteButtonId3).should('be.visible');
    cy.byId(deleteButtonId4).should('be.visible');
    // select a value in the desease field on the 4th row (the displayed 3rd row)
    cy.byId(diseaseId4).click();
    cy.byId(diseaseId4).type('{downarrow}{downarrow}{downarrow}{downarrow}').type('{enter}');
    cy.byId(diseaseId4).should('have.value',"Cancer");

  });

  it('should delete a row at its position after some rows are deleted and some are added', function () {
    cy.byId(deleteButtonId3).click();
    cy.byId(diseaseId1).should('have.value',"Blood Clots");
    cy.byId(diseaseId2).should('not.exist');
    cy.byId(diseaseId3).should('not.exist');
    cy.byId(diseaseId4).should('have.value',"Cancer");
    cy.byId(deleteButtonId1).should('be.visible');
    cy.byId(deleteButtonId2).should('not.exist');
    cy.byId(deleteButtonId3).should('not.exist');
    cy.byId(deleteButtonId4).should('be.visible');
  });
});

