import { defineConfig } from 'cypress';
import { config } from './package.json';

export default defineConfig({
  videosFolder: 'test/cypress/videos',
  video: false,
  screenshotsFolder: 'test/cypress/screenshots',
  fixturesFolder: 'test/cypress/fixtures',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./test/cypress/plugins/index.ts')(on, config)
    },
    specPattern: 'test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/index.ts',
    baseUrl: 'http://localhost:'+config.testPort
  },
});
