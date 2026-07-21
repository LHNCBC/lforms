/**
 *  A class for retrieving error messages (or warnings or info messages).
 *  These messages are intended to be about things that happened, not about
 *  validation, because there is no good way to remove the old messages when
 *  they don't apply without adversely impacting peformance.
 */

import language from '../../../language-config.json';
const messages = language.renderingErrorMessages;

export const ErrorMessages = {
  /**
   *  Adds the message with the given ID to the given message object.
   * @param msgObj an object to which the message will be added, with the given
   * messageID as the key and the text as the value.
   * @param messageID the id of the message
   */
  addMsg: function (msgObj, messageID) {
    if (!messages[messageID]) {
      throw new Error('Unknown message ID "' +messageID+'"');
    }
    msgObj[messageID] = messages[messageID];
  }
};
