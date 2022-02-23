import {TestPage} from '../support/lforms_testpage.po.js';

// The project root directory is the root for the cypress server
describe('LForms.Util.getFormData parameters', () => {
  let tp: any = new TestPage();

  it('should work when element is not provided', function() {
    tp.LoadForm.openFullFeaturedForm();
    cy.window().then((win)=> {
      return win.LForms.Util.getUserData();
    }).then(function (formData) {
      expect(formData.itemsData.length).to.equal(63);
    })

    cy.window().then((win)=> {
      return win.LForms.Util.getUserData(null, false, true);
    }).then(function (formData) {
      expect(formData.itemsData.length).to.equal(5);
    })

  });

  it('should work when element is a DOM element', function() {
    tp.LoadForm.openFullFeaturedForm();
    cy.window().then((win)=> {
      let formContainer = document.getElementById("lforms-form");
      return win.LForms.Util.getUserData(formContainer);
    }).then(function (formData) {      
      expect(formData.itemsData.length).to.equal(63);
    })

    cy.window().then((win)=> {
      let formContainer = document.getElementById("lforms-form");
      return win.LForms.Util.getUserData(formContainer, false, true);
    }).then(function (formData) {
      expect(formData.itemsData.length).to.equal(5);
    })
  });


  it('should work when element is a CSS selector', function() {
    tp.LoadForm.openFullFeaturedForm();
    cy.window().then((win)=> {
      return win.LForms.Util.getUserData("#lforms-form");
    }).then(function (formData) {      
      expect(formData.itemsData.length).to.equal(63);
    })

    cy.window().then((win)=> {
      return win.LForms.Util.getUserData("#lforms-form", false, true);
    }).then(function (formData) {
      expect(formData.itemsData.length).to.equal(5);
    })
  });

});