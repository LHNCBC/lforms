// Utility functions for files in the lforms project, not intended to be called
// by application code.
import {ErrorMessages} from "./error-messages.js";

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
   */
  assignValueToItem: function(item, val, type) {
    type = type || val && val._type;
    if (val && type === 'Quantity') {
      item.value = val.value;
      item.unit = {name: val.name}
      if (val.code) {
        item.unit.code = val.code;
        if (val.system)
          item.unit.system = val.system;
      }
    }
    else
      item.value = val;
  },


  /**
   *  Constructs a model object for an off-list unit.
   * @param unitText the text the user typed for the off-list unit
   * @return an object suitable for item.unit.
   */
  modelForOffListUnit: function(text) {
    return text ? {name: text} : undefined;
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
  hasAnswerOption: function(item) {
    return item.dataType === "CNE" || item.dataType === "CWE" || item.answers &&
      (item.dataType === "ST" || item.dataType === "INT" || item.dataType === "DT" || item.dataType === "TM")
  }
  
}


InternalUtil.errorMessages = ErrorMessages;
// Set the default language for error messages.  Apps can call this with a
// different language code, if error-messages.js has messages in that language.
InternalUtil.errorMessages.setLanguage('en');
