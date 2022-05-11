import {TestPage} from '../support/lforms_testpage.po.js';
import {rxtermsControls as rxterms} from '../support/rxterms.po.js';

describe('data control', () => {
  const tp: TestPage = new TestPage();
  const ff: any = tp.FullFeaturedForm;

  it('data change on source field should update target fields', () => {
    tp.LoadForm.openFullFeaturedForm();
    cy.byId(ff.dcSource).type('Haloperidol');
    cy.byId(ff.searchResults).should('be.visible');
    cy.byId(ff.dcSource).type('{downArrow}').blur().should('have.value', 'Haloperidol (Oral Pill)');

    cy.byId(ff.dcTarget1).click().type('{downArrow}').type('{downArrow}').blur()
      .should('have.value', '1 mg Tab');

    cy.byId(ff.dcTarget2).invoke('val').invoke('trim').should('eq', '0.5 mg Tab');

    // pick a different value on source field
    cy.byId(ff.dcSource).clear().type('Haloperidol');
    cy.byId(ff.searchResults).should('be.visible');
    cy.byId(ff.dcSource).type('{downArrow}').type('{downArrow}').blur()
      .should('have.value', 'Haloperidol (Injectable)');

    cy.byId(ff.dcTarget1).click().type('{downArrow}').type('{downArrow}').type('{downArrow}').blur()
      .should('have.value', '5 mg/ml Sol');

    cy.byId(ff.dcTarget2).invoke('val').invoke('trim').should('eq', '5 mg/ml Injection 1 ml');
  });

  it('can control questionCardinality of a horizontal table', () => {
    tp.LoadForm.openFullFeaturedForm();

    const src = '/cardinalityControl/1';
    const btnAdd1 = 'add-/horizontalTable/1';
    const btnAdd2 = 'add-/horizontalTable/2';
    const btnDel1 = 'del-/horizontalTable/1';
    const btnDel2 = 'del-/horizontalTable/2';
    const field1 = '/horizontalTable/colA/1/1';
    const field2 = '/horizontalTable/colA/2/1';

    // initially a non-repeating table, no 'add' buttons
    cy.byId(btnAdd1).should('not.exist');
    cy.byId(field1).should('be.visible');
    cy.byId(field2).should('not.exist');

    // make it repeating
    cy.byId(src).click().type('{downArrow}').type('{downArrow}').blur();
    cy.byId(btnAdd1).should('be.visible');

    cy.byId(btnAdd2).should('not.exist');
    cy.byId(btnDel1).should('not.exist');
    cy.byId(btnDel2).should('not.exist');
    cy.byId(btnAdd1).should('contain', 'Add another row of "A non-repeating horizontal table"');

    // 'add' button works
    cy.byId(btnAdd1).click();
    cy.byId(btnAdd1).should('be.visible');
    cy.byId(btnAdd2).should('not.exist');

    cy.byId(btnDel1).should('be.visible');
    cy.byId(btnDel2).should('be.visible');
    cy.byId(btnAdd1).should('contain', 'Add another row of "A non-repeating horizontal table"');
    cy.byId(field1).should('be.visible');
    cy.byId(field2).should('be.visible');

    // 'del' button works
    cy.byId(btnDel1).click();
    cy.byId(btnAdd2).should('be.visible');
    cy.byId(btnAdd1).should('not.exist');

    cy.byId(btnDel1).should('not.exist');
    cy.byId(btnDel2).should('not.exist');
    cy.byId(field1).should('not.exist');
    cy.byId(field2).should('be.visible');

    // change back to non-repeating table
    cy.byId(src).click().type('{downArrow}').blur();
    cy.byId(btnAdd1).should('not.exist');
    cy.byId(btnAdd2).should('not.exist');
    cy.byId(btnDel1).should('not.exist');
    cy.byId(btnDel2).should('not.exist');
    cy.byId(field1).should('not.exist');
    cy.byId(field2).should('be.visible');
  });

  it('saved item value should be displayed when the value contains extra data for data controls', () => {
    tp.LoadForm.openNewGeneticForm();

    cy.byId('/81250-3/83005-9/1/1').should('have.value', 'Simple Variant');
    cy.byId('/81250-3/82122-3/1/1').should('have.value', 'ClinVar Variants');

    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();

      // category
      expect(formData.itemsData[8].items[0].value.code).to.equal('LA26801-3');
      expect(formData.itemsData[8].items[0].value.text).to.equal('Simple Variant');
      expect(formData.itemsData[8].items[0].value._displayText).to.be.undefined;
      expect(formData.itemsData[8].items[0].value.data).to.deep.equal({
        dnaChangeTypeList: [
          {text: 'Wild Type', code: 'LA9658-1'},
          {text: 'Deletion', code: 'LA6692-3'},
          {text: 'Duplication', code: 'LA6686-5'},
          {text: 'Insertion', code: 'LA6687-3'},
          {text: 'Insertion/Deletion', code: 'LA6688-1'},
          {text: 'Inversion', code: 'LA6689-9'},
          {text: 'Substitution', code: 'LA6690-7'}
        ],
        variantCodeSystemList: [
          {
            text: 'ClinVar Variants', code: 'CLINVAR-V',
            data: {url: 'https://clinicaltables.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,VariantID'}
          },
          {
            text: 'ClinVar Alleles', code: 'CLINVAR-A',
            data: {url: 'https://clinicaltables.nlm.nih.gov/api/alleles/v3/search?df=Name,AlleleID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,AlleleID'}
          },
          {
            text: 'COSMIC', code: 'cosmic-Smpl',
            data: {url: 'https://clinicaltables.nlm.nih.gov/api/cosmic/v3/search?ef=GeneName:GeneSymbol,MutationAA:NucleotideChange,MutationCDS:AminoAcidChange,MutationGenomePosition:Start&df=Name,MutationID,Site'}
          },
          {text: 'Other variant source', code: 'LA46-8'}
        ]
      });

      // coding system
      expect(formData.itemsData[8].items[1].value.code).to.equal('CLINVAR-V');
      expect(formData.itemsData[8].items[1].value.text).to.equal('ClinVar Variants');
      expect(formData.itemsData[8].items[1].value._displayText).to.be.undefined;
      expect(formData.itemsData[8].items[1].value.data).to.deep.equal({
        url: 'https://clinicaltables.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,VariantID'
      });
    });
  });

  it('can control a item that also controls another item', () => {
    tp.LoadForm.openRxTerms();

    // search a drug
    cy.byId(rxterms.drugName).click().type('aspercreme');
    cy.byId(tp.Autocomp.searchResults).should('be.visible');
    cy.byId(rxterms.drugName).type('{downArrow}').blur().should('have.value', 'ASPERCREME (Topical)');
    // strength is set
    cy.byId(rxterms.strengthAndForm).click().type('{downArrow}').blur()
      .should('have.value', '10% Cream');
    // cui is set
    cy.byId(rxterms.rxcui).should('have.value', '1101827');

    // search another drug
    cy.byId(rxterms.drugName).click().clear().type('ASTELIN');
    cy.byId(tp.Autocomp.searchResults).should('be.visible');
    cy.byId(rxterms.drugName).type('{downArrow}').blur().should('have.value', 'ASTELIN (Nasal)');
    // strength is reset
    cy.byId(rxterms.strengthAndForm).click().type('{downArrow}').blur()
      .should('have.value', '137 mcg/puff Metered dose spray');
    // cui is reset
    cy.byId(rxterms.rxcui).should('have.value', '1797876');

    // clean up the drug field
    cy.byId(rxterms.drugName).click().clear();
    cy.byId(rxterms.strengthAndForm).click(); // need to click this item and then click away to trigger a change in the test
    cy.byId(rxterms.rxcui).click();
    cy.byId(rxterms.drugName).should('have.value', '');
    cy.byId(rxterms.strengthAndForm).click();
    // strength is unset
    cy.byId(rxterms.strengthAndForm).should('have.value', '');
    // cui is unset
    cy.byId(rxterms.rxcui).should('have.value', '');
  });

});
