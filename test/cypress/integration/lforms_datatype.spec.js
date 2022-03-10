import {TestPage} from '../support/lforms_testpage.po.js';
import {TestUtil} from "../support/testUtilFacade.js";
import {facadeExpect as expect, protractor, by, element, browser} from "../support/protractorFacade.js";

describe('Data Type', function() {
  let tp;
  let ff;

  before(async () => {
    tp = new TestPage();
    ff = tp.USSGFHTVertical;
  });

  it('TITLE row should appear', function () {
    tp.LoadForm.openFullFeaturedForm();
    let titleRow = element(by.css(".lhc-item.lhc-datatype-TITLE"));
    let typeTitle = titleRow.element(by.css("label[for='/titleHeader/1']"));
    typeTitle.should('be.visible');
  });

  it('DTM datetime picker should work', function () {
    var minMax = [TestUtil.getCurrentDTMString(-60000), TestUtil.getCurrentDTMString(+60000)]; // -/+ a minute
    tp.LoadForm.openFullFeaturedForm();
    let dtmInput = element(by.id('/type7/1')).element(by.css("input"));
    let nowButton = element(by.css(".ant-picker-now-btn"));
    let okButton = element(by.css(".ant-picker-ok")).element(by.css("button"))
    dtmInput.click()
    nowButton.click()
    okButton.click()
    dtmInput.getCyElem().invoke('val').then((value)=>{
      expect(value >= minMax[0]);
      expect(value <= minMax[1]);
    });
  });

  it('DT data type should work', function () {
    tp.LoadForm.openFullFeaturedForm();
    let dtEl = element(by.id('/type6/1')).element(by.css("input"));
    let otherEl = element(by.id('/type5/1')); // Use for creating blur event

    let dateStr = '02/032019';
    dtEl.clear();
    TestUtil.sendKeys(dtEl, dateStr);
    otherEl.click();
    expect(dtEl.getAttribute("value")).toBe('')
    //expect(dtEl.getCssValue('border-color')).toEqual('rgb(255, 0, 0)'); // Red border


    dateStr = '02/03/2019';
    dtEl.clear();
    TestUtil.sendKeys(dtEl, dateStr);
    otherEl.click();
    expect(dtEl.getAttribute("value")).toEqual(dateStr);
    // expect(dtEl.getAttribute("class")).toContain('ng-valid');
  });

  it('DTM data type should work', function () {
    tp.LoadForm.openFullFeaturedForm();
    let dtmEl = element(by.id('/type7/1')).element(by.css("input"));
    let otherEl = element(by.id('/type5/1')); // Use for creating blur event
    dtmEl.clear();
    TestUtil.sendKeys(dtmEl, '02/03/201923:59');
    otherEl.click();
    expect(dtmEl.getAttribute("value")).toBe('11/11/2019 06:11:11') // previous value


    dtmEl.clear();
    TestUtil.sendKeys(dtmEl, '02/03/2019 23:59:00'); // current implementation requires seconds, to be improved
    otherEl.click();
    expect(dtmEl.getAttribute("value")).toBe('02/03/2019 23:59:00')

  });

  describe('Button Type', function() {

    it('Each button should have a type="button" so that ENTER does not submit a form (or trigger ng-click on the buttons)', function () {
      tp.LoadForm.openUSSGFHTHorizontal();

      var name1 = element(by.id('/54126-8/54125-0/1/1')),
          name2 = element(by.id('/54126-8/54125-0/1/2'));

      name1.click();
      name1.sendKeys(protractor.Key.ENTER);
      // nothing should happen
      TestUtil.waitForElementNotPresent(name2)
    });

  });

  describe("Items with units", function() {

    describe("with a REAL or INT data type", function () {
      before(() => {tp.LoadForm.openVitalSign()});

      it("should have data type set", function() {
        var field1 = element(by.id('/3140-1/1')),
            field2 = element(by.id('/9279-1/1')),
            field3 = element(by.id('/8310-5/1')); // temperature
        expect(TestUtil.getAttribute(field1,'type')).toBe("text");
        expect(TestUtil.getAttribute(field2,'type')).toBe("text");
        expect(TestUtil.getAttribute(field3,'type')).toBe("text");

      });

      it('should show the unit', function() {
        var field3Unit = element(by.id('unit_/8310-5/1')); // temperature
        expect(TestUtil.getAttribute(field3Unit,'value')).toBe('Cel');
      });
    });
  });

  describe("Items with QTY dataType", function() {

    it("should render QTY data type with associated units", function() {
      tp.LoadForm.openQTYDemo();
      var field1 = element(by.id('/q1/1')),
          field2 = element(by.id('/q2/1')),
          units1 = element(by.id('unit_/q1/1')),
          units3 = element(by.id('unit_/q3/1')),
          units4 = element(by.id('unit_/q4/1')),
          units5 = element(by.id('unit_/q5/1'));

      expect(TestUtil.getAttribute(field1,'type')).toBe("text");
      expect(TestUtil.getAttribute(field1,'value')).toBe("2.5");
      TestUtil.waitForElementNotPresent(units1)

      expect(TestUtil.getAttribute(field2,'placeholder')).toBe("Type a number");
      expect(TestUtil.getAttribute(field2,'value')).toBe("");
      expect(TestUtil.getAttribute(units3,"value")).toBe("kgs");

      var ac = tp.Autocomp;
      expect(TestUtil.getAttribute(units4,"value")).toBe("lbs");
      cy.window().then(win=>{
        var fData = win.LForms.Util.getUserData();
        expect(fData.itemsData[3].unit).toEqual({code: "lbs", default: true});
      });

      units4.click();
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.ENTER);
      expect(TestUtil.getAttribute(units4,"value")).toBe('kilo grams');
      cy.window().then(win=>{
        var fData = win.LForms.Util.getUserData();
        expect(fData.itemsData[3].unit).toEqual({name: "kilo grams", code: "kgs"});
      });
      units4.click();
      // Four units in the list, but one of them is invalid.
      element(by.id('completionOptions')).all(by.css('ul li')).should('have.length', 3);
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.ENTER);
      expect(TestUtil.getAttribute(units4,"value")).toBe('grams');
      cy.window().then(win=>{
        var fData = win.LForms.Util.getUserData();
        expect(fData.itemsData[3].unit).toEqual({name: "grams", system: "http://unitsofmeasure.org"});
      });

      field1.click(); // Close auto complete pull down.
      cy.get(ac.searchResults).should('not.be.visible');
      expect(TestUtil.getAttribute(units5,"value")).toBe("");
      units5.click();
      cy.get(ac.searchResults).should('be.visible');
    });
  });

  describe('required indicator and aria-required', function () {
    before(function () {
      tp.LoadForm.openFullFeaturedForm();
    });

    const allFieldTypes = ['dt', 'dtm', 'tx', 'st'];

    allFieldTypes.forEach(function (type) {
      const label = element(by.id(`label-/required_${type}/1`));
      const requiredElement = element(by.id(`/required_${type}/1`));

      it(`should be present for ${type} field`, function () {
        expect(label.getText()).toMatch(/\*$/);  // Ends with required marker
        expect(requiredElement.getAttribute('aria-required')).toBe("true");
      });
    });
  });
});
