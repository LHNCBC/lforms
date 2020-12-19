// Tests for the FHIR "variable" extension.
var fhirVersion = 'R4';

var tp = require('../lforms_testpage.po.js');
var testUtil = require('../util.js');

describe('FHIR variables', function() {
  beforeAll(function () {
    tp.openBaseTestPage();
  });
  function elID(id) {return element(by.id(id));}
  function valueOf(field) {return field.getAttribute('value');}

  describe('FHIRPath variables', function() {
    let addGroupA = elID('add-/groupA/1');
    let fieldB1 = elID('/groupA/fieldB/1/1');
    let addFieldB = elID('add-/groupA/fieldB/1/1');
    let fieldB2 = elID('/groupA/fieldB/1/2');
    let fieldBg2f1 = elID('/groupA/fieldB/2/1');
    let fieldC = elID('/groupA/fieldC/1/1');
    let fieldCg2 = elID('/groupA/fieldC/2/1');
    let fieldD = elID('/groupB/fieldD/1/1');
    let fieldE = elID('/groupB/fieldE/1/1');

    beforeAll(function () {
      tp.loadFromTestData('variable-scope-test.json', 'R4');
    });

    it('should have expected values before typing', function() {
      expect(valueOf(fieldB1)).toBe('');
      expect(valueOf(fieldC)).toBe('');
      expect(valueOf(fieldD)).toBe('');
      expect(valueOf(fieldE)).toBe('');
    });

    it('should have expected values after typing', function() {
      testUtil.sendKeys(fieldB1, '1');
      addFieldB.click();
      testUtil.sendKeys(fieldB2, '2');
      expect(valueOf(fieldB1)).toBe('1');
      expect(valueOf(fieldB2)).toBe('2');
      expect(valueOf(fieldC)).toBe('8');
      expect(valueOf(fieldD)).toBe('');
      expect(valueOf(fieldE)).toBe('16');
    });

    it('should have working expressions for added groups', function() {
      addGroupA.click();
      testUtil.sendKeys(fieldBg2f1, '3');
      expect(valueOf(fieldC)).toBe('8');
      expect(valueOf(fieldCg2)).toBe('10');
    });
  });

  fdescribe("x-fhir-query variable test form", function() {
    beforeAll(function () {
      var fhirMock = require('./fhir_context');
      browser.executeScript(function(fhirVersion, mockFHIRContext, mockData) {
        var fhirContext = new Function("return "+mockFHIRContext)();
        LForms.Util.setFHIRContext(fhirContext(fhirVersion, null, mockData));
      }, fhirVersion, fhirMock.mockFHIRContext, fhirMock.mockData);

      tp.loadFromTestData('x-fhir-query-test.R4.json', 'R4');
    });

    it('should populate the lists when the controlling item is selected', () => {
      let listSelField = elID('listSelection/1');
      tp.Autocomp.helpers.autocompPickFirst(listSelField, 'la'); // language
      let urlFetchField = elID('listViewFromURL/1');
      urlFetchField.click(); // show the list
      expect(tp.Autocomp.helpers.shownItemCount()).toBe(2);
      urlFetchField.sendKeys(protractor.Key.ESCAPE); // close the list
      let contextField = elID('listViewFromContext/1');
      contextField.click();
      expect(tp.Autocomp.helpers.shownItemCount()).toBe(2);

      // After picking the language list, pick the second list, for which there
      // is no mock data, so only the first listView field should have a list.
      // Testing this here after the previous test checks that the second
      // listView field's list is empty.
      // This test code actually does not catch the bug which prompted it, but I am
      // leaving it here.
browser.sleep(2000);
tp.Autocomp.helpers.clearField(listSelField);
//      listSelField.click();
//      listSelField.
browser.sleep(20000);
      tp.Autocomp.helpers.autocompPickFirst(listSelField, 've'); // verification
browser.sleep(20000);
      urlFetchField.click(); // show the list
      expect(tp.Autocomp.helpers.shownItemCount()).toBe(6);
      urlFetchField.sendKeys(protractor.Key.ESCAPE); // close the list
      contextField.click();
      expect(tp.Autocomp.helpers.shownItemCount()).toBe(0);
    });
  });
});
