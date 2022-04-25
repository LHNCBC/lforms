import * as util from "../support/util";

describe('Form with extract observation extension', ()=>{

  it('should be able to set the inital boolean value (true and false), extract observations and get boolean value (true and false) correctly', ()=> {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});
    // check default values
    cy.window().then((win)=> {
      let formData = win.LForms.Util.getFormData();
      expect(formData.items.length).to.equal(5);
      expect(formData.items[0].value).to.equal(true);
      expect(formData.items[3].value).to.equal(false);
      expect(formData.items[4].value).to.equal(undefined);
    })
    // check extracted
    cy.window().then((win)=> {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse","R4", null, {extract: true})
      expect(bundle.length).to.equal(5);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(4);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);
      expect(bundle[0].item[1].answer).to.eql([{valueCoding: {code: 'code1', display: 'answer 1'}}]);
      expect(bundle[0].item[2].answer).to.eql([{valueCoding: {code: 'codea', display: 'answer a'}}]);
      expect(bundle[0].item[3].answer).to.eql([{valueBoolean: false}]);
      
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueBoolean).to.equal(true);
      expect(bundle[2].resourceType).to.equal("Observation");
      expect(bundle[2].valueCodeableConcept).to.eql({coding: [{code: 'code1', display: 'answer 1'}], text: "answer 1"});
      expect(bundle[3].resourceType).to.equal("Observation");
      expect(bundle[3].valueCodeableConcept).to.eql({coding: [{code: 'codea', display: 'answer a'}], text: "answer a"});
      expect(bundle[4].resourceType).to.equal("Observation");
      expect(bundle[4].valueBoolean).to.equal(false);

    })
    
  });

  it('should not extract observations from empty items', ()=> {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId('choiceItem2/1').click().clear().type('{enter}');
    cy.window().then((win)=> {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse","R4", null, {extract: true})
      expect(bundle.length).to.equal(4);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(3);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);
      expect(bundle[0].item[1].answer).to.eql([{valueCoding: {code: 'code1', display: 'answer 1'}}]);

      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueBoolean).to.equal(true);
      expect(bundle[2].resourceType).to.equal("Observation");
      expect(bundle[2].valueCodeableConcept).to.eql({coding: [{code: 'code1', display: 'answer 1'}], text: "answer 1"});
    })
    
    cy.byId('choiceItem1/1').click().clear().type('{enter}')
    cy.window().then((win)=> {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse","R4", null, {extract: true})
      expect(bundle.length).to.equal(3);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(2);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);
      
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueBoolean).to.equal(true);
    })
  });

  it('should not extract observations from hidden items and should get boolean value (false) correctly', ()=> {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});
    
    cy.byId('blItem1/1').click();
    cy.window().then((win)=> {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse","R4", null, {extract: true})
      expect(bundle.length).to.equal(3);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(2);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: false}]);
      
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueBoolean).to.equal(false);
    })
  });

 
});