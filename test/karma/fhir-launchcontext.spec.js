var $ = LForms.jQuery;

describe('launchContext fhirContextVars', function() {
  const launchContextUrl =
    'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext';
  const initialExpressionUrl =
    'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression';

  const cases = [
    {name: 'patient', type: 'Patient', id: 'pat-1'},
    {name: 'encounter', type: 'Encounter', id: 'enc-1'},
    {name: 'location', type: 'Location', id: 'loc-1'},
    {name: 'study', type: 'ResearchStudy', id: 'study-1'},
    {name: 'user', type: 'Device', id: 'dev-1'},
    {name: 'user', type: 'PractitionerRole', id: 'pracrole-1'},
    {name: 'user', type: 'Practitioner', id: 'prac-1'},
    {name: 'user', type: 'RelatedPerson', id: 'rel-1'},
    {name: 'user', type: 'Organization', id: 'org-1'},
    {name: 'user', type: 'Patient', id: 'pat-2'}
  ];

  function buildQuestionnaire(launchName, resourceType) {
    return {
      resourceType: 'Questionnaire',
      status: 'draft',
      extension: [
        {
          url: launchContextUrl,
          extension: [
            {
              url: 'name',
              valueCoding: {
                code: launchName,
                system: 'http://hl7.org/fhir/uv/sdc/CodeSystem/launchContext'
              }
            },
            {
              url: 'type',
              valueCode: resourceType
            }
          ]
        }
      ],
      item: [
        {
          linkId: 'q1',
          text: 'Launch context value',
          type: 'string',
          extension: [
            {
              url: initialExpressionUrl,
              valueExpression: {
                language: 'text/fhirpath',
                expression: '%' + launchName + '.id'
              }
            }
          ]
        }
      ]
    };
  }

  cases.forEach(function(testCase) {
    it('should prepopulate from ' + testCase.name + ' ' + testCase.type, function(done) {
      const container = document.createElement('div');
      container.id = 'launch-context-container';
      document.body.appendChild(container);

      const resource = {
        resourceType: testCase.type,
        id: testCase.id
      };
      const fhirContextVars = {};
      fhirContextVars[testCase.name] = resource;

      try {
        LForms.Util.setFHIRContext(null, fhirContextVars);
      }
      catch (err) {
        document.body.removeChild(container);
        done(err);
        return;
      }

      const questionnaire = buildQuestionnaire(testCase.name, testCase.type);

      LForms.Util.addFormToPage(questionnaire, container, {
        fhirVersion: 'R4',
        prepopulate: true
      })
      .then(function() {
        const qr = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', container);
        const answer = qr.item && qr.item[0] && qr.item[0].answer && qr.item[0].answer[0];
        assert.equal(answer.valueString, testCase.id);
        LForms.Util.removeFormsFromPage(container);
        document.body.removeChild(container);
        done();
      })
      .catch(function(err) {
        LForms.Util.removeFormsFromPage(container);
        document.body.removeChild(container);
        done(err);
      });
    });
  });
});
