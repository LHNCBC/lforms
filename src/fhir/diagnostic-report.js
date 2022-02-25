/**
 * A package to handle FHIR DiagnosticReport for LForms
 * https://www.hl7.org/fhir/diagnosticreport.html
 *
 * Note that this was written for DSTU2 and has not been updated.
 *
 * It provides the following functions:
 * createDiagnosticReport()
 * -- Convert existing LOINC panels/forms data in LForms format into FHIR DiagnosticReport data
 * mergeDiagnosticReportToLForms()
 * -- Merge FHIR SDC DiagnosticReport data into corresponding LForms data
 */

var dr = {

  // a prefix for references to Observation resources
  _OBX_REF_PREFIX: "Observation/",


  /**
   * Functions for creating a DiagnosticReport instance from an LFormsData object
   */

  /** Get date in a standard string format
   * @param dateObj, a date object
   * @returns {string} a formatted date string
   * @private
   */
  _getFormattedDate : function (dateObj) {
    //"2013-01-27T11:45:33+11:00",
    return dateObj ? LForms.Util.dateToDTMString(dateObj) : "";
  },


  /**
   * A recursive function that generates the DiagnosticReport content by
   * going through the LForms form data structure
   * @param item an LForms item
   * @param contained the "contained" field in a DiagnosticReport where all the Observation instances are kept.
   * @returns {{result: Array, resultObj: Array}} the content part of a Diagnostic Report instance
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
        var obx = this._commonExport._createObservation(subItem, true);
        if (subItem.items && subItem.items.length>0) {
          // single obx returned if it is a header item
          obx[0].related = [];
          var ret = this._createDiagnosticReportContent(subItem, contained);
          for(var j=0, jLen=ret.result.length; j<jLen; j++) {
            var subObxRef = ret.result[j];
            obx[0].related.push({
              type: "has-member",
              target: {
                reference: subObxRef.reference
              }
            });
          }
        }
        for (var l=0, lLen=obx.length; l<lLen; l++) {
          contained.push(obx[l]);
          content.result.push({
            reference: "#" + obx[l].id
          });
          content.resultObj.push(obx[l]);
        }
      }
    }
    return content;
  },


  /**
   * Convert a DiagnosticReport resource with contained Observation resources to
   * a FHIR Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * @param dr a DiagnosticReport resource with contained Observation resources
   * @param bundleType the FHIR Bundle type. Only "transaction" and "collection" types are allowed.
   * @returns {{}} a Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   */
  _convertFromContainedToBundle: function (dr, bundleType) {
    var bundleDr = {};

    // default bundleType
    if (!bundleType) {
      bundleType = "transaction";
    }
    if (dr) {
      switch(bundleType) {
        case "transaction":
          bundleDr = this._convertContainedToTransactionBundle(dr);
          break;
        case "collection":
          bundleDr = this._convertContainedToCollectionBundle(dr);
          break;
        default:
          console.log("Bundle type not supported: " + bundleType);
      }
    }
    return bundleDr;
  },


  /**
   * Convert a DiagnosticReport resource with contained Observation resources to
   * a FHIR "transaction" typed Bundle resource that includes a DiagnosticReport resource
   * and associated Observation resources
   * @param dr a DiagnosticReport resource with contained Observation resources
   * @returns {{}} a Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * @private
   */
  _convertContainedToTransactionBundle: function(dr) {

    var bundleDr = {
      resourceType:"Bundle",
      type: "transaction",
      entry: []
    };

    var contained = dr.contained;
    delete dr.contained;

    // update reference to Observation resources
    for (var i=0, iLen=dr.result.length; i<iLen; i++) {
      var ref = dr.result[i];
      ref.reference = this._OBX_REF_PREFIX + ref.reference.slice(1);
    }
    // add DiagnosticReport resource into Bundle entry
    bundleDr.entry.push({
      resource: dr,
      request: {
        method: "POST",
        url: "DiagnosticReport"
      }
    });

    // add Observation resources into Bundle entry
    for (var j=0, jLen=contained.length; j<jLen; j++) {
      var res = contained[j];

      // if it has related Observation resources (as it is a section in LForms)
      // update values of the references to the related Observation resources
      if (res.related) {
        for (var k=0, kLen=res.related.length; k<kLen; k++) {
          var targetObservation = res.related[k];
          targetObservation.target.reference = this._OBX_REF_PREFIX + targetObservation.target.reference.slice(1);
        }
      }

      // add to the Bundle entry
      bundleDr.entry.push({
        resource: res,
        request: {
          method: "POST",
          url: "Observation"
        }
      });
    }

    return bundleDr;
  },


  /**
   * Convert a DiagnosticReport resource with contained Observation resources to
   * a FHIR "collection" typed Bundle resource that includes a DiagnosticReport resource
   * and associated Observation resources
   * @param dr a DiagnosticReport resource with contained Observation resources
   * @returns {{}} a Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * @private
   */
  _convertContainedToCollectionBundle: function(dr) {
    var bundleDr = {
      resourceType:"Bundle",
      type: "collection",
      entry: []
    };

    var contained = dr.contained;
    delete dr.contained;

    // add DiagnosticReport resource into Bundle entry
    bundleDr.entry.push({
      resource: dr
    });

    // add Observation resources into Bundle entry
    for (var j=0, jLen=contained.length; j<jLen; j++) {
      var res = contained[j];
      // add to the Bundle entry
      bundleDr.entry.push({
        resource: res
      });
    }

    return bundleDr;
  },


  /**
   * Generate FHIR DiagnosticReport data from an LForms form data
   * @param formData an LFormsData object
   * @param subject optional, A local FHIR resource that is the subject for this
   *  DiagnoticReport.
   * @param inBundle optional, a flag that a DiagnosticReport resources and associated Observation resources
   *        should be placed into a FHIR Bundle. The default is false.
   * @param bundleType, optional, the FHIR Bundle type if inBundle is true.
   *        Only "transaction" and "collection" types are allowed.
   * @returns {{}} a Diagnostic Report instance
   */
  createDiagnosticReport : function(formData, subject, inBundle, bundleType) {
    var dr = null, contained =[];
    if (formData) {

      var formAndUserData = formData.getFormData(true,true,true);

      var drContent = this._createDiagnosticReportContent(formAndUserData, contained);

      dr = {
        resourceType: "DiagnosticReport",
        id: this._commonExport._getUniqueId(formAndUserData.code),
        status: "final",
        code: {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": formAndUserData.code,
              "display": formAndUserData.name
            }
          ],
          "text": formAndUserData.name
        },
        result: drContent.result,
        contained: contained
      };
      this._commonExport._addVersionTag(dr);

      if (subject)
        dr.subject = LForms.Util.createLocalFHIRReference(subject);

      // issued
      dr["issued"] = this._getFormattedDate(new Date());
    }

    var ret = inBundle ? this._convertFromContainedToBundle(dr, bundleType) : dr;
    LForms.Util.pruneNulls(ret);
    return ret;
  },


  /**
   * Functions for merging a DiagnosticReport instance into an LFormsData object
   */

  /**
   * Find an observation from the "contained" list by an observation id
   * @param refId an observation instance's id
   * @param contained the "contained" field in a DiagnosticReport instance
   * @returns {{}} an observation instance
   * @private
   */
  _findObxById : function(refId, contained) {
    var obx = null;
    if (refId) {
      var id = refId[0] === "#" ? refId.slice(1) : refId;
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
   * @param obx an observation instance
   * @param item an item in an LForms object
   * @private
   */
  _setupItemValueAndUnit : function(obx, item) {
    if (item && obx.code.coding[0].code === item.questionCode) {
      var dataType = item.dataType;
      // any one has a unit must be a numerical type, let use REAL for now.
      // dataType conversion should be handled when panel data are added to lforms-service.
      if ((!dataType || dataType==="ST") && item.units && item.units.length>0 ) {
        dataType = "REAL";
      }

      switch (dataType) {
        case "INT":
          if (obx.valueInteger) {
            item.value = obx.valueInteger;
            break;
          }
          // else handle as Quantity
        case "REAL": // handle as Quantity
        case "QTY":
          let qty = obx.valueQuantity;
          item.value = qty.value;
          let unitName = qty.unit || qty.code;
          if (unitName || qty.code || qty.system) {
            item.unit = {};
            if (unitName)
              item.unit.name = unitName;
            if (qty.code)
              item.unit.code = qty.code;
            if (qty.system)
              item.unit.system = qty.system;
          }
          break;
        case "DT":
          item.value = LForms.Util.stringToDTDateISO(obx.valueDate);
          break;
        case "DTM":
          item.value = LForms.Util.stringToDate(obx.valueDateTime);
          break;
        case "CNE":
        case "CWE":
          // get the value from Observation resource.
          // for multiple-selected answers/values in LForms, each selected answer is exported as
          // a separated Observation resource
          var itemValue;
          if (obx.valueCodeableConcept) {
            itemValue = {
              "code": obx.valueCodeableConcept.coding[0].code,
              "text": obx.valueCodeableConcept.coding[0].display,
              "codeSystem": obx.valueCodeableConcept.coding[0].system
            };
          }
          else if (obx.valueString) {
            itemValue = obx.valueString;
          }

          if (item.answerCardinality &&
              (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1)) {
            if (!item.value) {
              item.value = [];
            }
            item.value.push(itemValue)
          }
          else {
            item.value = itemValue;
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
   * @param refIdList a list Observation instance IDs to be checked
   * @param code an item code
   * @param contained a list of Observation instances (in the "contained")
   * @returns a structural info object for a repeating item
   * of the repeating items
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
   * Get structural info of a DiagnosticReport by going though each level of observations
   * @param parentObxInfo the structural info of a parent Observation
   * @param parentRefId the instance ID of a parent Observation
   * @param diagnosticReport a DiagnosticReport instance
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
      // first obx that has the same item code, either repeating or non-repeating
      if (!repeatingItemInfo[itemCode]) {
        var repeatingInfo = this._findTotalRepeatingNum(obxIdList, itemCode, diagnosticReport.contained);
        repeatingItemInfo[itemCode] = {
          total: repeatingInfo.total,
          refIds: repeatingInfo.refIds
        };
      }
      // create structure info for the obx
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
   * @param diagnosticReport a DiagnosticReport instance
   * @returns {{}} a Diagnostic Report data structure object
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
   * @param parentItem a parent item
   * @param itemCode code of a repeating (or non-repeating) item
   * @param index index of the item in the sub item array of the parent item
   * @returns {{}} a matching item
   * @private
   */
  _findTheMatchingItemByCodeAndIndex : function(parentItem, itemCode, index) {
    var item = null;
    var idx = 0;
    if (parentItem.items) {
      for(var i=0, iLen=parentItem.items.length; i<iLen; i++) {
        var subItem = parentItem.items[i];
        if (itemCode === subItem.questionCode) {
          if ((subItem.dataType === "CNE" || subItem.dataType === "CWE") &&
              subItem.answerCardinality && (subItem.answerCardinality.max ==="*" || parseInt(subItem.answerCardinality.max)>1) ) {
            item = subItem;
            break;

          }
          else if (idx === index) {
            item = subItem;
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
   * @param parentItem a parent item
   * @param itemCode code of a repeating item
   * @param total total number of the repeating item with the same code
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
      // insert new items unless it is a CNE/CWE and has multiple answers.
      if (item && !((item.dataType === "CNE" || item.dataType ==="CWE") &&
          item.answerCardinality &&
          (item.answerCardinality.max === "*" || parseInt(item.answerCardinality.max) > 1))) {
        while(total > 1) {
          var newItem = LForms.Util.deepCopy(item);
          parentItem.items.splice(i, 0, newItem);
          total -= 1;
        }
      }
    }
  },


  /**
   * Merge Observation instances into items on the same level
   * @param parentObxInfo structural information of a parent item
   * @param parentItem a parent item
   * @param diagnosticReport a DiagnosticReport instance
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
   * Convert a FHIR Bundle resource that includes a DiagnosticReport resource and associated Observation resources
   * to a DiagnosticReport resource with contained Observation resources
   * @param bundleDr a Bundle that includes a DiagnosticReport resource and associated Observation resources.
   *        Only "searchset" type is allowed.
   * @returns {{}} a DiagnosticReport resource with contained Observation resources
   */
  _convertFromBundleToContained: function (bundleDr) {

    var containedDr;
    // "searchset" is the only supported type at this point.
    if (bundleDr && bundleDr.type === "searchset") {
      var entry = bundleDr.entry;
      // find the DiagnosticReport in the bundle
      for (var i=0, iLen=entry.length; i<iLen; i++) {
        if (entry[i].resource.resourceType === "DiagnosticReport") {
          containedDr = entry[i].resource;
          // change reference ids in result
          for (var j=0, jLen=containedDr.result.length; j<jLen; j++) {
            var ref = containedDr.result[j];
            if (ref.reference && ref.reference.match(new RegExp(this._OBX_REF_PREFIX))) {
              ref.reference = ref.reference.slice(this._OBX_REF_PREFIX.length);
            }
          }
          containedDr.contained =[];
          break;
        }
      }
      // if DiagnosticReport is found
      if (containedDr) {
        // Move all Observation resource into "contained" field of the DiagnosticReport resource
        for (var i=0, iLen=entry.length; i<iLen; i++) {
          if (entry[i].resource.resourceType === "Observation") {
            var obx = entry[i].resource;
            // change reference ids in related
            if (obx.related) {
              for (var j=0, jLen=obx.related.length; j<jLen; j++) {
                var related = obx.related[j];
                if (related.target && related.target.reference &&
                    related.target.reference.match(new RegExp(this._OBX_REF_PREFIX))) {
                  related.target.reference = related.target.reference.slice(this._OBX_REF_PREFIX.length);
                }
              }
            }
            containedDr.contained.push(obx)
          }
        }
      }
    }

    return containedDr;
  },


  /**
   * Merge a DiagnosticReport instance into an LForms form definition or LFormsData object
   * @param formData an LForms form definition or LFormsData object.
   * @param diagnosticReport a DiagnosticReport resource with contained Observation resources,
   * or a Bundle that includes a DiagnosticReport resource and associated Observation resources
   * @param bundleType, optional, the FHIR Bundle type if inBundle is true.
   * @returns {{}} an updated LForms form definition, with answer data
   */
  mergeDiagnosticReportToLForms : function(formData, diagnosticReport) {

    if (!(formData instanceof LForms.LFormsData)) {
      // get the default settings in case they are missing in the form data
      // not to set item values by default values for saved forms with user data
      formData.hasSavedData = true;
      formData = (new LForms.LFormsData(formData)).getFormData();
    }

    var inBundle = diagnosticReport && diagnosticReport.resourceType === "Bundle";

    // move Observation resources in Bundle to be in "contained" in DiagnosticReport resource
    // as a base data structure for converting
    var dr = inBundle ? this._convertFromBundleToContained(diagnosticReport) : diagnosticReport;

    var reportStructure = this._getReportStructure(dr);

    this._processObxAndItem(reportStructure, formData, dr);

    return formData;
  }

};

export default dr;
