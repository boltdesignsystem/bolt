// const boltData = require('./utils/sass-get-data')({
//   path: path.resolve(process.cwd(), config.dataDir),
// });

const convertStringToSassUnit = require('./string-to-sass-unit');
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);

module.exports = (sassVars) => {
  // const args = '($file, $value, $options:())';


  function boltData(keys) {
    keys = keys.getValue().split('.');
    var result = sassVars;
    var i;
    for (i = 0; i < keys.length; i++) {
      result = result[keys[i]];
      // Convert to SassDimension if dimenssion
      if (typeof result === 'string') {
        result = convertStringToSassUnit(result);
      } else if (typeof result === 'object') {
        Object.keys(result).forEach((key) => {
          var value = result[key];
          result[key] = convertStringToSassUnit(value);
        });
      }
    }
    result = sassUtils.castToSass(result);
    return result;
  };

  return boltData;


};



// 'bolt-data($keys)': function (keys) {
//   +keys = keys.getValue().split('.'); +
//   var result = sassVars; +
//   var i; +
//   for (i = 0; i < keys.length; i++) {
//     +result = result[keys[i]]; + // Convert to SassDimension if dimenssion
//     +
//     if (typeof result === 'string') {
//       +result = convertStringToSassDimension(result); +
//     } else if (typeof result === 'object') {
//       +Object.keys(result).forEach((key) => {
//         +
//         var value = result[key]; +
//         result[key] = convertStringToSassDimension(value); +
//       }); +
//     } +
//   } +
//   result = sassUtils.castToSass(result); +
//   return result; +
// },