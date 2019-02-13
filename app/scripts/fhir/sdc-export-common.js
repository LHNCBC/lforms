/**
 *  Defines SDC export functions that are the same across the different FHIR
 *  versions.  The function takes SDC namespace object defined in the sdc export
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
      var source = lfData.getFormData(true,true,true,true);
      this._processRepeatingItemValues(source);
      this._setResponseFormLevelFields(target, source, noExtensions);

      if (source.items && Array.isArray(source.items)) {
        target.item = [];
        for (var i=0, iLen=source.items.length; i<iLen; i++) {
          if (!source.items[i]._repeatingItem) {
            var newItem = this._processResponseItem(source.items[i], source);
            target.item.push(newItem);
          }
        }
      }
    }
    // FHIR doesn't allow null values, strip them out.
    LForms.Util.pruneNulls(target);

    if (subject)
      target["subject"] = LForms.Util.createLocalFHIRReference(subject);

    return target;
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
    // Fly-over, Table, Checkbox, Combo-box, Lookup
    if (!jQuery.isEmptyObject(item.displayControl)) {
      var dataType = this._getAssumedDataTypeForExport(item);
      // for answers
      if (item.displayControl.answerLayout &&
        (dataType === "CNE" || dataType === "CWE")) {
        // search field
        if (item.externallyDefined) {
          itemControlType = "Lookup";
        }
        // prefetch list
        // combo-box
        else if (item.displayControl.answerLayout.type === "COMBO_BOX") {
          itemControlType = "Combo-box";
        }
        // radio or checkbox
        else if (item.displayControl.answerLayout.type === "RADIO_CHECKBOX") {
          if (item.answerCardinality &&
            (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            itemControlType = "Checkbox";
          }
          else {
            itemControlType = "Radio";
          }
        }
      }
      // for section item
      else if (item.displayControl.questionLayout && dataType === "SECTION") {
        if (item.displayControl.questionLayout === "horizontal") {
          itemControlType = "Table";
        }
        else if (item.displayControl.questionLayout === "matrix") {
          itemControlType = "Matrix";
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
                "display": itemControlType
              }],
              "text": itemControlType
            }
          });
      }
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
   * A single condition in lforms translates to two enableWhen rules in core FHIR.
   *
   * @param answerKey - The answer[x] string
   * @param skipLogicCondition - Lforms skip logic condition object
   * @param sourceItem - Skip logic source item in lforms.
   * @returns {Array} - Array of enableWhen rules (two of them)
   * @private
   */
  self._createEnableWhenRulesForRangeAndValue = function(answerKey, skipLogicCondition, sourceItem) {
    var ret = [];
    Object.keys(skipLogicCondition.trigger).forEach(function(key) {
      var rule = {
        question: sourceItem.linkId,
        operator: self._operatorMapping[key]
      };
      var answer = null;
      if(answerKey === 'answerQuantity') {
        answer = self._makeQuantity(skipLogicCondition.trigger[key], sourceItem.units);
      }
      else {
        answer = skipLogicCondition.trigger[key];
      }
      if(answer) {
        rule[answerKey] = answer;
        ret.push(rule);
      }
    });
    
    return ret;
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

    // "identifier":
    target.identifier = {
      "system": this._getCodeSystem(source.codeSystem),
      "value": source.code
    };

    // status, required
    // "in-progress", "completed", "amended"
    target.status = "completed";

    // authored, required
    target.authored = LForms.Util.dateToString(new Date());

    // questionnaire , required
    target.questionnaire = {
      // questionnaireId should be an id of a related existing questionnaire resource stored in the server
      "reference": "Questionnaire/{{questionnaireId}}"
    };
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
  
}

export default addCommonSDCExportFns;
