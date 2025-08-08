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

  it('should not extract observations from empty items', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId('choiceItem2/1').click().clear().type('{enter}');
    cy.window().then((win) => {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true})
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
    cy.window().then((win) => {
      let bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true})
      expect(bundle.length).to.equal(3);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[0].item.length).to.equal(2);
      expect(bundle[0].item[0].answer).to.eql([{valueBoolean: true}]);

      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueBoolean).to.equal(true);
    })
  });

  it('should not extract observations from hidden items and should get boolean value (false) correctly', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('extractObs-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId(answerId('blItem1/1', 'false')).click();
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
      expect(bundle.length).to.equal(7);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueString).to.equal('A');
      expect(bundle[2].resourceType).to.equal("Observation");
      expect(bundle[2].valueString).to.equal('B');
      expect(bundle[3].resourceType).to.equal("Observation");
      expect(bundle[3].valueQuantity).to.eql({
        "value": "1",
        "unit": "kilogram",
        "code": "kg",
        "system": "http://unitsofmeasure.org"
      });
      expect(bundle[4].resourceType).to.equal("Observation");
      expect(bundle[4].valueQuantity).to.eql({
        "value": "2",
        "unit": "kilogram",
        "code": "kg",
        "system": "http://unitsofmeasure.org"
      });
      expect(bundle[5].resourceType).to.equal("Observation");
      expect(bundle[5].valueCodeableConcept).to.eql({
        coding: [
          {
            code: 'a',
            display: 'A',
            system: 's'
          }
        ],
        text: 'A'
      });
      expect(bundle[6].resourceType).to.equal("Observation");
      expect(bundle[6].valueCodeableConcept).to.eql({
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
      expect(bundle.length).to.equal(5);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      // Should not extract child items if parent item has obsExtract=false.
      expect(bundle.some(b => b.resourceType === "Observation" && b.code?.text === "intItem0")).to.equal(false);
      // Should extract child item if it turns extraction back on again with ObsExtract=true.
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].code.text).to.equal("intItem1");
      // Should extract only the code with ObsExtract=true if the extension is on code level.
      expect(bundle[2].resourceType).to.equal("Observation");
      expect(bundle[2].code.text).to.equal("blItem3")
      expect(bundle[2].code.coding.length).to.equal(1);
      expect(bundle[2].code.coding[0].code).to.equal("code5");
      // Should extract more than one item.code into Observation.code.
      expect(bundle[3].resourceType).to.equal("Observation");
      expect(bundle[3].code.text).to.equal("codingItem2")
      expect(bundle[3].code.coding.length).to.equal(2);
      // Should only skip codes with ObsExtract=false if item has ObsExtract=true.
      expect(bundle[4].resourceType).to.equal("Observation");
      expect(bundle[4].code.text).to.equal("blItem4")
      expect(bundle[4].code.coding.length).to.equal(2);
      expect(bundle[4].code.coding[0].code).to.equal("code6"); // code with ObsExtract=true
      expect(bundle[4].code.coding[1].code).to.equal("code8"); // code without ObsExtract extension
    });
  });

  it('should extract based on ObservationExtract valueCode relationship - component - R4', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('blood-pressure-q.json', null, {fhirVersion: 'R4'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'R4', null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(bundle[1].component).to.deep.equal([
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
      expect(bundle.length).to.equal(4);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "58410-2",
          "display": "CBC panel - Blood by Automated count"
        }
      ]);
      expect(bundle[2].code).to.deep.equal({
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "6690-2",
            "display": "White blood cell count (Leukocytes)"
          }
        ],
        "text": "What is your white blood cell count?"
      });
      expect(bundle[2].valueQuantity).to.deep.equal({
        "value": "120",
        "unit": "thousand per microliter",
        "code": "10*3/uL",
        "system": "http://unitsofmeasure.org"
      });
      expect(bundle[3].code).to.deep.equal({
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "789-8",
            "display": "Red blood cell count (Erythrocytes)"
          }
        ],
        "text": "What is your red blood cell count?"
      });
      expect(bundle[3].valueQuantity).to.deep.equal({
        "value": "80",
        "unit": "million per microliter",
        "code": "10*6/uL",
        "system": "http://unitsofmeasure.org"
      });
      expect(bundle[1].hasMember[0].reference).to.equal(bundle[2].id);
      expect(bundle[1].hasMember[1].reference).to.equal(bundle[3].id);
    });
  });

  it('should extract based on ObservationExtract valueCode relationship - component - STU3', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('blood-pressure-q.json', null, {fhirVersion: 'STU3'});
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", 'STU3', null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(bundle[1].component).to.deep.equal([
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
      expect(bundle.length).to.equal(3);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Observation");
      expect(bundle[1].valueString).to.equal('Adam');
      expect(bundle[1].code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(bundle[1].component).to.deep.equal([
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
      expect(bundle[2].resourceType).to.equal("Observation");
      expect(bundle[2].valueString).to.equal('Ben');
      expect(bundle[2].code.coding).to.deep.equal([
        {
          "system": "http://loinc.org",
          "code": "8532-0",
          "display": "Blood pressure"
        }
      ]);
      expect(bundle[2].component).to.deep.equal([
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
