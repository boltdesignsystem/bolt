# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)


### Bug Fixes

* pull in custom Switch JS to fix custom event issue; add example with/without page with Shadow DOM disabled for debugging; ([8261a6f](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8261a6f))





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/0dfd86c))
* **dropdown:** add Node.replaceWith polyfill ([6a870cf](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6a870cf))


### Features

* **core:** add build meta data to window.bolt.meta ([1ac2207](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/1ac2207))
* **core:** add getData JS function for getting "NAME.bolt.json" data ([e3d96e4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e3d96e4))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8a2f14e))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/0dfd86c))
* **dropdown:** add Node.replaceWith polyfill ([6a870cf](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6a870cf))


### Features

* **core:** add build meta data to window.bolt.meta ([1ac2207](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/1ac2207))
* **core:** add getData JS function for getting "NAME.bolt.json" data ([e3d96e4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e3d96e4))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8a2f14e))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Bug Fixes

* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/0dfd86c))
* **dropdown:** add Node.replaceWith polyfill ([6a870cf](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6a870cf))


### Features

* **core:** add build meta data to window.bolt.meta ([1ac2207](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/1ac2207))
* **core:** add getData JS function for getting "NAME.bolt.json" data ([e3d96e4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e3d96e4))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8a2f14e))





# [2.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* add find-index polyfill for IE ([205b9b1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/205b9b1))
* add missing fetch polyfill needed for IE 11 support ([42c6a75](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/42c6a75))
* address prettier issues ([2251bf5](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/2251bf5))
* comment-out findIndex polyfill for now, exposing a bug in table JS ([5e9831b](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5e9831b))
* disable linting on patched libs ([0c8b76d](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/0c8b76d))
* make sure all available prop data gets passed along to any listeners added ([18b2d07](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/18b2d07))
* temporarily switch to using a locally patched version of get-own-property-symbols to fix patch-package-related postinstall issues ([ce1b187](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/ce1b187))


### Features

* add new @bolt/core withEvents mixin to more easily add declarative events to components ([f7a07b3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/f7a07b3))
* add tabs component ([b591d67](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/b591d67))





# [2.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.6.0-beta.2...v2.6.0) (2019-08-30)

**Note:** Version bump only for package @bolt/core





# [2.6.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.6.0-beta.1...v2.6.0-beta.2) (2019-08-27)

**Note:** Version bump only for package @bolt/core





# [2.6.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.5.6...v2.6.0-beta.1) (2019-08-09)


### Bug Fixes

* address eslint issues ([e330908](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e330908))
* major cross browser fixes + polyfill updates ([50b4214](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/50b4214))
* remove unused classname ([5904236](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5904236))
* revert bolt/core dependency updates + temporarily remove yarn.lock to ensure a fresh install on Travis ([20c8386](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/20c8386))
* revert patch change ([856d137](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/856d137))
* update patch path + commit ref ([e1b468d](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e1b468d))


### Features

* add repeat-rule mixin ([e8d24c7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e8d24c7))
* move scrollbar helpers to core, scrollbar calc functions to Class, add 'preventBodyScroll' as prop ([5a731b0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5a731b0))





## [2.5.6](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.5.5...v2.5.6) (2019-07-30)


### Features

* set padding on body when scrollbars are present to prevent content shift ([6f7098b](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6f7098b))





## [2.5.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.5.2...v2.5.3) (2019-07-12)


### Bug Fixes

* cherry pick the main lang-specific config fix + webpack `lang` config fix when building multiple languages at the same time via https://github.com/bolt-design-system/bolt/pull/1265 ([318c9f9](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/318c9f9))





## [2.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.5.1...v2.5.2) (2019-06-25)

**Note:** Version bump only for package @bolt/core





## [2.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/core





# [2.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.3.2...v2.4.0) (2019-05-14)



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add ajv to core package.json ([74322ea](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/74322ea))
* ensure all default Sass spacing scale config can be overwritten (ex. lang-specific spacing options like we have with Japanese) ([6c8e59d](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6c8e59d))
* revert updating element-closest; fixes IE 11 JavaScript issues that pop up if updated to a later version (relating to smooth scroll) ([a4a5e03](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/a4a5e03))


### Features

* add 'shallow' argument to convertInitialTags ([5eb8a29](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5eb8a29))
* add helper 'containsTagName' ([941e596](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/941e596))
* add moveChildrenToRoot option to decorator ([7a218d7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/7a218d7))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/51a4142))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/4636d67))
* add polyfill for string.includes ([772b19c](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/772b19c))
* convert schema data to camelCase before calling validate ([f7e9e93](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/f7e9e93))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/752c0df))
* wire up ssr-server POC for handling SSR requests ([5c24e5a](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5c24e5a))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add ajv to core package.json ([74322ea](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/74322ea))
* ensure all default Sass spacing scale config can be overwritten (ex. lang-specific spacing options like we have with Japanese) ([6c8e59d](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6c8e59d))
* revert updating element-closest; fixes IE 11 JavaScript issues that pop up if updated to a later version (relating to smooth scroll) ([a4a5e03](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/a4a5e03))


### Features

* add 'shallow' argument to convertInitialTags ([5eb8a29](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5eb8a29))
* add helper 'containsTagName' ([941e596](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/941e596))
* add moveChildrenToRoot option to decorator ([7a218d7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/7a218d7))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/51a4142))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/4636d67))
* add polyfill for string.includes ([772b19c](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/772b19c))
* convert schema data to camelCase before calling validate ([f7e9e93](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/f7e9e93))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/752c0df))
* wire up ssr-server POC for handling SSR requests ([5c24e5a](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5c24e5a))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)



## [2.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.2.1...v2.2.2) (2019-01-07)


### Bug Fixes

* add missing deps causing eslint check to fail ([df4596b](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/df4596b))
* add missing redux thunk package ([f7e2e95](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/f7e2e95))
* fix js typo ([48bf69a](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/48bf69a))
* remove line breaks before and after lit-html template tags, causes unwanted space on inline elements ([9efef74](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/9efef74))
* update the new replace-with-grandchildren element to use the native browser connectedCallback to work with similar updates made to the replace-with-children element ([b478aef](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/b478aef))


### Features

* add 'shallow' argument to convertInitialTags ([5eb8a29](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5eb8a29))
* add bolt-action class with shared link and button parts ([ad9cea1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/ad9cea1))
* add getComponentRootElement function to utils ([3bea59e](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/3bea59e))
* add moveChildrenToRoot option to decorator ([7a218d7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/7a218d7))
* add validateProps method to bolt-base class ([497d0d2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/497d0d2))
* Applaying Salems aproach to my code ([29251ca](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/29251ca))
* upgrade lit-html to latest rc version — addresses JS errors encountered with older buggy versions of lit-html directives ([56d7f4d](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/56d7f4d))



## [2.2.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.2.0...v2.2.1) (2018-12-17)


### Bug Fixes

* fix internal check for when a component initially renders ([302a6bb](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/302a6bb))
* revert swapping out custom element polyfill (update may no longer be needed) ([7a885d9](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/7a885d9))
* swap out document-register-element polyfill for custom elements with Google's custom elements polyfill; workaround to fix issue reported in BDS-840 ([6d7c973](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6d7c973))


### Features

* Add bolt-list-item component to webcomponents ([28c0cc5](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/28c0cc5))
* fixiing prettier issues ([d5c4030](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/d5c4030))
* Rename <remove-html-tag> to <replace-with-grandchildren> and moving list item to separate twig file ([b14fadc](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/b14fadc))
* update global click handler util to support methods on the window in addition to methods on other elements like before ([7e8a511](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/7e8a511))



# [2.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.2.0-rc.1...v2.2.0) (2018-11-18)


### Features

* add context provider / subscriber pattern to Bolt core. Allows for parent elements to provide access to certain props + alert subscribing children when those props have changed. ([1497841](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/1497841))



# [2.2.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.6...v2.2.0-rc.1) (2018-11-07)


### Bug Fixes

* update native shim polyfill path for ES6-supporting browsers ([933a1fc](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/933a1fc))


### Features

* Add opacity settings ([65cba5b](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/65cba5b))
* Add opacity tools (function and mixin) based on opacity settings ([74a8fec](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/74a8fec))



## [2.1.6](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.5...v2.1.6) (2018-10-23)



## [2.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.3...v2.1.4) (2018-10-18)



## [2.1.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.2...v2.1.3) (2018-10-18)



## [2.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.1...v2.1.2) (2018-10-16)



## [2.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.0...v2.1.1) (2018-10-10)



# [2.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.1.0-beta.0...v2.1.0) (2018-10-10)



# [2.1.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.0.0...v2.1.0-beta.0) (2018-10-05)


### Bug Fixes

* fix lint issues ([8e2022d](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8e2022d))
* fix lint issues ([d83fdc7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/d83fdc7))


### Features

* prep for writing web component tests ([53020be](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/53020be))



# [2.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.0.0-beta.3...v2.0.0) (2018-09-27)



# [2.0.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-09-21)


### Bug Fixes

* update link colors on dark themes to be white ([989d3d2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/989d3d2))



# [2.0.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.8.3...v2.0.0-beta.2) (2018-09-19)



# [2.0.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-06)



# [2.0.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.8.1...v2.0.0-beta.0) (2018-09-05)


### Bug Fixes

* fixing prettier / eslint issues with decorators next to exported Classes ([e79f9a8](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e79f9a8))
* update Base component to check for shadowDOM support + automatic fallback inside of forms when the component's internal renderRoot method fires; this ensures every component instance on the page renders to the light DOM when needed (ex. nested inside of a form), even when a component gets removed / re-added to the page ([d706cbe](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/d706cbe))



# [1.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.7.2...v1.8.0) (2018-08-27)


### Bug Fixes

* fix missing comma in package.json ([e5e64e9](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e5e64e9))
* fix stylelint issue ([112ecd4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/112ecd4))
* update Sass to remove Sassdoc warnings ([2dbc662](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/2dbc662))


### Features

* add lit-html as new rendering engine to formally HyperHTML (and hopefully Preact as well) ([c3b30d0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/c3b30d0))
* update Bolt Base class to now (by default) emit events when a component is initially rendered for the very first time + let external scripts know when a component has been re-rendered as well; part of the broader strategy to provide guidelines on integrating 3rd party scripts / analytics with Bolt components ([4c74c2b](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/4c74c2b))



# [1.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.6.8...v1.7.0) (2018-08-08)


### Bug Fixes

* fixing linting rules ([529cf01](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/529cf01))
* revert removing generic exports of preact + hyperhtml ([4ed89e1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/4ed89e1))
* update opacity logic to output correct values in CSS var fallback; update card component to use new opacity parameter in the bolt-theme function ([fcc2cff](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/fcc2cff))
* update to address linting issues ([15a83fc](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/15a83fc))



## [1.6.4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.6.3...v1.6.4) (2018-07-12)



# [1.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.5.3...v1.6.0) (2018-07-04)


### Bug Fixes

* disable stylelint validation on [@respond-to](https://github.com/respond-to) deprecated mixin ([8fa2a86](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8fa2a86))
* include forked version of sass-mq ([36f2584](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/36f2584))
* misc fixes ([8c7d380](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8c7d380))
* removing redundant sass variables ([fe80116](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/fe80116))
* retain all features of sass-mq ([6475312](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6475312))
* update stylelint validation override to use correct scss/at-mixin-pattern rule ([c8a2428](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/c8a2428))



## [1.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.5.1...v1.5.2) (2018-06-19)


### Bug Fixes

* export `isValidSelector` in Bolt core ([9978b5b](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/9978b5b))


### Features

* add new helper mixin for handling default spacing and layout behavior in Bolt custom element ([a9e03da](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/a9e03da))



## [1.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.5.0...v1.5.1) (2018-06-18)


### Bug Fixes

* add better check for display: contents browser support (BDS-426) ([e47cda4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e47cda4))



# [1.5.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.4.5...v1.5.0) (2018-06-12)


### Bug Fixes

* add element.closest polyfill for IE 11 (required by smooth scroll library) ([6f5f45e](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/6f5f45e))
* fix additional indent issues ([a4ebcb0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/a4ebcb0))
* fix duplicate component rendering by fixing the Bolt core BoltBase class to use the right renderer mixin ([d16a9ab](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/d16a9ab))
* fix indent issues ([5357772](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5357772))
* font family tools and settings ([5880ec4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5880ec4))
* revert updating Preact renderer to use "children" vs "childNodes" (used in Skate.js currently); fixes an issue with the block-ist Preact component rendering duplicate content ([8833e24](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/8833e24))


### Features

* add critical font support to any component using the bolt [@font-face](https://github.com/font-face) mixin (via CSS vars or via normal inherited font-family prop) ([50afa40](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/50afa40))
* add withUpdate lifecycle mixin from SkateJS to base Bolt component class ([88bd178](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/88bd178))
* update Preact renderer to match latest updates in Skate.js. ([79ac09e](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/79ac09e))



# [1.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.3.4...v1.4.0) (2018-05-18)


### Bug Fixes

* upgrade polyfills to latest versions; remove ShadyCSS + ShadyCSS Scoping shim as this is no longer required + addresses Firefox polyfill bug in BDS-285 ([b605c74](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/b605c74))


### Features

* restructure font family logic to be exportable ([#673](https://github.com/bolt-design-system/bolt/tree/master/packages/core/issues/673)) ([53a86c8](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/53a86c8))



# [1.3.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.2.4...v1.3.0) (2018-05-04)


### Bug Fixes

* fix lint issues in custom event polyfill JS ([a3d7817](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/a3d7817))
* monospace settings ([e711069](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/e711069))


### Features

* Allowing style vars to be overridden BDS-146 ([#677](https://github.com/bolt-design-system/bolt/tree/master/packages/core/issues/677)) ([71bad10](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/71bad10))



## [1.2.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.2.2...v1.2.3) (2018-04-26)



## [1.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.2.1...v1.2.2) (2018-04-26)


### Features

* 1st pass getting new <bolt-code> web component built out ([d77adb7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/d77adb7))



# [1.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.1.12...v1.2.0) (2018-04-25)


### Bug Fixes

* fixing double quotes lint error ([db136dd](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/db136dd))



## [1.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.1.3...v1.1.4) (2018-04-17)


### Bug Fixes

* adding new css-vars mixin and function to help keep manage CSS var usage (+ Sass compilation) ([0facca8](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/0facca8))
* update environmental check to return shadowDom support consistently ([5977347](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/5977347))
* updating hyperhtml renderer to prevent extra connectedCallbacks from running unexpectedly ([7c51f13](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/7c51f13))
* updating hyperHTML wire call to include a reference to the component being wired up ([4a4ee4a](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/4a4ee4a))



## [1.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.1.1...v1.1.2) (2018-04-10)



## [1.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.1.0...v1.1.1) (2018-04-10)



# [1.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.4...v1.1.0) (2018-04-10)


### Bug Fixes

* cleanup and misc fixes ([d25ec36](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/d25ec36))



## [1.0.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.2...v1.0.3) (2018-04-03)



## [1.0.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.1...v1.0.2) (2018-03-31)



## [1.0.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0...v1.0.1) (2018-03-30)



# [1.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.12...v1.0.0) (2018-03-30)



# [1.0.0-rc.12](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2018-03-30)



# [1.0.0-rc.11](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.9...v1.0.0-rc.11) (2018-03-30)



# [1.0.0-rc.9](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2018-03-20)



# [1.0.0-rc.8](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2018-03-20)



# [1.0.0-rc.7](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2018-03-13)



# [1.0.0-rc.6](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2018-03-07)



# [1.0.0-rc.5](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2018-03-06)



# [1.0.0-rc.4](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2018-03-06)



# [1.0.0-rc.3](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-02-24)


### Reverts

* revert removing data folder ([308d31c](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/308d31c))



# [1.0.0-rc.2](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-02-24)



# [1.0.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/core/compare/v0.4.1...v1.0.0-rc.1) (2018-02-24)


### Bug Fixes

* adding updated polyfill loader to v1.0 - adds more refined cross browser polyfills + using new shadydom polyfill with massive IE 11 perf improvements ([4d548b5](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/4d548b5))
* fixing JS rendering by adding missing bolt/core utils added in v0.x; adding temp workaround to images not loading + example pegaworld dummy page. ([9bcbdba](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/9bcbdba))
* fixing video player version number dependencies ([895c000](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/895c000))
* port over bolt core preact renderer base component update from release/0.x branch -- fixes re-rendering component based on data changes ([705f554](https://github.com/bolt-design-system/bolt/tree/master/packages/core/commit/705f554))
