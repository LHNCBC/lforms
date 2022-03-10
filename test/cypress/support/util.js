// General utility functions for the Cypress tests

/**
 *  Goes to addFormToPageTest.html
 */
export function visitTestPage() {
  cy.visit('test/pages/addFormToPageTest.html');
}


/**
 *  Calls LForms.Util.addFormToPage
 * @param filePath the path to the form definition relative to
 * test/data/[fhirVersion], or test/data/lforms if fhirVersion isn't specified.
 * @param container the ID of the element into which the form should be placed.
 *  Default: 'formContainer'
 * @param options the options argument to LForms.Util.addFormToPage (fhirVersion
 *  & prepoulate)
 */
export function addFormToPage(filePath, container, options) {
  if (!container)
    container = 'formContainer';
  filePath = options?.fhirVersion ? options.fhirVersion +'/'+filePath :
     'lforms/'+filePath;
  cy.readFile('test/data/'+filePath).then((formDef) => {  // readFile will parse the JSON
    cy.window().then((win) => {
      win.document.getElementById(container).innerHTML = null;
      return new Cypress.Promise((resolve) => {
        win.LForms.Util.addFormToPage(formDef, container, options).then(()=>resolve(), ()=>resolve());
      });
    });
  });
  cy.get('#'+container).find('.lhc-form-title').should('be.visible');
};


/**
 *  Returns the full path to a JSON form definition file in the test/data
 *  directory.
 * @param filepath the path to the form definition file, relative to
 *  test/data/fhirVersion (or just test/data if fhirVersion is not
 *  provided.)
 * @param fhirVersion (optional) the version of FHIR to use.
 */
function getTestDataPathName(filepath, fhirVersion=null) {
  let pathParts = [__dirname, '../../../test/data']
  if (fhirVersion) {
//    setFHIRVersion(fhirVersion);
    pathParts.push(fhirVersion);
  }
  pathParts.push(filepath);
  return require('path').join(...pathParts);
}


/**
 *  Selects a FHIR version.  Designed for lforms_testpage.html and
 *  addFormToPageTest.html.
 * @param version the FHIR version to use.
 */
function setFHIRVersion(version) {
  let fhirVersionField = cy.get('#fhirVersion');
  fhirVersionField.select(version);
}
