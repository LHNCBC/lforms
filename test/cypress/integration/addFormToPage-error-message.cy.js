// The project root directory is the root for the cypress server
describe('addFormToPage Error Message Test', () => {
  it('show an error when a valueset cannot be loaded because of a wrong valueset url', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/fhir-context-q-wrong-valueset-url.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context 1');
    // has an error message
    // This also tests that the url parameter gets URL-encoded.
    cy.get("#loadMsg").contains("Unable to load ValueSet");
    // An error message is shown under the field for which answerValueSet expansion failed.
    cy.byId('item-/54126-8/54128-4/1/1')
      .find('.lhc-item-error')
      .should('be.visible')
      .should('have.text', 'Error: Unable to load the answer list for this question.');
    // Load some other file that doesn't have expansion failures.
    cy.get('#fileAnchor').uploadFile('test/data/R4/fhir-context-q.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context');
    cy.get('.lhc-item-error')
      .should('not.exist');
    // Load the original file again, the error message should still be shown.
    cy.get('#fileAnchor').uploadFile('test/data/R4/fhir-context-q-wrong-valueset-url.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context 1');
    cy.byId('item-/54126-8/54128-4/1/1')
      .find('.lhc-item-error')
      .should('be.visible')
      .should('have.text', 'Error: Unable to load the answer list for this question.');
  });

  it('show an error when a valueset cannot be loaded because of a wrong fhir context', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/fhir-context-q-wrong-fhircontext.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context 2');
    // has an error message
    cy.get("#loadMsg").contains("Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server");
  });

  it('show only the first error when there are multiple valuesets cannot be loaded.', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/fhir-context-q-wrong-valueset-url-fhircontext.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing code that requires a FHIR context 3');
    // has one of the error messages (most of the time it's the first error message)
    //"Unable to load ValueSet from https://lforms-fhir.nlm.nih.gov/baseDstu3/ValueSet/$expand?url=http://hl7.org/fhir/ValueSet/yesnodontknow-invalid"
    //"Unable to load ValueSet http://terminology.hl7.org/ValueSet/v3-MessageWaitingPriority-invalid from FHIR server"
    cy.get("#loadMsg").contains("Unable to load ValueSet")
    cy.get("#loadMsg").contains(/v3-MessageWaitingPriority-invalid|yesnodontknow-invalid/g)

  });

  it('successfully load a form that requests AnswerValueSet', () => {
    // load a lforms form data
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.intercept('https://sqlonfhir-r4.azurewebsites.net/fhir/ValueSet/$expand?url=http://fhir.telstrahealth.com.au/tcm/ValueSet/ARE&_format=json', {
      body: {
        "resourceType": "ValueSet",
        "id": "866d7924e20711d48c540020182939f7",
        "meta": {
          "versionId": "3",
          "lastUpdated": "2022-01-10T10:40:11.73+00:00"
        },
        "text": {
          "status": "additional",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Expansion of [ARE] where filter = '%' (count=9 of 9)</div>"
        },
        "url": "http://fhir.telstrahealth.com.au/tcm/ValueSet/ARE",
        "version": "7.29.0",
        "name": "ARE",
        "title": "State",
        "status": "active",
        "date": "2021-08-27",
        "publisher": "Telstra Health - TCM",
        "expansion": {
          "total": 9,
          "contains": [
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "8",
              "display": "Australian Capital Territory"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "7",
              "display": "Northern Territory"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "1",
              "display": "NSW"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "9",
              "display": "Other Territories"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "3",
              "display": "Queensland"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "4",
              "display": "South Australia"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "6",
              "display": "Tasmania"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "2",
              "display": "Victoria"
            },
            {
              "system": "http://fhir.telstrahealth.com/tcm/CodeSystem/ARE_local",
              "code": "5",
              "display": "Western Australia"
            }
          ]
        }
      }
    });
    cy.get('#fileAnchor').uploadFile('test/data/R4/bit-of-everything.json');
    cy.get('.lhc-form-title').contains('Bit of everything');
    // has no error message
    cy.get("#loadMsg").contains("Unable to load ValueSet from").should('not.exist');
  });

  it('should show errors for duplicate variable names - root level', () => {
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/q-with-duplicate-variable-names-root-level.json');
    cy.get('#loadMsg').should('have.text', 'Duplicate variable name "X" found at root level.');
  });

  it('should show errors for duplicate variable names - item level', () => {
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/q-with-duplicate-variable-names-item-level.json');
    cy.get('#loadMsg').should('have.text', 'Duplicate variable name "Y" found. Item linkId: /fieldA.');
  });

  it('should show errors if a duplicate name is found in variable extension and launchContext extension', () => {
    cy.visit('/test/pages/addFormToPageTest.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/q-with-duplicate-variable-name-as-launchContext.json');
    cy.get('#loadMsg').should('have.text', 'Duplicate variable name "patient" found at root level.');
  });
});
