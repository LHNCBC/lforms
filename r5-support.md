# Support for FHIR version R5
This briefly details the support for FHIR R5 Questionnaire and
QuestionnaireResponse.  
Note that we have also support for FHIR R4 and STU3 for Questionnaire 
and QuestionnaireResponse, but that is not documented here.

# Questionnaire
See https://www.hl7.org/fhir/questionnaire.html for a list of the fields in
Questionnaire.  For a list of core extensions, see
https://www.hl7.org/fhir/questionnaire-profiles.html#extensions.

## Supported

### Top-level fields
Same as R4(see r4-support.md).

### Item-level fields
Same as R4(see r4-support.md). Except the following changes:
* type: add 'coding', remove 'choice' and 'open-choice'
* answerConstraint: support 'optionsOnly' and 'optionsOrString'. 
  No support for 'optionsOrType' yet.

### Extensions
Same as R4(see r4-support.md).

## Not yet supported
### Top-level fields
* versionAlgorithm[x]
* subjectType
* copyrightLabel

### Item-level fields
Same as R4(see r4-support.md), and:
* answerConstraint: 'optionsOrType'
* disabledDisplay

### Extensions
Same as R4(see r4-support.md).

# QuestionnaireResponse
See https://www.hl7.org/fhir/questionnaireresponse.html for a list of the fields in
QuestionnaireResponse.

For a list of core extensions, see
https://www.hl7.org/fhir/questionnaireresponse-profiles.html.  LHC-Forms does
not output any of those extensions when creating a QuestionnaireResponse, and
they do not affect the display of the form if a QuestionnaireResponse containing
them is imported.

## Fields in QuestionnaireResponse
Same as R4(see r4-support.md).
