/**
 *  A class for retrieving error messages (or warnings or info messages).
 *  These messages are intended to be about things that happened, not about
 *  validation, because there is no good way to remove the old messages when
 *  they don't apply without adversely impacting peformance.
 */
/*
class A {
  static field = 'Inner y';
}
*/
export const ErrorMessages = {
//export class ErrorMessages {
//  static messages = [{
  messages: {
    'comparatorInQuantity': {
      'en': 'This item cannot accept a quantity with a comparator'
    },
    'undefinedQuantityValue': {
      'en': 'A quantity must have a value'
    },
    'MultipleValuesForNonRepeat': {
      'en': 'An attempt was made to assign multiple values to a non-repeating item.'
    }
  },

  /**
   *  Returns the text for a message.
   * @param messageID the id of the message
   * @return An object with keys 'message' and messageType (which will be either
   *  'error', 'warning', or 'info').  If there is no message in the requested
   *  language, and error will be thrown.
   */
  //static getMsg(messageID) {
  getMsg: function (messageID) {
    const messageData = this.messages[messageID];
    if (!messageData)
      throw new Error('Unknown message ID "' +messageID+'"');
    const message = messageData[this.language];
    if (!message)
      throw new Error('Unknown language code "'+this.language+'" for message ID "' +messageID+'"');
    return message;
  },


  /**
   *  Sets the language code used by getMsg.
   * @param language the language code for the message.  This must be one of the
   *  languages of the messages above.
   */
  //static setLanguage(language) {
  setLanguage: function (language) {
    this.language = language;
  }
};
