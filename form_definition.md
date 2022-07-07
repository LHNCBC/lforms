# Form Definition Format

The forms rendered by the LForms widget are defined in a JSON format, examples
of which can be seen in the __app/data__ directory.  Note that
LForms also provides APIs for importing forms defined in the FHIR Questionnaire
format.  (See the [documentation](http://lhncbc.github.io/lforms/) for details.)  The
basic structure (some of which is optional) is shown below, followed by comments
about the meaning of each key:

```
    {
      "code": string,
      "name": string,
      "template": string
      "templateOptions": {
      },
      "items": [{
        "questionCode": string,
        "linkId": string,
        "questionCardinality": {
           "min": "1",
           "max": "1" or "*"
        },
        "question": string,
        "answerCardinality": {
          min: "0" or "1",
          max: "1" or "*"
        },
        "answers": string or [{
          "text": string,
          "code": string,
          "label": string,
          "other": string,
          "score": number
        }],
        "answerCodeSystem": "string",
        "externallyDefined": string,
        "dataType": string,
        "units": [{
          "name": string,
          "code": string,
          "system": string,
          "default": boolean
        }],
        "header": boolean,
        "skipLogic": {
          "conditions": [{
            "source": string
            "trigger": {
              "value": string/number/boolean/code-object, or
              "minExclusive": number,
              "minInclusive": number,
              "maxExclusive": number,
              "maxInclusive": number
            }
          }],
          "action": string
        },
        displayControl: {
          "colCSS": [{"name":"width","value":"30%"}, ...],
          "listColHeaders": ["Column 1 Title", "Column 2", ...]
        }
        "codingInstructions": string,
        "calculationMethod": {
          "name": string
        }
      }],
    }
```

### Keys:

* **code** - a code (identifier) for a panel, or in the context of answer
  lists, for an individual answer in the list.  For answer lists, codes are
  optional.
* **codeSystem** - (optional) the code system for the code of the form.
* **name** - (required) the name of the form (to be shown to the user).
* **copyrightNotice** - the copyright information of the form.
* **template** - (optional) a template name that is used for rendering the form.
  'table' (default) is the only template supported. More supported templates would be added.
* <a name="templateOptions"></a>**templateOptions** - a hash of options for the template.  This can be
  omitted, but supported values are below.
    * showQuestionCode - a boolean that controls whether to show question codes.
      The default is false.
    * showCodingInstruction - a boolean that controls whether to show coding
      instructions inline or as popover messages (false: in popover; true: inline).
      The default is false;
    * allowMultipleEmptyRepeatingItems - a boolean that controls whether to allow
      more than one unused repeating item/section The default is false.
    * allowHTMLInInstructions - a boolean that controls whether to allow HTML
      content in the codingInstructions field. The default is false. If it is false,
      the **codingInstructionsFormat** field on item level is ignored, and no HTML
      formatted coding instructions will be displayed.
    * <a name="defaultAnswer"></a>defaultAnswer - The default answer for a
      question. For an answer list, it can be an answer label, text, code or
      their combination, using the syntax such as:  {"code": "B12"}, {"label: "A"}, 
      {"text": "Male"}, {"text": "Male", "code": "LA2-8"} and etc.
      For a date field, it can be a date shortcut (like "t" for today).
      For other field types, it can be a text string or a number.
    * displayControl - an object that controls the display of the selected template.
      Currently it only supports a 'questionLayout' attribute, which has supported
      values as 'vertical' (default), 'horizontal' and 'matrix'. Here is an example:
      `{"questionLayout": "matrix"}`
    * <a name="viewMode"></a>viewMode - (optional) the view mode for the form. Permitted values are 'lg',
      'md', 'sm', and 'auto', which determine the 4 predefined layouts for large
       screen/container, medium screen/container, small screen/container and a
       responsive layout. The default value is 'auto'.
    * <a name="defaultAnswerLayout"></a>defaultAnswerLayout -
      an object that controls the answer layout for each item
      that has a dataType of CWE or CNE and has an answer list but does not specify
      answerLayout on the item itself. It has a single key of "answerLayout", which
      has two keys, "type" and "columns". If "type" is set to be "COMBO_BOX", the
      [autocomplete-lhc](http://lhncbc.github.io/autocomplete-lhc/) widget
      will be used to handle the list. If "type" is set to be "RADIO_CHECKBOX", then
      all the answers are displayed as either radio buttons or check boxes,
      and "columns" controls how many columns are used.
      If value of "columns" is "0", or there are no "columns". The answers will fill
      in available space one after another. If the value of "columns" is "1" 
      (or any value other than "0"), the answers are displayed in one column.
      "columns" is valid only when "type" is set to be "RADIO_CHECKBOX".
      Here is an example:
      `{"answerLayout": {"type": "RADIO_CHECKBOX", "columns": "1"}}`
    * hideTreeLine - a boolean that controls whether to hide tree line styles. The default is false.
    * hideIndentation - a boolean that controls whether to hide indentation. The default is false.
      Note that if this is set true, tree line style will not apply regardless of "hideTreeLine" setting.
    * hideRepetitionNumber - a boolean that controls whether to hide repetition numbers next to the
      item's text. The default is false.
* <a name="items"></a><b>items</b> - This is an array of form questions and
  sections.  Questions and sections (containing sub-questions) are mostly
  represented the same in this array, but a section will contain its own
  "items" array to specify what it contains.  Sections can be nested to create
  sub-sections, so that the definition forms tree-like structure with questions
  at the leaf nodes.  Each question/section in the array is represented by a hash
  with the following keys:

    * linkId - (required) An ID identifying the question or section.
      This code needs to be unique across the form.      
    * questionCode - (optional) A code for the question or section.
    * questionCodeSystem - (optional) the code system for the question code. The default value
      is "LOINC" when the form's **type** is "LOINC".
    * questionCardinality - This controls whether the there is a button for
      adding another of this question/section.  It is a hash with "min" and
      "max" keys, and by default both of those are "1" (i.e., not repeatable).
      If you wish for a question or section to be repeatable, pass in `{"min":
      "1", "max": "*"}`.
    * question - The label for the question, or the title of the section.
    * answerCardinality - The same as <a href="#answerCardinality">above</a>.
    * <a name="answers"></a>answers - For questions with answer lists, this is
      an array of hashes for items in the list.  Each hash can contain:
        * text - (required) the display string for this list item.  This should
          be unique within the list.
        * code - (optional) an identifier for the list item.  This can be
          omitted if you do not need coded answers.
        * system - (optional) a code system for the answer's code. If not
          present, the item's answerCodeSystem is used as the default code system.
        * label - (optional) Some lists have a label for each list item, such as
          'a', 'b', etc.  This is an array of such labels, corresponding to the
          items in the "text" array.  When this is present, the automatic number
          of list items will be turned off avoid confusion.
        * other - (optional) If this answer is an "Other" item, then this "other" key
          provides a label like "Please specify" for an additional field that
          will be available with the user chooses this answer.
        * <a name="score"></a>score - (optional) Some forms have scored answers
          which get summed into a total field.  See TOTALSCORE under <a
          href="#calculationMethod">calculationMethod</a> below for how to
          specify which field holds the total.
    * answerCodeSystem - The default code system for the answer list
      (specified either in "answers" or in "externallyDefined").
    * externallyDefined - List fields can be configured to obtain their lists
      from a URL as the user types.  This is usually used for larger lists for
      which it would not be practical to include the whole list with the form.
      The [Clinical Table Search
      Service](https://clin-table-search.lhc.nlm.nih.gov/) website provides a number
      of ready-to-use web APIs that can plugged in here to provide
      searchable lists of drugs, medical conditions, disease names, and more.
      If you wish to set up your own web API on a website, then you just need to
      understand what query parameters to handle on the webserver, and what the
      response format needs to be.  LForms uses the
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
        * QTY - a type which has both a REAL value and unit object (see "units" below for
          the structure).
        * INT - an integer
        * DT - a date (displayed with a calendar widget)
        * DTM - a string with date and time 
        * TM - a string in the time format
        * ST - a normal free-text string
        * YEAR - a string in the format of one to four digits that represents a year
        * MONTH - a string in the format of one or two digits that represents a month
        * DAY - a string in the format of one or two digits that represents a day
        * URL - a string in a valid URL format
        * EMAIL - a string in a valid email format
        * PHONE - a string in a valid phone number format
        * NR - a numeric range, in the format of two values separated by "^".
               Having one number on either side of "^" is allowed.
        * SECTION - a special type for sections, which contain sub items in the
                    <a href="#items">items</a> field
        * TITLE - a special type for separators that display some text.
        * attachment - a control to upload and download attachment files.
    * units - For numeric answer fields, this is an optional list for the units
      for the quantity being entered.  If the data type is INT or REAL, units
      should only have one unit; otherwise the data type will be converted to
      QTY.  Each hash in this array can contain the following keys:
        * name - The display string for the unit
        * code - Code associated with the unit
        * system - Code system associated with the unit
        * default - If true, this unit will be the default unit, which means it
          will show up in the field when the question is shown and the user does
          not have to pick it.  If false, this key can be omitted.
    * editable - (optional) If "0" the input field is readonly/disabled; any other value
      makes the input field editable.
    * header - If true, then this is not a question but a section, which can
      contain its own <a href="#items">items</a> array of questions and sections.
    * skipLogic - Controls the hiding/showing of this question or section based
      on data entered in other parts of the form. The value is a hash with the
      following keys:
        * conditions - An array of the conditions to be met. Each condition is a
          hash with the following keys:
            * source - The linkId of another question. The source item could be any question on the form.
            * trigger - A hash defining a condition about the value for the
              question specified by "source".  The hash can either have a "value"
              key, or some combination of minExclusive, minInclusive, maxExclusive,
              or maxInclusive.  The meaning of the keys is as follows:
                * value - A value that the answer for the “source” question must match to fire the trigger.
                    * For value types string, number, or boolean, the answer and trigger value 
                      must exactly match.
                    * For (source) questions with lists (CNE/CWE), the trigger value should 
                      be a "code object" with any or all of these three fields: code, system, and text,
                      for example: {"code": "LA2-8", "system": "http://loinc.org"}. 
                      The trigger value will be considered to match the answer if 1) code systems 
                      either match or are unspecified, and 2) either a) codes are specified and match 
                      or b) codes are unspecified and the texts are specified and match. 
                      Other trigger value fields, if any, are not used for matching.
                * notEqual - a value which the source question's value is not equal to. it's value could be
                  a string, number, or boolean, or a 'code object'. See "value" above.
                * exists - if it is true, the condition is met if the source question has a answer.
                  if it is false, the condition is met if the source question has no answers.    
                * minExclusive - a value which the source question's value must exceed
                * minInclusive - a value which the source question's value must equal
                  or exceed
                * maxExclusive - a value which the source question's value must be
                  less than
                * maxInclusive - a value which the source question's value must equal
                  or be less than
        * action - (optional) the action to take when the conditions are met.  For now the
          one supported value is "show" (which is also the default), and when
          conditions are not met the question or section is disabled (and hidden).
        * logic - (optional) either "ANY" or "ALL".  If "ANY" is used, then any condition in
          "conditions" being met will trigger the action, while for "ALL" all
          conditions must be met.  If not specified, the default is "ANY".
    * codingInstructions - (optional) a string of help text.  When this is
      present, a help button will appear next to the question, or if the "Show
      Help/Description" checkbox is used, the text will appear next to the
      question (so it should be brief).
    * codingInstructionsFormat - (optional) the text format of the codingInstructions,
      either 'html' or 'text'. If not specified, the default is 'text'.
      If **allowHTMLInInstructions** in **templateOptions** is set to be false,
      then codingInstructionsFormat is ignored and treated as if it is set to 'text'.
      No HTML formatted coding instructions will be displayed.
    * <a name="calculationMethod"></a>calculationMethod - For fields whose value
      is calculated from other fields, the means of calculation is specified
      here.  At present we only support a formula for summing the <a
      href="#score">scores</a> for all the questions on the form. To have a field be the sum
      of the scores, set calculationMethod to `{"name": "TOTALSCORE"}`.
    * defaultAnswer - The same as [defaultAnswer](#defaultAnswer) in the
      templateOptions section.
    * displayControl - an object that controls the display of the item or the section.
      Supported the fields are:
        * answerLayout - the layout of the answers when a item has a dataType of 'CNE' or 'CWE'.
          The supported values are 'COMBO_BOX' (default), and 'RADIO_CHECKBOX'. (see
          [defaultAnswerLayout](#defaultAnswerLayout))
        * css - an array of valid CSS settings that could apply to an item. (limited supports).
        * colCSS - an array of valid CSS settings that could apply to its related column in a
          horizontal table. It only works when its parent item/section has a
          {"questionLayout": "horizontal"} value in its "displayControl".
        * listColHeaders - For questions that are search lists (specified with a
          URL in "externallyDefined" and dataType "CNE" or "CWE") this specifies
          the column headers (as an array) that will appear over the rows of choices.
          This is useful when each list item displays multiple fields.  If
          nothing is specified for this attribute, column headers will not be
          shown. Headers can contain "&nbsp;" for non-breaking spaces between
          words, but cannot contain HTML tags.
        * questionLayout - the layout of the questions in the section. It works on items
          that are sections, i.e. they contain sub items. Supported values are:
          'vertical' (default), 'horizontal' and 'matrix'.
        * viewMode - (optional) the view mode for the item. Permitted values are 'lg',
          'md', 'sm', and 'auto', which determine the 4 predefined layouts for large
          screen/container, medium screen/container, small screen/container and a
          responsive layout. It has the priority over the value in the form level [viewMode](#viewMode).
          If its value is not set, then the form level viewMode value is used for the item.
    * dataControl - an array of objects that control the current question's attributes when the controlling
      source question's value changes. Supported fields are:
        * source - an object identifying the controlling source question. It has the following fields:
            * sourceType - optional, the source type. Currently only "INTERNAL" is supported. The
              default value is "INTERNAL".
            * sourceLinkId - the linkId of the source question in the form. The source question
              must be a question on the form.
        * onAttribute - optional, the attribute on this question, whose value will be updated by the newly
          constructed value. The default value is "value".
        * dataFormat - the format of the newly constructed value. It is a hash, such as
          `{"code": "value.RXCUIS", "text": "value.STRENGTHS_AND_FORMS"}`, when the **construction**
           is set to be "ARRAY" or "OBJECT". It is a string, such as `"value.STRENGTHS_AND_FORMS[0]"`,
           when the **construction** is "SIMPLE". See **construction** for details on how these formats are used.
        * construction - the method to construct a new value based on the source question's value.
          It supports three types:
            * SIMPLE - the new value is a direct copy of what is on the controlling source question.
              The **dataFormat**'s value must be string.
              For example, if it's value is `"value.STRENGTHS_AND_FORMS[0]"`,
              the new value could be `"325-2.25-0.19 mg Tab"`.
            * OBJECT - the new value is a hash object. The **dataFormat**'s value must be a hash object.
              For each key/value pair in the **dataFormat** hash object, the key is a key in the new hash object,
              and the value is from the controlling source question's value or its attributes.
              For example, if the **dataFormat** is `{"code": "value.code", "text": "value.GeneSymbol"}`,
              the new object could be created as `{"code": "NM_004315.5", "text": "ASAH1"}`, where "NM_004315.5"
              and "ASAH1" are values retrieved from the controlling source question for "value.code" and
              "value.GeneSymbol", respectively.
            * ARRAY - the new value is an array. The **dataFormat**'s value must be a hash object.
              Each element object in the array is constructed according to that hash object.
              It is similar to the processing for "OBJECT", except that for each key/value pair in the
              **dataFormat** hash object, the value contains an array.
              If there are more than one pairs, the arrays retrieved should have the same length.
              Elements in the new array are constructed with the corresponding elements in these retrieved arrays.
              For example, if the **dataFormat** is `{"code": "value.RXCUIS", "text": "value.STRENGTHS_AND_FORMS"}`,
              the "value.RXCUIS" and the "value.STRENGTHS_AND_FORMS" of the controlling source question should
              both contains an array and these two arrays should have the same length.
              A sample constructed array could be
              `[{"code": "724614", "text": "325-2.25-0.19 mg Tab"},{"code": "637540", "text": "325-4.5-0.38 mg Tab"},{"code": "848768", "text": "325-4.84 mg Tab"}]`
              where "value.RXCUIS" is `["724614", "637540", "848768"]` and "value.STRENGTHS_AND_FORMS" is
              `["325-2.25-0.19 mg Tab", "325-4.5-0.38 mg Tab", "325-4.84 mg Tab"]`.

### Web Component Properties:
* **questionnaire** - A JSON object of a FHIR Questionnaire (including FHIR SDC Questionnaire),
 or the above LHC-Forms internal format.
* **options** - Optional, a JSON object. The options defined in [templateOptions](#templateOptions).
* **prepop** - Optional, a boolean value. A flag indicating whether to run the pre-populate operation
 for the FHIR Questionnaire. The default value is false.
* **fhirVersion** - Optional, a string value. The specified FHIR version of the data provided in 
 'questionnaire'. If this is not provided, a FHIR version will be determined from 
 the 'questionnaire'. The supported FHIR versions are 'R4' and 'STU3'.

### Emitted Events:

* **onFormReady** - emitted when the form is fully initialied, and FHIRPath expressions
 are run if any, data are pre-populated if any, and the form is ready for user interactions. 
 No data is returned in this event.
* **onError** - emitted when the ValueSets are not retrieved during the form initialization. 
The form is still initialized and might be rendered, with possible missing data. 
The first error is returned in this event.

### How to use properties and events:
* In HTML: 
```
      <wc-lhc-form id='test-form'></wc-lhc-form>
```
* JavaScript Code: 
```
      lhcFormWidget = document.getElementById('test-form'); 
      lhcFormWidget.questionnaire = aQuesionnaire;
      ...
      lhcFormWidget.addEventListener('onFormReady', e => {
        // do something
        ...
      });
```


### Utility Functions:
For a description of functions provided for retrieving user-entered data in
various formats, including FHIR, and for importing and exporting FHIR resources,
see the [documentation](https://lhncbc.github.io/lforms/) website.

