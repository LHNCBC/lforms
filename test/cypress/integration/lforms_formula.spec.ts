import {TestPage} from '../support/lforms_testpage.po.js';

describe('formula', () => {
  const tp: TestPage = new TestPage();
  const ff: any = tp.USSGFHTVertical;

  it('Two BMI formulas should both work', () => {
    tp.LoadForm.openUSSGFHTVertical();

    // check bmi1
    cy.byId(ff.height1).type('70');
    cy.byId(ff.bmi1).should('have.value', '');
    cy.byId(ff.weight1).type('170');
    cy.byId(ff.bmi1).should('have.value', '24.39');
    cy.byId(ff.height1).clear().type('80');
    cy.byId(ff.bmi1).should('have.value', '18.68');

    // change height unit and check bmi1 again
    cy.byId(ff.heightUnit1).click()
      // pick the 2nd item, centimeters
      .type('{downArrow}').type('{downArrow}').blur();
    cy.byId(ff.height1).clear().type('170');
    cy.byId(ff.bmi1).should('have.value', '26.68');

    // change weight unit and check bmi1 again
    cy.byId(ff.weightUnit1).click()
      // pick the 2nd item, kgs
      .type('{downArrow}').type('{downArrow}').blur();
    cy.byId(ff.weight1).clear().type('80');
    cy.byId(ff.bmi1).should('have.value', '27.68');

    // check bmi2
    cy.byId(ff.height2).type('70');
    cy.byId(ff.bmi2).should('have.value', '');
    cy.byId(ff.weight2).type('170');
    cy.byId(ff.bmi2).should('have.value', '24.39');
    cy.byId(ff.height2).clear().type('80');
    cy.byId(ff.bmi2).should('have.value', '18.68');
  });

  it('should work with calculation method having skip logic disabled sources', () => {
    tp.openBaseTestPage();
    tp.loadFromTestData('skip-logic-calculation-method.json');
    const sklSource = 'SKL-CONTROL/1';
    const sklTarget = 'A-ITEM/1';
    const noSklItem = 'B-ITEM/1';
    const totalScore = 'TS/1';

    cy.byId(sklSource).should('be.visible').should('have.value', '');
    cy.byId(sklTarget).should('not.exist');
    cy.byId(noSklItem).should('be.visible').should('have.value', '');
    cy.byId(totalScore).should('be.visible').should('have.value', '0');

    cy.byId(noSklItem).click().type('{downArrow}').type('{downArrow}').type('{enter}')
      .should('have.value', '1. B2 - 10');
    cy.byId(totalScore).should('have.value', '10');

    cy.byId(sklSource).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(sklTarget).should('be.visible');
    cy.byId(totalScore).should('have.value', '10');

    cy.byId(sklTarget).type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}')
      .should('have.value', '2. A3 - 20');
    cy.byId(totalScore).should('have.value', '30');

    // Hide skip logic target, total score should change to 10
    cy.byId(sklSource).type('{downArrow}').type('{enter}');
    cy.byId(sklTarget).should('not.exist');
    cy.byId(totalScore).should('have.value', '10');

    // Show skip logic target, total score should change back to 30
    cy.byId(sklSource).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.byId(sklTarget).should('be.visible').should('have.value', '2. A3 - 20');
    cy.byId(totalScore).should('have.value', '30');
  });

  // Multiple total scores are not supported any more. We might bring it back if there are such use cases.
  //
  // it('Two correctly structured TOTALSCORE rules on a form should both work', function() {
  //
  //   var answer1 = element(by.id("/44249-1/44250-9/1/1")),
  //       answer2 = element(by.id("/44249-1/44255-8/1/1")),
  //       score1 = element(by.id("/44249-1/44261-6/1/1"));
  //
  //   var answer3 = element(by.id("/38213-5/38216-8/1/1")),
  //       answer4 = element(by.id("/38213-5/38217-6/1/1")),
  //       score2 = element(by.id("/38213-5/38215-0/1/1"));
  //
  //   tp.openTwoTotalScoreForm();
  //   expect(score1.getAttribute('value')).toBe("0");
  //   expect(score2.getAttribute('value')).toBe("0");
  //
  //   //check total score #1
  //   answer1.click();
  //   answer1.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer1.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer1.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("1");
  //   expect(score2.getAttribute('value')).toBe("0");
  //   answer2.click();
  //   answer2.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer2.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer2.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("2");
  //   expect(score2.getAttribute('value')).toBe("0");
  //
  //   //check total score #2
  //   answer3.click();
  //   answer3.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer3.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer3.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer3.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("2");
  //   expect(score2.getAttribute('value')).toBe("2");
  //   answer4.click();
  //   answer4.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer4.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer4.sendKeys(protractor.Key.ARROW_DOWN);
  //   answer4.sendKeys(protractor.Key.ENTER);
  //   expect(score1.getAttribute('value')).toBe("2");
  //   expect(score2.getAttribute('value')).toBe("4");
  //
  // })

});
