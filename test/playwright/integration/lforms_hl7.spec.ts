import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys } from '../support/lforms-helpers';

test.describe('HL7 data', () => {
  // USSGFHTVertical field CSS selectors (stripped of leading #)
  const ff = {
    name: '/54126-8/54125-0/1/1',
    name2: '/54126-8/54125-0/1/2',
    name3: '/54126-8/54125-0/1/3',
    btnName: 'add-/54126-8/54125-0/1/1',
    btnName2: 'add-/54126-8/54125-0/1/2',
    btnName3: 'add-/54126-8/54125-0/1/3',
    dob: '/54126-8/21112-8/1/1',
    gender: '/54126-8/54131-8/1/1',
    race: '/54126-8/54134-2/1/1',
    height: '/54126-8/8302-2/1/1',
    weight: '/54126-8/29463-7/1/1',
    disease: '/54126-8/54137-5/54140-9/1/1/1',
    ageAtDiag: '/54126-8/54137-5/54130-0/1/1/1',
    btnDiseasesHist: 'add-/54126-8/54137-5/1/1',
    disease2: '/54126-8/54137-5/54140-9/1/2/1',
    ageAtDiag2: '/54126-8/54137-5/54130-0/1/2/1',
    btnDiseasesHist2: 'add-/54126-8/54137-5/1/2',
    disease3: '/54126-8/54137-5/54140-9/1/3/1',
    ageAtDiag3: '/54126-8/54137-5/54130-0/1/3/1',
    btnDiseasesHist3: 'add-/54126-8/54137-5/1/3',
    fmName: '/54114-4/54138-3/1/1',
    fmDisease: '/54114-4/54117-7/54116-9/1/1/1',
    btnAnotherFamily: 'add-/54114-4/1',
    btnAnotherDiseasesHist: 'add-/54114-4/54117-7/1/1',
    fmName2: '/54114-4/54138-3/2/1',
    fmDisease2: '/54114-4/54117-7/54116-9/2/1/1',
    btnAnotherDiseasesHist2: 'add-/54114-4/54117-7/2/1',
    btnAnotherFamily2: 'add-/54114-4/2',
  };

  // RxTerms field IDs
  const rxterms = {
    drugName: '/X-002/nameAndRoute/1/1',
    strengthAndForm: '/X-002/strengthAndForm/1/1',
  };

  test('should get correct hl7 data', async ({ page }) => {
    await openFormByIndex(page, 1); // USSGFHTVertical

    // ST, repeating
    await byId(page, ff.name).pressSequentially('name1');
    await byId(page, ff.btnName).click();
    await byId(page, ff.name2).pressSequentially('name2');
    await byId(page, ff.btnName2).click();
    await byId(page, ff.name3).pressSequentially('name3');
    await byId(page, ff.btnName3).click();
    await byId(page, ff.name).clear();
    // DT
    await byId(page, ff.dob).locator('input').click();
    await byId(page, ff.dob).locator('input').pressSequentially('10/27/2016');
    await byId(page, ff.dob).locator('input').press('Enter');
    // CWE/CNE - pick 1st item
    await byId(page, ff.gender).click();
    await pressCypressKeys(byId(page, ff.gender), '{downArrow}{enter}');
    // CWE, multiple answers - pick first 2 items
    await byId(page, ff.race).click();
    await pressCypressKeys(byId(page, ff.race), '{downArrow}{enter}{enter}');
    // REAL
    await byId(page, ff.height).pressSequentially('70');
    await byId(page, ff.weight).pressSequentially('170');
    // repeating sub panel
    await byId(page, ff.disease).click();
    await pressCypressKeys(byId(page, ff.disease), '{downArrow}{enter}');
    await pressCypressKeys(byId(page, ff.ageAtDiag), '{downArrow}{downArrow}{enter}');
    await byId(page, ff.btnDiseasesHist).click();

    await expect(byId(page, ff.disease2)).toBeVisible();
    await byId(page, ff.disease2).click();
    await pressCypressKeys(byId(page, ff.disease2), '{downArrow}{downArrow}{enter}');
    await pressCypressKeys(byId(page, ff.ageAtDiag2), '{downArrow}{downArrow}{downArrow}{enter}');
    await byId(page, ff.btnDiseasesHist2).click();

    await byId(page, ff.disease3).click();
    await pressCypressKeys(byId(page, ff.disease3), '{downArrow}{downArrow}{downArrow}{enter}');
    await pressCypressKeys(byId(page, ff.ageAtDiag3), '{downArrow}{downArrow}{downArrow}{downArrow}{enter}');
    await byId(page, ff.btnDiseasesHist3).click();

    // clear up the first instance
    await byId(page, ff.disease).clear();
    await byId(page, ff.disease).blur();
    await byId(page, ff.ageAtDiag).clear();
    await byId(page, ff.ageAtDiag).blur();

    // family member
    await byId(page, ff.fmName).pressSequentially('member name1');
    await pressCypressKeys(byId(page, ff.fmDisease), '{downArrow}{enter}');
    await byId(page, ff.btnAnotherDiseasesHist).click();

    await byId(page, ff.btnAnotherFamily).click();
    await byId(page, ff.fmName2).pressSequentially('member name2');
    await pressCypressKeys(byId(page, ff.fmDisease2), '{downArrow}{downArrow}{enter}');
    await byId(page, ff.btnAnotherDiseasesHist2).click();

    await byId(page, ff.btnAnotherFamily2).click();

    const hl7Data: string = await page.evaluate(() => (window as any).LForms.Util.getFormHL7Data());
    const hl7 = hl7Data.replace(/\r/g, '');
    expect(hl7).toBe('OBR|1|54127-6N^USSG-FHT, (with mock-up items for skip logic demo)^LN|OBX|1|TX|54125-0^Name^LN|1.a|name2|OBX|2|TX|54125-0^Name^LN|1.b|name3|OBX|3|CNE|54131-8^Gender^LN|1|LA2-8^Male^|OBX|4|DT|21112-8^Date of Birth^LN|1|20161027|OBX|5|NM|8302-2^Height^LN|1|70|inches^inches^LN|OBX|6|NM|29463-7^Weight^LN|1|170|lbs^lbs^LN|OBX|7|ST|39156-5^Mock-up item: Body mass index (BMI) [Ratio]^LN|1|24.39|OBX|8|CNE|54134-2^Race^LN|1.a|LA10608-0^American Indian or Alaska Native^LN|OBX|8|CNE|54134-2^Race^LN|1.b|LA6156-9^Asian^LN|OBX|9|CNE|54140-9^Disease or Condition^LN|1.1a|LA10572-8^-- Blood Clot in Leg^LN|OBX|10|CNE|54130-0^Age at Diagnosis^LN|1.1a|LA10394-7^Infancy^LN|OBX|11|CNE|54140-9^Disease or Condition^LN|1.1b|LA10573-6^-- Blood Clot in Lungs^LN|OBX|12|CNE|54130-0^Age at Diagnosis^LN|1.1b|LA10395-4^Childhood^LN|OBX|13|ST|54138-3^Name^LN|2a.a|member name1|OBX|14|CNE|54116-9^Disease or Condition^LN|2a.1a|LA10533-0^Blood Clots^LN|OBX|15|ST|54138-3^Name^LN|2b.a|member name2|OBX|16|CNE|54116-9^Disease or Condition^LN|2b.1a|LA10572-8^-- Blood Clot in Leg^LN|');
  });

  test('should get correct hl7 data for forms without questions in header', async ({ page }) => {
    await openFormByIndex(page, 9); // RxTerms

    const drugNameField = byId(page, rxterms.drugName);
    await drugNameField.click();
    await drugNameField.pressSequentially('aspercreme');
    await page.locator('#lhc-tools-searchResults tr').first().waitFor({ state: 'visible', timeout: 30000 });
    await drugNameField.press('ArrowDown');
    // Click elsewhere to trigger blur/accept
    await byId(page, rxterms.strengthAndForm).click();
    // Verify drug name was selected before checking HL7
    await expect(drugNameField).toHaveValue('ASPERCREME (Topical)');

    const hl7Data: string = await page.evaluate(() => (window as any).LForms.Util.getFormHL7Data());
    const hl7 = hl7Data.replace(/\r/g, '');
    expect(hl7).toBe('OBR|1|X-001^RxTerms Demo^LN|OBX|1|CNE|nameAndRoute^Drug Name^LN|1a|ASPERCREME (Topical)^ASPERCREME (Topical)^|');
  });
});
