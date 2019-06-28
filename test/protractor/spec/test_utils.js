
// Shared function(s) for test use only.

module.exports = {

  /**
   * @param return a date/time string with today's date at 00:00, in the format: mm/dd/yyyy hh:mm
   */
  dtmTodayZeroHour: function dtmTodayZeroHour() {
    var dateObj = new Date();
    return [
      (101 + dateObj.getMonth()).toString().substr(1),
      (100 + dateObj.getDate()).toString().substr(1),
      (10000 + dateObj.getFullYear()).toString().substr(1)].join('/') + ' 00:00';
  }
};