testForm = document.getElementById('test-form');

/**
 * Get FHIR version from the version list
 */
function getFHIRVersion() {
  let fhirVersion = document.getElementById("fhirVersion");

  let version = fhirVersion.value;
  if (!version)
    throw 'Please select a FHIR version';
  return version;
}

/**
 * Get FHIR context from the global object LForms
 */
function getFHIR() {
  return LForms.FHIR[getFHIRVersion()];
}

/**
 * Load a data file from local file system
 */
function loadFile(event) {
  var reader = new FileReader();
  var fileAnchor = document.querySelector('#fileAnchor');
  var questionnaire;
  reader.onload = function() {
    var questionnaire = JSON.parse(reader.result);          
    // Reset the field with the filename we can load the same file again if needed.
    fileAnchor.value = '';
    testForm.questionnaire = questionnaire;
    testForm.fhirVersion = getFHIRVersion()
  };
  reader.readAsText(event.target.files[0]); 
}
