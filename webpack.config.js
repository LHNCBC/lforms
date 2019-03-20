function commonConfig() {
  return {
    node: {
      fs: "empty"
    },
    output: {
      path: __dirname,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env',
                {
                  "targets": {
                    "browsers": "ie >= 10"
                  }
                }
              ]]
            }
          }
        }
      ]
    }
  }
}

let configs = [];
let fhirVersions = Object.keys(require('./app/scripts/fhir/versions'));
let versionedDist = 'lforms-'+require('./bower.json').version;
for (let version of fhirVersions) {
  let entryFile = './app/scripts/fhir/'+version+'/fhirRequire.js';

  let nonMinConfig = commonConfig();
  nonMinConfig.entry = entryFile;
  nonMinConfig.output.filename = './app/scripts/fhir/'+version+'/lformsFHIR.js';
  nonMinConfig.mode = 'none';
  configs.push(nonMinConfig);

  let minConfig = commonConfig();
  minConfig.entry = entryFile;
  minConfig.output.filename = './dist/'+versionedDist+'/fhir/'+version+'/lformsFHIR.min.js',
  minConfig.mode = 'production';
  configs.push(minConfig);
}

// LForms and dependencies
// The Bower package needs a single, transpiled lforms.js file that does
// not include other bower packages (angular, etc.)
// (It should include autocomplete-lhc, which is now an npm package.)
let bowerConfig = commonConfig();
bowerConfig.entry = './app/scripts/bower-index.js';
bowerConfig.output.filename = './bower-dist/lforms.js';
bowerConfig.output.library = 'LForms';
bowerConfig.devtool = 'source-map';
bowerConfig.mode = 'none';
configs.push(bowerConfig);

// The browser-ready dist package needs all of the dependencies in a single file
// (except for the versioned FHIR files).
let lformsConfig = commonConfig();
lformsConfig.entry = './app/scripts/index.js';
lformsConfig.output.filename = './.tmp/lforms.js';
lformsConfig.output.library = 'LForms';
// lformsConfig.devtool = 'source-map';
lformsConfig.mode = 'none'; // final output generated later by uglify-js
//lformsConfig.mode = 'production';
// For angular-ui-bootstrap, we need to pick up and process the CSS imports
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
lformsConfig.plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: ".tmp/styles/[name].css",
    chunkFilename: ".tmp/styles/[id].css"
  })
];
lformsConfig.module.rules.push({
  test: /\.css$/,
  include: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    //'style-loader', // for devlopment only
    'css-loader'
  ]
});

configs.push(lformsConfig);

module.exports = configs;
