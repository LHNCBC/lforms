/**
 *  Goes to lforms_testpage.html
 */
export function visitTestPage() {
  cy.visit('dist/webcomponent/test/lforms_testpage.html');
  // Fix script tags - necessary until we get rid of protractor
  cy.get('script').each((tag) => {
  console.log(tag[0]);
    let src = tag.attr('src');
  console.log(src);
    if (src && !src.startsWith('http')) {
      src='dist/webcomponent/test/'+src;
      tag.attr('src', src);
    }
    /*
    console.log(tag[0]);
    tag.invoke('attr', 'src').then((src) => {
      if (!src.startsWith('http')) {
    console.log('found ' +src);
        src='dist/webcomponent/test/'+src;
        tag.invoke('attr', 'src', src);
      }
    });
    */
  });
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
  // Temporarily unhide the file input element.
  let fileInput = cy.get('#fileAnchor');
  fileInput.invoke('attr', 'class', '');
  fileInput.selectFile(testFile);
  // Re-hide the file input element
  fileInput.invoke('attr', 'class', 'hide');
  // wait for the form to render
  cy.get('.lhc-form-title', {timeout: 10000}).should('be.visisble');
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
    setFHIRVersion(fhirVersion);
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



