const fs = require('fs-extra');
const version = require("./package.json").version;
(async function build() {
  const copiedFiles = [
    'runtime.js',
    'runtime.js.map',
    'polyfills.js',
    'polyfills.js.map',
    'main.js',
    'main.js.map',
    'scripts.js',
    'scripts.js.map',  
    'styles.css',
    'styles.css.map',
    'magnifying_glass.png',
    'down_arrow_gray_10_10.png',
    `lhc-forms.js`,
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
