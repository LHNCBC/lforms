// Helper functions for the tests
import { browser, element, by, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import * as path from 'path';
import * as fs from 'fs';
let LForms: any = (global as any).LForms;

const TestUtil = {
  /**
   *  Returns a function that returns a promise for the given element.
   * @param elemLoc either a string for the ID of an element or a protractor
   *  locator.
   */
  elementFactory: function(elemLoc) {
    if (typeof elemLoc === 'string')
      elemLoc = by.id(elemLoc);
    return function () {
      return element(elemLoc);
    }
  },

  /**
   *  Waits for a field to have the given value.
   * @param field a protractor element locator (e.g. returned by $)
   * @param value the value to wait for
   * @return a promise that resolves when the field has the expected value.
   */
  waitForValue: function (field, value) {
    return browser.wait(function() {
      return field.getAttribute('value').then(function(val) {
        return val === value;
      })
    }, 5000);// Debugging: .then(function() {console.log("got "+value)}, function() {console.log("didn't get "+value)});
  },


  /**
   * Get a value from a DOM element
   * @param field a DOM element that has a value, i.e. INPUT/TEXTAREA and etc.
   * @returns 
   * Note: ele.getAttribute('style') still works.
   * Note2: it is working again (as of 7/29/2021) in protractor "~7.0.0" and Angular "~11.2.1"
   * and Linux Chrome Version 92.0.4515.107
   */
  getFieldValue: function(field) {
    return field.getWebElement().then((element) =>
      browser.executeScript((el) => {
        return el.value;
      }, element)
    )
  },


  /**
   * Get an attribute value from a DOM element
   * @param field a DOM element
   * @param attrName 
   * @returns 
   */
  getAttribute: function(field, attrName) {
    return field.getWebElement().then((element) =>
      browser.executeScript((el, attr) => {
        return el[attr];
      }, element, attrName)
    )
  },


  sendKeys(field, value) {
    field.sendKeys(value)
  },

  // NOT USED, waitForValue seems not working in some cases.
  /**
   *  The selenium sendKeys function sends events for each character and the
   *  result is not stable, so we use this instead.  Only the key events for the
   *  last character are sent.
   * @param field a protractor element locator (e.g. returned by $)
   * @param str the value (either a string or a number)
   * @return a promise that resolves when str has been added to the field value
   */
  _sendKeys: function(field, str) {
    const self = this;
    str = '' + str; // convert numbers to strings
    return field.getAttribute('value').then(function(oldVal) {
      var allButLastChar = oldVal+str.slice(0,-1);
      browser.executeScript('arguments[0].value = "'+allButLastChar+'"',
        field.getWebElement()).then(function success() {
          self.waitForValue(field, allButLastChar);          
          field.sendKeys(str.slice(-1));
          return self.waitForValue(field, oldVal+str);
        }, function rejected() {
          // For type=file, you can't set the value programmatically.  I think
          // protractor does something special.  Also, the value starts with
          // something like C:\fakepath for reason, so just let
          // protractor handle it.
          return field.sendKeys(str);
        });
      });
  },


  /**
   *  The selenium clearField function does not wait for the field to be cleared
   *  before the next field runs (https://stackoverflow.com/a/43616117) so we
   *  use this instead.
   * @param field a protractor element locator (e.g. returned by $)
   * @return a promise that resolves when the field is empty
   */
  clearField: function(field) {
    field.clear();
    return this.waitForValue(field, '');
  },


  /**
   * Clear up the input field of the DOM element and udpate model data
   * The proctractor clear() clears the DOM element but does not update model data.
   * (if sendKeys(somecharacter) is called after clear(), the model data is updated with somecharacter, 
   * so it is not always necessary to call this function)
   * See https://github.com/angular/protractor/issues/301, the bug was fixed and appeared for many times
   * and it is not working again (as of 7/29/2021) for the Web Component, in protractor "~7.0.0" and Angular "~11.2.1"
   * @param field a protractor element locator
   */
  clear: function(field) {
    field.click();
    field.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    field.sendKeys(protractor.Key.BACK_SPACE);
    field.clear();
  },


  /**
   *  Erases the value in the given field.  Leaves the focus in the
   *  field afterward (unlike clearField, which uses the protractor API which
   *  does something to the focus.
   * @param field a protractor element locator (e.g. returned by $)
   * @return a promise that resolves when the field is empty
   */
  eraseField: function(field) {
    field.click();
    field.sendKeys(protractor.Key.CONTROL, 'a'); // select all
    field.sendKeys(protractor.Key.BACK_SPACE); // clear the field
    return this.waitForValue(field, '');
  },


  /**
   *  Returns a promise that resolves when scrolling has stopped.
   */
  waitForScrollStop: function() {
    return browser.executeScript("return window.scrollY").then(originalScrollY => {
      // Sleep to let some scrolling happen, if it is going to.
      return browser.sleep(100).then(() =>
        browser.executeScript("return window.scrollY").then(newScrollY => {
          console.log("originalScrollY="+originalScrollY+"; newScrollY="+newScrollY);
          return (originalScrollY == newScrollY) ? true : this.waitForScrollStop()
        })
      );
    });
  },


  /**
   * Scrolls an element's parent container such that the element is visible to the user
   * @param {ElementFinder} elementFinder - protractor object to represent the element
   * @return {Promise}
   */
  scrollIntoView: function (elementFinder) {
    // console.log("scrollInfoView called for "+elementFinder.locator().value);
    return elementFinder.getWebElement().then((element) => {
      return browser.executeScript(function (element) {
        if (element.scrollIntoViewIfNeeded) {
          element.scrollIntoViewIfNeeded(true);
        } else {
          element.scrollIntoView({block: 'center'});
        }
      }, element).then(
        () => this.waitForScrollStop()
      );
    });
  },


  /**
   * Scrolls an element into view and clicks on it when it becomes clickable
   * @param {ElementFinder} elementFinder - protractor object to represent the element
   * @return {Promise}
   */
  safeClick: function (elementFinder) {
    // Borrowed Yury's code from fhir-obs-viewer.
    return browser.wait(ExpectedConditions.elementToBeClickable(elementFinder), 5000).then(()=>
      this.scrollIntoView(elementFinder).then(() => {
        console.log("Clicking "+elementFinder.locator().value);
        return elementFinder.click()
      })
    );
    // For when debugging is needed.
    /*
    return browser.wait(ExpectedConditions.presenceOf(elementFinder)).then(() => {
      console.log("%%% safeClick:  element present");
      return browser.wait(()=>elementFinder.isDisplayed()).then(() => {
      //return browser.wait(ExpectedConditions.visibilityOf(elementFinder)).then(() => {
        console.log("%%% safeClick:  element visible");
        return this.scrollIntoView(elementFinder).then(() => elementFinder.click());
      });
    });
    */
  },


  /**
   *  For fields with an autocomplete-lhc list, this returns a promise that
   *  resolves to the number items in the list.  (For other fields, it will
   *  resolve to zero.)
   * @param field the element finder for the field.
   */
  fieldListLength: function(field) {
    return browser.executeScript(function(htmlField) {
      let size = 0;
      let autocomp = htmlField.autocomp;
      if (autocomp) {
        let rawList = autocomp.rawList_;
        if (rawList)
          size = rawList.length;
      }
      return size;
    }, field.getWebElement());
  },


  /**
   *  For fields with an autocomplete-lhc list, this returns a promise that
   *  resolved to a boolean indicating whether the field has a list of a at
   *  least one item.
   * @param field the element finder for the field.
   */
  fieldHasList: function(field) {
    return this.fieldListLength(field).then((length)=>{
      return length > 0;
    });
  },


   /**
   *  Clicks the given add/remove repeating item button, and sleeps a bit to let the page stop moving.
   */
  clickAddRemoveButton: function (button) {
    browser.executeScript('arguments[0].scrollIntoView({behavior: "instant"})',
      button.getWebElement());
    browser.sleep(300); // allow page to scroll or adjust
    button.click();
    browser.sleep(300); // allow page to scroll or adjust
  },

  waitForElementVisible: function(elem) {
    browser.wait(function(){return ExpectedConditions.visibilityOf(elem)}, 3000);
  },

  /**
   *  Waits for the given element to be present on the page.
   */
  waitForElementPresent: function(elem) {
    browser.wait(function(){return browser.isElementPresent(elem)}, 30000);
  },

  /**
   *  Waits for the given element to not be present on the page.
   */
  waitForElementNotPresent: function(elem) {
    browser.wait(function(){return ExpectedConditions.not(ExpectedConditions.presenceOf(elem))}, 3000);
  },

  /**
   *  Waits for the given element to be displayed on the page.
   */
  waitForElementDisplayed: function(elem) {
    // Make sure it is displayed first.
    this.waitForElementPresent(elem);
    browser.wait(function(){return elem.isDisplayed()}, 3000);
  },

  /**
   *  Waits for the given element to be not displayed on the page.
   */
  waitForElementNotDisplayed: function(elem) {
    browser.wait(function() {
      // Avoid reporting an error if the element is not even present.
      return elem.isPresent().then(function(result) {
        if (!result)
          return true;
        else
          return elem.isDisplayed().then(function(result){return !result});
      });
    }, 3000);
  },

  //TODO: LForms.Def is not avaible
  /**
   *  Disables Autocompleter scrolling (by making the move immediate).
   */
  disableAutocompleterScroll: function() {
    let origStart = LForms.Def.Effect.Base.prototype.start;
    LForms.Def.Effect.Scroll.prototype.start = function(options) {
      options.duration = 0;
      origStart.call(this, options);
    }
  },

  /**
   *  Disables CSS animation.
   */
  disableCssAnimate: function() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '* {' +
      '-webkit-transition: none !important;' +
      '-moz-transition: none !important;' +
      '-o-transition: none !important;' +
      '-ms-transition: none !important;' +
      'transition: none !important;'
      '}';
    document.getElementsByTagName('head')[0].appendChild(style);
  },

  /**
   * Get the datetime string in DTM picker's default format for the current time with the given offset.
   * @param offsetMS the offset from the current time, in milliseconds, optional.
   *        Use a negative offset for past time, positive for future, zero or unspecified for "current"
   * @return the datetime string in the DTM datetime picker's default format (MM/DD/YYYY HH:MM).
   */
  getCurrentDTMString: function(offsetMS) {
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
   *  Converts a Questionnaire and QuestionnaireResponse into an LFormsData
   *  object, and uses addFormToPage to render it in the specified element.
   * @param q the Questionnaire (parsed)
   * @param qr the QuestionnaireResponse
   * @param elemID the ID of an element into which the form should be shown.
   * @return a promise that resolves when the browser has been instructed to
   *  render the form.
   */
  showQQR: function(q, qr, elemID) {
    return browser.executeScript(() => {
      var q2 = arguments[0];
      var qr2 = arguments[1];
      var elemID = arguments[2];
      var lfd = LForms.Util.convertFHIRQuestionnaireToLForms(q2, 'R4');
      var merged = LForms.Util.mergeFHIRDataIntoLForms(qr2, lfd, 'R4');

      // Set a flag so we know when the render is done.
      var formElem = document.getElementById(elemID);
      merged = new LForms.LFormsData(merged);
      LForms.Util.addFormToPage(merged, elemID);
    }, q, qr, elemID);
  },

  /**
   *  Creates a temporary file
   * @param fileName the file name use.  It does not need to be unique, because
   *  it will put inside a unique directory.
   * @param content the content to write to the file
   * @return the full pathname for the temporary file.
   */
  createTempFile: function(fileName, content) {
    const tmp = require('tmp');
    tmp.setGracefulCleanup();
    var dirObj = tmp.dirSync({prefix: 'lformsTest2', unsafeCleanup: true});
    var dirPath = dirObj.name;
    var pathName = path.join(dirPath, fileName);
    fs.writeFileSync(pathName, content);
    return pathName;
  },

  /**
   * NOT working quite right. keep for further debugging
   * A funtion to run LForms.Util.getUserData on the test page.

   * @param element the containing HTML element that includes the LForm's rendered form.
   * @param noFormDefData optional, to include form definition data, the default is false.
   * @param noEmptyValue optional, to remove items that have an empty value, the default is false.
   * @param noDisabledItem optional, to remove items that are disabled by skip logic, the default is false.
   * @returns a promise that resolves when the user data of the form is returned
   */
  getUserData: function(element=null, noFormDefData=false, noEmptyValue=false, noDisabledItem=false) {    
    return browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var lfData;
      switch (arguments.length) {
        case 5:
          lfData = LForms.Util.getUserData(arguments[0], arguments[1], arguments[2], arguments[3]);
          break;
        case 4:
          lfData = LForms.Util.getUserData(arguments[0], arguments[1], arguments[2]);
          break;
        case 3:
          lfData = LForms.Util.getUserData(arguments[0], arguments[1]);
          break;
        case 2:
          lfData = LForms.Util.getUserData(arguments[0]);
          break;
        case 1:
          lfData = LForms.Util.getUserData();
          break;
        default:
          lfData = LForms.Util.getUserData();
      }      

      callback(lfData);
    })
  },


  /**
   * Wait for the externally linked FHIR libraries to be loaded. 
   */
  waitForFHIRLibsLoaded() {
    browser.wait(function() {
      return browser.driver.executeScript(
        'return typeof(LForms.FHIR) === "object" && typeof(LForms.FHIR.R4) === "object" && typeof(LForms.FHIR.STU3) === "object"');
    }, 5000);
  }

}

export default TestUtil;
