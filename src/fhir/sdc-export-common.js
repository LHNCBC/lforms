/**
 *  Defines SDC export functions that are the same across the different FHIR
 *  versions.  The function takes the SDC namespace object defined in the sdc export
 *  code, and adds additional functions to it.
 */
function addCommonSDCExportFns(ns) {
"use strict";

  var self = ns;

  /**
   * Convert LForms captured data to FHIR SDC QuestionnaireResponse
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *  The default is false.
   * @param subject A local FHIR resource that is the subject of the output resource.
   *  If provided, a reference to this resource will be added to the output FHIR
   *  resource when applicable.
   * @returns {{}}
   */
  self.convertLFormsToQuestionnaireResponse = function(lfData, noExtensions, subject) {
    var target = {};
    if (lfData) {
      var source = lfData.getFormData(true,true,true);
      this._processRepeatingItemValues(source);
      this._setResponseFormLevelFields(target, source, noExtensions);

      if (source.items && Array.isArray(source.items)) {
        var tmp = this._processResponseItem(source, true);
        if(tmp && tmp.item && tmp.item.length) {
          target.item = tmp.item;
        }
      }
    }
    // FHIR doesn't allow null values, strip them out.
    LForms.Util.pruneNulls(target);

    if (subject)
      target["subject"] = LForms.Util.createLocalFHIRReference(subject);

    this._commonExport._setVersionTag(target);
    return target;
  };


  /**
   * Convert LForms form definition to standard FHIR Questionnaire or FHIR SDC Questionnaire
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {{}}
   */
  self.convertLFormsToQuestionnaire = function(lfData, noExtensions) {
    var target = {};

    if (lfData) {
      var source = LForms.Util.deepCopy(lfData);
      if(! (source instanceof LForms.LFormsData)) {
        source = new LForms.LFormsData(source);
      }
      this._removeRepeatingItems(source);
      this._setFormLevelFields(target, lfData, noExtensions);

      if (source.items && Array.isArray(source.items)) {
        target.item = [];
        for (var i=0, iLen=source.items.length; i<iLen; i++) {
          var newItem = this._processItem(source.items[i], source, noExtensions);
          target.item.push(newItem);
        }
      }
    }

    // FHIR doesn't allow null values, strip them out.
    LForms.Util.pruneNulls(target);
    this._commonExport._setVersionTag(target);
    return target;
  };


  /**
   * Process an item of the form
   * @param item an item in LForms form object
   * @param source a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {{}}
   * @private
   */
  self._processItem = function(item, source, noExtensions) {
    var targetItem = {};

    // type
    targetItem.type = this._getFhirDataType(item);

    // id (empty for new record)

    // code
    targetItem.code = item.codeList;

    // extension
    targetItem.extension = item.extension || []; // later we delete if empty

    // required
    if (item._answerRequired === true || item._answerRequired === false) {
      targetItem.required = item._answerRequired;
    }

    // http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs
    if (targetItem.required) {
      var minOccurInt = parseInt(item.questionCardinality.min);
      if(minOccurInt > 1) {
        targetItem.extension.push({
          "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs",
          "valueInteger" : minOccurInt
        });
      }
    }

    // question/answer repeats
    // http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs
    this._processQuestionAndAnswerCardinality(targetItem, item);

    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    this._handleItemControl(targetItem, item);

    // check restrictions
    this._handleRestrictions(targetItem, item);

    // http://hl7.org/fhir/StructureDefinition/entryFormat
    // looks like tooltip, TBD

    if(item._isHiddenInDef) {
      targetItem.extension.push({
        url: "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden",
        valueBoolean: true
      });
    }


    // linkId
    targetItem.linkId = item.linkId;

    // Text & prefix
    targetItem.text = item.question;
    if (item.prefix) {
      targetItem.prefix = item.prefix;
    }
    // Copy item extensions
    for (let extField of ['_prefix', '_text']) {
      let extFieldData = item['obj'+extField];
      if (extFieldData)
        targetItem[extField] = extFieldData;
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

    this._handleChoiceField(targetItem, item, noExtensions);
    this._handleTerminologyServer(targetItem, item);

    // initialValue, for default values
    this._handleInitialValues(targetItem, item);
    // add LForms Extension to units list. Process units after handling initial values.
    if (item.units) {
      this._handleLFormsUnits(targetItem, item);
    }
    // data control
    this._handleDataControl(targetItem, item);

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

    if (item.maxAttachmentSize) {
      var exts = (targetItem.extension || (targetItem.extension = []));
      exts.push({url: self.fhirExtMaxSize, valueDecimal: item.maxAttachmentSize});
    }

    if (item.allowedAttachmentTypes) {
      exts = (targetItem.extension || (targetItem.extension = []));
      for (let type of item.allowedAttachmentTypes) {
        exts.push({url: self.fhirExtMimeType, valueCode: type});
      }
    }

    // handle special constraints for "display" item
    this._handleSpecialConstraints(targetItem, item);

    // if no extensions are allowed or there is no extension, remove it
    if (noExtensions || targetItem.extension.length === 0)
      delete targetItem.extension;

    this.copyFields(item, targetItem, this.itemLevelIgnoredFields);
    return targetItem
  };


  /**
   * Process the LForms questionCardinality and answerCardinality into FHIR.
   * @param targetItem an item in Questionnaire
   * @param item a LForms item
   */
  self._processQuestionAndAnswerCardinality = function(targetItem, item) {
    var maxOccurs = 0;

    var qCard = item.questionCardinality, aCard = item.answerCardinality;
    var qCardMax = (qCard && qCard.max !== undefined) ? qCard.max : null;
    var aCardMax = (aCard && aCard.max !== undefined) ? aCard.max : null;

    // unlimited repeats, no need to set maxOccurs
    if (qCardMax === "*" || aCardMax === "*") {
      if (item.dataType !== "TITLE") {
        targetItem.repeats = true;
      }
    }
    // not unlimited repeats
    else {
      var intQCardMax = parseInt(qCardMax), intACardMax = parseInt(aCardMax);
      // has a maxOcurrs value
      if(intQCardMax > 1 || intACardMax > 1) {
        if (item.dataType !== "TITLE") {
          targetItem.repeats = true;

          // get the maxOccurs value
          if (!isNaN(intQCardMax) && !isNaN(intACardMax)) {
            maxOccurs = Math.max(intQCardMax, intACardMax);
          }
          else if (!isNaN(intQCardMax)) {
            maxOccurs = intQCardMax;
          }
          else if (!isNaN(intACardMax)) {
            maxOccurs = intACardMax
          }

          if (maxOccurs > 1) {
            targetItem.extension.push({
              "url": self.fhirExtUrlCardinalityMax,
              "valueInteger": maxOccurs
            });
          }
        }
      }
    }

  };


  /**
   * Process an item's externally defined answer list
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */
  self._handleExternallyDefined = function(targetItem, item) {
    if (item.externallyDefined) {
      targetItem.extension.push({
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined",
        "valueUri": item.externallyDefined
      });
    }
  };


  /**
   * Process an item's data control
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */
  self._handleDataControl = function(targetItem, item) {
    if (item.dataControl) {
      targetItem.extension.push({
        "url": "http://lhcforms.nlm.nih.gov/fhirExt/dataControl",
        "valueString": JSON.stringify(item.dataControl)
      })
    }
  };


  /**
   * Remove repeating items in a form data object
   * @param source a LForms form data object
   * @private
   */
  self._removeRepeatingItems = function(source) {

    if (source.items && Array.isArray(source.items)) {
      for (var i= source.items.length-1; i>=0; i--) {
        // if it is a repeating item, whose _id is not 1
        if (source.items[i]._id > 1) {
          source.items.splice(i,1);
        }
        else {
          this._removeRepeatingItems(source.items[i]);
        }
      }
    }
  };


  /**
   * Set form level attributes
   * @param target a Questionnaire object
   * @param source a LForms form object
   * @param noExtensions  a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @private
   */
  self._setFormLevelFields = function(target, source, noExtensions) {
    this.copyFields(source, target, this.formLevelFields);
    // Handle title and name.  In LForms, "name" is the "title", but FHIR
    // defines both.
    target.name = source.shortName; // computer friendly
    target.title = source.name;

    // Handle extensions on title
    if (source.obj_title)
      target._title = source.obj_title;

    target.code = source.codeList;

    // resourceType
    target.resourceType = "Questionnaire";
    target.status = target.status ? target.status : "draft";

    // meta
    var profile = noExtensions ? this.stdQProfile : this.QProfile;

    target.meta = target.meta ? target.meta : {};
    target.meta.profile = target.meta.profile ? target.meta.profile : [profile];
  };


  /**
   * Process itemControl based on LForms item's answerLayout and questionLayout
   * @param targetItem an item in FHIR SDC Questionnaire object
   * @param item an item in LForms form object
   * @private
   */
  self._handleItemControl = function(targetItem, item) {
    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    var itemControlType = "";
    var itemControlDisplay, answerChoiceOrientation;
    // Fly-over, Table, Checkbox, Combo-box, Lookup
    if (!jQuery.isEmptyObject(item.displayControl)) {
      var dataType = this._getAssumedDataTypeForExport(item);
      // for answers
      if (item.displayControl.answerLayout &&
        (dataType === "CNE" || dataType === "CWE")) {
        // search field
        if (item.externallyDefined || (item.answerValueSet && item.isSearchAutocomplete)) {
          itemControlType = "autocomplete";
          itemControlDisplay = "Auto-complete";
        }
        // prefetch list
        // combo-box
        else if (item.displayControl.answerLayout.type === "COMBO_BOX") {
          itemControlType = "drop-down";
          itemControlDisplay = "Drop down";
        }
        // radio or checkbox
        else if (item.displayControl.answerLayout.type === "RADIO_CHECKBOX") {
          if (item.answerCardinality &&
            (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            itemControlType = "check-box";
            itemControlDisplay = "Check-box";
          }
          else {
            itemControlType = "radio-button";
            itemControlDisplay = "Radio Button";
          }
          // answer choice orientation
          if (item.displayControl.answerLayout.columns === "0") {
            answerChoiceOrientation = "horizontal";
          }
          else if (item.displayControl.answerLayout.columns === "1") {
            answerChoiceOrientation = "vertical";
          }

        }
      }
      // for section item
      else if (item.displayControl.questionLayout && dataType === "SECTION") {
        if (item.displayControl.questionLayout === "horizontal") {
          itemControlType = "gtable"; // Not in STU3, but the binding is extensible, so we can use it
          itemControlDisplay = "Group Table";
        }
        else if (item.displayControl.questionLayout === "matrix") {
          itemControlType = "table";
          itemControlDisplay = "Vertical Answer Table";
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
                "display": itemControlDisplay
              }],
              "text": itemControlDisplay || itemControlType
            }
          });
        // answer choice orientation
        if (answerChoiceOrientation) {
          targetItem.extension.push(
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation",
              "valueCode": answerChoiceOrientation
            });
        }
      }
    }
  };


  /**
   * Process an item's terminology server setting.
   * @param targetItem a QuestionnaireResponse object
   * @param item an item in the LForms form object
   * @returns {*}
   * @private
   */
  self._handleTerminologyServer = function(targetItem, item) {
    if (item.terminologyServer) {
      targetItem.extension.push({
        "url": self.fhirExtTerminologyServer,
        "valueUrl": item.terminologyServer
      });
    }
  };



  /**
   * Convert LForms data type to FHIR SDC data type
   * @param item an item in the LForms form object
   * @returns {string}
   * @private
   */
  self._getFhirDataType = function(item) {

    var dataType = this._getAssumedDataTypeForExport(item);
    var type = this._lformsTypesToFHIRTypes[dataType];
    // default is string
    if (!type) {
      type = 'string';
    }
    return type;
  };


  /**
   * Determine how an item's data type should be for export.

   If number type has multiple units, change it to quantity type. In such a case,
   multiple units are converted to quesionnaire-unitOption extension and the default unit
   would go into initial.valueQuantity.unit.
   For single unit numbers, use the same type, whose unit will be in questionnaire-unit extension.

   * @param item an item in the LForms form object
   * @returns {string} dataType - Data type in lforms
   * @private
   */
  self._getAssumedDataTypeForExport = function (item) {
    var dataType = item.dataType;
    if((item.dataType === 'REAL' || item.dataType === 'INT') && item.units && item.units.length > 1) {
      dataType = 'QTY';
    }
    return dataType;
  };


  /**
   * Make a FHIR Quantity for the given value and unit info.
   * @param value optional, must be an integer or decimal
   * @param itemUnit optional, lform data item.unit (that has a name property)
   * @param unitSystem optional, overrides any system in itemUnit.
   * @return a FHIR quantity or null IFF the given value is not a number (parseFloat() returns NaN).
   * @private
   */
  self._makeValueQuantity = function(value, itemUnit, unitSystem) {
    let fhirQuantity = {};
    let floatValue = parseFloat(value);

    if(! isNaN(floatValue)) {
      fhirQuantity.value = floatValue;
    }

    if(itemUnit) {
      self._setUnitAttributesToFhirQuantity(fhirQuantity, itemUnit);
      if(unitSystem) {
        fhirQuantity.system = unitSystem;
      }
    }

    return (Object.keys(fhirQuantity).length > 0) ? fhirQuantity : null;
  };


  /**
   * Make a FHIR Quantity for the given value and unit info.
   * @param value required, must be an integer or decimal
   * @param itemUnits optional, lform data item.units (An array of units)
   * @param unitSystem optional.
   * @return a FHIR quantity or null IFF the given value is not a number (parseFloat() returns NaN).
   * @private
   */
  self._makeQuantity = function(value, itemUnits, unitSystem) {
    var defaultUnit = this._getDefaultUnit(itemUnits);
    return this._makeValueQuantity(value, defaultUnit, unitSystem);
  };


  /**
   * Pick a default unit if found, otherwise return first one as default. Will return
   * null, if passed with empty list.
   * @param lformsUnits - Array of lforms units i.e with {name, default}
   * @returns {*} Return lforms unit if found otherwise null.
   * @private
   */
  self._getDefaultUnit = function (lformsUnits) {
    if(!lformsUnits || lformsUnits.length === 0) {
      return null;
    }

    var ret = null;
    for(var i = 0; i < lformsUnits.length; i++) {
      if (lformsUnits[i].default) {
        ret = lformsUnits[i];
        break;
      }
    }

    if(!ret) {
      ret = lformsUnits[0];
    }

    return ret;
  };


  /**
   * Create a key from data type to be used in a hash
   * @param prefix a prefix to be added to the key
   * @param item a LForms item
   * @returns {*}
   * @private
   */
  self._getValueKeyByDataType = function(prefix, item) {

    // prefix could be 'value', 'initial', 'answer'
    if (!prefix) {
      prefix = "value"
    }

    var fhirType = this._getFhirDataType(item);
    var dataType = fhirType === 'quantity' ? 'QTY' : item.dataType;
    var valueKey = this._lformsTypesToFHIRFields[dataType];

    return prefix + valueKey;
  };


  /**
   * Convert the minInclusive/minExclusive, maxInclusive/maxExclusive to FHIR. See the
   * the function _handleRestrictions() in sdc-export.js for more details on the context.
   * @param dataType Lforms data type, currently supporting DT, DTM, TM, REAL, and INT.
   * @param value the value (in the lforms system, either a number or a string).
   * @param valueKey the valueKey in FHIR minValue/maxValue extension (e.g., valueInteger)
   * @param minMaxKey must be one of minInclusive, minExclusive, maxInclusive, maxExclusive
   * @return The FHIR extension element. Specifically, undefined is returned if:
   *         - the given value is null or undefined, or
   *         - the dataType is not one of those listed above, or
   *         - the minMaxKey is not one of those listed above
   * @private
   */
  self._MIN_MAX_TYPES = ['DT', 'DTM', 'TM', 'REAL', 'INT']
    .reduce((map, t) => {map[t] = t; return map;}, {});
  self._MIN_MAX_KEYS = ['minExclusive', 'minInclusive', 'maxExclusive', 'maxInclusive']
    .reduce((map, t) => {map[t] = t; return map;}, {});

  self._exportMinMax = function(dataType, value, valueKey, minMaxKey) {
    if(value === null || value === undefined
      || ! self._MIN_MAX_TYPES[dataType] || ! self._MIN_MAX_KEYS[minMaxKey]) {
      return undefined;
    }

    var isoDateStr = (dataType === "DT" || dataType === "DTM")? new Date(value).toISOString():
      dataType == "TM"? new Date('1970-01-01T' + value + 'Z').toISOString(): null;

    var fhirValue =
      dataType === "DT"? isoDateStr.substring(0, 10):
      dataType === "DTM"? isoDateStr:
      dataType === "TM"? isoDateStr.substring(11, isoDateStr.length-1):
      dataType === "REAL"? parseFloat(value): parseInt(value);

    var fhirExtUrl = minMaxKey.indexOf('min') === 0?
      'http://hl7.org/fhir/StructureDefinition/minValue':
      'http://hl7.org/fhir/StructureDefinition/maxValue';

    return {
      url: fhirExtUrl,
      [valueKey]: fhirValue
    };
  };


  // known source data types (besides CNE/CWE) in skip logic export handling,
  // see _createEnableWhenRulesForSkipLogicCondition below
  self._skipLogicValueDataTypes = ["BL", "REAL", "INT", 'QTY', "DT", "DTM", "TM", "ST", "TX", "URL"]
    .reduce((map, type) => {map[type] = type; return map;}, {});


  /**
   * @param skipLogicCondition - Lforms skip logic condition object
   * @param sourceItem - Skip logic source item in lforms.
   * @return {Array} FHIR enableWhen array
   * @private
   */
  self._createEnableWhenRulesForSkipLogicCondition = function (skipLogicCondition, sourceItem) {
    // dataTypes:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)
    let sourceDataType = this._getAssumedDataTypeForExport(sourceItem);
    let sourceValueKey = this._getValueKeyByDataType("answer", sourceItem);
    let enableWhenRules = [];

    // Per lforms spec, the trigger keys can be:
    // exists, value, minExclusive, minInclusive, maxExclusive, maxInclusive
    Object.keys(skipLogicCondition.trigger).forEach(function(key) {
      let operator = self._operatorMapping[key];
      let triggerValue = skipLogicCondition.trigger[key];
      if(! operator || triggerValue !== 0 && triggerValue !== false && ! triggerValue) {
        throw new Error('Invalid lforms skip logic trigger: ' + JSON.stringify(skipLogicCondition.trigger, null, 4));
      }

      let rule = null;
      if (operator === 'exists') {
        rule = { answerBoolean: triggerValue };
      }
      // for Coding
      // multiple selections, item.value is an array
      // NO support of multiple selections in FHIR SDC, just pick one
      else if ( sourceDataType === 'CWE' || sourceDataType === 'CNE' ) {
        let answerCoding = self._copyTriggerCoding(triggerValue, null, true);
        if (! answerCoding) {
          throw new Error('Invalid CNE/CWE trigger, key=' + key + '; value=' + triggerValue);
        }
        rule = { answerCoding: answerCoding };
      }
      else if (sourceDataType && self._skipLogicValueDataTypes[sourceDataType]) {
        let answer = triggerValue;
        if(sourceValueKey === 'answerQuantity') {
          answer = self._makeQuantity(answer, sourceItem.units);
        }
        if(answer === 0 || answer === false || answer) {
          rule = { [sourceValueKey]: answer };
        }
        else {
          throw new Error('Invalid value for trigger ' + key + ': ' + triggerValue);
        }
      }
      else {
        throw new Error('Unsupported data type for skip logic export: ' + sourceDataType);
      }

      rule.question = sourceItem.linkId;
      rule.operator = operator;
      enableWhenRules.push(rule);
    });

    return enableWhenRules;
  };


  /**
   * Set form level attribute
   * @param target a QuestionnaireResponse object
   * @param noExtensions  a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @param source a LForms form object

   * @private
   */
  self._setResponseFormLevelFields = function(target, source, noExtensions) {

    // resourceType
    target.resourceType = "QuestionnaireResponse";

    // meta
    var profile = noExtensions ? this.stdQRProfile : this.QRProfile;
    target.meta = target.meta ? target.meta : {};
    target.meta.profile = target.meta.profile ? target.meta.profile : [profile];

    // "identifier": - not including identifier in QuestionnaireResponse per LF-1183
    //target.identifier = {
    //  "system": LForms.Util.getCodeSystem(source.codeSystem),
    //  "value": source.code
    //};

    // status, required
    // "in-progress", "completed", "amended"
    target.status = "completed";

    // authored, required
    target.authored = LForms.Util.dateToDTMString(new Date());

    // questionnaire , required
    // We do not have the ID at this point, so leave it unset for now.  Note
    // that the fomat has also changed from Reference to canonical in R4.
    /*
    target.questionnaire = {
      // questionnaireId should be an id of a related existing questionnaire resource stored in the server
      "reference": "Questionnaire/{{questionnaireId}}"
    };
    */
  };


  /**
   * Set unit attributes to a given FHIR quantity.
   *
   * @param fhirQuantity - FHIR Quantity object
   * @param lfUnit - Lforms unit, which includes name, code and system.
   * @private
   */
  self._setUnitAttributesToFhirQuantity = function(fhirQuantity, lfUnit) {
    if(fhirQuantity && lfUnit) {
      if(lfUnit.name) {
        fhirQuantity.unit = lfUnit.name;
      }

      if(lfUnit.code) {
        fhirQuantity.code = lfUnit.code;
      }

      // Unit system is optional. It was using a default system before,
      // Now we have an defined system field, read it from data and
      // not assume a default.
      if(lfUnit.system) {
        fhirQuantity.system = lfUnit.system;
      }
    }
  };


  /**
   * Create a FHIR coding object for a unit.
   *
   * @param lfUnit - Lforms unit, which includes name, code and system.
   * @returns FHIR coding object
   * @private
   */
  self._createFhirUnitCoding = function(lfUnit) {
    var ret = null;
    if(lfUnit) {
      ret = {};
      if(lfUnit.code) {
        ret.code = lfUnit.code;
      }
      if(lfUnit.name) {
        ret.display = lfUnit.name;
      }
      if(lfUnit.system) {
        ret.system = lfUnit.system;
      }
    }
    return ret;
  };


  /**
   * Converting the given item's value to FHIR QuestionaireResponse.answer (an array).
   * This is almost straightly refactored out of the original function self._handleAnswerValues.
   * This function only looks at the item value itself and not its sub-items, if any.
   * Here are the details for a single value's conversion (to an element in the returned answer array)
   * - For item data type quantity (QTY), a valueQuantity answer element will be created IF
   *   either (or both) item value or item unit is available.
   * - For item data types boolean, decimal, integer, date, dateTime, instant, time, string, attachment, and url,
   *   it will be converted to a FHIR value{TYPE} entry if the value is not null, not undefined, and not
   *   an empty string.
   * - For CNE and CWE, a valueCoding entry is created IF at least one of the item value's code, text, or system
   *   is available
   * - No answer entry will be created in all other cases, e.g., for types reference, title, section, etc.
   * @param item the item whose value is to be converted
   * @return the converted FHIR QuestionnaireResponse answer (an array), or null if the value is not converted -
   *         see the function description above for more details.
   * @private
   */
  self._lfItemValueToFhirAnswer = function(item) {

    // item could have an empty value if its sub-item has a value
    if (item.value === undefined || item.value === null || item.value === '')
       return null;

    var dataType = this._getAssumedDataTypeForExport(item);
    var values = this._answerRepeats(item)? item.value: [item.value];
    var answers = [];
    for(var i=0; i < values.length; ++i) {
      var itemValue = values[i];
      if(itemValue !== undefined && itemValue !== null && itemValue !== '') {
        var answer = null;
        // for Coding
        if (dataType === 'CWE' || dataType === 'CNE') {
          // for CWE, the value could be string if it is a user typed, not-on-list value
          if (dataType === 'CWE' && typeof itemValue === 'string') {
            answer = { "valueString" : itemValue };
          }
          else if (!jQuery.isEmptyObject(itemValue)) {
            var answerCoding = this._setIfHasValue(null, 'system', LForms.Util.getCodeSystem(itemValue.system));
            answerCoding = this._setIfHasValue(answerCoding, 'code', itemValue.code);
            answerCoding = this._setIfHasValue(answerCoding, 'display', itemValue.text);
            answer = this._setIfHasValue(null, 'valueCoding', answerCoding);
          }
        }
        // for Quantity
        else if (dataType === "QTY") {
          // For now, handling only simple quantities without the comparators.
          // [{
          //   // from Element: extension
          //   "value" : <decimal>, // Numerical value (with implicit precision)
          //   "comparator" : "<code>", // < | <= | >= | > - how to understand the value
          //   "unit" : "<string>", // Unit representation
          //   "system" : "<uri>", // Code System that defines coded unit form
          //   "code" : "<code>" // Coded form of the unit
          // }]
          answer = this._setIfHasValue(null, 'valueQuantity', this._makeValueQuantity(itemValue, item.unit));
        }
        // for boolean, decimal, integer, date, dateTime, instant, time, string, uri, attachment
        else if (this._lformsTypesToFHIRFields[dataType]) {
          var valueKey = this._getValueKeyByDataType("value", item);
          answer = {[valueKey]: itemValue};
        }
        if(answer !== null) {
          answers.push(answer);
        }
      }
    }

    return answers.length === 0? null: answers;
  };


  /**
   * Check if an lform item has sub-items, that is, having an "items" field whose value is an array with non-zero length.
   * @param item the item to be checked for the presense of sub-items.
   * @return {*|boolean} true if the item has sub-items, false otherwise.
   * @private
   */
  self._lfHasSubItems = function(item) {
    return item && item.items && Array.isArray(item.items) && item.items.length > 0;
  };


  /**
   * Process an item of the form or the form itself - if it's the form itself, the form-level
   * properties will not be set here and will need to be managed outside of this function.
   * If the lforms item is repeatable, this function handles one particular occurrence of the item.
   * @param lfItem an item in LForms form object, or the form object itself
   * @param isForm optional, default false. If true, the given item is the form object itself.
   * @returns {{}} the converted FHIR item
   * @private
   */
  self._processResponseItem = function(lfItem, isForm) {
    if(isForm && (typeof isForm) !== 'boolean') { // just in case some are invoking it the old way.
      throw new Error('_processResponseItem function signature has been changed, please check/fix.');
    }
    var targetItem = (isForm || lfItem.dataType === 'TITLE')? {}: {
        linkId: lfItem.linkId,
        text: lfItem.question
      };

    // just handle/convert the current item's value, no-recursion to sub-items at this step.
    if (!isForm && lfItem.dataType !== 'TITLE' && lfItem.dataType !== 'SECTION') {
      this._setIfHasValue(targetItem, 'answer', this._lfItemValueToFhirAnswer(lfItem));
    }

    if(this._lfHasSubItems(lfItem)) {
      var fhirItems = [];
      for (var i=0; i < lfItem.items.length; ++i) {
        var lfSubItem = lfItem.items[i];
        if(! lfSubItem._isProcessed) {
          var linkId = lfSubItem.linkId;
          var repeats = lfItem._repeatingItems && lfItem._repeatingItems[linkId];
          if(repeats) {      // Can only be questions here per _processRepeatingItemValues
            let fhirItem = { // one FHIR item for all repeats with the same linkId
              linkId: linkId,
              text: lfSubItem.question,
              answer: []
            };
            for(var rpt=0; rpt < repeats.length; ++rpt) {
              var rptItem = repeats[rpt];
              var tmpFhirItem = this._processResponseItem(rptItem);
              if(tmpFhirItem.answer) {
                // TODO: not sure how to handle cases when both (lforms) question and answer repeat.
                // For now, just put all the answers from question and answer repeats into the answer (array).
                Array.prototype.push.apply(fhirItem.answer, tmpFhirItem.answer);
              }
              rptItem._isProcessed = true;
            }
            fhirItems.push(fhirItem);
            delete lfItem._repeatingItems[linkId]; // cleanup, no longer needed
          }
          else {
            let fhirItem = this._processResponseItem(lfSubItem);
            fhirItems.push(fhirItem);
          }
        }

        if(lfSubItem._isProcessed) {
          delete lfSubItem._isProcessed; // cleanup, no longer needed
        }
      }

      if(fhirItems.length > 0) {
        if(! isForm && lfItem.dataType !== 'SECTION') {
          // Question repeat is handled at the "parent level"; TODO: not sure how to handle answer repeat here,
          // assuming it isn't possible for an item to have answer repeat and sub-items at the same time.
          targetItem.answer = targetItem.answer || [];
          targetItem.answer[0] = targetItem.answer[0] || {};
          targetItem.answer[0].item = fhirItems;
        }
        else {
          targetItem.item = fhirItems;
        }
      }
    }

    return targetItem;
  };


  /**
   * Group values of the questions that have the same linkId
   * @param item an item in the LForms form object or a form item object
   * @private
   *
   */
  self._processRepeatingItemValues = function(item) {
    if (item.items) {
      for (var i=0, iLen=item.items.length; i<iLen; i++) {
        var subItem = item.items[i];
        // if it is a question and it repeats
        if (subItem.dataType !== 'TITLE' && subItem.dataType !== 'SECTION' && this._questionRepeats(subItem)) {
          var linkId = subItem.linkId;
          item._repeatingItems = item._repeatingItems || {};
          item._repeatingItems[linkId] = item._repeatingItems[linkId] || [];
          item._repeatingItems[linkId].push(subItem);
        }
        // if it's a section or a question that has children items
        if(this._lfHasSubItems(subItem)) {
          this._processRepeatingItemValues(subItem);
        }
      }
    }
  };


  /**
   * Get the extract value for the item or the closest parent
   * @param item an item in Questionnaire
   */
  self._getExtractValue = function (item) {
    let currentItem = item;

    while (true) {
      if (currentItem._fhirExt && currentItem._fhirExt[this.fhirExtObsExtract]) {
        return currentItem._fhirExt[this.fhirExtObsExtract][0].valueBoolean;
      } else if (!currentItem._parentItem) {
        return false;
      }
      currentItem = currentItem._parentItem;
    }
  };


  /**
   * Check if the item has a value
   * @param {*} item  an item in lforms with attritues set by lforms
   * @returns {boolean}
   */
  self._hasItemValue = function (item) {
    // not a group item, or a display item
    // not hidden by skip logic 
    // has values
    return item.dataType!=="SECTION" && item.dataType!=="TITLE" &&
           item._skipLogicStatus!== "target-disabled" &&
           !LForms.Util.isItemValueEmpty(item.value) ? true : false;
  };

  
}

export default addCommonSDCExportFns;
