import {TestPage} from '../support/lforms_testpage.po.js';

describe('Form level Matrix layout', () => {
  const tp: TestPage = new TestPage();

  it('displays a radio matrix table', () => {
    tp.LoadForm.openMatrixLayout1();
    const item1answer1 = '/g1m1/1c1',
      item1answer2 = '/g1m1/1c2',
      item4answer1 = '/g1m4/1c1',
      item4answer4 = '/g1m4/1c4';

    cy.byId(item1answer1).should('be.visible');
    cy.byId(item4answer4).should('be.visible');

    // first question
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value).to.be.undefined;
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item1answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value.code).to.equal('c1');
      expect(formData.itemsData[0].value.text).to.equal('Answer a');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item1answer2).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value.code).to.equal('c2');
      expect(formData.itemsData[0].value.text).to.equal('Answer b');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item4answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value.code).to.equal('c2');
      expect(formData.itemsData[0].value.text).to.equal('Answer b');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value.code).to.equal('c1');
      expect(formData.itemsData[3].value.text).to.equal('Answer a');
    });

    cy.byId(item4answer4).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value.code).to.equal('c2');
      expect(formData.itemsData[0].value.text).to.equal('Answer b');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value.code).to.equal('c4');
      expect(formData.itemsData[3].value.text).to.equal('Answer d');
    });
  });

  it('displays a checkbox matrix table', () => {
    tp.LoadForm.openMatrixLayout2();
    const item1answer1 = '/g1m1/1c1',
      item1answer2 = '/g1m1/1c2',
      item1Other = '/g1m1/1_other',
      item1OtherValue = '/g1m1/1_otherValue',
      item4answer1 = '/g1m4/1c1',
      item4answer4 = '/g1m4/1c4',
      item4Other = '/g1m4/1_other',
      item4OtherValue = '/g1m4/1_otherValue';

    cy.byId(item1answer1).should('be.visible');
    cy.byId(item4answer4).should('be.visible');

    // first question
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value).to.be.undefined;
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item1answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item1answer2).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item1Other).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.be.undefined;
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    cy.byId(item1OtherValue).type('other values').should('have.value', 'other values')
      // for test only: trigger a change event
      .blur();
    cy.byId(item1OtherValue).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.equal('other values');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    // change the other value alone will update the data model when the checkbox is checked.
    cy.byId(item1OtherValue).clear().type('other values again')
      // for test only: trigger a change event
      .blur();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.equal('other values again');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value).to.be.undefined;
    });

    // fourth question
    cy.byId(item4answer1).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.equal('other values again');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value[0].code).to.equal('c1');
      expect(formData.itemsData[3].value[0].text).to.equal('Answer 1');
    });

    cy.byId(item4answer4).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.equal('other values again');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value[0].code).to.equal('c1');
      expect(formData.itemsData[3].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[3].value[1].code).to.equal('c4');
      expect(formData.itemsData[3].value[1].text).to.equal('Answer 4');
    });

    cy.byId(item4OtherValue).type('others');
    // model value does not change when the checkbox is not checked
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.equal('other values again');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value.length).to.equal(2);
      expect(formData.itemsData[3].value[0].code).to.equal('c1');
      expect(formData.itemsData[3].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[3].value[1].code).to.equal('c4');
      expect(formData.itemsData[3].value[1].text).to.equal('Answer 4');
    });

    // mode value changes after the checkbox is clicked
    cy.byId(item4Other).click();
    cy.window().then((win) => {
      const formData = win.LForms.Util.getUserData();
      expect(formData.itemsData[0].value[0].code).to.equal('c1');
      expect(formData.itemsData[0].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[0].value[1].code).to.equal('c2');
      expect(formData.itemsData[0].value[1].text).to.equal('Answer 2');
      expect(formData.itemsData[0].value[2].code).to.be.undefined;
      expect(formData.itemsData[0].value[2].text).to.equal('other values again');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value.length).to.equal(3);
      expect(formData.itemsData[3].value[0].code).to.equal('c1');
      expect(formData.itemsData[3].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[3].value[1].code).to.equal('c4');
      expect(formData.itemsData[3].value[1].text).to.equal('Answer 4');
      expect(formData.itemsData[3].value[2].code).to.be.undefined;
      expect(formData.itemsData[3].value[2].text).to.equal('others');
    });
    // the value on the first question does not change
  });

});
