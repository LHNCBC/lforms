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
  convertLFormsToFHIRData: function(lfData, noExtensions, subject) {
    var qr = this.convertLFormsToQuestionnaireResponse(lfData, noExtensions, subject);
    if (!qr.id) {
      qr.id = this._commonExport._getUniqueId(
        qr.identifier && qr.identifier.value || 'QR')
    }

    var qrRef = 'QuestionnaireResponse/'+qr.id;
    var rtn = [qr];
    for (var i=0, len=lfData.items.length; i<len; ++i) {
      var item = lfData.items[i];
      if (item._obsLinkPeriodExt && item.value) {
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
   * Process an item of the form
   * @param item an item in LForms form object
   * @param source a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {{}}
   * @private
   */
  _processItem: function(item, source, noExtensions) {
    var targetItem = {};

    // type
    targetItem.type = this._getFhirDataType(item);

    // id (empty for new record)

    // code
    targetItem.code = item.codeList;

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

    // question repeats
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
      // No default in R4
      // targetItem.repeats = false;
    }

    // answer repeats
    // http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs
    if (item.answerCardinality) {
      if (item.answerCardinality.max === "*") {
        targetItem.extension.push({
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-answerRepeats",
          "valueBoolean": true
        });
      }
    }

    // Copied item extensions
    if (item._initialExprExt)
      targetItem.extension.push(item._initialExprExt);
    if (item._calculatedExprExt)
      targetItem.extension.push(item._calculatedExprExt);
    if (item._obsLinkPeriodExt)
      targetItem.extension.push(item._obsLinkPeriodExt);
    if (item._variableExt)
      Array.prototype.push.apply(targetItem.extension, item._variableExt);

    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    this._handleItemControl(targetItem, item);

    // check restrictions
    this._handleRestrictions(targetItem, item);

    // http://hl7.org/fhir/StructureDefinition/entryFormat
    // looks like tooltip, TBD

    if(item._isHidden) {
      targetItem.extension.push({
        url: "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden",
        valueBoolean: true
      });
    }


    // linkId
    targetItem.linkId = item.linkId ? item.linkId : item._codePath;

    // text
    targetItem.text = item.question;

    // prefix
    if (item.prefix) {
      targetItem.prefix = item.prefix;
    }

    // enableWhen
    if (item.skipLogic) {
      this._handleSkipLogic(targetItem, item, source)
    }

    // repeats, handled above
    // readonly, (editable)
    if (item.dataType !== "SECTION" && item.dataType !== "TITLE" && item.editable === "0") {
      targetItem.readOnly = true;
    }

    // an extension for the search url of the auto-complete field.
    this._handleExternallyDefined(targetItem, item);

    self._handleTerminologyServer(targetItem, item);

    // option, for answer list
    if (item.answers && !item.answerValueSet) {
      targetItem.answerOption = this._handleAnswers(item, noExtensions);
    }
    else if (item.answerValueSet)
      targetItem.answerValueSet = item.answerValueSet;

    // initialValue, for default values
    this._handleInitialValues(targetItem, item);
    // add LForms Extension to units list. Process units after handling initial values.
    if (item.units) {
      this._handleLFormsUnits(targetItem, item);
    }


    if (item.items && Array.isArray(item.items)) {
      targetItem.item = [];
      for (var i=0, iLen=item.items.length; i<iLen; i++) {
        var newItem = this._processItem(item.items[i], source, noExtensions);
        targetItem.item.push(newItem);
      }
    }

    // the coding instruction is a sub item with a "display" type, and an item-control value as "help"
    // it is added as a sub item of this item.
    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl, for instructions
    if (item.codingInstructions) {
      let helpItem = {
        "text": item.codingInstructionsPlain ? item.codingInstructionsPlain : item.codingInstructions,
        "type": "display",
        "linkId": targetItem.linkId + "-help",
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "text": "Help-Button",
            "coding": [{
              "code": "help",
              "display": "Help-Button",
              "system": "http://hl7.org/fhir/questionnaire-item-control"
            }]
          }
        }]
      };

      // format could be 'html' or 'text'
      if (item.codingInstructionsFormat === 'html') {
        // add a "_text" field to contain the extension for the string value in the 'text' field
        // see http://hl7.org/fhir/R4/json.html#primitive
        helpItem._text = {
          "extension": [{
            "url": "http://hl7.org/fhir/StructureDefinition/rendering-xhtml",
            "valueString": item.codingInstructions
          }]
        }
      }

      if (Array.isArray(targetItem.item)) {
        targetItem.item.push(helpItem)
      }
      else {
        targetItem.item = [
          helpItem
        ]
      }
    }

    // handle special constraints for "display" item
    this._handleSpecialConstraints(targetItem, item);

    // if no extensions are allowed or there is no extension, remove it
    if (noExtensions || targetItem.extension.length === 0)
      delete targetItem.extension;

    this.copyFields(item, targetItem, this.itemLevelIgnoredFields);
    return targetItem
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
   * Process an item of the form
   * @param item an item in LForms form object
   * @param parentItem a parent item of the item
   * @returns {{}}
   * @private
   */
  _processResponseItem: function(item, parentItem) {
    var targetItem = {};
    var linkId = item.linkId ? item.linkId : item._codePath;

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
          if (!item.items[i]._repeatingItem) {
            var newItem = this._processResponseItem(item.items[i], item);
            targetItem.item.push(newItem);
          }
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

      this._handleAnswerValues(targetItem, item, parentItem);
      // remove the processed values
      if (parentItem._questionValues) {
        delete parentItem._questionValues[linkId];
      }
    }

    return targetItem
  },


  /**
   * Process an item's externally defined answer list
   * @param targetItem a QuestionnaireResponse object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */
  _handleExternallyDefined: function(targetItem, item) {
    if (item.externallyDefined) {
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined",
        "valueUri": item.externallyDefined
      });
    }
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

      if (answer.codeSystem) {
        option.valueCoding.system = LForms.Util.getCodeSystem(answer.codeSystem);
      }

      optionArray.push(option);
    }
    return optionArray;
  },


  /**
   * Group values of the questions that have the same linkId
   * @param item an item in the LForms form object or a form item object
   * @private
   *
   */
  _processRepeatingItemValues: function(item) {
    if (item.items) {
      for (var i=0, iLen=item.items.length; i<iLen; i++) {
        var subItem = item.items[i];
        // if it is a section
        if (subItem.dataType === 'SECTION') {
          this._processRepeatingItemValues(subItem);
        }
        // if it is a question and the it repeats
        else if (subItem.dataType !== 'TITLE' && this._questionRepeats(subItem)) {
          var linkId = subItem._codePath;
          if (!item._questionValues) {
            item._questionValues = {};
          }
          if (!item._questionValues[linkId]) {
            item._questionValues[linkId] = [subItem.value];
          }
          else {
            item._questionValues[linkId].push(subItem.value);
            subItem._repeatingItem = true; // the repeating items are to be ignored in later processes
          }
        }
      }
    }

  },


  /**
   * Process capture user data
   * @param targetItem an item in FHIR SDC QuestionnaireResponse object
   * @param item an item in LForms form object
   * @private
   */
  _handleAnswerValues: function(targetItem, item, parentItem) {
    // dataType:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)

    var answer = [];
    var linkId = item._codePath;
    var dataType = this._getAssumedDataTypeForExport(item);
    // value not processed by previous repeating items
    if (dataType !== "SECTION" && dataType !=="TITLE") {

      var valueKey = this._getValueKeyByDataType("value", item);

      if (this._questionRepeats(item)) {
        var values = parentItem._questionValues[linkId];
      }
      else if (this._answerRepeats(item)) {
        values = item.value;
      }
      else {
        values = [item.value];
      }

      for (var i=0, iLen= values.length; i<iLen; i++) {
        // for Coding
        if (dataType === 'CWE' || dataType === 'CNE') {
          // for CWE, the value could be string if it is a user typed, not-on-list value
          if (dataType === 'CWE' && typeof values[i] === 'string') {
            if (values[i] !== '') {
              answer.push({
                "valueString" : values[i]
              })
            }
          }
          else if (!jQuery.isEmptyObject(values[i])) {
            var oneAnswer = {};
            var codeSystem = LForms.Util.getCodeSystem(values[i].codeSystem);
            if (codeSystem) oneAnswer.system = codeSystem;
            if (values[i].code) oneAnswer.code = values[i].code;
            if (values[i].text) oneAnswer.display = values[i].text;
            answer.push({
              "valueCoding": oneAnswer
            })
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
        else if (dataType === "QTY") { // for now, handling only simple quantities without the comparators.
          var fhirQuantity = this._makeValueQuantity(values[i], item.unit);
          if(fhirQuantity) {
            answer.push({valueQuantity: fhirQuantity});
          }
        }
        // make a Quantity type if numeric values has a unit value
        else if (item.unit && typeof values[i] !== 'undefined' &&
            (dataType === "INT" || dataType === "REAL" || dataType === "ST")) {
          var q = {value: parseFloat(values[i])};
          self._setUnitAttributesToFhirQuantity(q, item.unit);
          answer.push({valueQuantity: q});
        }
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
        else if (dataType === "BL" || dataType === "REAL" || dataType === "INT" ||
          dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
          dataType === "ST" || dataType === "TX" || dataType === "URL") {
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
    var answer = null;
    // dataType:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)

    if (item.defaultAnswer !== null && item.defaultAnswer !== undefined) {

      targetItem.initial = [];
      var dataType = this._getAssumedDataTypeForExport(item);
      var valueKey = this._getValueKeyByDataType("value", item);
      // for Coding
      if (dataType === 'CWE' || dataType === 'CNE' ) {
        var codeSystem = null, coding = null;

        // item.defaultAnswer could be an array of multiple default values or a single value
        var defaultAnswers = (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) ?
            item.defaultAnswer : [item.defaultAnswer];
        // go through each default value, which could be a code object or a string
        for(var i=0, iLen=defaultAnswers.length; i<iLen; i++ ) {
          if (typeof defaultAnswers[i] === 'object') {
            coding = {"code": defaultAnswers[i].code};
            if(defaultAnswers[i].text !== undefined) {
              coding.display = defaultAnswers[i].text;
            }
            // code system
            codeSystem = defaultAnswers[i].codeSystem || item.answerCodeSystem;
            if (codeSystem) {
              coding.system = LForms.Util.getCodeSystem(codeSystem);
            }

            answer = {};
            answer[valueKey] = coding;
            targetItem.initial.push(answer);
          }
          // user typed answer that is not on the answer list.
          else if (typeof defaultAnswers[i] === 'string') {
            targetItem.initial.push({
              "valueString": defaultAnswers[i]
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
      else if (dataType === 'QTY') {  // for now, handling only simple quantities without the comparators.
        if(this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) {
          for(var j = 0; j < item.defaultAnswer.length; j++) {
            answer = {};
            answer[valueKey] = this._makeQuantity(item.defaultAnswer[j], item.units);
            targetItem.initial.push(answer);
          }
        }
        else {
          answer = {};
          answer[valueKey] = this._makeQuantity(item.defaultAnswer, item.units);
          targetItem.initial.push(answer);
        }
      }
      // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
      else if (dataType === "INT" || dataType === "REAL" || dataType === "BL" ||
        dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
        dataType === "ST" || dataType === "TX" || dataType === "URL") {
        if(this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) {
          for(var k = 0; k < item.defaultAnswer.length; k++) {
            answer = {};
            answer[valueKey] = item.defaultAnswer[k];
            targetItem.initial.push(answer);
          }
        }
        else {
          answer = {};
          answer[valueKey] = item.defaultAnswer;
          targetItem.initial.push(answer);
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

        var enableWhenRules = [{
          "question": sourceItem.linkId
        }];
        // dataTypes:
        // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
        // Attachment, Coding, Quantity, Reference(Resource)
        var valueKey = this._getValueKeyByDataType("answer", sourceItem);
        var dataType = this._getAssumedDataTypeForExport(sourceItem);

        // for Coding
        // multiple selections, item.value is an array
        // NO support of multiple selections in FHIR SDC, just pick one
        if (dataType === 'CWE' || dataType === 'CNE' ) {
          if (condition.trigger.code) {
            enableWhenRules[0][valueKey] = {
              "code": condition.trigger.code
            }
          }
          else {
            enableWhenRules[0][valueKey] = {
              "code": "only 'code' attribute is supported"
            }
          }
        }
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
        else if(dataType === "BL") {
          enableWhenRules[0].operator = 'exists';
          // Spec says exists implies answer is boolean, then 'exists' is redundant, isn't it?
          enableWhenRules[0][valueKey] = condition.trigger.value;
        }
        else if (dataType === "REAL" || dataType === "INT" || dataType === 'QTY' ||
            dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
            dataType === "ST" || dataType === "TX" || dataType === "URL") {
          enableWhenRules = this._createEnableWhenRulesForRangeAndValue(valueKey, condition, sourceItem);
          if(enableWhenRules.length > 1) {
            rangeFound = true;
          }
        }
        // add rule(s) to enableWhen
        enableWhen = enableWhen.concat(enableWhenRules);
      }

      if(rangeFound && item.skipLogic.conditions.length > 1) {
        // TODO: Multiple skip logic conditons included with range specification is not supported with core FHIR.
        // Use SDC extensions with fhirpath expressions, but not all fhirpath functionality is
        // available yet. Revisit after implementation of variables, %resource etc. in fhirpath.
        return;
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
