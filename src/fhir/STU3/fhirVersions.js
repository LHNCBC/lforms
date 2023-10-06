let fhirVersion = 'STU3', 
    sdcVersion = '2.0', 
    fhirVersionNum = '3.0';

export default {
  fhirVersion: fhirVersion, //Needed by lfData for fhirpath, etc.
  SDCVersion: sdcVersion,
  QProfile: 'http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire|'+sdcVersion,
  QRProfile: 'http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaireresponse|'+sdcVersion,
  stdQProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/Questionnaire',
  stdQRProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/QuestionnaireResponse'
}