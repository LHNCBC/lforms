/**
 * Additional functions to convert FHIR STU3/R4 Questionnaire/QuestionnaireResponse to LForms
 */
function addSTU3R4ImportFns(ns) {
  "use strict";

  var self = ns;

  /**
   * Handle the item.value in QuestionnaireResponse for non-CODING typed items
   * @param {*} fhirValue a value of item in QuestionnaireResponse, without the 'valueX' key
   * @param {*} lfItem an item in lforms
   * @returns the answer
   */
  self._processNonCodingAnswerValueInQR = function(fhirValue, lfItem) {
    let answer;
    if (lfItem.dataType === "ST" || lfItem.dataType === "INT" ||
        lfItem.dataType === "DT" || lfItem.dataType === "TM") {
      var itemAnswers = lfItem.answers;
      for (var j=0, jLen=itemAnswers.length; j<jLen && !answer; ++j) {
        if (fhirValue === itemAnswers[j].text) {
          answer = itemAnswers[j];
        }
      }
    }
    return answer;
  };


  /**
   * Get LForms data type from questionnaire item
   *
   * @param qItem {object} - Questionnaire item object
   * @private
   */
  self._getDataType = function (qItem) {
    var type = 'string';
    switch (qItem.type) {
      case 'string':
        type = 'ST';
        break;
      case 'group':
        type = 'SECTION';
        break;
      case "choice":
        type = 'CODING';
        break;
      case "open-choice":
        type = 'CODING';
        break;
      case 'integer':
        type = 'INT';
        break;
      case 'decimal':
        type = 'REAL';
        break;
      case 'text':
        type = 'TX';
        break;
      case "boolean":
        type = 'BL';
        break;
      case "date":
        type = 'DT';
        break;
      case "dateTime":
        type = 'DTM';
        break;
      case "time":
        type = 'TM';
        break;
      case "display":
        type = 'TITLE';
        break;
      case "url":
        type = 'URL';
        break;
      case "quantity":
        type = 'QTY';
        break;
      case "attachment":
        type = 'attachment';
        break;
      // 'coding' is in R5 since the Draft Ballot version
      // kept for compatibility issue but show a warning.
      case "coding":
        type = 'CODING';
        console.log(`Warning: An item (linkId:${qItem.linkId}) has a type of 'coding', which is not a supported item type in STU3/R4.`);
        break;
    }
    return type;
  };


  /**
   *  Converts the given ValueSet into an array of answers that can be used with a prefetch autocompleter.
   * @return the array of answers, or null if the extraction cannot be done.
   */
  self.answersFromVS = function (valueSet) {
    var vs = valueSet;
    var rtn = [];
    if (vs.expansion && vs.expansion.contains && vs.expansion.contains.length > 0) {
      vs.expansion.contains.forEach(function (vsItem) {
        var answer = {code: vsItem.code, text: vsItem.display, system: vsItem.system};
        // rendering-xhtml extension under "_display" in contained valueset expansion.
        if (self._widgetOptions?.allowHTML && vsItem._display) {
          const xhtmlFormat = LForms.Util.findObjectInArray(vsItem._display.extension, 'url', "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
          if (xhtmlFormat) {
            answer.textHTML = xhtmlFormat.valueString;
            let invalidTagsAttributes = LForms.Util._internalUtil.checkForInvalidHtmlTags(answer.textHTML);
            if (invalidTagsAttributes && invalidTagsAttributes.length > 0) {
              answer._hasInvalidHTMLTagInText = true;
              LForms.Util._internalUtil.printInvalidHtmlToConsole(invalidTagsAttributes);
            }
          }
        }
        var ordExt;
        if (self.fhirExtUrlValueSetScore) { // STU3.
          ordExt = LForms.Util.findObjectInArray(vsItem.extension, 'url',
            self.fhirExtUrlValueSetScore);
        } else { // R4. Both ordinalValue and itemWeight extensions are supported.
          ordExt = LForms.Util.findObjectInArray(vsItem.extension, 'url',
              self.fhirExtUrlValueSetScoreordinalValue) ||
            LForms.Util.findObjectInArray(vsItem.extension, 'url',
              self.fhirExtUrlValueSetScoreitemWeight);
        }
        if(ordExt) {
          answer.score = ordExt.valueDecimal;
        }
        rtn.push(answer);
      });
    }
    return rtn.length > 0 ? rtn : null;
  };

}

export default addSTU3R4ImportFns;
