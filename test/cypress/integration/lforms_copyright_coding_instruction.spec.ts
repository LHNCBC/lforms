import {TestPage} from '../support/lforms_testpage.po.js';

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
  });

  // coding instructions
  describe('coding instructions help message', () => {
    const popoverHTMLLink1 = 'a[href="http://lforms-demo1.nlm.nih.gov"]';
    const popoverHTMLLink2 = 'a[href="http://lforms-demo2.nlm.nih.gov"]';
    const popoverHTMLLink3 = 'a[href="http://lforms-demo3.nlm.nih.gov"]';

    const inline1 = 'help-/type1/1';
    const inline2 = 'help-/type2/1';
    const inline3 = 'help-/type3/1';

    const inlineHTMLLink1 = 'a[href="http://lforms-demo1.nlm.nih.gov"]';
    const inlineHTMLLink2 = 'a[href="http://lforms-demo2.nlm.nih.gov"]';
    const inlineHTMLLink3 = 'a[href="http://lforms-demo3.nlm.nih.gov"]';
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

    it('should have HTML and/or TEXT content when templateOptions.allowHTMLInInstructions is true', () => {
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
      cy.get(popoverHTMLLink1).should('not.exist');
      cy.byId(helpPopover1).should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo1.nlm.nih.gov\'>LForms Demo 1</a>');

      cy.byId(field1).click();
      cy.byId(helpPopover1).should('not.exist');
      cy.byId(helpButton2).click();
      cy.byId(helpPopover2).should('be.visible');
      cy.get(popoverHTMLLink2).should('not.exist');
      cy.byId(helpPopover2).should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo2.nlm.nih.gov\'>LForms Demo 2</a>');

      cy.byId(field1).click();
      cy.byId(helpPopover2).should('not.exist');
      cy.byId(helpButton3).click();
      cy.byId(helpPopover3).should('be.visible');

      cy.byId(helpPopover3).get('a[href="http://lforms-demo3.nlm.nih.gov"]').should('be.visible');

      // inline
      cy.window().then((win) => {
        const testForm: any = win.document.getElementById('test-form');
        testForm.options = {showCodingInstruction: true};

        cy.byId(inline1).should('be.visible');
        cy.byId(inline1).get(inlineHTMLLink1).should('not.exist');
        cy.byId(inline2).should('be.visible');
        cy.byId(inline2).get(inlineHTMLLink2).should('not.exist');
        cy.byId(inline3).should('be.visible');

        cy.byId('help-/type3/1').get('a').should('be.visible').should('have.attr', 'href', 'http://lforms-demo3.nlm.nih.gov');
        cy.byId(inline3).get(inlineHTMLLink3).should('be.visible');
      });
    });

    it('should have only escaped TEXT content when templateOptions.allowHTMLInInstructions is false', () => {
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
      cy.get(inlineHTMLLink1).should('not.exist');
      cy.byId(helpPopover1).should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo1.nlm.nih.gov\'>LForms Demo 1</a>');

      cy.byId(field1).click();
      cy.byId(helpPopover1).should('not.exist');
      cy.byId(helpButton2).click();
      cy.byId(helpPopover2).should('be.visible');
      cy.get(inlineHTMLLink2).should('not.exist');
      cy.byId(helpPopover2).should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo2.nlm.nih.gov\'>LForms Demo 2</a>');

      cy.byId(field1).click();
      cy.byId(helpPopover2).should('not.exist');
      cy.byId(helpButton3).click();
      cy.byId(helpPopover3).should('be.visible').should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo3.nlm.nih.gov\'>LForms Demo 3</a>');

      // inline
      cy.window().then((win) => {
        const testForm: any = win.document.getElementById('test-form');
        testForm.options = {showCodingInstruction: true};

        cy.byId(inline1).should('be.visible');
        cy.byId(inline1).get(inlineHTMLLink1).should('not.exist');
        cy.byId(inline2).should('be.visible');
        cy.byId(inline2).get(inlineHTMLLink2).should('not.exist');
        cy.byId(inline3).should('be.visible');
        cy.byId(inline3).get(inlineHTMLLink3).should('not.exist');
      });
    });

    it('should be able to display HTML/Text formatted coding instructions from FHIR R4 Questionnaire', () => {
      tp.loadFromTestData('ussg-fhp.json', 'R4');
      cy.window().then((win) => {
        const testForm: any = win.document.getElementById('test-form');
        testForm.options = {allowHTMLInInstructions: true};
        // Allow page to refresh this options change so that we don't get detached elements below.
        cy.wait(100);

        const nameHelpButton = 'help-button-/54126-8/54125-0/1/1';
        const genderHelpButton = 'help-button-/54126-8/54131-8/1/1';
        const gender = '/54126-8/54131-8/1/1';
        const popoverHTMLLink = 'a[href="http://google.com"]';
        const popover = '.help-class-54126-8-54125-0-1-1 .ant-popover-inner-content';

        cy.byId(nameHelpButton).should('be.visible');
        cy.byId(genderHelpButton).should('be.visible');

        // HTML formatted coding instructions
        cy.byId(nameHelpButton).click();
        cy.get(popover).should('be.visible');
        cy.get(popoverHTMLLink).should('be.visible');

        cy.byId(gender).click();
        cy.get(popoverHTMLLink).should('not.exist');

        // Text coding instructions
        cy.byId(genderHelpButton).click();
        cy.get('.help-class-54126-8-54131-8-1-1 .ant-popover-content').should('be.visible');
        cy.get(popoverHTMLLink).should('not.exist');
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
          popover0 = '.help-class-type0-1 .ant-popover-inner-content';
          popover1 = '.help-class-type1-1 .ant-popover-inner-content';
          popover2 = '.help-class-type2-1 .ant-popover-inner-content';
          popover3 = '.help-class-type3-1 .ant-popover-inner-content';
          copyPopover0 = '.copyright-class-type0-1 .ant-popover-inner-content';
          break;
        case 'horizontal':
          helpButton_0 = 'help-button-/horizontalTable/type0/1/1';
          helpButton_1 = 'help-button-/horizontalTable/type1/1/1';
          helpButton_2 = 'help-button-/horizontalTable/type2/1/1';
          helpButton_3 = 'help-button-/horizontalTable/type3/1/1';
          copyrightButton0 = 'copyright-button-/horizontalTable/type0/1/1';
          popover0 = '.help-class-horizontalTable-type0-1-1 .ant-popover-inner-content';
          popover1 = '.help-class-horizontalTable-type1-1-1 .ant-popover-inner-content';
          popover2 = '.help-class-horizontalTable-type2-1-1 .ant-popover-inner-content';
          popover3 = '.help-class-horizontalTable-type3-1-1 .ant-popover-inner-content';
          copyPopover0 = '.copyright-class-horizontalTable-type0-1-1 .ant-popover-inner-content';
          break;
        case 'matrix':
          helpButton_0 = 'help-button-/matrixTable/type0/1/1';
          helpButton_1 = 'help-button-/matrixTable/type1/1/1';
          helpButton_2 = 'help-button-/matrixTable/type2/1/1';
          helpButton_3 = 'help-button-/matrixTable/type3/1/1';
          copyrightButton0 = 'copyright-button-/matrixTable/type0/1/1';
          popover0 = '.help-class-matrixTable-type0-1-1 .ant-popover-inner-content';
          popover1 = '.help-class-matrixTable-type1-1-1 .ant-popover-inner-content';
          popover2 = '.help-class-matrixTable-type2-1-1 .ant-popover-inner-content';
          popover3 = '.help-class-matrixTable-type3-1-1 .ant-popover-inner-content';
          copyPopover0 = '.copyright-class-matrixTable-type0-1-1 .ant-popover-inner-content';
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
        .should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo1.nlm.nih.gov\'>LForms Demo 1</a>');

      cy.byId(field_1).click();
      cy.get(popover1).should('not.exist');

      // escaped HTML coding instructions, when "codingInstructionsFormat" = "text"
      cy.byId(helpButton_2).click();
      cy.get(popover2).should('be.visible')
        .should('have.text', '<code>HTML</code> instructions, with a <button>button</button> and a link <a href=\'http://lforms-demo2.nlm.nih.gov\'>LForms Demo 2</a>');

      cy.byId(field_1).click();
      cy.get(popover2).should('not.exist');

      // enabled HTML coding instructions, when "codingInstructionsFormat" = "html"
      cy.byId(helpButton_3).click();
      cy.get(popover3)
        .should('be.visible')
        .should('have.text', 'HTML instructions, with a button and a link LForms Demo 3')
        .get('a')
        .should('have.attr', 'href', 'http://lforms-demo3.nlm.nih.gov');

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
