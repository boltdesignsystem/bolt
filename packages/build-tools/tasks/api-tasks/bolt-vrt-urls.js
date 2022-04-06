#!/usr/bin/env node
const fs = require('fs');
const { getConfig } = require('@bolt/build-utils/config-store');
const path = require('path');
const shell = require('shelljs');

async function generateVrtUrls() {
  const config = await getConfig();

  // Get all PL data
  const data = require(path.resolve(
    path.join(
      config.wwwDir,
      'pattern-lab/styleguide/data/patternlab-data-all.js',
    ),
  ));

  // Get just the links, the paths to each page in PL
  let demoUrls = data.globalData.link;

  const filteredUrls = {
    components: [],
  };

  // Get every Bolt package in the repo
  const boltPackages = JSON.parse(
    shell.exec('npx lerna ls --json --all', { silent: true }).stdout,
  );

  // Get just the "components", filters out build tools, etc.
  const allComponents = boltPackages.filter(
    pkg =>
      pkg.name.includes('@bolt/elements-') ||
      pkg.name.includes('@bolt/layouts-') ||
      pkg.name.includes('@bolt/components-'),
  );

  // Components we do not want to test for various reasons
  const excludePackages = [
    '@bolt/components-radio-switch',
    '@bolt/components-animate',
    '@bolt/components-grid',
    '@bolt/components-icons',
    '@bolt/components-page-footer',
    '@bolt/components-page-header',
    '@bolt/components-placeholder',
    '@bolt/components-search-filter',
    '@bolt/components-site',
    '@bolt/components-smooth-scroll',
    '@bolt/components-toolbar',
    '@bolt/elements-link',
    '@bolt/components-editor',
    '@bolt/layouts-list',
  ];

  const filteredComponents = allComponents.filter(
    pkg => !excludePackages.includes(pkg.name),
  );

  // @todo: double-check each url path generated to make sure the URL path actually exists
  Object.keys(demoUrls).forEach(url => {
    const urlName = url;
    const urlAddress = demoUrls[url];

    filteredComponents.forEach(pkg => {
      const name = pkg.name;
      const componentName = name.replace('@bolt/', '');

      if (
        // Check for exact match because of components like 'chip' and 'chip-list'
        urlName === `viewall-${componentName}`
      ) {
        if (urlName.includes('viewall') && !demoUrls[url].added) {
          filteredUrls.components.push(
            urlAddress.replace(
              '../../',
              `https://boltdesignsystem.com/pattern-lab/`,
            ),
          );
          demoUrls[url].added = true;
        }
      }
    });
  });

  // Manually add these URLs which have unexpected names, like "backgrounds-shapes", until we can rename the files
  filteredUrls.components.push(
    'https://boltdesignsystem.com/pattern-lab/patterns/40-components-backgrounds-shapes/index.html',
  );
  filteredUrls.components.push(
    'https://boltdesignsystem.com/pattern-lab/patterns/40-components-chips-list/index.html',
  );
  filteredUrls.components.push(
    'https://boltdesignsystem.com/pattern-lab/patterns/40-components-card/index.html',
  );

  // Sorting only necessary because we're tacking on the components above, remove once we fix pattern names above
  filteredUrls.components = filteredUrls.components.sort();

  writeResults();

  async function writeResults() {
    const config = await getConfig();

    fs.writeFile(
      path.join(config.dataDir, `vrt-urls.bolt.json`),
      JSON.stringify(filteredUrls),
      'utf8',
      function(err) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }
        // console.log('VRT testing URLs have been generated.');
        // console.log(path.join(config.dataDir, `vrt-urls.bolt.json`));
      },
    );
  }
}

module.exports = {
  generateVrtUrls,
};
