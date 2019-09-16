import * as fs from 'fs';
import { promisify } from 'util';
import { join, dirname } from 'path';

import { IAutoHooks, Auto, SEMVER, execPromise } from '@auto-it/core';
// import getConfigFromPackageJson from './package-config';

const readFile = promisify(fs.readFile);

const globby = require('globby');
const findPkg = require('find-pkg');
const repoRoot = join(__dirname, './');
const { existsSync } = require('fs-extra');

const fullConfigPath = join(repoRoot, 'www/build/data/config.bolt.json');
const twigNamespacesManifestPath = join(
  repoRoot,
  'www/build/data/twig-namespaces.bolt.json',
);

export default class BoltPlugin {
  reportWarning(auto, message) {
    auto.logger.log.fatal(`${this.name}: ${message}`);
  }

  apply(auto) {
    auto.hooks.beforeRun.tap('Bolt', async config => {
      if (!process.env.NPM_TOKEN) {
        this.reportWarning(auto, 'NPM Token is needed for the NPM plugin!');
      }

      if (!existsSync(twigNamespacesManifestPath)) {
        this.reportWarning(
          auto,
          `Can't find ${twigNamespacesManifestPath}!. Please do a build first first before deploying!`,
        );
        process.exit(1);
      }

      if (!existsSync(fullConfigPath)) {
        this.reportWarning(
          auto,
          `Can't find ${fullConfigPath}!. Please do a build first first before deploying!`,
        );
        process.exit(1);
      }
    });

    // auto.hooks.getPreviousVersion.tapPromise('Bolt', async prefixRelease => {
    //   const { version } = JSON.parse(await readFile('package.json', 'utf-8'));

    //   auto.logger.log.info(
    //     'NPM: Got previous version from package.json - ',
    //     version
    //   );

    //   if (version) {
    //     return prefixRelease(
    //       JSON.parse(await readFile('package.json', 'utf-8')).version
    //     );
    //   }
    // });

    // auto.hooks.version.tapPromise('Bolt', async (version) => {
    //   // await execPromise('npm', [
    //   //   'version',
    //   //   version,
    //   //   '-m',
    //   //   'Bump version to: %s [skip ci]'
    //   // ]);
    //   console.log(version);
    // });

    // auto.hooks.version.tapPromise('Bolt', async (version) => {
    //   // await execPromise('npm', [
    //   //   'version',
    //   //   version,
    //   //   '-m',
    //   //   'Bump version to: %s [skip ci]'
    //   // ]);
    //   console.log(version);
    // });

    // auto.hooks.getAuthor.tapPromise('Bolt', async () => {
    //   const { author } = JSON.parse(await readFile('package.json', 'utf-8'));

    //   if (author) {
    //     auto.logger.log.info('NPM: Got author information from package.json');
    //     return author;
    //   }
    // });

    // auto.hooks.getPreviousVersion.tapPromise('Bolt', async prefixRelease => {
    //   const { version } = JSON.parse(await readFile('package.json', 'utf-8'));

    //   auto.logger.log.info(
    //     'NPM: Got previous version from package.json - ',
    //     version
    //   );

    //   if (version) {
    //     return prefixRelease(
    //       JSON.parse(await readFile('package.json', 'utf-8')).version
    //     );
    //   }
    // });

    // auto.hooks.getRepository.tapPromise('Bolt', async () => {
    //   auto.logger.log.info('NPM: getting repo information from package.json');
    //   return getConfigFromPackageJson();
    // });

    // auto.hooks.publish.tapPromise('Bolt', async (version: SEMVER) => {
    //   await execPromise('npm', [
    //     'version',
    //     version,
    //     '-m',
    //     'Bump version to: %s [skip ci]'
    //   ]);
    //   await execPromise('npm', ['publish']);
    //   await execPromise('git', [
    //     'push',
    //     '--follow-tags',
    //     '--set-upstream',
    //     'origin',
    //     '$branch'
    //   ]);
    // });
  }
}
