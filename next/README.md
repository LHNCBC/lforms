# WebComponents

This project generates a web component of the new LForms widget.


## Dev Env setup (Temporarily when the lforms and the this 'next' version co-exist in the same project)
* Build FHIR libs in the current lforms project:
1. Check out the 'next' branch (or the branch you are working on) from git repository
1. `source bashrc.lforms` (make sure node dir is availabel at ~/)    
1. `npm ci`
1. `bower install` (You may need to run `source bashrc.lforms` again.)
1. `npm run build` (The FHIR libs are located in `dist/latest/fhir/lformsFHIRAll.min.js`)
* In the 'next' lforms project:
1. `cd next`
1. `source bashrc.next`
1. `npm ci`
1. `npm run copy-fhir-lib` (This copies the FHIR libraries from the current lforms to this project.)

## Development server

1. Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. 
   The app will automatically reload if you change any of the source files.

1. Run `npm run start-public` if you need to access to the dev server from a different machine. 
   For example, to run Narrator from a Windows PC.

## Build

1. Run `npm run build` to build the project and generate a production version of the js files, 
   which are much smaller than the development version. It generates two versions of the js files: 
   ES5 version and ES2015 vresion. The `/dist` directory is deleted and recreated during the process. 
   It also concatenates all ES5 js files of the web component into a single `lhc-forms.es5.js` file 
   and all ES2015 files into `lhc-forms.es2015.js` (along with a `styles.css` file) in the 
   `/dist/webcomponent` directory, which are used in e2e tests and can be distributed to use 
   in other projects. A copy of the individual built files and their source map files are also 
   included in `/dist/webcomponent`. `zone.min.js` is not included in the built file, 
   and a copy is put in `/dist/webcomponent/assets/bin`.

1. Run `npm run build:dev` to build the project and generate a development version of the js files. 
   The build artifacts will be stored in the `/dist` directory. The `/dist` directory is deleted and 
   recreated during the process.

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

## Use the Web Component 
* For Angular projects (to avoid including another copy of zone.js)
  * Load the following files from `/dist/webcomponent`
  ```
  1. styles.css
  2. scripts.js  
  3.a lhc-forms.[es5|es2015].js, or
  3.b the indidiviual files:
     bruntime-[es5|es2015].js
     polyfills-[es5|es2015].js
     main-[es5|es2015].js 
  4. ../dist/latest/fhir/lformsFHIRAll.min.js'
  ```
* For non-Angular JavaScript projects, including React, Vue projects, a copy of zone.min.js is required to 
  be loaded before loading above js files. A copy of zone.min.js is in `/dist/webcomponent/assets/bin/zone.min.js`.
  * Load the following files from `/dist/webcomponent`
  ```
  1. styles.css
  2. scripts.js  
  3. zone.min.js
  4.a lhc-forms.[es5|es2015].js, or
  4.b the indidiviual files:
     bruntime-[es5|es2015].js
     polyfills-[es5|es2015].js
     main-[es5|es2015].js 
  5. ../dist/latest/fhir/lformsFHIRAll.min.js'
  ```

