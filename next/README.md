# WebComponents

This project generates a web component of the new LForms widget.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Dev Env setup (Temporarily when the lforms and the this 'next' version co-exist in the same project)
1. Check out the 'next' branch (or the branch you are working on) from git repository
1. `source bashrc.lform` (make sure node dir is availabel at ~/)    
1. `npm ci`
1. `bower install` (you may need to run `source bashrc.lform` again)
1. `npm run build` (this is to build FHIR libs. `npm run test` will fail)
1. `cd next`
1. `source bashrc.next`
1. `npm ci`
1. `npm run test:e2e:prepare` (this also copies some files (FHIR libs and others) to the right locations for tests.)

## Build

1. Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

2. Run `npm run build:elements` to build the project and generate an ES5 js file of the web component.

## Running unit tests

1. Run `npm run test:unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
1. Run `npm run test:e2e:prepare` to build the project and copy some files for the tests.

2. Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). The e2e tests is configured to use Chrome. If Chrome has been updated, run `npm run update-webdriver` to update the Chrome web driver.
