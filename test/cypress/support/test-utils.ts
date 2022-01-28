import config from "../../../cypress.json";

const TestUtil = {
  /**
   * Get the datetime string in DTM picker's default format for the current time with the given offset.
   * @param offsetMS the offset from the current time, in milliseconds, optional.
   *        Use a negative offset for past time, positive for future, zero or unspecified for "current"
   * @return the datetime string in the DTM datetime picker's default format (MM/DD/YYYY HH:MM).
   */
   getCurrentDTMString(offsetMS) {
    offsetMS = offsetMS || 0;
    var date = new Date(new Date().getTime() + offsetMS);
    return [
      (101 + date.getMonth()).toString().substr(1),
      (100 + date.getDate()).toString().substr(1),
      (10000 + date.getFullYear()).toString().substr(1)].join('/')
      + ' ' +
      [(100 + date.getHours()).toString().substr(1),
      (100 + date.getMinutes()).toString().substr(1), "00"].join(':');
  },

  /**
   *  Makes the screen reader log visible so that getText() will be
   *  able to read it.
   */
  makeReaderLogVisible() {
    cy.get("#reader_log").invoke("css", {height: "auto", width: "auto", top: "auto", left: "auto"})
  },

  /**
   * Reset reader log
   */
  resetReaderLog() {
    cy.get("#reader_log").invoke("html", "")
    this.makeReaderLogVisible();
  },


  /**
   *  Returns true if two arrays are equal (a shallow comparison)
   */
  arraysEqual(array1, array2) {
    // https://stackoverflow.com/a/19746771
    return array1.length === array2.length &&
      array1.every(function(value, index) { return value === array2[index]});
  },


  /**
   * Run js code in browser
   * @param strJsCode js code in a string
   */
  // TODO, not tested
  execJsCodeInBrowser(strJsCode) {
    cy.window().then((win) => { 
      win.eval(strJsCode);
      //win.document.getElementsByName('btnK')[1].value = "Ganesh" 
    })
  },


}

export default TestUtil;