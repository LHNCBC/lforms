
var restrictions_lforms = {
  name: 'restrictions example',
  code: 'c0',
  items: [{
    question: 'Ex Q1',
    questionCode: 'Q1',
    dataType: 'REAL',
    restrictions: {
      minInclusive: '10',
      maxInclusive: '20',
      pattern: 'd+', // The following are not applicable for real type. The conversion should ignore.
      minLength: '1',
      maxLength: '2'
    }
  },{
    question: 'Ex Q2',
    questionCode: 'Q2',
    dataType: 'ST',
    restrictions: {
      pattern: 'd+',
      minLength: '1',
      maxLength: '3',
      minExclusive: '5', // These are not applicable for ST type. The conversion should ignore.
      maxExclusive: '100'
    }
  }]
};

var restrictions_fhirQ = {
  name: 'restrictions example',
  code: [{code: 'c0'}],
  item: [{
    text: 'Ex Q1',
    code: [{code: 'Q1', display: 'Ex Q1'}],
    linkId: '/Q1',
    type: 'decimal',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/minValue',
        valueDecimal: 10
      },
      {
        url: 'http://hl7.org/fhir/StructureDefinition/maxValue',
        valueDecimal: 20
      }
    ]
  },{
    text: 'Ex Q2',
    code: [{code: 'Q2', display: 'Ex Q2'}],
    linkId: '/Q2',
    type: 'string',
    maxLength: 3,
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/regex',
        valueString: 'd+'
      },
      {
        url: 'http://hl7.org/fhir/StructureDefinition/minLength',
        valueInteger: 1
      }
    ]
  }]
};


