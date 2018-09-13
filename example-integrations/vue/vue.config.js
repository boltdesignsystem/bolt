const globImporter = require('node-sass-glob-importer');
const npmSass = require('npm-sass');
const path = require('path');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const deepmerge = require('deepmerge');
const autoprefixer = require('autoprefixer');

const sassExportData = require('@bolt/sass-export-data')({
  path: path.resolve(process.cwd(), 'dist'),
});

const sassLoaderOptions = {
  sourceMap: true,
  importer: [globImporter(), npmSass.importer],
  functions: sassExportData,
  precision: 3,
  data: [
    "$bolt-lang: 'en';",
    "$bolt-css-vars-json-data-export: 'theming-css-vars';",
  ].join('\n'),
};

console.log(process.env);

let themifyOptions = {
  // watchForChanges: config.prod ? false : true,
  classPrefix: 't-bolt-',
  screwIE11: false,
  fallback: {
    filename: 'bolt-css-vars-fallback',
    jsonDataExport: 'theming-css-vars',
  },
};

themifyOptions = deepmerge(themifyOptions, {
  fallback: {
    jsonPath: path.resolve(
      process.cwd(),
      'dist',
      `${themifyOptions.fallback.jsonDataExport}.json`,
    ),
    cssPath: path.resolve(
      process.cwd(),
      'dist',
      `${themifyOptions.fallback.filename}.css`,
    ),
  },
});

module.exports = {
  transpileDependencies: [
    // can be string or regex
    '@bolt/components-*/*.js',
    /@bolt/,
  ],
  chainWebpack: config => {
    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //  .issuer(/button\.standalone\.js$/)
    //   .use('css-loader')
    //   .loader('css-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //  .issuer(/button\.standalone\.js$/)
    //   .use('postcss-loader')
    //   .loader('postcss-loader')
    //   .tap(() => {
    //     return {
    //       sourceMap: true,
    //       plugins: () => [
    //         require('../../packages/build-tools/plugins/postcss-themify')(themifyOptions),
    //         postcssDiscardDuplicates,
    //         autoprefixer({
    //           browsers: require('@bolt/config-browserlist'),
    //           grid: true,
    //         }),
    //       ],
    //     };
    //   });

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .issuer(/button\.standalone\.js$/)
    //   .use('clean-css-loader')
    //   .loader('clean-css-loader')
    //   .tap(() => {
    //     return {
    //       // level: config.prod ? 2 : 0,
    //       level: 0,
    //       // format: config.prod ? false : 'beautify',
    //       inline: ['remote'],
    //       format: 'beautify',
    //     };
    //   });

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .issuer(/button\.standalone\.js$/)
    //   .use('resolve-url-loader')
    //   .loader('resolve-url-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //  .issuer(/button\.standalone\.js$/)
    //   .use('sass-loader')
    //   .loader('sass-loader')
    //   .tap(() => {
    //     return sassLoaderOptions;
    //   });



    //   config.module
    //   .rule('scss')
    //   .oneOf('')
    //  .issuer(/button\.standalone\.js$/)
    //   .use('css-loader')
    //   .loader('css-loader');

    // config.module
    //   .rule('scss')
    //   .oneOf('')
    //  .issuer(/button\.standalone\.js$/)
    //   .use('postcss-loader')
    //   .loader('postcss-loader')
    //   .tap(() => {
    //     return {
    //       sourceMap: true,
    //       plugins: () => [
    //         require('../../packages/build-tools/plugins/postcss-themify')(themifyOptions),
    //         postcssDiscardDuplicates,
    //         autoprefixer({
    //           browsers: require('@bolt/config-browserlist'),
    //           grid: true,
    //         }),
    //       ],
    //     };
    //   });

    // config.module
    //   .rule('scss')
    //   .oneOf('')
    //  .issuer(/button\.standalone\.js$/)
    //   .use('clean-css-loader')
    //   .loader('clean-css-loader')
    //   .tap(() => {
    //     return {
    //       // level: config.prod ? 2 : 0,
    //       level: 0,
    //       // format: config.prod ? false : 'beautify',
    //       inline: ['remote'],
    //       format: 'beautify',
    //     };
    //   });

    // config.module
    //   .rule('scss')
    //   .oneOf('')
    //  .issuer(/button\.standalone\.js$/)
    //   .use('resolve-url-loader')
    //   .loader('resolve-url-loader');

    // config.module
    //   .rule('scss')
    //   .oneOf('')
    //  .issuer(/button\.standalone\.js$/)
    //   .use('sass-loader')
    //   .loader('sass-loader')
    //   .tap(() => {
    //     return sassLoaderOptions;
    //   });



    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('style-loader')
    //   .loader('style-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('css-loader')
    //   .loader('css-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('postcss-loader')
    //   .loader('postcss-loader')
    //   .tap(() => {
    //     return {
    //       sourceMap: true,
    //       plugins: () => [
    //         require('../../packages/build-tools/plugins/postcss-themify')(themifyOptions),
    //         postcssDiscardDuplicates,
    //         autoprefixer({
    //           browsers: require('@bolt/config-browserlist'),
    //           grid: true,
    //         }),
    //       ],
    //     };
    //   });

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('clean-css-loader')
    //   .loader('clean-css-loader')
    //   .tap(() => {
    //     return {
    //       // level: config.prod ? 2 : 0,
    //       level: 0,
    //       // format: config.prod ? false : 'beautify',
    //       inline: ['remote'],
    //       format: 'beautify',
    //     };
    //   });

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('resolve-url-loader')
    //   .loader('resolve-url-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('sass-loader')
    //   .loader('sass-loader')
    //   .tap(() => {
    //     return sassLoaderOptions;
    //   });

      // config.module.rule('scss').oneOf('normal').use('sass-loader').loader('sass-loader').tap(() => {
      //   return sassLoaderOptions;
      // });

      // config.module.rule('scss').oneOf('normal-modules').use('sass-loader').loader('sass-loader').tap(() => {
      //   return sassLoaderOptions;
      // });

      // config.module.rule('scss').oneOf('vue').use('sass-loader').loader('sass-loader').tap(() => {
      //   return sassLoaderOptions;
      // });

      // config.module.rule('scss').oneOf('vue-modules').use('sass-loader').loader('sass-loader').tap(() => {
      //   return sassLoaderOptions;
      // });



    //   config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('css-loader')
    //   .loader('css-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('postcss-loader')
    //   .loader('postcss-loader')
    //   .tap(() => {
    //     return {
    //       sourceMap: true,
    //       plugins: () => [
    //         require('../../packages/build-tools/plugins/postcss-themify')(themifyOptions),
    //         postcssDiscardDuplicates,
    //         autoprefixer({
    //           browsers: require('@bolt/config-browserlist'),
    //           grid: true,
    //         }),
    //       ],
    //     };
    //   });

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('clean-css-loader')
    //   .loader('clean-css-loader')
    //   .tap(() => {
    //     return {
    //       // level: config.prod ? 2 : 0,
    //       level: 0,
    //       // format: config.prod ? false : 'beautify',
    //       inline: ['remote'],
    //       format: 'beautify',
    //     };
    //   });

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('resolve-url-loader')
    //   .loader('resolve-url-loader');

    // config.module
    //   .rule('')
    //   .test(/\.scss$/)
    //   .oneOf('')
    //   .use('sass-loader')
    //   .loader('sass-loader')
    //   .tap(() => {
    //     return sassLoaderOptions;
    //   });



      // config.module.rule('scss').use('sass-loader').loader('sass-loader').loader('sass-loader').tap(() => {
      //   return sassLoaderOptions;
      // });
  }
};

// {
//   loader: 'css-loader',
//   options: {
//     sourceMap: true,
//     modules: false, // needed for JS referencing classNames directly, such as critical fonts
//   },
// },
// {
//   loader: 'postcss-loader',
//   options: {
//     sourceMap: true,
//     plugins: () => [
//       require('@bolt/postcss-themify')(themifyOptions),
//       postcssDiscardDuplicates,
//       autoprefixer({
//         browsers: require('@bolt/config-browserlist'),
//         grid: true,
//       }),
//     ],
//   },
// },
// {
//   loader: 'clean-css-loader',
//   options: {
//     level: config.prod ? 2 : 0,
//     format: config.prod ? false : 'beautify',
//     inline: ['remote'],
//     format: 'beautify',
//   },
// },
// {
//   loader: 'resolve-url-loader',
// },

// // @todo: conditionally toggle sass-loader vs fast-sass-loader based on --debug flag when sourcemaps are needed
// {
//   loader: 'sass-loader',
//   options: {
//     sourceMap: true,
//     importer: [globImporter(), npmSass.importer],
//     functions: sassExportData,
//     precision: 3,
//     data: globalSassData.join('\n'),
//   },
// },
