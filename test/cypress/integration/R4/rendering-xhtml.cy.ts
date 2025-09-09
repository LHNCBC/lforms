import {TestPage} from '../../support/lforms_testpage.po.js';
import * as util from "../../support/util";
const answerId = util.answerId;

describe('displayScoreWithAnswerText', () => {
  it('should honor rendering-xhtml when displayScoreWithAnswerText is set to false', () => {
    const tp = new TestPage();
    tp.openBaseTestPage();
    util.addFormToPage('q-with-scores-with-rendering-xhtml.json', null, {fhirVersion: 'R4', allowHTML: true, displayScoreWithAnswerText: false});
    cy.byId('A-1/1/1').click();
    cy.get('#lhc-tools-searchResults li:first-child').should('contain.text', 'display from rendering-xhtml');
    cy.byId('A-1/1/1').blur();
    cy.get('#lhc-tools-searchResults li:first-child').should('not.be.visible');
    cy.byId('B-1/1/1').click();
    cy.get('#lhc-tools-searchResults li:first-child').should('contain.text', 'display from rendering-xhtml');
  });

  it('should honor rendering-xhtml when displayScoreWithAnswerText is set to true', () => {
    const tp = new TestPage();
    tp.openBaseTestPage();
    util.addFormToPage('q-with-scores-with-rendering-xhtml.json', null, {fhirVersion: 'R4', allowHTML: true, displayScoreWithAnswerText: true});
    cy.byId('A-1/1/1').click();
    cy.get('#lhc-tools-searchResults li:first-child').should('contain.text', 'display from rendering-xhtml');
    cy.byId('A-1/1/1').blur();
    cy.get('#lhc-tools-searchResults li:first-child').should('not.be.visible');
    cy.byId('B-1/1/1').click();
    cy.get('#lhc-tools-searchResults li:first-child').should('contain.text', 'display from rendering-xhtml - 1');
  });
});

// describe('rendering-xhtml', () => {
//   describe('on item.text', () => {
//     const tp: TestPage = new TestPage();
//
//     beforeEach(() => {
//       tp.openBaseTestPage();
//     });
//
//     it('should display question html if allowed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-text.json', 'R4');
//       cy.get('.testPlease')
//         .should('be.visible')
//         .should('have.text', 'Please');
//       // contained image
//       cy.get('.testContainedImage')
//         .should('be.visible');
//     });
//
//     it('should display question text if not allowed in template options', () => {
//       tp.loadFromTestData('q-with-rendering-xhtml-text.json', 'R4');
//       cy.get('.testPlease')
//         .should('not.exist');
//       cy.get('.question')
//         .eq(0)
//         .should('have.text', 'Please answer Yes or No to each of the following questions:');
//     });
//
//     it('should display question escaped html, if invalid tags are displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       cy.get('#displayInvalidHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
//       cy.get('.testPlease')
//         .should('not.exist');
//       cy.get('.question')
//         .eq(0)
//         .should('have.text', "<i class='testPlease'>Please</i> answer <script>Yes</script> or <b>No</b> to each of the following questions:");
//     });
//
//     it('should display question text, if invalid tags are not displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-text-with-invalid-tag.json', 'R4');
//       cy.get('.testPlease')
//         .should('not.exist');
//       cy.get('.question')
//         .eq(0)
//         .should('have.text', 'Please answer Yes or No to each of the following questions:');
//     });
//   });
//
//   describe('on item.prefix', () => {
//     const tp: TestPage = new TestPage();
//
//     beforeEach(() => {
//       tp.openBaseTestPage();
//     });
//
//     it('should display prefix html if allowed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-prefix.json', 'R4');
//       cy.get('.testPlease')
//         .should('be.visible')
//         .should('have.text', 'A');
//       // contained image
//       cy.get('.testContainedImage')
//         .should('be.visible');
//     });
//
//     it('should display prefix text if not allowed in template options', () => {
//       tp.loadFromTestData('q-with-rendering-xhtml-prefix.json', 'R4');
//       cy.get('.testPlease')
//         .should('not.exist');
//       cy.get('.prefix')
//         .eq(0)
//         .should('have.text', 'A:');
//     });
//
//     it('should display prefix escaped html, if invalid tags are displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       cy.get('#displayInvalidHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-prefix-with-invalid-tag.json', 'R4');
//       cy.get('.testPlease')
//         .should('not.exist');
//       cy.get('.prefix')
//         .eq(0)
//         .should('have.text', "<i class='testPlease'>A</i> HTML <script>prefix:</script>");
//     });
//
//     it('should display prefix text, if invalid tags are not displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-prefix-with-invalid-tag.json', 'R4');
//       cy.get('.testPlease')
//         .should('not.exist');
//       cy.get('.prefix')
//         .eq(0)
//         .should('have.text', 'A:');
//     });
//   });
//
//   describe('on item.legal and item.codingInstrctions', () => {
//     const tp: TestPage = new TestPage();
//
//     beforeEach(() => {
//       tp.openBaseTestPage();
//     });
//
//     it('should display help and legal html if allowed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-help-and-legal.json', 'R4');
//       cy.byId('help-button-1.1/1').click();
//       cy.byId('help-content-1.1/1').should('have.html', 'some help <button>button</button> text');
//       cy.byId('legal-button-1.2/1').click();
//       cy.byId('legal-content-1.2/1').should('have.html', 'some legal <button>button</button> text');
//     });
//
//     it('should display help and legal escaped html, if invalid tags are displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       cy.get('#displayInvalidHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-help-and-legal-with-invalid-tag.json', 'R4');
//       cy.byId('help-button-1.1/1').click();
//       cy.byId('help-content-1.1/1').should('have.text', 'some <script>help</script> <button>button</button> text');
//       cy.byId('legal-button-1.2/1').click();
//       cy.byId('legal-content-1.2/1').should('have.text', 'some <script>legal</script> <button>button</button> text');
//     });
//
//     it('should display help and legal text, if invalid tags are not displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-help-and-legal-with-invalid-tag.json', 'R4');
//       cy.byId('help-button-1.1/1').click();
//       cy.byId('help-content-1.1/1').should('have.text', 'some help text');
//       cy.byId('legal-button-1.2/1').click();
//       cy.byId('legal-content-1.2/1').should('have.text', 'some legal text');
//     });
//   });
//
//   describe('on answerOption', () => {
//     const tp: TestPage = new TestPage();
//
//     beforeEach(() => {
//       tp.openBaseTestPage();
//     });
//
//     describe('valueString', () => {
//       it('should display answerOption html if allowed in template options', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
//         // radio
//         cy.byId('#item-valueString-group2-item1/1/1')
//           .find('.testBold')
//           .should('have.length', 3);
//         cy.byId('#item-valueString-group2-item1/1/1')
//           .find('.testImage')
//           .should('be.visible');
//         // checkbox
//         cy.byId('#item-valueString-group2-item2/1/1')
//           .find('.testBold')
//           .should('have.length', 3);
//         cy.byId('#item-valueString-group2-item2/1/1')
//           .find('.testImage')
//           .should('be.visible');
//         // autocomplete
//         cy.byId('#valueString-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; bold <b class=\"testBold\">A</b>");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold <b class=\"testBold\">B</b>");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold <b class=\"testBold\">C</b><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
//         // Check the value in the field after the user selects something.
//         cy.get('@listOptions').eq(1).click();
//         cy.byId('#valueString-group1-item1/1/1').should('have.value', "bold B");
//       });
//
//       it('should display answerOption text if not allowed in template options', () => {
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
//         cy.get('.testBold')
//           .should('not.exist');
//         // radio
//         cy.byId(answerId('#valueString-group2-item1/1/1', undefined, 'bold a'))
//           .should('have.text', "bold a");
//         cy.byId(answerId('#valueString-group2-item1/1/1', undefined, 'bold b'))
//           .should('have.text', "bold b");
//         cy.byId(answerId('#valueString-group2-item1/1/1', undefined, 'bold c'))
//           .should('have.text', "bold c");
//         // checkbox
//         cy.byId(answerId('#valueString-group2-item2/1/1', undefined, 'bold a'))
//           .should('have.text', "bold a");
//         cy.byId(answerId('#valueString-group2-item2/1/1', undefined, 'bold b'))
//           .should('have.text', "bold b");
//         cy.byId(answerId('#valueString-group2-item2/1/1', undefined, 'bold c'))
//           .should('have.text', "bold c");
//         // autocomplete
//         cy.byId('#valueString-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; bold a");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold b");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold c");
//         // Check the value in the field after the user selects something.
//         cy.get('@listOptions').eq(1).click();
//         cy.byId('#valueString-group1-item1/1/1').should('have.value', "bold b");
//       });
//
//       it('should display answerOption escaped html, if invalid tags are displayed in template options', () => {
//         cy.get('#allowHTML').click();
//         cy.get('#displayInvalidHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
//         cy.get('.testBold')
//           .should('not.exist');
//         // radio
//         cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold a'))
//           .should('have.text', "<script>bold</script> <b class='testBold'>A</b>");
//         cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold b'))
//           .should('have.text', "<script>bold</script> <b class='testBold'>B</b>");
//         cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold c'))
//           .should('have.text', "<script>bold</script> <b class='testBold'>C</b>");
//         // checkbox
//         cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold a'))
//           .should('have.text', "<script>bold</script> <b class='testBold'>A</b>");
//         cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold b'))
//           .should('have.text', "<script>bold</script> <b class='testBold'>B</b>");
//         cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold c'))
//           .should('have.text', "<script>bold</script> <b class='testBold'>C</b>");
//         // autocomplete
//         cy.byId('valueString-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &lt;script&gt;bold&lt;/script&gt; A");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold b");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold <b class=\"testBold\">C</b><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
//         // Check the value in the field after the user selects something.
//         cy.get('@listOptions').eq(0).click();
//         cy.byId('#valueString-group1-item1/1/1').should('have.value', "&lt;script&gt;bold&lt;/script&gt; A");
//       });
//
//       it('should display answerOption text, if invalid tags are not displayed in template options', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
//         cy.get('.testBold')
//           .should('not.exist');
//         // radio
//         cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold a'))
//           .should('have.text', "bold a");
//         cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold b'))
//           .should('have.text', "bold b");
//         cy.byId(answerId('valueString-group2-item1/1/1', undefined, 'bold c'))
//           .should('have.text', "bold c");
//         // checkbox
//         cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold a'))
//           .should('have.text', "bold a");
//         cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold b'))
//           .should('have.text', "bold b");
//         cy.byId(answerId('valueString-group2-item2/1/1', undefined, 'bold c'))
//           .should('have.text', "bold c");
//         // autocomplete
//         cy.byId('#valueString-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; bold a");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; bold b");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; bold <b class=\"testBold\">C</b><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
//       });
//     });
//
//     describe('matrix layout', () => {
//       it('should display plain text', () => {
//         tp.loadFromTestData('answerOption-html-matrix-layout.json', 'R4');
//         cy.byId('item-/matrixTable0/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//         // HTML options should display text when HTML is not allowed.
//         cy.byId('item-/matrixTable1/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//         // Invalid HTML options should display text when HTML is not allowed.
//         cy.byId('item-/matrixTable2/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//       });
//
//       it('should display HTML', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('answerOption-html-matrix-layout.json', 'R4');
//         cy.byId('item-/matrixTable1/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .find('button')
//           .should('exist');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .find('button')
//           .should('exist');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .find('button')
//           .should('exist');
//         // Invalid HTML options should display text when invalid HTML is not displayed.
//         cy.byId('item-/matrixTable2/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//       });
//
//       it('should display escaped HTML', () => {
//         cy.get('#allowHTML').click();
//         cy.get('#displayInvalidHTML').click();
//         tp.loadFromTestData('answerOption-html-matrix-layout.json', 'R4');
//         cy.byId('item-/matrixTable2/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer <script>button</script> 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer <script>button</script> 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer <script>button</script> 3');
//       });
//     });
//
//     describe('valueCoding.display', () => {
//       it('should display answerOption html if allowed in template options', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
//         // radio
//         cy.byId('#item-valueCoding-group2-item1/1/1')
//           .find('.testItalic')
//           .should('have.length', 3);
//         // checkbox
//         cy.byId('#item-valueCoding-group2-item2/1/1')
//           .find('.testItalic')
//           .should('have.length', 3);
//         // autocomplete
//         cy.byId('#valueCoding-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic <i class=\"testItalic\">B</i>");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
//         // Check the value in the field after the user selects something.
//         cy.get('@listOptions').eq(1).click();
//         cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "italic B");
//       });
//
//       it('should display answerOption text if not allowed in template options', () => {
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
//         cy.get('.testItalic')
//           .should('not.exist');
//         // radio
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'a'))
//           .should('have.text', "italic a");
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'b'))
//           .should('have.text', "italic b");
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'c'))
//           .should('have.text', "italic c");
//         // checkbox
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'a'))
//           .should('have.text', "italic a");
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'b'))
//           .should('have.text', "italic b");
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'c'))
//           .should('have.text', "italic c");
//         // autocomplete
//         cy.byId('#valueCoding-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic a");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic c");
//         // Check the value in the field after the user selects something.
//         cy.get('@listOptions').eq(1).click();
//         cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "italic b");
//       });
//
//       it('should display answerOption escaped html, if invalid tags are displayed in template options', () => {
//         cy.get('#allowHTML').click();
//         cy.get('#displayInvalidHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
//         cy.get('.testItalic')
//           .should('not.exist');
//         // radio
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'a'))
//           .should('have.text', "<script>italic</script> <i class='testItalic'>A</i>");
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'b'))
//           .should('have.text', "<script>italic</script> <i class='testItalic'>B</i>");
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'c'))
//           .should('have.text', "<script>italic</script> <i class='testItalic'>C</i>");
//         // checkbox
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'a'))
//           .should('have.text', "<script>italic</script> <i class='testItalic'>A</i>");
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'b'))
//           .should('have.text', "<script>italic</script> <i class='testItalic'>B</i>");
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'c'))
//           .should('have.text', "<script>italic</script> <i class='testItalic'>C</i>");
//         // autocomplete
//         cy.byId('#valueCoding-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &lt;script&gt;italic&lt;/script&gt; A");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
//         // Check the value in the field after the user selects something.
//         cy.get('@listOptions').eq(0).click();
//         cy.byId('#valueCoding-group1-item1/1/1').should('have.value', "&lt;script&gt;italic&lt;/script&gt; A");
//       });
//
//       it('should display answerOption text, if invalid tags are not displayed in template options', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption-with-invalid-tag.json', 'R4');
//         cy.get('.testItalic')
//           .should('not.exist');
//         // radio
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'a'))
//           .should('have.text', "italic a");
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'b'))
//           .should('have.text', "italic b");
//         cy.byId(answerId('valueCoding-group2-item1/1/1', undefined, 'c'))
//           .should('have.text', "italic c");
//         // checkbox
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'a'))
//           .should('have.text', "italic a");
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'b'))
//           .should('have.text', "italic b");
//         cy.byId(answerId('valueCoding-group2-item2/1/1', undefined, 'c'))
//           .should('have.text', "italic c");
//         // autocomplete
//         cy.byId('#valueCoding-group1-item1/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic a");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i><img class=\"testImage\" src=\"/test/data/a-picture.png\">");
//       });
//
//       it('should remove the option after user selects it in multi-select list', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('q-with-rendering-xhtml-answerOption.json', 'R4');
//         // autocomplete
//         cy.byId('#valueCoding-group1-item2/1/1')
//           .focus();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 3);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic <i class=\"testItalic\">B</i>");
//         cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
//         // Check the list after the user selects something.
//         cy.get('@listOptions').eq(1).click();
//         cy.get('#completionOptions li')
//           .as('listOptions');
//         cy.get('@listOptions')
//           .should('be.visible')
//           .should('have.length', 2);
//         cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
//         cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
//       });
//     });
//
//   });
//
//   describe('on contained valueset', () => {
//     const tp: TestPage = new TestPage();
//
//     beforeEach(() => {
//       tp.openBaseTestPage();
//     });
//
//     it('should display html if allowed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset.json', 'R4');
//       // radio
//       cy.byId('#item-group2-item1/1/1')
//         .find('.testItalic')
//         .should('have.length', 3);
//       // checkbox
//       cy.byId('#item-group2-item2/1/1')
//         .find('.testItalic')
//         .should('have.length', 3);
//       // autocomplete
//       cy.byId('#group1-item1/1/1')
//         .focus();
//       cy.get('#completionOptions li')
//         .as('listOptions');
//       cy.get('@listOptions')
//         .should('be.visible')
//         .should('have.length', 3);
//       cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic <i class=\"testItalic\">A</i>");
//       cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic <i class=\"testItalic\">B</i>");
//       cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
//       // Check the value in the field after the user selects something.
//       cy.get('@listOptions').eq(1).click();
//       cy.byId('#group1-item1/1/1').should('have.value', "italic B");
//     });
//
//     it('should display text if not allowed in template options', () => {
//       tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset.json', 'R4');
//       cy.get('.testItalic')
//         .should('not.exist');
//       // radio
//       cy.byId(answerId('group2-item1/1/1', 'test', 'a'))
//         .should('have.text', "italic a");
//       cy.byId(answerId('group2-item1/1/1', 'test', 'b'))
//         .should('have.text', "italic b");
//       cy.byId(answerId('group2-item1/1/1', 'test', 'c'))
//         .should('have.text', "italic c");
//       // checkbox
//       cy.byId(answerId('group2-item2/1/1', 'test', 'a'))
//         .should('have.text', "italic a");
//       cy.byId(answerId('group2-item2/1/1', 'test', 'b'))
//         .should('have.text', "italic b");
//       cy.byId(answerId('group2-item2/1/1', 'test', 'c'))
//         .should('have.text', "italic c");
//       // autocomplete
//       cy.byId('#group1-item1/1/1')
//         .focus();
//       cy.get('#completionOptions li')
//         .as('listOptions');
//       cy.get('@listOptions')
//         .should('be.visible')
//         .should('have.length', 3);
//       cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic a");
//       cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
//       cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic c");
//       // Check the value in the field after the user selects something.
//       cy.get('@listOptions').eq(1).click();
//       cy.byId('#group1-item1/1/1').should('have.value', "italic b");
//     });
//
//     it('should display escaped html, if invalid tags are displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       cy.get('#displayInvalidHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset-with-invalid-tag.json', 'R4');
//       // radio
//       cy.byId(answerId('group2-item1/1/1', 'test', 'a'))
//         .should('have.text', "<script>italic</script> A");
//       cy.byId(answerId('group2-item1/1/1', 'test', 'b'))
//         .should('have.text', "italic b");
//       cy.byId(answerId('group2-item1/1/1', 'test', 'c'))
//         .find('.testItalic')
//         .should('have.length', 1);
//       // checkbox
//       cy.byId(answerId('group2-item2/1/1', 'test', 'a'))
//         .should('have.text', "<script>italic</script> A");  // displays invalid tags
//       cy.byId(answerId('group2-item2/1/1', 'test', 'b'))
//         .should('have.text', "italic b"); // displays plain text
//       cy.byId(answerId('group2-item2/1/1', 'test', 'c'))
//         .find('.testItalic')
//         .should('have.length', 1);  // displays HTML
//       // autocomplete
//       cy.byId('#group1-item1/1/1')
//         .focus();
//       cy.get('#completionOptions li')
//         .as('listOptions');
//       cy.get('@listOptions')
//         .should('be.visible')
//         .should('have.length', 3);
//       cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; &lt;script&gt;italic&lt;/script&gt; A");
//       cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
//       cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
//
//       // Check the value in the field after the user selects something.
//       cy.get('@listOptions').eq(1).click();
//       cy.byId('#group1-item1/1/1').should('have.value', "italic b");
//       cy.byId('#group1-item1/1/1')
//         .focus();
//       cy.get('#completionOptions li')
//         .as('listOptions');
//       cy.get('@listOptions').eq(2).click();
//       // When user changes selection to the 3rd option, input field should display
//       // the string stripped of the HTML tags.
//       cy.byId('#group1-item1/1/1').should('have.value', "italic C");
//     });
//
//     it('should display text, if invalid tags are not displayed in template options', () => {
//       cy.get('#allowHTML').click();
//       tp.loadFromTestData('q-with-rendering-xhtml-contained-valueset-with-invalid-tag.json', 'R4');
//       // radio
//       cy.byId(answerId('group2-item1/1/1', 'test', 'a'))
//         .should('have.text', "italic a"); // displays plain text
//       cy.byId(answerId('group2-item1/1/1', 'test', 'b'))
//         .should('have.text', "italic b"); // displays plain text
//       cy.byId(answerId('group2-item1/1/1', 'test', 'c'))
//         .find('.testItalic')
//         .should('have.length', 1);  // displays HTML
//       // checkbox
//       cy.byId(answerId('group2-item2/1/1', 'test', 'a'))
//         .should('have.text', "italic a");
//       cy.byId(answerId('group2-item2/1/1', 'test', 'b'))
//         .should('have.text', "italic b");
//       cy.byId(answerId('group2-item2/1/1', 'test', 'c'))
//         .find('.testItalic')
//         .should('have.length', 1);
//       // autocomplete
//       cy.byId('#group1-item1/1/1')
//         .focus();
//       cy.get('#completionOptions li')
//         .as('listOptions');
//       cy.get('@listOptions')
//         .should('be.visible')
//         .should('have.length', 3);
//       cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; italic a");
//       cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; italic b");
//       cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; italic <i class=\"testItalic\">C</i>");
//       // Check the value in the field after the user selects something.
//       cy.get('@listOptions').eq(0).click();
//       cy.byId('#group1-item1/1/1').should('have.value', "italic a");
//     });
//
//     it('should display html on externally loaded answerValueSet', () => {
//       cy.get('#allowHTML').click();
//       cy.intercept('POST', 'https://hapi.fhir.org/baseR4/ValueSet/$expand', {
//         "resourceType": "ValueSet",
//         "id": "test-valueset",
//         "meta": {
//           "extension": [
//             {
//               "url": "http://hapifhir.io/fhir/StructureDefinition/valueset-expansion-message",
//               "valueString": "ValueSet with URL \"ValueSet.id[ValueSet/test-valueset]\" was expanded using an in-memory expansion"
//             }
//           ]
//         },
//         "status": "active",
//         "compose": {
//           "include": [
//             {
//               "system": "lhc.forms.test.code.system",
//               "concept": [{
//                 "code": "a",
//                 "display": "Answer 1",
//                 "_display": {
//                   "extension": [{
//                     "url": "http://hl7.org/fhir/StructureDefinition/rendering-xhtml",
//                     "valueString": "Answer <button>button</button> 1"
//                   }]
//                 }
//               }, {
//                 "code": "b",
//                 "display": "Answer 2",
//                 "_display": {
//                   "extension": [{
//                     "url": "http://hl7.org/fhir/StructureDefinition/rendering-xhtml",
//                     "valueString": "Answer <button>button</button> 2"
//                   }]
//                 }
//               }, {
//                 "code": "c",
//                 "display": "Answer 3",
//                 "_display": {
//                   "extension": [{
//                     "url": "http://hl7.org/fhir/StructureDefinition/rendering-xhtml",
//                     "valueString": "Answer <button>button</button> 3"
//                   }]
//                 }
//               }]
//             }
//           ]
//         },
//         "expansion": {
//           "offset": 0,
//           "parameter": [
//             {
//               "name": "offset",
//               "valueInteger": 0
//             },
//             {
//               "name": "count",
//               "valueInteger": 1000
//             }
//           ],
//           "contains": [
//             {
//               "system": "lhc.forms.test.code.system",
//               "code": "a",
//               "display": "Answer 1"
//             },
//             {
//               "system": "lhc.forms.test.code.system",
//               "code": "b",
//               "display": "Answer 2"
//             },
//             {
//               "system": "lhc.forms.test.code.system",
//               "code": "c",
//               "display": "Answer 3"
//             }
//           ]
//         }
//       })
//       tp.loadFromTestData('q-with-contained-valueset-without-expansion.json', 'R4');
//       // radio
//       cy.byId('#item-group2-item1/1/1')
//         .find('button')
//         .should('have.length', 3);
//       // checkbox
//       cy.byId('#item-group2-item2/1/1')
//         .find('button')
//         .should('have.length', 3);
//       // autocomplete
//       cy.byId('#group1-item1/1/1')
//         .focus();
//       cy.get('#completionOptions li')
//         .as('listOptions');
//       cy.get('@listOptions')
//         .should('be.visible')
//         .should('have.length', 3);
//       cy.get('@listOptions').eq(0).should('have.html', "<span class=\"listNum\">1:</span>&nbsp; Answer <button>button</button> 1");
//       cy.get('@listOptions').eq(1).should('have.html', "<span class=\"listNum\">2:</span>&nbsp; Answer <button>button</button> 2");
//       cy.get('@listOptions').eq(2).should('have.html', "<span class=\"listNum\">3:</span>&nbsp; Answer <button>button</button> 3");
//       // Check the value in the field after the user selects something.
//       cy.get('@listOptions').eq(1).click();
//       cy.byId('#group1-item1/1/1').should('have.value', "Answer button 2");
//     });
//
//     describe('matrix layout', () => {
//       it('should display plain text', () => {
//         tp.loadFromTestData('contained-valueset-html-matrix-layout.json', 'R4');
//         cy.byId('item-/matrixTable0/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//         // HTML options should display text when HTML is not allowed.
//         cy.byId('item-/matrixTable1/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//         // Invalid HTML options should display text when HTML is not allowed.
//         cy.byId('item-/matrixTable2/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//       });
//
//       it('should display HTML', () => {
//         cy.get('#allowHTML').click();
//         tp.loadFromTestData('contained-valueset-html-matrix-layout.json', 'R4');
//         cy.byId('item-/matrixTable1/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .find('button')
//           .should('exist');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .find('button')
//           .should('exist');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .find('button')
//           .should('exist');
//         // Invalid HTML options should display text when invalid HTML is not displayed.
//         cy.byId('item-/matrixTable2/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer 3');
//       });
//
//       it('should display escaped HTML', () => {
//         cy.get('#allowHTML').click();
//         cy.get('#displayInvalidHTML').click();
//         tp.loadFromTestData('contained-valueset-html-matrix-layout.json', 'R4');
//         cy.byId('item-/matrixTable2/1')
//           .find('th.lhc-form-matrix-cell')
//           .as('tableHeaders');
//         cy.get('@tableHeaders')
//           .should('have.length', 3);
//         cy.get('@tableHeaders')
//           .eq(0)
//           .should('have.text', 'Answer <script>button</script> 1');
//         cy.get('@tableHeaders')
//           .eq(1)
//           .should('have.text', 'Answer <script>button</script> 2');
//         cy.get('@tableHeaders')
//           .eq(2)
//           .should('have.text', 'Answer <script>button</script> 3');
//       });
//     });
//   });
// });

