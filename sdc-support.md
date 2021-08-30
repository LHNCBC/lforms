# Support for FHIR Structured Data Capture

The following is a terse listing of our support for the Structured Data Capture
(SDC) FHIR Implementation Guide.  For more details about the items listed here,
see:  https://build.fhir.org/ig/HL7/sdc/index.html

For the expression extensions mentioned below, we do not support CQL, but do
support FHIRPath and x-fhir-query where appropriate for the extension.

The following lists are organized by the sections of the SDC implementation
guide (IG).

## Supported Features
### Advanced Rendering
See https://build.fhir.org/ig/HL7/sdc/rendering.html for descriptions of these
fields.
* rendering-style:  on item.text and prefix
* rendering-xhtml:  on item.text
* hidden
* itemControl:  gtable, table, drop-down, autocomplete, radio-button, check-box, help
* choiceOrientation
* optionPrefix
* required
* repeats
* readOnly

### Form Behavior
See https://build.fhir.org/ig/HL7/sdc/behavior.html for descriptions of these
fields.
* maxLength
* minLength
* regex
* minValue
* maxValue
* mimeType
* maxSize
* answerOption
* answerValueSet:  Note that contained ValueSets are expected to contain an expansion.
* answerExpression
* required: (also listed in previous section of the SDC IG)
* repeats
* readOnly
* minOccurs
* maxOccurs
* unitOption
* launchContext: limited to what can be obtained through the npm package
  "fhirclient" (user, patient, encounter)
* variable
* initialExpression
* calculatedExpression
* initial
* enableWhen
* enableBehavior
* ordinalValue

### Form Population
See https://build.fhir.org/ig/HL7/sdc/populate.html for descriptions of these
fields.
* observationLinkPeriod
* launchContext
* variable
* questionnaire-initialExpression

### Form Data Extraction
See https://build.fhir.org/ig/HL7/sdc/extraction.html for descriptions of these
fields.
* observationExtract



## Not yet supported
### Advanced Rendering
See https://build.fhir.org/ig/HL7/sdc/rendering.html for descriptions of these
fields.
* displayCategory
* sliderStepValue
* width
* collaspible
* supportLink
* choiceColumn
* valueset-label
* entryFormat
* shortText
* rendering-styleSensitive
* optionalDisplay

### Form Behavior
See https://build.fhir.org/ig/HL7/sdc/behavior.html for descriptions of these
fields.
* minQuantity
* maxQuantity
* maxDecimalPlaces
* optionExclusive
* unitValueSet
* referenceResource
* referenceProfile
* candidateExpression
* lookupQuestionnaire
* cqf-library
* cqf-calculatedValue
* cqf-expression
* entryMode
* enableWhenExpression
* usageMode
* constraint
* endPoint
* signatureRequired

### Form Population
See https://build.fhir.org/ig/HL7/sdc/populate.html for descriptions of these
fields.
* questionnaire-itemPopulationContext
* sdc-questionnaire-candidateExpression
* sdc-questionnaire-contextExpression
* sdc-questionnaire-sourceQueries
* questionnaire-sourceStructureMap

### Form Data Extraction
See https://build.fhir.org/ig/HL7/sdc/extraction.html for descriptions of these
fields.
* questionnaire-itemExtractionContext
* questionnaire-targetStructureMap
