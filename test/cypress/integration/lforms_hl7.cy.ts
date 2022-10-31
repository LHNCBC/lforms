import {TestPage} from '../support/lforms_testpage.po.js';
import {rxtermsControls as rxterms} from '../support/rxterms.po.js';

describe('HL7 data', () => {
  const tp: TestPage = new TestPage();
  const ff: any = tp.USSGFHTVertical;

  it('should get correct hl7 data', () => {
    tp.LoadForm.openUSSGFHTVertical();

    // ST, repeating
    cy.byId(ff.name).type('name1');
    cy.byId(ff.btnName).click();
    cy.byId(ff.name2).type('name2');
    cy.byId(ff.btnName2).click();
    cy.byId(ff.name3).type('name3');
    cy.byId(ff.btnName3).click();
    cy.byId(ff.name).clear();
    // DT
    cy.byId(ff.dob).type('10/27/2016');
    // CWE/CNE
    // pick the 1st item
    cy.byId(ff.gender).click().type('{downArrow}').type('{enter}');
    // CWE, multiple answers
    // pick the first 2 items
    cy.byId(ff.race).click().type('{downArrow}').type('{enter}').type('{enter}');
    // REAL
    cy.byId(ff.height).type('70');
    cy.byId(ff.weight).type('170');
    // repeating sub panel
    cy.byId(ff.disease).click().type('{downArrow}').type('{enter}');
    cy.byId(ff.ageAtDiag).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(ff.btnDiseasesHist).click();

    cy.byId(ff.disease2).should('be.visible').click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(ff.ageAtDiag2).click().type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(ff.btnDiseasesHist2).click();

    cy.byId(ff.disease3).click().type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(ff.ageAtDiag3).click().type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(ff.btnDiseasesHist3).click();

    // clear up the first instance
    cy.byId(ff.disease).clear();
    cy.byId(ff.ageAtDiag).clear();

    // family member
    cy.byId(ff.fmName).type('member name1');
    cy.byId(ff.fmDisease).type('{downArrow}').type('{enter}');
    cy.byId(ff.btnAnotherDiseasesHist).click();

    cy.byId(ff.btnAnotherFamily).click();
    cy.byId(ff.fmName2).type('member name2');
    cy.byId(ff.fmDisease2).type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(ff.btnAnotherDiseasesHist2).click();

    cy.byId(ff.btnAnotherFamily2).click();

    cy.window().then((win) => {
      const hl7Data = win.LForms.Util.getFormHL7Data();
      const hl7 = hl7Data.replace(/\r/g, '');
      expect(hl7).to.equal('OBR|1|54127-6N^USSG-FHT, (with mock-up items for skip logic demo)^LN|OBX|1|TX|54125-0^Name^LN|1.a|name2|OBX|2|TX|54125-0^Name^LN|1.b|name3|OBX|3|CNE|54131-8^Gender^LN|1|LA2-8^Male^|OBX|4|DT|21112-8^Date of Birth^LN|1|20161027|OBX|5|NM|8302-2^Height^LN|1|70|inches^inches^LN|OBX|6|NM|29463-7^Weight^LN|1|170|lbs^lbs^LN|OBX|7|ST|39156-5^Mock-up item: Body mass index (BMI) [Ratio]^LN|1|24.39|OBX|8|CNE|54134-2^Race^LN|1.a|LA10608-0^American Indian or Alaska Native^LN|OBX|8|CNE|54134-2^Race^LN|1.b|LA6156-9^Asian^LN|OBX|9|CNE|54140-9^Disease or Condition^LN|1.1a|LA10572-8^-- Blood Clot in Leg^LN|OBX|10|CNE|54130-0^Age at Diagnosis^LN|1.1a|LA10394-7^Infancy^LN|OBX|11|CNE|54140-9^Disease or Condition^LN|1.1b|LA10573-6^-- Blood Clot in Lungs^LN|OBX|12|CNE|54130-0^Age at Diagnosis^LN|1.1b|LA10395-4^Childhood^LN|OBX|13|ST|54138-3^Name^LN|2a.a|member name1|OBX|14|CNE|54116-9^Disease or Condition^LN|2a.1a|LA10533-0^Blood Clots^LN|OBX|15|ST|54138-3^Name^LN|2b.a|member name2|OBX|16|CNE|54116-9^Disease or Condition^LN|2b.1a|LA10572-8^-- Blood Clot in Leg^LN|');
    });
  });

  it('should get correct hl7 data for forms without questions in header', () => {
    tp.LoadForm.openRxTerms();

    const drugNameField = rxterms.drugName;
    cy.byId(drugNameField).click().type('aspercreme');
    cy.byId(tp.Autocomp.searchResults).should('be.visible');
    cy.byId(drugNameField).type('{downArrow}');
    cy.byId(rxterms.strengthAndForm).click();

    cy.window().then((win) => {
      const hl7Data = win.LForms.Util.getFormHL7Data();
      const hl7 = hl7Data.replace(/\r/g, '');
      expect(hl7).to.equal('OBR|1|X-001^RxTerms Demo^LN|OBX|1|CNE|nameAndRoute^Drug Name^LN|1a|ASPERCREME (Topical)^ASPERCREME (Topical)^|');
    });
  });

});
