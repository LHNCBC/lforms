/**
 * A package to handle FHIR SDC (STU2, Version 1.6.0) Questionnaire and QuestionnaireResponse profile for LForms.
 * It provides the following functions:
 * -- Convert FHIR SDC Questionnaire resource data into LForms formatted data
 * -- Generate FHIR SDC QUestionnaireResponse resource data from captured data in LForms
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR SDC Questionnaire resource
 * -- Merge data in FHIR SDC QuestionnaireResponse resource back into corresponding Questionnaire resource
 */
if (typeof LForms === 'undefined')
  LForms = {};

LForms.FHIR_SDC = {

  SDC_2_LFORMS: {
    _source: null,
    _target: null,

    convert: function(source) {
      this._target = null;
      if (source) {
        this._target = {};
        this._source = source;
        this._setFormOptions();
        this._setFormLevelFields();

        if (source.item && Array.isArray(source.item)) {
          this._target.items = [];
          for (var i=0, iLen=source.item.length; i<iLen; i++) {
            var newItem = this._processItem(source.item[i]);
            this._target.items.push(newItem);
          }

        }
      }

      return this._target;

    },


    _setFormOptions: function() {
      // showQuestionCode: false,
      // showCodingInstruction: false,
      // tabOnInputFieldsOnly: false,
      // hideFormControls: false,
      // showFormOptionPanel: false,
      // showFormOptionPanelButton: false,
      // showItemOptionPanelButton: false,
      // hideUnits: false,
      // allowMultipleEmptyRepeatingItems: false,
      // allowHTMLInInstructions: false,
      // useAnimation: true,
      // displayControl: {"questionLayout": "vertical"},
      // showFormHeader: true,
      // formHeaderItems: [
      //   {"question": "Date Done", "questionCode": "date_done", "dataType": "DT", "answers": "", "_answerRequired": true,"answerCardinality":{"min":"1", "max":"1"}},
      //   {"question": "Time Done", "questionCode": "time_done", "dataType": "TM", "answers": ""},
      //   {"question":"Where Done", "questionCode":"where_done", "dataType":"CWE", "answers":[{"text":"Home","code":"1"},{"text":"Hospital","code":"2"},{"text":"MD Office","code":"3"},{"text":"Lab","code":"4"},{"text":"Other","code":"5"}]},
      //   {"question":"Comment", "questionCode":"comment","dataType":"TX","answers":""}
      // ],
      // showColumnHeaders: true,
      // defaultAnswerLayout: {
      //   "answerLayout": {
      //     "type": "COMBO_BOX", // "COMBO_BOX" -- use autocompleter
      //     // "RADIO_CHECKBOX" -- all answers displayed as radio buttons or checkboxes
      //     "columns": "0"   // valid only when "type" is "RADIO_CHECKBOX". Permissible values include:
      //                      // "0" -- flexible
      //                      // "1", "2", "3", "4", "5", "6" -- listed in columns
      //   }
      // },
      // useTreeLineStyle: true, // true -- use tree lines
      //                         // false -- use bars
      // columnHeaders: [
      //   {"name" : "Name"},
      //   {"name" : "Value"},
      //   {"name" : "Units"}
      // ]

      // if any default setting listed above need a change set it on this._target
      this._target.templateOptions= {
        hideFormControls: true,
        showFormHeader: false,
        showColumnHeaders: false
      };

    },

    _setFormLevelFields: function() {
      // keep required fields
      this._target.url = this._source.url;
      this._target.status = this._source.status;
      this._target.date = this._source.date;
      this._target.title = this._source.title;
      this._target.subjectType = this._source.subjectType;

      // code
      // "identifier": [
      //   {
      //     "system": "http://loinc.org/vs",
      //     "value": "74080-3"
      //   }
      // ],
      if (this._source.identifier && Array.isArray(this._source.identifier)) {
        this._target.code = this._source.identifier[0].value;
        this._target.codeSystem = this._source.identifier[0].system;

      }
      else if (this._source.id) {
        this._target.code = this._source.id;
      }
      // codeSystem
      if (this._source.concept && this._source.concept.code) {
        this._target.codeSystem = this._source.concept.code;
      }

      // name
      this._target.name = this._source.title;
      // type
      this._target.type = "FHIR_SDC";

      // template
      this._target.template = "table";
      // copyrightNotice



    },

    _processItem: function(item) {
      var targetItem = {};
      // questionCode & // questionCodeSystem
      var codeAndSystem = this._handleQuestionCode(item);
      targetItem.questionCode = codeAndSystem[0];
      targetItem.questionCodeSystem = codeAndSystem[1];

      // localQuestionCode TBD

      // dataType
      targetItem.dataType = this._handleDataType(item);

      // units
      targetItem.units = this._handleUnits(item);

      // codingInstructions
      // copyrightNotice

      // question
      targetItem.question = item.text;

      // answers
      targetItem.answers = this._handleAnswers(item);

      // skipLogic TBD
      targetItem.skipLogic = this._handleSkipLogic(item);

      // restrictions
      targetItem.restrictions = this._handleRestrictions(item);

      // defaultAnswer
      targetItem.defaultAnswer = this._handleDefaultAnswer(item);

      // editable
      targetItem.editable = this._handleEditable(item);

      // displayControl
      targetItem.displayControl = this._handleDisplayControl(item);

      // answerCardinality (required)
      targetItem.answerCardinality = this._handleAnswerCardinality(item);

      // questionCardinality
      targetItem.questionCardinality = this._handleQuestionCardinality(item);

      // Need to add an extension to FHIR SDC Questionnaire !!
      // dataControl
      // targetItem.dataControl = this._handleDataControl(item);
      // formula
      // targetItem.calculatedMethod = this._handleFormula(item);

      // keep additional fields
      targetItem.linkId = this._handleLinkId(item);
      targetItem.prefix = this._handlePrefix(item);

      if (item.item && Array.isArray(item)) {
        // header
        targetItem.header = true;
        targetItem.items = [];
        for (var i=0, iLen=item.item.length; i<iLen; i++) {
          var newItem = this._processItem(source.item[i]);
          target.items.push(newItem);
        }
      }

      return targetItem
    },

    _handleDataType: function(item) {
      var dataType = "";
      switch (item.type) {
        case "group":
          dataType = 'SECTION';
          break;
        case "display":
          dataType = 'TITLE';
          break;
        case "question":
          dataType = 'ST';
          break;
        case "boolean":
          dataType = 'BL';
          break;
        case "decimal":
          dataType = 'REAL';
          break;
        case "integer":
          dataType = 'INT';
          break;
        case "date":
          dataType = 'DT';
          break;
        case "dateTime": // not supported yet
          dataType = 'DTM';
          break;
        case "instant":  // not supported yet
          dataType = 'DTM';
          break;
        case "time":
          dataType = 'TM';
          break;
        case "string":
          dataType = 'ST';
          break;
        case "text":
          dataType = 'TX';
          break;
        case "url":
          dataType = 'URL';
          break;
        case "choice":
          dataType = 'CNE';
          break;
        case "open-choice":
          dataType = 'CWE';
          break;
        case "attachment": // not supported
          dataType = 'ST';
          break;
        case "reference":  // not supported
          dataType = 'ST';
          break;
        case "quantity":
          dataType = 'QTY';
          break;
        default:
          dataType = 'ST';
          break;
      }

      return dataType;
    },


    _handleQuestionCardinality: function(item) {
      // questionnaire-minOccurs
      // questionnaire-maxOccurs
      // repeats

    },

    _handleDisplayControl: function(item) {
      // questionnaire-itemControl

    },

    _handleRestrictions: function(item) {
      // minLength
      // maxSize
      // regex
      // minValue
      // maxValue
      // maxDecimalPlaces
      //

    },

    _handleUnits: function(item) {
      // questionnaire-unit
    },

    _handleSkipLogic: function(item) {
      // enableWhen
    },

    _handleCodingInstructions: function(item) {
      // questionnaire-displayCategory
      //
    },


    _handleAnswerLabel: function(item) {
      //questionnaire-optionPrefix
    },

    _handleAnswers: function(item) {

      var answers = [];
      // option
      if (item.option) {
        for (var i=0, iLen=item.option.length; i<iLen; i++) {
          answers.push({
            "code": item.option[i].code,
            "text": item.option[i].display
          })
        }
      }
      // options
      // "options": {
      //   "reference": "#ll2682-4"
      // },
      else if (item.options && item.options.reference) {
        answers = this._findAnswersByReference(item.options.reference);
      }

      return answers;
    },


    // {
    //   "resourceType": "ValueSet",
    //   "id": "ll2682-4",
    //   "name": "AHRQ_Medication_Q28_Q29",
    //   "status": "active",
    //   "description": "The answer list for questions 28 and 29 on the AHRQ 'Medication or Other Substance' form",
    //   "copyright": "This content from LOINC® is copyright © 1995 Regenstrief Institute, Inc. and the LOINC Committee, and available at no cost under the license at http://loinc.org/terms-of-use",
    //   "compose": {
    //     "include": [
    //       {
    //         "system": "http://loinc.org",
    //         "concept": [
    //           {
    //             "code": "LA20272-3",
    //             "display": "Cutaneous, topical application, including ointment, spray, patch"
    //           },
    //           {
    //             "code": "LA9451-1",
    //             "display": "Subcutaneous"
    //           },
    //           ......
    //         ]
    //       }
    //     ]
    //   }
    // }
    _findAnswersByReference: function(answerId) {
      var answers = [];
      if (this._source.contained) {
        for(var i=0, iLen=this._source.contained.length; i<iLen; i++) {
          var containedResource = this._source.contained[i];
          if (containedResource.resourceType == "ValueSet" && "#"+containedResource.id===answerId &&
              containedResource.compose && Array.isArray(containedResource.compose.include)) {
            // pick the first answer list only (might have to check other values in 'include'
            var conceptList = containedResource.compose.include[0].concept;
            if (Array.isArray(conceptList)) {
              for(var j=0, jLen=conceptList.length; j<jLen; j++) {
                answers.push({
                  "code": conceptList[j].code,
                  "text": conceptList[j].display
                })
              }
            }
          }
        }
      }

      return answers;
    },

    // {
    //   "resourceType": "ValueSet",
    //   "id": "weight",
    //   "meta": {
    //     "profile": [
    //       "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
    //     ]
    //   },
    //   "name": "Weight Units",
    //   "status": "active",
    //   "description": "Weight units",
    //   "immutable": true,
    //   "extensible": false,
    //   "compose": {
    //     "include": [
    //       {
    //         "system": "http://unitsofmeasure.org",
    //         "concept": [
    //           {
    //             "code": "[lb_i]",
    //             "display": "pounds"
    //           },
    //           {
    //             "code": "km",
    //             "display": "kilograms"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }

    _findUnitsByReference: function(item) {

    },

    _handleEditable: function(item) {
      // readonly
    },

    _handleDefaultAnswer: function(item) {
      // initial[x]
    },


    // add a prefix field??
    _handlePrefix: function(item) {
      // questionnaire-prefix
    },
    // add a linkId field??
    _handleLinkId: function(item) {
      // linkId
    },
    // add a supportLink field??
    // link to LOINC
    _handleCodeLink: function(item) {
      // questionnaire-supportLink
    },

    _handleQuestionCode: function(item) {

      var questionCode = '';
      var questionCodeSystem = '';
      // "concept": [
      //   {
      //     "system": "http://loinc.org",
      //     "code": "54125-0",
      //     "display": "Name"
      //   }
      if (item.concept) {
        questionCode = item.concept.code;
        questionCodeSystem = item.concept.system;
      }
      // "extension": [
      //   {
      //     "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
      //     "valueCodeableConcept": {
      //       "coding": [
      //         {
      //           "system": "http://hl7.org/fhir/questionnaire-item-control",
      //           "code": "header"
      //         }
      //       ]
      //     }
      //   }
      // ],
      else if (item.extension && Array.isArray(item.extension)) {
        for(var i=0, iLen=item.extension.length; i<iLen; i++) {
          if (item.extension[i].url === "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl" &&
              item.extension[i].valueCodeableConcept &&
              Array.isArray(item.extension[i].valueCodeableConcept.coding)) {
            // pick the first coding
            if (item.extension[i].valueCodeableConcept.coding[0]) {
              questionCode = item.extension[i].valueCodeableConcept.coding[0].code;
              questionCodeSystem = item.extension[i].valueCodeableConcept.coding[0].system;
            }
          }
        }
      }
      else if (item.linkId) {
        questionCode = item.linkId;
      }
      else if (item.text) {
        questionCode = item.text;
      }
      else {
        questionCode = 'generated_' + Math.random(10000);
      }

      return [questionCode, questionCodeSystem];
    },


    _handleAnswerCardinality: function(item) {
      var answerCardinality = {
        "max": "1",
        "min": "0"
      };
      if (item.required) {
        answerCardinality.min = "1";
      }
      return answerCardinality;
    },


    // add new extensions for dataControl, formula??
    _handleDataControl: function(item) {

    },

    _handleFormula: function(item) {

    }

  },

  LFORMS_2_SDC : {
    _source: null,
    _target: null,


    // need to add "id" by the application of this util
    // 'source' is the LFormsData object
    convert2Questionnaire: function(lfData) {
      this._target = null;
      if (lfData) {
        this._target = {};
        this._source = lfData

        this._setFormOptions();
        this._setFormLevelFields();

        if (this._source.items && Array.isArray(this._source.items)) {
          this._target.item = [];
          for (var i=0, iLen=this._source.items.length; i<iLen; i++) {
            var newItem = this._processItem(this._source.items[i]);
            this._target.item.push(newItem);
          }

        }
      }

      return this._target;

    },

    _setFormOptions: function() {
      // showQuestionCode: false,
      // showCodingInstruction: false,
      // tabOnInputFieldsOnly: false,
      // hideFormControls: false,
      // showFormOptionPanel: false,
      // showFormOptionPanelButton: false,
      // showItemOptionPanelButton: false,
      // hideUnits: false,
      // allowMultipleEmptyRepeatingItems: false,
      // allowHTMLInInstructions: false,
      // useAnimation: true,
      // displayControl: {"questionLayout": "vertical"},
      // showFormHeader: true,
      // formHeaderItems: [
      //   {"question": "Date Done", "questionCode": "date_done", "dataType": "DT", "answers": "", "_answerRequired": true,"answerCardinality":{"min":"1", "max":"1"}},
      //   {"question": "Time Done", "questionCode": "time_done", "dataType": "TM", "answers": ""},
      //   {"question":"Where Done", "questionCode":"where_done", "dataType":"CWE", "answers":[{"text":"Home","code":"1"},{"text":"Hospital","code":"2"},{"text":"MD Office","code":"3"},{"text":"Lab","code":"4"},{"text":"Other","code":"5"}]},
      //   {"question":"Comment", "questionCode":"comment","dataType":"TX","answers":""}
      // ],
      // showColumnHeaders: true,
      // defaultAnswerLayout: {
      //   "answerLayout": {
      //     "type": "COMBO_BOX", // "COMBO_BOX" -- use autocompleter
      //     // "RADIO_CHECKBOX" -- all answers displayed as radio buttons or checkboxes
      //     "columns": "0"   // valid only when "type" is "RADIO_CHECKBOX". Permissible values include:
      //                      // "0" -- flexible
      //                      // "1", "2", "3", "4", "5", "6" -- listed in columns
      //   }
      // },
      // useTreeLineStyle: true, // true -- use tree lines
      //                         // false -- use bars
      // columnHeaders: [
      //   {"name" : "Name"},
      //   {"name" : "Value"},
      //   {"name" : "Units"}
      // ]

      /**
       * Nothing needs to be done for options
       */
    },

    _setFormLevelFields: function() {

      // resourceType
      this._target.resourceType = "Questionnaire";

      // status
      this._target.status = "draft";

      // date
      this._target.date = "2017-02-21";

      // version
      this._target.version = "LOINC version 2.56";

      // url
      this._target.url = "http://hl7.org/fhir/us/sdc/Questionnaire/" + this._source.code;

      // meta
      this._target.meta = {
        "profile": [
          "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire"
        ]
      };

      // publisher
      this._target.publisher = "Lister Hill National Center for Biomedical Communications (LHNCBC)";


      // title
      this._target.title = this._source.name;

      var codeSystem = this._source.codeSystem === "LOINC" ? "http://loinc.org" : this._source.codeSystem;

      // "identifier": [
      this._target.identifier = {
        "system": codeSystem,
        "code": this._source.code
      };

      // concept
      this._target.concept = {
        "system": codeSystem,
        "code": this._source.code,
        "display": this._source.name
      };

      // subjectType
      this._target.subjectType = ["Patient", "Person"];

      // text,
      // not to use. it requires html/xhtml content?


    },

    _processItem: function(item) {
      var targetItem = {};

      // id (empty for new record)

      // extension
      targetItem.extension = [];

      // required
      targetItem.required = item._answerRequired

      // http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs
      if (targetItem.required) {
        targetItem.extension.push({
          "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs",
          "valueInteger" : parseInt(item.questionCardinality.min)
        });
      }

      // repeats
      // http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs
      if (item.questionCardinality.max === "*") {
        targetItem.repeats = true;
      }
      else if (parseInt(item.questionCardinality.max) > 1) {
        targetItem.repeats = true;
        targetItem.extension.push({
          "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs",
          "valueInteger" : parseInt(item.questionCardinality.max)
        });
      }
      else {
        targetItem.repeats = false;
      }

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
          else if (item.displayControl.answerLayout === "COMBO_BOX") {
            itemControlType = "Combo-box";
          }
          // radio or checkbox
          else if (item.displayControl.answerLayout === "RADIO_CHECKBOX") {
            if (item.dataType === "CNE") {
              itemControlType = "Radio";
            }
            else if (item.dataType === "CWE") {
              itemControlType = "Checkbox";
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

      // questionnaire-choiceOrientation , not supported yet

      // check restrictions
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
            case "minInclusive":
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

      // http://hl7.org/fhir/StructureDefinition/entryFormat
      // looks like tooltip, TBD

      // http://hl7.org/fhir/StructureDefinition/questionnaire-unit
      // this is for a single unit, where is the units list?????
      // for user selected unit, not item.units! Not to use here
      if (item.unit) {
        targetItem.extension.push({
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
          "valueCoding" : {
            "system": "http://unitsofmeasure.org",
            "code": item.unit.name
          }
        });
      }

      // ADD LForms Extension to units list
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
      targetItem.linkId = item._id;

      // concept
      targetItem.concept = {
        "system": item.questionCodeSystem,
        "code": item.questionCode,
        "display": item.question
      };

      // text
      targetItem.text = item.question;

      // type
      targetItem.type = this._handleDataType(item);

      // enableWhen
      if (item.skipLogic) {
        this._handleSkipLogic(targetItem, item)
      }

      // repeats, handled above
      // readonly, (editable)
      if (item.dataType !== "SECTION" && item.dataType !== "TITLE" && item.editable === "0") {
        targetItem.readonly = true;
      }

      // options , a reference to ValueSet resource, not to use for now
      // option
      if (item.answers) {
        targetItem.option = this._handleAnswers(item)
      }

      // initialValue, for default values
      if (item.value) {
        this._handleInitialValues(targetItem, item);
      }

      if (item.items && Array.isArray(item.items)) {
        // header
        targetItem.header = true;
        targetItem.item = [];
        for (var i=0, iLen=item.items.length; i<iLen; i++) {
          var newItem = this._processItem(item.items[i]);
          targetItem.item.push(newItem);
        }
      }

      // if there is no extension, remove it
      if (targetItem.extension.length === 0)
        delete targetItem.extension;

      return targetItem
    },

    // 'source' is the LFormsData object
    // add "id" and "subject"
    convert2QuestionnaireResponse: function(lfData) {
      this._target = null;
      if (lfData) {
        this._target = {};

        this._source = lfData.getFormData(false,true,true,true);

        this._groupedValues = {};
        this._groupValuesByLinkId(this._source);

        this._setResponseFormLevelFields();

        if (this._source.items && Array.isArray(this._source.items)) {
          this._target.item = [];
          for (var i=0, iLen=this._source.items.length; i<iLen; i++) {
            var newItem = this._processResponseItem(this._source.items[i]);
            this._target.item.push(newItem);
          }

        }
      }

      return this._target;

    },


    _setResponseFormLevelFields: function() {

      // resourceType
      this._target.resourceType = "QuestionnaireResponse";

      // contained

      var codeSystem = this._source.codeSystem === "LOINC" ? "http://loinc.org" : this._source.codeSystem;

      // "identifier": [
      this._target.identifier = {
        "system": codeSystem,
        "code": this._source.code
      };

      // status, required
      // "in-progress", "completed", "amended"
      this._target.status = "completed";


      // source
      this._target.source = "LHC-LForms";

      // author
      this._target.author = "LHC-LForms";

      // authored, required
      this._target.authored = LForms.Util.dateToString(new Date());

      // questionnaire , required
      this._target.reference =  "http://hl7.org/fhir/us/sdc/Questionnaire/" + this._source.code;

      // meta
      this._target.meta = {
        "profile": [
          "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-response"
        ]
      };

      // text,
      // not to use. it requires html/xhtml content?


    },

    _processResponseItem: function(item) {
      var targetItem = {};

      // id (empty for new record)

      item._id = item._codePath + item._idPath;

      // if the item has not been processed
      // for repeating questions, only the first one will be processed
      if (this._groupedValues[item._id]) {
        // if it is a section
        if (item.dataType === "SECTION") {
          // linkId
          targetItem.linkId = item._id;
          // text
          targetItem.text = item.question;

          if (item.items && Array.isArray(item.items)) {
            // header
            targetItem.header = true;
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
          targetItem.linkId = item._id;
          // text
          targetItem.text = item.question;

          this._handleAnswerValues(targetItem, item);
        }

        // remove the processed values
        delete this._groupedValues[item._id];

      }

      return targetItem
    },

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
          valueKey = "Date";
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

    _handleAnswers: function(item) {
      var optionArray = [];
      for (var i=0, iLen=item.answers.length; i<iLen; i++) {
        var answer = item.answers[i];
        var option = {
          "id": answer.code
        };
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
          dataType = 'question';
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
          dataType = 'date';
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


    _groupValuesByLinkId: function(item) {
      var id = item._codePath + item._idPath;
      if (!this._groupedValues[id]) {
        this._groupedValues[id] = [item.value];
      }
      else {
        this._groupedValues[id].push(item.value);
      }
      if (item.items) {
        for (var i=0, iLen=item.items.length; i<iLen; i++) {
          this._groupValuesByLinkId(item.items[i])
        }
      }

    },


    _handleAnswerValues: function(targetItem, item) {
      //boolean, decimal, integer, date, dateTime, instant, time, string, uri, Attachment, Coding, Quantity, Reference(Resource)

      var answer = [];
      // value not processed by previous repeating items
      if (this._groupedValues[item._id] && item.dataType !== "SECTION" && item.dataType !=="TITLE") {

        var valueKey = this._getValueKeyByDataType("value", item.dataType);

        var values = this._groupedValues[item._id];

        for (var i=0, iLen= values.length; i<iLen; i++) {

          // for Coding
          // multiple selections, item.value is an array
          // Note: NO support of multiple selections in FHIR SDC
          if (item.dataType === 'CWE' || item.dataType === 'CNE' ) {
            if ((item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1) && Array.isArray(values[i])) {
              for (var j=0, jLen=values[i].length; j<jLen; j++) {
                if (!jQuery.isEmptyObject(values[i][j])) {
                  answer.push({
                    "valueCoding" : {
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
          else if (item.dataType === 'QTY') {

          }
          // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
          else if (item.dataType === "BL" || item.dataType === "REAL" || item.dataType === "INT" ||
              item.dataType === "DT" || item.dataType === "DTM" || item.dataType === "TM" ||
              item.dataType === "ST" || item.dataType === "TX" || item.dataType === "URL") {
            var answerValue = {};
            answerValue[valueKey] = typeof values[i] === 'undefined' ? null : values[i];
            answer.push(answerValue);
          }
          // no support for reference

        }

        targetItem.answer = answer;
      }



    },

    // _isAnswerEmpty: function(answer) {
    //   var empty = true;
    //   for (var i=0, iLen=answer.length; i<iLen && empty; i++) {
    //     var oneAnswer = answer[i];
    //     if (!jQuery.isEmptyObject(oneAnswer)) {
    //       if (oneAnswer.valueCoding) {
    //         var keys = Object.keys(oneAnswer.valueCoding);
    //         for (var j= 0, jLen=keys.length; j<jLen && empty; j++) {
    //           if (oneAnswer.valueCoding[keys[j]]) {
    //             empty = false;
    //           }
    //         }
    //       }
    //       else {
    //         var keys = Object.keys(oneAnswer);
    //         if (oneAnswer[keys[0]]) {
    //           empty = false;
    //         }
    //       }
    //     }
    //   }
    // },

    _handleInitialValues: function(targetItem, item) {
      //boolean, decimal, integer, date, dateTime, instant, time, string, uri, Attachment, Coding, Quantity, Reference(Resource)

      if (item.value) {
        var valueKey = this._getValueKeyByDataType("initial", item.dataType)
        // for Coding
        // multiple selections, item.value is an array
        // NO support of multiple selections in FHIR SDC, just pick one
        if (item.dataType === 'CWE' || item.dataType === 'CNE' ) {
          if (item.questionCardinality.max==="*" || parseInt(item.questionCardinality.max) >1) {
            targetItem[valueKey] = [{
              "code": item.value[0].code,
              "display": item.value[0].text
            }];
          }
          // single selection, item.value is an object
          else {
            targetItem[valueKey] = [{
              "code": item.value.code,
              "display": item.value.text
            }];
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

    _handleLFormsUnits: function(targetItem, item) {

      // for Quantity item type only

      // http://hl7.org/fhir/StructureDefinition/questionnaire-units ???

      // This does not seem right !!!!

      // "extension": [
      //   {
      //     "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-allowedUnits",
      //     "valueCodeableConcept": {
      //       "coding": [
      //         {
      //           "system": "http://unitsofmeasure.org",
      //           "code": "a"
      //         }
      //       ]
      //     }
      //   }
      // ],

      // {
      //   "resourceType": "ValueSet",
      //   "id": "length",
      //   "meta": {
      //     "profile": [
      //       "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-valueset"
      //     ]
      //   },
      //   "name": "Length Units",
      //   "status": "active",
      //   "description": "Length units",
      //   "immutable": true,
      //   "extensible": false,
      //   "compose": {
      //     "include": [
      //       {
      //         "system": "http://unitsofmeasure.org",
      //         "concept": [
      //           {
      //             "code": "[in_i]",
      //             "display": "inches"
      //           },
      //           {
      //             "code": "cm",
      //             "display": "centimeters"
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // },

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

    _handleSkipLogic: function(targetItem, item) {
      if (item.skipLogic) {
        var enableWhen = [];

        // ignore "ANY", "ALL" on item.skipLogic.logic
        // ignore "show" on item.skipLogic.action

        for (var i=0, iLen=item.skipLogic.conditions.length; i<iLen; i++) {
          var condition = item.skipLogic.conditions[i];
          var sourceItem = this._source._getSkipLogicSourceItem(item,condition.source);

          var enableWhenRule = {
            "question": sourceItem._id

          };
          //boolean, decimal, integer, date, dateTime, instant, time, string, uri, Attachment, Coding, Quantity, Reference(Resource)
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

          }
          // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
          else if (sourceItem.dataType === "BL" || sourceItem.dataType === "REAL" || sourceItem.dataType === "INT" ||
              sourceItem.dataType === "DT" || sourceItem.dataType === "DTM" || sourceItem.dataType === "TM" ||
              sourceItem.dataType === "ST" || sourceItem.dataType === "TX" || sourceItem.dataType === "URL") {
            enableWhenRule[valueKey] = condition.trigger.value;
          }
          // no support for reference

          // add a rule to enableWhen
          enableWhen.push(enableWhenRule)
        }
        targetItem.enableWhen = enableWhen;
      }
    }


  }


};
