// Tests the onFormReady event

import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import {TestUtil} from "../support/testUtilFacade.js";
import * as util from "../support/util";
const po = new AddFormToPageTestPage();

describe('onFormReady', ()=> {
  before(() => {
    po.openPage();
  });


  /**
   *  Tests that the given form data file can be successfully loaded.
   * @param filePath the relative path for the form definition under test/data.
   */
  function testFormLoad(filePath) {
    const container = 'formContainer';
    cy.readFile('test/data/'+filePath).then((formDef) => {  // readFile will parse the JSON
      assert(formDef);
      // Do not use util.addFormToPage, which waits for the form to be visible.
      // addFormDataToPage waits for LForms.Util.addFormToPage, which waits for
      // the onFormReady event.
      util.addFormDataToPage(formDef, container).then(()=>{
        cy.get('wc-lhc-form').should('exist');
        cy.get('wc-lhc-form .lhc-question').should('exist');
      });
    });
  }

  it('should not send onFormReady until the form is visible on the page (case 1, no answerValueSets)', ()=>{
    testFormLoad('R4/phq9.json');
  });

  it('should not send onFormReady until the form is visible on the page (case 2, with answerValueSets)', ()=>{
    testFormLoad('R4/q-with-answerValueSet-autocomplete.json');
  });
});
