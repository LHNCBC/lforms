import {TestPage} from '../../support/lforms_testpage.po.js';
import * as util from "../../support/util";
const answerId = util.answerId;

describe('rendering-markdown', () => {
  describe('on item.text', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    it('should display question html if allowed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-text.json', 'R4');
      cy.contains('Please answer Yes or No to each of the following questions:').should('not.exist');
      cy.byId('label-1.1/1').find('h1').should('have.text', 'This is a markdown heading');
      cy.byId('label-1.1/1').find('li').should('have.length', 2);
      cy.byId('label-1.1/1').find('strong').should('have.text', 'This text is bold');
      cy.byId('label-1.1/1').find('em').should('have.text', 'This text is italicized');
    });

    it('should display question text if not allowed in template options', () => {
      tp.loadFromTestData('q-with-rendering-markdown-text.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.text', 'Please answer Yes or No to each of the following questions:');
    });

    it('should display question escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-text-with-invalid-tag.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.text', "<h1>This is a <script>Yes</script> markdown heading</h1>\n");
    });

    it('should display question text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-text-with-invalid-tag.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.text', 'Please answer Yes or No to each of the following questions:');
    });

    it('should use rendering-xhtml if both rendering-markdown and rendering-xhtml are present', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-and-rendering-markdown.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.html', '<i class="testPlease">Please</i> answer <b>Yes</b> or <b>No</b> to each of the following questions:');
    });
  });

  describe('on item.prefix', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    it('should display prefix html if allowed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-prefix.json', 'R4');
      cy.byId('label-1.1/1').find('.prefix').find('h1').should('have.text', 'This is a markdown heading');
    });

    it('should display prefix text if not allowed in template options', () => {
      tp.loadFromTestData('q-with-rendering-markdown-prefix.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.prefix')
        .eq(0)
        .should('have.text', 'A:');
    });

    it('should display prefix escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-prefix-with-invalid-tag.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.prefix')
        .eq(0)
        .should('have.text', "<h1>This is a <script>Yes</script> markdown heading</h1>\n");
    });

    it('should display prefix text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-prefix-with-invalid-tag.json', 'R4');
      cy.contains('This is a markdown heading')
        .should('not.exist');
      cy.get('.prefix')
        .eq(0)
        .should('have.text', 'A:');
    });
  });

  describe('on item.legal and item.codingInstrctions', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    it('should display help and legal html if allowed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-help-and-legal.json', 'R4');
      cy.byId('help-button-1.1/1').click();
      cy.byId('help-content-1.1/1').find('h1').should('have.text', 'This is a markdown heading');
      cy.byId('legal-button-1.2/1').click();
      cy.byId('legal-content-1.2/1').find('h1').should('have.text', 'This is a markdown heading');
    });

    it('should display help and legal escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-help-and-legal-with-invalid-tag.json', 'R4');
      cy.byId('help-button-1.1/1').click();
      cy.byId('help-content-1.1/1').should('have.text', "<h1>This is a <script>bad</script> markdown heading</h1>\n");
      cy.byId('legal-button-1.2/1').click();
      cy.byId('legal-content-1.2/1').should('have.text', "<h1>This is a <script>bad</script> markdown heading</h1>\n");
    });

    it('should display help and legal text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-markdown-help-and-legal-with-invalid-tag.json', 'R4');
      cy.byId('help-button-1.1/1').click();
      cy.byId('help-content-1.1/1').should('have.text', 'some help text');
      cy.byId('legal-button-1.2/1').click();
      cy.byId('legal-content-1.2/1').should('have.text', 'some legal text');
    });
  });

  describe('on answerOption', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    describe('valueString', () => {
      it('should display answerOption html if allowed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption.json', 'R4');
        // radio
        cy.byId('#item-valueString-group2-item1/1/1')
          .find('strong')
          .should('have.length', 3);
        // checkbox
        cy.byId('#item-valueString-group2-item2/1/1')
          .find('strong')
          .should('have.length', 3);
        // autocomplete
        cy.byId('#valueString-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; <p><strong>This text is bold A</strong></p>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; <p><strong>This text is bold B</strong></p>");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; <p><strong>This text is bold C</strong></p>");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.byId('#valueString-group1-item1/1/1').should('have.value', "This text is bold B");
      });

      it('should display answerOption text if not allowed in template options', () => {
        tp.loadFromTestData('q-with-rendering-markdown-answerOption.json', 'R4');
        cy.contains('This text is bold')
          .should('not.exist');
        // radio
        cy.byId(answerId('#valueString-group2-item1/1/1', undefined, 'bold a'))
          .should('have.text', "bold a");
        cy.byId(answerId('#valueString-group2-item1/1/1', undefined, 'bold b'))
          .should('have.text', "bold b");
        cy.byId(answerId('#valueString-group2-item1/1/1', undefined, 'bold c'))
          .should('have.text', "bold c");
        // checkbox
        cy.byId(answerId('#valueString-group2-item2/1/1', undefined, 'bold a'))
          .should('have.text', "bold a");
        cy.byId(answerId('#valueString-group2-item2/1/1', undefined, 'bold b'))
          .should('have.text', "bold b");
        cy.byId(answerId('#valueString-group2-item2/1/1', undefined, 'bold c'))
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

      it('should display answerOption escaped html, if invalid tags are displayed in template options', () => {
        cy.get('#allowHTML').click();
        cy.get('#displayInvalidHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption-with-invalid-tag.json', 'R4');
        // radio
        cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold a'))
          .should('have.text', "<p><strong>This text is <script>bad</script> bold A</strong></p>\n");
        cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold b'))
          .should('have.text', "<p><strong>This text is <script>bad</script> bold B</strong></p>\n");
        cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold c'))
          .should('have.text', "<p><strong>This text is <script>bad</script> bold C</strong></p>\n");
        // checkbox
        cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold a'))
          .should('have.text', "<p><strong>This text is <script>bad</script> bold A</strong></p>\n");
        cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold b'))
          .should('have.text', "<p><strong>This text is <script>bad</script> bold B</strong></p>\n");
        cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold c'))
          .should('have.text', "<p><strong>This text is <script>bad</script> bold C</strong></p>\n");
        // autocomplete
        cy.byId('valueString-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &amp;lt;p&amp;gt;&amp;lt;strong&amp;gt;This text is &amp;lt;script&amp;gt;bad&amp;lt;/script&amp;gt; bold A&amp;lt;/strong&amp;gt;&amp;lt;/p&amp;gt;");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; &amp;lt;p&amp;gt;&amp;lt;strong&amp;gt;This text is &amp;lt;script&amp;gt;bad&amp;lt;/script&amp;gt; bold B&amp;lt;/strong&amp;gt;&amp;lt;/p&amp;gt;");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; &amp;lt;p&amp;gt;&amp;lt;strong&amp;gt;This text is &amp;lt;script&amp;gt;bad&amp;lt;/script&amp;gt; bold C&amp;lt;/strong&amp;gt;&amp;lt;/p&amp;gt;");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(0).click();
        cy.byId('#valueString-group1-item1/1/1').should('have.value', "&lt;p&gt;&lt;strong&gt;This text is &lt;script&gt;bad&lt;/script&gt; bold A&lt;/strong&gt;&lt;/p&gt;");
      });

      it('should display answerOption text, if invalid tags are not displayed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption-with-invalid-tag.json', 'R4');
        // An error message should be shown on each question with invalid HTML tags in answerOptions.
        cy.contains('Invalid HTML tags/attributes found in answerOptions.').should('be.visible');
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
      });
    });

    describe('valueCoding.display', () => {
      it('should display answerOption html if allowed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption.json', 'R4');
        // radio
        cy.byId('#item-valueCoding-group2-item1/1/1')
          .find('em')
          .should('have.length', 3);
        // checkbox
        cy.byId('#item-valueCoding-group2-item2/1/1')
          .find('em')
          .should('have.length', 3);
        // autocomplete
        cy.byId('#valueCoding-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; <p><em>This text is italicized A</em></p>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; <p><em>This text is italicized B</em></p>");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; <p><em>This text is italicized C</em></p>");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "This text is italicized B");
      });

      it('should display answerOption text if not allowed in template options', () => {
        tp.loadFromTestData('q-with-rendering-markdown-answerOption.json', 'R4');
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

      it('should display answerOption escaped html, if invalid tags are displayed in template options', () => {
        cy.get('#allowHTML').click();
        cy.get('#displayInvalidHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption-with-invalid-tag.json', 'R4');
        // radio
        cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'a'))
          .should('have.text', "<p><em>This text is <script>bad</script> italicized A</em></p>\n");
        cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'b'))
          .should('have.text', "<p><em>This text is <script>bad</script> italicized B</em></p>\n");
        cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'c'))
          .should('have.text', "<p><em>This text is <script>bad</script> italicized C</em></p>\n");
        // checkbox
        cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'a'))
          .should('have.text', "<p><em>This text is <script>bad</script> italicized A</em></p>\n");
        cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'b'))
          .should('have.text', "<p><em>This text is <script>bad</script> italicized B</em></p>\n");
        cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'c'))
          .should('have.text', "<p><em>This text is <script>bad</script> italicized C</em></p>\n");
        // autocomplete
        cy.byId('#valueCoding-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &amp;lt;p&amp;gt;&amp;lt;em&amp;gt;This text is &amp;lt;script&amp;gt;bad&amp;lt;/script&amp;gt; italicized A&amp;lt;/em&amp;gt;&amp;lt;/p&amp;gt;");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; &amp;lt;p&amp;gt;&amp;lt;em&amp;gt;This text is &amp;lt;script&amp;gt;bad&amp;lt;/script&amp;gt; italicized B&amp;lt;/em&amp;gt;&amp;lt;/p&amp;gt;");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; &amp;lt;p&amp;gt;&amp;lt;em&amp;gt;This text is &amp;lt;script&amp;gt;bad&amp;lt;/script&amp;gt; italicized C&amp;lt;/em&amp;gt;&amp;lt;/p&amp;gt;");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(0).click();
        cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "&lt;p&gt;&lt;em&gt;This text is &lt;script&gt;bad&lt;/script&gt; italicized A&lt;/em&gt;&lt;/p&gt;");
      });

      it('should display answerOption text, if invalid tags are not displayed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption-with-invalid-tag.json', 'R4');
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
      });

      it('should remove the option after user selects it in multi-select list', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-markdown-answerOption.json', 'R4');
        // autocomplete
        cy.byId('#valueCoding-group1-item2/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; <p><em>This text is italicized A</em></p>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; <p><em>This text is italicized B</em></p>");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; <p><em>This text is italicized C</em></p>");
        // Check the list after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 2);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; <p><em>This text is italicized A</em></p>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; <p><em>This text is italicized C</em></p>");
      });
    });
  });
});

