import {TestPage} from '../support/lforms_testpage.po.js';
import {BuildTestPage} from '../support/buildTest.po.js';

// build_test.html uses a copy of the transpiled lhc-forms.js in dist/webcomponent/lhc-forms.js
describe('build test page', () => {
  const tp: TestPage = new TestPage();
  const btp: BuildTestPage = new BuildTestPage();

  it('should have a drug name field that autocompletes', () => {
    btp.openPage();
    cy.byId(btp.drugNameField).should('be.visible')
      .type('ar');
    cy.get('#lhc-tools-searchResults', { timeout: tp.WAIT_TIMEOUT_1 }).should('be.visible');
  });
});
