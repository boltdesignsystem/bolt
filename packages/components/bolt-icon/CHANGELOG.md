# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.18.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.17.1...v2.18.0) (2020-02-19)


### Bug Fixes

* update CSS custom property styles to only use the original Icon component's styling API; fixes cross browser rendering issues encountered in Firefox and Safari ([efab5f5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/efab5f523190a7f6ee5509cd029bd1669ddb6837))
* update Jest snapshots ([ffb309e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/ffb309edef66264d916d58e2e44d97a1152dd44e))





# [2.17.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.16.3...v2.17.0) (2020-02-04)

**Note:** Version bump only for package @bolt/components-icon





## [2.16.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.16.1...v2.16.2) (2020-01-28)


### Bug Fixes

* Remove background on web component icons when background="none" ([6039441](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/603944171dad44f3f879cccaaea99d70043ed58b))
* Remove padding on web component icons when background="none" ([1653103](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/1653103b5542b5b7293d3e2a39f29cb93cee0a48))





## [2.16.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.16.0...v2.16.1) (2020-01-27)


### Bug Fixes

* add raw filters to the Toolbar + Icon component's Twig templates ([472c23d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/472c23da670ba1c39f7a497cd36a92c7fc785b92))





# [2.16.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.15.2...v2.16.0) (2020-01-24)


### Bug Fixes

* add missing Icon dependency post-pulling in v2.13.0 ([e2d26f2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/e2d26f2f428d765a4de459963097b384c42d1438))
* address prettier issues ([54cd576](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/54cd57613d946deb04dbaf21bb3ca15217110314))
* icon adjustments ([a846ee0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a846ee0ba1ed92847541c11f6bc92f09bd75be27))
* Icon color fix for IE 11 ([a6278be](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a6278beb9e7f178b309c54c6653bf016fb9cbed8))
* partial fix for shadow dom rendering ([1d03ac9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/1d03ac945614ee8414a8ec3490aa8b7610d1a45c))
* re-test Icon updates ([c64faee](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/c64faee4b2ebf33c011aa6e411a457da94e83ee1))
* test IE 11 fix ([c9f743c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/c9f743c04926914666281f4592065c645f869a08))
* update snapshots + fix prettier issues ([3eed559](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/3eed559af2e4ca279ad3328157f822588e97e3a3))
* workaround to address Shadow DOM encapsulation nested context ([7475619](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/74756195f6560fb166c645ad422f90f0ae0f602a))


### Features

* add new helper Webpack plugins ([7eb295c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/7eb295c4e934c4a1e10e44d5fbb072905d0a7efd))
* finish wiring up refactored Icon component ([a9e3bd8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a9e3bd898f88d12de95aac1f21afc88eefaf45a5))
* update JSON schema validation used by Icon ([cba55e5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/cba55e551604d38c69089de1041fd54eed48ea41))





## [2.15.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.15.1...v2.15.2) (2020-01-21)

**Note:** Version bump only for package @bolt/components-icon





# [2.15.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.14.3...v2.15.0) (2020-01-17)


### Features

* add new List icon ([cb94fd5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/cb94fd5ad504c5e076b837469570ee06bb0ac0b1))
* add the ability to customize Icon's border radius via CSS custom property ([bcff00d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/bcff00db184f8e6707c92b6cdb7ea0fc9f7b1ff5))





# [2.14.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.13.3...v2.14.0) (2020-01-06)


### Bug Fixes

* revert adding component internal updates — handled in a separate PR ([37882d5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/37882d5))
* update @bolt/core-v3.x references to v2.13.0 ([28d7bcb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/28d7bcb))


### Features

* cherry pick component constructor / event lifecycle cleanup work related to larger work in https://github.com/boltdesignsystem/bolt/pull/1579 ([3911459](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/3911459))
* cherry pick component constructor / event lifecycle cleanup work related to larger work in https://github.com/boltdesignsystem/bolt/pull/1579 ([43d1878](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/43d1878))
* migrate over the customElements.define-related replacement + component dependency updates from https://github.com/boltdesignsystem/bolt/pull/1579 ([3b6f529](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/3b6f529))





# [2.13.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.12.1...v2.13.0) (2019-12-13)

**Note:** Version bump only for package @bolt/components-icon





## [2.12.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.12.0...v2.12.1) (2019-12-12)

**Note:** Version bump only for package @bolt/components-icon





# [2.12.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.11.4...v2.12.0) (2019-11-26)

**Note:** Version bump only for package @bolt/components-icon





## [2.11.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.11.1...v2.11.2) (2019-11-14)

**Note:** Version bump only for package @bolt/components-icon





# [2.11.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.10.0...v2.11.0) (2019-11-14)

**Note:** Version bump only for package @bolt/components-icon





## [2.9.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.9.1...v2.9.2) (2019-10-23)

**Note:** Version bump only for package @bolt/components-icon





# [2.9.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.8.3...v2.9.0) (2019-10-22)

**Note:** Version bump only for package @bolt/components-icon





## [2.8.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.8.0...v2.8.1) (2019-10-16)

**Note:** Version bump only for package @bolt/components-icon





# [2.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)

**Note:** Version bump only for package @bolt/components-icon





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)

**Note:** Version bump only for package @bolt/components-icon





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)


### Bug Fixes

* **bolt-icon:** updating icon schema after merge ([4f9dc33](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/4f9dc33))


### Features

* **with-with:** self-drawing circle added ([a799a8a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a799a8a))
* **with-without:** continued development ([b0f62aa](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/b0f62aa))





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Features

* **icons:** add exclamation icon ([af221dd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/af221dd))
* **svg-component:** add animated svg components ([#1343](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/issues/1343)) ([c82108f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/c82108f))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Features

* **icons:** add exclamation icon ([af221dd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/af221dd))
* **svg-component:** add animated svg components ([#1343](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/issues/1343)) ([c82108f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/c82108f))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Features

* **icons:** add exclamation icon ([af221dd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/af221dd))
* **svg-component:** add animated svg components ([#1343](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/issues/1343)) ([c82108f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/c82108f))





# [2.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* ignore missing SVG icons in the Twig template when attempting to inline the fallback SVG icon ([4a0381b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/4a0381b))
* reformat icon `preload` prop description ([183a0ab](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/183a0ab))
* update icon component snapshots ([8361a55](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/8361a55))


### Features

* add ability to display titles in SVG icons + add POC ability to server-side render specific icons ([5b691e8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/5b691e8))
* add optional Twig template blocks to the Button and Icon component; workaround to SSR-rendered SVG icons for Typeahead without requiring build tool updates ([71dafa9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/71dafa9))
* automatically invert SVG icon color at the Twig level ([802be34](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/802be34))
* automatically replace hard coded fill and stroke colors in inlined SVGs with CSS custom prop placeholders ([9cc1887](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/9cc1887))
* pull in all SVG icons into the Webpack build automatically ([a8f24a5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a8f24a5))
* update bolt-icon to now eagerly load so pre-rendered icons don't flash when booting up ([bf47407](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/bf47407))





# [2.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.6.0-beta.2...v2.6.0) (2019-08-30)

**Note:** Version bump only for package @bolt/components-icon





# [2.6.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.6.0-beta.1...v2.6.0-beta.2) (2019-08-27)

**Note:** Version bump only for package @bolt/components-icon





# [2.6.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.5.6...v2.6.0-beta.1) (2019-08-09)

**Note:** Version bump only for package @bolt/components-icon





## [2.5.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.5.5...v2.5.6) (2019-07-30)

**Note:** Version bump only for package @bolt/components-icon





## [2.5.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.5.2...v2.5.3) (2019-07-12)

**Note:** Version bump only for package @bolt/components-icon





## [2.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.5.1...v2.5.2) (2019-06-25)

**Note:** Version bump only for package @bolt/components-icon





## [2.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/components-icon





## [2.4.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.4.2...v2.4.3) (2019-05-31)


### Bug Fixes

* globally update non-private package.json files with devDependencies and peerDependencies that might not get installed as expected when used / published outside of the Bolt monorepo ([617bd86](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/617bd86))





# [2.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.3.2...v2.4.0) (2019-05-14)



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/cf335ce))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a7f5fec))
* update tests to stop Twig renderer service when complete ([a7bafbb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a7bafbb))


### Features

* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/577d9f3))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/cf335ce))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a7f5fec))
* update tests to stop Twig renderer service when complete ([a7bafbb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a7bafbb))


### Features

* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/577d9f3))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)



## [2.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.2.1...v2.2.2) (2019-01-07)



## [2.2.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.2.0...v2.2.1) (2018-12-17)



# [2.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.2.0-rc.1...v2.2.0) (2018-11-18)



# [2.2.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.6...v2.2.0-rc.1) (2018-11-07)


### Bug Fixes

* auto-fix prettier issues ([6abd0d2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/6abd0d2))



## [2.1.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.5...v2.1.6) (2018-10-23)



## [2.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.3...v2.1.4) (2018-10-18)



## [2.1.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.2...v2.1.3) (2018-10-18)



## [2.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.1...v2.1.2) (2018-10-16)



## [2.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.0...v2.1.1) (2018-10-10)



# [2.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.1.0-beta.0...v2.1.0) (2018-10-10)


### Bug Fixes

* Allow explicit icon color attributes to work in IE ([642f556](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/642f556))
* Bring back icon color CSS variables for browsers that support them ([9c90f88](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/9c90f88))
* Clean up icon color CSS variables ([6a60978](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/6a60978))
* Fix icon color CSS variables support for modern browsers ([462b846](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/462b846))



# [2.1.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.0.0...v2.1.0-beta.0) (2018-10-05)


### Bug Fixes

* Fix icon z-index issue (WWWD-2642) ([48b9fc1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/48b9fc1))



# [2.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.0.0-beta.3...v2.0.0) (2018-09-27)


### Bug Fixes

* Fix icon color in Edge ([b860c41](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/b860c41))
* Remove invalid color CSS ([945293e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/945293e))



# [2.0.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-09-21)



# [2.0.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.8.3...v2.0.0-beta.2) (2018-09-19)



# [2.0.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-06)



# [2.0.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.8.1...v2.0.0-beta.0) (2018-09-05)


### Bug Fixes

* fixing prettier / eslint issues with decorators next to exported Classes ([e79f9a8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/e79f9a8))



# [1.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.7.2...v1.8.0) (2018-08-27)


### Bug Fixes

* fix missing comma in package.json ([e5e64e9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/e5e64e9))
* update icon component schema to include new github and bolt logo icons ([bc36887](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/bc36887))



# [1.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.6.8...v1.7.0) (2018-08-08)


### Bug Fixes

* update manually set css vars ([25fbfb7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/25fbfb7))



## [1.6.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.6.3...v1.6.4) (2018-07-12)


### Bug Fixes

* Fix schema broken when adding brand-operations icon ([a2fdeef](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a2fdeef))



# [1.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.5.3...v1.6.0) (2018-07-04)


### Bug Fixes

* doc styles and formats ([a6d5b22](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/a6d5b22))



## [1.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.5.1...v1.5.2) (2018-06-19)



## [1.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.5.0...v1.5.1) (2018-06-18)



# [1.5.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.4.5...v1.5.0) (2018-06-12)


### Bug Fixes

* fix duplicate component rendering by fixing the Bolt core BoltBase class to use the right renderer mixin ([d16a9ab](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/d16a9ab))



# [1.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.3.4...v1.4.0) (2018-05-18)


### Features

* fix icon build script to support SVG icons using masks; updates CSS so icons with masks render and transition as expected ([#674](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/issues/674)) ([2107183](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/2107183))



## [1.3.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.3.3...v1.3.4) (2018-05-08)



# [1.3.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.2.4...v1.3.0) (2018-05-04)



## [1.2.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.2.2...v1.2.3) (2018-04-26)



## [1.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.2.1...v1.2.2) (2018-04-26)



# [1.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.1.12...v1.2.0) (2018-04-25)



## [1.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.1.3...v1.1.4) (2018-04-17)


### Bug Fixes

* updating CSS var usage globally to use new CSS Vars mixin ([cb75bb0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/cb75bb0))



## [1.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.1.1...v1.1.2) (2018-04-10)



## [1.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.1.0...v1.1.1) (2018-04-10)



# [1.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.4...v1.1.0) (2018-04-10)



## [1.0.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.2...v1.0.3) (2018-04-03)


### Bug Fixes

* add check for `contains` method to prevent error from getting thrown in IE11 ([#566](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/issues/566)) ([12864cf](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/commit/12864cf))



## [1.0.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.1...v1.0.2) (2018-03-31)



## [1.0.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0...v1.0.1) (2018-03-30)



# [1.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.12...v1.0.0) (2018-03-30)



# [1.0.0-rc.12](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2018-03-30)



# [1.0.0-rc.11](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.9...v1.0.0-rc.11) (2018-03-30)



# [1.0.0-rc.9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2018-03-20)



# [1.0.0-rc.8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2018-03-20)



# [1.0.0-rc.7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2018-03-13)



# [1.0.0-rc.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2018-03-07)



# [1.0.0-rc.5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2018-03-06)



# [1.0.0-rc.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2018-03-06)



# [1.0.0-rc.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-02-24)



# [1.0.0-rc.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-02-24)



# [1.0.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-icon/compare/v0.4.1...v1.0.0-rc.1) (2018-02-24)
