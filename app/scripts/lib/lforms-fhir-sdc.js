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

  SDC_2_LForms: {
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

  LForms_2_SDC : {
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

    _handleAnswer: function(answer) {
      var coding = {
        "system": "http://loinc.org",
        "code": answer.code,
        "display": answer.text
      };

      return coding;
    },

    _handleUnits: function(units) {
      var valueSet = {
        "url": "http://hl7.org/fhir/ValueSet/ucum-common",
        "name": "Common UCUM units",
        "status": "draft",
        "publisher": "FHIR Project",
        "description": "Commonly encountered UCUM units (for purposes of helping populate look ups.",
        "copyright": "UCUM is Copyright © 1999-2013 Regenstrief Institute, Inc. and The UCUM Organization, Indianapolis, IN. All rights reserved. See http://unitsofmeasure.org/trac//wiki/TermsOfUse for details.",
        "extensible": true,
        "compose": {
          "include": [
            {
              "system": "http://unitsofmeasure.org",
              "concept": []
            }
          ]
        }
      };

      for (var i=0, iLen=units.length; i<iLen; i++) {
        valueSet.compose.include[0].concept.push({
          "code": units[i].name,
          "display": units[i].code
        });
      }

      return valueSet;
    }

  }


};
