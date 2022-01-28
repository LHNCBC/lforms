import { TestPage } from "../support/lforms_testpage.po";

describe('Unused repeating item/section control', function() {
  let tp: TestPage = new TestPage(); 
  let ff: any = tp.USSGFHTVertical;

  describe('on repeating items', function() {
    let namePopover1 = '#add-content-/54126-8/54125-0/1/1',
        namePopover2 = '#add-content-/54126-8/54125-0/1/2';

    it('should not add a new one when there is an unused item', function () {
      tp.LoadForm.openUSSGFHTVertical();      
      cy.byId(ff.btnName).click();
      cy.byId(namePopover1).should('be.visible')
    });

    it('should add a new one when there is no unused item', function () {
      cy.byId(ff.name).type("a name")
      cy.byId(ff.btnName).click();
      cy.byId(namePopover1).should('not.exist')
    });

    it('should not add a new one when there is an unused item and an used item', function () {
      cy.byId(ff.btnName2).click();
      cy.byId(namePopover2).should('be.visible')
    });

    it('should not add a new one when a previous used item becomes unused', function () {
      cy.byId(ff.name2).type("another name")
      cy.byId(ff.name).clear()
      cy.byId(ff.btnName2).click();
      cy.byId(namePopover2).should('be.visible')
    });
  });

  describe('on repeating sections', function() {
    let diseasesPopover1 = '#add-content-/54126-8/54137-5/1/1',
        diseasesPopover2 = '#add-content-/54126-8/54137-5/1/2';
        
    it('should not add a new one when all item in the section are empty', function () {
      cy.byId(ff.btnDiseasesHist).click();
      cy.byId(diseasesPopover1).should('be.visible')
    });

    it('should add a new one when at least one item in the section is not empty', function () {
      cy.byId(ff.disease).click();
      cy.byId(ff.disease).type('{downarrow}').type('{enter}');
      cy.byId(ff.btnDiseasesHist).click();
      cy.byId(diseasesPopover1).should('not.exist')
    });

    it('should not add a new one when an used item has been hidden by skip logic', function () {
      cy.byId(ff.ageAtDiag2).click();
      cy.byId(ff.ageAtDiag2).type('{downarrow}').type('{enter}');
      cy.byId(ff.mockSubItem2).should('be.visible')

      cy.byId(ff.mockSubItem2).type("a value")
      cy.byId(ff.ageAtDiag2).clear().blur();
      cy.byId(ff.mockSubItem2).should('not.exist')
      tp.clickAddRemoveButton(ff.btnDiseasesHist2);
      cy.byId(diseasesPopover2).should('be.visible')
    });

    it('should not add a new one when the previous non-empty items in the section become empty again', function () {
      cy.byId(ff.disease).clear();
      cy.byId(ff.disease2).click();
      cy.byId(ff.disease).type('{downarrow}').type('{enter}')
      cy.byId(ff.btnDiseasesHist2).click();
      cy.byId(diseasesPopover2).should('be.visible')
    });

  });

  describe('repeating section within a repeating section', function() {
    let familyPopover = '#add-content-/54114-4/1',
        diseHistPopover = '#add-content-/54114-4/54117-7/1/1';

    it("should not add new section if any previous one is empty", function() {
      cy.byId(ff.btnAnotherDiseasesHist).click();
      cy.byId(diseHistPopover).should('be.visible')
      cy.byId(ff.btnAnotherFamily).click();
      cy.byId(familyPopover).should('be.visible')
    });

  });
});
