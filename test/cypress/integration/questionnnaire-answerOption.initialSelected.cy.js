
import * as util from "../support/util";

describe('answerOption.initialSelected in Questionnaire', function() {
  before(function() {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-answerOption.initialSelected.json', null, {'fhirVersion':'R4'});
  });

  it('should display default value set in answerOption.initialSelected', function() {
    
    cy.byId("/type-choice-is/1").should('have.value','Answer 1');
    cy.byId("/type-choice-is-iv/1").should('have.value','Answer 1');
    cy.byId("/type-open-choice-is/1").should('have.value','1. With a label 1 - 1');
    cy.byId("/type-open-choice-is-iv/1").should('have.value','1. With a label 1 - 1');
    
    
    cy.byId("item-/type-choice-m-2is/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Answer 1')
    cy.byId("item-/type-choice-m-2is/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×Answer 2')
    
    cy.byId("item-/type-choice-m-2is-2iv/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Answer 1')
    cy.byId("item-/type-choice-m-2is-2iv/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×Answer 2')

    cy.byId("item-/type-open-choice-m-2is/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Answer 1')
    cy.byId("item-/type-open-choice-m-2is/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×Answer 2')

    cy.byId("item-/type-open-choice-m-2is-2iv/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Answer 1')
    cy.byId("item-/type-open-choice-m-2is-2iv/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×Answer 2')
  });

  it('should export the data set by answerOption.initialSelected', function() {
    // check data
    cy.window().then((win)=> {
      let formData = win.LForms.Util.getFormData();
      expect(formData.items.length).to.equal(8);
      expect(formData.items[0].value).to.eql({code: 'c1', text: 'Answer 1'});
      expect(formData.items[1].value).to.eql({code: 'c1', text: 'Answer 1'});
      expect(formData.items[2].value).to.eql({label: '1', score: '1', code: 'c01', text: 'With a label 1'});
      expect(formData.items[3].value).to.eql({label: '1', score: '1', code: 'c01', text: 'With a label 1'});
      expect(formData.items[4].value).to.eql([{code: 'c1', text: 'Answer 1'},{code: 'c2', text: 'Answer 2'}]);
      expect(formData.items[5].value).to.eql([{code: 'c1', text: 'Answer 1'},{code: 'c2', text: 'Answer 2'}]);
      expect(formData.items[6].value).to.eql([{code: 'c1', text: 'Answer 1'},{code: 'c2', text: 'Answer 2'}]);
      expect(formData.items[7].value).to.eql([{code: 'c1', text: 'Answer 1'},{code: 'c2', text: 'Answer 2'}]);
    })
    // check exported fhir data
    cy.window().then((win)=> {
      let resource = win.LForms.Util.getFormFHIRData("QuestionnaireResponse",'R4')
      expect(resource.resourceType).to.equal("QuestionnaireResponse");
      expect(resource.item.length).to.equal(8);
      expect(resource.item[0].answer).to.eql([{valueCoding: {code: 'c1', display: 'Answer 1'}}]);
      expect(resource.item[1].answer).to.eql([{valueCoding: {code: 'c1', display: 'Answer 1'}}]);
      expect(resource.item[2].answer).to.eql([{valueCoding: {code: 'c01', display: 'With a label 1'}}]);
      expect(resource.item[3].answer).to.eql([{valueCoding: {code: 'c01', display: 'With a label 1'}}]);
      expect(resource.item[4].answer).to.eql([{valueCoding: {code: 'c1', display: 'Answer 1'}},{valueCoding: {code: 'c2', display: 'Answer 2'}}]);
      expect(resource.item[5].answer).to.eql([{valueCoding: {code: 'c1', display: 'Answer 1'}},{valueCoding: {code: 'c2', display: 'Answer 2'}}]);
      expect(resource.item[6].answer).to.eql([{valueCoding: {code: 'c1', display: 'Answer 1'}},{valueCoding: {code: 'c2', display: 'Answer 2'}}]);
      expect(resource.item[7].answer).to.eql([{valueCoding: {code: 'c1', display: 'Answer 1'}},{valueCoding: {code: 'c2', display: 'Answer 2'}}]);
    })

  });
});




