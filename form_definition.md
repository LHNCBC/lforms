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
        "showFormHeader": boolean,
        "formHeaderItems": [{
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
* **name** - (required) the name of the form (to be shown to the user).
* **type** - (optional) the form type, "LOINC" (default) is the only type supported. More will be added.
* **copyrightNotice** - the copyright information of the form.
* **template** - (optional) a template name that is used for rendering the form. 
  'table' (default) is the only template supported. More supported templates would be added.
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
    * hideFormControls - a boolean that controls whether to hide the controls section 
      on top of the form. The default is false.
    * hideUnits - a boolean that controls whether to all the Units column to
      be hidden from the data table. The default is false.
    * showFormOptionPanel - a boolean that controls whether to show the option panel
      that displays all the form options.
    * showFormOptionPanelButton - a boolean that controls whether to show the button
      next to the form title that hides/shows the form options panel.
    * allowMultipleEmptyRepeatingItems - a boolean that controls whether to allow
      more than one unused repeating item/section The default is false.
    * allowHTMLInInstructions - a boolean that controls whether to allow HTML 
      content in the codingInstructions field. The default is false. If it is false,
      the **codingInstructionsFormat** field on item level is ignored, and no HTML
      formatted coding instructions will be displayed.
    * useAnimation - a boolean that controls whether to use animation on the form. 
      The default is true.
    * <a name="defaultAnswer"></a>defaultAnswer - The default answer for a
      question.  For an answer list, it can be an answer label or code, using
      the syntax:  {"code": "B12"}, or {"label: "A"}.  For a
      date field, it can be a date shortcut (like "t" for today).  For other
      field types, it can be a text string or a number.
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
      If value of "columns" is "0", there is no columns specified. The answers will fill
      in available space one after another. If the value of "columns is "1" to "6", 
      the specified number of columns are used to group the answers.
      "columns" is valid only when "type" is set to be "RADIO_CHECKBOX".
      Here is an example:
      `{"answerLayout": {"type": "RADIO_CHECKBOX", "columns": "2"}}`      
    * <a name="showFormHeader"></a>showFormHeader - a boolean that controls whether to
      show a row fields above the actual form like "Date Date", "Comment", etc.
      The default is true.      
    * formHeaderItems - an array defining fields above the form (see
      [showFormHeader](#showFormHeader)).  If you omit templateOptions, a default will be
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
        * INT - an integer
        * DT - a date (displayed with a calendar widget)
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
               
    * units - For numeric answer fields, this is an optional list for the units
      for the quantity being entered.  Each hash in this array can contain the
      following keys:
        * name - The display string for the unit
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
            * source - The code of another question. The source must be either
              a sibling of this question (in the tree), or or one of the
              questions in the containing sections.
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
            * sourceItemCode - the questionCode of the source question in the form. The source question 
              must be either a sibling of this question (in the tree), or or one of the questions 
              in the containing sections.
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
    * element - optional if there is only one LForms widget on the page, The containing HTML element that includes 
                the LForms rendered form. It could be the DOM element or its id.     
* **LForms.Util.getUserData()** - a function to get user input data from the form, with or without 
  form definition data. It has the following parameters:
    * element - optional if there is only one LForms widget on the page, The containing HTML element that includes 
                the LForms rendered form. It could be the DOM element or its id.     
    * noFormDefData - optional, to include form definition data, the default is false.
    * noEmptyValue - optional, to remove items that have an empty value, the default is false.
    * noHiddenItem - optional, to remove items that are hidden by skip logic, the default is false.
* **LForms.Util.getFormHL7Data()** - a function to get HL7 v2 OBR and OBX segment data from the form, not including
  empty or hidden questions.
    * element - optional if there is only one LForms widget on the page, The containing HTML element that includes 
                the LForms rendered form. It could be the DOM element or its id.     
* **LForms.Util.getFormFHIRData()** - a function to get FHIR resource data from the form.
    * resourceType - a FHIR resource type. Currently only "DiagnosticReport", "Questionnaire" (SDC profile)
                     and "QuestionnaireResponse" (SDC profile) are supported.
    * element - optional if there is only one LForms widget on the page, The containing HTML element that includes 
                the LForms rendered form. It could be the DOM element or its id.      
    * inBundle - optional, a flag that a DiagnosticReport resources and associated Observation resources
                 are included in a FHIR Bundle. The default is false.
    * bundleType - optional, the FHIR Bundle type if inBundle is true.                 
    * noExtensions - a flag that a standard FHIR Questionnaire is to be created without any extensions, 
                    when resourceType is Questionnaire. The default is false.

* **LForms.Util.convertLFormsToFHIRData()** - a function to convert a LForms form data object into a FHIR resource.
    * resourceType - a FHIR resource type. Currently only "DiagnosticReport", "Questionnaire" (SDC profile)
                     and "QuestionnaireResponse" (SDC profile) are supported.
    * formData - a LForms form data object.
    * noExtensions - a flag that a standard FHIR Questionnaire or QuestionnaireResponse is to be created 
                    without any extensions, when resourceType is Questionnaire or QuestionnaireResponse. 
                    The default is false.

* **LForms.Util.convertFHIRQuestionnaireToLForms()** - a function to convert FHIR SQC Questionnaire resource to 
  a LForms definition data object.
    * fhirData - a FHIR Questionnaire resource, which should be generated through the above functions, 
                 "getFormFHIRData('Questionnaire', ...)" or "convertFHIRQuestionnaireToLForms('Questionnaire',...')".
* **LForms.Util.mergeFHIRDataIntoLForms()** a function to merge a FHIR resource into an LForms form data object.
    * resourceType - a FHIR resource type. Currently only "DiagnosticReport" (a DiagnosticReport resource with 
                     "contained" Observation resources or a "searchset" typed Bundle of a DiagnosticReport and 
                     associated Observation resources), and "QuestionnaireResponse" (SDC profile) are supported.
    * fhirData - a FHIR resource, which should be generated through the above function, "getFormFHIRData()".
    * formData - a LForms form data object.
     
