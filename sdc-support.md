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
* rendering-style:  on item.text, item.prefix, legal text, help text and answerOption
* rendering-xhtml:  on item.text, item.prefix and answerOption
* hidden
* itemControl:  Support for types:  gtable, table, drop-down, autocomplete,
  radio-button, check-box, help.  Note that type "list" is the default type of
  display, so that is supported, and the extension is not needed for that case.
* choiceOrientation
* optionPrefix
* required
* repeats
* readOnly
* entryFormat

### Form Behavior
See https://build.fhir.org/ig/HL7/sdc/behavior.html for descriptions of these
fields.
* maxLength
* minLength
* regex
* minValue (types integer and decimal only)
* maxValue (types integer and decimal only)
* mimeType
* maxSize
* answerOption
* answerValueSet:  Note that contained ValueSets are expected to contain an expansion.
  For ValueSet expansion scores, the recommended path is
  `ValueSet.expansion.contains.property` (FHIR R5), or in R4/R4B, the R5
  backport extension
  `http://hl7.org/fhir/5.0/StructureDefinition/extension-ValueSet.expansion.contains.property`.
  In R4/R4B, score extraction may also require the companion backport for
  `ValueSet.expansion.property` so property codes can be mapped to canonical
  URIs:
  `http://hl7.org/fhir/5.0/StructureDefinition/extension-ValueSet.expansion.property`.
  Using the property code `itemWeight` directly is still supported as a
  compatibility path, but may produce a warning if the URI mapping metadata is
  missing.  Legacy score extraction from `ValueSet.expansion.contains.extension`
  using `ordinalValue`/`itemWeight` is still supported only as a
  backward-compatible fallback.
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
* enableWhenExpression
* ordinalValue

### Form Population
See https://build.fhir.org/ig/HL7/sdc/populate.html for descriptions of these
fields.
* observationLinkPeriod
* launchContext
* variable
* initialExpression

### Form Data Extraction
See https://build.fhir.org/ig/HL7/sdc/extraction.html for descriptions of these
fields.
* observationExtract



## Not yet supported
### Advanced Rendering
See https://build.fhir.org/ig/HL7/sdc/rendering.html for descriptions of these
fields.
* rendering-xhtml:  Other than for item.text, item.prefix, answerOption and itemControl of type "help"
* displayCategory
* sliderStepValue
* width
* collaspible
* supportLink
* choiceColumn
* valueset-label
* shortText
* rendering-styleSensitive
* optionalDisplay

### Form Behavior
See https://build.fhir.org/ig/HL7/sdc/behavior.html for descriptions of these
fields.
* minValue (for types other than integer and decimal)
* maxValue (for types other than integer and decimal)
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
* usageMode
* constraint
* endPoint
* signatureRequired

### Form Population
See https://build.fhir.org/ig/HL7/sdc/populate.html for descriptions of these
fields.
* itemPopulationContext
* candidateExpression
* contextExpression
* sourceQueries
* sourceStructureMap

### Form Data Extraction
See https://build.fhir.org/ig/HL7/sdc/extraction.html for descriptions of these
fields.
* itemExtractionContext
* targetStructureMap
