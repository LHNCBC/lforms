import {AddFormToPageTestPage} from '../support/addFormToPageTest.po.js';

const po = new AddFormToPageTestPage();

describe('Quantities with and without unit lists and unit-open', () => {
  before(() => {
    cy.visit('test/pages/addFormToPageTest.html');
    po.openPage();
    cy.get('#fileAnchor').uploadFile('test/data/R4/quantity-units.json');
  });


  // Some cases are tested via Karma, in lhc-unit.component.spec.ts

  it('should have a CNE list for a quantity with units list but without unit-open', ()=>{
    const itemUnitFieldID = '#unit_q5\\/1';
    // Confirm we cannot type an off-list value into the unit field
    // For some reason, unlike other CWE lists, a single blur is enough to clear
    // the field.
    cy.get(itemUnitFieldID).click().type('meters').blur().should('have.value', '');
    cy.window().then((win) => {
      let fhirData = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      expect(fhirData.item).to.equal(undefined);
    });
  });

  describe('quantity with units list and with unit-open=optionsOrString', ()=> {
    const itemValueFieldID = '#q6\\/1';
    before(() => {
      cy.get(itemValueFieldID).click().type('5').blur();
    });
    after(() => {
      // This will have an error if the test has an error, but otherwise it works
      cy.get(itemValueFieldID).click().clear().blur().should('have.value', ''); // clear field value for other tests
    });

    it('should have a CWE list for a quantity with units list and with unit-open=optionsOrString', ()=>{
      const itemUnitFieldID = '#unit_q6\\/1';
      cy.get(itemUnitFieldID).click().clear().type('meters').blur().should('have.value', 'meters');

      cy.window().then((win) => {
        cy.get(itemUnitFieldID).should(() => { // force retry to wait for the unit to be updated in the model
          let fhirData = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
          expect(fhirData.item[0].linkId).to.equal('q6');
          expect(fhirData.item[0].answer[0].valueQuantity).to.deep.equal({value: 5, unit: 'meters'});
        });
      });
    });
  });

  it('should have a CNE list for a quantity with units list and with unit-open=optionsOrType', ()=>{
    // This is because we don't currently provide the user with a way to enter
    // an off-list coding.
    const itemUnitFieldID = '#unit_q7\\/1';
    cy.get(itemUnitFieldID).click().type('meters').blur().should('have.value', '');
    cy.window().then((win) => {
      let fhirData = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      expect(fhirData.item).to.equal(undefined);
    });
  });

  it('should have a CNE list for a quantity with units list and with unit-open=optionsOnly', ()=>{
    const itemUnitFieldID = '#unit_q8\\/1';
    cy.get(itemUnitFieldID).click().type('meters').blur().should('have.value', '');
    cy.window().then((win) => {
      let fhirData = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      expect(fhirData.item).to.equal(undefined);
    });
  });

});
