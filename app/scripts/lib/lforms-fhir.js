/**
 * A package to handle FHIR data for LForms.
 * It can only generate FHIR DiagnosticReport resource from a LForms data,
 * and can only merge the FHIR DiagnosticReport data it generates back to a LForms form.
*/
if (typeof LForms === 'undefined')
  LForms = {};

LForms.FHIR = {

  /**
   * Functions for creating a DiagnosticReport instance from a LFormsData object
   */

  /** Get date in a standard string format
   * @param dateObj, a date object
   * @returns {string}
   * @private
   */
  _getFormattedDate : function (dateObj) {
    var formattedDate = '';    //"2013-01-27T11:45:33+11:00",
    if (dateObj) {
      var offset = dateObj.getUTCOffset();
      offset = offset.slice(0,-2) + ":" + offset.slice(-2);
      formattedDate = dateObj.toString("yyyy-MM-ddTHH:mm:ss") + offset;
    }
    return formattedDate;
  },


  /**
   * Get a patient's display name
   * @param patient
   * @returns {string}
   * @private
   */
  _getPatientName : function(patient) {
    var name = "";
    if (patient && patient.name) {
      if (patient.name.length > 0) {
        name = patient.name[0].given[0] + " " + patient.name[0].family[0];
      }
    }
    return name;
  },


  /**
   * Get the additional data in LForms' obrItems
   * Note: For DiagnosticReport only the effectiveDateTime is needed
   * @param formData, a LFormsData object
   * @returns {{}}
   * @private
   */
  _getExtensionData : function(formData) {
    var extension = {};
    if (formData.templateOptions.obrItems.length>0) {
      for(var i=0, iLen= formData.templateOptions.obrItems.length; i<iLen; i++) {
        var obrItem = formData.templateOptions.obrItems[i];
        if (obrItem.questionCode === 'date_done' && obrItem.value) {
          extension["lforms_dateDone"] = this._getFormattedDate(obrItem.value);
        }

        if (obrItem.questionCode === 'where_done' && obrItem.value) {
          extension["lforms_whereDone"] = {
            display: obrItem.value.text
          }
        }
        if (obrItem.questionCode === 'time_done' && obrItem.value) {
          extension["lforms_timeDone"] = obrItem.value;
        }
        if (obrItem.questionCode === 'comment' && obrItem.value) {
          extension["lforms_comments"] = obrItem.value;
        }

      }
    }
    return extension;
  },


  /**
   * Generate a unique ID for a given Observation code
   * @param itemCode, code of the item
   * @param min, the minimum value of a range for a random number
   * @param max, the maximum value of a range for a random number
   * @returns {string}
   * @private
   */
  _getUniqueId : function(itemCode, min, max) {
    if (min === undefined) {
      min = 1;
    }
    if (max === undefined) {
      max = 1000000;
    }
    return itemCode + "-" + Math.floor((Math.random() * (max - min + 1)) + min);
  },


  /**
   * A recursive function that generates the DiagnosticReport content by
   * going through the LForms form data structure
   * @param item, an LForms item
   * @param contained, the "contained" field in a DiagnosticReport where all the Observation instances are kept.
   * @returns {{result: Array, resultObj: Array}}
   * @private
   */
  _createDiagnosticReportContent : function (item, contained) {
    // return the content of "result" and "contained"
    var content = {
      result: [],
      resultObj: []
    };

    for(var i=0, iLen=item.items.length; i<iLen; i++) {
      var subItem = item.items[i];
      if (subItem) {
        var obx = this._createObservation(subItem);
        if (subItem.items && subItem.items.length>0) {
          obx.related = [];
          var ret = this._createDiagnosticReportContent(subItem, contained);
          for(var j=0, jLen=ret.result.length; j<jLen; j++) {
            var subObxRef = ret.result[j];
            obx.related.push({
              type: "has-member",
              target: {
                reference: subObxRef.reference
              }
            });
          }
        }
        contained.push(obx);
        content.result.push({
          reference: "#" + obx.id
        });
        content.resultObj.push(obx);
      }
    }
    return content;
  },


  /**
   * Create an Observation instance from a LForms item object
   * @param item, a LForms item object
   * @returns {{resourceType: string, id: *, status: string, code: {coding: *[], text: *}}}
   * @private
   */
  _createObservation : function(item) {

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
          "system": "http://unitsofmeasure.org",
          "code": item.unit ? item.unit.name : null
        };
        break;
      case "DT":
        valueX.key = "valueDateTime";
        valueX.val = item.value.toString("s");
        break;
      case "CNE":
      case "CWE":
        valueX.key = "valueCodeableConcept";
        if (item.answerCardinality.max &&
            (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
          var coding = [];
          for (var j=0,jLen=item.value.length; j<jLen; j++) {
            coding.push({
              "system": "http://loinc.org",
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
                "system": "http://loinc.org",
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
    var obx = {
      "resourceType": "Observation",
      "id": this._getUniqueId(item.questionCode),
      "status": "final",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": item.questionCode
          }
        ],
        "text": item.question
      }
    };

    if (!item.header) {
      obx[valueX.key] = valueX.val;
    }

    return obx;
  },


  /**
   * Generate FHIR DiagnotisReport data from LForms form data
   * @param formData, a LFormsData object
   * @param patient, optional, patient data
   * @returns {*}
   */
  createRDiagnosticReport : function(formData, patient) {
    var dr = null, contained =[];
    if (formData) {

      var formAndUserData = formData.getFormData(true,true,true);

      var drContent = this._createDiagnosticReportContent(formAndUserData, contained);

      dr = {
        "resourceType": "DiagnosticReport",
        "id":  this._getUniqueId(formData.code),
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": formData.code,
              "display": formData.name
            }
          ],
          "text": formData.name
        },
        "result": drContent.result,
        "contained": contained
      };

      // patient data
      if (patient) {
        dr["subject"] = {
          "reference": "Patient/" + patient.id,
          "display": this._getPatientName(patient)
        }
      }
      // obr data
      var extension = this._getExtensionData(formData);
      if (extension["lforms_dateDone"]) {
        dr["effectiveDateTime"] = extension["lforms_dateDone"];
      }
      // issued
      dr["issued"] = this._getFormattedDate(new Date());
    }
    return dr;
  },


  /**
   * Functions for merging a DiagnosticReport instance into a LFormsData object
   */

  /**
   * Find an observation from the "contained" list by an observation id
   * @param refId, an observation instance's id
   * @param contained, the "contained" field in a DiagnosticReport instance
   * @returns {*}
   * @private
   */
  _findObxById : function(refId, contained) {
    var obx = null;
    if (refId) {
      var id = refId.slice(1);
      for(var i=0, iLen=contained.length; i<iLen; i++) {
        if (contained[i].id === id) {
          obx = contained[i];
          break;
        }
      }
    }
    return obx;
  },


  /**
   * Merge an Observation instance into an item object
   *
   * @param obx
   * @param item
   * @private
   */
  _setupItemValueAndUnit : function(obx, item) {
    if (obx.code.coding[0].code === item.questionCode) {
      var dataType = item.dataType;
      // any one has a unit must be a numerical type, let use REAL for now.
      // dataType conversion should be handled when panel data are added to lforms-service.
      if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
        dataType = "REAL";
      }

      switch (dataType) {
        case "INT":
        case "REAL":
          item.value = obx.valueQuantity.value;
          item.unit = {name: obx.valueQuantity.code};
          break;
        case "DT":
          item.value = (Date.parse(obx.valueDateTime)).toString();
          break;
        case "CNE":
        case "CWE":
          if (item.answerCardinality.max &&
              (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            var value = [];
            for (var j=0,jLen=obx.valueCodeableConcept.coding.length; j<jLen; j++) {
              var coding = obx.valueCodeableConcept.coding[j];
              value.push({
                "code": coding.code,
                "text": coding.display
              });
            }
            item.value = value;
          }
          else {
            item.value = {
              "code": obx.valueCodeableConcept.coding[0].code,
              "text": obx.valueCodeableConcept.coding[0].display
            };
          }

          break;
        case "SECTION":
        case "TITLE":
        case "":
          // do nothing
          break;
        default:
          item.value = obx.valueString;
      }
    }
  },

  /**
   * Find the number of the repeating items that have the same code
   * in the "contained" field of a DiagnosticReport instance
   * @param refIdList, a list Observation instance IDs to be checked
   * @param code, an item code
   * @param contained, a list of Observation instances (in the "contained")
   * @returns {{total: number, refIds: Array}}
   * @private
   */
  _findTotalRepeatingNum : function(refIdList, code, contained) {

    var total = 0;
    var refIds = [];
    for (var i=0, iLen=refIdList.length; i<iLen; i++) {
      var obx = this._findObxById(refIdList[i], contained);
      if (obx.code.coding[0].code === code) {
        refIds.push(refIdList[i]);
        total += 1;
      }
    }

    return {
      total: total,
      refIds: refIds
    }
  },


  /**
   * Generate a DiagnosticReport data structure by going though each level of sub panels
   * @param parentObxInfo, the parent Observation structure info
   * @param parentRefId, the parent Observation instance ID
   * @param diagnosticReport, the DiagnosticReport instance
   * @private
   */
  _checkRepeatingItems : function(parentObxInfo, parentRefId, diagnosticReport) {

    var obxInfoList = [];
    var repeatingItemInfo = {};
    var obxIdList = [];

    // the report level
    if (!parentRefId && diagnosticReport.result) {
      for (var i=0, iLen=diagnosticReport.result.length; i<iLen; i++) {
        obxIdList.push(diagnosticReport.result[i].reference);
      }
    }
    // obx level
    else {
      var parentObx = this._findObxById(parentRefId, diagnosticReport.contained);
      if (parentObx && parentObx.related) {
        for (var i=0, iLen=parentObx.related.length; i<iLen; i++) {
          obxIdList.push(parentObx.related[i].target.reference);
        }
      }
    }

    // go through each observation instance
    for (var i=0, iLen=obxIdList.length; i<iLen; i++) {
      var refId = obxIdList[i];
      var obx = this._findObxById(refId, diagnosticReport.contained);
      var itemCode =  obx.code.coding[0].code;
      // first obx that has the same item code
      if (!repeatingItemInfo[itemCode]) {
        var repeatingInfo = this._findTotalRepeatingNum(obxIdList, itemCode, diagnosticReport.contained);
        repeatingItemInfo[itemCode] = {
          total: repeatingInfo.total,
          refIds: repeatingInfo.refIds
        };
      }
      var repeatingRefIds = repeatingItemInfo[itemCode].refIds;
      for (var j=0, jLen=repeatingRefIds.length; j<jLen; j++) {
        if (refId === repeatingRefIds[j]) {

          var obxInfo = {
            code: itemCode,
            refId: refId,
            index: j,
            total: repeatingItemInfo[itemCode].total
          };
          // check observation instances in the sub level
          this._checkRepeatingItems(obxInfo, refId, diagnosticReport);
          obxInfoList.push(obxInfo);
        }
      }
    }
    parentObxInfo.obxInfoList = obxInfoList;
  },


  /**
   * Get structure information of a DiagnosticReport instance
   * @param diagnosticReport
   * @returns {{obxInfoList: Array}}
   * @private
   */
  _getReportStructure : function(diagnosticReport) {
    var reportStructure = {
      obxInfoList: []
    };

    if (diagnosticReport) {
      this._checkRepeatingItems(reportStructure, null, diagnosticReport);
    }
    return reportStructure;
  },


  /**
   * Find a matching repeating item
   * @param parentItem, a parent item
   * @param itemCode, code of a repeating (or non-repeating) item
   * @param index, index of the item in the sub item array of the parent item
   * @returns {*}
   * @private
   */
  _findTheMatchingItemByCodeAndIndex : function(parentItem, itemCode, index) {
    var item = null;
    var idx = 0;
    if (parentItem.items) {
      for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
        if (itemCode === parentItem.items[i].questionCode) {
          if (idx === index) {
            item = parentItem.items[i];
            break;
          }
          else {
            idx += 1;
          }
        }
      }
    }
    return item;
  },


  /**
   * Add repeating items
   * @param parentItem, a parent item
   * @param itemCode, code of a repeating item
   * @param total, total number of the repeating itme with the same code
   * @private
   */
  _addRepeatingItems : function(parentItem, itemCode, total) {
    // find the first (and the only one) item
    var item = null;
    if (parentItem.items) {
      for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
        if (itemCode === parentItem.items[i].questionCode) {
          item = parentItem.items[i];
          break;
        }
      }
      // insert new items
      if (item) {
        while(total > 1) {
          var newItem = angular.copy(item);
          parentItem.items.splice(i, 0, newItem);
          total -= 1;
        }
      }
    }
  },


  /**
   * Merge Observation instances into items on the same level
   * @param parentObxInfo, structural information of a parent item
   * @param parentItem, a parent item
   * @param diagnosticReport, a DiagnosticReport instance
   * @private
   */
  _processObxAndItem : function(parentObxInfo, parentItem, diagnosticReport) {
    for(var i=0, iLen=parentObxInfo.obxInfoList.length; i<iLen; i++) {

      var obxInfo = parentObxInfo.obxInfoList[i];
      var obx = this._findObxById(obxInfo.refId, diagnosticReport.contained);
      if (obx) {
        // first repeating obx
        if (obxInfo.total > 1 && obxInfo.index === 0) {
          // add repeating items in form data
          this._addRepeatingItems(parentItem, obxInfo.code, obxInfo.total);
        }

        var item = this._findTheMatchingItemByCodeAndIndex(parentItem, obxInfo.code, obxInfo.index);
        this._setupItemValueAndUnit(obx, item);

        // process items on sub level
        if (obxInfo.obxInfoList && obxInfo.obxInfoList.length>0) {
          this._processObxAndItem(obxInfo, item, diagnosticReport);
        }
      }
    }
  },


  /**
   * Merge a DiagnosticReport instance into a LFormsData object
   * @param formData, a LFormsData object
   * @param diagnosticReport, a DiagnosticReport instance
   * @returns {*}
   */
  mergeDiagnosticReportToForm : function(formData, diagnosticReport) {

    var reportStructure = this._getReportStructure(diagnosticReport);

    this._processObxAndItem(reportStructure, formData, diagnosticReport);

    // date
    if (diagnosticReport.effectiveDateTime) {
      var whenDone = new Date(diagnosticReport.effectiveDateTime);
      if (whenDone) {
        formData.templateOptions.obrItems[0].value = whenDone;
      }
    }
    return formData;
  }

};