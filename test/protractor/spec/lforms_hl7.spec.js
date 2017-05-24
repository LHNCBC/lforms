var tp = require('./lforms_testpage.po.js');
var rxtermsForm = require('./rxterms.fo.js');
var ff = tp.USSGFHTVertical;

describe('HL7 data', function() {

  it('should get correct hl7 data', function() {

    tp.openUSSGFHTVertical();

    // ST, repeating
    ff.name.sendKeys("name1");
    ff.btnName.click();
    ff.name2.sendKeys("name2");
    ff.btnName2.click();
    ff.name3.sendKeys("name3");
    ff.btnName3.click();
    ff.name.clear();
    // DT
    ff.dob.sendKeys("10/27/2016");
    // CWE/CNE
    ff.gender.click();
    // pick the 1st item
    ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
    ff.gender.sendKeys(protractor.Key.TAB);
    // CWE, multiple answers
    ff.race.click();
    // pick the first 2 items
    ff.race.sendKeys(protractor.Key.ARROW_DOWN);
    ff.race.sendKeys(protractor.Key.TAB);
    ff.race.click();
    ff.race.sendKeys(protractor.Key.ARROW_DOWN);
    ff.race.sendKeys(protractor.Key.TAB);
    // REAL
    ff.height.sendKeys("70");
    ff.weight.sendKeys("170");
    // repeating sub panel
    ff.disease.click();
    ff.disease.sendKeys(protractor.Key.ARROW_DOWN);
    ff.disease.sendKeys(protractor.Key.TAB);
    ff.ageAtDiag.click();
    ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag.sendKeys(protractor.Key.TAB);
    ff.btnDiseasesHist.click();

    ff.disease2.click();
    ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.disease2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.disease2.sendKeys(protractor.Key.TAB);
    ff.ageAtDiag2.click();
    ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag2.sendKeys(protractor.Key.TAB);
    ff.btnDiseasesHist2.click();

    ff.disease3.click();
    ff.disease3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.disease3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.disease3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.disease3.sendKeys(protractor.Key.TAB);
    ff.ageAtDiag3.click();
    ff.ageAtDiag3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag3.sendKeys(protractor.Key.ARROW_DOWN);
    ff.ageAtDiag3.sendKeys(protractor.Key.TAB);
    ff.btnDiseasesHist3.click();

    // clear up the first instance
    ff.disease.clear();
    ff.ageAtDiag.clear();

    // family member
    ff.fmName.sendKeys("member name1");
    ff.fmDisease.sendKeys(protractor.Key.ARROW_DOWN);
    ff.fmDisease.sendKeys(protractor.Key.TAB);
    ff.btnAnotherDiseasesHist.click();

    ff.btnAnotherFamily.click();
    ff.fmName2.sendKeys("member name2");
    ff.fmDisease2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.fmDisease2.sendKeys(protractor.Key.ARROW_DOWN);
    ff.fmDisease2.sendKeys(protractor.Key.TAB);
    ff.btnAnotherDiseasesHist2.click();

    ff.btnAnotherFamily2.click();

    browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var hl7Data = LForms.Util.getFormHL7Data();
      callback(hl7Data);
    }).then(function (hl7Data) {
      var hl7 = hl7Data.replace(/\r/g,'');
      expect(hl7).toBe("OBR|1|54127-6N^USSG-FHT, (with mock-up items for skip logic demo)^LN|OBX|1|ST|54125-0^Name^LN|1.a|name2|OBX|2|ST|54125-0^Name^LN|1.b|name3|OBX|3|CNE|54131-8^Gender^LN|1|LA2-8^Male^LN|OBX|4|DT|21112-8^Date of Birth^LN|1|2016-10-27T00:00:00-04:00|OBX|5|NM|8302-2^Height^LN|1|70|inches^inches^LN|OBX|6|NM|29463-7^Weight^LN|1|170|lbs^lbs^LN|OBX|7|ST|39156-5^Mock-up item: Body mass index (BMI) [Ratio]^LN|1|24.39|OBX|8|CNE|54134-2^Race^LN|1|LA10608-0^American Indian or Alaska Native^LN~LA6156-9^Asian^LN|OBX|9|CNE|54140-9^Disease or Condition^LN|1.1a|LA10572-8^-- Blood Clot in Leg^LN|OBX|10|CNE|54130-0^Age at Diagnosis^LN|1.1a|LA10394-7^Infancy^LN|OBX|11|CNE|54140-9^Disease or Condition^LN|1.1b|LA10573-6^-- Blood Clot in Lungs^LN|OBX|12|CNE|54130-0^Age at Diagnosis^LN|1.1b|LA10395-4^Childhood^LN|OBX|13|ST|54138-3^Name^LN|2a|member name1|OBX|14|CNE|54116-9^Disease or Condition^LN|2a.1a|LA10533-0^Blood Clots^LN|OBX|15|ST|54138-3^Name^LN|2b|member name2|OBX|16|CNE|54116-9^Disease or Condition^LN|2b.1a|LA10572-8^-- Blood Clot in Leg^LN|");
    });
  });

  it('should get correct hl7 data for forms without questions in header', function() {

    tp.openRxTerms();

    var drugNameField = rxtermsForm.drugName;
    drugNameField.click();
    drugNameField.sendKeys('aspercreme');
    browser.wait(function(){return tp.Autocomp.searchResults.isDisplayed()}, 10000);
    drugNameField.sendKeys(protractor.Key.ARROW_DOWN);
    drugNameField.sendKeys(protractor.Key.TAB);

    browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var hl7Data = LForms.Util.getFormHL7Data();
      callback(hl7Data);
    }).then(function (hl7Data) {
      var hl7 = hl7Data.replace(/\r/g,'');
      expect(hl7).toBe("OBR|1|X-001^RxTerms Demo^LN|OBX|1|CNE|nameAndRoute^Drug Name^LN|1a|ASPERCREME (Topical)^ASPERCREME (Topical)^LN|");
    });
  });

});
