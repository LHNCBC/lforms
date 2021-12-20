## What is LForms?

[LForms](http://lhncbc.github.io/lforms/), a.k.a. LHC-Forms, is a feature-rich,
open-source Web Component that creates input forms, based on definition files, for
Web-based applications. In addition to its native form-definition format, it
partially supports the HL7 FHIR Questionnaire standard (SDC profile), and work
is in progress to expand that support.

It is being developed by the Lister Hill National Center for Biomedical
Communications ([LHNCBC](https://lhncbc.nlm.nih.gov)), National Library of
Medicine ([NLM](https://www.nlm.nih.gov)), part of the National Institutes of
Health ([NIH](https://www.nih.gov)), with the collaboration and support from the
[Regenstrief Institute](https://www.regenstrief.org/), Inc. and the
[LOINC](https://loinc.org/) Committee.

For features and demos, please visit the [project
page](http://lhncbc.github.io/lforms/).

## Licensing and Copyright Notice
See [LICENSE.md](LICENSE.md).

## Customizing and Contributing
If you wish to revise this package, the following steps will allow you to make
changes and test them:

* Install Node.js (version 14 is what we are currently using, but it should work with later versions)
* Clone the lforms repository and cd to its directory
* `source bashrc.lforms` (make sure node dir is available at ~/)    
* `npm ci`
* `source bashrc.lforms` # to add node_modules/.bin to your path
* `npm run build` # build both FHIR libs and LHC-Forms web component
* `npm run start` # starts the app we use for testing
* `npm run test` # runs the unit tests and e2e tests

If you are planning to contribute new functionality back to us, please
coordinate with us, so that the new code is in the right places, and so that
you don't accidentally add something that we are also working on.

## Development server

* Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. 
   The app will automatically reload if you change any of the source files.

* Run `npm run start-public` if you need to access to the dev server from a different machine. 
   For example, to run Narrator from a Windows PC.

## Build

* Run `npm run build` to build the project and generate a production version of the js files, 
   which are much smaller than the development version. It generates two versions of the js files: 
   ES5 version and ES2015 version. The `/dist` directory is deleted and recreated during the process. 
   It also concatenates all ES5 js files of the web component into a single `lhc-forms.es5.js` file 
   and all ES2015 files into `lhc-forms.es2015.js` (along with a `styles.css` file) in the 
   `/dist/webcomponent` directory, which are used in e2e tests and can be distributed to use 
   in other projects. A copy of the individual built files and their source map files are also 
   included in `/dist/webcomponent`. `zone.min.js` is not included in the built file, 
   and a copy is put in `/dist/webcomponent/assets/lib` in case your project does not already include it.
   It also generates FHIR libraries that support both R4 and STU3 versions. The files are located in `/dist/latest/fhir`.

## Running tests
1. Run `npm run test` to run unit tests and e2e tests, which also copies the FHIR lib files 
   and built files in places for testing.

## Running unit tests

1. Run `npm run test:unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

1. Run `npm run test:e2e:prepare` to copy necessary files in places for the tests and to update the web driver.

1. Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
   The e2e tests is configured to use Chrome. If Chrome has been updated, run `npm run update-webdriver` 
   to update the Chrome web driver.

## Using the LHC-Forms Web Component 
* For Angular projects (to avoid including another copy of zone.js)
  * Load the following files from `/dist/webcomponent`
  ```
  1. styles.css
  2. scripts.js  
  3.a. lhc-forms.[es5|es2015].js, or
  3.b. Indidiviual files:
     runtime-[es5|es2015].js
     polyfills-[es5|es2015].js
     main-[es5|es2015].js 
  ```
  * Load the FHIR libs from `/dist/latest/fhir/`   
  ```
  4.a. lformsFHIRAll.min.js, or
  4.b. FHIR libs for a particular version:
     R4/lformsFHIR.min.js
     STU3/lformsFHIR.min.js
  ```
* For non-Angular JavaScript projects, including React, Vue projects, a copy of zone.min.js is required to 
  be loaded before loading above js files. A copy of zone.min.js is in `/dist/webcomponent/assets/bin/zone.min.js`.
  * Load the following files from `/dist/webcomponent`
  ```
  1. styles.css
  2. scripts.js  
  3. zone.min.js
  4.a. lhc-forms.[es5|es2015].js, or
  4.b. Indidiviual files:
     runtime-[es5|es2015].js
     polyfills-[es5|es2015].js
     main-[es5|es2015].js 
  ```
  * Load the FHIR libs from `/dist/latest/fhir/`   
  ```
  5.a. lformsFHIRAll.min.js, or
  5.b. FHIR libs for a particular version:
     R4/lformsFHIR.min.js
     STU3/lformsFHIR.min.js
  ```

