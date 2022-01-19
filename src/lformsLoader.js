/**
 * Load the individual JavaScript files, with the options to not load zone.js and FHIR libs, 
 * when this file (lformsLoader.js) is included in a HTML page in users projects.
 * By default it will also load zone.min.js, and FHIR js libs.
 * 
 * Parameters: 
 * (1) es -- Optional. Indicate which version of the js files for the LHC-Forms widget to be loaded.
 *     The permissible values are '5' and '2015'. If this parameter is missing or it has any other values 
 *     the es5 version will be loaded. 
 * (1) zone.js -- Optional. Indicate whether to load zone.min.js. The only permissible value is 'false'.
 *     If this parameter is missing or it has anyother values zone.min.js will be loaded.
 * (2) fhir -- Optional. Indicate which versions of FHIR libs to be loaded, or whether to load FHIR libs
 *     at all. The permissible values are 'R4', 'STU3', and 'false'. If this parameter is missing or 
 *     it has any values, both 'R4' and 'STU3' versions of FHIR libs will be loaded.
 * 
 * Usage Examples:
 * (1) Load es5 version LHC-Forms js files, and zone.min.js and FHIR libs (R4 and STU3).
 *     This is the defualt behavior.
 *     <script src="[path/to/]lformsLoader.js">
 * (2) Load the es5 version of the LHC-Forms js files, and FHIR libs (R4 and STU3). (No zone.min.js)
 *     <script src="[path/to/]lformsLoader.js?zone.js=false">
 * (3) Load the es2015 version of the LHC-Forms js files, and FHIR libs (R4 only). (No zone.min.js)
 *     <script src="[path/to/]lformsLoader.js?es=2015&zone.js=false&fhir=R4">
 * (4) Load the es2015 version of the LHC-Forms js files, and zone.min.js and FHIR libs (STU3 only). 
 *     <script src="[path/to/]lformsLoader.js?es=2015&fhir=R4">
 * (5) Load the es5 version of the LHC-Forms js files. (No zone.min.js and No FHIR libs)
 *     <script src="[path/to/]lformsLoader.js?es=5&zone.js=false&fhir=false">
 * 
 */
(function() {

  var lformsLoaderName = "lformsLoader.js", baseUrl;

  /**
   * Find the script tag that load this fiel
   * @returns the value in the 'src' attribute
   */
  function findLformsLoader() {
    var srcValue = ""
    var scripts = document.getElementsByTagName("script");
    for (var i=scripts.length-1; i>=0; i--) {
      var srcValue = scripts[i].attributes.src.value;
      if (srcValue.indexOf(lformsLoaderName) != -1) {
        break;
      }
    }
    return srcValue;
  }
  
  /**
   * Parse the optional parameters 
   * @param {*} urlWithParameters the url to the this file and the optional parameters
   * @returns a object with parsed parameters
   */
  function parseSrcValue(urlWithParameters) {
    var options = {};
    if (urlWithParameters) {
      var parts = urlWithParameters.split("?");
      // parameters
      if (parts[1]) {
        var opt = parts[1].split("&");
        for (var i = opt.length-1; i >= 0; i--) {
          var pair = opt[i].split("=");
          options[pair[0]] = pair[1];
        }
      }
      // url
      baseUrl = parts[0].substring(0, parts[0].length - lformsLoaderName.length)
    }
    return options;
  }
  
  /**
   * Dynamically load a js file from a source URL
   * @param {*} url the URL of a js file
   */
  function loadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    script.async = false; // by default it is async
    document.body.appendChild(script);
  }
  
  /**
   * Load individual lforms js files and fhir js file based on the parameters
   */
  function loadLFormsAndFhir() {
    var es5Files = [
      "webcomponent/runtime-es5.js",
      "webcomponent/polyfills-es5.js",
      "webcomponent/scripts.js", 
      "webcomponent/main-es5.js"
    ];
    var es2015Files = [
      "webcomponent/runtime-es2015.js",
      "webcomponent/polyfills-es2015.js",
      "webcomponent/scripts.js", 
      "webcomponent/main-es2015.js"
    ];
    var fhirR4File = "fhir/R4/lformsFHIR.min.js";
    var fhirStu3File = "fhir/STU3/lformsFHIR.min.js";
    var fhirAllFile = "fhir/lformsFHIRAll.min.js";
    var zonejsFile = "webcomponent/assets/lib/zone.min.js"; 
    var srcValue = findLformsLoader();
    var filesToLoad, options;
  
    if (srcValue) options = parseSrcValue(srcValue);
  
    // lforms es version
    if (options["es"]==="2015") {
      filesToLoad = es2015Files
    }
    else {
      filesToLoad = es5Files;
    }
    // fhir version
    if (options["fhir"]==="false") {
      // not to add fhir libs
    }
    else if (options["fhir"]==="R4") {
      filesToLoad.push(fhirR4File)
    }
    else if (options["fhir"]==="STU3") {
      filesToLoad.push(fhirStu3File)
    }
    else {
      filesToLoad.push(fhirAllFile)
    }
    // zone.js
    if (options["zone.js"]!=="false") {
      filesToLoad.splice(0, 0, zonejsFile)
    }
  

    filesToLoad.forEach(function(file) {
      console.log(baseUrl+file)
      loadScript(baseUrl + file)
    })
        
  }
  // load the files
  loadLFormsAndFhir()
  
})()
