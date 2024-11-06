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

  describe('on answerOption', () => {
    const tp: TestPage = new TestPage();

    beforeEach(() => {
      tp.openBaseTestPage();
    });

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
});

