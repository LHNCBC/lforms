/*
 * Define lforms constants here and use this a dependency in the angular application
 */

angular.module('lformsWidget')
  .constant('LF_CONSTANTS', {
    BLANK_GIF_DATAURL: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw==',
    EVENT_REPEATING_ITEM_ADDED: 'LF_EVENT_REPEATING_ITEM_ADDED',
    EVENT_REPEATING_ITEM_DELETED: 'LF_EVENT_REPEATING_ITEM_DELETED',
    VALIDATION_MESSAGE_INITIAL_SHOW_TIME: 2000
  });
