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
  minConfig.output.filename = './dist/latest/fhir/'+version+'/lformsFHIR.min.js',
  minConfig.mode = 'production';
  configs.push(minConfig);
}

module.exports = configs;
