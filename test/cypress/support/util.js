// General utility functions for the Cypress tests

/**
 *  Goes to addFormToPageTest.html
 */
export function visitTestPage() {
  cy.visit('test/pages/addFormToPageTest.html');
}


/**
 *  Add a form to the test page
 * @param filePathOrFormDefData the path to the form definition (relative to
 * test/data/[fhirVersion], or test/data/lforms if fhirVersion isn't specified), 
 * or the form definition data.
 * @param container the ID of the element into which the form should be placed.
 *  Default: 'formContainer'
 * @param options the options argument to LForms.Util.addFormToPage (fhirVersion
 *  & prepoulate)
 */
export function addFormToPage(filePathOrFormDefData, container, options) {
  if (!container)
    container = 'formContainer';

  
  if (typeof filePathOrFormDefData === "string") {
    let fhirVersionInFile = options?.fhirVersion && options?.fhirVersion === 'R4B' ? 'R4' : options?.fhirVersion;
    let filePath = fhirVersionInFile ? fhirVersionInFile +'/'+filePathOrFormDefData :
     'lforms/'+filePathOrFormDefData;
    cy.readFile('test/data/'+filePath).then((formDef) => {  // readFile will parse the JSON
      this.addFormDataToPage(formDef, container, options);
    });
  }
  else if (typeof filePathOrFormDefData === "object") {
    this.addFormDataToPage(filePathOrFormDefData, container, options);
  }
  
  cy.get('#'+container).find('.lhc-form-title').should('be.visible');
};


/**
 *  Calls LForms.Util.addFormToPage using a form definition data
 * @param formDefData a JSON format of a form definition data
 * @param container the ID of the element into which the form should be placed.
 * @param options the options argument to LForms.Util.addFormToPage (fhirVersion
 *  & prepoulate)
 */
export function addFormDataToPage(formDefData, container, options) {
  
  cy.window().then((win) => {
    win.document.getElementById(container).innerHTML = null;
    return new Cypress.Promise((resolve) => {
      win.LForms.Util.addFormToPage(formDefData, container, options).then(()=>resolve(), ()=>resolve());
    });
  });
  
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
export function setFHIRVersion(version) {
  let fhirVersionField = cy.get('#fhirVersion');
  fhirVersionField.select(version);
}
