import { AddFormToPageTestPage } from "../support/addFormToPageTest.po";
import * as util from "../support/util";
import * as FHIRSupport from "../../../src/fhir/versions.js";
delete FHIRSupport.default;
// R4B is same as R4 for Questionnaire and QuestionnaireResponse.
// No need to test R4B in this test file.
delete FHIRSupport.R4B;
let fhirVersions = Object.keys(FHIRSupport);
const po = new AddFormToPageTestPage();

describe('Repeating choice/coding item with child items', () => {
  before(() => {
    po.openPage();
  });

  for (var i=0, len=fhirVersions.length; i<len; ++i) {
    (function (fhirVersion) {
      describe(fhirVersion, ()=>{
        it('should get the correct QuestionnaireResponse', function() {
          let qFile = `q-items-under-repeating-choice-item.json`;
          util.addFormToPage(qFile, null, {fhirVersion});

          // a set of items under a choice/coding item
          cy.byId('/choice/1').click().type('{downarrow}').type('{enter}');
          cy.byId('/choice/st/1/1').click().type('a');
          cy.byId('/choice/int/1/1').click().type('1');
          cy.byId('add-/choice/int/1/1').click();
          cy.byId('/choice/int/1/2').click().type('2');

          cy.byId('/choice/group/st/1/1/1').click().type('b');
          cy.byId('/choice/group/int/1/1/1').click().type('3');
          cy.byId('add-/choice/group/int/1/1/1').click();
          cy.byId('/choice/group/int/1/1/2').click().type('4');

          // same set of item under another layer of choice/coding item
          cy.byId('/choice/choice/1/1').click().type('{downarrow}{downarrow}').type('{enter}');
          cy.byId('/choice/choice/st/1/1/1').click().type('c');
          cy.byId('/choice/choice/int/1/1/1').click().type('5');
          cy.byId('add-/choice/choice/int/1/1/1').click();
          cy.byId('/choice/choice/int/1/1/2').click().type('6');

          cy.byId('add-/choice/choice/1/1').click();
          cy.byId('/choice/choice/1/2').click().type('{downarrow}{downarrow}{downarrow}').type('{enter}');
          cy.byId('/choice/choice/st/1/2/1').click().type('d');
          cy.byId('/choice/choice/int/1/2/1').click().type('7');
          cy.byId('add-/choice/choice/int/1/2/1').click();
          cy.byId('/choice/choice/int/1/2/2').click().type('8');


          // add another instance of the parent choice/coding item
          cy.byId('add-/choice/1').click();

          cy.byId('/choice/2').click().type('{downarrow}{downarrow}').type('{enter}');
          cy.byId('/choice/st/2/1').click().type('aa');
          cy.byId('/choice/int/2/1').click().type('11');
          cy.byId('add-/choice/int/2/1').click();
          cy.byId('/choice/int/2/2').click().type('22');

          cy.byId('/choice/group/st/2/1/1').click().type('bb');
          cy.byId('/choice/group/int/2/1/1').click().type('33');
          cy.byId('add-/choice/group/int/2/1/1').click();
          cy.byId('/choice/group/int/2/1/2').click().type('44');

          // same set of item under another layer of choice/coding item
          cy.byId('/choice/choice/2/1').click().type('{downarrow}{downarrow}').type('{enter}');
          cy.byId('/choice/choice/st/2/1/1').click().type('cc');
          cy.byId('/choice/choice/int/2/1/1').click().type('55');
          cy.byId('add-/choice/choice/int/2/1/1').click();
          cy.byId('/choice/choice/int/2/1/2').click().type('66');

          cy.byId('add-/choice/choice/2/1').click();
          cy.byId('/choice/choice/2/2').click().type('{downarrow}{downarrow}{downarrow}').type('{enter}');
          cy.byId('/choice/choice/st/2/2/1').click().type('dd');
          cy.byId('/choice/choice/int/2/2/1').click().type('77');
          cy.byId('add-/choice/choice/int/2/2/1').click();
          cy.byId('/choice/choice/int/2/2/2').click().type('88');

          cy.window().then((win) => {
            let fhirQR = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion);
            let qrFile = `test/data/${fhirVersion}/qr-items-under-repeating-choice-item.json`;
            cy.readFile(qrFile).then((qr) => {
              //ignore meta and authorized
              delete qr.meta;
              delete qr.authored;
              delete fhirQR.meta;
              delete fhirQR.authored;
              expect(qr).to.deep.equal(fhirQR);
            });
          });
        });
      });
    })(fhirVersions[i]);
  }
});




