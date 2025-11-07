import {TestPage} from '../support/lforms_testpage.po.js';

describe('Form level Matrix layout', () => {
  const tp: TestPage = new TestPage();

  it('displays a radio matrix table', () => {
    tp.LoadForm.openMatrixLayout1();
    const item1answer1 = '/g1m1/1||c1',
      item1answer2 = '/g1m1/1||c2',
      item4answer1 = '/g1m4/1||c1',
      item4answer4 = '/g1m4/1||c4';

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
    const item1answer1 = '/g1m1/1||c1',
      item1answer2 = '/g1m1/1||c2',
      item1Other = '/g1m1/1|_other',
      item1OtherValue = '/g1m1/1|_otherValue',
      item4answer1 = '/g1m4/1||c1',
      item4answer4 = '/g1m4/1||c4',
      item4Other = '/g1m4/1|_other',
      item4OtherValue = '/g1m4/1|_otherValue';

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
      expect(formData.itemsData[0].value[2]).to.be.undefined;
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
      expect(formData.itemsData[0].value[2]).to.equal('other values');
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
      expect(formData.itemsData[0].value[2]).to.equal('other values again');
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
      expect(formData.itemsData[0].value[2]).to.equal('other values again');
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
      expect(formData.itemsData[0].value[2]).to.equal('other values again');
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
      expect(formData.itemsData[0].value[2]).to.equal('other values again');
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
      expect(formData.itemsData[0].value[2]).to.equal('other values again');
      expect(formData.itemsData[1].value).to.be.undefined;
      expect(formData.itemsData[2].value).to.be.undefined;
      expect(formData.itemsData[3].value.length).to.equal(3);
      expect(formData.itemsData[3].value[0].code).to.equal('c1');
      expect(formData.itemsData[3].value[0].text).to.equal('Answer 1');
      expect(formData.itemsData[3].value[1].code).to.equal('c4');
      expect(formData.itemsData[3].value[1].text).to.equal('Answer 4');
      expect(formData.itemsData[3].value[2]).to.equal('others');
    });
    // the value on the first question does not change
  });

  describe('Use data files in lforms internal data format', () => {
    it('displays a radio matrix table with initial values displayed', () => {
      tp.openBaseTestPage();
      tp.loadFromTestData('matrixLayoutSingleSelectionWithData.json');
      const item1answer1 = '/g1m1/1||c1',
        item2answerOther = '/g1m2/1|_other',
        item2answerOtherValue = '/g1m2/1|_otherValue';

      cy.byId(item1answer1).should('be.checked');
      cy.byId(item2answerOther).should('be.checked');
      cy.byId(item2answerOtherValue).should('have.value', "User typed string")

      // first question
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData();
        expect(formData.itemsData[0].value).to.eql({"code": "c1", "text": "Answer a"});
        expect(formData.itemsData[1].value).to.eql("User typed string");
        expect(formData.itemsData[2].value).to.eql({"code": "c3", "text": "Answer c"});
        expect(formData.itemsData[3].value).to.be.undefined;
      });


    });

    it('displays a checkbox matrix table with initial values displayed', () => {
      tp.openBaseTestPage();
      tp.loadFromTestData('matrixLayoutMultipleSelectionWithData.json');
      const item1answer1 = '/g1m1/1||c1',
        item1answer2 = '/g1m1/1||c2',
        item2answer1 = '/g1m2/1||c1',
        item2answerOther = '/g1m2/1|_other',
        item2answerOtherValue = '/g1m2/1|_otherValue';

      cy.byId(item1answer1).should('be.checked');
      cy.byId(item1answer2).should('be.checked');
      cy.byId(item2answer1).should('be.checked');
      cy.byId(item2answerOther).should('be.checked');
      cy.byId(item2answerOtherValue).should('have.value', "user typed string")

      // first question
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData();
        expect(formData.itemsData[0].value).to.eql([{"code": "c1", "text": "Answer 1"},{"code": "c2", "text": "Answer 2"}]);
        expect(formData.itemsData[1].value).to.eql([{"code": "c1", "text": "Answer 1"},"user typed string"]);
        expect(formData.itemsData[2].value).to.eql([{"code": "c3", "text": "Answer 3"}]);
        expect(formData.itemsData[3].value).to.be.undefined;
      });

    });
  });

  describe('Use FHIR R4 Questionnaire data files', () => {
    it('displays a radio matrix table with initial values displayed', () => {
      tp.openBaseTestPage();
      tp.loadFromTestData('matrixLayoutSingleSelectionWithData.R4.json', "R4");
      const item1answer1 = '/g1m1/1/1||c1',
        item2answerOther = '/g1m2/1/1|_other',
        item2answerOtherValue = '/g1m2/1/1|_otherValue';

      cy.byId(item1answer1).should('be.checked');
      cy.byId(item2answerOther).should('be.checked');
      cy.byId(item2answerOtherValue).should('have.value', "User typed string")

      // first question
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData();
        expect(formData.itemsData[0].items[0].value).to.eql({"code": "c1", "text": "Answer a"});
        expect(formData.itemsData[0].items[1].value).to.eql("User typed string");
        expect(formData.itemsData[0].items[2].value).to.eql({"code": "c3", "text": "Answer c"});
        expect(formData.itemsData[0].items[3].value).to.be.undefined;
      });
    });

    it('displays a checkbox matrix table with initial values displayed', () => {
      tp.openBaseTestPage();
      tp.loadFromTestData('matrixLayoutMultipleSelectionWithData.R4.json', "R4");
      const item1answer1 = '/g1m1/1/1||c1',
        item1answer2 = '/g1m1/1/1||c2',
        item2answer1 = '/g1m2/1/1||c1',
        item2answerOther = '/g1m2/1/1|_other',
        item2answerOtherValue = '/g1m2/1/1|_otherValue';

      cy.byId(item1answer1).should('be.checked');
      cy.byId(item1answer2).should('be.checked');
      cy.byId(item2answer1).should('be.checked');
      cy.byId(item2answerOther).should('be.checked');
      cy.byId(item2answerOtherValue).should('have.value', "user typed string")

      // first question
      cy.window().then((win) => {
        const formData = win.LForms.Util.getUserData();
        expect(formData.itemsData[0].items[0].value).to.eql([{"code": "c1", "text": "Answer 1"},{"code": "c2", "text": "Answer 2"}]);
        expect(formData.itemsData[0].items[1].value).to.eql([{"code": "c1", "text": "Answer 1"},"user typed string"]);
        expect(formData.itemsData[0].items[2].value).to.eql([{"code": "c3", "text": "Answer 3"}]);
        expect(formData.itemsData[0].items[3].value).to.be.undefined;
      });
    });
  });

});
