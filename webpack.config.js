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

function makeConfigs(env) {

  const MomentLocalesPlugin = require('moment-locales-webpack-plugin'); // Excludes momentjs locales.
  let configs = [];
  let fhirVersions = Object.keys(require('./app/scripts/fhir/versions'));
  let versionedDist = 'lforms-'+require('./package.json').version;

  // Builds for each FHIR version
  let fhirExternals = {
    '@lhncbc/ucum-lhc': 'LForms.ucumPkg'
  }
  var allFHIREntryFiles = [];
  for (let version of fhirVersions) {
    let entryFile = './app/scripts/fhir/'+version+'/fhirRequire.js';
    allFHIREntryFiles.push(entryFile);
    let nonMinConfig = commonConfig();
    nonMinConfig.entry = entryFile;
    nonMinConfig.output.filename = './app/scripts/fhir/'+version+'/lformsFHIR.js';
    nonMinConfig.mode = 'none';
    nonMinConfig.externals = fhirExternals;
    configs.push(nonMinConfig);

    let minConfig = commonConfig();
    minConfig.entry = entryFile;
    minConfig.output.filename = './dist/'+versionedDist+'/fhir/'+version+'/lformsFHIR.min.js',
    minConfig.mode = 'production';
    minConfig.externals = fhirExternals;
    minConfig.devtool = 'source-map';
    configs.push(minConfig);
  }

  // All FHIR versions together
  let allFHIRConfig = commonConfig();
  allFHIRConfig.entry = allFHIREntryFiles;
  allFHIRConfig.output.filename = './dist/'+versionedDist+'/fhir/lformsFHIRAll.min.js',
  allFHIRConfig.mode = 'production';
  allFHIRConfig.devtool = 'source-map';
  allFHIRConfig.externals = fhirExternals;
  configs.push(allFHIRConfig);

  if (!env || !env.fhirOnly) {
    // LForms and dependencies
    // The Bower package needs a single, transpiled lforms.js file that does
    // not include other bower packages (angular, etc.)
    let bowerConfig = commonConfig();
    bowerConfig.entry = ['whatwg-fetch', './app/scripts/bower-index.js']; // includes fetch polyfill
    bowerConfig.output.filename = './bower-dist/lforms.js';
    bowerConfig.output.library = 'LForms';
    bowerConfig.devtool = 'source-map';
    bowerConfig.mode = 'none';
    bowerConfig.externals = {
      'autocomplete-lhc': 'Def', // excludes autocomplete-lhc from build
      'moment': 'moment'
    };
    configs.push(bowerConfig);

    // The browser-ready dist package needs all of the dependencies in a single file
    // (except for the versioned FHIR files).
    let lformsConfig = commonConfig();
    lformsConfig.entry = ['whatwg-fetch', './app/scripts/index.js'];
    lformsConfig.output.path = require('path').resolve(__dirname, 'dist/'+versionedDist);
    lformsConfig.output.filename = 'lforms.min.js';
    lformsConfig.output.library = 'LForms';
    lformsConfig.devtool = 'source-map';
    lformsConfig.mode = 'production';
    //lformsConfig.mode = 'none';
    // For angular-ui-bootstrap, we need to pick up and process the CSS imports
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    lformsConfig.plugins = [
      new MiniCssExtractPlugin({
        filename: "styles/lforms.css"
      }),
      new MomentLocalesPlugin()
    ];
    lformsConfig.module.rules.push({
      test: /\.css$/,
    //  include: /node_modules/,
      use: [
        {
          // This loader creates one CSS file per JS file that contains CSS.
          // Or so the documentation says.  It seems to just create one file.
          loader: MiniCssExtractPlugin.loader,
          options: {
            outputPath: 'styles',
          }
        },
        //'style-loader', // for devlopment only
        'css-loader' // resolves paths for CSS files in require/import
      ]
    });
    lformsConfig.module.rules.push({
      test: /glyphicons.*\.(eot|svg|ttf|woff2?)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'styles/fonts',
          publicPath: 'fonts'
        }
      }]
    });
    lformsConfig.module.rules.push({
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'styles/images',
          publicPath: 'images'
        }
      }]
    });
    configs.push(lformsConfig);
  }

  return configs;
}
module.exports = makeConfigs;
