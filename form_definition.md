# Form Definition Format

The forms rendered by the LForms widget are defined in a JSON format, an example
of which can be seen in [sample-data.js](app/data/sample-data.js).  The
basic structure (some of which is optional) is shown below, followed by comments
about the meaning of each key:

```
    {
      "code": string,
      "name": string,
      "template": string
      "templateOptions": {
        "obrHeader": boolean,
        "obrItems": [{
          "question": string,
          "dataType": string,
          "answers": [{
            "text": string,
            "code": string
          }]
        }],
      },
      "items": [{
        "questionCode": string
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
          "default": boolean
        }],
        "header": boolean,
        "skipLogic": {
          "conditions": [{
            "source": string
            "trigger": {
              "value": string/number/boolean, or
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
* **codeSystem** - (optional) the code system for the code of the form. The default value
  is "LOINC" when the form's **type** is "LOINC".
* **name** - (required) The name of the form (to be shown to the user).
* **type** - the form type, "LOINC" is the only one supported. More will be added.
* **copyrightNotice** - the copyright information of the form.
* **template** - (optional) a template name that is used for rendering the form. 
  Currently 'table' (default) and 'list' are supported.
* **templateOptions** - a hash of options for the template.  This can be
  omitted, but supported values are below.
    * showQuestionCode - a boolean that controls whether to show question codes. 
      The default is false.
    * showCodingInstruction - a boolean that controls whether to show coding 
      instructions inline or as popover messages (false: in popover; true: inline). 
      The default is false;
    * tabOnInputFieldsOnly - a boolean that controls whether to control TAB keys
      to stop on the input fields only (neither buttons, nor units fields). 
      The default is false.
    * hideHeader - a boolean that controls whether to hide the header section 
      on top of the form. The default is false.
    * hideCheckBoxes - a boolean that controls whether to hide checkboxes in 
      the header section on top of the form. The default is false.
    * hideUnits - a boolean that controls whether to all the Units column to
      be hidden from the data table. The default is false.
    * allowMultipleEmptyRepeatingItems - a boolean that controls whether to allow
      more than one unused repeating item/section The default is false.
    * allowHTMLInInstructions - a boolean that controls whether to allow HTML 
      content in the codingInstructions field. The default is false. If it is false,
      the **codingInstructionsFormat** field on item level is ignored, and no HTML
      formatted coding instructions will be displayed.
    * useAnimation - a boolean that controls whether to use animation on the form. 
      The default is true.
    * displayControl - an object that controls the display of the selected template.
      Currently it only supports a 'questionLayout' attribute, which has supported
      values as 'vertical' (default), 'horizontal' and 'matrix'. Here is an example:
      `{"questionLayout": "matrix"}` 
    * <a name="obrHeader"></a>obrHeader - a boolean that controls whether to
      show a row fields above the actual form like "Date Date", "Comment", etc.
      The default is true.      
    * obrItems - an array defining fields above the form (see
      [obrHeader](#obrHeader)).  If you omit templateOptions, a default will be
      provided which will have the fields "Date Done", "Time Done", "Where
      Done", and "Comment". If you wish to specify your own definitions, 
      a complete array should be provided where each
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
        * displayControl - This controls display styles of the column or the field.  
          It is a hash with the keys of "colCSS" for columns styles and "css" for field 
          styles. The values are an array of hashes of valid CSS styles. Here is an example: 
          `{"colCSS": [{"name":"width","value":"30%"},{"name":"min-width","value":"4em"}]}`
        * <a name="answerCardinality"></a>answerCardinality - For lists, this
          allows you to control whether list is multi-select or not.  It is a hash
          that takes two keys, "min" and "max".  If you "min" to "1", then the
          user will be required to provide an answer.  If you set "max" to "*",
          the list becomes multi-select.  (Other possibilities are not yet
          supported.)
    * obxTableColumns - For the "table" template only. An array defining table columns of 
      the table in the form. If you omit obxTableColumns, a default will be provided with 
      four columns for: "Name", buttons, "Value" and "Units".  
      If you wish to specify your own definitions, an array of these exact four columns 
      should be provided. You cannot add a new column or remove a existing one or change the order. 
      A null value could be in place where the column does not need a change over the default values.
      Each element in the array should be a hash with the following keys 
      (A null value could be in place where the key's value is the default value.):
        * name - the column header text
        * displayControl - This controls display styles of the column. It is a hash
          with the keys of "colCSS" for columns styles. The values are an array of 
          hashes of valid CSS styles for the "col" DOM element. Here is an example: 
          `{"colCSS": [{"name":"width","value":"30%"}]}`                  
* <a name="items"></a><b>items</b> - This is an array of form questions and
  sections.  Questions and sections (containing sub-questions) are mostly
  represented the same in this array, but a section will contain its own
  "items" array to specify what it contains.  Sections can be nested to create
  sub-sections, so that the definition forms tree-like structure with questions
  at the leaf nodes.  Each question/section in the array is represented by a hash
  with the following keys:

    * questionCode - (required) A code identifying the question or section.
      This code needs to be unique among its sibling questions. 
      It should not contain '/'.
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
    * answerCodeSystem - The code system for the answer list (specified either in
      "answers" or in "externallyDefined").
    * externallyDefined - List fields can be configured to obtain their lists
      from a URL as the user types.  This is usually used for larger lists for
      which it would not be practical to include the whole list with the form.
      The [lforms-service](https://lforms-service.nlm.nih.gov/) website provides
      a number of ready-to-use web APIs that can plugged in here to provide
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
        * INT - an integer
        * DT - a date (displayed with a calendar widget)
        * ST - a normal free-text string
        * TX - a string for a long free-text
        * YEAR - a string in the format of one to four digits that represents a year
        * MONTH - a string in the format of one or two digits that represents a month
        * DAY - a string in the format of one or two digits that represents a day
        * URL - a string in a valid URL format
        * EMAIL - a string in a valid email format
        * PHONE - a string in a valid phone number format
        * NR - a numeric range, in the format of two values separated by "^". 
               Having one number on either side of "^" is allowed.
    * units - For numeric answer fields, this is an optional list for the units
      for the quantity being entered.  Each hash in this array can contain the
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
            * source - The code of another question.  The source must be either
              a sibling of this question (in the tree), or or one of the
              questions in in the containing sections.
            * trigger - A hash defining a condition about the value for the
              question specified by "source".  The hash can either have a "value"
              key, or some combination of minExclusive, minInclusive, maxExclusive,
              or maxInclusive.  The meaning of the keys is as follows:
                * value - a value which the value for question "source" must
                * exactly match.  For questions with lists, the can either be
                  the text of the answer, its code, or its label.
                * minExclusive - a value which the source question's value must exceed
                * minInclusive - a value which the source question's value must equal
                  or exceed
                * maxExclusive - a value which the source question's value must be
                  less than
                * maxInclusive - a value which the source question's value must equal
                  or be less than
        * action - (optional) the action to take when the conditions are met.  For now the
          one supported value is "show" (which is also the default), and when
          conditions are not met the question or section is hidden.
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
      href="#score">scores</a> for all the questions on the form.  We also are
      working on formulas like computing a body-mass index based on weight and
      height, but that is still under development.  To have a field be the sum
      of the scores, set calculationMethod to `{"name": "TOTALSCORE"}`.
    * displayControl - an object that controls the display of the item or the section.
      Supported the fields are: 
        * answerLayout - the layout of the answers when a item has a dataType of 'CNE' or 'CWE'. 
          The supported values are 'combo' (default), and 'list'. When in 'combo' layout, 
          the [autocomplete-lhc](http://lhncbc.github.io/autocomplete-lhc/) widget 
          will be used to handle the list.
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


### Emitted (angular) Events:

* **LF_EVENT_REPEATING_ITEM_ADDED** - emitted when a repeatable item or section is added to the form by clicking
  the "add" button. An event attr object is associated with the event, with the following fields: 
    * event - the event name, 'LF_EVENT_REPEATING_ITEM_ADDED'
    * formId - the code of the form
    * itemId - the _elementId of the newly added item or section 
    * time - the time stamp when the event happens
* **LF_EVENT_REPEATING_ITEM_DELETED** - emitted when a repeatable item or section is deleted from the form by clicking
 the "delete" button. The event attr object has the same set of the fields:
    * event - the event name, 'LF_EVENT_REPEATING_ITEM_DELETED'
    * formId - the code of the form
    * itemId - the _elementId of the item or section that has just been deleted. 
    * time - the time stamp when the event happens


### Utility Functions:
 
* **LForms.Util.getFormData()** - a function to get the complete form definition data, including the user input data 
  from the form. The returned data could be fed into a LForms widget directly to render the form. 
  It has the following parameters:
    * element - required. The containing HTML element that includes the LForm's rendered form. It could be the DOM
                element or its id.     
* **LForms.Util.getUserData()** - a function to get user input data from the form, with or without 
  form definition data. It has the following parameters:
    * element - required, the containing HTML element that includes the LForm's rendered form. It could be the DOM
                element or its id.
    * noFormDefData - optional, to include form definition data, the default is false.
    * noEmptyValue - optional, to remove items that have an empty value, the default is false.
    * noHiddenItem - optional, to remove items that are hidden by skip logic, the default is false.
                
                
     
