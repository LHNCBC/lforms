const concat = require('concat');
(async function build() {
  const es5Files = [
    './dist/lforms/webcomponent/scripts.js',  // scripts.js has jquery only. jquery needs to be in the first position
    './dist/lforms/webcomponent/runtime-es5.js',
    './dist/lforms/webcomponent/polyfills-es5.js',
    './dist/lforms/webcomponent/main-es5.js'
  ]
  const es2015Files = [
    './dist/lforms/webcomponent/scripts.js',  // jquery could be in any position
    './dist/lforms/webcomponent/runtime-es2015.js',
    './dist/lforms/webcomponent/polyfills-es2015.js',
    './dist/lforms/webcomponent/main-es2015.js',
  ]

  await concat(es5Files, 'dist/lforms/webcomponent/lhc-forms.es5.js');
  await concat(es2015Files, 'dist/lforms/webcomponent/lhc-forms.es2015.js');
})()
