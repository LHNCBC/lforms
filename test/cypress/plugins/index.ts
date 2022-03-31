// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
// module.exports = (on, config) => {}
import * as fs from 'fs';

module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    /**
     * Creates a temporary file under [project root]/tmp/test, after cleaning up the test folder.
     * Returns path relative to project root.
     */
    createTempFileAndCleanup({fileName, content}) {
      const tmpFolder = `${config.fileServerFolder}/tmp/test`;
      fs.rmdirSync(tmpFolder, { recursive: true });
      fs.mkdirSync(tmpFolder, { recursive: true });
      fs.writeFileSync(`${tmpFolder}/${fileName}`, content);
      return `tmp/test/${fileName}`;
    }
  });
};
