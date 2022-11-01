const fs = require('fs-extra');
const concat = require('concat');
(async function build() {

  // es2020 files from angular 14 build
  const jsFiles = [
    './dist/webcomponent/scripts.js',
    './dist/webcomponent/runtime.js',
    './dist/webcomponent/polyfills.js',
    './dist/webcomponent/main.js',
  ]
 
  await concat(jsFiles, 'dist/webcomponent/lhc-forms.js');

})()
