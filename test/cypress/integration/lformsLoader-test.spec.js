// Testing different use cases of lformLoader.js
// The project root directroy is the root for http-server
describe('lformsLoader.js Test', () => {
  it('no parameters, load es5 lforms js files, zone.js and two versons of fhir', () => {
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');
  })

  it('es=2015, load es2015 lforms js files, zone.js and two versons of fhir', () => {
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-es2015.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').should('be.visible');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-es2015.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').should('be.visible');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-es2015.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').should('be.visible');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');
  })

  it('fhir=R4, load es5 lforms js files, zone.js and R4 verson of fhir', () => {
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-fhir-r4.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-fhir-r4.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-fhir-r4.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('lhc-item').should("not.exist");
    // form title is still displayed?
    //cy.get('.lhc-form-title').contains('Weight & Height tracking panel');
  })

  it('fhir=STU3, load es5 lforms js files, zone.js and STU3 verson of fhir', () => {
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-fhir-stu3.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo'); 
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-fhir-stu3.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').should("not.exist")
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-fhir-stu3.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');
  })

  it('fhir=false, load es5 lforms js files, zone.js and NO fhir libs', () => {
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-no-fhir.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-no-fhir.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').should("not.exist")    
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-no-fhir.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').should("not.exist")
    
  })

  it('zone.js=false, load es5 lforms js files, zone.js and NO fhir libs', () => {
    // zone.js is loade separately in test_loader-no-zonejs.html
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').contains('PHQ-9 quick depression assessment panel');
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').contains('Weight & Height tracking panel');
    
  })

  it('fhir=false&zone.js=false, load es5 lforms js files, NO zone.js and NO fhir libs', () => {
    // zone.js is loade separately in test_loader-no-zonejs-no-fhir.html
    // load a lforms form data
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-no-zonejs-no-fhir.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/form-data/allInOne.json');
    cy.get('.lhc-form-title').contains('Full-Featured Demo');
    // load a R4 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-no-zonejs-no-fhir.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get('#fileAnchor').attachFile('test-data/e2e/R4/phq9.json');
    cy.get('.lhc-form-title').should("not.exist")    
    // load a STU3 questionnaire
    cy.visit('/test/pages/lformsLoader.js-tests/test_loader-no-zonejs-no-fhir.html')
    cy.get("#loadBtn").contains("Load From File")
    cy.get("#fhirVersion").select("STU3")
    cy.get('#fileAnchor').attachFile('test-data/e2e/STU3/weightHeightQuestionnaire.json');
    cy.get('.lhc-form-title').should("not.exist")
  })
})