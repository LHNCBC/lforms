/**
 *  Goes to lforms_testpage.html
 */
export function visitTestPage() {
  cy.visit('test/pages/addFormToPageTest.html');
}


/**
 *  Loads a form from a JSON form definition file from the test/data
 *  directory, and displays the form.  Designed for lforms_testpage.html.
 * @param filepath the path to the form definition file, relative to
 *  test/data/fhirVersion (or just test/data if fhirVersion is not
 *  provided.)
 * @param fhirVersion (optional) the version of FHIR to use.
 */
export function loadFromTestData(filepath, fhirVersion=null) {
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



