import {TestPage} from '../support/lforms_testpage.po.js';

describe('508', () => {
  const tp: TestPage = new TestPage();

  describe('screen reader log', () => {
    before(() => {
      tp.LoadForm.openUSSGFHTHorizontal();
      tp.resetReaderLog();
    });

    it('should be empty when the form loads', () => {
      tp.expectReaderLogEntriesEmpty();
    });

    it('should contain an entry when skip logic shows a field', () => {
      cy.byId(tp.heightField).type('10');
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10']);
    });

    it('should not add an extra entry if the field is already showing', () => {
      cy.byId(tp.heightField).type('2');
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10']);
    });

    it('should contain an entry when skip logic hides a field', () => {
      cy.byId(tp.heightField).type('{backspace}').type('{backspace}');
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10',
          'Hiding Mock-up item: Shown when Height >= 10']);
    });

    it('should not add an extra entry if the field is already hidden', () => {
      cy.byId(tp.heightField).type('{backspace}');
      tp.expectReaderLogEntries(
        ['Showing Mock-up item: Shown when Height >= 10',
          'Hiding Mock-up item: Shown when Height >= 10',
          'Height requires a value']);
    });

    it('should add an entry when a section is added or removed', () => {
      // Reset the reader log
      tp.resetReaderLog();
      tp.expectReaderLogEntriesEmpty();
      // Add a section
      cy.byId('add-/54126-8/54137-5/1/1').click();  // Add another 'Your Diseases History'
      tp.expectReaderLogEntries(['Added section']);
      // Remove the section
      const minusButtonCSS = 'button[title=\'Remove this "Your diseases history"\']';
      cy.get(minusButtonCSS).first().click();
      tp.expectReaderLogEntries(['Added section', 'Removed section']);
    });

    it('should add an entry when a row is added or removed', () => {
      // Reset the reader log
      tp.resetReaderLog();
      tp.expectReaderLogEntriesEmpty();
      // Add a row to the table by clicking the + button.
      cy.byId('add-/54114-4/54117-7/1/1').click();
      tp.expectReaderLogEntries(['Added row']);
      // Remove the row
      const minusButtonCSS =
        'button[title="Remove this row of \\"This family member\'s history of disease\\""]';
      cy.get(minusButtonCSS).first().click();
      tp.expectReaderLogEntries(['Added row', 'Removed row']);
    });

    it('should add an entry when a question is added or removed', () => {
      // Switch to the first form, which has a repeating question
      tp.LoadForm.openUSSGFHTVertical();
      cy.contains('Add another "Name"').should('be.visible');
      // Reset the reader log
      tp.resetReaderLog();
      tp.expectReaderLogEntriesEmpty();
      // Add a question
      cy.byId(tp.USSGFHTVertical.name).type('a name');
      cy.contains('Add another "Name"').click();
      tp.expectReaderLogEntries(['Added question']);
      // Remove the question
      cy.get('button[title=\'Remove this "Name"\']').first().click();
      tp.expectReaderLogEntries(['Added question', 'Removed question']);
    });
  });

  /* This section is not about the screen reader log, but about things needed to
   * assist the screen reader.*/
  describe('field labels', () => {
    it('should be present on the questions in the vertical template', () => {
      tp.LoadForm.openUSSGFHTVertical();
      cy.get(tp.heightLabel).should('be.visible');
    });

    it('should be present on the questions in the horizontal template', () => {
      tp.LoadForm.openUSSGFHTHorizontal();
      cy.get(tp.heightLabel).should('be.visible');
    });
  });
});
