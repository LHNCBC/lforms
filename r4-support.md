# Support for FHIR version R4
This briefly details the support for FHIR R4 Questionnaire and
QuestionnaireResponse.  Note that we have also support for FHIR STU3 for
Questionnaire and QuestionnaireResponse, but that is not documented here.

# Questionnaire
See https://www.hl7.org/fhir/questionnaire.html for a list of the fields in
Questionnaire.  For a list of core extensions, see
https://www.hl7.org/fhir/questionnaire-profiles.html#extensions.

## Supported

### Top-level fields
All top-level (form-level) fields are supported, but since most of those fields
do not affect the rendering of a Questionnaire, mostly that means that if a
Questionnaire containing those fields is imported into LHC-Forms, and
re-exported in FHIR Questionnaire, the fields are preserved.

For "status", if it was not previously set at import, it will be set to "draft" on export.

### Item-level fields
* linkId
* code
* prefix
* text
* type:  All types except reference, and with partial support for date,
  dateTime, and time.  (See "not yet supported" for details.)
* enableWhen:  Supported, but has a couple of known bugs:
   * Does not support > on strings or dates.
   * For multi-select lists, the "exists" continues to return true after all
     selected values are removed.
* enableWhenBehavior
* required
* repeats
* readOnly
* maxLength
* answerValueSet:  Supported, with the exception "contained" ValueSets are
  required to include an expansion.
* answerOption
* answerOption.initialSelected
* initial

### Extensions
* maxSize
* maxValue
* mimeType
* minLength
* minValue
* ordinalValue
* choiceOrientation
* hidden
* itemControl:  Support for types: gtable, table, drop-down, autocomplete,
  radio-button, check-box, help.  Note that type "list", "inline", and
  "text-box" are default behavior, so those are supported, and the extension is
  not needed for those cases.
* maxOccurs
* minOccurs
* unitOption
* regex
* variable

The following extensions seem to be out of scope for a form renderer, but they
are "supported" in the sense that if a Questionnaire using them is re-exported
from LHC-Forms, the extensions will still be present.
* 11179-permitted-value-conceptmap
* 11179-permitted-value-valueset
* designNote
* replaces
* baseType

## Not yet supported
### Item-level fields
* item.definition
* item.type:  No support for type=reference.  Also, there are the following
  limitations on the support for types "date", "dateTime", and "time":
   * The date in "date" "dateTime" must be complete dates.  No timezone is shown
     or selectable for "dateTime".  When entering a
     dateTime the local timezone is assumed.
   * The time in "time" and "dateTime" must have both hours and minutes, only.
     Seconds and milliseconds cannot be entered.
   * We have not tested what happens if you load a QuestionnaireResponse with
     data that violates the above restrictions.  We are planning to correct
     these deficiencies when we can find a suitable UI package that is more
     flexible about entry of dates and times.  Possibly we will need to write
     our own.
* answerValueSet:  "contained" ValueSets without expansions are unsupported

### Extensions
Note that non-supported extensions are simply ignored, but are also retained on
a re-export to Questionnaire.
* maxDecimalPlaces
* constraint
* displayCategory
* itemControl:  See above for supported types.  Unsupported:  htable, header,
  footer, lower, upper, flyover, lookup, slider, spinner.  Type "unit" is
  unsupported, but is also unnecessary with LHC-Forms if "questionnaire-unit" is
  used.  Type "prompt" is also unsupported but is being removed in
  R5 (https://jira.hl7.org/browse/FHIR-21023).
* unitValueSet
* usageMode


# QuestionnaireResponse
See https://www.hl7.org/fhir/questionnaireresponse.html for a list of the fields in
QuestionnaireResponse.

For a list of core extensions, see
https://www.hl7.org/fhir/questionnaireresponse-profiles.html.  LHC-Forms does
not output any of those extensions when creating a QuestionnaireResponse, and
they do not affect the display of the form if a QuestionnaireResponse containing
them is imported.

## Fields in QuestionnaireResponse

Because many of the fields in QuestionnaireResponse are either not relevant for
rendering a form, or when
[exporting](https://lhncbc.github.io/lforms/#retrieving-fhir-data) to a
QuestionnaireResponse are left for the application to set, the following list is
not broken out into supported and unsupported sub-sections as for Questionnaire.

* identifier:  Not used on import, and not set on export.
* basedOn:  Out of scope; this would be something for the application to set
* partOf:  Out of scope; this would be something for the application to set
* questionnaire:  LHC-Forms currently leaves it up the application to set this
  field, though in the future we plan to set it with value of Questionnaire.url.
* status:  LHC-Forms sets this to "completed", but the application should change
  this value it knows that it should be something else (e.g. "amended").
* subject:  The application can pass in the subject value as an option when
  [exporting](https://lhncbc.github.io/lforms/#retrieving-fhir-data) the
  QuestionnaireResponse, or it can set it afterward.
* encounter:  Left for the application to set.  LHC-Forms would not know this
  except in certain cases.
* authored:  Set by LHC-Forms to the date and time at which the QuestionnaireResponse is
  exported.
* author:  Left for the application to set.  LHC-Forms would not know this
  except in certain cases.
* source:  Left for the application to set.  LHC-Forms would not know this
  except in certain cases.
* item.linkId:  Supported
* item.definition:  Not supported
* item.text:  LHC-Forms does not currently export this field, though we might
  change that in the future.  It is not necessary, since it is present in the
  Questionnaire, but it makes it easier to read a QuestionnaireResponse by
  itself.
* item.answer.value[x]:  All types are supported except valueReference.
* item.item:  Supported

