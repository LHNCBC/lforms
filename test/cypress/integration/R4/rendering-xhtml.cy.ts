import {TestPage} from '../../support/lforms_testpage.po.js';

describe('rendering-xhtml', () => {
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
