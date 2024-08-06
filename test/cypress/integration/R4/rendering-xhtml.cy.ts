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
    });

    it('should display question text if not allowed in template options', () => {
      tp.loadFromTestData('q-with-rendering-xhtml-text.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.question')
        .should('have.text', 'Please answer Yes or No to each of the following questions:');
    });

    it('should display question escaped html, if invalid tags are displayed in template options', () => {
      cy.get('#allowHTML').click();
      cy.get('#displayInvalidHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.question')
        .should('have.text', "<i class='testPlease'>Please</i> answer <script>Yes</script> or <b>No</b> to each of the following questions:");
    });

    it('should display question text, if invalid tags are not displayed in template options', () => {
      cy.get('#allowHTML').click();
      tp.loadFromTestData('q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
      cy.get('.testPlease')
        .should('not.exist');
      cy.get('.question')
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
    });
  });
});

