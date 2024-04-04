// Concatenates several source files to produce lhc-forms.js and its source map.
const ConcatWithSourceMaps = require('concat-with-sourcemaps');
const concat = new ConcatWithSourceMaps(true, 'all.js', '\n');
const fs = require('fs');
const path = require('path');

(async function build() {

  // es2017 files from angular 17 build
  const jsFileDir = './dist/lforms/webcomponent';
  const jsFiles = ['runtime.js', 'polyfills.js', 'main.js'
    ].map(f=>path.join(jsFileDir, f));

  jsFiles.forEach(f=>{
    let content = fs.readFileSync(f, {encoding: 'utf8'});
    // Remove the sourcemapping statement from the file
    content = content.replace(/\/\/# sourceMappingURL=\S+\.js\.map/, '');
    const fileName = path.basename(f);
    const sourceMapContent = fs.readFileSync(f+'.map', {encoding: 'utf8'});
    concat.add(f, content, sourceMapContent);
  });

  // Add sourcemapping statement to the combined content
  let outputContent = concat.content + "\n//# sourceMappingURL=lhc-forms.js.map\n";
  fs.writeFileSync(path.join(jsFileDir, 'lhc-forms.js'), outputContent);
  fs.writeFileSync(path.join(jsFileDir, 'lhc-forms.js.map'), concat.sourceMap);

  // rename zone.umd.min.js to zone.min.js for backward compatibity
  fs.rename('./dist/lforms/webcomponent/assets/lib/zone.umd.min.js',
      './dist/lforms/webcomponent/assets/lib/zone.min.js', function (err) {
    if (err) throw err
    console.log('Successfully renamed zone.umd.min.js to zone.min.js.')
  })
})()
