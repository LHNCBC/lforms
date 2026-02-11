import {TestPage} from '../support/lforms_testpage.po.js';

function testOneType(index, typeValue, inputId, otherEl) {
  cy.byId(inputId).click().clear().type(typeValue);
    cy.byId(otherEl).click();
    cy.byId(inputId).click();
    cy.byCss(".lhc-validation-popover").then(msgDiv=>{
      const msgRect = msgDiv[index].getBoundingClientRect();
      cy.byCss(".lhc-de-input-unit-content").then(contentDiv => {
        const contentRect = contentDiv[index].getBoundingClientRect();
        expect(msgRect.left).to.equal(contentRect.left);
        // 35px is the bottom position of the .lhc-validation-popover element, set in validation.css
        expect(msgRect.bottom).to.be.closeTo(contentRect.top, 0.01);
      })
    })
}

describe('Validations Message Position', () => {
  before(() => {
    const tp: TestPage = new TestPage();
    tp.openBaseTestPage();
    tp.loadFromTestData('validationOnRepeatingItems.json');
  });

  it('Validation messages should be right above the input field', () => {

    const inputIds = ['/int0/1', '/st0/1', '/int1/1', '/st1/1',
      '/group1/int1/1/1', '/group1/st1/1/1', '/group2/int1/1/1', '/group2/st1/1/1'];

    const addButtonIds = ['add-/int1/1', 'add-/st1/1', 'add-/group1/1', 'add-/group2/1'];
    const otherEl = '/other/1'; // Use for creating blur event

    // No need to test normal cases that are not repeating.
    // // testing messages positions
    // testOneType(0, "ss", inputIds[0], otherEl);
    // testOneType(1, "55", inputIds[1], otherEl);
    // testOneType(2, "ss", inputIds[2], otherEl);
    // testOneType(3, "55", inputIds[3], otherEl);
    // testOneType(4, "ss", inputIds[4], otherEl);
    // testOneType(5, "55", inputIds[5], otherEl);
    // testOneType(6, "ss", inputIds[6], otherEl);
    // testOneType(7, "55", inputIds[7], otherEl);

    // add a repeating item and test message positions
    cy.byId(addButtonIds[0]).click();
    testOneType(3, "ss", '/int1/2', otherEl);
    cy.byId(addButtonIds[1]).click();
    testOneType(5, "55", '/st1/2', otherEl);

    // test validation messages in repeating groups
    cy.byId(addButtonIds[2]).click();
    testOneType(6, "ss", '/group1/int1/1/1', otherEl);
    testOneType(7, "55", '/group1/st1/1/1', otherEl);
    testOneType(8, "ss", '/group1/int1/2/1', otherEl);
    testOneType(9, "55", '/group1/st1/2/1', otherEl);

    cy.byId(addButtonIds[3]).click();
    testOneType(10, "ss", '/group2/int1/1/1', otherEl);
    testOneType(11, "55", '/group2/st1/1/1', otherEl);
    testOneType(12, "ss", '/group2/int1/2/1', otherEl);
    testOneType(13, "55", '/group2/st1/2/1', otherEl);
  });
});
