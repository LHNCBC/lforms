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
for (let version of fhirVersions) {
  let entryFile = './app/scripts/fhir/'+version+'/fhirRequire.js';

  let nonMinConfig = commonConfig();
  nonMinConfig.entry = entryFile;
  nonMinConfig.output.filename = './app/scripts/fhir/'+version+'/lformsFHIR.js';
  nonMinConfig.mode = 'none';
  configs.push(nonMinConfig);

  let minConfig = commonConfig();
  minConfig.entry = entryFile;
  let versionedDist = 'lforms-'+require('./bower.json').version;
  minConfig.output.filename = './dist/'+versionedDist+'/fhir/'+version+'/lformsFHIR.min.js',
  minConfig.mode = 'production';
  configs.push(minConfig);
}

// autocomplete-lhc and (eventually) other ES6 code
let es6Config = commonConfig();
es6Config.entry = './app/scripts/index.js';
es6Config.output.filename = './app/generated/scripts/autocomplete-lhc.js';
es6Config.mode = 'none';
configs.push(es6Config);

module.exports = configs;
