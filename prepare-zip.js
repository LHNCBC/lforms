const fs = require('fs-extra');
(async function build() {
  // readme
  await fs.copyFile('./README.md', `./dist/@elimuinformatics/lforms/README.md` )
  // license
  await fs.copyFile('./LICENSE.md', `./dist/@elimuinformatics/lforms/LICENSE.md` )
})()
