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
          key:  "valueDate",
          val: item.value
        }];
        break;
      case "DTM":
        values = [{
          key:  "valueDateTime",
          val: item.value
        }];
        break;
      case "CNE":
      case "CWE":
        var max = item.answerCardinality.max;
        // multiple values, each value creates a separate Observation resource
        var itemValues;
        if (max && (max === "*" || parseInt(max) > 1)) {
          itemValues = item.value;
        }
        else {
          itemValues = [item.value];
        }
        for (var j=0,jLen=itemValues.length; j<jLen; j++) {
          var val = itemValues[j];
          if (typeof val === "object") {
            var coding = {
              "code": val.code,
              "display": val.text
            };
            var codeSystem = val.codeSystem;
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
          else if (typeof val === "string") {
            if (val !== "") {
              values.push(
                  { key: "valueString",
                    val: val
                  }
              )
            }
          }
        }
        break;
      default:
        values = [{
          key: "valueString",
          val: item.value
        }];
    }

    var obxs = [];
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
      obxs.push(obx);
    }
    return obxs;
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
