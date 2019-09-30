// const penthouse = require('penthouse');
// const fs = require('fs');
// const path = require('path');
// const { getConfig } = require('@bolt/build-utils/config-store');
// let config;

// async function build() {
//   config = config || (await getConfig());

//   penthouse({
//     url: 'http://localhost:3000/',

//     // the original css to extract critcial css from
//     css: path.resolve(process.cwd(), config.wwwDir) + '/build/bolt-global.css',

//     // OPTIONAL params
//     width: 1300, // viewport width
//     height: 900, // viewport height

//     // when true, will not filter out larger media queries
//     keepLargerMediaQueries: true,

//     // selectors to keep
//     forceInclude: [
//       // '.c-bolt-button',
//       // '.c-bolt-button--primary',
//       // '.c-bolt-site__footer',
//       // '.c-bolt-subheadline',
//       // '.c-bolt-subheadline--xxlarge',
//       // '.c-bolt-subheadline--regular'
//       // /^\.regexWorksToo/
//     ],
//     propertiesToRemove: [
//       '(.*)transition(.*)',
//       'cursor',
//       'pointer-events',
//       '(-webkit-)?tap-highlight-color',
//       '(.*)user-select',
//     ],
//     timeout: 30000, // ms; abort critical CSS generation after this timeout
//     pageLoadSkipTimeout: 0, // ms; stop waiting for page load after this timeout (for sites with broken page load event timings)
//     maxEmbeddedBase64Length: 1000, // characters; strip out inline base64 encoded resources larger than this
//     userAgent: 'Penthouse Critical Path CSS Generator', // specify which user agent string when loading the page
//     renderWaitTime: 1000, // ms; render wait timeout before CSS processing starts (default: 100)
//     blockJSRequests: false, // set to false to load (external) JS (default: true)
//     customPageHeaders: {
//       'Accept-Encoding': 'identity', // add if getting compression errors like 'Data corrupted'
//     },
//     strict: false, // set to true to throw on CSS errors
//     screenshots: {
//       // turned off by default
//       // basePath: 'homepage', // absolute or relative; excluding file extension
//       // type: 'jpeg', // jpeg or png, png default
//       // quality: 20 // only applies for jpeg type
//       // -> these settings will produce homepage-before.jpg and homepage-after.jpg
//     },
//     puppeteer: {
//       getBrowser: undefined, // A function that resolves with a puppeteer browser to use instead of launching a new browser session
//     },
//   })
//     .then(criticalCss => {
//       // use the critical css generated

//       fs.writeFileSync(
//         path.resolve(process.cwd(), config.buildDir) +
//           '/bolt-critical-docs.css',
//         criticalCss,
//       );
//     })
//     .catch(err => {
//       console.log(err); // handle any errors thrown
//     });
// }

// module.exports = {
//   build,
// };
