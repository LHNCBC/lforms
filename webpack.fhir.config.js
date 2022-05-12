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
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env',
                {
                  "targets": {
                    "browsers": "ie >= 11"
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
  let buildSTU3 = !env || !env.r4Only;
  let buildFHIR = !env || !env.mainOnly;
  let debugging = env?.debugging

  let configs = [];
  let fhirVersions = Object.keys(require('./src/fhir/versions'));
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
        let entryFile = './src/fhir/'+version+'/fhirRequire.js';
        allFHIREntryFiles.push(entryFile);
        let nonMinConfig = commonConfig();
        nonMinConfig.entry = entryFile;
        nonMinConfig.output.path = rootDirPath+'/src/fhir/'+version;
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
    }

    // All FHIR versions together
    let allFHIRConfig = commonConfig();
    allFHIRConfig.entry = allFHIREntryFiles;
    // Note: Setting the path as part of output.filename results in problems
    // for the source map file.
    allFHIRConfig.output.path = distFhirPath;
    allFHIRConfig.output.filename = 'lformsFHIRAll.min.js';
    allFHIRConfig.mode = debugging? 'none' : 'production';
    allFHIRConfig.devtool = 'source-map';
    allFHIRConfig.externals = fhirExternals;
    configs.push(allFHIRConfig);
  }

  return configs;
}
module.exports = makeConfigs;
