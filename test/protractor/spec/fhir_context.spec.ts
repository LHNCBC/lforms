import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import * as FHIRSupport from "../../../app/scripts/fhir/versions.js";

let fhirVersions = Object.keys(FHIRSupport);
let tp: TestPage; 
let LForms: any = (global as any).LForms;
tp = new TestPage();
var ff = tp.USSGFHTVertical;
var EC = protractor.ExpectedConditions;

for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    describe(fhirVersion, function() {
      beforeAll(async () => {
        await browser.waitForAngularEnabled(false); 
        tp.openBuildTestFHIRPath();   
        browser.sleep(500) // wait for the the fhir lib to be loaded   
    });

      describe('External prefetch answerValueSets', function() {
        it('should be retrieved when a terminology server is specified', function() {
          tp.loadFromTestData('fhir-context-q.json', fhirVersion);
          browser.wait(ExpectedConditions.visibilityOf(element(by.id('label-54127-6'))), 5000);
          let selfAdopted = element(by.id('/54126-8/54128-4/1/1'));  
          TestUtil.waitForElementPresent(selfAdopted);        
          selfAdopted.click();
          tp.Autocomp.helpers.thirdSearchRes.click();
          expect(selfAdopted.getAttribute('value')).toBe("Don't know");
        });

        it('should be retrieved when a terminology server is not specified', function() {
          let relativeAdopted = element(by.id('/54114-4/54122-7/1/1'));
          relativeAdopted.click();
          tp.Autocomp.helpers.thirdSearchRes.click();
          expect(relativeAdopted.getAttribute('value')).toBe("High");
        });
      });

      describe('External autocomplete answerValueSets', function() {
        it('should be able to search via ValueSet expansion', function () {
          var ethnicity = ff.ethnicity;
          TestUtil.sendKeys(ethnicity(), 'arg');
          tp.Autocomp.helpers.waitForSearchResults();
          expect(tp.Autocomp.helpers.firstSearchRes.getText()).toBe('Argentinean');

          ff.disease.click();
          tp.Autocomp.helpers.waitForNoSearchResults();
          TestUtil.sendKeys(ff.disease, 'arm');
          tp.Autocomp.helpers.waitForSearchResults();
          tp.Autocomp.helpers.firstSearchRes.click();
          expect(ff.disease.getAttribute('value')).toBe('Arm pain');
        });
      });
    });
  })(fhirVersions[i]);
}
