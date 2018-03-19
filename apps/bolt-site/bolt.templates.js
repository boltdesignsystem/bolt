// These templates are used by server side renderers to show an initial version
// of the components provided by this library.
const path = require('path');

// console.log(process.cwd());

// const button = require.resolve(path.resolve(__dirname, ''));
// console.log(button);


module.exports = {
  'bolt-button': require('../../packages/components/bolt-button/src/button.template.twig')
  /* generator-placeholder */
};
