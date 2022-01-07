const fs = require('fs-extra');
const version = require("./package.json").version;
(async function build() {
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
    'down_arrow_gray_10_10.png',
    `lhc-forms.es5.js`,
    `lhc-forms.es2015.js`,
  ]

  await fs.ensureDir(`dist/lforms-${version}/webcomponent`)
  // js files
  copiedFiles.forEach(async (file) => {
    await fs.copyFile('./dist/webcomponent/' + file, `dist/lforms-${version}/webcomponent/${file}`);
  })
  // zone.js
  await fs.copy('./dist/webcomponent/assets/', `dist/lforms-${version}/webcomponent/assets/` )
  // readme
  await fs.copyFile('./README.md', `dist/lforms-${version}/README.md` )
  // license
  await fs.copyFile('./LICENSE.md', `dist/lforms-${version}/LICENSE.md` )
})()
