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
   * @returns 
   */
  function parseSrcValue(urlWithParameters) {
    var options = null;
    if (urlWithParameters) {
      var parts = urlWithParameters.split("?");
      // parameters
      if (parts[1]) {
        options = {};
        var opt = parts[1].split("&");
        for (var i = opt.length-1; i >= 0; i--) {
          var pair = opt[i].split("=");
          options[pair[0]] = pair[1] || "_NO_VALUE_";
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
    var options;
  
    if (srcValue) options = parseSrcValue(srcValue);
    var filesToLoad = es5Files;
  
    if (options) {
      // lforms 
      if (options["es"]==="2015") {
        filesToLoad = es2015Files
      }
      // fhir
      if (options["fhir"]==="R4") {
        filesToLoad.push(fhirR4File)
      }
      else if (options["fhir"]==="STU3") {
        filesToLoad.push(fhirStu3File)
      }
      else if (options["fhir"]==="_NO_VALUE_") {
        filesToLoad.push(fhirAllFile)
      }
      // zone.js
      if (options["zone.js"]==="_NO_VALUE_") {
        filesToLoad.splice(0, 0, zonejsFile)
      }
    }
  

    filesToLoad.forEach(function(file) {
      console.log(baseUrl+file)
      loadScript(baseUrl + file)
    })
        
  }
  // load the files
  loadLFormsAndFhir()
  
})()
