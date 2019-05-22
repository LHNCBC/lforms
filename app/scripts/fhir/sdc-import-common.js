/**
 *  Defines SDC import functions that are the same across the different FHIR
 *  versions.  The function takes SDC namespace object defined in the sdc export
 *  code, and adds additional functions to it.
 */
function addCommonSDCImportFns(ns) {
"use strict";

  var self = ns;

  // FHIR extension urls
  self.fhirExtUrlCardinalityMin = "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs";
  self.fhirExtUrlCardinalityMax = "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs";
  self.fhirExtUrlItemControl = "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl";
  self.fhirExtUrlUnit = "http://hl7.org/fhir/StructureDefinition/questionnaire-unit";
  self.fhirExtUrlUnitOption = "http://hl7.org/fhir/StructureDefinition/questionnaire-unitOption";
  self.fhirExtUrlCodingInstructions = "http://hl7.org/fhir/StructureDefinition/questionnaire-displayCategory";
  self.fhirExtUrlOptionPrefix = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix";
  self.fhirExtVariable = "http://hl7.org/fhir/StructureDefinition/variable";
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
  
  self.formLevelFields = [
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
    'title',
    'name',
    'identifier',
    'code',  // code in FHIR clashes with previous definition in lforms. It needs special handling.
    'subjectType',
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
      var containedVS = self._extractContainedVS(fhirData);

      if(fhirData.item && fhirData.item.length > 0) {
        var linkIdItemMap = self._createLinkIdItemMap(fhirData);
        target.items = [];
        for( var i = 0; i < fhirData.item.length; i++) {
          var item = self._processQuestionnaireItem(fhirData.item[i], containedVS, linkIdItemMap);
          target.items.push(item);
        }
      }
      target.fhirVersion = self.fhirVersion;
    }

    return target;
  };


  /**
   *  Returns the number of sinificant digits in the number after, ignoring
   *  trailing zeros.  (I am including this on "self" so we can have tests for it.)
   */
  self._significantDigits = function(x) {
    // Based on https://stackoverflow.com/a/9539746/360782
    // Make sure it is a number and use the builtin number -> string.
    var s = "" + (+x);
    // The following RegExp include the exponent, which we don't need
    //var match = /(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(s);
    var match = /(\d+)(?:\.(\d+))?/.exec(s);
    // NaN or Infinity or integer.
    // We arbitrarily decide that Infinity is integral.
    if (!match) { return 0; }
    var wholeNum = match[1];
    var fraction = match[2];
    //var exponent = match[3];
    return wholeNum === '0' ? 0 : wholeNum.length + (fraction ? fraction.length : 0);
  }


  /**
   *  Imports an observation's values into the given LForms item.
   * @param lfItem the LForms item to which a value will be assigned.
   * @param obs the observation whose value will be assigned to lfItem.  It
   *  assumed that obs has an appropriate data type for its value.
   */
  self.importObsValue = function(lfItem, obs) {
    // Get the value from obs, based on lfItem's data type.  (The altertnative
    // seems to be looping through the keys on obs looking for something that
    // starts with "value".
    var val = null;
    var lfDataType = lfItem.dataType;
    var fhirValType = this._lformsTypesToFHIRFields[lfDataType];
    if (fhirValType)
      val = obs['value'+fhirValType];
    if (!val && (lfDataType === 'REAL' || lfDataType === 'INT')) {
      // Accept initial value of type Quantity for these types.
      val = obs.valueQuantity;
      if (val)
        val._type = 'Quantity'
    }
    if (val) {
      if (!val._type && typeof val === 'object')
        val._type = fhirValType;

      // Before importing, confirm val contains a valid unit from the
      // item's unit list.
      var unitOkay = true;
      if (val._type === 'Quantity') {
        if (lfItem.units) {
          var matchingUnit;
          var valSystem = val.system;
          // On SMART sandbox, val.system might have a trailing slash (which is wrong, at least
          // for UCUM).  For now, just remove it.
          if (valSystem[valSystem.length - 1] === '/')
            valSystem = valSystem.slice(0, -1);
          var isUCUMUnit = valSystem === self.UCUM_URI;
          var ucumUnit;
          for (var i=0, len=lfItem.units.length; i<len && !matchingUnit; ++i) {
            var lfUnit = lfItem.units[i];
            if (lfUnit.system && (lfUnit.system===valSystem && lfUnit.code===val.code) ||
                !lfUnit.system && (lfUnit.name===val.unit)) {
              matchingUnit = lfUnit;
            }
            if (isUCUMUnit && !matchingUnit && !ucumUnit && lfUnit.system === self.UCUM_URI)
              ucumUnit = lfUnit;
          }
          if (!matchingUnit && ucumUnit) {
            // See if we can convert to the ucumUnit we found
            var result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(val.code, val.value, ucumUnit.code);
            if (result.status === 'succeeded') {
              matchingUnit = ucumUnit;
              // Round the result to the same number of significant digits as the
              // input value.
              var originalSD = this._significantDigits(val.value);
              if (originalSD > 0)
                val.value = Number.parseFloat(result.toVal.toPrecision(originalSD));
              else
                val.value = result.toVal;
              val.code = ucumUnit.code;
            }
          }
          if (!matchingUnit)
            unitOkay = false;
        }
      }
      if (unitOkay) {
        lfItem.unit = matchingUnit;
        this._processFHIRValues(lfItem, [val]);
      }
    }
  };


  /**
   *   Assigns FHIR values to an LForms item.
   *  @param lfItem the LForms item to receive the values from fhirVals
   *  @param fhirVals an array of FHIR values (e.g.  Quantity, Coding, string, etc.).
   *   Complex types like Quantity should have _type set to the type.
   *  @param setDefault if true, the default value in lfItem will be set instead
   *   of the value.
   */
  self._processFHIRValues = function(lfItem, fhirVals, setDefault) {
    var lfDataType = lfItem.dataType;
    var isMultiple = lfItem.answerCardinality && lfItem.answerCardinality.max === '*';
    var answers = [];
    for (let i=0, len=fhirVals.length; i<len; ++i) {
      let fhirVal = fhirVals[i];
      var answer = null;
      if (lfDataType === 'CWE' || lfDataType === 'CNE' ) {
        answer = {};
        if(fhirVal.code !== undefined) answer.code = fhirVal.code;
        if(fhirVal.display !== undefined) answer.text = fhirVal.display;
      }
      else if(fhirVal._type === 'Quantity' && (lfDataType === 'QTY' ||
          lfDataType === 'REAL' || lfDataType === 'INT')) {
        if (fhirVal.value !== undefined) {
          answer = fhirVal.value; // Associated unit is parsed in _processUnitLists
        }
      }
      else {
        answer = fhirVal;
      }
      answers.push(answer);
    }
    if (isMultiple) {
      if (setDefault)
        lfItem.defaultAnswer = answers;
      else
        lfItem.value = answers;
    }
    else { // there should just be one answer
      if (setDefault)
        lfItem.defaultAnswer = answers[0];
      else
        lfItem.value = answers[0];
    }
  };


  /**
   * Get a FHIR value from an object given a partial string of hash key.
   * Use it where at most only one key matches.
   *
   * @param obj {object} - Object to search
   * @param keyRegex {regex} - Regular expression to match a key.  This should
   *  be the beginning part of the key up to the type (e.g., /^value/, to match
   *  "valueQuantity").
   * @returns {*} - Corresponding value of matching key.  For complex types,
   *  such as Quantity, the type of the returned object will be present under
   *  a _type attribute.
   * @private
   */
  self._getFHIRValueWithPrefixKey = function(obj, keyRegex) {
    var ret = null;
    if(typeof obj === 'object') {
      for(var key in obj) {
        var matchData = key.match(keyRegex);
        if (matchData) {
          ret = obj[key];
          if (typeof ret === 'object')
            ret._type = key.substring(matchData[0].length);
          break;
        }
      }
    }

    return ret;
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
        case 'Lookup': // backward-compatibility with old export
        case 'Combo-box': // backward-compatibility with old export
        case 'autocomplete':
        case 'drop-down':
          displayControl.answerLayout = {type: 'COMBO_BOX'};
          break;
        case 'Checkbox': // backward-compatibility with old export
        case 'check-box':
        case 'Radio': // backward-compatibility with old export
        case 'radio-button':
          displayControl.answerLayout = {type: 'RADIO_CHECKBOX'};
          break;
        case 'Table': // backward-compatibility with old export
        case 'gtable':  // Not in STU3, but we'll accept it
          if(lfItem.dataType === 'SECTION') {
            displayControl.questionLayout = "horizontal";
          }
          break;
        case 'Matrix': // backward-compatibility with old export
        case 'table':
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


  // QuestionnaireResponse Import
  var qrImport = self._mergeQR;

  /**
   * Merge a QuestionnaireResponse instance into an LForms form object
   * @param formData an LForms form definition or LFormsData object.
   * @param qr a QuestionnaireResponse instance
   * @returns {{}} an updated LForms form definition, with answer data
   */
  qrImport.mergeQuestionnaireResponseToLForms = function(formData, qr) {
    // get the default settings in case they are missing in the form data
    var newFormData = (new LForms.LFormsData(formData)).getFormData();
    // The reference to _mergeQR below is here because this function gets copied to
    // the containing object to be a part of the public API.
    var qrInfo = qrImport._getQRStructure(qr);
    qrImport._processQRItemAndLFormsItem(qrInfo, newFormData);
    return newFormData;
  };


  /**
   * Merge data into items on the same level
   * @param parentQRItemInfo structural information of a parent item
   * @param parentLFormsItem a parent item, could be a LForms form object or a form item object.
   * @private
   */
  qrImport._processQRItemAndLFormsItem = function(parentQRItemInfo, parentLFormsItem) {

    // note: parentQRItemInfo.qrItemInfo.length will increase when new data is inserted into the array
    for(var i=0; i<parentQRItemInfo.qrItemsInfo.length; i++) {

      var qrItemInfo = parentQRItemInfo.qrItemsInfo[i];
      var qrItem = qrItemInfo.item;
      if (qrItem) {
        // first repeating qrItem
        if (qrItemInfo.total > 1 && qrItemInfo.index === 0) {
          var defItem = this._findTheMatchingItemByLinkId(parentLFormsItem, qrItemInfo.linkId);
          // add repeating items in form data
          // if it is a case of repeating questions, not repeating answers
          if (ns._questionRepeats(defItem)) {
            this._addRepeatingItems(parentLFormsItem, qrItemInfo.linkId, qrItemInfo.total);
            // add missing qrItemInfo nodes for the newly added repeating LForms items (questions, not sections)
            if (defItem.dataType !== 'SECTION' && defItem.dataType !== 'TITLE') {
              for (var j=1; j<qrItemInfo.total; j++) {
                var newQRItemInfo = angular.copy(qrItemInfo);
                newQRItemInfo.index = j;
                newQRItemInfo.item.answer = [newQRItemInfo.item.answer[j]];
                parentQRItemInfo.qrItemsInfo.splice(i+j, 0, newQRItemInfo);
              }
              // change the first qr item's answer too
              qrItemInfo.item.answer = [qrItemInfo.item.answer[0]]
            }
          }
          // reset the total number of questions when it is the answers that repeats
          else if (ns._answerRepeats(defItem)) {
            qrItemInfo.total = 1;
          }
        }
        // find the matching LForms item
        var item = this._findTheMatchingItemByLinkIdAndIndex(parentLFormsItem, qrItemInfo.linkId, qrItemInfo.index);

        // set up value and units if it is a question
        if ((item.dataType !== 'SECTION' && item.dataType !== 'TITLE')) {
          var qrAnswer = qrItem.answer;
          if (qrAnswer && qrAnswer.length > 0) {
            this._setupItemValueAndUnit(qrItem.linkId, qrAnswer, item);
          }
        }

        // process items on the sub-level
        if (qrItemInfo.qrItemsInfo && qrItemInfo.qrItemsInfo.length>0) {
          this._processQRItemAndLFormsItem(qrItemInfo, item);
        }
      }
    }
  };


  /**
   * Get LForms data type from questionnaire item
   *
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._getDataType = function (qItem) {
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
  };


  /**
   * It is used to identify source item in skip logic. Get code from source item
   * using enableWhen.question text. Use enableWhen.question (_codePath+_idPath),
   * to locate source item with item.linkId.
   *
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @param questionLinkId - This is the linkId in enableWhen.question
   * @returns {string} - Returns code of the source item.
   * @private
   */
  self._getSourceCodeUsingLinkId = function (linkIdItemMap, questionLinkId) {

    var item = linkIdItemMap[questionLinkId];
    var ret = {dataType: self._getDataType(item)};
    if(item.code) {
      ret.questionCode = item.code[0].code;
    }
    else {
      ret.questionCode = item.linkId;
    }

    return ret;
  };

  /**
   * Build a map of items to linkid from a questionnaire resource.
   * @param qResource - FHIR Questionnaire resource
   * @returns {*} - Hash object with link id keys pointing to their respective items.
   * @private
   */
  self._createLinkIdItemMap = function (qResource) {
    var traverse = function (itemArray, collection) {
        itemArray.forEach(function(item) {
          collection[item.linkId] = item;
          if(item.item) {
            traverse(item.item, collection);
          }
        });

      return collection;
    };

    var ret = {};
    if(qResource.item) {
      ret = traverse(qResource.item, ret);
    }
    return ret;
  };
  
  
  /**
   * Get an object with code and code system
   *
   * @param questionnaireItemOrResource {object} - question
   * @private
   */
  self._getCode = function (questionnaireItemOrResource) {
    var code = null;
    if(questionnaireItemOrResource &&
      Array.isArray(questionnaireItemOrResource.code) &&
      questionnaireItemOrResource.code.length) {
      code = {
        code: questionnaireItemOrResource.code[0].code,
        system: self._toLfCodeSystem(questionnaireItemOrResource.code[0].system)
      };
    }
    // If code is missing look for identifier.
    else if(questionnaireItemOrResource &&
      Array.isArray(questionnaireItemOrResource.identifier) &&
      questionnaireItemOrResource.identifier.length) {
      code = {
        code: questionnaireItemOrResource.identifier[0].value,
        system: self._toLfCodeSystem(questionnaireItemOrResource.identifier[0].system)
      };
    }
    
    return code;
  };
  
  
  /**
   * Convert the given code system to LForms internal code system. Currently
   * only converts 'http://loinc.org' to 'LOINC' and returns all other input as is.
   * @param codeSystem
   * @private
   */
  self._toLfCodeSystem = function(codeSystem) {
    var ret = codeSystem;
    switch(codeSystem) {
      case 'http://loinc.org':
        ret = 'LOINC';
        break;
    }
    
    return ret;
  };
  
  
  // Copy the main merge function to preserve the same API usage.
  self.mergeQuestionnaireResponseToLForms = qrImport.mergeQuestionnaireResponseToLForms;
}

export default addCommonSDCImportFns;
