/**
 *  Goes to lforms_testpage.html
 */
export function visitTestPage() {
  cy.visit('test/pages/addFormToPageTest.html');
}


/**
 *  Loads a form from a JSON form definition file from the test/data
 *  directory, and displays the form.  Designed for lforms_testpage.html, but
 *  will work with other pages that have the same "Load" button.
 *  For a general solution using LForms.Util.addFormToPage, see addFormToPage in
 *  this file.
 * @param filepath the path to the form definition file, relative to
 *  test/data/fhirVersion (or just test/data if fhirVersion is not
 *  provided.)
 * @param fhirVersion (optional) the version of FHIR to use.
 */
/*export function loadFromTestData(filepath, fhirVersion=null) {
  let testFile = getTestDataPathName(filepath, fhirVersion);

  // Listen for the onFormReadyEvent
  let formReady = false;
  cy.get('#formContainer').then((fc)=>fc[0].addEventListener('onFormReady', ()=>formReady=true));
  cy.get('#formContainer').then((fc)=>fc[0].addEventListener('onError', ()=>formReady=true));

  // Temporarily unhide the file input element.
  let fileInput = cy.get('#fileAnchor');
  fileInput.invoke('attr', 'class', '');
  fileInput.selectFile(testFile);
  // Re-hide the file input element
  fileInput.invoke('attr', 'class', 'hide');
  // wait for the form to render
  const loadTimeout = 10000;
  cy.get('.lhc-form-title', {timeout: loadTimeout}).should('be.visible').then(
    {timeout: loadTimeout}, ()=>{

    return new Cypress.Promise((resolve) => {
      function checkFormReady() {
        if (formReady)
          resolve();
        else
          setTimeout(checkFormReady, 50);
      }
      setTimeout(checkFormReady, 50);
    });
  });
}
*/

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
      win.LForms.Util.addFormToPage(formDef, container, options);
      cy.get('#'+container).find('.lhc-form-title').should('be.visible');
    });
  });
};


/**
 *  Returns the full path to a  JSON form definition file in the test/data
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
 *  Selects a FHIR version.  Designed for lforms_testpage.html.
 * @param version the FHIR version to use.
 */
function setFHIRVersion(version) {
  let fhirVersionField = cy.get('#fhirVersion');
  fhirVersionField.select(version);
}



