import { defineConfig } from '@playwright/test';
import { config } from './package.json';
import path from 'path';

export default defineConfig({
  testDir: 'test/playwright/integration',
  // Output artifacts outside the project so webpack-dev-server live-reload
  // does not re-trigger when Playwright writes traces / screenshots.
  outputDir: path.join(__dirname, '..', '.lforms-pw-results'),
  timeout: 60000,
  fullyParallel: false,
  retries: 0,
  workers: '50%',
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${config.testPort}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    // launchOptions: {
    //   slowMo: 50
    // }
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        contextOptions: {
          permissions: ['clipboard-read']
        }
      },
    },
  ]
});
