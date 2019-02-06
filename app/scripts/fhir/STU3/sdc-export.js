/**
 * A package to handle FHIR Questionnaire and SDC (STU2) Questionnaire and QuestionnaireResponse for LForms
 *
 * FHIR Questionnaire:
 * https://www.hl7.org/fhir/questionnaire.html
 *
 * STU2 SDC Ballot:
 * http://hl7.org/fhir/us/sdc/sdc-questionnaire.html
 * http://hl7.org/fhir/us/sdc/sdc-questionnaireresponse.html
 *
 * It provides the following functions:
 * convertLFormsToQuestionnaire()
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR (standard or SDC) Questionnaire data
 * convertLFormsToQuestionnaireResponse()
 * -- Generate FHIR (standard or SDC) QuestionnaireResponse data from captured data in LForms
 */
var sdcVersion = '2.0';
var fhirVersionNum = '3.0';

var self = {

  SDCVersion: sdcVersion,
  QProfile: 'http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire|'+sdcVersion,
  QRProfile: 'http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaireresponse|'+sdcVersion,
  stdQProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/Questionnaire',
  stdQRProfile: 'http://hl7.org/fhir/'+fhirVersionNum+'/StructureDefinition/QuestionnaireResponse',

  /**
   * Convert LForms form definition to standard FHIR Questionnaire or FHIR SDC Questionnaire
   * @param lfData a LForms form object
   * @param noExtensions a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @returns {{}}
   */
  convertLFormsToQuestionnaire: function(lfData, noExtensions) {
    var target = {};

    if (lfData) {
      var source = angular.copy(lfData);
      this._removeRepeatingItems(source);
      this._setFormLevelFields(target, source, noExtensions);

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
    return target;
  },


  /**
   * Remove repeating items in a form data object
   * @param source a LForms form data object
   * @private
   */
  _removeRepeatingItems: function(source) {

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
  },


  /**
   * Set form level attributes
   * @param target a Questionnaire object
   * @param source a LForms form object
   * @param noExtensions  a flag that a standard FHIR Questionnaire is to be created without any extensions.
   *        The default is false.
   * @private
   */
  _setFormLevelFields: function(target, source, noExtensions) {

    // resourceType
    target.resourceType = "Questionnaire";

    // status
    target.status = "draft";

    // date
    target.date = LForms.Util.dateToString(new Date());

    // version, assuming questionnaires are from LOINC forms
    target.version = "2.56";

    // url
    // TODO - Commented out until we figure out the right url. -Ajay
    // target.url = "http://hl7.org/fhir/us/sdc/Questionnaire/" + source.code;

    // meta
    var profile = noExtensions ? this.stdQProfile : this.QProfile;

    target.meta = target.meta ? target.meta : {};
    target.meta.profile = target.meta.profile ? target.meta.profile : [profile];

    // title
    target.title = source.name;

    // name
    target.name = source.name;

    var codeSystem = this._getCodeSystem(source.codeSystem);

    // "identifier": [
    target.identifier = [{
      "system": codeSystem,
      "value": source.code
    }];

    // code
    target.code = [{
      "system": codeSystem,
      "code": source.code,
      "display": source.name
    }];

    // subjectType
    target.subjectType = ["Patient", "Person"];

    if(source.id) {
      target.id = source.id;
    }

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
      targetItem.repeats = false;
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

    // calcuatedValue
    if (item._calculatedExprExt)
      targetItem.extension.push(item._calculatedExprExt);

    // http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl
    this._handleItemControl(targetItem, item);

    // questionnaire-choiceOrientation , not supported yet

    // check restrictions
    this._handleRestrictions(targetItem, item);

    // http://hl7.org/fhir/StructureDefinition/entryFormat
    // looks like tooltip, TBD

    // add LForms Extension to units list
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

    if(item._isHidden) {
      targetItem.extension.push({
        url: "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden",
        valueBoolean: true
      });
    }

    // linkId
    targetItem.linkId = item.linkId ? item.linkId : item._codePath;

    var codeSystem = this._getCodeSystem(item.questionCodeSystem);

    // code
    // if form data is converted from a FHIR Questionnaire that has no 'code' on items,
    // don't create a 'code' when converting it back to Questionnaire.
    if (codeSystem !== 'LinkId') {
      targetItem.code = [{
        "system": codeSystem,
        "code": item.questionCode,
        "display": item.question
      }];
    }

    // text
    targetItem.text = item.question;

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
    if(item.externallyDefined) {
      this._handleExternallyDefined(targetItem, item);
    }
    // option, for answer list
    else if (item.answers) {
      targetItem.option = this._handleAnswers(item, noExtensions);
    }

    // initialValue, for default values
    this._handleInitialValues(targetItem, item);

    if (item.items && Array.isArray(item.items)) {
      targetItem.item = [];
      for (var i=0, iLen=item.items.length; i<iLen; i++) {
        var newItem = this._processItem(item.items[i], source, noExtensions);
        targetItem.item.push(newItem);
      }
    }

    // handle special constraints for "display" item
    this._handleSpecialConstraints(targetItem, item);

    // if no extensions are allowed or there is no extension, remove it
    if (noExtensions || targetItem.extension.length === 0)
      delete targetItem.extension;

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
        var extValue;
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
            if (dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
              dataType === "REAL" || dataType === "INT" ) {
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/minValue"
              };
              extValue[valueKey] = parseInt(value);
            }
            break;
          // http://hl7.org/fhir/StructureDefinition/maxValue
          case "maxExclusive":
          case "maxInclusive":
            if (dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
              dataType === "REAL" || dataType === "INT" ) {
              extValue = {
                "url":"http://hl7.org/fhir/StructureDefinition/maxValue"
              };
              extValue[valueKey] = parseInt(value);
            }
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
   * Check if a LForms item has repeating questions
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  _questionRepeats: function(item) {
    return item && item.questionCardinality && item.questionCardinality.max &&
        (item.questionCardinality.max === "*" || parseInt(item.questionCardinality.max) > 1)
  },


  /**
   * Check if a LForms item has repeating answers
   * @param item a LForms item
   * @returns {*|boolean}
   * @private
   */
  _answerRepeats: function(item) {
    return item && item.answerCardinality && item.answerCardinality.max &&
        (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)
  },


  /**
   * Get a code system based on the code system value used in LForms
   * @param codeSystemInLForms code system value used in LForms
   * @private
   */
  _getCodeSystem: function(codeSystemInLForms) {

    var codeSystem;
    switch (codeSystemInLForms) {
      case "LOINC":
        codeSystem = "http://loinc.org";
        break;
      case "CDE": // TBD
      case undefined:
        codeSystem = "http://unknown"; // temp solution. as code system is required for coding
        break;
      default:
        codeSystem = codeSystemInLForms;

    }

    return codeSystem;
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

        if(answer.score) {
          ext.push({
            "url" : "http://hl7.org/fhir/StructureDefinition/questionnaire-ordinalValue",
            "valueDecimal" : parseFloat(answer.score)
          });
        }
        if(ext.length > 0) {
          option.extension = ext;
        }
      }
      // option's value supports integer, date, time, string and Coding
      // for LForms, all answers are Coding
      option.valueCoding = {
          "code": answer.code,
          "display": answer.text
      };

      if(item.answerCodeSystem) {
        option.valueCoding.system = this._getCodeSystem(item.answerCodeSystem);
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
        // multiple selections, item.value is an array
        // Note: NO support of multiple selections in FHIR SDC
        if (dataType === 'CWE' || dataType === 'CNE' ) {
          var codeSystem = this._getCodeSystem(item.questionCodeSystem);
          if (this._answerRepeats(item) && Array.isArray(values[i])) {
            for (var j=0, jLen=values[i].length; j<jLen; j++) {
              if (!jQuery.isEmptyObject(values[i][j])) {
                answer.push({
                  "valueCoding" : {
                    "system": codeSystem,
                    "code": values[i][j].code,
                    "display": values[i][j].text
                  }
                })
              }
              // empty answer ??
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
                  "system": codeSystem,
                  "code": values[i].code,
                  "display": values[i].text
                }
              })
            }
            // empty answer ??
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
        else if (dataType === "QTY") { // for now, handling only simple quantities without the comparators.
          var fhirQuantity = this._makeValueQuantity(values[i], item.unit);
          if(fhirQuantity) {
            answer.push({valueQuantity: fhirQuantity});
          }
        }
        // make a Quantity type if numeric values has a unit value
        else if (item.unit && typeof values[i] !== 'undefined' &&
            (dataType === "INT" || dataType === "REAL" || dataType === "ST")) {
          answer.push({
            "valueQuantity": {
              "value": parseFloat(values[i]),
              "unit": item.unit.name,
              "system": "http://unitsofmeasure.org",
              "code": item.unit.name
            }
          });
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
    // dataType:
    // boolean, decimal, integer, date, dateTime, instant, time, string, uri,
    // Attachment, Coding, Quantity, Reference(Resource)

    if (item.defaultAnswer) {
  
      var dataType = this._getAssumedDataTypeForExport(item);
      var valueKey = this._getValueKeyByDataType("initial", item);
      // for Coding
      // multiple selections, item.value is an array
      // NO support of multiple selections in FHIR SDC, just pick one
      if (dataType === 'CWE' || dataType === 'CNE' ) {
        var codeSystem = this._getCodeSystem(item.questionCodeSystem);
        if (this._answerRepeats(item) && Array.isArray(item.defaultAnswer)) {
          // TBD, defaultAnswer has multiple values
          // targetItem[valueKey] = [];
          // for(var i=0, iLen=item.defaultAnswer.length; i<iLen; i++ ) {
          //   targetItem[valueKey].push({
          //     "system": codeSystem,
          //     "code": item.defaultAnswer[i].code,
          //     "display": item.defaultAnswer[i].text
          //   })
          // };

          // pick the first one only
          targetItem[valueKey] = {
            "system": codeSystem,
            "code": item.defaultAnswer[0].code,
            "display": item.defaultAnswer[0].text
          };
        }
        // single selection, item.defaultAnswer is an object
        else {
          targetItem[valueKey] = {
            "system": codeSystem,
            "code": item.defaultAnswer.code,
            "display": item.defaultAnswer.text
          };
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
      else if (dataType === 'QTY') { // for now, handling only simple quantities without the comparators.
        var fhirQuantity = this._makeQuantity(item.value, item.units);
        if(fhirQuantity) {
          targetItem[valueKey] = fhirQuantity;
        }
      }
      // for boolean, decimal, integer, date, dateTime, instant, time, string, uri
      else if (dataType === "BL" || dataType === "REAL" || dataType === "INT" ||
        dataType === "DT" || dataType === "DTM" || dataType === "TM" ||
        dataType === "ST" || dataType === "TX" || dataType === "URL") {
        targetItem[valueKey] = item.defaultAnswer;
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
          "valueCoding" : {
            "system": "http://unitsofmeasure.org",
            // Datatype with multiple units is quantity. There is only one unit here.
            "code": item.units[0].name,
            "display": item.units[0].name
          }
        });
      }
      else if(dataType === 'QTY') {
        var defUnit = this._getDefaultUnit(item.units);
        if (defUnit) {
          // Use initial[].valueQuantity.unit to export the default unit.
          if (!targetItem.initial) {
            targetItem.initialQuantity = {};
          }
          targetItem.initialQuantity.system = "http://unitsofmeasure.org";
          targetItem.initialQuantity.unit = defUnit.name;
          targetItem.initialQuantity.code = defUnit.name;
        }
        for (var i=0, iLen=item.units.length; i<iLen; i++) {
          var unit = item.units[i];
          var fhirUnitExt = {
            "url": this.fhirExtUrlUnitOption,
            "valueCoding": {
              "system": "http://unitsofmeasure.org",
              "code": unit.name,
              "display": unit.name
            }
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
          "question": sourceItem._codePath
        };
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
        else if (dataType === 'QTY') { // for now, handling only simple quantities without the comparators.
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
