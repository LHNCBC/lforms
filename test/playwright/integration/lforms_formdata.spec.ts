import { test, expect } from '@playwright/test';
import { byId, openFormByIndex, pressCypressKeys, answerId, waitForLFormsReady, loadFromTestData } from '../support/lforms-helpers';

test.describe('formdata', () => {

  test.describe('get form data', () => {
    test('should get a form data with 3 optional parameters', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      const name = byId(page, '/54126-8/54125-0/1/1');
      const gender = byId(page, '/54126-8/54131-8/1/1');
      const race = byId(page, '/54126-8/54134-2/1/1');
      const height = byId(page, '/54126-8/8302-2/1/1');
      const weight = byId(page, '/54126-8/29463-7/1/1');
      const bmi = byId(page, '/54126-8/39156-5/1/1');

      // #1 all fields are empty
      let formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(13);
      expect(formData.itemsData[0].items[0].value).toBeUndefined(); // name
      expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(10); // name

      await name.pressSequentially('Not Empty');
      // pick the 1st item, centimeters
      await gender.click();
      await pressCypressKeys(gender, '{downArrow}');
      await gender.blur();
      // pick the first 2 items
      await race.click();
      await pressCypressKeys(race, '{downArrow}');
      await race.blur();
      await race.click();
      await pressCypressKeys(race, '{downArrow}');
      await race.blur();
      await height.pressSequentially('70');
      await expect(bmi).toHaveValue('');
      await weight.pressSequentially('170');
      await expect(bmi).toHaveValue('24.39');

      formData = await page.evaluate(() => (window as any).LForms.Util.getUserData());
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(13);
      expect(formData.itemsData[0].items[0].value).toBe('Not Empty'); // name
      expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(11); // name
      expect(formData.itemsData[0].items[1].value.text).toBe('Male'); // gender
      expect(formData.itemsData[0].items[2].value).toBeUndefined(); // dob
      expect(formData.itemsData[0].items[6].value).toBe(70); // height
      expect(formData.itemsData[0].items[8].value).toBe(170); // weight
      expect(formData.itemsData[0].items[9].value).toBe('24.39'); // bmi
      expect(formData.itemsData[0].items[10].value.length).toBe(2); // race
      expect(formData.itemsData[0].items[10].value[0].text).toBe('American Indian or Alaska Native');
      expect(formData.itemsData[0].items[10].value[1].text).toBe('Asian');

      // #3 test parameters noFormDefData
      formData = await page.evaluate(() => (window as any).LForms.Util.getUserData(null, true));
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(13);
      expect(formData.itemsData[0].items[0].question).toBeUndefined();
      expect(formData.itemsData[0].items[0].dataType).toBeUndefined();
      expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(2); // name

      // #4 test parameters noEmptyValue
      formData = await page.evaluate(() => (window as any).LForms.Util.getUserData(null, false, true));
      expect(formData.itemsData.length).toBe(1);
      expect(formData.itemsData[0].items.length).toBe(6);

      // #5 test parameters noHiddenItem
      formData = await page.evaluate(() => (window as any).LForms.Util.getUserData(null, false, false, true));
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(11);
    });

    test('should assign a boolean value for type BL fields', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm

      async function checkBoolFieldVal(val: boolean | undefined) {
        const result = await page.evaluate(() => {
          const boolQuestion = (window as any).LForms.Util.getUserData().itemsData[5];
          return { dataType: boolQuestion.dataType, value: boolQuestion.value };
        });
        expect(result.dataType).toBe('BL');
        expect(result.value).toBe(val);
      }

      await checkBoolFieldVal(undefined);
      await byId(page, answerId('#/type1/1', 'true')).click();
      await checkBoolFieldVal(true);
      await byId(page, answerId('#/type1/1', 'false')).click();
      await checkBoolFieldVal(false);
    });

    test('should be able to get the complete form definition data and reset the form with the retrieved data', async ({ page }) => {
      await openFormByIndex(page, 1); // USSGFHTVertical
      const name = byId(page, '/54126-8/54125-0/1/1');
      const gender = byId(page, '/54126-8/54131-8/1/1');
      const height = byId(page, '/54126-8/8302-2/1/1');
      const weight = byId(page, '/54126-8/29463-7/1/1');
      const bmi = byId(page, '/54126-8/39156-5/1/1');

      await name.pressSequentially('Not Empty');
      // pick the 1st item
      await gender.clear();
      await pressCypressKeys(gender, '{downArrow}');
      await gender.blur();
      await expect(name).toBeVisible();
      await expect(gender).toHaveValue('Male');
      await height.pressSequentially('70');
      await expect(height).toHaveValue('70');
      await weight.pressSequentially('170');
      await expect(bmi).toHaveValue('24.39');

      // check the data directly
      let formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
      expect(formData.code).toBe('54127-6N');
      expect(formData.name).toBe('USSG-FHT, (with mock-up items for skip logic demo)');
      expect(formData.template).toBe('table');
      expect(formData.items[0].question).toBe('Your health information');
      expect(formData.items[0].questionCode).toBe('54126-8');
      expect(formData.items[0].header).toBe(true);
      expect(formData.items[0].items.length).toBe(13);
      expect(formData.items[0].items[0].dataType).toBe('TX');
      expect(formData.items[0].items[0].question).toBe('Name');
      expect(formData.items[0].items[0].questionCode).toBe('54125-0');
      expect(formData.items[0].items[0].value).toBe('Not Empty');
      expect(formData.items[0].items[1].value.code).toBe('LA2-8');
      expect(formData.items[0].items[1].value.text).toBe('Male');
      expect(formData.items[0].items[6].value).toBe(70);
      expect(formData.items[0].items[6].unit.name).toBe('inches');
      expect(formData.items[0].items[8].value).toBe(170);
      expect(formData.items[0].items[8].unit.name).toBe('lbs');
      expect(formData.items[0].items[9].value).toBe('24.39');
      expect(formData.items[1].items.length).toBe(9);

      // reset the form
      await page.click('#reset-form-with-same-data');
      // changed in reset function to be 'after reset', was 'Not Empty'
      await expect(name).toHaveValue('after reset');
      await expect(gender).toHaveValue('Male');
      await expect(height).toHaveValue('70');
      await expect(weight).toHaveValue('170');
      await expect(bmi).toHaveValue('24.39');

      // check the data again, directly
      formData = await page.evaluate(() => (window as any).LForms.Util.getFormData());
      expect(formData.code).toBe('54127-6N');
      expect(formData.items[0].items[0].value).toBe('after reset');
      expect(formData.items[0].items[1].value.code).toBe('LA2-8');
      expect(formData.items[0].items[1].value.text).toBe('Male');
      expect(formData.items[0].items[6].value).toBe(70);
      expect(formData.items[0].items[6].unit.name).toBe('inches');
      expect(formData.items[0].items[8].value).toBe(170);
      expect(formData.items[0].items[8].unit.name).toBe('lbs');
      expect(formData.items[0].items[9].value).toBe('24.39');
      expect(formData.items[1].items.length).toBe(9);
    });

    test('should not get any data with empty values when the noEmptyValue parameter is used', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm

      // only three fields have data
      const formData = await page.evaluate(() => (window as any).LForms.Util.getFormData(null, true, true));
      expect(formData.items.length).toBe(5);
      expect(formData.items[2].question).toBe('With data type CNE');
      expect(formData.items[2].value).toEqual({code: 'c2', other: null, text: 'Answer 2'});
    });
  });

  test.describe('defaultAnswer', () => {
    test('should work for various data types', async ({ page }) => {
      await openFormByIndex(page, 17); // DefaultAnswerForm
      await expect(byId(page, answerId('/blField/1', 'true')).locator('input')).toBeChecked();
      await expect(byId(page, '/intField/1')).toHaveValue('24');
      await expect(byId(page, '/decField/1')).toHaveValue('3.14159');
      await expect(byId(page, '/strField/1')).toHaveValue('Green');

      // Test date field default (with value of "t" -- today)
      const now = new Date();
      /**
       *  Returns a string version of the given number, zero padded on the left to
       *  be at least two characters.
       */
      function zeroPad(num: number) {
        let rtn = '' + num;
        if (rtn.length === 1) rtn = '0' + rtn;
        return rtn;
      }
      const today = zeroPad(now.getMonth() + 1) + '/' + zeroPad(now.getDate()) + '/' + now.getFullYear();
      const isoToday = now.getFullYear() + '-' + zeroPad(now.getMonth() + 1) + '-' + zeroPad(now.getDate());
      await expect(byId(page, '/dateField/1').locator('input')).toHaveValue(today);
      await expect(byId(page, '/ansLabelDefault/1')).toHaveValue('ii. Blue');
      await expect(byId(page, '/ansCodeDefault/1')).toHaveValue('ii. Blue');
      await expect(byId(page, '/ansCodeDefaultNoLabel/1')).toHaveValue('Blue');

      // Check a radio button question
      await expect(byId(page, answerId('#/radioAnsCodeDefault/1', undefined, 'R')).locator('input')).not.toBeChecked();
      await expect(byId(page, answerId('#/radioAnsCodeDefault/1', undefined, 'B')).locator('input')).toBeChecked();
      await expect(byId(page, answerId('#/radioAnsCodeDefault/1', undefined, 'G')).locator('input')).not.toBeChecked();

      // Check a radio button question whose answers do not have labels
      await expect(byId(page, answerId('#/radioAnsCodeDefaultNoLabel/1', undefined, 'R')).locator('input')).not.toBeChecked();
      await expect(byId(page, answerId('#/radioAnsCodeDefaultNoLabel/1', undefined, 'B')).locator('input')).toBeChecked();
      await expect(byId(page, answerId('#/radioAnsCodeDefaultNoLabel/1', undefined, 'G')).locator('input')).not.toBeChecked();

      // Test a check box question
      await expect(byId(page, answerId('#/checkBoxAnsCodeDefault/1', undefined, 'R')).locator('input')).not.toBeChecked();
      await expect(byId(page, answerId('#/checkBoxAnsCodeDefault/1', undefined, 'B')).locator('input')).toBeChecked();
      await expect(byId(page, answerId('#/checkBoxAnsCodeDefault/1', undefined, 'G')).locator('input')).not.toBeChecked();

      // Check a multi-select list
      const multiSelField = byId(page, '/multiSelAnsCodeDefault/1');
      await expect(multiSelField).toHaveValue('');
      const multiSelResult = await multiSelField.evaluate(el => {
        const codes = (el as any).autocomp.getSelectedCodes();
        const items = (el as any).autocomp.getSelectedItems();
        return { codes, items };
      });
      expect(multiSelResult.codes.length).toBe(1);
      expect(multiSelResult.codes[0]).toBe('B');
      expect(multiSelResult.items.length).toBe(1);
      expect(multiSelResult.items[0]).toBe('ii. Blue');

      // Also test specifying by answer text, to preserve the current behavior,
      // even though that is not in the LHC-Forms form specification.
      await expect(byId(page, '/ansTextDefault/1')).toHaveValue('Blue');

      // Also test the date field default in the templateOptions, to make sure
      // those are getting processed.
      // NEXT: no templateOption fields
      // Check form data values
      const formData = await page.evaluate(() => (window as any).LForms.Util.getUserData(null, false, true));
      expect(formData.itemsData.length).toBe(13);
      expect(formData.itemsData[0].value).toBe(true);
      expect(formData.itemsData[1].value).toBe(24);
      expect(formData.itemsData[2].value).toBe(3.14159);
      expect(formData.itemsData[3].value).toBe('Green');
      expect(formData.itemsData[4].value).toBe(isoToday);
      expect(formData.itemsData[5].value).toEqual({text: 'Blue', code: 'B', label: 'ii'});
      expect(formData.itemsData[6].value).toEqual({text: 'Blue', code: 'B', label: 'ii'});
      expect(formData.itemsData[7].value).toEqual({text: 'Blue', code: 'B'});
      expect(formData.itemsData[8].value).toEqual({text: 'Blue', code: 'B', label: 'ii'});
      expect(formData.itemsData[9].value).toEqual([{text: 'Blue', code: 'B', label: 'ii'}]);
      expect(formData.itemsData[10].value).toEqual({text: 'Blue', code: 'B'});
      expect(formData.itemsData[11].value).toEqual([{text: 'Blue', code: 'B', label: 'ii'}]);
      expect(formData.itemsData[12].value).toEqual({text: 'Blue', code: 'B'});
    });

    test('should not be reset after they are cleared', async ({ page }) => {
      await openFormByIndex(page, 17); // DefaultAnswerForm
      const intField = byId(page, '/intField/1');
      const decField = byId(page, '/decField/1');
      const strField = byId(page, '/strField/1');
      const listField = byId(page, '/ansCodeDefault/1');

      await intField.clear();
      await decField.clear();
      await strField.clear();
      await listField.clear();
      await byId(page, 'add-/strField/1').click();

      await expect(intField).toHaveValue('');
      await expect(decField).toHaveValue('');
      await expect(strField).toHaveValue('');
      await expect(listField).toHaveValue('');
    });
  });

  test.describe('lists with headings', () => {
    test('should style the heading items', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await byId(page, '/listWHeaders/1').click();
      await expect(page.locator('#lhc-tools-searchResults li').nth(0)).toHaveClass(/heading/);
    });
  });

  test.describe('item.prefix', () => {
    test('should be displayed', async ({ page }) => {
      await openFormByIndex(page, 4); // FullFeaturedForm
      await expect(byId(page, '/type0/1')).toBeAttached();
      await expect(byId(page, 'label-/with_prefix/1')).toHaveText('Prefix A:Question display text');
      await expect(byId(page, 'col/horizontalTable/colA/1/1')).toHaveText('Pre. A:A ST');
    });
  });
});
