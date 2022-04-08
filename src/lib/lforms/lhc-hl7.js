/**
 * A package to generate HL7 messgages from LForms form data
 */
import CommonUtils from "./lhc-common-utils.js";
import LhcFormUtils from "./lhc-form-utils.js";

const LhcHL7 = {
  LOINC_URI: 'http://loinc.org',
  LOINC_CS:  'LN',
  obrFieldNum: 43,
  obxFieldNum: 17,

  // HL7 V2 data types
  DataType : {
    //Alphanumeric
    "ST":	"String",
    "TX":	"Text data",
    "FT":	"Formatted text",
    //Numerical
    "CQ": "Composite quantity with units",
    "MO": "Money",
    "NM": "Numeric",
    "SI": "Sequence ID",
    "SN": "Structured numeric",
    //Identifier
    "ID":	"Coded values for HL7 tables",
    "IS":	"Coded values for user-defined tables",
    "HD":	"Hierarchic designator",
    "EI":	"Entity identifier",
    "RP":	"Reference pointer",
    "PL":	"Person location",
    "PT":	"Processing type",
    //Date/Time
    "DT":	"Date",
    "DTM": "Date/Time",
    "TM":	"Time",
    "TS":	"Time stamp",
    //Code Values
    "CE": "Coded element",
    "CF": "Coded element with formatted values",
    "CK": "Composite ID with check digit",
    "CN": "Composite ID number and name",
    "CX": "Extended composite ID with check digit",
    "XCN": "Extended composite ID number and name",
    //Generic
    "CM":	"Composite",
    //Demographics
    "AD":	"Address",
    "PN":	"Person name",
    "TN":	"Telephone number",
    "XAD": "Extended address",
    "XPN": "Extended person name",
    "XON": "Extended composite name and ID number for organizations",
    "XTN": "Extended telecommunications number",
    //Specialty/Chapter specific
    "CD":	"Channel definition",
    "MA":	"Multiplexed array",
    "NA":	"Numeric array",
    "ED":	"Encapsulated data",
    "CP":	"Composite price",
    "FC":	"Financial class",
    //Extended Queries
    "QSC": "Query selection criteria",
    "QIP": "Query input parameter list",
    "RCD": "Row column definition",
    //Master Files
    "DLN": "Driver’s license number",
    "JCC": "Job code/class",
    "VH": "Visiting hours",
    //Medical Records/Info Mgmt
    "PPN": "Performing person time stamp",
    //Time Series
    "DR":	"Date/time range",
    "RI":	"Repeat interval",
    "SCV": "Scheduling class value pair",
    "TQ": "Timing/quantity"
  },

  // message delimiters
  delimiters : {
    segment: "\r", // "\r\n" for display
    field: "|",
    component: "^",
    subcomponent: "&",
    repetition: "~",
    escape: "\\"
  },

  // OBX segment
  OBX: [
    {"seq":1, "len":4, "dt":"SI", "opt":"O","name":"Set ID"},
    {"seq":2, "len":2, "dt":"ID", "opt":"R","name":"Value Type"},
    {"seq":3, "len":590, "dt":"CE", "opt":"R","name":"Observation Identifier"},
    {"seq":4, "len":20, "dt":"ST", "opt":"O","name":"Observation Sub-ID"},
    {"seq":5, "len":65536, "dt":"ST", "opt":"O","name":"Observation Value"},
    {"seq":6, "len":60, "dt":"CE", "opt":"O","name":"Units"},
    {"seq":7, "len":10, "dt":"ST", "opt":"O","name":"Reference Range"},
    {"seq":8, "len":5, "dt":"ID", "opt":"O","name":"Abnormal Flags"},
    {"seq":9, "len":5, "dt":"NM", "opt":"O","name":"Probability"},
    {"seq":10, "len":2, "dt":"ID", "opt":"O","name":"Nature of Abnormal Test"},
    {"seq":11, "len":1, "dt":"ID", "opt":"R","name":"Observation Result Status"},
    {"seq":12, "len":26, "dt":"TS", "opt":"O","name":"Date Last Obs Normal Values"},
    {"seq":13, "len":20, "dt":"ST", "opt":"O","name":"User Defined Access Checks"},
    {"seq":14, "len":26, "dt":"TS", "opt":"O","name":"Date/Time of the Observation"},
    {"seq":15, "len":60, "dt":"CE", "opt":"O","name":"Producer's ID"},
    {"seq":16, "len":80, "dt":"XCN", "opt":"O","name":"Responsible Observer"},
    {"seq":17, "len":80, "dt":"CE", "opt":"O","name":"Observation Method"}
    ],

  // OBR segment
  OBR: [
    {"seq":1, "len":4,   "dt":"SI", "opt":"C","name":"Set ID - OBR"},
    {"seq":2, "len":75 , "dt":"EI", "opt":"C","name":"Placer Order Number"},
    {"seq":3, "len":75 , "dt":"EI", "opt":"C","name":"Filler Order Number"},
    {"seq":4, "len":200, "dt":"CE", "opt":"R","name":"Universal Service ID"},
    {"seq":5, "len":2,   "dt":"ID", "opt":"B","name":"Priority"},
    {"seq":6, "len":26 , "dt":"TS", "opt":"B","name":"Requested Date/time"},
    {"seq":7, "len":26 , "dt":"TS", "opt":"C","name":"Observation Date/Time"},
    {"seq":8, "len":26 , "dt":"TS", "opt":"O","name":"Observation End Date/Time"},
    {"seq":9, "len":20 , "dt":"CQ", "opt":"O","name":"Collection Volume"},
    {"seq":10,"len":60 	,"dt":"XCN","opt":"O","name":"Collector Identifier"},
    {"seq":11,"len":1	  ,"dt":"ID", "opt":"O","name":"Specimen Action Code"},
    {"seq":12,"len":60	,"dt":"CE", "opt":"O","name":"Danger Code"},
    {"seq":13,"len":300	,"dt":"ST", "opt":"O","name":"Relevant Clinical Info."},
    {"seq":14,"len":26	,"dt":"TS", "opt":"C","name":"Specimen Received Date/Time"},
    {"seq":15,"len":300	,"dt":"CM", "opt":"O","name":"Specimen Source"},
    {"seq":16,"len":80	,"dt":"XCN","opt":"O","name":"Ordering Provider"},
    {"seq":17,"len":40	,"dt":"XTN","opt":"O","name":"Order Callback Phone Number"},
    {"seq":18,"len":60	,"dt":"ST", "opt":"O","name":"Placer field 1"},
    {"seq":19,"len":60	,"dt":"ST", "opt":"O","name":"Placer field 2"},
    {"seq":20,"len":60	,"dt":"ST", "opt":"O","name":"Filler Field 1"},
    {"seq":21,"len":60	,"dt":"ST", "opt":"O","name":"Filler Field 2"},
    {"seq":22,"len":26	,"dt":"TS", "opt":"C","name":"Results Rpt/Status Chng - Date/Time"},
    {"seq":23,"len":40	,"dt":"CM", "opt":"O","name":"Charge to Practice"},
    {"seq":24,"len":10	,"dt":"ID", "opt":"O","name":"Diagnostic Serv Sect ID"},
    {"seq":25,"len":1	  ,"dt":"ID", "opt":"C","name":"Result Status"},
    {"seq":26,"len":400	,"dt":"CM", "opt":"O","name":"Parent Result"},
    {"seq":27,"len":200	,"dt":"TQ", "opt":"O","name":"Quantity/Timing"},
    {"seq":28,"len":150	,"dt":"XCN","opt":"O","name":"Result Copies To"},
    {"seq":29,"len":150	,"dt":"CM", "opt":"O","name":"Parent"},
    {"seq":30,"len":20	,"dt":"ID", "opt":"O","name":"Transportation Mode"},
    {"seq":31,"len":300	,"dt":"CE", "opt":"O","name":"Reason for Study"},
    {"seq":32,"len":200	,"dt":"CM", "opt":"O","name":"Principal Result Interpreter"},
    {"seq":33,"len":200	,"dt":"CM", "opt":"O","name":"Assistant Result Interpreter"},
    {"seq":34,"len":200	,"dt":"CM", "opt":"O","name":"Technician"},
    {"seq":35,"len":200	,"dt":"CM", "opt":"O","name":"Transcriptionist"},
    {"seq":36,"len":26	,"dt":"TS", "opt":"O","name":"Scheduled Date/Time"},
    {"seq":37,"len":4	  ,"dt":"NM", "opt":"O","name":"Number of Sample Containers"},
    {"seq":38,"len":60	,"dt":"CE", "opt":"O","name":"Transport Logistics of Collected Sample"},
    {"seq":39,"len":200	,"dt":"CE", "opt":"O","name":"Collector’s Comment"},
    {"seq":40,"len":60	,"dt":"CE", "opt":"O","name":"Transport Arrangement Responsibility"},
    {"seq":41,"len":30	,"dt":"ID", "opt":"O","name":"Transport Arranged"},
    {"seq":42,"len":1	  ,"dt":"ID", "opt":"O","name":"Escort Required"},
    {"seq":43,"len":200	,"dt":"CE", "opt":"O","name":"Planned Patient Transport Comment"}
  ],

  getHL7V2DataType: function(lformsDataType) {

    var ret;
    switch (lformsDataType) {
      case "INT":
      case "REAL":
      case "QTY":
        ret = "NM";
        break;
      case "NR":
      case "TX":
      case "DT":
      case "DTM":
      case "TM":
      case "CNE":
      case "CWE":
          ret = lformsDataType;
        break;
      // Commenting out these cases which are handled by the default, but
      // leaving them here for reference.
      /*
      case "BIN":
      case "RTO":
      case "YEAR":
      case "MONTH":
      case "DAY":
      case "URL":
      case "EMAIL":
      case "PHONE":
      case "BL":
      case "":
      case "ST":
        ret = "ST";
        break; */
      default:
        ret = "ST";
    }

    return ret;
  },


  // create HL7 OBR and OBX segments only
  /**
   * Convert LForms form data into HL7 OBR and OBX segments
   * @param lfData a LForms form data object
   * @returns {string}
   */
  toHL7Segments: function(lfData) {
    var hl7String = '';
    var formInfo = {
      obrIndex: 1,
      obxIndex: 1
    };

    // get form data with questions that have no values
    var formData = lfData.getFormData(false, true);

    this._generateOBX4(formData);

    // form level info
    var formObrArray = new Array(this.obrFieldNum); // initial value is undefined
    // index = seq - 1
    formObrArray[0] = "OBR";
    formObrArray[1] = "1";
    formObrArray[4] = formData.code + this.delimiters.component + formData.name + this.delimiters.component + this.LOINC_CS;

    // ignore ending empty fields
    var foundValue = false;
    for(var i=this.obrFieldNum-1; i>=0; i--) {
      if (!foundValue && formObrArray[i] === undefined) {
        continue;
      }
      else if (formObrArray[i] !== undefined) {
        hl7String = formObrArray[i] + this.delimiters.field + hl7String;
      }
      else {
        hl7String += this.delimiters.field;
      }
    }
    hl7String += this.delimiters.segment;

    // process the questions/sections
    if (formData.items) {
      var obxIndex = 0;
      for (var j = 0, jLen = formData.items.length; j < jLen; j++) {
        if (formData.items[j].dataType !== "TITLE") {
          // Note: OBX1 value is not reset for sub panels in the current design.
          // if (formData.items[j].header) {
          //   formInfo.obxIndex = 1;
          // }
          hl7String += this._itemToHL7v2(formData.items[j], formInfo);
        }
      }
    }
    return hl7String;
  },


  /**
   * Calculate OBX4 values of each item in the form
   * @param formData form data that also includes user data
   * @private
   */
  _generateOBX4: function(formData) {

    if (formData && formData.items) {
      this._precessOBX4AtOneLevel("", formData.items)
    }
  },


  /**
   * Calculate OBX4 values for questions/sections at one level
   * @param parentOBX4 the containing section item's obx4 value
   * @param items, the list of items at the level
   * @private
   */
  _precessOBX4AtOneLevel: function(parentOBX4, items) {
    var sectionSN = 0;
    var repeatingIndex = 1;
    var prevItem = null;
    // go through questions/sections from top to bottom
    for (var i=0, iLen=items.length; i<iLen; i++) {
      var item = items[i];
      // if it's a section
      if (item.dataType === "SECTION") {

        // if it repeats
        var max = item.questionCardinality.max;
        if (max && (max === "*" || parseInt(max) > 1)) {
          // skip if all questions within it have no values
          if (!this._isSectionEmpty(item)) {
            // get the repeating instance letter
            if (!prevItem || prevItem && prevItem.questionCode !== item.questionCode) {
              repeatingIndex = 1;
              sectionSN += 1;
            }
            else {
              repeatingIndex +=1;
            }
            var repeatingLetter = CommonUtils.getNextLetter(repeatingIndex);
            item._obx4 = parentOBX4 ? parentOBX4 + "." + sectionSN + repeatingLetter : sectionSN + repeatingLetter;
            this._precessOBX4AtOneLevel(item._obx4, item.items);
          }
          // skip if it is an empty section, not to set prevItem
          else {
            continue;
          }
        }
        // if it does not repeat
        // Note: not to skip even if all questions within is has no values,
        // because the SN still increases in this case.
        else {
          repeatingIndex = 1;
          sectionSN += 1;
          item._obx4 = parentOBX4 ? parentOBX4 + "." + sectionSN: sectionSN;
          this._precessOBX4AtOneLevel(item._obx4, item.items);
        }
      }
      // if it's a question
      else{
        // if it repeats
        var max = item.questionCardinality.max;
        if (max && (max === "*" || parseInt(max) > 1)) {
          // if it has value
          if (!LhcFormUtils.isItemValueEmpty(item.value)) {
            // get the repeating instance letter
            if (!prevItem || prevItem && prevItem.questionCode !== item.questionCode) {
              repeatingIndex = 1;
            }
            else {
              repeatingIndex += 1;
            }
            var repeatingLetter = CommonUtils.getNextLetter(repeatingIndex);
            item._obx4 = parentOBX4 ? parentOBX4 + "." + repeatingLetter : repeatingLetter;
          }
          // skip if it has no values, not to set prevItem
          else {
            continue;
          }
        }
        // if it does not repeat
        else {
          item._obx4 = parentOBX4 ? parentOBX4 : "";
          repeatingIndex = 1;
        }

      }
      prevItem = item;
    }
  },


  /**
   * Constructs an OBX5 for a list item (CNE/CWE)
   * @param itemVal a value for a list item
   * @param dataType the data type of the item (CNE or CWE)
   * @return the OBX5 field string
   */
  _generateOBX5: function(itemVal, dataType, answerCS) {
    var rtn;
    var code = itemVal.code;
    if (dataType === 'CWE' && !code && code !== 0) {
      // For non-coded values, the text goes in OBX 5.9
      rtn = this.delimiters.component.repeat(8) + itemVal.text;
    }
    else {
      var answerCS = !itemVal.system ? "" : (itemVal.system === 'LOINC' || itemVal.system === this.LOINC_URI) ?
          this.LOINC_CS : itemVal.system;
      rtn = code + this.delimiters.component +
        itemVal.text + this.delimiters.component + answerCS;
    }
    return rtn;
  },

  _DT_FMT: 'YYYYMMDD',
  _DTM_FMT: 'YYYYMMDDHHmmss',
  /**
   * Convert an item to one or more HL7 v2 OBX records.
   * @param item an item in LForms form data
   * @param formInfo index info of the form
   * @returns {string}
   */
  _itemToHL7v2: function(item, formInfo) {
    var hl7Seg = "";
    var questionCS = this.LOINC_CS;

    if (item.dataType !== "TITLE") {
      var itemObrArray = new Array(this.obrFieldNum);

      // a sub panel
      if (item.header) {
        var obrSeg = "";
        itemObrArray[0] = "OBR";
        itemObrArray[1] = ++formInfo.obrIndex;

        itemObrArray[4] = item.questionCode + this.delimiters.component +
            item.question + this.delimiters.component + questionCS;

        // ignore ending empty fields
        var foundValue = false;
        for(var i=this.obrFieldNum-1; i>=0; i--) {
          if (!foundValue && itemObrArray[i] === undefined) {
            continue;
          }
          else if (itemObrArray[i] !== undefined) {
            obrSeg = itemObrArray[i] + this.delimiters.field + obrSeg;
          }
          else {
            obrSeg += this.delimiters.field;
          }
        }
        obrSeg += this.delimiters.segment;

        //// Note: not to add obr segments for now.
        //hl7Seg += obrSeg;

        if(item.items) {
          var obxIndex = 0;
          for(var j=0, jLen=item.items.length; j<jLen; j++) {
            // Note: OBX1 value is not reset for sub panels in the current design.
            // if (item.items[j].header) {
            //   //formInfo.obxIndex = 1;
            // }
            hl7Seg += this._itemToHL7v2(item.items[j], formInfo);
          }
        }
      }
      // a question, only when it has value
      else if (!LhcFormUtils.isItemValueEmpty(item.value)) {
        var isArrayVal = Array.isArray(item.value);
        var vals = isArrayVal ? item.value : [item.value];

        var itemObxArray = [];
        itemObxArray[0] = "OBX";
        itemObxArray[1] = formInfo.obxIndex++;
        itemObxArray[2] = this.getHL7V2DataType(item.dataType);
        itemObxArray[3] = item.questionCode + this.delimiters.component +
            item.question + this.delimiters.component + questionCS;
        // unit
        if (item.unit) {
          var unitName ="";
          if (item.unit.name !== undefined) {
            unitName = item.unit.name;
          }
          itemObxArray[6] = unitName + this.delimiters.component + unitName + this.delimiters.component + this.LOINC_CS;
        }

        for (var i=0, len=vals.length; i<len; ++i) {
          var val = vals[i];
          // OBX4 - sub id
          itemObxArray[4] = item._obx4;
          if (isArrayVal) {
            if (item._obx4 !== '')
              itemObxArray[4] += ".";
            itemObxArray[4] += CommonUtils.getNextLetter(i+1);
          }

          // OBX5 (answer value)
          if (item.dataType === 'CNE' || item.dataType === 'CWE') {
            itemObxArray[5] = this._generateOBX5(val, item.dataType);
          }
          else if (item.dataType === 'DT' || item.dataType === 'DTM') {
            var dv = (typeof val === 'string')? CommonUtils.stringToDate(val): val;
            itemObxArray[5] = CommonUtils.formatDate(dv, item.dataType === 'DT'? this._DT_FMT: this._DTM_FMT);
          }
          else {
            itemObxArray[5] = val.toString();
          }
          // ignore ending empty fields
          hl7Seg += itemObxArray.join(this.delimiters.field)
            + this.delimiters.field + this.delimiters.segment;
        }

      } // if value is not empty
    }
    return hl7Seg;
  },


  /**
   * Check if all questions within a section have no values
   * @param section a section item
   * @private
   */
  _isSectionEmpty: function(sectionItem) {
    var empty = true;
    if (sectionItem.items) {
      for(var i=0, iLen=sectionItem.items.length; i<iLen && empty; i++) {
        var item = sectionItem.items[i];
        // sub section
        if (item.dataType === "SECTION") {
          // has been checked already
          if (item._emptySection === true || item._emptySection === false) {
            empty = item._emptySection;
          }
          else {
            empty = this._isSectionEmpty(item);
          }
        }
        // questions
        else {
          empty = LhcFormUtils.isItemValueEmpty(item.value);
        }
      } // end of for loop
    }
    // set the flag
    sectionItem._emptySection = empty;
    return empty;
  }
}

export default LhcHL7;
