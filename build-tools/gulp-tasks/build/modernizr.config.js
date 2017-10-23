module.exports = {
  // // Avoid unnecessary builds (see Caching section below)
  cache: true,
  //
  // // Path to the build you're using for development.
  // devFile: false,

  // Path to save out the built file
  // dest: 'source/scripts/libs/modernizr.custom.js',

  // Based on default settings on http://modernizr.com/download/
  options: [
    // 'setClasses',
    // 'addTest',
    // 'testProp',
    // 'fnBind',
    'prefixed'
  ],

  crawl: false,
  //
  // // By default, source is uglified before saving
  // uglify: false,
  //
  // // Define any tests you want to explicitly include
  tests: [
    'csstransitions'
  ],
  //
  // // Have custom Modernizr tests? Add them here.
  // customTests: []
};
