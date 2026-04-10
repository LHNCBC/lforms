import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';

test.describe('data control', () => {

  test('data change on source field should update target fields', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const dcSource = byId(page, '/dataControlExamples/itemWithExtraData/1/1');
    const dcTarget1 = byId(page, '/dataControlExamples/controlledItem_LIST/1/1');
    const dcTarget2 = byId(page, '/dataControlExamples/controlledItem_TEXT/1/1');
    const searchResults = page.locator('#lhc-tools-searchResults');

    await dcSource.pressSequentially('Haloperidol');
    await expect(searchResults).toBeVisible();
    await pressCypressKeys(dcSource, '{downArrow}');
    await dcSource.blur();
    await expect(dcSource).toHaveValue('Haloperidol (Oral Pill)');

    await dcTarget1.click();
    await pressCypressKeys(dcTarget1, '{downArrow}{downArrow}');
    await dcTarget1.blur();
    await expect(dcTarget1).toHaveValue('1 mg Tab');

    const dcTarget2Val = (await dcTarget2.inputValue()).trim();
    expect(dcTarget2Val).toBe('0.5 mg Tab');

    // pick a different value on source field
    await dcSource.clear();
    await dcSource.pressSequentially('Haloperidol');
    await expect(searchResults).toBeVisible();
    await pressCypressKeys(dcSource, '{downArrow}{downArrow}');
    await dcSource.blur();
    await expect(dcSource).toHaveValue('Haloperidol (Injectable)');

    await dcTarget1.click();
    await pressCypressKeys(dcTarget1, '{downArrow}{downArrow}{downArrow}');
    await dcTarget1.blur();
    await expect(dcTarget1).toHaveValue('5 mg/ml Sol');

    const dcTarget2Val2 = (await dcTarget2.inputValue()).trim();
    expect(dcTarget2Val2).toBe('5 mg/ml Injection 1 ml');
  });

  test('can control questionCardinality of a horizontal table', async ({ page }) => {
    await openFormByIndex(page, 4); // FullFeaturedForm
    const src = byId(page, '/cardinalityControl/1');
    const btnAdd1 = byId(page, 'add-/horizontalTable/1');
    const btnAdd2 = byId(page, 'add-/horizontalTable/2');
    const btnDel1 = byId(page, 'del-/horizontalTable/1');
    const btnDel2 = byId(page, 'del-/horizontalTable/2');
    const field1 = byId(page, '/horizontalTable/colA/1/1');
    const field2 = byId(page, '/horizontalTable/colA/2/1');

    // initially a non-repeating table, no 'add' buttons
    await expect(btnAdd1).not.toBeAttached();
    await expect(field1).toBeVisible();
    await expect(field2).not.toBeAttached();

    // make it repeating
    await src.click();
    await pressCypressKeys(src, '{downArrow}{downArrow}');
    await src.blur();
    await expect(btnAdd1).toBeVisible();

    await expect(btnAdd2).not.toBeAttached();
    await expect(btnDel1).not.toBeAttached();
    await expect(btnDel2).not.toBeAttached();
    await expect(btnAdd1).toContainText('+ A non-repeating horizontal table');

    // 'add' button works
    await btnAdd1.click();
    await expect(btnAdd1).toBeVisible();
    await expect(btnAdd2).not.toBeAttached();

    await expect(btnDel1).toBeVisible();
    await expect(btnDel2).toBeVisible();
    await expect(btnAdd1).toContainText('+ A non-repeating horizontal table');
    await expect(field1).toBeVisible();
    await expect(field2).toBeVisible();

    // 'del' button works
    await btnDel1.click();
    await expect(btnAdd2).toBeVisible();
    await expect(btnAdd1).not.toBeAttached();

    await expect(btnDel1).not.toBeAttached();
    await expect(btnDel2).not.toBeAttached();
    await expect(field1).not.toBeAttached();
    await expect(field2).toBeVisible();

    // change back to non-repeating table
    await src.click();
    await pressCypressKeys(src, '{downArrow}');
    await src.blur();
    await expect(btnAdd1).not.toBeAttached();
    await expect(btnAdd2).not.toBeAttached();
    await expect(btnDel1).not.toBeAttached();
    await expect(btnDel2).not.toBeAttached();
    await expect(field1).not.toBeAttached();
    await expect(field2).toBeVisible();
  });

  test('can control answerCardinality of an item with answer list', async ({ page }) => {
    await page.goto('/test/pages/lforms_testpage.html');
    await waitForLFormsReady(page);

    await loadFromTestData(page, 'dataControl-answerCardinality.json');
    const src = byId(page, '/cardinalityControl/1');
    const dst = byId(page, '/test_changing_repeats/1');

    // initially no repeats
    await dst.scrollIntoViewIfNeeded();
    // pick an answer
    // strength is reset
    await dst.click();
    await pressCypressKeys(dst, '{downArrow}');
    await dst.blur();
    await expect(dst).toHaveValue('Answer 1');

    // make it repeating
    await src.click();
    await pressCypressKeys(src, '{downArrow}{downArrow}');
    await src.blur();
    await expect(byId(page, 'item-/test_changing_repeats/1').locator('span.autocomp_selected li').nth(0)).toHaveText('×Answer 1');

    // add another answer
    await dst.click();
    await pressCypressKeys(dst, '{downArrow}');
    await dst.blur();
    const selectedItems = byId(page, 'item-/test_changing_repeats/1').locator('span.autocomp_selected li');
    await expect(selectedItems.nth(0)).toHaveText('×Answer 1');
    await expect(selectedItems.nth(1)).toHaveText('×Answer 2');

    // change back to non-repeating table
    await src.click();
    await pressCypressKeys(src, '{downArrow}');
    await src.blur();
    await expect(dst).toHaveValue('Answer 1');
  });

  test('saved item value should be displayed when the value contains extra data for data controls', async ({ page }) => {
    await openFormByIndex(page, 19); // NewGeneticForm

    await expect(byId(page, '/81250-3/83005-9/1/1')).toHaveValue('Simple Variant');
    await expect(byId(page, '/81250-3/82122-3/1/1')).toHaveValue('ClinVar Variants');

    const formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());

    // category
    expect(formData.itemsData[8].items[0].value.code).toBe('LA26801-3');
    expect(formData.itemsData[8].items[0].value.text).toBe('Simple Variant');
    expect(formData.itemsData[8].items[0].value._displayText).toBeUndefined();
    expect(formData.itemsData[8].items[0].value.data).toEqual({
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
    expect(formData.itemsData[8].items[1].value.code).toBe('CLINVAR-V');
    expect(formData.itemsData[8].items[1].value.text).toBe('ClinVar Variants');
    expect(formData.itemsData[8].items[1].value._displayText).toBeUndefined();
    expect(formData.itemsData[8].items[1].value.data).toEqual({
      url: 'https://clinicaltables.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,VariantID'
    });
  });

  test('can control a item that also controls another item', async ({ page }) => {
    await openFormByIndex(page, 9); // RxTerms
    const drugName = byId(page, '/X-002/nameAndRoute/1/1');
    const strengthAndForm = byId(page, '/X-002/strengthAndForm/1/1');
    const rxcui = byId(page, '/X-002/RxCUI/1/1');
    const searchResults = page.locator('#lhc-tools-searchResults');

    // search a drug
    await drugName.click();
    await drugName.pressSequentially('aspercreme');
    await expect(searchResults).toBeVisible();
    await pressCypressKeys(drugName, '{downArrow}');
    await drugName.blur();
    await expect(drugName).toHaveValue('ASPERCREME (Topical)');
    // strength is set
    await strengthAndForm.click();
    await pressCypressKeys(strengthAndForm, '{downArrow}');
    await strengthAndForm.blur();
    await expect(strengthAndForm).toHaveValue('10% Cream');
    // cui is set
    await expect(rxcui).toHaveValue('1101827');

    // search another drug
    await drugName.click();
    await drugName.clear();
    await drugName.pressSequentially('AS');
    await expect(searchResults).toBeVisible();
    await pressCypressKeys(drugName, '{downArrow}{enter}');
    await drugName.blur();
    expect(await drugName.inputValue()).not.toBe('');
    // strength is reset
    await strengthAndForm.click();
    await pressCypressKeys(strengthAndForm, '{downArrow}{enter}');
    await strengthAndForm.blur();
    expect(await strengthAndForm.inputValue()).not.toBe('');
    // cui is reset
    expect(await rxcui.inputValue()).not.toBe('');

    // clean up the drug field
    await drugName.click();
    await drugName.clear();
    await strengthAndForm.click(); // need to click this item and then click away to trigger a change
    await rxcui.click();
    await expect(drugName).toHaveValue('');
    await strengthAndForm.click();
    // strength is unset
    await expect(strengthAndForm).toHaveValue('');
    // cui is unset
    await expect(rxcui).toHaveValue('');
  });

});
