/**
 *  This manages a log meant to be used in assisting users with screen readers.
 *  Usage:  var myLog = new ScreenReaderLog(); myLog.add(msg);
 */
 export class ScreenReaderLog {
   logElement: any;

   /**
    * Initialize the screen reader log
    * @param logID (optional) the ID of the DOM element to use for the log
    */
   constructor(private logID?:string) {
    if (logID === undefined) {
      logID = 'reader_log';
      let logEle = document.getElementById(logID)
      // reuse the existing log element 
      if (logEle) {
        this.logElement = logEle
      }
      // or create a new log element 
      else {
        this.logElement = document.createElement('div')
        this.logElement.setAttribute('id', logID);
        document.body.appendChild(this.logElement);
      }
    }
    else {
      this.logElement = document.getElementById(logID);
    }
    // set aria attributes
    this.logElement.setAttribute('aria-live', 'assertive');
    this.logElement.setAttribute('aria-relevant', 'additions');
    this.logElement.setAttribute('role', 'log');
    this.logElement.setAttribute('class', 'screen_reader_only');
   }


  /**
   *  Adds some text to the log to be read by the screen reader.
   * @param text the text to be read (hopefully immediately).  Note that at
   *  least with JAWS, sometimes the text isn't read if other things are
   *  happening at the same time.
   */
  add(text) {
    // In Firefox, we can just append the text as a text node.  In IE 9, if
    // you do that, it reads the log text from the beginning with each add.
    // Putting each entry in p tags solves that, and still works okay in
    // Firefox.
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(text));
    this.logElement.appendChild(p);
  }

 }


