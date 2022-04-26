#!/usr/bin/env node
const { render, renderString } = require('@bolt/twig-renderer');
const shell = require('shelljs');
const globby = require('globby');
const path = require('path');
const arraySort = require('array-sort');
const prettier = require('prettier');
const { getConfig } = require('@bolt/build-utils/config-store');
const fs = require('fs');
const events = require('@bolt/build-utils/events');

const tableRows = [];

let config;
let boltUrls;
let filteredBoltPackages;
const pendingRequests = [];
const processedComponents = [];

async function finishRendering(rows, callback) {
  config = config || (await getConfig());

  renderString(`
    {% set header %}
      {% set cells %}
        {% include '@bolt-components-table/table-cell.twig' with {
          header: true,
          content: 'Component',
          attributes: {
            class: [
              'sort'
            ],
            'data-sort': 'component'
          },
        } only %}
        {% include '@bolt-components-table/table-cell.twig' with {
          content: 'Sass',
          header: true,
        } only %}
        {% include '@bolt-components-table/table-cell.twig' with {
          content: 'Twig',
          header: true,
        } only %}
        {% include '@bolt-components-table/table-cell.twig' with {
          content: 'Web Component',
          header: true,
        } only %}
        {% include '@bolt-components-table/table-cell.twig' with {
          content: 'Jest',
          header: true,
        } only %}
        {% include '@bolt-components-table/table-cell.twig' with {
          content: 'TESTING.md',
          header: true,
        } only %}
        {% include '@bolt-components-table/table-cell.twig' with {
          content: 'README.md',
          header: true,
        } only %}
      {% endset %}
      {% include '@bolt-components-table/table-row.twig' with {
        content: cells,
      } only %}
    {% endset %}
    {% include '@bolt-components-table/table.twig' with {
      header: {
        content: header,
      },
      body: {
        content: ${JSON.stringify(arraySort(rows))}
      },
      attributes: {
        class: [
          't-bolt-xlight',
          'u-bolt-block'
        ],
        id: 'component-status',
        style: 'max-height: none;'
      },
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

        callback();
        events.emit('api-tasks/status-board:generated');
      },
    );
  });
}

async function generateStatusBoard() {
  config = config || (await getConfig());

  return new Promise(async (resolve, reject) => {
    const dataFile = path.resolve(
      path.join(
        config.wwwDir,
        'pattern-lab/styleguide/data/patternlab-data-all.js',
      ),
    );

    delete require.cache[dataFile];
    const data = require(dataFile);
    boltUrls = data.globalData.link;

    boltPackages = JSON.parse(
      shell.exec('npx lerna ls --json --all', { silent: true }).stdout,
    );

    filteredBoltPackages = boltPackages.filter(pkg =>
      pkg.name.includes('@bolt/components'),
    );

    filteredBoltPackages.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    Object.keys(boltUrls).forEach(function(url) {
      if (!url.includes('viewall')) {
        delete boltUrls[url];
      } else if (url.includes('visual-styles') || url.includes('pages-')) {
        delete boltUrls[url];
      }
    });

    filteredBoltPackages.forEach(function(boltPackage) {
      const pkgName = boltPackage.name;
      const componentPath = boltPackage.location;
      const pkg = require(`${boltPackage.location}/package.json`);
      const pkgAlias = pkg['pattern-alias'] || ''; // allows an optional 'pattern-alias' config to be defined in the component's package.json to match up a component's normal name with one or two oddly named component folders in Pattern Lab

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
      const hasjestTests = jestTestsFound.length > 0;
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

      Object.keys(boltUrls).forEach(async function(url, urlIndex, urlArray) {
        const urlAddress = boltUrls[url];
        const normalizedUrlName = url.replace(
          'viewall-components-',
          '@bolt/components-',
        );

        const normalizedUrl = urlAddress.replace('../../', '/pattern-lab/');

        // if a component's package.json has defined a pattern alias, use that to match up with a PL folder vs using the default pkg name
        if (
          (pkgAlias !== '' &&
            normalizedUrlName === pkgAlias &&
            !processedComponents.includes(pkgName)) ||
          (normalizedUrlName === pkgName &&
            !processedComponents.includes(pkgName))
        ) {
          processedComponents.push(pkgName);
          pendingRequests.push(pkgName);

          const formattedPackageName = pkgName
            .replace('@bolt/components-', '')
            .replace(/\-/g, ' ')
            .replace(/\b\w/g, function(l) {
              return l.toUpperCase();
            });

          const results = await renderString(`
            {% include "@bolt-elements-text-link/text-link.twig" with {
              content: "<strong>${formattedPackageName}</strong>",
              reversed_underline: true,
              attributes: {
                href: "${normalizedUrl}",
              }
            } %}
          `);

          const resultCell = await renderString(`
            {% include '@bolt-components-table/table-cell.twig' with {
              content: '${
                isPrivate ? `${results.html} (unreleased)` : results.html
              }'
            } only %}
          `);

          const html = resultCell.html;

          const checkMark = await renderString(`
            {% include '@bolt-components-table/table-cell.twig' with {
              content: '✅'
            } only %}
          `);

          const questionMark = await renderString(`
            {% include '@bolt-components-table/table-cell.twig' with {
              content: '❓'
            } only %}
          `);

          const cancelMark = await renderString(`
            {% include '@bolt-components-table/table-cell.twig' with {
              content: '🚫'
            } only %}
          `);

          const emptyCell = await renderString(`
            {% include '@bolt-components-table/table-cell.twig' with {
              content: ''
            } only %}
          `);

          const singleRow = [];

          singleRow.push(
            html,
            hasScss ? checkMark.html : emptyCell.html,
            hasTwig ? checkMark.html : emptyCell.html,
            probablyAWebComponent
              ? checkMark.html
              : hasJs
              ? emptyCell.html
              : emptyCell.html,
            hasjestTests ? checkMark.html : cancelMark.html,
            hasManualTestingDocs ? checkMark.html : cancelMark.html,
            docsFound.size >= 300 ? checkMark.html : questionMark.html,
          );
          const singleRowRender = await renderString(`
            {% include '@bolt-components-table/table-row.twig' with {
              content: '${singleRow.join('')}'
            } only %}
          `);
          tableRows.push(singleRowRender.html);

          pendingRequests.pop();

          if (pendingRequests.length === 0) {
            await checkToSeeIfFinishedPrerendering(resolve);
          }
        }
      });
    });
  });
}

async function checkToSeeIfFinishedPrerendering(resolve) {
  // Only wait a second or so for re-renders to complete before skipping.
  let retryAttempts = 3;
  // @todo: refactor to use promises
  const waitForRequestsToFinish = setInterval(async function() {
    if (pendingRequests.length === 0 || retryAttempts === 0) {
      // console.log(processedComponents.length);
      await finishRendering(tableRows, resolve);
      clearInterval(waitForRequestsToFinish);
    } else if (pendingRequests !== 0) {
      console.log(`Waiting for ${pendingRequests.length} requests to finish.`);
      retryAttempts -= 1;
    }
  }, 100);
}
module.exports = {
  generateStatusBoard,
};
