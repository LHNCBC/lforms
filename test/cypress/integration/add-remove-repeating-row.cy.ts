import { TestPage } from "../support/lforms_testpage.po.js";
import {TestUtil} from "../support/testUtilFacade";
import {AddFormToPageTestPage} from "../support/addFormToPageTest.po";
import * as util from "../support/util";

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

describe('repeating group with answerValueSet items', () => {
  const tp: any = new TestPage();

  it('should render radio button layout properly after adding a repeating group', () => {
    tp.openBaseTestPage();
    TestUtil.waitForFHIRLibsLoaded();
    tp.loadFromTestData('repeating-group-that-contain-an-item-with-answerValueSet.R4.json', 'R4');
    // The form has a question with 7 radio button options.
    cy.get('.ant-radio-input').should('have.length', 7);
    cy.get('.ant-radio-input').eq(0).click();
    // Add a repeating group.
    cy.contains('+ repeating group').click();
    // The 7 radio button inputs in the repeating group should be rendered.
    cy.get('.ant-radio-input').should('have.length', 14);
  });

  it('should render radio button layout properly after adding a nested repeating group', () => {
    tp.openBaseTestPage();
    TestUtil.waitForFHIRLibsLoaded();
    tp.loadFromTestData('nested-repeating-groups-that-contain-an-item-with-answerValueSet.R4.json', 'R4');
    // The form has a question with 7 radio button options.
    cy.get('.ant-radio-input').should('have.length', 7);
    cy.byId('9744363809788/1').type('some text');
    // Add a repeating group.
    cy.contains('+ Outer group').click();
    // The 7 radio button inputs in the repeating group should be rendered.
    cy.get('.ant-radio-input').should('have.length', 14);
  });
});

describe('repeating group with tooltip to show on empty items', () => {
  const tp: any = new TestPage();

  it('should display tooltips correctly when adding a repeating group', () => {
    tp.openBaseTestPage();
    tp.loadFromTestData('test-tooltip-on-repeat-item.json', 'R4');
    const allergy1 = '/allergies/allergy_name/1/1';
    const allergy2 = '/allergies/allergy_name/2/1';
    const allergy3 = '/allergies/allergy_name/3/1';
    const addButton = 'add-/allergies/1';
    const addTooltip = 'add-content-/allergies/1';
    cy.byId(allergy1).click();
    cy.byId(allergy1).type('{downarrow}').type('{enter}');
    cy.byId(allergy1).should('have.value', 'Chocolate');
    cy.byId(addButton).click();
    cy.byId(allergy2).should('be.visible');
    cy.byId(addTooltip).should('not.exist');
    cy.byId(addButton).click();
    cy.byId(addTooltip).should('be.visible').should('contain', 'Please enter info in the blank ');
    cy.byId(allergy2).click();
    cy.byId(allergy2).type('{downarrow}').type('{downarrow}').type('{enter}');
    cy.byId(allergy2).should('have.value', 'Crab');
    cy.byId(addButton).click();
    cy.byId(allergy3).should('be.visible');
    cy.byId(addTooltip).should('not.exist');
  });
});

describe('multiple initial values on repeating question', function() {
  const po = new AddFormToPageTestPage();
  it('should render multiple questions, each with a single initial value - R4', function() {
    po.openPage();
    util.addFormToPage('q-with-multiple-initial-values-and-child-items.json', null, {fhirVersion: 'R4'});
    // Should render two questions, each with a single default answer.
    cy.byId('parent-decimal/1').should('have.value', '10.5');
    cy.byId('parent-decimal/2').should('have.value', '2');
  });

  it('should render multiple questions, each with a single initial value - R5', function() {
    po.openPage();
    util.addFormToPage('q-with-multiple-initial-values-on-repeating-question.json', null, {fhirVersion: 'R5'});
    // Should render two questions, each with a single default answer.
    cy.byId('child-decimal/1/1').should('have.value', '10.5');
    cy.byId('child-decimal/1/2').should('have.value', '2');
  });
});

