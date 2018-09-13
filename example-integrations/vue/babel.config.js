const config = require('./bolt-babel-config')();

module.exports = require('./bolt-babel-config');


module.exports = {
  presets: [
    [
      require('./bolt-babel-config'),
    ]
    // ['@vue/app', {
    //   polyfills: [
    //     'es6.promise',
    //     'es6.symbol'
    //   ]
    // }]
  ]
}