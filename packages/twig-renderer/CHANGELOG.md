# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)

**Note:** Version bump only for package @bolt/twig-renderer





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)

**Note:** Version bump only for package @bolt/twig-renderer





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)

**Note:** Version bump only for package @bolt/twig-renderer





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **twig-renderer:** upgrade @basalt/twig-renderer 0.12.0 => 0.12.1 ([d57414f](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/d57414f))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **twig-renderer:** upgrade @basalt/twig-renderer 0.12.0 => 0.12.1 ([d57414f](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/d57414f))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Bug Fixes

* **twig-renderer:** upgrade @basalt/twig-renderer 0.12.0 => 0.12.1 ([d57414f](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/d57414f))





# [2.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* upgrade Twig renderer to the latest version to fix occasional memory errors getting thrown ([d0bdb39](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/d0bdb39))





# [2.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.6.0-beta.2...v2.6.0) (2019-08-30)

**Note:** Version bump only for package @bolt/twig-renderer





# [2.6.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.6.0-beta.1...v2.6.0-beta.2) (2019-08-27)

**Note:** Version bump only for package @bolt/twig-renderer





# [2.6.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.5.6...v2.6.0-beta.1) (2019-08-09)

**Note:** Version bump only for package @bolt/twig-renderer





## [2.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.5.1...v2.5.2) (2019-06-25)

**Note:** Version bump only for package @bolt/twig-renderer





## [2.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/twig-renderer





## [2.4.4](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.4.3...v2.4.4) (2019-06-05)


### Bug Fixes

* split up the core-php BoltExtra Twig extensions into the ones needed for Drupal compatibility vs any extra Twig extensions used internally for building the docs site. Update Twig renderer configs to use the full set of Twig extensions for the docs site but only BoltCore and BoltCoreCompat when running component tests ([0287e7a](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/0287e7a))





## [2.4.3](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.4.2...v2.4.3) (2019-05-31)

**Note:** Version bump only for package @bolt/twig-renderer





# [2.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.3.2...v2.4.0) (2019-05-14)


### Bug Fixes

* version bump composer.lock files to fix Twig version resolved ([6f6485c](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/6f6485c))
* version bump core-php getting used + update PHP dependencies so the casehelper package is installed as expected ([9808cb4](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/9808cb4))



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* re-add local PHP dependencies to fix broken CI tests ([595c19d](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/595c19d))
* remove deps not needed ([4d1098c](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/4d1098c))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/f4bfa64))
* revert keep alive config ([42c255f](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/42c255f))
* revert twig-renderer vendor path updates ([28cacb8](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/28cacb8))
* update npm scripts to not use postinstall automatically; add postinstall to root of the repo instead ([5dc3496](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/5dc3496))


### Features

* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/470f7af))
* wire up button component to include VRT, web component tests, update Twig renderer calls to compile even faster ([4b34184](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/4b34184))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/752c0df))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* re-add local PHP dependencies to fix broken CI tests ([595c19d](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/595c19d))
* remove deps not needed ([4d1098c](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/4d1098c))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/f4bfa64))
* revert keep alive config ([42c255f](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/42c255f))
* revert twig-renderer vendor path updates ([28cacb8](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/28cacb8))
* update npm scripts to not use postinstall automatically; add postinstall to root of the repo instead ([5dc3496](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/5dc3496))


### Features

* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/470f7af))
* wire up button component to include VRT, web component tests, update Twig renderer calls to compile even faster ([4b34184](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/4b34184))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/752c0df))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)


### Bug Fixes

* fix local Bolt package versions ([f1a4647](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/f1a4647))



## [2.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.2.1...v2.2.2) (2019-01-07)


### Bug Fixes

* re-enable schema validation for pattern lab but keep disabled for the docs site till 500 server error is troubleshooted ([ada76ef](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/ada76ef))



## [2.2.1](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.2.0...v2.2.1) (2018-12-17)



# [2.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.2.0-rc.1...v2.2.0) (2018-11-18)



# [2.2.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.6...v2.2.0-rc.1) (2018-11-07)



## [2.1.6](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.5...v2.1.6) (2018-10-23)


### Bug Fixes

* fix long-standing issue with static docs site not recompiling when files have changed (while in watch mode); improve static site build reliability ([5928ee7](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/5928ee7))



## [2.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.3...v2.1.4) (2018-10-18)



## [2.1.3](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.2...v2.1.3) (2018-10-18)



## [2.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.1...v2.1.2) (2018-10-16)



## [2.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.0...v2.1.1) (2018-10-10)



# [2.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.1.0-beta.0...v2.1.0) (2018-10-10)



# [2.1.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/compare/v2.0.0...v2.1.0-beta.0) (2018-10-05)


### Bug Fixes

* remove snyk check for now -- causing publishing issues ([bcf7e6b](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/bcf7e6b))


### Features

* **twig-renderer:** creates @bolt/twig-renderer for rendering individual Twig components ([277b7df](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/277b7df))


### Performance Improvements

* **twig-renderer:** improving speed of twig-renderer ([0e3b44f](https://github.com/bolt-design-system/bolt/tree/master/packages/twig-renderer/commit/0e3b44f))
