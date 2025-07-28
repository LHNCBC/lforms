import {TestPage} from '../../support/lforms_testpage.po.js';
import {answerId} from '../../support/util';

describe('rendering-xhtml', () => {
  describe('on answerOption', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    describe('valueString', () => {
      it('should display answerOption html if allowed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'STU3');
        // radio
        cy.byId('#item-valueString-group2-item1/1/1')
          .find('.testBold')
          .should('have.length', 3);
        cy.byId('#item-valueString-group2-item1/1/1')
          .find('.testImage')
          .should('be.visible');
        // checkbox
        cy.byId('#item-valueString-group2-item2/1/1')
          .find('.testBold')
          .should('have.length', 3);
        cy.byId('#item-valueString-group2-item2/1/1')
          .find('.testImage')
          .should('be.visible');
        // autocomplete
        cy.byId('#valueString-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; bold <b class=\"testBold\">A</b>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold <b class=\"testBold\">B</b>");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold <b class=\"testBold\">C</b><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.byId('#valueString-group1-item1/1/1').should('have.value', "bold B");
      });

      it('should display answerOption text if not allowed in template options', () => {
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'STU3');
        cy.get('.testBold')
          .should('not.exist');
        // radio
        cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold a'))
          .should('have.text', "bold a");
        cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold b'))
          .should('have.text', "bold b");
        cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold c'))
          .should('have.text', "bold c");
        // checkbox
        cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold a'))
          .should('have.text', "bold a");
        cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold b'))
          .should('have.text', "bold b");
        cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold c'))
          .should('have.text', "bold c");

        // autocomplete
        cy.byId('#valueString-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; bold a");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold b");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold c");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.byId('#valueString-group1-item1/1/1').should('have.value', "bold b");
      });
    });

    describe('valueCoding.display', () => {
      it('should display answerOption html if allowed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'STU3');
        // radio
        cy.byId('#item-valueCoding-group2-item1/1/1')
          .find('.testItalic')
          .should('have.length', 3);
        // checkbox
        cy.byId('#item-valueCoding-group2-item2/1/1')
          .find('.testItalic')
          .should('have.length', 3);
        // autocomplete
        cy.byId('#valueCoding-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic <i class=\"testItalic\">B</i>");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "italic B");
      });

      it('should display answerOption text if not allowed in template options', () => {
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'STU3');
        cy.get('.testItalic')
          .should('not.exist');
        // radio
        cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'a'))
          .should('have.text', "italic a");
        cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'b'))
          .should('have.text', "italic b");
        cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'c'))
          .should('have.text', "italic c");
        // checkbox
        cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'a'))
          .should('have.text', "italic a");
        cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'b'))
          .should('have.text', "italic b");
        cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'c'))
          .should('have.text', "italic c");
        // autocomplete
        cy.byId('#valueCoding-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic a");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic c");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "italic b");
      });
    });

  });
});

