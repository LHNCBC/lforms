"use strict";

import {LOINC_URI} from './fhir-common';

/**
 *  Defines export functions that are the same across the different FHIR
 *  versions and that are used by both the SDC and DiagnosticReport exports.
 */
var self = {

  /**
   * Create an Observation instance from an LForms item object
   * @param item an LForms item object
   * @param id (optional) an "id" value for the Observation.
   * @returns {{}} an observation instance
   * @private
   */
  _createObservation : function(item, obxID) {

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
        valueX.key = "valueQuantity";
        valueX.val = {
          "value": item.value,
          "unit": item.unit ? item.unit.name : null,
          "system": item.unit ? item.unit.system : null,
          "code": item.unit ? item.unit.code : null
        };
        break;
      case "DT":
        valueX.key = "valueDateTime";
        valueX.val = item.value;
        break;
      case "CNE":
      case "CWE":
        valueX.key = "valueCodeableConcept";
        var max = item.answerCardinality.max;
        if (max && (max === "*" || parseInt(max) > 1)) {
          var coding = [];
          for (var j=0,jLen=item.value.length; j<jLen; j++) {
            coding.push({
              "system": item.value[j].codeSystem || item.answerCodeSystem,
              "code": item.value[j].code,
              "display": item.value[j].text
            });
          }
          valueX.val = {
            "coding": coding
          }
        }
        else {
          valueX.val = {
            "coding": [
              {
                "system": item.value.codeSystem || item.answerCodeSystem,
                "code": item.value.code,
                "display": item.value.text
              }
            ],
            "text": item.value.text
          };
        }
        break;
      default:
        valueX.key = "valueString";
        valueX.val = item.value;
    }

    // create Observation
console.log(LOINC_URI);
console.log(item.questionCodeSystem);
    var qCodeSystem = (!item.questionCodeSystem || item.questionCodeSystem==='LOINC') ?
      LOINC_URI : item.questionCodeSystem;
    var obx = {
      "resourceType": "Observation",
      "status": "final",
      "code": {
        "coding": [
          {
            "system": qCodeSystem,
            "code": item.questionCode
          }
        ],
        "text": item.question
      }
    };

    if (obxID)
      obx.id = obxID;

    if (!item.header) {
      obx[valueX.key] = valueX.val;
    }

    return obx;
  }
}

export default self;
