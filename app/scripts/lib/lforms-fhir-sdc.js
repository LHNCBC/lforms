/**
 * A package to handle FHIR SDC (STU2 Ballot, Version 1.6.0) Questionnaire and QuestionnaireResponse for LForms
 * STU2 Ballot:
 * http://hl7.org/fhir/us/sdc/2016Sep/sdc-questionnaire.html
 * http://hl7.org/fhir/us/sdc/2016Sep/sdc-response.html
 *
 * It provides the following functions:
 * convert2Questionnaire()
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR SDC Questionnaire data
 * convert2QuestionnaireResponse()
 * -- Generate FHIR SDC QuestionnaireResponse data from captured data in LForms
 * mergeQuestionnaireResponseToForm()
 * -- Merge FHIR SDC QuestionnaireResponse data into corresponding LForms data
 */
if (typeof LForms === 'undefined')
  LForms = {};

LForms.FHIR_SDC = {

  /**
   * Convert LForms form definition to FHIR SDC Questionnaire
   * @param lfData a LForms form definition object
   * @returns {{}}
   */
  convert2Questionnaire: function(lfData) {
    var target = {};
    var source = lfData;

    if (lfData) {

      this._setFormLevelFields(target, source);

      if (source.items && Array.isArray(source.items)) {
        target.item = [];
        for (var i=0, iLen=source.items.length; i<iLen; i++) {
          var newItem = this._processItem(source.items[i], source);
          target.item.push(newItem);
        }

      }
    }
    return target;
  },


  /**
   * Set form level attributes
   * @param target a Questionnaire object
   * @param source a LForms form definition object
   * @private
   */
  _setFormLevelFields: function(target, source) {

    // resourceType
    target.resourceType = "Questionnaire";

    // status
    target.status = "draft";

    // date
    target.date = LForms.Util.dateToString(new Date());

    // version, assuming questionnaires are from LOINC forms
    target.version = "2.56";

    // url
    target.url = "http://hl7.org/fhir/us/sdc/Questionnaire/" + source.code;

    // meta
    target.meta = {
      "profile": [
        "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire"
      ]
    };

    // title
    target.title = source.name;

    // name
    target.name = source.name;

    var codeSystem = this._getCodeSystem(source.codeSystem);

    // "identifier": [
    target.identifier = [{
      "system": codeSystem,
      "value": source.code
    }];

    // code
    target.code = [{
      "system": codeSystem,
      "code": source.code,
      "display": source.name
    }];

    // subjectType
    target.subjectType = ["Patient", "Person"];

    // text, not to use. it requires html/xhtml content?
    // concept, removed in FHIR v3.0.0

  },


  /**
   * Process an item of the form
   * @param item an item in LForms form definition object
   * @param source a LForms form definition object
   * @returns {{}}
   * @private
   */
  _processItem: function(item, source) {
    var targetItem = {};

    // id (empty for new record)

    // extension
    targetItem.extension = [];

    // required
    targetItem.required = item._answerRequired;

    // http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs
    if (targetItem.required) {
      targetItem.extension.push({
        "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs",
        "valueInteger" : parseInt(item.questionCardinality.min)
      });
    }

    // repeats
    // http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs
    if (item.questionCardinality) {
      if (item.questionCardinality.max === "*") {
        targetItem.repeats = true;
      }
      else if (parseInt(item.questionCardinality.max) > 1) {
        targetItem.repeats = true;
        targetItem.extension.push({
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs",
          "valueInteger": parseInt(item.questionCardinality.max)
        });
      }
    }
    else {
      targetItem.repeats = false;
    }

    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    this._handleItemControl(targetItem, item);

    // questionnaire-choiceOrientation , not supported yet

    // check restrictions
    this._handleRestrictions(targetItem, item);

    // http://hl7.org/fhir/StructureDefinition/entryFormat
    // looks like tooltip, TBD

    // http://hl7.org/fhir/StructureDefinition/questionnaire-unit
    // this is for a single unit, where is the units list??
    // for user selected unit, not item.units! Not using here
    if (item.unit) {
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
        "valueCoding" : {
          "system": "http://unitsofmeasure.org",
          "code": item.unit.name
        }
      });
    }

    // add LForms Extension to units list
    if (item.units) {
      this._handleLFormsUnits(targetItem, item);
    }

    // http://hl7.org/fhir/StructureDefinition/questionnaire-displayCategory, for instructions
    if (item.codingInstructions) {
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-displayCategory",
        "valueCodeableConcept": {
          "text": item.codingInstructions,
          "coding": [{
            "code": item.codingInstructionsFormat,
            "display": item.codingInstructions
          }]
        }
      });
    }

    // linkId
    targetItem.linkId = item._codePath + item._idPath;

    var codeSystem = this._getCodeSystem(item.questionCodeSystem);

    // code
    targetItem.code = [{
      "system": codeSystem,
      "code": item.questionCode,
      "display": item.question
    }];

    // concept, removed in FHIR v3.0.0

    // text
    targetItem.text = item.question;

    // type
    targetItem.type = this._handleDataType(item);

    // enableWhen
    if (item.skipLogic) {
      this._handleSkipLogic(targetItem, item, source)
    }

    // repeats, handled above
    // readonly, (editable)
    if (item.dataType !== "SECTION" && item.dataType !== "TITLE" && item.editable === "0") {
      targetItem.readonly = true;
    }

    // options , a reference to ValueSet resource, not using for now
    // option, for answer list
    if (item.answers) {
      targetItem.option = this._handleAnswers(item)
    }

    // initialValue, for default values
    if (item.value) {
      this._handleInitialValues(targetItem, item);
    }

    if (item.items && Array.isArray(item.items)) {
      targetItem.item = [];
      for (var i=0, iLen=item.items.length; i<iLen; i++) {
        var newItem = this._processItem(item.items[i], source);
        targetItem.item.push(newItem);
      }
    }

    // if there is no extension, remove it
    if (targetItem.extension.length === 0)
      delete targetItem.extension;

    return targetItem
  },


  /**
   * Process various restriction settings
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleRestrictions: function(targetItem, item) {
    // http://hl7.org/fhir/StructureDefinition/minLength
    // http://hl7.org/fhir/StructureDefinition/regex
    // http://hl7.org/fhir/StructureDefinition/minValue
    // http://hl7.org/fhir/StructureDefinition/maxValue
    // http://hl7.org/fhir/StructureDefinition/maxDecimalPlaces, not supported yet
    // http://hl7.org/fhir/StructureDefinition/maxSize, for attachment, not supported yet
    // maxLength
    if (item.restrictions) {
      for (var key in item.restrictions) {
        var value = item.restrictions[key];
        var extValue;

        switch (key) {
          // http://hl7.org/fhir/StructureDefinition/minValue
          // { // Must be >= this value
          //   // from Element: extension
          //   "url" : "http://hl7.org/fhir/StructureDefinition/minValue", // R!
          //   // value[x]: Value of extension. One of these 6:
          //   "valueDate" : "<date>" // R! Value of extension
          //   "valueDateTime" : "<dateTime>", // R! Value of extension
          //   "valueTime" : "<time>", // R! Value of extension
          //   "valueInstant" : "<instant>", // R! Value of extension
          //   "valueDecimal" : <decimal>, // R! Value of extension
          //   "valueInteger" : <integer>, // R! Value of extension
          // }
          case "minExclusive":
          case "minInclusive":
            if (item.dataType === "DT" || item.dataType === "DTM" || item.dataType === "TM" ||
                item.dataType === "REAL" || item.dataType === "INT" ) {
              var valueKey = this._getValueKeyByDataType("value", item.dataType)
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/minValue"
              };
              extValue[valueKey] = parseInt(value);
            }
            break;
          // http://hl7.org/fhir/StructureDefinition/maxValue
          case "maxExclusive":
          case "maxInclusive":
            if (item.dataType === "DT" || item.dataType === "DTM" || item.dataType === "TM" ||
                item.dataType === "REAL" || item.dataType === "INT" ) {
              var valueKey = this._getValueKeyByDataType("value", item.dataType)
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/maxValue"
              };
              extValue[valueKey] = parseInt(value);
            }
            break;
          // http://hl7.org/fhir/StructureDefinition/minLength
          case "minLength":
            if (item.dataType === "ST" || item.dataType === "TX" || item.dataType === "URL" ||
                item.dataType === "QTY") {
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/minLength",
                "valueInteger": parseInt(value)
              };
            }
            break;
          // maxLength, not an extension, directly on item
          case "maxLength":
            if (item.dataType === "ST" || item.dataType === "TX" || item.dataType === "URL" ||
                item.dataType === "QTY") {
              targetItem.maxLength = parseInt(value);
            }
            break;
          // http://hl7.org/fhir/StructureDefinition/regex
          case "pattern":
            if (item.dataType === "ST" || item.dataType === "TX" ) {
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/regex",
                "valueInteger": value
              };
            }
            break
        }
        if (extValue) {
          targetItem.extension.push(extValue);
        }
      }
    }
  },


  /**
   * Process itemControl based on LForms item's answerLayout and questionLayout
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleItemControl: function(targetItem, item) {
    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    var itemControlType = "";
    // Fly-over, Table, Checkbox, Combo-box, Lookup
    if (!jQuery.isEmptyObject(item.displayControl)) {
      // for answers
      if (item.displayControl.answerLayout &&
          (item.dataType === "CNE" || item.dataType === "CWE")) {
        // search field
        if (item.externallyDefined) {
          itemControlType = "Lookup";
        }
        // prefetch list
        // combo-box
        else if (item.displayControl.answerLayout.type === "COMBO_BOX") {
          itemControlType = "Combo-box";
        }
        // radio or checkbox
        else if (item.displayControl.answerLayout.type === "RADIO_CHECKBOX") {
          if (item.answerCardinality &&
              (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            itemControlType = "Checkbox";
          }
          else {
            itemControlType = "Radio";
          }
        }
      }
      // for section item
      else if (item.displayControl.questionLayout && item.dataType === "SECTION") {
        if (item.displayControl.questionLayout === "horizontal") {
          itemControlType = "Table";
        }
        else if (item.displayControl.questionLayout === "matrix") {
          itemControlType = "Matrix";
        }
        // else {
        //   itemControlType = "List";
        // }
      }

      if (itemControlType) {
        targetItem.extension.push(
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
              "valueCodeableConcept": {
                "coding": [{
                  //"system" : "<uri>", // Identity of the terminology system
                  //"version" : "<string>", // Version of the system - if relevant
                  //"code" : "<code>", // Symbol in syntax defined by the system
                  //"display" : "<string>", // Representation defined by the system
                  //"userSelected" : <boolean> // If this coding was chosen directly by the user
                  "system": "http://hl7.org/fhir/questionnaire-item-control",
                  "code": itemControlType,
                  "display": itemControlType
                }],
                "text": itemControlType
              }
            });
      }
    }
  },


  /**
   * Convert LForms captured data to FHIR SDC QuestionnaireResponse
   * @param lfData a LForms form definition object
   * @returns {{}}
   */
  convert2QuestionnaireResponse: function(lfData) {
    var target = {};
    if (lfData) {

      var source = lfData.getFormData(true,true,true,true);

      this._groupedValues = {};
      this._groupValuesByLinkId(source);

      this._setResponseFormLevelFields(target, source);

      if (source.items && Array.isArray(source.items)) {
        target.item = [];
        for (var i=0, iLen=source.items.length; i<iLen; i++) {
          var newItem = this._processResponseItem(source.items[i]);
          target.item.push(newItem);
        }
      }
    }
    return target;
  },


  /**
   * Get a code system based on the code system value used in LForms
   * @param codeSystemInLForms code system value used in LForms
   * @private
   */
  _getCodeSystem: function(codeSystemInLForms) {

    var codeSystem;
    switch (codeSystemInLForms) {
      case "LOINC":
        codeSystem = "http://loinc.org";
        break;
      case "CDE": // TBD
      default:
        codeSystem = "http://unknown"; // temp solution. as code system is required for coding
    }

    return codeSystem;
  },


  /**
   * Set form level attribute
   * @param target a QuestionnaireResponse object
   * @param source a LForms form definition object

   * @private
   */
  _setResponseFormLevelFields: function(target, source) {

    // resourceType
    target.resourceType = "QuestionnaireResponse";

    // "identifier":
    target.identifier = {
      "system": this._getCodeSystem(source.codeSystem),
      "value": source.code
    };

    // status, required
    // "in-progress", "completed", "amended"
    target.status = "completed";

    // authored, required
    target.authored = LForms.Util.dateToString(new Date());

    // questionnaire , required
    target.questionnaire = {
      // questionnaireId should be an id of a related existing questionnaire resource stored in the server
      "reference": "Questionnaire/{{questionnaireId}}"
    };

    // meta
    target.meta = {
      "profile": [
        "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-response"
      ]
    };

    // text, not to use. it requires html/xhtml content?

  },


  /**
   * Process an item of the form
   * @param item an item in LForms form object
   * @returns {{}}
   * @private
   */
  _processResponseItem: function(item) {
    var targetItem = {};

    // id (empty for new record)

    var linkId = item._codePath + item._idPath;

    // if the item has not been processed
    // for repeating questions, only the first one will be processed
    if (this._groupedValues[linkId]) {
      // if it is a section
      if (item.dataType === "SECTION") {
        // linkId
        targetItem.linkId = linkId;
        // text
        targetItem.text = item.question;

        if (item.items && Array.isArray(item.items)) {
          // header
          targetItem.item = [];
          for (var i=0, iLen=item.items.length; i<iLen; i++) {
            var newItem = this._processResponseItem(item.items[i]);
            targetItem.item.push(newItem);
          }
        }
      }
      // if it is a question
      else if (item.dataType !== "TITLE")
      {
        // linkId
        targetItem.linkId = linkId;
        // text
        targetItem.text = item.question;

        this._handleAnswerValues(targetItem, item);
      }

      // remove the processed values
      delete this._groupedValues[linkId];

    }
    return targetItem
  },


  /**
   * Create a key from data type to be used in a hash
   * @param prefix a prefix to be added to the key
   * @param dataType a LForms data type
   * @returns {*}
   * @private
   */
  _getValueKeyByDataType: function(prefix, dataType) {
    // prefix could be 'value', 'initial', 'answer'
    if (!prefix) {
      prefix = "value"
    }
    switch (dataType) {
      case "INT":
        valueKey = "Integer";
        break;
      case "REAL":
        valueKey = "Decimal";
        break;
      case "DT":
        //valueKey = "Date";
        valueKey = "DateTime";
        break;
      case "DTM":
        valueKey = "DateTime";
        break;
      case "TM":
        valueKey = "Time";
        break;
      case "ST":
        valueKey = 'String';
        break;
      case "BL":
        valueKey = 'Boolean';
        break;
      case "URL":
        valueKey = 'Url';
        break;
      case "CNE":
      case "CWE":
        valueKey = 'Coding';
        break;
      case "QTY":
        valueKey = 'Quantity';
        break;
    }
    return prefix + valueKey;
  },


  /**
   * Process an item's answer list
   * @param item an item in the LForms form object
   * @returns {Array}
   * @private
   */
  _handleAnswers: function(item) {
    var optionArray = [];
    for (var i=0, iLen=item.answers.length; i<iLen; i++) {
      var answer = item.answers[i];
      var option = {};

      // needs an extension for label
      if (answer.label) {
        option.extension = [{
          "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
          "valueString" : answer.label
        }];
      }
      // needs a modifierExtension for score and others (default, other?)
      if (answer.score) {
        option.modifierExtension = [{
          "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-optionScore",  // LForms Extension
          "valueInteger" : parseInt(answer.score)
        }];
      }
      // option's value supports integer, date, time, string and Coding
      // for LForms, all answers are Coding
      option.valueCoding = {
          "system": "http://loinc.org",
          "code": answer.code,
          "display": answer.text
      };
      optionArray.push(option);
    }
    return optionArray;
  },


  /**
   * Convert LForms data type to FHIR SDC data type
   * @param item an item in the LForms form object
   * @returns {string}
   * @private
   */
  _handleDataType: function(item) {
    var dataType = "";
    switch (item.dataType) {
      case "SECTION":
        dataType = 'group';
        break;
      case "TITLE":
        dataType = 'display';
        break;
      case "ST":
        dataType = 'string';
        break;
      case "BL":
        dataType = 'boolean';
        break;
      case "REAL":
        dataType = 'decimal';
        break;
      case "INT":
        dataType = 'integer';
        break;
      case "DT":
        //dataType = 'date';
        dataType = 'dateTime';
        break;
      case "DTM": // not supported yet
        dataType = 'dateTime';
        break;
      case "TM":
        dataType = 'time';
        break;
      case "ST":
        dataType = 'string';
        break;
      case "TX":
        dataType = 'text';
        break;
      case "URL":
        dataType = 'url';
        break;
      case "CNE":
        dataType = 'choice';
        break;
      case "CWE":
        dataType = 'open-choice';
        break;
      case "QTY":
        dataType = 'quantity';
        break;
      default:
        dataType = 'string';
        break;
    }
    return dataType;
  },


  /**
   * Group values of the questions that have the same linkId
   * @param item an item in the LForms form object
   * @private
   */
  _groupValuesByLinkId: function(item) {
    var linkId = item._codePath + item._idPath;
    //var linkId = item._codePath;

    if (!this._groupedValues[linkId]) {
      this._groupedValues[linkId] = [item.value];
    }
    else {
      this._groupedValues[linkId].push(item.value);
    }
    if (item.items) {
      for (var i=0, iLen=item.items.length; i<iLen; i++) {
        this._groupValuesByLinkId(item.items[i])
      }
    }
  },


  /**
   * Process capture user data
   * @param targetItem an item in FHIR SDC QuestionnaireResponse object
   * @param item an item in LForms form object
   * @private
   */
  _handleAnswerValues: function(targetItem, item) {
    // dataType:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)

    var answer = [];
    var linkId = item._codePath + item._idPath;
    // value not processed by previous repeating items
    if (this._groupedValues[linkId] && item.dataType !== "SECTION" && item.dataType !=="TITLE") {

      var valueKey = this._getValueKeyByDataType("value", item.dataType);

      var values = this._groupedValues[linkId];

      for (var i=0, iLen= values.length; i<iLen; i++) {

        // for Coding
        // multiple selections, item.value is an array
        // Note: NO support of multiple selections in FHIR SDC
        if (item.dataType === 'CWE' || item.dataType === 'CNE' ) {
          var codeSystem = this._getCodeSystem(item.questionCodeSystem);
          if ((item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1) &&
              Array.isArray(values[i])) {
            for (var j=0, jLen=values[i].length; j<jLen; j++) {
              if (!jQuery.isEmptyObject(values[i][j])) {
                answer.push({
                  "valueCoding" : {
                    "system": codeSystem,
                    "code": values[i][j].code,
                    "display": values[i][j].text
                  }
                })
              }
              // empty answer
              else {
                answer.push({
                  "valueCoding" : {}
                })
              }
            }
          }
          // single selection, item.value is an object
          else {
            if (!jQuery.isEmptyObject(values[i])) {
              answer.push({
                "valueCoding" : {
                  "system": codeSystem,
                  "code": values[i].code,
                  "display": values[i].text
                }
              })
            }
            // empty answer
            else {
              answer.push({
                "valueCoding" : {}
              })
            }
          }
        }
        // for Quantity,
        // [{
        //   // from Element: extension
        //   "value" : <decimal>, // Numerical value (with implicit precision)
        //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
        //   "unit" : "<string>", // Unit representation
        //   "system" : "<uri>", // Code System that defines coded unit form
        //   "code" : "<code>" // Coded form of the unit
        // }]
        else if (item.dataType === "QTY") {
          // NOTE: QTY data type in LForms does not have unit. Cannot support it.
        }
        // make a Quantity type if numeric values has a unit value
        else if (item.unit && (item.dataType === "INT" || item.dataType === "REAL")) {
          answer.push({
            "valueQuantity": {
              "value": parseFloat(values[i]),
              "unit": item.unit.name,
              "system": "http://unitsofmeasure.org",
              "code": item.unit.name
            }
          });
        }
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
        else if (item.dataType === "BL" || item.dataType === "REAL" || item.dataType === "INT" ||
            item.dataType === "DT" || item.dataType === "DTM" || item.dataType === "TM" ||
            item.dataType === "ST" || item.dataType === "TX" || item.dataType === "URL") {
          var answerValue = {};
          answerValue[valueKey] = typeof values[i] === 'undefined' ? null : values[i];
          answer.push(answerValue);
        }
        // no support for reference yet
      }
      targetItem.answer = answer;
    }
  },


  /**
   * Process default values
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleInitialValues: function(targetItem, item) {
    // dataType:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)

    if (item.value) {
      var valueKey = this._getValueKeyByDataType("initial", item.dataType)
      // for Coding
      // multiple selections, item.value is an array
      // NO support of multiple selections in FHIR SDC, just pick one
      if (item.dataType === 'CWE' || item.dataType === 'CNE' ) {
        var codeSystem = this._getCodeSystem(item.questionCodeSystem);
        if (item.questionCardinality.max==="*" || parseInt(item.questionCardinality.max) >1) {
          targetItem[valueKey] = {
            "system": codeSystem,
            "code": item.value[0].code,
            "display": item.value[0].text
          };
        }
        // single selection, item.value is an object
        else {
          targetItem[valueKey] = {
            "system": codeSystem,
            "code": item.value.code,
            "display": item.value.text
          };
        }
      }
      // for Quantity,
      // [{
      //   // from Element: extension
      //   "value" : <decimal>, // Numerical value (with implicit precision)
      //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
      //   "unit" : "<string>", // Unit representation
      //   "system" : "<uri>", // Code System that defines coded unit form
      //   "code" : "<code>" // Coded form of the unit
      // }]
      else if (item.dataType === 'QTY') {
        // NOTE: QTY data type in LForms does not have unit. Cannot support it.
      }
      // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
      else if (item.dataType === "BL" || item.dataType === "REAL" || item.dataType === "INT" ||
          item.dataType === "DT" || item.dataType === "DTM" || item.dataType === "TM" ||
          item.dataType === "ST" || item.dataType === "TX" || item.dataType === "URL") {
        targetItem[valueKey] = item.value;
      }
      // no support for reference
    }

  },


  /**
   * Process units list
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleLFormsUnits: function(targetItem, item) {

    if (item.units) {
      var unitsArray = [];
      for (var i=0, iLen=item.units.length; i<iLen; i++) {
        var unit = item.units[i];
        unitsArray.push({
          "system": "http://unitsofmeasure.org",
          "code": unit.name,
          "display": unit.name
        });
      }
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-allowedUnits",
        "valueCodeableConcept": {
          "coding": unitsArray
        }
      });
    }
  },


  /**
   * Process skip logic
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @param source a LForms form definition object
   * @private
   */
  _handleSkipLogic: function(targetItem, item, source) {
    if (item.skipLogic) {
      var enableWhen = [];

      // ignore "ANY", "ALL" on item.skipLogic.logic
      // ignore "show" on item.skipLogic.action

      for (var i=0, iLen=item.skipLogic.conditions.length; i<iLen; i++) {
        var condition = item.skipLogic.conditions[i];
        var sourceItem = source._getSkipLogicSourceItem(item,condition.source);

        var enableWhenRule = {
          "question": sourceItem._codePath + sourceItem._idPath
        };
        // dataTypes:
        // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
        // Attachment, Coding, Quantity, Reference(Resource)
        var valueKey = this._getValueKeyByDataType("answer", sourceItem.dataType);

        // for Coding
        // multiple selections, item.value is an array
        // NO support of multiple selections in FHIR SDC, just pick one
        if (sourceItem.dataType === 'CWE' || sourceItem.dataType === 'CNE' ) {
          if (condition.trigger.code) {
            enableWhenRule[valueKey] = {
              "code": condition.trigger.code
            }
          }
          else {
            enableWhenRule[valueKey] = {
              "code": "only 'code' attribute is supported"
            }
          }
        }
        // for Quantity,
        // [{
        //   // from Element: extension
        //   "value" : <decimal>, // Numerical value (with implicit precision)
        //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
        //   "unit" : "<string>", // Unit representation
        //   "system" : "<uri>", // Code System that defines coded unit form
        //   "code" : "<code>" // Coded form of the unit
        // }]
        else if (sourceItem.dataType === 'QTY') {
          // TBD
        }
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
        else if (sourceItem.dataType === "BL" || sourceItem.dataType === "REAL" || sourceItem.dataType === "INT" ||
            sourceItem.dataType === "DT" || sourceItem.dataType === "DTM" || sourceItem.dataType === "TM" ||
            sourceItem.dataType === "ST" || sourceItem.dataType === "TX" || sourceItem.dataType === "URL") {
          enableWhenRule[valueKey] = condition.trigger.value;
        }
        // add a rule to enableWhen
        enableWhen.push(enableWhenRule)
      }
      targetItem.enableWhen = enableWhen;
    }
  },


  /**
   * Merge a QuestionnaireResponse instance into an LFormsData object
   * @param formData an LFormsData definition data object
   * @param qr a QuestionnaireResponse instance
   * @returns {{}} an updated LFormsData object
   */
  mergeQuestionnaireResponseToForm : function(formData, qr) {
    var reportStructure = this._getReportStructure(qr);
    this._processObxAndItem(reportStructure, formData);
    return formData;
  },


  /**
   * Get structure information of a QuestionnaireResponse instance
   * @param qr a QuestionnaireResponse instance
   * @returns {{}} a QuestionnaireResponse data structure object
   * @private
   */
  _getReportStructure : function(qr) {
    var qrStructure = {
      obxInfoList: []
    };
    if (qr) {
      this._checkRepeatingItems(qrStructure, qr);
    }
    return qrStructure;
  },


  /**
   * Get the item's code path from a link id
   * @param linkId a link id
   * @returns {*}
   * @private
   */
  _getCodePathFromLinkId: function(linkId) {
    var parts = linkId.split("/");
    var level = (parts.length -1)/2;
    var codePath = parts.slice(0, level +1 ).join("/");
    return codePath;
  },


  /**
   * Get the item code from a link id
   * @param linkId a link id
   * @returns {*}
   * @private
   */
  _getItemCodeFromLinkId: function(linkId) {
    var parts = linkId.split("/");
    var level = (parts.length -1)/2;
    var itemCode = parts[level];
    return itemCode;
  },


  /**
   * Get structural info of a QuestionnaireResponse by going though each level of items
   * @param parentObxInfo the structural info of a parent item
   * @param parentItem a parent item
   * @private
   */
  _checkRepeatingItems : function(parentObxInfo, parentItem) {

    var obxInfoList = [];
    var repeatingItemInfo = {};

    if (parentItem && parentItem.item) {
      for (var i=0, iLen=parentItem.item.length; i<iLen; i++) {
        var subItem = parentItem.item[i];
        var itemCode = this._getItemCodeFromLinkId(subItem.linkId);
        // first obx that has the same item code, either repeating or non-repeating
        if (!repeatingItemInfo[itemCode]) {
          var repeatingInfo = this._findTotalRepeatingNum(itemCode, parentItem);
          repeatingItemInfo[itemCode] = {
            total: repeatingInfo.total,
            repeatingItems: repeatingInfo.repeatingItems
          };
        }

        // create structure info for the obx
        var repeatingItems = repeatingItemInfo[itemCode].repeatingItems;
        for (var j=0, jLen=repeatingItems.length; j<jLen; j++) {
          if (subItem.linkId === repeatingItems[j].linkId) {
            var obxInfo = {
              code: itemCode,
              item: subItem,
              index: j,
              total: repeatingItemInfo[itemCode].total
            };
            // check observation instances in the sub level
            this._checkRepeatingItems(obxInfo, subItem);
            obxInfoList.push(obxInfo);
          }
        }
      }
      parentObxInfo.obxInfoList = obxInfoList;
    }
  },


  /**
   * Find the number of the repeating items that have the same code
   * @param code an item code
   * @param parentItem a parent item
   * @returns a structural info object for a repeating item
   * @private
   */
  _findTotalRepeatingNum : function(code, parentItem) {

    var total = 0;
    var repeatingItems = [];
    for (var i=0, iLen=parentItem.item.length; i<iLen; i++) {
      var item = parentItem.item[i];
      var itemCode = this._getItemCodeFromLinkId(item.linkId);
      if (itemCode === code) {
        repeatingItems.push(item);
        total += 1;
      }
    }

    return {
      total: total,
      repeatingItems: repeatingItems
    };
  },


  /**
   * Merge data into items on the same level
   * @param parentObxInfo structural information of a parent item
   * @param parentItem a parent item
   * @private
   */
  _processObxAndItem : function(parentObxInfo, parentItem) {
    for(var i=0, iLen=parentObxInfo.obxInfoList.length; i<iLen; i++) {

      var obxInfo = parentObxInfo.obxInfoList[i];
      var obx = obxInfo.item;
      if (obx) {
        // first repeating obx
        if (obxInfo.total > 1 && obxInfo.index === 0) {
          // add repeating items in form data
          this._addRepeatingItems(parentItem, obxInfo.code, obxInfo.total);
        }
        var item = this._findTheMatchingItemByCodeAndIndex(parentItem, obxInfo.code, obxInfo.index);
        this._setupItemValueAndUnit(obx, item);

        // process items on sub level
        if (obxInfo.obxInfoList && obxInfo.obxInfoList.length>0) {
          this._processObxAndItem(obxInfo, item);
        }
      }
    }
  },


  /**
   * Add repeating items
   * @param parentItem a parent item
   * @param itemCode code of a repeating item
   * @param total total number of the repeating item with the same code
   * @private
   */
  _addRepeatingItems : function(parentItem, itemCode, total) {
    // find the first (and the only one) item
    var item = null;
    if (parentItem.items) {
      for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
        if (itemCode === parentItem.items[i].questionCode) {
          item = parentItem.items[i];
          break;
        }
      }
      // insert new items
      if (item) {
        while(total > 1) {
          var newItem = angular.copy(item);
          parentItem.items.splice(i, 0, newItem);
          total -= 1;
        }
      }
    }
  },


  /**
   * Find a matching repeating item
   * @param parentItem a parent item
   * @param itemCode code of a repeating (or non-repeating) item
   * @param index index of the item in the sub item array of the parent item
   * @returns {{}} a matching item
   * @private
   */
  _findTheMatchingItemByCodeAndIndex : function(parentItem, itemCode, index) {
    var item = null;
    var idx = 0;
    if (parentItem.items) {
      for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
        if (itemCode === parentItem.items[i].questionCode) {
          if (idx === index) {
            item = parentItem.items[i];
            break;
          }
          else {
            idx += 1;
          }
        }
      }
    }
    return item;
  },


  /**
   * Merge a data item instance into an form item
   * @param obx a data item
   * @param item a form item
   * @private
   */
  _setupItemValueAndUnit : function(obx, item) {
    var code = this._getItemCodeFromLinkId(obx.linkId);

    if (item && code === item.questionCode && (item.dataType !== 'SECTION' && item.dataType !== 'TITLE')) {
      var dataType = item.dataType;
      // any one has a unit must be a numerical type, let use REAL for now.
      // dataType conversion should be handled when panel data are added to lforms-service.
      if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
        dataType = "REAL";
      }

      var qrValue = obx.answer[0];

      switch (dataType) {
        case "INT":
          if (qrValue.valueQuantity) {
            item.value = qrValue.valueQuantity.value;
            item.unit = {name: qrValue.valueQuantity.code};
          }
          else if (qrValue.valueInteger) {
            item.value = qrValue.valueInteger;
          }
          break;
        case "REAL":
          if (qrValue.valueQuantity) {
            item.value = qrValue.valueQuantity.value;
            item.unit = {name: qrValue.valueQuantity.code};
          }
          else if (qrValue.valueDecimal) {
            item.value = qrValue.valueDecimal;
          }
          break;
        case "DT":
          item.value = qrValue.valueDateTime;
          break;
        case "CNE":
        case "CWE":
          if (item.answerCardinality.max &&
              (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            var value = [];
            for (var j=0,jLen=obx.answer.length; j<jLen; j++) {
              var coding = obx.answer[j];
              value.push({
                "code": coding.valueCoding.code,
                "text": coding.valueCoding.display
              });
            }
            item.value = value;
          }
          else {
            item.value = {
              "code": qrValue.valueCoding.code,
              "text": qrValue.valueCoding.display
            };
          }
          break;
        case "ST":
          item.value = qrValue.valueString;
          break;
        case "SECTION":
        case "TITLE":
        case "":
          // do nothing
          break;
        default:
          item.value = qrValue.valueString;
      }
    }
  }
};
