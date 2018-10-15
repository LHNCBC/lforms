module.exports = [{
  node: {
    fs: "empty"
  },
  entry:{
    fhirpath: './app/scripts/fhir/STU3/fhirRequire.js',
  },

  mode: 'none',
  output: {
    path: __dirname,
    filename: './app/scripts/fhir/STU3/lformsFHIR.js',
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
}, {
  node: {
    fs: "empty"
  },
  entry:{
    fhirpath: './app/scripts/fhir/STU3/fhirRequire.js',
  },

  mode: 'production',
  output: {
    path: __dirname,
    filename: './dist/latest/fhir/STU3/lformsFHIR.min.js',
  }
}];
