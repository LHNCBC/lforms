import {TestPage} from '../support/lforms_testpage.po.js';

function testOneType(eleInput, eleAway, eleContainer, eleMessage, value1, value2) {
  // no initial validations
  cy.get(eleContainer).should('not.exist');
  // no error messages on first visit
  cy.byId(eleInput).type(value1);
  cy.get(eleContainer).contains(eleMessage)
    .should('exist')
    .should('not.be.visible');
  // show message when the focus is gone
  cy.get(eleAway).click();
  cy.get(eleContainer).contains(eleMessage).should('be.visible');
  // message disappears after a short period
  cy.get(eleContainer).contains(eleMessage).should('not.be.visible');
  // get back focus again and message should be shown
  cy.byId(eleInput).click();
  cy.get(eleContainer).contains(eleMessage).should('be.visible');

  // no message on the 2nd time when the focus is lost
  cy.get(eleAway).click();
  cy.get(eleContainer).contains(eleMessage).should('not.be.visible');
  // get back focus the 3rd time and message should be shown
  cy.byId(eleInput).click();
  cy.get(eleContainer).contains(eleMessage).should('be.visible');
  // valid value no messages
  cy.byId(eleInput).clear().type(value2);
  cy.get(eleContainer).should('not.exist');
  // still no message when the focus is gone
  cy.get(eleAway).click();
  cy.get(eleContainer).should('not.exist');
}

describe('Validations', () => {
  const tp: TestPage = new TestPage();

  const bl = '/BL/1',
    int = '/INT/1',
    real = '/REAL/1',
    phone = '/PHONE/1',
    email = '/EMAIL/1',
    url = '/URL/1',
    nr = '/NR/1',
    int1 = '/INT1/1',
    int2 = '/INT2/1',
    int3 = '/INT3/1',
    int4 = '/INT4/1',
    real1 = '/REAL1/1',
    real2 = '/REAL2/1',
    real3 = '/REAL3/1',
    real4 = '/REAL4/1',
    st1 = '/ST1/1',
    st2 = '/ST2/1',
    st3 = '/ST3/1',
    inta = '/INTA/1',
    reala = '/REALA/1',
    sta = '/STA/1',
    stb = '/STB/1',

    st0 = '/ST0/1',
    dt = '/DT/1',
    cne1 = '/CNE1/1',
    cne2 = '/CNE2/1',
    cwe1 = '/CWE1/1',
    cwe2 = '/CWE2/1';

  const lblbl = 'label[for=\'/BL/1\']',
    lblint = 'label[for=\'/INT/1\']',
    lblreal = 'label[for=\'/REAL/1\']',
    lblphone = 'label[for=\'/PHONE/1\']',
    lblemail = 'label[for=\'/EMAIL/1\']',
    lblurl = 'label[for=\'/URL/1\']',
    lblnr = 'label[for=\'/NR1/1\']',
    lblint1 = 'label[for=\'/INT1/1\']',
    lblint2 = 'label[for=\'/INT2/1\']',
    lblint3 = 'label[for=\'/INT3/1\']',
    lblint4 = 'label[for=\'/INT4/1\']',
    lblreal1 = 'label[for=\'/REAL1/1\']',
    lblreal2 = 'label[for=\'/REAL2/1\']',
    lblreal3 = 'label[for=\'/REAL3/1\']',
    lblreal4 = 'label[for=\'/REAL4/1\']',
    lblst1 = 'label[for=\'/ST1/1\']',
    lblst2 = 'label[for=\'/ST2/1\']',
    lblst3 = 'label[for=\'/ST3/1\']',
    lblinta = 'label[for=\'/INTA/1\']',
    lblreala = 'label[for=\'/REALA/1\']',
    lblsta = 'label[for=\'/STA/1\']',
    lblstb = 'label[for=\'/STB/1\']',
    // lblsta = element(by.id("label-/STA/1",
    // lblstb = element(by.id("label-/STB/1",
    lblst0 = 'label[for=\'/ST0/1\']',
    lbldt = 'label[for=\'/DT/1\']',
    lblcne1 = 'label[for=\'/CNE1/1\']',
    lblcne2 = 'label[for=\'/CNE2/1\']',
    lblcwe1 = 'label[for=\'/CWE1/1\']',
    lblcwe2 = 'label[for=\'/CWE2/1\']';

  // var errorBL = element(by.cssContaining("div.validation-error", '"BL" must be a boolean (true/false)')),
  //     errorINT = element(by.cssContaining("div.validation-error", '"INT" must be an integer number')),
  //     errorREAL = element(by.cssContaining("div.validation-error", '"REAL" must be a decimal number')),
  //     errorTM = element(by.cssContaining("div.validation-error", '"TM" must be a time value')),
  //     errorYEAR = element(by.cssContaining("div.validation-error", '"YEAR" must be a numeric value of year')),
  //     errorMONTH = element(by.cssContaining("div.validation-error", '"MONTH" must be a numeric value of month')),
  //     errorDAY = element(by.cssContaining("div.validation-error", '"DAY" must be a numeric value of day')),
  //     errorURL = element(by.cssContaining("div.validation-error", '"URL" must be a valid URL')),
  //     errorEMAIL = element(by.cssContaining("div.validation-error", '"EMAIL" must be a valid email address')),
  //     errorPHONE = element(by.cssContaining("div.validation-error", '"PHONE" must be a valid phone number')),
  //     errorNR = element(by.cssContaining("div.validation-error", '"NR" must be two numeric values separated by a ^. One value can be omitted, but not the ^'));
  const errorContainer = 'div.validation-error',
    errorBL = 'must be a boolean (true/false)',
    errorINT = 'must be an integer number',
    errorREAL = 'must be a decimal number',
    errorTM = 'must be a time value',
    errorYEAR = 'must be a numeric value of year',
    errorMONTH = 'must be a numeric value of month',
    errorDAY = 'must be a numeric value of day',
    errorURL = 'must be a valid URL',
    errorEMAIL = 'must be a valid email address',
    errorPHONE = 'must be a valid phone number',
    errorNR = 'must be two numeric values separated by a ^. One value can be omitted, but not the ^';

  const errorMinExclusive = 'must be a value greater than ',
    errorMinInclusive = 'must be a value greater than or equal to ',
    errorMaxExclusive = 'must be a value less than ',
    errorMaxInclusive = 'must be a value less than or equal to ',
    errorLength = 'must have a total length of ',
    errorMaxLength = 'must have a total length less than or equal to ',
    errorMinLength = 'must have a total length greater than or equal to ',
    errorPattern = 'must match a RegExp pattern of',
    errorRequire = 'requires a value';

  describe('data type validations (table)', () => {
    beforeEach(() => {
      tp.LoadForm.openValidationTest();
      cy.byId(int).should('be.visible');
    });

    it('should validate INT type, for unsigned values', () => {
      testOneType(int, lblbl, errorContainer, errorINT, '1234.56', '123');
    });

    it('should validate INT type, for positive values', () => {
      testOneType(int, lblbl, errorContainer, errorINT, '+1234.56', '+123');
    });

    it('should validate INT type, for negative values', () => {
      testOneType(int, lblbl, errorContainer, errorINT, '-1234.56', '-123');
    });

    it('should validate REAL type, for unsigned values', () => {
      testOneType(real, lblint, errorContainer, errorREAL, 'not a number', '123.45');
    });

    it('should validate REAL type, for positive values', () => {
      testOneType(real, lblint, errorContainer, errorREAL, '+ 123.45', '+123.45');
    });

    it('should validate REAL type, for negative values', () => {
      testOneType(real, lblint, errorContainer, errorREAL, '- 123.45', '-123.45');
    });

    it('should validate PHONE type', () => {
      testOneType(phone, lblreal, errorContainer, errorPHONE, 'not a phone number', '3011235555');
    });

    it('should validate EMAIL type', () => {
      testOneType(email, lblphone, errorContainer, errorEMAIL, 'somebody@com', 'somebody@some.com');
    });

    it('should validate URL type', () => {
      testOneType(url, lblemail, errorContainer, errorURL, 'http:/somecompany.com', 'http://somecompany.com');
    });

    it('should validate NR type', () => {
      testOneType(nr, lblurl, errorContainer, errorNR, '-123 567', '-123^ 567');
    });
  });

  describe('restrictions validations (table)', () => {
    beforeEach(() => {
      tp.LoadForm.openValidationTest();
      cy.byId(int).should('be.visible');
    });

    it('should validate minInclusive on INT', () => {
      testOneType(int1, lblurl, errorContainer, errorMinInclusive, '2', '5');
    });

    it('should validate minExclusive on INT', () => {
      testOneType(int2, lblint1, errorContainer, errorMinExclusive, '5', '6');
    });

    it('should validate maxInclusive on INT', () => {
      testOneType(int3, lblint2, errorContainer, errorMaxInclusive, '12', '10');
    });

    it('should validate maxExclusive on INT', () => {
      testOneType(int4, lblint3, errorContainer, errorMaxExclusive, '12', '9');
    });

    it('should validate minInclusive on REAL', () => {
      testOneType(real1, lblint4, errorContainer, errorMinInclusive, '4.9', '5.0');
    });

    it('should validate minExclusive on REAL', () => {
      testOneType(real2, lblreal1, errorContainer, errorMinExclusive, '5.0', '5.01');
    });

    it('should validate maxInclusive on REAL', () => {
      testOneType(real3, lblreal2, errorContainer, errorMaxInclusive, '10.01', '10');
    });

    it('should validate maxExclusive on REAL', () => {
      testOneType(real4, lblreal3, errorContainer, errorMaxExclusive, '12', '9');
    });

    it('should validate length', () => {
      testOneType(st1, lblreal4, errorContainer, errorLength, 'abcd', 'abcde');
    });

    it('should validate minLength', () => {
      testOneType(st2, lblst1, errorContainer, errorMinLength, 'abcd', 'abcde');
    });

    it('should validate maxLength', () => {
      testOneType(st3, lblst2, errorContainer, errorMaxLength, '12345678901', '1234567890');
    });

    it('should validate pattern', () => {
      testOneType(sta, lblst3, errorContainer, errorPattern, 'AAAAA', 'aaaaa');
    });

    it('should validate pattern, with "/" and flags (i, ignore cases)', () => {
      testOneType(stb, lblsta, errorContainer, errorPattern, '2/AAAAA', '/aBBBc');
    });

    it('should validate "required" on ST', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first time getting focus
      cy.byId(st0).click();
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(st0).type('abc').clear();
      cy.get(errorContainer).contains(errorRequire)
        .should('exist')
        .should('not.be.visible');
      // show message when the focus is gone
      cy.get(lblst3).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorRequire).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(st0).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // valid value no messages
      cy.byId(st0).clear().type('abcde');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblst3).click();
      cy.get(errorContainer).should('not.exist');
    });

    // NEXT: TODO: date field does not show required errors, because once a date is selected, it cannot be cleared (??!!)
    // This test is supposed to fail at the moment.
    it.skip('should validate "required" on DT', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first time getting focus
      cy.byId(dt).click();
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(dt).type('01/01/2022').clear();
      cy.get(errorContainer).contains(errorRequire)
        .should('exist')
        .should('not.be.visible');
      // show message when the focus is gone
      cy.get(lblst0).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorRequire).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(dt).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // valid value no messages
      cy.byId(dt).clear().type('t');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblst0).click();
      cy.get(errorContainer).should('not.exist');
    });

    it('should validate "required" on CNE (single)', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first time getting focus
      cy.byId(cne1).click();
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(cne1).type('{downArrow}').type('{enter}').clear();
      cy.get(errorContainer).should('not.exist');
      // show message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorRequire).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(cne1).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // valid value no messages
      cy.byId(cne1).clear().click().type('{downArrow}').type('{enter}');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).should('not.exist');
    });

    it('should validate "required" on CWE (single)', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first time getting focus
      cy.byId(cwe1).click();
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(cwe1).type('{downArrow}').type('{enter}').clear();
      cy.get(errorContainer).should('not.exist');
      // show message when the focus is gone
      cy.get(lblbl).click(); // focuses other field
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorRequire).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(cwe1).click();
      cy.get(errorContainer).contains(errorRequire).should('be.visible');
      // valid value no messages
      cy.byId(cwe1).clear().click().type('{downArrow}').type('{enter}');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).should('not.exist');
      // valid user input no message
      cy.byId(cwe1).clear().type('user input').blur();
      cy.get(errorContainer).should('not.exist');
    });

    // CNE/CWE with multiple selections does not work with validations. Need a fix in autocomplete directive.

    it('should validate multiple restrictions on INT', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(inta).type('1');
      cy.get(errorContainer).contains(errorMinInclusive)
        .should('exist')
        .should('not.be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // show message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorMinInclusive).should('not.be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // get back focus and message should be shown
      cy.byId(inta).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // try again, message shown since it is not the first visit
      cy.byId(inta).clear().type('10');
      cy.get(errorContainer).contains(errorMinInclusive).should('not.exist');
      cy.get(errorContainer).contains(errorMaxExclusive).should('be.visible');
      // not to show message when the focus is gone, since it is not the first visit
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('not.exist');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(inta).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('not.exist');
      cy.get(errorContainer).contains(errorMaxExclusive).should('be.visible');
      // valid value no messages
      cy.byId(inta).clear().type('9');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).should('not.exist');
    });

    it('should validate multiple restrictions on REAL', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(reala).type('1.0');
      cy.get(errorContainer).contains(errorMinInclusive)
        .should('exist')
        .should('not.be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // show message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorMinInclusive).should('not.be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // get back focus and message should be shown
      cy.byId(reala).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('be.visible');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.exist');
      // try again, message shown since it is not the first visit
      cy.byId(reala).clear().type('10.0');
      cy.get(errorContainer).contains(errorMinInclusive).should('not.exist');
      cy.get(errorContainer).contains(errorMaxExclusive).should('be.visible');
      // not to show message when the focus is gone, since it is not the first visit
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('not.exist');
      cy.get(errorContainer).contains(errorMaxExclusive).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(reala).click();
      cy.get(errorContainer).contains(errorMinInclusive).should('not.exist');
      cy.get(errorContainer).contains(errorMaxExclusive).should('be.visible');
      // valid value no messages
      cy.byId(reala).clear().type('9.999');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).should('not.exist');
    });

    it('should validate multiple restrictions on ST', () => {
      // no initial validations
      cy.get(errorContainer).should('not.exist');
      // no error messages on first visit
      cy.byId(sta).type('123');
      cy.get(errorContainer).contains(errorMaxLength).should('not.exist');
      cy.get(errorContainer).contains(errorMinLength)
        .should('exist')
        .should('not.be.visible');
      cy.get(errorContainer).contains(errorPattern)
        .should('exist')
        .should('not.be.visible');
      // show message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorMaxLength).should('not.exist');
      cy.get(errorContainer).contains(errorMinLength).should('be.visible');
      cy.get(errorContainer).contains(errorPattern).should('be.visible');
      cy.get(errorContainer).contains(errorMaxLength).should('not.exist');
      // message disappears after a short period
      cy.get(errorContainer).contains(errorMinLength).should('not.be.visible');
      cy.get(errorContainer).contains(errorPattern).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(sta).click();
      cy.get(errorContainer).contains(errorMaxLength).should('not.exist');
      cy.get(errorContainer).contains(errorMinLength).should('be.visible');
      cy.get(errorContainer).contains(errorPattern).should('be.visible');
      // try again, message shown since it is not the first visit
      cy.byId(sta).clear().type('abcde678901');
      cy.get(errorContainer).contains(errorMaxLength).should('be.visible');
      cy.get(errorContainer).contains(errorMinLength).should('not.exist');
      cy.get(errorContainer).contains(errorPattern).should('be.visible');
      // not to show message when the focus is gone, since it is not the first visit
      cy.get(lblbl).click();
      cy.get(errorContainer).contains(errorMaxLength).should('not.be.visible');
      cy.get(errorContainer).contains(errorMinLength).should('not.exist');
      cy.get(errorContainer).contains(errorPattern).should('not.be.visible');
      // get back focus and message should be shown
      cy.byId(sta).click();
      cy.get(errorContainer).contains(errorMaxLength).should('be.visible');
      cy.get(errorContainer).contains(errorMinLength).should('not.exist');
      cy.get(errorContainer).contains(errorPattern).should('be.visible');
      // valid value no messages
      cy.byId(sta).clear().type('abcde');
      cy.get(errorContainer).should('not.exist');
      // still no message when the focus is gone
      cy.get(lblbl).click();
      cy.get(errorContainer).should('not.exist');
    });
  });

  describe('validation messages should be shown in horizontal table', () => {
    const height1 = '/54114-4/54117-7/8302-2/1/1/1';
    const weight1 = '/54114-4/54117-7/29463-7/1/1/1';
    const height2 = '/54114-4/54117-7/8302-2/1/2/1';
    const weight2 = '/54114-4/54117-7/29463-7/1/2/1';
    // var heightError = element(by.cssContainingText("div.validation-error", '"Mock-up item: Height" must be a decimal number'));
    // var weightError = element(by.cssContainingText("div.validation-error", '"Mock-up item: Weight" must be a decimal number'));
    const heightError = 'must be a decimal number';
    const weightError = 'must be a decimal number';
    const clickAwayElem = 'label[for=\'/54114-4/54138-3/1/1\']';

    it('should validate REAL type in horizontal table', () => {
      tp.LoadForm.openUSSGFHTHorizontal();
      cy.byId(height1).should('be.visible');

      testOneType(height1, clickAwayElem, errorContainer, heightError, 'not a number', '123.45');
      testOneType(weight1, clickAwayElem, errorContainer, weightError, 'not a number', '123.45');

      // add a new row
      cy.byId('add-/54114-4/54117-7/1/1').click();

      testOneType(height2, clickAwayElem, errorContainer, heightError, 'not a number', '123.45');
      testOneType(weight2, clickAwayElem, errorContainer, weightError, 'not a number', '123.45');
    });
  });

  describe('form validation', () => {
    it('should not validate when required inputs are empty', () => {
      tp.LoadForm.openFullFeaturedForm();

      // Required fields are empty
      cy.window().then((win) => {
        const errors = win.LForms.Util.checkValidity();
        expect(errors).to.deep.equal([
          'Required DT field requires a value',
          'Required DTM field requires a value',
          'Required TX field requires a value',
          'Required ST field requires a value'
        ]);
      });

      const skipLogicTrigger = '/sl_source_to_test_required/1';
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      cy.byId(skipLogicTrigger).type('1');

      cy.window().then((win) => {
        const errors = win.LForms.Util.checkValidity();
        expect(errors).to.deep.equal([
          'Required DT field requires a value',
          'Required DTM field requires a value',
          'Required TX field requires a value',
          'Required ST field requires a value',
          'Required RT1: Shown when \'Skip Logic Required Source\' == 1; requires a value',
          'RT4: Shown when my section header is shown; requires a value'
        ]);
      });
    });

    it('should validate when required inputs are entered', () => {
      tp.LoadForm.openFullFeaturedForm();
      const skipLogicTrigger = '/sl_source_to_test_required/1';
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      cy.byId(skipLogicTrigger).type('1');

      const otherEl = '/required_tx/1';

      // Fill the required fields
      const dtEl = '/required_dt/1';
      cy.byId(dtEl).find('input').clear().type('10/16/2020');
      cy.byId(otherEl).click();
      const dtmEl = '/required_dtm/1';
      cy.byId(dtmEl).find('input').type('10/16/2020 16:00:00');
      cy.byId(otherEl).click();
      const txEl = '/required_tx/1';
      cy.byId(txEl).type('test');
      const stEl = '/required_st/1';
      cy.byId(stEl).type('test');
      const originalHiddenEl1 = '/sl_target_to_test_required1/1';
      cy.byId(originalHiddenEl1).type('test');
      const originalHiddenSubEl1 = '/sl_target_header/sl_target_to_test_required/1/1';
      cy.byId(originalHiddenSubEl1).type('test');

      cy.window().then((win) => {
        const errors = win.LForms.Util.checkValidity();
        expect(errors).to.be.null;
      });
    });

    it('should validate when required inputs are entered, with a short form', () => {
      tp.openBaseTestPage();
      tp.loadFromTestData('test-date-validation.json');

      const skipLogicTrigger = '/sl_source_to_test_required/1';
      // Entering 1 will show a previously hidden section with required inputs to make sure they now
      // trigger the validation
      cy.byId(skipLogicTrigger).type('1');
      const otherEl = '/required_tx/1';

      // Fill the required fields
      cy.byId('/required_dt/1').find('input').clear().type('10/16/2020');
      cy.byId(otherEl).click();
      cy.byId('/required_dtm/1').find('input').type('10/16/2020 16:00:00');
      cy.byId(otherEl).click();
      cy.byId('/required_tx/1').type('test');
      cy.byId('/required_st/1').type('test');
      cy.byId('/sl_target_to_test_required1/1').type('test');
      cy.byId('/sl_target_header/sl_target_to_test_required/1/1').type('test');

      cy.window().then((win) => {
        const error = win.LForms.Util.checkValidity();
        expect(error).to.be.null;
      });
    });
  });

});
