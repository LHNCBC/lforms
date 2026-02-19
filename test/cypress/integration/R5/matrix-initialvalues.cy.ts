import { TestPage } from '../../support/lforms_testpage.po.js';
import {answerId} from '../../support/util';

describe('Matrix Initial values on Radio buttons', () => {
  const tp: TestPage = new TestPage();

  it('displays a radio matrix table with initial values displayed --coding', () => {
    tp.openBaseTestPage();
    const files = ['matrixLayout-initialvalue-coding-non-repeats.R5.json',
      'matrixLayout-initialvalue-coding-optionsOrString-non-repeats.R5.json'
    ]
    files.forEach((file) => {
      tp.loadFromTestData(file, 'R5');

      const item1answer2 = answerId('/g1m1/1/1', undefined, 'c2'),
      item2answer1 = answerId('/g1m2/1/1', undefined, 'c1'),
      item3answer3 = answerId('/g1m3/1/1', undefined, 'c3');

      cy.byId(item1answer2).should('be.checked');
      cy.byId(item2answer1).should('be.checked');
      cy.byId(item3answer3).should('be.checked');

      cy.window().then((win) => {
        const qr = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R5");
        expect(qr.item[0].item.length).to.equal(3);
        expect(qr.item[0].item[0].answer[0].valueCoding.code).to.equal("c2");
        expect(qr.item[0].item[0].answer[0].valueCoding.display).to.equal("Answer b");
        expect(qr.item[0].item[0].linkId).to.eql("/g1m1");

        expect(qr.item[0].item[1].answer[0].valueCoding.code).to.equal("c1");
        expect(qr.item[0].item[1].answer[0].valueCoding.display).to.equal("Answer a");
        expect(qr.item[0].item[1].linkId).to.eql("/g1m2");

        expect(qr.item[0].item[2].answer[0].valueCoding.code).to.equal("c3");
        expect(qr.item[0].item[2].answer[0].valueCoding.display).to.equal("Answer c");
        expect(qr.item[0].item[2].linkId).to.eql("/g1m3");

      });

    });
  });

  it('displays a radio matrix table with initial values displayed --string', () => {
    tp.openBaseTestPage();
    const files = ['matrixLayout-initialvalue-string-non-repeats.R5.json',
      'matrixLayout-initialvalue-string-optionsOrString-non-repeats.R5.json'
    ]
    files.forEach((file) => {
      tp.loadFromTestData(file, 'R5');

      const item1answer2 = answerId('/g1m1/1/1', undefined, 'b'),
      item2answer1 = answerId('/g1m2/1/1', undefined, 'a'),
      item3answer3 = answerId('/g1m3/1/1', undefined, 'c');

      cy.byId(item1answer2).should('be.checked');
      cy.byId(item2answer1).should('be.checked');
      cy.byId(item3answer3).should('be.checked');

      cy.window().then((win) => {
        const qr = win.LForms.Util.getFormFHIRData("QuestionnaireResponse", "R5");
        expect(qr.item[0].item.length).to.equal(3);
        expect(qr.item[0].item[0].answer[0].valueString).to.equal("b");
        expect(qr.item[0].item[0].linkId).to.eql("/g1m1");

        expect(qr.item[0].item[1].answer[0].valueString).to.equal("a");
        expect(qr.item[0].item[1].linkId).to.eql("/g1m2");

        expect(qr.item[0].item[2].answer[0].valueString).to.equal("c");
        expect(qr.item[0].item[2].linkId).to.eql("/g1m3");

      });

    });
  });
});
