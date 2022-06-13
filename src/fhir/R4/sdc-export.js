/**
 * A package to handle FHIR Questionnaire and SDC (STU2) Questionnaire and QuestionnaireResponse for LForms
 *
 * FHIR Questionnaire:
 * https://www.hl7.org/fhir/questionnaire.html
 *
 * R4 Ballot (3.5) for comment:
 * http://hl7.org/fhir/uv/sdc/2018Sep/sdc-questionnaire.html
 * http://hl7.org/fhir/uv/sdc/2018Sep/sdc-questionnaireresponse.html
 *
 * It provides the following functions:
 * convertLFormsToQuestionnaire()
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR (standard or SDC) Questionnaire data
 * convertLFormsToQuestionnaireResponse()
 * -- Generate FHIR (standard or SDC) QuestionnaireResponse data from captured data in LForms
 */
var sdcVersion = '2.7';
var fhirVersionNum = '4.0';

var self = {

  SDCVersion: sdcVersion,
  QProfile: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|'+sdcVersion,
  QRProfile: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse|'+sdcVersion,
  stdQProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/Questionnaire',
  stdQRProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/QuestionnaireResponse',

  /**
   *  Convert LForms captured data to a bundle consisting of a FHIR SDC
   *  QuestionnaireResponse and any extractable resources. (Currently this means
   *  any Observations that can be extracted via the observationLinkPeriod
   *  extension).
   *
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *  The default is false.
   * @param subject A local FHIR resource that is the subject of the output resource.
   *  If provided, a reference to this resource will be added to the output FHIR
   *  resource when applicable.
   * @returns an array of QuestionnaireResponse and Observations.  Observations
   *  will have derivedFrom set to a temporary reference created for the returned
   *  QuestionnaireResponse (the first element of the array). The caller may
   *  wish to put all of the returned resources into a transaction Bundle for
   *  creating them on a FHIR server.
   */
  convertLFormsToQRAndExtracFHIRData: function(lfData, noExtensions, subject) {
    var qr = this.convertLFormsToQuestionnaireResponse(lfData, noExtensions, subject);
    if (!qr.id) {
      qr.id = this._commonExport._getUniqueId(
        qr.identifier && qr.identifier.value || 'QR')
    }

    var qrRef = 'QuestionnaireResponse/'+qr.id;
    var rtn = [qr];
    for (var i=0, len=lfData.itemList.length; i<len; ++i) {
      var item = lfData.itemList[i];
      if (self._getExtractValue(item) && self._hasItemValue(item)) {
        var obs = this._commonExport._createObservation(item);
        for (var j=0, jLen=obs.length; j<jLen; j++) {
          // Following
          // http://hl7.org/fhir/uv/sdc/2019May/extraction.html#observation-based-extraction
          if (qr.basedOn)
            obs[j].basedOn = qr.basedOn;
          if (qr.partOf)
            obs[j].partOf = qr.partOf;
          if (qr.subject)
            obs[j].subject = qr.subject;
          if (qr.encounter)
            obs[j].encounter = qr.encounter;
          if (qr.authored) {
            obs[j].effectiveDateTime = qr.authored;
            obs[j].issued = qr.authored;
          }
          if (qr.author)
            obs[j].performer = qr.author;
          obs[j].derivedFrom = [{reference: qrRef}];

          rtn.push(obs[j]);

        }
      }
    }
    return rtn;
  },


  /**
   *  Proceses the LForms questionCardinality into FHIR.
   * @param targetItem an item in Questionnaire
   * @param item a LForms item
   */
  _processQuestionCardinality: function(targetItem, item) {
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
      // No default in R4
      // targetItem.repeats = false;
    }
  },


  /**
   * Handle special requirements for 'display' items
   * @param targetItem an item in Questionnaire
   * @param item a LForms item
   * @private
   */
  _handleSpecialConstraints: function(targetItem, item) {
    //Display items cannot have a "code" asserted
    //Required and repeat aren't permitted for display items
    //Read-only can't be specified for "display" items
    if (targetItem && item.dataType === "TITLE") {
      delete targetItem.code;
      delete targetItem.required;
      delete targetItem.repeats;
      delete targetItem.readOnly;
    }
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
        var extValue = null;
        var dataType = this._getAssumedDataTypeForExport(item);
        var valueKey = this._getValueKeyByDataType("value", item);

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
          // http://hl7.org/fhir/StructureDefinition/maxValue
          case "maxExclusive":
          case "maxInclusive":
            extValue = this._exportMinMax(dataType, value, valueKey, key);
            break;
          // http://hl7.org/fhir/StructureDefinition/minLength
          case "minLength":
            if (dataType === "ST" || dataType === "TX" || dataType === "URL" ||
                dataType === "QTY") {
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/minLength",
                "valueInteger": parseInt(value)
              };
            }
            break;
          // maxLength, not an extension, directly on item
          case "maxLength":
            if (dataType === "ST" || dataType === "TX" || dataType === "URL" ||
                dataType === "QTY") {
              targetItem.maxLength = parseInt(value);
            }
            break;
          // http://hl7.org/fhir/StructureDefinition/regex
          case "pattern":
            if (dataType === "ST" || dataType === "TX" ) {
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/regex",
                "valueString": value
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
   *  Processes settings for a list field with choices.
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in the LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   */
  _handleChoiceField: function(targetItem, item, noExtensions) {
    // an extension for the search url of the auto-complete field.
    if(item.externallyDefined) {
      this._handleExternallyDefined(targetItem, item);
    }
    // option, for answer list
    else if (item.answers && !item.answerValueSet) {
      // Make sure the answers did not come from answerExpression.
      if (!item._fhirExt || !item._fhirExt[this.fhirExtAnswerExp])
        targetItem.answerOption = this._handleAnswers(item, noExtensions);
    }
    else if (item.answerValueSet)
      targetItem.answerValueSet = item.answerValueSet;
  },


  /**
   * Process an item's answer list
   * @param item an item in the LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {Array}
   * @private
   */
  _handleAnswers: function(item, noExtensions) {
    var optionArray = [];
    for (var i=0, iLen=item.answers.length; i<iLen; i++) {
      var answer = item.answers[i];
      var option = {};

      // needs an extension for label
      if (!noExtensions) {
        var ext = [];
        if(answer.label) {
          ext.push({
            "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
            "valueString" : answer.label
          });
        }

        if (answer.score !== null && answer.score !== undefined) {
          ext.push({
            "url" : "http://hl7.org/fhir/StructureDefinition/ordinalValue",
            "valueDecimal" : parseFloat(answer.score)
          });
        }
        if(ext.length > 0) {
          option.extension = ext;
        }
      }
      // option's value supports integer, date, time, string and Coding
      // for LForms, all answers are Coding
      option.valueCoding = {};
      if (answer.code) option.valueCoding.code = answer.code;
      if (answer.text) option.valueCoding.display = answer.text;

      if (answer.system) {
        option.valueCoding.system = LForms.Util.getCodeSystem(answer.system);
      }

      // check default answers, coding only for now
      if (item.defaultAnswer && (item.dataType === 'CWE' || item.dataType === 'CNE')) {
        var defaultAnswers = (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
        item.defaultAnswer : [item.defaultAnswer];
    
        // go through each default value and set the initialSelected on the matching answer item
        for(var j=0, jLen=defaultAnswers.length; j<jLen; j++ ) {
          if (LForms.Util.areTwoAnswersSame(defaultAnswers[j], answer, item)) {
            option.initialSelected = true;
          }        
        }
      }

      optionArray.push(option);
    }
    return optionArray;
  },


  /**
   * Process default values
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  _handleInitialValues: function(targetItem, item) {
    if(item.defaultAnswer === null || item.defaultAnswer === undefined || item.defaultAnswer === '') {
      return;
    }

    var dataType = this._getAssumedDataTypeForExport(item);
    // for Coding, the default answer is handled in _handleAnswers(), where
    // initialSelected is set on the answer items.
    if (dataType === "CWE" || dataType === 'CNE') {
      return;
    }

    // item.defaultAnswer could be an array of multiple default values or a single value
    var defaultAnswers = (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
      item.defaultAnswer : [item.defaultAnswer];

    var valueKey = this._getValueKeyByDataType("value", item);
    var answer = null;
    targetItem.initial = [];

    // go through each default value and handle it based on the data type.
    for(var i=0, iLen=defaultAnswers.length; i<iLen; i++ ) {
      // dataType:
      // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
      // Attachment, Coding, Quantity, Reference(Resource)

      // for Quantity,
      // [{
      //   // from Element: extension
      //   "value" : <decimal>, // Numerical value (with implicit precision)
      //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
      //   "unit" : "<string>", // Unit representation
      //   "system" : "<uri>", // Code System that defines coded unit form
      //   "code" : "<code>" // Coded form of the unit
      // }]
      if (dataType === 'QTY') {  // for now, handling only simple quantities without the comparators.
        answer = {};
        answer[valueKey] = this._makeQuantity(defaultAnswers[i], item.units);
        targetItem.initial.push(answer);
      }
      // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
      else if (dataType === "INT" || dataType === "REAL" || dataType === "BL" ||
        dataType === "TM" || dataType === "ST" || dataType === "TX" || dataType === "URL") {
        answer = {};
        answer[valueKey] = defaultAnswers[i];
        targetItem.initial.push(answer);
      }
      else if (dataType === "DT" || dataType === "DTM") { // transform to FHIR date/datetime format.
        var dateValue = LForms.Util.stringToDate(defaultAnswers[i]);
        if(dateValue) {
          dateValue = dataType === "DTM"?
            LForms.Util.dateToDTMString(dateValue): LForms.Util.dateToDTStringISO(dateValue);
          targetItem.initial.push({[valueKey]: dateValue});
        }
        else { // LForms.Util.stringToDate returns null on invalid string
          // TODO: should save the errors or emitting events.
          console.error(defaultAnswers[i] + ': Invalid date/datetime string as defaultAnswer for ' + item.questionCode);
        }
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

    if (item.units && item.units.length > 0) {
      var dataType = this._getAssumedDataTypeForExport(item);
      if(dataType === "REAL" || dataType === "INT") {

        targetItem.extension.push({
          "url": this.fhirExtUrlUnit,
          // Datatype with multiple units is quantity. There is only one unit here.
          "valueCoding" : this._createFhirUnitCoding(item.units[0])
        });
      }
      else if(dataType === 'QTY') {
        var defUnit = this._getDefaultUnit(item.units);
        // Skip if units are already set in default answer conversion.
        if ((defUnit && defUnit.default) && !(targetItem.initial && targetItem.initial.length > 0)) {
          // Use initial[].valueQuantity.unit to export the default unit.
          if (!targetItem.initial) {
            targetItem.initial = [];
          }
          var qty = {};
          self._setUnitAttributesToFhirQuantity(qty, defUnit);
          targetItem.initial.push({valueQuantity: qty});
        }
        for (var i=0, iLen=item.units.length; i<iLen; i++) {
          var unit = item.units[i];
          var fhirUnitExt = {
            "url": this.fhirExtUrlUnitOption,
            "valueCoding": self._createFhirUnitCoding(unit)
          };
          targetItem.extension.push(fhirUnitExt);
        }
      }
    }
  },


  /**
   * Process skip logic
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @param source a LForms form object
   * @private
   */
  _handleSkipLogic: function(targetItem, item, source) {
    if (item.skipLogic) {
      var enableWhen = [];
      var rangeFound = false;

      // ignore "ANY", "ALL" on item.skipLogic.logic
      // ignore "show" on item.skipLogic.action

      for (var i=0, iLen=item.skipLogic.conditions.length; i<iLen; i++) {
        var condition = item.skipLogic.conditions[i];
        var sourceItem = source._getSkipLogicSourceItem(item,condition.source);
        let enableWhenRules = self._createEnableWhenRulesForSkipLogicCondition(condition, sourceItem);

        if(enableWhenRules.length > 1) {
          rangeFound = true;
        }
        enableWhen = enableWhen.concat(enableWhenRules);
      }

      if(rangeFound && item.skipLogic.conditions.length > 1) {
        // TODO: Multiple skip logic conditons included with range specification is not supported with core FHIR.
        // Use SDC extensions with fhirpath expressions, but not all fhirpath functionality is
        // available yet. Revisit after implementation of variables, %resource etc. in fhirpath.
        throw new Error('Multiple skip logic conditons included with range specification is not supported yet.');
      }

      targetItem.enableWhen = enableWhen;
      if(item.skipLogic.logic === 'ALL' || rangeFound) {
        targetItem.enableBehavior = 'all';
      }
      else if(enableWhen.length > 1) {
        targetItem.enableBehavior = 'any';
      }
    }
  }
};

export default self;
