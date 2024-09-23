import {TestPage} from '../support/lforms_testpage.po.js';
import * as util from "../support/util";

let tp: TestPage;

describe('popover buttons', () => {
  before(() => {
    tp = new TestPage();
  });

  // copyright
  describe('Copyright popover message', () => {
    it('should show a copyright popover message on the form title', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('/type0/1').should('be.visible');
      cy.byId('copyright-button-all-in-one').click();
      cy.byId('copyright-content-all-in-one').should('be.visible').should('have.text', 'A Copyright notice of the form');
    });

    it('should show a copyright popover message on an item', () => {
      cy.byId('/type0/1').click();
      cy.byId('copyright-content-all-in-one').should('not.exist');
      cy.byId('copyright-button-/type0/1').click();
      cy.byId('copyright-content-/type0/1').should('be.visible').should('have.text', 'A Copyright notice of the item');
    });

    it('should show a copyright popover message on the form title when there is no codes', () => {
      cy.visit('test/pages/addFormToPageTest.html');
      cy.get('#fileAnchor').uploadFile('test/data/questionnaire-with-copyright-no-code.json');
      cy.byId('copyright-button-Test-Questionnaire-with-a-copyright-and-no-code').should('be.visible');
      cy.byId('copyright-button-Test-Questionnaire-with-a-copyright-and-no-code').click();
      cy.byId('copyright-content-Test-Questionnaire-with-a-copyright-and-no-code').should('be.visible').should('have.text', 'A copyright notice');
    });
  });

  // coding instructions
  describe('coding instructions help message', () => {
    const inline1 = 'help-/type1/1';
    const inline2 = 'help-/type2/1';
    const inline3 = 'help-/type3/1';

    const helpButton0 = 'help-button-/type0/1'; // text formatted content, no 'codingInstructionsFormat'
    const helpButton1 = 'help-button-/type1/1'; // html formatted content, no 'codingInstructionsFormat'
    const helpButton2 = 'help-button-/type2/1'; // html formatted content, 'codingInstructionsFormat' is 'text'
    const helpButton3 = 'help-button-/type3/1'; // html formatted content, 'codingInstructionsFormat' is 'html'

    const helpPopover0 = 'help-content-/type0/1';
    const helpPopover1 = 'help-content-/type1/1';
    const helpPopover2 = 'help-content-/type2/1';
    const helpPopover3 = 'help-content-/type3/1';

    const field1 = '/q_lg/1';

    before(() => {
      tp.LoadForm.openFullFeaturedForm();
    });

    it('should have HTML and/or TEXT content when templateOptions.allowHTML is true', () => {
      // popover
      cy.byId(helpButton0).should('be.visible');
      cy.byId(helpButton1).should('be.visible');
      cy.byId(helpButton2).should('be.visible');
      cy.byId(helpButton3).should('be.visible');

      cy.byId(helpButton0).click();
      cy.byId(helpPopover0).should('be.visible').should('have.text', 'simple text instructions');

      cy.byId(field1).click();
      cy.byId(helpPopover0).should('not.exist');

      cy.byId(helpButton1).click();
      cy.byId(helpPopover1).should('be.visible');
      cy.byId(helpPopover1).get("button.testButton").should('not.exist');
      cy.byId(helpPopover1).should('have.text', '<code>HTML</code> instructions, with a <button class=\'testButton\'>button</button>LForms Demo 1');

      cy.byId(field1).click();
      cy.byId(helpPopover1).should('not.exist');
      cy.byId(helpButton2).click();
      cy.byId(helpPopover2).should('be.visible');
      cy.byId(helpPopover2).get("button.testButton").should('not.exist');
      cy.byId(helpPopover2).should('have.text', '<code>HTML</code> instructions, with a <button class=\'testButton\'>button</button>LForms Demo 2');

      cy.byId(field1).click();
      cy.byId(helpPopover2).should('not.exist');
      cy.byId(helpButton3).click();
      cy.byId(helpPopover3).should('be.visible');
      cy.byId(helpPopover3).get('button.testButton').should('be.visible');

      // inline
      cy.window().then((win) => {
        const testForm: any = win.document.getElementById('test-form');
        testForm.options = {showCodingInstruction: true};

        cy.byId(inline1).should('be.visible');
        cy.byId(inline1).byCss("button.testButton").should('not.exist');
        cy.byId(inline2).should('be.visible');
        cy.byId(inline2).byCss("button.testButton").should('not.exist');
        cy.byId(inline3).should('be.visible');
        cy.byId('help-/type3/1').get('button').should('be.visible');
        cy.byId(inline3).byCss("button.testButton").should('be.visible');
      });
    });

    it('should have only escaped TEXT content when templateOptions.allowHTML is false', () => {
      tp.LoadForm.openFullFeaturedForm();
      cy.byId('change-option').click();

      // popover
      cy.byId(helpButton0).should('be.visible');
      cy.byId(helpButton1).should('be.visible');
      cy.byId(helpButton2).should('be.visible');
      cy.byId(helpButton3).should('be.visible');

      cy.byId(helpButton0).click();
      cy.byId(helpPopover0).should('be.visible').should('have.text', 'simple text instructions');

      cy.byId(field1).click();
      cy.byId(helpPopover0).should('not.exist');
      cy.byId(helpButton1).click();
      cy.byId(helpPopover1).should('be.visible');
      cy.byId(helpPopover1).byCss("button.testButton").should('not.exist');
      cy.byId(helpPopover1).should('have.text', '<code>HTML</code> instructions, with a <button class=\'testButton\'>button</button>LForms Demo 1');

      cy.byId(field1).click();
      cy.byId(helpPopover1).should('not.exist');
      cy.byId(helpButton2).click();
      cy.byId(helpPopover2).should('be.visible');
      cy.byId(helpPopover2).byCss("button.testButton").should('not.exist');
      cy.byId(helpPopover2).should('have.text', '<code>HTML</code> instructions, with a <button class=\'testButton\'>button</button>LForms Demo 2');

      cy.byId(field1).click();
      cy.byId(helpPopover2).should('not.exist');
      cy.byId(helpButton3).click();
      cy.byId(helpPopover3).byCss("button.testButton").should('not.exist');
      cy.byId(helpPopover3).should('be.visible').should('have.text', '<code>HTML</code> instructions, with a <button class=\'testButton\'>button</button>LForms Demo 3');

      // inline
      cy.window().then((win) => {
        const testForm: any = win.document.getElementById('test-form');
        testForm.options = {showCodingInstruction: true};

        cy.byId(inline1).should('be.visible');
        cy.byId(inline1).byCss("button.testButton").should('not.exist');
        cy.byId(inline2).should('be.visible');
        cy.byId(inline2).byCss("button.testButton").should('not.exist');
        cy.byId(inline3).should('be.visible');
        cy.byId(inline3).byCss("button.testButton").should('not.exist');
      });
    });

    it('should be able to display HTML/Text formatted coding instructions from FHIR R4 Questionnaire', () => {
      tp.loadFromTestData('ussg-fhp.json', 'R4');
      cy.window().then((win) => {
        const testForm: any = win.document.getElementById('test-form');
        testForm.options = {allowHTML: true};
        // Allow page to refresh this options change so that we don't get detached elements below.
        cy.wait(100);

        const nameHelpButton = 'help-button-/54126-8/54125-0/1/1';
        const genderHelpButton = 'help-button-/54126-8/54131-8/1/1';
        const gender = '/54126-8/54131-8/1/1';
        const popover = '.lhc-help-54126-8-54125-0-1-1 .ant-popover-inner-content';

        cy.byId(nameHelpButton).should('be.visible');
        cy.byId(genderHelpButton).should('be.visible');

        // HTML formatted coding instructions
        cy.byId(nameHelpButton).click();
        cy.get(popover).should('be.visible');
        cy.get("button.testButton").should('be.visible');

        cy.byId(gender).click();
        cy.get("button.testButton").should('not.exist');

        // Text coding instructions
        cy.byId(genderHelpButton).click();
        cy.get('.lhc-help-54126-8-54131-8-1-1 .ant-popover-content').should('be.visible');
        cy.get("button.testButton").should('not.exist');
      });
    });

    function test4PopoverCases(type) {
      // tslint:disable-next-line:one-variable-per-declaration variable-name
      let helpButton_0, helpButton_1, helpButton_2, helpButton_3, popover0, popover1, popover2, popover3,
        copyrightButton0, copyPopover0;
      switch (type) {
        case 'vertical':
          helpButton_0 = 'help-button-/type0/1';
          helpButton_1 = 'help-button-/type1/1';
          helpButton_2 = 'help-button-/type2/1';
          helpButton_3 = 'help-button-/type3/1';
          copyrightButton0 = 'copyright-button-/type0/1';
          popover0 = '.lhc-help-type0-1 .ant-popover-inner-content';
          popover1 = '.lhc-help-type1-1 .ant-popover-inner-content';
          popover2 = '.lhc-help-type2-1 .ant-popover-inner-content';
          popover3 = '.lhc-help-type3-1 .ant-popover-inner-content';
          copyPopover0 = '.lhc-copyright-class-type0-1 .ant-popover-inner-content';
          break;
        case 'horizontal':
          helpButton_0 = 'help-button-/horizontalTable/type0/1/1';
          helpButton_1 = 'help-button-/horizontalTable/type1/1/1';
          helpButton_2 = 'help-button-/horizontalTable/type2/1/1';
          helpButton_3 = 'help-button-/horizontalTable/type3/1/1';
          copyrightButton0 = 'copyright-button-/horizontalTable/type0/1/1';
          popover0 = '.lhc-help-horizontalTable-type0-1-1 .ant-popover-inner-content';
          popover1 = '.lhc-help-horizontalTable-type1-1-1 .ant-popover-inner-content';
          popover2 = '.lhc-help-horizontalTable-type2-1-1 .ant-popover-inner-content';
          popover3 = '.lhc-help-horizontalTable-type3-1-1 .ant-popover-inner-content';
          copyPopover0 = '.lhc-copyright-class-horizontalTable-type0-1-1 .ant-popover-inner-content';
          break;
        case 'matrix':
          helpButton_0 = 'help-button-/matrixTable/type0/1/1';
          helpButton_1 = 'help-button-/matrixTable/type1/1/1';
          helpButton_2 = 'help-button-/matrixTable/type2/1/1';
          helpButton_3 = 'help-button-/matrixTable/type3/1/1';
          copyrightButton0 = 'copyright-button-/matrixTable/type0/1/1';
          popover0 = '.lhc-help-matrixTable-type0-1-1 .ant-popover-inner-content';
          popover1 = '.lhc-help-matrixTable-type1-1-1 .ant-popover-inner-content';
          popover2 = '.lhc-help-matrixTable-type2-1-1 .ant-popover-inner-content';
          popover3 = '.lhc-help-matrixTable-type3-1-1 .ant-popover-inner-content';
          copyPopover0 = '.lhc-copyright-class-matrixTable-type0-1-1 .ant-popover-inner-content';
          break;
      }

      tp.loadFromTestData('copyright-help.json');

      // tslint:disable-next-line:variable-name
      const field_1 = '/type0/1';
      cy.byId(field_1).should('be.visible');
      cy.byId(helpButton_0).should('be.visible');
      cy.byId(helpButton_1).should('be.visible');
      cy.byId(helpButton_2).should('be.visible');
      cy.byId(helpButton_3).should('be.visible');
      cy.byId(copyrightButton0).should('be.visible');

      // simple text coding instructions
      cy.byId(helpButton_0).click();
      cy.get(popover0).should('be.visible').should('have.text', 'simple text instructions');

      cy.byId(field_1).click();
      cy.get(popover0).should('not.exist');

      // escaped HTML coding instructions, when "codingInstructionsFormat" is not set
      cy.byId(helpButton_1).click();
      cy.get(popover1).should('be.visible')
        .should('have.text', '<code>HTML</code> instructions, with a <button>button</button>LForms Demo 1');

      cy.byId(field_1).click();
      cy.get(popover1).should('not.exist');

      // escaped HTML coding instructions, when "codingInstructionsFormat" = "text"
      cy.byId(helpButton_2).click();
      cy.get(popover2).should('be.visible')
        .should('have.text', '<code>HTML</code> instructions, with a <button>button</button>LForms Demo 2');

      cy.byId(field_1).click();
      cy.get(popover2).should('not.exist');

      // enabled HTML coding instructions, when "codingInstructionsFormat" = "html"
      cy.byId(helpButton_3).click();
      cy.get(popover3)
        .should('be.visible')
        .should('have.text', 'HTML instructions, with a buttonLForms Demo 3')
      cy.get(popover3).byCss("button")
        .should('be.visible');

      cy.byId(field_1).click();
      cy.get(popover3).should('not.exist');

      // copyright popover
      cy.byId(copyrightButton0).click();
      cy.get(copyPopover0).should('be.visible').should('have.text', 'A Copyright notice of the item 1');

      cy.byId(field_1).click();
      cy.get(popover0).should('not.exist');
    }

    it('should be able to display HTML/Text formatted coding instructions and copyright notice in vertical list layout', () => {
      test4PopoverCases('vertical');
    });

    it('should be able to display HTML/Text formatted coding instructions and copyright notice in horizontal table layout', () => {
      test4PopoverCases('horizontal');
    });

    it('should be able to display HTML/Text formatted coding instructions and copyright notice in matrix layout', () => {
      test4PopoverCases('matrix');
    });
  });
});

describe('images in coding instructions', () => {
  describe('coding instrcutions with images shown inline', ()=>{
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('q-with-contained-image.json', 'formContainer',
        { "fhirVersion": "R4",
          "allowHTML": true,
          "showCodingInstruction": true });
    });

    it("should show an image with a url in the 'src' attribute", ()=>{
      cy.byCss("#help-a/1 img").eq(0)
        .should("be.visible")
        .should('have.attr', 'src', '/test/data/a-picture.png');
    })

    it("should show an image with a local id in the 'src' attribute", ()=>{
      cy.byCss("#help-b/1 img").eq(0)
        .should("be.visible")
        .invoke("attr", "src")
        .should("match", /^data:image\/png\;base64/);
    })

    it("should show an image with a local id without quotes in the 'src' attribute", ()=>{
      cy.byCss("#help-c/1 img").eq(0)
        .should("be.visible")
        .invoke("attr", "src")
        .should("match", /^data:image\/png\;base64/);
    })
  });

  describe('coding instrcutions with images shown in popover', ()=>{
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('q-with-contained-image.json', 'formContainer',
        { "fhirVersion": "R4",
          "allowHTML": true });
    });

    it("should show an image with a url in the 'src' attribute", ()=>{
      cy.byId("help-button-a/1").click()

      cy.byCss("#help-content-a/1 img").eq(0)
        .should("be.visible")
        .should('have.attr', 'src', '/test/data/a-picture.png');

      //make the popover disappear
      cy.byCss(".lhc-form-title .lhc-question").eq(0).click({force: true});
      cy.byCss("#help-content-a/1").should("not.exist");

    })

    it("should show an image with a local id in the 'src' attribute", ()=>{
      cy.byId("help-button-b/1").click()

      cy.byCss("#help-content-b/1 img").eq(0)
        .should("be.visible")
        .invoke("attr", "src")
        .should("match", /^data:image\/png\;base64/);

      //make the popover disappear
      cy.byCss(".lhc-form-title .lhc-question").eq(0).click({force: true});
      cy.byCss("#help-content-b/1").should("not.exist");
    })

    it("should show an image with a local id without quotes in the 'src' attribute", ()=>{
      cy.byId("help-button-c/1").click()

      cy.byCss("#help-content-c/1 img").eq(0)
        .should("be.visible")
        .invoke("attr", "src")
        .should("match", /^data:image\/png\;base64/);

      //make the popover disappear
      cy.byCss(".lhc-form-title .lhc-question").eq(0).click({force: true});
      cy.byCss("#help-content-c/1").should("not.exist");
    })
  });

})

describe('invalid html tags/attributes in coding instructions', () => {
  describe('regular text shown inline', ()=>{
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('q-with-invalid-xhtml.json', 'formContainer',
        { "fhirVersion": "R4",
          "messageLevel": "error",
          "allowHTML": true,
          "displayInvalidHTML": false,
          "showCodingInstruction": true });
    });

    it("should show an error message", ()=>{
      cy.byCss("#item-item1/1 .lhc-item-error").eq(0)
        .should("be.visible")
        .should("have.text", "Error: Invalid HTML tags/attributes found in the help text.");
    })

    it("should show the regular help text", ()=>{
      cy.byCss("#help-item1/1").eq(0)
        .should("be.visible")
        .should("have.text", "A plain text instruction.");
    })

  });

  describe('escaped invalid html shown in inline', ()=>{
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('q-with-invalid-xhtml.json', 'formContainer',
        { "fhirVersion": "R4",
          "messageLevel": "error",
          "allowHTML": true,
          "displayInvalidHTML": true,
          "showCodingInstruction": true });
    });

    it("should show an error message", ()=>{
      cy.byCss("#item-item1/1 .lhc-item-error").eq(0)
        .should("be.visible")
        .should("have.text", "Error: Invalid HTML tags/attributes found in the help text.");
    })

    it("should show the escaped html", ()=>{
      cy.byCss("#help-item1/1").eq(0)
        .should("be.visible")
        .should("have.text", "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>.</a>");
    })

  });

  describe('regular text shown popover', ()=>{
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('q-with-invalid-xhtml.json', 'formContainer',
        { "fhirVersion": "R4",
          "messageLevel": "error",
          "allowHTML": true,
           "displayInvalidHTML": false,
          "showCodingInstruction": false });
    });

    it("should show an error message", ()=>{
      cy.byCss("#item-item1/1 .lhc-item-error").eq(0)
        .should("be.visible")
        .should("have.text", "Error: Invalid HTML tags/attributes found in the help text.");
    })

    it("should show the regular help text", ()=>{
      cy.byId("help-button-item1/1").click()

      cy.byCss("#help-content-item1/1").eq(0)
        .should("be.visible")
        .should("have.text", "A plain text instruction.");
    })


  });

  describe('escaped invalid html shown in popover', ()=>{
    before(() => {
      cy.visit('test/pages/addFormToPageTest.html');
      util.addFormToPage('q-with-invalid-xhtml.json', 'formContainer',
        { "fhirVersion": "R4",
          "messageLevel": "error",
          "allowHTML": true,
           "displayInvalidHTML": true,
          "showCodingInstruction": false });
    });

    it("should show an error message", ()=>{
      cy.byCss("#item-item1/1 .lhc-item-error").eq(0)
        .should("be.visible")
        .should("have.text", "Error: Invalid HTML tags/attributes found in the help text.");
    })

    it("should show the escaped html", ()=>{
      cy.byId("help-button-item1/1").click()

      cy.byCss("#help-content-item1/1").eq(0)
        .should("be.visible")
        .should("have.text", "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>.</a>");
    })
  });

})
