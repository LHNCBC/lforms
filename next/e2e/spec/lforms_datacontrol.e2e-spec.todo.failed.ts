import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('data control', function() {
  let tp: TestPage = new TestPage(); 
  let ff: any = tp.FullFeaturedForm;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  it('data change on source field should update target fields', function() {
    
    tp.LoadForm.openFullFeaturedForm();

    TestUtil.sendKeys(ff.dcSource, 'Haloperidol');
    browser.wait(function() {
      return ff.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
    ff.dcSource.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcSource.sendKeys(protractor.Key.TAB);
    expect(TestUtil.getAttribute(ff.dcSource,'value')).toBe("Haloperidol (Oral Pill)");

    ff.dcTarget1.click();
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(TestUtil.getAttribute(ff.dcTarget1,'value')).toBe("1 mg Tab");

    TestUtil.getAttribute(ff.dcTarget2,'value').then(function(v) {
      expect(v.trim()).toBe("0.5 mg Tab");
    });

    // pick a different value on source field
    ff.dcSource.clear();
    TestUtil.sendKeys(ff.dcSource, 'Haloperidol');
    browser.wait(function() {
      return ff.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
    ff.dcSource.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcSource.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcSource.sendKeys(protractor.Key.TAB);
    expect(TestUtil.getAttribute(ff.dcSource,'value')).toBe("Haloperidol (Injectable)");

    ff.dcTarget1.click();
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(TestUtil.getAttribute(ff.dcTarget1,'value')).toBe("5 mg/ml Sol");

    TestUtil.getAttribute(ff.dcTarget2,'value').then(function(v) {
      expect(v.trim()).toBe("5 mg/ml Injection 1 ml");
    });

  });

  it('can control questionCardinality of a horizontal table', async function() {
    tp.LoadForm.openFullFeaturedForm();
    var src = element(by.id('/cardinalityControl/1'));
    var btnAdd1 = element(by.id('add-/horizontalTable/1'));
    var btnDel1 = element(by.id('del-/horizontalTable/1'));
    var btnDel2 = element(by.id('del-/horizontalTable/2'));
    var field1 = element(by.id('/horizontalTable/colA/1/1'));
    var field2 = element(by.id('/horizontalTable/colA/2/1'));

    // initially a non-repeating table, no 'add' buttons
    //expect(await btnAdd1.isPresent()).toBe(false);
    expect(browser.isElementPresent(btnAdd1)).toBeFalsy();

    expect(field1.isDisplayed()).toBe(true);
  //  expect(field2.isPresent()).toBe(false);

  console.log("0")

    // make it repeating
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    // await browser.wait(function() {
    //   console.log("a")
    //   return btnAdd1.isDisplayed();
    // }, tp.WAIT_TIMEOUT_1);

    expect(btnAdd1.isDisplayed()).toBe(true);
    
    // expect(await btnAdd2.isPresent()).toBe(false);
    // expect(browser.isElementPresent(btnAdd2)).toBeFalsy();
console.log("1")
expect(browser.isElementPresent(btnDel1)).toBeFalsy();
expect(browser.isElementPresent(btnDel2)).toBeFalsy();
    // expect(await btnDel1.isPresent()).toBe(false);
    // expect(await btnDel2.isPresent()).toBe(false);
    expect(btnAdd1.getText()).toBe('+ Add another row of "A non-repeating horizontal table"');
console.log("2")
    // // 'add' button works
    btnAdd1.click();
    //expect(await btnAdd1.isPresent()).toBe(true);
    console.log("2a")
    // expect(browser.isElementPresent(btnAdd2)).toBeFalsy();
    //expect(await btnAdd2.isPresent()).toBe(false);
    console.log("2b")
    expect(btnDel1.isDisplayed()).toBe(true);
    console.log("2c")
    expect(btnDel2.isDisplayed()).toBe(true);
    console.log("2d")
    expect(btnAdd1.getText()).toBe('+ Add another row of "A non-repeating horizontal table"');
    expect(field1.isDisplayed()).toBe(true);
    expect(field2.isDisplayed()).toBe(true);

    console.log("3")

    // 'del' button works
    TestUtil.sendKeys(field1, 'Haloperidol');
    TestUtil.clickAddRemoveButton(btnDel1);
    expect(browser.isElementPresent(btnAdd1)).toBeFalsy();
    expect(browser.isElementPresent(btnDel1)).toBeFalsy();
    expect(browser.isElementPresent(btnDel2)).toBeFalsy();
    expect(browser.isElementPresent(field1)).toBeFalsy();

    // expect(btnAdd1.isPresent()).toBe(false);
    // expect(btnDel1.isPresent()).toBe(false);
    // expect(btnDel2.isPresent()).toBe(false);
    // expect(field1.isPresent()).toBe(false);
    expect(field2.isDisplayed()).toBe(true);
    console.log("4")

    // change back to non-repeating table
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    expect(browser.isElementPresent(btnAdd1)).toBeFalsy();
    expect(browser.isElementPresent(btnDel1)).toBeFalsy();
    expect(browser.isElementPresent(btnDel2)).toBeFalsy();
    expect(browser.isElementPresent(field1)).toBeFalsy();
    // expect(btnAdd1.isPresent()).toBe(false);
    // expect(btnDel1.isPresent()).toBe(false);
    // expect(btnDel2.isPresent()).toBe(false);
    // expect(field1.isPresent()).toBe(false);
    expect(field2.isDisplayed()).toBe(true);
    console.log("5")

  });

  it('saved item value should be displayed when the value contains extra data for data controls', function() {
    tp.LoadForm.openNewGeneticForm();

    var catgory = element(by.id('/81250-3/83005-9/1/1')),
        codingsystem = element(by.id('/81250-3/82122-3/1/1'));

    expect(TestUtil.getAttribute(catgory,'value')).toBe("Simple Variant");
    catgory.evaluate('item.value').then(function(val) {
      expect(val.code).toEqual('LA26801-3');
      expect(val.text).toEqual('Simple Variant');
      expect(val._displayText).toEqual('Simple Variant');
      expect(val.data).toEqual({
        "dnaChangeTypeList": [
          { "text": "Wild Type", "code": "LA9658-1" },
          { "text": "Deletion", "code": "LA6692-3" },
          { "text": "Duplication", "code": "LA6686-5" },
          { "text": "Insertion", "code": "LA6687-3" },
          { "text": "Insertion/Deletion", "code": "LA6688-1" },
          { "text": "Inversion", "code": "LA6689-9" },
          { "text": "Substitution", "code": "LA6690-7" }
        ],
        "variantCodeSystemList": [
          {"text": "ClinVar Variants", "code": "CLINVAR-V",
            "data": {"url": "https://clinicaltables.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,VariantID"}},
          {"text": "ClinVar Alleles", "code": "CLINVAR-A",
            "data": {"url": "https://clinicaltables.nlm.nih.gov/api/alleles/v3/search?df=Name,AlleleID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,AlleleID"}},
          {"text": "COSMIC", "code": "cosmic-Smpl",
            "data": {"url": "https://clinicaltables.nlm.nih.gov/api/cosmic/v3/search?ef=GeneName:GeneSymbol,MutationAA:NucleotideChange,MutationCDS:AminoAcidChange,MutationGenomePosition:Start&df=Name,MutationID,Site"}},
          {"text": "Other variant source", "code": "LA46-8"}
        ]
      });
    });

    expect(TestUtil.getAttribute(codingsystem,'value')).toBe("ClinVar Variants");
    codingsystem.evaluate('item.value').then(function(val) {
      expect(val.code).toEqual('CLINVAR-V');
      expect(val.text).toEqual('ClinVar Variants');
      expect(val._displayText).toEqual('ClinVar Variants');
      expect(val.data).toEqual({
        "url": "https://clinicaltables.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,VariantID"
      });
    });

  });

});
