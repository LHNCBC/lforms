import {TestPage} from '../support/lforms_testpage.po.js';

describe('load saved user data', () => {
  const tp: TestPage = new TestPage();
  const ff = tp.FormWithUserData;

  before(() => {
    tp.LoadForm.openFormWithUserData();
  });

  it('should load BL, ST, DT, DTM, INT, answer lists', () => {
    cy.byId(ff.q0).find('button').should('have.class', 'ant-switch-checked');
    cy.byId(ff.q1).should('have.value', 'no data type');
    cy.byId(ff.q2).should('have.value', '100');
    cy.byId(ff.q3).should('have.value', 'user input value');
    cy.byId(ff.q4).should('have.value', '11/17/2015');
    cy.byId(ff.q5).should('have.value', 'Answer 2');
    cy.byId(ff.q6).should('have.value', 'Answer 2');
    cy.byId(ff.q7).should('have.value', 'Answer 3');
    cy.byId(ff.q8).should('have.value', '');
    cy.byId(ff.q9).should('have.value', '');
    // NEXT: the saved value is 11/20/2015 10:10 !!
    cy.byId(ff.q99).should('have.value', '11/20/2015 10:10:00'); //DTM
    cy.get(ff.multiAnswers).should(($list) => {
      expect($list).to.have.length(6);
      expect($list.eq(0)).to.have.text('×Answer 1');
      expect($list.eq(1)).to.have.text('×Answer 3');
      expect($list.eq(2)).to.have.text('×Answer 2');
      expect($list.eq(3)).to.have.text('×User created answer');
      expect($list.eq(4)).to.have.text('×Answer 2');
      expect($list.eq(5)).to.have.text('×User created answer');
    });
  });

  it('should load unit value', () => {
    cy.byId(ff.unit1).should('have.value', '123');
    cy.byId(ff.unit1_unit).should('have.value', 'kgs');
    cy.byId(ff.unit2).should('have.value', '456');
    cy.byId(ff.unit2_unit).should('have.value', 'kgs');
    cy.byId('/unit3/1').should('have.value', '789');
    cy.byId('unit_/unit3/1').should('have.value', 'kgs');
  });

  it('skip logic should work with loaded user data', () => {
    cy.byId(ff.src).should('have.value', '2');
    cy.byId(ff.t1).should('not.exist');
    cy.byId(ff.t2).should('be.visible').should('have.value', '200');
    cy.byId(ff.t4).should('be.visible').should('have.value', '201');
    cy.byId(ff.t5).should('be.visible').should('have.value', '202');
  });

  it('repeating items should be shown', () => {
    cy.byId(ff.rpq1_1).should('be.visible').should('have.value', 'instance A');
    cy.byId(ff.rpq1_2).should('be.visible').should('have.value', 'instance B');
    cy.byId(ff.rpq1_add_btn).should('be.visible').should('contain', 'Add another "A Repeating Item"');
  });

  it('repeating items/section within a repeating section should be shown', () => {
    cy.get(ff.rpq2_1).should('be.visible');
    cy.get(ff.rpq2_2).should('be.visible');
    cy.byId(ff.rpq3_1).should('be.visible').should('have.value', '300');
    cy.byId(ff.rpq3_2).should('be.visible').should('have.value', '301');
    cy.get(ff.rpq4_1).should('be.visible');
    cy.get(ff.rpq4_2).should('be.visible');
    cy.get(ff.rpq4_3).should('be.visible');
    cy.get(ff.rpq4_5).should('be.visible');
    cy.byId(ff.rpq5_1).should('be.visible').should('have.value', '400');
    cy.byId(ff.rpq5_2).should('be.visible').should('have.value', '401');
    cy.byId(ff.rpq5_3).should('be.visible').should('have.value', '402');
    cy.byId(ff.rpq5_5).should('be.visible').should('have.value', '403');

    cy.byId(ff.rpq4_add_btn_1).should('be.visible').should('contain', 'Add another "A repeating section in a repeating section"');
    cy.byId(ff.rpq4_add_btn_2).should('be.visible').should('contain', 'Add another "A repeating section in a repeating section"');
    cy.byId(ff.rpq2_add_btn).should('be.visible').should('contain', 'Add another "A Repeating Section"');

    cy.byId(ff.rpq4_del_btn_3).should('be.visible').should('have.text', '-');
    cy.byId(ff.rqp2_del_btn_2).should('be.visible').should('have.text', '-');
  });

  it('skip logic on repeating section should work too', () => {
    cy.byId(ff.rpSrc2).clear().type('1');
    cy.byId(ff.rpTarget2a).should('not.exist');
    cy.byId(ff.rpSrc2).clear().type('2');
    cy.byId(ff.rpTarget2a).should('be.visible');
    cy.byId(ff.rpAdd).click();
    cy.byId(ff.rpTarget2a).should('be.visible');
    cy.byId(ff.rpTarget2b).should('be.visible');
    cy.byId(ff.rpSrc2).clear().type('1');
    cy.byId(ff.rpTarget2a).should('not.exist');
    cy.byId(ff.rpTarget2b).should('not.exist');
  });

  it('form should be actionable', () => {
    // add a repeating item
    cy.byId(ff.rpq1_add_btn).click().should('not.exist');
    cy.byId(ff.rpq1_add_btn_3).should('be.visible').should('contain', 'Add another "A Repeating Item"');
    cy.byId(ff.rpq1_3).should('have.value', '');
    // add a repeating section
    cy.byId(ff.rpq4_add_btn_1).click().should('not.exist');
    cy.byId(ff.rpq4_add_btn_1b).should('be.visible').should('contain', 'Add another "A repeating section in a repeating section"');
    cy.byId(ff.rpq5_4).should('have.value', '');

    // select from an answer list
    // pick the 1st item, Answer 1
    cy.byId(ff.q5).click().type('{downArrow}').blur()
      .should('have.value', 'Answer 1');

    // select one more answer from multi select field
    // pick the 1st item, Answer 2
    cy.byId(ff.q8).click().type('{downArrow}').blur();
    cy.get(ff.multiAnswers).should(($list) => {
      expect($list).to.have.length(7);
      expect($list.eq(0)).to.have.text('×Answer 1');
      expect($list.eq(1)).to.have.text('×Answer 3');
      expect($list.eq(2)).to.have.text('×Answer 2');
      expect($list.eq(3)).to.have.text('×Answer 2');
      expect($list.eq(4)).to.have.text('×User created answer');
      expect($list.eq(5)).to.have.text('×Answer 2');
      expect($list.eq(6)).to.have.text('×User created answer');
    });
  });

  it('adding a repeating section that has repeating sub items with user data should show just one repeating item', () => {
    const addSectionButton = 'add-/rp-q2/2',
      section3Label = 'label-/rp-q2/3',
      section31Label = 'label-/rp-q2/rp-q4/3/1',
      item31 = '/rp-q2/rp-q3/3/1',
      item311 = '/rp-q2/rp-q4/rp-q5/3/1/1',
      item312 = '/rp-q2/rp-q4/rp-q5/3/1/2';

    cy.byId(addSectionButton).click();
    cy.byId(section3Label).should('be.visible');
    cy.byId(section31Label).should('be.visible');
    cy.byId(item31).should('be.visible').should('have.value', '');
    cy.byId(item311).should('be.visible').should('have.value', '');
    cy.byId(item312).should('not.exist');
  });

  it('should display user value and default answers on CWE typed items when answers are displayed as radio buttons and checkboxes', () => {
    const cwe1Other = '/cwe-checkbox-user-value/1_other',
      cwe1OtherValue = '/cwe-checkbox-user-value/1_otherValue',

      cwe2Ans1 = '/cwe-checkbox-user-value-and-answer-code/1c1',
      cwe2Other = '/cwe-checkbox-user-value-and-answer-code/1_other',
      cwe2OtherValue = '/cwe-checkbox-user-value-and-answer-code/1_otherValue',

      cwe3Ans2 = '/cwe-checkbox-user-value-and-answer-text/1c2',
      cwe3Other = '/cwe-checkbox-user-value-and-answer-text/1_other',
      cwe3OtherValue = '/cwe-checkbox-user-value-and-answer-text/1_otherValue',

      cwe4Ans3 = '/cwe-checkbox-user-value-and-answer/1c3',
      cwe4Other = '/cwe-checkbox-user-value-and-answer/1_other',
      cwe4OtherValue = '/cwe-checkbox-user-value-and-answer/1_otherValue',

      cwe5Other = '/cwe-checkbox-default-answer/1_other',
      cwe5OtherValue = '/cwe-checkbox-default-answer/1_otherValue',

      cwe6Other = '/cwe-radio-user-value/1_other',
      cwe6OtherValue = '/cwe-radio-user-value/1_otherValue',

      cwe7Other = '/cwe-radio-default-answer/1_other',
      cwe7OtherValue = '/cwe-radio-default-answer/1_otherValue';

    // OTHER in checkbox display with the user value not in the answer list
    cy.byId(cwe1Other).find('input').should('be.checked');
    cy.byId(cwe1OtherValue).should('have.value', 'user typed value');
    // OTHER and an answer that has only a 'code', in checkbox display with the user value not in the answer list
    cy.byId(cwe2Ans1).find('input').should('be.checked');
    cy.byId(cwe2Other).find('input').should('be.checked');
    cy.byId(cwe2OtherValue).should('have.value', 'user typed value');
    // OTHER and an answer that has only a 'text', in checkbox display with the user value not in the answer list
    cy.byId(cwe3Ans2).find('input').should('be.checked');
    cy.byId(cwe3Other).find('input').should('be.checked');
    cy.byId(cwe3OtherValue).should('have.value', 'user typed value');
    // OTHER and an answer that has a 'code and a 'text', in checkbox display with the user value not in the answer list
    cy.byId(cwe4Ans3).find('input').should('be.checked');
    cy.byId(cwe4Other).find('input').should('be.checked');
    cy.byId(cwe4OtherValue).should('have.value', 'user typed value');
    // default answer is not in the answer list, checkbox display, other value set
    cy.byId(cwe5Other).find('input').should('be.checked');
    cy.byId(cwe5OtherValue).should('have.value', 'off-list default answer');
    // OTHER, in radiobutton display with the user value not in the answer list
    cy.byId(cwe6Other).find('input').should('be.checked');
    cy.byId(cwe6OtherValue).should('have.value', 'user typed value');
    // default answer is not in the answer list, radiobutton display, other value set
    cy.byId(cwe7Other).find('input').should('be.checked');
    cy.byId(cwe7OtherValue).should('have.value', 'off-list default answer');
  });

});

describe('load saved user data, where hasSavedData is set to true', () => {
  const tp: TestPage = new TestPage();
  const ff = tp.FormWithUserData;

  before(() => {
    tp.LoadForm.openFormWithUserData();
  });

  it('should not load default values', () => {
    tp.LoadForm.openFormWithUserDataWithHasSavedData();
    cy.byId(ff.q5).should('have.value', '');
    // default answer is not in the answer list,
    cy.byId('/cwe-checkbox-default-answer/1_other').should('not.be.checked');
    cy.byId('/cwe-radio-default-answer/1_other').should('not.be.checked');
  });

});
