const chromePaths = require('chrome-paths');
const path = require('path');
const walk = require('./walk-dir');

const patternPath = path.resolve(process.cwd(), 'www/pattern-lab/patterns/');


/**
 * Scan for page and template patterns.
 */
const files = walk(patternPath).filter(function(f) {
  // Only *.html
  return (
    f.match(/\.html$/) &&
    // Not index.html/markup-only.html
    !f.match(/(\/index|markup-only)\.html$/) &&
    // Only templates and pages.
    // f.match(/\/(02-components|04-pages)/)
    f.match(/\/(02-components)/) &&
    !f.match(/-docs.html$/)
    //  &&
    // Not the readme (has version #)
    // !f.match(/05-pages-readme2.html$/)
  );
});

/**
 * Map discovered HTML files to Backstop scenarios.
 */
var scenarios = files.map(function(file) {
  return {
    label: path.basename(file, '.html'),
    url: `https://bolt-design-system.com/pattern-lab/patterns/${path.relative(
      patternPath,
      file,
    )}`,
    misMatchThreshold: 0.1,
    // .replace('05-pages-', 'page-')
    // .replace('04-templates-', 'template-'),
  };
});

const config = {
  id: 'regression',
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 568,
    },
    // {
    //   label: 'tablet-portrait',
    //   width: 768,
    //   height: 1024,
    // },
    // {
    //   label: 'tablet-landscape',
    //   width: 1024,
    //   height: 768,
    // },
    {
      label: 'laptop',
      width: 1440,
      height: 900,
    },
    {
      label: 'desktop',
      width: 1920,
      height: 1080,
    },
  ],
  onBeforeScript: 'onBefore.js',
  onReadyScript: 'onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: `${__dirname}/reference`,
    bitmaps_test: `${__dirname}/runs`,
    engine_scripts: `${__dirname}/scripts`,
    html_report: `${__dirname}/reports/html`,
    ci_report: `${__dirname}/reports/ci`,
  },
  report: ['browser', 'CI'],
  engine: 'puppeteer',
  engineFlags: [],
  engineOptions: {
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  asyncCaptureLimit: 10,
  asyncCompareLimit: 10,
  debug: false,
  debugWindow: false,
};

// Add local path to Chrome if it exists. Workaround to Puppeteer lacking codecs available to locally installed versions of Chrome: https://github.com/GoogleChrome/puppeteer/issues/291
if (chromePaths.chrome) {
  config.engineOptions.executablePath = chromePaths.chrome;
}

console.log(config);

module.exports = config;
