import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
import * as FHIRSupport from "../../../src/fhir/versions.js";
delete FHIRSupport.default; 
let fhirVersions = Object.keys(FHIRSupport);
const po = new AddFormToPageTestPage();

function testOneValueType(valueType, params, fhirVersion, fileName) {
  // valueString
  describe(fhirVersion + " - " + valueType, () => {

    it('should render a questionnaire with '+valueType+' in answerOption', function() {
      util.addFormToPage(fileName, null, {fhirVersion});

      // group 1
      // autocomplete, non-repeats
      cy.byId(params.itemIds.g1item1)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g1Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g1Answer2);  
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g1Answer3);    
      // autocomplete, repeats
      cy.byId(params.itemIds.g1item2)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g1Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g1Answer2);  
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g1Answer3);    

      // group 2
      // raidobutoon
      cy.byId(params.itemIds.g2item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      // checkbox
      cy.byId(params.itemIds.g2item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);

      // group 3
      // autocomplete, non-repeats, prefix, score
      cy.byId(params.itemIds.g3item1)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g3Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g3Answer2);  
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g3Answer3);  
        // autocomplete, repeats, prefix, score
      cy.byId(params.itemIds.g3item2)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g3Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g3Answer2);  
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g3Answer3);  

      // group 4
      // radiobutton, prefix, score
      cy.byId(params.itemIds.g4item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g3Answer2);
      // checkbox, prefix, score
      cy.byId(params.itemIds.g4item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g3Answer2);

      // group 5
      // autocomplete, non-repeats, initial
      // for open-choice, the initial value is free text
      if (valueType === "valueCoding.open-choice") {
        cy.byId(params.itemIds.g5item1)
          .should('be.visible')
          .should('have.value', "user typed value");
      }
      else {
        cy.byId(params.itemIds.g5item1)
          .should('be.visible')
          .should('have.value', params.itemValues.g1Answer2);
      }
      // autocomplete, repeats, initial
      cy.byId(params.itemIds.g5item2)
        .should('be.visible');
      if (fhirVersion === 'R4') {
        cy.byId(`item-${params.itemIds.g5item2}`)
          .byCss('span.autocomp_selected li')
          .should('have.length', 2)
        cy.byId(`item-${params.itemIds.g5item2}`)
          .byCss('span.autocomp_selected li')
          .eq(0)
          .should('have.text', '×' + params.itemValues.g1Answer2)
        // for open-choice, the 2nd initial value is free text
        if (valueType === "valueCoding.open-choice") {
          cy.byId(`item-${params.itemIds.g5item2}`)
            .byCss('span.autocomp_selected li')
            .eq(1)
            .should('have.text', '×' + 'user typed value')
        }
        else {
          cy.byId(`item-${params.itemIds.g5item2}`)
          .byCss('span.autocomp_selected li')
          .eq(1)
          .should('have.text', '×' + params.itemValues.g1Answer3)
        }
      }
      else {
        cy.byId(`item-${params.itemIds.g5item2}`)
          .byCss('span.autocomp_selected li')
          .should('have.length', 1)
        cy.byId(`item-${params.itemIds.g5item2}`)
          .byCss('span.autocomp_selected li')
          .eq(0)
          .should('have.text', '×' + params.itemValues.g1Answer2)   
      }

      // group 6
      // radiobutton, non-repeats, initial
      cy.byId(params.itemIds.g6item1ans2)
          .should('be.visible')
          .should('contain',params.itemValues.g1Answer2);
      // for open-choice, the initial value is free text
      if (valueType === "valueCoding.open-choice") {
        cy.byId(`${params.itemIds.g6item1ans2} input`)
          .should('not.be.checked');
        cy.byId(`valueCoding.open-choice-group6-item1/1/1_other input`)
          .should('be.checked');
        cy.byId('valueCoding.open-choice-group6-item1/1/1_otherValue')
          .should('be.visible')
          .should('have.value', "user typed value")
      }
      else {
        cy.byId(`${params.itemIds.g6item1ans2} input`)
          .should('be.checked');
      }

      // checkbox, repeats, initial
      cy.byId(params.itemIds.g6item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      cy.byId(`${params.itemIds.g6item2ans1} input`)
        .should('not.be.checked');
      cy.byId(`${params.itemIds.g6item2ans2} input`)
        .should('be.checked')
      cy.byId(params.itemIds.g6item2ans3)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer3);
      if (fhirVersion === 'R4') {
        if (valueType === "valueCoding.open-choice") {
          cy.byId(`${params.itemIds.g6item2ans3} input`)
            .should('not.be.checked');
          cy.byId(`valueCoding.open-choice-group6-item2/1/1_other input`)
            .should('be.checked');
          cy.byId('valueCoding.open-choice-group6-item2/1/1_otherValue')
            .should('be.visible')
            .should('have.value', "user typed value")
        }
        else {
          cy.byId(`${params.itemIds.g6item2ans3} input`)
            .should('be.checked');
        }
      }
      else {
        cy.byId(`${params.itemIds.g6item2ans3} input`)
          .should('not.be.checked');
      }

    });

    it('should get a correct QR from a questionnaire with '+valueType+' in answerOption, and should merge back to the questionnaire', function() {
      // group 1
      // autocomplete, non-repeats
      cy.byId(params.itemIds.g1item1)
        .click()
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{enter}'); 
      // autocomplete, repeats
      cy.byId(params.itemIds.g1item2)
        .click()
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{enter}'); 

      // group 2
      // raidobutoon
      cy.byId(params.itemIds.g2item1ans2)
        .click();
      // checkbox
      cy.byId(params.itemIds.g2item2ans2)
        .click();

      // group 3
      // autocomplete, non-repeats, prefix, score
      cy.byId(params.itemIds.g3item1)
        .click()
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{enter}'); 
      // autocomplete, repeats, prefix, score
      cy.byId(params.itemIds.g3item2)
        .click()
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{enter}'); 

      // group 4
      // radiobutton, prefix, score
      cy.byId(params.itemIds.g4item1ans2)
        .click();
      // checkbox, prefix, score
      cy.byId(params.itemIds.g4item2ans2)
        .click();

      // group 5 and group 6 use the initial values

      // get QuestionnaireResponse
      cy.window().then((win) => {
        const qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion);
        expect(qr.item[0].item[0].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[0].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[1].item[0].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[1].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[2].item[0].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[2].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[3].item[0].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        expect(qr.item[3].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        if (valueType === "valueCoding.open-choice") {
          expect(qr.item[4].item[0].answer).to.deep.equal([{"valueString": "user typed value"}])
        }
        else {
          expect(qr.item[4].item[0].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        }
        
        if (fhirVersion === 'R4') {
          if (valueType === "valueCoding.open-choice") {
            expect(qr.item[4].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2,{"valueString": "user typed value"}])
          }
          else {
            expect(qr.item[4].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2,params.qrItemValues.g1Answer3])           
          }
        }
        else {
          expect(qr.item[4].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        }
        if (valueType === "valueCoding.open-choice") {
          expect(qr.item[5].item[0].answer).to.deep.equal([{"valueString": "user typed value"}])
        }
        else {
          expect(qr.item[5].item[0].answer).to.deep.equal([params.qrItemValues.g1Answer2])          
        }
        
        if (fhirVersion === 'R4') {
          if (valueType === "valueCoding.open-choice") {
            expect(qr.item[5].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2,{"valueString": "user typed value"}])
          }
          else {
            expect(qr.item[5].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2,params.qrItemValues.g1Answer3])           
          }
        }
        else {
          expect(qr.item[5].item[1].answer).to.deep.equal([params.qrItemValues.g1Answer2])
        }


        // merge the QuestionnaireResonse back to the Questionnaire
        cy.readFile(`test/data/${fhirVersion}/${fileName}`).then((q) => {  // readFile will parse the JSON

          let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
          let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
          expect(mergedFormData.hasSavedData).to.equal(true)
          util.addFormToPage(mergedFormData, null, {fhirVersion});
          
          // user data sould be displayed
          // group 1
          // autocomplete, non-repeats
          cy.byId(params.itemIds.g1item1)
            .should('have.value', params.itemValues.g1Answer2)
          // autocomplete, repeats
          cy.byId(`item-${params.itemIds.g1item2}`)
            .byCss('span.autocomp_selected li')
            .should('have.length', 1)          
          cy.byId(`item-${params.itemIds.g1item2}`)
            .byCss('span.autocomp_selected li')
            .eq(0)
            .should('have.text', '×' + params.itemValues.g1Answer2)       

          // group 2
          // raidobutoon
          cy.byId(`${params.itemIds.g2item1ans2} input`)
            .should('be.checked');
          // checkbox
          cy.byId(`${params.itemIds.g2item2ans2} input`)
            .should('be.checked');

          // group 3
          // autocomplete, non-repeats, prefix, score
          cy.byId(params.itemIds.g3item1)
            .should('have.value', params.itemValues.g3Answer2)
          // autocomplete, repeats, prefix, score
          cy.byId(`item-${params.itemIds.g3item2}`)
            .byCss('span.autocomp_selected li')
            .should('have.length', 1)             
          cy.byId(`item-${params.itemIds.g3item2}`)
            .byCss('span.autocomp_selected li')
            .eq(0)
            .should('have.text', '×' + params.itemValues.g3Answer2)   

          // group 4
          // radiobutton, prefix, score
          cy.byId(`${params.itemIds.g4item1ans2} input`)
            .should('be.checked');
          // checkbox, prefix, score
          cy.byId(`${params.itemIds.g4item2ans2} input`)
            .should('be.checked');

          // group 5
          // autocomplete, non-repeats, initial
          if (valueType === "valueCoding.open-choice") {
            cy.byId(params.itemIds.g5item1)
              .should('have.value', "user typed value");
          }
          else {
            cy.byId(params.itemIds.g5item1)
              .should('have.value', params.itemValues.g1Answer2);
          }
          // autocomplete, repeats, initial
          if (fhirVersion === 'R4') {
            cy.byId(`item-${params.itemIds.g5item2}`)
              .byCss('span.autocomp_selected li')
              .should('have.length', 2)
            cy.byId(`item-${params.itemIds.g5item2}`)
              .byCss('span.autocomp_selected li').eq(0)
              .should('have.text', '×' + params.itemValues.g1Answer2)
            if (valueType === "valueCoding.open-choice") {
              cy.byId(`item-${params.itemIds.g5item2}`)
                .byCss('span.autocomp_selected li')
                .eq(1)
                .should('have.text', '×' + 'user typed value')
            }
            else {
              cy.byId(`item-${params.itemIds.g5item2}`)
                .byCss('span.autocomp_selected li')
                .eq(1)
                .should('have.text', '×' + params.itemValues.g1Answer3)
            }
          }
          else {
            cy.byId(`item-${params.itemIds.g5item2}`)
              .byCss('span.autocomp_selected li')
              .should('have.length', 1)
            cy.byId(`item-${params.itemIds.g5item2}`)
                .byCss('span.autocomp_selected li')
                .eq(0)
                .should('have.text', '×' + params.itemValues.g1Answer2)
          }

          // group 6
          // radiobutton, non-repeats, initial
          cy.byId(`${params.itemIds.g6item1ans1} input`)
            .should('not.be.checked');
          cy.byId(`${params.itemIds.g6item1ans3} input`)
            .should('not.be.checked');
          if (valueType === "valueCoding.open-choice") {
            cy.byId(`${params.itemIds.g6item1ans2} input`)
              .should('not.be.checked');
            cy.byId(`valueCoding.open-choice-group6-item1/1/1_other input`)
              .should('be.checked');
            cy.byId('valueCoding.open-choice-group6-item1/1/1_otherValue')
              .should('be.visible')
              .should('have.value', "user typed value")
          }
          else {
            cy.byId(`${params.itemIds.g6item1ans2} input`)
            .should('be.checked');
          }

          // checkbox, repeats, initial
          cy.byId(`${params.itemIds.g6item2ans1} input`)
            .should('not.be.checked');
          cy.byId(`${params.itemIds.g6item2ans2} input`)
            .should('be.checked');
          if (fhirVersion === 'R4') {
            if (valueType === "valueCoding.open-choice") {
              cy.byId(`${params.itemIds.g6item2ans3} input`)
                .should('not.be.checked');
              cy.byId(`valueCoding.open-choice-group6-item2/1/1_other input`)
                .should('be.checked');
              cy.byId('valueCoding.open-choice-group6-item2/1/1_otherValue')
                .should('be.visible')
                .should('have.value', "user typed value")
            }
            else {
              cy.byId(`${params.itemIds.g6item2ans3} input`)
                .should('be.checked');
            }
          }
          else {
            cy.byId(`${params.itemIds.g6item2ans3} input`)
              .should('not.be.checked');
          }

        });
      });
      
    
      
    });

  });
}


describe('AnswerOption with different types', () => {
  before(() => {
    po.openPage();
  });

  for (var i=0, len=fhirVersions.length; i<len; ++i) {
    (function (fhirVersion) {

      let valueTypes = ["valueString", "valueInteger", "valueDate", "valueTime", "valueCoding.choice", "valueCoding.open-choice"];

      let itemValues = {
        'valueString': {
          g1Answer1 : 'a',
          g1Answer2 : 'b',
          g1Answer3 : 'c',
          g3Answer1 : 'A. a - 1',
          g3Answer2 : 'B. b - 2',
          g3Answer3 : 'C. c - 3'
        },
        'valueInteger': {
          g1Answer1 : '12',
          g1Answer2 : '34',
          g1Answer3 : '56',
          g3Answer1 : 'A. 12 - 1',
          g3Answer2 : 'B. 34 - 2',
          g3Answer3 : 'C. 56 - 3'
        },
        'valueDate': {
          g1Answer1 : '2022',
          g1Answer2 : '2022-09',
          g1Answer3 : '2022-09-20',
          g3Answer1 : 'A. 2022 - 1',
          g3Answer2 : 'B. 2022-09 - 2',
          g3Answer3 : 'C. 2022-09-20 - 3'
        },
        'valueTime': {
          g1Answer1 : '10:30:00',
          g1Answer2 : '13:30:00',
          g1Answer3 : '23:59:59',
          g3Answer1 : 'A. 10:30:00 - 1',
          g3Answer2 : 'B. 13:30:00 - 2',
          g3Answer3 : 'C. 23:59:59 - 3'
        },
        'valueCoding.choice': {
          g1Answer1 : 'Answer 1',
          g1Answer2 : 'Answer 2',
          g1Answer3 : 'Answer 3',
          g1Code1: 'c1',
          g1Code2: 'c2',
          g1Code3: 'c3',
          g3Answer1 : 'A. Answer 1 - 1',
          g3Answer2 : 'B. Answer 2 - 2',
          g3Answer3 : 'C. Answer 3 - 3'
        },
        'valueCoding.open-choice': {
          g1Answer1 : 'Answer 1',
          g1Answer2 : 'Answer 2',
          g1Answer3 : 'Answer 3',
          g1Code1: 'c1',
          g1Code2: 'c2',
          g1Code3: 'c3',
          g3Answer1 : 'A. Answer 1 - 1',
          g3Answer2 : 'B. Answer 2 - 2',
          g3Answer3 : 'C. Answer 3 - 3'
        }

      };
      

      let qrItemValues = {
        'valueString': {
          g1Answer1 : {'valueString' : 'a'},
          g1Answer2 : {'valueString' : 'b'},
          g1Answer3 : {'valueString' : 'c'},
        },
        'valueInteger': {
          g1Answer1 : {'valueInteger' : 12},
          g1Answer2 : {'valueInteger' : 34},
          g1Answer3 : {'valueInteger' : 56},
        },
        'valueDate': {
          g1Answer1 : {'valueDate' : '2022'},
          g1Answer2 : {'valueDate' : '2022-09'},
          g1Answer3 : {'valueDate' : '2022-09-20'},
        },
        'valueTime': {
          g1Answer1 : {'valueTime' : '10:30:00'},
          g1Answer2 : {'valueTime' : '13:30:00'},
          g1Answer3 : {'valueTime' : '23:59:59'},
        },
        'valueCoding.choice': {
          g1Answer1 : {"valueCoding": {"code": "c1", "display": "Answer 1"}},
          g1Answer2 : {"valueCoding": {"code": "c2", "display": "Answer 2"}},
          g1Answer3 : {"valueCoding": {"code": "c3", "display": "Answer 3"}}
        },
        'valueCoding.open-choice': {
          g1Answer1 : {"valueCoding": {"code": "c1", "display": "Answer 1"}},
          g1Answer2 : {"valueCoding": {"code": "c2", "display": "Answer 2"}},
          g1Answer3 : {"valueCoding": {"code": "c3", "display": "Answer 3"}}
        }
      };
      
      let itemIds = ((valueType, itemValues) => {
        let coding = (valueType === "valueCoding.choice" || valueType === "valueCoding.open-choice") 

        return {
          g1item1 : `${valueType}-group1-item1/1/1`,
          g1item2 : `${valueType}-group1-item2/1/1`,
          g3item1 : `${valueType}-group3-item1/1/1`,
          g3item2 : `${valueType}-group3-item2/1/1`,
          g5item1 : `${valueType}-group5-item1/1/1`,
          g5item2 : `${valueType}-group5-item2/1/1`,

          g2item1ans2 : `${valueType}-group2-item1/1/1${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
          g2item2ans2 : `${valueType}-group2-item2/1/1${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
          g4item1ans2 : `${valueType}-group4-item1/1/1${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
          g4item2ans2 : `${valueType}-group4-item2/1/1${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
          g6item1ans1 : `${valueType}-group6-item1/1/1${coding? itemValues.g1Code1 : itemValues.g1Answer1}`,
          g6item1ans2 : `${valueType}-group6-item1/1/1${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
          g6item1ans3 : `${valueType}-group6-item1/1/1${coding? itemValues.g1Code3 : itemValues.g1Answer3}`,
          g6item2ans1 : `${valueType}-group6-item2/1/1${coding? itemValues.g1Code1 : itemValues.g1Answer1}`,
          g6item2ans2 : `${valueType}-group6-item2/1/1${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
          g6item2ans3 : `${valueType}-group6-item2/1/1${coding? itemValues.g1Code3 : itemValues.g1Answer3}`
        };
      });

      // run tests for 6 different cases
      valueTypes.map(valueType => {
        let values = itemValues[valueType];
        let ids = itemIds(valueType, values);
        let params = {
          itemIds: ids,
          itemValues: values,
          qrItemValues: qrItemValues[valueType]
        }
       
        let fileName = `answerOption/answerOption-${valueType}.${fhirVersion}.json`;
        
        testOneValueType(valueType, params, fhirVersion, fileName);
      });

    })(fhirVersions[i]);
  }
});


  

