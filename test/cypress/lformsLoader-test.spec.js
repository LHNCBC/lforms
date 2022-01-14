describe('lformsLoader.js Test', () => {
  it('Load lforms js files, not other', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
  })

  it('Load lforms js files, with zone.js', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-zonejs.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
  })


  it('Load lforms js files, with fhir R4', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-fhir-r4.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');
  })

  it('Load lforms js files, with fhir STU3', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-fhir-stu3.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');
  })

  it('Load lforms js files, with fhir all, load lforms data', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-fhir-all.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');

  })

  it('Load lforms js files, with fhir all, load R4 questionnaire', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-fhir-all.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');

  })

  it('Load lforms js files, with fhir all, load STU3 questionnaire', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-fhir-all.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');

  })

  it('Load lforms js files, with zone.js and fhir all, load lforms data', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-zonejs-fhir-all.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');

  })

  it('Load lforms js files, with zone.js and fhir all, load R4 questionnaire', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-zonejs-fhir-all.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');

  })

  it('Load lforms js files, wwith zone.js and fhir all, load STU3 questionnaire', () => {
    cy.visit('http://localhost:4202/test/pages/test_loader-zonejs-fhir-all.html')
    cy.get("#loadBtn").contains("Load From File")

    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');

  })

})