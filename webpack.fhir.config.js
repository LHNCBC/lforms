const TerserPlugin = require('terser-webpack-plugin');
function commonConfig() {
  return {
    output: {
      path: __dirname,
    },
    cache: false,
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
            sourceMap: true // Must be set to true if using source-maps in production
          },
          parallel: true
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  };
}

function makeConfigs(env) {
  // Limit build per env
  let buildOnly = env?.buildOnly;
  let debugging = env?.debugging;

  let configs = [];
  let fhirVersions = Object.keys(require('./src/fhir/versions'));
  //let versionedDist = 'lforms-'+require('./package.json').version; // no longer versioning during build except when zipping
  let unversionedDist = '@elimuinformatics/lforms';
  let rootDirPath = require('path').resolve(__dirname);
  let unversionedDistPath = rootDirPath+'/dist/'+unversionedDist;
  let distFhirPath = unversionedDistPath+'/fhir';

  // Builds for each FHIR version
  let fhirExternals = {
    '../lforms-index': 'LForms',
    '@lhncbc/ucum-lhc': 'LForms.ucumPkg'
  }
  var allFHIREntryFiles = [];

  for (let version of fhirVersions) {
    // if there is buildOnly parameter, skip this version if it is not the specified version
    if (buildOnly && buildOnly !== version) continue;

    let entryFile = './src/fhir/'+version+'/fhirRequire.js';
    allFHIREntryFiles.push(entryFile);
    let nonMinConfig = commonConfig();
    nonMinConfig.entry = entryFile;
    nonMinConfig.output.path = rootDirPath+'/dist/fhir/'+version;
    nonMinConfig.output.filename = 'lformsFHIR.js';
    nonMinConfig.mode = 'none';
    nonMinConfig.externals = fhirExternals;
    configs.push(nonMinConfig);

    let minConfig = commonConfig();
    minConfig.entry = entryFile;
    minConfig.output.path = distFhirPath + '/' + version;
    minConfig.output.filename = 'lformsFHIR.min.js';
    minConfig.mode = debugging? 'none' : 'production';
    minConfig.externals = fhirExternals;
    minConfig.devtool = 'source-map';
    configs.push(minConfig);
  }

  // All FHIR versions together
  let allFHIRConfig = commonConfig();
  allFHIRConfig.entry = allFHIREntryFiles;
  // Note: Setting the path as part of output.filename results in problems
  // for the source map file.
  allFHIRConfig.output.path = distFhirPath;
  allFHIRConfig.output.filename = 'lformsFHIRAll.min.js';
  allFHIRConfig.mode = debugging? 'none' : 'production';
  if (debugging) {
    allFHIRConfig.output.publicPath = '/lforms/fhir';
    let serverPort = require('./package.json').config.testPortFhir;
    allFHIRConfig.devServer = {
      port: serverPort,
      static: {
        directory: __dirname,
      }
    };
  }
  allFHIRConfig.devtool = 'source-map';
  allFHIRConfig.externals = fhirExternals;
  configs.push(allFHIRConfig);


  return configs;
}
module.exports = makeConfigs;
