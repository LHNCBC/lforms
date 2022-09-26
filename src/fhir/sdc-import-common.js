import {importFHIRQuantity} from './import-common.js'

// TBD import this path function from fhirpath.js.  When that is done, also
// remove the regex test for /Quantity$/ below and replace it with a simple
// equality check for a path of 'Quantity'.
/**
 *  For a given result of a fhirpath.js evaluation, returns the path from the
 *  nearest FHIR type to the result which might be a fragement of that type.
 *  (Example:  Questionnaire.item, given a result consisting of items.)
 */
function path(fhirpathRes) {
  return fhirpathRes.__path__;
}


/**
 *  Defines SDC import functions that are the same across the different FHIR
 *  versions.  The function takes SDC namespace object defined in the sdc export
 *  code, and adds additional functions to it.
 */
function addCommonSDCImportFns(ns) {
"use strict";

  var self = ns;

  var errorMessages = LForms.Util._internalUtil.errorMessages;

  // FHIR extension urls
  self.fhirExtUrlCardinalityMin = "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs";
  self.fhirExtUrlCardinalityMax = "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs";
  self.fhirExtUrlItemControl = "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl";
  self.fhirExtUrlUnit = "http://hl7.org/fhir/StructureDefinition/questionnaire-unit";
  self.fhirExtUrlUnitOption = "http://hl7.org/fhir/StructureDefinition/questionnaire-unitOption";
  self.fhirExtUrlOptionPrefix = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix";
  self.fhirExtVariable = "http://hl7.org/fhir/StructureDefinition/variable";
  self.fhirExtUrlMinValue = "http://hl7.org/fhir/StructureDefinition/minValue";
  self.fhirExtUrlMaxValue = "http://hl7.org/fhir/StructureDefinition/maxValue";
  self.fhirExtUrlMinLength = "http://hl7.org/fhir/StructureDefinition/minLength";
  self.fhirExtUrlRegex = "http://hl7.org/fhir/StructureDefinition/regex";
  self.fhirExtUrlAnswerRepeats = "http://hl7.org/fhir/StructureDefinition/questionnaire-answerRepeats";
  self.fhirExtUrlExternallyDefined = "http://lhcforms.nlm.nih.gov/fhir/StructureDefinition/questionnaire-externallydefined";
  self.argonautExtUrlExtensionScore = "http://fhir.org/guides/argonaut-questionnaire/StructureDefinition/extension-score";
  self.fhirExtUrlHidden = "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden";
  self.fhirExtTerminologyServer = "http://hl7.org/fhir/StructureDefinition/terminology-server";
  self.fhirExtUrlDataControl = "http://lhcforms.nlm.nih.gov/fhirExt/dataControl";
  self.fhirExtCalculatedExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression";
  self.fhirExtInitialExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression";
  self.fhirExtObsLinkPeriod = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod";
  self.fhirExtObsExtract = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract';
  self.fhirExtAnswerExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-answerExpression";
  self.fhirExtEnableWhenExp = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression";
  self.fhirExtChoiceOrientation = "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation";
  self.fhirExtLaunchContext = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext";
  self.fhirExtMaxSize = "http://hl7.org/fhir/StructureDefinition/maxSize";
  self.fhirExtMimeType = "http://hl7.org/fhir/StructureDefinition/mimeType";
  self.fhirExtUnitOpen = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-unitOpen";
  self.fhirExtUnitSuppSystem = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-unitSupplementalSystem";
  self.fhirExtEntryFormat = "http://hl7.org/fhir/StructureDefinition/entryFormat";

  self.fhirExtUrlRestrictionArray = [
    self.fhirExtUrlMinValue,
    self.fhirExtUrlMaxValue,
    self.fhirExtUrlMinLength,
    self.fhirExtUrlRegex
  ];

  // One way or the other, the following extensions are converted to lforms internal fields.
  // Any extensions not listed here (there are many) are recognized as lforms extensions as they are.
  self.handledExtensionSet = new Set([
    self.fhirExtUrlCardinalityMin,
    self.fhirExtUrlCardinalityMax,
    self.fhirExtUrlItemControl,
    self.fhirExtUrlUnit,
    self.fhirExtUrlUnitOption,
    self.fhirExtUrlOptionPrefix,
    self.fhirExtUrlMinValue,
    self.fhirExtUrlMaxValue,
    self.fhirExtUrlMinLength,
    self.fhirExtUrlRegex,
    self.fhirExtUrlAnswerRepeats,
    self.fhirExtUrlExternallyDefined,
    self.argonautExtUrlExtensionScore,
    self.fhirExtUrlHidden,
    self.fhirExtTerminologyServer,
    self.fhirExtUrlDataControl,
    self.fhirExtChoiceOrientation
  ]);

  // Simple functions for mapping extensions to properties in the internal structure.
  // Parameters:
  //   extension: the FHIR extension object
  //   item:  The LForms item to be updated
  // Returns:  true if the extension should still be added to the LForms item
  //   extension array, and false/undefined otherwise.
  //
  self.extensionHandlers = {};
  self.extensionHandlers[self.fhirExtMaxSize] = function(extension, item) {
    item.maxAttachmentSize = extension.valueDecimal || extension.valueInteger; // not sure why it is decimal
  };
  self.extensionHandlers[self.fhirExtMimeType] = function(extension, item) {
    item.allowedAttachmentTypes || (item.allowedAttachmentTypes = []);
    item.allowedAttachmentTypes.push(extension.valueCode);
  };
  self.extensionHandlers[
    "http://hl7.org/fhir/StructureDefinition/questionnaire-initialExpression"] = function(extension, item) {
    // Update the URI to the current one.
    extension.url = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression';
    return true; // add extension to LForms item
  };
  self.extensionHandlers[self.fhirExtUnitOpen] = function(extension, item) {
    item._unitOpen = extension.valueCode;
  }
  self.extensionHandlers[self.fhirExtUnitSuppSystem] = function(extension, item) {
    item._unitSuppSystem = extension.valueCanonical;
  }

  self.extensionHandlers[self.fhirExtUrlExternallyDefined] =  // (also handle old URL below)
  self.extensionHandlers["http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined"] =
  function(extension, item) {
    if (extension.valueUri) {
      item.externallyDefined = extension.valueUri;
    }
  }

  self.extensionHandlers[self.fhirExtEntryFormat] = function (extension, item) {
    if (extension.valueString) {
      item._entryFormat = extension.valueString;
      return true; // add extension to LForms item
    }    
  }

  self.formLevelFields = [
    // Resource
    'id',
    'meta',
    'implicitRules',
    'language',


    // Domain Resource
    'text',
    'contained',
    'extension',
    'modifiedExtension',

    // Questionnaire
    'date',
    'version',
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
    'definition'
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
      target = LForms.Util.baseFormDef();
      self._processFormLevelFields(target, fhirData);
      var containedVS = self._extractContainedVS(fhirData);

      if(fhirData.item && fhirData.item.length > 0) {
        var linkIdItemMap = self._createLinkIdItemMap(fhirData);
        target.items = [];
        for( var i = 0; i < fhirData.item.length; i++) {
          var item = self._processQuestionnaireItem(fhirData.item[i], containedVS, linkIdItemMap);
          // no instructions on the questionnaire level
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
    self.copyFields(questionnaire, lfData, self.formLevelFields);

    // Handle title and name.  In LForms, "name" is the "title", but FHIR
    // defines both.
    lfData.shortName = questionnaire.name; // computer friendly
    lfData.name = questionnaire.title;

    // Handle extensions on title
    if (questionnaire._title)
      lfData.obj_title = questionnaire._title;

    // For backward compatibility, we keep lforms.code as it is, and use lforms.codeList
    // for storing questionnaire.code. While exporting, merge lforms.code and lforms.codeList
    // into questionnaire.code. While importing, convert first of questionnaire.code
    // as lforms.code, and copy questionnaire.code to lforms.codeList.
    if(questionnaire.code) {
      // Rename questionnaire code to codeList
      lfData.codeList = questionnaire.code;
    }
    var codeAndSystemObj = self._getCode(questionnaire);
    if(codeAndSystemObj) {
      lfData.code = codeAndSystemObj.code;
      lfData.codeSystem = codeAndSystemObj.system;
    }
  };


  /**
   * Process questionnaire item recursively
   *
   * @param qItem - item object as defined in FHIR Questionnaire.
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @returns {{}} - Converted 'item' field object as defined by LForms definition.
   * @private
   */
  self._processQuestionnaireItem = function (qItem, containedVS, linkIdItemMap) {

    var targetItem = {};
    //A lot of parsing depends on data type. Extract it first.
    self._processExtensions(targetItem, qItem);
    self._processDataType(targetItem, qItem);
    self._processTextAndPrefix(targetItem, qItem);
    self._processCodeAndLinkId(targetItem, qItem);
    self._processDisplayItemCode(targetItem, qItem);
    self._processEditable(targetItem, qItem);
    self._processFHIRQuestionAndAnswerCardinality(targetItem, qItem);
    self._processDisplayControl(targetItem, qItem);
    self._processDataControl(targetItem, qItem);
    self._processRestrictions(targetItem, qItem);
    self._processHiddenItem(targetItem, qItem);
    self._processUnitList(targetItem, qItem);
    self._processAnswers(targetItem, qItem, containedVS);
    self._processDefaultAnswer(targetItem, qItem);
    self._processTerminologyServer(targetItem, qItem);
    self._processSkipLogic(targetItem, qItem, linkIdItemMap);
    self.copyFields(qItem, targetItem, self.itemLevelIgnoredFields);
    self._processChildItems(targetItem, qItem, containedVS, linkIdItemMap);

    return targetItem;
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
  };


  /**
   *  Imports an observation's values into the given LForms item.
   * @param lfItem the LForms item to which a value will be assigned.
   * @param obs the observation whose value will be assigned to lfItem.  It
   *  assumed that obs has an appropriate data type for its value.
   */
  self.importObsValue = function(lfItem, obs) {
    // Get the value from obs, based on lfItem's data type.  (The alternative
    // seems to be looping through the keys on obs looking for something that
    // starts with "value".
    var val = null;
    var lfDataType = lfItem.dataType;
    var fhirValType = this._lformsTypesToFHIRFields[lfDataType];
    // fhirValType is now the FHIR data type for a Questionnaire.  However,
    // where Questionnaire uses Coding, Observation uses CodeableConcept.
    if (fhirValType === 'Coding')
      fhirValType = 'CodeableConcept';
    if (fhirValType)
      val = obs['value'+fhirValType];
    if (!val && (lfDataType === 'REAL' || lfDataType === 'INT')) {
      // Accept initial value of type Quantity for these types.
      val = obs.valueQuantity;
      if (val)
        val._type = 'Quantity';
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
          if (valSystem && valSystem[valSystem.length - 1] === '/')
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
                val.value = parseFloat(result.toVal.toPrecision(originalSD));
              else
                val.value = result.toVal;
              val.code = ucumUnit.code;
              val.unit = ucumUnit.name || ucumUnit.code; // name can be undefined
            }
          }
          if (!matchingUnit)
            unitOkay = false;
          else
            lfItem.unit = matchingUnit;
        }
      }
      if (unitOkay) {
        this._processFHIRValues(lfItem, [val]);
      }
    }
  };


  /**
   *   Converts FHIR values to an LForms item values, but does not assign the
   *   values to the item.  (For a function that assigns values, call _processFHIRValues).
   *  @param lfItem the LForms item to for which these are new values
   *  @param fhirVals an array of FHIR values (e.g.  Quantity, Coding, string, etc.).
   *   Complex types like Quantity should have _type set to the type, if
   *   possible, or an attempt will be made to guess the FHIR type from the
   *   lfItem's data type.
   *  @param forDefault if true, the intented target of the values is the item's
   *   default value instead of the item value.
   *  @return an array of the processed/converted values, and an array of any error/warning/info
   *   messages for each of those messages.  For each item in the messages
   *   array, if there is a message there will be an object with keys "errors",
   *   "warnings", and "info" (if those exist), the values of which will will be
   *   an object with message ID keys (from error-messages.js) and message text
   *   values in the currently selected language.  Regarding the answers, note
   *   that Quantities will be returned as is, because those go into more than
   *   one field on the item, but some error checking will be done for them.
   */
  self._convertFHIRValues = function(lfItem, fhirVals, forDefault) {
    // Note that this is used by the import process, and so lfItem is an item
    // from the lforms definition object in that case, not an item from LFormsData.
    // On the other hand, it is also used by the ExpressionProcessor, an in that
    // case lfItem is an item from LFormsData.
    var lfDataType = lfItem.dataType;
    var answers = [];
    const messages = [];
    const fhirValPath = path(fhirVals); // TBD - should be on each value, as they might vary
    for (let i=0, len=fhirVals.length; i<len; ++i) {
      let fhirVal = fhirVals[i];
      if (typeof fhirVal == 'object')
        fhirVal.__path__ = fhirValPath; // TBD - work around for getting path on individual nodes
      var answer = undefined; // reset back to undefined each iteration
      let errors = {};
      let hasMessages = false;
      if (lfDataType === 'CWE' || lfDataType === 'CNE' ) {
        var codings = null;
        if (fhirVal._type === 'CodeableConcept') {
          codings = fhirVal.coding;
        }
        else if (fhirVal._type === 'Coding' || typeof fhirVal === 'object') {
          codings = [fhirVal];
        }
        if (!codings) {
          // the value or the default value could be a string for 'open-choice'/CWE
          if (lfDataType === 'CWE') {
            answer = fhirVal;
          }
        }
        else {
          // Pick a Coding that is appropriate for this list item.
          // Note:  It could be an off list Coding.
          if (lfItem.answers) {
            var itemAnswers = lfItem.answers;
            for (var k=0, kLen=codings.length; k<kLen && !answer; ++k) {
              var coding = codings[k];
              for (var j=0, jLen=itemAnswers.length; j<jLen && !answer; ++j) {
                var listAnswer = itemAnswers[j];
                var listAnswerSystem = listAnswer.system ? LForms.Util.getCodeSystem(listAnswer.system) : null;
                if ((!coding.system && !listAnswerSystem || coding.system === listAnswerSystem) &&
                    ((coding.hasOwnProperty('code') && listAnswer.hasOwnProperty('code') &&
                      coding.code===listAnswer.code) ||
                     (coding.hasOwnProperty('display') && listAnswer.hasOwnProperty('text') &&
                      coding.display === listAnswer.text))) {
                  answer = itemAnswers[j]; // include label in answer text
                }
              }
            }
          }
          if (!answer && lfDataType === 'CWE') { // no match in the list.
            answer = self._processCWECNEValueInQR({valueCoding: fhirVal}, lfItem, true);
          }
        }
      }
      else if((lfDataType === 'QTY' || lfDataType === 'REAL' || lfDataType === 'INT') &&
              (fhirVal._type === 'Quantity' || /Quantity$/.test(path(fhirVal)))) {
        delete fhirVal.__path__;
        fhirVal._type = 'Quantity';
        [answer, errors] = this._convertFHIRQuantity(lfItem, fhirVal);
        hasMessages = !!errors;
      }
      // For date types, convert them to date objects, but only for values.
      // If we're setting defaultAnswer, leave them as strings.
      else if (!forDefault && lfItem.dataType === 'DTM' && typeof fhirVal === 'string')
        answer = new Date(fhirVal);
      else if (!forDefault && lfItem.dataType === 'DT' && typeof fhirVal === 'string')
        answer = LForms.Util.stringToDTDateISO(fhirVal);
      else {
        answer = fhirVal;
      }
      answers.push(answer);
      messages.push(hasMessages ? {errors} : null);
    }
    return [answers, messages];
  };


  /**
   *  Checks a FHIR Quantity for suitability for the given lfItem, converts
   *  its units as necessary, and sets error messages.
   * @param lfItem the LForms item to for which these are new values
   * @param quantity the FHIR Quantity value for the item
   * @return an array of two elements:  the processed/converted value (possibly
   *  null if there were an error), and an error/warning/info messages object
   *  (see _convertFHIRValues for the format) if there were messages.  In the
   *  case of an error, the converted value will be undefined.  Otherwise, the
   *  converted value will have fields for item.unit plus a 'value' field for
   *  the value.
   */
  self._convertFHIRQuantity = function(lfItem, quantity, forDefault) {
    let answer, errors;
    if (quantity.comparator !== undefined) {
      errors = {};
      errorMessages.addMsg(errors, 'comparatorInQuantity');
    }
    else {
      // The unit must match one of the provided units list, or be convertible
      // to such, unless the extensions unitOpen and unitSupplementalSystem are
      // specified. (These are R5 features, but we are including support for any
      // version.)

      if (!lfItem.units) {
        // In this case the quantity should not have a unit.
        if (quantity.unit) {
          errorMessages.addMsg(errors, 'nonMatchingQuantityUnit');
        }
        else
          answer = importFHIRQuantity(quantity);
      }
      else {
        // Try to find a matching unit
        var matchingUnit;
        var valSystem = quantity.system;
        // On SMART sandbox, quantity.system might have a trailing slash (which is wrong, at least
        // for UCUM).  For now, just remove it.
        if (valSystem && valSystem[valSystem.length - 1] === '/')
          valSystem = valSystem.slice(0, -1);
        var isUCUMUnit = valSystem === self.UCUM_URI;
        var ucumUnit;
        for (var i=0, len=lfItem.units.length; i<len && !matchingUnit; ++i) {
          var lfUnit = lfItem.units[i];
          if (lfUnit.system && (lfUnit.system===valSystem && lfUnit.code===quantity.code) ||
              !lfUnit.system && (lfUnit.name===quantity.unit)) {
            matchingUnit = lfUnit;
          }
          if (isUCUMUnit && !matchingUnit && !ucumUnit && lfUnit.system === self.UCUM_URI)
            ucumUnit = lfUnit;
        }
        quantity = LForms.Util.deepCopy(quantity); // so we don't change the input argument
        if (!matchingUnit && ucumUnit) {
          // See if we can convert to the ucumUnit we found
          var result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(
            quantity.code, quantity.value, ucumUnit.code);
          if (result.status === 'succeeded') {
            matchingUnit = ucumUnit;
            // Round the result to the same number of significant digits as the
            // input value.
            var originalSD = this._significantDigits(quantity.value);
            if (originalSD > 0)
              quantity.value = parseFloat(result.toVal.toPrecision(originalSD));
            else
              quantity.value = result.toVal;
            quantity.code = ucumUnit.code;
            quantity.unit = ucumUnit.name || ucumUnit.code; // name can be undefined
          }
        }
        if (!matchingUnit) {
          if (lfItem._unitOpen == 'optionsOrString') {
            // Then accept the nonmatching unit, but only as a string
            delete quantity.code;
            delete quantity.system;
          }
          else if (!(lfItem._unitSuppSystem && lfItem._unitOpen == 'optionsOrType' &&
                   lfItem._unitSuppSystem == quantity.system)) {
            errors = {};
            errorMessages.addMsg(errors, 'nonMatchingQuantityUnit');
          }
        }
      }
      if (!errors) {
        answer = importFHIRQuantity(quantity);
      }
    }

    return [answer, errors];
  };


  /**
   *   Assigns FHIR values to an LForms item.
   *  @param lfItem the LForms item to receive the values from fhirVals
   *  @param fhirVals an array of FHIR values (e.g.  Quantity, Coding, string, etc.).
   *   Complex types like Quantity should have _type set to the type, if
   *   possible, or an attempt will be made to guess the FHIR type from the
   *   lfItem's data type.
   *  @param setDefault if true, the default value in lfItem will be set instead
   *   of the value.
   */
  self._processFHIRValues = function(lfItem, fhirVals, setDefault) {
    // Currently this is called for:
    //   - importing an Observation value (prepop) (a single value, but could
    //     have components referred to by child items)
    //   - processing default answers during an import.  For default answers, we
    //     do not assign the value here, but just put it in defaultAnswer.
    // Note that when importing, we are creating a LForms form definition, but
    // not and LFormsData object.
    let [answers, messages] = this._convertFHIRValues(lfItem, fhirVals, setDefault);
    let val = LForms.Util._hasMultipleAnswers(lfItem) ? answers : answers[0];
    if (setDefault) {
      lfItem.defaultAnswer = val;
      LForms.Util._internalUtil.setItemMessagesArray(lfItem, messages, 'default answers');
    }
    else {
      LForms.Util._internalUtil.assignValueToItem(lfItem, val);
      LForms.Util._internalUtil.setItemMessagesArray(lfItem, messages, '_processFHIRValues');
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
          if (ret && typeof ret === 'object') {
            ret = LForms.Util.deepCopy(ret); // Work with clone
            ret._type = key.substring(matchData[0].length);
          }
          break;
        }
      }
    }

    return ret;
  };


  /**
   *  Process the text and prefix data.
   * @param lfItem {object} - LForms item object to receive the data
   * @param qItem {object} - Questionnaire item object (as the source)
   */
  self._processTextAndPrefix = function(lfItem, qItem) {
    // prefix
    if (qItem.prefix)
      lfItem.prefix = qItem.prefix;
    // text
    lfItem.question = qItem.text;

    // Copy item extensions
    for (let extField of ['_prefix', '_text']) {
      let extFieldData = qItem[extField];
      if (extFieldData)
        lfItem['obj'+extField] = extFieldData;
    }
  };


  /**
   * Parse questionnaire item for code and code system
   * @param lfItem {object} - LForms item object to assign question code
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processCodeAndLinkId = function (lfItem, qItem) {
    if(qItem.code) {
      lfItem.codeList = qItem.code;
    }
    var code = self._getCode(qItem);
    if (code) {
      lfItem.questionCode = code.code;
      lfItem.questionCodeSystem = code.system;
    }
    // use linkId as questionCode, which should not be exported as code
    else {
      lfItem.questionCode = qItem.linkId;
      lfItem.questionCodeSystem = "LinkId";
    }

    lfItem.linkId = qItem.linkId;
  };


  /**
   * Parse questionnaire item for question cardinality and answer cardinality
   *
   * @param lfItem {object} - LForms item object to assign question cardinality
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processFHIRQuestionAndAnswerCardinality = function(lfItem, qItem) {
    var min = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMin);
    var max = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlCardinalityMax);
    var repeats = qItem.repeats;
    var required = qItem.required;
    var answerCardinality, questionCardinality;
    // CNE/CWE, repeats handled by autocompleter with multiple answers in one question
    if (lfItem.dataType === 'CNE' || lfItem.dataType === 'CWE') {
      if (repeats) {
        answerCardinality = max ? {max: max.valueInteger.toString()} : {max: "*"};
      }
      else {
        answerCardinality = {max: "1"};
      }
      if (required) {
        answerCardinality.min = min ? min.valueInteger.toString() : "1";
      }
      else {
        answerCardinality.min = "0";
      }
    }
    // not CNE/CWE, question repeats
    else {
      // repeats
      if (repeats) {
        questionCardinality = max ? {max: max.valueInteger.toString()} : {max: "*"};
      }
      else {
        questionCardinality = {max: "1"};
      }
      // required
      if (required) {
        questionCardinality.min = min ? min.valueInteger.toString() : "1";
        answerCardinality = {min: "1"};
      }
      else {
        questionCardinality.min = "1";
      }
    }

    if (questionCardinality)
      lfItem.questionCardinality = questionCardinality;
    if (answerCardinality)
      lfItem.answerCardinality = answerCardinality;
  };


  /**
   * Parse questionnaire item for units list
   *
   * @param lfItem {object} - LForms item object to assign units
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processUnitList = function (lfItem, qItem) {

    var lformsUnits = [];
    var lformsDefaultUnit = null;
    // The questionnaire-unitOption extension is only for item.type = quantity
    var unitOption = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlUnitOption, 0, true);
    if(unitOption && unitOption.length > 0) {
      if (qItem.type !== 'quantity') {
        throw new Error('The extension '+self.fhirExtUrlUnitOption+
          ' can only be used with type quantity.  Question "'+
          qItem.text+'" is of type '+qItem.type);
      }
      for(var i = 0; i < unitOption.length; i++) {
        var coding = unitOption[i].valueCoding;
        var lUnit = {
          name: coding.display,
          code: coding.code,
          system: coding.system
        };
        lformsUnits.push(lUnit);
      }
    }

    // The questionnaire-unit extension is only for item.type = integer or decimal
    var unit = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlUnit);
    if (unit) {
      if (qItem.type !== 'integer' && qItem.type !== 'decimal') {
        throw new Error('The extension '+self.fhirExtUrlUnit+
          ' can only be used with types integer or decimal.  Question "'+
          qItem.text+'" is of type '+qItem.type);
      }
      lformsDefaultUnit = {
        name: unit.valueCoding.display,
        code: unit.valueCoding.code,
        system: unit.valueCoding.system,
        default: true
      };
      lformsUnits.push(lformsDefaultUnit);
    }

    if (qItem.type === 'quantity') {
      let initialQ = this.getFirstInitialQuantity(qItem);
      if (initialQ && initialQ.unit) {
        lformsDefaultUnit = LForms.Util.findItem(lformsUnits, 'name', initialQ.unit);
        if(lformsDefaultUnit) {
          lformsDefaultUnit.default = true;
        }
        else {
          lformsDefaultUnit = {
            name: initialQ.unit,
            code: initialQ.code,
            system: initialQ.system,
            default: true
          };
          lformsUnits.push(lformsDefaultUnit);
        }
      }
    }

    if(lformsUnits.length > 0) {
      if (!lformsDefaultUnit) {
        lformsUnits[0].default = true;
      }
      lfItem.units = lformsUnits;
    }
  };


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
          lfItem.isSearchAutocomplete = true;
          // continue to drop-down case
        case 'drop-down':
          displayControl.answerLayout = {type: 'COMBO_BOX'};
          break;
        case 'Checkbox': // backward-compatibility with old export
        case 'check-box':
        case 'Radio': // backward-compatibility with old export
        case 'radio-button':
          displayControl.answerLayout = {type: 'RADIO_CHECKBOX'};
          var answerChoiceOrientation = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtChoiceOrientation);
          if (answerChoiceOrientation) {
            if (answerChoiceOrientation.valueCode === "vertical") {
              displayControl.answerLayout.columns = "1"
            }
            else if (answerChoiceOrientation.valueCode === "horizontal") {
              displayControl.answerLayout.columns = "0"
            }
          }
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


  /**
   * Parse questionnaire item for data control
   *
   * @param lfItem {object} - LForms item object to assign data control
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._processDataControl = function (lfItem, qItem) {
    var dataControlType = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlDataControl);

    if(dataControlType && dataControlType.valueString) {
      try {
        var dataControl = JSON.parse(dataControlType.valueString);
        if (dataControl) {
          lfItem.dataControl = dataControl;
        }
      }
      catch(e){
        console.log("Invalid dataControl data!");
      }
    }
  };


  // ---------------- QuestionnaireResponse Import ---------------

  var qrImport = self._mergeQR;

  /**
   * Merge a QuestionnaireResponse instance into an LForms form object
   * @param formData an LForms form definition or LFormsData object.
   * @param qr a QuestionnaireResponse instance
   * @returns {{}} an updated LForms form definition, with answer data
   */
  qrImport.mergeQuestionnaireResponseToLForms = function(formData, qr) {
    if (!(formData instanceof LForms.LFormsData)) {
      // get the default settings in case they are missing in the form data
      // not to set item values by default values for saved forms with user data
      formData.hasSavedData = true;
      formData = (new LForms.LFormsData(formData)).getFormData();
    }
    // The reference to _mergeQR below is here because this function gets copied to
    // the containing object to be a part of the public API.
    var qrInfo = qrImport._getQRStructure(qr);
    qrImport._processQRItemAndLFormsItem(qrInfo, formData);
    return formData;
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
                var newQRItemInfo = LForms.Util.deepCopy(qrItemInfo);
                newQRItemInfo.index = j;
                newQRItemInfo.item.answer = [newQRItemInfo.item.answer[j]];
                if(qrItemInfo.qrAnswersItemsInfo && qrItemInfo.qrAnswersItemsInfo[j]) {
                  newQRItemInfo.qrAnswersItemsInfo = [qrItemInfo.qrAnswersItemsInfo[j]];
                }
                parentQRItemInfo.qrItemsInfo.splice(i+j, 0, newQRItemInfo);
              }
              // change the first qr item's answer too
              qrItemInfo.item.answer = [qrItemInfo.item.answer[0]];
              if(qrItemInfo.qrAnswersItemsInfo && qrItemInfo.qrAnswersItemsInfo[0]) {
                qrItemInfo.qrAnswersItemsInfo = [qrItemInfo.qrAnswersItemsInfo[0]];
              }
              else {
                delete qrItemInfo.qrAnswersItemsInfo;
              }
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
            // process item.answer.item, if applicable
            if(qrItemInfo.qrAnswersItemsInfo) {
              // _setupItemValueAndUnit seems to assume single-answer except for multiple choices on CNE/CWE
              // moreover, each answer has already got its own item above if question repeats
              if(qrItemInfo.qrAnswersItemsInfo.length > 1) {
                throw new Error('item.answer.item with item.answer.length > 1 is not yet supported');
              }
              this._processQRItemAndLFormsItem(qrItemInfo.qrAnswersItemsInfo[0], item);
            }
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
   * Set value and units on a LForms item
   * @param linkId an item's linkId
   * @param answer value for the item
   * @param item a LForms item
   * @private
   */
  qrImport._setupItemValueAndUnit = function(linkId, answer, item) {

    if (item && linkId === item.linkId && (item.dataType !== 'SECTION' && item.dataType !== 'TITLE')) {
      var dataType = item.dataType;

      // any one has a unit must be a numerical type, let use REAL for now.
      // dataType conversion should be handled when panel data are added to lforms-service.
      if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
        item.dataType = dataType = "REAL";
      }

      var qrValue = answer[0];

      switch (dataType) {
        case "BL":
          if (qrValue.valueBoolean === true || qrValue.valueBoolean === false) {
            item.value = qrValue.valueBoolean;
          }
          break;
        case "INT":
          if (qrValue.valueQuantity) {
            item.value = qrValue.valueQuantity.value;
            if(qrValue.valueQuantity.code) {
              item.unit = {name: qrValue.valueQuantity.code};
            }
          }
          else if (qrValue.valueInteger) {
            item.value = qrValue.valueInteger;
          }
          break;
        case "REAL":
        case "QTY":
          if (qrValue.valueQuantity) {
            var quantity = qrValue.valueQuantity;
            var lformsQuantity = importFHIRQuantity(quantity);
            LForms.Util._internalUtil.assignValueToItem(item, lformsQuantity, 'Quantity');
          }
          else if (qrValue.valueDecimal) {
            item.value = qrValue.valueDecimal;
          }
          break;
        case "DT":
          item.value = qrValue.valueDate;
          break;
        case "DTM":
          item.value = qrValue.valueDateTime;
          break;
        case "CNE":
        case "CWE":
          if (ns._answerRepeats(item)) {
            var value = [];
            for (var j=0,jLen=answer.length; j<jLen; j++) {
              var val = ns._processCWECNEValueInQR(answer[j], item);
              if (val) {
                value.push(val);
              }
            }
            item.value = value;
          }
          else {
            var val = ns._processCWECNEValueInQR(qrValue, item);
            if (val) {
              item.value = val;
            }
          }
          break;
        case "ST":
        case "TX":
          item.value = qrValue.valueString;
          break;
        case "attachment":
          item.value = qrValue.valueAttachment;
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
      case "date":
        //dataType = 'date';
        type = 'DT';
        break;
      case "dateTime":
        type = 'DTM';
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
      case "attachment":
        type = 'attachment';
        break;
    }
    return type;
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
   *  Converts the given ValueSet into an array of answers that can be used with a prefetch autocompleter.
   * @return the array of answers, or null if the extraction cannot be done.
   */
  self.answersFromVS = function (valueSet) {
    var vs = valueSet;
    var rtn = [];
    if (vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
      vs.expansion.contains.forEach(function (vsItem) {
        var answer = {code: vsItem.code, text: vsItem.display, system: vsItem.system};
        var ordExt = LForms.Util.findObjectInArray(vsItem.extension, 'url',
          self.fhirExtUrlValueSetScore);
        if(ordExt) {
          answer.score = ordExt.valueDecimal;
        }
        rtn.push(answer);
      });
    }
    return rtn.length > 0 ? rtn : null;
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

  /**
   *  Processes the terminology server setting, if any.
   *
   * @param lfItem - LForms item object to assign externallyDefined
   * @param qItem - Questionnaire item object
   * @private
   */
  self._processTerminologyServer = function (lfItem, qItem) {
    var tServer = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtTerminologyServer);
    if (tServer && tServer.valueUrl) {
      lfItem.terminologyServer = tServer.valueUrl;
    }
  };


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
   *  Finds the terminology server URL (if any) for the given item.
   * @param item a question, title, or group in the form (in the LFormsData
   *  structure, not the Questionnaire).
   * @return the base terminology server URL, or undefined if there isn't one
   *  for this item.
   */
  self._getTerminologyServer = function(item) {
    var terminologyServer = item.terminologyServer;
    var parent = item._parentItem;
    while (!terminologyServer && parent) {
      terminologyServer = parent.terminologyServer;
      parent = parent._parentItem;
    }
    return terminologyServer;
  };


  /**
   *  Returns the URL for performing a ValueSet expansion for the given item,
   *  if the given item has a terminology server and answerValueSet
   *  configured; otherwise it returns undefined.
   * @param item a question, title, or group in the form
   */
  self._getExpansionURL = function(item) {
    var rtn;
    if (item.answerValueSet) {
      var terminologyServer = this._getTerminologyServer(item);
      if (terminologyServer)
        rtn = terminologyServer + '/ValueSet/$expand?url='+ item.answerValueSet;
    }
    return rtn;
  };

  /**
   *  Loads answerValueSets for prefetched lists.
   * @param lfData the LFormsData for the form
   * @return an array of promise objects which resolve when the answer valuesets
   * have been loaded and imported.
   */
  self.loadAnswerValueSets = function (lfData) {
    var pendingPromises = [];
    var items = lfData.itemList;
    for (var i=0, len=items.length; i<len; ++i) {
      let item = items[i];
      if (item.answerValueSet && !item.isSearchAutocomplete) {
        let expURL = this._getExpansionURL(item);
        let vsKey = expURL ? expURL : item.answerValueSet;
        item._answerValueSetKey = vsKey;
        if (!LForms._valueSetAnswerCache)
          LForms._valueSetAnswerCache = {};
        let answers = LForms._valueSetAnswerCache[vsKey];
        if (answers) {
          item.answers = answers;
          lfData._updateAutocompOptions(item);
        }
        else { // if not already loaded
          if (expURL) {
            pendingPromises.push(fetch(expURL).then(function(response) {
              return response.json();
            }).then(function(parsedJSON) {
              if (parsedJSON.resourceType==="OperationOutcome" ) {
                var errorOrFatal = parsedJSON.issue.find(item => item.severity==="error" || item.severity==="fatal")
                if (errorOrFatal) {
                  throw new Error(errorOrFatal.diagnostics)
                }
              }
              else {
                answers = self.answersFromVS(parsedJSON);
                if (answers) {
                  LForms._valueSetAnswerCache[expURL] = answers;
                  item.answers = answers;
                  lfData._updateAutocompOptions(item);
                }
              }
            }).catch(function(error) {
              throw new Error("Unable to load ValueSet from "+expURL);
            }));
          }
          else { // use FHIR context
            var fhirClient = LForms.fhirContext.client;
            pendingPromises.push(fhirClient.request(lfData._buildURL(
              ['ValueSet','$expand'], {url: item.answerValueSet})
            ).then(function(response) {
              var valueSet = response;
              var answers = self.answersFromVS(valueSet);
              if (answers) {
                LForms._valueSetAnswerCache[vsKey] = answers;
                item.answers = answers;
                lfData._updateAutocompOptions(item);
              }
            }).catch(function(error) {
              throw new Error("Unable to load ValueSet "+item.answerValueSet+ " from FHIR server");
            }));
          }
        }
      }
    }
    return pendingPromises;
  };


  /**
   * Handle the item.value in QuestionnaireResponse for CWE/CNE typed items
   * @param qrItemValue a value of item in QuestionnaireResponse
   * @param lfItem an item in lforms
   * @param notOnList a flag indicates if the item's value is known to be not any of the answers 
   * in the answer list. If false or undefined, a check of the answers will be made.
   * @returns {{code: *, text: *}}
   * @private
   */
  self._processCWECNEValueInQR = function(qrItemValue, lfItem, notOnList) {
    var retValue;
    // a valueCoding, which is one of the answers
    if (qrItemValue.valueCoding) {
      var c = qrItemValue.valueCoding;
      retValue = {};
      if (c.code)
        retValue.code = c.code;
      if (c.display)
        retValue.text = c.display;
      if (c.system)
        retValue.system = c.sysetm;

      
      if (notOnList) {
        retValue._notOnList = true;
      }
      // compare retValue to the item.answers
      // if not same, add "_notOnList: true" to retValue
      else if (lfItem.dataType === 'CWE' && lfItem.answers) {
        var found = false;
        for(var i=0, len=lfItem.answers.length; i<len; i++) {
          if (LForms.Util.areTwoAnswersSame(retValue, lfItem.answers[i], lfItem)) {
            found = true;
            break;
          }
        }
        if (!found) {
          retValue._notOnList = true;
        }  
      }
    }
    // a valueString, which is a user supplied value that is not in the answers
    else if (qrItemValue.valueString) {
      retValue = qrItemValue.valueString;
    }
    return retValue;
  };


  /**
   * Parse questionnaire item for coding instructions
   *
   * @param qItem {object} - Questionnaire item object
   * @return {{}} an object contains the coding instructions info.
   * @private
   */
  self._processCodingInstructions = function(qItem) {
    // if the qItem is a "display" typed item with a item-control extension, then it meant to be a help message,
    // which in LForms is an attribute of the parent item, not a separate item.
    let ret = null;
    let ci = LForms.Util.findObjectInArray(qItem.extension, 'url', self.fhirExtUrlItemControl);
    let xhtmlFormat;
    if ( qItem.type === "display" && ci) {
      // only "redering-xhtml" is supported. others are default to text
      if (qItem._text) {
        xhtmlFormat = LForms.Util.findObjectInArray(qItem._text.extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
      }

      // there is a xhtml extension
      if (xhtmlFormat) {
        ret = {
          codingInstructionsFormat: "html",
          codingInstructions: xhtmlFormat.valueString,
          codingInstructionsPlain: qItem.text  // this always contains the coding instructions in plain text
        };
      }
      // no xhtml extension, default to 'text'
      else {
        ret = {
          codingInstructionsFormat: "text",
          codingInstructions: qItem.text,
          codingInstructionsPlain: qItem.text // this always contains the coding instructions in plain text
        };
      }
    }

    return ret;
  };


  /**
   *  Processes the child items of the item.
   * @param targetItem the LForms node being populated with data
   * @param qItem the Questionnaire (item) node being imported
   * @param linkIdItemMap - Map of items from link ID to item from the imported resource.
   * @param containedVS - contained ValueSet info, see _extractContainedVS() for data format details
   */
  self._processChildItems = function(targetItem, qItem, containedVS, linkIdItemMap) {
    if (Array.isArray(qItem.item)) {
      targetItem.items = [];
      for (var i=0; i < qItem.item.length; i++) {
        var help = self._processCodingInstructions(qItem.item[i]);
        // pick one coding instruction if there are multiple ones in Questionnaire
        if (help !== null) {
          targetItem.codingInstructions = help.codingInstructions;
          targetItem.codingInstructionsFormat = help.codingInstructionsFormat;
          targetItem.codingInstructionsPlain = help.codingInstructionsPlain;
        }
        else {
          var item = self._processQuestionnaireItem(qItem.item[i], containedVS, linkIdItemMap);
          targetItem.items.push(item);
        }
      }
    }
  };


  /**
   *  Copy extensions that haven't been handled before.
   *
   * @param lfItem the LForms node being populated with data
   * @param qItem the Questionnaire (item) node being imported
   */
  self._processExtensions = function(lfItem, qItem) {
    var extensions = [];
    if (Array.isArray(qItem.extension)) {
      for (var i=0; i < qItem.extension.length; i++) {
        var ext = qItem.extension[i];
        var extHandler = self.extensionHandlers[ext.url];
        if ((extHandler && extHandler(ext, lfItem)) ||
            !self.handledExtensionSet.has(qItem.extension[i].url)) {
          extensions.push(qItem.extension[i]);
        }
      }
    }
    if(extensions.length > 0) {
      lfItem.extension = extensions;
    }
  };


  /**
   * If the given entity is an array, it will return the array length, return -1 otherwise.
   * @param entity the given entity (can be anything) that needs to be tested to see if it's an array
   * @return {number} the array length or -1 if the given entity is not an array.
   * @private
   */
  self._arrayLen = function(entity) {
    return entity && Array.isArray(entity)? entity.length: -1;
  };


  /**
   * Get structural info of a QuestionnaireResponse item.answer.item in a way similar to that of item.item.
   * If any answer entry in item.answer has items, the qrItemInfo.qrAnswersItemsInfo will be assigned, which
   * will be an array where each element corresponds to one answer element in item.answer. When an answer entry
   * does not have any items, null will be used to fill the position.
   * @param qrItemInfo the structural info of the given item
   * @param item the item in a QuestionnaireResponse object whose answer.item structure is to be created.
   * @private
   */
  self._checkQRItemAnswerItems = function(qrItemInfo, item) {
    var answerLen = self._arrayLen(item.answer);
    if(answerLen < 1) {
      return;
    }

    var numAnswersWithItems = 0;
    var answersItemsInfo = []; // one entry for each answer; each entry is an qrItemsInfo array for the answer.item
    for (var i = 0; i < answerLen; i++) {
      if(this._arrayLen(item.answer[i].item) > 0) {
        answersItemsInfo.push({});
        self._mergeQR._checkQRItems(answersItemsInfo[i], item.answer[i]);
        ++ numAnswersWithItems;
      }
      else {
        answersItemsInfo.push(null);
      }
    }

    if(numAnswersWithItems > 0) {
      qrItemInfo.numAnswersWithItems = numAnswersWithItems;
      qrItemInfo.qrAnswersItemsInfo = answersItemsInfo;
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
      var val = self._getFHIRValueWithPrefixKey(restriction, /^value/);
      if (val !== undefined && val !== null) {

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

}

export default addCommonSDCImportFns;
