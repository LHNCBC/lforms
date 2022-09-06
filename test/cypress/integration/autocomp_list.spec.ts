import {TestPage} from '../support/lforms_testpage.po.js';

describe('autocomp list', () => {
  let tp;
  let ff;

  before(async () => {
    tp = new TestPage();
    ff = tp.Autocomp;
  });

  it('should not be visible when the form loads', () => {
    tp.LoadForm.openUSSGFHTVertical();
    cy.get(ff.searchResults).should('not.be.visible');
  });

  it('should be visible after the user clicks in a field', () => {
    cy.byId(ff.listField).click();
    cy.get(ff.searchResults).should('be.visible');
  });

  it('should work with multiple-select fields', () => {
    cy.byId(ff.raceField).should('be.visible')
      .then(el => {
        expect(typeof el[0].autocomp).to.equal('object');
      });
  });

  it('should interoperate with score rules', () => {
    // The data model needs to be correctly updated
    // when the user enters a new value.
    tp.LoadForm.openGlasgowForm();

    cy.byId(ff.eyeField).click();
    cy.get(ff.searchResults).should('be.visible');
    // Check pre-condition
    cy.byId(ff.scoreField).should('have.value', '0');
    cy.get('#searchResults li:first-child').click();
    cy.byId(ff.scoreField).should('have.value', '1');
    // Now try using keystrokes to select the third item.
    cy.byId(ff.eyeField).click()
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{enter}');
    cy.byId(ff.eyeField).should('have.value', '3. Eye opening to verbal command - 3');
    cy.byId(ff.scoreField).should('have.value', '3');

    // Try the 4th answer, which has a null label
    cy.byId(ff.eyeField).click()
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{enter}');
    cy.byId(ff.eyeField).should('have.value', '4. Eyes open spontaneously - 4');
    cy.byId(ff.scoreField).should('have.value', '4');
  });

  it('should receive default values set via defaultAnswer', () => {
    tp.LoadForm.openFullFeaturedForm();
    cy.byId(tp.FullFeaturedForm.cneField).should('have.value', 'Answer 2');
  });

  it('should set column headers when specified', () => {
    tp.LoadForm.openHL7GeneticPanel();
    // Open the "simple variation" section
    cy.byId(tp.HL7GeneticPanel.kindOfMutations)
      .click()
      .type('{downArrow}')
      .type('{enter}');

    // Bring up the variant ID search results list
    cy.byId(tp.HL7GeneticPanel.variantID)
      .click()
      .type('ar');

    // Confirm that the header row appears over the search results
    cy.get(ff.searchResults).should('be.visible');
    // This test also checks the escaping of HTML tags
    cy.get(ff.searchResults).contains('Variant ID <a>').should('be.visible');
  });

  it('should not autofill lists when there is just one answer', () => {
    tp.LoadForm.openRxTerms();
    cy.byId('/X-002/nameAndRoute/1/1').typeAndWait('AZELEX');
    cy.get('#searchResults tr:first-child').click();
    cy.byId('/X-002/strengthAndForm/1/1').should('have.value', '');
  });

  let testFiles = {'rxterms.R4.with-autofill-calexp.json': 'should autofill lists when there is just one answer, on the item that has a calculationExpression (to autofill) listed before an answerExpression', 
   'rxterms.R4.with-autofill-calexp2.json': 'should autofill lists when there is just one answer, on the item that has an answerExpressn listed before a calculationExpression (to autofill)'};

  Object.keys(testFiles).forEach(qFile=>{
    it(testFiles[qFile], () => {
      tp.openBaseTestPage()
      tp.loadFromTestData(qFile, 'R4');
      
      // autofill when the strength has one item in the list
      cy.byId('medication/1/1').typeAndWait('AZELEX')
      cy.get('#searchResults li:first-child').click();
      cy.byId('strength/1/1').should('have.value', '20% Cream');
      cy.byId('rxcui/1/1').should('have.value', '1043753');
  
      cy.byId('medication/1/1').clear().typeAndWait('Factor X')
      cy.get('#searchResults li:first-child').click();
      cy.byId('strength/1/1').should('have.value', '1 unt Injection');
      cy.byId('rxcui/1/1').should('have.value', '1719235');
  
      // no autofill when the strength has more than one item in the list
      cy.byId('medication/1/1').clear().typeAndWait('GAS-X')
      cy.get('#searchResults li:first-child').click();
      cy.byId('strength/1/1').should('have.value', '');
      cy.byId('rxcui/1/1').should('have.value', '');
  
      cy.byId('strength/1/1').click()
      cy.get('#searchResults li:first-child').click();
      cy.byId('strength/1/1').should('have.value', '80 mg Tab');
      cy.byId('rxcui/1/1').should('have.value', '210273');
  
      // still works: autofill when the strength has one item in the list
      cy.byId('medication/1/1').clear().typeAndWait('Factor X')
      cy.get('#searchResults li:first-child').click();
      cy.byId('strength/1/1').should('have.value', '1 unt Injection');
      cy.byId('rxcui/1/1').should('have.value', '1719235');
    });
  }) 

  it('should not display SeqNum on answers that one of them has a numeric value', () => {
    tp.LoadForm.openFullFeaturedForm();

    // no sequence number
    cy.byId('/numeric_answer/1').click();
    cy.get('#searchResults #completionOptions ul li:first-child').should('have.text', '1');
    cy.get('#searchResults #completionOptions ul li:nth-child(2)').should('have.text', 'Answer 2');
    cy.get('#searchResults #completionOptions ul li:nth-child(3)').should('have.text', 'Answer 3');

    // has sequence number
    cy.byId('/type9/1').click();
    cy.get('#searchResults #completionOptions ul li:first-child .listNum').should('be.visible').should('have.text', '1:');
    cy.get('#searchResults #completionOptions ul li:nth-child(2) .listNum').should('be.visible').should('have.text', '2:');
    cy.get('#searchResults #completionOptions ul li:nth-child(3) .listNum').should('be.visible').should('have.text', '3:');
  });

});
