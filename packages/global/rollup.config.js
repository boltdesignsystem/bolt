import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import npmSass from 'npm-sass';
import yaml from 'rollup-plugin-yaml';
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import deepmerge from 'deepmerge';
import fs from 'fs';
import html from '@rollup/plugin-html';

// import { gzip } from 'node-zopfli';
// import gzipPlugin from 'rollup-plugin-gzip';
import postcss from 'postcss';
// import compiler from '@ampproject/rollup-plugin-closure-compiler';
import sassExportData from '@bolt/sass-export-data';

const nodeSass = require('node-sass');

const themify = require('@bolt/postcss-themify');

// NOTE: this value must be defined outside of the plugin because it needs
// to persist from build to build (e.g. the module and nomodule builds).
// If, in the future, the build process were to extends beyond just this rollup
// config, then the manifest would have to be initialized from a file, but
// since everything  is currently being built here, it's OK to just initialize
// it as an empty object object when the build starts.
const manifest = {};

/**
 * A Rollup plugin to generate a manifest of chunk names to their filenames
 * (including their content hash). This manifest is then used by the template
 * to point to the currect URL.
 * @return {Object}
 */
function manifestPlugin() {
  return {
    name: 'manifest',
    generateBundle(options, bundle) {
      for (const [name, assetInfo] of Object.entries(bundle)) {
        manifest[assetInfo.name] = name;
      }

      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}

/**
 * A Rollup plugin to generate a list of import dependencies for each entry
 * point in the module graph. This is then used by the template to generate
 * the necessary `<link rel="modulepreload">` tags.
 * @return {Object}
 */
function modulepreloadPlugin() {
  return {
    name: 'modulepreload',
    generateBundle(options, bundle) {
      // A mapping of entry chunk names to their full dependency list.
      const modulepreloadMap = {};

      // Loop through all the chunks to detect entries.
      for (const [fileName, chunkInfo] of Object.entries(bundle)) {
        if (chunkInfo.isEntry || chunkInfo.isDynamicEntry) {
          modulepreloadMap[chunkInfo.name] = [fileName, ...chunkInfo.imports];
        }
      }

      this.emitFile({
        type: 'asset',
        fileName: 'modulepreload.json',
        source: JSON.stringify(modulepreloadMap, null, 2),
      });
    },
  };
}

// console.log(npmSass);
// const sassExportData = require('@bolt/sass-export-data')({
//   path: path.resolve(process.cwd(), 'dist'),
// });

let themifyOptions = {
  // watchForChanges: config.watch && config.mode !== 'server',
  classPrefix: 't-bolt-',
  screwIE11: false,
  fallback: {
    filename: 'bolt-css-vars-fallback',
    jsonDataExport: 'theming-css-vars',
  },
};

const { extname } = require('path');

const getFiles = bundle => {
  const files = Object.values(bundle).filter(
    file => file.isEntry || file.type === 'asset' || file.isAsset,
  );
  const result = {};
  for (const file of files) {
    const { fileName } = file;
    const extension = extname(fileName).substring(1);
    result[extension] = (result[extension] || []).concat(file);
  }

  return result;
};

const makeHtmlAttributes = attributes => {
  if (!attributes) {
    return '';
  }

  const keys = Object.keys(attributes);
  // eslint-disable-next-line no-param-reassign
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    '',
  );
};

const themifyConfig = deepmerge(themifyOptions, {
  fallback: {
    jsonPath: path.resolve(process.cwd(), `dist/theming-css-vars.json`),
    cssPath: path.resolve(`dist/${themifyOptions.fallback.filename}.css`),
  },
});

let globalSassData = [
  `$bolt-namespace: "bolt";`,
  `$bolt-css-vars-json-data-export: "theming-css-vars";`,
  `$bolt-lang: "en"}`,
];

export default {
  input: ['styles/index.scss'],
  output: {
    file: 'bolt-global.css',
    // file: 'build/bolt-components-video.min.mjs',
    format: 'esm',
    sourcemap: false,
  },
  output: {
    dir: 'dist',
    format: 'esm',
    // entryFileNames: '[name]-[hash].mjs',
    // chunkFileNames: '[name]-[hash].mjs',
    // dynamicImportFunction: '__import__',
  },
  // manualChunks(id) {
  //   if (id.includes('node_modules')) {
  //     // The directory name following the last `node_modules`.
  //     // Usually this is the package, but it could also be the scope.
  //     const directories = id.split(path.sep);
  //     const name = directories[directories.lastIndexOf('node_modules') + 1];

  //     // Group react dependencies into a common "react" chunk.
  //     // NOTE: This isn't strictly necessary for this app, but it's included
  //     // as an example to show how to manually group common dependencies.
  //     // if (name.match(/^react/) || ['prop-types', 'scheduler'].includes(name)) {
  //     if (name.includes('lit-html')) {
  //       return 'lit-html';
  //     }

  //     // Group `tslib` and `dynamic-import-polyfill` into the default bundle.
  //     // NOTE: This isn't strictly necessary for this app, but it's included
  //     // to show how to manually keep deps in the default chunk.
  //     // if (name === 'tslib' || name === 'dynamic-import-polyfill') {
  //     //   return;
  //     // }

  //     // Otherwise just return the name.
  //     return name;
  //   }
  // },
  plugins: [
    // html({
    //   template: ({ attributes, bundle, files, publicPath, title }) => {
    //     const scripts = (files.mjs || [])
    //       .map(({ fileName }) => {
    //         // const attrs = makeHtmlAttributes(attributes.script);
    //         return `
    //         <script type="module">
    //           import './${publicPath}${fileName}';

    //           // const title = 'Hello owc World!';
    //           // render(
    //           //   html\`
    //           //     <bolt-button>
    //           //       ${title}
    //           //     </bolt-button>
    //           //   \`,
    //           //   document.querySelector('#demo')
    //           // );
    //         </script>`;
    //       })
    //       .join('\n');

    //     const links = (files.css || [])
    //       .map(({ fileName }) => {
    //         const attrs = makeHtmlAttributes(attributes.link);
    //         return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    //       })
    //       .join('\n');

    //     return `<!DOCTYPE html>
    //       <html>
    //         <head>
    //           <meta charset="utf-8" />
    //           <title>${title}</title>
    //           ${links}

    //           <style>
    //             body {
    //               background: #fafafa;
    //             }
    //           </style>
    //         </head>
    //         <body>
    //           <bolt-button>
    //             Hello World!
    //           </bolt-button>
    //           ${scripts}
    //         </body>
    //       </html>`;
    //   },
    //   fileName: 'index.html',
    // }),
    // resolve(),
    // commonjs(),
    // resolve({
    //   browser: true,
    //   jsnext: true,
    // //   // main: true,
    // }),
    // resolve(),
    // yaml(),
    sass({
      // output: true,
      // output(styles, styleNodes) {
      //   return false;
      //   // writeFileSync('bundle.css', styles);
      // },
      options: {
        sourceMap: false,
        importer: npmSass.importer,
        functions: sassExportData({
          path: path.resolve(process.cwd(), 'dist'),
        }),
        // data: globalSassData.join('\n'),
      },
      // precision: 3,
      // data:
      // outputStyle: 'nested',
      // importer: [npmSass.importer],
      // functions: sassExportData,
      // data: globalSassData.join('\n'),
      runtime: nodeSass,
      processor: css =>
        postcss([
          themify(themifyConfig),
          // postcssDiscardDuplicates,
          require('cssnano')({
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                mergeLonghand: false, // don't merge longhand values -- required for CSS Vars theming, etc.
                zindex: false, // don't alter `z-index` values
                mergeRules: false, // this MUST be disabled - otherwise certain selectors (ex. ::slotted(*), which IE 11 can't parse) break
              },
            ],
          }),
          autoprefixer({
            grid: true,
          }),
        ])
          .process(css)
          .then(result => {
            fs.writeFileSync('dist/bolt-global.css', result.css);
            return result.css;
          }),
    }),
    // babel({
    //   // exclude: 'node_modules/**',
    //   // externalHelpers: false,
    //   // runtimeHelpers: true,
    //   // presets: [['../../config-presets/babel-preset-bolt/index.js']],
    //   presets: [
    //     [
    //       '@babel/preset-env',
    //       {
    //         ignoreBrowserslistConfig: true,
    //         modules: false,
    //         debug: false,
    //         corejs: 3,
    //         useBuiltIns: 'entry',
    //         targets: {
    //           browsers: require('@bolt/browserslist-config/modern.js'),
    //         },
    //       },
    //     ],
    //   ],
    //   plugins: [
    //     '@babel/plugin-proposal-optional-chaining',
    //     [
    //       '@babel/plugin-proposal-decorators',
    //       {
    //         decoratorsBeforeExport: true,
    //       },
    //     ],
    //     ['@babel/plugin-proposal-class-properties', { loose: true }],
    //     '@babel/plugin-syntax-jsx' /* [1] */,
    //     [
    //       '@babel/plugin-transform-react-jsx' /* [1] */,
    //       {
    //         pragma: 'h',
    //         pragmaFrag: 'Fragment',
    //         throwIfNamespace: false,
    //         useBuiltIns: false,
    //       },
    //     ],
    //   ],
    // }),
    // commonjs(),
    // manifestPlugin(),
    // terser(),
    // modulepreloadPlugin(),
    // postcss({
    //   sourceMap: false,
    //   // plugins: [

    //   // ],
    //   use: ['sass'],
    //   inject: true,
    //   minimize: true,
    //   extensions: ['.css', '.sss', '.pcss', '.scss'],
    // }),
    // gzipPlugin({
    //   customCompression: content => gzip(Buffer.from(content)),
    // }),
    // compiler(),
    // commonjs({
    //   // non-CommonJS modules will be ignored, but you can also
    //   // specifically include/exclude files
    //   include: 'node_modules/**',  // Default: undefined
    //   exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
    //   // these values can also be regular expressions
    //   // include: /node_modules/

    //   // search for files other than .js files (must already
    //   // be transpiled by a previous plugin!)
    //   extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

    //   // if true then uses of `global` won't be dealt with by this plugin
    //   ignoreGlobal: false,  // Default: false

    //   // if false then skip sourceMap generation for CommonJS modules
    //   sourceMap: false,  // Default: true

    //   // explicitly specify unresolvable named exports
    //   // (see below for more details)
    //   namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined

    //   // sometimes you have to leave require statements
    //   // unconverted. Pass an array containing the IDs
    //   // or a `id => boolean` function. Only use this
    //   // option if you know what you're doing!
    //   ignore: [ 'conditional-runtime-dependency' ],
    // })
  ],
};
