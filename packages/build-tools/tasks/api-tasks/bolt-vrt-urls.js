#!/usr/bin/env node
const fs = require('fs');
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const path = require('path');
const shell = require('shelljs');
const { getBoltTags } = require('./bolt-versions');

async function generateVrtUrls() {
  const config = await getConfig();

  const data = require(path.resolve(
    path.join(
      config.wwwDir,
      'pattern-lab/styleguide/data/patternlab-data-all.js',
    ),
  ));
  let boltUrls = data.globalData.link;

  const filteredUrls = {
    patterns: {},
    pages: [],
  };

  const boltPackages = JSON.parse(
    shell.exec('lerna ls --json --all', { silent: true }).stdout,
  );

  const allPackages = boltPackages.filter(pkg =>
    pkg.name.includes('@bolt/components'),
  );

  getBoltTags().then(versions => {
    const latestVersion = versions[0].name.replace(/\./g, '-');
    const previousVersion = versions[1].name.replace(/\./g, '-');

    // @todo: double-check each url path generated to make sure the URL path actually exists
    // @todo: update to reference bolt-version data -- comparing the current version (already wired up) + the previous version (not yet wired up) of the design system.
    Object.keys(boltUrls).forEach(function(url) {
      const urlName = url;
      const urlAddress = boltUrls[url];

      allPackages.forEach(function(individualPackage) {
        const name = individualPackage.name;
        const packageName = name.replace('@bolt/', '');

        if (
          urlName.includes(packageName) &&
          !urlName.includes('viewall') &&
          !urlName.includes('docs')
        ) {
          // filteredUrls.patterns = filteredUrls.patterns
          //   ? filteredUrls.patterns
          //   : [];
          filteredUrls.patterns[name] = filteredUrls.patterns[name]
            ? filteredUrls.patterns[name]
            : [];
          if (!boltUrls[url].added) {
            filteredUrls.patterns[name].push({
              patternVariation: urlName,
              previousReleaseUrl: urlAddress.replace(
                '../../',
                `https://${previousVersion}.boltdesignsystem.com/pattern-lab/`,
              ),
              currentReleaseUrl: urlAddress.replace(
                '../../',
                `https://${latestVersion}.boltdesignsystem.com/pattern-lab/`,
              ),
              nextReleaseUrl: urlAddress.replace(
                '../../',
                `https://master.boltdesignsystem.com/pattern-lab/`,
              ),
            });

            boltUrls[url].added = true;
          }
        }
      });

      if (
        urlName.includes('pages-') &&
        !urlName.includes('viewall') &&
        !urlName.includes('wysiwyg') &&
        !urlName.includes('ckeditor')
      ) {
        if (!boltUrls[url].added) {
          // filteredUrls.pages = filteredUrls.pages || [];
          filteredUrls.pages.push({
            pageName: urlName,
            previousReleaseUrl: urlAddress.replace(
              '../../',
              `https://${previousVersion}.boltdesignsystem.com/pattern-lab/`,
            ),
            currentReleaseUrl: urlAddress.replace(
              '../../',
              `https://${latestVersion}.boltdesignsystem.com/pattern-lab/`,
            ),
            nextReleaseUrl: urlAddress.replace(
              '../../',
              `https://master.boltdesignsystem.com/pattern-lab/`,
            ),
          });

          boltUrls[url].added = true;
        }
      }
    });

    writeResults(latestVersion, previousVersion);
  });

  async function writeResults(latestVersion, previousVersion) {
    const config = await getConfig();
    fs.writeFile(
      path.join(
        config.dataDir,
        `bolt-vrt-urls--${latestVersion}-vs-${previousVersion}.json`,
      ),
      JSON.stringify(filteredUrls),
      'utf8',
      function(err) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }

        // console.log('VRT testing URLs have been generated.');
      },
    );
  }
}

module.exports = {
  generateVrtUrls,
};
