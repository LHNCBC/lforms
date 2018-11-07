var tp = require('./lforms_testpage.po.js');
describe('Form pre-population', function() {
  it('should be possible to pull in data from a FHIR context', function() {
    tp.openBaseTestPage();
    browser.executeScript(function() {
      LForms.Util.setFHIRContext({getCurrent:  function(typeList, callback) {
        var rtn = null;
        if (typeList.indexOf('Patient') >= 0) {
          rtn = {resourceType: "Patient",
            name: [{
              family: "Smith",
              given: ["John", "Adam"]
            }],
            birthDate: "1990-12-10",
            gender: "male"
          }
        }
        callback(rtn);
      }});
    });
    tp.loadFromTestData('ussg-fhp.json', 'R4');
    browser.sleep(30000);
    expect(tp.USSGFHTVertical.name.getAttribute('value')).toBe("John Smith");
    expect(tp.USSGFHTVertical.dob.getAttribute('value')).toBe("12/10/1990");
    // expect(tp.USSGFHTVertical.gender.getAttribute('value')).toBe("Male"); // TBD
  });
});
