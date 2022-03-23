// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
//module.exports = (on, config) => {}
import * as fs from "fs";

module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    createTempFile({fileName, content}) {
      fs.writeFileSync(`${config.fixturesFolder}/${fileName}`, content);
      return null;
    }
  })
}
