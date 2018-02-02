const penthouse = require('penthouse');
const fs = require('fs');

penthouse({
  url: 'http://localhost:3002//patterns/04-pages-d8-product-landing-d8-product-t3/04-pages-d8-product-landing-d8-product-t3.html',       // can also use file:/// protocol for local files
  // cssString: 'body { color; red }', // the original css to extract critcial css from
  css: process.cwd() + '/dist/styles/bolt.css',      // path to original css file on disk

  // OPTIONAL params
  width: 1300,                    // viewport width
  height: 900,                    // viewport height
  keepLargerMediaQueries: true,  // when true, will not filter out larger media queries
  forceInclude: [ // selectors to keep
    '.c-bolt-button',
    '.c-bolt-button--primary',
    '.c-bolt-site__footer',
    '.c-bolt-subheadline',
    '.c-bolt-subheadline--xxlarge',
    '.c-bolt-subheadline--regular'
    // /^\.regexWorksToo/
  ],
  propertiesToRemove: [
    '(.*)transition(.*)',
    'cursor',
    'pointer-events',
    '(-webkit-)?tap-highlight-color',
    '(.*)user-select'
  ],
  timeout: 30000,                 // ms; abort critical CSS generation after this timeout
  pageLoadSkipTimeout: 0,         // ms; stop waiting for page load after this timeout (for sites with broken page load event timings)
  maxEmbeddedBase64Length: 1000,  // characters; strip out inline base64 encoded resources larger than this
  userAgent: 'Penthouse Critical Path CSS Generator', // specify which user agent string when loading the page
  renderWaitTime: 100,            // ms; render wait timeout before CSS processing starts (default: 100)
  blockJSRequests: false,          // set to false to load (external) JS (default: true)
  customPageHeaders: {
    'Accept-Encoding': 'identity' // add if getting compression errors like 'Data corrupted'
  },
  strict: false,                  // set to true to throw on CSS errors
  screenshots: {
    // turned off by default
    // basePath: 'homepage', // absolute or relative; excluding file extension
    // type: 'jpeg', // jpeg or png, png default
    // quality: 20 // only applies for jpeg type
    // -> these settings will produce homepage-before.jpg and homepage-after.jpg
  },
  puppeteer: {
    getBrowser: undefined,        // A function that resolves with a puppeteer browser to use instead of launching a new browser session
  }
})
  .then(criticalCss => {
    // use the critical css

    // apartment(criticalCss, { selectors: [
    //   '.c-mega-nav__level-3'
    // ] })

    fs.writeFileSync(process.cwd() + '/dist/styles/bolt-critical.css', criticalCss);
  })
  .catch(err => {
    console.log(err);
    // handle the error
  });