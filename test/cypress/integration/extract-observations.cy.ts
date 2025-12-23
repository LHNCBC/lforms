import * as util from "../support/util";
const answerId = util.answerId;

describe('Form with extract observation extension', () => {

  it('should be able to set the inital boolean value (true and false), extract observations and get boolean value (true and false) correctly', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});
    // check default values
    cy.window().then((win) => {
      let formData = win.LForms.Util.getFormData();
      expect(formData.items.length).to.equal(5);
      expect(formData.items[0].value).to.equal(true);
      expect(formData.items[3].value).to.equal(false);
      expect(formData.items[4].value).to.equal(undefined);
    })
    // check extracted
    cy.window().then((win) => {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true})
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(4);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);
      expect(bundle[0].item[1].answer).to.eql([{valueCoding: {code: 'code1', display: 'answer 1'}}]);
      expect(bundle[0].item[2].answer).to.eql([{valueCoding: {code: 'codea', display: 'answer a'}}]);
      expect(bundle[0].item[3].answer).to.eql([{valueBoolean: false}]);

      const obs = bundle[1].entry;
      expect(obs.length).to.equal(4);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.valueBoolean).to.equal(true);
      expect(obs[1].resource.resourceType).to.equal("Observation");
      expect(obs[1].resource.valueCodeableConcept).to.eql({coding: [{code: 'code1', display: 'answer 1'}], text: "answer 1"});
      expect(obs[2].resource.resourceType).to.equal("Observation");
      expect(obs[2].resource.valueCodeableConcept).to.eql({coding: [{code: 'codea', display: 'answer a'}], text: "answer a"});
      expect(obs[3].resource.resourceType).to.equal("Observation");
      expect(obs[3].resource.valueBoolean).to.equal(false);
      // Default Bundle entry request object, in absence of observationExtractEntry extension.
      expect(obs[3].request).to.deep.equal({
        method: 'POST',
        url: 'Observation'
      });
    });

  });

  it('should not extract observations from empty items', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId('choiceItem2/1').click().clear().type('{enter}');
    cy.window().then((win) => {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true})
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(3);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);
      expect(bundle[0].item[1].answer).to.eql([{valueCoding: {code: 'code1', display: 'answer 1'}}]);

      const obs = bundle[1].entry;
      expect(obs.length).to.equal(3);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.valueBoolean).to.equal(true);
      expect(obs[1].resource.resourceType).to.equal("Observation");
      expect(obs[1].resource.valueCodeableConcept).to.eql({coding: [{code: 'code1', display: 'answer 1'}], text: "answer 1"});
    })

    cy.byId('choiceItem1/1').click().clear().type('{enter}')
    cy.window().then((win) => {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true})
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(2);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);

      const obs = bundle[1].entry;
      expect(obs.length).to.equal(2);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.valueBoolean).to.equal(true);
    })
  });

  it('should not extract observations from hidden items and should get boolean value (false) correctly', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId(answerId('blItem1/1', 'false')).click();
    cy.window().then((win)=> {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse","R4", null, {extract: true})
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(2);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: false}]);

      const obs = bundle[1].entry;
      expect(obs.length).to.equal(2);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.valueBoolean).to.equal(false);
    })
  });

  it('should extract multiple Observations for repeated items', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('q-with-obs-extract-repeats-true.json', null, {fhirVersion: 'R4'});
    // Fill out answers for repeated questions.
    cy.byId('string/1').type('A');
    cy.byId('add-string/1').click();
    cy.byId('string/2').type('B');
    cy.byId('decimal/1').type('1');
    cy.byId('add-decimal/1').click();
    cy.byId('decimal/2').type('2');
    // Extract an Observation for each repeated item.
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      const obs = bundle[1].entry;
      expect(obs.length).to.equal(6);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.valueString).to.equal('A');
      expect(obs[1].resource.resourceType).to.equal("Observation");
      expect(obs[1].resource.valueString).to.equal('B');
      expect(obs[2].resource.resourceType).to.equal("Observation");
      expect(obs[2].resource.valueQuantity).to.eql({
        "value": "1",
        "unit": "kilogram",
        "code": "kg",
        "system": "http://unitsofmeasure.org"
      });
      expect(obs[3].resource.resourceType).to.equal("Observation");
      expect(obs[3].resource.valueQuantity).to.eql({
        "value": "2",
        "unit": "kilogram",
        "code": "kg",
        "system": "http://unitsofmeasure.org"
      });
      expect(obs[4].resource.resourceType).to.equal("Observation");
      expect(obs[4].resource.valueCodeableConcept).to.eql({
        coding: [
          {
            code: 'a',
            display: 'A',
            system: 's'
          }
        ],
        text: 'A'
      });
      expect(obs[5].resource.resourceType).to.equal("Observation");
      expect(obs[5].resource.valueCodeableConcept).to.eql({
        coding: [
          {
            code: 'b',
            display: 'B',
            system: 's'
          }
        ],
        text: 'B'
      });
    });
  });

  it('should extract Questionnaire.item.code into Observation.code.coding', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObsCode-test.R4.json', null, {fhirVersion: 'R4'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      const obs = bundle[1].entry;
      // Should not extract child items if parent item has obsExtract=false.
      expect(obs.some(b => b.resource.resourceType === "Observation" && b.resource.code?.text === "intItem0")).to.equal(false);
      // Should extract child item if it turns extraction back on again with ObsExtract=true.
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.code.text).to.equal("intItem1");
      // Should extract only the code with ObsExtract=true if the extension is on code level.
      expect(obs[1].resource.resourceType).to.equal("Observation");
      expect(obs[1].resource.code.text).to.equal("blItem3")
      expect(obs[1].resource.code.coding.length).to.equal(1);
      expect(obs[1].resource.code.coding[0].code).to.equal("code5");
      // Should extract more than one item.code into Observation.code.
      expect(obs[2].resource.resourceType).to.equal("Observation");
      expect(obs[2].resource.code.text).to.equal("codingItem2")
      expect(obs[2].resource.code.coding.length).to.equal(2);
      // Should only skip codes with ObsExtract=false if item has ObsExtract=true.
      expect(obs[3].resource.resourceType).to.equal("Observation");
      expect(obs[3].resource.code.text).to.equal("blItem4")
      expect(obs[3].resource.code.coding.length).to.equal(2);
      expect(obs[3].resource.code.coding[0].code).to.equal("code6"); // code with ObsExtract=true
      expect(obs[3].resource.code.coding[1].code).to.equal("code8"); // code without ObsExtract extension
    });
  });

  it('should extract based on ObservationExtract valueCode relationship - component - R4', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('blood-pressure-q.json', null, {fhirVersion: 'R4'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'R4', null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      const obs = bundle[1].entry;
      expect(obs.length).to.equal(1);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(obs[0].resource.component).to.deep.equal([
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8478-0",
                "display": "Systolic blood pressure"
              }
            ],
            "text": "What is your systolic blood pressure?"
          },
          "valueQuantity": {
            "value": "120",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        },
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8462-7",
                "display": "Diastolic blood pressure"
              }
            ],
            "text": "What is your diastolic blood pressure?"
          },
          "valueQuantity": {
            "value": "80",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        }
      ]);
    });
  });

  it('should extract based on ObservationExtract valueCode relationship - member - R4', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('blood-count-panel-q.json', null, {fhirVersion: 'R4'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'R4', null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      const obs = bundle[1].entry;
      expect(obs.length).to.equal(3);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "58410-2",
          "display": "CBC panel - Blood by Automated count"
        }
      ]);
      expect(obs[1].resource.code).to.deep.equal({
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "6690-2",
            "display": "White blood cell count (Leukocytes)"
          }
        ],
        "text": "What is your white blood cell count?"
      });
      expect(obs[1].resource.valueQuantity).to.deep.equal({
        "value": "120",
        "unit": "thousand per microliter",
        "code": "10*3/uL",
        "system": "http://unitsofmeasure.org"
      });
      expect(obs[2].resource.code).to.deep.equal({
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "789-8",
            "display": "Red blood cell count (Erythrocytes)"
          }
        ],
        "text": "What is your red blood cell count?"
      });
      expect(obs[2].resource.valueQuantity).to.deep.equal({
        "value": "80",
        "unit": "million per microliter",
        "code": "10*6/uL",
        "system": "http://unitsofmeasure.org"
      });
      expect(obs[0].resource.hasMember[0].reference).to.equal(obs[1].resource.id);
      expect(obs[0].resource.hasMember[1].reference).to.equal(obs[2].resource.id);
    });
  });

  it('should extract based on ObservationExtract valueCode relationship - component - STU3', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('blood-pressure-q.json', null, {fhirVersion: 'STU3'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'STU3', null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      const obs = bundle[1].entry;
      expect(obs.length).to.equal(1);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(obs[0].resource.component).to.deep.equal([
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8478-0",
                "display": "Systolic blood pressure"
              }
            ],
            "text": "What is your systolic blood pressure?"
          },
          "valueQuantity": {
            "value": "120",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        },
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8462-7",
                "display": "Diastolic blood pressure"
              }
            ],
            "text": "What is your diastolic blood pressure?"
          },
          "valueQuantity": {
            "value": "80",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        }
      ]);
    });
  });

  it('should find the correct repeatable parents for ObservationExtract valueCode relationship', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('q-with-obs-extract-valueCode-with-repeatable-parents.json', null, {fhirVersion: 'R4'});
    cy.byId('parentRepeatableItem/1').type('Adam');
    cy.byId('add-parentRepeatableItem/1').click();
    cy.byId('parentRepeatableItem/2').type('Ben');
    cy.byId('childItem1/2/1').type('130');
    cy.byId('childItem2/2/1').type('90');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'R4', null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      const obs = bundle[1].entry;
      expect(obs.length).to.equal(2);
      expect(obs[0].resource.resourceType).to.equal("Observation");
      expect(obs[0].resource.valueString).to.equal('Adam');
      expect(obs[0].resource.code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(obs[0].resource.component).to.deep.equal([
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8478-0",
                "display": "Systolic blood pressure"
              }
            ],
            "text": "What is your systolic blood pressure?"
          },
          "valueQuantity": {
            "value": "120",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        },
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8462-7",
                "display": "Diastolic blood pressure"
              }
            ],
            "text": "What is your diastolic blood pressure?"
          },
          "valueQuantity": {
            "value": "80",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        }
      ]);
      expect(obs[1].resource.resourceType).to.equal("Observation");
      expect(obs[1].resource.valueString).to.equal('Ben');
      expect(obs[1].resource.code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(obs[1].resource.component).to.deep.equal([
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8478-0",
                "display": "Systolic blood pressure"
              }
            ],
            "text": "What is your systolic blood pressure?"
          },
          "valueQuantity": {
            "value": "130",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        },
        {
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8462-7",
                "display": "Diastolic blood pressure"
              }
            ],
            "text": "What is your diastolic blood pressure?"
          },
          "valueQuantity": {
            "value": "90",
            "unit": "millimeter of mercury",
            "code": "mm[Hg]",
            "system": "http://unitsofmeasure.org"
          }
        }
      ]);
    });
  });

  it('should not extract ObservationExtract valueCode items if no extractable parent is found', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('q-with-obs-extract-valueCode-with-no-extractable-parent.json', null, {fhirVersion: 'R4'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'R4', null, {extract: true});
      expect(bundle.length).to.equal(1);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
    });
  });
});
