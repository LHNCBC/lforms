/**
 *  A class for retrieving error messages (or warnings or info messages).
 *  These messages are intended to be about things that happened, not about
 *  validation, because there is no good way to remove the old messages when
 *  they don't apply without adversely impacting peformance.
 */

export const ErrorMessages = {
  messages: {
    'comparatorInQuantity': {
      'en': 'This item cannot accept a quantity with a comparator'
    },
    'nonMatchingQuantityUnit': {
      'en': 'An attempt was made to assign a quantity with a non-matching unit.'
    },
    'MultipleValuesForNonRepeat': {
      'en': 'An attempt was made to assign multiple values to a non-repeating item.'
    },
    'invalidTagInHelpHTMLContent': {
      'en': 'Invalid HTML tags/attributes found in the help text.'
    },
    'invalidTagInLegalHTMLContent': {
      'en': 'Invalid HTML tags/attributes found in the legal text.'
    },
    'invalidTagInHTMLContent': {
      'en': 'Invalid HTML tags/attributes found in item text/prefix.'
    },
    'answerValueSetLoadingError': {
      'en': 'Unable to load the answer list for this question.'
    },
    'hasModifierExtension': {
      'en': 'One or more modifierExtensions are found in the Questionnaire resource. The rendered Questionnaire below is for display only and may not be correctly rendered, and the QuestionnaireResponse generated from it may not be valid.'
    }
  },


  /**
   *  Returns the text for a message.
   * @param messageID the id of the message
   * @return the text corresponding to messageID.
   */
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
   *  Adds the message with the given ID to the given message object.
   * @param msgObj an object to which the message will be added, with the given
   * messageID as the key and the text as the value.
   * @param messageID the id of the message
   */
  addMsg: function (msgObj, messageID) {
    msgObj[messageID] = this.getMsg(messageID);
  },


  /**
   *  Sets the language code used by getMsg.
   * @param language the language code for the message.  This must be one of the
   *  languages of the messages above.
   */
  setLanguage: function (language) {
    this.language = language;
  }
};
