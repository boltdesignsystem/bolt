// Thanks to StencilJS (https://stenciljs.com/docs/stencil-config) for a little inspiration for some of these configuration names. Naming things is hard!

module.exports = {
  // Environmental variable / preset to use
  env: 'pl',


  /**
   * The srcDir config specifies the source directory.
   * @param {string} [srcDir=src] - The source directory.
   */
  srcDir: 'src',


  /**
   * The publicPath config sets the client-side base path for all built / asynchronously
   * loaded assets. By default the loader script will automatically figure out the relative
   * path to load your components, but uses publicPath as a fallback. It's recommended to have
   * it start with a `/`.
   *
   * Note: this ONLY sets the base path the browser requests -- it does not set where files
   * are saved during build. To change where files are saved at build time, use the buildDir
   * config.
   *
   * @param {string} [publicPath=/build] - The publicPath directory.
   */
  publicPath: '/build/',


  /**
   * The buildDir config specifies where Bolt's compiled files are saved after every
   * build.These are the generated scripts which will be requested by the browser. The build
   * directory should be relative to the wwwDir setting.
   *
   * @param {string} [buildDir=build] - The buildDir directory.
   */
  buildDir: 'build',


  /**
    * The wwwDir config specifies the public web distribution directory.
    * This directory is commonly the root directory for a server, where all
    * static files can be served. This directory is built and rebuilt directly
    * from the source files.
    *
    * Note: We recommend this directory is not committed to a repository.
    *
    * @param {string} [wwwDir=www] - The wwwDir directory.
    */
  wwwDir: 'www',


//   copy
// The copy config is an array of objects that define any files or folders that you would like to get copied over to your buildDir when a build is performed.Each object in the array must include a src property which can be either an absolute path, a relative path or a glob pattern.You can also provide the optional dest property which can be either an absolute path or a path relative to your buildDir.


  // Where does your PL config.yml live?
  plConfigFile: './config/config.yml',


  /**
   * How 'loud' or 'quiet' do you want the console output to be?
   * @param {int} [verbosity=3] -  Logging level (Range of 0 to 5)
   */
  verbosity: 2, //


  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-action-blocks',
      '@bolt/components-background',
      '@bolt/components-background-shapes',
      '@bolt/components-blockquote',
      '@bolt/components-button',
      '@bolt/components-button-group',
      '@bolt/components-chip',
      '@bolt/components-chip-list',
      '@bolt/components-color-swatch'
      '@bolt/components-figure',
      '@bolt/components-link',
      '@bolt/components-ordered-list',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
      '@bolt/components-teaser',
      '@bolt/components-unordered-list'
    ],
    individual: [

    ],
    // individual: [
    // ],
  },

  // Dev-server specific config settings (ex. port to use)
  devServer: {
    open: true // was: openServerAtStart
  }
};
