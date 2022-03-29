// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
// module.exports = (on, config) => {}
import * as tmp from 'tmp';
import * as path from 'path';
import * as fs from 'fs';

module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    /**
     * Creates a temporary file under [project root]/tmp.
     * Returns path relative to project root.
     */
    createTempFile({fileName, content}) {
      tmp.setGracefulCleanup();
      const dirOptions = {prefix: 'lformsTest2', unsafeCleanup: true, tmpdir: `${config.fileServerFolder}/tmp`};
      const dirPath = tmp.dirSync(dirOptions).name;
      const pathName = path.join(dirPath, fileName);
      fs.writeFileSync(pathName, content);
      return path.relative(config.fileServerFolder, pathName);
    }
  });
};
