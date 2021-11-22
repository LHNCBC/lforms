const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/lforms-next/runtime-es5.js',
    './dist/lforms-next/polyfills-es5.js',
    // './dist/lforms-next/scripts-es5.js',
    './dist/lforms-next/main-es5.js',
    // './dist/lforms-next/vendor-es5.js',
    // './dist/lforms-next/styles-es5.js'
  ]
  await fs.ensureDir('dist/webcomponent')
  await concat(files, 'dist/webcomponent/lhc-forms.es5.js');
  await fs.copyFile('./dist/lforms-next/styles.css', 'dist/webcomponent/styles.css');
  await fs.copy('./dist/lforms-next/assets/', 'dist/webcomponent/assets/' )
})()
