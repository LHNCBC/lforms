var tp = require('./lforms_testpage.po.js');
var testUtil = require('./util.js');
var fhirSupport = require('../../../app/scripts/fhir/versions');
var fhirVersions = Object.keys(fhirSupport);
var ff = tp.USSGFHTVertical;

for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion, function() {
      describe('External prefetch answerValueSets', function() {
        beforeAll(function() {
          tp.openBuildTestFHIRPath();
          tp.loadFromTestData('fhir-context-q.json', fhirVersion);
        });

        it('should be retrieved when a terminology server is specified', function() {
          let selfAdopted = element(by.id('/54126-8/54128-4/1/1'));
          var EC = protractor.ExpectedConditions;
          browser.wait(EC.presenceOf(selfAdopted), 200000);
          selfAdopted.click();
          tp.Autocomp.helpers.thirdSearchRes.click();
          expect(selfAdopted.getAttribute('value')).toBe("Don't know");
        });

        it('should be retrieved when a terminology server is not specified', function() {
          let relativeAdopted = element(by.id('/54114-4/54122-7/1/1'));
          relativeAdopted.click();
          tp.Autocomp.helpers.thirdSearchRes.click();
          expect(relativeAdopted.getAttribute('value')).toBe("Medium");
        });
      });

      describe('External autocomplete answerValueSets', function() {
        it('should be able to search via ValueSet expansion', function () {
          var ethnicity = ff.ethnicity;
          testUtil.sendKeys(ethnicity(), 'arg');
          tp.Autocomp.helpers.waitForSearchResults();
          expect(tp.Autocomp.helpers.firstSearchRes.getText()).toBe('Argentinean');

          ff.disease.click();
          tp.Autocomp.helpers.waitForNoSearchResults();
          testUtil.sendKeys(ff.disease, 'arm');
          tp.Autocomp.helpers.waitForSearchResults();
          tp.Autocomp.helpers.firstSearchRes.click();
          expect(ff.disease.getAttribute('value')).toBe('Arm pain');
        });
      });
    });
  })(fhirVersions[i]);
}
