# WebComponents

This project generates a web component of the new LForms widget.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `npm run build:elements` to build the project and generate an ES5 js file of the web component.

## Running unit tests

Run `npm run test:unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `npm run test:e2e:prepare` to build the project and copy some files for the tests.

Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). The e2e tests is configured to use Chrome. If Chrome has been updated, run `npm run update-webdriver` to update the Chrome web driver.
