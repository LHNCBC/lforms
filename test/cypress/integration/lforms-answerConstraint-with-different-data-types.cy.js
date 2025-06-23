import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
const po = new AddFormToPageTestPage();
const lfDataTypes = ["ST", "INT", "DT", "TM", "CODING"];

// function resetAnswerConstraint(formDataOrItem, ansConstraint) {
//   if (formDataOrItem && formDataOrItem.items) {
//     for(let i, iLen=formDataOrItem.items.length; i<iLen; i++) {
//       let item = formDataOrItem.items[i];
//       if (datTypes.includes(item.dataType)) {
//         if (!ansConstraint) {
//           delete item.answerConstaint;
//         }
//         else {
//           item.answerConstaint = ansConstraint;
//         }
//       }
//       if (item.items && item.items.length>0) {
//         resetAnswerConstraint(item, ansConstraint);
//       }
//     }
//   }
// }

function testAnswerConstraintNullOrOptionsOnly(valueType, params, formData, noAnswerConstraint) {

  describe(valueType, () => {

    let desc = noAnswerConstraint ?
        'should render a questionnaire with '+valueType+' and no answerConstraint' :
        'should render a questionnaire with '+valueType+' and answerConstraint="optionsOnly"'
    it(desc, function() {
      util.addFormToPage(formData);

      // group 1
      // autocomplete, non-repeats
      cy.byId(params.itemIds.g1item1)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g1Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g1Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g1Answer3);
      // autocomplete, repeats
      cy.byId(params.itemIds.g1item2)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g1Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g1Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g1Answer3);

      // group 2
      // raidobutoon
      cy.byId(params.itemIds.g2item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      // checkbox
      cy.byId(params.itemIds.g2item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);

      // group 3
      // autocomplete, non-repeats, prefix, score
      cy.byId(params.itemIds.g3item1)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g3Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g3Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g3Answer3);
        // autocomplete, repeats, prefix, score
      cy.byId(params.itemIds.g3item2)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g3Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g3Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g3Answer3);

      // group 4
      // radiobutton, prefix, score
      cy.byId(params.itemIds.g4item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g3Answer2);
      // checkbox, prefix, score
      cy.byId(params.itemIds.g4item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g3Answer2);

      // group 5
      // autocomplete, non-repeats, initial
      cy.byId(params.itemIds.g5item1)
        .should('be.visible')
        .should('have.value', params.itemValues.g1Answer2);
      // autocomplete, repeats, initial
      cy.byId(params.itemIds.g5item2)
        .should('be.visible');

      cy.byId(`item-${params.itemIds.g5item2}`)
        .byCss('span.autocomp_selected li')
        .should('have.length', 2)
      cy.byId(`item-${params.itemIds.g5item2}`)
        .byCss('span.autocomp_selected li')
        .eq(0)
        .should('have.text', '×' + params.itemValues.g1Answer2)
      cy.byId(`item-${params.itemIds.g5item2}`)
        .byCss('span.autocomp_selected li')
        .eq(1)
        .should('have.text', '×' + params.itemValues.g1Answer3)

      // group 6
      // radiobutton, non-repeats, initial
      cy.byId(params.itemIds.g6item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      cy.byId(`${params.itemIds.g6item1ans2} input`)
        .should('be.checked');

      // checkbox, repeats, initial
      cy.byId(params.itemIds.g6item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      cy.byId(`${params.itemIds.g6item2ans1} input`)
        .should('not.be.checked');
      cy.byId(`${params.itemIds.g6item2ans2} input`)
        .should('be.checked')
      cy.byId(params.itemIds.g6item2ans3)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer3);
      cy.byId(`${params.itemIds.g6item2ans3} input`)
        .should('be.checked');

    });


  });
}

function testAnswerConstraintOptionsOrString(valueType, params, formData) {
  // valueString
  describe(valueType, () => {

    it('should render a lforms form with '+valueType+' and answerConstraint="optionsOrString"', function() {
      util.addFormToPage(formData);

      // group 1
      // autocomplete, non-repeats
      cy.byId(params.itemIds.g1item1)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g1Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g1Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g1Answer3);
      // autocomplete, repeats
      cy.byId(params.itemIds.g1item2)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g1Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g1Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g1Answer3);

      // group 2
      // radiobutoon
      cy.byId(params.itemIds.g2item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      // checkbox
      cy.byId(params.itemIds.g2item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);

      // group 3
      // autocomplete, non-repeats, prefix, score
      cy.byId(params.itemIds.g3item1)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g3Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g3Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g3Answer3);
        // autocomplete, repeats, prefix, score
      cy.byId(params.itemIds.g3item2)
        .should('be.visible')
        .click();
      cy.byCss("#searchResults li").eq(0).contains(params.itemValues.g3Answer1);
      cy.byCss("#searchResults li").eq(1).contains(params.itemValues.g3Answer2);
      cy.byCss("#searchResults li").eq(2).contains(params.itemValues.g3Answer3);

      // group 4
      // radiobutton, prefix, score
      cy.byId(params.itemIds.g4item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g3Answer2);
      // checkbox, prefix, score
      cy.byId(params.itemIds.g4item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g3Answer2);

      // group 5
      // autocomplete, non-repeats, initial
      cy.byId(params.itemIds.g5item1)
        .should('be.visible')
        .should('have.value', "user typed value");
      // autocomplete, repeats, initial
      cy.byId(params.itemIds.g5item2)
        .should('be.visible');
      cy.byId(`item-${params.itemIds.g5item2}`)
        .byCss('span.autocomp_selected li')
        .should('have.length', 2)
      cy.byId(`item-${params.itemIds.g5item2}`)
        .byCss('span.autocomp_selected li')
        .eq(0)
        .should('have.text', '×' + params.itemValues.g1Answer2)
      cy.byId(`item-${params.itemIds.g5item2}`)
        .byCss('span.autocomp_selected li')
        .eq(1)
        .should('have.text', '×' + 'user typed value')

      // group 6
      // radiobutton, non-repeats, initial
      cy.byId(params.itemIds.g6item1ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);

      cy.byId(`${params.itemIds.g6item1ans2} input`)
        .should('not.be.checked');
      cy.byId(`${params.itemIds.g6item1ansOther} input`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g6item1ansOtherValue}`)
        .should('be.visible')
        .should('have.value', "user typed value")

      // checkbox, repeats, initial
      cy.byId(params.itemIds.g6item2ans2)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer2);
      cy.byId(`${params.itemIds.g6item2ans1} input`)
        .should('not.be.checked');
      cy.byId(`${params.itemIds.g6item2ans2} input`)
        .should('be.checked')
      cy.byId(params.itemIds.g6item2ans3)
        .should('be.visible')
        .should('contain',params.itemValues.g1Answer3);

      cy.byId(`${params.itemIds.g6item2ans3} input`)
        .should('not.be.checked');
      cy.byId(`${params.itemIds.g6item2ansOther} input`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g6item2ansOtherValue}`)
        .should('be.visible')
        .should('have.value', "user typed value")

      // group 7
      // radiobutton, matrix
      cy.byId(`${params.itemIds.g7item1ans2}`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g7item2ansOther}`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g7item2ansOtherValue}`)
        .should('be.visible')
        .should('have.value', "user typed value")

      // group 8
      // checknbox, matrix
      cy.byId(`${params.itemIds.g8item1ans2}`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g8item1ans3}`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g8item2ans2}`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g8item2ansOther}`)
        .should('be.checked');
      cy.byId(`${params.itemIds.g8item2ansOtherValue}`)
        .should('be.visible')
        .should('have.value', "user typed value")

    });

  });
}


describe('answerConstaint with different types', () => {
  before(() => {
    po.openPage();
  });

  (function () {

    let valueTypes = ["valueString", "valueInteger", "valueDate", "valueTime", "valueCoding"];

    let itemValues = {
      'valueString': {
        g1Answer1 : 'a',
        g1Answer2 : 'b',
        g1Answer3 : 'c',
        g3Answer1 : 'A. a - 1',
        g3Answer2 : 'B. b - 2',
        g3Answer3 : 'C. c - 3'
      },
      'valueInteger': {
        g1Answer1 : '12',
        g1Answer2 : '34',
        g1Answer3 : '56',
        g3Answer1 : 'A. 12 - 1',
        g3Answer2 : 'B. 34 - 2',
        g3Answer3 : 'C. 56 - 3'
      },
      'valueDate': {
        g1Answer1 : '2022',
        g1Answer2 : '2022-09',
        g1Answer3 : '2022-09-20',
        g3Answer1 : 'A. 2022 - 1',
        g3Answer2 : 'B. 2022-09 - 2',
        g3Answer3 : 'C. 2022-09-20 - 3'
      },
      'valueTime': {
        g1Answer1 : '10:30:00',
        g1Answer2 : '13:30:00',
        g1Answer3 : '23:59:59',
        g3Answer1 : 'A. 10:30:00 - 1',
        g3Answer2 : 'B. 13:30:00 - 2',
        g3Answer3 : 'C. 23:59:59 - 3'
      },
      'valueCoding': {
        g1Answer1 : 'Answer 1',
        g1Answer2 : 'Answer 2',
        g1Answer3 : 'Answer 3',
        g1Code1: 'c1',
        g1Code2: 'c2',
        g1Code3: 'c3',
        g3Answer1 : 'A. Answer 1 - 1',
        g3Answer2 : 'B. Answer 2 - 2',
        g3Answer3 : 'C. Answer 3 - 3'
      }
    };


    let qrItemValues = {
      'valueString': {
        g1Answer1 : {'valueString' : 'a'},
        g1Answer2 : {'valueString' : 'b'},
        g1Answer3 : {'valueString' : 'c'},
      },
      'valueInteger': {
        g1Answer1 : {'valueInteger' : 12},
        g1Answer2 : {'valueInteger' : 34},
        g1Answer3 : {'valueInteger' : 56},
      },
      'valueDate': {
        g1Answer1 : {'valueDate' : '2022'},
        g1Answer2 : {'valueDate' : '2022-09'},
        g1Answer3 : {'valueDate' : '2022-09-20'},
      },
      'valueTime': {
        g1Answer1 : {'valueTime' : '10:30:00'},
        g1Answer2 : {'valueTime' : '13:30:00'},
        g1Answer3 : {'valueTime' : '23:59:59'},
      },
      'valueCoding': {
        g1Answer1 : {"valueCoding": {"code": "c1", "display": "Answer 1"}},
        g1Answer2 : {"valueCoding": {"code": "c2", "display": "Answer 2"}},
        g1Answer3 : {"valueCoding": {"code": "c3", "display": "Answer 3"}}
      }
    };

    let itemIds = ((valueType, itemValues) => {
      let coding = (valueType === "valueCoding")

      return {
        g1item1 : `${valueType}-group1-item1/1/1`,
        g1item2 : `${valueType}-group1-item2/1/1`,
        g3item1 : `${valueType}-group3-item1/1/1`,
        g3item2 : `${valueType}-group3-item2/1/1`,
        g5item1 : `${valueType}-group5-item1/1/1`,
        g5item2 : `${valueType}-group5-item2/1/1`,

        g2item1ans2 : `${valueType}-group2-item1/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g2item2ans2 : `${valueType}-group2-item2/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g4item1ans2 : `${valueType}-group4-item1/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g4item2ans2 : `${valueType}-group4-item2/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g6item1ans1 : `${valueType}-group6-item1/1/1||${coding? itemValues.g1Code1 : itemValues.g1Answer1}`,
        g6item1ans2 : `${valueType}-group6-item1/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g6item1ans3 : `${valueType}-group6-item1/1/1||${coding? itemValues.g1Code3 : itemValues.g1Answer3}`,
        g6item2ans1 : `${valueType}-group6-item2/1/1||${coding? itemValues.g1Code1 : itemValues.g1Answer1}`,
        g6item2ans2 : `${valueType}-group6-item2/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g6item2ans3 : `${valueType}-group6-item2/1/1||${coding? itemValues.g1Code3 : itemValues.g1Answer3}`,

        g6item1ansOther : `${valueType}-group6-item1/1/1_other`,
        g6item1ansOtherValue : `${valueType}-group6-item1/1/1_otherValue`,
        g6item2ansOther : `${valueType}-group6-item2/1/1_other`,
        g6item2ansOtherValue : `${valueType}-group6-item2/1/1_otherValue`,

        g7item1ans2 : `${valueType}-group7-item1/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g7item2ansOther : `${valueType}-group7-item2/1/1_other`,
        g7item2ansOtherValue : `${valueType}-group7-item2/1/1_otherValue`,

        g8item1ans2 : `${valueType}-group8-item1/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g8item1ans3 : `${valueType}-group8-item1/1/1||${coding? itemValues.g1Code3 : itemValues.g1Answer3}`,
        g8item2ans2 : `${valueType}-group8-item2/1/1||${coding? itemValues.g1Code2 : itemValues.g1Answer2}`,
        g8item2ansOther : `${valueType}-group8-item2/1/1_other`,
        g8item2ansOtherValue : `${valueType}-group8-item2/1/1_otherValue`,
      };
    });

    // run tests
    valueTypes.map((valueType, index) => {
      let values = itemValues[valueType];
      let ids = itemIds(valueType, values);
      let lfDataType = lfDataTypes[index];
      let params = {
        itemIds: ids,
        itemValues: values,
        qrItemValues: qrItemValues[valueType]
      }

      let fileName = `answerConstraint/dataType-${lfDataType}.json`;
      testAnswerConstraintNullOrOptionsOnly(lfDataType, params, fileName, true);

      fileName = `answerConstraint/dataType-${lfDataType}-optionsOnly.json`;
      testAnswerConstraintNullOrOptionsOnly(lfDataType, params, fileName, false);

      fileName = `answerConstraint/dataType-${lfDataType}-optionsOrString.json`;
      testAnswerConstraintOptionsOrString(lfDataType, params, fileName);

    });

  })();
});




