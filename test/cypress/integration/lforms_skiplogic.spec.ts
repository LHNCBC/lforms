import {TestPage} from '../support/lforms_testpage.po.js';
import * as FHIRSupport from '../../../src/fhir/versions';

const fhirVersions = Object.keys(FHIRSupport);

describe('skip logic', () => {
  const tp: TestPage = new TestPage();
  const ff = tp.FullFeaturedForm;

  beforeEach(() => {
    tp.LoadForm.openFullFeaturedForm();
  });

  it('should support enableWhenExpression', () => {
    tp.openBaseTestPage();
    tp.loadFromTestData('enableWhenExpressionTest.json', 'R4');

    const n1 = 'n1/1';
    const n2 = 'n2/1';
    const n3 = 'n3/1';
    const q4 = 'q4/1'; // present when n1+n2+n3 >= 5;

    cy.byId(n1).should('be.visible');
    cy.byId(q4).should('not.exist');
    cy.byId(n1).click().type('5');
    cy.byId(n2).click();
    cy.byId(n1).should('be.visible').clear().click().type('1');
    cy.byId(n2).click().type('2');
    cy.byId(q4).should('not.exist');
    cy.byId(n3).click().type('3');
    cy.byId(n1).click().should('be.visible');
  });

  it('target items should be hidden initially', () => {
    cy.byId(ff.t1).should('not.exist');
    cy.byId(ff.t2).should('not.exist');
    cy.byId(ff.t4).should('not.exist');
    cy.byId(ff.t5).should('not.exist');
  });

  it('should have correct initial state for CNE/exists trigger targets', () => {
    cy.byId(ff.dobIfLivingYes).should('not.exist');
    cy.byId(ff.ageIfLivingAnswered).should('not.exist');
    cy.byId(ff.deathCauseIfLivingNo).should('not.exist');
    cy.byId(ff.ageDeathIfLivingNotAnswered).should('be.visible');
  });

  it('should show/hide elements per CNE/exists trigger settings if answered Yes', () => {
    // select "Yes" for is Living
    cy.byId(ff.cneTriggerSrc1).click().type('{downArrow}').blur();
    cy.byId(ff.dobIfLivingYes).should('be.visible');
    // trigger value has no 'system' while answers have 'system'
    cy.byId(ff.dobIfLivingYesB).should('not.exist');
    cy.byId(ff.ageIfLivingAnswered).should('be.visible');
    cy.byId(ff.deathCauseIfLivingNo).should('not.exist');
    cy.byId(ff.ageDeathIfLivingNotAnswered).should('not.exist');
  });

  it('should show/hide elements per CNE/exists trigger settings if answered No', () => {
    // select "No" for is Living
    cy.byId(ff.cneTriggerSrc1).click().type('{downArrow}').type('{downArrow}').blur();

    cy.byId(ff.dobIfLivingYes).should('not.exist');
    // trigger value has no 'system' while answers have 'system'
    cy.byId(ff.dobIfLivingYesB).should('not.exist');
    cy.byId(ff.ageIfLivingAnswered).should('be.visible');
    cy.byId(ff.deathCauseIfLivingNo).should('be.visible');
    cy.byId(ff.ageDeathIfLivingNotAnswered).should('not.exist');
  });

  it('should show/hide elements per CNE/exists trigger settings if answer cleared', () => {
    // clear the answer to Living
    cy.byId(ff.cneTriggerSrc1).clear();

    cy.byId(ff.dobIfLivingYes).should('not.exist');
    cy.byId(ff.dobIfLivingYesB).should('not.exist');
    cy.byId(ff.ageIfLivingAnswered).should('not.exist');
    cy.byId(ff.deathCauseIfLivingNo).should('not.exist');
    cy.byId(ff.ageDeathIfLivingNotAnswered).should('be.visible');
  });

  it('should show/hide elements when "system" value is set correctly in trigger if answered Yes', () => {
    // clear the answer to Living
    cy.byId(ff.cneTriggerSrc2).click().type('{downArrow}').blur();

    // trigger value has 'system' while answers have no 'system'
    cy.byId(ff.dobIfLivingYes2C).should('not.exist');
    cy.byId(ff.dobIfLivingYes2D).should('be.visible');
    cy.byId(ff.deathCauseIfLivingNoB).should('not.exist');

    cy.byId(ff.cneTriggerSrc2).click().type('{downArrow}').type('{downArrow}').blur();

    // trigger value has 'system' while answers have no 'system'
    cy.byId(ff.dobIfLivingYes2C).should('not.exist');
    cy.byId(ff.dobIfLivingYes2D).should('not.exist');
    cy.byId(ff.deathCauseIfLivingNoB).should('be.visible');
  });

  it('should show a sibling and two items in a sibling section', () => {
    cy.byId(ff.src).type('1');
    cy.byId(ff.t1).should('be.visible');
    cy.byId(ff.t4).should('be.visible');
    cy.byId(ff.t5).should('be.visible');
  });

  it('should hide a sibling and show two items in a sibling section', () => {
    cy.byId(ff.src).clear();
    cy.byId(ff.t1).should('not.exist');
    cy.byId(ff.t2).should('not.exist');
    cy.byId(ff.t4).should('not.exist');
    cy.byId(ff.t5).should('not.exist');

    cy.byId(ff.src).type('2');
    cy.byId(ff.t1).should('not.exist');
    cy.byId(ff.t2).should('be.visible');
    cy.byId(ff.t4).should('be.visible');
    cy.byId(ff.t5).should('be.visible');
  });

  it('should show/hide a sibling controlled by "notEqual"', () => {
    cy.byId(ff.src).clear();
    cy.byId(ff.t6).should('be.visible');
    cy.byId(ff.src).type('2');
    cy.byId(ff.t6).should('not.exist');
    cy.byId(ff.src).clear().type('6');
    cy.byId(ff.t6).should('be.visible');
  });

  it('should show another sibling and hide two items in a sibling section', () => {
    cy.byId(ff.src).clear();
    cy.byId(ff.t1).should('not.exist');
    cy.byId(ff.t2).should('not.exist');
    cy.byId(ff.t4).should('not.exist');
    cy.byId(ff.t5).should('not.exist');
    cy.byId(ff.src).type('6');
    cy.byId(ff.t1).should('not.exist');
    cy.byId(ff.t2).should('be.visible');
    cy.byId(ff.t4).should('not.exist');
    cy.byId(ff.t5).should('not.exist');
  });

  it('should work with logic ALL from two different sources', () => {
    // check logic ALL
    cy.byId(ff.allSrc1).clear();
    cy.byId(ff.allSrc2).clear();
    cy.byId(ff.allSrc1).type('1');
    cy.byId(ff.allTarget).should('not.exist');
    cy.byId(ff.allSrc2).type('2');
    cy.byId(ff.allTarget).should('be.visible');
    cy.byId(ff.anySrc1).clear();
    cy.byId(ff.allSrc1).type('2');
    cy.byId(ff.allTarget).should('not.exist');
  });

  it('should work with logic ANY from two different sources', () => {
    // check logic ANY
    cy.byId(ff.anySrc1).clear();
    cy.byId(ff.anySrc2).clear();
    cy.byId(ff.anySrc1).type('1');
    cy.byId(ff.anyTarget).should('be.visible');
    cy.byId(ff.anySrc2).type('1');
    cy.byId(ff.anyTarget).should('be.visible');
    cy.byId(ff.anySrc1).type('2').clear();
    cy.byId(ff.anyTarget).should('not.exist');
    cy.byId(ff.anySrc2).clear().type('2');
    cy.byId(ff.anyTarget).should('be.visible');
  });

  it('should be able to be controlled by an ancestors sibling', () => {
    cy.byId(ff.rpTarget2a).should('not.exist');
    cy.byId(ff.rpTarget2b).should('not.exist');
    cy.byId(ff.rpSrc2).clear();
    cy.byId(ff.rpTarget2a).should('not.exist');
    cy.byId(ff.rpTarget2b).should('not.exist');
    cy.byId(ff.rpSrc2).type('1');
    cy.byId(ff.rpTarget2a).should('not.exist');
    cy.byId(ff.rpSrc2).clear().type('2');
    cy.byId(ff.rpTarget2a).should('be.visible');

    cy.byId(ff.rpTarget1a).should('not.exist');
    cy.byId(ff.rpTarget1ah1).should('not.exist');
    cy.byId(ff.rpSubSrc1).type('1');
    cy.byId(ff.rpTarget1a).should('be.visible');
    cy.byId(ff.rpTarget1ah1).should('be.visible');

    // add a new section
    cy.byId(ff.rpAdd).click();
    cy.byId(ff.rpTarget1b).should('not.exist');
    cy.byId(ff.rpTarget1bh1).should('not.exist');
    cy.byId(ff.rpTarget2a).should('be.visible');
    cy.byId(ff.rpTarget2b).should('be.visible');
    cy.byId(ff.rpSrc2).clear().type('1');
    cy.byId(ff.rpTarget2a).should('not.exist');
    cy.byId(ff.rpTarget2b).should('not.exist');
  });

  describe('Skip logic equal and notEqual operators', () => {
    before(() => {
      tp.openBaseTestPage();
    });

    for (let i = 0; i < fhirVersions.length; i++) {
      if (fhirVersions[i] !== 'STU3') {
        it('should work with = and != operators - ' + fhirVersions[i], () => {
          tp.loadFromTestData('test-enablewhen.json', fhirVersions[1]);
          const source = '4.1/1';
          const targetEqual = '4.2/1';
          const targetNotEqual = '4.3/1';

          cy.byId(source).should('be.visible');
          cy.byId(targetEqual).should('not.exist');
          cy.byId(targetNotEqual).should('be.visible');

          cy.byId(source).click().type('{downArrow}').type('{enter}');
          cy.byId(targetEqual).should('be.visible');
          // It looks like below line was not supposed to be here:
          // TestUtil.waitForElementNotPresent(targetEqual)

          cy.byId(source).click().type('{downArrow}').type('{downArrow}').type('{enter}');
          cy.byId(targetEqual).should('not.exist');
          cy.byId(targetNotEqual).should('be.visible');
        });
      }

      it('should work with skip logic source that itself is a skip logic target - ' + fhirVersions[i], () => {
        tp.loadFromTestData('test-enablewhen.json', fhirVersions[i]);
        const source = '4.1/1';
        const targetEqual = '4.3/1';
        const targetWithSklSourceExists = '4.4/1';
        const targetWithSklSourceNotExists = '4.5/1';

        // Initial setup
        cy.byId(source).should('be.visible');
        cy.byId(targetWithSklSourceExists).should('not.exist');
        cy.byId(targetWithSklSourceNotExists).should('be.visible');

        // Select to hide the skip logic target
        cy.byId(source).click().type('{downArrow}').type('{enter}');
        cy.byId(targetWithSklSourceExists).should('not.exist');
        cy.byId(targetWithSklSourceNotExists).should('be.visible');

        // Select to show skip logic target item.
        cy.byId(source).click().type('{downArrow}').type('{downArrow}').type('{enter}');
        cy.byId(targetEqual).should('be.visible');
        // Field is displayed but no value entered in the item. The chained targets skip logic is not satisfied.
        cy.byId(targetWithSklSourceExists).should('not.exist');
        cy.byId(targetWithSklSourceNotExists).should('be.visible');
        // Value entered in the item. The chained targets skip logic is satisfied.
        cy.byId(targetEqual).click().clear().type('xxx');
        cy.byId(targetWithSklSourceExists).should('be.visible');
        cy.byId(targetWithSklSourceNotExists).should('not.exist');
      });
    }

    it('should work with data control whose source is controlled by skip logic', () => {
      tp.loadFromTestData('test-skiplogic-datacontrol.json');
      const source = '1/1';
      const skipLogicItem = '2/1';
      const dataControlItemWithSourceHavingSkipLogic = '3/1';

      cy.byId(source).should('be.visible');
      cy.byId(skipLogicItem).should('not.exist');
      cy.byId(dataControlItemWithSourceHavingSkipLogic).should('not.exist');

      // Not met skip logic condition ==> skip logic disabled
      cy.byId(source).click().type('xxx');
      cy.byId(skipLogicItem).should('not.exist');
      cy.byId(dataControlItemWithSourceHavingSkipLogic).should('not.exist');

      // Met skip logic condition
      cy.byId(source).click().clear().type('show 2');
      cy.byId(skipLogicItem).should('be.visible');

      // skipLogicItem is present but its value does not exists yet.
      cy.byId(dataControlItemWithSourceHavingSkipLogic).should('not.exist');

      cy.byId(skipLogicItem).click().type('xxx');
      cy.byId(dataControlItemWithSourceHavingSkipLogic).should('be.visible').should('have.value', 'xxx');
    });

  });

});
