/* jshint -W097 */ // suppress jshint warning about strict
/* jshint node: true */ // suppress warning about "require"
"use strict";

import {LOINC_URI} from './fhir-common';

var _versionTagStr = 'lformsVersion: ';

/**
 *  Defines export functions that are the same across the different FHIR
 *  versions and that are used by both the SDC and DiagnosticReport exports.
 */
var self = {

  /**
   *  Creates Observation resources from an LForms item object
   * @param item an LForms item object
   * @param setId (optional) a flag indicating if a unique ID should be set on the Observation resource
   * @returns {{}} an array of observation resources representing the values
   *  stored in the item.
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
        values = [this._createObsIntValue(item)];
        break;
      case "REAL":
        // A "real" data type should be exported as valueQuantity, because
        // there is no valueDecimal for Observation (as of R4).
      case "QTY":
        var valValue = {value: item.value};
        this._setFHIRQuantityUnit(valValue, item.unit);
        values = [{
          key: "valueQuantity",
          val: valValue
        }];
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
            var coding = {};
            if (val.code) coding.code = val.code;
            if (val.text) coding.display = val.text;
            var codeSystem = val.system;
            if (codeSystem) coding.system = LForms.Util.getCodeSystem(codeSystem);
            values.push(
                { key: "valueCodeableConcept",
                  val: {
                    "coding" : [coding],
                    "text": coding.display
                  }
                }
            );
          }
          else if (typeof val === "string") {
            if (val !== "") {
              values.push(
                  { key: "valueString",
                    val: val
                  }
              );
            }
          }
        }
        break;
      case "attachment":
        values = [{
          key: "valueAttachment",
          val: item.value
        }];
        break;
      case "BL":
        values = [{
          key: "valueBoolean",
          val: item.value // undefined, null, or '' values should have been skipped before calling this function
        }];
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
      this._addVersionTag(obx);
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
  },


  /**
   *  Sets the unit for a Quantity.
   * @param qty the FHIR Quantity structure whose unit will be set.  This
   *  function assumes there is no unit information already set.
   * @param unit An LForms unit object.
   */
  _setFHIRQuantityUnit: function(qty, unit) {
    if (unit) {
      if (unit.name) qty.unit = unit.name;
      if (unit.code) qty.code = unit.code;
      if (unit.system) qty.system = unit.system;
    }
  },


  /**
   *  Returns and creates if necessary the tag array object on the resource.  If
   *  created, the given resource will be modified.
   * @param res the resource whose tag array is needed.
   */
  _resTags: function(res) {
    var meta = res.meta;
    if (!meta)
      meta = (res.meta = {});
    var tag = meta.tag;
    if (!tag)
      tag = (meta.tag = []);
    return tag;
  },


  /**
   *  Sets the LForms version tag on a FHIR resource to indicate the LForms version used to
   *  export it.  This will replace any version tag already present.
   * @param res the resource object to be tagged.
   */
  _setVersionTag: function(res) {
    var tags = this._resTags(res);
    // Delete any lformsVersion tag present.  There should be at most one
    for (var i=0, len=tags.length; i<len; ++i) {
      var t = tags[i];
      if (t.code && t.code.indexOf(_versionTagStr)===0) {
        tags.splice(i, 1);
        break;
      }
    }
    this._addVersionTag(res);
  },


  /**
   *  Adds a tag to a FHIR resource to indicate the LForms version used to
   *  export it.  Assumes the version tag does not already exist.
   * @param res the resource object to be tagged.
   */
  _addVersionTag: function(res) {
    var tag = this._resTags(res);
    tag.push({code: _versionTagStr+LForms.lformsVersion});
  }
};

export default self;
