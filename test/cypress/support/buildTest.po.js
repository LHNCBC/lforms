export class BuildTestPage {
  drugNameField = '/dataControlExamples/itemWithExtraData/1/1';

  /**
   * Opens the test page.
   */
  openPage() {
    cy.visit('/test/pages/build_test.html');
  }
}
