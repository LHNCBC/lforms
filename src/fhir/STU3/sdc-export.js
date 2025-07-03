/**
 * A package to handle FHIR Questionnaire and SDC (STU2) Questionnaire and QuestionnaireResponse for LForms
 *
 * FHIR Questionnaire:
 * https://hl7.org/fhir/STU3/questionnaire.html
 *
 * STU2 SDC Ballot:
 * https://hl7.org/fhir/us/sdc/STU2/
 *
 */
var fhirVersionNum = '3.0';

var self = {

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
   * @returns an array of QuestionnaireResponse and Observations, or null if there is
   *  no valid QuestionnaireResponse. The caller may wish to put all of the returned
   *  resources into a transaction Bundle for creating them on a FHIR server.
   */
   convertLFormsToQRAndExtractFHIRData: function(lfData, noExtensions, subject) {
    var qr = this.convertLFormsToQuestionnaireResponse(lfData, noExtensions, subject);
    if (!qr) {
      return null;
    }
    if (!qr.id) {
      qr.id = this._commonExport._getUniqueId(qr.code && qr.code[0] && qr.code[0].code ||
        qr.identifier || 'QR')
    }

    var qrRef = 'QuestionnaireResponse/'+qr.id;
    var rtn = [qr];
    var objPerformers = ['Practitioner', 'Patient', 'RelatedPerson']; // intersected with qr.author
    for (var i=0, len=lfData.itemList.length; i<len; ++i) {
      var item = lfData.itemList[i];
      if (this._getExtractValue(item) && this._hasItemValue(item)) {
        const categCodeableConcepts = [];
        // Use the categories from the closest ancestor item (including itself)
        var ancestor = item;
        while (ancestor && !categCodeableConcepts.length) {
          if (ancestor.extension) {
            const categExts = LForms.Util.findObjectInArray(ancestor.extension, 'url',
              this.fhirExtObsExtractCategory,  0, true);
            categExts.forEach((x)=>categCodeableConcepts.push(x.valueCodeableConcept));
          }
          ancestor = ancestor._parentItem;
        }

        var obs = this._commonExport._createObservation(item);
        for (var j=0, jLen=obs.length; j<jLen; j++) {
          // Following
          // http://hl7.org/fhir/uv/sdc/2019May/extraction.html#observation-based-extraction
          if (qr.basedOn)
            obs[j].basedOn = qr.basedOn;
          if (qr.subject)
            obs[j].subject = qr.subject;
          if (qr.context)
            obs[j].context = qr.context;
          if (qr.authored) {
            obs[j].effectiveDateTime = qr.authored;
            obs[j].issued = qr.authored;
          }
          if (qr.author && objPerformers.indexOf(qr.author.type)>=0)
            obs[j].performer = qr.author;
          if (categCodeableConcepts.length)
            obs[j].category = categCodeableConcepts;

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
      targetItem.repeats = false;
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
    // http://hl7.org/fhir/StructureDefinition/maxDecimalPlaces
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
            break;
          // http://hl7.org/fhir/StructureDefinition/maxDecimalPlaces
          case "maxDecimalPlaces":
            if (dataType === "REAL") {
              extValue = {
                url: this.fhirExtUrlMaxDecimalPlaces,
                valueInteger: value,
              };
            }
            break;
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
   */
  _handleChoiceField: function(targetItem, item) {
    // an extension for the search url of the auto-complete field.
    if(item.externallyDefined) {
      this._handleExternallyDefined(targetItem, item);
    }
    // option, for answer list
    else if (item.answerValueSet) {
      targetItem.options = {};
      targetItem.options.reference = item.answerValueSet;
    }
    else if (item._options) {
      // Restore options property.
      targetItem.options = item._options;
    }
    else if (item.answers) {
      // Make sure the answers did not come from answerExpression.
      if (!item._fhirExt || !item._fhirExt[this.fhirExtAnswerExp])
        targetItem.option = this._handleAnswers(item);
    }
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

      // when option's values are Coding
      if (item.dataType === "CODING") {

        // option's value supports integer, date, time, string and Coding
        // for LForms, all answers are Coding
        option.valueCoding = {};
        if (answer.code) option.valueCoding.code = answer.code;
        if (answer.text) option.valueCoding.display = answer.text;

        if (answer.system) {
          option.valueCoding.system = LForms.Util.getCodeSystem(answer.system);
        }

        // Restore rendering-xhtml and rendering-style extensions on valueCoding._display.
        if (answer.obj_valueCoding_display) {
          option.valueCoding._display = answer.obj_valueCoding_display;
        }
      }
      // when option's values are string, integer, date or time
      else if(item.dataType === "ST" || item.dataType === "INT" ||
          item.dataType === "DT" || item.dataType === "TM") {
        var valueKey = this._getValueKeyByDataType("value", item);
        option[valueKey] = answer.text;
        // Restore rendering-xhtml and rendering-style extensions on _valueString,
        // _valueInteger, _valueDate, or _valueTime.
        if (answer[`obj_${valueKey}`]) {
          option[`_${valueKey}`] = answer[`obj_${valueKey}`];
        }
      }

      // label
      var ext = [];
      if(answer.label) {
        ext.push({
          "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
          "valueString" : answer.label
        });
      }

      if (answer.score !== null && answer.score !== undefined) {
        ext.push({
          "url" : this.fhirExtUrlOptionScore,
          "valueDecimal" : answer.score
        });
      }
      if(ext.length > 0) {
        option.extension = ext;
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
    // dataType:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)

    if (item.defaultAnswer !== null && item.defaultAnswer !== undefined && item.defaultAnswer !== '') {

      var dataType = this._getAssumedDataTypeForExport(item);
      var valueKey = this._getValueKeyByDataType("initial", item);
      // for Coding
      // multiple selections, item.value is an array
      // NO support of multiple selections in FHIR SDC, just pick one
      if (dataType === 'CODING' ) {
        var codeSystem = null, coding = null;

        // item.defaultAnswer could be an array of multiple default values or a single value.
        // in STU3 'initial[x]' is a single value. pick the first one if defaultAnswer is an array.
        var defaultAnswer = (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
            item.defaultAnswer[0] : item.defaultAnswer;
        if (typeof defaultAnswer === 'object') {
          coding = {
            "code": defaultAnswer.code,
          };
          if(defaultAnswer !== undefined) {
            coding.display = defaultAnswer.text;
          }
          // code system
          codeSystem = defaultAnswer.system || item.answerCodeSystem;
          if (codeSystem) {
            coding.system = LForms.Util.getCodeSystem(codeSystem);
          }
          targetItem[valueKey] = coding;
        }
        // user typed answer that is not on the answer list.
        else if (typeof defaultAnswer === 'string') {
          targetItem["initialString"] = defaultAnswer
        }
      }
      // answerOption is date, time, integer or string
      else if (item.answers && (dataType === 'ST' || dataType === 'INT' ||
          dataType === 'DT' || dataType === 'TM')) {

        // item.defaultAnswer could be an array of multiple default values or a single value.
        // in STU3 'initial[x]' is a single value. pick the first one if defaultAnswer is an array.
        var defaultAnswer = (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
            item.defaultAnswer[0] : item.defaultAnswer;
          targetItem[valueKey] = defaultAnswer.text
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
      else if (dataType === 'QTY') { // SimpleQuantity (no comparators)
        var fhirQuantity = this._makeQuantity(item.defaultAnswer, item.units);
        if(fhirQuantity) {
          targetItem[valueKey] = fhirQuantity;
        }
      }
      // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
      else if (dataType === "BL" || dataType === "REAL" || dataType === "INT" ||
        dataType === "TM" || dataType === "ST" || dataType === "TX" || dataType === "URL") {
        targetItem[valueKey] = item.defaultAnswer;
      }
      else if (dataType === "DT" || dataType === "DTM") { // transform to FHIR date/datetime format.
        var dateValue = LForms.Util.stringToDate(item.defaultAnswer);
        if(dateValue) {
          dateValue = dataType === "DTM"?
            LForms.Util.dateToDTMString(dateValue): LForms.Util.dateToDTStringISO(dateValue);
          targetItem[valueKey] = dateValue;
        }
        else { // LForms.Util.stringToDate returns null on invalid string
          //TODO: should save the errors or emitting events.
          console.error(item.defaultAnswer + ': Invalid date/datetime string as defaultAnswer for ' + item.questionCode);
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
        if ((defUnit && defUnit.default) || targetItem.initialQuantity) {
          // Use initial[].valueQuantity.unit to export the default unit.
          if (!targetItem.initialQuantity) {
            targetItem.initialQuantity = {};
          }
          this._setUnitAttributesToFhirQuantity(targetItem.initialQuantity, defUnit);
        }
        for (var i=0, iLen=item.units.length; i<iLen; i++) {
          var unit = item.units[i];
          var fhirUnitExt = {
            "url": this.fhirExtUrlUnitOption,
            "valueCoding": this._createFhirUnitCoding(unit)
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

      // ignore "ANY", "ALL" on item.skipLogic.logic
      // ignore "show" on item.skipLogic.action

      for (var i=0, iLen=item.skipLogic.conditions.length; i<iLen; i++) {
        var condition = item.skipLogic.conditions[i];
        var sourceItem = source._getSkipLogicSourceItem(item,condition.source);

        var enableWhenRule = {
          "question": sourceItem.linkId
        };
        // dataTypes:
        // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
        // Attachment, Coding, Quantity, Reference(Resource)
        var valueKey = this._getValueKeyByDataType("answer", sourceItem);
        var dataType = this._getAssumedDataTypeForExport(sourceItem);

        if(condition.trigger.hasOwnProperty('exists')) {
          enableWhenRule.hasAnswer = condition.trigger.exists;
        }
        // for Coding
        // multiple selections, item.value is an array
        // NO support of multiple selections in FHIR SDC, just pick one
        else if (dataType === 'CODING' ) {
          let answerCoding = this._copyTriggerCoding(condition.trigger.value, null, true);
          if (answerCoding) {
            enableWhenRule[valueKey] = answerCoding;
          }
          else {
            throw new Error("Unable to convert trigger to answerCoding: " + condition.trigger.value);
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
        else if (dataType === 'QTY') { // SimpleQuantity (no comparators)
          let fhirQuantity = this._makeQuantity(condition.trigger.value, sourceItem.units);
          if(fhirQuantity) {
            enableWhenRule[valueKey] = fhirQuantity;
          }
        }
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
        else if (dataType === "BL" || dataType === "REAL" || dataType === "INT" ||
          dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
          dataType === "ST" || dataType === "TX" || dataType === "URL") {
          enableWhenRule[valueKey] = condition.trigger.value;
          // TODO luanx2: similarly, REAL, INT with unit should be valueQuantity? Leave as is for now.
        }
        // add a rule to enableWhen
        enableWhen.push(enableWhenRule)
      }
      targetItem.enableWhen = enableWhen;
    }
  },


};

export default self;
