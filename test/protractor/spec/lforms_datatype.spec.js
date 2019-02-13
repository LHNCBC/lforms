var tp = require('./lforms_testpage.po.js');

describe('Data Type', function() {

  var typeTitle = element(by.css("label[for='/titleHeader/1']"));

  it('TITLE row should appear', function () {
    tp.openFullFeaturedForm();
    expect(typeTitle.isDisplayed()).toBe(true);
  });


  describe('Button Type', function() {

    it('Each button should have a type="button" so that ENTER does not submit a form (or trigger ng-click on the buttons)', function () {
      tp.openUSSGFHTHorizontal();

      var name1 = element(by.id('/54126-8/54125-0/1/1')),
          name2 = element(by.id('/54126-8/54125-0/1/2'));

      name1.click();
      name1.sendKeys(protractor.Key.ENTER);
      // nothing should happen
      expect(name2.isPresent()).toBe(false);
    });

  });

  describe("Items with units", function() {
    
    it("should have the REAL data type", function() {
      tp.openVitalSign();
      var field1 = element(by.id('/3140-1/1')),
          field2 = element(by.id('/9279-1/1')),
          field3 = element(by.id('/8310-5/1'));

      expect(field1.getAttribute('type')).toBe("text");
      field1.evaluate("item.dataType").then(function (value) {
        expect(value).toBe('INT');
      });
      expect(field2.getAttribute('type')).toBe("text");
      field2.evaluate("item.dataType").then(function (value) {
        expect(value).toBe('REAL');
      });
      expect(field3.getAttribute('type')).toBe("text");
      field3.evaluate("item.dataType").then(function (value) {
        expect(value).toBe('REAL');
      });

    });
  });

  describe("Items with QTY dataType", function() {
    
    it("should render QTY data type with associated units", function() {
      tp.openQTYDemo();
      var field1 = element(by.id('/q1/1')),
          field2 = element(by.id('/q2/1')),
          units1 = element(by.id('unit_/q1/1')),
          units3 = element(by.id('unit_/q3/1')),
          units4 = element(by.id('unit_/q4/1')),
          units5 = element(by.id('unit_/q5/1'));
  
      expect(field1.getAttribute('type')).toBe("text");
      expect(field1.getAttribute('value')).toBe("2.5");
      field1.evaluate("item.dataType").then(function (value) {
        expect(value).toBe('QTY');
      });
      expect(units1.isPresent()).toBe(false);
  
      expect(field2.getAttribute('placeholder')).toBe("Type a number");
      expect(field2.getAttribute('value')).toBe("");
  
      expect(units3.getAttribute("value")).toBe("kgs");
      
      var ac = tp.Autocomp;
      expect(units4.getAttribute("value")).toBe("lbs");
      units4.evaluate("item.unit").then(function (unit) {
        expect(unit).toEqual({_displayUnit: "lbs", code: "lbs", default: true});
      });
      units4.click();
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.ENTER);
      expect(units4.getAttribute("value")).toBe('kilo grams');
      units4.evaluate("item.unit").then(function (unit) {
        expect(unit).toEqual({_displayUnit: "kilo grams", name: "kilo grams", code: "kgs"});
      });
      units4.click();
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.DOWN);
      units4.sendKeys(protractor.Key.ENTER);
      expect(units4.getAttribute("value")).toBe('grams');
      units4.evaluate("item.unit").then(function (unit) {
        expect(unit).toEqual({_displayUnit: "grams", name: "grams", system: "http://unitsofmeasure.org"});
      });
  
      field1.click(); // Close auto complete pull down.
      expect(ac.searchResults.isDisplayed()).toBe(false);
      expect(units5.getAttribute("value")).toBe("");
      units5.click();
      expect(ac.searchResults.isDisplayed()).toBe(true);
    });
  });
});
