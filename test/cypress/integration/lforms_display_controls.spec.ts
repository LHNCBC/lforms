import {TestPage} from '../support/lforms_testpage.po.js';

describe('display controls demo', () => {
  const tp: TestPage = new TestPage();

  it('should show values as selected radio buttons/checkboxes', () => {
    tp.LoadForm.openDisplayControlsDemo();

    cy.byId('/q1a/1c2').find('input').should('exist').should('not.be.checked');
    cy.byId('/q1a/1c3').find('input').should('be.checked');
    cy.byId('/q1c/1c2').find('input').should('be.checked');
    cy.byId('/q1c/1c3').find('input').should('be.checked');
  });

  it('displays 4 different types of answer layouts', () => {
    tp.LoadForm.openDisplayControlsDemo();

    // tslint:disable-next-line:one-variable-per-declaration
    const item1answer1 = '/q1a/1c1',
      item1answer3 = '/q1a/1c3',
      item2answer1 = '/q1b/1c1',
      item2Other = '/q1b/1_other',
      item2OtherValue = '/q1b/1_otherValue',

      item3answer1 = '/q1c/1c1',
      item3answer3 = '/q1c/1c3',
      item4answer1 = '/q1d/1c1',
      item4Other = '/q1d/1_other',
      item4OtherValue = '/q1d/1_otherValue';

    cy.byId(item1answer1).should('be.visible');
    cy.byId(item4answer1).should('be.visible');

    // first answer list
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items.length).to.equal(10);
      expect(formData.items[1].value.code).to.equal('c3');
      expect(formData.items[1].value.text).to.equal('Extra long answer text 123456789 Answer Z');
    });

    cy.byId(item1answer1).find('input').click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[1].value.code).to.equal('c1');
      expect(formData.items[1].value.text).to.equal('Extra long answer text 123456789 Answer X');
    });

    cy.byId(item1answer3).find('input').click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[1].value.code).to.equal('c3');
      expect(formData.items[1].value.text).to.equal('Extra long answer text 123456789 Answer Z');

      // second answer list
      expect(formData.items[2].value == null).to.be.true;
    });

    cy.byId(item2answer1).find('input').click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[2].value.code).to.equal('c1');
      expect(formData.items[2].value.text).to.equal('Long answer text 123 Answer X');
    });

    cy.byId(item2Other).find('input').click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[2].value.code == null).to.be.true; // allow undefined (Chrome)
      expect(formData.items[2].value.text == null).to.be.true; // allow undefined (Chrome)
    });

    cy.byId(item2OtherValue).type('other values');
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[2].value.code).to.be.undefined;
      expect(formData.items[2].value.text).to.equal('other values');
    });

    cy.byId(item2OtherValue).clear().type('other values again');
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[2].value.code).to.be.undefined;
      expect(formData.items[2].value.text).to.equal('other values again');

      // third answer list
      expect(formData.items[3].value).to.deep.equal([{code: 'c2', text: 'Answer Y'},
        {code: 'c3', text: 'Answer Z'}]); // default values
    });

    cy.byId(item3answer1).click(); // appends first answer
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[3].value).to.deep.equal([{code: 'c1', text: 'Answer X'},
        {code: 'c2', text: 'Answer Y'}, {code: 'c3', text: 'Answer Z'}]);
    });

    cy.byId(item3answer3).click(); // deselects third answer
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[3].value).to.deep.equal([{code: 'c1', text: 'Answer X'},
        {code: 'c2', text: 'Answer Y'}]);

      // fourth answer list
      expect(formData.items[4].value).to.be.undefined;
    });

    cy.byId(item4answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[4].value).to.deep.equal([{code: 'c1', text: 'Answer X'}]);
    });

    cy.byId(item4Other).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[4].value[0]).to.deep.equal({code: 'c1', text: 'Answer X'});
      expect(formData.items[4].value[1].code == null).to.be.true; // allow undefined
      expect(formData.items[4].value[1].text == null).to.be.true; // allow undefined
    });

    cy.byId(item4OtherValue).type('other values');
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[4].value.length).to.equal(2);
      expect(formData.items[4].value[0].code).to.equal('c1');
      expect(formData.items[4].value[0].text).to.equal('Answer X');
      expect(formData.items[4].value[1].code).to.be.undefined;
      expect(formData.items[4].value[1].text).to.equal('other values');
    });

    // change the other value alone will update the data model when the checkbox is checked.
    cy.byId(item4OtherValue).clear().type('other values again');
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[4].value.length).to.equal(2);
      expect(formData.items[4].value[0].code).to.equal('c1');
      expect(formData.items[4].value[0].text).to.equal('Answer X');
      expect(formData.items[4].value[1].code).to.be.undefined;
      expect(formData.items[4].value[1].text).to.equal('other values again');

      // other model values are not changed
      expect(formData.items[1].value.code).to.equal('c3');
      expect(formData.items[1].value.text).to.equal('Extra long answer text 123456789 Answer Z');

      expect(formData.items[2].value.code).to.be.undefined;
      expect(formData.items[2].value.text).to.equal('other values again');

      expect(formData.items[3].value).to.deep.equal([{code: 'c1', text: 'Answer X'},
        {code: 'c2', text: 'Answer Y'}]);
    });
  });

  it('repeating items/sections works', () => {
    tp.LoadForm.openDisplayControlsDemo();

    // tslint:disable-next-line:one-variable-per-declaration
    const btnAdd1 = 'add-/g1/1',
      btnAdd2 = 'add-/g1/g1g2/1/1',
      btnAdd3 = 'add-/g2/1',

      btnDel1 = 'del-/g1/2',
      btnDel2 = 'del-/g1/g1g2/1/2',
      btnDel3 = 'del-/g2/2',

      q11 = '/g1/g1m1/1/1',
      q21 = '/g1/g1g2/g1g2q1/1/1/1',
      q31 = '/g2/g1m1/1/1',

      q12 = '/g1/g1m1/2/1',
      q22 = '/g1/g1g2/g1g2q1/1/2/1',
      q32 = '/g2/g1m1/2/1';

    cy.byId(btnAdd1).should('exist');
    cy.byId(q11).should('be.visible');
    cy.byId(q21).should('be.visible');
    cy.byId(q31).should('be.visible');
    cy.byId(q12).should('not.exist');
    cy.byId(q22).should('not.exist');
    cy.byId(q32).should('not.exist');

    cy.byId(btnAdd1).click();
    cy.byId(q12).should('be.visible');
    cy.byId(btnDel1).click();
    cy.byId(q12).should('not.exist');

    cy.byId(btnAdd2).click();
    cy.byId(q22).should('be.visible');
    cy.byId(btnDel2).click();
    cy.byId(q22).should('not.exist');

    cy.byId(btnAdd3).click();
    cy.byId(q32).should('be.visible');
    cy.byId(btnDel3).click();
    cy.byId(q32).should('not.exist');
  });

  it('section matrix works', () => {
    tp.LoadForm.openDisplayControlsDemo();

    const item1answer1 = '/g4/g1m1/1/1c1',
      item1answer2 = '/g4/g1m1/1/1c2',
      item2answer1 = '/g4/g1m2/1/1c1',
      item2answer3 = '/g4/g1m2/1/1c3';

    cy.byId(item1answer1).should('exist');
    // first row in matrix
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[8].items[0].value).to.be.undefined;
    });

    cy.byId(item1answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[8].items[0].value[0].code).to.equal('c1');
      expect(formData.items[8].items[0].value[0].text).to.equal('Answer 1');
    });

    cy.byId(item1answer2).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[8].items[0].value[0].code).to.equal('c1');
      expect(formData.items[8].items[0].value[0].text).to.equal('Answer 1');
      expect(formData.items[8].items[0].value[1].code).to.equal('c2');
      expect(formData.items[8].items[0].value[1].text).to.equal('Answer 2');

      // second row in matrix
      expect(formData.items[8].items[1].value).to.be.undefined;
    });

    cy.byId(item2answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[8].items[1].value[0].code).to.equal('c1');
      expect(formData.items[8].items[1].value[0].text).to.equal('Answer 1');
    });

    cy.byId(item2answer3).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getFormData();
      expect(formData.items[8].items[1].value[0].code).to.equal('c1');
      expect(formData.items[8].items[1].value[0].text).to.equal('Answer 1');
      expect(formData.items[8].items[1].value[1].code).to.equal('c3');
      expect(formData.items[8].items[1].value[1].text).to.equal('Answer 3');

      // first row is data model does not change
      expect(formData.items[8].items[0].value[0].code).to.equal('c1');
      expect(formData.items[8].items[0].value[0].text).to.equal('Answer 1');
      expect(formData.items[8].items[0].value[1].code).to.equal('c2');
      expect(formData.items[8].items[0].value[1].text).to.equal('Answer 2');
    });
  });

  it('should show disabled inputs', () => {
    tp.LoadForm.openFullFeaturedForm();

    cy.byId('/readonlyST/1').should('exist').should('not.be.enabled');
    cy.byId('/readonlyCNE-s/1').should('not.be.enabled');
    cy.byId('/readonlyCWE-m/1').should('not.be.enabled');
    cy.byId('/readonlyCNE-sb/1c1').find('input').should('not.be.enabled');
    cy.byId('/readonlyCNE-sb/1c2').find('input').should('not.be.enabled');
    cy.byId('/readonlyCNE-sb/1c3').find('input').should('not.be.enabled');
    cy.byId('/readonlyCNE-sb/1c4').find('input').should('not.be.enabled');
    cy.byId('/readonlyCWE-mb/1c1').find('input').should('not.be.enabled');
    cy.byId('/readonlyCWE-mb/1c2').find('input').should('not.be.enabled');
    cy.byId('/readonlyCWE-mb/1c3').find('input').should('not.be.enabled');
    cy.byId('/readonlyCWE-mb/1c4').find('input').should('not.be.enabled');
  });

  it('should show changed font color', () => {
    tp.LoadForm.openFullFeaturedForm();
    cy.byId('label-/q_lg/1').should('exist')
      .should('have.css', 'color', 'rgb(255, 0, 0)'); // red
  });
});
