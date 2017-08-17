if (typeof LForms === 'undefined')
  LForms = {};

if (typeof LForms.FHIR_SDC === 'undefined')
  LForms.FHIR_SDC = {};

(function(ns) {
"use strict";

  ns.cardinalityMin = "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs";
  ns.cardinalityMax = "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs";

  /**
   * Convert FHIR SQC Questionnaire to LForms definition
   *
   * @param fhirData - FHIR Questionnaire object
   * @returns {{}} - LForms json object
   */
  ns.convertQuestionnaire2Lforms = function (fhirData) {
    var target = null;

    if(fhirData) {
      target = {};
      _parseFormLevelFields(fhirData, target);

      if(fhirData.item && fhirData.item.length > 0) {
        target.items = [];
        for( var i = 0; i < fhirData.item.length; i++) {
          var item = _processQuestionnaireItem(fhirData.item[i]);
          target.items.push(item);
        }
      }
    }

    return target;
  };

  /**
   * Parse form level fields from FHIR questionnaire and assign to LForms object.
   *
   * @param questionnaire - FHIR questionnaire resource object to parse for the fields.
   * @param lfData - LForms object to assign the extracted fields
   * @private
   */
  function _parseFormLevelFields(questionnaire, lfData) {
    lfData.name = questionnaire.title;

    if(questionnaire.code && Array.isArray(questionnaire.code)) {
      if(questionnaire.code[0].system && questionnaire.code[0].system.match('http')) {
        lfData.codeSystem = 'LOINC';
      }
      else {
        lfData.codeSystem = questionnaire.code[0].system;
      }
      lfData.code = questionnaire.code[0].code;
    }
  }

  /**
   *
   * @param qItem - item object as defined in FHIR Questionnaire.
   * @param qResource - The source object of FHIR  questionnaire resource to which the qItem belongs to.
   * @returns {{}} - Converted 'item' field object as defined by LForms definition.
   * @private
   */
  ns._processQuestionnaireItem = function (qItem, qResource) {
    var targetItem = {};


    if(qItem.code && Array.isArray(qItem.code)) {
      targetItem.questionCode = qItem.code[0].code;
    }

    // Handle cardinality
    var min = LForms.Util.findObjectInArray(qItem.extension, 'url', ns.cardinalityMin);
    if(min) {
      targetItem.questionCardinality = {min: min.valueInteger.toString()};
      var max = LForms.Util.findObjectInArray(qItem.extension, 'url', ns.cardinalityMax);
      if(max) {
        targetItem.questionCardinality.max = min.valueInteger.toString();
      }
    }
    else if (qItem.repeats) {
      targetItem.questionCardinality = {min: "1", max: "*"};
    }
    else if (qItem.required) {
      targetItem.questionCardinality = {min: "1", max: "1"};
    }

    // text
    targetItem.question = qItem.text;

    // type
    targetItem.dataType = _getDataType(qItem);

    /*
    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    ns._handleItemControl(targetItem, qItem);

    // questionnaire-choiceOrientation , not supported yet

    // check restrictions
    ns._handleRestrictions(targetItem, qItem);

    // http://hl7.org/fhir/StructureDefinition/entryFormat
    // looks like tooltip, TBD

    // http://hl7.org/fhir/StructureDefinition/questionnaire-unit
    // ns is for a single unit, where is the units list??
    // for user selected unit, not item.units! Not using here
    if (qItem.unit) {
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
        "valueCoding" : {
          "system": "http://unitsofmeasure.org",
          "code": qItem.unit.name
        }
      });
    }

    // add LForms Extension to units list
    if (item.units) {
      ns._handleLFormsUnits(targetItem, item);
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

    var codeSystem = ns._getCodeSystem(item.questionCodeSystem);

    // code
    targetItem.code = [{
      "system": codeSystem,
      "code": item.questionCode,
      "display": item.question
    }];

    // concept, removed in FHIR v3.0.0

    // type
    targetItem.type = ns._handleDataType(item);

    // enableWhen
    if (item.skipLogic) {
      ns._handleSkipLogic(targetItem, item, source)
    }

    // repeats, handled above
    // readonly, (editable)
    if (item.dataType !== "SECTION" && item.dataType !== "TITLE" && item.editable === "0") {
      targetItem.readonly = true;
    }

    // options , a reference to ValueSet resource, not using for now
    // option, for answer list
    if (item.answers) {
      targetItem.option = ns._handleAnswers(item)
    }

    // initialValue, for default values
    if (item.value) {
      ns._handleInitialValues(targetItem, item);
    }
*/

    if (Array.isArray(qItem.item)) {
      targetItem.items = [];
      for (var i=0; i < qItem.item.length; i++) {
        var newItem = ns._processQuestionnaireItem(qItem.item[i], qResource);
        targetItem.items.push(newItem);
      }
    }

    return targetItem;
  };

  function _getDataType (qItem) {
    var ret = 'string';

    switch (qItem.type) {
      case 'group':
        ret = 'SECTION';
        break;

      case 'integer':
        ret = 'INT';
        break;

      case 'decimal':
        ret = 'REAL';
        break;

      case 'text':
        ret = 'TX';
        break;

      case 'string':
        ret = 'ST';
        break;
    }

    return ret;
  }



})(LForms.FHIR_SDC);
