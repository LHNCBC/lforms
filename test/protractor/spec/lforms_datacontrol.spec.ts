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
    expect(ff.dcSource.getAttribute('value')).toBe("Haloperidol (Oral Pill)");

    ff.dcTarget1.click();
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(ff.dcTarget1.getAttribute('value')).toBe("1 mg Tab");

    ff.dcTarget2.getAttribute('value').then(function(v) {
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
    expect(ff.dcSource.getAttribute('value')).toBe("Haloperidol (Injectable)");

    ff.dcTarget1.click();
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.ARROW_DOWN);
    ff.dcTarget1.sendKeys(protractor.Key.TAB);
    expect(ff.dcTarget1.getAttribute('value')).toBe("5 mg/ml Sol");

    ff.dcTarget2.getAttribute('value').then(function(v) {
      expect(v.trim()).toBe("5 mg/ml Injection 1 ml");
    });

  });

  it('can control questionCardinality of a horizontal table', function() {
    tp.LoadForm.openFullFeaturedForm();

    var src = element(by.id('/cardinalityControl/1'));
    var btnAdd1 = element(by.id('add-/horizontalTable/1'));
    var btnAdd2 = element(by.id('add-/horizontalTable/2'));
    var btnDel1 = element(by.id('del-/horizontalTable/1'));
    var btnDel2 = element(by.id('del-/horizontalTable/2'));
    var field1 = element(by.id('/horizontalTable/colA/1/1'));
    var field2 = element(by.id('/horizontalTable/colA/2/1'));

    // initially a non-repeating table, no 'add' buttons
    TestUtil.waitForElementNotPresent(btnAdd1)
    expect(field1.isDisplayed()).toBe(true);
    TestUtil.waitForElementNotPresent(field2)

    // make it repeating
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    expect(btnAdd1.isDisplayed()).toBe(true);

    TestUtil.waitForElementNotPresent(btnAdd2)
    TestUtil.waitForElementNotPresent(btnDel1)
    TestUtil.waitForElementNotPresent(btnDel2)
    expect(btnAdd1.getText()).toBe('+ Add another row of "A non-repeating horizontal table"');

    // 'add' button works
    btnAdd1.click();
    expect(btnAdd1.isPresent()).toBe(true);
    TestUtil.waitForElementNotPresent(btnAdd2)

    expect(btnDel1.isDisplayed()).toBe(true);
    expect(btnDel2.isDisplayed()).toBe(true);
    expect(btnAdd1.getText()).toBe('+ Add another row of "A non-repeating horizontal table"');
    expect(field1.isDisplayed()).toBe(true);
    expect(field2.isDisplayed()).toBe(true);

    // 'del' button works
    //TestUtil.sendKeys(ff.dcSource, 'Haloperidol');
    TestUtil.clickAddRemoveButton(btnDel1);
    expect(btnAdd2.isDisplayed()).toBe(true);
    TestUtil.waitForElementNotPresent(btnAdd1)
    
    TestUtil.waitForElementNotPresent(btnDel1)
    TestUtil.waitForElementNotPresent(btnDel2)
    TestUtil.waitForElementNotPresent(field1)

    expect(field2.isDisplayed()).toBe(true);

    // change back to non-repeating table
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    TestUtil.waitForElementNotPresent(btnAdd1)
    TestUtil.waitForElementNotPresent(btnAdd2)
    TestUtil.waitForElementNotPresent(btnDel1)
    TestUtil.waitForElementNotPresent(btnDel2)
    TestUtil.waitForElementNotPresent(field1)

    expect(field2.isDisplayed()).toBe(true);

  });

  it('saved item value should be displayed when the value contains extra data for data controls', function() {
    tp.LoadForm.openNewGeneticForm();

    var catgory = element(by.id('/81250-3/83005-9/1/1')),
        codingsystem = element(by.id('/81250-3/82122-3/1/1'));

    expect(catgory.getAttribute('value')).toBe("Simple Variant");
    expect(codingsystem.getAttribute('value')).toBe("ClinVar Variants");

    browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function (formData:any) {

      // category
      expect(formData.itemsData[8].items[0].value.code).toEqual('LA26801-3');
      expect(formData.itemsData[8].items[0].value.text).toEqual('Simple Variant');
      expect(formData.itemsData[8].items[0].value._displayText).toBeUndefined();
      expect(formData.itemsData[8].items[0].value.data).toEqual({
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
      })
      
      // coding system
      expect(formData.itemsData[8].items[1].value.code).toEqual('CLINVAR-V');
      expect(formData.itemsData[8].items[1].value.text).toEqual('ClinVar Variants');
      expect(formData.itemsData[8].items[1].value._displayText).toBeUndefined();
      expect(formData.itemsData[8].items[1].value.data).toEqual({
        "url": "https://clinicaltables.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,VariantID"
      })
    })
  });

});
