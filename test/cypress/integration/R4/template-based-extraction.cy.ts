import * as util from "../../support/util";

describe('Template based extraction', () => {
  it('should work on templateExtract', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-extract-complex-template.json', null, {fhirVersion: 'R4'});
    // Fill out the form before extracting.
    cy.byId('given/1/1/1').type('Adam');
    cy.byId('family/1/1/1').type('Xie');
    cy.byId('gender/1/1').click().type('{downArrow}{enter}');
    cy.byId('ihi/1/1').type('111');
    cy.byId('mobile-phone/1/1').type('123');
    cy.byId('height/1/1').type('44');
    cy.byId('weight/1/1').type('55');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(3);
      const patient = bundle[1].entry[0].resource;
      expect(patient.resourceType).to.equal("Patient");
      expect(patient.identifier).to.deep.equal([
        {
          "type": {
            "text": "National Identifier (IHI)"
          },
          "system": "http://example.org/nhio",
          "value": "111"
        }
      ]);
      expect(patient.name).to.deep.equal([
        {
          "text": "Adam Xie",
          "family": "Xie",
          "given": [
            "Adam"
          ]
        }
      ]);
      expect(patient.telecom).to.deep.equal([
        {
          "system": "phone",
          "use": "mobile",
          "value": "123"
        }
      ]);
      expect(patient.gender).to.equal('male');
      // Properties that start with an underscore should have been removed.
      expect(patient._gender).to.be.undefined;
      expect(bundle[1].entry[0].request).to.deep.equal({
        "method": "POST",
        "url": "Patient"
      });
      const height = bundle[1].entry[1].resource;
      expect(height.resourceType).to.equal("Observation");
      expect(height.valueQuantity).to.deep.equal({
        "unit": "cm",
        "system": "http://unitsofmeasure.org",
        "code": "cm",
        "value": 4400
      });
      expect(height._valueQuantity).to.be.undefined;
      // Patient fullUrl reference.
      expect(height.subject).to.equal(bundle[1].entry[0].fullUrl);
      expect(height.issued).to.equal(bundle[0].authored);
      expect(height.effectiveDateTime).to.equal(bundle[0].authored);
      expect(height._effectiveDateTime).to.be.undefined;
      // FHIRPath expression evaluated on %resource.id.
      // Should match the QuestionnaireResponse id.
      expect(height.derivedFrom[0].reference).to.equal(`QuestionnaireResponse/${bundle[0].id}`);
      expect(bundle[1].entry[1].request).to.deep.equal({
        "method": "POST",
        "url": "Observation"
      });
      const weight = bundle[1].entry[2].resource;
      expect(weight.resourceType).to.equal("Observation");
      expect(weight.valueQuantity).to.deep.equal({
        "unit": "kg",
        "system": "http://unitsofmeasure.org",
        "code": "kg",
        "value": 55
      });
      expect(weight._valueQuantity).to.be.undefined;
      // Patient fullUrl reference.
      expect(weight.subject).to.equal(bundle[1].entry[0].fullUrl);
      expect(weight.issued).to.equal(bundle[0].authored);
      expect(weight.effectiveDateTime).to.equal(bundle[0].authored);
      expect(weight._effectiveDateTime).to.be.undefined;
      // FHIRPath expression evaluated on %resource.id.
      // Should match the QuestionnaireResponse id.
      expect(weight.derivedFrom[0].reference).to.equal(`QuestionnaireResponse/${bundle[0].id}`);
      // templateExtractContext extension should have been removed.
      expect(weight.derivedFrom[0].extension).to.be.undefined;
      // Other extensions not related to template extract should be kept.
      expect(weight.extension).to.deep.equal([
        {
          "url": "test extension url",
          "valueString": "test extension value"
        }
      ]);
      expect(bundle[1].entry[2].request).to.deep.equal({
        "method": "POST",
        "url": "Observation"
      });
    });
    // Clear the weight field and the weight field should be removed from the extracted bundle
    // due to templateExtractContext extension.
    cy.byId('weight/1/1').clear();
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(2);
    });
  });

  it('should work on templateExtractBundle', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-extract-complex-template-bundle.json', null, {fhirVersion: 'R4'});
    // Fill out the form before extracting.
    cy.byId('given/1/1/1').type('Adam');
    cy.byId('family/1/1/1').type('Xie');
    cy.byId('gender/1/1').click().type('{downArrow}{enter}');
    cy.byId('ihi/1/1').type('111');
    cy.byId('mobile-phone/1/1').type('123');
    cy.byId('height/1/1').type('44');
    cy.byId('weight/1/1').type('55');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(3);
      const patient = bundle[1].entry[0].resource;
      expect(patient.resourceType).to.equal("Patient");
      expect(patient.identifier).to.deep.equal([
        {
          "type": {
            "text": "National Identifier (IHI)"
          },
          "system": "http://example.org/nhio",
          "value": "111"
        }
      ]);
      expect(patient.name).to.deep.equal([
        {
          "text": "Adam Xie",
          "family": "Xie",
          "given": [
            "Adam"
          ]
        }
      ]);
      expect(patient.telecom).to.deep.equal([
        {
          "system": "phone",
          "use": "mobile",
          "value": "123"
        }
      ]);
      expect(patient.gender).to.equal('male');
      // Properties that start with an underscore should have been removed.
      expect(patient._gender).to.be.undefined;
      expect(bundle[1].entry[0].request).to.deep.equal({
        "method": "POST",
        "url": "Patient",
        "ifMatch": `Patient?_name=${bundle[1].entry[0].fullUrl}`
      });
      const height = bundle[1].entry[1].resource;
      expect(height.resourceType).to.equal("Observation");
      expect(height.valueQuantity).to.deep.equal({
        "unit": "cm",
        "system": "http://unitsofmeasure.org",
        "code": "cm",
        "value": 4400
      });
      expect(height._valueQuantity).to.be.undefined;
      // Patient fullUrl reference.
      expect(height.subject.reference).to.equal(bundle[1].entry[0].fullUrl);
      expect(height.issued).to.equal(bundle[0].authored);
      expect(height.effectiveDateTime).to.equal(bundle[0].authored);
      expect(height._effectiveDateTime).to.be.undefined;
      // FHIRPath expression evaluated on %resource.id.
      // Should match the QuestionnaireResponse id.
      expect(height.derivedFrom[0].reference).to.equal(`QuestionnaireResponse/${bundle[0].id}`);
      expect(bundle[1].entry[1].request).to.deep.equal({
        "method": "POST",
        "url": "Observation"
      });
      const weight = bundle[1].entry[2].resource;
      expect(weight.resourceType).to.equal("Observation");
      expect(weight.valueQuantity).to.deep.equal({
        "unit": "kg",
        "system": "http://unitsofmeasure.org",
        "code": "kg",
        "value": 55
      });
      expect(weight._valueQuantity).to.be.undefined;
      // Patient fullUrl reference.
      expect(weight.subject.reference).to.equal(bundle[1].entry[0].fullUrl);
      expect(weight.issued).to.equal(bundle[0].authored);
      expect(weight.effectiveDateTime).to.equal(bundle[0].authored);
      expect(weight._effectiveDateTime).to.be.undefined;
      // FHIRPath expression evaluated on %resource.id.
      // Should match the QuestionnaireResponse id.
      expect(weight.derivedFrom[0].reference).to.equal(`QuestionnaireResponse/${bundle[0].id}`);
      expect(bundle[1].entry[2].request).to.deep.equal({
        "method": "POST",
        "url": "Observation"
      });
    });
  });

  it('should work on a questionnaire with both templateExtract and templateExtractBundle', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('q-with-template-extraction.json', null, {fhirVersion: 'STU3'});
    // Fill out the form before extracting.
    cy.byId('height/1/1').type('44');
    cy.byId('weight/1/1').type('55');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "STU3", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(2);
      const weight = bundle[1].entry[0].resource;
      expect(weight.resourceType).to.equal("Observation");
      expect(weight.valueQuantity).to.deep.equal({
        "unit": "kg",
        "system": "http://unitsofmeasure.org",
        "code": "kg",
        "value": 55
      });
      expect(weight._valueQuantity).to.be.undefined;
      const height = bundle[1].entry[1].resource;
      expect(height.resourceType).to.equal("Observation");
      expect(height.valueQuantity).to.deep.equal({
        "unit": "cm",
        "system": "http://unitsofmeasure.org",
        "code": "cm",
        "value": 4400
      });
      expect(height._valueQuantity).to.be.undefined;
    });
  });

  it('should work if templateExtract extension is at root level', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-extract-template-root-level.json', null, {fhirVersion: 'R4'});
    // Fill out the form before extracting.
    cy.byId('height/1').type('44');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(1);
      const height = bundle[1].entry[0].resource;
      expect(height.resourceType).to.equal("Observation");
      expect(height.valueQuantity).to.deep.equal({
        "unit": "cm",
        "system": "http://unitsofmeasure.org",
        "code": "cm",
        "value": 4400
      });
      expect(height._valueQuantity).to.be.undefined;
    });
  });

  it('should allocate different values if extractAllocateId extension is defined on a repeating item', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-extract-template-with-allocateId-on-repeating-item.json', null, {fhirVersion: 'R4'});
    // Fill out the form before extracting.
    cy.byId('height/1/1').type('44');
    cy.byId('add-height/1/1').click();
    cy.byId('height/1/2').type('55');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(2);
      const height1 = bundle[1].entry[0].resource;
      expect(height1.resourceType).to.equal("Observation");
      expect(height1.subject).not.to.be.null;
      const height2 = bundle[1].entry[1].resource;
      expect(height2.resourceType).to.equal("Observation");
      expect(height2.subject).not.to.be.null;
      // Different values are allocated to the two repeating items.
      expect(height1.subject).not.to.equal(height2.subject);
    });
  });

  it('should set request properties based on templateExtract subextensions', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-extract-template-with-subextensions.json', null, {fhirVersion: 'R4'});
    // Fill out the form before extracting.
    cy.byId('height/1/1').type('44');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(1);
      const height = bundle[1].entry[0].resource;
      expect(height.resourceType).to.equal("Observation");
      expect(height.valueQuantity).to.deep.equal({
        "unit": "cm",
        "system": "http://unitsofmeasure.org",
        "code": "cm",
        "value": 4400
      });
      expect(height.id).not.to.be.null;
      expect(bundle[1].entry[0].fullUrl).to.equal(height.id);
      const heightRequest = bundle[1].entry[0].request;
      expect(heightRequest.method).to.equal("PUT");
      expect(heightRequest.url).to.equal(`Observation/${height.id}`);
      expect(heightRequest.ifNoneMatch).to.equal(height.id);
      expect(heightRequest.ifModifiedSince).to.equal(new Date().toISOString().slice(0, 10));
      expect(heightRequest.ifMatch).to.equal(height.id);
      expect(heightRequest.ifNoneExist).to.equal(height.id);
    });
  });

  it('should extract multiple items if templateExtractContext extension evaluates to multiple results', () => {
    cy.visit('test/pages/addFormToPageTest.html');
    util.addFormToPage('questionnaire-extract-complex-template.json', null, {fhirVersion: 'R4'});
    // Fill out the form before extracting.
    cy.byId('given/1/1/1').type('a1');
    cy.byId('add-given/1/1/1').click();
    cy.byId('given/1/1/2').type('a2');
    cy.byId('family/1/1/1').type('aa');
    cy.byId('add-name/1/1').click();
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(2);
      const patient = bundle[1].entry[0].resource;
      expect(patient.resourceType).to.equal("Patient");
      // The second name is added but not filled out, so only one name entry is extracted.
      expect(patient.name).to.deep.equal([
        {
          "text": "a1 a2 aa",
          "family": "aa",
          "given": [
            "a1",
            "a2"
          ]
        }
      ]);
    });
    // Fill out another name entry.
    cy.byId('given/1/2/1').type('b1');
    cy.byId('add-given/1/2/1').click();
    cy.byId('given/1/2/2').type('b2');
    cy.byId('family/1/2/1').type('bb');
    cy.window().then((win) => {
      const bundle = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", null, {extract: true});
      expect(bundle.length).to.equal(2);
      expect(bundle[0].resourceType).to.equal("QuestionnaireResponse");
      expect(bundle[1].resourceType).to.equal("Bundle");
      expect(bundle[1].entry.length).to.equal(2);
      const patient = bundle[1].entry[0].resource;
      expect(patient.resourceType).to.equal("Patient");
      // The second name is now filled out, so a templated "name" property is extracted for each name field.
      expect(patient.name).to.deep.equal([
        {
          "text": "a1 a2 aa",
          "family": "aa",
          "given": [
            "a1",
            "a2"
          ]
        },
        {
          "text": "b1 b2 bb",
          "family": "bb",
          "given": [
            "b1",
            "b2"
          ]
        }
      ]);
    });
  });
});
