import {TestPage} from '../../support/lforms_testpage.po.js';

describe('rendering-xhtml', () => {
  describe('on item.text', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    it('should display question html if allowed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-text.json', 'R4');
      cy.get('.testPlease')
        .should('be.visible')
        .should('have.text', 'Please');
      // contained image
      cy.get('.testContainedImage')
        .should('be.visible');
    });

    it('should display question text if not allowed in template options', () => {
      tp.loadFromTestData('q-with-rendering-xhtml-text.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.text', 'Please answer Yes or No to each of the following questions:');
    });

    it('should display question escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.text', "<i class='testPlease'>Please</i> answer <script>Yes</script> or <b>No</b> to each of the following questions:");
    });

    it('should display question text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.question')
        .eq(0)
        .should('have.text', 'Please answer Yes or No to each of the following questions:');
    });
  });

  describe('on item.prefix', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    it('should display prefix html if allowed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-prefix.json', 'R4');
      cy.get('.testPlease')
        .should('be.visible')
        .should('have.text', 'A');
      // contained image
      cy.get('.testContainedImage')
        .should('be.visible');
    });

    it('should display prefix text if not allowed in template options', () => {
      tp.loadFromTestData('q-with-rendering-xhtml-prefix.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.prefix')
        .eq(0)
        .should('have.text', 'A:');
    });

    it('should display prefix escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-prefix-with-invalid-tag.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.prefix')
        .eq(0)
        .should('have.text', "<i class='testPlease'>A</i> HTML <script>prefix:</script>");
    });

    it('should display prefix text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-prefix-with-invalid-tag.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.prefix')
        .eq(0)
        .should('have.text', 'A:');
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
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
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
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
        cy.get('.testBold')
          .should('not.exist');
        // radio
        cy.byId('#valueString-group2-item1/1/1bolda')
          .should('have.text', "bold a");
        cy.byId('#valueString-group2-item1/1/1boldb')
          .should('have.text', "bold b");
        cy.byId('#valueString-group2-item1/1/1boldc')
          .should('have.text', "bold c");
        // checkbox
        cy.byId('#valueString-group2-item2/1/1bolda')
          .should('have.text', "bold a");
        cy.byId('#valueString-group2-item2/1/1boldb')
          .should('have.text', "bold b");
        cy.byId('#valueString-group2-item2/1/1boldc')
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
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        cy.get('.testBold')
          .should('not.exist');
        // radio
        cy.byId('#valueString-group2-item1/1/1bolda')
          .should('have.text', "<script>bold</script> <b class='testBold'>A</b>");
        cy.byId('#valueString-group2-item1/1/1boldb')
          .should('have.text', "<script>bold</script> <b class='testBold'>B</b>");
        cy.byId('#valueString-group2-item1/1/1boldc')
          .should('have.text', "<script>bold</script> <b class='testBold'>C</b>");
        // checkbox
        cy.byId('#valueString-group2-item2/1/1bolda')
          .should('have.text', "<script>bold</script> <b class='testBold'>A</b>");
        cy.byId('#valueString-group2-item2/1/1boldb')
          .should('have.text', "<script>bold</script> <b class='testBold'>B</b>");
        cy.byId('#valueString-group2-item2/1/1boldc')
          .should('have.text', "<script>bold</script> <b class='testBold'>C</b>");
        // autocomplete
        cy.byId('#valueString-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &lt;script&gt;bold&lt;/script&gt; A");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold b");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold <b class=\"testBold\">C</b><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(0).click();
        cy.byId('#valueString-group1-item1/1/1').should('have.value', "&lt;script&gt;bold&lt;/script&gt; A");
      });

      it('should display answerOption text, if invalid tags are not displayed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        cy.get('.testBold')
          .should('not.exist');
        // radio
        cy.byId('#valueString-group2-item1/1/1bolda')
          .should('have.text', "bold a");
        cy.byId('#valueString-group2-item1/1/1boldb')
          .should('have.text', "bold b");
        cy.byId('#valueString-group2-item1/1/1boldc')
          .should('have.text', "bold c");
        // checkbox
        cy.byId('#valueString-group2-item2/1/1bolda')
          .should('have.text', "bold a");
        cy.byId('#valueString-group2-item2/1/1boldb')
          .should('have.text', "bold b");
        cy.byId('#valueString-group2-item2/1/1boldc')
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
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold <b class=\"testBold\">C</b><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
      });
    });

    describe('matrix layout', () => {
      it('should display plain text', () => {
        tp.loadFromTestData('answerOption-html-matrix-layout.json', 'R4');
        cy.byId('item-/matrixTable0/1')
          .find('th.lhc-form-matrix-cell')
          .as('tableHeaders');
        cy.get('@tableHeaders')
          .should('have.length', 3);
        cy.get('@tableHeaders')
          .eq(0)
          .should('have.text', 'Answer 1');
        cy.get('@tableHeaders')
          .eq(1)
          .should('have.text', 'Answer 2');
        cy.get('@tableHeaders')
          .eq(2)
          .should('have.text', 'Answer 3');
        // HTML options should display text when HTML is not allowed.
        cy.byId('item-/matrixTable1/1')
          .find('th.lhc-form-matrix-cell')
          .as('tableHeaders');
        cy.get('@tableHeaders')
          .should('have.length', 3);
        cy.get('@tableHeaders')
          .eq(0)
          .should('have.text', 'Answer 1');
        cy.get('@tableHeaders')
          .eq(1)
          .should('have.text', 'Answer 2');
        cy.get('@tableHeaders')
          .eq(2)
          .should('have.text', 'Answer 3');
        // Invalid HTML options should display text when HTML is not allowed.
        cy.byId('item-/matrixTable2/1')
          .find('th.lhc-form-matrix-cell')
          .as('tableHeaders');
        cy.get('@tableHeaders')
          .should('have.length', 3);
        cy.get('@tableHeaders')
          .eq(0)
          .should('have.text', 'Answer 1');
        cy.get('@tableHeaders')
          .eq(1)
          .should('have.text', 'Answer 2');
        cy.get('@tableHeaders')
          .eq(2)
          .should('have.text', 'Answer 3');
      });

      it('should display HTML', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('answerOption-html-matrix-layout.json', 'R4');
        cy.byId('item-/matrixTable1/1')
          .find('th.lhc-form-matrix-cell')
          .as('tableHeaders');
        cy.get('@tableHeaders')
          .should('have.length', 3);
        cy.get('@tableHeaders')
          .eq(0)
          .find('button')
          .should('exist');
        cy.get('@tableHeaders')
          .eq(1)
          .find('button')
          .should('exist');
        cy.get('@tableHeaders')
          .eq(2)
          .find('button')
          .should('exist');
        // Invalid HTML options should display text when invalid HTML is not displayed.
        cy.byId('item-/matrixTable2/1')
          .find('th.lhc-form-matrix-cell')
          .as('tableHeaders');
        cy.get('@tableHeaders')
          .should('have.length', 3);
        cy.get('@tableHeaders')
          .eq(0)
          .should('have.text', 'Answer 1');
        cy.get('@tableHeaders')
          .eq(1)
          .should('have.text', 'Answer 2');
        cy.get('@tableHeaders')
          .eq(2)
          .should('have.text', 'Answer 3');
      });

      it('should display escaped HTML', () => {
        cy.get('#allowHTML').click();
        cy.get('#displayInvalidHTML').click();
        tp.loadFromTestData('answerOption-html-matrix-layout.json', 'R4');
        cy.byId('item-/matrixTable2/1')
          .find('th.lhc-form-matrix-cell')
          .as('tableHeaders');
        cy.get('@tableHeaders')
          .should('have.length', 3);
        cy.get('@tableHeaders')
          .eq(0)
          .should('have.text', 'Answer <script>button</script> 1');
        cy.get('@tableHeaders')
          .eq(1)
          .should('have.text', 'Answer <script>button</script> 2');
        cy.get('@tableHeaders')
          .eq(2)
          .should('have.text', 'Answer <script>button</script> 3');
      });
    });

    describe('valueCoding.display', () => {
      it('should display answerOption html if allowed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
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
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
        cy.get('.testItalic')
          .should('not.exist');
        // radio
        cy.byId('#valueCoding-group2-item1/1/1a')
          .should('have.text', "italic a");
        cy.byId('#valueCoding-group2-item1/1/1b')
          .should('have.text', "italic b");
        cy.byId('#valueCoding-group2-item1/1/1c')
          .should('have.text', "italic c");
        // checkbox
        cy.byId('#valueCoding-group2-item2/1/1a')
          .should('have.text', "italic a");
        cy.byId('#valueCoding-group2-item2/1/1b')
          .should('have.text', "italic b");
        cy.byId('#valueCoding-group2-item2/1/1c')
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
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        cy.get('.testItalic')
          .should('not.exist');
        // radio
        cy.byId('#valueCoding-group2-item1/1/1a')
          .should('have.text', "<script>italic</script> <i class='testItalic'>A</i>");
        cy.byId('#valueCoding-group2-item1/1/1b')
          .should('have.text', "<script>italic</script> <i class='testItalic'>B</i>");
        cy.byId('#valueCoding-group2-item1/1/1c')
          .should('have.text', "<script>italic</script> <i class='testItalic'>C</i>");
        // checkbox
        cy.byId('#valueCoding-group2-item2/1/1a')
          .should('have.text', "<script>italic</script> <i class='testItalic'>A</i>");
        cy.byId('#valueCoding-group2-item2/1/1b')
          .should('have.text', "<script>italic</script> <i class='testItalic'>B</i>");
        cy.byId('#valueCoding-group2-item2/1/1c')
          .should('have.text', "<script>italic</script> <i class='testItalic'>C</i>");
        // autocomplete
        cy.byId('#valueCoding-group1-item1/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &lt;script&gt;italic&lt;/script&gt; A");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
        // Check the value in the field after the user selects something.
        cy.get('@listOptions').eq(0).click();
        cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "&lt;script&gt;italic&lt;/script&gt; A");
      });

      it('should display answerOption text, if invalid tags are not displayed in template options', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
        cy.get('.testItalic')
          .should('not.exist');
        // radio
        cy.byId('#valueCoding-group2-item1/1/1a')
          .should('have.text', "italic a");
        cy.byId('#valueCoding-group2-item1/1/1b')
          .should('have.text', "italic b");
        cy.byId('#valueCoding-group2-item1/1/1c')
          .should('have.text', "italic c");
        // checkbox
        cy.byId('#valueCoding-group2-item2/1/1a')
          .should('have.text', "italic a");
        cy.byId('#valueCoding-group2-item2/1/1b')
          .should('have.text', "italic b");
        cy.byId('#valueCoding-group2-item2/1/1c')
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
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
      });

      it('should remove the option after user selects it in multi-select list', () => {
        cy.get('#allowHTML').click();
        tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
        // autocomplete
        cy.byId('#valueCoding-group1-item2/1/1')
          .focus();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 3);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic <i class=\"testItalic\">B</i>");
        cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
        // Check the list after the user selects something.
        cy.get('@listOptions').eq(1).click();
        cy.get('#completionOptions li')
          .as('listOptions');
        cy.get('@listOptions')
          .should('be.visible')
          .should('have.length', 2);
        cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
        cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
      });
    });

  });

  describe('on contained valueset', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

    it('should display html if allowed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset.json', 'R4');
      // radio
      cy.byId('#item-group2-item1/1/1')
        .find('.testItalic')
        .should('have.length', 3);
      // checkbox
      cy.byId('#item-group2-item2/1/1')
        .find('.testItalic')
        .should('have.length', 3);
      // autocomplete
      cy.byId('#group1-item1/1/1')
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
      cy.byId('#group1-item1/1/1').should('have.value', "italic B");
    });

    it('should display text if not allowed in template options', () => {
      tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset.json', 'R4');
      cy.get('.testItalic')
        .should('not.exist');
      // radio
      cy.byId('#group2-item1/1/1a')
        .should('have.text', "italic a");
      cy.byId('#group2-item1/1/1b')
        .should('have.text', "italic b");
      cy.byId('#group2-item1/1/1c')
        .should('have.text', "italic c");
      // checkbox
      cy.byId('#group2-item2/1/1a')
        .should('have.text', "italic a");
      cy.byId('#group2-item2/1/1b')
        .should('have.text', "italic b");
      cy.byId('#group2-item2/1/1c')
        .should('have.text', "italic c");
      // autocomplete
      cy.byId('#group1-item1/1/1')
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
      cy.byId('#group1-item1/1/1').should('have.value', "italic b");
    });

    it('should display escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset-with-invalid-tag.json', 'R4');
      // radio
      cy.byId('#group2-item1/1/1a')
        .should('have.text', "<script>italic</script> A");
      cy.byId('#group2-item1/1/1b')
        .should('have.text', "italic b");
      cy.byId('#group2-item1/1/1c')
        .find('.testItalic')
        .should('have.length', 1);
      // checkbox
      cy.byId('#group2-item2/1/1a')
        .should('have.text', "<script>italic</script> A");  // displays invalid tags
      cy.byId('#group2-item2/1/1b')
        .should('have.text', "italic b"); // displays plain text
      cy.byId('#group2-item2/1/1c')
        .find('.testItalic')
        .should('have.length', 1);  // displays HTML
      // autocomplete
      cy.byId('#group1-item1/1/1')
        .focus();
      cy.get('#completionOptions li')
        .as('listOptions');
      cy.get('@listOptions')
        .should('be.visible')
        .should('have.length', 3);
      cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &lt;script&gt;italic&lt;/script&gt; A");
      cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
      cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");

      // Check the value in the field after the user selects something.
      cy.get('@listOptions').eq(1).click();
      cy.byId('#group1-item1/1/1').should('have.value', "italic b");
      cy.byId('#group1-item1/1/1')
        .focus();
      cy.get('#completionOptions li')
        .as('listOptions');
      cy.get('@listOptions').eq(2).click();
      // When user changes selection to the 3rd option, input field should display
      // the string stripped of the HTML tags.
      cy.byId('#group1-item1/1/1').should('have.value', "italic C");
    });

    it('should display text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset-with-invalid-tag.json', 'R4');
      // radio
      cy.byId('#group2-item1/1/1a')
        .should('have.text', "italic a"); // displays plain text
      cy.byId('#group2-item1/1/1b')
        .should('have.text', "italic b"); // displays plain text
      cy.byId('#group2-item1/1/1c')
        .find('.testItalic')
        .should('have.length', 1);  // displays HTML
      // checkbox
      cy.byId('#group2-item2/1/1a')
        .should('have.text', "italic a");
      cy.byId('#group2-item2/1/1b')
        .should('have.text', "italic b");
      cy.byId('#group2-item2/1/1c')
        .find('.testItalic')
        .should('have.length', 1);
      // autocomplete
      cy.byId('#group1-item1/1/1')
        .focus();
      cy.get('#completionOptions li')
        .as('listOptions');
      cy.get('@listOptions')
        .should('be.visible')
        .should('have.length', 3);
      cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic a");
      cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
      cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
      // Check the value in the field after the user selects something.
      cy.get('@listOptions').eq(0).click();
      cy.byId('#group1-item1/1/1').should('have.value', "italic a");
    });
  });
});

