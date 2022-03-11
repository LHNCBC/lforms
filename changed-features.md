## New features in version 30.0.0
* **Web Component** The new LHC-Forms is a Web Component widget created with angular. 
  It is no longer developed with angularjs.
  #### **Web Component Properties:**
  * **questionnaire** - A JSON object of a FHIR Questionnaire (including FHIR SDC Questionnaire),
 or the above LHC-Forms internal format.
  * **options** - Optional, a JSON object. The options defined in [templateOptions](#templateOptions).
  * **prepop** - Optional, a boolean value. A flag indicating whether to run the pre-populate operation
 for the FHIR Questionnaire. The default value is false.
  * **fhirVersion** - Optional, a string value. The specified FHIR version of the data provided in 
 'questionnaire'. If this is not provided, a FHIR version will be determined from 
 the 'questionnaire'. The supported FHIR versions are 'R4' and 'STU3'.

  #### **Emitted Events:**

  * **onFormReady** - emitted when the form is fully initialied, and FHIRPath expressions
 are run if any, data are pre-populated if any, and the form is ready for user interactions. 
 No data is returned in this event.

  #### **How to use properties and events:**
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

## Features not supported in version 30.0.0
* **AngularJS Directive** The new LHC-Forms does not includes an AngujarJS directive.

* **templateOptions** - The following options within templateOptions are not supported:
  * showColumnHeaders - a boolean that controls whether to show the header row
      with the "Name", "Value", and "Unit" column labels.  The default is true.
  * showQuestionCode - a boolean that controls whether to show question codes.
      The default is false.
  * tabOnInputFieldsOnly - a boolean that controls whether to control TAB keys
      to stop on the input fields only (neither buttons, nor units fields).
      The default is false.
  * hideFormControls - a boolean that controls whether to hide the controls section
      on top of the form. The default is true.
  * hideUnits - a boolean that controls whether to all the Units column to
      be hidden from the data table. The default is false.
  * showFormOptionPanel - a boolean that controls whether to show the option panel
      that displays all the form options.
  * showFormOptionPanelButton - a boolean that controls whether to show the button
      next to the form title that hides/shows the form options panel.
  * useAnimation - a boolean that controls whether to use animation on the form.
      The default is true.
  * <a name="showFormHeader"></a>showFormHeader - a boolean that controls whether to
      show a row fields above the actual form like "Date Date", "Comment", etc.
      The default is false.
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

* **Emitted (AngularJS) Events**

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
