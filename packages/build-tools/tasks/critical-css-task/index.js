const penthouse = require('penthouse');
const path = require('path');
const globby = require('globby');
const fs = require('fs');
const { getConfig } = require('../../utils/config-store');
const { createDocument, serializeDocument } = require('./dom');
const localChrome = require('local-chrome');
const chalk = require('chalk');
const puppeteer = require('puppeteer-core');
// const fs.readFileSync = promisify(fs.fs.readFileSync);
// const fs.writeFileSync = promisify(fs.fs.writeFileSync);

let config;

process.setMaxListeners(0); // silence the (node:37382) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 SIGTERM listeners added. Use emitter.setMaxListeners() to increase limit warning per https://github.com/addyosmani/critical/issues/121

async function runPenthouse(url, sheet) {
  config = config || (await getConfig());

  if (localChrome) {
    const browserPromise = puppeteer.launch({
      executablePath: localChrome,
      ignoreHTTPSErrors: true,
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      // not required to specify here, but saves Penthouse some work if you will
      // re-use the same viewport for most penthouse calls.
      defaultViewport: {
        width: 1440,
        height: 1440,
      },
    });

    const criticalCSS = await penthouse({
      url,
      cssString: sheet,
      width: 1440,
      height: 1440,
      keepLargerMediaQueries: true,
      forceInclude: config.criticalCss.forceInclude || [],
      propertiesToRemove: config.criticalCss.propertiesToRemove || [],
      timeout: 30000,
      pageLoadSkipTimeout: 0,
      maxEmbeddedBase64Length: 1000,
      userAgent: 'Penthouse Critical Path CSS Generator',
      renderWaitTime: 2000,
      blockJSRequests: true,
      strict: false,
      puppeteer: {
        executablePath: localChrome,
        getBrowser: () => browserPromise
      }
    })
      .then(criticalCss => {
        return criticalCss;
      })
      .catch(err => {
        console.log(err); // handle any errors thrown
      });
    return criticalCSS;
  } else {
    console.log(chalk.red('Warning! Google Chrome not downloaded... abort generating Critical CSS!'));
  }
}

/**
 * Inline the target stylesheet referred to by a <link rel="stylesheet"> (assuming it passes `options.filter`)
 */
async function getStylesheets(link, wwwDir) {
  const href = link.getAttribute('href');
  // const media = link.getAttribute('media');
  // const document = link.ownerDocument;

  // skip filtered resources, or network resources if no filter is provided
  if (href.match(/^(https?:)?\/\//)) return Promise.resolve();

  // path on disk
  const filename = path.resolve(wwwDir, href.replace(/^\//, ''));
  const sheet = await fs.readFileSync(filename, 'utf8');

  return sheet;
}

async function transformStylesheets(link, criticalCssGenerated = false) {
  const href = link.getAttribute('href');
  const media = link.getAttribute('media');
  const document = link.ownerDocument;

  // CSS loader is only injected for the first sheet, then this becomes an empty string
  // @todo: pull this script in from loadCSS's NPM package directly
  let cssLoaderPreamble = `!function(t){"use strict";t.loadCSS||(t.loadCSS=function(){});var e=loadCSS.relpreload={};if(e.support=function(){var e;try{e=t.document.createElement("link").relList.supports("preload")}catch(t){e=!1}return function(){return e}}(),e.bindMediaToggle=function(t){function e(){t.media=a}var a=t.media||"all";t.addEventListener?t.addEventListener("load",e):t.attachEvent&&t.attachEvent("onload",e),setTimeout(function(){t.rel="stylesheet",t.media="only x"}),setTimeout(e,3e3)},e.poly=function(){if(!e.support())for(var a=t.document.getElementsByTagName("link"),n=0;n<a.length;n++){var o=a[n];"preload"!==o.rel||"style"!==o.getAttribute("as")||o.getAttribute("data-loadcss")||(o.setAttribute("data-loadcss",!0),e.bindMediaToggle(o))}},!e.support()){e.poly();var a=t.setInterval(e.poly,500);t.addEventListener?t.addEventListener("load",function(){e.poly(),t.clearInterval(a)}):t.attachEvent&&t.attachEvent("onload",function(){e.poly(),t.clearInterval(a)})}"undefined"!=typeof exports?exports.loadCSS=loadCSS:t.loadCSS=loadCSS}("undefined"!=typeof global?global:this);`;

  // Only the first link tag encountered will get critical CSS appended before it
  if (criticalCssGenerated) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(criticalCssGenerated));
    link.parentNode.insertBefore(style, link);
    // drop a reference to the original URL onto the tag (used for reporting to console later)
    style.$$name = href;
  }

  link.setAttribute('rel', 'preload');
  link.setAttribute('as', 'style');
  link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");

  if (criticalCssGenerated) {
    const script = document.createElement('script');
    const js = `${cssLoaderPreamble}`;
    script.appendChild(document.createTextNode(js));
    link.parentNode.insertBefore(script, link.nextSibling);
  }

  cssLoaderPreamble = '';

  // generate noscript fallback for every <link> tag being transformed.
  const noscript = document.createElement('noscript');
  const noscriptLink = document.createElement('link');
  noscriptLink.setAttribute('rel', 'stylesheet');
  noscriptLink.setAttribute('href', href);
  if (media) noscriptLink.setAttribute('media', media);
  noscript.appendChild(noscriptLink);
  link.parentNode.insertBefore(noscript, link.nextSibling);
}

async function build(url, cssFile, outputPath) {
  config = config || (await getConfig());

  if (!config.criticalCss) {
    console.log('No Critical CSS configuration defined. Exiting early...');
    return;
  }

  // @todo: refactor to share this with Webpack
  const publicPath = config.publicPath
    ? config.publicPath
    : config.wwwDir
      ? `/${path.relative(config.wwwDir, config.buildDir)}/`
      : config.buildDir;

  // Aggregate all the HTML files that need to be parsed and transformed
  const htmlFiles = await globby(config.criticalCss.urls, {
    cwd: path.resolve(process.cwd(), config.wwwDir),
    absolute: true,
  });

  console.log(htmlFiles);

  // walk through every HTML file being parsed and find every <link> tag to async,
  // update the HTML with unique, HTML-specific CSS generated via Penthouse
  const start = async () => {
    await Promise.all(
      htmlFiles.map(async htmlFile => {
        const html = await fs.readFileSync(htmlFile, 'utf8');
        console.log(html);
        const document = createDocument(html);

        const externalSheets = document.querySelectorAll(
          'link[rel="stylesheet"]',
        );

        let cssString;
        let firstStylesheet = true;

        await Promise.all(
          externalSheets.map(async function(link) {
            const cssFound = await getStylesheets(link, config.wwwDir);
            cssString += cssFound;
          }),
        );

        if (cssString !== undefined) {
          const criticalCssGenerated = await runPenthouse(
            'file:///' + htmlFile,
            cssString,
          );

          await Promise.all(
            externalSheets.map(async function(link) {
              if (firstStylesheet) {
                firstStylesheet = false;
                await transformStylesheets(link, criticalCssGenerated);
              } else {
                await transformStylesheets(link);
              }
            }),
          );

          const newHTML = serializeDocument(document);
          return await fs.writeFileSync(htmlFile, newHTML);
        }
      }),
    );
    console.log('Finished generating Critical CSS');
  };

  start();
}

module.exports = {
  build,
};