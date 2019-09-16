# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.7.0](https://github.com/bolt-design-system/bolt/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* address stylelint issues ([00d1fba](https://github.com/bolt-design-system/bolt/commit/00d1fba))
* themed docs ([24ed29c](https://github.com/bolt-design-system/bolt/commit/24ed29c))
* update code to match .com branch ([446de1c](https://github.com/bolt-design-system/bolt/commit/446de1c))
* update PL main demo page for Typeahead ([5f8afd4](https://github.com/bolt-design-system/bolt/commit/5f8afd4))


### Features

* add <title> support to SVG icons ([2849ff4](https://github.com/bolt-design-system/bolt/commit/2849ff4))
* add demo of background image valign, add bottom margin to all background demos ([edd19dd](https://github.com/bolt-design-system/bolt/commit/edd19dd))
* add demo page for `selected_tab` ([0f5fe6a](https://github.com/bolt-design-system/bolt/commit/0f5fe6a))
* add early typeahead demo with custom hooks to modify result behavior ([8023287](https://github.com/bolt-design-system/bolt/commit/8023287))
* add Pattern Lab demo + component updates to support fully dynamic / async fetched search results ([82b7d41](https://github.com/bolt-design-system/bolt/commit/82b7d41))
* add tabs component ([b591d67](https://github.com/bolt-design-system/bolt/commit/b591d67))
* initially wire up typeahead ([9f19226](https://github.com/bolt-design-system/bolt/commit/9f19226))
* iterating on the Typeahead API + examples ([d0e074a](https://github.com/bolt-design-system/bolt/commit/d0e074a))
* rename `items` to `panels` ([46e8478](https://github.com/bolt-design-system/bolt/commit/46e8478))
* schema updates to `label_spacing`, `panel_spacing`, `inset`, and `uuid`; update docs ([f756568](https://github.com/bolt-design-system/bolt/commit/f756568))





# [2.6.0](https://github.com/bolt-design-system/bolt/compare/v2.6.0-beta.2...v2.6.0) (2019-08-30)


### Bug Fixes

* doc copy ([b8cece8](https://github.com/bolt-design-system/bolt/commit/b8cece8))





# [2.6.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.6.0-beta.1...v2.6.0-beta.2) (2019-08-27)


### Features

* deprecate `isBackgroundVideo`, remove from demos, add todos where prop is used ([ce9a25d](https://github.com/bolt-design-system/bolt/commit/ce9a25d))





# [2.6.0-beta.1](https://github.com/bolt-design-system/bolt/compare/v2.5.6...v2.6.0-beta.1) (2019-08-09)


### Bug Fixes

* fix stylelint error ([3abbb7b](https://github.com/bolt-design-system/bolt/commit/3abbb7b))
* only display component explorer message on docs pages where previous getting used ([a112aa9](https://github.com/bolt-design-system/bolt/commit/a112aa9))
* pattern lab override, position 'relative' causing modal choppiness on scroll ([29b622f](https://github.com/bolt-design-system/bolt/commit/29b622f))
* remove copy from doc page ([5dd5eff](https://github.com/bolt-design-system/bolt/commit/5dd5eff))
* remove inline includes ([b1df1a2](https://github.com/bolt-design-system/bolt/commit/b1df1a2))
* remove remaining schema form JS import ([7813dcf](https://github.com/bolt-design-system/bolt/commit/7813dcf))
* revert adding Japanese-specific .boltrc config ([1663b31](https://github.com/bolt-design-system/bolt/commit/1663b31))
* test and typo ([8aa43b3](https://github.com/bolt-design-system/bolt/commit/8aa43b3))
* typo ([e8a3250](https://github.com/bolt-design-system/bolt/commit/e8a3250))
* web component usage doc ([02c6459](https://github.com/bolt-design-system/bolt/commit/02c6459))


### Features

* add 'disabled' state to trigger link, update demo ([a538ac9](https://github.com/bolt-design-system/bolt/commit/a538ac9))
* add cli to run Jest only on packages that changed ([4c14818](https://github.com/bolt-design-system/bolt/commit/4c14818))
* add demo of modal triggered by video 'toggle' ([42b9784](https://github.com/bolt-design-system/bolt/commit/42b9784))
* add demo page for trigger 'disabled' option ([11637e7](https://github.com/bolt-design-system/bolt/commit/11637e7))
* add functional test of bolt sticky ([c74043c](https://github.com/bolt-design-system/bolt/commit/c74043c))
* combine video modal demos into a single page ([95d8ec7](https://github.com/bolt-design-system/bolt/commit/95d8ec7))
* wire up new critical polyfill package as a reference + prep to wire it up to Drupal Lab ([ed7e73f](https://github.com/bolt-design-system/bolt/commit/ed7e73f))





## [2.5.6](https://github.com/bolt-design-system/bolt/compare/v2.5.5...v2.5.6) (2019-07-30)

**Note:** Version bump only for package @bolt/website





## [2.5.5](https://github.com/bolt-design-system/bolt/compare/v2.5.4...v2.5.5) (2019-07-22)

**Note:** Version bump only for package @bolt/website





## [2.5.4](https://github.com/bolt-design-system/bolt/compare/v2.5.3...v2.5.4) (2019-07-15)

**Note:** Version bump only for package @bolt/website





## [2.5.3](https://github.com/bolt-design-system/bolt/compare/v2.5.2...v2.5.3) (2019-07-12)

**Note:** Version bump only for package @bolt/website





## [2.5.2](https://github.com/bolt-design-system/bolt/compare/v2.5.1...v2.5.2) (2019-06-25)


### Bug Fixes

* address eslint / prettier problems flagged with the latest upstream dependencies + update yarn.lock ([c5e0253](https://github.com/bolt-design-system/bolt/commit/c5e0253))





## [2.5.1](https://github.com/bolt-design-system/bolt/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/website





## [2.4.4](https://github.com/bolt-design-system/bolt/compare/v2.4.3...v2.4.4) (2019-06-05)


### Bug Fixes

* split up the core-php BoltExtra Twig extensions into the ones needed for Drupal compatibility vs any extra Twig extensions used internally for building the docs site. Update Twig renderer configs to use the full set of Twig extensions for the docs site but only BoltCore and BoltCoreCompat when running component tests ([0287e7a](https://github.com/bolt-design-system/bolt/commit/0287e7a))





## [2.4.3](https://github.com/bolt-design-system/bolt/compare/v2.4.2...v2.4.3) (2019-05-31)

**Note:** Version bump only for package @bolt/website





## [2.4.2](https://github.com/bolt-design-system/bolt/compare/v2.4.1...v2.4.2) (2019-05-24)


### Bug Fixes

* backport autotrack fix to update v2.3.2 docs site deployed instance ([4e0deac](https://github.com/bolt-design-system/bolt/commit/4e0deac))
* update release urls ([d848541](https://github.com/bolt-design-system/bolt/commit/d848541))





## [2.4.1](https://github.com/bolt-design-system/bolt/compare/v2.4.0...v2.4.1) (2019-05-14)


### Bug Fixes

* revert premature merge of a handful of v2.5.0 features ([ed4d395](https://github.com/bolt-design-system/bolt/commit/ed4d395))





# [2.4.0](https://github.com/bolt-design-system/bolt/compare/v2.3.2...v2.4.0) (2019-05-14)


### Bug Fixes

* update .incache data + workaround to try to more consistently grab the latest Bolt Github release info. also includes a minor CSS fix for the docs site layout navigation. ([ba812b8](https://github.com/bolt-design-system/bolt/commit/ba812b8))
* update version selector to only run logic when component exists + fix logic checks to make sure the correct local version is selected ([9cb92ad](https://github.com/bolt-design-system/bolt/commit/9cb92ad))
* version bump composer.lock files to fix Twig version resolved ([6f6485c](https://github.com/bolt-design-system/bolt/commit/6f6485c))
* version bump core-php getting used + update PHP dependencies so the casehelper package is installed as expected ([9808cb4](https://github.com/bolt-design-system/bolt/commit/9808cb4))


### Features

* add release banner to make sure users know the version of the system they are currently on + recommend different versions based on the current one ([c8c9902](https://github.com/bolt-design-system/bolt/commit/c8c9902))



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add missing slots to icons in <bolt-button> SSR demos ([115745d](https://github.com/bolt-design-system/bolt/commit/115745d))
* Add padding to right sidebar in docs to create symmetry ([56d8656](https://github.com/bolt-design-system/bolt/commit/56d8656))
* adding enum for boolean props ([67c9e78](https://github.com/bolt-design-system/bolt/commit/67c9e78))
* address prettier issues ([492c158](https://github.com/bolt-design-system/bolt/commit/492c158))
* broken image paths ([9e7864d](https://github.com/bolt-design-system/bolt/commit/9e7864d))
* button class logics ([587f56f](https://github.com/bolt-design-system/bolt/commit/587f56f))
* button focus ([0e263b4](https://github.com/bolt-design-system/bolt/commit/0e263b4))
* clarify gutter prop and its related demos ([7ec76be](https://github.com/bolt-design-system/bolt/commit/7ec76be))
* code and organization cleanup ([5c5764d](https://github.com/bolt-design-system/bolt/commit/5c5764d))
* code cleanup ([a344b8b](https://github.com/bolt-design-system/bolt/commit/a344b8b))
* consistent copy ([8a4dfc7](https://github.com/bolt-design-system/bolt/commit/8a4dfc7))
* copy changes ([e2c431e](https://github.com/bolt-design-system/bolt/commit/e2c431e))
* deprecated obsolete props ([421cf55](https://github.com/bolt-design-system/bolt/commit/421cf55))
* disable band transition inline on component overview page in PL ([0456c91](https://github.com/bolt-design-system/bolt/commit/0456c91))
* disable inactive text + icon variation PL demo so they don't show up in the menu ([96a1ac5](https://github.com/bolt-design-system/bolt/commit/96a1ac5))
* doc conflicts ([dadc396](https://github.com/bolt-design-system/bolt/commit/dadc396))
* docs and schema ([ca10596](https://github.com/bolt-design-system/bolt/commit/ca10596))
* docs site-specific layout updates to address display / responsive behavior issues ([cae9b00](https://github.com/bolt-design-system/bolt/commit/cae9b00))
* fix linting issues ([7d01b58](https://github.com/bolt-design-system/bolt/commit/7d01b58))
* fix now.sh deployments ([b7091ae](https://github.com/bolt-design-system/bolt/commit/b7091ae))
* fix prettier issuers ([50d223e](https://github.com/bolt-design-system/bolt/commit/50d223e))
* fix typo in the docs site .boltrc config ([352a9f4](https://github.com/bolt-design-system/bolt/commit/352a9f4))
* flag and figure bugs ([9893c60](https://github.com/bolt-design-system/bolt/commit/9893c60))
* Generate icons correct with prretier config ([1529fe2](https://github.com/bolt-design-system/bolt/commit/1529fe2))
* headline width ([de432ad](https://github.com/bolt-design-system/bolt/commit/de432ad))
* html encode web component examples in docs so they don't render as actual components ([52e4675](https://github.com/bolt-design-system/bolt/commit/52e4675))
* images on client-rendered, server-rendered demo pages ([3dfa10d](https://github.com/bolt-design-system/bolt/commit/3dfa10d))
* increase max timeout of E2E tests to troubleshoot failing Nightwatch tests ([8056db2](https://github.com/bolt-design-system/bolt/commit/8056db2))
* link text and icon spacing ([f79f585](https://github.com/bolt-design-system/bolt/commit/f79f585))
* manually disable SSR ([b7d0550](https://github.com/bolt-design-system/bolt/commit/b7d0550))
* manually disable SSR temporarily ([95ebc8c](https://github.com/bolt-design-system/bolt/commit/95ebc8c))
* mapping grid item to schema props ([70a2215](https://github.com/bolt-design-system/bolt/commit/70a2215))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/commit/5ef9667))
* pull in master ([1c980bf](https://github.com/bolt-design-system/bolt/commit/1c980bf))
* Pull in the newly-added case-helper dependency to the docs site ([32e7e86](https://github.com/bolt-design-system/bolt/commit/32e7e86))
* quick fix to address band / height issue on the docs site in IE 11 and Firefox ([0721b70](https://github.com/bolt-design-system/bolt/commit/0721b70))
* re-location button component server-side rendering examples ([bb5eb3e](https://github.com/bolt-design-system/bolt/commit/bb5eb3e))
* remove doc page template ([467223e](https://github.com/bolt-design-system/bolt/commit/467223e))
* remove extra comma ([8267ce0](https://github.com/bolt-design-system/bolt/commit/8267ce0))
* remove hero text and set up themes ([ed8ba7b](https://github.com/bolt-design-system/bolt/commit/ed8ba7b))
* Remove issue with paths on non-local machine ([32b527f](https://github.com/bolt-design-system/bolt/commit/32b527f))
* remove postinstall on docs site + test quicker PHP install command ([5b76360](https://github.com/bolt-design-system/bolt/commit/5b76360))
* remove uses of 'imageAttributes', these ones are unnecessary ([b4ceae9](https://github.com/bolt-design-system/bolt/commit/b4ceae9))
* replace 'imageAttributes' with 'cover' on careers page demo, does same thing ([32c1733](https://github.com/bolt-design-system/bolt/commit/32c1733))
* replace missing card image with new one from pega.com ([0fbc791](https://github.com/bolt-design-system/bolt/commit/0fbc791))
* resolve conflicts ([8554cd9](https://github.com/bolt-design-system/bolt/commit/8554cd9))
* resolve conflicts ([d6adc02](https://github.com/bolt-design-system/bolt/commit/d6adc02))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* styles and doc cleanup ([209ed0e](https://github.com/bolt-design-system/bolt/commit/209ed0e))
* temporarily disable component explorer demo for ratio till further debugged ([a6e47f6](https://github.com/bolt-design-system/bolt/commit/a6e47f6))
* temporarily disable pattern lab data being inlined in the main site head + add fully inlined version to the site's footer template ([2b9d584](https://github.com/bolt-design-system/bolt/commit/2b9d584))
* typo ([1216145](https://github.com/bolt-design-system/bolt/commit/1216145))
* update analytics tracker JS ([8fdda51](https://github.com/bolt-design-system/bolt/commit/8fdda51))
* update background component to pass 'cover' prop instead of classname to image, fix lazyloading logic in background ([9bf7b9e](https://github.com/bolt-design-system/bolt/commit/9bf7b9e))
* **Update external class names to be complaint with BEM metodology:** update external class names to ([6dc82b3](https://github.com/bolt-design-system/bolt/commit/6dc82b3))
* update broken path import with iframe-resizer library ([e07b687](https://github.com/bolt-design-system/bolt/commit/e07b687))
* update button SSR text ([d421f08](https://github.com/bolt-design-system/bolt/commit/d421f08))
* update button SSR text to not compile Twig filter + update SSR code block ([6ca47ae](https://github.com/bolt-design-system/bolt/commit/6ca47ae))
* update component explorer to use a local PHP server instance on master + localhost ([48983f3](https://github.com/bolt-design-system/bolt/commit/48983f3))
* update docs site inner page template to use the new pinned content option with bands ([85fe85e](https://github.com/bolt-design-system/bolt/commit/85fe85e))
* update docs site navbar mobile styling ([75e4caa](https://github.com/bolt-design-system/bolt/commit/75e4caa))
* update e2e tests to wait up to 3 seconds while looking for specific selectors before timing out ([dca91fd](https://github.com/bolt-design-system/bolt/commit/dca91fd))
* update iframe resizer library's import path to prevent build errors ([ef0f213](https://github.com/bolt-design-system/bolt/commit/ef0f213))
* update incorrect text component version + repo url for uikit ([cfa6fde](https://github.com/bolt-design-system/bolt/commit/cfa6fde))
* update layout to fix rendering issue in IE 11 ([2d6da70](https://github.com/bolt-design-system/bolt/commit/2d6da70))
* update navbar padding ([6826060](https://github.com/bolt-design-system/bolt/commit/6826060))
* update Nightwatch test for PL search input to end early in IE 11 ([5969a43](https://github.com/bolt-design-system/bolt/commit/5969a43))
* update nightwatch tests ([eb31464](https://github.com/bolt-design-system/bolt/commit/eb31464))
* update Pattern Lab overview page + docs site homepage templates ([bd06d5f](https://github.com/bolt-design-system/bolt/commit/bd06d5f))
* update remaining band components not yet switched over to use the full [@bolt-components-band](https://github.com/bolt-components-band) twig namespace ([dd8fca4](https://github.com/bolt-design-system/bolt/commit/dd8fca4))
* update remaining docs site templates as workaround to Twig embeds failing to compile ([39c0675](https://github.com/bolt-design-system/bolt/commit/39c0675))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/commit/b647d3b))
* update text component demo to use updated schema props from 8 months ago ([7b6b20e](https://github.com/bolt-design-system/bolt/commit/7b6b20e))
* update the URL used by Nightwatch.js to confirm SSR is working as expected ([1c74627](https://github.com/bolt-design-system/bolt/commit/1c74627))
* update Twig header / footer for docs site to still work when lang is set to a string, an array with a single value, and an array with multiple values ([53e7411](https://github.com/bolt-design-system/bolt/commit/53e7411))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/commit/a8ed82f))
* version bump / cleanup from v2.3.0 release ([32ec7d9](https://github.com/bolt-design-system/bolt/commit/32ec7d9))
* workaround to fix major Twig errors being encountered when the docs site is trying to be compiled (removing Twig embeds and sticking to Twig includes and extends seems to do the trick) ([f3533f6](https://github.com/bolt-design-system/bolt/commit/f3533f6))


### Features

* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/commit/ef366fe))
* add docs site search powered by Algolia ([013df79](https://github.com/bolt-design-system/bolt/commit/013df79))
* add GA autotrack support ([1d7edb2](https://github.com/bolt-design-system/bolt/commit/1d7edb2))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/commit/89a7061))
* add GA Javascript to main Bolt docs site head ([931cf74](https://github.com/bolt-design-system/bolt/commit/931cf74))
* add new placeholder image, use in personalized card demo ([e542029](https://github.com/bolt-design-system/bolt/commit/e542029))
* add POC button component example wired up to use the new ssr filter ([4c51647](https://github.com/bolt-design-system/bolt/commit/4c51647))
* add web component SSR + Twig Nightwatch.js test ([6def3e7](https://github.com/bolt-design-system/bolt/commit/6def3e7))
* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/commit/0b739b1))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/commit/5a4b34a))
* Generating a JSON file in www/build/data/ directory for Drupal team ([a36c5f2](https://github.com/bolt-design-system/bolt/commit/a36c5f2))
* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/commit/577d9f3))
* patch Pattern Lab PHP to include a new --data-only CLI config option to export the global PL data available (ex. nav URLs) without having to do a full PL build ([51cd6e9](https://github.com/bolt-design-system/bolt/commit/51cd6e9))
* port over + upgrade yeoman generator for consistently and easily spinning up new Bolt components + auto updating the related config files ([b93426c](https://github.com/bolt-design-system/bolt/commit/b93426c))
* **@bolt/website,@bolt/components-chip-list:** update documentation and change to bolt-list is used ([e7185a8](https://github.com/bolt-design-system/bolt/commit/e7185a8))
* reorganizing dev-specific docs site files + adding docs on server-side rendering ([2c2b58c](https://github.com/bolt-design-system/bolt/commit/2c2b58c))
* update navbar template used on docs site global header + update .boltrc config ([7e0b5fa](https://github.com/bolt-design-system/bolt/commit/7e0b5fa))
* update ratio component tests to check for css var and shadow dom variations ([eea7f71](https://github.com/bolt-design-system/bolt/commit/eea7f71))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/commit/752c0df))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/commit/82a5686))
* **@bolt/website,@bolt/components-chip:** create web component for bolt-chip component ([6d1ae09](https://github.com/bolt-design-system/bolt/commit/6d1ae09))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/commit/51a4142))
* **Adding test and documentation to bolt-ol and bolt-ul component:** adding test and documentation ([f75206b](https://github.com/bolt-design-system/bolt/commit/f75206b))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add missing slots to icons in <bolt-button> SSR demos ([115745d](https://github.com/bolt-design-system/bolt/commit/115745d))
* Add padding to right sidebar in docs to create symmetry ([56d8656](https://github.com/bolt-design-system/bolt/commit/56d8656))
* adding enum for boolean props ([67c9e78](https://github.com/bolt-design-system/bolt/commit/67c9e78))
* address prettier issues ([492c158](https://github.com/bolt-design-system/bolt/commit/492c158))
* broken image paths ([9e7864d](https://github.com/bolt-design-system/bolt/commit/9e7864d))
* button class logics ([587f56f](https://github.com/bolt-design-system/bolt/commit/587f56f))
* button focus ([0e263b4](https://github.com/bolt-design-system/bolt/commit/0e263b4))
* clarify gutter prop and its related demos ([7ec76be](https://github.com/bolt-design-system/bolt/commit/7ec76be))
* code and organization cleanup ([5c5764d](https://github.com/bolt-design-system/bolt/commit/5c5764d))
* code cleanup ([a344b8b](https://github.com/bolt-design-system/bolt/commit/a344b8b))
* consistent copy ([8a4dfc7](https://github.com/bolt-design-system/bolt/commit/8a4dfc7))
* disable band transition inline on component overview page in PL ([0456c91](https://github.com/bolt-design-system/bolt/commit/0456c91))
* disable inactive text + icon variation PL demo so they don't show up in the menu ([96a1ac5](https://github.com/bolt-design-system/bolt/commit/96a1ac5))
* doc conflicts ([dadc396](https://github.com/bolt-design-system/bolt/commit/dadc396))
* docs and schema ([ca10596](https://github.com/bolt-design-system/bolt/commit/ca10596))
* docs site-specific layout updates to address display / responsive behavior issues ([cae9b00](https://github.com/bolt-design-system/bolt/commit/cae9b00))
* fix linting issues ([7d01b58](https://github.com/bolt-design-system/bolt/commit/7d01b58))
* fix now.sh deployments ([b7091ae](https://github.com/bolt-design-system/bolt/commit/b7091ae))
* fix prettier issuers ([50d223e](https://github.com/bolt-design-system/bolt/commit/50d223e))
* fix typo in the docs site .boltrc config ([352a9f4](https://github.com/bolt-design-system/bolt/commit/352a9f4))
* flag and figure bugs ([9893c60](https://github.com/bolt-design-system/bolt/commit/9893c60))
* Generate icons correct with prretier config ([1529fe2](https://github.com/bolt-design-system/bolt/commit/1529fe2))
* headline width ([de432ad](https://github.com/bolt-design-system/bolt/commit/de432ad))
* html encode web component examples in docs so they don't render as actual components ([52e4675](https://github.com/bolt-design-system/bolt/commit/52e4675))
* images on client-rendered, server-rendered demo pages ([3dfa10d](https://github.com/bolt-design-system/bolt/commit/3dfa10d))
* increase max timeout of E2E tests to troubleshoot failing Nightwatch tests ([8056db2](https://github.com/bolt-design-system/bolt/commit/8056db2))
* link text and icon spacing ([f79f585](https://github.com/bolt-design-system/bolt/commit/f79f585))
* manually disable SSR ([b7d0550](https://github.com/bolt-design-system/bolt/commit/b7d0550))
* manually disable SSR temporarily ([95ebc8c](https://github.com/bolt-design-system/bolt/commit/95ebc8c))
* mapping grid item to schema props ([70a2215](https://github.com/bolt-design-system/bolt/commit/70a2215))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/commit/5ef9667))
* pull in master ([1c980bf](https://github.com/bolt-design-system/bolt/commit/1c980bf))
* Pull in the newly-added case-helper dependency to the docs site ([32e7e86](https://github.com/bolt-design-system/bolt/commit/32e7e86))
* quick fix to address band / height issue on the docs site in IE 11 and Firefox ([0721b70](https://github.com/bolt-design-system/bolt/commit/0721b70))
* re-location button component server-side rendering examples ([bb5eb3e](https://github.com/bolt-design-system/bolt/commit/bb5eb3e))
* remove extra comma ([8267ce0](https://github.com/bolt-design-system/bolt/commit/8267ce0))
* remove hero text and set up themes ([ed8ba7b](https://github.com/bolt-design-system/bolt/commit/ed8ba7b))
* Remove issue with paths on non-local machine ([32b527f](https://github.com/bolt-design-system/bolt/commit/32b527f))
* remove postinstall on docs site + test quicker PHP install command ([5b76360](https://github.com/bolt-design-system/bolt/commit/5b76360))
* remove uses of 'imageAttributes', these ones are unnecessary ([b4ceae9](https://github.com/bolt-design-system/bolt/commit/b4ceae9))
* replace 'imageAttributes' with 'cover' on careers page demo, does same thing ([32c1733](https://github.com/bolt-design-system/bolt/commit/32c1733))
* replace missing card image with new one from pega.com ([0fbc791](https://github.com/bolt-design-system/bolt/commit/0fbc791))
* resolve conflicts ([8554cd9](https://github.com/bolt-design-system/bolt/commit/8554cd9))
* resolve conflicts ([d6adc02](https://github.com/bolt-design-system/bolt/commit/d6adc02))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* styles and doc cleanup ([209ed0e](https://github.com/bolt-design-system/bolt/commit/209ed0e))
* temporarily disable component explorer demo for ratio till further debugged ([a6e47f6](https://github.com/bolt-design-system/bolt/commit/a6e47f6))
* temporarily disable pattern lab data being inlined in the main site head + add fully inlined version to the site's footer template ([2b9d584](https://github.com/bolt-design-system/bolt/commit/2b9d584))
* typo ([1216145](https://github.com/bolt-design-system/bolt/commit/1216145))
* update analytics tracker JS ([8fdda51](https://github.com/bolt-design-system/bolt/commit/8fdda51))
* update background component to pass 'cover' prop instead of classname to image, fix lazyloading logic in background ([9bf7b9e](https://github.com/bolt-design-system/bolt/commit/9bf7b9e))
* **Update external class names to be complaint with BEM metodology:** update external class names to ([6dc82b3](https://github.com/bolt-design-system/bolt/commit/6dc82b3))
* update broken path import with iframe-resizer library ([e07b687](https://github.com/bolt-design-system/bolt/commit/e07b687))
* update button SSR text ([d421f08](https://github.com/bolt-design-system/bolt/commit/d421f08))
* update button SSR text to not compile Twig filter + update SSR code block ([6ca47ae](https://github.com/bolt-design-system/bolt/commit/6ca47ae))
* update component explorer to use a local PHP server instance on master + localhost ([48983f3](https://github.com/bolt-design-system/bolt/commit/48983f3))
* update docs site inner page template to use the new pinned content option with bands ([85fe85e](https://github.com/bolt-design-system/bolt/commit/85fe85e))
* update docs site navbar mobile styling ([75e4caa](https://github.com/bolt-design-system/bolt/commit/75e4caa))
* update e2e tests to wait up to 3 seconds while looking for specific selectors before timing out ([dca91fd](https://github.com/bolt-design-system/bolt/commit/dca91fd))
* update iframe resizer library's import path to prevent build errors ([ef0f213](https://github.com/bolt-design-system/bolt/commit/ef0f213))
* update incorrect text component version + repo url for uikit ([cfa6fde](https://github.com/bolt-design-system/bolt/commit/cfa6fde))
* update layout to fix rendering issue in IE 11 ([2d6da70](https://github.com/bolt-design-system/bolt/commit/2d6da70))
* update navbar padding ([6826060](https://github.com/bolt-design-system/bolt/commit/6826060))
* update Nightwatch test for PL search input to end early in IE 11 ([5969a43](https://github.com/bolt-design-system/bolt/commit/5969a43))
* update nightwatch tests ([eb31464](https://github.com/bolt-design-system/bolt/commit/eb31464))
* update Pattern Lab overview page + docs site homepage templates ([bd06d5f](https://github.com/bolt-design-system/bolt/commit/bd06d5f))
* update remaining band components not yet switched over to use the full [@bolt-components-band](https://github.com/bolt-components-band) twig namespace ([dd8fca4](https://github.com/bolt-design-system/bolt/commit/dd8fca4))
* update remaining docs site templates as workaround to Twig embeds failing to compile ([39c0675](https://github.com/bolt-design-system/bolt/commit/39c0675))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/commit/b647d3b))
* update text component demo to use updated schema props from 8 months ago ([7b6b20e](https://github.com/bolt-design-system/bolt/commit/7b6b20e))
* update the URL used by Nightwatch.js to confirm SSR is working as expected ([1c74627](https://github.com/bolt-design-system/bolt/commit/1c74627))
* update Twig header / footer for docs site to still work when lang is set to a string, an array with a single value, and an array with multiple values ([53e7411](https://github.com/bolt-design-system/bolt/commit/53e7411))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/commit/a8ed82f))
* version bump / cleanup from v2.3.0 release ([32ec7d9](https://github.com/bolt-design-system/bolt/commit/32ec7d9))
* workaround to fix major Twig errors being encountered when the docs site is trying to be compiled (removing Twig embeds and sticking to Twig includes and extends seems to do the trick) ([f3533f6](https://github.com/bolt-design-system/bolt/commit/f3533f6))


### Features

* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/commit/ef366fe))
* add docs site search powered by Algolia ([013df79](https://github.com/bolt-design-system/bolt/commit/013df79))
* add GA autotrack support ([1d7edb2](https://github.com/bolt-design-system/bolt/commit/1d7edb2))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/commit/89a7061))
* add GA Javascript to main Bolt docs site head ([931cf74](https://github.com/bolt-design-system/bolt/commit/931cf74))
* add new placeholder image, use in personalized card demo ([e542029](https://github.com/bolt-design-system/bolt/commit/e542029))
* add POC button component example wired up to use the new ssr filter ([4c51647](https://github.com/bolt-design-system/bolt/commit/4c51647))
* add web component SSR + Twig Nightwatch.js test ([6def3e7](https://github.com/bolt-design-system/bolt/commit/6def3e7))
* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/commit/0b739b1))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/commit/5a4b34a))
* Generating a JSON file in www/build/data/ directory for Drupal team ([a36c5f2](https://github.com/bolt-design-system/bolt/commit/a36c5f2))
* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/commit/577d9f3))
* patch Pattern Lab PHP to include a new --data-only CLI config option to export the global PL data available (ex. nav URLs) without having to do a full PL build ([51cd6e9](https://github.com/bolt-design-system/bolt/commit/51cd6e9))
* port over + upgrade yeoman generator for consistently and easily spinning up new Bolt components + auto updating the related config files ([b93426c](https://github.com/bolt-design-system/bolt/commit/b93426c))
* **@bolt/website,@bolt/components-chip-list:** update documentation and change to bolt-list is used ([e7185a8](https://github.com/bolt-design-system/bolt/commit/e7185a8))
* reorganizing dev-specific docs site files + adding docs on server-side rendering ([2c2b58c](https://github.com/bolt-design-system/bolt/commit/2c2b58c))
* update navbar template used on docs site global header + update .boltrc config ([7e0b5fa](https://github.com/bolt-design-system/bolt/commit/7e0b5fa))
* update ratio component tests to check for css var and shadow dom variations ([eea7f71](https://github.com/bolt-design-system/bolt/commit/eea7f71))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/commit/752c0df))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/commit/82a5686))
* **@bolt/website,@bolt/components-chip:** create web component for bolt-chip component ([6d1ae09](https://github.com/bolt-design-system/bolt/commit/6d1ae09))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/commit/51a4142))
* **Adding test and documentation to bolt-ol and bolt-ul component:** adding test and documentation ([f75206b](https://github.com/bolt-design-system/bolt/commit/f75206b))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)


### Bug Fixes

* adjust logic grabbing latest Bolt release versions + update file cache ([cbb4ffc](https://github.com/bolt-design-system/bolt/commit/cbb4ffc))
* auto-strip the Drupal 8 attributes object from schema to fix JSON Schema Form errors ([fb7c04e](https://github.com/bolt-design-system/bolt/commit/fb7c04e))
* broken image paths ([9e7864d](https://github.com/bolt-design-system/bolt/commit/9e7864d))
* ensure the version selector exists before firing off JS logic ([086a07c](https://github.com/bolt-design-system/bolt/commit/086a07c))
* fix broken image paths in docs ([fcf9f83](https://github.com/bolt-design-system/bolt/commit/fcf9f83))
* fix internal selector used to reset schema form ([f519bd2](https://github.com/bolt-design-system/bolt/commit/f519bd2))
* re-enable schema validation for pattern lab but keep disabled for the docs site till 500 server error is troubleshooted ([ada76ef](https://github.com/bolt-design-system/bolt/commit/ada76ef))
* remove custom element link demo — replaced by newer section in PL ([11e109a](https://github.com/bolt-design-system/bolt/commit/11e109a))
* revert link demo in PL + fix image path ([8a2e040](https://github.com/bolt-design-system/bolt/commit/8a2e040))
* temporarily disable width-specific utility class demo till divide by zero issue is fixed ([0c19959](https://github.com/bolt-design-system/bolt/commit/0c19959))
* updating schema form + temporarily disabling lang settings to work with component previews in Pattern Lab; updating CORS settings ([bf6795e](https://github.com/bolt-design-system/bolt/commit/bf6795e))


### Features

* update component docs template in Pattern Lab to include a proper intro section for the component explorer UI; add pre-rendered HTML to help with initial page loading experience ([fefb007](https://github.com/bolt-design-system/bolt/commit/fefb007))
* update Pattern Lab custom styles to hide the docs-specific code viewer accordion ([2815cab](https://github.com/bolt-design-system/bolt/commit/2815cab))
