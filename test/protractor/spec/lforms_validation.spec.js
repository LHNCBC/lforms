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


  var errorBL = element(by.cssContainingText("div.validation-error", '"BL" requires a boolean value')),
      errorINT = element(by.cssContainingText("div.validation-error", '"INT" requires a integer value')),
      errorREAL = element(by.cssContainingText("div.validation-error", '"REAL" requires a decimal value')),
      errorTM = element(by.cssContainingText("div.validation-error", '"TM" requires a time value')),
      errorYEAR = element(by.cssContainingText("div.validation-error", '"YEAR" requires a year value')),
      errorMONTH = element(by.cssContainingText("div.validation-error", '"MONTH" requires a month value')),
      errorDAY = element(by.cssContainingText("div.validation-error", '"DAY" requires a day value')),
      errorURL = element(by.cssContainingText("div.validation-error", '"URL" requires a URL')),
      errorEMAIL = element(by.cssContainingText("div.validation-error", '"EMAIL" requires a email address')),
      errorPHONE = element(by.cssContainingText("div.validation-error", '"PHONE" requires a phone number'));

  var errorMinExclusive = element(by.cssContainingText("div.validation-error", "requires a value greater than ")),
      errorMinInclusive = element(by.cssContainingText("div.validation-error", "requires a value greater than or equal to ")),
      errorMaxExclusive = element(by.cssContainingText("div.validation-error", "requires a value less than ")),
      errorMaxInclusive = element(by.cssContainingText("div.validation-error", "requires a value less than or equal to ")),
      errorLength = element(by.cssContainingText("div.validation-error", "requires a total length of ")),
      errorMaxLength = element(by.cssContainingText("div.validation-error", "requires a total length less than or equal to ")),
      errorMinLength = element(by.cssContainingText("div.validation-error", "requires a total length greater than or equal to ")),
      errorPattern = element(by.cssContainingText("div.validation-error", "requires to match a RegExp pattern of ")),
      errorRequire = element(by.cssContainingText("div.validation-error", "requires a value"));


  describe('data type validations', function () {

    it('should validate INT type', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // no initial validations
      expect(errorINT.isPresent()).toBe(false);
      // show messages
      int.sendKeys("1234.56");
      expect(errorINT.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorINT.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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
      // show messages
      real.sendKeys("not a number");
      expect(errorREAL.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorREAL.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // valid value no messages
      real.clear();
      real.sendKeys("123");
      expect(errorREAL.isPresent()).toBe(false);
    });

    it('should validate PHONE type', function () {
      // no initial validations
      expect(errorPHONE.isPresent()).toBe(false);
      // show messages
      phone.sendKeys("not a phone number");
      expect(errorPHONE.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorPHONE.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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
      // show messages
      email.sendKeys("somebody@com");
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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
      // show messages
      url.sendKeys("http:/somecompany.com");
      expect(errorURL.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorURL.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // show messages
      int1.sendKeys("2");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int1.clear();
      int1.sendKeys("5");
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on INT', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // show messages
      int2.sendKeys("5");
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int2.clear();
      int2.sendKeys("6");
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on INT', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // show messages
      int3.sendKeys("12");
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int3.clear();
      int3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on INT', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show messages
      int4.sendKeys("12");
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int4.clear();
      int4.sendKeys("9");
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });


    it('should validate minInclusive on REAL', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // show messages
      real1.sendKeys("4.9");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real1.clear();
      real1.sendKeys("5.0");
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on REAL', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // show messages
      real2.sendKeys("5.0");
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real2.clear();
      real2.sendKeys("5.01");
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on REAL', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // show messages
      real3.sendKeys("10.01");
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real3.clear();
      real3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on REAL', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show messages
      real4.sendKeys("10");
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real4.clear();
      real4.sendKeys("9.99");
      expect(errorMaxInclusive.isPresent()).toBe(false);
    });


    it('should validate length', function () {
      // no initial validations
      expect(errorLength.isPresent()).toBe(false);
      // show messages
      st1.sendKeys("abcd");
      expect(errorLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st1.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // valid value no messages
      st1.clear();
      st1.sendKeys("abcde");
      expect(errorLength.isPresent()).toBe(false);
    });

    it('should validate length', function () {
      // no initial validations
      expect(errorLength.isPresent()).toBe(false);
      // show messages
      st1.sendKeys("abcd");
      expect(errorLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st1.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // valid value no messages
      st1.clear();
      st1.sendKeys("abcde");
      expect(errorLength.isPresent()).toBe(false);
    });

    it('should validate minLength', function () {
      // no initial validations
      expect(errorMinLength.isPresent()).toBe(false);
      // show messages
      st2.sendKeys("abcd");
      expect(errorMinLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st2.click();
      expect(errorMinLength.isDisplayed()).toBe(true);
      // valid value no messages
      st2.clear();
      st2.sendKeys("abcde");
      expect(errorMinLength.isPresent()).toBe(false);
    });

    it('should validate maxLength', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      // show messages
      st3.sendKeys("12345678901");
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st3.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // valid value no messages
      st3.clear();
      st3.sendKeys("1234567890");
      expect(errorMaxLength.isPresent()).toBe(false);
    });


    it('should validate "required" on ST', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      st0.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      st0.sendKeys("abc");
      st0.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st0.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      st0.clear();
      st0.sendKeys("abc");
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on DT', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      dt.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      dt.sendKeys("t");
      dt.sendKeys(protractor.Key.TAB);
      dt.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      dt.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      dt.clear();
      dt.sendKeys("t");
      dt.sendKeys(protractor.Key.TAB);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CNE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      cne1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.TAB);
      cne1.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      cne1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cne1.clear();
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.TAB);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CWE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      cwe1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.TAB);
      cwe1.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      cwe1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cwe1.clear();
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.TAB);
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
      // show messages
      inta.sendKeys("1");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      inta.clear();
      inta.sendKeys("10");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      inta.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      inta.clear();
      inta.sendKeys("9");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on INT', function () {
      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show messages
      reala.sendKeys("1.0");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      reala.clear();
      reala.sendKeys("10.0");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      reala.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      reala.clear();
      reala.sendKeys("9.999");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on ST', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // show messages
      sta.sendKeys("123");
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      sta.clear();
      sta.sendKeys("abcde678901");
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      // get back focus and messages are shown
      sta.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // valid value no messages
      sta.clear();
      sta.sendKeys("abcde");
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
    });

  });

  // for the list template, every validation tests should work too.
  // the following tests are copies of tests above, except that the test form is displayed in the list template
  describe('data type validations', function () {

    it('should validate INT type', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // switch to list template
      element(by.id("to-list")).click();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      // no initial validations
      expect(errorINT.isPresent()).toBe(false);
      // show messages
      int.sendKeys("1234.56");
      expect(errorINT.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorINT.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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
      // show messages
      real.sendKeys("not a number");
      expect(errorREAL.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorREAL.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real.click();
      expect(errorREAL.isDisplayed()).toBe(true);
      // valid value no messages
      real.clear();
      real.sendKeys("123");
      expect(errorREAL.isPresent()).toBe(false);
    });

    it('should validate PHONE type', function () {
      // no initial validations
      expect(errorPHONE.isPresent()).toBe(false);
      // show messages
      phone.sendKeys("not a phone number");
      expect(errorPHONE.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorPHONE.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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
      // show messages
      email.sendKeys("somebody@com");
      expect(errorEMAIL.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorEMAIL.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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
      // show messages
      url.sendKeys("http:/somecompany.com");
      expect(errorURL.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorURL.isDisplayed()).toBe(false);
      // get back focus and messages are shown
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

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // show messages
      int1.sendKeys("2");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int1.clear();
      int1.sendKeys("5");
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on INT', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // show messages
      int2.sendKeys("5");
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int2.clear();
      int2.sendKeys("6");
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on INT', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // show messages
      int3.sendKeys("12");
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int3.clear();
      int3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on INT', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show messages
      int4.sendKeys("12");
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      int4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      int4.clear();
      int4.sendKeys("9");
      expect(errorMaxInclusive.isPresent()).toBe(false);

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

      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      // show messages
      real1.sendKeys("4.9");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real1.click();
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real1.clear();
      real1.sendKeys("5.0");
      expect(errorMinInclusive.isPresent()).toBe(false);

    });

    it('should validate minExclusive on REAL', function () {
      // no initial validations
      expect(errorMinExclusive.isPresent()).toBe(false);
      // show messages
      real2.sendKeys("5.0");
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real2.click();
      expect(errorMinExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real2.clear();
      real2.sendKeys("5.01");
      expect(errorMinExclusive.isPresent()).toBe(false);

    });

    it('should validate maxInclusive on REAL', function () {
      // no initial validations
      expect(errorMaxInclusive.isPresent()).toBe(false);
      // show messages
      real3.sendKeys("10.01");
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real3.click();
      expect(errorMaxInclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real3.clear();
      real3.sendKeys("10");
      expect(errorMaxInclusive.isPresent()).toBe(false);

    });

    it('should validate maxExclusive on REAL', function () {
      // no initial validations
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show messages
      real4.sendKeys("10");
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      real4.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      real4.clear();
      real4.sendKeys("9.99");
      expect(errorMaxInclusive.isPresent()).toBe(false);
    });


    it('should validate length', function () {
      // no initial validations
      expect(errorLength.isPresent()).toBe(false);
      // show messages
      st1.sendKeys("abcd");
      expect(errorLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st1.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // valid value no messages
      st1.clear();
      st1.sendKeys("abcde");
      expect(errorLength.isPresent()).toBe(false);
    });

    it('should validate length', function () {
      // no initial validations
      expect(errorLength.isPresent()).toBe(false);
      // show messages
      st1.sendKeys("abcd");
      expect(errorLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st1.click();
      expect(errorLength.isDisplayed()).toBe(true);
      // valid value no messages
      st1.clear();
      st1.sendKeys("abcde");
      expect(errorLength.isPresent()).toBe(false);
    });

    it('should validate minLength', function () {
      // no initial validations
      expect(errorMinLength.isPresent()).toBe(false);
      // show messages
      st2.sendKeys("abcd");
      expect(errorMinLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMinLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st2.click();
      expect(errorMinLength.isDisplayed()).toBe(true);
      // valid value no messages
      st2.clear();
      st2.sendKeys("abcde");
      expect(errorMinLength.isPresent()).toBe(false);
    });

    it('should validate maxLength', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      // show messages
      st3.sendKeys("12345678901");
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st3.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      // valid value no messages
      st3.clear();
      st3.sendKeys("1234567890");
      expect(errorMaxLength.isPresent()).toBe(false);
    });


    it('should validate "required" on ST', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      st0.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      st0.sendKeys("abc");
      st0.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      st0.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      st0.clear();
      st0.sendKeys("abc");
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on DT', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      dt.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      dt.sendKeys("t");
      dt.sendKeys(protractor.Key.TAB);
      dt.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      dt.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      dt.clear();
      dt.sendKeys("t");
      dt.sendKeys(protractor.Key.TAB);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CNE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      cne1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.TAB);
      cne1.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      cne1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cne1.clear();
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.TAB);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CWE (single)', function () {
      // no initial validations
      expect(errorRequire.isPresent()).toBe(false);
      // no validations on first time getting focus
      cwe1.click();
      expect(errorRequire.isPresent()).toBe(false);
      // show messages
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.TAB);
      cwe1.clear();
      expect(errorRequire.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      cwe1.click();
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cwe1.clear();
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.TAB);
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
      // show messages
      inta.sendKeys("1");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      inta.clear();
      inta.sendKeys("10");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      inta.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      inta.clear();
      inta.sendKeys("9");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on INT', function () {
      // no initial validations
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show messages
      reala.sendKeys("1.0");
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      reala.clear();
      reala.sendKeys("10.0");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and messages are shown
      reala.click();
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      reala.clear();
      reala.sendKeys("9.999");
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on ST', function () {
      // no initial validations
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // show messages
      sta.sendKeys("123");
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      sta.clear();
      sta.sendKeys("abcde678901");
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // no focus no shown messages
      bl.click();
      expect(errorMaxLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      // get back focus and messages are shown
      sta.click();
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // valid value no messages
      sta.clear();
      sta.sendKeys("abcde");
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
    });

  });

});