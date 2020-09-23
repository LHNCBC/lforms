// Tests for the FHIR "variable" extension.
var fhirVersion = 'R4';

var tp = require('../lforms_testpage.po.js');
var testUtil = require('../util.js');

describe('FHIR variables', function() {
  function elID(id) {return element(by.id(id));}
  let addGroupA = elID('add-/groupA/1');
  let fieldB1 = elID('/groupA/fieldB/1/1');
  let addFieldB = elID('add-/groupA/fieldB/1/1');
  let fieldB2 = elID('/groupA/fieldB/1/2');
  let fieldBg2f1 = elID('/groupA/fieldB/2/1');
  let fieldC = elID('/groupA/fieldC/1/1');
  let fieldCg2 = elID('/groupA/fieldC/2/1');
  let fieldD = elID('/groupB/fieldD/1/1');
  let fieldE = elID('/groupB/fieldE/1/1');

  function valueOf(field) {return field.getAttribute('value');}

  beforeAll(function () {
    tp.openBaseTestPage();
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
