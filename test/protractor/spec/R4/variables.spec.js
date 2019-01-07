// Tests for the FHIR "variable" extension.
var fhirVersion = 'R4';

var tp = require('../lforms_testpage.po.js');
fdescribe('FHIR variables', function() {
  function elID(id) {return element(by.id(id));}
  let fieldB = elID('/groupA/fieldB/1/1');
  let fieldC = elID('/groupA/fieldC/1/1');
  let fieldD = elID('/groupB/fieldD/1/1');
  let fieldE = elID('/groupB/fieldE/1/1');

  function valueOf(field) {return field.getAttribute('value');}

  beforeAll(function () {
    tp.openBaseTestPage();
    tp.loadFromTestData('variable-scope-test.json', 'R4');
  });

  it('should have expected values before typing', function() {
    expect(valueOf(fieldB)).toBe('');
    expect(valueOf(fieldC)).toBe('');
    expect(valueOf(fieldD)).toBe('');
    expect(valueOf(fieldE)).toBe('');
  });

  it('should have expected values after typing', function() {
    fieldB.sendKeys('1');
    expect(valueOf(fieldB)).toBe('1');
    expect(valueOf(fieldC)).toBe('8');
    expect(valueOf(fieldD)).toBe('');
    expect(valueOf(fieldE)).toBe('16');
  });
});
