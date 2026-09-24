import language from '../../../language-config.json';

import { ErrorMessages } from './error-messages.js';

describe('ErrorMessages', () => {
  const messageID = 'comparatorInQuantity';

  it('should retrieve a message from the locale selected at build time', () => {
    expect(ErrorMessages.getMsg(messageID)).toBe(language.renderingErrorMessages[messageID]);
  });

  it('should reject an unknown message ID', () => {
    expect(() => ErrorMessages.getMsg('unknownMessage')).toThrowError('Unknown message ID "unknownMessage"');
  });

  it('should add a localized message to a message object', () => {
    const messageObject = {};

    ErrorMessages.addMsg(messageObject, messageID);

    expect(messageObject[messageID]).toBe(language.renderingErrorMessages[messageID]);
  });
});
