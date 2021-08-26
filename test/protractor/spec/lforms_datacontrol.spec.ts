var tp = require('./lforms_testpage.po.js');
var ff = tp.FullFeaturedForm;
var testUtil = require('./util.js');

describe('data control', function() {

  it('data change on source field should update target fields', function() {
    tp.openFullFeaturedForm();

    testUtil.sendKeys(ff.dcSource, 'Haloperidol');
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
    testUtil.sendKeys(ff.dcSource, 'Haloperidol');
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
    tp.openFullFeaturedForm();

    var src = element(by.id('/cardinalityControl/1'));
    var btnAdd1 = element(by.id('add-/horizontalTable/1'));
    var btnAdd2 = element(by.id('add-/horizontalTable/2'));
    var btnDel1 = element(by.id('del-/horizontalTable/1'));
    var btnDel2 = element(by.id('del-/horizontalTable/2'));
    var field1 = element(by.id('/horizontalTable/colA/1/1'));
    var field2 = element(by.id('/horizontalTable/colA/2/1'));

    // initially a non-repeating table, no 'add' buttons
    expect(btnAdd1.isPresent()).toBe(false);
    expect(field1.isDisplayed()).toBe(true);
    expect(field2.isPresent()).toBe(false);

    // make it repeating
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    expect(btnAdd1.isDisplayed()).toBe(true);
    expect(btnAdd2.isPresent()).toBe(false);
    expect(btnDel1.isPresent()).toBe(false);
    expect(btnDel2.isPresent()).toBe(false);
    expect(btnAdd1.getText()).toBe('+ Add another "A non-repeating horizontal table"');

    // 'add' button works
    btnAdd1.click();
    expect(btnAdd1.isPresent()).toBe(true);
    expect(btnAdd2.isPresent()).toBe(false);
    expect(btnDel1.isDisplayed()).toBe(true);
    expect(btnDel2.isDisplayed()).toBe(true);
    expect(btnAdd1.getText()).toBe('+ Add another "A non-repeating horizontal table"');
    expect(field1.isDisplayed()).toBe(true);
    expect(field2.isDisplayed()).toBe(true);

    // 'del' button works
    testUtil.sendKeys(ff.dcSource, 'Haloperidol');
    testUtil.clickAddRemoveButton(btnDel1);
    expect(btnAdd1.isPresent()).toBe(false);
    expect(btnAdd2.isDisplayed()).toBe(true);
    expect(btnDel1.isPresent()).toBe(false);
    expect(btnDel2.isPresent()).toBe(false);
    expect(field1.isPresent()).toBe(false);
    expect(field2.isDisplayed()).toBe(true);

    // change back to non-repeating table
    src.click();
    src.sendKeys(protractor.Key.ARROW_DOWN);
    src.sendKeys(protractor.Key.TAB);
    expect(btnAdd1.isPresent()).toBe(false);
    expect(btnAdd2.isPresent()).toBe(false);
    expect(btnDel1.isPresent()).toBe(false);
    expect(btnDel2.isPresent()).toBe(false);
    expect(field1.isPresent()).toBe(false);
    expect(field2.isDisplayed()).toBe(true);


  });

  it('saved item value should be displayed when the value contains extra data for data controls', function() {
    tp.openNewGeneticForm();

    var catgory = element(by.id('/81250-3/83005-9/1/1')),
        codingsystem = element(by.id('/81250-3/82122-3/1/1'));

    expect(catgory.getAttribute('value')).toBe("Simple Variant");
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

    expect(codingsystem.getAttribute('value')).toBe("ClinVar Variants");
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
