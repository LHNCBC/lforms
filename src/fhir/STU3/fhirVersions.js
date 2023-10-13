let fhirVersion = 'STU3', 
    fhirVersionNum = '3.0';

export default {
  fhirVersion: fhirVersion, //Needed by lfData for fhirpath, etc.
  stdQProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/Questionnaire',
  stdQRProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/QuestionnaireResponse'
}