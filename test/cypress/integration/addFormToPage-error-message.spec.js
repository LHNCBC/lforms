// The project root directory is the root for the cypress server
describe('addFormToPage Error Message Test', () => {
  it('show an error when a valueset cannot be loaded because of a wrong valueset url', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/fhir-context-q-wrong-valueset-url.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context');
    // has an error message
    cy.get("#loadMsg").contains("Unable to load ValueSet from https://lforms-fhir.nlm.nih.gov/baseDstu3/ValueSet/$expand?url=http://hl7.org/fhir/ValueSet/yesnodontknow-invalid")
  })

  it('show an error when a valueset cannot be loaded because of a wrong fhir context', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/fhir-context-q-wrong-fhircontext.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context');
    // has an error message
    cy.get("#loadMsg").contains("Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server")
  })

  it('show only the first error when there are multiple valuesets cannot be loaded.', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/fhir-context-q-wrong-valueset-url-fhircontext.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context');
    // has an error message
    cy.get("#loadMsg").contains("Unable to load ValueSet from https://lforms-fhir.nlm.nih.gov/baseDstu3/ValueSet/$expand?url=http://hl7.org/fhir/ValueSet/yesnodontknow-invalid")
  })

  
})