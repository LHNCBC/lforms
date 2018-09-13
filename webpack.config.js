var path = require('path');
module.exports = {
  node: {
    fs: "empty"
  },
  entry: './app/fhirpath.js',
  mode: 'production',
  output: {
    path: __dirname,
    filename: './app/fhirpathPacked.js',
  }
};
