import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

let tp = new TestPage();
let LForms: any = (global as any).LForms;

function testOneType(eleInput, eleAway, eleMessage, value1, value2) {
  // no initial validations
  expect(eleMessage.isPresent()).toBe(false);
  // no error messages on first visit
  TestUtil.sendKeys(eleInput, value1);
  TestUtil.waitForElementNotDisplayed(eleMessage);
  expect(eleMessage.isPresent()).toBe(true);
  expect(eleMessage.isDisplayed()).toBe(false);
  // show message when the focus is gone
  eleAway.click();
  TestUtil.waitForElementDisplayed(eleMessage);
  //expect(eleMessage.isDisplayed()).toBe(true);
  // wait for 200 ms and the message should disappear after 200 ms
  //browser.sleep(200);
  TestUtil.waitForElementNotDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(false);
  // get back focus again and message should be shown
  eleInput.click();
  TestUtil.waitForElementDisplayed(eleMessage);

  expect(eleMessage.isDisplayed()).toBe(true);
  // no message on the 2nd time when the focus is lost
  eleAway.click();
  TestUtil.waitForElementNotDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(false);
  // get back focus the 3rd time and message should be shown
  eleInput.click();
  TestUtil.waitForElementDisplayed(eleMessage);
  expect(eleMessage.isDisplayed()).toBe(true);
  // valid value no messages
  TestUtil.eraseField(eleInput);
  TestUtil.sendKeys(eleInput, value2);
  TestUtil.waitForElementNotPresent(eleMessage);
  TestUtil.waitForElementNotPresent
  expect(eleMessage.isPresent()).toBe(false);
  // still no message when the focus is gone
  eleAway.click();
  TestUtil.waitForElementNotPresent(eleMessage);
  expect(eleMessage.isPresent()).toBe(false);

}

describe('Validations:', function() {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

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
      stb = element(by.id("/STB/1")),

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
      lblstb = element(by.css("label[for='/STB/1'")),
      // lblsta = element(by.id("label-/STA/1")),
      // lblstb = element(by.id("label-/STB/1")),
      lblst0 = element(by.css("label[for='/ST0/1'")),
      lbldt = element(by.css("label[for='/DT/1'")),
      lblcne1 = element(by.css("label[for='/CNE1/1'")),
      lblcne2 = element(by.css("label[for='/CNE2/1'")),
      lblcwe1 = element(by.css("label[for='/CWE1/1'")),
      lblcwe2 = element(by.css("label[for='/CWE2/1'"));




  // var errorBL = element(by.cssContainingText("div.validation-error", '"BL" must be a boolean (true/false)')),
  //     errorINT = element(by.cssContainingText("div.validation-error", '"INT" must be an integer number')),
  //     errorREAL = element(by.cssContainingText("div.validation-error", '"REAL" must be a decimal number')),
  //     errorTM = element(by.cssContainingText("div.validation-error", '"TM" must be a time value')),
  //     errorYEAR = element(by.cssContainingText("div.validation-error", '"YEAR" must be a numeric value of year')),
  //     errorMONTH = element(by.cssContainingText("div.validation-error", '"MONTH" must be a numeric value of month')),
  //     errorDAY = element(by.cssContainingText("div.validation-error", '"DAY" must be a numeric value of day')),
  //     errorURL = element(by.cssContainingText("div.validation-error", '"URL" must be a valid URL')),
  //     errorEMAIL = element(by.cssContainingText("div.validation-error", '"EMAIL" must be a valid email address')),
  //     errorPHONE = element(by.cssContainingText("div.validation-error", '"PHONE" must be a valid phone number')),
  //     errorNR = element(by.cssContainingText("div.validation-error", '"NR" must be two numeric values separated by a ^. One value can be omitted, but not the ^'));
  var errorBL = element(by.cssContainingText("div.validation-error", 'must be a boolean (true/false)')),
      errorINT = element(by.cssContainingText("div.validation-error", 'must be an integer number')),
      errorREAL = element(by.cssContainingText("div.validation-error", 'must be a decimal number')),
      errorTM = element(by.cssContainingText("div.validation-error", 'must be a time value')),
      errorYEAR = element(by.cssContainingText("div.validation-error", 'must be a numeric value of year')),
      errorMONTH = element(by.cssContainingText("div.validation-error", 'must be a numeric value of month')),
      errorDAY = element(by.cssContainingText("div.validation-error", 'must be a numeric value of day')),
      errorURL = element(by.cssContainingText("div.validation-error", 'must be a valid URL')),
      errorEMAIL = element(by.cssContainingText("div.validation-error", 'must be a valid email address')),
      errorPHONE = element(by.cssContainingText("div.validation-error", 'must be a valid phone number')),
      errorNR = element(by.cssContainingText("div.validation-error", 'must be two numeric values separated by a ^. One value can be omitted, but not the ^'));

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

    beforeEach(function () {
      tp.LoadForm.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, tp.WAIT_TIMEOUT_1);

      //shortenValidationMsgShowTime();
    });

    it('should validate INT type, for unsigned values', function () {
      testOneType(int, lblbl, errorINT, "1234.56", "123");
    });
    it('should validate INT type, for positive values', function () {
      testOneType(int, lblbl, errorINT, "+1234.56", "+123");
    });
    it('should validate INT type, for negative values', function () {
      testOneType(int, lblbl, errorINT, "-1234.56", "-123");
    });

    it('should validate REAL type, for unsigned values', function () {
      testOneType(real, lblint, errorREAL, "not a number", "123.45");
    });
    it('should validate REAL type, for positive values', function () {
      testOneType(real, lblint, errorREAL, "+ 123.45", "+123.45");
    });
    it('should validate REAL type, for negative values', function () {
      testOneType(real, lblint, errorREAL, "- 123.45", "-123.45");
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
    beforeEach(function() {
      tp.LoadForm.openValidationTest();
      browser.wait(function () {
        return int.isPresent();
      }, tp.WAIT_TIMEOUT_1);
      //shortenValidationMsgShowTime();
    });

    it('should validate minInclusive on INT', function () {
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

    it('should validate pattern', function () {
      testOneType(sta, lblst3, errorPattern, "AAAAA", "aaaaa");
    });

    it('should validate pattern, with "/" and flags (i, ignore cases)', function () {
      testOneType(stb, lblsta, errorPattern, "2/AAAAA", "/aBBBc");
    });

    it('should validate "required" on ST', function () {

      // no initial validations
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      st0.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      TestUtil.sendKeys(st0, "abc");
      TestUtil.eraseField(st0);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblst3.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      st0.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(st0);
      TestUtil.sendKeys(st0, "abcde");
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblst3.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
    });

    // NEXT: TODO: date field does not show required errors, because once a date is selected, it cannot be cleared (??!!)
    // This test is supposed to fail at the moment.
    xit('should validate "required" on DT', function () {

      // no initial validations
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      dt.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      TestUtil.sendKeys(dt, "t");
      TestUtil.eraseField(dt);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      expect(errorRequire.isPresent()).toBe(true);
      expect(errorRequire.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblst0.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      dt.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(dt);
      TestUtil.sendKeys(dt, "t");
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblst0.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);

    });

    it('should validate "required" on CNE (single)', function () {
      // no initial validations
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cne1.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit

      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      TestUtil.eraseField(cne1);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      // show message when the focus is gone
      lbldt.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cne1.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(cne1);
      cne1.click();
      cne1.sendKeys(protractor.Key.ARROW_DOWN);
      cne1.sendKeys(protractor.Key.ENTER);
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lbldt.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
    });

    it('should validate "required" on CWE (single)', function () {
      // no initial validations
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first time getting focus
      cwe1.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // no error messages on first visit
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      TestUtil.eraseField(cwe1);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      // show message when the focus is gone
      lblcne1.click(); // focuses other field
      TestUtil.waitForElementDisplayed(errorRequire);
      //expect(errorRequire.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      cwe1.click();
      TestUtil.waitForElementDisplayed(errorRequire);
      expect(errorRequire.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(cwe1);
      cwe1.click();
      cwe1.sendKeys(protractor.Key.ARROW_DOWN);
      cwe1.sendKeys(protractor.Key.ENTER);
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblcne1.click();
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);
      // valid user input no message
      TestUtil.eraseField(cwe1);
      TestUtil.sendKeys(cwe1, "user input");
      cwe1.sendKeys(protractor.Key.TAB);
      TestUtil.waitForElementNotPresent(errorRequire);
      expect(errorRequire.isPresent()).toBe(false);

    });

    // CNE/CWE with multiple selections does not work with validations. Need a fix in autocomplete directive.

    it('should validate multiple restrictions on INT', function () {

      // no initial validations
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      TestUtil.sendKeys(inta, "1");
      TestUtil.waitForElementNotDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      lblcwe1.click();
      TestUtil.waitForElementDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      //expect(errorMinInclusive.isDisplayed()).toBe(true);
      //expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      TestUtil.waitForElementDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      TestUtil.eraseField(inta);
      TestUtil.sendKeys(inta, "10");
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      lblcwe1.click();
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      inta.click();
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(inta);
      TestUtil.sendKeys(inta, "9");
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblcwe1.click();
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
    });

    it('should validate multiple restrictions on REAL', function () {
      // no initial validations
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // no error messages on first visit
      TestUtil.sendKeys(reala, "1.0");
      TestUtil.waitForElementNotDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(true);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // show message when the focus is gone
      lblinta.click();
      TestUtil.waitForElementDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      //expect(errorMinInclusive.isDisplayed()).toBe(true);
      //expect(errorMaxExclusive.isPresent()).toBe(false);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      TestUtil.waitForElementDisplayed(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isDisplayed()).toBe(true);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // try again, message shown since it is not the first visit
      TestUtil.eraseField(reala);
      TestUtil.sendKeys(reala, "10.0");
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      lblinta.click();
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      reala.click();
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementDisplayed(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(reala);
      TestUtil.sendKeys(reala, "9.999");
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblinta.click();
      TestUtil.waitForElementNotPresent(errorMinInclusive);
      TestUtil.waitForElementNotPresent(errorMaxExclusive);
      expect(errorMinInclusive.isPresent()).toBe(false);
      expect(errorMaxExclusive.isPresent()).toBe(false);

    });

    it('should validate multiple restrictions on ST', function () {
      // no initial validations
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementNotPresent(errorMinLength);
      TestUtil.waitForElementNotPresent(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // no error messages on first visit
      TestUtil.sendKeys(sta, "123");
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementNotDisplayed(errorMinLength);
      TestUtil.waitForElementNotDisplayed(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(true);
      expect(errorPattern.isPresent()).toBe(true);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // show message when the focus is gone
      lblreala.click();
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementDisplayed(errorMinLength);
      TestUtil.waitForElementDisplayed(errorPattern);
      //expect(errorMaxLength.isPresent()).toBe(false);
      //expect(errorMinLength.isDisplayed()).toBe(true);
      //expect(errorPattern.isDisplayed()).toBe(true);
      // wait for 200 ms and the message should disappear after 200 ms
      browser.sleep(200);
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementNotDisplayed(errorMinLength);
      TestUtil.waitForElementNotDisplayed(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementDisplayed(errorMinLength);
      TestUtil.waitForElementDisplayed(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isDisplayed()).toBe(true);
      expect(errorPattern.isDisplayed()).toBe(true);
      // try again, message shown since it is not the first visit
      TestUtil.eraseField(sta);
      TestUtil.sendKeys(sta, "abcde678901");
      TestUtil.waitForElementDisplayed(errorMaxLength);
      TestUtil.waitForElementNotPresent(errorMinLength);
      TestUtil.waitForElementDisplayed(errorPattern);
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // not to show message when the focus is gone, since it is not the first visit
      lblreala.click();
      TestUtil.waitForElementNotDisplayed(errorMaxLength);
      TestUtil.waitForElementNotPresent(errorMinLength);
      TestUtil.waitForElementNotDisplayed(errorPattern);
      expect(errorMaxLength.isDisplayed()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(false);
      // get back focus and message should be shown
      sta.click();
      TestUtil.waitForElementDisplayed(errorMaxLength);
      TestUtil.waitForElementNotPresent(errorMinLength);
      TestUtil.waitForElementDisplayed(errorPattern);
      expect(errorMaxLength.isDisplayed()).toBe(true);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isDisplayed()).toBe(true);
      // valid value no messages
      TestUtil.eraseField(sta);
      TestUtil.sendKeys(sta, "abcde");
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementNotPresent(errorMinLength);
      TestUtil.waitForElementNotPresent(errorPattern);
      expect(errorMaxLength.isPresent()).toBe(false);
      expect(errorMinLength.isPresent()).toBe(false);
      expect(errorPattern.isPresent()).toBe(false);
      // still no message when the focus is gone
      lblreala.click();
      TestUtil.waitForElementNotPresent(errorMaxLength);
      TestUtil.waitForElementNotPresent(errorMinLength);
      TestUtil.waitForElementNotPresent(errorPattern);
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
    // var heightError = element(by.cssContainingText("div.validation-error", '"Mock-up item: Height" must be a decimal number'));
    // var weightError = element(by.cssContainingText("div.validation-error", '"Mock-up item: Weight" must be a decimal number'));
    var heightError = element(by.cssContainingText("div.validation-error", 'must be a decimal number'));
    var weightError = element(by.cssContainingText("div.validation-error", 'must be a decimal number'));
    var clickAwayElem = element(by.id("/54114-4/54138-3/1/1"));

    it('should validate REAL type in horizontal table', function () {
      tp.LoadForm.openUSSGFHTHorizontal();
      browser.wait(function () {
        return height1.isPresent();
      }, tp.WAIT_TIMEOUT_1);

      //shortenValidationMsgShowTime();

      testOneType(height1, clickAwayElem, heightError, "not a number", "123.45");
      testOneType(weight1, clickAwayElem, weightError, "not a number", "123.45");

      //add a new row
      var button1 = element(by.id("add-/54114-4/54117-7/1/1"));
      button1.click();

      testOneType(height2, clickAwayElem, heightError, "not a number", "123.45");
      testOneType(weight2, clickAwayElem, weightError, "not a number", "123.45");

    });

  });


  describe('form validation', function () {
    beforeAll(async () => {
      await browser.waitForAngularEnabled(false);      
    });  

    it('should not validate when required inputs are empty', function () {

      tp.LoadForm.openFullFeaturedForm();

      // Required fields are empty
      const errors = browser.driver.executeScript('return LForms.Util.checkValidity()');
      expect(errors).toEqual([
        'Required DT field requires a value',
        'Required DTM field requires a value',
        'Required TX field requires a value',
        'Required ST field requires a value'
      ]);

      const skipLogicTrigger = element(by.id('/sl_source_to_test_required/1'));
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      TestUtil.sendKeys(skipLogicTrigger, '1');

      const errorsAfterSkipLogic = browser.driver.executeScript('return LForms.Util.checkValidity()');
      expect(errorsAfterSkipLogic).toEqual([
        'Required DT field requires a value',
        'Required DTM field requires a value',
        'Required TX field requires a value',
        'Required ST field requires a value',
        'Required RT1: Shown when \'Skip Logic Required Source\' == 1; requires a value',
        'RT4: Shown when my section header is shown; requires a value',
      ]);
    });

    // TODO: As of 09/16/2021,this test passed on linux firefox but not on linux chrome. Other tests in this file need to run with chrome to pass.
    // suspect the issue is related to the datef field/calendar widget not being in the views. but cannot confirm that yet.
    // Use the next test with a short form instead
    // it('should validate when required inputs are entered', function () {

    //   tp.LoadForm.openFullFeaturedForm();
    //   const skipLogicTrigger = element(by.id('/sl_source_to_test_required/1'));
    //   // Entering 1 will show a previously hidden section with required inputs to make sure they now
    //   // trigger the validation
    //   TestUtil.sendKeys(skipLogicTrigger, '1');

    //   let otherEl = element(by.id("/required_tx/1"))

    //   // Fill the required fields
    //   const dtEl = element(by.id('/required_dt/1')).element(by.css("input"));
    //   dtEl.clear()
    //   // this test does not work with chrome v93.0.4577.82 and/or its webdriver. "/" is not appearing in the field
    //   TestUtil.sendKeys(dtEl, '10/16/2020');  
    //   otherEl.click();
    //   const dtmEl = element(by.id('/required_dtm/1')).element(by.css("input"));
    //   // this test does not work with chrome v93.0.4577.82 and/or its webdriver. "/" is not appearing in the field
    //   TestUtil.sendKeys(dtmEl, '10/16/2020 16:00:00');
    //   otherEl.click()
    //   const txEl = element(by.id('/required_tx/1'));
    //   TestUtil.sendKeys(txEl, 'test');
    //   const stEl = element(by.id('/required_st/1'));
    //   TestUtil.sendKeys(stEl, 'test');
    //   const originalHiddenEl1 = element(by.id('/sl_target_to_test_required1/1'));
    //   TestUtil.sendKeys(originalHiddenEl1, 'test');
    //   const originalHiddenSubEl1 = element(by.id('/sl_target_header/sl_target_to_test_required/1/1'));
    //   TestUtil.sendKeys(originalHiddenSubEl1, 'test');

    //   const errors = browser.driver.executeScript('return LForms.Util.checkValidity()');
    //   expect(errors).toEqual(null);
    // });

    it('should validate when required inputs are entered, with a short form', function () {

      tp.openBaseTestPage();
      tp.loadFromTestData('test-date-validation.json');

      const skipLogicTrigger = element(by.id('/sl_source_to_test_required/1'));
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      TestUtil.sendKeys(skipLogicTrigger, '1');

      let otherEl = element(by.id("/required_tx/1"))

      // Fill the required fields
      const dtEl = element(by.id('/required_dt/1')).element(by.css("input"));
      dtEl.clear()
      TestUtil.sendKeys(dtEl, '10/16/2020');  
      otherEl.click();
      const dtmEl = element(by.id('/required_dtm/1')).element(by.css("input"));
      TestUtil.sendKeys(dtmEl, '10/16/2020 16:00:00');
      otherEl.click()
      const txEl = element(by.id('/required_tx/1'));
      TestUtil.sendKeys(txEl, 'test');
      const stEl = element(by.id('/required_st/1'));
      TestUtil.sendKeys(stEl, 'test');
      const originalHiddenEl1 = element(by.id('/sl_target_to_test_required1/1'));
      TestUtil.sendKeys(originalHiddenEl1, 'test');
      const originalHiddenSubEl1 = element(by.id('/sl_target_header/sl_target_to_test_required/1/1'));
      TestUtil.sendKeys(originalHiddenSubEl1, 'test');

      const errors = browser.driver.executeScript('return LForms.Util.checkValidity()');
      expect(errors).toEqual(null);
    });
  });
});
