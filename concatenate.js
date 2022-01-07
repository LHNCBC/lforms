const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const es5Files = [
    './dist/webcomponent/scripts.js',  // scripts.js has jquery only. jquery needs to be in the first position
    './dist/webcomponent/runtime-es5.js',
    './dist/webcomponent/polyfills-es5.js',
    './dist/webcomponent/main-es5.js'
  ]
  const es2015Files = [
    './dist/webcomponent/scripts.js',  // jquery could be in any position
    './dist/webcomponent/runtime-es2015.js',
    './dist/webcomponent/polyfills-es2015.js',
    './dist/webcomponent/main-es2015.js',
  ]

  const copiedFiles = [
    'runtime-es5.js',
    'runtime-es5.js.map',
    'runtime-es2015.js',
    'runtime-es2015.js.map',
    'polyfills-es5.js',
    'polyfills-es5.js.map',
    'polyfills-es2015.js',
    'polyfills-es2015.js.map',
    'main-es5.js',
    'main-es5.js.map',
    'main-es2015.js',
    'main-es2015.js.map',
    'scripts.js',  
    'styles.css',
    'magnifying_glass.png',
    'down_arrow_gray_10_10.png'
  ]
  // await fs.ensureDir('dist/webcomponent')
  await concat(es5Files, 'dist/webcomponent/lhc-forms.es5.js');
  await concat(es2015Files, 'dist/webcomponent/lhc-forms.es2015.js');
  // copiedFiles.forEach(async (file) => {
  //   await fs.copyFile('./dist/lforms/' + file, 'dist/webcomponent/' + file);
  // })
  // await fs.copy('./dist/lforms/assets/', 'dist/webcomponent/assets/' )
})()
