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
      expect(patient.gender).to.equal('LA2-8');
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
      expect(patient.gender).to.equal('LA2-8');
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
});
