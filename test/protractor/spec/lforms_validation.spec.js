var tp = require('./lforms_testpage.po.js');

function shortenValidationMsgShowTime() {
  browser.executeScript(function () {
    var lfForms = jQuery("body").find(".lf-form");
    var lfForm = angular.element(lfForms[0]);
    lfForm.scope().setValidationInitialShowTime(500);
  });
}

function waitForDisplayed(errorMsg) {
  browser.wait(function() {
    return errorMsg.isDisplayed();
  }, 5000);
}

function waitForNotDisplayed(errorMsg) {
  browser.wait(function() {
    return errorMsg.isDisplayed().then(function(result){return !result});
  }, 5000);
}

function waitForNotPresent(errorMsg) {
  browser.wait(function() {
    return errorMsg.isPresent().then(function(result){return !result});
  }, 5000);
}

function testOneType(eleInput, eleAway, eleMessage, value1, value2) {
  // no initial validations
  expect(eleMessage.isPresent()).toBe(false);
  // no error messages on first visit
  eleInput.sendKeys(value1);
  waitForNotDisplayed(eleMessage);
  expect(eleMessage.isPresent()).toBe(true);
  expect(eleMessage.isDisplayed()).toBe(false);
  // show message when the focus is gone
  eleAway.click();
  waitForDisplayed(eleMessage);
  //expect(eleMessage.isDisplayed()).toBe(true);
  // wait for 200 ms and the message should disappear after 200 ms
  //browser.sleep(200);
  waitForNotDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(false);
  // get back focus again and message should be shown
  eleInput.click();
  waitForDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(true);
  // no message on the 2nd time when the focus is lost
  eleAway.click();
  waitForNotDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(false);
  // get back focus the 3rd time and message should be shown
  eleInput.click();
  waitForDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(true);
  // valid value no messages
  eleInput.clear();
  eleInput.sendKeys(value2);
  waitForNotPresent(eleMessage);
  expect(eleMessage.isPresent()).toBe(false);
  // still no message when the focus is gone
  eleAway.click();
  waitForNotPresent(eleMessage);
  expect(eleMessage.isPresent()).toBe(false);


}

describe('Validations:', function() {

  var bl = element(by.id("/BL/1")),
      int = element(by.id("/INT/1")),
      real = element(by.id("/REAL/1")),
      phone = element(by.id("/PHONE/1")),
      email = element(by.id("/EMAIL/1")),
      url = element(by.id("/URL/1")),
      nr = element(by.id("/NR/1")),
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

  var lblbl = element(by.css("label[for='/BL/1'")),
      lblint = element(by.css("label[for='/INT/1'")),
      lblreal = element(by.css("label[for='/REAL/1'")),
      lblphone = element(by.css("label[for='/PHONE/1'")),
      lblemail = element(by.css("label[for='/EMAIL/1'")),
      lblurl = element(by.css("label[for='/URL/1'")),
      lblnr = element(by.css("label[for='/NR1/1'")),
      lblint1 = element(by.css("label[for='/INT1/1'")),
      lblint2 = element(by.css("label[for='/INT2/1'")),
      lblint3 = element(by.css("label[for='/INT3/1'")),
      lblint4 = element(by.css("label[for='/INT4/1'")),
      lblreal1 = element(by.css("label[for='/REAL1/1'")),
      lblreal2 = element(by.css("label[for='/REAL2/1'")),
      lblreal3 = element(by.css("label[for='/REAL3/1'")),
      lblreal4 = element(by.css("label[for='/REAL4/1'")),
      lblst1 = element(by.css("label[for='/ST1/1'")),
      lblst2 = element(by.css("label[for='/ST2/1'")),
      lblst3 = element(by.css("label[for='/ST3/1'")),
      lblinta = element(by.css("label[for='/INTA/1'")),
      lblreala = element(by.css("label[for='/REALA/1'")),
      lblsta = element(by.css("label[for='/STA/1'")),
      lblst0 = element(by.css("label[for='/ST0/1'")),
      lbldt = element(by.css("label[for='/DT/1'")),
      lblcne1 = element(by.css("label[for='/CNE1/1'")),
      lblcne2 = element(by.css("label[for='/CNE2/1'")),
      lblcwe1 = element(by.css("label[for='/CWE1/1'")),
      lblcwe2 = element(by.css("label[for='/CWE2/1'"));


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
      errorNR = element(by.cssContainingText("div.validation-error", '"NR" must be two numeric values separated by a ^. One value can be omitted, but not the ^'));

  var errorMinExclusive = element(by.cssContainingText("div.validation-error", "must be a value greater than ")),
      errorMinInclusive = element(by.cssContainingText("div.validation-error", "must be a value greater than or equal to ")),
      errorMaxExclusive = element(by.cssContainingText("div.validation-error", "must be a value less than ")),
      errorMaxInclusive = element(by.cssContainingText("div.validation-error", "must be a value less than or equal to ")),
      errorLength = element(by.cssContainingText("div.validation-error", "must have a total length of ")),
      errorMaxLength = element(by.cssContainingText("div.validation-error", "must have a total length less than or equal to ")),
      errorMinLength = element(by.cssContainingText("div.validation-error", "must have a total length greater than or equal to ")),
      errorPattern = element(by.cssContainingText("div.validation-error", "must match a RegExp pattern of")),
      errorRequire = element(by.cssContainingText("div.validation-error", "requires a value"));


  describe('data type validations (table)', function () {

    it('should validate INT type', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      shortenValidationMsgShowTime();

      testOneType(int, lblbl, errorINT, "1234.56", "123");
    });

    it('should validate REAL type', function () {
      testOneType(real, lblint, errorREAL, "not a number", "123.45");
    });

    it('should validate PHONE type', function () {
      testOneType(phone, lblreal, errorPHONE, "not a phone number", "3011235555");
    });

    it('should validate EMAIL type', function () {
      testOneType(email, lblphone, errorEMAIL, "somebody@com", "somebody@some.com");
    });

    it('should validate URL type', function () {
      testOneType(url, lblemail, errorURL, "http:/somecompany.com", "http://somecompany.com");
    });

    it('should validate NR type', function () {
      testOneType(nr, lblurl, errorNR, "-123 567", "-123^ 567");
    });

  });

  describe('restrictions validations (table)', function () {
    beforeAll(function() {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);
    });

    it('should validate minInclusive on INT', function () {
      shortenValidationMsgShowTime();
      testOneType(int1, lblurl, errorMinInclusive, "2", "5");
    });

    it('should validate minExclusive on INT', function () {
      testOneType(int2, lblint1, errorMinExclusive, "5", "6");
    });

    it('should validate maxInclusive on INT', function () {
      testOneType(int3, lblint2, errorMaxInclusive, "12", "10");
    });

    it('should validate maxExclusive on INT', function () {
      testOneType(int4, lblint3, errorMaxExclusive, "12", "9");
    });

    it('should validate minInclusive on REAL', function () {
      tp.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, 5000);

      shortenValidationMsgShowTime();
      testOneType(real1, lblint4, errorMinInclusive, "4.9", "5.0");
    });

    it('should validate minExclusive on REAL', function () {
      testOneType(real2, lblreal1, errorMinExclusive, "5.0", "5.01");
    });

    it('should validate maxInclusive on REAL', function () {
      testOneType(real3, lblreal2, errorMaxInclusive, "10.01", "10");
    });

    it('should validate maxExclusive on REAL', function () {
      testOneType(real4, lblreal3, errorMaxExclusive, "12", "9");
    });

    it('should validate length', function () {
      testOneType(st1, lblreal4, errorLength, "abcd", "abcde");
    });

    it('should validate minLength', function () {
      testOneType(st2, lblst1, errorMinLength, "abcd", "abcde");
    });

    it('should validate maxLength', function () {
      testOneType(st3, lblst2, errorMaxLength, "12345678901", "1234567890");
    });

    it('should validate "required" on ST', function () {

      // no initial validations
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      st0.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      st0.sendKeys("abc");
      st0.clear();
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblst3.click();
      waitForDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st0.click();
      waitForDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      st0.clear();
      st0.sendKeys("abcde");
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblst3.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on DT', function () {

      // no initial validations
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      dt.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      dt.sendKeys("t");
      dt.clear();
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblst0.click();
      waitForDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      dt.click();
      waitForDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      dt.clear();
      dt.sendKeys("t");
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblst0.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);

    });

    it('should validate "required" on CNE (single)', function () {
      // no initial validations
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cne1.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      cne1.clear();
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lbldt.click();
      waitForDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cne1.click();
      waitForDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cne1.clear();
      cne1.click();
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lbldt.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CWE (single)', function () {
      // no initial validations
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cwe1.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      cwe1.clear();
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblcne1.click();
      waitForDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cwe1.click();
      waitForDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      cwe1.clear();
      cwe1.click();
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblcne1.click();
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // valid user input no message
      cwe1.clear();
      cwe1.sendKeys("user input");
      cwe1.sendKeys(protractor.Key.TAB);
      waitForNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);

    });

    // CNE/CWE with multiple selections does not work with validations. Need a fix in autocomplete directive.

    it('should validate multiple restrictions on INT', function () {

      // no initial validations
      waitForNotPresent(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      inta.sendKeys("1");
      waitForNotDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      lblcwe1.click();
      waitForDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      //expect(errorMinInclusive.isDisplayed()).toBe(true);
      //expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      waitForDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      inta.clear();
      inta.sendKeys("10");
      waitForNotPresent(errorMinInclusive);
      waitForDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      lblcwe1.click();
      waitForNotPresent(errorMinInclusive);
      waitForNotDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      waitForNotPresent(errorMinInclusive);
      waitForDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      inta.clear();
      inta.sendKeys("9");
      waitForNotPresent(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblcwe1.click();
      waitForNotPresent(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on REAL', function () {
      // no initial validations
      waitForNotPresent(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      reala.sendKeys("1.0");
      waitForNotDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      lblinta.click();
      waitForDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      //expect(errorMinInclusive.isDisplayed()).toBe(true);
      //expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      waitForDisplayed(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      reala.clear();
      reala.sendKeys("10.0");
      waitForNotPresent(errorMinInclusive);
      waitForDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      lblinta.click();
      waitForNotPresent(errorMinInclusive);
      waitForNotDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      waitForNotPresent(errorMinInclusive);
      waitForDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      reala.clear();
      reala.sendKeys("9.999");
      waitForNotPresent(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblinta.click();
      waitForNotPresent(errorMinInclusive);
      waitForNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });

    it('should validate multiple restrictions on ST', function () {
      // no initial validations
      waitForNotPresent(errorMaxLength);
      waitForNotPresent(errorMinLength);
      waitForNotPresent(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // no error messages on first visit
      sta.sendKeys("123");
      waitForNotPresent(errorMaxLength);
      waitForNotDisplayed(errorMinLength);
      waitForNotDisplayed(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(true);
      expect(errorPattern.isPresent()).toBe(true);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblreala.click();
      waitForNotPresent(errorMaxLength);
      waitForDisplayed(errorMinLength);
      waitForDisplayed(errorPattern);
      //expect(errorMaxLength.isPresent()).toBe(false);
      //expect(errorMinLength.isDisplayed()).toBe(true);
      //expect(errorPattern.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      waitForNotPresent(errorMaxLength);
      waitForNotDisplayed(errorMinLength);
      waitForNotDisplayed(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      waitForNotPresent(errorMaxLength);
      waitForDisplayed(errorMinLength);
      waitForDisplayed(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // try again, message shown since it is not the first visit
      sta.clear();
      sta.sendKeys("abcde678901");
      waitForDisplayed(errorMaxLength);
      waitForNotPresent(errorMinLength);
      waitForDisplayed(errorPattern);
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      lblreala.click();
      waitForNotDisplayed(errorMaxLength);
      waitForNotPresent(errorMinLength);
      waitForNotDisplayed(errorPattern);
      expect(errorMaxLength.isDisplayed()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      waitForDisplayed(errorMaxLength);
      waitForNotPresent(errorMinLength);
      waitForDisplayed(errorPattern);
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // valid value no messages
      sta.clear();
      sta.sendKeys("abcde");
      waitForNotPresent(errorMaxLength);
      waitForNotPresent(errorMinLength);
      waitForNotPresent(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblreala.click();
      waitForNotPresent(errorMaxLength);
      waitForNotPresent(errorMinLength);
      waitForNotPresent(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);

    });

  });


  describe('validation messages should be shown in horizontal table', function () {

    var height1 = element(by.id("/54114-4/54117-7/8302-2/1/1/1"));
    var weight1 = element(by.id("/54114-4/54117-7/29463-7/1/1/1"));
    var height2 = element(by.id("/54114-4/54117-7/8302-2/1/2/1"));
    var weight2 = element(by.id("/54114-4/54117-7/29463-7/1/2/1"));
    var age1 = element(by.id("/54114-4/54117-7/54115-1/1/1/1"));
    var heightError = element(by.cssContainingText("div.validation-error", '"Mock-up item: Height" must be a decimal number'));
    var weightError = element(by.cssContainingText("div.validation-error", '"Mock-up item: Weight" must be a decimal number'));

    it('should validate REAL type in horizontal table', function () {
      tp.openUSSGFHTHorizontal();
      browser.wait(function () {
        return height1.isPresent();
      }, 5000);

      shortenValidationMsgShowTime();

      testOneType(height1, age1, heightError, "not a number", "123.45");
      testOneType(weight1, age1, weightError, "not a number", "123.45");

      //add a new row
      var button1 = element(by.id("add-/54114-4/54117-7/1/1"));
      button1.click();

      testOneType(height2, age1, heightError, "not a number", "123.45");
      testOneType(weight2, age1, weightError, "not a number", "123.45");

    });

  });
});
