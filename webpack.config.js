const TerserPlugin = require('terser-webpack-plugin');
function commonConfig() {
  return {
    output: {
      path: __dirname,
    },
    optimization: {
      minimizer: [
        // Disable the terser cache, which does not detect changes to the
        // webpack configuration (and sometimes keeps old configuration data).
        // In particular, changes to the filename lformsFHIRAll.min.js did not
        // show up in the output sourcemap when the cache was used.  (However,
        // I don't think it should show up at all, but that is separate problem.)
        // Disabling the cache adds 4-5s to 31s build.  Having the cache on
        // resulted in several lost hours debugging a very confusing problem.
        new TerserPlugin({
          cache: false,
          parallel: true,
          sourceMap: true // Must be set to true if using source-maps in production
        }),
      ],
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
  };
}

function makeConfigs(env) {
  // Limit build per env
  let buildBowerDist = !env || env.mainOnly;
  let buildSTU3 = !env || !env.r4Only;
  let buildFHIR = !env || !env.mainOnly;

  const MomentLocalesPlugin = require('moment-locales-webpack-plugin'); // Excludes momentjs locales.
  let configs = [];
  let fhirVersions = Object.keys(require('./app/scripts/fhir/versions'));
  let versionedDist = 'lforms-'+require('./package.json').version;
  let rootDirPath = require('path').resolve(__dirname);
  let versionedDistPath = rootDirPath+'/dist/'+versionedDist;
  let distFhirPath = versionedDistPath+'/fhir';

  // Builds for each FHIR version
  let fhirExternals = {
    '../lforms-index': 'LForms',
    '@lhncbc/ucum-lhc': 'LForms.ucumPkg'
  }
  var allFHIREntryFiles = [];
  if (buildFHIR) {
    for (let version of fhirVersions) {
      if (version !== 'STU3' || buildSTU3) {
        let entryFile = './app/scripts/fhir/'+version+'/fhirRequire.js';
        allFHIREntryFiles.push(entryFile);
        let nonMinConfig = commonConfig();
        nonMinConfig.entry = entryFile;
        nonMinConfig.output.path = rootDirPath+'/app/scripts/fhir/'+version;
        nonMinConfig.output.filename = 'lformsFHIR.js';
        nonMinConfig.mode = 'none';
        nonMinConfig.externals = fhirExternals;
        configs.push(nonMinConfig);

        let minConfig = commonConfig();
        minConfig.entry = entryFile;
        minConfig.output.path = distFhirPath + '/' + version;
        minConfig.output.filename = 'lformsFHIR.min.js';
        minConfig.mode = 'production';
        minConfig.externals = fhirExternals;
        minConfig.devtool = 'source-map';
        configs.push(minConfig);
      }
    }

    // All FHIR versions together
    let allFHIRConfig = commonConfig();
    allFHIRConfig.entry = allFHIREntryFiles;
    // Note: Setting the path as part of output.filename results in problems
    // for the source map file.
    allFHIRConfig.output.path = distFhirPath;
    allFHIRConfig.output.filename = 'lformsFHIRAll.min.js';
    allFHIRConfig.mode = 'production';
    allFHIRConfig.devtool = 'source-map';
    allFHIRConfig.externals = fhirExternals;
    configs.push(allFHIRConfig);
  }

  if (buildBowerDist) {
    // LForms and dependencies
    // The Bower package needs a single, transpiled lforms.js file that does
    // not include other bower packages (angular, etc.)
    let bowerConfig = commonConfig();
    let polyfills = [ // in addition to app/scripts/lib/polyfill.js]
     'promise-polyfill/src/polyfill', // used by whatwg-fetch, and by our own code
     'whatwg-fetch'];
    bowerConfig.entry = [...polyfills, './app/scripts/bower-index.js'];
    bowerConfig.output.path = require('path').resolve(__dirname, './bower-dist');
    bowerConfig.output.filename = 'lforms.js';
    bowerConfig.output.library = 'LForms'; // global variable for the library
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
    lformsConfig.entry = [...polyfills, './app/scripts/index.js'];
    lformsConfig.output.path = versionedDistPath;
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
