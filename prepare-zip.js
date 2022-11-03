const fs = require('fs-extra');
(async function build() {
  // readme
  await fs.copyFile('./README.md', `dist/lforms/README.md` )
  // license
  await fs.copyFile('./LICENSE.md', `dist/lforms/LICENSE.md` )
})()
