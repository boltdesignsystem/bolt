#!/usr/bin/env node
const { render, renderString } = require('@bolt/twig-renderer');
const shell = require('shelljs');
const globby = require('globby');
const path = require('path');
const prettier = require('prettier');
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const fs = require('fs');
const events = require('../../utils/events');

const tableRows = [];

async function generateStatusBoard() {
  const config = await getConfig();

  const data = require(path.resolve(
    path.join(
      config.wwwDir,
      'pattern-lab/styleguide/data/patternlab-data-all.js',
    ),
  ));
  let boltUrls = data.globalData.link;

  const boltPackages = JSON.parse(
    shell.exec('lerna ls --json --all', { silent: true }).stdout,
  );

  const filteredBoltPackages = boltPackages.filter(pkg =>
    pkg.name.includes('@bolt/components'),
  );

  Object.keys(boltUrls).forEach(function(url) {
    if (!url.includes('viewall')) {
      delete boltUrls[url];
    } else if (url.includes('visual-styles') || url.includes('pages-')) {
      delete boltUrls[url];
    }
  });

  let pendingRequests = 0;
  let completedRequests = 0;
  let inProgressRequests = true;
  let urlsProcessed = 0;
  let packagesProcessed = 0;

  filteredBoltPackages.forEach(function(boltPackage, index, boltPackagesArray) {
    const pkgName = boltPackage.name;
    const componentPath = boltPackage.location;
    const pkg = require(`${boltPackage.location}/package.json`);

    const jsFound = globby.sync([
      `${componentPath}/**/*.js`,
      `!${componentPath}/__tests__/**/*.js`,
    ]);

    const manualTestingDocs = globby.sync([`${componentPath}/**/TESTING.md`]);

    const scssFound = globby.sync([`${componentPath}/**/*.scss`]);
    const twigFound = globby.sync([`${componentPath}/**/*.twig`]);
    const jestTestsFound = globby.sync(
      `${componentPath}/__tests__/__snapshots__/*.js.snap`,
    );
    const nightwatchTestsFound = globby.sync(
      `${componentPath}/__tests__/*.e2e.js`,
    );
    const hasjestTests = jestTestsFound.length > 0;
    const hasNightwatchTests = nightwatchTestsFound.length > 0;
    const hasJs = jsFound.length === 1;
    const probablyAWebComponent = jsFound.length > 1;
    const hasScss = scssFound.length > 0;
    const isPrivate = pkg.private;
    const hasTwig = twigFound.length > 0;
    const hasManualTestingDocs = manualTestingDocs.length > 0;
    const readmeDocs = globby.sync(`${componentPath}/README.md`);
    let docsFound;

    if (readmeDocs.length > 0) {
      docsFound = fs.statSync(readmeDocs[0]);
    } else {
      docsFound = false;
    }

    // console.log(`Web Component: ${probablyAWebComponent ? '🌟' : (hasJs ? '⭐' : '❓')}`);
    // console.log(`Sass: ${hasScss ? '✅' : ''}`);
    // console.log(`Twig: ${hasTwig ? '✅' : ''}`);
    // console.log(`Version: ${!isPrivate ? pkg.version : '(unreleased)'}`);
    // console.log(`Jest Tests: ${hasjestTests ? '✅' : '️🚫'}`);
    // console.log(`Nightwatch Tests: ${hasNightwatchTests ? '✅' : '️🚫'}`);
    // console.log(`Manual Testing Docs: ${hasManualTestingDocs ? '✅' : '️🚫'}`);
    // console.log(`README Quality: ${docsFound.size >= 300 ? '⚠' : '🚧'}`);
    // console.log(urlAddress);
    // urlsProcessed = 0;
    packagesProcessed += 1;
    urlsProcessed = 0;

    Object.keys(boltUrls).forEach(async function(url, urlIndex, urlArray) {
      const urlAddress = boltUrls[url];
      const normalizedUrlName = url.replace(
        'viewall-components-',
        '@bolt/components-',
      );

      const normalizedUrl = urlAddress.replace('../../', '/pattern-lab/');

      if (normalizedUrlName === pkgName) {
        pendingRequests += 1;

        const formattedPackageName = pkgName
          .replace('@bolt/components-', '')
          .replace('-', ' ')
          .replace(/\b\w/g, function(l) {
            return l.toUpperCase();
          });

        const results = await renderString(`
          {% include "@bolt-components-link/link.twig" with {
            text: "<strong>${formattedPackageName}</strong>",
            url: "${normalizedUrl}",
            isHeadline: true,
          } %}
        `);
        const html = results.html;

        tableRows.push({
          cells: [
            html,
            // isPrivate
            //     ? '(unreleased)'
            //     : '<span class="u-bolt-bg-color-blue u-bolt-color-white u-bolt-inline-block u-bolt-padding-left-xsmall u-bolt-padding-right-xsmall"><strong>v' + pkg.version +
            // '</strong></span>
            hasScss ? '✅' : '',
            hasTwig ? '✅' : '',
            probablyAWebComponent ? '🌟' : hasJs ? '' : '',
            hasjestTests ? '✅' : '️🚫',
            hasNightwatchTests ? '✅' : '️🚫',
            hasManualTestingDocs ? '✅' : '️🚫',
            docsFound.size >= 300 ? '✅' : '❓',
          ],
        });

        completedRequests += 1;
        urlsProcessed += 1;
      } else {
        urlsProcessed += 1;
      }
    });

    // keep track to see if everything has been processed
    if (
      Object.keys(boltUrls).length * filteredBoltPackages.length ===
      urlsProcessed * packagesProcessed
    ) {
      // @todo: refactor to use promises
      const waitForRequestsToFinish = setInterval(async function() {
        if (pendingRequests !== completedRequests) {
          // console.log('waiting to finish requests');
        }

        if (pendingRequests === completedRequests) {
          // console.log(
          //   'All done waiting for in-progress Twig-rendering requests to finish.',
          // );
          await finishRendering(tableRows);
          clearInterval(waitForRequestsToFinish);
        }
      }, 50);
    }
  });

  async function finishRendering(rows) {
    renderString(`
      {% include "@bolt-components-table/table.twig" with {
        first_col_fixed_width: true,
        borderless: true,
        attributes: {
          class: [
            "t-bolt-xlight"
          ]
        },
        headers: {
          top: {
            cells: [
              "Component",
              "Sass",
              "Twig",
              "Web Component",
              "Jest",
              "Nightwatch",
              "TESTING.md",
              "README.md"
            ]
          },
        },
        rows: ${JSON.stringify(rows)},
      } only %}
    `).then(renderedResults => {
      const formattedTable = prettier.format(renderedResults.html, {
        parser: 'html',
      });

      fs.writeFile(
        path.join(config.buildDir, 'status-board.twig'),
        formattedTable,
        'utf8',
        function(err) {
          if (err) {
            console.log('An error occured while writing JSON Object to File.');
            return console.log(err);
          }

          // console.log('Dynamic Twig status board has been saved.');

          events.emit('status-board:generated');
        },
      );
    });
  }
}

module.exports = {
  generateStatusBoard,
};
