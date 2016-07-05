var tp = require('./lforms_testpage.po.js');

describe('Validations:', function() {

  var bl = element(by.id("/BL/1")),
      int = element(by.id("/INT/1")),
      real = element(by.id("/REAL/1")),
      phone = element(by.id("/PHONE/1")),
      email = element(by.id("/EMAIL/1")),
      url = element(by.id("/URL/1")),
      int1 = element(by.id("/INT1/1")),
      int2 = element(by.id("/INT2/1")),
      int3 = element(by.id("/INT3/1")),
      int4 = element(by.id("/INT4/1")),
      real1 = element(by.id("/REAL1/1")),
      real2 = element(by.id("/REAL2/1")),
      real3 = element(by.id("/REAL3/1")),
      real4 = element(by.id("/REAL4/1")),
      st1 = element(by.id("/ST1/1")),
      st2 = element(by.id("/ST2/1")),
      st3 = element(by.id("/ST3/1")),
      inta = element(by.id("/INTA/1")),
      reala = element(by.id("/REALA/1")),
      sta = element(by.id("/STA/1")),

      st0 = element(by.id("/ST0/1")),
      dt = element(by.id("/DT/1")),
      cne1 = element(by.id("/CNE1/1")),
      cne2 = element(by.id("/CNE2/1")),
      cwe1 = element(by.id("/CWE1/1")),
      cwe2 = element(by.id("/CWE2/1"));


  var errorBL = element(by.cssContainingText("div.validation-error", '"BL" must be a boolean (true/false)')),
      errorINT = element(by.cssContainingText("div.validation-error", '"INT" must be an integer number')),
      errorREAL = element(by.cssContainingText("div.validation-error", '"REAL" must be a decimal number')),
      errorTM = element(by.cssContainingText("div.validation-error", '"TM" must be a time value')),
      errorYEAR = element(by.cssContainingText("div.validation-error", '"YEAR" must be a numeric value of year')),
      errorMONTH = element(by.cssContainingText("div.validation-error", '"MONTH" must be a numeric value of month')),
      errorDAY = element(by.cssContainingText("div.validation-error", '"DAY" must be a numeric value of day')),
      errorURL = element(by.cssContainingText("div.validation-error", '"URL" must be a valid URL')),
      errorEMAIL = element(by.cssContainingText("div.validation-error", '"EMAIL" must be a valid email address')),
      errorPHONE = element(by.cssContainingText("div.validation-error", '"PHONE" must be a valid phone number'));

  var errorMinExclusive = element(by.cssContainingText("div.validation-error", "must be a value greater than ")),
      errorMinInclusive = element(by.cssContainingText("div.validation-error", "must be a value greater than or equal to ")),
      errorMaxExclusive = element(by.cssContainingText("div.validation-error", "must be a value less than ")),
      errorMaxInclusive = element(by.cssContainingText("div.validation-error", "must be a value less than or equal to ")),
      errorLength = element(by.cssContainingText("div.validation-error", "must have a total length of ")),
      errorMaxLength = element(by.cssContainingText("div.validation-error", "must have a total length less than or equal to ")),
      errorMinLength = element(by.cssContainingText("div.validation-error", "must have a total length greater than or equal to ")),
      errorPattern = element(by.cssContainingText("div.validation-error", "must match a RegExp pattern of ")),
      errorRequire = element(by.cssContainingText("div.validation-error", "requires a value"));


  describe('data type validations', function () {

    it('should validate INT type', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      browser.executeScript(function () {
        var lfForms = jQuery("body").find(".lf-form");
        var lfForm = angular.element(lfForms[0]);
        lfForm.scope().setValidationInitialShowTime(200);
      });

      // no initial validations
      expect(errorINT.isPresent()).toBe(false);
      // no error messages on first visit
      int.sendKeys("1234.56");
      expect(errorINT.isPresent()).toBe(true);
      expect(errorINT.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorINT.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorINT.isDisplayed()).toBe(false);
      // get back focus again and message should be shown
      int.click();
      browser.waitForAngular();
      expect(errorINT.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorINT.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      int.click();
      expect(errorINT.isDisplayed()).toBe(true);
      // valid value no messages
      int.clear();
      int.sendKeys("123");
      expect(errorINT.isPresent()).toBe(false);

    });

    it('should validate REAL type', function () {
      // no initial validations
      expect(errorREAL.isPresent()).toBe(false);
      // no error messages on first visit
      real.sendKeys("not a number");
      expect(errorREAL.isPresent()).toBe(true);
      expect(errorREAL.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorREAL.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorREAL.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      real.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // valid value no messages
      real.clear();
      real.sendKeys("123.45");
      expect(errorREAL.isPresent()).toBe(false);
    });

    it('should validate PHONE type', function () {
      // no initial validations
      expect(errorPHONE.isPresent()).toBe(false);
      // no error messages on first visit
      phone.sendKeys("not a phone number");
      expect(errorPHONE.isPresent()).toBe(true);
      expect(errorPHONE.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorPHONE.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorPHONE.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      phone.click();
      expect(errorPHONE.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorPHONE.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      phone.click();
      expect(errorPHONE.isDisplayed()).toBe(true);
      // valid value no messages
      phone.clear();
      phone.sendKeys("3011235555");
      expect(errorPHONE.isPresent()).toBe(false);
    });

    it('should validate EMAIL type', function () {
      // no initial validations
      expect(errorEMAIL.isPresent()).toBe(false);
      // no error messages on first visit
      email.sendKeys("somebody@com");
      expect(errorEMAIL.isPresent()).toBe(true);
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      email.click();
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      email.click();
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // valid value no messages
      email.clear();
      email.sendKeys("somebody@some.com");
      expect(errorEMAIL.isPresent()).toBe(false);

    });

    it('should validate URL type', function () {
      // no initial validations
      expect(errorURL.isPresent()).toBe(false);
      // no error messages on first visit
      url.sendKeys("http:/somecompany.com");
      expect(errorURL.isPresent()).toBe(true);
      expect(errorURL.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorURL.isDisplayed()).toBe(true);
      // wait for 3 seconds and the message should disappear after 2 seconds
      browser.sleep(2000);
      expect(errorURL.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      url.click();
      expect(errorURL.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorURL.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      url.click();
      expect(errorURL.isDisplayed()).toBe(true);
      // valid value no messages
      url.clear();
      url.sendKeys("somcecompany.com");
      expect(errorURL.isPresent()).toBe(false);

    });

  });

  describe('restrictions validations', function () {

    it('should validate minInclusive on INT', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      browser.executeScript(function () {
        var lfForms = jQuery("body").find(".lf-form");
        var lfForm = angular.element(lfForms[0]);
        lfForm.scope().setValidationInitialShowTime(200);
      });

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int1.sendKeys("2");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int1.clear();
      int1.sendKeys("5");
      expect(errorMinInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on INT', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int2.sendKeys("5");
      expect(errorMinExclusive.isPresent()).toBe(true);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int2.clear();
      int2.sendKeys("6");
      expect(errorMinExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on INT', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int3.sendKeys("12");
      expect(errorMaxInclusive.isPresent()).toBe(true);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int3.clear();
      int3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on INT', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int4.sendKeys("12");
      expect(errorMaxExclusive.isPresent()).toBe(true);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int4.clear();
      int4.sendKeys("9");
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });


    it('should validate minInclusive on REAL', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      browser.executeScript(function () {
        var lfForms = jQuery("body").find(".lf-form");
        var lfForm = angular.element(lfForms[0]);
        lfForm.scope().setValidationInitialShowTime(200);
      });

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real1.sendKeys("4.9");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real1.clear();
      real1.sendKeys("5.0");
      expect(errorMinInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on REAL', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real2.sendKeys("5.0");
      expect(errorMinExclusive.isPresent()).toBe(true);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real2.clear();
      real2.sendKeys("5.01");
      expect(errorMinExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on REAL', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real3.sendKeys("10.01");
      expect(errorMaxInclusive.isPresent()).toBe(true);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real3.clear();
      real3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on REAL', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real4.sendKeys("12");
      expect(errorMaxExclusive.isPresent()).toBe(true);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real4.clear();
      real4.sendKeys("9");
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });


    it('should validate length', function () {
      // no initial validations
      expect(errorLength.isPresent()).toBe(false);
      // no error messages on first visit
      st1.sendKeys("abcd");
      expect(errorLength.isPresent()).toBe(true);
      expect(errorLength.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorLength.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st1.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // valid value no messages
      st1.clear();
      st1.sendKeys("abcde");
      expect(errorLength.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorLength.isPresent()).toBe(false);

    });


    it('should validate minLength', function () {
      // no initial validations
      expect(errorMinLength.isPresent()).toBe(false);
      // no error messages on first visit
      st2.sendKeys("abcd");
      expect(errorMinLength.isPresent()).toBe(true);
      expect(errorMinLength.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinLength.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinLength.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st2.click();
      expect(errorMinLength.isDisplayed()).toBe(true);
      // valid value no messages
      st2.clear();
      st2.sendKeys("abcde");
      expect(errorMinLength.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinLength.isPresent()).toBe(false);

    });

    it('should validate maxLength', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      // no error messages on first visit
      st3.sendKeys("12345678901");
      expect(errorMaxLength.isPresent()).toBe(true);
      expect(errorMaxLength.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxLength.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st3.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // valid value no messages
      st3.clear();
      st3.sendKeys("1234567890");
      expect(errorMaxLength.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxLength.isPresent()).toBe(false);

    });


    it('should validate "required" on ST', function () {

      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      st0.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      st0.sendKeys("abc");
      st0.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st0.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      st0.clear();
      st0.sendKeys("abcde");
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on DT', function () {

      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      dt.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      dt.sendKeys("t");
      dt.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      dt.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      dt.clear();
      dt.sendKeys("t");
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);

    });

    it('should validate "required" on CNE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cne1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      cne1.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cne1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cne1.clear();
      cne1.click();
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CWE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cwe1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      cwe1.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cwe1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cwe1.clear();
      cwe1.click();
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);

      // valid user input no message
      cwe1.clear();
      cwe1.sendKeys("user input");
      cwe1.sendKeys(protractor.Key.TAB);
      expect(errorRequire.isPresent()).toBe(false);

    });

    // CNE/CWE with multiple selections does not work with validations. Need a fix in autocomplete directive.

    it('should validate multiple restrictions on INT', function () {

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      inta.sendKeys("1");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      inta.clear();
      inta.sendKeys("10");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      inta.clear();
      inta.sendKeys("9");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on REAL', function () {
      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      reala.sendKeys("1.0");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      reala.clear();
      reala.sendKeys("10.0");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      reala.clear();
      reala.sendKeys("9.999");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });

    it('should validate multiple restrictions on ST', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // no error messages on first visit
      sta.sendKeys("123");
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(true);
      expect(errorPattern.isPresent()).toBe(true);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // try again, message shown since it is not the first visit
      sta.clear();
      sta.sendKeys("abcde678901");
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // valid value no messages
      sta.clear();
      sta.sendKeys("abcde");
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);

    });

  });

  //// for the list template, every validation tests should work too.
  //// the following tests are copies of tests above, except that the test form is displayed in the list template

  describe('data type validations', function () {

    it('should validate INT type', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      browser.executeScript(function () {
        var lfForms = jQuery("body").find(".lf-form");
        var lfForm = angular.element(lfForms[0]);
        lfForm.scope().setValidationInitialShowTime(200);
      });

      // switch to list template
      element(by.id("to-list")).click();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // no initial validations
      expect(errorINT.isPresent()).toBe(false);
      // no error messages on first visit
      int.sendKeys("1234.56");
      expect(errorINT.isPresent()).toBe(true);
      expect(errorINT.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorINT.isDisplayed()).toBe(true);
      // wait for 3 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorINT.isDisplayed()).toBe(false);
      // get back focus again and message should be shown
      int.click();
      browser.waitForAngular();
      expect(errorINT.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorINT.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      int.click();
      expect(errorINT.isDisplayed()).toBe(true);
      // valid value no messages
      int.clear();
      int.sendKeys("123");
      expect(errorINT.isPresent()).toBe(false);

    });

    it('should validate REAL type', function () {
      // no initial validations
      expect(errorREAL.isPresent()).toBe(false);
      // no error messages on first visit
      real.sendKeys("not a number");
      expect(errorREAL.isPresent()).toBe(true);
      expect(errorREAL.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // wait for 3 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorREAL.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorREAL.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      real.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // valid value no messages
      real.clear();
      real.sendKeys("123.45");
      expect(errorREAL.isPresent()).toBe(false);
    });

    it('should validate PHONE type', function () {
      // no initial validations
      expect(errorPHONE.isPresent()).toBe(false);
      // no error messages on first visit
      phone.sendKeys("not a phone number");
      expect(errorPHONE.isPresent()).toBe(true);
      expect(errorPHONE.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorPHONE.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorPHONE.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      phone.click();
      expect(errorPHONE.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorPHONE.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      phone.click();
      expect(errorPHONE.isDisplayed()).toBe(true);
      // valid value no messages
      phone.clear();
      phone.sendKeys("3011235555");
      expect(errorPHONE.isPresent()).toBe(false);
    });

    it('should validate EMAIL type', function () {
      // no initial validations
      expect(errorEMAIL.isPresent()).toBe(false);
      // no error messages on first visit
      email.sendKeys("somebody@com");
      expect(errorEMAIL.isPresent()).toBe(true);
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      email.click();
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      email.click();
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // valid value no messages
      email.clear();
      email.sendKeys("somebody@some.com");
      expect(errorEMAIL.isPresent()).toBe(false);

    });

    it('should validate URL type', function () {
      // no initial validations
      expect(errorURL.isPresent()).toBe(false);
      // no error messages on first visit
      url.sendKeys("http:/somecompany.com");
      expect(errorURL.isPresent()).toBe(true);
      expect(errorURL.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorURL.isDisplayed()).toBe(true);
      // wait for 3 seconds and the message should disappear after 2 seconds
      browser.sleep(2000);
      expect(errorURL.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      url.click();
      expect(errorURL.isDisplayed()).toBe(true);
      // no message on the 2nd time when the focus is lost
      bl.click();
      expect(errorURL.isDisplayed()).toBe(false);
      // get back focus the 3rd time and message should be shown
      url.click();
      expect(errorURL.isDisplayed()).toBe(true);
      // valid value no messages
      url.clear();
      url.sendKeys("somcecompany.com");
      expect(errorURL.isPresent()).toBe(false);

    });

  });

  describe('restrictions validations', function () {

    it('should validate minInclusive on INT', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // switch to list template
      element(by.id("to-list")).click();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      browser.executeScript(function () {
        var lfForms = jQuery("body").find(".lf-form");
        var lfForm = angular.element(lfForms[0]);
        lfForm.scope().setValidationInitialShowTime(200);
      });

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int1.sendKeys("2");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int1.clear();
      int1.sendKeys("5");
      expect(errorMinInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on INT', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int2.sendKeys("5");
      expect(errorMinExclusive.isPresent()).toBe(true);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int2.clear();
      int2.sendKeys("6");
      expect(errorMinExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on INT', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int3.sendKeys("12");
      expect(errorMaxInclusive.isPresent()).toBe(true);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int3.clear();
      int3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on INT', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      int4.sendKeys("12");
      expect(errorMaxExclusive.isPresent()).toBe(true);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      int4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int4.clear();
      int4.sendKeys("9");
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });


    it('should validate minInclusive on REAL', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // switch to list template
      element(by.id("to-list")).click();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      browser.executeScript(function () {
        var lfForms = jQuery("body").find(".lf-form");
        var lfForm = angular.element(lfForms[0]);
        lfForm.scope().setValidationInitialShowTime(200);
      });

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real1.sendKeys("4.9");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real1.clear();
      real1.sendKeys("5.0");
      expect(errorMinInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on REAL', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real2.sendKeys("5.0");
      expect(errorMinExclusive.isPresent()).toBe(true);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real2.clear();
      real2.sendKeys("5.01");
      expect(errorMinExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on REAL', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real3.sendKeys("10.01");
      expect(errorMaxInclusive.isPresent()).toBe(true);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real3.clear();
      real3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on REAL', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      real4.sendKeys("12");
      expect(errorMaxExclusive.isPresent()).toBe(true);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      real4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real4.clear();
      real4.sendKeys("9");
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });


    it('should validate length', function () {
      // no initial validations
      expect(errorLength.isPresent()).toBe(false);
      // no error messages on first visit
      st1.sendKeys("abcd");
      expect(errorLength.isPresent()).toBe(true);
      expect(errorLength.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorLength.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st1.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // valid value no messages
      st1.clear();
      st1.sendKeys("abcde");
      expect(errorLength.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorLength.isPresent()).toBe(false);

    });


    it('should validate minLength', function () {
      // no initial validations
      expect(errorMinLength.isPresent()).toBe(false);
      // no error messages on first visit
      st2.sendKeys("abcd");
      expect(errorMinLength.isPresent()).toBe(true);
      expect(errorMinLength.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinLength.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinLength.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st2.click();
      expect(errorMinLength.isDisplayed()).toBe(true);
      // valid value no messages
      st2.clear();
      st2.sendKeys("abcde");
      expect(errorMinLength.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinLength.isPresent()).toBe(false);

    });

    it('should validate maxLength', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      // no error messages on first visit
      st3.sendKeys("12345678901");
      expect(errorMaxLength.isPresent()).toBe(true);
      expect(errorMaxLength.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxLength.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st3.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // valid value no messages
      st3.clear();
      st3.sendKeys("1234567890");
      expect(errorMaxLength.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxLength.isPresent()).toBe(false);

    });


    it('should validate "required" on ST', function () {

      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      st0.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      st0.sendKeys("abc");
      st0.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st0.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      st0.clear();
      st0.sendKeys("abcde");
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on DT', function () {

      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      dt.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      dt.sendKeys("t");
      dt.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      dt.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      dt.clear();
      dt.sendKeys("t");
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);

    });

    it('should validate "required" on CNE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cne1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      cne1.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cne1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cne1.clear();
      cne1.click();
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CWE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cwe1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      cwe1.clear();
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cwe1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cwe1.clear();
      cwe1.click();
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorRequire.isPresent()).toBe(false);

      // valid user input no message
      cwe1.clear();
      cwe1.sendKeys("user input");
      cwe1.sendKeys(protractor.Key.TAB);
      expect(errorRequire.isPresent()).toBe(false);

    });

    // CNE/CWE with multiple selections does not work with validations. Need a fix in autocomplete directive.

    it('should validate multiple restrictions on INT', function () {

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      inta.sendKeys("1");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      inta.clear();
      inta.sendKeys("10");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      inta.clear();
      inta.sendKeys("9");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on REAL', function () {
      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      reala.sendKeys("1.0");
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      reala.clear();
      reala.sendKeys("10.0");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      reala.clear();
      reala.sendKeys("9.999");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });

    it('should validate multiple restrictions on ST', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // no error messages on first visit
      sta.sendKeys("123");
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(true);
      expect(errorPattern.isPresent()).toBe(true);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // show message when the focus is gone
      bl.click();
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // wait for 2 seconds and the message should disappear after 2 seconds
      browser.sleep(200);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // try again, message shown since it is not the first visit
      sta.clear();
      sta.sendKeys("abcde678901");
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // valid value no messages
      sta.clear();
      sta.sendKeys("abcde");
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // still no message when the focus is gone
      bl.click();
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);

    });

  });

});