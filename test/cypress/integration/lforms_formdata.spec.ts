import {TestPage} from '../support/lforms_testpage.po.js';

describe('formdata: ', () => {
  const tp: TestPage = new TestPage();
  const ff = tp.USSGFHTVertical;

  describe('get form data', () => {
    it('should get a form data with 3 optional parameters.', () => {
      tp.LoadForm.openUSSGFHTVertical();

      // #1 all fields are empty
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData();
        expect(formData.itemsData.length).to.equal(2);
        expect(formData.itemsData[0].items.length).to.equal(13);
        expect(formData.itemsData[0].items[0].value).to.be.undefined; // name
        expect(Object.keys(formData.itemsData[0].items[0]).length).to.equal(10); // name
      });

      cy.byId(ff.name).type('Not Empty');

      // pick the 1st item, centimeters
      cy.byId(ff.gender).click().type('{downArrow}').blur();

      // pick the first 2 items
      cy.byId(ff.race).click().type('{downArrow}').blur();
      cy.byId(ff.race).click().type('{downArrow}').blur();

      cy.byId(ff.height).type('70');
      cy.byId(ff.bmi).should('have.value', '');
      cy.byId(ff.weight).type('170');
      cy.byId(ff.bmi).should('have.value', '24.39');

      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData();
        expect(formData.itemsData.length).to.equal(2);
        expect(formData.itemsData[0].items.length).to.equal(13);
        expect(formData.itemsData[0].items[0].value).to.equal('Not Empty'); // name
        expect(Object.keys(formData.itemsData[0].items[0]).length).to.equal(11); // name
        expect(formData.itemsData[0].items[1].value.text).to.equal('Male'); // gender
        expect(formData.itemsData[0].items[2].value).to.be.undefined; // dob
        expect(formData.itemsData[0].items[6].value).to.equal(70); // height
        expect(formData.itemsData[0].items[8].value).to.equal(170); // weight
        expect(formData.itemsData[0].items[9].value).to.equal('24.39'); // bmi
        expect(formData.itemsData[0].items[10].value.length).to.equal(2); // race
        expect(formData.itemsData[0].items[10].value[0].text).to.equal('American Indian or Alaska Native');
        expect(formData.itemsData[0].items[10].value[1].text).to.equal('Asian');
      });

      // #3 test parameters noFormDefData
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData(null, true);
        expect(formData.itemsData.length).to.equal(2);
        expect(formData.itemsData[0].items.length).to.equal(13);
        expect(formData.itemsData[0].items[0].question).to.be.undefined;
        expect(formData.itemsData[0].items[0].dataType).to.be.undefined;
        expect(Object.keys(formData.itemsData[0].items[0]).length).to.equal(2); // name
      });

      // #4 test parameters noEmptyValue
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData(null, false, true);
        expect(formData.itemsData.length).to.equal(1);
        expect(formData.itemsData[0].items.length).to.equal(6);
      });

      // #5 test parameters noHiddenItem
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData(null, false, false, true);
        expect(formData.itemsData.length).to.equal(2);
        expect(formData.itemsData[0].items.length).to.equal(11);
      });
    });

    it('should assign a boolean value for type BL fields', () => {
      tp.LoadForm.openFullFeaturedForm();

      function checkBoolFieldVal(val) {
        cy.window().then((win) => {
          const boolQuestion = win.LForms.Util.getUserData().itemsData[5];
          expect(boolQuestion.dataType).to.equal('BL');
          expect(boolQuestion.value).to.equal(val);
        });
      }

      checkBoolFieldVal(undefined);
      cy.byId(tp.FullFeaturedForm.booleanField).click();
      checkBoolFieldVal(true);
      cy.byId(tp.FullFeaturedForm.booleanField).click();
      checkBoolFieldVal(false);
    });

    it('should be able to get the complete form definition data and reset the form with the retrieved data', () => {
      tp.LoadForm.openUSSGFHTVertical();
      cy.byId(ff.name).type('Not Empty');

      // pick the 1st item
      cy.byId(ff.gender).type('{downArrow}').blur();
      cy.byId(ff.name).should('be.visible');
      cy.byId(ff.gender).should('have.value', 'Male');
      cy.byId(ff.height).type('70').should('have.value', '70');
      cy.byId(ff.weight).type('170');
      cy.byId(ff.bmi).should('have.value', '24.39');

      // check the data directly
      cy.window().then((win) => {
        const formData = win.LForms.Util.getFormData();
        expect(formData.code).to.equal('54127-6N');
        expect(formData.name).to.equal('USSG-FHT, (with mock-up items for skip logic demo)');
        expect(formData.template).to.equal('table');
        expect(formData.items[0].question).to.equal('Your health information');
        expect(formData.items[0].questionCode).to.equal('54126-8');
        expect(formData.items[0].header).to.be.true;
        expect(formData.items[0].items.length).to.equal(13);
        expect(formData.items[0].items[0].dataType).to.equal('TX');
        expect(formData.items[0].items[0].question).to.equal('Name');
        expect(formData.items[0].items[0].questionCode).to.equal('54125-0');
        expect(formData.items[0].items[0].value).to.equal('Not Empty');
        expect(formData.items[0].items[1].value.code).to.equal('LA2-8');
        expect(formData.items[0].items[1].value.text).to.equal('Male');
        expect(formData.items[0].items[6].value).to.equal(70);
        expect(formData.items[0].items[6].unit.name).to.equal('inches');
        expect(formData.items[0].items[8].value).to.equal(170);
        expect(formData.items[0].items[8].unit.name).to.equal('lbs');
        expect(formData.items[0].items[9].value).to.equal('24.39');
        expect(formData.items[1].items.length).to.equal(9);
      });

      // reset the form
      cy.byId('reset-form-with-same-data').click();
      // changed in reset function to be 'after reset', was 'Not Empty'
      cy.byId(ff.name).should('have.value', 'after reset');
      cy.byId(ff.gender).should('have.value', 'Male');
      cy.byId(ff.height).should('have.value', '70');
      cy.byId(ff.weight).should('have.value', '170');
      cy.byId(ff.bmi).should('have.value', '24.39');

      // check the data again, directly
      cy.window().then((win) => {
        const formData = win.LForms.Util.getFormData();
        expect(formData.code).to.equal('54127-6N');
        expect(formData.name).to.equal('USSG-FHT, (with mock-up items for skip logic demo)');
        expect(formData.template).to.equal('table');
        expect(formData.items[0].question).to.equal('Your health information');
        expect(formData.items[0].questionCode).to.equal('54126-8');
        expect(formData.items[0].header).to.be.true;
        expect(formData.items[0].items.length).to.equal(13);
        expect(formData.items[0].items[0].dataType).to.equal('TX');
        expect(formData.items[0].items[0].question).to.equal('Name');
        expect(formData.items[0].items[0].questionCode).to.equal('54125-0');
        expect(formData.items[0].items[0].value).to.equal('after reset');
        expect(formData.items[0].items[1].value.code).to.equal('LA2-8');
        expect(formData.items[0].items[1].value.text).to.equal('Male');
        expect(formData.items[0].items[6].value).to.equal(70);
        expect(formData.items[0].items[6].unit.name).to.equal('inches');
        expect(formData.items[0].items[8].value).to.equal(170);
        expect(formData.items[0].items[8].unit.name).to.equal('lbs');
        expect(formData.items[0].items[9].value).to.equal('24.39');
        expect(formData.items[1].items.length).to.equal(9);
      });
    });

    it('should not get any data with empty values when the noEmptyValue parameter is used', () => {
      tp.LoadForm.openFullFeaturedForm();

      // only three fields have data
      cy.window().then((win) => {
        const formData = win.LForms.Util.getFormData(null, true, true);
        expect(formData.items.length).to.equal(5);
        expect(formData.items[2].question).to.equal('With data type CNE');
        expect(formData.items[2].value).to.deep.equal({code: 'c2', other: null, text: 'Answer 2'});
      });
    });
  });

  describe('defaultAnswer', () => {
    it('should work for various data types', () => {
      tp.LoadForm.openDefaultAnswerForm();
      cy.byId('/blField/1').should('be.visible')
        .find('button').should('have.class', 'ant-switch-checked');

      cy.byId('/intField/1').should('have.value', '24');
      cy.byId('/decField/1').should('have.value', '3.14159');
      cy.byId('/strField/1').should('have.value', 'Green');

      // Test date field default (with value of "t" -- today)
      const now = new Date();

      /**
       *  Returns a string version of the given number, zero padded on the left to
       *  be at least two characters.
       */
      function zeroPad(num) {
        let rtn = '' + num;
        if (rtn.length === 1) {
          rtn = '0' + rtn;
        }
        return rtn;
      }

      const today = zeroPad(now.getMonth() + 1) + '/' + zeroPad(now.getDate()) + '/' + now.getFullYear();
      const isoToday = now.getFullYear() + '-' + zeroPad(now.getMonth() + 1) + '-' + zeroPad(now.getDate());
      cy.byId('/dateField/1').find('input').should('have.value', today);
      cy.byId('/ansLabelDefault/1').should('have.value', 'ii. Blue');
      cy.byId('/ansCodeDefault/1').should('have.value', 'ii. Blue');
      cy.byId('/ansCodeDefaultNoLabel/1').should('have.value', 'Blue');

      // Check a radio button question
      const radioQCode = '#\\/radioAnsCodeDefault\\/1';
      cy.get(radioQCode + 'R input').should('not.be.checked');
      cy.get(radioQCode + 'B input').should('be.checked');
      cy.get(radioQCode + 'G input').should('not.be.checked');

      // Check a radio button question whose answers do not have labels
      const radioQCodeNL = '#\\/radioAnsCodeDefaultNoLabel\\/1';
      cy.get(radioQCodeNL + 'R input').should('not.be.checked');
      cy.get(radioQCodeNL + 'B input').should('be.checked');
      cy.get(radioQCodeNL + 'G input').should('not.be.checked');

      // Test a check box question
      const cbQCode = '#\\/checkBoxAnsCodeDefault\\/1';
      cy.get(cbQCode + 'R input').should('not.be.checked');
      cy.get(cbQCode + 'B input').should('be.checked');
      cy.get(cbQCode + 'G input').should('not.be.checked');

      // Check a multi-select list
      const multiSelID = '/multiSelAnsCodeDefault/1';
      cy.byId(multiSelID).should('have.value', '')
        .then((x) => {
          const codes = x[0].autocomp.getSelectedCodes();
          expect(codes.length).to.equal(1);
          expect(codes[0]).to.equal('B');
          const items = x[0].autocomp.getSelectedItems();
          expect(items.length).to.equal(1);
          expect(items[0]).to.equal('ii. Blue');
        });

      // Also test specifying by answer text, to preserve the current behavior,
      // even though that is not in the LHC-Forms form specification.
      cy.byId('/ansTextDefault/1').should('have.value', 'Blue');

      // Also test the date field default in the templateOptions, to make sure
      // those are getting processed.
      // NEXT: no templateOption fields
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData(null, false, true);
        expect(formData.itemsData.length).to.equal(13);
        expect(formData.itemsData[0].value).to.be.true;
        expect(formData.itemsData[1].value).to.equal(24);
        expect(formData.itemsData[2].value).to.equal(3.14159);
        expect(formData.itemsData[3].value).to.equal('Green');
        expect(formData.itemsData[4].value).to.equal(isoToday);
        expect(formData.itemsData[5].value).to.deep.equal({text: 'Blue', code: 'B', label: 'ii'});
        expect(formData.itemsData[6].value).to.deep.equal({text: 'Blue', code: 'B', label: 'ii'});
        expect(formData.itemsData[7].value).to.deep.equal({text: 'Blue', code: 'B'});
        expect(formData.itemsData[8].value).to.deep.equal({text: 'Blue', code: 'B', label: 'ii'});
        expect(formData.itemsData[9].value).to.deep.equal([{text: 'Blue', code: 'B', label: 'ii'}]);
        expect(formData.itemsData[10].value).to.deep.equal({text: 'Blue', code: 'B'});
        expect(formData.itemsData[11].value).to.deep.equal([{text: 'Blue', code: 'B', label: 'ii'}]);
        expect(formData.itemsData[12].value).to.deep.equal({text: 'Blue', code: 'B'});
      });
    });

    it('should not be reset after they are cleared', () => {
      tp.LoadForm.openDefaultAnswerForm();
      // tslint:disable-next-line:one-variable-per-declaration
      const intField = '/intField/1',
        decField = '/decField/1',
        strField = '/strField/1',
        listField = '/ansCodeDefault/1',
        btnAddStringField = 'add-/strField/1';

      cy.byId(intField).clear();
      cy.byId(decField).clear();
      cy.byId(strField).clear();
      cy.byId(listField).clear();
      cy.byId(btnAddStringField).click();

      cy.byId(intField).should('have.value', '');
      cy.byId(decField).should('have.value', '');
      cy.byId(strField).should('have.value', '');
      cy.byId(listField).should('have.value', '');
    });
  });

  describe('lists with headings', () => {
    it('should style the heading items', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/listWHeaders/1').click();
      cy.get('#searchResults li').eq(0).should('have.class', 'heading');
    });
  });

  describe('item.prefix', () => {
    it('should be displayed', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/type0/1').should('exist');
      cy.byId('label-/with_prefix/1').should('have.text', 'Prefix A:Question display text ');
      cy.byId('col/horizontalTable/colA/1/1').should('have.text', 'Pre. A:A ST ');
    });
  });
});
