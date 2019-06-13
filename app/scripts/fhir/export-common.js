"use strict";

import {LOINC_URI} from './fhir-common';

/**
 *  Defines export functions that are the same across the different FHIR
 *  versions and that are used by both the SDC and DiagnosticReport exports.
 */
var self = {

  /**
   * Create an Observation resource from an LForms item object
   * @param item an LForms item object
   * @param setId (optional) a flag indicating if a unique ID should be set on the Observation resource
   * @returns {{}} an observation resource
   * @private
   */


  _createObservation: function(item, setId) {

    var values = [];

    var dataType = item.dataType;
    // any item has a unit must be a numerical type, let use REAL for now.
    if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
      dataType = "REAL";
    }
    switch (dataType) {
      case "INT":
      case "REAL":
        if (item.unit) {
          values = [{
            key: "valueQuantity",
            val: {
              "value": item.value,
              "unit": item.unit ? item.unit.name : null,
              "system": item.unit ? item.unit.system : null,
              "code": item.unit ? item.unit.code : null
            }
          }];
        }
        else {
          values = [{
            key: dataType == 'INT' ? "valueInteger" : "valueDecimal",
            val: item.value
          }];
        }
        break;
      case "DT":
        values = [{
          key:  "valueDateTime",
          val: item.value
        }];
        break;
      case "CNE":
      case "CWE":
        var max = item.answerCardinality.max;
        // multiple values, each value creates a separate Observation resource
        if (max && (max === "*" || parseInt(max) > 1)) {
          for (var j=0,jLen=item.value.length; j<jLen; j++) {
            var val = item.value[j];
            var coding = {
              "code": val.code,
              "display": val.text
            };
            var codeSystem = val.system || item.answerCodeSystem;
            if (codeSystem) {
              coding.system = LForms.Util.getCodeSystem(codeSystem);
            }
            values.push(
                { key: "valueCodeableConcept",
                  val: {
                    "coding" : [coding],
                    "text": coding.display
                  }
                }
            )
          }
        }
        else {
          var coding = {
            "code": item.value.code,
            "display": item.value.text
          };
          var codeSystem = item.value.system || item.answerCodeSystem;
          if (codeSystem) {
            coding.system = LForms.Util.getCodeSystem(codeSystem);
          }
          values = [{
            key: "valueCodeableConcept",
            val: {
              "coding" : [coding],
              "text": coding.display
            }
          }];
        }
        break;
      default:
        values = [{
          key: "valueString",
          val: item.value
        }];
    }


    var OBXs = [];
    for(var i=0, iLen=values.length; i<iLen; i++) {
      var obx = {
        "resourceType": "Observation",
        "status": "final",
        "code": {
          "coding": item.codeList,
          "text": item.question
        }
      };
      if (setId) {
        obx.id = this._getUniqueId(item.questionCode);
      }
      if (!item.header) {
        obx[values[i].key] = values[i].val;
      }
      OBXs.push(obx);
    }
    return OBXs;
  },


  _createObservation2 : function(item, obxID) {

    // get key and value
    var valueX = {
      key: "",
      val: ""
    };

    var dataType = item.dataType;
    // any item has a unit must be a numerical type, let use REAL for now.
    if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
      dataType = "REAL";
    }
    switch (dataType) {
      case "INT":
      case "REAL":
        if (item.unit) {
          valueX.key = "valueQuantity";
          valueX.val = {
            "value": item.value,
            "unit": item.unit ? item.unit.name : null,
            "system": item.unit ? item.unit.system : null,
            "code": item.unit ? item.unit.code : null
          };
        }
        else {
          value.key = dataType == 'INT' ? valueInteger : valueDecimal;
          valueX.val = item.value;
        }
        break;
      case "DT":
        valueX.key = "valueDateTime";
        valueX.val = item.value;
        break;
      case "CNE":
      case "CWE":
        // TBD -- This is wrong.  Multi-valued list fields should generate an array of Observations, each with one value.
        valueX.key = "valueCodeableConcept";
        var max = item.answerCardinality.max;
        var itemVals;
        if (max && (max === "*" || parseInt(max) > 1))
          itemVals = item.value;
        else
          itemVals = [item.value];
        var coding = [];
        for (var j=0,jLen=itemVals.length; j<jLen; j++) {
          var val = itemVals[j];
          var c = {
            "code": val.code,
            "display": val.text
          };
          var cSystem = val.system || item.answerCodeSystem;
          if (cSystem) {
            cSystem = LForms.Util.getCodeSystem(cSystem);
            c.system = cSystem;
          }
          coding.push(c);
        }
        valueX.val = {
          "coding": coding
        }
        if (coding.length === 1) // TBD after the above fix, length should always be 1
          valueX.val.text = coding[0].display;
        break;
      default:
        valueX.key = "valueString";
        valueX.val = item.value;
    }

    // create Observation
    var qCodeSystem = (!item.questionCodeSystem || item.questionCodeSystem==='LOINC') ?
      LOINC_URI : item.questionCodeSystem;

    var obx = {
      "resourceType": "Observation",
      "status": "final",
      "code": {
        "coding": item.codeList,
        "text": item.question
      }
    };

    if (obxID)
      obx.id = obxID;

    if (!item.header) {
      obx[valueX.key] = valueX.val;
    }

    return obx;
  },


  /**
   * Generate an almost unique ID for a given Observation code
   * @param prefix A prefix for the ID (e.g. a code or resource name)
   * @returns {string} a unique id
   * @private
   */
  _getUniqueId: function(prefix) {
    this._idCtr || (this._idCtr = 0);
    return prefix + "-" + Date.now() + '-' + ++this._idCtr + '-' +
      Math.random().toString(16).substr(2);
  }


}

export default self;
