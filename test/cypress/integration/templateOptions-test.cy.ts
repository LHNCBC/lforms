import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
const po = new AddFormToPageTestPage();

describe('templateOptions', function () {
  beforeEach(()=> {
    po.openPage();
  });


  it('should not display scores with answer text when displayScoreWithAnswerText is set to false', function () {
    const file = 'test/data/lforms/glasgow.json';
    cy.readFile(file).then((data) => {
      cy.window().then(win=>{
        win.LForms.Util.addFormToPage(data, 'formContainer', {'displayScoreWithAnswerText': false});
        cy.byId('/9267-6/1').click().type('{downArrow}').blur();
        cy.byId('/9267-6/1').should('have.value', '1. No eye opening');
      });
    });
  });

  it('should display scores with answer text when displayScoreWithAnswerText is set to true', function () {
    const file = 'test/data/lforms/glasgow.json';
    cy.readFile(file).then((data) => {
      cy.window().then(win=>{
        win.LForms.Util.addFormToPage(data, 'formContainer', {'displayScoreWithAnswerText': true});
        cy.byId('/9267-6/1').click().type('{downArrow}').blur();
        cy.byId('/9267-6/1').should('have.value', '1. No eye opening - 1');
      });
    });
  });

  it('should display score with answer text when displayScoreWithAnswerText is not set', function () {
    const file = 'test/data/lforms/glasgow.json';
    cy.readFile(file).then((data) => {
      cy.window().then(win=>{
        win.LForms.Util.addFormToPage(data, 'formContainer');
        cy.byId('/9267-6/1').click().type('{downArrow}').blur();
        cy.byId('/9267-6/1').should('have.value', '1. No eye opening - 1');
      });
    });
  });

  it('should hide scores with answer text when displayScoreWithAnswerText is set to false after the form is loaded', function () {
    const file = 'test/data/lforms/glasgow.json';
    cy.readFile(file).then((data) => {
      cy.window().then(win=>{
        // load the form first
        win.LForms.Util.addFormToPage(data, 'formContainer');
        // charge the option
        win.document.getElementById('formContainer').firstChild.options = {'displayScoreWithAnswerText': false}
        cy.byId('/9267-6/1').click().type('{downArrow}').blur();
        cy.byId('/9267-6/1').should('have.value', '1. No eye opening');
      });

    });
  });

})

