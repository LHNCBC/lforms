/**
 * A package to generate HL7 messgages from LForms form data
 */
if (typeof LForms === 'undefined')
  LForms = {};

LForms.HL7 = {

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
      case "BIN":
      case "RTO":
      case "QTY":
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
        break;
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

    var formData = lfData.getFormData(true, true, true);

    // form level info
    var formObrArray = new Array(this.obrFieldNum); // initial value is undefined
    // index = seq - 1
    formObrArray[0] = "OBR";
    formObrArray[1] = 1;
    formObrArray[4] = formData.code + this.delimiters.component + formData.name + this.delimiters.component + this.LOINC_CS;

    if (formData.templateOptions.obrItems.length > 0) {
      for (var i= 0, iLen=formData.templateOptions.obrItems.length; i< iLen; i++) {
        if (formData.templateOptions.obrItems[i].questionCode === "date_done") {
          formObrArray[7] = formData.templateOptions.obrItems[i].value.toString("yyyyMMddHHmmss");
        }
        else if (formData.templateOptions.obrItems[i].questionCode === "where_done") {
          formObrArray[13] = formData.templateOptions.obrItems[i].value.text;
        }
      }
    }

    // ignore ending empty fields
    var foundValue = false;
    for(var i=this.obrFieldNum-1; i>=0; i--) {
      if (!foundValue && formObrArray[i] === undefined) {
        continue
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
          if (formData.items[j].header) {
            formInfo.obxIndex = 0;
          }
          else {
            obxIndex++;
            formInfo.obxIndex = obxIndex;
          }
          hl7String += this._itemToField(formData.items[j], formInfo);
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
  _makeOBX4: function(formData) {


  },


  /**
   * Constructs an OBX5 for a list item (CNE/CWE)
   * @param itemVal a value for a list item
   * @param dataType the data type of the item (CNE or CWE)
   * @param answerCS the answer code system
   * @return the OBX5 field string
   */
  _makeOBX5: function(itemVal, dataType, answerCS) {
    var rtn;
    var code = itemVal.code;
    if (dataType === 'CWE' && !code && code !== 0) {
      // For non-coded values, the text goes in OBX 5.9
      rtn = this.delimiters.component.repeat(8) + itemVal.text;
    }
    else {
      rtn = code + this.delimiters.component +
        itemVal.text + this.delimiters.component + answerCS;
    }
    return rtn;
  },


  /**
   * Convert an item to a HL7 field
   * @param item an item in LForms form data
   * @param formInfo index info of the form
   * @returns {string}
   */
  _itemToField: function(item, formInfo) {
    var hl7Seg = "";
    var questionCS = this.LOINC_CS;

    if (item.dataType !== "TITLE") {
      var itemObrArray = new Array(this.obrFieldNum);
      var itemObxArray = new Array(this.obxFieldNum);

      // a sub panel
      if (item.header) {
        itemObrArray[0] = "OBR";
        itemObrArray[1] = ++formInfo.obrIndex;

        itemObrArray[4] = item.questionCode + this.delimiters.component +
           item.question + this.delimiters.component + questionCS;

        // ignore ending empty fields
        var foundValue = false;
        for(var i=this.obrFieldNum-1; i>=0; i--) {
          if (!foundValue && itemObrArray[i] === undefined) {
            continue
          }
          else if (itemObrArray[i] !== undefined) {
            hl7Seg = itemObrArray[i] + this.delimiters.field + hl7Seg;
          }
          else {
            hl7Seg += this.delimiters.field;
          }
        }
        hl7Seg += this.delimiters.segment;

        if(item.items) {
          var obxIndex = 0;
          for(var j=0, jLen=item.items.length; j<jLen; j++) {
            if (item.items[j].header) {
              formInfo.obxIndex = 0;
            }
            else {
              obxIndex++;
              formInfo.obxIndex = obxIndex;
            }

            hl7Seg += this._itemToField(item.items[j], formInfo);
          }
        }
      }
      // a question, only when it has value
      else {
        itemObxArray[0] = "OBX";
        itemObxArray[1] = formInfo.obxIndex;
        itemObxArray[2] = this.getHL7V2DataType(item.dataType);
        itemObxArray[3] = item.questionCode + this.delimiters.component +
          item.question + this.delimiters.component + questionCS;
        // sub id
        itemObxArray[4] = item._idPath.slice(1).replace(/\//g,'.');

        // value
        if (item.value !== undefined && item.value !== null) {
          var answerCS = item.answerCodeSystem ? item.answerCodeSystem : this.LOINC_CS;
          // multiple answers
          if (Array.isArray(item.value)) {
            var obx5 = [];
            for(var j= 0, jLen=item.value.length; j<jLen; j++) {
              if (item.dataType === 'CNE' || item.dataType === 'CWE')
                obx5.push(this._makeOBX5(item.value[j], item.dataType, answerCS));
            }
            itemObxArray[5] = obx5.join(this.delimiters.repetition);
          }
          // single answer
          else {
            if (item.dataType === 'CNE' || item.dataType === 'CWE') {
              itemObxArray[5] = this._makeOBX5(item.value, item.dataType, answerCS);
            }
            else if (item.dataType === 'DT') {
              itemObxArray[5] = item.value.toString("yyyyMMddHHmmss");
            }
            else {
              itemObxArray[5] = item.value.toString();
            }
          }
        }
        // unit
        if (item.unit) {
          var unitName ="";
          if (item.unit.name !== undefined) {
            unitName = item.unit.name;
          }
          itemObxArray[6] = unitName + this.delimiters.component + unitName + this.delimiters.component + this.LOINC_CS;
        }

        // ignore ending empty fields
        foundValue = false;
        for(var i=this.obxFieldNum-1; i>=0; i--) {
          if (!foundValue && itemObxArray[i] === undefined) {
            continue
          }
          else if (itemObxArray[i] !== undefined) {
            hl7Seg = itemObxArray[i] + this.delimiters.field + hl7Seg;
          }
          else {
            hl7Seg += this.delimiters.field;
          }
        }

        //for(var i=0; i<this.obxFieldNum; i++) {
        //  if (itemObxArray[i] !== undefined) {
        //    hl7Seg += itemObxArray[i] + this.delimiters.field;
        //  }
        //  else {
        //    hl7Seg += this.delimiters.field;
        //  }
        //}

        hl7Seg += this.delimiters.segment;
      }
    }
    return hl7Seg;
  }
};

if (typeof module !== 'undefined')
  module.exports = LForms.HL7;
