# Form Definition Format

The forms rendered by the LForms widget are defined in a JSON format, an example
of which can be seen in [sample-data.js](app/scripts/lib/sample-data.js).  The
basic structure (some of which is optional) is shown below, followed by comments
about the meaning of each key:

```
    {
      "code": [string],
      "name": [string],
      "templateOption": {
        "obrHeader": [boolean],
        "obrItems": [{
          "question": [string],
          "dataType": [string],
          "answers": [{
            "text": [string],
            "code": [string]
          }]
        }],
      },
      "items": [{
        "questionCode": [string]
        "questionCardinality": {
           "min": "1",
           "max": "1" or "*"
        },
        "question": [string],
        "answerCardinality": {
          min: "0" or "1",
          max: "1" or "*"
        },
        "answers": [string] or [{
          text: [string],
          code: [string],
          other: [string],
          score: [number]
        }],
        "externallyDefined": [string],
        "dataType": [string],
        "units": [{
          "name": [string],
          "default": [boolean]
        }],
        "header": [boolean],
        "skipLogic": {
          "conditions": [{
            "source": [string]
            "trigger": {
              "value": [string] or [number], or
              "minExclusive": number,
              "minInclusive": number,
              "maxExclusive": number,
              "maxInclusive": number
            }
          }],
          "action": [string]
        },
        "codingInstructions": [string],
        "calculationMethod": {
          "name": [string]
        }
      }],
      answerLists: [
        "622": [{
          "text": [string],
          "code": [string],
          "other": [string],
          "label": [string]
        }]
      ]
    }
```

Keys:

* **code** - a code (identifier) for a panel, or in the context of answer
  lists, for an individual answer in the list.  For answer lists, codes are
  optionar.
* **name** - (required) The name of the form (to be shown to the user)
* **templateOption** - a hash of options for the template.  This can be
  omitted, but supported values are below.
  * <a name="obrHeader"></a> obrHeader - a boolean that controls whether to
    show a row fields above the actual form like "Date Date", "Comment", etc.
    (This control is actually broken at the moment, but will be fixed soon.)
    The default is true.
  * obrItems - an array defining fields above the form (see
    [obrHeader](#obrHeader)).  If you omit templateOption, a default will be
    provided which will have the fields "Date Done", "Time Done", "Where
    Done", and "Comment".  If you wish to specify your own definitions, each
    element in the array should be a hash with the following keys:
    * question - the field label
    * dataType - the kind of field.  This can be DT for a date field with a
      calender widget, ST for a normal input field, CNE for a list field in
      which values are required to match the list, or CWE for a list field in
      which values can be off the list.
    * answers - For data types CNE or CWE, this is an array with the list
      data.  Each element in the array is a hash with the following keys:
      * text - the display string for the list item
      * code - (optional) a code that identifies the list item
    * formatting - This controls things like the width of the column.  It is a
      hash with the keys "width" and "min-width", the values of both of which
      are the standard CSS values for those style settings.
    * <a name="answerCardinality"></a>answerCardinality - For lists, this
      allows you to control whether list is multi-select or not.  It is a hash
      that takes two keys, "min" and "max".  If you "min" to "1", then the
      user will be required to provide an answer.  If you set "max" to "*",
      the list becomes multi-select.  (Other possibilities are not yet
      supported.)
    * _answerRequired - If true, the field will complain if the user leaves it
      blank.
* <a name="items"></a> **items** - This is an array of form questions and
  sections.  Questions and sections (containing sub-questions) mostly
  represented the same in this array, but a section will contain its own
  "items" array to specify what it contains.  Sections can be nested, but more
  than six levels of nesting will not look very good.  Each question/section
  in the array is represented by a hash with the following keys:
  * questionCode - (required) A code identifying the question or section.
  * questionCardinality - This controls whether the there is a button for
    adding another of this question/section.  It is a hash with "min" and
    "max" keys, and by default both of those are "1" (i.e., not repeatable).
    If you wish for a question or section to be repeatable, pass in `{"min":
    "1", "max": "*"}`.
  * question - The label for the question, or the title of the section.
  * answerCardinality - The same as <a href="#answerCardinality">above</a>.
  * <a name="answers"></a> answers - For questions with answer lists, this is
    either an array of hashes for items in the list, or a string ID as a
    lookup key for such data in the <a href="#answerLists">answerLists</a>
    hash.  When provided as an array, each hash can contain:
      * text - (required) the display string for this list item.  This should
        be unique within the list.
      * code - (optional) an identifier for the list item.  This can be
        omitted if you do not need coded answers.
      * other - If this answer is an "Other" item, then this "other" key
        provides a label like "Please specify" for an additional field that
        will be available with the user chooses this answer.
      * <a name="score"></a>score - (optional) Some forms have scored answers
        which get summed into a total field.  See TOTALSCORE under <a
        href="#calculationMethod">calculationMethod</a> below for how to
        specify which field holds the total.
  * externallyDefined - List fields can be configured to obtain their lists
    from a URL as the user types.  This usually used of for larger lists for
    which it would not be practical to include the whole list with the form.
    The [lforms-service](https://lforms-service.nlm.nih.gov/) website provides
    a number of read-to-use web APIs that can plugged in here to provide
    searchable lists of drugs, medical conditions, disease names, and more.
    If you wish to set up your own web API on a website, then you just need to
    understand what query parameters to handle on the webserver, and what the
    response format nees to be.  LForms uses the
    [autocomplete-lhc](http://lhncbc.github.io/autocomplete-lhc/) package for
    its lists, so see the documentation for its [url
    parameter](http://lhncbc.github.io/autocomplete-lhc/docs.html#url) if you
    are setting up your own list.
  * dataType - The data type of the answer for the question. This determines
    what sort of field control is provided.  Supported types are:
    * CWE - an answer list where the user is permitted to enter something
      not on the list.
    * CNE - an answer list where the user is **not** permitted to enter something
      not on the list.
    * REAL - a number which might not be an integer
    * INT - a integer
    * DT - a date field (with a calendar widget)
    * ST - a normal free-text string field
  * units - For numeric answer fields, this is an optional list for the units
    for the quantity being entered.  Eash hash in this array can contain the
    following keys:
    * name - The display string for the unit
    * default - If true, this unit will be the default unit, which means it
      will show up in the field when the question is shown and the user does
      not have to pick it.  If false, this key can be omitted.
  * header - If true, then this is not a question but a section, which can
    contain its own <a href="#items">items</a> array of questions and sections.
  * skipLogic - Controls the hiding/showing of this question or section based
    on data entered in other parts of the form. The value is a hash with the
    following keys:
    * conditions - An array of the conditions to be met.  Each condition is a
      hash with the following keys:
      * source - The code of another question
      * trigger - A hash defining a condition about the value for the
        question specified by "source".  The hash can either have a "value"
        key, or some combination of minExclusive, minInclusive, maxExclusive,
        or maxInclusive.  The meaning of the keys is as follows:
        * value - a value which the value for question "source" must exactly match.
        * minExclusive - a value which the source question's value must exceed
        * minInclusive - a value which the source question's value must equal
          or exceed
        * maxExclusive - a value which the source question's value must be
          less than
        * maxInclusive - a value which the source question's value must equal
          or be less than
    * action - the action to take when the conditions are met.  For now the
      one supported value is "show", and when conditions are not met the
      question or section is hidden.
    * logic - either "ANY" or "ALL".  If "ANY" is used, then any condition in
      "conditions" being met will trigger the action, while for "ALL" all
      conditions must be met.
  * codingInstructions - (optional) a string of help text.  When this is
    present, a help button will appear next to the question, or if the "Show
    Help/Description" checkbox is used, the text will appear next to the
    question (so it should be brief).
  * <a name="calculationMethod"></a>calculationMethod - For fields whose value
    is calculation for other fields, the means of calculation is specified
    here.  At present we only support a formula for summing the <a
    href="#score">scores</a> for all the questions on the form.  We also are
    working on formulas like computing a body-mass index based on weight and
    height, but that is still under development.  To have a field be the sum
    of the scores, set calculation method to `{"name": "TOTALSCORE"}`.
* <a name="answerLists"></a> **answerLists** - This is a hash of list lookup
  keys (string identifiers which can be used with the <a
  href="#answers">answers</a> key) to answer lists.  The advantage of
  specifying a list here rather than directly with the list item is that if
  more than one question uses the same list (e.g. Yes/No) then you do not have
  to repeat the list each time it is used.  The values in this hash are the
  same arrays as describe above for <a href="#answers">"answers"</a>.

