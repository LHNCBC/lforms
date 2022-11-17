const concat = require('concat');
(async function build() {

  // es2017 files from angular 14 build
  const jsFiles = [
    './dist/lforms/webcomponent/scripts.js',
    './dist/lforms/webcomponent/runtime.js',
    './dist/lforms/webcomponent/polyfills.js',
    './dist/lforms/webcomponent/main.js',
  ]
 
  await concat(jsFiles, 'dist/lforms/webcomponent/lhc-forms.js');

})()
