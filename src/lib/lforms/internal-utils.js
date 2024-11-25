// Utility functions for files in the lforms project, not intended to be called
// by application code.
import {ErrorMessages} from "./error-messages.js";
import CommonUtils from "../lforms/lhc-common-utils.js";
import CONSTANTS from "./lhc-form-datatypes.js";
/**
 *  A default message source identifier (for when the messageSource parameter
 *  below is optional and not provided.
 */
const defaultMsgSource = 'Other message source';

export const InternalUtil = {

  /**
   *  Sets the value of the item, which is the case of a quantity, involves more
   *  than one field (at present -- that might change.)
   * @param item the item receiving the value.
   * @param val the new value, which if it its origin was FHIR, should have
   *  already been processed and converted.  A quantity value is expected to be an Object with
   *  a _type key set to Quantity but with the LForms fields for units ('name',
   *  'code', and 'system'), plus a "value" field.
   * @param type (optional) the type of the value, e.g. 'Quantity'.  If this is
   *  set, then val._type will not be checked.
   * @return {boolean} whether the item.value or item.unit has changed.
   */
  assignValueToItem: function(item, val, type) {
    var changed = false;
    type = type || val && val._type;
    if (val && type === 'Quantity') {
      if (item.value !== val.value) {
        item.value = val.value;
        changed = true;
      }

      var newUnit = {name: val.name};
      if (val.code) {
        newUnit.code = val.code;
        if (val.system) newUnit.system = val.system;
      }
      if (!CommonUtils.deepEqual(item.unit, newUnit)) {
        item.unit = newUnit;
        changed = true;
      }
    }
    else if (!CommonUtils.deepEqual(item.value, val)) {
      item.value = val;
      changed = true;
    }

    return changed;
  },


  /**
   *  Constructs a model object for an off-list unit.
   * @param unitText the text the user typed for the off-list unit
   * @return an object suitable for item.unit.
   */
  modelForOffListUnit: function(text) {
    return text ? {"name": text, "_displayUnit": text} : undefined;
  },


  /**
   * Prints detailed errors about invalid HTML in console.
   * @param invalidTagsAttributes object of invalid HTML tag and attributes
   * returned from LForms.Util.checkForInvalidHtmlTags().
   */
  printInvalidHtmlToConsole: function(invalidTagsAttributes) {
    console.log("Possible invalid HTML tags/attributes:");
    invalidTagsAttributes.forEach(ele => {
      if (ele.attribute)
        console.log("  - Attribute: " + ele.attribute + " in " + ele.tag);
      else if (ele.tag)
        console.log("  - Element: " + ele.tag);
    });
  },


  /**
   *  Sets the "messages" attribute of the given item.  If the given array of
   *  messages object only consists of nulls (no messages), then the messages
   *  attribute will be removed from the item.
   * @param item an item from and lforms form definition
   * @param messages an array of message objects (see _convertFHIRValues for
   * details)
   * @param messageSource a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.
   */
  setItemMessagesArray: function(item, messages, messageSource) {
    // Consolidate the array of message objects into one object for this item.
    // The code below is optimized for the usual case where there are no messages.
    let itemMsg, msgTypes;
    for (let m of messages) {
      if (m) {
        if (!itemMsg) {
          itemMsg = {errors: {}, warnings: {}, info: {}};
          msgTypes = Object.keys(itemMsg);
        }
        for (let t of msgTypes) {
          if (m[t]) {
            Object.assign(itemMsg[t], m[t]);
          }
        }
      }
    }
    this.setItemMessages(item, itemMsg, messageSource);
  },


  /**
   *  Updates the "messages" attribute of the given item.  Any extisting
   *  messages are preserved, and new messages are added.  Note that these
   *  messages are statements about things that happened, not validation.
   * @param item an item from and lforms form definition
   * @param messages a message object (see _convertFHIRValues for
   *  details).  May be null or undefined to remove the messages for
   *  messageSource.
   * @param messageSource a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.
   */
  setItemMessages: function(item, messages, messageSource) {
    if (messages) {
      if (!item.messages)
        item.messages = {};
      item.messages[messageSource] = messages;
    }
    else if (item.messages) {
      delete item.messages[messageSource];
      if (!Object.keys(item.messages).length)
        delete item.messages;
    }
  },


  /**
   *  Adds a warning message to the given item.
   * @param item the item which should get the warning.
   * @param messageID the ID of the warning message
   * @param messageSource (optional) a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.  If not provided a
   *  default source identifier will be used
   */
  addItemWarning: function(item, messageID, messageSource) {
    if (!messageSource)
      messageSource = 'Other message source';
    let msgObj = item.messages;
    if (!msgObj)
      msgObj = item.messages = {};
    let msgsFromSource = msgObj[messageSource];
    if (!msgsFromSource)
      msgsFromSource = msgObj[messageSource] = {};
    let warnings = msgsFromSource.warnings;
    if (!warnings)
      warnings = msgsFromSource.warnings = {};
    warnings[messageID] = ErrorMessages.getMsg(messageID);
    console.log(JSON.stringify(item.messages));
  },


  /**
   *  Removes a warning message from the given item.
   * @param item the item which has the warning.
   * @param messageID the ID of the warning message
   * @param messageSource (optional) a string indentifier for the source of these messages,
   *  to distinguish them from messages from other sources.  If not provided a
   *  default source identifier will be used
   */
  removeItemWarning: function(item, messageID, messageSource) {
    if (!messageSource)
      messageSource = 'Other message source';
    let msgs, msgsFromSource, warnings;
    if ((msgs=item.messages) && (msgsFromSource=msgs[messageSource])
        && (warnings=msgsFromSource.warnings)) {
      delete warnings[messageID];
    }
  },


  /**
   *  Check if the lforms item has an answer list
   * @param {*} item
   * @returns
   */
  hasAnswerList: function(item) {
    return item.dataType === "CODING" || item.answers &&
      (item.dataType === "ST" || item.dataType === "INT" || item.dataType === "DT" || item.dataType === "TM")
  },


  /**
   * Get the rendering-xhtml string, replacing local ids in the 'src' attributes of
   * the 'img' tags if the local ids are in the 'contained' with image data,
   * @param containedImages a hashmap of image data from the "contained" in FHIR questionnaire
   * @param value an HTML string
   */
  _getHtmlStringWithContainedImages: function(containedImages, value) {
    if (containedImages) {
      // go though each image in the html string and replace local ids in image source
      // with contained data
      let parser = new DOMParser();
      let doc = parser.parseFromString(value, "text/html");

      let imgs = doc.getElementsByTagName("img");
      for (let i = 0; i < imgs.length; i++) {
        let urlValue = imgs[i].getAttribute("src");
        if (urlValue && urlValue.match(/^#/)) {
          let localId = urlValue.substring(1);
          let imageData = containedImages[localId];
          if (imageData) {
            imgs[i].setAttribute("src", imageData);
          }
        }
      }
      return doc.body.innerHTML;
    } else {
      return '';
    }
  },


  /**
   * Check an item's skip logic status to decide if the item is enabled
   * @param item an item
   * @returns {boolean}
   */
  targetEnabled: function(item) {
    return item._enableWhenExpVal !== false &&
        item._skipLogicStatus !== CONSTANTS.SKIP_LOGIC.STATUS_DISABLED;
  },


  /**
   * Check an item's skip logic status to decide if the item is disabled and
   * protected.
   * @param item an item
   * @returns {boolean}
   */
  targetDisabledAndProtected: function(item) {
    return item._disabledDisplayStatus === 'protected' &&
        !this.targetEnabled(item);

  },


  /**
   * Check if the item should be displayed.
   * @param item an item
   * @return {boolean}
  */
  targetShown: function(item) {
    return item._disabledDisplayStatus === 'protected' ||
        this.targetEnabled(item);
  }
}


InternalUtil.errorMessages = ErrorMessages;
// Set the default language for error messages.  Apps can call this with a
// different language code, if error-messages.js has messages in that language.
InternalUtil.errorMessages.setLanguage('en');
