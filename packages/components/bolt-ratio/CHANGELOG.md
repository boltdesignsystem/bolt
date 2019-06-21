# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.5.0](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/compare/v2.4.4...v2.5.0) (2019-06-21)


### Bug Fixes

* re-add network timeout to jest tests ([e227628](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/e227628))
* re-update jest + jest-serializer-html packages to the latest versions + remove extra whitespace from snapshots based on jest-serializer-html pkg updates ([3af88ca](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/3af88ca))


### Features

* migrate over remaininig carousel-related docs site and component updates not included in the original component-only PR ([afc75c0](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/afc75c0))





# [2.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/compare/v2.3.2...v2.4.0) (2019-05-14)


### Bug Fixes

* add slight pause when checking ratio component VRTs ([850e82a](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/850e82a))
* image-related ratio style bug, images overflow container w/ JS off ([9408b1e](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/9408b1e))



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/cf335ce))
* adjust ratio VRT failure threshold ([f5d08a1](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/f5d08a1))
* port over ratio component test config updates from https://github.com/bolt-design-system/bolt/pull/1109 based on the ~1.3% average VRT diff that pops up periodically ([dc4a22a](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/dc4a22a))
* quote text tests ([5b5d3c3](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/5b5d3c3))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/a7f5fec))
* remove extra VRT screenshot that shouldn't exist ([8a5982f](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/8a5982f))
* update card + ratio snapshots ([bdf711c](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/bdf711c))
* update Ratio component Jest tests to ensure ratio component rendered as expected before doing any visual regression tests ([965ba4d](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/965ba4d))
* update ratio component snapshot ([1ce9804](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/1ce9804))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/b647d3b))
* use gcd instead of conditionally dividing each by 100 ([47a8d40](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/47a8d40))


### Features

* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/ef366fe))
* add initial jest test for the ratio component's twig rendering ([754dfd7](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/754dfd7))
* first round of ratio component jest tests ([c17a6b2](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/c17a6b2))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/cf335ce))
* adjust ratio VRT failure threshold ([f5d08a1](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/f5d08a1))
* port over ratio component test config updates from https://github.com/bolt-design-system/bolt/pull/1109 based on the ~1.3% average VRT diff that pops up periodically ([dc4a22a](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/dc4a22a))
* quote text tests ([5b5d3c3](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/5b5d3c3))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/a7f5fec))
* remove extra VRT screenshot that shouldn't exist ([8a5982f](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/8a5982f))
* update card + ratio snapshots ([bdf711c](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/bdf711c))
* update Ratio component Jest tests to ensure ratio component rendered as expected before doing any visual regression tests ([965ba4d](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/965ba4d))
* update ratio component snapshot ([1ce9804](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/1ce9804))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/b647d3b))
* use gcd instead of conditionally dividing each by 100 ([47a8d40](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/47a8d40))


### Features

* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/ef366fe))
* add initial jest test for the ratio component's twig rendering ([754dfd7](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/754dfd7))
* first round of ratio component jest tests ([c17a6b2](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/c17a6b2))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)


### Bug Fixes

* address circular dependency loop between bolt/global and the new standalone bolt-ratio component ([0ce8ba6](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/0ce8ba6))
* fix failing jest tests + prettier issues ([333d08d](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/333d08d))
* fix local Bolt package versions ([f1a4647](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/f1a4647))
* fix NPM dependency version mis-match across bolt components ([611ceee](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/611ceee))
* flx linting issues ([b7c30d7](https://github.com/bolt-design-system/bolt/tree/master/packages/ui/objects/bolt-ratio/commit/b7c30d7))
