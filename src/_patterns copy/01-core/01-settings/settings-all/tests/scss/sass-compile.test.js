const test = require('tape');
const sass = require('node-sass');

test('sass:compile', (t) => {
  sass.render({
    file: 'tests/scss/test.scss',
    importer: require('npm-sass').importer
  }, (err, result) => {
    t.error(err, 'Each unique Sass partial should compile by itself without errors');
    t.end();
  });
});
