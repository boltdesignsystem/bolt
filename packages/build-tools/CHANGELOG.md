# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.5.1...v2.5.2) (2019-06-25)


### Bug Fixes

* address eslint / prettier problems flagged with the latest upstream dependencies + update yarn.lock ([c5e0253](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c5e0253))
* update local @bolt/build-util references in the build tools ([35ea609](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/35ea609))





## [2.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/build-tools





## [2.4.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.4.3...v2.4.4) (2019-06-05)

**Note:** Version bump only for package @bolt/build-tools





## [2.4.3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.4.2...v2.4.3) (2019-05-31)


### Bug Fixes

* globally update non-private package.json files with devDependencies and peerDependencies that might not get installed as expected when used / published outside of the Bolt monorepo ([617bd86](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/617bd86))





# [2.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.3.2...v2.4.0) (2019-05-14)


### Bug Fixes

* update .incache data + workaround to try to more consistently grab the latest Bolt Github release info. also includes a minor CSS fix for the docs site layout navigation. ([ba812b8](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ba812b8))
* version bump globby + semantic version packages to resolve node-glob yarn install errors being periodically encountered ([99d54e8](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/99d54e8))



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add missing dependency to prevent install warnings ([c9231cd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c9231cd))
* add missing dependency to twig renderer ([20778d0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/20778d0))
* add missing webpack-merge dependency to the build tools package ([889f0fd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/889f0fd))
* add renderer mode config default ([1201419](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1201419))
* bypass cache when doing a full tagged release + fix deploy script to not update the main docs site url when doing pre-releases ([9faa0f4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/9faa0f4))
* disable browsersync ghost syncing as a workaround to ensure local Nightwatch.js browser tests don't have clicks / interactions triggered by other browsers. ([ec55a2d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ec55a2d))
* disable console log output with UIKit regeneration ([0f2e2b6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0f2e2b6))
* disable SSR ([a9670dd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/a9670dd))
* fix lint / prettier issues ([aefbf12](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/aefbf12))
* fix prettier errors ([f55babd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f55babd))
* fix task collection event sequence ([eaed5ce](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/eaed5ce))
* image data filter, change to greater than or equal to, was filtering out exact matches ([863cfa4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/863cfa4))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5ef9667))
* move around webpack loader plugins needed for running the full test suite ([e7cb37e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e7cb37e))
* remove dependency loop between packages ([b43fc34](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b43fc34))
* swap order of watch vs serve tasks ([a68f465](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/a68f465))
* update @bolt/build-tools to ensure @bolt/api is a peer dependency ([1c19f90](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1c19f90))
* update bolt-version data logic to handle API throttle limits + attempt to use old (stale) data if expired ([f456778](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f456778))
* update bolt-version script to address deprecation error ([b1035c4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b1035c4))
* update bolt-versions Github check to use the new octokit API call ([21cf7a4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/21cf7a4))
* update clean task to not wipe the entire www folder every time ([b8cfb67](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b8cfb67))
* update CLI to allow the static site generator and/or Pattern Lab to get run manually (especially for testing purposes) ([7f82175](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7f82175))
* update event emitter to only fire once ([7e454b5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7e454b5))
* update event emitter to only fire once ([341aabe](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/341aabe))
* **@bolt/build-tools:** fix for filing test on first run ([226e96e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/226e96e))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b647d3b))
* update to only wait to retry requests that are within 15 seconds before calling it quits and using the fallback ([1875bea](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1875bea))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/a8ed82f))
* update Webpack build and server config to better account for situations where lang can be defined as a string, an array with one item, and an array with multiple items ([bbeee23](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/bbeee23))
* **@bolt/build-tools:** fix js issues ([c501be3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c501be3))
* **@bolt/build-tools:** updateting configutration for testing ([f3333b7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f3333b7))
* **@bolt/build-tools,@bolt/components-icons:** move clean icon task to be run after all the tests ([863f91d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/863f91d))


### Features

* add new api-specific build tasks that handle generating the status board, generate visual regression testing URLs, and can find all available versions of the Bolt packages published to NPM ([9cdc962](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/9cdc962))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/89a7061))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/4636d67))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/82a5686))
* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/470f7af))
* add support for an optional "pattern -alias" config to help match up oddly named folders in PL with a component's default package.json file name. ([f11db1a](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f11db1a))
* addd ability to manually enable / disable server-side rendering + automatically toggle based on dev environment ([861a14e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/861a14e))
* update Bolt build config to add support for extending / modifying the default Webpack config generated ([b283134](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b283134))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add missing dependency to prevent install warnings ([c9231cd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c9231cd))
* add missing dependency to twig renderer ([20778d0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/20778d0))
* add missing webpack-merge dependency to the build tools package ([889f0fd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/889f0fd))
* add renderer mode config default ([1201419](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1201419))
* bypass cache when doing a full tagged release + fix deploy script to not update the main docs site url when doing pre-releases ([9faa0f4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/9faa0f4))
* disable browsersync ghost syncing as a workaround to ensure local Nightwatch.js browser tests don't have clicks / interactions triggered by other browsers. ([ec55a2d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ec55a2d))
* disable console log output with UIKit regeneration ([0f2e2b6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0f2e2b6))
* disable SSR ([a9670dd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/a9670dd))
* fix lint / prettier issues ([aefbf12](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/aefbf12))
* fix prettier errors ([f55babd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f55babd))
* fix task collection event sequence ([eaed5ce](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/eaed5ce))
* image data filter, change to greater than or equal to, was filtering out exact matches ([863cfa4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/863cfa4))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5ef9667))
* move around webpack loader plugins needed for running the full test suite ([e7cb37e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e7cb37e))
* remove dependency loop between packages ([b43fc34](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b43fc34))
* swap order of watch vs serve tasks ([a68f465](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/a68f465))
* update @bolt/build-tools to ensure @bolt/api is a peer dependency ([1c19f90](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1c19f90))
* update bolt-version data logic to handle API throttle limits + attempt to use old (stale) data if expired ([f456778](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f456778))
* update bolt-version script to address deprecation error ([b1035c4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b1035c4))
* update bolt-versions Github check to use the new octokit API call ([21cf7a4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/21cf7a4))
* update clean task to not wipe the entire www folder every time ([b8cfb67](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b8cfb67))
* update CLI to allow the static site generator and/or Pattern Lab to get run manually (especially for testing purposes) ([7f82175](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7f82175))
* update event emitter to only fire once ([7e454b5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7e454b5))
* update event emitter to only fire once ([341aabe](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/341aabe))
* **@bolt/build-tools:** fix for filing test on first run ([226e96e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/226e96e))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b647d3b))
* update to only wait to retry requests that are within 15 seconds before calling it quits and using the fallback ([1875bea](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1875bea))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/a8ed82f))
* update Webpack build and server config to better account for situations where lang can be defined as a string, an array with one item, and an array with multiple items ([bbeee23](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/bbeee23))
* **@bolt/build-tools:** fix js issues ([c501be3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c501be3))
* **@bolt/build-tools:** updateting configutration for testing ([f3333b7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f3333b7))
* **@bolt/build-tools,@bolt/components-icons:** move clean icon task to be run after all the tests ([863f91d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/863f91d))


### Features

* add new api-specific build tasks that handle generating the status board, generate visual regression testing URLs, and can find all available versions of the Bolt packages published to NPM ([9cdc962](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/9cdc962))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/89a7061))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/4636d67))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/82a5686))
* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/470f7af))
* add support for an optional "pattern -alias" config to help match up oddly named folders in PL with a component's default package.json file name. ([f11db1a](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f11db1a))
* addd ability to manually enable / disable server-side rendering + automatically toggle based on dev environment ([861a14e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/861a14e))
* update Bolt build config to add support for extending / modifying the default Webpack config generated ([b283134](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b283134))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)


### Bug Fixes

* adjust logic grabbing latest Bolt release versions + update file cache ([cbb4ffc](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/cbb4ffc))
* fix local Bolt package versions ([f1a4647](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f1a4647))



## [2.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.2.1...v2.2.2) (2019-01-07)


### Bug Fixes

* fix broken `prep` cli task ([ddd5db3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ddd5db3))
* fix failing jest tests + prettier issues ([333d08d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/333d08d))
* fix infinite dependency loop flagged by lerna ([12e25c2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/12e25c2))
* re-add missing dependency to image task ([65b2ad4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/65b2ad4))
* remove whitespace to fix prettier issue ([e165e78](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e165e78))
* revert some of the updates to the image processing task + fix re-writing image originals on the file system; fixes problem with generated image paths + inconsistently rendered jest tests ([be5d1fd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/be5d1fd))
* update path to point to correctly point to lerna.json ([91098ed](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/91098ed))
* updating image test fixtures + updating image build task to always generate the full set of image sizes for Jest snapshot tests ([0b0bb26](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0b0bb26))
* updating schema form + temporarily disabling lang settings to work with component previews in Pattern Lab; updating CORS settings ([bf6795e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/bf6795e))


### Features

* add utility functions to help check if a file or directory already exists ([45db67c](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/45db67c))



## [2.2.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.2.0...v2.2.1) (2018-12-17)


### Bug Fixes

* clean up prettier issues ([34bbdac](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/34bbdac))


### Features

* **build-tools:** setting up API endpoint on server ([ae5bc5c](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ae5bc5c))



# [2.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.2.0-rc.1...v2.2.0) (2018-11-18)


### Features

* update build process to automatically skip over the check for all available Bolt versions — speeds up initial boot up process when doing local dev work ([d32bc2e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/d32bc2e))



# [2.2.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.6...v2.2.0-rc.1) (2018-11-07)


### Bug Fixes

* auto-fix prettier issues ([6abd0d2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/6abd0d2))
* fix issue with recent Webpack build updates causing build errors to not be output when the Bolt build tools verbosity is set to 1 ([56e74b5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/56e74b5))
* flx linting issues ([b7c30d7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b7c30d7))



## [2.1.6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.5...v2.1.6) (2018-10-23)


### Bug Fixes

* fix eslint and prettier errors ([b3019ce](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b3019ce))
* fix long-standing issue with static docs site not recompiling when files have changed (while in watch mode); improve static site build reliability ([5928ee7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5928ee7))



## [2.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.3...v2.1.4) (2018-10-18)



## [2.1.3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.2...v2.1.3) (2018-10-18)



## [2.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.1...v2.1.2) (2018-10-16)


### Bug Fixes

* sort and reorder versions using rcompare ([325877e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/325877e))


### Features

* update semver sorting logic ([7d4f5ce](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7d4f5ce))



## [2.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.0...v2.1.1) (2018-10-10)


### Bug Fixes

* fix lint issue ([0662e7e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0662e7e))
* **build-tools:** restores ability to point to custom config file with --config-file ([6e6887c](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/6e6887c))



# [2.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.1.0-beta.0...v2.1.0) (2018-10-10)


### Bug Fixes

* fix prettier issues ([40db03f](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/40db03f))
* fix typo in comment ([564c776](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/564c776))



# [2.1.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.0.0...v2.1.0-beta.0) (2018-10-05)


### Bug Fixes

* **build-tools:** temp fix for unfinishing build tasks ([da59b0e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/da59b0e))
* **build-tools:** using cosmicconfig all the time ([294a1e0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/294a1e0))
* remove snyk check for now -- causing publishing issues ([bcf7e6b](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/bcf7e6b))


### Features

* **twig-renderer:** creates @bolt/twig-renderer for rendering individual Twig components ([277b7df](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/277b7df))



# [2.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.0.0-beta.3...v2.0.0) (2018-09-27)



# [2.0.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-09-21)



# [2.0.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.8.3...v2.0.0-beta.2) (2018-09-19)


### Bug Fixes

* update themify logic to fix colors without transparency ([d8dfa78](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/d8dfa78))



# [2.0.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-06)


### Bug Fixes

* updating build tool deps based on v2.0.0-beta.0 testing ([2e4bce5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/2e4bce5))



# [2.0.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.8.1...v2.0.0-beta.0) (2018-09-05)


### Bug Fixes

* fix eslint issues in webpack config ([ca03baf](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ca03baf))



# [1.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.7.2...v1.8.0) (2018-08-27)


### Bug Fixes

* disable conditional console logs — Bolt core config not yet getting pulled in ([bf3e0a6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/bf3e0a6))
* fix eslint issue with import order ([4265476](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/4265476))
* fix missing comma in package.json ([e5e64e9](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e5e64e9))
* fix prettier issue ([baf5a6d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/baf5a6d))
* fixing lint issues ([f8d83ac](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f8d83ac))
* remove duplicate dependency ([9b93fab](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/9b93fab))
* temporarily disable Twig rendering in Webpack build -- config needs more refinement based on existance of files being compiled against ([84e65d6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/84e65d6))
* update build tools auto redirect when booting up and redirecting to a "/" start path ([c7c17c3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c7c17c3))
* update dependency versions; revert a few build tool-specific changes that got reverted when merging in the latest from master ([d5c44fb](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/d5c44fb))


### Features

* add copy-webpack-plugin to build process; add new config option to specify multiple batches of files / folders to copy over at the .boltrc config level ([d60db4c](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/d60db4c))
* add new webpack-sassdoc-plugin; wire up Sassdoc build process to Webpack directly ([7c588fd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7c588fd))



## [1.7.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.7.1...v1.7.2) (2018-08-10)


### Bug Fixes

* remove the no longer required Webpack Provide plugin to no longer automatically pull in es6-promise library which had been causing JS errors in the latest version of Preact shipping. Added bonus: this is no longer required for IE 11 support either with how we've been bundling up and Polyfilling our JavaScript! ([0b9cd21](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0b9cd21))



## [1.7.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.7.0...v1.7.1) (2018-08-09)


### Bug Fixes

* update webpack-serve config so local IE 11 testing works with webpack-hot-client ([17dbc38](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/17dbc38))



# [1.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.6.8...v1.7.0) (2018-08-08)


### Bug Fixes

* add missing url-loader to build; force yarn to pull in forked version of fast-sass-loader that properly passes along custom functions to node-sass ([5fbfa6d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5fbfa6d))
* fix async / await in PL build config ([b7e329f](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b7e329f))
* fix JS error when webpack recompiles Pattern Lab ([cad0c49](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/cad0c49))
* fix lint issue in task-collection.js ([87dddbb](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/87dddbb))
* fix lint issue in task-collection.js ([1311ef0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1311ef0))
* fix linting issues ([e01df85](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e01df85))
* fix prettier eslint errors ([d50dff3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/d50dff3))
* fix Prettier issue ([5dbbd2d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5dbbd2d))
* fixing async await in rendering API ([e1b55fe](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e1b55fe))
* fixing build tasks for static site ([d18277b](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/d18277b))
* fixing linting rules ([529cf01](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/529cf01))
* fixing webpack watch vs serve vs build so running standalone tasks doesn't cause webpack to recompile ([3760f0e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/3760f0e))
* packages/build-tools/.snyk & packages/build-tools/package.json to reduce vulnerabilities ([7059003](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7059003))
* prevent pattern lab's styleguide folder from getting wiped when the the build tools clean task is run ([3924a34](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/3924a34))
* re-add missing build-tools dependency ([cf6cbbe](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/cf6cbbe))
* remove globbing from docs site + temporarily remove cache busting filenames for CSS in prod mode ([1701480](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1701480))
* remove WatchIgnorePlugin from build -- fixes issue with Pattern Lab-specific Sass / JS not properly triggering a Webpack rebuild (inside the 01-styleguide folder to be more specific) ([7c03f5c](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7c03f5c))
* revert removing parallelism cap in build tools -- still required till even better solution in @bolt/postcss-themify is figured out. ([0533474](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0533474))
* revert some of the recent changes to @bolt/build-tools sh.js utility -- shell commands are still wired up to use execa under the hood however errors thrown via command line commands are now properly thrown / resolved vs hanging indefinitly ([80f4c19](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/80f4c19))
* specify webpack-serve config info to prevent errors from getting thrown in IE 11 ([6f285bc](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/6f285bc))
* tightening up i18n flags + build vs prod vs local dev behavior ([e1ae5a7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/e1ae5a7))
* update build tools so webpack's watch task is automatically run if webpackDevServer isn't enabled in the .boltrc config ([5affcbf](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5affcbf))
* update webpack-serve to not auto open for now to prevent two tabs from opening (one for webpack-serve + browsersync); browsersync config updates should still work as expected ([78c69b3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/78c69b3))
* updating Webpack config logic to properly handle language-specific builds when enabled ([51eedb6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/51eedb6))


### Reverts

* undo `await` changes in serve task ([4d9180a](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/4d9180a))



## [1.6.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.6.3...v1.6.4) (2018-07-12)


### Bug Fixes

* fix remaining eslint + prettier linting rules after merging in latest from master ([c9d2abd](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/c9d2abd))
* update eslint + prettier config to show messages on every commit; update the default .boltrc config verbosity in PL to display eslint warnings ([2105f95](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/2105f95))


### Features

* add API rendering service to build; 1st version schema form ([2534f80](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/2534f80))
* add new 'hybrid' config environment which combines PL and the static site builds into one ([536317e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/536317e))
* add prettier + eslint combo config to Webpack for continuous linting ([500c0f6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/500c0f6))
* cleaning up form UI ([9ec1c82](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/9ec1c82))
* update build config to set up PHP renderingService + assign an open port ([6587962](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/6587962))



# [1.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.5.3...v1.6.0) (2018-07-04)


### Bug Fixes

* Fix autoprefixer in Drupal builds (WWWD-2139) ([8123780](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/8123780))
* make sure only webpack configs with more than 1 language get language-specific file assets emitted ([5f33093](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/5f33093))
* update rendering service to always make sure the port is available ([73893d7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/73893d7))


### Features

* Add configuration option for schema error reporting (BDS-369) ([facf500](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/facf500))



## [1.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.5.0...v1.5.1) (2018-06-18)


### Bug Fixes

* revert composer package.json update ([64f548f](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/64f548f))



# [1.5.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.4.5...v1.5.0) (2018-06-12)


### Bug Fixes

* adding "any" schema prop type so the "any" key doesn't cause a breaking error on account of that option wasn't previously allowed till now. ([0a4d17c](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0a4d17c))
* update build tools logic to ensure setting a namespace key but NOT a paths config doesn't blow up the build on the Node or PHP side of things. ([b20780e](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b20780e))



## [1.3.3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.3.2...v1.3.3) (2018-05-04)


### Bug Fixes

* **build-tools/cli.js:** Fix for .boltrc.js cli flag override ([2c637fb](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/2c637fb))



## [1.3.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.3.1...v1.3.2) (2018-05-04)



## [1.3.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.3.0...v1.3.1) (2018-05-04)


### Bug Fixes

* **manifest.js:** Manifest Version Fetching ([848c3fe](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/848c3fe))



# [1.3.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.2.4...v1.3.0) (2018-05-04)


### Bug Fixes

* reference the lerna.json package, not the @bolt/build-tools when setting the version of Bolt in the global Bolt manifest ([#653](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/issues/653)) ([0e9553d](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/0e9553d))



## [1.2.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.2.3...v1.2.4) (2018-04-27)



## [1.2.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.2.0...v1.2.1) (2018-04-25)



# [1.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.1.12...v1.2.0) (2018-04-25)



## [1.1.5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.1.4...v1.1.5) (2018-04-19)



## [1.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.1.3...v1.1.4) (2018-04-17)



## [1.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.1.1...v1.1.2) (2018-04-10)



## [1.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.1.0...v1.1.1) (2018-04-10)



# [1.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.4...v1.1.0) (2018-04-10)



## [1.0.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.3...v1.0.4) (2018-04-03)



## [1.0.3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.2...v1.0.3) (2018-04-03)



## [1.0.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.1...v1.0.2) (2018-03-31)



# [1.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.12...v1.0.0) (2018-03-30)



# [1.0.0-rc.12](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2018-03-30)



# [1.0.0-rc.11](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.9...v1.0.0-rc.11) (2018-03-30)



# [1.0.0-rc.9](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2018-03-20)



# [1.0.0-rc.8](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2018-03-20)



# [1.0.0-rc.7](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2018-03-13)



# [1.0.0-rc.6](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2018-03-07)



# [1.0.0-rc.5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2018-03-06)



# [1.0.0-rc.4](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2018-03-06)



# [1.0.0-rc.3](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-02-24)



# [1.0.0-rc.2](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-02-24)



# [1.0.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/compare/v0.4.1...v1.0.0-rc.1) (2018-02-24)


### Bug Fixes

* adding js build fix locally + fixing broken image path ([fd04a03](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/fd04a03))
* adding missing css file ([8d261fc](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/8d261fc))
* adding missing files, removing deps not needed ([7556b17](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/7556b17))
* fixing broken / updated config schema to use updated props, minor schema updates ([33805ef](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/33805ef))
* moving check-imports script back for the moment ([b1b81b0](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/b1b81b0))
* re-enable + update Webpack fix for handling breakpoint class suffix with CSS modules enabled in build ([#471](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/issues/471)) ([2469d70](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/2469d70))
* resolving merge conflicts ([1586323](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/1586323))
* temporarily disable additional schema props check ([f83eaf5](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/f83eaf5))
* temporarily disabling lint precommit hook ([ab7bbfe](https://github.com/bolt-design-system/bolt/tree/master/packages/build-tools/commit/ab7bbfe))
