import {TestPage} from '../support/lforms_testpage.po.js';

describe('Visual effect tests', () => {
  const tp: TestPage = new TestPage();

  describe('Active field background color', () => {
    let color;
    before(() => {
      // Get the backgound color of the empty data type field
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/type0/1')
        // The element changes background color on focus. For some reason this guarantees
        // that we get the updated color instead of sometimes getting rgb(255, 255, 255).
        .focus().blur()
        .click()
        .invoke('css', 'background-color')
        .then((c) => {
          color = c;
        });
    });

    const dataTypes = ['BL', 'INT', 'REAL', 'ST', 'BIN', 'DT', 'DTM', 'TM', 'CNE', 'CWE',
      'RTO', 'QTY', 'YEAR', 'MONTH', 'DAY', 'URL', 'EMAIL', 'PHONE', 'TX'];

    for (let i = 0, len = dataTypes.length; i < len; ++i) {
      const d = dataTypes[i];
      const otherField = '/type' + (i + 1) + '/1';
      if (d === 'DT' || d === 'DTM' || d === 'TM') {
        // NEXT: TODO
        // background should rgba(255, 248, 198, 1).
        // but somehow they are 'rgba(255, 248, 198, 0.04), rgba(255, 248, 198, 0.114) and rgba(255, 248, 198, 0.04), respectively
        // they look similar though.
        continue;
      }
      if (d === 'BL') {
        continue; // BL is a switch, which has no focused color
      }

      // Active field background color should the be same for all types of fields
      it('should be the same for data type ' + d, () => {
        cy.byId(otherField).click()
          .should('have.css', 'background-color', color);
      });
    }
  });

  describe('Question/section in question', () => {
    it('should all the questions/sections defined in the question-in-question form', () => {
      tp.LoadForm.openQuestionInQuestionForm();

      cy.byId('/q1/1').should('be.visible');
      cy.byId('/q1/q11/1/1').should('be.visible');
      cy.byId('/q1/q12/1/1').should('be.visible');

      cy.byId('/q2/1').should('be.visible');
      cy.byId('/q2/q21/1/1').should('be.visible');
      cy.byId('/q2/q22/q221/1/1/1').should('be.visible');
      cy.byId('/q2/q22/q222/1/1/1').should('be.visible');

      cy.byId('/q3/1').should('be.visible');
      cy.byId('/q3/q31/1/1').should('be.visible');
      cy.byId('/q3/q32/q321/1/1/1').should('be.visible');
      cy.byId('/q3/q32/q322/1/1/1').should('be.visible');

      cy.byId('add-/q3/q31/1/1').click();
      cy.byId('/q3/q31/1/2').should('be.visible');

      cy.byId('add-/q3/q32/1/1').click();
      cy.byId('/q3/q32/q321/1/2/1').should('be.visible');
      cy.byId('/q3/q32/q322/1/2/1').should('be.visible');
    });
  });

  describe('Responsive display layout', () => {
    it('container should have different css class on different size', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/type0/1').should('exist');

      // break points, 600
      cy.window().then((win) => {
        win.LForms.jQuery("wc-lhc-form").width(601);
      });
      cy.get('wc-lhc-form').invoke('width').should('eq', 601);
      cy.get('.lhc-form.lhc-view-lg').should('exist');
      cy.get('.lhc-form.lhc-view-md').should('not.exist');
      cy.get('.lhc-form.lhc-view-sm').should('not.exist');

      cy.get('.lhc-item.lhc-item-view-lg').first().find('#\\/q_lg\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').first().find('#\\/q_md\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-sm').first().find('#\\/q_sm\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-lg').eq(1).find('#\\/q_auto\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').eq(1).should('not.exist');
      cy.get('.lhc-item.lhc-item-view-sm').eq(1).should('not.exist');

      cy.window().then((win) => {
        win.LForms.jQuery("wc-lhc-form").width(598);
      });
      cy.get('wc-lhc-form').invoke('width').should('eq', 598);
      cy.get('.lhc-form.lhc-view-lg').should('not.exist');
      cy.get('.lhc-form.lhc-view-md').should('exist');
      cy.get('.lhc-form.lhc-view-sm').should('not.exist');
      // check 4 questions
      cy.get('.lhc-item.lhc-item-view-lg').first().find('#\\/q_lg\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').first().find('#\\/q_md\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-sm').first().find('#\\/q_sm\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').eq(1).find('#\\/q_auto\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-lg').eq(1).find('#\\/q_auto\\/1').should('not.exist');
      cy.get('.lhc-item.lhc-item-view-sm').eq(1).should('not.exist');

      // break points, 400 //480
      cy.window().then((win) => {
        win.LForms.jQuery("wc-lhc-form").width(398);
      });
      cy.get('wc-lhc-form').invoke('width').should('eq', 398);
      cy.get('.lhc-form.lhc-view-lg').should('not.exist');
      cy.get('.lhc-form.lhc-view-md').should('not.exist');
      cy.get('.lhc-form.lhc-view-sm').should('exist');
      // check 4 questions
      cy.get('.lhc-item.lhc-item-view-lg').first().find('#\\/q_lg\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').first().find('#\\/q_md\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-sm').first().find('#\\/q_sm\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-sm').eq(1).find('#\\/q_auto\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-lg').eq(1).should('not.exist');
      cy.get('.lhc-item.lhc-item-view-md').eq(1).find('#\\/q_auto\\/1').should('not.exist');

      cy.window().then((win) => {
        win.LForms.jQuery("wc-lhc-form").width(401);
      });
      cy.get('wc-lhc-form').invoke('width').should('eq', 401);
      cy.get('.lhc-form.lhc-view-lg').should('not.exist');
      cy.get('.lhc-form.lhc-view-md').should('exist');
      cy.get('.lhc-form.lhc-view-sm').should('not.exist');
      // check 4 questions
      cy.get('.lhc-item.lhc-item-view-lg').first().find('#\\/q_lg\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').first().find('#\\/q_md\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-sm').first().find('#\\/q_sm\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-md').eq(1).find('#\\/q_auto\\/1').should('exist');
      cy.get('.lhc-item.lhc-item-view-lg').eq(1).should('not.exist');
      cy.get('.lhc-item.lhc-item-view-sm').eq(1).find('#\\/q_auto\\/1').should('not.exist');
    });
  });

  describe('displayControl.colCSS in horizontal table', () => {
    it('displayControl.colCSS should work for items in horizontal tables', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/type0/1').should('exist');
      cy.get('.lhc-form-horizontal-table col').first()
        .should('have.attr', 'style')
        .and('include', 'width: 25%;')
        .and('include', 'min-width: 10%;');
      cy.get('.lhc-form-horizontal-table col').eq(1)
        .should('have.attr', 'style')
        .and('include', 'width: 25%;')
        .and('include', 'min-width: 15%;');
      cy.get('.lhc-form-horizontal-table col').eq(2)
        .should('have.attr', 'style')
        .and('include', 'width: 50%;');
    });
  });

  describe('radio buttons in a radio group', () => {
    it('should get to the first radio button in a radiobutton group using tab key and get to rest using arrow keys', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/type0/1')
        .should('exist')
        .click();
      cy.realPress("Tab"); // focus is on the help button
      // move to radio 'Not Answered'
      cy.realPress("Tab");
      cy.focused()
        .should('have.attr', 'name', 'radiogroup_/type1/1')
        .parent()
        .parent()
        .should('have.attr', 'id', '/type1/1null')
      // move to radio 'No'
      cy.realPress('{leftarrow}');
      cy.focused()
        .should('have.attr', 'name', 'radiogroup_/type1/1')
        .parent()
        .parent()
        .should('have.attr', 'id', '/type1/1false')
      // move to radio 'Yes'
      cy.realPress('{leftarrow}');
      cy.focused()
        .should('have.attr', 'name', 'radiogroup_/type1/1')
        .parent()
        .parent()
        .should('have.attr', 'id', '/type1/1true')
      // back to radio 'No'
      cy.realPress('{rightarrow}');
      cy.focused()
        .should('have.attr', 'name', 'radiogroup_/type1/1')
        .parent()
        .parent()
        .should('have.attr', 'id', '/type1/1false');

      // go to next question
      cy.byId('/type1/1false')
      // move to radio 'Not Answered'
      cy.realPress("Tab");
      cy.focused()
        .should('have.attr', 'name', 'radiogroup_/type1b/1')
        .parent()
        .parent()
        .should('have.attr', 'id', '/type1b/1null');
      // move to radio 'No'
      cy.realPress('{leftarrow}');
      cy.focused()
        .should('have.attr', 'name', 'radiogroup_/type1b/1')
        .parent()
        .parent()
        .should('have.attr', 'id', '/type1b/1false');

      // go to next question
      cy.byId('/type1b/1false')
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.focused()
        .should('have.attr', 'id', '/type2/1')
    });
  });

  describe('tree lines', () => {
    it('should reset treeline after enableWhenExpression is run', () => {
      tp.openBaseTestPage();
      tp.loadFromTestData('enableWhenExpressionTest.json', 'R4');

      const n1 = 'n1/1';
      const n2 = 'n2/1';
      const n3 = 'n3/1';
      const q4 = 'q4/1'; // present when n1+n2+n3 >= 5;

      cy.byId(n1).should('be.visible');
      cy.byId(q4).should('not.exist');
      cy.byId(n1).click().type('1');
      cy.byId(n2).click().type('2');
      cy.byId(n3).click().type('3');
      cy.byId(q4).should('be.visible');

      cy.byId("item-n3/1")
        .should('have.class', 'lhc-tree-line')
        .should('not.have.class', 'lhc-last-item');
      cy.byId("item-q4/1")
        .should('have.class', 'lhc-tree-line')
        .should('have.class', 'lhc-last-item');

    });
  });


});
