import { AddFormToPageTestPage } from "../../support/addFormToPageTest.po";
import {TestUtil} from '../../support/testUtilFacade';
import * as util from "../../support/util";

const fhirVersion = 'R4';
const fhirMock = require('../../support/R4/fhir_context');

const po: AddFormToPageTestPage = new AddFormToPageTestPage();

describe('FHIR answerValueSet', () => {
  before(() => {
    cy.visit('test/pages/addFormToPageTest.html');
    TestUtil.waitForFHIRLibsLoaded();
  });

  describe('answerValueSet with FHIR context, answers displayed as autocomplete', () => {
    const answerField1 = 'yesno1/1', // choice
          answerField2 = 'yesno2/1', // choice, repeats
          answerField3 = 'yesno3/1', // open-choice
          answerField4 = 'yesno4/1', // open-choice
          answerField5 = 'yesno5/1', // open-choice, repeats
          answerField6 = 'yesno6/1', // open-choice, repeats
          searchResults = 'searchResults';

    before(() => {
      cy.window().then((win) => {
        const fhirContext = new Function('return ' + fhirMock.mockFHIRContext)();
        win.LForms.Util.setFHIRContext(fhirContext(fhirVersion, null, fhirMock.mockData));
      });
    });

    it('should have expected answer list when the Questionnaire is loaded', () => {
      util.addFormToPage('q-with-answerValueSet-autocomplete.json', null, {fhirVersion});
      [answerField1, answerField2, answerField3, answerField4, answerField5, answerField6].forEach(answerField => {
        cy.byId(answerField).click();
        cy.byId(searchResults).should('be.visible');
        cy.byCss("#searchResults li").its('length').should('eq', 3);
        cy.byCss("#searchResults li").eq(0).contains('No');
        cy.byCss("#searchResults li").eq(1).contains('Yes');
        cy.byCss("#searchResults li").eq(2).contains("Don't know");  
      });
    });

    it('should have expected answer list and saved value when the QuestionnaireReponse is merged to the Questionnaire', () => {
      cy.window().then((win) => {
        cy.readFile('test/data/R4/q-with-answerValueSet-autocomplete.json').then((q) => {  // readFile will parse the JSON
          let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
          cy.readFile('test/data/R4/qr-with-answerValueSet-autocomplete.json').then((qr) => {
            let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
            win.LForms.Util.addFormToPage(mergedFormData, "formContainer", {fhirVersion});

            // check saved values
            cy.byId(answerField1).should('have.value', 'Yes');
            cy.byId("item-yesno2/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Yes');
            cy.byId("item-yesno2/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×No');
            cy.byId(answerField3).should('have.value', 'Yes');
            cy.byId(answerField4).should('have.value', 'offlist answer 1');
            cy.byId("item-yesno5/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Yes');
            cy.byId("item-yesno5/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×No');
            cy.byId("item-yesno6/1").byCss('span.autocomp_selected li').eq(0).should('have.text', '×Yes');
            cy.byId("item-yesno6/1").byCss('span.autocomp_selected li').eq(1).should('have.text', '×offlist answer 2');
            // check answer list
            [answerField1, answerField3, answerField4].forEach(answerField => {
              cy.byId(answerField).click();
              cy.byId(searchResults).should('be.visible');
              cy.byCss("#searchResults li").its('length').should('eq', 3);
              cy.byCss("#searchResults li").eq(0).contains('No');
              cy.byCss("#searchResults li").eq(1).contains('Yes');
              cy.byCss("#searchResults li").eq(2).contains("Don't know");  
            });
            cy.byId(answerField2).click();
            cy.byId(searchResults).should('be.visible');
            cy.byCss("#searchResults li").its('length').should('eq', 1);
            cy.byCss("#searchResults li").eq(0).contains("Don't know");  
            cy.byId(answerField5).click();
            cy.byId(searchResults).should('be.visible');
            cy.byCss("#searchResults li").its('length').should('eq', 1);
            cy.byCss("#searchResults li").eq(0).contains("Don't know");  
            cy.byId(answerField6).click();
            cy.byId(searchResults).should('be.visible');
            cy.byCss("#searchResults li").its('length').should('eq', 2);
            cy.byCss("#searchResults li").eq(0).contains('No');
            cy.byCss("#searchResults li").eq(1).contains("Don't know");  
          });

        });
      });
    });
    
    // using the already loaded questionnaire to get the questionnaire response
    it('should export a correct QR again', () => {
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
        expect(qr.item[0].linkId).to.equal('yesno1');
        expect(qr.item[0].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[1].linkId).to.equal('yesno2');
        expect(qr.item[1].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[1].answer[1]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[2].linkId).to.equal('yesno3');
        expect(qr.item[2].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[3].linkId).to.equal('yesno4');
        expect(qr.item[3].answer[0]).to.eql({
          "valueString": "offlist answer 1"
        });
        expect(qr.item[4].linkId).to.equal('yesno5');
        expect(qr.item[4].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[4].answer[1]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[5].linkId).to.equal('yesno6');
        expect(qr.item[5].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });        
        expect(qr.item[5].answer[1]).to.eql({
          "valueString": "offlist answer 2"
        });
      })
    })

  });

  describe('answerValueSet with FHIR context, answers displayed as radion buttons or checkboxes', () => {

    const f1a1 = 'yesno1/1N',
          f1a2 = 'yesno1/1Y',
          f1a3 = 'yesno1/1asked-unknown',
          f2a1 = 'yesno2/1N',
          f2a2 = 'yesno2/1Y',
          f2a3 = 'yesno2/1asked-unknown',
          f3a1 = 'yesno3/1N',
          f3a2 = 'yesno3/1Y',
          f3a3 = 'yesno3/1asked-unknown',
          f3Other = 'yesno3/1_other',
          f4a1 = 'yesno4/1N',
          f4a2 = 'yesno4/1Y',
          f4a3 = 'yesno4/1asked-unknown',
          f4Other = 'yesno4/1_other',
          f5a1 = 'yesno5/1N',
          f5a2 = 'yesno5/1Y',
          f5a3 = 'yesno5/1asked-unknown',
          f5Other = 'yesno5/1_other',
          f5OtherValue = 'yesno5/1_otherValue',
          f6a1 = 'yesno6/1N',
          f6a2 = 'yesno6/1Y',
          f6a3 = 'yesno6/1asked-unknown',
          f6Other = 'yesno6/1_other',
          f6OtherValue = 'yesno6/1_otherValue';


    before(() => {
      cy.window().then((win) => {
        const fhirContext = new Function('return ' + fhirMock.mockFHIRContext)();
        win.LForms.Util.setFHIRContext(fhirContext(fhirVersion, null, fhirMock.mockData));
      });
    });

    it('should have expected answer list displayed as radio buttons or checkboxes when the Questionnaire is loaded', () => {
      util.addFormToPage('q-with-answerValueSet-radiobutton-checkbox.json', null, {fhirVersion});

      let n= 1;
      while(n<7) {
        cy.byId('yesno' + n + '/1N').should('be.visible');
        cy.byId('yesno' + n + '/1Y').should('be.visible');
        cy.byId('yesno' + n + '/1asked-unknown').should('be.visible');
        n++;
      }
      cy.byId(f3Other).should('be.visible');
      cy.byId(f4Other).should('be.visible');
      cy.byId(f5Other).should('be.visible');
      cy.byId(f6Other).should('be.visible');
           
    });

    it('should have expected answer list and saved value when the QuestionnaireReponse is merged to the Questionnaire', () => {
      cy.window().then((win) => {
        cy.readFile('test/data/R4/q-with-answerValueSet-radiobutton-checkbox.json').then((q) => {  // readFile will parse the JSON
          let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
          cy.readFile('test/data/R4/qr-with-answerValueSet-radiobutton-checkbox.json').then((qr) => {
            let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
            win.LForms.Util.addFormToPage(mergedFormData, "formContainer", {fhirVersion});

            // check saved values
            cy.byId(f1a1).find('input').should('not.be.checked');
            cy.byId(f1a2).find('input').should('be.checked');
            cy.byId(f1a3).find('input').should('not.be.checked');

            cy.byId(f2a1).find('input').should('be.checked');
            cy.byId(f2a2).find('input').should('be.checked');
            cy.byId(f2a3).find('input').should('not.be.checked');
            
            cy.byId(f3a1).find('input').should('not.be.checked');
            cy.byId(f3a2).find('input').should('be.checked');
            cy.byId(f3a3).find('input').should('not.be.checked');
            cy.byId(f3Other).find('input').should('not.be.checked');

            cy.byId(f4a1).find('input').should('be.checked');
            cy.byId(f4a2).find('input').should('be.checked');
            cy.byId(f4a3).find('input').should('not.be.checked');
            cy.byId(f4Other).find('input').should('not.be.checked');

            cy.byId(f5a1).find('input').should('not.be.checked');
            cy.byId(f5a2).find('input').should('not.be.checked');
            cy.byId(f5a3).find('input').should('not.be.checked');
            cy.byId(f5Other).find('input').should('be.checked');
            cy.byId(f5OtherValue).should('have.value', 'offlist answer 1');

            cy.byId(f6a1).find('input').should('not.be.checked');
            cy.byId(f6a2).find('input').should('be.checked');
            cy.byId(f6a3).find('input').should('not.be.checked');
            cy.byId(f6Other).find('input').should('be.checked');
            cy.byId(f6OtherValue).should('have.value', 'offlist answer 2');

            // check answer list
            let n= 1;
            while(n<7) {
              cy.byId('yesno' + n + '/1N').should('be.visible');
              cy.byId('yesno' + n + '/1Y').should('be.visible');
              cy.byId('yesno' + n + '/1asked-unknown').should('be.visible');
              n++;
            }
            cy.byId(f3Other).should('be.visible');
            cy.byId(f4Other).should('be.visible');
            cy.byId(f5Other).should('be.visible');
            cy.byId(f6Other).should('be.visible');
          });
        });
      });
    });

    // using the already loaded questionnaire to get the questionnaire response
    it('should export a correct QR again', () => {
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
        expect(qr.item[0].linkId).to.equal('yesno1');
        expect(qr.item[0].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[1].linkId).to.equal('yesno2');
        expect(qr.item[1].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[1].answer[1]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[2].linkId).to.equal('yesno3');
        expect(qr.item[2].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[3].linkId).to.equal('yesno4');
        expect(qr.item[3].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[3].answer[1]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[4].linkId).to.equal('yesno5');
        expect(qr.item[4].answer[0]).to.eql({
          "valueString": "offlist answer 1"
        });
        expect(qr.item[5].linkId).to.equal('yesno6');
        expect(qr.item[5].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });        
        expect(qr.item[5].answer[1]).to.eql({
          "valueString": "offlist answer 2"
        });
      })
    })

  });

  describe('answerValueSet with FHIR context, answers displayed as matrix', () => {
    const f1a1 = '/g1m1/1/1N',
          f1a2 = '/g1m1/1/1Y',
          f1a3 = '/g1m1/1/1asked-unknown',
          f2a1 = 'yesno2/1N',
          f2a2 = 'yesno2/1Y',
          f2a3 = 'yesno2/1asked-unknown',
          f3a1 = 'yesno3/1N',
          f3a2 = 'yesno3/1Y',
          f3a3 = 'yesno3/1asked-unknown',
          f3Other = 'yesno3/1_other',
          f4a1 = 'yesno4/1N',
          f4a2 = 'yesno4/1Y',
          f4a3 = 'yesno4/1asked-unknown',
          f4Other = 'yesno4/1_other',
          f5a1 = 'yesno5/1N',
          f5a2 = 'yesno5/1Y',
          f5a3 = 'yesno5/1asked-unknown',
          f5Other = 'yesno5/1_other',
          f5OtherValue = 'yesno5/1_otherValue',
          f6a1 = 'yesno6/1N',
          f6a2 = 'yesno6/1Y',
          f6a3 = 'yesno6/1asked-unknown',
          f6Other = 'yesno6/1_other',
          f6OtherValue = 'yesno6/1_otherValue';
          

    before(() => {
      cy.window().then((win) => {
        const fhirContext = new Function('return ' + fhirMock.mockFHIRContext)();
        win.LForms.Util.setFHIRContext(fhirContext(fhirVersion, null, fhirMock.mockData));
      });
    });

    it('should have expected answer list when the Questionnaire is loaded', () => {
      util.addFormToPage('q-with-answerValueSet-matrix.json', null, {fhirVersion});
      let g= 1, m=1;
      while(g<5) {
        while(m<4) {
          cy.byId('/g' + g + 'm' + m + '/1/1N').should('be.visible');
          cy.byId('/g' + g + 'm' + m + '/1/1Y').should('be.visible');
          cy.byId('/g' + g + 'm' + m + '/1/1asked-unknown').should('be.visible');
          m++;  
        }
        g++
      }
      cy.byId('/g3m1/1/1_other').should('be.visible');
      cy.byId('/g3m2/1/1_other').should('be.visible');
      cy.byId('/g3m3/1/1_other').should('be.visible');

      cy.byId('/g4m1/1/1_other').should('be.visible');
      cy.byId('/g4m2/1/1_other').should('be.visible');
      cy.byId('/g4m3/1/1_other').should('be.visible');

    });

    it('should have expected answer list and saved value when the QuestionnaireReponse is merged to the Questionnaire', () => {
      cy.window().then((win) => {
        cy.readFile('test/data/R4/q-with-answerValueSet-matrix.json').then((q) => {  // readFile will parse the JSON
          let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, fhirVersion);
          cy.readFile('test/data/R4/qr-with-answerValueSet-matrix.json').then((qr) => {
            let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, fhirVersion);
            win.LForms.Util.addFormToPage(mergedFormData, "formContainer", {fhirVersion});

            // check saved values
            // check answer list
            let g= 1, m=1;
            while(g<5) {
              while(m<4) {
                cy.byId('/g' + g + 'm' + m + '/1/1N').should('be.visible');
                cy.byId('/g' + g + 'm' + m + '/1/1Y').should('be.visible');
                cy.byId('/g' + g + 'm' + m + '/1/1asked-unknown').should('be.visible');
                m++;  
              }
              g++
            }
            cy.byId('/g3m1/1/1_other').should('be.visible');
            cy.byId('/g3m2/1/1_other').should('be.visible');
            cy.byId('/g3m3/1/1_other').should('be.visible');
      
            cy.byId('/g4m1/1/1_other').should('be.visible');
            cy.byId('/g4m2/1/1_other').should('be.visible');
            cy.byId('/g4m3/1/1_other').should('be.visible');
          });
        });
      });
    });

    // using the already loaded questionnaire to get the questionnaire response
    it('should export a correct QR again', () => {
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
        // first group
        expect(qr.item[0].item[0].linkId).to.equal('/g1m1');
        expect(qr.item[0].item[0].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[0].item[1].linkId).to.equal('/g1m2');
        expect(qr.item[0].item[1].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[0].item[2].linkId).to.equal('/g1m3');
        expect(qr.item[0].item[2].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Don't know"
          }
        });
        // second group
        expect(qr.item[1].item[0].linkId).to.equal('/g2m1');
        expect(qr.item[1].item[0].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[1].item[1].linkId).to.equal('/g2m2');
        expect(qr.item[1].item[1].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[1].item[1].answer[1]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[1].item[2].linkId).to.equal('/g2m3');
        expect(qr.item[1].item[2].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[1].item[2].answer[1]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[1].item[2].answer[2]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Don't know"
          }
        });

        // third group
        expect(qr.item[2].item[0].linkId).to.equal('/g3m1');
        expect(qr.item[2].item[0].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        });
        expect(qr.item[2].item[1].linkId).to.equal('/g3m2');
        expect(qr.item[2].item[1].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[2].item[2].linkId).to.equal('/g3m3');
        expect(qr.item[2].item[2].answer[0]).to.eql({
          "valueString": "offlist answer 1"
        });
        
        // fourth group
        expect(qr.item[3].item[0].linkId).to.equal('/g4m1');
        expect(qr.item[3].item[0].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[3].item[1].linkId).to.equal('/g4m2');
        expect(qr.item[3].item[1].answer[0]).to.eql({
          "valueString": "offlist answer 2"
        });
        expect(qr.item[3].item[2].linkId).to.equal('/g4m3');
        expect(qr.item[3].item[2].answer[0]).to.eql({
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        });
        expect(qr.item[3].item[2].answer[1]).to.eql({
          "valueString": "offlist answer 3"
        });
      })
    })

  });
});
