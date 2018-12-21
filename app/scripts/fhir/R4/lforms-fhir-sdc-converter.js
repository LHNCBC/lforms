/**
 * A package to handle conversion from FHIR SDC Questionnaire to LForms
 *
 * It provides the following functions:
 * convertQuestionnaireToLForms()
 * -- Convert FHIR SDC QuestionnaireResponse data into corresponding LForms data
 */
function addSDCImportFns(ns) {
"use strict";

  var self = ns;
  // FHIR extension urls
  self.fhirExtUrlCardinalityMin = "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs";
  self.fhirExtUrlCardinalityMax = "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs";
  self.fhirExtUrlItemControl = "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl";
  self.fhirExtUrlUnit = "http://hl7.org/fhir/StructureDefinition/questionnaire-unit";
  self.fhirExtUrlAllowedUnits = "http://hl7.org/fhir/StructureDefinition/elementdefinition-allowedUnits";
  self.fhirExtUrlCodingInstructions = "http://hl7.org/fhir/StructureDefinition/questionnaire-displayCategory";
  self.fhirExtUrlOptionPrefix = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix";
  self.fhirExtUrlOptionScore = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionScore";
  self.fhirExtUrlRestrictionArray = [
    "http://hl7.org/fhir/StructureDefinition/minValue",
    "http://hl7.org/fhir/StructureDefinition/maxValue",
    "http://hl7.org/fhir/StructureDefinition/minLength",
    "http://hl7.org/fhir/StructureDefinition/regex"
  ];

  self.fhirExtUrlAnswerRepeats = "http://hl7.org/fhir/StructureDefinition/questionnaire-answerRepeats";

  self.fhirExtUrlExternallyDefined = "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined";
  self.argonautExtUrlExtensionScore = "http://fhir.org/guides/argonaut-questionnaire/StructureDefinition/extension-score";

  self.fhirExtUrlHidden = "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden";
  
  self.formLevelIgnoredFields = [
    // Resource
    'id',
    'meta',
    'implicitRules',
    'language',
  
  
    // Domain Resource
    'text',
    'contained',
    'text',
    'contained',
    'extension',
    'modifiedExtension',
  
    // Questionnaire
    'date',
    'version',
    'derivedFrom', // New in R4
    'status',
    'experimental',
    'publisher',
    'contact',
    'description',
    'useContext',
    'jurisdiction',
    'purpose',
    'copyright',
    'approvalDate',
    'reviewDate',
    'effectivePeriod',
    'url'
  ];

  self.itemLevelIgnoredFields = [
    'definition',
    'prefix'
  ];
  
  
  /**
   * Convert FHIR SQC Questionnaire to LForms definition
   *
   * @param fhirData - FHIR Questionnaire object
   * @returns {{}} - LForms json object
   */
  self.convertQuestionnaireToLForms = function (fhirData) {
    var target = null;

    if(fhirData) {
      target = {};
      self._processFormLevelFields(target, fhirData);

      if(fhirData.item && fhirData.item.length > 0) {
        target.items = [];
        for( var i = 0; i < fhirData.item.length; i++) {
          var item = self._processQuestionnaireItem(fhirData.item[i], fhirData);
          target.items.push(item);
        }
      }
      target.fhirVersion = self.fhirVersion;
    }

    return target;
  };


  /**
   * Parse form level fields from FHIR questionnaire and assign to LForms object.
   *
   * @param lfData - LForms object to assign the extracted fields
   * @param questionnaire - FHIR questionnaire resource object to parse for the fields.
   * @private
   */
  self._processFormLevelFields = function(lfData, questionnaire) {
    lfData.name = questionnaire.title;
    var code = _getCode(questionnaire);
    if(code) {
      lfData.code = code.code;
      lfData.codeSystem = code.system;
    }

    self.copyFields(questionnaire, lfData, self.formLevelIgnoredFields);
  };


  self.copyFields = function(source, target, fieldList) {
    if(source && target && fieldList && fieldList.length > 0) {
      fieldList.forEach(function(field) {
        if(source[field] !== undefined ) {
          target[field] = source[field];
        }
      });
    }
  };
  /**
   * Process questionnaire item recursively
   *
   * @param qItem - item object as defined in FHIR Questionnaire.
   * @param qResource - The source object of FHIR  questionnaire resource to which the qItem belongs to.
   * @returns {{}} - Converted 'item' field object as defined by LForms definition.
   * @private
   */
  self._processQuestionnaireItem = function (qItem, qResource) {
    var targetItem = {};
    targetItem.question = qItem.text;
    //A lot of parsing depends on data type. Extract it first.
    self._processDataType(targetItem, qItem);
    self._processCodeAndLinkId(targetItem, qItem);
    self._processDisplayItemCode(targetItem, qItem);
    self._processEditable(targetItem, qItem);
    self._processQuestionCardinality(targetItem, qItem);
    self._processAnswerCardinality(targetItem, qItem);
    self._processDisplayControl(targetItem, qItem);
    self._processRestrictions(targetItem, qItem);
    self._processCodingInstructions(targetItem, qItem);
    self._processHiddenItem(targetItem, qItem);
    self._processUnitList(targetItem, qItem);
    self._processDefaultAnswer(targetItem, qItem);
    self._processExternallyDefined(targetItem, qItem);
    self._processAnswers(targetItem, qItem);
    self._processSkipLogic(targetItem, qItem, qResource);
    self._processCopiedItemExtensions(targetItem, qItem);

    self.copyFields(qItem, targetItem, self.itemLevelIgnoredFields);
    if (Array.isArray(qItem.item)) {
      targetItem.items = [];
      for (var i=0; i < qItem.item.length; i++) {
        var newItem = self._processQuestionnaireItem(qItem.item[i], qResource);
        targetItem.items.push(newItem);
      }
    }

    return targetItem;
  };

  // A map of FHIR extensions involving Expressions to the property names on
  // which they will be stored in LFormsData.
  var expressionExtensions = {
    "http://hl7.org/fhir/StructureDefinition/questionnaire-calculatedExpression":
      "_calculatedExprExt",
    "http://hl7.org/fhir/StructureDefinition/questionnaire-initialExpression":
      "_initialExprExt"
  };

  var expressionExtURLs = Object.keys(expressionExtensions);

  /**
   *  Some extensions are simply copied over to the LForms data structure.
   *  This copies those extensions from qItem to lfItem if they exist, and
   *  LForms can support them.
   * @param qItem an item from the Questionnaire resource
   * @param lfItem an item from the LFormsData structure
   */
  self._processCopiedItemExtensions = function (lfItem, qItem) {
    for (var i=0, len=expressionExtURLs.length; i<len; ++i) {
      var url = expressionExtURLs[i];
      var ext = LForms.Util.findObjectInArray(qItem.extension, 'url', url);
      if (ext && ext.valueExpression && ext.valueExpression.language === "text/fhirpath")
        lfItem[expressionExtensions[url]] = ext;
    }
  };


  /**
   * Parse questionnaire object for answer cardinality
   *
   * @param lfItem {object} - LForms item object to assign answer cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processAnswerCardinality = function (lfItem, qItem) {
    if(qItem.required) {
      lfItem.answerCardinality = {min: '1'};
    }
    else {
      lfItem.answerCardinality = {min: '0'};
    }

    if(_hasMultipleAnswers(qItem)) {
      lfItem.answerCardinality.max = '*';
    }
    else {
      lfItem.answerCardinality.max = '1';
    }
  };


  /**
   * Parse questionnaire object for skip logic information
   *
   * @param lfItem {object} - LForms item object to assign the skip logic
   * @param qItem {object} - Questionnaire item object
   * @param sourceQuestionnaire - Questionnaire resource object. This is to provide top level
   *                              item to navigate the tree for skip logic source items.
   * @private
   */
  self._processSkipLogic = function (lfItem, qItem, sourceQuestionnaire) {
    if(qItem.enableWhen) {
      lfItem.skipLogic = {conditions: [], action: 'show'};
      // See if it satisfies range. Range in lforms is a single condition, in FHIR it is done with two conditions
      var rangeCondition = _potentialRange(qItem, sourceQuestionnaire);
      if(rangeCondition) {
        lfItem.skipLogic.conditions.push(rangeCondition);
      }
      else {
        for(var i = 0; i < qItem.enableWhen.length; i++) {
          var source = null;
          for(var n = 0; !source && n < sourceQuestionnaire.item.length; n++) {
            source = _getSourceCodeUsingLinkId(sourceQuestionnaire.item, qItem.enableWhen[i].question);
          }
          var condition = {source: source.questionCode};
          var answer = _getValueWithPrefixKey(qItem.enableWhen[i], /^answer/);
          if(source.dataType === 'CWE' || source.dataType === 'CNE') {
            condition.trigger = {code: answer.code};
          }
          else {
            var tr = null;
            var opMapping = self._operatorMapping[qItem.enableWhen[i].operator];
            if(opMapping) {
              condition.trigger = {};
              condition.trigger[opMapping] = answer;
            }
          }
          lfItem.skipLogic.conditions.push(condition);
        }
        if(qItem.enableBehavior) {
          lfItem.skipLogic.logic = qItem.enableBehavior.toUpperCase();
        }
      }
    }
  };
  
  
  /**
   * See if the skip logic condition belongs to range. If yes, returns a lforms condition, otherwise null;
   *
   * @param qItem - Questionnaire item
   * @param sourceQuestionnaire - Questionnaire resource to look for skip logic source item.
   * @returns {*} - Lforms skip logic condition object.
   * @private
   */
  function _potentialRange(qItem, sourceQuestionnaire) {
    var ret = null;
    // Two conditions based on same source with enableBehavior of all implies range.
    if(qItem && qItem.enableWhen && qItem.enableWhen.length === 2 && qItem.enableBehavior === 'all' &&
       qItem.enableWhen[0].question === qItem.enableWhen[1].question &&
       (qItem.type === 'decimal' || qItem.type === 'integer' || qItem.type === 'date' || qItem.type === 'dateTime' )) {
      var source = _getSourceCodeUsingLinkId(sourceQuestionnaire.item, qItem.enableWhen[0].question);
      ret = {source: source.questionCode};
      ret.trigger = {};
      var answer0 = _getValueWithPrefixKey(qItem.enableWhen[0], /^answer/);
      var answer1 = _getValueWithPrefixKey(qItem.enableWhen[1], /^answer/);
  
      ret.trigger[self._operatorMapping[qItem.enableWhen[0].operator]] = answer0;
      ret.trigger[self._operatorMapping[qItem.enableWhen[1].operator]] = answer1;
    }
    return ret;
  }
  
  
  /**
   * Parse Questionnaire item for externallyDefined url
   *
   * @param lfItem - LForms item object to assign externallyDefined
   * @param qItem - Questionnaire item object
   * @private
   */
  self._processExternallyDefined = function (lfItem, qItem) {
    var externallyDefined = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlExternallyDefined);
    if (externallyDefined && externallyDefined.valueUri) {
      lfItem.externallyDefined = externallyDefined.valueUri;
    }
  };


  /**
   * Parse questionnaire item for "hidden" extension
   *
   * @param lfItem {object} - LForms item object to be assigned the _isHidden flag if the item is to be hidden.
   * @param qItem {object} - Questionnaire item object
   * @private
   * @return true if the item is hidden or if its ancestor is hidden, false otherwise
   */
  self._processHiddenItem = function(lfItem, qItem) {
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlHidden);
    if(ci) {
      lfItem._isHidden = typeof ci.valueBoolean === 'boolean'? ci.valueBoolean: ci.valueBoolean === 'true';
    }
    return lfItem._isHidden;
  }


  /**
   * Parse questionnaire item for answers list
   *
   * @param lfItem {object} - LForms item object to assign answer list
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processAnswers = function (lfItem, qItem) {
    if(qItem.answerOption) {
      lfItem.answers = [];
      for(var i = 0; i < qItem.answerOption.length; i++) {
        var answer = {};
        var option = qItem.answerOption[i];
        var label = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionPrefix);
        if(label) {
          answer.label = label.valueString;
        }
        var score = LForms.Util.findObjectInArray(option.extension, 'url', self.fhirExtUrlOptionScore);
        // Look for argonaut extension.
        score = !score ? LForms.Util.findObjectInArray(option.extension, 'url', self.argonautExtUrlExtensionScore) : score;
        if(score) {
          answer.score = score.valueDecimal.toString();
        }
        var optionKey = Object.keys(option).filter(function(key) {return (key.indexOf('value') === 0);});
        if(optionKey && optionKey.length > 0) {
          if(optionKey[0] === 'valueCoding') { // Only one value[x] is expected
            if(option[optionKey[0]].code    !== undefined) answer.code = option[optionKey[0]].code;
            if(option[optionKey[0]].display !== undefined) answer.text = option[optionKey[0]].display;
            //Lforms has answer code system at item level, expects all options to have one code system!
            if(option[optionKey[0]].system  !== undefined) lfItem.answerCodeSystem = option[optionKey[0]].system;
          }
          else {
            answer.text = option[optionKey[0]].toString();
          }
        }

        lfItem.answers.push(answer);
      }
    }
  };


  /**
   * Parse questionnaire item for editable
   *
   * @param lfItem {object} - LForms item object to assign editable
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processEditable = function (lfItem, qItem) {
    if (qItem.readOnly) {
      lfItem.editable = '0';
    }
  };


  /**
   * Parse questionnaire item for default answer
   *
   * @param lfItem {object} - LForms item object to assign default answer
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDefaultAnswer = function (lfItem, qItem) {

    if(!qItem.initial) {
      return;
    }
  
    var isMultiple = _hasMultipleAnswers(qItem);
    var defaultAnswer = null;

    qItem.initial.forEach(function(elem) {
      var answer = null;
      var val = _getValueWithPrefixKey(elem, /^value/);

      if (lfItem.dataType === 'CWE' || lfItem.dataType === 'CNE' ) {
        answer = {};
        if(val.code !== undefined) answer.code = val.code;
        if(val.display !== undefined) answer.text = val.display;
      }
      else if(lfItem.dataType === 'QTY') {
        answer = val.value;
        let unit = val.code? val.code: val.unit;
        if (unit) {
          lfItem.unit = {name: unit};
        }
      }
      else {
        answer = val;
      }

      if (isMultiple) {
        if(!defaultAnswer) defaultAnswer = [];
        defaultAnswer.push(answer);
      }
      else {     // single selection
        defaultAnswer = answer;
      }
    });

    lfItem.value = defaultAnswer; // TODO - Is this necessary?
    lfItem.defaultAnswer = defaultAnswer;
  };


  /**
   * Parse questionnaire item for units list
   *
   * @param lfItem {object} - LForms item object to assign units
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processUnitList = function (lfItem, qItem) {
    var units = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlAllowedUnits);
    if(units && units.valueCodeableConcept && Array.isArray(units.valueCodeableConcept.coding)) {
      lfItem.units = [];
      for(var i = 0; i < units.valueCodeableConcept.coding.length; i++) {
        var unit = units.valueCodeableConcept.coding[i];
        lfItem.units.push({name: unit.code});
      }
    }
  };


  /**
   * Parse 'linkId' for the LForms questionCode of a 'display' item, which does not have a 'code'
   *
   * @param lfItem {object} - LForms item object to assign questionCode
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDisplayItemCode = function (lfItem, qItem) {
    if (qItem.type === "display" && qItem.linkId) {
      var codes = qItem.linkId.split("/");
      if (codes && codes[codes.length-1]) {
        lfItem.questionCode = codes[codes.length-1];
      }
    }
  };


  /**
   * Parse questionnaire item for question cardinality
   *
   * @param lfItem {object} - LForms item object to assign question cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processQuestionCardinality = function (lfItem, qItem) {
    var min = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMin);
    if(min) {
      lfItem.questionCardinality = {min: min.valueInteger.toString()};
      var max = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMax);
      if(max) {
        lfItem.questionCardinality.max = min.valueInteger.toString();
      }
      else if(qItem.repeats) {
        lfItem.questionCardinality.max = '*';
      }
    }
    else if (qItem.repeats) {
      lfItem.questionCardinality = {min: "1", max: "*"};
    }
    else if (qItem.required) {
      lfItem.questionCardinality = {min: "1", max: "1"};
    }
  };


  /**
   * Parse questionnaire item for code and code system
   * @param lfItem {object} - LForms item object to assign question code
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processCodeAndLinkId = function (lfItem, qItem) {
    var code = _getCode(qItem);
    if (code) {
      lfItem.questionCode = code.code;
      lfItem.questionCodeSystem = code.system;
    }
    // use linkId as questionCode, which should not be exported as code
    else {
      lfItem.questionCode = qItem.linkId;
      lfItem.questionCodeSystem = "LinkId"
    }

    lfItem.linkId = qItem.linkId;
  };


  /**
   * Get an object with code and code system
   *
   * @param questionnaireItemOrResource {object} - question
   * @private
   */
  function _getCode(questionnaireItemOrResource) {
    var code = null;
    if(questionnaireItemOrResource &&
         Array.isArray(questionnaireItemOrResource.code) &&
         questionnaireItemOrResource.code.length) {
      code = {};
      switch(questionnaireItemOrResource.code[0].system) {
        case 'http://loinc.org':
          code.system = 'LOINC';
          break;
        default:
          code.system = questionnaireItemOrResource.code[0].system;
          break;
      }

      code.code = questionnaireItemOrResource.code[0].code;
    }
    // If code is missing look for identifier.
    else if(questionnaireItemOrResource &&
      Array.isArray(questionnaireItemOrResource.identifier) &&
      questionnaireItemOrResource.identifier.length) {
      code = {};
      switch(questionnaireItemOrResource.identifier[0].system) {
        case 'http://loinc.org':
          code.system = 'LOINC';
          break;
        default:
          code.system = questionnaireItemOrResource.identifier[0].system;
          break;
      }
      code.code = questionnaireItemOrResource.identifier[0].value;
    }

    return code;
  }


  /**
   * Parse questionnaire item for coding instructions
   *
   * @param lfItem {object} - LForms item object to assign coding instructions
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processCodingInstructions = function (lfItem, qItem) {
    var ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCodingInstructions);
    if(ci) {
      lfItem.codingInstructions = ci.valueCodeableConcept.coding[0].display;
      lfItem.codingInstructionsFormat = ci.valueCodeableConcept.coding[0].code;
    }
  };


  /**
   * Parse questionnaire item for restrictions
   *
   * @param lfItem {object} - LForms item object to assign restrictions
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processRestrictions = function (lfItem, qItem) {
    var restrictions = {};
    if(typeof qItem.maxLength !== 'undefined') {
      restrictions['maxLength'] = qItem.maxLength.toString();
    }

    for(var i = 0; i < self.fhirExtUrlRestrictionArray.length; i++) {
      var restriction = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlRestrictionArray[i]);
      var val = _getValueWithPrefixKey(restriction, /^value/);
      if (val) {

        if(restriction.url.match(/minValue$/)) {
          // TODO -
          // There is no distinction between inclusive and exclusive.
          // Lforms looses this information when converting back and forth.
          restrictions['minInclusive'] = val;
        }
        else if(restriction.url.match(/maxValue$/)) {
          restrictions['maxInclusive'] = val;
        }
        else if(restriction.url.match(/minLength$/)) {
          restrictions['minLength'] = val;
        }
        else if(restriction.url.match(/regex$/)) {
          restrictions['pattern'] = val;
        }
      }
    }

    if(!jQuery.isEmptyObject(restrictions)) {
      lfItem.restrictions = restrictions;
    }
  };


  /**
   * Parse questionnaire item for data type
   *
   * @param lfItem {object} - LForms item object to assign data type
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDataType = function (lfItem, qItem) {
    var type = _getDataType(qItem);
    if(type === 'SECTION' || type === 'TITLE') {
      lfItem.header = true;
    }
    lfItem.dataType = type;
  };


  /**
   * Get LForms data type from questionnaire item
   *
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  function _getDataType (qItem) {
    var type = 'string';

    switch (qItem.type) {
      case 'string':
        type = 'ST';
        break;
      case 'group':
        type = 'SECTION';
        break;
      case "choice":
        type = 'CNE';
        break;
      case "open-choice":
        type = 'CWE';
        break;
      case 'integer':
        type = 'INT';
        break;
      case 'decimal':
        type = 'REAL';
        break;
      case 'text':
        type = 'TX';
        break;
      case "boolean":
        type = 'BL';
        break;
      case "dateTime":
        //dataType = 'date';
        type = 'DT';
        break;
      case "time":
        type = 'TM';
        break;
      case "display":
        type = 'TITLE';
        break;
      case "url":
        type = 'URL';
        break;
      case "quantity":
        type = 'QTY';
        break;
    }
    return type;
  }


  /**
   * Parse questionnaire item for display control
   *
   * @param lfItem {object} - LForms item object to assign display control
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDisplayControl = function (lfItem, qItem) {
    var itemControlType = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlItemControl);

    if(itemControlType) {
      var displayControl = {};
      switch (itemControlType.valueCodeableConcept.coding[0].code) {
        case 'Lookup':
          // TODO -
          // Implies externallyDefined, but the URL is not saved in fhir resource.
          // Perhaps it could be save in itemControlType.valueCodableConcept.text ...
          // lfItem.externallyDefined = itemControlType.valueCodableConcept.text;
          break;
        case 'Combo-box':
          displayControl.answerLayout = {type: 'COMBO_BOX'};
          break;
        case 'Checkbox':
        case 'Radio':
          displayControl.answerLayout = {type: 'RADIO_CHECKBOX'};
          break;
        case 'Table':
          if(lfItem.dataType === 'SECTION') {
            displayControl.questionLayout = "horizontal";
          }
          break;
        case 'Matrix':
          if(lfItem.dataType === 'SECTION') {
            displayControl.questionLayout = "matrix";
          }
          break;
        default:
          displayControl = null;
      }

      if(displayControl && !jQuery.isEmptyObject(displayControl)) {
        lfItem.displayControl = displayControl;
      }
    }
  };


  /**
   * Get value from an object given a partial string of hash key.
   * Use it where at most only one key matches.
   *
   * @param obj {object} - Object to search
   * @param keyRegex {regex} - Regular expression to match a key
   * @returns {*} - Corresponding value of matching key.
   * @private
   */
  function _getValueWithPrefixKey(obj, keyRegex) {
    var ret = null;
    if(typeof obj === 'object') {
      for(var key in obj) {
        if(key.match(keyRegex)) {
          ret = obj[key];
          break;
        }
      }
    }

    return ret;
  }


  /**
   * It is used to identify source item in skip logic. Get code from source item
   * using enableWhen.question text. Use enableWhen.question (_codePath+_idPath),
   * to locate source item with item.linkId.
   *
   * @param topLevelItem - Top level item object to traverse the path searching for
   * enableWhen.question text in linkId .
   * @param questionLinkId - This is the linkId in enableWhen.question
   * @returns {string} - Returns code of the source item.
   * @private
   */
  function _getSourceCodeUsingLinkId(topLevelItems, questionLinkId) {
    var ret = null;
    if(topLevelItems) {
      for(var i = 0; !ret && i < topLevelItems.length; i++) {
        var item = topLevelItems[i];
        if(item.linkId === questionLinkId) {
          if (item.code) {
            ret = {
              questionCode: item.code[0].code,
              dataType: _getDataType(item)
            };
          }
          else {
            ret = {
              questionCode: item.linkId,
              dataType: _getDataType(item)
            };
          }
          break;
        }
        else {
          ret = _getSourceCodeUsingLinkId(topLevelItems[i].item, questionLinkId);
        }
      }
    }
    
    return ret;
  }
  
  function _hasMultipleAnswers(qItem) {
    var ret = false;
    if(qItem) {
      var answerRepeats = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlAnswerRepeats);
      if(answerRepeats && answerRepeats.valueBoolean) {
        ret = true;
      }
    }
    return ret;
  }

}

export default addSDCImportFns;
